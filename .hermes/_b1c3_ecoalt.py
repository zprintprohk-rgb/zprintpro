# -*- coding: utf-8 -*-
import io, json
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
dec = json.JSONDecoder()
i = t.index('"eco-flyers":')
blk = t[i:i + 90000]
fi = blk.index('"imageAlt":')
v, _ = dec.raw_decode(blk[fi+11:].lstrip())
print('ts alt:', json.dumps(v, ensure_ascii=False)[:300])
p = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
pi = p.index("slug: 'eco-flyers'")
seg = p[pi:pi + 90000]
for k in ('basePrice', 'basePrice_en', 'basePrice_ja', 'price_range', 'minQuantity'):
    import re
    m = re.search(k + ": '?([^,'\"]*)", seg)
    print(k, '=', m.group(1) if m else '?')
