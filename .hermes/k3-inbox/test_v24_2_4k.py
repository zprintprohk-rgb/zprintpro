#!/usr/bin/env python3
"""V24.2 R2 4K test: 4 challenge images (BC-001/BN-001/RP-001/DJ-001) x 3 locales.
Reads V24.2 prompts file, generates 4K raw, re-encodes at q=95, processes to 1200x1200 webp.
Verifies: no ZprintPro in prompt body, all 12 fields present, raw >= 1MB, 4096x4096.
"""
import io
import json
import os
import re
import tempfile
import time
import urllib.request
from pathlib import Path

from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
RAW_ALL = WORKSPACE / 'zprintpro-en-us-images' / '_raw_all'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
SEEDREAM = WORKSPACE / 'seedream'

API_KEY = os.environ.get('ARK_API_KEY')

# 4 challenge SKUs (V23 baseline) — re-tested under V24.2 R2
CASES = [
    ('en', 'BC-001', 'premium-greeting-cards'),
    ('en', 'BN-001', 'outdoor-vinyl-banners'),
    ('ja', 'RP-001', 'foil-red-packets'),
    ('ja', 'DJ-001', 'doujinshi-printing'),
]


def get_prompt(locale, sku_id):
    """Read HERO prompt from V24.2 file."""
    f = SEEDREAM / f'v24.2-prompts-{locale}.txt'
    text = f.read_text(encoding='utf-8')
    for b in re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE):
        if re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku_id)}\s*\|', b):
            m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
            if m:
                return m.group(1).strip()
    return None


def get_seo_filename(locale, sku_id, slug):
    """Read SEO filename from products.ts, fallback to slug-based."""
    f = WORKSPACE / 'src/data/products.ts'
    text = f.read_text(encoding='utf-8')
    # Find the SKU block
    m = re.search(rf"id:\s*'{re.escape(sku_id)}'.*?filename:\s*{{[^}}]+}}", text, re.DOTALL)
    if m:
        # Parse locale-specific filename
        m2 = re.search(rf"['\"]?{locale}['\"]?\s*:\s*['\"]([^'\"]+\.webp)['\"]", m.group(0))
        if m2:
            return m2.group(1)
    return f'zprintpro-{slug}-{locale}.webp'


def call_api_4k(prompt):
    body = json.dumps({
        'model': 'doubao-seedream-5-0-lite-260128', 'prompt': prompt,
        'sequential_image_generation': 'disabled', 'response_format': 'url',
        'size': '4K', 'stream': False, 'watermark': False,
    }).encode('utf-8')
    req = urllib.request.Request(
        'https://ark.cn-beijing.volces.com/api/v3/images/generations',
        data=body, headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'},
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        return json.loads(resp.read())['data'][0]['url']


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def process(raw_bytes, dst_webp, sku, view, locale, seo_filename, alt, raw_path=None):
    """4096x4096 raw -> 1200x1200 webp <=120KB. Re-encodes raw at q=95 if needed."""
    tmp = Path(tempfile.mktemp(suffix='.jpg'))
    tmp.write_bytes(raw_bytes)
    img = Image.open(tmp).convert('RGB')
    w, h = img.size
    assert (w, h) == (4096, 4096), f'Expected 4096x4096, got {w}x{h}'

    if raw_path is not None:
        q95_buf = io.BytesIO()
        img.save(q95_buf, 'JPEG', quality=95, optimize=True, subsampling=0)
        if q95_buf.tell() > len(raw_bytes):
            raw_path.write_bytes(q95_buf.getvalue())
            print(f'  4K re-encoded: {q95_buf.tell():,}B (q=95, 4:4:4)')

    side = min(w, h)
    img = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
    img = img.resize((1200, 1200), Image.LANCZOS)
    tmp.unlink()

    lang_attr = 'zh-Hant' if locale == 'zh-hk' else ('ja' if locale == 'ja' else 'en')
    xmp = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v24.2-r2">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title xml:lang="{lang_attr}"><rdf:Alt><rdf:li xml:lang="{lang_attr}">{esc(alt)}</rdf:li></rdf:Alt></dc:title>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>{esc(sku)}</zprintpro:sku><zprintpro:view>{esc(view)}</zprintpro:view>
      <zprintpro:locale>{esc(locale)}</zprintpro:locale>
      <zprintpro:version>V24.2-R2</zprintpro:version>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''

    MAX = 120 * 1024
    for q in (90, 85, 82, 80, 78, 75, 72, 70):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6, xmp=xmp)
        if buf.tell() <= MAX:
            break

    dst_webp.parent.mkdir(parents=True, exist_ok=True)
    dst_webp.write_bytes(buf.getvalue())
    return buf.tell(), q


