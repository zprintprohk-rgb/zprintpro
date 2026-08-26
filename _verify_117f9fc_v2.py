# -*- coding: utf-8 -*-
"""verify 117f9fc: 找 Product schema 段 - 用 @graph 嵌套"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re
import json

url = 'https://zprintpro.com/zh-hk/product/stickers/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
data = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')

# 找所有 ld+json script, 简单方法
ld_pattern = re.compile(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.DOTALL)
all_ld = ld_pattern.findall(data)
print(f'JSON-LD scripts: {len(all_ld)}')

# 全部 search "Product" 段
for i, ld in enumerate(all_ld):
    ld_clean = re.sub(r'\s+', ' ', ld).strip()
    if 'Product' in ld_clean:
        try:
            obj = json.loads(ld_clean)
            # 找 Product (可能在 @graph 数组里)
            if isinstance(obj, dict):
                if '@graph' in obj:
                    graph = obj['@graph']
                    for item in graph:
                        if item.get('@type') == 'Product':
                            print(f'\n=== Product (script[{i}], in @graph) ===')
                            print(f'name: {item.get("name", "?")[:80]}')
                            offers = item.get('offers', {})
                            print(f'offers.price: {offers.get("price", "?")}')
                            print(f'offers.priceCurrency: {offers.get("priceCurrency", "?")}')
                            print(f'offers.priceValidUntil: {offers.get("priceValidUntil", "MISSING")}')
                            print(f'offers.sku: {offers.get("sku", "MISSING")}')
                            ret = offers.get('hasMerchantReturnPolicy', {})
                            print(f'offers.hasMerchantReturnPolicy.merchantReturnDays: {ret.get("merchantReturnDays", "MISSING")}')
                            print(f'offers.hasMerchantReturnPolicy.applicableCountry: {ret.get("applicableCountry", "MISSING")}')
                            print(f'offers.hasMerchantReturnPolicy.returnFees: {ret.get("returnFees", "MISSING")}')
                            print(f'offers.hasMerchantReturnPolicy.returnPolicyCategory: {ret.get("returnPolicyCategory", "MISSING")}')
                            print(f'offers.hasMerchantReturnPolicy.description: {ret.get("description", "MISSING")[:80]}')
                            # 验证 3 字段
                            pvu = offers.get('priceValidUntil')
                            sku = offers.get('sku')
                            hmrp = offers.get('hasMerchantReturnPolicy')
                            if pvu and sku and hmrp:
                                print('\n✅ 3 字段 PASS: priceValidUntil + sku + hasMerchantReturnPolicy')
                            else:
                                print(f'\n❌ FAIL: pvu={pvu}, sku={sku}, hmrp_present={hmrp is not None}')
                elif obj.get('@type') == 'Product':
                    print(f'\n=== Product (script[{i}], direct) ===')
                    offers = obj.get('offers', {})
                    print(f'offers.priceValidUntil: {offers.get("priceValidUntil", "MISSING")}')
                    print(f'offers.sku: {offers.get("sku", "MISSING")}')
            elif isinstance(obj, list):
                for item in obj:
                    if isinstance(item, dict) and item.get('@type') == 'Product':
                        print(f'\n=== Product (script[{i}], in list) ===')
                        offers = item.get('offers', {})
                        print(f'offers.priceValidUntil: {offers.get("priceValidUntil", "MISSING")}')
                        print(f'offers.sku: {offers.get("sku", "MISSING")}')
        except Exception as e:
            print(f'script[{i}] parse err: {e}')
