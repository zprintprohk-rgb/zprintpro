#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

d = json.load(open('src/data/blog-data/en.json', 'r', encoding='utf-8'))
c = d['catalog-printing-china-supplier-guide']['content']
sec6_start = c.find('Real Buyer Scenarios')
sec7_start = c.find('Frequently Asked Questions')
print('=== Sec 6 Real Buyer Scenarios ===')
print(c[sec6_start:sec7_start][:1500])
print('\n\n=== Sec 7 FAQ ===')
print(c[sec7_start:sec7_start+1500])
