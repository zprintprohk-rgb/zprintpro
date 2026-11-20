# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pats = [r'HK\$10 起', r'\$3\.50', r'¥500', r'HK\$10 起/張']
files = ['src/lib/seo.ts', 'src/data/category-seo-content.ts', 'src/data/category-conversion-blocks.ts',
         'src/data/blog-data/zh-hk.json', 'src/data/blog-data/en.json', 'src/data/blog-data/ja.json',
         'src/data/product-faqs.ts']
for p in pats:
    print('====', p)
    for fp in files:
        try:
            t = open(fp, encoding='utf-8').read()
            for m in re.finditer(p, t):
                s = max(0, m.start()-60)
                print('  ', fp, '::', t[s:m.end()+50].replace('\n', ' ')[:120])
        except Exception:
            pass
    print()
