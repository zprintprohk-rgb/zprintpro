# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
lines = t.split('\n')
for i, l in enumerate(lines):
    if 'from $1.20' in l or '$1.20' in l:
        print(f'L{i+1}: {l.strip()[:160]}')
print()
# also scan other src files
import glob
for fp in ['src/data/category-seo-content.ts', 'src/data/product-faqs.ts', 'src/data/products.ts']:
    tt = open(r'F:\zprintpro-nextjs\\' + fp, encoding='utf-8').read()
    for m in re.finditer(r'\$1\.20', tt):
        s = max(0, m.start()-70)
        print(fp, '::', tt[s:m.end()+60].replace('\n', ' ')[:130])
