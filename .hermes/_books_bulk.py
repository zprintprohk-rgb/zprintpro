# -*- coding: utf-8 -*-
# books category featuredSnippet (bulk/wholesale) 3 locales + books en title current
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = t.find('booksContent')
print('booksContent at', i)
seg = t[i:i+9000]
# find featuredSnippet fields
for m in re.finditer(r"featuredSnippet:\s*'((?:[^'\\]|\\.)*)'", seg):
    print('FS:', m.group(1)[:260])
    print()
# find bulk/wholesale blocks
for m in re.finditer(r'(bulk|wholesale|批量|500 本|500冊|柯式)[^,。]{0,80}(HK\$|US\$|¥)[^,。]{0,80}', seg):
    s = max(0, m.start()-40)
    print('CTX:', seg[s:m.end()+60].replace('\n', ' ')[:180])
print()
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
print('books en title:', re.search(r"'en': '([^']*Saddle[^']*)'", seo).group(1))
