# -*- coding: utf-8 -*-
"""B2 recon: classify 8 target slugs (SKU vs category) in products.ts; extract names/minQuantity"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
targets = ['greeting-cards', 'japan-doujin', 'doujinshi-printing', 'postcard-set',
           'eco-tote-bag', 'calendars', 'envelopes', 'graduation-yearbook']

# category slugs: within a categories array, slug: 'xxx'
cat_rx = re.compile(r"slug:\s*'([a-z0-9-]+)'(?=[\s\S]{0,400}?products:)", re.M)
# simpler: find all category blocks
cats = set(re.findall(r"\{\s*id:\s*'[^']+',\s*slug:\s*'([a-z0-9-]+)'", ts))
print('category slugs found:', len(cats))
for t in targets:
    is_cat = t in cats
    # product? slug + name + minQuantity nearby
    pm = re.search(r"slug:\s*'%s'([\s\S]{0,1500})" % t, ts)
    kind = 'CATEGORY' if is_cat else ('PRODUCT?' if pm else 'MISSING')
    name = re.search(r"name:\s*\{[^}]*'zh-hk':\s*'([^']+)'[^}]*en:\s*'([^']+)'[^}]*ja:\s*'([^']+)'", pm.group(1) if pm else '')
    mq = re.search(r'minQuantity:\s*(\d+)', pm.group(1) if pm else '')
    print('%-24s %-9s MOQ=%-5s names=%s' % (t, kind, mq.group(1) if mq else '-',
          (name.groups() if name else '-')))
