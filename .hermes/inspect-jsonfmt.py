#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Check blog-data JSON formatting + last entries."""
import os, json

os.chdir(r'F:\zprintpro-nextjs')

for loc in ['zh-hk', 'en', 'ja']:
    p = f'src/data/blog-data/{loc}.json'
    raw = open(p, encoding='utf-8').read()
    d = json.loads(raw)
    keys = list(d.keys())
    print(f'=== {loc}: {len(keys)} entries, last 3: {keys[-3:]}')
    # show raw tail 500 chars
    print('raw tail:', repr(raw[-400:]))
    print()
