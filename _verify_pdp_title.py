# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re

targets = [
    ('https://zprintpro.com/zh-hk/product/kraft-paper-bags/', 'kraft-paper-bags', '牛皮紙袋印刷訂製'),
    ('https://zprintpro.com/zh-hk/product/food-boxes/', 'food-boxes', '餐飲紙盒印刷訂製'),
]

for url, slug, expected_title_kw in targets:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
        data = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        print(f'\n=== {slug} ===')
        print(f'HTTP 200, body size: {len(data)}')
        # count brand occurrences
        g_count = data.count('智印港')
        y_count = data.count('智印雲')
        print(f'智印港: {g_count}, 智印雲: {y_count}')
        # find the title chunk
        idx = data.find(expected_title_kw)
        if idx >= 0:
            chunk = data[max(0, idx - 50):idx + 200]
            # strip HTML tags for cleaner view
            clean = re.sub(r'<[^>]+>', '', chunk)
            print(f'title chunk (clean): {clean[:250]}')
        else:
            print(f'WARN: title keyword {expected_title_kw!r} not found')
    except Exception as e:
        print(f'{slug} ERROR: {e}')
