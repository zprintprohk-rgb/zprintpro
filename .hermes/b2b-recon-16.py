# -*- coding: utf-8 -*-
"""B2 batch 2 recon: 16 slugs — ts existing entries (double-quote regex!) + MOQ/name/price from products.ts"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts', encoding='utf-8').read()
pt = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()

targets = ['save-the-date-cards', 'foil-wedding-invitations', 'wedding-thank-you-cards',
           'wedding-place-cards', 'wedding-seating-charts', 'wedding-suite-bundle',
           'corrugated-boxes', 'electronics-packaging-box', 'kraft-paper-packaging-box',
           'magnetic-closure-gift-box', 'tuck-end-boxes', 'white-card-boxes', 'gang-run-card-boxes',
           'cafe-table-cards', 'drink-tokens', 'fruit-food-label-stickers']

print('%-30s %-6s | %-8s %-6s %-22s %s' % ('slug', 'in-ts', 'MOQ', 'price', 'zh-name', 'sku_code'))
for t in targets:
    in_ts = 'YES' if ('"%s": {' % t) in ts else 'NO'
    m = re.search(r"slug:\s*'%s'" % t, pt)
    if not m:
        print('%-30s %-6s | NOT-IN-PRODUCTS.TS' % (t, in_ts)); continue
    seg = pt[m.start():m.start() + 6000]
    mq = re.search(r'minQuantity:\s*(\d+)', seg)
    pr = re.search(r"price_range:\s*'([^']+)'", seg)
    nm = re.search(r"name:\s*'([^']+)'", seg)
    sc = re.search(r"sku_code:\s*'([^']+)'", seg)
    print('%-30s %-6s | %-8s %-6s %-22s %s' % (
        t, in_ts, mq.group(1) if mq else '?',
        (pr.group(1)[:20] if pr else '-'), (nm.group(1)[:20] if nm else '-'), sc.group(1) if sc else '-'))
