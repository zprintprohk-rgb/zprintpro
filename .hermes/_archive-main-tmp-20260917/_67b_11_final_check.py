#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""§11 8/18 EOD 验收精确 grep (排除 .bak 备份, 走 Python 不走 PowerShell)."""
import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT = r'F:\zprintpro-nextjs'
PATTERNS = ['咭片', '名片', 'business card', 'business-card', '名刺']
BACKUP_PATTERN = re.compile(r'\.bak')

total = 0
results = {}
for pat in PATTERNS:
    count = 0
    hits = []
    for root, dirs, files in os.walk(os.path.join(ROOT, 'src')):
        for f in files:
            if not f.endswith(('.ts', '.tsx', '.json', '.md')):
                continue
            if BACKUP_PATTERN.search(f):
                continue
            fp = os.path.join(root, f)
            try:
                with open(fp, 'r', encoding='utf-8') as fh:
                    content = fh.read()
                n = content.count(pat)
                if n > 0:
                    count += n
                    hits.append((os.path.relpath(fp, ROOT), n))
            except Exception as e:
                pass
    results[pat] = (count, hits)
    total += count
    print(f'  {pat} : {count} hits')
    for fp, n in hits[:5]:
        print(f'    {fp} : {n}')
print(f'\nTOTAL §11 hits: {total}')

# §0.16 grep
print('\n=== §0.16 智印雲 grep ===')
yc = 0
for root, dirs, files in os.walk(os.path.join(ROOT, 'src')):
    for f in files:
        if not f.endswith(('.ts', '.tsx', '.json', '.md')):
            continue
        if BACKUP_PATTERN.search(f):
            continue
        fp = os.path.join(root, f)
        try:
            with open(fp, 'r', encoding='utf-8') as fh:
                content = fh.read()
            n = content.count('智印雲')
            yc += n
        except:
            pass
print(f'  智印雲 : {yc} hits (期望 0, 品牌词智印港允许)')
