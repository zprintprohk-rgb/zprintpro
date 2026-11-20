# -*- coding: utf-8 -*-
# small-batch-stickers 内容键盘点（只读）
import io, re

t = io.open('src/data/products-content.ts', encoding='utf-8').read()
i = t.find("'small-batch-stickers': {")
assert i > 0, 'entry not found'
seg = t[i:]
for k in ['longDescription', 'longDescriptionEn', 'longDescriptionJa', 'useCases', 'faqBlock']:
    print(k, 'present' if re.search(r'\b' + k + r'\s*:', seg[:4000]) else 'MISSING')
nxt = re.finditer(r"\n  '([a-z0-9-]+)': \{", seg[10:])
names = [m.group(1) for m in list(nxt)[:3]]
print('next entries:', names)
if names:
    end = seg.find("\n  '" + names[0] + "': {")
    entry = seg[:end]
else:
    entry = seg[:20000]
for k in ['longDescription', 'longDescriptionEn', 'longDescriptionJa']:
    m = re.search(r'\b' + k + r':', entry)
    if m:
        blk = entry[m.start():m.start() + 120000]
        print(k, 'block chars(approx):', len(blk), '| has table:', '<table' in blk[:20000])
