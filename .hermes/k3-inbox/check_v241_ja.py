#!/usr/bin/env python3
"""Check JA/zh-hk V24.1 prompt for English mixing."""
import re
import os
import sys

# Regenerate directly via import
sys.path.insert(0, r'F:\zprintpro-nextjs\.hermes\k3-inbox')

# Read products first
import importlib.util
spec = importlib.util.spec_from_file_location("gen_v24", r"F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v24.py")
gv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gv)

skus = gv.parse_skus()
sku = skus['PKG-014']
for locale in ['ja', 'zh-hk']:
    p = gv.build_prompt(sku, 'HERO', locale)
    print(f'\n=== {locale} PKG-014 HERO ===')
    print(f'  Length: {len(p)} chars')
    en = re.findall(r'[A-Za-z][A-Za-z0-9\-]{2,}', p)
    print(f'  English tokens: {len(en)}')
    if en and len(en) < 30:
        print(f'    {", ".join(sorted(set(en)))}')
    else:
        print(f'    (top 20): {", ".join(sorted(set(en))[:20])}')
