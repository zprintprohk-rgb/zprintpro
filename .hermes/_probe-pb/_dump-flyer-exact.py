# -*- coding: utf-8 -*-
"""dump 精确片段: 最少訂幾多張 段落 repr"""
import json, io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
d = json.load(open('src/data/blog-data/zh-hk.json', encoding='utf-8'))
c = d['flyer-printing-guide']['content']
i = c.find('最少訂幾多張')
print(repr(c[i - 10:i + 420]))
print()
print('--- 實例 段 ---')
j = c.find('實例')
print(repr(c[j - 30:j + 320]))
print()
print('--- LinkedIn ---')
k = c.find('LinkedIn')
print(repr(c[k - 60:k + 60]))
print()
print('--- dead link ---')
m = c.find('flyer-buying-guide')
print(repr(c[m - 80:m + 80]))
