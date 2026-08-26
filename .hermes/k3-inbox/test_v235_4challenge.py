#!/usr/bin/env python3
"""V23.5 simplified: 4 challenging test images (EN 2 + JA 2)."""
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
import io
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
RAW_ALL = WORKSPACE / 'zprintpro-en-us-images' / '_raw_all'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
SEEDREAM = WORKSPACE / 'seedream'
RAW_ALL.mkdir(parents=True, exist_ok=True)

API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'
MODEL = 'doubao-seedream-5-0-lite-260128'
API_KEY = os.environ.get('ARK_API_KEY')

# 4 challenging SKUs
TEST_CASES = [
    {'locale': 'en', 'sku': 'CL-001', 'view': 'hero', 'name': 'wall-calendar'},
    {'locale': 'en', 'sku': 'BN-001', 'view': 'hero', 'name': 'outdoor-banner'},
    {'locale': 'ja', 'sku': 'DJ-001', 'view': 'hero', 'name': 'doujinshi'},
    {'locale': 'ja', 'sku': 'RP-001', 'view': 'hero', 'name': 'red-packets'},
]


def get_prompt(locale, sku_id, view):
    """Read prompt from V23.5 simplified file."""
    fname = f'v23.5-prompts-{locale}.txt'
    f = SEEDREAM / fname
    text = f.read_text(encoding='utf-8')
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku_id)}\s*', b)
        if not m:
            continue
        # Find view body (skip the line that just says [HERO] (xxx chars))
        m2 = re.search(rf'\[{view.upper()}\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m2:
            return m2.group(1).strip()
    return None


def get_meta(locale, sku_id):
    """Read META from V23.5 file (it has alt/geo in the SKU header line)."""
    fname = f'v23.5-prompts-{locale}.txt'
    f = SEEDREAM / fname
    text = f.read_text(encoding='utf-8')
    blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
    for b in blocks:
        m = re.match(rf'^### SKU-\d+\s*\|\s*{re.escape(sku_id)}\s*\|\s*(\S+)\s*\|\s*(.*?)\s*$', b, re.MULTILINE)
        if not m:
            continue
        slug = m.group(1)
        seo_filename_raw = m.group(2).strip()
        # Fallback seo_filename if empty (DJ-001 etc)
        if seo_filename_raw and seo_filename_raw.endswith('.webp'):
            seo_filename = seo_filename_raw
        else:
            # Build fallback from sku + locale
            seo_filename = f'zprintpro-{slug}-{locale}.webp'
        # Extract SEO+GEO ALT line
        alt_m = re.search(r'^SEO\+GEO ALT:\s*(.+)$', b, re.MULTILINE)
        alt = alt_m.group(1).strip() if alt_m else ''
        # Build a minimal meta dict from the available data
        # For geo keywords, use generic ones based on category
        category = sku_id[:2] if sku_id[:2] in ('ST', 'FL', 'PK', 'PB', 'PO', 'BK', 'ED', 'MN', 'RP', 'CL', 'BN', 'EV', 'DJ', 'BC', 'WI', 'PC') else 'general'
        geo_keywords = {
            'ST': 'custom sticker printing, vinyl stickers, die-cut stickers, waterproof stickers, product labels',
            'FL': 'flyer printing, marketing flyers, A4 flyers, business flyers, event flyers',
            'PK': 'custom packaging boxes, gift boxes, rigid boxes, magnetic boxes, premium packaging',
            'PB': 'paper bag printing, kraft paper bags, custom shopping bags, eco-friendly bags',
            'PO': 'poster printing, A2 posters, event posters, custom posters, wall art',
            'BK': 'book printing, catalog printing, photo book, custom books, lookbook',
            'ED': 'exercise book printing, school workbooks, K-12 educational supplies',
            'MN': 'menu printing, restaurant menus, custom menus, PVC menus',
            'RP': 'red packet printing, Chinese New Year packets, foil red packets, hongbao',
            'CL': 'calendar printing, wall calendar, desk calendar, 2026 calendar',
            'BN': 'banner printing, vinyl banners, outdoor banners, trade show banners',
            'EV': 'envelope printing, custom envelopes, business envelopes, kraft envelopes',
            'DJ': 'doujinshi printing, Comiket, fan books, doujin circle, A5 doujinshi',
            'BC': 'greeting card printing, custom cards, holiday cards, Christmas cards',
            'WI': 'wedding invitation printing, save the date, custom wedding cards, foil wedding invites',
            'PC': 'place card printing, table cards, escort cards, custom place cards',
        }.get(category, 'custom printing, professional print service')
        meta = {
            'alt_en': alt,
            'alt_zh_hk': alt,
            'alt_ja': alt,
            'geo_keywords': geo_keywords,
        }
        return seo_filename, meta
    return None, None


def call_api(prompt, size='2K'):
    body = json.dumps({
        'model': MODEL, 'prompt': prompt,
        'sequential_image_generation': 'disabled',
        'response_format': 'url', 'size': size or '4K',
        'stream': False, 'watermark': False,
    }).encode('utf-8')
    req = urllib.request.Request(API_URL, data=body, headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}',
    })
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read())
        return result['data'][0]['url']


