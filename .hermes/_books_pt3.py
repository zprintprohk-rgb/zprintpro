# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pt = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\books.json', encoding='utf-8'))
for p in pt.get('products', []):
    name = str(p.get('name', p.get('sku', '')))
    if 'saddle' in name:
        print(json.dumps(p, ensure_ascii=False)[:1800])
