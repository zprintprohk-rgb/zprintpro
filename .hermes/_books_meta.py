# -*- coding: utf-8 -*-
# books categorySeoData desc block verbatim + booksContent price lines
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = seo.find("'books': {")
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
for loc in ["'zh-hk'", 'en', 'ja']:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", block)
    if m:
        s = m.group(1)
        print(f'[books {loc}] len={len(s)}')
        print('   ', s)
        print()
# books titles
ti = seo.find('titles:', i)
seg = seo[ti:ti+500]
print('=== books titles block ===')
print(seg[:500])
