# -*- coding: utf-8 -*-
import json
from pathlib import Path

p = Path('F:/zprintpro-nextjs/.hermes/gsc-fresh-2026-08-21.json')
with p.open('r', encoding='utf-8') as f:
    data = json.load(f)

q_new = data['q_new']
q_prev = {r['keys'][0]: r for r in data['q_prev']}
date_new = data['date_new']
country = data['country']

# §4 v9.4 三件套
total_imps = sum(r['impressions'] for r in q_new)
total_clicks = sum(r['clicks'] for r in q_new)
total_queries = len(q_new)
queries_with_clicks = sum(1 for r in q_new if r['clicks'] > 0)

imps_pos_1_20 = sum(r['impressions'] for r in q_new if r['position'] <= 20)
pos_1_20_pct = imps_pos_1_20 / total_imps * 100

# striking 词: 上期 pos 11-20 + 本期 pos ≤10
striking_hits = []
for r in q_new:
    q = r['keys'][0]
    new_pos = r['position']
    if q in q_prev:
        old_pos = q_prev[q]['position']
        if 11 <= old_pos <= 20 and new_pos <= 10:
            striking_hits.append({
                'q': q, 'old': old_pos, 'new': new_pos,
                'clicks': r['clicks'], 'imps': r['impressions'], 'impressions': r['impressions']
            })

# striking 宽松版 (新增 query 直接进 ≤10 也算)
striking_hits_loose = []
new_query_imps = []
for r in q_new:
    q = r['keys'][0]
    if q not in q_prev and r['position'] <= 10:
        striking_hits_loose.append({
            'q': q, 'new': r['position'],
            'clicks': r['clicks'], 'imps': r['impressions'], 'impressions': r['impressions']
        })
    if q not in q_prev:
        new_query_imps.append((q, r['impressions']))

# 国家分层
country_main = sorted([c for c in country if c['impressions'] >= 30],
                     key=lambda x: -x['impressions'])[:10]
country_clicks = [c for c in country if c['clicks'] > 0]

# Top queries by imps
top_q = sorted(q_new, key=lambda x: -x['impressions'])[:20]
top_q_clk = sorted(q_new, key=lambda x: -x['clicks'])[:15]

# 与 141 baseline 28 词对比 (K3 §6 铁律)
with open('F:/zprintpro-nextjs/.hermes/gsc-141-baseline-2026-07-22.json', 'r', encoding='utf-8') as f:
    b141 = json.load(f)
b141_keys = set()
b141_list = []
if isinstance(b141, dict) and 'words' in b141:
    for w in b141['words']:
        b141_keys.add(w['q'])
        b141_list.append(w)
elif isinstance(b141, list):
    for r in b141:
        b141_keys.add(r.get('q', r.get('keys', [''])[0] if isinstance(r.get('keys'), list) else ''))
        b141_list.append(r)

q_new_set = {r['keys'][0] for r in q_new}
b141_matched = b141_keys & q_new_set
b141_with_clicks = []
for r in q_new:
    if r['keys'][0] in b141_keys and r['clicks'] > 0:
        b141_with_clicks.append(r)

print('=== §4 v9.4 三件套验收 (本期 8/14-8/18 5d, 文件命名沿用 8/21) ===')
print(f'  数据日期范围: {[d["keys"][0] for d in date_new]}')
print(f'  1. striking 词进首页数 (旧 pos 11-20 -> 新 pos <=10): {len(striking_hits)} (目标 >=5)')
print(f'  2. pos 1-20 展示占比: {pos_1_20_pct:.2f}% (目标 >=30%)')
print(f'  3. 有点击词数: {queries_with_clicks} (目标 >=12)')
print()
print(f'=== 总览 ===')
print(f'  query 数: {total_queries}, imps: {total_imps}, clicks: {total_clicks}, CTR: {total_clicks/total_imps*100:.2f}%')
print(f'  有点击词: {queries_with_clicks}/{total_queries} = {queries_with_clicks/total_queries*100:.1f}%')
print(f'  新 query 增量: {len(new_query_imps)}')
print()
print(f'=== striking 词命中 (严格, {len(striking_hits)} 词) ===')
for s in striking_hits[:20]:
    print(f'  {s["q"][:50]:50s}  pos {s["old"]:.1f} -> {s["new"]:.1f}  ({s["clicks"]} clk / {s["imps"]} imps)')
print()
print(f'=== striking 词命中 (宽松, 新词进 <=10, {len(striking_hits_loose)} 词) ===')
for s in striking_hits_loose[:20]:
    print(f'  {s["q"][:50]:50s}  pos {s["new"]:.1f}  ({s["clicks"]} clk / {s["imps"]} imps)')
print()
print(f'=== Top 20 queries (by impressions) ===')
for r in top_q:
    print(f'  {r["keys"][0][:50]:50s}  pos {r["position"]:5.1f}  {r["clicks"]:3d} clk / {r["impressions"]:4d} imps')
print()
print(f'=== Top 15 queries (by clicks) ===')
for r in top_q_clk:
    if r['clicks'] > 0:
        print(f'  {r["keys"][0][:50]:50s}  pos {r["position"]:5.1f}  {r["clicks"]:3d} clk / {r["impressions"]:4d} imps')
print()
print(f'=== 141 baseline 28 词匹配 ===')
print(f'  baseline 总词: {len(b141_keys)}')
print(f'  本期匹配: {len(b141_matched)}')
print(f'  有点击: {len(b141_with_clicks)}')
print()
print(f'=== Top 10 国家 (imps >= 30) ===')
for c in country_main:
    print(f'  {c["keys"][0]:8s}  imps {c["impressions"]:5d}  clicks {c["clicks"]:3d}  CTR {c["ctr"]*100:5.2f}%  pos {c["position"]:5.1f}')
print()
print(f'=== 国家有点击: {len(country_clicks)} ===')
for c in country_clicks:
    print(f'  {c["keys"][0]:8s}  imps {c["impressions"]:5d}  clicks {c["clicks"]:3d}  CTR {c["ctr"]*100:5.2f}%  pos {c["position"]:5.1f}')
