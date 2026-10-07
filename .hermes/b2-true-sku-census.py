# -*- coding: utf-8 -*-
"""TRUE SKU census v4 FINAL: sku_code anchor (format XX-###) -> nearest following slug"""
import io, re

ts = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
csv_slugs = set(l.split('\t')[3].strip() for l in io.open(r'F:\zprintpro-nextjs\zprintpro-sku-seo-data.csv', encoding='utf-8').read().split('\n')[1:] if l.strip())

skus = {}
for m in re.finditer(r"sku_code:\s*'([A-Z]{1,4}-\d+)'", ts):
    seg = ts[m.start():m.start() + 400]
    s = re.search(r"slug:\s*'([a-z0-9-]+)'", seg)
    mq = re.search(r'minQuantity:\s*(\d+)', seg)
    if s:
        skus[s.group(1)] = int(mq.group(1)) if mq else -1

print('TRUE SKUs (sku_code anchored):', len(skus))
covered = [s for s in skus if s in csv_slugs]
missing = sorted(s for s in skus if s not in csv_slugs)
print('CSV-covered:', len(covered), '| missing:', len(missing))
for s in missing:
    print('  %-32s MOQ=%s' % (s, skus[s]))
