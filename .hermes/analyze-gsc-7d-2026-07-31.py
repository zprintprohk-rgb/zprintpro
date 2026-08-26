# -*- coding: utf-8 -*-
"""analyze-gsc-7d-2026-07-31.py"""
import io
import sys
import csv
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# zip 1 = 7 天数据
Z1 = r'F:\zprintpro-nextjs\.hermes\gsc-7d-tmp\zprintpro.com-Performance-on-Search-2026-07-31'
Z2 = r'F:\zprintpro-nextjs\.hermes\gsc-7d-tmp\zip2\zprintpro.com-Performance-on-Search-2026-07-31 (1)'

def read_csv(path):
    with io.open(path, 'r', encoding='utf-8-sig') as f:
        return list(csv.reader(f))

# 过滤器
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 过滤器 ===')
    print(read_csv(f'{path}\\过滤器.csv'))

# 图表
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 图表 ===')
    for row in read_csv(f'{path}\\图表.csv')[:20]:
        print(f'  {row}')

# 查询数 Top 20
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 查询数 Top 20 (按点击) ===')
    rows = read_csv(f'{path}\\查询数.csv')
    # header: 点击, 展示, CTR, 排名, 查询
    if not rows: continue
    print(f'  header: {rows[0]}')
    for r in rows[1:21]:
        print(f'  {r}')

# 网页 Top 20
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 网页 Top 20 (按点击) ===')
    rows = read_csv(f'{path}\\网页.csv')
    if not rows: continue
    print(f'  header: {rows[0]}')
    for r in rows[1:21]:
        print(f'  {r}')

# 国家 Top 10
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 国家 Top 10 (按点击) ===')
    rows = read_csv(f'{path}\\国家_地区.csv')
    if not rows: continue
    print(f'  header: {rows[0]}')
    for r in rows[1:11]:
        print(f'  {r}')

# 设备
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 设备 ===')
    rows = read_csv(f'{path}\\设备.csv')
    if not rows: continue
    for r in rows:
        print(f'  {r}')

# 搜索结果呈现
for label, path in [('ZIP 1', Z1), ('ZIP 2', Z2)]:
    print(f'\n=== {label} 搜索结果呈现 ===')
    rows = read_csv(f'{path}\\搜索结果呈现.csv')
    if not rows: continue
    for r in rows:
        print(f'  {r}')
