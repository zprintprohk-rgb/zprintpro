# -*- coding: utf-8 -*-
# inspect paperBagsContent / postersContent meta fields
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for name in ['paperBagsContent', 'postersContent']:
    i = t.find(name + ' = {')
    print('#####', name, 'at', i)
    if i < 0:
        print('  NOT FOUND')
        continue
    seg = t[i:i+9000]
    for m in re.finditer(r'(metaTitle|metaDescription|featuredSnippet|title|description)\s*:\s*[^\n]{0,150}', seg):
        line = m.group(0)
        print('  ', line[:150])
    print('  FAQ count:', seg.count('q:') + seg.count('question'), '| locale zh-hk/en/ja:', seg.count("'zh-hk'"), seg.count("'en'"), seg.count("'ja'"))
    print()
