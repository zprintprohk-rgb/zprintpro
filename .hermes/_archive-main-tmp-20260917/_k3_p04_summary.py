#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""P0-4/P0-5/P0-6 整改汇总脚本. K3 8/17 01:50 拍板, 落地 + 报告."""
import json
from collections import Counter, defaultdict

# Read DNA verify report
with open(r'.hermes\dna_full_v1.json', 'r', encoding='utf-8') as f:
    results = json.load(f)

print('=' * 80)
print('P0-4/P0-5/P0-6 整改汇总报告 (2026-08-17 01:50 K3 拍板)')
print('=' * 80)
print()
print(f'总候选评分: {len(results)} 张')
print()
print('PASS / REJECT / MARGINAL 分布:')
c = Counter(r['verdict'] for r in results)
for v, cnt in c.most_common():
    print(f'  {v}: {cnt}')
print()
avgs = [r['avg'] for r in results if r['avg'] is not None]
if avgs:
    print(f'Avg 分数: min={min(avgs):.2f} max={max(avgs):.2f} mean={sum(avgs)/len(avgs):.2f}')
print()
print('Best per SKU × View:')
groups = defaultdict(list)
for r in results:
    groups[(r['sku'], r['view'])].append(r)
for key in sorted(groups.keys()):
    rs = groups[key]
    best = max(rs, key=lambda x: x['avg'] or 0)
    cand_short = best['candidate'][:55]
    v5 = best.get('v5_scene', 'N/A')
    print(f'  {key[0]} {key[1]:10s}: best avg={best["avg"]} v5={v5} {best["verdict"]}')
    print(f'    {cand_short}')

# Write summary to file
summary_path = r'.hermes\k3_p04_summary.txt'
with open(summary_path, 'w', encoding='utf-8') as f:
    f.write('P0-4/P0-5/P0-6 整改汇总报告 (2026-08-17 01:50 K3 拍板)\n')
    f.write('=' * 80 + '\n\n')
    f.write(f'总候选评分: {len(results)} 张\n\n')
    f.write('PASS / REJECT / MARGINAL 分布:\n')
    for v, cnt in c.most_common():
        f.write(f'  {v}: {cnt}\n')
    f.write('\n')
    if avgs:
        f.write(f'Avg 分数: min={min(avgs):.2f} max={max(avgs):.2f} mean={sum(avgs)/len(avgs):.2f}\n\n')
    f.write('Best per SKU × View:\n')
    for key in sorted(groups.keys()):
        rs = groups[key]
        best = max(rs, key=lambda x: x['avg'] or 0)
        cand_short = best['candidate'][:60]
        v5 = best.get('v5_scene', 'N/A')
        f.write(f'  {key[0]} {key[1]:10s}: best avg={best["avg"]} v5={v5} {best["verdict"]}\n')
        f.write(f'    {cand_short}\n')
print(f'\nSummary written: {summary_path}')
