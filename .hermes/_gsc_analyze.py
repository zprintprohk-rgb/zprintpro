# -*- coding: utf-8 -*-
"""分析：拐点定位 / 恢复系数 / 分站点趋势 / CTR-排名关系"""
import json, datetime as dt
from statistics import mean

S = json.load(open('.hermes/logs/gsc-series-20261024.json', encoding='utf-8'))
BASE = 585.2  # 固定基线（日均展示，历史断崖前）

def daily(site):
    return S[site]['daily']

def window(site, a, b):
    d = daily(site)
    ds = sorted(x for x in d if a <= x <= b)
    if not ds:
        return None
    i = sum(d[x]['imps'] for x in ds)
    c = sum(d[x]['clicks'] for x in ds)
    p = sum(d[x]['pos'] * d[x]['imps'] for x in ds) / i if i else 0
    return {'n': len(ds), 'imps': i, 'clicks': c, 'ctr': c / i * 100 if i else 0, 'pos': p, 'per_day': i / len(ds)}

print('=== 1) 30 天日序列（all，含 WoW）===')
d = daily('all')
ds = sorted(d)[-45:]
prev_w = None
for x in ds:
    r = d[x]
    print(f"{x}  imps={r['imps']:6.0f} clicks={r['clicks']:3.0f} pos={r['pos']:5.1f} coef={r['imps']/BASE*100:5.1f}%")

print('\n=== 2) 关键窗口对比（all）===')
W = [
    ('pre-cliff 9/01-9/14', '2026-09-01', '2026-09-14'),
    ('cliff 9/15-9/24', '2026-09-15', '2026-09-24'),
    ('recov-1 9/25-10/04', '2026-09-25', '2026-10-04'),
    ('recov-2 10/05-10/14', '2026-10-05', '2026-10-14'),
    ('last-7 10/14-10/20', '2026-10-14', '2026-10-20'),
]
for name, a, b in W:
    r = window('all', a, b)
    if r:
        print(f"{name:22s} n={r['n']:2d} imps/day={r['per_day']:6.1f} coef={r['per_day']/BASE*100:5.1f}% clicks={r['clicks']:4.0f} ctr={r['ctr']:4.2f}% pos={r['pos']:5.1f}")

print('\n=== 3) 分站点（近 28 天 vs 前 28 天）===')
for s in ['hk', 'jp', 'us']:
    a = window(s, '2026-09-23', '2026-10-20')
    b = window(s, '2026-08-26', '2026-09-22')
    if a and b:
        print(f"{s}: 近28 日均 {a['per_day']:6.1f} / 前28 {b['per_day']:6.1f} = {a['per_day']/b['per_day']*100:6.1f}% | CTR {a['ctr']:.2f}% vs {b['ctr']:.2f}% | pos {a['pos']:.1f} vs {b['pos']:.1f}")

print('\n=== 4) 10-16/17 拐点检查（CF 限速规则上线窗口）===')
for a, b, tag in [('2026-10-10', '2026-10-15', 'before'), ('2026-10-16', '2026-10-20', 'after')]:
    r = window('all', a, b)
    print(f"{tag}: {a}~{b} imps/day={r['per_day']:6.1f} ctr={r['ctr']:.2f}% pos={r['pos']:.1f}")

print('\n=== 5) 全期峰值/谷值 ===')
d2 = daily('all')
top = sorted(d2.items(), key=lambda kv: -kv[1]['imps'])[:5]
low = sorted(d2.items(), key=lambda kv: kv[1]['imps'])[:5]
print('peak:', [(x, int(v['imps'])) for x, v in top])
print('trough:', [(x, int(v['imps'])) for x, v in low])
