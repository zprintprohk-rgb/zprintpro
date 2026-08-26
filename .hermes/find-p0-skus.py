#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Find P0 SKUs that are not yet optimized in v7_sku_optimizations."""
import json
import re
import sys

with open('.hermes/industry-keyword-matrix.json', 'r', encoding='utf-8') as f:
    m = json.load(f)

v7 = m.get('v7_sku_optimizations', [])
optimized_slugs = set(e['slug'] for e in v7 if 'slug' in e)

# Find P0 SKUs from products.ts
p0_cats = ['stickers', 'flyers', 'packaging', 'paper-bags']
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    content = f.read()

product_blocks = re.split(r'(?=^\s*\{\s*$)', content, flags=re.MULTILINE)
p0_skus = []
for blk in product_blocks:
    cat_match = re.search(r"category:\s*['\"](\w[\w-]*)['\"]", blk)
    slug_match = re.search(r"slug:\s*['\"](\w[\w-]*)['\"]", blk)
    if not cat_match or not slug_match:
        continue
    cat = cat_match.group(1)
    slug = slug_match.group(1)
    if cat in p0_cats:
        p0_skus.append((slug, cat))

# Get optimization round per slug
opt_round = {}
for e in v7:
    sk = e.get('slug', '')
    r = e.get('optimization_round', e.get('optimizationRound', e.get('optimizedRound', 1)))
    if sk in opt_round and r > opt_round[sk]:
        opt_round[sk] = r
    elif sk not in opt_round:
        opt_round[sk] = r

# Check which P0 SKUs are NOT yet optimized
unopt = [(s, c) for s, c in p0_skus if s not in optimized_slugs]
print(f'P0 SKUs in products.ts: {len(p0_skus)}')
print(f'P0 SKUs NOT yet optimized: {len(unopt)}')
print('\n=== UNOPTIMIZED P0 SKUs (candidates for 8/1 optimization) ===')
for s, c in unopt:
    print(f'  - {s:<30} ({c})')

print('\n=== P0 SKUs already optimized (round) ===')
for s, c in p0_skus:
    if s in opt_round:
        print(f'  R{opt_round[s]} {s:<30} ({c})')

# Last 8 v7_sku_optimizations
print('\n=== last 8 v7_sku_optimizations ===')
for e in v7[-8:]:
    r = e.get('optimization_round', 1)
    sl = e.get('slug', '?')
    dt = e.get('optimized_at', e.get('optimizedAt', '?'))
    print(f'  v7-SKU-{e["id"]:>3} | {dt} | R{r} | {sl}')

# Last 5 v7_pdp_reviews
v7p = m.get('v7_pdp_reviews', [])
print(f'\n=== v7_pdp_reviews (total {len(v7p)}) ===')
print('First entry:', json.dumps(v7p[0], ensure_ascii=False)[:300] if v7p else 'EMPTY')
print()
for e in v7p[-5:]:
    print(f'  v7-PDP-{e["id"]:>3} | {e.get("reviewed_at", e.get("reviewedAt", "?"))} | {e.get("sku", e.get("slug", "?")):<30} | fixes={e.get("fixes_count", 0)} | pending={e.get("pending_count", 0)}')

# Cron sessions
cron_sessions = m.get('v7_cron_sessions', [])
print(f'\n=== v7_cron_sessions total {len(cron_sessions)} ===')
for s in cron_sessions[-3:]:
    print(f'  {s.get("session_id", "?")} | {s.get("cron_name", "?")} | {s.get("started_at", "?")}')

# Skip log
skip_log = m.get('v7_skip_log', [])
print(f'\n=== v7_skip_log total {len(skip_log)} ===')
for s in skip_log[-5:]:
    print(f'  {s.get("date", "?")} | {s.get("skip_type", "?")} | {(s.get("reason", "?") or "")[:80]}')

# matrix meta
print(f'\n=== matrix meta ===')
print(f'last_updated: {m.get("last_updated", "?")}')
print(f'queue_size: {m.get("queue_size", "?")}')
print(f'pending_in_queue: {m.get("pending_in_queue", "?")}')
print(f'k3_section6_skip_count: {m.get("k3_section6_skip_count", "?")}')
print(f'k3_section6_skip_count: {m.get("k3_section6_skip_count", "?")}')
