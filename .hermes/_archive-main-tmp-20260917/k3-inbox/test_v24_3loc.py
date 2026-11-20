#!/usr/bin/env python3
"""V24 test: 3 locale HERO with 2-3 selling points."""
import json
import os
import re
import time
import urllib.request
from pathlib import Path
import io
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
RAW_ALL = WORKSPACE / 'zprintpro-en-us-images' / '_raw_all'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
SEEDREAM = WORKSPACE / 'seedream'
API_KEY = os.environ.get('ARK_API_KEY')

CASES = [
    ('en', 'BC-001', 'greeting-cards'),
    ('ja', 'DJ-001', 'doujinshi'),
    ('zh-hk', 'PKG-014', 'corrugated-boxes'),
]


def get_prompt(locale, sku_id):
    f = SEEDREAM / f'v24-prompts-{locale}.txt'
    text = f.read_text(encoding='utf-8')
    for b in re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE):
        if re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku_id)}\s*\|', b):
            m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
            if m:
                return m.group(1).strip()
    return None


def get_seo(locale, sku_id):
    f = SEEDREAM / f'v24-prompts-{locale}.txt'
    text = f.read_text(encoding='utf-8')
    for b in re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE):
        m = re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku_id)}\s*\|\s*(\S+)\s*\|\s*(\S+)', b)
        if m:
            slug, seo = m.group(1), m.group(2)
            if seo and seo.endswith('.webp'):
                return slug, seo
    return sku_id.lower(), f'zprintpro-{sku_id.lower()}-{locale}.webp'


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


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


def process(raw_bytes, dst_webp, sku, locale, seo_filename):
    import tempfile
    tmp = Path(tempfile.mktemp(suffix='.jpg'))
    tmp.write_bytes(raw_bytes)
    img = Image.open(tmp).convert('RGB')
    w, h = img.size
    # Re-encode 4K at q=95
    q95 = io.BytesIO()
    img.save(q95, 'JPEG', quality=95, optimize=True, subsampling=0)
    if q95.tell() > len(raw_bytes):
        raw_bytes = q95.getvalue()
    # Resize to 1200x1200
    side = min(w, h)
    img = img.crop(((w-side)//2, (h-side)//2, (w+side)//2, (h+side)//2)).resize((1200, 1200), Image.LANCZOS)
    tmp.unlink()

    lang = 'zh-Hant' if locale == 'zh-hk' else ('ja' if locale == 'ja' else 'en')
    xmp = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v24">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title xml:lang="{lang}"><rdf:Alt><rdf:li xml:lang="{lang}">zprintpro {sku} hero V24 ({locale})</rdf:li></rdf:Alt></dc:title>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>{esc(sku)}</zprintpro:sku><zprintpro:view>hero</zprintpro:view>
      <zprintpro:locale>{esc(locale)}</zprintpro:locale><zprintpro:version>V24</zprintpro:version>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''
    for q in (90, 85, 82, 80):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6, xmp=xmp)
        if buf.tell() <= 122880:
            break
    dst_webp.parent.mkdir(parents=True, exist_ok=True)
    dst_webp.write_bytes(buf.getvalue())
    return buf.tell(), q, len(raw_bytes)


def main():
    RAW_ALL.mkdir(parents=True, exist_ok=True)
    for locale, sku, name in CASES:
        prompt = get_prompt(locale, sku)
        if not prompt:
            print(f'SKIP {locale}/{sku}: prompt not found')
            continue
        slug, seo = get_seo(locale, sku)
        seo_base = seo.rsplit('.webp', 1)[0]
        print(f'\n=== {locale.upper()} {sku} {name} ===')
        print(f'  Prompt: {len(prompt)} chars | SEO: {seo}')

        t0 = time.time()
        url = call_api_4k(prompt)
        raw_path = RAW_ALL / f'{sku}-{name}_v24-4k_raw.jpg'
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
        with urllib.request.urlopen(req, timeout=180) as resp:
            raw_bytes = resp.read()
        raw_path.write_bytes(raw_bytes)
        api_time = time.time() - t0
        print(f'  API: {api_time:.1f}s | Raw: {len(raw_bytes):,} B')

        dst = IMG_BASE / sku / f'{seo_base}-hero.webp'
        try:
            webp_sz, q, final_raw_sz = process(raw_bytes, dst, sku, locale, seo)
            print(f'  Final raw (q=95 if larger): {final_raw_sz:,} B ({final_raw_sz/1024/1024:.2f}MB)')
            print(f'  WebP: {dst.name} {webp_sz:,}B q={q}')
        except Exception as e:
            print(f'  WebP FAIL: {e}')

    print(f'\n=== Done ===')


if __name__ == '__main__':
    main()
