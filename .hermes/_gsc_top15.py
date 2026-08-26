# -*- coding: utf-8 -*-
"""
找 批 1 十五词 = 大信封 pos 2 第一优先 + 14 词候选
- 高 imps pos 1-30 0 click (撞车根因 = 机会词)
- zh-hk 流量为主 (zh-hk 撞车根因 = zprintpro 主营 香港印刷)
"""
import csv
from pathlib import Path

af = Path(r"F:\zprintpro-nextjs\GSC数据\2026-08-09\all_queries.csv")
rows = []
with open(af, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        try:
            q = r.get('Top queries', r.get('query', ''))
            if not q or q.startswith('"') or '"' in q[:5]:  # skip malformed
                continue
            rows.append({
                'query': q,
                'clicks': int(r['Clicks']),
                'impressions': int(r['Impressions']),
                'ctr': float(r['CTR'].rstrip('%') if isinstance(r['CTR'], str) else r['CTR']),
                'position': float(r['Position']),
            })
        except (ValueError, KeyError):
            continue

# Sort by impressions desc
rows.sort(key=lambda r: -r['impressions'])

# Top 30 by impressions
print("=== Top 30 by impressions ===")
for i, r in enumerate(rows[:30], 1):
    print(f"  {i:2}. imp={r['impressions']:5} clk={r['clicks']:3} ctr={r['ctr']:5.2f}% pos={r['position']:5.1f} {r['query'][:50]}")

print()
print("=== pos 1-20 0 click 高 imps 候选 (撞车根因 = 机会词) ===")
# pos 1-20 0 click 高 imps 候选
candidates = [r for r in rows if r['position'] <= 20 and r['clicks'] == 0 and r['impressions'] >= 3]
candidates.sort(key=lambda r: -r['impressions'])
for i, r in enumerate(candidates[:20], 1):
    print(f"  {i:2}. imp={r['impressions']:4} pos={r['position']:5.1f} {r['query'][:50]}")

print()
print("=== 信封/包装/印刷/海报 主题 15 词 (K3 撞车根因期望大信封 pos 2 第一优先) ===")
# 主题过滤
themes = ['信封', 'envelope', '封筒', '包装', 'packaging', '印刷', 'printing', '海报', 'poster', '纸袋', 'paper bag', '贴纸', 'sticker', '畫冊', 'booklet', '宣傳單', 'flyer', '食品', 'food', '標籤', 'label', '月曆', 'calendar', '紙袋', 'bag']
theme_rows = [r for r in rows if any(t in r['query'].lower() for t in themes)]
# 排序: 信封/envelope 主题优先, 然后按 imps
envelope_first = [r for r in theme_rows if '信封' in r['query'].lower() or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower()]
others = [r for r in theme_rows if r not in envelope_first]
envelope_first.sort(key=lambda r: -r['impressions'])
others.sort(key=lambda r: -r['impressions'])
print(f"信封主题: {len(envelope_first)} 词")
for r in envelope_first:
    print(f"  imp={r['impressions']:4} pos={r['position']:5.1f} {r['query'][:50]}")
print(f"其他主题: {len(others)} 词")
for r in others[:20]:
    print(f"  imp={r['impressions']:4} pos={r['position']:5.1f} {r['query'][:50]}")
