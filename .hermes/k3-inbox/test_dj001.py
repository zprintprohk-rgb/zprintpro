#!/usr/bin/env python3
"""Quick single test: JA DJ-001 doujinshi."""
import json
import os
import re
import time
import urllib.request
from pathlib import Path
import io
import tempfile
from PIL import Image

WORKSPACE = Path(r'F:\zprintpro-nextjs')
RAW_ALL = WORKSPACE / 'zprintpro-en-us-images' / '_raw_all'
IMG_BASE = WORKSPACE / 'zprintpro-en-us-images'
SEEDREAM = WORKSPACE / 'seedream'

API_KEY = os.environ.get('ARK_API_KEY')

# Get DJ-001 JA HERO prompt
text = (SEEDREAM / 'v23.5-prompts-ja.txt').read_text(encoding='utf-8')
blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
prompt = None
for b in blocks:
    if re.match(r'^### SKU-\d+\s*\|\s*DJ-001\s*\|', b):
        m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m:
            prompt = m.group(1).strip()
            break
if not prompt:
    print('ERROR: DJ-001 JA HERO not found')
    import sys
    sys.exit(1)

print(f'Prompt: {len(prompt)} chars')

# Call API
body = json.dumps({
    'model': 'doubao-seedream-5-0-lite-260128',
    'prompt': prompt,
    'sequential_image_generation': 'disabled',
    'response_format': 'url', 'size': '4K', 'stream': False, 'watermark': False,
}).encode('utf-8')
req = urllib.request.Request(
    'https://ark.cn-beijing.volces.com/api/v3/images/generations',
    data=body, headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'},
)
t0 = time.time()
with urllib.request.urlopen(req, timeout=180) as resp:
    result = json.loads(resp.read())
    url = result['data'][0]['url']
print(f'API: {time.time() - t0:.1f}s')

# Download
raw = RAW_ALL / 'DJ-001-doujinshi_v235s-raw.jpg'
req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
with urllib.request.urlopen(req, timeout=120) as resp:
    data = resp.read()
raw.write_bytes(data)
print(f'Raw: {len(data):,} B')

# Post-process
img = Image.open(raw).convert('RGB')
w, h = img.size
side = min(w, h)
img = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
img = img.resize((1200, 1200), Image.LANCZOS)

# Build XMP (no seo_filename available; use slug fallback)
seo_base = 'zprintpro-japan-doujin-doujinshi-printing-ja'  # fallback based on category
xmp = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v23.5-simplified">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title xml:lang="ja"><rdf:Alt><rdf:li xml:lang="ja">同人誌印刷 (doujinshi printing for Comiket events)</rdf:li></rdf:Alt></dc:title>
      <dc:description xml:lang="ja"><rdf:Alt><rdf:li xml:lang="ja">Comiket向け同人誌印刷 | SEO: doujinshi printing, Comiket, fan books, doujin circle, A5 doujinshi</rdf:li></rdf:Alt></dc:description>
      <dc:subject><rdf:Bag><rdf:li>doujinshi printing, Comiket, fan books, doujin circle, A5 doujinshi</rdf:li></rdf:Bag></dc:subject>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>DJ-001</zprintpro:sku><zprintpro:view>hero</zprintpro:view>
      <zprintpro:locale>ja</zprintpro:locale><zprintpro:version>V23.5-simplified</zprintpro:version>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''

# Compress
MAX = 120 * 1024
for q in (90, 85, 82, 80, 78, 75, 72, 70):
    buf = io.BytesIO()
    img.save(buf, 'WEBP', quality=q, method=6, xmp=xmp)
    if buf.tell() <= MAX:
        break

dst = IMG_BASE / 'DJ-001' / f'{seo_base}-hero.webp'
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_bytes(buf.getvalue())
print(f'WebP: {dst.name} {buf.tell():,}B q={q}')

# Sidecar
sidecar = {
    'sku': 'DJ-001', 'view': 'hero', 'locale': 'ja', 'version': 'V23.5-simplified',
    'seo_filename': f'{seo_base}.webp', 'filename': dst.name,
    'alt': '同人誌印刷 (doujinshi printing for Comiket events)',
    'geo_keywords': 'doujinshi printing, Comiket, fan books, doujin circle, A5 doujinshi',
    'image_size': '1200x1200', 'file_bytes': buf.tell(), 'quality': q, 'format': 'webp',
}
dst.with_suffix('.json').write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
print('Sidecar written')
