# -*- coding: utf-8 -*-
"""dump print-spec 精确数据: H2/H3 原始串 + 内链 + title/metaDescription/dateModified"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

slug = 'print-specifications-reference-guide-2026'
for loc in ['en', 'ja', 'zh-hk']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    e = d[slug]
    print('===== %s =====' % loc)
    print('title:', e.get('title'))
    print('metaDescription:', (e.get('metaDescription') or '')[:110])
    print('dateModified:', e.get('dateModified'), '| lastUpdated:', e.get('lastUpdated'))
    c = e['content']
    for m in re.finditer(r'<(h2|h3)[^>]*>([\s\S]*?)</\1>', c):
        print('  RAW <%s>: %s' % (m.group(1), m.group(2)))
    print('--- links ---')
    for u, t in re.findall(r'href="(/[^"]+)"[^>]*>([^<]+)</a>', c):
        print('  %s | %s' % (u, t))
