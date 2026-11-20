#!/usr/bin/env python3
"""V23.5.1 verification: PKG-014 zh-hk HERO with explosion badge + bright vivid."""
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

# Get V23.5.1 PKG-014 zh-hk HERO prompt
text = (SEEDREAM / 'v23.5-prompts-zh-hk.txt').read_text(encoding='utf-8')
prompt = None
for b in re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE):
    if re.match(r'^### SKU-\d+\s*\|\s*PKG-014\s*\|', b):
        m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m:
            prompt = m.group(1).strip()
            break
print(f'PKG-014 zh-hk HERO prompt: {len(prompt)} chars')

# API call (4K + q=95 re-encode)
body = json.dumps({
    'model': 'doubao-seedream-5-0-lite-260128', 'prompt': prompt,
    'sequential_image_generation': 'disabled', 'response_format': 'url',
    'size': '4K', 'stream': False, 'watermark': False,
}).encode('utf-8')
req = urllib.request.Request(
    'https://ark.cn-beijing.volces.com/api/v3/images/generations',
    data=body, headers={'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'},
)
t0 = time.time()
with urllib.request.urlopen(req, timeout=300) as resp:
    result = json.loads(resp.read())
    url = result['data'][0]['url']
print(f'API: {time.time() - t0:.1f}s')

# Download
raw = RAW_ALL / 'PKG-014-hero_v2351-4k_raw.jpg'
RAW_ALL.mkdir(parents=True, exist_ok=True)
req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
with urllib.request.urlopen(req, timeout=180) as resp:
    data = resp.read()
raw.write_bytes(data)
print(f'Original API raw: {len(data):,} B')

# Re-encode 4K at q=95
img = Image.open(raw).convert('RGB')
w, h = img.size
print(f'Dimensions: {w}x{h}')

q95_buf = io.BytesIO()
img.save(q95_buf, 'JPEG', quality=95, optimize=True, subsampling=0)
q95_size = q95_buf.tell()
print(f'q=95 re-encoded: {q95_size:,} B ({q95_size/1024/1024:.2f} MB)')
if q95_size > len(data):
    raw.write_bytes(q95_buf.getvalue())
    print(f'  -> Saved q=95 as new raw (larger)')

# Resize to 1200x1200 webp
side = min(w, h)
img_small = img.crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2))
img_small = img_small.resize((1200, 1200), Image.LANCZOS)

# XMP
def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;')

xmp = f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="zprintpro-v23.5.1">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title xml:lang="zh-Hant"><rdf:Alt><rdf:li xml:lang="zh-Hant">E坑/F坑 瓦楞彩印盒 3層/5層 結構 耐壓 抗衝 跨境物流</rdf:li></rdf:Alt></dc:title>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:zprintpro="https://zprintpro.com/ns/1.0/">
      <zprintpro:sku>PKG-014</zprintpro:sku><zprintpro:view>hero</zprintpro:view>
      <zprintpro:locale>zh-hk</zprintpro:locale><zprintpro:version>V23.5.1</zprintpro:version>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>'''

for q in (90, 85, 82, 80):
    buf = io.BytesIO()
    img_small.save(buf, 'WEBP', quality=q, method=6, xmp=xmp)
    if buf.tell() <= 122880:
        break

dst = IMG_BASE / 'PKG-014' / 'zprintpro-packaging-corrugated-boxes-zh-hk-hero.webp'
dst.parent.mkdir(parents=True, exist_ok=True)
dst.write_bytes(buf.getvalue())
print(f'WebP: {dst.name} {buf.tell():,}B q={q}')

# Sidecar
sidecar = {
    'sku': 'PKG-014', 'view': 'hero', 'locale': 'zh-hk', 'version': 'V23.5.1',
    'seo_filename': 'zprintpro-packaging-corrugated-boxes-zh-hk.webp',
    'filename': dst.name, 'image_size': '1200x1200',
    'file_bytes': buf.tell(), 'quality': q, 'format': 'webp',
    'raw_size': '4096x4096', 'raw_bytes_q95': q95_size,
}
dst.with_suffix('.json').write_text(json.dumps(sidecar, ensure_ascii=False, indent=2), encoding='utf-8')
print('Sidecar written')
