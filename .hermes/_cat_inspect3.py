# -*- coding: utf-8 -*-
# dump paperBagsContent + postersContent: featuredSnippet + locale structure (zh-hk/en/ja)
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
for name in ['paperBagsContent', 'postersContent']:
    i = t.find('const ' + name)
    print('#####', name, 'at', i)
    seg = t[i:i+7000]
    # per-locale featuredSnippet + key fields
    for loc in ['zh-hk', 'en', 'ja']:
        j = seg.find("'" + loc + "': {")
        print('  == locale', loc, 'at +' + str(j))
        if j < 0: continue
        sub = seg[j:j+2200]
        for m in re.finditer(r"(featuredSnippet|metaDescription|title|description)\s*:\s*'((?:[^'\\]|\\.)*)'", sub):
            print('     ', m.group(1), '=', m.group(2)[:130])
        print('     FAQ questions:', len(re.findall(r"q:\s*'", sub)))
    print()
