# -*- coding: utf-8 -*-
"""analyze-gsc-7d-deep-2026-07-31.py"""
import io
import sys
import csv
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

Z1 = r'F:\zprintpro-nextjs\.hermes\gsc-7d-tmp\zprintpro.com-Performance-on-Search-2026-07-31'
Z2 = r'F:\zprintpro-nextjs\.hermes\gsc-7d-tmp\zip2\zprintpro.com-Performance-on-Search-2026-07-31 (1)'

def read_csv(path):
    with io.open(path, 'r', encoding='utf-8-sig') as f:
        return list(csv.reader(f))

# ZIP 1 (7 天) 找 cmyk/rgb/en 关键词
print('=== ZIP 1 7 天 找 cmyk/rgb ===')
rows = read_csv(f'{Z1}\\查询数.csv')
for r in rows:
    if r and any(kw in r[0].lower() for kw in ['cmyk', 'rgb', 'color']):
        print(f'  {r}')

# ZIP 2 (28 天) 找 cmyk/rgb/en
print('\n=== ZIP 2 28 天 找 cmyk/rgb ===')
rows = read_csv(f'{Z2}\\查询数.csv')
for r in rows:
    if r and any(kw in r[0].lower() for kw in ['cmyk', 'rgb', 'color']):
        print(f'  {r}')

# ZIP 1 全部 queries 完整 (按展示)
print('\n=== ZIP 1 7 天 全部 queries (按展示, top 50) ===')
rows = read_csv(f'{Z1}\\查询数.csv')
data = rows[1:]
# sort by impressions
def imps(r):
    try: return int(r[2])
    except: return 0
for r in sorted(data, key=imps, reverse=True)[:50]:
    print(f'  {r[0]:40s} click={r[1]:>4s} imp={r[2]:>4s} ctr={r[3]:>7s} rank={r[4]:>6s}')

# ZIP 1 全部 pages (按展示)
print('\n=== ZIP 1 7 天 全部 pages (按展示, top 30) ===')
rows = read_csv(f'{Z1}\\网页.csv')
data = rows[1:]
for r in sorted(data, key=imps, reverse=True)[:30]:
    url = r[0][:80]
    print(f'  {url:80s} click={r[1]:>4s} imp={r[2]:>4s} ctr={r[3]:>7s} rank={r[4]:>6s}')
