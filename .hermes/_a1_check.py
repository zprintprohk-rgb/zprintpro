# -*- coding: utf-8 -*-
# a1-posters full entry + HK$45 / HK$9 source in products.ts
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
m = re.search(r"slug: 'a1-posters'.{0,3000}", prod, re.S)
if m:
    print('=== a1-posters entry ===')
    print(m.group(0)[:2800])
print()
m2 = re.search(r"slug: 'a2-posters'.{0,2600}", prod, re.S)
if m2:
    print('=== a2-posters entry (price part) ===')
    seg = m2.group(0)
    i = seg.find('price_range')
    print(seg[max(0,i-600):i+900])
print()
for pat in [r'HK\$45', r'HK\$9', r'45 起', r'9 起']:
    hits = [m3 for m3 in re.finditer(pat, prod)]
    print(pat, 'hits:', len(hits))
    for m3 in hits[:3]:
        s = max(0, m3.start()-60)
        print('   ...', prod[s:m3.end()+40].replace('\n', ' ')[:120])
