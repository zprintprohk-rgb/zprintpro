#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re

d = json.load(open('src/data/blog-data/en.json', 'r', encoding='utf-8'))
c = d['catalog-printing-china-supplier-guide']['content']
# Sec 6 = "6. Real Buyer Scenarios" h2 起到 Sec 7 h2 起
sec6_start = c.find('6. Real Buyer Scenarios')
sec7_start = c.find('7. Frequently Asked Questions')
print(c[sec6_start:sec7_start])
