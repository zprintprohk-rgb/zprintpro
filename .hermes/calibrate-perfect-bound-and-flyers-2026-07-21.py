# -*- coding: utf-8 -*-
"""
2026-07-21 P0-1 校准 v4: e-print 胶装书 A5 32PP + 急件 flyers 4档, ×0.90/0.95 → anchor

【数据源 1】 https://www.e-print.com.hk/products_books_printing_perfect_binding_color
            A5 直度彩色膠裝書刊 (封面210g/ 250g雙粉咭紙) 价表 內文80G書紙 tab
            4+32PP 行: 100本$1838/500本$2907/1000本$3168/2000本$3560/3000本$4769
                        /5000本$6290/10000本$9842 (250g 封面, 标准胶装书配置)
策略: 画册/书刊 = e-print × 0.90 (user 2026-07-17 拍板)

【数据源 2】 https://www.e-print.com.hk/products_Leaflet_Express_Service
            單張特急快印 (1小時即取) 价表 A4/A5 tabs
            A4 急件 100張 雙面 = $600 / 200張 雙面 = $750 (A4 急件 max 200 張)
            A5 急件 100張 雙面 = $173 / 200張 雙面 = $263 / 300張 雙面 = $503
                          / 400張 雙面 = $615 (A5 急件 max 400 張)
策略: 单张 = e-print × 0.95 (user 2026-07-17 拍板)

【红线: 抓不到真实价不许标 anchor】
- 急件 500 档 = e-print 急件 1小時不提供 (A4 max 200, A5 max 400) → 保持 modeled
- eco-flyers = e-print 无公开再生纸 flyers 页 → 保持 pending
"""
import json, io

BOOKS_PATH = 'src/data/price-tables/books.json'
FLYERS_PATH = 'src/data/price-tables/flyers.json'

# ===== 源数据 (2026-07-21 实抓) =====
# 胶装书 A5 直度 4+32PP 內文80G書紙 250g 封面
EPRINT_PB_A5_32PP_250G = {100: 1838, 500: 2907, 1000: 3168, 2000: 3560, 3000: 4769, 5000: 6290, 10000: 9842}

# 急件 1小時即取 A4 / A5 雙面 (第三个表格 = 128g 紙, 标准彩色)
EPRINT_EXPRESS_A4_DUPLEX = {100: 600, 200: 750}    # A4 急件 max 200 張
EPRINT_EXPRESS_A5_DUPLEX = {100: 173, 200: 263, 300: 503, 400: 615}  # A5 急件 max 400 張

def r(x): return int(round(x))

# ========== 1. books.json: perfect-bound-books A5 32PP ×0.90 ==========
d = json.load(io.open(BOOKS_PATH, encoding='utf-8'))
changes_books = []
for p in d['products']:
    if p['sku'] == 'perfect-bound-books':
        # 明确配置: A5 直度 4+32PP 內文80G書紙 250g 封面 (标准胶装书)
        p['config'] = {
            'size': 'A5 (148×210mm) 直度',
            'pages': '4+32PP (封面4P+内文32P, 内文16张双面)',
            'paper': '封面 250g 雙粉咭紙 / 內文 80g 書紙',
            'print': '彩色 (4C+4C)',
            'binding': '无线胶装 (PUR)',
            'note': '标准胶装画册/书刊配置; 适合 32PP 以上的 book/menu/产品手册'
        }
        new_tiers = []
        for q in sorted(EPRINT_PB_A5_32PP_250G.keys()):
            ep = EPRINT_PB_A5_32PP_250G[q]
            new = r(ep * 0.90)
            new_tiers.append({
                'qty': q,
                'price': new,
                'unit': round(new / q, 2),
                'src': 'anchor',
                'calibratedAt': '2026-07-21',
                'sourceRef': 'e-print.com.hk A5直度4+32PP內文80G書紙250g封面 ×0.90'
            })
            changes_books.append(('perfect-bound-books', q, new))
        p['tiers'] = new_tiers

d['_meta']['updatedAt'] = '2026-07-21'
d['_meta']['note'] = (d['_meta'].get('note', '') +
    ' | 2026-07-21 v4: perfect-bound-books 全档 pending→anchor, 配置 A5 32PP 4+32PP 內文80G書紙 250g 封面 ×0.90, '
    '7 档 (100/500/1000/2000/3000/5000/10000), 胶装书标准车道就绪.')
d['_meta']['references']['eprint_perfect_bound_a5'] = (
    'https://www.e-print.com.hk/products_books_printing_perfect_binding_color '
    '(2026-07-21 实抓 A5 直度 4+32PP 內文80G書紙 250g 封面: 100本$1838/500本$2907/1000本$3168'
    '/2000本$3560/3000本$4769/5000本$6290/10000本$9842)')

