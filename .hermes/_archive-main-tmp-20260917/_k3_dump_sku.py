#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dump full BC-001 + ST-001 prompt per view"""
import json

with open(r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json', 'r', encoding='utf-8') as f:
    rules = json.load(f)

skus = rules.get('SKUS', {})
for sku_key in ['BC-001', 'ST-001']:
    if sku_key in skus:
        v = skus[sku_key]
        print('=' * 80)
        print('SKU:', sku_key)
        print('=' * 80)
        if isinstance(v, dict):
            for view, prompt in v.items():
                print()
                print('--- ' + view + ' (' + str(len(prompt)) + ' chars) ---')
                print(prompt)
                print()
