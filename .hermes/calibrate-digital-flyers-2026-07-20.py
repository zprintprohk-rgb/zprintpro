# -*- coding: utf-8 -*-
"""
2026-07-20 P0-1 校准 v2: e-print 數碼宣傳單張价 × 0.95 → flyers.json 数码小批量档
数据源: https://www.e-print.com.hk/products_digital_brochure_booklet_leaflet_printing (2026-07-20 实抓)
user 2026-07-20 拍板: 数码印刷 50-300 張是宣传单主订单来源, 打得过 → 数码档也校准 anchor
e-print 数码价 (HKD): A4 雙面 100張$400 / 300張$750; A5 雙面 100張$132 / 300張$248
"""
import json, io

PATH = 'src/data/price-tables/flyers.json'
d = json.load(io.open(PATH, encoding='utf-8'))

# e-print 数码双面实价 (HKD)
DIGITAL = {
    'a5': {100: 132, 300: 248},
    'a4': {100: 400, 300: 750},
}

def r(x): return int(round(x))

changes = []
for p in d['products']:
    if p['sku'] == 'a5-flyers':
        for t in p['tiers']:
            if t['qty'] in DIGITAL['a5']:
                ep = DIGITAL['a5'][t['qty']]
                new = r(ep * 0.95)
                old = (t['price'], t['unit'])
                t['price'] = new; t['unit'] = round(new / t['qty'], 2)
                t['src'] = 'anchor-digital'
                t['calibratedAt'] = '2026-07-20'
                t['sourceRef'] = 'e-print.com.hk 數碼宣傳單張 A5 雙面 ×0.95'
                t['note'] = '数码印刷档 (50-300張主订单车道, user 2026-07-20)'
                changes.append(('a5-flyers', t['qty'], old, (new, t['unit'])))
    elif p['sku'] == 'a4-flyers':
        for t in p['tiers']:
            if t['qty'] in DIGITAL['a4']:
                ep = DIGITAL['a4'][t['qty']]
                new = r(ep * 0.95)
                old = (t['price'], t['unit'])
                t['price'] = new; t['unit'] = round(new / t['qty'], 2)
                t['src'] = 'anchor-digital'
                t['calibratedAt'] = '2026-07-20'
                t['sourceRef'] = 'e-print.com.hk 數碼宣傳單張 A4 雙面 ×0.95'
                t['note'] = '数码印刷档 (50-300張主订单车道, user 2026-07-20)'
                changes.append(('a4-flyers', t['qty'], old, (new, t['unit'])))
    elif p['sku'] == 'same-day-flyers':
        for t in p['tiers']:
            if t['qty'] in DIGITAL['a4']:
                # same-day 以 A4 数码双面为锚 (A5/A4 混合款, 取贵的 A4 保守定价)
                ep = DIGITAL['a4'][t['qty']]
                new = r(ep * 0.95)
                old = (t['price'], t['unit'])
                t['price'] = new; t['unit'] = round(new / t['qty'], 2)
                t['src'] = 'anchor-digital'
                t['calibratedAt'] = '2026-07-20'
                t['sourceRef'] = 'e-print.com.hk 數碼宣傳單張 A4 雙面 ×0.95 (急件以 A4 保守锚)'
                changes.append(('same-day-flyers', t['qty'], old, (new, t['unit'])))
            elif t['qty'] == 500:
                t['note'] = t.get('note', '') + ' 500張急件档待 e-print 特急页校准, 暂保持 modeled'

d['_meta']['updatedAt'] = '2026-07-20'
d['_meta']['note'] = (d['_meta'].get('note', '') +
    ' | 2026-07-20 v2: 数码档 (a5/a4 100/300 + same-day 100/300) e-print 数码价 ×0.95 → anchor-digital; '
    '50-300張数码主车道按 user 拍板放开校准.')
d['_meta']['references']['eprint_digital_flyer'] = (
    'https://www.e-print.com.hk/products_digital_brochure_booklet_leaflet_printing '
    '(2026-07-20 实抓: A4 雙面 100張$400/300張$750; A5 雙面 100張$132/300張$248)')

with io.open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('=== 数码档校准明细 (旧 → 新) ===')
for sku, q, old, new in changes:
    print(f'{sku} qty={q}: {old[0]} ({old[1]}/張) → {new[0]} ({new[1]}/張)')
print(f'共 {len(changes)} 档 → anchor-digital')
json.load(io.open(PATH, encoding='utf-8'))
print('JSON 有效 ✓')
