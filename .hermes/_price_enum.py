# -*- coding: utf-8 -*-
# enumerate ALL price claims for paper-bags + posters (seo.ts meta desc + category-seo-content.ts)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
cat = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()

price_re = re.compile(r'(HK\$|US\$|USD|¥|\$)\s*[0-9][0-9,\.]*')

def extract_block(text, anchor, size=9000):
    i = text.find(anchor)
    return text[i:i+size] if i >= 0 else ''

print('############ META DESC (seo.ts categorySeoData) ############')
for slug in ['paper-bags', 'posters']:
    i = seo.find(f"'{slug}': {{")
    if i < 0:
        i = seo.find(f'{slug}: {{')
    print(f'--- {slug} ---')
    seg = extract_block(seo, f'categorySeoData', 0)  # locate by slug anchor below
    # find within the dict literal; simpler: search each locale key nearby
    j = seo.find(f"'{slug}'", i if i >= 0 else 0)
    block = seo[j:j+4000]
    for loc in ["'zh-hk'", 'en', 'ja']:
        m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", block)
        if m:
            d = m.group(1)
            prices = price_re.findall(d)
            print(f'  [{loc}] ({len(d)}c) prices={prices} :: {d[:140]}')
    print()

print('############ CATEGORY CONTENT (category-seo-content.ts) ############')
for name, slug in [('paperBagsContent', 'paper-bags'), ('postersContent', 'posters')]:
    print(f'--- {slug} ---')
    seg = extract_block(cat, 'const ' + name, 22000)
    # price claims with context
    claims = []
    for m in price_re.finditer(seg):
        s = max(0, m.start()-80)
        claims.append(seg[s:m.end()+60].replace('\n', ' '))
    seen = set()
    for c in claims:
        key = c[:100]
        if key in seen: continue
        seen.add(key)
    print(f'  total price-claim contexts (unique): {len(seen)}')
    for c in list(seen)[:24]:
        print('   ·', c[:150])
    print()
