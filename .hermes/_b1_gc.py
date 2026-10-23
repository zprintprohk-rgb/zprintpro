# -*- coding: utf-8 -*-
# B1: greeting-cards generic SKU full field extraction (wide window)
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
raw = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
i = raw.find("slug: 'greeting-cards'")
seg = raw[i:i+4000]
print(seg[:2400])
