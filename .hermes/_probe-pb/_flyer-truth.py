# -*- coding: utf-8 -*-
"""flyer SKU 真值: quantities 折扣 / finishings / 尺寸倍率 / minQuantity"""
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open('src/data/products.ts', encoding='utf-8').read()
for slug in ['a5-flyers', 'a4-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers']:
    i = src.find("slug: '" + slug + "'")
    if i < 0:
        i = src.find('slug: "%s"' % slug)
    if i < 0:
        print('=== %s NOT FOUND ===' % slug); continue
    # 截到下一个 slug:
    j = src.find('slug:', i + 10)
    blk = src[i:j if j > i else i + 4000]
    print('=== %s ===' % slug)
    mq = re.search(r'minQuantity:\s*(\d+)', blk)
    pr = re.search(r'price_range:\s*["\']([^"\']+)["\']', blk)
    q = re.search(r'quantities:\s*\[([\s\S]{0,400}?)\]', blk)
    f = re.search(r'finishings:\s*\[([\s\S]{0,500}?)\]', blk)
    sz = re.search(r'sizes:\s*\[([\s\S]{0,400}?)\]', blk)
    print(' minQuantity=%s price_range=%s' % (mq.group(1) if mq else '?', pr.group(1) if pr else '?'))
    print(' quantities:', (re.sub(r'\s+', ' ', q.group(1)) if q else 'NONE')[:220])
    print(' finishings:', (re.sub(r'\s+', ' ', f.group(1)) if f else 'NONE')[:220])
    print(' sizes:', (re.sub(r'\s+', ' ', sz.group(1)) if sz else 'NONE')[:200])
    print()
