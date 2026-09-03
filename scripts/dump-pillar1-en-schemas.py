#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re
d = json.load(open('src/data/blog-data/en.json', encoding='utf-8'))
v = d['packaging-box-pricing-2026']
c = v['content']
# 找所有 JSON-LD 块
for m in re.finditer(r'<script type="application/ld\+json">\s*({[\s\S]*?})\s*</script>', c):
    try:
        o = json.loads(m.group(1))
        print('TYPE:', o.get('@type'), '| name:', o.get('name', '')[:50])
    except Exception as e:
        print('PARSE FAIL:', str(e)[:100])
