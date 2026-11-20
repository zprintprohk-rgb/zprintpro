# -*- coding: utf-8 -*-
# hkg 进攻面落点页: posters 类目 zh title/desc + poster-size blog zh title + envelopes zh
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1. category-seo-content posters zh
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = t.find('const postersContent')
seg = t[i:i+2500]
m = re.search(r"'zh-hk':\s*\{(?P<b>[\s\S]*?)\n\s*\},\n", seg)
if m:
    b = m.group('b')
    for f in ['seoTitle', 'featuredSnippet']:
        mm = re.search(re.escape(f) + r":\s*'((?:[^'\\]|\\.)*)'", b)
        if mm:
            print(f'[posters zh {f}] {mm.group(1)[:180]}')

# 2. poster-size-guide zh title (blog-data)
for loc, fn in [('zh-hk', 'zh-hk.json'), ('ja', 'ja.json')]:
    d = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\\' + fn, encoding='utf-8'))
    for slug in ['poster-size-guide', 'poster-printing-guide', 'poster-printing-price-guide']:
        if slug in d:
            print(f'[{loc} {slug}] title: {d[slug].get("title", "")[:120]}')

# 3. envelopes zh (blog + category)
i = t.find('const envelopesContent')
if i > 0:
    seg = t[i:i+2500]
    m = re.search(r"'zh-hk':\s*\{(?P<b>[\s\S]*?)\n\s*\},\n", seg)
    if m:
        b = m.group('b')
        for f in ['seoTitle', 'featuredSnippet']:
            mm = re.search(re.escape(f) + r":\s*'((?:[^'\\]|\\.)*)'", b)
            if mm:
                print(f'[envelopes zh {f}] {mm.group(1)[:180]}')
d = json.load(open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', encoding='utf-8'))
for slug, e in d.items():
    if 'envelope' in slug or '信封' in str(e.get('title', '')):
        print(f'[zh blog {slug}] title: {e.get("title", "")[:110]}')
