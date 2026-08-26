# -*- coding: utf-8 -*-
"""
GSC 分析 v2 - 用列位置, 不用 DictReader key (GB18030 部分字符仍解错)
"""
import csv
from pathlib import Path

af = Path(r"F:\zprintpro-nextjs\GSC数据\2026-08-09\all_queries.csv")
out_md = Path(r"F:\zprintpro-nextjs\.hermes\_gsc_top15_report.md")

rows = []
with open(af, 'r', encoding='gb18030', errors='ignore') as f:
    reader = csv.reader(f)
    header = next(reader)
    print(f"Headers: {header}")
    # 列位置: 0=query, 1=clicks, 2=impressions, 3=ctr, 4=position
    for r in reader:
        if len(r) < 5:
            continue
        try:
            q = r[0].strip()
            if not q or '"' in q[:5]:  # skip malformed
                continue
            clicks = int(r[1])
            impressions = int(r[2])
            ctr_str = r[3].rstrip('%')
            ctr = float(ctr_str)
            position = float(r[4])
            rows.append({
                'query': q,
                'clicks': clicks,
                'impressions': impressions,
                'ctr': ctr,
                'position': position,
            })
        except (ValueError, IndexError):
            continue

print(f"Total rows: {len(rows)}")

rows.sort(key=lambda r: -r['impressions'])

# Output markdown
out = []
out.append("# GSC 批 1 十五词候选 (2026-08-09 all_queries.csv)\n\n")
out.append(f"**总行数**: {len(rows)} 行 (UTF-8 GB18030 解码, 部分字符仍缺失, 不影响统计)\n\n")

# Top 30 by impressions
out.append("## Top 30 by impressions (撞车根因 = 撞车根因机会词)\n\n")
out.append("| # | query | clicks | imp | CTR | pos |\n")
out.append("|---|-------|--------|-----|-----|-----|\n")
for i, r in enumerate(rows[:30], 1):
    q = r['query'][:50]
    out.append(f"| {i} | {q} | {r['clicks']} | {r['impressions']} | {r['ctr']:.2f}% | {r['position']:.1f} |\n")
out.append("\n")

# 信封主题
out.append("## 信封/envelope 主题 (K3 撞车根因期望大信封 pos 2 第一优先)\n\n")
envelope = [r for r in rows if '信封' in r['query'] or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower()]
envelope.sort(key=lambda r: -r['impressions'])
out.append(f"**信封主题共**: {len(envelope)} 词\n\n")
out.append("| # | query | clicks | imp | CTR | pos |\n")
out.append("|---|-------|--------|-----|-----|-----|\n")
for i, r in enumerate(envelope, 1):
    out.append(f"| {i} | {r['query'][:50]} | {r['clicks']} | {r['impressions']} | {r['ctr']:.2f}% | {r['position']:.1f} |\n")
out.append("\n")

# 15 词最终
out.append("## 15 词最终撞车根因 (K3 §6 P0 撞车根因期望大信封 pos 2 第一优先 + 14 词)\n\n")

# 排序: 信封/envelope 主题优先, 然后按 imps
batch1_topics = [
    '信封', 'envelope', '封筒',
    '海报', 'poster', 'plakat',
    '包装', 'packaging',
    '纸袋', 'paper bag',
    '贴纸', 'sticker',
    '畫冊', 'booklet',
    '宣傳單', 'flyer', 'leaflet',
    '食品', 'food',
    '標籤', 'label',
    '月曆', 'calendar',
    '印刷', 'printing',
]

# 15 词撞车根因 = 信封主题 (大信封 pos 2 第一优先) + 14 词其他 (主题相关 + 高 imps pos 1-30 0 click)
batch1_candidates = []
for r in rows:
    if r['clicks'] > 0:
        continue
    if r['impressions'] < 3:
        continue
    if r['position'] > 30:
        continue
    for t in batch1_topics:
        if t in r['query'].lower():
            batch1_candidates.append(r)
            break

batch1_envelope = [r for r in batch1_candidates if '信封' in r['query'] or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower()]
batch1_other = [r for r in batch1_candidates if r not in batch1_envelope]
batch1_envelope.sort(key=lambda r: -r['impressions'])
batch1_other.sort(key=lambda r: -r['impressions'])
batch1_final = batch1_envelope[:1] + batch1_other[:14]

out.append("| # | query | imp | pos | 主题 | 撞车根因备注 |\n")
out.append("|---|-------|-----|-----|------|------|\n")
for i, r in enumerate(batch1_final, 1):
    topic = next((t for t in batch1_topics if t in r['query'].lower()), 'other')
    note = ""
    if r['query'] == '大信封':
        note = "K3 撞车根因期望第一优先"
    out.append(f"| {i} | {r['query'][:50]} | {r['impressions']} | {r['position']:.1f} | {topic} | {note} |\n")
out.append("\n")

# 写文件
with open(out_md, 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(out)

print(f"OK: {out_md} ({out_md.stat().st_size} bytes)")
print(f"15 词最终: {len(batch1_final)} 词")
for i, r in enumerate(batch1_final, 1):
    print(f"  {i}. imp={r['impressions']:4} pos={r['position']:5.1f} {r['query'][:50]}")
