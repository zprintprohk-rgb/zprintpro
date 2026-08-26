# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re

targets = [
    ('https://zprintpro.com/zh-hk/product/kraft-paper-bags/', 'kraft-paper-bags', '牛皮紙袋'),
    ('https://zprintpro.com/zh-hk/product/food-boxes/', 'food-boxes', '餐飲'),
]

for url, slug, kw in targets:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
        data = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
        print(f'\n=== {slug} ===')
        # find <title> tag
        m = re.search(r'<title>([^<]+)</title>', data)
        if m:
            print(f'<title>: {m.group(1)[:200]}')
        # find meta description
        m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', data)
        if m:
            print(f'<meta desc>: {m.group(1)[:200]}')
        # find og:title
        m = re.search(r'og:title["\']\s+content=["\']([^"\']+)["\']', data)
        if m:
            print(f'og:title: {m.group(1)[:200]}')
        # find any chunk with 牛皮紙袋印刷訂製 or 餐飲 (title_zh)
        idx = data.find('牛皮紙袋印刷訂製') if slug == 'kraft-paper-bags' else data.find('餐飲紙盒')
        if idx < 0:
            idx = data.find('餐飲')
        if idx >= 0:
            chunk = data[idx:idx+500]
            clean = re.sub(r'<[^>]+>', ' ', chunk)
            clean = re.sub(r'\s+', ' ', clean).strip()
            print(f'title_zh chunk: {clean[:300]}')
        # JSON-LD brand mention
        for m in re.finditer(r'"name"\s*:\s*"([^"]*(?:智印港|智印雲|ZprintPro)[^"]*)"', data):
            print(f'JSON-LD name: {m.group(1)[:150]}')
    except Exception as e:
        print(f'{slug} ERROR: {e}')
