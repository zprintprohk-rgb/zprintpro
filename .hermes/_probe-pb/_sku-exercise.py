# -*- coding: utf-8 -*-
"""exercise-books SKU 完整块 + 全文数字核对 + zh/ja 现有文本"""
import re, io, sys, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

src = open('src/data/products.ts', encoding='utf-8').read()
i = src.find("slug: 'exercise-books'")
if i < 0:
    i = src.find('slug: "exercise-books"')
print('=== exercise-books SKU 块 ===')
print(src[i:i + 1800])
print()
print('=== zh 正文 ===')
c = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))['school-exercise-book-printing-guide']['content']
print(c)
