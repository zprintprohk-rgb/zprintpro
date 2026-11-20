# -*- coding: utf-8 -*-
# dump category-seo-content.ts structure
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
print('file len:', len(t))
print('first 500:')
print(t[:500])
slugs = re.findall(r'slug:\s*[\'\"]([a-z0-9-]+)[\'\"]', t)
print('slug count:', len(slugs))
print('sample:', sorted(set(slugs))[:25])
for key in ['paper-bags', 'posters', 'paper_bags']:
    print(key, 'in file:', key in t)
