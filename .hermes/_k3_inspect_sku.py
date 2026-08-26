#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Inspect BC-001/ST-001 in enhance_rules.json"""
import json

with open(r'zprintpro\.cluster\m3-exec-20260811\enhance_rules.json', 'r', encoding='utf-8') as f:
    rules = json.load(f)

skus = rules.get('SKUS', {})
print('SKUS type:', type(skus).__name__)
if isinstance(skus, dict):
    print('SKU count:', len(skus))
    print('SKU keys (first 5):', list(skus.keys())[:5])
    for sku_key in ['BC-001', 'ST-001']:
        if sku_key in skus:
            v = skus[sku_key]
            tname = type(v).__name__
            if isinstance(v, dict):
                length = str(len(v))
            elif isinstance(v, (list, str)):
                length = str(len(v))
            else:
                length = '?'
            print()
            print('=== ' + sku_key + ' (type=' + tname + ', len=' + length + ') ===')
            if isinstance(v, dict):
                print('  keys:', list(v.keys()))
                for k, val in list(v.items())[:5]:
                    print('  ' + str(k) + ':', str(val)[:120])
            elif isinstance(v, str):
                print('  first 800 chars:')
                print(v[:800])
            elif isinstance(v, list):
                print('  first 3 items:')
                for i, item in enumerate(v[:3]):
                    print('  [' + str(i) + ']:', str(item)[:120])
