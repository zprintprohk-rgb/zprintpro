#!/usr/bin/env python3
"""Test 4K size: PKG-014 zh-hk HERO, confirm raw >= 1MB."""
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

# PKG-014 zh-hk HERO
text = (SEEDREAM / 'v23.5-prompts-zh-hk.txt').read_text(encoding='utf-8')
blocks = re.split(r'(?=^### SKU-\d+\s*\|)', text, flags=re.MULTILINE)
prompt = None
for b in blocks:
    if re.match(r'^### SKU-\d+\s*\|\s*PKG-014\s*\|', b):
        m = re.search(r'\[HERO\][^\n]*\n(.+?)(?=^\[|^---|\Z)', b, re.MULTILINE | re.DOTALL)
        if m:
            prompt = m.group(1).strip()
            break
print(f'PKG-014 zh-hk HERO prompt: {len(prompt)} chars')

# API call with 4K
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
RAW_ALL.mkdir(parents=True, exist_ok=True)
raw = RAW_ALL / 'PKG-014-hero_v235s-4k_raw.jpg'
req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.0'})
with urllib.request.urlopen(req, timeout=180) as resp:
    data = resp.read()
raw.write_bytes(data)
print(f'Raw: {len(data):,} B  ({len(data)/1024/1024:.2f} MB)')

# Check dimensions
img = Image.open(raw)
print(f'Dimensions: {img.size[0]}x{img.size[1]}')
print(f'Quality gate: >= 1MB = {len(data) >= 1024*1024}')
