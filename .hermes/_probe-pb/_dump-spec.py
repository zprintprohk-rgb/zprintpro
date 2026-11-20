# -*- coding: utf-8 -*-
"""dump print-specifications 结构: 全部 H2/H3 + 首段 + 字段 + 表格/内链数"""
import json, io, re, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

slug = 'print-specifications-reference-guide-2026'
for loc in ['en', 'ja', 'zh-hk']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    e = d[slug]
    c = e['content']
    print('===== %s ===== len=%d fields=%s' % (loc, len(c), sorted(e.keys())))
    print('schemas:', e.get('schemas'), '| excerpt_len:', len(e.get('excerpt') or ''))
    print('tables:', c.count('<table'), '| links:', len(re.findall(r'href="/', c)), '| wa.me:', c.count('wa.me'))
    print('first_p:', re.sub(r'<[^>]+>', '', re.match(r'\s*(<p[^>]*>[\s\S]*?</p>)', c).group(1))[:100] if re.match(r'\s*(<p[^>]*>[\s\S]*?</p>)', c) else 'N/A')
    for m in re.finditer(r'<(h2|h3)[^>]*>([\s\S]*?)</\1>', c):
        t = re.sub(r'<[^>]+>', '', m.group(2)).strip()
        print('  <%s> %s' % (m.group(1), t))
