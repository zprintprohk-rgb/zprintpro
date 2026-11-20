# -*- coding: utf-8 -*-
# SSoT 真值表: products.ts price_range/basePrice 三语 + price-tables 校准档 (双方法)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 方法1: products.ts
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
slugs = ['saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'graduation-yearbook',
         'textbooks', 'exercise-books', 'spiral-bound-books', 'a2-posters', 'a1-posters',
         'a5-flyers', 'a4-flyers', 'same-day-flyers', 'folded-leaflets', 'eco-friendly-flyers',
         'small-batch-stickers', 'roll-stickers', 'school-stickers', 'white-card-boxes', 'kraft-paper-box',
         'folding-boxes', 'rigid-boxes', 'mailer-boxes', 'kraft-paper-bags', 'white-card-bags',
         'gift-bags', 'eco-paper-bags', 'handle-bags', 'large-bags', 'red-packets', 'envelopes',
         'zine-printing', 'doujinshi-printing']
print('===== 方法1: products.ts =====')
for slug in slugs:
    m = re.search(r"slug: ['\"]" + re.escape(slug) + r"['\"][\s\S]*?name: '((?:[^'\\]|\\.)*)'", prod)
    if not m:
        print(f'{slug}: NOT FOUND in products.ts')
        continue
    i = m.start()
    seg = prod[i:i+2500]
    fs = {}
    for f in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity']:
        mm = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|\[[^\]]*\]|[0-9.]+)", seg)
        if mm:
            v = mm.group('v')
            fs[f] = v if v.startswith("'") else float(v)
    pr = fs.get('price_range', '?')
    bp = fs.get('basePrice', '?')
    bpe = fs.get('basePrice_en', '?')
    bpj = fs.get('basePrice_ja', '?')
    mq = fs.get('minQuantity', '?')
    # ja basePrice 常缺: 从 sku-seo-data 补? 这里只报 products.ts 原生
    print(f'{slug:28s} | range={pr} | bp={bp} en={bpe} ja={bpj} | minQ={mq}')

print()
print('===== 方法2: price-tables 校准档 (src=anchor/intuan/calibratedAt != 待校準) =====')
for fn in ['books.json', 'posters.json', 'flyers.json', 'stickers.json', 'boxes.json', 'bags.json', 'paper-bags.json', 'red-packets.json', 'envelopes.json']:
    try:
        pj = json.load(open(r'F:\zprintpro-nextjs\src\data\price-tables\\' + fn, encoding='utf-8'))
    except FileNotFoundError:
        print(f'{fn}: file not found')
        continue
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
        # 取校准档 (src 含 anchor/intuan 或 calibratedAt 有值)
        cal = [t for t in tiers if t.get('calibratedAt') or 'anchor' in str(t.get('src', '')) or 'intuan' in str(t.get('src', ''))]
        small = [t for t in tiers if t.get('qty', 0) <= 100]
        if cal:
            t0 = cal[0]
            print(f"  {label}: cal qty={t0.get('qty')} price={t0.get('price')} ppu={round(t0['price']/t0['qty'],3)} src={str(t0.get('src'))[:25]}")
        elif small:
            t0 = small[0]
            print(f"  {label}: (仅待校準) qty={t0.get('qty')} price={t0.get('price')} ppu={round(t0['price']/t0['qty'],3)}")
