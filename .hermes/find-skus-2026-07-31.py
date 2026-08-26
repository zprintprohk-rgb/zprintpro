#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""find SKUs in products.ts + 7/30 already-optimized 5 slugs, 选 5 个新 P0 SKU."""
import re
import json
from collections import Counter

content = open('src/data/products.ts', encoding='utf-8').read()
# products.ts uses single-quote for slug field
slugs = re.findall(r"slug:\s*'([^']+)'", content)
unique_slugs = list(dict.fromkeys(slugs))
print(f"Total slugs in products.ts: {len(slugs)}")
print(f"Unique slugs: {len(unique_slugs)}")
print("First 20:", unique_slugs[:20])
print("Last 20:", unique_slugs[-20:])

# Category field
cats = re.findall(r"category:\s*'([^']+)'", content)
print(f"Total category fields: {len(cats)}")
print("Top categories:", dict(Counter(cats).most_common(15)))

# matrix
m = json.load(open('.hermes/industry-keyword-matrix.json', encoding='utf-8'))
done = set()
for s in m.get('v7_sku_optimizations', []):
    if 'slug' in s and 'optimized_at' in s and s['optimized_at'] >= '2026-07-29':
        done.add(s['slug'])
print(f"\n=== 7/29-7/30 already optimized (10): {sorted(done)} ===")

# 选 P0 类目 (stickers/flyers/packaging/paper-bags) 中 5 个未优化的
p0_cats = {'stickers', 'flyers', 'packaging', 'paper-bags', 'paper bags', 'paper-bag'}
# 但 products.ts 里 paper-bags 可能写成 'paper-bags' or 'paper_bags'
# 先看每个 SKU 对应 category
sku_cat = {}
# products.ts 的结构: 每个 SKU object 里 slug 和 category 可能顺序不固定
# 用更宽松的 regex: 找每个 SKU block, 然后找 slug + category
lines = content.split('\n')
i = 0
current_sku = None
current_cat = None
while i < len(lines):
    line = lines[i]
    m1 = re.search(r"slug:\s*'([^']+)'", line)
    if m1:
        current_sku = m1.group(1)
    m2 = re.search(r"category:\s*'([^']+)'", line)
    if m2 and current_sku:
        sku_cat[current_sku] = m2.group(1)
        current_sku = None  # reset
    i += 1

# P0 candidates (stickers/flyers/packaging/paper-bags) NOT in 7/29-7/30 done
candidates_p0 = []
for slug, cat in sku_cat.items():
    if slug in done:
        continue
    cat_norm = cat.lower().replace(' ', '-')
    if cat_norm in ('stickers', 'flyers', 'packaging', 'paper-bags', 'paper-bag', 'paper-bags'):
        candidates_p0.append((slug, cat))

print(f"\n=== P0 candidates (not in 7/29-7/30 done, cat in P0): {len(candidates_p0)} ===")
for s, c in candidates_p0[:20]:
    print(f"  {s} ({c})")

# 7/30 选了的: foil-stickers / eco-flyers / corrugated-boxes / gift-bags / premium-greeting-cards
# 7/29 选了的: transparent-stickers / double-sided-flyers / die-cut-stickers / white-card-bags / kraft-paper-packaging-box
# 7/26 选了的: a5-flyers / a1-posters / graduation-yearbook / embossed-red-packets / eco-paper-bags (7/27) - 不在 done 7/29-7/30
# 避开 7/29-7/30 10 个 + 7/27 5 个

done_27 = {'a5-flyers', 'a1-posters', 'graduation-yearbook', 'embossed-red-packets', 'eco-paper-bags'}
done_28 = {'a4-flyers', 'foil-stickers-old', 'gift-bags', 'magnetic-closure-gift-box', 'small-batch-stickers'}
# 7/26 实际 SKUs (从 7/27 report)
all_done = done | done_27 | done_28
# 7/26 + 7/25 + 更早 5 SKU 不知道,从 matrix.json 拿
for s in m.get('v7_sku_optimizations', []):
    if 'slug' in s:
        all_done.add(s['slug'])
print(f"\n=== ALL slugs already in matrix v7_sku_optimizations: {len(all_done)} ===")
print(sorted(all_done))

# 真正 P0 未优化候选
candidates_p0_fresh = [(s, c) for s, c in candidates_p0 if s not in all_done]
print(f"\n=== FRESH P0 candidates (not in matrix): {len(candidates_p0_fresh)} ===")
for s, c in candidates_p0_fresh[:15]:
    print(f"  {s} ({c})")
