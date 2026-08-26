#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Check poster-buying-guide coverage + blog-data JSON structure + Q-006 example."""
import os, re, json

os.chdir(r'F:\zprintpro-nextjs')

# 1) buying-guides.ts poster-buying-guide
bg = open('src/data/buying-guides.ts', encoding='utf-8').read()
idx = bg.find("'poster-buying-guide'")
print('=== poster-buying-guide in buying-guides.ts ===')
if idx >= 0:
    print(bg[idx:idx+1500])
else:
    print('not found')

# 2) blog-data JSON structure
for loc in ['zh-hk', 'en', 'ja']:
    p = f'src/data/blog-data/{loc}.json'
    d = json.load(open(p, encoding='utf-8'))
    keys = list(d.keys())
    print(f'\n=== blog-data/{loc}.json: {len(keys)} entries ===')
    # check poster-size-guide + Q-006 example
    for k in ['poster-size-guide', 'tea-beverage-gift-box-printing-guide']:
        if k in d:
            e = d[k]
            print(f'--- {k}: keys={list(e.keys()) if isinstance(e,dict) else type(e)}')
            if isinstance(e, dict):
                for kk, vv in e.items():
                    s = str(vv)
                    print(f'    {kk}: {s[:150]}')
