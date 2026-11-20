# -*- coding: utf-8 -*-
import io, json
t = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
i = t.index('"foil-red-packets":')
seg = t[i:i+2000]
print(seg[:1200])
