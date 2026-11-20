# -*- coding: utf-8 -*-
import json
from collections import defaultdict

with open(r'F:\zprintpro-nextjs\.hermes\gsc-fresh-2026-08-21.json', 'r', encoding='utf-8') as f:
    gsc = json.load(f)

print('=== Top-level keys (正确) ===')
for k in gsc.keys():
    v = gsc[k]
    if isinstance(v, list):
        print(f'  {k}: {len(v)} items')
    else:
        print(f'  {k}: {type(v).__name__}')

print()
print('=== q_new (本周 query) 全部 + q_prev (上周 query) ===')
q_new = gsc.get('q_new', [])
q_prev = gsc.get('q_prev', [])
print(f'  q_new count: {len(q_new)}')
print(f'  q_prev count: {len(q_prev)}')

# Build a dict for prev lookup
prev_dict = {q['keys'][0]: q for q in q_prev}

# 合并: q_new 是本周, q_prev 是上周
# 显示本周 queries (按 imps 排序)
print()
print('=== 本周 q_new (8/14-8/18 5d) 全部 click 词 + top 30 by imps ===')
q_with_clicks_new = [q for q in q_new if q['clicks'] > 0]
q_with_clicks_new_sorted = sorted(q_with_clicks_new, key=lambda x: -x['clicks'])
print(f'  Total queries with clicks: {len(q_with_clicks_new)}')
total_new_clicks = sum(q['clicks'] for q in q_new)
total_new_imps = sum(q['impressions'] for q in q_new)
print(f'  q_new totals: clicks={total_new_clicks} imps={total_new_imps} avg_ctr={total_new_clicks/total_new_imps*100:.2f}%')
print()
print('  Queries with clicks (sorted by clicks desc):')
for q in q_with_clicks_new_sorted:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    print(f'    {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')

print()
print('=== top 30 q_new by imps (no-click included) ===')
q_new_sorted = sorted(q_new, key=lambda x: -x['impressions'])
for q in q_new_sorted[:30]:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    print(f'  {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')

# Week-over-week comparison
print()
print('=== Week-over-week 本周 vs 上周 ===')
total_prev_clicks = sum(q['clicks'] for q in q_prev)
total_prev_imps = sum(q['impressions'] for q in q_prev)
print(f'  本周 (q_new, 5d 8/14-8/18): clicks={total_new_clicks} imps={total_new_imps}')
print(f'  上周 (q_prev, 5d 8/9-8/13?): clicks={total_prev_clicks} imps={total_prev_imps}')
if total_prev_imps > 0:
    print(f'  Imps 环比: {(total_new_imps - total_prev_imps) / total_prev_imps * 100:+.2f}%')
if total_prev_clicks > 0:
    print(f'  Clicks 环比: {(total_new_clicks - total_prev_clicks) / total_prev_clicks * 100:+.2f}%')

# Compare same queries between weeks (new entries / lost)
new_set = {q['keys'][0] for q in q_new}
prev_set = {q['keys'][0] for q in q_prev}
new_only = new_set - prev_set
lost = prev_set - new_set
print(f'  本周新增 query (上周没): {len(new_only)}')
print(f'  上周消失 query (本周没): {len(lost)}')

# School keywords
print()
print('=== School keywords (5 核心词 + 派生) ===')
school_core_5 = ['練習冊', '教科書', '畢業紀念冊', 'exercise books', 'textbook printing']
school_extended = [
    'school exercise book', 'china catalog printing', 'graduation', 'yearbook',
    '學校', 'school printing', '教科書 印刷', '卒業', '卒園', 'school', 'catalog printing',
    'back to school', 'new semester', '開學', '新学期', '返校', 'stationery',
    '學期', 'term printing', 'curriculum', '留學'
]
print('  Core 5 词本周 (q_new):')
for sk in school_core_5:
    matches = [q for q in q_new if sk.lower() in q['keys'][0].lower() or q['keys'][0].lower() in sk.lower()]
    for q in matches:
        k = q['keys'][0]
        c = q['clicks']
        i = q['impressions']
        ctr = q['ctr']
        pos = q['position']
        print(f'    [{sk}] {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')

print()
print('  Extended school queries (P3 派生) q_new:')
school_q = []
for q in q_new:
    qk = q['keys'][0].lower()
    for sk in school_extended:
        if sk.lower() in qk or qk in sk.lower():
            school_q.append(q)
            break
school_q_sorted = sorted(school_q, key=lambda x: -x['impressions'])
school_total_clicks = 0
school_total_imps = 0
for q in school_q_sorted:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    school_total_clicks += c
    school_total_imps += i
    print(f'    {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')
print(f'  --- school total: {len(school_q)} queries, clicks={school_total_clicks} imps={school_total_imps} ---')

# Compare with q_prev school
print()
print('  Prev period (q_prev) school for comparison:')
prev_school = []
for q in q_prev:
    qk = q['keys'][0].lower()
    for sk in school_extended:
        if sk.lower() in qk or qk in sk.lower():
            prev_school.append(q)
            break
prev_school_clicks = sum(q['clicks'] for q in prev_school)
prev_school_imps = sum(q['impressions'] for q in prev_school)
print(f'  --- prev school: {len(prev_school)} queries, clicks={prev_school_clicks} imps={prev_school_imps} ---')
if prev_school_imps > 0:
    print(f'  School imps 环比: {(school_total_imps - prev_school_imps) / prev_school_imps * 100:+.2f}%')

# Country breakdown with prev if available
print()
print('=== Country breakdown (新数据维度!) ===')
country_data = gsc.get('country', [])
country_data_sorted = sorted(country_data, key=lambda x: -x['impressions'])
print(f'  Top 20 countries by imps:')
for c in country_data_sorted[:20]:
    k = c['keys'][0]
    ck = c['clicks']
    ci = c['impressions']
    ctr = c['ctr']
    pos = c['position']
    print(f'    {k}: clicks={ck} imps={ci} ctr={ctr*100:.2f}% pos={pos:.1f}')

# 4 markets focus
print()
print('=== 4 markets focus (hkg + usa + jpn + other) ===')
hkg = next((c for c in country_data if c['keys'][0] == 'hkg'), None)
usa = next((c for c in country_data if c['keys'][0] == 'usa'), None)
jpn = next((c for c in country_data if c['keys'][0] == 'jpn'), None)
other_clicks = sum(c['clicks'] for c in country_data if c['keys'][0] not in ['hkg', 'usa', 'jpn', 'chn', 'mac', 'twn'])
other_imps = sum(c['impressions'] for c in country_data if c['keys'][0] not in ['hkg', 'usa', 'jpn', 'chn', 'mac', 'twn'])
print(f'  hkg: clicks={hkg["clicks"] if hkg else 0} imps={hkg["impressions"] if hkg else 0}')
print(f'  usa: clicks={usa["clicks"] if usa else 0} imps={usa["impressions"] if usa else 0}')
print(f'  jpn: clicks={jpn["clicks"] if jpn else 0} imps={jpn["impressions"] if jpn else 0}')
print(f'  other (non-hkg/usa/jpn/chn/mac/twn): clicks={other_clicks} imps={other_imps}')
