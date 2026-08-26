#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sync v20_9_parsed.json from project to agent workspace (gen script reads from agent path)."""
import shutil
SRC = r"F:\zprintpro-nextjs\zprintpro\.cluster\m3-exec-20260811\v20_9_parsed.json"
DST = r"C:\Users\Administrator\.openclaw-autoclaw\agents\zprintpro\workspace\.cluster\m3-exec-20260811\v20_9_parsed.json"
shutil.copy2(SRC, DST)
import os, json
print(f"Synced: {DST}")
print(f"Size: {os.path.getsize(DST):,} bytes")
with open(DST, 'r', encoding='utf-8') as f:
    d = json.load(f)
codes = [s.get('sku_code', '?') for s in d['skus']]
wedding = [c for c in codes if c.startswith(('WI-', 'PC-'))]
print(f"Total: {len(codes)} SKU, Wedding: {len(wedding)} ({wedding})")