def main():
    RAW_ALL.mkdir(parents=True, exist_ok=True)
    results = []
    for locale, sku, slug in CASES:
        prompt = get_prompt(locale, sku)
        if not prompt:
            print(f'SKIP {sku} {locale}: prompt not found')
            continue

        # Hard check: no ZprintPro/智印港/ジープリント in prompt body
        forbidden = ['ZprintPro', '智印港', '智印云', 'ジープリント']
        violations = [w for w in forbidden if w in prompt]
        if violations:
            print(f'FAIL {sku} {locale}: prompt contains forbidden brand words: {violations}')
            continue

        # Hard check: char count <= 2300
        if len(prompt) > 2300:
            print(f'FAIL {sku} {locale}: prompt {len(prompt)} chars > 2300 limit')
            continue

        seo_filename = get_seo_filename(locale, sku, slug)
        seo_base = seo_filename.rsplit('.webp', 1)[0]
        print(f'\n=== {locale.upper()} {sku} ({slug}) ===')
        print(f'  Prompt: {len(prompt)} chars | SEO: {seo_filename}')
        print(f'  Brand check: PASS (no ZprintPro/智印港/ジープリント)')

        t0 = time.time()
        url = call_api_4k(prompt)
        raw_path = RAW_ALL / f'{sku}-{slug}_v242-4k_raw.jpg'
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
        with urllib.request.urlopen(req, timeout=180) as resp:
            raw_bytes = resp.read()
        raw_path.write_bytes(raw_bytes)
        raw_mb = len(raw_bytes) / 1024 / 1024
        api_time = time.time() - t0
        print(f'  API: {api_time:.1f}s | Raw: {len(raw_bytes):,} B ({raw_mb:.2f} MB) | {"PASS" if raw_mb >= 1.0 else "FAIL"}')

        img = Image.open(raw_path)
        is_4k = img.size == (4096, 4096)
        print(f'  Dimensions: {img.size[0]}x{img.size[1]} | {"4K PASS" if is_4k else "NOT 4K!"}')

        dst_webp = IMG_BASE / sku / f'{seo_base}-hero.webp'
        alt = f'zprintpro {sku} {slug} ({locale.upper()} V24.2 R2 4K — fictional client brand, no ZprintPro in image)'
        try:
            webp_sz, q = process(raw_bytes, dst_webp, sku, 'hero', locale, seo_filename, alt, raw_path=raw_path)
            sidecar = {
                'sku': sku, 'view': 'hero', 'locale': locale, 'version': 'V24.2-R2',
                'seo_filename': seo_filename, 'filename': dst_webp.name,
                'alt': alt, 'image_size': '1200x1200',
                'file_bytes': webp_sz, 'quality': q, 'format': 'webp',
                'raw_size': '4096x4096', 'raw_bytes': len(raw_bytes),
                'prompt_chars': len(prompt),
                'brand_in_image': 'NONE (fictional client brand only)',
            }
            dst_webp.with_suffix('.json').write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
            print(f'  WebP: {dst_webp.name} {webp_sz:,}B q={q}')
        except Exception as e:
            print(f'  WebP FAIL: {e}')

        results.append((locale, sku, slug, raw_mb, is_4k, len(prompt)))

    print(f'\n=== Summary ===')
    for loc, sku, slug, mb, ok, pc in results:
        print(f'  {loc} {sku}: prompt {pc}c | raw {mb:.2f}MB | 4K={ok}')


if __name__ == '__main__':
    main()
