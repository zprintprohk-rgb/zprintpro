# -*- coding: utf-8 -*-
# exact strings for en/ja poster tables + poster-size-guide all locales + flyer SSoT check
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
for loc in ['en', 'ja']:
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    c = d['poster-printing-guide']['content']
    for m in re.finditer(r'<table.*?</table>', c, re.S):
        print(f'===== {loc} TABLE =====')
        print(re.sub(r'\s+', ' ', m.group(0))[:1600])
        print()
    # price-bearing non-table segments
    for m in re.finditer(r'<p[^>]*>[^<]*[HKY$][0-9][^<]*</p>|<li[^>]*>[^<]*[HKY$][0-9][^<]*</li>', c):
        print(f'===== {loc} SEG =====')
        print(re.sub(r'\s+', ' ', m.group(0))[:500])
        print()
print('########## poster-size-guide price lines (3 locales) ##########')
for loc in ['zh-hk', 'en', 'ja']:
    d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
    p = d.get('poster-size-guide')
    if not p: print(loc, 'MISSING'); continue
    s = json.dumps(p, ensure_ascii=False)
    for m in re.finditer(r'(HK\$|US\$|¥|\$)\s*[0-9][0-9,\.\-]*', s):
        ctx = s[max(0, m.start()-60):m.end()+50].replace('\\n',' ').replace('\\"','"')
        print(f'{loc} :: ...{ctx[:130]}...')
print()
print('########## flyer SSoT check ##########')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for m in re.finditer(r"slug: '([^']*(flyer|a5)[^']*)'.{0,600}", prod, re.S):
    seg = m.group(0)
    fs = [f'{f}={fm.group(1)[:40]}' for f in ['minQuantity','basePrice','basePrice_en','basePrice_ja','price_range'] for fm in [re.search(re.escape(f)+r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)] if fm]
    print('##', m.group(1), '|', ' | '.join(fs))
