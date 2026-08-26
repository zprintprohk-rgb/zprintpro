# -*- coding: utf-8 -*-
"""
2026-07-20 P0-1 校准: e-print.com.hk 柯式宣傳單張公开价 × 0.95 → flyers.json
数据源: https://www.e-print.com.hk/products_brochure_booklet_leaflet_printing (抓取于 2026-07-20)
策略: user 2026-07-17 拍板 单张 = e-print × 0.95, 锚币种 HKD (e-print 价即 HKD, 无汇率换算)
注意: 157g 哑粉纸 e-print 官方说明 "價格請參照 157g 光粉紙價目"
100-300 张数码甜点档不硬拼 (README 红线), 保持 modeled
"""
import json, io

PATH = 'src/data/price-tables/flyers.json'
d = json.load(io.open(PATH, encoding='utf-8'))

def r(x):
    return int(round(x))

# e-print A5 157g 光粉/哑粉 (4C+0/4C+4C 同价) — 完整价目
EPRINT_A5 = {600: 315, 1000: 365, 2000: 415, 4000: 635, 6000: 810, 8000: 930, 10000: 1030}
# e-print A4 157g 双面四色 (4C+4C)
EPRINT_A4_157_DUPLEX = {300: 500, 500: 550, 1000: 650, 2000: 940, 3000: 1190, 4000: 1480, 5000: 1650}

def interp(table, qty):
    ks = sorted(table)
    if qty in table:
        return table[qty]
    lo = max(k for k in ks if k < qty)
    hi = min(k for k in ks if k > qty)
    return table[lo] + (table[hi] - table[lo]) * (qty - lo) / (hi - lo)

changes = []
for p in d['products']:
    if p['sku'] == 'a5-flyers':
        for t in p['tiers']:
            q = t['qty']
            if q < 600:
                continue  # 数码甜点档保持 modeled
            eprice = interp(EPRINT_A5, q)
            new = r(eprice * 0.95)
            old = (t['price'], t['unit'])
            t['price'] = new
            t['unit'] = round(new / q, 2)
            t['src'] = 'anchor'
            t['calibratedAt'] = '2026-07-20'
            t['sourceRef'] = 'e-print.com.hk 柯式宣傳單張 A5 157g ×0.95'
            changes.append(('a5-flyers', q, old, (new, t['unit'])))
    elif p['sku'] == 'a4-flyers':
        for t in p['tiers']:
            q = t['qty']
            if q < 300:
                continue
            eprice = interp(EPRINT_A4_157_DUPLEX, q)
            new = r(eprice * 0.95)
            old = (t['price'], t['unit'])
            t['price'] = new
            t['unit'] = round(new / q, 2)
            t['src'] = 'anchor'
            t['calibratedAt'] = '2026-07-20'
            t['sourceRef'] = 'e-print.com.hk 柯式宣傳單張 A4 157g 4C+4C ×0.95'
            changes.append(('a4-flyers', q, old, (new, t['unit'])))

d['_meta']['updatedAt'] = '2026-07-20'
d['_meta']['note'] = (d['_meta'].get('note', '') +
    ' | 2026-07-20 校准: a5/a4 主档 e-print 柯式单张实抓 ×0.95 → anchor; 100-300 数码档保持 modeled(不硬拼).')
d['_meta']['references']['eprint_flyer'] = 'https://www.e-print.com.hk/products_brochure_booklet_leaflet_printing (2026-07-20 实抓: A5 157g 600張$315/1000張$365/2000張$415; A4 157g 4C+4C 300張$500/500張$550/1000張$650/2000張$940/5000張$1650)'

with io.open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('=== 校准明细 (旧 → 新) ===')
for sku, q, old, new in changes:
    print(f'{sku} qty={q}: {old[0]} ({old[1]}/張) → {new[0]} ({new[1]}/張)')
print(f'共 {len(changes)} 档 modeled → anchor')
# 验证 JSON 有效
json.load(io.open(PATH, encoding='utf-8'))
print('JSON 有效 ✓')
