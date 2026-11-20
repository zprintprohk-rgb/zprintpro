# -*- coding: utf-8 -*-
import io, re, json
imp = json.load(io.open('.hermes/analysis/gsc-product-page-imps-28d.json', encoding='utf-8'))
ts = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
ts_slugs = re.findall(r'\n  "([a-z0-9-]+)": \{', ts)
pt = io.open('src/data/products.ts', encoding='utf-8').read()
pt_slugs = sorted(set(re.findall(r"slug: '([a-z0-9-]+)'", pt)))
print('ts seo keys:', len(ts_slugs), '| products slugs:', len(pt_slugs))
seo_not_in_products = [s for s in ts_slugs if s not in pt_slugs]
products_not_in_seo = [s for s in pt_slugs if s not in ts_slugs]
print('SEO 有而 products.ts 无 (孤儿SEO):', seo_not_in_products)
print('products.ts 有而 SEO 无:', products_not_in_seo)
zero = [s for s in ts_slugs if imp.get(s, [0,0])[0] == 0]
print()
print('28d 零曝光 SKU (%d):' % len(zero))
for s in zero:
    print('  ', s, imp.get(s))
print()
for s in ('fluorescent-stickers','fruit-food-label-stickers','removable-stickers','die-cut-stickers','small-batch-stickers','security-stickers','foil-stickers'):
    print('  ', s, '=', imp.get(s, 'ZERO'))
