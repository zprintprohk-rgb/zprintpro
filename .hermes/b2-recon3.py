# -*- coding: utf-8 -*-
"""Block-level classification: segment between consecutive slug: occurrences"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
targets = ['greeting-cards', 'japan-doujin', 'doujinshi-printing', 'postcard-set',
           'eco-tote-bag', 'calendars', 'envelopes', 'graduation-yearbook']

marks = [(m.start(), m.group(1)) for m in re.finditer(r"slug:\s*'([a-z0-9-]+)'", ts)]
marks.append((len(ts), '__END__'))
seg = {}
for (p0, s0), (p1, _) in zip(marks, marks[1:]):
    if s0 in targets:
        seg[s0] = ts[p0:p1]

for t in targets:
    s = seg.get(t, '')
    mq = re.search(r'minQuantity:\s*(\d+)', s)
    names = re.search(r"name:\s*\{([\s\S]{0,400}?)\}", s)
    zh = re.search(r"'zh-hk':\s*'([^']+)'", names.group(1)) if names else None
    en = re.search(r"en:\s*'([^']+)'", names.group(1)) if names else None
    ja = re.search(r"ja:\s*'([^']+)'", names.group(1)) if names else None
    print('%-22s block=%5d chars | %s | MOQ=%s | %s / %s / %s' % (
        t, len(s), 'SKU' if mq else 'CATEGORY', mq.group(1) if mq else '-',
        zh.group(1) if zh else '-', en.group(1) if en else '-', ja.group(1) if ja else '-'))
