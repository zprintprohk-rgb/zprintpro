#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""K3 8/26 修 2 补全 grep: 找 'en' 默认值 (helper / API 路由 / trackEvent)"""
import os, re

patterns = [
    (r"locale:\s*['\"]en['\"]", 'locale: en default'),
    (r"defaultLocale.*['\"]en['\"]", 'defaultLocale en'),
    (r"['\"]en['\"][\s,;)]", 'standalone en'),
    (r"navigator\.language.*['\"]en['\"]", 'navigator.language fallback en'),
    (r"\['en'\]\s*as", 'array index en as'),
    (r"\.locale\s*=\s*['\"]en['\"]", '.locale = en'),
    (r"params\?\.locale.*\|\|\s*['\"]en['\"]", 'params?.locale fallback en'),
    (r"locale\s*\|\|\s*['\"]en['\"]", 'locale || en fallback'),
]
hits = []
for root, dirs, files in os.walk('src'):
    for f in files:
        if not f.endswith(('.ts', '.tsx', '.js', '.jsx')):
            continue
        path = os.path.join(root, f)
        try:
            with open(path, encoding='utf-8') as fh:
                for i, line in enumerate(fh, 1):
                    for p, name in patterns:
                        if re.search(p, line):
                            hits.append((path, i, name, line.rstrip()))
        except Exception as e:
            print(f'ERR {path}: {e}')

for h in hits[:40]:
    print(f'{h[0]}:{h[1]} [{h[2]}] {h[3][:200]}')
print(f'\nTotal hits: {len(hits)}')
