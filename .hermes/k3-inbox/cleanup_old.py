#!/usr/bin/env python3
"""Cleanup all old prompts and images. Keep only V23.5 (to be regenerated) + scripts."""
import os
import shutil
from pathlib import Path

WORKSPACE = Path(r'F:\zprintpro-nextjs')
SEEDREAM = WORKSPACE / 'seedream'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
INBOX = WORKSPACE / '.hermes/k3-inbox'

removed = []
kept = []

# 1) Delete old prompt files in seedream/ (keep V23.5 only)
print('=== Cleaning seedream/ prompts ===')
for f in SEEDREAM.iterdir():
    if f.is_file() and f.suffix == '.txt':
        # Keep v23.5 (will be regenerated), delete v20.x, v22, v23.1, v23.2, v23.3, v23.4
        if f.name.startswith(('v20', 'v22', 'v23.0', 'v23.1', 'v23.2', 'v23.3', 'v23.4')):
            os.remove(f)
            removed.append(f.name)
        elif f.name.startswith('v23.5'):
            kept.append(f.name)

# 2) Delete ALL images (raw + webp) in _raw_all/ and all SKU subdirs
print('\n=== Cleaning _raw_all/ ===')
raw_all = IMG_BASE / '_raw_all'
if raw_all.exists():
    for f in raw_all.iterdir():
        if f.is_file():
            os.remove(f)
            removed.append(f'_raw_all/{f.name}')

print('\n=== Cleaning SKU subdirs (raw/ + all webp) ===')
sku_dirs = [d for d in IMG_BASE.iterdir() if d.is_dir() and d.name not in ('_raw_all',)]
for sku_dir in sku_dirs:
    # Delete raw/ subdir
    raw_subdir = sku_dir / 'raw'
    if raw_subdir.exists() and raw_subdir.is_dir():
        for f in raw_subdir.iterdir():
            if f.is_file():
                os.remove(f)
        raw_subdir.rmdir()
        removed.append(f'{sku_dir.name}/raw/ (cleared)')
    # Delete all .webp files
    for f in sku_dir.iterdir():
        if f.is_file() and f.suffix == '.webp':
            os.remove(f)
            removed.append(f'{sku_dir.name}/{f.name}')

# 3) Delete test files in .hermes/k3-inbox/
print('\n=== Cleaning .hermes/k3-inbox/ test files ===')
test_patterns = [
    'test_*.py', 'v235-*', 'diff-*', 'v23.4-*', 'v22-exec*', 'v22-test*',
    'v23.5-pc001*', 'verify_seo.py', 'verify_v23_3sku.py', 'verify_brands_3loc.py',
    'check_brands.py', 'v234-batch*', 'v23-batch*',
]
for pattern in test_patterns:
    for f in INBOX.glob(pattern):
        if f.is_file():
            os.remove(f)
            removed.append(f'.hermes/k3-inbox/{f.name}')

# 4) Show kept files
print('\n=== KEPT in seedream/ ===')
for f in SEEDREAM.iterdir():
    if f.is_file():
        kept.append(f'seedream/{f.name}')

print('\n=== KEPT in .hermes/k3-inbox/ (active scripts) ===')
for f in INBOX.iterdir():
    if f.is_file() and f.name.startswith(('gen_', 'post_', 'run_', 'extract_')):
        kept.append(f'.hermes/k3-inbox/{f.name}')

# 5) Verify image base is now clean
print('\n=== IMG_BASE state after cleanup ===')
for d in sorted(IMG_BASE.iterdir()):
    if d.is_dir():
        files = list(d.iterdir())
        print(f'  {d.name}/ : {len(files)} items')
        for f in files:
            print(f'    - {f.name}')

print(f'\n=== Summary ===')
print(f'Removed: {len(removed)} files')
print(f'Kept: {len(kept)} active files')
