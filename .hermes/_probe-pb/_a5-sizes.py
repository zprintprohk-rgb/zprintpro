# -*- coding: utf-8 -*-
"""a5-flyers sizes 数组 (A3 1.8 倍率溯源) + finishings/materials"""
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
src = open('src/data/products.ts', encoding='utf-8').read()
i = src.find("slug: 'a5-flyers'")
seg = src[i:i + 6000]
s = re.search(r'sizes:\s*\[([\s\S]{0,600}?)\n\s*\]', seg)
f = re.search(r'finishings:\s*\[([\s\S]{0,600}?)\n\s*\]', seg)
mat = re.search(r'materials:\s*\[([\s\S]{0,600}?)\n\s*\]', seg)
q = re.search(r'quantities:\s*\[([\s\S]{0,400}?)\n\s*\]', seg)
print('sizes:', re.sub(r'\s+', ' ', s.group(1))[:400] if s else 'NONE')
print('finishings:', re.sub(r'\s+', ' ', f.group(1))[:300] if f else 'NONE')
print('materials:', re.sub(r'\s+', ' ', mat.group(1))[:300] if mat else 'NONE')
print('quantities:', re.sub(r'\s+', ' ', q.group(1))[:300] if q else 'NONE')
