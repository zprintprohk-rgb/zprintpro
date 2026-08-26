#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re

d = json.load(open('src/data/blog-data/en.json', 'r', encoding='utf-8'))
c = d['catalog-printing-china-supplier-guide']['content']
# 看所有 h2 段
sections = re.split(r'(<h2[^>]*>[^<]+</h2>)', c)
print('Sections:')
for i, s in enumerate(sections):
    if s.startswith('<h2'):
        title = re.search(r'>([^<]+)<', s).group(1)
        print(f'  [{i}] H2: {title[:60]}')
    else:
        # 找 9/4 位置
        m = re.search(r'9/4|cluster|目標|維持 top', s)
        if m:
            print(f'  [{i}] body has {m.group()} at offset {m.start()}')
