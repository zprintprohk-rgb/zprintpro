# -*- coding: utf-8 -*-
# saddle-stitch / booklet / catalog desc price claims vs products.ts SSoT
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# SSoT from products.ts
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['saddle-stitch-booklets', 'perfect-bound-books', 'catalog-brochures', 'booklets']:
    m = re.search(r"slug: '" + slug + r"'.{0,1200}", prod, re.S)
    if m:
        seg = m.group(0)
        out = []
        for f in ['minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range', 'name', 'nameEn']:
            fm = re.search(re.escape(f) + r":\s*(\[[^\]]*\]|'((?:[^'\\]|\\.)*)'|[0-9.]+)", seg)
            if fm:
                out.append(f'{f}={fm.group(1)[:90]}')
        print('##', slug, '|', ' | '.join(out))
print()
# scan seo.ts + category-seo-content.ts + product-faqs.ts for booklet/catalog/saddle price claims
files = ['src/lib/seo.ts', 'src/data/category-seo-content.ts', 'src/data/product-faqs.ts']
price_re = re.compile(r'(HK\$|US\$|¥|\$)\s*[0-9][0-9,\.\-]*')
for fp in files:
    t = open(r'F:\zprintpro-nextjs\\' + fp, encoding='utf-8').read()
    for kw in ['saddle', 'booklet', 'brochure', 'catalog', '小冊子', '騎馬釘', '目錄', '册子', 'パンフレット', '中綴じ']:
        for m in re.finditer(kw, t, re.I):
            s = max(0, m.start()-40)
            ctx = t[s:m.end()+90].replace('\n', ' ')
            if price_re.search(ctx):
                # print context with its price
                pm = price_re.search(ctx)
                print(f'{fp} [{kw}] :: ...{ctx[:150]}...')
