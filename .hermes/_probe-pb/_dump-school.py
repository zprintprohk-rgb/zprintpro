# -*- coding: utf-8 -*-
"""school-exercise 深度分析: 3 locale 结构 + 首段 + 表格/FAQ/链接 + EEAT 现状"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

slug = 'school-exercise-book-printing-guide'
for loc in ['en', 'ja', 'zh-hk']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    e = d[slug]
    c = e['content']
    print('===== %s ===== len=%d fields=%s' % (loc, len(c), sorted(e.keys())))
    print('schemas:', e.get('schemas'), '| excerpt_len:', len(e.get('excerpt') or ''), '| lastUpdated:', e.get('lastUpdated'))
    print('tables:', c.count('<table'), '| links:', len(re.findall(r'href="/', c)), '| wa.me:', c.count('wa.me'), '| bg blocks:', len(re.findall(r'bg-(?:amber|blue|red|green|gray|orange|yellow)-50', c)))
    m = re.match(r'\s*(<p[^>]*>[\s\S]*?</p>)', c)
    print('first_p:', (re.sub(r'<[^>]+>', '', m.group(1))[:130] if m else 'N/A'))
    for mm in re.finditer(r'<(h2|h3)[^>]*>([\s\S]*?)</\1>', c):
        print('  <%s> %s' % (mm.group(1), re.sub(r'<[^>]+>', '', mm.group(2)).strip()))
    print('--- links ---')
    for u, t in re.findall(r'href="(/[^"]+)"[^>]*>([^<]+)</a>', c):
        print('  %s | %s' % (u, t))
