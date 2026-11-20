# -*- coding: utf-8 -*-
# 1) current posters descs (seo.ts) 2) ja 2時間/校正 scan across src
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = seo.find("'posters': {")
j = seo.find('descriptions:', i)
k = seo.find('{', j)
d = 1; p = k
while p < len(seo):
    c = seo[p]
    if c == '{': d += 1
    elif c == '}':
        d -= 1
        if d == 0: break
    p += 1
block = seo[k:p]
print('=== posters descriptions ===')
for loc in ["'zh-hk'", 'en', 'ja']:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", block)
    if m:
        s = m.group(1)
        print(f'[{loc}] len={len(s)}')
        print('   ', s)
        print()
print('=== ja 校正/打稿 hour scan ===')
pat = re.compile(r'(校正|打稿|デザイン校正|proof)[^。；;]{0,40}([0-9０-９]+)\s*(時間|小時|時間|h)')
files = ['src/lib/seo.ts', 'src/data/category-seo-content.ts', 'src/data/product-faqs.ts', 'src/data/blog-data/ja.json']
for fp in files:
    t = open(r'F:\zprintpro-nextjs\\' + fp, encoding='utf-8').read()
    for m in pat.finditer(t):
        s = max(0, m.start()-45)
        print(f'{fp} :: ...{t[s:m.end()+40].replace(chr(10)," ")[:150]}...')
