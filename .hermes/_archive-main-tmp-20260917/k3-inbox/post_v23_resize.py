#!/usr/bin/env python3
"""
V23.1 post-processor: V23 raw -> 1200x1200 WebP <=120KB per SKU/locale.

Reads:   zprintpro-en-us-images/<SKU>/raw/<seo_basename>_raw.jpg
Writes:  zprintpro-en-us-images/<SKU>/<seo_basename>.webp  (1200x1200, <=120KB)

Usage:
  python post_v23_resize.py --skus PC-001 PKG-014 --locales en ja zh-hk
  python post_v23_resize.py --skus PC-001 --locales en
  python post_v23_resize.py   # all SKUs with raw/ dir
"""
import argparse
import io
import os
import re
import sys
from pathlib import Path
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
SEEDREAM_DIR = WORKSPACE / 'seedream'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
TARGET_SIZE = 1200
MAX_BYTES = 120 * 1024  # 120 KB
SUPPORTED_LOCALES = ('en', 'ja', 'zh-hk')


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


def seo_basename_map(skus: list, locales: list) -> dict:
    """Read V23.1 files and return {sku: {locale: seo_filename}}."""
    out = {s: {} for s in skus}
    for locale in locales:
        f = SEEDREAM_DIR / f'v23.1-prompts-{locale}.txt'
        if not f.exists():
            print(f'WARN: missing {f}', file=sys.stderr)
            continue
        text = f.read_text(encoding='utf-8')
        blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
        for b in blocks:
            m = re.search(r'^### SKU-\d+\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|\s*(\S+\.webp)', b, re.MULTILINE)
            if not m:
                continue
            sku = m.group(1)
            if sku not in skus:
                continue
            out[sku][locale] = m.group(3)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', help='SKU IDs (default: all with raw/ dir)')
    ap.add_argument('--locales', nargs='+', default=list(SUPPORTED_LOCALES), choices=SUPPORTED_LOCALES)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--overwrite', action='store_true')
    args = ap.parse_args()

    # Discover SKUs
    if args.skus:
        sku_dirs = [IMG_BASE / s for s in args.skus]
    else:
        sku_dirs = [d for d in IMG_BASE.iterdir() if d.is_dir() and (d / 'raw').is_dir()]

    sku_list = [d.name for d in sku_dirs if d.is_dir()]
    # Resolve SEO filenames per (sku, locale)
    seo_map = seo_basename_map(sku_list, args.locales)

    total = 0
    warn = 0
    for sku in sku_list:
        raw_dir = IMG_BASE / sku / 'raw'
        if not raw_dir.is_dir():
            continue
        # Match files of form <seo_basename>_raw.<ext>
        raws = sorted([
            p for p in raw_dir.iterdir()
            if p.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp')
        ])
        if not raws:
            continue
        print(f'--- {sku} ---')
        for src in raws:
            # Filename like: zprintpro-place-cards-wedding-place-cards-1-en-hero_raw.jpg
            # Strip the trailing _raw.<ext>; pattern: <seo_base>-<view>_raw.<ext>
            stem = src.stem  # e.g. zprintpro-place-cards-wedding-place-cards-1-en-hero_raw
            base = re.sub(r'-(hero|detail|variety|multi-angle|spread)_raw$', '', stem)
            view_m = re.search(r'-(hero|detail|variety|multi-angle|spread)_raw$', stem)
            if not view_m:
                print(f'  SKIP {src.name} (cannot parse view)')
                continue
            view = view_m.group(1)
            dst = IMG_BASE / sku / f'{base}-{view}.webp'
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
