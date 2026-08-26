#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re

for locale in ['en', 'zh-hk', 'ja']:
    d = json.load(open(f'src/data/blog-data/{locale}.json', 'r', encoding='utf-8'))
    c = d['catalog-printing-china-supplier-guide']['content']
    # 找所有 9/4 位置 + 上下文
    print(f'\n=== {locale} ===')
    for m in re.finditer(r'9/4|目標|維持|cluster', c):
        ctx = c[max(0, m.start()-40):m.end()+40]
        print(f'  {m.group()}: ...{ctx}...')
