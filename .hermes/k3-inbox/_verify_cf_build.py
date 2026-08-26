# -*- coding: utf-8 -*-
"""_verify_cf_build.py - verify CF build for commit 996c34a"""
import urllib.request
import re

# 1. curl blog page 3 locale
for loc in ['zh-hk', 'en', 'ja']:
    url = f'https://zprintpro.com/{loc}/blog/hong-kong-printing-guide/'
    try:
        req = urllib.request.Request(url, method='GET')
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read().decode('utf-8', errors='ignore')
            imgs = re.findall(r'<img[^>]*hong-kong-printing-guide[^>]*>', html)
            srcs = re.findall(r'src="[^"]*hong-kong-printing-guide[^"]*"', html)
            og = re.findall(r'og:image[^>]*content="([^"]+)"', html)
            print(f'  {r.status} {url}  imgs={len(imgs)} srcs={len(srcs)} og={[s[:80] for s in og[:1]]}')
    except Exception as e:
        print(f'  ERR {url}: {e}')

print()
# 2. curl webp 3 locale
for loc in ['zh-hk', 'en', 'ja']:
    webp = f'https://zprintpro.com/images/blog/{loc}/hong-kong-printing-guide.webp'
    try:
        req = urllib.request.Request(webp, method='HEAD')
        with urllib.request.urlopen(req, timeout=10) as r:
            size = r.headers.get('Content-Length', '?')
            ct = r.headers.get('Content-Type', '?')
            print(f'  {r.status} {webp}  size={size}  ct={ct}')
    except Exception as e:
        print(f'  ERR {webp}: {e}')

print()
# 3. curl new factory webp 9 张
factory_files = [
    'showcase-red-tactile-paper-book-style-gift-box-gold-foil.webp',
    'showcase-red-hot-foil-tian-di-gift-box-lunar-new-year.webp',
    'showcase-red-conjoined-flip-lid-gift-box-gold-foil.webp',
    'showcase-red-conjoined-box-interior-gold-lining.webp',
    'showcase-black-collapsible-fold-flat-premium-gift-box.webp',
    'craft-folding-box-manual-gluing-process.webp',
    'craft-triangular-special-shape-handmade-gift-box-panel.webp',
    'showcase-international-textbook-printing-sample.webp',
    'showcase-vending-machine-slim-packaging-box.webp',
    'showcase-rigid-box-interior-expanded-hot-stamping.webp',
]
for fn in factory_files:
    webp = f'https://zprintpro.com/images/factory/{fn}'
    try:
        req = urllib.request.Request(webp, method='HEAD')
        with urllib.request.urlopen(req, timeout=10) as r:
            size = r.headers.get('Content-Length', '?')
            ct = r.headers.get('Content-Type', '?')
            print(f'  {r.status} {fn}  size={size}')
    except Exception as e:
        print(f'  ERR {fn}: {e}')
