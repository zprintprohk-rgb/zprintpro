# -*- coding: utf-8 -*-
"""B2 data prep: MOQ truth for 4 target SKUs from products.ts full object scan"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
targets = ['doujinshi-printing', 'eco-tote-bag', 'graduation-yearbook', 'postcard-set']

for t in targets:
    m = re.search(r"slug:\s*'%s'" % t, ts)
    if not m:
        print(t, 'NOT FOUND'); continue
    seg = ts[m.start():m.start() + 6000]
    # object ends at next "\n  {" at same indent or seo block
    mq = re.search(r'minQuantity:\s*(\d+)', seg)
    nm = re.search(r"name:\s*'([^']+)'", seg)
    nme = re.search(r"nameEn:\s*'([^']+)'", seg)
    nmj = re.search(r"nameJa:\s*'([^']+)'", seg)
    tz = re.search(r"title_zh:\s*'([^']+)'", seg)
    pr = re.search(r"price_range:\s*'([^']+)'", seg)
    print('== %s' % t)
    print('  MOQ=%s | price=%s' % (mq.group(1) if mq else '?', pr.group(1) if pr else '?'))
    print('  zh:', nm.group(1)[:50] if nm else '?')
    print('  en:', nme.group(1)[:50] if nme else '?')
    print('  ja:', nmj.group(1)[:50] if nmj else '?')
    print('  title_zh:', tz.group(1)[:70] if tz else '?')
