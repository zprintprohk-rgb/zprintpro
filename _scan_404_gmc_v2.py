# -*- coding: utf-8 -*-
"""Scan 404 + GMC - 简化版 (10 URL 抽样, timeout 5s)"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import re
import urllib.request
import socket

socket.setdefaulttimeout(5)

print('=== 10 URL 抽样验证 ===')
gsc_404_urls = [
    'https://zprintpro.com/en/product/booklet-printing/',
    'https://zprintpro.com/ja/product/cosmetics-packaging-box/',
    'https://zprintpro.com/zh-hk/product/same-day-business-cards/',
    'https://zprintpro.com/ja/services/seo-eco-tote-bag/',
    'https://zprintpro.com/zh-hk/zh-hk/services/rush-printing-delivery/',
    'https://zprintpro.com/ja/services/seo/postcard-set/',
    'https://zprintpro.com/upload/22163932084.m3u8',
    'https://zprintpro.com/product/small-bags/',
    'https://zprintpro.com/ja/ja/services/rush-printing-delivery/',
    'https://zprintpro.com/en/en/services/rush-printing-delivery/',
]

stats = {'2xx': 0, '3xx': 0, '404': 0, '5xx': 0, 'ERR': 0}
for url in gsc_404_urls:
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        r = urllib.request.urlopen(req, timeout=5)
        code = r.status
        if 200 <= code < 300: stats['2xx'] += 1
        elif 300 <= code < 400: stats['3xx'] += 1
        else: stats['5xx'] += 1
        print(f'  {code} {url}')
    except urllib.error.HTTPError as e:
        if e.code == 404: stats['404'] += 1
        elif 300 <= e.code < 400: stats['3xx'] += 1
        else: stats['5xx'] += 1
        print(f'  {e.code} {url}')
    except Exception as e:
        stats['ERR'] += 1
        print(f'  ERR {url} ({e})')

print(f'\n统计: {stats}')

# 业务卡 SKU
print('\n=== 业务卡 SKU (per §11 禁区) ===')
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    data = f.read()

slugs = re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", data)
business_card_slugs = [s for s in slugs if any(kw in s for kw in ['business-card', 'double-sided', 'eco-business', 'drawer-slide', 'small-bags', 'eco-tote', 'postcard-set', 'gift-boxes', 'same-day-business'])]
print(f'业务卡相关 SKU: {len(business_card_slugs)}')
for s in business_card_slugs[:25]:
    print(f'  - {s}')

# Product schema
print('\n=== Product schema 段 (src/lib/seo.ts) ===')
with open('src/lib/seo.ts', 'r', encoding='utf-8') as f:
    seo = f.read()

print(f'priceCurrency: {seo.count("priceCurrency")} 处')
print(f'offers: {seo.count("offers")} 处')
print(f'Product @type: {seo.count("@type")} 处')
print(f'priceValidUntil: {seo.count("priceValidUntil")} 处')
print(f'availability: {seo.count("availability")} 处')

# L1090-1130 看 Product schema
lines = seo.split('\n')
print('\n=== L1085-1130 Product schema 段 ===')
for i, line in enumerate(lines[1084:1135], start=1085):
    print(f'L{i}: {line[:130]}')
