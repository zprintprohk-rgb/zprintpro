# -*- coding: utf-8 -*-
# P0-2 books en title $1.20->$1.84 (price truth overrides freeze; title-v5 guard will verify)
# P0-3 books zh featuredSnippet HK$14-57/本(500本) -> HK$6 起/本 (zh SSoT band floor)
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# P0-3 category content
P1 = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
t1 = open(P1, encoding='utf-8').read()
old3 = 'HK$14-57/本 (500 本)'
new3 = 'HK$6 起/本'
n = t1.count(old3)
print('books bulk claim count:', n)
assert n == 1
t1 = t1.replace(old3, new3)
open(P1, 'w', encoding='utf-8', newline='\n').write(t1)
print('category-seo-content patched')

# P0-2 books en title (seo.ts)
P2 = r'F:\zprintpro-nextjs\src\lib\seo.ts'
t2 = open(P2, encoding='utf-8').read()
old2 = "'en': 'Saddle Stitch Booklet Printing from $1.20 | 10 MOQ + Free Proof | ZprintPro'"
new2 = "'en': 'Saddle Stitch Booklet Printing from $1.84 | 10 MOQ + Free Proof | ZprintPro'"
n = t2.count(old2)
print('books en title count:', n)
assert n == 1
t2 = t2.replace(old2, new2)
open(P2, 'w', encoding='utf-8', newline='\n').write(t2)
print('seo.ts title patched')
