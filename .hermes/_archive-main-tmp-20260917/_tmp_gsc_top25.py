#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""找 GSC top 25 零点击词 (8/13 + 8/14 数据), 输出 slug / keyword 字段."""
import json, os, sys

ROOT = r'F:\zprintpro-nextjs'

# 优先 8/14 (最新 revenue-snapshot)
candidates = [
    os.path.join(ROOT, '.hermes', 'revenue-snapshot-2026-08-14.json'),
    os.path.join(ROOT, '.hermes', 'gsc-2026-08-13-structured.json'),
    os.path.join(ROOT, '.hermes', 'gsc-2026-08-13-raw-full.json'),
    os.path.join(ROOT, '.hermes', 'gsc-snapshot-2026-07-29.json'),
]

for path in candidates:
    if not os.path.exists(path):
        continue
    print(f'=== {os.path.basename(path)} ===')
    with open(path, encoding='utf-8') as f:
        data = json.load(f)
    # schema 探测
    if isinstance(data, dict):
        print('Top-level keys:', list(data.keys())[:10])
        for k in ['queries','rows','data','keywords','keywordData']:
            if k in data:
                queries = data[k]
                print(f'  found queries: {k}, count={len(queries)}')
                if queries and isinstance(queries[0], dict):
                    print(f'  row keys: {list(queries[0].keys())[:8]}')
                    rows = queries
                    break
        else:
            # 任意 dict list
            for k, v in data.items():
                if isinstance(v, list) and v and isinstance(v[0], dict):
                    print(f'  fallback: {k} (count={len(v)})')
                    rows = v
                    break
            else:
                continue
    else:
        rows = data
    # 排序
    def get_imp(r):
        for k in ['impressions','Impressions','imp','Impr']:
            if k in r: return r.get(k, 0)
        return 0
    def get_clicks(r):
        for k in ['clicks','Clicks']:
            if k in r: return r.get(k, 0)
        return 0
    def get_q(r):
        for k in ['query','keys','Keys','keyword','Keyword']:
            if k in r: return r.get(k, '')
        return ''
    def get_pos(r):
        for k in ['position','Pos']:
            if k in r: return r.get(k, 0)
        return 0
    sorted_r = sorted([r for r in rows if isinstance(r, dict)], key=get_imp, reverse=True)
    print(f'Top 30 by impressions (zero-click or high-imp first):')
    for i, r in enumerate(sorted_r[:30], 1):
        q = get_q(r)
        imps = get_imp(r)
        clk = get_clicks(r)
        pos = get_pos(r)
        zc = '★' if clk == 0 and imps > 0 else ' '
        print(f'  {i:2d}{zc} {q!r:55s} imps={imps:5d} clk={clk:2d} pos={pos:5.1f}')
    print()
