#!/usr/bin/env python3
"""
V23.4 post-processor: raw (central) -> 1200x1200 WebP <=120KB per SKU.

Reads:   zprintpro-en-us-images/_raw_all/<SKU>-<VIEW>_raw.jpg
Writes:  zprintpro-en-us-images/<SKU>/<SKU>-<VIEW>.webp  (1200x1200, <=120KB)

Usage:
  python post_v23_central.py --skus PC-001 PKG-014 FL-003
"""
import argparse
import io
import re
import sys
from pathlib import Path
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
RAW_ALL_DIR = IMG_BASE / '_raw_all'
TARGET_SIZE = 1200
MAX_BYTES = 120 * 1024  # 120 KB

# Views that may exist
VIEW_PATTERN = re.compile(r'^([A-Z]+-\d+)-(hero|detail|variety|multi-angle|spread)_raw\.(jpg|jpeg|png|webp)$', re.IGNORECASE)


def resize_and_compress(src: Path, dst: Path, max_bytes: int = MAX_BYTES) -> dict:
    """Crop center to square, resize to 1200x1200, save WebP <= max_bytes."""
    img = Image.open(src).convert('RGB')
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((TARGET_SIZE, TARGET_SIZE), Image.LANCZOS)

    last_buf = None
    for quality in (90, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=quality, method=6, exact=False)
        size = buf.tell()
        last_buf = (buf, quality, size)
        if size <= max_bytes:
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'resize+webp',
            }

    # Last resort: downscale to 1080
    img2 = img.resize((1080, 1080), Image.LANCZOS)
    for quality in (85, 80, 75, 70, 65, 60):
        buf = io.BytesIO()
        img2.save(buf, 'WEBP', quality=quality, method=6)
        size = buf.tell()
        if size <= max_bytes:
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'downscale-1080+webp',
            }

    # Over-limit fallback
    buf, quality, size = last_buf
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_bytes(buf.getvalue())
    return {
        'src': src.name, 'dst': dst.name,
        'src_size': src.stat().st_size, 'dst_size': size,
        'quality': quality, 'method': 'over-limit',
        'warning': f'final size {size:,} B > {max_bytes:,} B limit',
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', required=True, help='SKU IDs to process')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--overwrite', action='store_true')
    args = ap.parse_args()

    total = 0
    warn = 0
    for sku in args.skus:
        sku_pattern = re.compile(rf'^{re.escape(sku)}-(hero|detail|variety|multi-angle|spread)_raw\.(jpg|jpeg|png|webp)$', re.IGNORECASE)
        raws = sorted([p for p in RAW_ALL_DIR.iterdir() if sku_pattern.match(p.name)])
        if not raws:
            print(f'--- {sku} : no raw files found in {RAW_ALL_DIR} ---')
            continue
        print(f'--- {sku} ({len(raws)} files) ---')
        for src in raws:
            m = sku_pattern.match(src.name)
            view = m.group(1).lower()
            dst = IMG_BASE / sku / f'{sku}-{view}.webp'
            if dst.exists() and not args.overwrite:
                print(f'  SKIP {dst.name} (exists, {dst.stat().st_size:,} B)')
                continue
            if args.dry_run:
                print(f'  WOULD {src.name} -> {dst.name}')
                continue
            try:
                stats = resize_and_compress(src, dst)
                warn_tag = f' [WARN: {stats["warning"]}]' if 'warning' in stats else ''
                if 'warning' in stats:
                    warn += 1
                print(f'  OK   {src.name} ({stats["src_size"]:,}B) -> {dst.name} '
                      f'q={stats["quality"]} {stats["dst_size"]:,}B {stats["method"]}{warn_tag}')
                total += 1
            except Exception as e:
                print(f'  FAIL {src.name}: {e}')

    print(f'\nTotal processed: {total}, warnings: {warn}')


if __name__ == '__main__':
    main()
