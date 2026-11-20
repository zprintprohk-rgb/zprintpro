#!/usr/bin/env python3
"""Dump V24.1 zh-hk PKG-014 HERO to see what's there."""
import importlib.util
import sys

spec = importlib.util.spec_from_file_location("gen_v24", r"F:\zprintpro-nextjs\.hermes\k3-inbox\gen_v24.py")
gv = importlib.util.module_from_spec(spec)
sys.modules['gen_v24'] = gv
spec.loader.exec_module(gv)

skus = gv.parse_skus()
sku = skus['PKG-014']
for locale in ['en', 'ja', 'zh-hk']:
    p = gv.build_prompt(sku, 'HERO', locale)
    print(f'\n{"="*60}\n=== {locale} PKG-014 HERO ({len(p)} chars) ===\n{"="*60}\n{p}\n')
