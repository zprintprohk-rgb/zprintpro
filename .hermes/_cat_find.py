# -*- coding: utf-8 -*-
# find const definitions referencing paperBags / posters
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for pat in [r'paperBags', r'paper-bags', r'paper_bags', r'PaperBags', r'postersContent', r'posters:']:
    for m in re.finditer(pat, t):
        s = max(0, m.start()-60)
        line = t[s:m.end()+100].replace('\n', ' ')
        if 'category' not in line:
            print(pat, '::', line[:160])
    print('---')
