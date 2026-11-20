# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
try:
    pt = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\books.json', encoding='utf-8'))
except Exception as e:
    print('books.json read err:', e)
    pt = None
if pt:
    print('configs count:', len(pt.get('configs', [])))
    for cfg in pt.get('configs', []):
        name = cfg.get('config', '')
        if '中綴' in name or 'saddle' in name.lower() or 'A5' in name or 'A4' in name:
            tiers = cfg.get('tiers', [])
            q500 = [t for t in tiers if t.get('qty') == 500]
            print(' ', name[:50], '| tiers:', [(t['qty'], t.get('sell_hkd')) for t in tiers[:4]], '| 500:', [(t['qty'], t.get('sell_hkd')) for t in q500])
