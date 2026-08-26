# -*- coding: utf-8 -*-
"""
2026-07-20 P0-1 校准 v3: e-print 柯式騎馬釘書刊(全書80g書紙·黑白) × 0.90 → books.json exercise-books
数据源: https://www.e-print.com.hk/products_books_printing_stitched_binding_color (2026-07-20 实抓页面固定价表)
校簿标准配置: A5 直度 32PP 全書80g書紙 黑白 骑马钉 (练习簿典型配置)
e-print 实价 (黑白列): 100本$992 / 500本$1,503 / 1000本$2,289 / 2000本$3,032 / 3000本$3,516 / 5000本$4,791
策略: 画册/书刊 = e-print × 0.90 (user 2026-07-17 拍板)
"""
import json, io

PATH = 'src/data/price-tables/books.json'
d = json.load(io.open(PATH, encoding='utf-8'))

EPRINT_EXBOOK_A5_32PP_MONO = {100: 992, 500: 1503, 1000: 2289, 2000: 3032, 3000: 3516, 5000: 4791}

def r(x): return int(round(x))

changes = []
for p in d['products']:
    if p['sku'] == 'exercise-books':
        # 明确配置 (原 config 泛, 校准锚定 A5 32PP 黑白书纸骑马钉)
        p['config'] = {
            'size': 'A5 (148×210mm)',
            'pages': '32PP (16张双面)',
            'paper': '全書 80g 書紙',
            'print': '黑白 (单色) 内文',
            'binding': '骑马钉',
            'note': '校园练习簿标准配置; 其他 P 数/彩色封面按 e-print 表线性外推或人工报'
        }
        new_tiers = []
        for q in [500, 1000, 2000, 3000, 5000]:
            ep = EPRINT_EXBOOK_A5_32PP_MONO[q]
            new = r(ep * 0.90)
            new_tiers.append({
                'qty': q,
                'price': new,
                'unit': round(new / q, 2),
                'src': 'anchor',
                'calibratedAt': '2026-07-20',
                'sourceRef': 'e-print.com.hk 柯式騎馬釘書刊 A5 32PP 全書80g書紙黑白 ×0.90'
            })
            changes.append(('exercise-books', q, new))
        p['tiers'] = new_tiers

d['_meta']['updatedAt'] = '2026-07-20'
d['_meta']['note'] = (d['_meta'].get('note', '') +
    ' | 2026-07-20 v3: exercise-books 全档 e-print 柯式骑马钉书刊实价(A5 32PP 全書80g書紙黑白) ×0.90 → anchor, '
    '新增 2000/5000 档, 校园季车道就绪.')
d['_meta']['references']['eprint_exercise_book'] = (
    'https://www.e-print.com.hk/products_books_printing_stitched_binding_color '
    '(2026-07-20 实抓 A5 直度全書同一紙質表·黑白列: 100本$992/500本$1,503/1000本$2,289/2000本$3,032/3000本$3,516/5000本$4,791)')

with io.open(PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('=== exercise-books 校准明细 (qty: price / unit) ===')
for sku, q, new in changes:
    print(f'{sku} qty={q}: HK${new} ({round(new/q,2)}/本)')
json.load(io.open(PATH, encoding='utf-8'))
print('JSON 有效 ✓')
