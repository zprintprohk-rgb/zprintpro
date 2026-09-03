#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re
d = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
c = d['campus-education-printing-pillar-guide']['content']
hrefs = re.findall(r'href=["\']([^"\']+)["\']', c)
print('All hrefs:')
for h in set(hrefs):
    print('  ', h)
