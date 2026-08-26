#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""查找剩余策略黑话泄漏位置"""
import json
import re
import sys

DATA_DIR = r'F:\zprintpro-nextjs\src\data\blog-data'
SLUG = 'catalog-printing-china-supplier-guide'

for locale in ['en', 'zh-hk', 'ja']:
    path = f'{DATA_DIR}/{locale}.json'
    with open(path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    c = d[SLUG]['content']
    sections = re.split(r'<h2[^>]*>', c)[1:]  # split 跳过导语
    print(f'\n=== {locale} ({len(sections)} sections) ===')
    for i, s in enumerate(sections, 1):
        title = re.match(r'^[^<]+', s)
        title = title.group(0).strip()[:60] if title else '?'
        cluster = len(re.findall(r'cluster', s, re.IGNORECASE))
        rank_94 = len(re.findall(r'9/4', s))
        goal_zh = len(re.findall(r'目標[:：]?|維持 top', s))
        simp_ja = len(re.findall(r'首页|实际|详细|资源', s))
        if cluster > 0 or rank_94 > 0 or goal_zh > 0 or simp_ja > 0:
            print(f'  Sec {i} [{title}]: cluster={cluster} 9/4={rank_94} goal={goal_zh} simp={simp_ja}')
