# -*- coding: utf-8 -*-
import io, re
t = io.open('src/data/sku-seo-data.ts', encoding='utf-8').read()
pat = re.compile(r'"([a-z0-9-]+)": \{[\s\S]{0,6000}?"title": "([^"]*10個起 HK[^"]*)"')
for m in pat.finditer(t):
    print(m.group(1), '::', m.group(2)[:70])
