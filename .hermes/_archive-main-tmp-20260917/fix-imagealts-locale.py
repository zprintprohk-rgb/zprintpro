#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
M3 v6 续: per-locale image alt 修复
- ja alts: ZprintPro智印港 → ZprintPro (per §13.10 NAP 脱钩)
- zh-hk alts: ZprintPro智印港 (正确, 保持)
- en alts: ZprintPro (原本就对, 保持)
"""
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

for FILE in [r'F:\zprintpro-nextjs\src\data\products.ts', r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts']:
    with open(FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    changed_ja = 0
    changed_en = 0
    for i in range(len(lines)):
        line = lines[i]
        # ja context: "ja": "..." 字段
        if '"ja":' in line and 'ZprintPro智印港' in line:
            new = line.replace('ZprintPro智印港', 'ZprintPro')
            if new != line:
                lines[i] = new
                changed_ja += 1
        # en context: "en": "..." 字段
        if '"en":' in line and 'ZprintPro智印港' in line:
            new = line.replace('ZprintPro智印港', 'ZprintPro')
            if new != line:
                lines[i] = new
                changed_en += 1

    if changed_ja > 0 or changed_en > 0:
        with open(FILE, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        print(f'{FILE}: fixed {changed_ja} ja alts + {changed_en} en alts (ZprintPro智印港 → ZprintPro)')
    else:
        print(f'{FILE}: no changes')
