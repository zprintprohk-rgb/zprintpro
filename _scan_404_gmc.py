# -*- coding: utf-8 -*-
"""Scan 404 报告 URL + 业务卡 SKU + Product schema 段"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import re
import urllib.request

# 1. 30+ GSC 404 URL 抽样验证 (实际状态)
print('=== 30+ GSC 404 URL 抽样验证 ===')
gsc_404_urls = [
    'https://zprintpro.com/en/product/booklet-printing/',
    'https://zprintpro.com/ja/product/cosmetics-packaging-box/',
    'https://zprintpro.com/zh-hk/product/same-day-business-cards/',
    'https://zprintpro.com/ja/services/seo-eco-tote-bag/',
    'https://zprintpro.com/zh-hk/zh-hk/services/rush-printing-delivery/',
    'https://zprintpro.com/en/product/cosmetics-packaging-box/',
    'https://zprintpro.com/ja/product/double-sided-cards/',
    'https://zprintpro.com/ja/services/seo/postcard-set/',
    'https://zprintpro.com/upload/22163932084.m3u8',
    'https://zprintpro.com/upload/4032212230.m3u8',
    'https://zprintpro.com/product/small-bags/',
    'https://zprintpro.com/100张起',
    'https://zprintpro.com/en/product/same-day-business-cards/',
    'https://zprintpro.com/ja/product/same-day-business-cards/',
    'https://zprintpro.com/product/double-sided-cards/',
    'https://zprintpro.com/license/',
    'https://zprintpro.com/en/product/double-sided-cards/',
    'https://zprintpro.com/zh-hk/product/packaging/',
    'https://zprintpro.com/ja/ja/services/rush-printing-delivery/',
    'https://zprintpro.com/zh-hk/product/',
    'https://zprintpro.com/en/en/services/rush-printing-delivery/',
    'https://zprintpro.com/product/eco-business-cards/',
    'https://zprintpro.com/blog/design-file-specs/',
    'https://www.zprintpro.com/個から',
    'https://www.zprintpro.com/個起',
    'https://zprintpro.com/(locale)/product/gift-boxes',
    'https://zprintpro.com/(locale)/product/kraft-paper-bags',
    'https://www.zprintpro.com/cdn-cgi/l/email-protection',
    'https://zprintpro.com/blog/mtr-advertising-specs/',
    'https://zprintpro.com/ja/guide/',
    'https://zprintpro.com/ja/services/same-day-printing-delivery/',
    'https://zprintpro.com/zh-hk/services/',
    'https://www.zprintpro.com/枚から',
    'https://zprintpro.com/product/drawer-slide-gift-box/',
]

results = {}
for url in gsc_404_urls:
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        r = urllib.request.urlopen(req, timeout=15)
        results[url] = f'HTTP {r.status}'
    except urllib.error.HTTPError as e:
        results[url] = f'HTTP {e.code} {e.reason}'
    except Exception as e:
        results[url] = f'ERR {e}'

# Stats
stats = {}
for url, status in results.items():
    code = status.split()[1] if 'HTTP' in status else 'ERR'
    stats[code] = stats.get(code, 0) + 1
print(f'抽样 {len(results)} URL: {stats}')
for url in list(results.keys())[:15]:
    print(f'  {results[url]}: {url}')

# 2. 业务卡 SKU 全部 slug (per §11 禁区)
print('\n=== 业务卡 SKU 全部 slug (per §11 禁区) ===')
with open('src/data/products.ts', 'r', encoding='utf-8') as f:
    data = f.read()

# Find all slugs
slug_pattern = re.compile(r"slug:\s*['\"]([^'\"]+)['\"]")
slugs = slug_pattern.findall(data)
business_card_slugs = [s for s in slugs if any(kw in s for kw in ['business-card', 'double-sided', 'eco-business', 'drawer-slide', 'niche-eco', 'niche-luxury', 'small-bags', 'eco-tote', 'postcard-set', 'license', 'packaging', 'gift-boxes', 'same-day-business'])]
print(f'业务卡相关 SKU: {len(business_card_slugs)}')
for s in business_card_slugs[:20]:
    print(f'  - {s}')

# 3. Product schema 段
print('\n=== Product schema 段 (src/lib/seo.ts) ===')
with open('src/lib/seo.ts', 'r', encoding='utf-8') as f:
    seo = f.read()

# Find Product @type
product_blocks = re.findall(r"'@type':\s*'Product'.*?(?=\n\s+\}|$)", seo, re.DOTALL)
print(f'Product @type 出现: {len(product_blocks)} 次')

# Check for priceCurrency
price_count = seo.count('priceCurrency')
print(f'priceCurrency 字段: {price_count} 处')

# Check for offers
offers_count = seo.count("'offers':")
print(f"offers 字段: {offers_count} 处")

# Show one Product schema block (L1092 area)
print('\n=== L1092-1120 Product schema 段 ===')
lines = seo.split('\n')
for i, line in enumerate(lines[1090:1120], start=1091):
    print(f'L{i}: {line[:130]}')
