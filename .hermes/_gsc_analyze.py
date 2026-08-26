# -*- coding: utf-8 -*-
"""
GSC 数据分析: 找 大信封 pos 2 + 批 1 十五词
- 解 GBK 编码 (PS 5.1 默认 ANSI)
- 优先用 all_queries.csv (UTF-8)
- 输出 Top 20 zh-hk queries by impressions
"""
import os
import csv
import glob
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs\GSC数据")

# 1. 优先 all_queries.csv (UTF-8)
af = ROOT / "all_queries.csv"
if af.exists():
    print(f"=== {af.name} (UTF-8) ===")
    rows = []
    with open(af, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for r in reader:
            try:
                rows.append({
                    'query': r.get('Top queries', r.get('query', '')),
                    'clicks': int(r.get('Clicks', r.get('clicks', 0))),
                    'impressions': int(r.get('Impressions', r.get('impressions', 0))),
                    'ctr': float(r.get('CTR', r.get('ctr', 0)).rstrip('%') if isinstance(r.get('CTR', r.get('ctr', 0)), str) else r.get('CTR', 0)),
                    'position': float(r.get('Position', r.get('position', 0))),
                })
            except (ValueError, KeyError) as e:
                continue
    # Top 20 by impressions
    rows.sort(key=lambda r: -r['impressions'])
    print(f"Total rows: {len(rows)}")
    print(f"Top 20 by impressions:")
    for i, r in enumerate(rows[:20], 1):
        print(f"  {i:2}. {r['query'][:40]:40} imp={r['impressions']:5} clk={r['clicks']:3} ctr={r['ctr']:5.2f}% pos={r['position']:5.1f}")
    # 大信封 pos 2 找
    print()
    print(f"=== 大信封 (信封 / envelope) 相关查询 ===")
    for r in rows:
        if '信封' in r['query'].lower() or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower():
            print(f"  {r['query']:40} imp={r['impressions']:5} clk={r['clicks']:3} ctr={r['ctr']:5.2f}% pos={r['position']:5.1f}")
    print()
    # pos 1-10 零点击词
    print(f"=== pos 1-10 零点击词 (撞车根因 = 机会词) ===")
    no_click_top = [r for r in rows if r['position'] <= 10 and r['clicks'] == 0 and r['impressions'] >= 5]
    no_click_top.sort(key=lambda r: r['position'])
    for r in no_click_top[:20]:
        print(f"  pos={r['position']:5.1f} imp={r['impressions']:5} {r['query'][:50]}")
    print()
    # pos 1-20 展示占比 ≥30% 的词
    print(f"=== pos 1-20 有点击词 (验收口径 §4 v9.4) ===")
    with_click = [r for r in rows if r['position'] <= 20 and r['clicks'] > 0 and r['impressions'] >= 3]
    with_click.sort(key=lambda r: -r['clicks'])
    for r in with_click[:20]:
        print(f"  pos={r['position']:5.1f} clk={r['clicks']:3} imp={r['impressions']:5} ctr={r['ctr']:5.2f}% {r['query'][:50]}")
    print()
    # striking 候选 (pos 11-30 高 imps 0 click)
    print(f"=== striking 候选 (pos 11-30 高 imps 0 click, K3 §6 轨 2) ===")
    striking = [r for r in rows if 11 <= r['position'] <= 30 and r['clicks'] == 0 and r['impressions'] >= 10]
    striking.sort(key=lambda r: -r['impressions'])
    for r in striking[:20]:
        print(f"  pos={r['position']:5.1f} imp={r['impressions']:5} {r['query'][:50]}")
