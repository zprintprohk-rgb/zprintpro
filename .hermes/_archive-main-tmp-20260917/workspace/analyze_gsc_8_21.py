# -*- coding: utf-8 -*-
import json
from collections import defaultdict

with open(r'F:\zprintpro-nextjs\.hermes\gsc-fresh-2026-08-21.json', 'r', encoding='utf-8') as f:
    gsc = json.load(f)

print('=== Top-level keys ===')
for k in gsc.keys():
    v = gsc[k]
    if isinstance(v, list):
        print(f'  {k}: {len(v)} items')
    elif isinstance(v, dict):
        print(f'  {k}: dict with {len(v)} keys')
    else:
        print(f'  {k}: {type(v).__name__}')

print()
print('=== date_new (按日) ===')
total_clicks = 0
total_imps = 0
for d in gsc.get('date_new', []):
    k = d['keys'][0]
    c = d['clicks']
    i = d['impressions']
    ctr = d['ctr']
    pos = d['position']
    print(f'  {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')
    total_clicks += c
    total_imps += i
print(f'  TOTAL: clicks={total_clicks} imps={total_imps} avg_ctr={total_clicks/total_imps*100:.2f}%')

print()
print('=== country (按国家, top 15 by imps) ===')
country_data = gsc.get('country', [])
country_data_sorted = sorted(country_data, key=lambda x: -x['impressions'])
for c in country_data_sorted[:15]:
    k = c['keys'][0]
    ck = c['clicks']
    ci = c['impressions']
    ctr = c['ctr']
    pos = c['position']
    print(f'  {k}: clicks={ck} imps={ci} ctr={ctr*100:.2f}% pos={pos:.1f}')

print()
print('=== query 全部统计 (按 imps 排序, top 30) ===')
query_data = gsc.get('query', [])
print(f'  Total queries: {len(query_data)}')
query_data_sorted = sorted(query_data, key=lambda x: -x['impressions'])
total_q_clicks = 0
total_q_imps = 0
for q in query_data_sorted[:30]:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    total_q_clicks += c
    total_q_imps += i
    print(f'  {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')
print(f'  --- top30 sum: clicks={total_q_clicks} imps={total_q_imps} ---')

# All queries totals
all_q_clicks = sum(q['clicks'] for q in query_data)
all_q_imps = sum(q['impressions'] for q in query_data)
print(f'  --- ALL queries: clicks={all_q_clicks} imps={all_q_imps} avg_ctr={all_q_clicks/all_q_imps*100:.2f}% ---')

print()
print('=== query with clicks (按 clicks desc) ===')
q_with_clicks = [q for q in query_data if q['clicks'] > 0]
q_with_clicks_sorted = sorted(q_with_clicks, key=lambda x: (-x['clicks'], -x['impressions']))
for q in q_with_clicks_sorted:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    print(f'  {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')

print()
print('=== school keywords (P3 校园 5 词 + 派生) ===')
school_keywords = [
    '練習冊', '教科書', '畢業紀念冊', 'exercise books', 'textbook printing',
    'school exercise book', 'china catalog printing', 'graduation', 'yearbook',
    '學校', 'school printing', '教科書 印刷', '卒業', '卒園', 'school', 'catalog printing',
    'back to school', 'new semester', '開學', '新学期', '返校', 'stationery',
    '教科書 印刷', '學期', 'term printing', 'curriculum'
]
print('  Top imps matching school:')
matches = []
for q in query_data:
    qk = q['keys'][0]
    ql = qk.lower()
    for sk in school_keywords:
        if sk.lower() in ql or ql in sk.lower():
            matches.append(q)
            break
matches_sorted = sorted(matches, key=lambda x: -x['impressions'])
school_total_clicks = 0
school_total_imps = 0
for q in matches_sorted:
    k = q['keys'][0]
    c = q['clicks']
    i = q['impressions']
    ctr = q['ctr']
    pos = q['position']
    school_total_clicks += c
    school_total_imps += i
    print(f'  {k}: clicks={c} imps={i} ctr={ctr*100:.2f}% pos={pos:.1f}')
print(f'  --- school total: {len(matches)} queries, clicks={school_total_clicks} imps={school_total_imps} ---')
