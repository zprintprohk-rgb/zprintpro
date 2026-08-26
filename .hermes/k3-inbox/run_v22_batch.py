#!/usr/bin/env python3
"""
V22 batch runner — call Seedream 5.0 lite for selected SKUs and download to disk.

Reads prompts from .hermes/k3-inbox/v22-prompts-all-en.txt
Saves images to F:/zprintpro-nextjs/zprintpro-en-us-images/<SKU>/<SKU>-<VIEW>.webp

Usage:
  python run_v22_batch.py [--skus PC-001 PC-002 ...] [--key <ARK_API_KEY>] [--model <model_name>]
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
PROMPTS_FILE = WORKSPACE / '.hermes/k3-inbox/v22-prompts-all-en.txt'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
DEFAULT_MODEL = 'doubao-seedream-5-0-lite-260128'
DEFAULT_SIZE = '4K'


def parse_prompts_file(text: str, target_skus: list) -> list:
    """Extract (sku_id, view, prompt) tuples for target SKUs from v22-prompts-all-en.txt."""
    tasks = []
    # Split by SKU block headers
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.search(r'^### SKU-\d+\s*\|\s*(\S+)\s*\|', b, re.MULTILINE)
        if not m:
            continue
        sku_id = m.group(1)
        if sku_id not in target_skus:
            continue
        # Find all [VIEW] (chars) PROMPT blocks
        for vm in re.finditer(
            r'^\[([A-Z][A-Z-]*)\]\s*\(\d+\s*chars\)\s*\n(.+?)(?=^\[|^---|\Z)',
            b, re.MULTILINE | re.DOTALL,
        ):
            view = vm.group(1)
            prompt = vm.group(2).strip()
            tasks.append((sku_id, view, prompt))
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


def download(url: str, out_path: Path) -> int:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = resp.read()
    out_path.write_bytes(data)
    return len(data)


def ext_from_url(url: str, content_type: str = '') -> str:
    """Pick extension from URL or content-type."""
    if 'png' in content_type or url.lower().endswith('.png'):
        return '.png'
    if 'jpeg' in content_type or 'jpg' in content_type or url.lower().endswith(('.jpg', '.jpeg')):
        return '.jpg'
    return '.webp'  # default for Seedream


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', required=True, help='SKU IDs to process')
    ap.add_argument('--key', help='ARK API key (or set ARK_API_KEY env)')
    ap.add_argument('--model', default=DEFAULT_MODEL)
    ap.add_argument('--size', default=DEFAULT_SIZE)
    ap.add_argument('--sleep', type=float, default=1.5, help='sleep between calls (s)')
    ap.add_argument('--dry-run', action='store_true', help='parse only, no API calls')
    args = ap.parse_args()

    api_key = args.key or os.environ.get('ARK_API_KEY')
    if not api_key and not args.dry_run:
        print('ERROR: --key or ARK_API_KEY env required', file=sys.stderr)
        sys.exit(1)

    text = PROMPTS_FILE.read_text(encoding='utf-8')
    tasks = parse_prompts_file(text, args.skus)
    if not tasks:
        print(f'ERROR: no tasks found for {args.skus}', file=sys.stderr)
        sys.exit(1)

    print(f'Model: {args.model} | size: {args.size} | watermark: false')
    print(f'Target SKUs: {args.skus}')
    print(f'Tasks: {len(tasks)} (expected {len(args.skus) * 4} for 4-view SKUs)')
    print()

    if args.dry_run:
        for sku, view, p in tasks:
            print(f'[DRY] {sku}-{view}: {len(p)} chars')
        return

    results = []
    failed = []
    for i, (sku, view, prompt) in enumerate(tasks, 1):
        # Save ORIGINAL to raw/ subdir (preserve high-res source)
        raw_dir = IMG_BASE / sku / 'raw'
        # extension detected after download; placeholder name for skip check
        raw_path = raw_dir / f'{sku}-{view}.jpg'
        # Skip if raw already exists with size > 0
        if raw_path.exists() and raw_path.stat().st_size > 5000:
            print(f'[{i:02d}/{len(tasks):02d}] SKIP {sku}-{view} (raw exists: {raw_path.stat().st_size:,} B)')
            results.append((sku, view, 'SKIP', raw_path.stat().st_size))
            continue
        t0 = time.time()
        try:
            url = call_api(api_key, args.model, prompt, args.size)
            # Download to temp first, then detect format and rename
            tmp_path = raw_path.with_suffix('.tmp')
            data_bytes = None
            req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
            with urllib.request.urlopen(req, timeout=120) as resp:
                data_bytes = resp.read()
            tmp_path.write_bytes(data_bytes)
            # Detect actual format from magic bytes
            ext = '.jpg'
            if data_bytes[:8].startswith(b'\x89PNG\r\n\x1a\n'):
                ext = '.png'
            elif data_bytes[:4] == b'RIFF' and data_bytes[8:12] == b'WEBP':
                ext = '.webp'
            elif data_bytes[:2] == b'\xff\xd8':
                ext = '.jpg'
            final_path = raw_path.with_suffix(ext)
            tmp_path.rename(final_path)
            sz = len(data_bytes)
            dt = time.time() - t0
            print(f'[{i:02d}/{len(tasks):02d}] OK   {sku}-{view} {sz:,} B in {dt:.1f}s  -> raw/{final_path.name}')
            results.append((sku, view, 'OK', sz))
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')[:300]
            print(f'[{i:02d}/{len(tasks):02d}] FAIL {sku}-{view} HTTP {e.code}: {body}')
            failed.append((sku, view, f'HTTP {e.code}'))
        except Exception as e:
            print(f'[{i:02d}/{len(tasks):02d}] FAIL {sku}-{view}: {e}')
            failed.append((sku, view, str(e)))
        time.sleep(args.sleep)

    print()
    print('=== Summary ===')
    ok = sum(1 for r in results if r[2] == 'OK')
    sk = sum(1 for r in results if r[2] == 'SKIP')
    print(f'OK:   {ok}')
    print(f'SKIP: {sk}')
    print(f'FAIL: {len(failed)}')
    if failed:
        print('Failed:')
        for sku, view, err in failed:
            print(f'  {sku}-{view}: {err}')
    print(f'Raw images saved to: {IMG_BASE}/<SKU>/raw/')
    print(f'Next step: python post_v22_resize.py --skus {" ".join(args.skus)}')


if __name__ == '__main__':
    main()
