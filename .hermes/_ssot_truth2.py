# -*- coding: utf-8 -*-
# 方法2 修复: price-tables 校准档 (price or sell_hkd) + 查 NOT FOUND slug 真实命名
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for fn in ['books.json', 'posters.json', 'flyers.json', 'stickers.json', 'boxes.json', 'bags.json', 'red-packets.json', 'envelopes.json']:
    try:
        pj = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\\' + fn, encoding='utf-8'))
    except FileNotFoundError:
        print(f'{fn}: file not found'); continue
    print(f'--- {fn} ---')
    def find(o, path=''):
        if isinstance(o, dict):
            if 'tiers' in o and isinstance(o['tiers'], list):
                label = str(o.get('size') or o.get('label') or o.get('config') or o.get('name') or '')[:35]
                yield (path, label, o['tiers'])
            for k, v in o.items():
                yield from find(v, path + '.' + k)
        elif isinstance(o, list):
            for i, v in enumerate(o):
                yield from find(v, path + '[' + str(i) + ']')
    for path, label, tiers in find(pj):
        cal = [t for t in tiers if t.get('calibratedAt') or 'anchor' in str(t.get('src', '')) or 'intuan' in str(t.get('src', ''))]
        small = [t for t in tiers if t.get('qty', 0) <= 100]
        t0 = (cal or small or tiers)[0] if tiers else None
        if not t0:
            continue
        q = t0.get('qty')
        p = t0.get('price') if t0.get('price') is not None else t0.get('sell_hkd')
        if p is None:
            print(f"  {label}: no price field keys={list(t0.keys())[:8]}")
            continue
        src = str(t0.get('src'))[:25]
        tag = 'cal' if cal else '待校準'
        print(f"  {label}: [{tag}] qty={q} price={p} ppu={round(float(p)/q,3)} src={src}")

print()
print('===== products.ts 真实 slug 清单 (前 60) =====')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
slugs = re.findall(r"slug: ['\"]([^'\"]+)['\"]", prod)
for s in slugs[:60]:
    print(' ', s)
