# -*- coding: utf-8 -*-
"""products.ts 真值核对: 品类/SKU 计数 + 日历(月曆) SKU 存在性 + 现价"""
import re, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open('src/data/products.ts', encoding='utf-8').read()
# 找 categories 数组定义 (估算品类数)
cats = re.findall(r'category:\s*["\']([^"\']+)["\']', src)
print('category 字段出现次数:', len(cats))
# 找 slug: 计数 SKU
slugs = re.findall(r'slug:\s*["\']([^"\']+)["\']', src)
print('slug 计数:', len(slugs))
# 日历相关 SKU
cal = [s for s in slugs if any(k in s for k in ['calendar', 'wall-calendar', 'monthly-calendar', 'desk-calendar', 'planner'])]
print('calendar SKU:', cal)
# 每 SKU 的 price_range 样本 (抓 calendar 附近)
for c in cal:
    i = src.find(c)
    seg = src[max(0, i - 200): i + 1200]
    pr = re.findall(r'price_range:\s*["\']([^"\']+)["\']', seg)
    bp = re.findall(r'basePrice:\s*(\d+)', seg)
    moq = re.findall(r'minQuantity:\s*(\d+)', seg)
    print('%s | price_range=%s base=%s minQ=%s' % (c, pr[:1], bp[:1], moq[:1]))
# 全部 SKU 的 price_range 数量 (真值口径)
prs = re.findall(r'price_range:\s*["\']([^"\']+)["\']', src)
print('price_range 字段数:', len(prs))
# 起印量 100 相关
moqs = re.findall(r'minQuantity:\s*(\d+)', src)
from collections import Counter
print('minQuantity 分布 top:', Counter(moqs).most_common(6))
