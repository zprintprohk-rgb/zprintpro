# -*- coding: utf-8 -*-
"""products.ts 练习簿/学校类真值: SKU 价格/尺寸/纸张/起印量"""
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open('src/data/products.ts', encoding='utf-8').read()
blocks = re.split(r'\n\s*slug:', src)[1:]
keys = ['exercise', 'school', 'workbook', 'notebook', 'textbook', 'booklet', 'educational']
hits = []
for b in blocks:
    sl = b.split(',')[0].strip().strip("'\"")
    if any(k in sl.lower() for k in keys):
        pr = re.search(r'price_range:\s*["\']([^"\']+)["\']', b)
        mq = re.search(r'minQuantity:\s*(\d+)', b)
        sz = re.search(r'sizes:\s*\[([^\]]{0,200})', b)
        mat = re.search(r'materials:\s*\[([^\]]{0,200})', b)
        hits.append((sl, pr.group(1) if pr else '?', mq.group(1) if mq else '?', sz.group(1)[:150] if sz else '', mat.group(1)[:150] if mat else ''))
for h in hits[:20]:
    print('%s\n  price=%s minQ=%s\n  sizes=%s\n  materials=%s' % h)
print('total:', len(hits))

# 教育/书籍类目 slug
cats = re.findall(r"slug:\s*['\"]([^'\"]*(?:educational|books)[^'\"]*)['\"]", src)
print('cat slugs:', sorted(set(cats))[:10])
