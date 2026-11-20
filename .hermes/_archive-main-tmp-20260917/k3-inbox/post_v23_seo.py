#!/usr/bin/env python3
"""
V23.4 SEO-naming post-processor:
  - Reads raw from  _raw_all/<SKU>-<view>_raw.jpg
  - Resizes 1200x1200, compresses to <=120KB WebP
  - Names output by V23.4 META seo_filename + view suffix
  - Embeds XMP metadata (alt + geo + sku + view) into WebP
  - Writes sidecar <basename>.json with full SEO/GEO fields

Usage:
  python post_v23_seo.py --skus PC-001 PKG-014 FL-003
  python post_v23_seo.py --skus PC-001 --locale en --overwrite
"""
import argparse
import io
import json
import re
import sys
from pathlib import Path
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
SEEDREAM_DIR = WORKSPACE / 'seedream'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
RAW_ALL_DIR = IMG_BASE / '_raw_all'
TARGET_SIZE = 1200
MAX_BYTES = 120 * 1024  # 120 KB
SUPPORTED_LOCALES = ('en', 'ja', 'zh-hk')


def parse_v23_meta(text: str, target_skus: list, locale: str) -> dict:
    """Return {sku: {view: {alt: ..., geo_keywords: ..., seo_filename: ...}, ...}}"""
    out = {s: {} for s in target_skus}
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.search(r'^### SKU-\d+\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|\s*(\S+\.webp)', b, re.MULTILINE)
        if not m:
            continue
        sku, slug, seo_filename = m.groups()
        if sku not in target_skus:
            continue
        # META block — extract per-locale alt + geo_keywords
        meta_m = re.search(r'\[META[^\]]*\]\s*\n(.+?)(?=^----|\Z)', b, re.MULTILINE | re.DOTALL)
        if not meta_m:
            continue
        meta_body = meta_m.group(1)
        # Parse key: value lines
        meta = {}
        for line in meta_body.splitlines():
            km = re.match(r'\s*(\w+):\s*(.+)', line)
            if km:
                meta[km.group(1)] = km.group(2).strip()
        # Get locale-specific alt
        alt_key = f'alt_{locale.replace("-", "_")}' if locale != 'en' else 'alt_en'
        alt = meta.get(alt_key, meta.get('alt_en', ''))
        out[sku] = {
            'sku': sku,
            'slug': slug,
            'seo_filename': seo_filename,
            'alt': alt,
            'geo_keywords': meta.get('geo_keywords', ''),
            'price_range': meta.get('price_range', ''),
            'locale': locale,
        }
    return out


def build_xmp_xml(sku: str, view: str, alt: str, geo: str, seo_filename: str, locale: str) -> str:
    """Build XMP packet for embedding alt/geo in WebP."""
    # Escape XML special chars
    def esc(s):
        return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')
    return f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v23.4">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/">
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="{locale}">{esc(alt)}</rdf:li>
        </rdf:Alt>
      </dc:title>
      <dc:description>
        <rdf:Alt>
          <rdf:li xml:lang="{locale}">{esc(alt)} | SEO: {esc(geo)}</rdf:li>
        </rdf:Alt>
      </dc:description>
      <dc:subject>
        <rdf:Bag>
          <rdf:li>{esc(geo)}</rdf:li>
        </rdf:Bag>
      </dc:subject>
      <photoshop:Source>{esc(seo_filename)}</photoshop:Source>
    </rdf:Description>
    <rdf:Description rdf:about=""
        xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>{esc(sku)}</zprintpro:sku>
      <zprintpro:view>{esc(view)}</zprintpro:view>
      <zprintpro:locale>{esc(locale)}</zprintpro:locale>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''


