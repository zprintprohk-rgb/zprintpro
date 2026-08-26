#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verify 8/1 changes."""
import re
import json

# Verify products.ts
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Check for encoding issues (BOM, size, CRLF)
bom = content[0] == 0xFF
print(f'BOM: {bom} (should be False)')
print(f'CRLF count: {content.count(chr(13) + chr(10))}')

for slug in ['security-stickers', 'fluorescent-stickers', 'thick-paper-flyers', 'gang-run-card-boxes', 'tuck-end-boxes']:
    sm = re.search(r"slug:\s*['\"]" + slug + r"['\"]", content)
    if not sm:
        print(f'  {slug}: NOT FOUND')
        continue
    start = sm.start()
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
    opt = re.search(r"optimizedAt:\s*['\"]([^'\"]*?)['\"]", block)
    rnd = re.search(r"optimizationRound:\s*(\d+)", block)
    desc = re.search(r"description:\s*['\"]([^'\"]*?)['\"]\s*,", block, re.DOTALL)
    desc_ind = '**適配行業**' in (desc.group(1) if desc else '')
    print(f'  {slug}: opt={opt.group(1) if opt else "?"} R={rnd.group(1) if rnd else "?"} desc_ind={desc_ind}')

# Verify matrix
with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)
print(f'\nMatrix:')
print(f'  v7_sku_optimizations: {len(m.get("v7_sku_optimizations", []))}')
print(f'  v7_pdp_reviews: {len(m.get("v7_pdp_reviews", []))}')
print(f'  v7_cron_sessions: {len(m.get("v7_cron_sessions", []))}')
print(f'  v7_skip_log: {len(m.get("v7_skip_log", []))}')
print(f'  k3_section6_skip_count: {m.get("k3_section6_skip_count")}')
print(f'  last_updated: {m.get("last_updated")}')

# Show last 5 SKU entries
print('\n  Last 5 v7_sku_optimizations:')
for e in m['v7_sku_optimizations'][-5:]:
    print(f'    {e["id"]} | {e.get("optimized_at","?")} | R{e.get("optimization_round",1)} | {e["slug"]}')

# Show last PDP entry
print('\n  Last v7_pdp_reviews:')
for e in m['v7_pdp_reviews'][-2:]:
    print(f'    {e["id"]} | {e.get("reviewed_at","?")} | {e["slug"]} | fixes={len(e.get("fixes_applied",[]))} pending={len(e.get("fixes_pending",[]))}')

# Check 5 dim structure
last_pdp = m['v7_pdp_reviews'][-1]
print(f'\n  Last PDP 5 dim:')
for k, v in last_pdp['5_dimensions'].items():
    print(f'    {k}: {v[:80]}...')
