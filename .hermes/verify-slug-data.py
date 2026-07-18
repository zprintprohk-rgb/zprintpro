#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import os
import re
slugs = [
    'thick-paper-flyer-printing-restaurant-takeout-guide',
    'magnetic-closure-gift-box-ecommerce-brand-guide',
    'folding-box-cosmetics-brand-eco-friendly-guide',
]
for loc in ['zh-hk','en','ja']:
    path = f'src/data/blog-data/{loc}.json'
    with open(path, 'rb') as fh:
        b = fh.read()
    if b[:3] == b'\xef\xbb\xbf':
        b = b[3:]
    s = b.decode('utf-8', errors='replace')
    print(f'=== {loc} ===')
    for slug in slugs:
        # check if the slug appears as a top-level key (between { and :)
        # find first key that contains the slug
        m = re.search(r'"([^"]*' + re.escape(slug) + r'[^"]*)"\s*:\s*\{', s)
        if m:
            key = m.group(1)
            # find the h1 / title-like content
            idx = m.end()
            chunk = s[idx:idx+1500]
            # try to find title field
            tm = re.search(r'"title"\s*:\s*"([^"]+)"', chunk)
            hm = re.search(r'"h1"\s*:\s*"([^"]+)"', chunk)
            tk = tm.group(1)[:60] if tm else None
            hk = hm.group(1)[:60] if hm else None
            if tk:
                tk = tk.encode('utf-8', 'replace').decode('utf-8')
            if hk:
                hk = hk.encode('utf-8', 'replace').decode('utf-8')
            key_safe = key[:60].encode('utf-8', 'replace').decode('utf-8')
            print(f'  OK slug-key="{key_safe}" title={tk} h1={hk}')
        else:
            print(f'  MISS slug not found: {slug}')
    # total slugs
    keys = re.findall(r'"([a-z0-9\-]+-[a-z0-9\-]+)"\s*:\s*\{', s)
    print(f'  total slug-like keys: {len(keys)}')
