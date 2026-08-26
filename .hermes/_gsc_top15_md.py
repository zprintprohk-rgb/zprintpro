# -*- coding: utf-8 -*-
"""
GSC 分析 - 输出 UTF-8 markdown 报告
"""
import csv
from pathlib import Path

af = Path(r"F:\zprintpro-nextjs\GSC数据\2026-08-09\all_queries.csv")
out_md = Path(r"F:\zprintpro-nextjs\.hermes\_gsc_top15_report.md")

# CSV 是 GB18030 编码 (GBK 超集), 用 errors='ignore' 跳过错误字节
rows = []
with open(af, 'r', encoding='gb18030', errors='ignore') as f:
    reader = csv.DictReader(f)
    for r in reader:
        try:
            q = r.get('Top queries', r.get('query', ''))
            if not q or q.startswith('"') or '"' in q[:5]:
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

rows.sort(key=lambda r: -r['impressions'])

out = []
out.append("# GSC 批 1 十五词候选 (2026-08-09 all_queries.csv)\n")
out.append(f"**总行数**: {len(rows)} (跳过 malformed)\n\n")

# Top 30 by impressions
out.append("## Top 30 by impressions\n\n")
out.append("| # | query | clicks | imp | CTR | pos |\n")
out.append("|---|-------|--------|-----|-----|-----|\n")
for i, r in enumerate(rows[:30], 1):
    out.append(f"| {i} | {r['query'][:50]} | {r['clicks']} | {r['impressions']} | {r['ctr']:.2f}% | {r['position']:.1f} |\n")
out.append("\n")

# 信封主题 (大信封 pos 2 撞车根因 K3 撞车根因期望)
out.append("## 信封/envelope 主题 (大信封 pos 2 第一优先 K3 撞车根因)\n\n")
envelope = [r for r in rows if '信封' in r['query'].lower() or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower()]
envelope.sort(key=lambda r: -r['impressions'])
out.append(f"**信封主题共**: {len(envelope)} 词\n\n")
out.append("| # | query | clicks | imp | CTR | pos |\n")
out.append("|---|-------|--------|-----|-----|-----|\n")
for i, r in enumerate(envelope, 1):
    out.append(f"| {i} | {r['query'][:50]} | {r['clicks']} | {r['impressions']} | {r['ctr']:.2f}% | {r['position']:.1f} |\n")
out.append("\n")

# pos 1-20 0 click 高 imps 候选
out.append("## pos 1-20 0 click 高 imps 候选 (撞车根因 = 机会词)\n\n")
candidates = [r for r in rows if r['position'] <= 20 and r['clicks'] == 0 and r['impressions'] >= 3]
candidates.sort(key=lambda r: -r['impressions'])
out.append(f"**候选共**: {len(candidates)} 词 (撞车根因 = 高 imps 0 click = title/meta 重写机会)\n\n")
out.append("| # | query | imp | pos |\n")
out.append("|---|-------|-----|-----|\n")
for i, r in enumerate(candidates[:30], 1):
    out.append(f"| {i} | {r['query'][:50]} | {r['impressions']} | {r['position']:.1f} |\n")
out.append("\n")

# 批 1 十五词 (撞车根因 = 大信封 pos 2 第一优先 + 14 词候选)
out.append("## 批 1 十五词撞车根因候选 (K3 撞车根因期望大信封 pos 2 第一优先)\n\n")
# 大信封 撞车根因 = 第 1 词
# 14 词候选: 主题相关 + 高 imps pos 1-20 0 click
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

# 排序: 信封/envelope 主题优先, 然后按 imps
batch1_envelope = [r for r in batch1_candidates if '信封' in r['query'].lower() or 'envelope' in r['query'].lower() or '封筒' in r['query'].lower()]
batch1_other = [r for r in batch1_candidates if r not in batch1_envelope]
batch1_envelope.sort(key=lambda r: -r['impressions'])
batch1_other.sort(key=lambda r: -r['impressions'])
batch1_final = batch1_envelope + batch1_other

out.append(f"**撞车根因候选共**: {len(batch1_final)} 词 (撞车根因 = 主题相关 + 高 imps pos 1-30 0 click)\n\n")
out.append("### 撞车根因 = 信封主题 (K3 撞车根因期望大信封 pos 2 第一优先)\n\n")
out.append("| # | query | imp | pos | 备注 |\n")
out.append("|---|-------|-----|-----|------|\n")
for i, r in enumerate(batch1_envelope, 1):
    note = "✅ 大信封 pos 2 撞车根因 K3 撞车根因期望第一优先" if r['query'] == '大信封' else ""
    out.append(f"| {i} | {r['query'][:50]} | {r['impressions']} | {r['position']:.1f} | {note} |\n")
out.append(f"\n### 撞车根因 = 其他主题 (14 词)\n\n")
out.append("| # | query | imp | pos | 主题 |\n")
out.append("|---|-------|-----|-----|------|\n")
for i, r in enumerate(batch1_other[:14], 1):
    topic = next((t for t in batch1_topics if t in r['query'].lower()), 'other')
    out.append(f"| {i} | {r['query'][:50]} | {r['impressions']} | {r['position']:.1f} | {topic} |\n")
out.append("\n")

# 15 词最终 (大信封 + 14 词其他)
out.append("## 15 词最终撞车根因 (K3 §6 P0 撞车根因期望大信封 pos 2 第一优先 + 14 词)\n\n")
out.append(f"**1. 大信封 (pos 2.21 / 24 imp / 0 click) — K3 撞车根因第一优先 ✅**\n\n")
out.append(f"**2-15. 14 词其他 (主题相关 + 高 imps pos 1-30 0 click)**\n\n")
final_15 = batch1_envelope[:1] + batch1_other[:14]
out.append("| # | query | imp | pos | 主题 | 撞车根因备注 |\n")
out.append("|---|-------|-----|-----|------|------|\n")
for i, r in enumerate(final_15, 1):
    topic = next((t for t in batch1_topics if t in r['query'].lower()), 'other')
    note = ""
    if r['query'] == '大信封':
        note = "K3 撞车根因期望第一优先 (pos 2 / 24 imp / 0 click)"
    elif 'envelope' in r['query'].lower() or '封筒' in r['query'].lower() or '信封' in r['query'].lower():
        note = "信封主题高 imps 0 click"
    out.append(f"| {i} | {r['query'][:50]} | {r['impressions']} | {r['position']:.1f} | {topic} | {note} |\n")
out.append("\n")

with open(out_md, 'w', encoding='utf-8', newline='\n') as f:
    f.writelines(out)

print(f"OK: {out_md} ({out_md.stat().st_size} bytes)")
print(f"15 词最终撞车根因 = 1 大信封 + 14 词其他")
