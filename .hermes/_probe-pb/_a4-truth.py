# -*- coding: utf-8 -*-
"""a4-flyers sizes/price/minQ 真值"""
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open('src/data/products.ts', encoding='utf-8').read()
i = src.find("slug: 'a4-flyers'")
seg = src[i:i + 3000]
s = re.search(r'sizes:\s*\[([\s\S]{0,350}?)\]', seg)
p = re.search(r'price_range:\s*["\']([^"\']+)["\']', seg)
m = re.search(r'minQuantity:\s*(\d+)', seg)
print('a4-flyers sizes:', re.sub(r'\s+', ' ', s.group(1))[:260] if s else 'NONE')
print('a4-flyers price:', p.group(1) if p else '?', '| minQ:', m.group(1) if m else '?')
# double-sided
i2 = src.find("slug: 'double-sided-flyers'")
seg2 = src[i2:i2 + 3000]
p2 = re.search(r'price_range:\s*["\']([^"\']+)["\']', seg2)
m2 = re.search(r'minQuantity:\s*(\d+)', seg2)
print('double-sided price:', p2.group(1) if p2 else '?', '| minQ:', m2.group(1) if m2 else '?')
