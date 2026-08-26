#!/usr/bin/env python3
"""Re-encode existing 4K raws at q=95 to ensure >=1MB file size."""
import os
import io
from pathlib import Path
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
RAW_ALL = WORKSPACE / 'zprintpro-en-us-images' / '_raw_all'

# Find all 4K raw files from latest batch
raws = sorted(RAW_ALL.glob('*_v235s-4k_raw.jpg'))
print(f'Found {len(raws)} 4K raws to re-encode')
print('=' * 70)
print(f"{'File':<60} {'Old':<10} {'New':<10} {'Status'}")
print('-' * 70)

for raw in raws:
    img = Image.open(raw).convert('RGB')
    w, h = img.size
    if (w, h) != (4096, 4096):
        print(f'{raw.name}: NOT 4K, skip')
        continue

    old_size = raw.stat().st_size

    # Re-encode at q=95
    buf = io.BytesIO()
    img.save(buf, 'JPEG', quality=95, optimize=True, subsampling=0)  # subsampling=0 = no chroma downsample
    new_size = buf.tell()

    status = 'PASS' if new_size >= 1024 * 1024 else 'STILL UNDER'
    print(f'{raw.name:<60} {old_size:>9,}B {new_size:>9,}B [{status}]')

    if new_size > old_size:
        # Overwrite the raw with the higher-quality version
        raw.write_bytes(buf.getvalue())

print('=' * 70)
print('Done.')