def resize_and_save(src: Path, dst: Path, xmp_xml: str, meta: dict, view: str, max_bytes: int = MAX_BYTES) -> dict:
    """Crop center to square, resize to 1200x1200, save WebP <= max_bytes with XMP."""
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
        # Pillow supports xmp via the 'xmp' parameter
        img.save(buf, 'WEBP', quality=quality, method=6, exact=False, xmp=xmp_xml)
        size = buf.tell()
        last_buf = (buf, quality, size)
        if size <= max_bytes:
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'resize+webp+xmp',
            }

    # Last resort: downscale to 1080
    img2 = img.resize((1080, 1080), Image.LANCZOS)
    for quality in (85, 80, 75, 70, 65, 60):
        buf = io.BytesIO()
        img2.save(buf, 'WEBP', quality=quality, method=6, xmp=xmp_xml)
        size = buf.tell()
        if size <= max_bytes:
            dst.parent.mkdir(parents=True, exist_ok=True)
            dst.write_bytes(buf.getvalue())
            return {
                'src': src.name, 'dst': dst.name,
                'src_size': src.stat().st_size, 'dst_size': size,
                'quality': quality, 'method': 'downscale-1080+webp+xmp',
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
    ap.add_argument('--skus', nargs='+', required=True)
    ap.add_argument('--locale', default='en', choices=SUPPORTED_LOCALES)
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--overwrite', action='store_true')
    args = ap.parse_args()

    # Read V23.4 META
    prompts_file = SEEDREAM_DIR / f'v23.4-prompts-{args.locale}.txt'
    if not prompts_file.exists():
        print(f'ERROR: missing {prompts_file}', file=sys.stderr)
        sys.exit(1)
    text = prompts_file.read_text(encoding='utf-8')
    meta_map = parse_v23_meta(text, args.skus, args.locale)

    missing = [s for s in args.skus if s not in meta_map or not meta_map[s]]
    if missing:
        print(f'WARN: no META found for {missing} in {prompts_file}', file=sys.stderr)

    total = 0
    warn = 0
    for sku in args.skus:
        meta = meta_map.get(sku)
        if not meta:
            print(f'--- {sku}: SKIPPED (no META) ---')
            continue
        seo_base = meta['seo_filename'].rsplit('.webp', 1)[0]
        # Find raw files for this SKU
        sku_pattern = re.compile(rf'^{re.escape(sku)}-(hero|detail|variety|multi-angle|spread)_raw\.(jpg|jpeg|png|webp)$', re.IGNORECASE)
        raws = sorted([p for p in RAW_ALL_DIR.iterdir() if sku_pattern.match(p.name)])
        if not raws:
            print(f'--- {sku}: no raw files in {RAW_ALL_DIR} ---')
            continue
        print(f'--- {sku} ({len(raws)} files) ---')
        for src in raws:
            m = sku_pattern.match(src.name)
            view = m.group(1).lower()
            # SEO-naming: <seo_base>-<view>.webp
            dst_webp = IMG_BASE / sku / f'{seo_base}-{view}.webp'
            dst_json = IMG_BASE / sku / f'{seo_base}-{view}.json'

            if dst_webp.exists() and not args.overwrite:
                print(f'  SKIP {dst_webp.name} (exists)')
                continue
            if args.dry_run:
                print(f'  WOULD {src.name} -> {dst_webp.name} + {dst_json.name}')
                continue

            # Build XMP
            xmp = build_xmp_xml(
                sku=sku, view=view,
                alt=meta['alt'],
                geo=meta['geo_keywords'],
                seo_filename=meta['seo_filename'],
                locale=args.locale,
            )

            try:
                stats = resize_and_save(src, dst_webp, xmp, meta, view)
                warn_tag = f' [WARN: {stats["warning"]}]' if 'warning' in stats else ''
                if 'warning' in stats:
                    warn += 1
                # Write sidecar JSON
                sidecar = {
                    'sku': sku,
                    'slug': meta['slug'],
                    'view': view,
                    'locale': args.locale,
                    'seo_filename': meta['seo_filename'],
                    'filename': dst_webp.name,
                    'alt': meta['alt'],
                    'geo_keywords': meta['geo_keywords'].split(', ') if meta['geo_keywords'] else [],
                    'price_range': meta['price_range'],
                    'image_size': '1200x1200',
                    'file_bytes': stats['dst_size'],
                    'quality': stats['quality'],
                    'format': 'webp',
                }
                dst_json.write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
                print(f'  OK   {src.name} -> {dst_webp.name} q={stats["quality"]} {stats["dst_size"]:,}B + {dst_json.name}{warn_tag}')
                total += 1
            except Exception as e:
                print(f'  FAIL {src.name}: {e}')

    print(f'\nTotal processed: {total}, warnings: {warn}')


if __name__ == '__main__':
    main()
