# -*- coding: utf-8 -*-
import io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
pj = json.load(open(r'F:\zprintpro-nextjs\src\data\posters.json', encoding='utf-8'))
def walk(o, path=''):
    if isinstance(o, dict):
        for k, v in o.items():
            walk(v, f'{path}.{k}' if path else k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, f'{path}[{i}]')
    else:
        s = str(o)
        if 'A2' in s and ('tier' in path.lower() or 'price' in path.lower() or 'qty' in path.lower()):
            print(path, '=', s[:60])
print('=== keys with A2 + price/qty ===')
walk(pj)
print()
# find the A2 config tier arrays directly
def find_tiers(o, out, path=''):
    if isinstance(o, dict):
        if 'tiers' in o and isinstance(o['tiers'], list):
            lab = str(o.get('label') or o.get('config') or o.get('name') or '')[:40]
            if 'A2' in lab:
                out.append((lab, o['tiers']))
        for k, v in o.items():
            find_tiers(v, out, path + '.' + k)
    elif isinstance(o, list):
        for i, v in enumerate(o):
            find_tiers(v, out, f'{path}[{i}]')
out = []
find_tiers(pj, out)
for lab, tiers in out:
    print(f'=== A2 config: {lab} ===')
    for t in tiers:
        print('   qty', t.get('qty'), '| HKD', t.get('priceHKD'), '| ppu', round(t.get('priceHKD', 0)/t.get('qty', 1), 2))
print()
# also A1
out1 = []
find_tiers(pj, out1, )
for lab, tiers in out1:
    if 'A1' in lab:
        print(f'=== A1 config: {lab} ===')
        for t in tiers:
            print('   qty', t.get('qty'), '| HKD', t.get('priceHKD'), '| ppu', round(t.get('priceHKD', 0)/t.get('qty', 1), 2))
