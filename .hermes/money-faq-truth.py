# -*- coding: utf-8 -*-
"""Extract price truth for money FAQ answers"""
import io, re

pt = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
for slug in ['saddle-stitch-booklets', 'catalog-printing', 'perfect-bound-books', 'a2-posters']:
    m = re.search(r"slug:\s*'%s'" % slug, pt)
    if not m:
        print(slug, 'NOT FOUND'); continue
    seg = pt[m.start():m.start() + 6000]
    pr = re.search(r"price_range:\s*'([^']+)'", seg)
    bp = re.search(r'basePrice:\s*([\d.]+)', seg)
    bpe = re.search(r'basePrice_en:\s*([\d.]+)', seg)
    bpj = re.search(r'basePrice_ja:\s*([\d.]+)', seg)
    mq = re.search(r'minQuantity:\s*(\d+)', seg)
    print('%-24s MOQ=%s | %s | en=$%s ja=¥%s base=%s' % (
        slug, mq.group(1) if mq else '?', pr.group(1) if pr else '-',
        bpe.group(1) if bpe else (bp.group(1) if bp else '?'),
        bpj.group(1) if bpj else '?', bp.group(1) if bp else '?'))
