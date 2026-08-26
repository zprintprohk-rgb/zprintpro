#!/usr/bin/env python3
"""
V22 post-processor: resize raw Seedream outputs to 1200x1200 WebP <=120KB.

Reads from:  zprintpro-en-us-images/<SKU>/raw/<SKU>-<VIEW>.<ext>
Writes to:   zprintpro-en-us-images/<SKU>/<SKU>-<VIEW>.webp  (1200x1200, <=120KB)

Strategy: progressive quality + optional palette quantization to fit <=120KB.
"""
import argparse
import io
import os
import re
import sys
from pathlib import Path
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
TARGET_SIZE = 1200
MAX_BYTES = 120 * 1024  # 120 KB


def resize_and_compress(src: Path, dst: Path, max_bytes: int = MAX_BYTES) -> dict:
    """Resize src to 1200x1200 and save as WebP <= max_bytes. Returns stats."""
    img = Image.open(src).convert('RGB')
    # Center-crop to square, then resize to 1200x1200
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

    # Try quality levels from high to low
    for quality in (90, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=quality, method=6, exact=False)
        size = buf.tell()
        if size <= max_bytes:
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'resize+webp',
            }

    # Last resort: downscale to 1080 then try
    img2 = img.resize((1080, 1080), Image.LANCZOS)
    for quality in (85, 80, 75, 70, 65, 60):
        buf = io.BytesIO()
        img2.save(buf, 'WEBP', quality=quality, method=6)
        size = buf.tell()
        if size <= max_bytes:
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'downscale-1080+webp',
            }

    # Final fallback
    dst.write_bytes(buf.getvalue())
    return {
        'src': src.name, 'dst': dst.name,
        'src_size': src.stat().st_size, 'dst_size': size,
        'quality': quality, 'method': 'over-limit',
        'warning': f'final size {size:,} B > {max_bytes:,} B limit',
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', help='SKU IDs (default: all with raw/ dir)')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--overwrite', action='store_true', help='overwrite existing webp')
    args = ap.parse_args()

    if args.skus:
        sku_dirs = [IMG_BASE / s for s in args.skus]
    else:
        sku_dirs = [d for d in IMG_BASE.iterdir() if d.is_dir() and (d / 'raw').is_dir()]

    if not sku_dirs:
        print('No SKU dirs with raw/ found.')
        return

    total = 0
    for sku_dir in sorted(sku_dirs):
        raw_dir = sku_dir / 'raw'
        if not raw_dir.is_dir():
            continue
        raws = sorted([p for p in raw_dir.iterdir() if p.suffix.lower() in ('.webp', '.png', '.jpg', '.jpeg')])
        if not raws:
            continue
        print(f'--- {sku_dir.name} ({len(raws)} files) ---')
        for src in raws:
            # extract view from filename: PC-001-HERO.webp -> HERO
            m = re.match(r'^[A-Z]+-\d+-(.+?)\.(webp|png|jpg|jpeg)$', src.name, re.IGNORECASE)
            if not m:
                print(f'  SKIP {src.name} (name pattern)')
                continue
            view = m.group(1)
            dst = sku_dir / f'{sku_dir.name}-{view}.webp'
            if dst.exists() and not args.overwrite:
                print(f'  SKIP {dst.name} (exists, {dst.stat().st_size:,} B)')
                continue
            if args.dry_run:
                print(f'  WOULD {src.name} -> {dst.name}')
                continue
            try:
                stats = resize_and_compress(src, dst)
                warn = f' [WARN: {stats["warning"]}]' if 'warning' in stats else ''
                print(f'  OK   {src.name} ({stats["src_size"]:,}B) -> {dst.name} '
                      f'q={stats["quality"]} {stats["dst_size"]:,}B {stats["method"]}{warn}')
                total += 1
            except Exception as e:
                print(f'  FAIL {src.name}: {e}')

    print(f'\nTotal processed: {total}')


if __name__ == '__main__':
    main()
