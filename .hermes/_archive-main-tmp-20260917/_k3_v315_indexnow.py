#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
v3.15 S2 T38 - IndexNow submit
Pillars 5 类别 (T25 zh-hk already known, T36 added en + ja) + G1《HK Print Inquiry Index》Vol.1
- books: 2 locales × 1 = 2 URLs
- envelopes: 2 locales × 1 = 2 URLs
- calendars: 2 locales × 1 = 2 URLs
- red-packets: 2 locales × 1 = 2 URLs
- flyers: 2 locales × 1 = 2 URLs
- insights/hk-print-inquiry-index: 3 locales × 1 = 3 URLs (G1 page v3.15 S2)
Total = 13 URLs
"""

import urllib.request, json
from datetime import datetime

# 13 URLs to submit via IndexNow
urls = [
    # T36 new FAQ: 5 Pillars × 2 locales (en + ja)
    'https://zprintpro.com/en/category/books/',
    'https://zprintpro.com/ja/category/books/',
    'https://zprintpro.com/en/category/envelopes/',
    'https://zprintpro.com/ja/category/envelopes/',
    'https://zprintpro.com/en/category/calendars/',
    'https://zprintpro.com/ja/category/calendars/',
    'https://zprintpro.com/en/category/red-packets/',
    'https://zprintpro.com/ja/category/red-packets/',
    'https://zprintpro.com/en/category/flyers/',
    'https://zprintpro.com/ja/category/flyers/',
    # G1《HK Print Inquiry Index》Vol.1 (v3.15 S2 17:18 deployed)
    'https://zprintpro.com/zh-hk/insights/hk-print-inquiry-index/',
    'https://zprintpro.com/en/insights/hk-print-inquiry-index/',
    'https://zprintpro.com/ja/insights/hk-print-inquiry-index/',
]

payload = {
    'host': 'zprintpro.com',
    'key': 'zprintpro-indexnow-2026',
    'urlList': urls,
}

print(f'[{datetime.now().isoformat()}] IndexNow submit {len(urls)} URLs')
print(f'Categories: 5 Pillars (en+ja) + G1 insights (3 locales)')

try:
    req = urllib.request.Request(
        'https://api.indexnow.org/indexnow',
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req, timeout=20) as r:
        status = r.status
        body = r.read().decode('utf-8')[:300]
        print(f'IndexNow status: {status}')
        print(f'IndexNow body: {body}')
        if status == 200:
            print(f'PASS: {len(urls)} URLs submitted')
        else:
            print(f'CHECK: status {status}')
except urllib.error.HTTPError as e:
    print(f'IndexNow HTTP error: {e.code} {e.reason}')
    print(f'Body: {e.read().decode("utf-8")[:300]}')
except Exception as e:
    print(f'IndexNow FAIL: {e}')
