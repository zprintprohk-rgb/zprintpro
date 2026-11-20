# -*- coding: utf-8 -*-
# 全站 blog 孤儿价扫描: 3 语 blog-data 全部 slug 的价格 token vs SSoT 锚点表
import io, sys, json, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base = r'F:\zprintpro-nextjs\src\data\blog-data'
# SSoT 锚点 (来源: products.ts price_range/basePrice + price-tables 校准, 见 10-25 报告)
SSOT = {
    'zh': {
        'paper-bag': ['1.84', '2', '4', '8'],            # kraft 1.84/white-card 2/gift 4/eco 1.84? -> 纸袋 1.84-4
        'poster': ['9', '17', '45', '56', '144', '16'],  # A2 9/A2 250g 17/A1 PP 45/A1 相紙 56/A0 144/A2 250g 17
        'flyer': ['0.25', '0.35', '0.70', '0.55', '0.40', '1.00', '1.95'],  # a5 0.25/a4 0.35/folded 0.7/same-day 0.55/eco 0.4/wedding 1.0/3fold 1.95
        'book': ['6', '16', '40', '45', '24', '4', '8'],  # saddle 6/perfect 16/hardcover 40/yearbook 45/textbooks 24/exercise 4/spiral 8
        'sticker': ['0.2', '0.35', '0.55', '0.8'],        # school 0.2/paper 0.35/vinyl 0.55/0.8
        'box': ['2.5', '3', '8', '0.5', '6', '10'],       # folding 2.5-15/mailer 3.5/kraft 5/white 0.5/rigid 8/gift 10
    },
    'en': {
        'paper-bag': ['1.84', '0.4', '0.8', '1.5'],
        'poster': ['2.30', '4.60', '14.70', '17', '56'],
        'flyer': ['0.06', '0.14', '0.4', '0.55', '0.95'],
        'book': ['1.84', '4.6', '13.8', '10.35', '9.2', '2.76'],
        'sticker': ['0.03', '0.05', '0.08', '0.11'],
        'box': ['0.51', '0.74', '1.0', '0.2', '1.84', '2.0'],
    },
    'ja': {
        'paper-bag': ['240', '300', '480', '1000'],
        'poster': ['300', '600', '1920', '4500', '2240'],
        'flyer': ['20', '50', '70', '110', '125'],
        'book': ['258', '644', '1932', '1350', '1288', '386'],
        'sticker': ['20', '40', '60', '80'],
        'box': ['101', '69', '150', '360', '1050'],
    },
}
# 孤儿价候选正则 (HK$ 起价 / US$ / ¥)
pat = re.compile(r'(HK\$\s?[\d.,]+|US\$\s?[\d.,]+|\$\s?[\d.,]+|¥\s?[\d.,]+|¥\d+)')
for loc, fn in [('zh-hk', 'zh-hk.json'), ('en', 'en.json'), ('ja', 'ja.json')]:
    data = json.load(open(base + '\\' + fn, encoding='utf-8'))
    print(f'\n########## {loc} ({len(data)} slugs) ##########')
    hits = []
    for slug, entry in data.items():
        if not isinstance(entry, dict):
            continue
        content = entry.get('content') or entry.get('body') or ''
        # 类别归属
        cat = None
        for key in ['paper-bag', 'poster', 'flyer', 'book', 'sticker', 'box']:
            if key.replace('-', '') in slug.replace('-', ''):
                cat = key
        text = re.sub(r'<[^>]+>', ' ', content)
        text = re.sub(r'\s+', ' ', text)
        for m in pat.finditer(text):
            tok = m.group(1).replace(' ', '')
            # 只查「X 起」型 (起价声明) 与「/張 /本 /個 /張起」型
            after = text[m.end():m.end()+6]
            before = text[max(0, m.start()-6):m.start()]
            if not re.search(r'起|from|〜|から', after[:4] + before[-4:]):
                continue
            num = re.sub(r'[HKUS$¥\s,]', '', tok)
            try:
                n = float(num)
            except Exception:
                continue
            if cat and n >= 0.5 and n < 100000:
                hits.append((slug, cat, tok, before[-8:], after[:8], n))
    # 汇总: 排除 SSoT 已知值
    print('孤儿/待核 (不含 SSoT 锚点值):')
    seen = set()
    for slug, cat, tok, bef, aft, n in hits:
        key = (slug, tok)
        if key in seen:
            continue
        seen.add(key)
        ssot = SSOT[{'zh-hk':'zh'}.get(loc,loc)].get(cat, [])
        # 判断: token 数值是否接近 SSoT 任一值 (>2x 或 <0.5x 视为孤儿)
        near = any(abs(n - float(s)) / max(float(s), 0.001) < 0.35 for s in ssot)
        mark = '   ' if near else '!! '
        print(f"{mark}{slug[:38]:40s} [{cat:8s}] {tok:12s} ...{bef}{aft}")
