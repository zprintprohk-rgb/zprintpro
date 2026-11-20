# -*- coding: utf-8 -*-
# 双方法抽查: lane dd2b537f 改的 books 8 SKU body 价格 vs products.ts SSoT
# 方法1: products.ts 字段 (basePrice/basePrice_en/basePrice_ja/price_range/minQuantity)
# 方法2: price-data.generated.ts UNIT_PRICE_ANCHORS (显示锚)
import io, sys, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
prod = open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
anch = open(r'F:\zprintpro-nextjs\src\lib\price-data.generated.ts', encoding='utf-8').read()

books = ['saddle-stitch-booklets', 'perfect-bound-books', 'hardcover-books', 'exercise-books',
         'catalog-printing', 'spiral-notebooks', 'textbooks', 'graduation-yearbook', 'children-books', 'photo-books']
print('=== products.ts books 字段 ===')
for slug in books:
    i = prod.find("slug: '" + slug + "'")
    if i < 0:
        print(slug, 'NOT FOUND'); continue
    seg = prod[i:i+2500]
    fs = {}
    for f in ['price_range', 'basePrice', 'basePrice_en', 'basePrice_ja', 'minQuantity']:
        m = re.search(re.escape(f) + r":\s*(?P<v>'((?:[^'\\]|\\.)*)'|\[[^\]]*\]|[0-9.]+)", seg)
        if m: fs[f] = m.group('v')[:45]
    print(f'  {slug}: ' + ' | '.join(f'{k}={v}' for k, v in fs.items()))
print()
print('=== UNIT_PRICE_ANCHORS (price-data.generated) ===')
ai = anch.find('UNIT_PRICE_ANCHORS')
seg = anch[ai:ai+6000]
for slug in books:
    m = re.search(r"'" + re.escape(slug) + r"':\s*\{(?P<block>[\s\S]*?)\n  \},", seg)
    if m:
        block = m.group('block')
        parts = re.findall(r"'([a-z-]+)': \{ priceDisplay: '([^']+)', qty: (\d+), batchPrice: (\d+)", block)
        print(f'  {slug}: ' + ' | '.join(f'{l} {p}起/qty{q}' for l, p, q, _ in parts))
