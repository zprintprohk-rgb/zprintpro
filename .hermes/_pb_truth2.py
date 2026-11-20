# -*- coding: utf-8 -*-
# verify paper-bags price truth across sources (double-method per 0.23.2)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 1. products.ts full paper-bag SKU entries
t = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['kraft-paper-bags', 'white-card-bags', 'eco-paper-bags', 'gift-bags', 'large-bags', 'handle-bags']:
    m = re.search(r"slug: '" + slug + r"'.{0,500}", t, re.S)
    if m:
        seg = m.group(0)
        # print name, minQuantity, basePrice, basePrice_en, basePrice_ja, price_range
        for f in ['name', 'minQuantity', 'basePrice', 'basePrice_en', 'basePrice_ja', 'price_range']:
            fm = re.search(re.escape(f) + r":\s*('(?:[^'\\]|\\.)*'|[0-9]+)", seg)
            if fm:
                print(slug, '|', f, '=', fm.group(1)[:60])
print()

# 2. blog paper-bag guide price mentions (zh-hk/en/ja)
for loc in ['zh-hk', 'en', 'ja']:
    try:
        d = json.load(open(rf'F:\zprintpro-nextjs\src\data\blog-data\{loc}.json', encoding='utf-8'))
        post = d.get('paper-bag-printing-guide')
        if post:
            s = json.dumps(post, ensure_ascii=False)
            nums = re.findall(r'[0-9][0-9,\.]*', s)
            hits = {}
            for n in ['1.5', '1.8', '3.5', '0.19', '0.23', '0.45', '22', '28', '55']:
                hits[n] = s.count(n)
            print(loc, 'blog paper-bag-printing-guide hits:', hits)
    except Exception as e:
        print(loc, 'blog err', e)
print()

# 3. category featuredSnippet strings (already known) - confirm exact numbers
t2 = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
i = t2.find('const paperBagsContent')
seg = t2[i:i+3000]
for m in re.finditer(r"featuredSnippet:\s*'((?:[^'\\]|\\.)*)'", seg):
    print('paperBags featuredSnippet:', m.group(1)[:300])
print()
