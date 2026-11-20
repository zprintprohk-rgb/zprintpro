#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Backup old (--nocrop) webp files before re-gen with WM-STRIP crop."""
import shutil
from pathlib import Path

ROOT = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")
BACKUP = ROOT / "_backup_nocrop_2026-08-19"
SKUS = ['WI-001', 'WI-002', 'WI-003', 'WI-004', 'WI-005', 'WI-006',
        'PC-001', 'PC-002', 'PC-003', 'PC-004', 'PC-005', 'PC-006']

BACKUP.mkdir(exist_ok=True)
print(f"Backup dir: {BACKUP}")

for sku in SKUS:
    d = ROOT / sku
    if not d.is_dir():
        continue
    webps = list(d.glob('*.webp'))
    if not webps:
        continue
    sku_backup = BACKUP / sku
    sku_backup.mkdir(exist_ok=True)
    for w in webps:
        dest = sku_backup / w.name
        shutil.move(str(w), str(dest))
    print(f"  {sku}: moved {len(webps)} webp to _backup_nocrop_2026-08-19/{sku}/")
