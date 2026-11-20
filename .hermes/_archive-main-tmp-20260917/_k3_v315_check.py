#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')
txt = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
pattern = re.compile(r"    featuredSnippet: '([^']*)'", re.MULTILINE)
matches = pattern.findall(txt)
# 找 books + flyers 全部 featuredSnippet
for m in matches:
    if '50' in m and ('本' in m or '冊' in m or 'copies' in m) and '8-64' in m:
        print('len:', len(m), '|', m[:300])
        print('---')
    if ('100 張' in m or '100枚' in m or '100 pcs' in m) and 'A5' in m:
        print('len:', len(m), '|', m[:300])
        print('---')
