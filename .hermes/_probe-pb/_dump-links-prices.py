# -*- coding: utf-8 -*-
"""探针: cost-baseline 内链清单 + products.ts 品类价格样本 (quick-answer 真值)"""
import json, re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

slug = 'hong-kong-printing-cost-baseline-2026'
for loc in ['en', 'ja', 'zh-hk']:
    d = json.load(open('src/data/blog-data/%s.json' % loc, encoding='utf-8'))
    c = d[slug]['content']
    links = re.findall(r'href="(/[^"]+)"[^>]*>([^<]+)</a>', c)
    print('=== %s 内链 %d ===' % (loc, len(links)))
    for u, t in links:
        print('  %s | %s' % (u, t))

print()
print('=== products.ts 品类价格样本 ===')
src = open('src/data/products.ts', encoding='utf-8').read()
# 按 SKU 块抓 (slug 后的 price_range/basePrice/minQuantity)
blocks = re.split(r'\n\s*slug:', src)[1:]
seen = {}
for b in blocks:
    sl = b.split(',')[0].strip().strip("'\"")
    pr = re.search(r'price_range:\s*["\']([^"\']+)["\']', b)
    bp = re.search(r'basePrice:\s*(\d+)', b)
    mq = re.search(r'minQuantity:\s*(\d+)', b)
    if pr and sl not in seen:
        seen[sl] = (pr.group(1), bp.group(1) if bp else '?', mq.group(1) if mq else '?')
for sl, (pr, bp, mq) in list(seen.items())[:45]:
    print('  %-38s price=%s base=%s minQ=%s' % (sl, pr, bp, mq))
print('SKU 块总数:', len(blocks), '| 有 price_range 的 SKU:', len(seen))
