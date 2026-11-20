# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pt = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\books.json', encoding='utf-8'))
prods = pt.get('products', [])
print('products:', len(prods))
for p in prods:
    name = str(p.get('name', p.get('sku', '')))
    if any(k in name for k in ['saddle', '中綴', '骑', '騎', 'A5']):
        print('==', name[:60])
        # print configs/tiers with qty 500
        for cfg in p.get('configs', []):
            tiers = cfg.get('tiers', [])
            q500 = [t for t in tiers if t.get('qty') == 500]
            print('   cfg:', str(cfg.get('config', ''))[:60], '| 500-tier:', [(t.get('qty'), t.get('sell_hkd')) for t in q500])