def download(url, out):
    out.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = resp.read()
    out.write_bytes(data)
    return data


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')


def process_image(raw_bytes, sku, view, locale, seo_filename, meta, dst_webp_path):
    """Resize to 1200x1200 WebP <=120KB, embed XMP, write sidecar JSON."""
    import tempfile
    tmp = Path(tempfile.mktemp(suffix='.jpg'))
    tmp.write_bytes(raw_bytes)
    img = Image.open(tmp).convert('RGB')
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((1200, 1200), Image.LANCZOS)
    tmp.unlink()

    alt = meta.get(f'alt_{locale}', meta.get('alt_en', '')) if locale == 'zh-hk' else meta.get('alt_en', meta.get('alt_zh_hk', ''))
    geo = meta.get('geo_keywords', '')
    lang_attr = 'zh-Hant' if locale == 'zh-hk' else ('ja' if locale == 'ja' else 'en')
    xmp = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v23.5-simplified">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title xml:lang="{lang_attr}"><rdf:Alt><rdf:li xml:lang="{lang_attr}">{esc(alt)}</rdf:li></rdf:Alt></dc:title>
      <dc:description xml:lang="{lang_attr}"><rdf:Alt><rdf:li xml:lang="{lang_attr}">{esc(alt)} | SEO: {esc(geo)}</rdf:li></rdf:Alt></dc:description>
      <dc:subject><rdf:Bag><rdf:li>{esc(geo)}</rdf:li></rdf:Bag></dc:subject>
    </rdf:Description>
    <rdf:Description rdf:about=""
        xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>{esc(sku)}</zprintpro:sku>
      <zprintpro:view>{esc(view)}</zprintpro:view>
      <zprintpro:locale>{esc(locale)}</zprintpro:locale>
      <zprintpro:version>V23.5-simplified</zprintpro:version>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''

    MAX = 120 * 1024
    final_q = None
    final_buf = None
    for q in (90, 85, 82, 80, 78, 75, 72, 70, 68, 65, 60):
        buf = io.BytesIO()
        img.save(buf, 'WEBP', quality=q, method=6, exact=False, xmp=xmp)
        if buf.tell() <= MAX:
            final_q, final_buf = q, buf
            break
        final_q, final_buf = q, buf
    if final_buf is None:
        final_q, final_buf = 80, io.BytesIO()
        img.save(final_buf, 'WEBP', quality=80, method=6, xmp=xmp)

    dst_webp_path.parent.mkdir(parents=True, exist_ok=True)
    dst_webp_path.write_bytes(final_buf.getvalue())

    sidecar = {
        'sku': sku, 'view': view, 'locale': locale, 'version': 'V23.5-simplified',
        'seo_filename': seo_filename, 'filename': dst_webp_path.name,
        'alt': alt, 'geo_keywords': geo.split(', ') if geo else [],
        'image_size': '1200x1200', 'file_bytes': final_buf.tell(),
        'quality': final_q, 'format': 'webp',
    }
    dst_json_path = dst_webp_path.with_suffix('.json')
    dst_json_path.write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
    return final_buf.tell(), final_q


def main():
    results = []
    for tc in TEST_CASES:
        locale = tc['locale']
        sku = tc['sku']
        view = tc['view']
        name = tc['name']
        print(f'\n=== {locale.upper()} {sku} {view} ({name}) ===')
        prompt = get_prompt(locale, sku, view)
        if not prompt:
            print(f'  SKIP: prompt not found')
            continue
        seo_filename, meta = get_meta(locale, sku)
        if not meta:
            print(f'  SKIP: META not found')
            continue
        print(f'  Prompt: {len(prompt)} chars')
        print(f'  SEO file: {seo_filename}')
        print(f'  Alt: {meta.get(f"alt_{locale}", meta.get("alt_en", ""))[:80]}...')

        t0 = time.time()
        try:
            url = call_api(prompt, size='4K')
            print(f'  API: {time.time() - t0:.1f}s')
            data_bytes = download(url, RAW_ALL / f'{sku}-{name}_v235s_raw.jpg')
            print(f'  Raw: {len(data_bytes):,} B')
            seo_base = seo_filename.rsplit('.webp', 1)[0]
            dst_webp = IMG_BASE / sku / f'{seo_base}-{view}.webp'
            sz, q = process_image(data_bytes, sku, view, locale, seo_filename, meta, dst_webp)
            print(f'  WebP: {dst_webp.name} {sz:,}B q={q}')
            results.append((locale, sku, name, dst_webp))
        except Exception as e:
            print(f'  FAIL: {e}')

    print(f'\n=== Summary: {len(results)}/{len(TEST_CASES)} succeeded ===')
    for loc, sku, name, p in results:
        sz = p.stat().st_size
        print(f'  {loc} {sku} {name} -> {p.name} ({sz:,}B)')


if __name__ == '__main__':
    main()
