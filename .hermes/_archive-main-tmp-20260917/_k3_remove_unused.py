#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/22 20:24 移除 9 个 unused dependencies 减小 CF Pages Worker bundle"""
import json
from pathlib import Path

P = Path(r"F:\zprintpro-nextjs\package.json")
pkg = json.load(P.open(encoding="utf-8"))

# 移除 unused dependencies (基于 src/ 实际 grep)
unused = [
    'playwright', 'tesseract.js', 'airwallex-payment-elements',
    '@radix-ui/react-accordion', '@radix-ui/react-aspect-ratio',
    '@radix-ui/react-checkbox', '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu', '@radix-ui/react-tabs',
]
removed = []
for dep in unused:
    if dep in pkg.get('dependencies', {}):
        del pkg['dependencies'][dep]
        removed.append(dep)

# 重新排序
deps = dict(sorted(pkg['dependencies'].items()))
pkg['dependencies'] = deps

P.write_text(json.dumps(pkg, indent=4, ensure_ascii=False) + '\n', encoding='utf-8')
print('Removed ' + str(len(removed)) + ' unused deps:')
for r in removed:
    print('  - ' + r + ' (CF Pages Worker bundle 减小)')
