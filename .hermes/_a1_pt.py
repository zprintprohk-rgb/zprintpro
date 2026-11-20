# -*- coding: utf-8 -*-
# verify A1 in price-tables + measure meta desc lengths
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pt = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\posters.json', encoding='utf-8'))
print('posters.json configs:')
for cfg in pt['configs']:
    name = cfg.get('config', '')
    if 'A1' in name or 'A2' in name:
        tiers = cfg.get('tiers', [])[:3]
        print(' ', name, '->', [(t['qty'], t['sell_hkd']) for t in tiers])
print()
seo = open(r'F:\zprintpro-nextjs\src\lib\seo.ts', encoding='utf-8').read()
i = seo.find("'posters': {")
# find descriptions block
j = seo.find('descriptions:', i)
sub = seo[j:j+1500]
for loc in ["'zh-hk'", 'en', 'ja']:
    m = re.search(re.escape(loc) + r":\s*'((?:[^'\\]|\\.)*)'", sub)
    if m:
        d = m.group(1)
        print(f'[{loc}] len={len(d)} :: {d[:80]}...')
