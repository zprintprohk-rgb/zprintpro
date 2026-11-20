#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verify products.ts is now correct + clean up matrix drift."""
import re
import json

# Verify products.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

print('=== products.ts spot check ===')
for slug in ['security-stickers', 'fluorescent-stickers', 'thick-paper-flyers', 'gang-run-card-boxes', 'tuck-end-boxes']:
    sm = re.search(r"slug:\s*['\"]" + slug + r"['\"]", content)
    if not sm: continue
    start = sm.start()
    # Find the { before
    depth = 0
    blk_start = start
    while blk_start > 0:
        if content[blk_start] == '{':
            depth += 1
            if depth == 1: break
        elif content[blk_start] == '}':
            depth -= 1
        blk_start -= 1
    depth = 0
    blk_end = start
    while blk_end < len(content):
        if content[blk_end] == '{':
            depth += 1
        elif content[blk_end] == '}':
            depth -= 1
            if depth == 0:
                blk_end += 1
                break
        blk_end += 1
    block = content[blk_start:blk_end]
    # Find description: '...',  (just first one on the block)
    desc_match = re.search(r"description:\s*['\"]([^'\"]*?)['\"]\s*,", block)
    descEn_match = re.search(r"descriptionEn:\s*['\"]([^'\"]*?)['\"]\s*,", block)
    descJa_match = re.search(r"descriptionJa:\s*['\"]([^'\"]*?)['\"]\s*,", block)
    opt = re.search(r"optimizedAt:\s*['\"]([^'\"]*?)['\"]", block)
    rnd = re.search(r"optimizationRound:\s*(\d+)", block)
    print(f'\n  {slug}:')
    if opt: print(f'    optimizedAt: {opt.group(1)}')
    if rnd: print(f'    optimizationRound: R{rnd.group(1)}')
    if desc_match:
        v = desc_match.group(1)
        print(f'    description ({len(v)} chars): {v[:100]}')
        if len(v) > 100: print(f'      TAIL: {v[-100:]}')
    if descEn_match:
        v = descEn_match.group(1)
        print(f'    descriptionEn ({len(v)} chars): ...{v[-80:]}')
    if descJa_match:
        v = descJa_match.group(1)
        print(f'    descriptionJa ({len(v)} chars): ...{v[-80:]}')

# Cleanup matrix: remove the 41-45 (from broken run) and renumber 46-50 to 41-45
print('\n=== matrix cleanup ===')
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# Remove the broken 41-45 (which correspond to security/fluorescent/thick-paper-flyers/gang-run-card-boxes/tuck-end-boxes)
# These are duplicates of the new 46-50 entries
broken_ids = {'v7-SKU-41', 'v7-SKU-42', 'v7-SKU-43', 'v7-SKU-44', 'v7-SKU-45'}
new_entries_to_renumber = {'v7-SKU-46', 'v7-SKU-47', 'v7-SKU-48', 'v7-SKU-49', 'v7-SKU-50'}

before_count = len(matrix['v7_sku_optimizations'])
# Remove broken
matrix['v7_sku_optimizations'] = [e for e in matrix['v7_sku_optimizations'] if e.get('id') not in broken_ids]
# Renumber new
for e in matrix['v7_sku_optimizations']:
    if e.get('id') in new_entries_to_renumber:
        old_id = e['id']
        n = int(old_id.split('-')[-1])
        new_n = n - 5  # 46->41, 47->42, etc.
        e['id'] = f'v7-SKU-{new_n}'
        print(f'  Renumbered: {old_id} -> {e["id"]}')

# Remove broken PDP-11 (which was from first run, was for foil-stickers with the broken config)
# Actually, looking at the data, we only added PDP-12, not PDP-11 in the first run. The PDP-11 was the first run, then PDP-12 in second run. Both refer to foil-stickers.
# So we need to remove PDP-11 (first run, from broken script - but PDP didn't depend on products.ts)
# Actually, the PDP-11 from first run was a duplicate of PDP-12. Let me check.
broken_pdp_ids = {'v7-PDP-11'}
new_pdp_to_renumber = {'v7-PDP-12'}

before_pdp = len(matrix['v7_pdp_reviews'])
matrix['v7_pdp_reviews'] = [e for e in matrix['v7_pdp_reviews'] if e.get('id') not in broken_pdp_ids]
for e in matrix['v7_pdp_reviews']:
    if e.get('id') in new_pdp_to_renumber:
        old_id = e['id']
        n = int(old_id.split('-')[-1])
        new_n = n - 1  # 12->11
        e['id'] = f'v7-PDP-{new_n}'
        print(f'  Renumbered: {old_id} -> {e["id"]}')

# But wait - we also added 2 cron_sessions (one from broken run, one from clean). Remove the broken one.
# Identify: the first cron session has note mentioning "v7-SKU-41~45 + v7-PDP-11" - this is from broken run
# The second one has "v7-SKU-41~45 + v7-PDP-11" - same... hmm
# Let me check
print(f'\n  v7_cron_sessions count: {len(matrix.get("v7_cron_sessions", []))}')
for s in matrix.get('v7_cron_sessions', []):
    print(f'    {s.get("session_id", "?")} | {s.get("started_at", "?")} | {s.get("note", "")[:80]}')

# Keep the latest 2 (one from each run), or just deduplicate by date
sessions = matrix.get('v7_cron_sessions', [])
# Remove the first session if there are 2 today
today_sessions = [s for s in sessions if s.get('started_at', '').startswith('2026-08-01')]
if len(today_sessions) > 1:
    # Keep only the last one (which is the clean one)
    first_today = today_sessions[0]
    sessions = [s for s in sessions if s != first_today]
    matrix['v7_cron_sessions'] = sessions
    print(f'  Removed 1st 8/1 cron session (from broken run), kept clean run')

# Same for skip_log - remove first 8/1 entry if 2 exist
skip_log = matrix.get('v7_skip_log', [])
today_skips = [s for s in skip_log if s.get('date') == '2026-08-01']
if len(today_skips) > 1:
    first_today_skip = today_skips[0]
    skip_log = [s for s in skip_log if s != first_today_skip]
    matrix['v7_skip_log'] = skip_log
    print(f'  Removed 1st 8/1 skip log (from broken run), kept clean run')

# Update last_updated
matrix['last_updated'] = '2026-08-01T10:35:00+08:00'

# Write back
with open('.hermes/industry-keyword-matrix.json', 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f'\n  Final: v7_sku_optimizations={len(matrix["v7_sku_optimizations"])} v7_pdp_reviews={len(matrix["v7_pdp_reviews"])} v7_cron_sessions={len(matrix["v7_cron_sessions"])} v7_skip_log={len(matrix["v7_skip_log"])}')

# Show last 5 SKU
print(f'\n  Last 5 v7_sku_optimizations:')
for e in matrix['v7_sku_optimizations'][-5:]:
    print(f'    {e["id"]} | R{e.get("optimization_round",1)} | {e["slug"]}')

print(f'\n  Last v7_pdp_review:')
for e in matrix['v7_pdp_reviews'][-1:]:
    print(f'    {e["id"]} | {e["slug"]} | fixes={len(e.get("fixes_applied",[]))} pending={len(e.get("fixes_pending",[]))}')
