#!/usr/bin/env python3
"""
V23.1 batch runner — Seedream 5.0 lite multi-locale.

Reads from: F:/zprintpro-nextjs/seedream/v23.1-prompts-{locale}.txt
Saves raw:  F:/zprintpro-nextjs/zprintpro-en-us-images/<SKU>/raw/<seo_basename>_raw.jpg
Saves webp: F:/zprintpro-nextjs/zprintpro-en-us-images/<SKU>/<seo_filename>.webp  (1200x1200, <=120KB)

Usage:
  python run_v23_batch.py --skus PC-001 PKG-014 --locales en ja zh-hk
  python run_v23_batch.py --skus PC-001 --locales en  # single locale
  python run_v23_batch.py --skus PC-001 --locales en --dry-run
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

WORKSPACE = Path(r'F:\zprintpro-nextjs')
SEEDREAM_DIR = WORKSPACE / 'seedream'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
DEFAULT_MODEL = 'doubao-seedream-5-0-lite-260128'
DEFAULT_SIZE = '4K'
SUPPORTED_LOCALES = ('en', 'ja', 'zh-hk')


def parse_v23_prompts(text: str, target_skus: list) -> list:
    """Extract (sku, view, prompt, seo_filename) from V23.1 file for target SKUs."""
    tasks = []
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.search(r'^### SKU-\d+\s*\|\s*(\S+)\s*\|\s*(\S+)\s*\|\s*(\S+)\.webp', b, re.MULTILINE)
        if not m:
            continue
        sku_id, slug, seo_filename = m.groups()
        if sku_id not in target_skus:
            continue
        for vm in re.finditer(
            r'^\[([A-Z][A-Z-]*)\]\s*\(\d+\s*chars\)\s*\n(.+?)(?=^\[|^---|\Z)',
            b, re.MULTILINE | re.DOTALL,
        ):
            view = vm.group(1)
            prompt = vm.group(2).strip()
            tasks.append((sku_id, view, prompt, seo_filename))
    return tasks


def call_api(api_key: str, model: str, prompt: str, size: str) -> str:
    body = json.dumps({
        'model': model,
        'prompt': prompt,
        'sequential_image_generation': 'disabled',
        'response_format': 'url',
        'size': size,
        'stream': False,
        'watermark': False,
    }).encode('utf-8')
    req = urllib.request.Request(
        API_URL, data=body, headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}',
        },
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
        if 'data' not in result or not result['data']:
            raise RuntimeError(f"no data in response: {result}")
        return result['data'][0]['url']


def download_to(url: str, out_path: Path) -> tuple:
    """Download to out_path, return (size, format_ext)."""
    out_path.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = resp.read()
    out_path.write_bytes(data)
    # Detect format
    if data[:8].startswith(b'\x89PNG\r\n\x1a\n'):
        ext = '.png'
    elif data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        ext = '.webp'
    elif data[:2] == b'\xff\xd8':
        ext = '.jpg'
    else:
        ext = '.jpg'
    return len(data), ext


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', required=True)
    ap.add_argument('--locales', nargs='+', default=list(SUPPORTED_LOCALES), choices=SUPPORTED_LOCALES)
    ap.add_argument('--key', help='ARK API key (or ARK_API_KEY env)')
    ap.add_argument('--model', default=DEFAULT_MODEL)
    ap.add_argument('--size', default=DEFAULT_SIZE)
    ap.add_argument('--sleep', type=float, default=0.8)
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    api_key = args.key or os.environ.get('ARK_API_KEY')
    if not api_key and not args.dry_run:
        print('ERROR: --key or ARK_API_KEY env required', file=sys.stderr)
        sys.exit(1)

    # Pre-create SKU dirs (parent + raw/)
    for sku in args.skus:
        (IMG_BASE / sku).mkdir(parents=True, exist_ok=True)
        (IMG_BASE / sku / 'raw').mkdir(parents=True, exist_ok=True)

    all_tasks = []
    for locale in args.locales:
        prompts_file = SEEDREAM_DIR / f'v23.1-prompts-{locale}.txt'
        if not prompts_file.exists():
            print(f'ERROR: missing {prompts_file}', file=sys.stderr)
            sys.exit(1)
        text = prompts_file.read_text(encoding='utf-8')
        tasks = parse_v23_prompts(text, args.skus)
        all_tasks.extend([(sku, view, prompt, seo, locale) for sku, view, prompt, seo in tasks])

    if not all_tasks:
        print(f'ERROR: no tasks found for {args.skus} in {args.locales}', file=sys.stderr)
        sys.exit(1)

    print(f'Model: {args.model} | size: {args.size} | watermark: false')
    print(f'Target SKUs: {args.skus}')
    print(f'Locales:     {args.locales}')
    print(f'Tasks: {len(all_tasks)}')
    print()

    if args.dry_run:
        for sku, view, p, seo, loc in all_tasks:
            print(f'[DRY] {sku}-{view}-{loc} -> {seo} ({len(p)} chars)')
        return

    results = []
    failed = []
    total_start = time.time()
    for i, (sku, view, prompt, seo_filename, locale) in enumerate(all_tasks, 1):
        seo_base = seo_filename.rsplit('.webp', 1)[0]
        # View-suffixed naming: <seo_base>-<view>_raw.jpg / .webp
        # Avoids 4 views (HERO/DETAIL/VARIETY/MULTI-ANGLE) overwriting same seo_filename
        raw_path = IMG_BASE / sku / 'raw' / f'{seo_base}-{view.lower()}_raw.jpg'
        webp_path = IMG_BASE / sku / f'{seo_base}-{view.lower()}.webp'

        if raw_path.exists() and raw_path.stat().st_size > 5000:
            print(f'[{i:02d}/{len(all_tasks):02d}] SKIP {sku}-{view}-{locale} (raw exists: {raw_path.stat().st_size:,} B)')
            results.append((sku, view, locale, 'SKIP', raw_path.stat().st_size))
            continue

        t0 = time.time()
        try:
            url = call_api(api_key, args.model, prompt, args.size)
            sz, ext = download_to(url, raw_path)
            dt = time.time() - t0
            print(f'[{i:02d}/{len(all_tasks):02d}] OK   {sku}-{view}-{locale} {sz:,} B ({ext}) in {dt:.1f}s')
            results.append((sku, view, locale, 'OK', sz))
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')[:200]
            print(f'[{i:02d}/{len(all_tasks):02d}] FAIL {sku}-{view}-{locale} HTTP {e.code}: {body}')
            failed.append((sku, view, locale, f'HTTP {e.code}'))
        except Exception as e:
            print(f'[{i:02d}/{len(all_tasks):02d}] FAIL {sku}-{view}-{locale}: {e}')
            failed.append((sku, view, locale, str(e)))
        time.sleep(args.sleep)

    total_dt = time.time() - total_start
    print()
    print('=== Summary ===')
    ok = sum(1 for r in results if r[3] == 'OK')
    sk = sum(1 for r in results if r[3] == 'SKIP')
    print(f'OK:   {ok}')
    print(f'SKIP: {sk}')
    print(f'FAIL: {len(failed)}')
    if failed:
        print('Failed:')
        for sku, view, loc, err in failed:
            print(f'  {sku}-{view}-{loc}: {err}')
    print(f'Total time: {total_dt:.1f}s')
    print(f'Raw images:  {IMG_BASE}/<SKU>/raw/<seo_basename>_raw.jpg')
    print(f'Next step:   python post_v23_resize.py --skus {" ".join(args.skus)} --locales {" ".join(args.locales)}')


if __name__ == '__main__':
    main()
