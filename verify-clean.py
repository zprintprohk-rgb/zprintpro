#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json, re

print('=== F1 blog 3 locale 策略黑话 + 简体字残留验证 ===\n')
for locale in ['en', 'zh-hk', 'ja']:
    d = json.load(open(f'src/data/blog-data/{locale}.json', 'r', encoding='utf-8'))
    c = d['catalog-printing-china-supplier-guide']['content']

    # 策略黑话
    jargon = {
        'cluster': len(re.findall(r'cluster', c, re.IGNORECASE)),
        '9/4': len(re.findall(r'9/4', c)),
        'maintain top': len(re.findall(r'maintain top', c, re.IGNORECASE)),
        '目標:': len(re.findall(r'目標[:：]?', c)),
        '維持 top': len(re.findall(r'維持 top', c)),
        'SOP': len(re.findall(r'SOP', c)),
        'baseline': len(re.findall(r'baseline', c, re.IGNORECASE)),
        'verify-deploy': len(re.findall(r'verify-deploy', c)),
    }

    # 简体字残留 (ja)
    simp_ja = {
        '首页': len(re.findall(r'首页', c)),
        '实际': len(re.findall(r'实际', c)),
        '详细': len(re.findall(r'详细', c)),
        '资源': len(re.findall(r'资源', c)),
    }

    print(f'--- {locale} (length={len(c)}) ---')
    print(f'  策略黑话: {jargon}')
    if locale == 'ja':
        print(f'  简体字残留: {simp_ja}')

    total_jargon = sum(jargon.values())
    total_simp = sum(simp_ja.values()) if locale == 'ja' else 0
    total = total_jargon + total_simp
    print(f'  总命中: {total}')
    print()
