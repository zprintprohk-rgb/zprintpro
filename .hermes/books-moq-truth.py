# -*- coding: utf-8 -*-
"""books 类目 5 SKU minQuantity 真值表"""
import io, re
txt = io.open(r'F:\zprintpro-nextjs\src\data\products.ts', encoding='utf-8').read()
blocks = re.split(r"\n  \{\n", txt)
for b in blocks:
    m = re.search(r"slug: '([^']+)'", b)
    mq = re.search(r'minQuantity: (\d+)', b)
    nm = re.search(r"name: '([^']{0,44})", b)
    if m and mq and any(k in m.group(1) for k in ['book', 'booklet', 'catalog', 'notebook', 'stitch', 'bound', 'hardcover', 'spiral', 'children', 'magazine']):
        print(m.group(1), '|', mq.group(1), '|', (nm.group(1) if nm else '')[:42])