with io.open(BOOKS_PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
    f.write('\n')

# ========== 2. flyers.json: same-day-flyers 急件 ×0.95 + eco-flyers pending 文档 ==========
d2 = json.load(io.open(FLYERS_PATH, encoding='utf-8'))
changes_flyers = []
for p in d2['products']:
    if p['sku'] == 'same-day-flyers':
        # 急件 SKU 重写: A4 急件 100/200, A5 急件 100/200/300/400, 500 档保留 modeled
        p['config'] = {
            'size': 'A4 / A5 雙面',
            'paper': '128g 光/啞粉紙 (急件标准)',
            'print': '彩色 雙面',
            'rush': '1小時即取 (e-print 觀塘門市/工場取貨)',
            'note': 'e-print 急件 1小時上限: A4 max 200 張 / A5 max 400 張; 500 張 急件 e-print 不提供'
        }
        new_tiers = []
        # A4 急件 100/200 档 (e-print 真实)
        for q, ep in sorted(EPRINT_EXPRESS_A4_DUPLEX.items()):
            new = r(ep * 0.95)
            new_tiers.append({
                'qty': q,
                'price': new,
                'unit': round(new / q, 2),
                'src': 'anchor',
                'calibratedAt': '2026-07-21',
                'size': 'A4',
                'sourceRef': 'e-print.com.hk 單張特急快印 A4 雙面 1小時即取 ×0.95',
                'note': 'A4 急件 (e-print 急件 1小時上限 200 張)'
            })
            changes_flyers.append(('same-day-flyers A4', q, new))
        # A5 急件 100/200/300/400 档 (e-print 真实)
        for q, ep in sorted(EPRINT_EXPRESS_A5_DUPLEX.items()):
            new = r(ep * 0.95)
            new_tiers.append({
                'qty': q,
                'price': new,
                'unit': round(new / q, 2),
                'src': 'anchor',
                'calibratedAt': '2026-07-21',
                'size': 'A5',
                'sourceRef': 'e-print.com.hk 單張特急快印 A5 雙面 1小時即取 ×0.95',
                'note': 'A5 急件 (e-print 急件 1小時上限 400 張)'
            })
            changes_flyers.append(('same-day-flyers A5', q, new))
        # 500 档保留 modeled (e-print 急件 1小時不提供 500 張)
        new_tiers.append({
            'qty': 500,
            'price': 800,
            'unit': 1.6,
            'src': 'modeled',
            'note': '500 張急件 e-print 1小時急件不提供 (A4 max 200, A5 max 400); 800HK$ 按 400 張 A5 雙面急件 $615×0.95=$584 + 同日 4小時複印溢價 35% 估算, 待 intuan 急件實詢校準'
        })
        p['tiers'] = new_tiers
    elif p['sku'] == 'eco-flyers':
        # 保持 pending, 文档说明: e-print 无公开再生纸 flyers 页
        # 现有 tiers 已经是 pending, 只需更新 sourceRef + 注释
        for t in p['tiers']:
            t['note'] = t.get('note', '') + ' [2026-07-21 v4: e-print.com.hk 无公开再生纸 flyers 页 (仅有 FSC 咭片和環保袋品类), 急件/宣傳單頁无 100% recycled 配置; 维持 pending, 待 intuan 询价校准]'
        changes_flyers.append(('eco-flyers', 'doc-only', 0))

d2['_meta']['updatedAt'] = '2026-07-21'
d2['_meta']['note'] = (d2['_meta'].get('note', '') +
    ' | 2026-07-21 v4: same-day-flyers 急件 A4 (100/200) + A5 (100/200/300/400) 全档 anchor ×0.95, '
    '500 档保留 modeled (e-print 1小時急件上限 200/400 張不提供 500); '
    'eco-flyers 维持 pending (e-print 无公开再生纸 flyers 页, 仅有 FSC 咭片/環保袋品类).')
d2['_meta']['references']['eprint_urgent_leaflet'] = (
    'https://www.e-print.com.hk/products_Leaflet_Express_Service '
    '(2026-07-21 实抓 1小時即取價目: A4 100張$600/200張$750 (上限200); '
    'A5 100張$173/200張$263/300張$503/400張$615 (上限400) — 雙面彩色)')
d2['_meta']['references']['eprint_eco_flyers'] = (
    'N/A — e-print 公开页无 100% recycled/再生纸 宣传单张配置, '
    '仅有 FSC 咭片 (products_fsc_eco_business_name_cards_printing) 和 環保袋 (non_woven_bag_printing) — '
    'eco-flyers 维持 pending, 待 intuan 询价')

with io.open(FLYERS_PATH, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(d2, f, ensure_ascii=False, indent=2)
    f.write('\n')

# ========== 打印 + 验证 ==========
print('=== books.json · perfect-bound-books (A5 32PP ×0.90) ===')
for sku, q, new in changes_books:
    print(f'  {sku} qty={q}: HK${new} ({round(new/q,2)}/本)')
print()
print('=== flyers.json · same-day-flyers (急件 ×0.95) + eco-flyers (doc) ===')
for sku, q, new in changes_flyers:
    if new > 0:
        print(f'  {sku} qty={q}: HK${new} ({round(new/q,2)}/张)')
    else:
        print(f'  {sku}: 文档更新 (无 anchor 改动)')
print()

# 验证 JSON 有效性
for path in (BOOKS_PATH, FLYERS_PATH):
    json.load(io.open(path, encoding='utf-8'))
    print(f'  {path} JSON 有效 ✓')
