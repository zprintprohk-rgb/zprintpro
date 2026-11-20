# -*- coding: utf-8 -*-
"""dump cost-baseline 3 locale 结构: H2/H3 清单 + 首段前 400 字 + CTA 计数 + 长度"""
import json, io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

slug = 'hong-kong-printing-cost-baseline-2026'
for loc in ['en', 'ja', 'zh-hk']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    e = d[slug]
    c = e['content']
    heads = re.findall(r'<(h2|h3)[^>]*>(.*?)</\1>', c, re.S)
    print('===== %s ===== len=%d fields=%s' % (loc, len(c), sorted(e.keys())))
    print('first_p_head:', c[:120].replace('\n', ' '))
    for tag, t in heads:
        t2 = re.sub(r'<[^>]+>', '', t).strip()
        print('  <%s> %s' % (tag, t2))
    print('wa.me count:', c.count('wa.me'))
    print('FAQ count(强Q):', len(re.findall(r'<p><strong>Q\d', c)))
