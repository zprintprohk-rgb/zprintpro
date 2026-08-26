# -*- coding: utf-8 -*-
"""verify 117f9fc: 搜 Product @type 段 - 多个 ld+json script 找"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re
import json

url = 'https://zprintpro.com/zh-hk/product/stickers/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
data = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')

# 找所有 ld+json script
print(f'总 HTML size: {len(data)}')
all_ld = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', data, re.DOTALL)
print(f'JSON-LD script tags: {len(all_ld)}')
for i, ld in enumerate(all_ld):
    # 找 @type
    type_match = re.search(r'"@type":\s*"([^"]+)"', ld)
    size = len(ld)
    print(f'  [{i}] size={size}, @type={type_match.group(1) if type_match else "?"}')

# 搜 Product 段
for i, ld in enumerate(all_ld):
    if 'Product' in ld:
        # 找 Product 段
        if '"@type":"Product"' in ld or '"@type": "Product"' in ld:
            try:
                # 这个 script tag 可能是 array 或 single
                if ld.strip().startswith('['):
                    items = json.loads(ld)
                    for item in items:
                        if item.get('@type') == 'Product':
                            print(f'\nProduct (script[{i}], in list):')
                            print(f'  name: {item.get("name", "?")[:80]}')
                            offers = item.get('offers', {})
                            print(f'  offers.price: {offers.get("price", "?")}')
                            print(f'  offers.priceCurrency: {offers.get("priceCurrency", "?")}')
                            print(f'  offers.priceValidUntil: {offers.get("priceValidUntil", "MISSING")}')
                            print(f'  offers.sku: {offers.get("sku", "MISSING")}')
                            ret = offers.get('hasMerchantReturnPolicy', {})
                            print(f'  offers.hasMerchantReturnPolicy.merchantReturnDays: {ret.get("merchantReturnDays", "MISSING")}')
                            print(f'  offers.hasMerchantReturnPolicy.applicableCountry: {ret.get("applicableCountry", "MISSING")}')
                            print(f'  offers.hasMerchantReturnPolicy.returnFees: {ret.get("returnFees", "MISSING")}')
                            print(f'  offers.hasMerchantReturnPolicy.returnPolicyCategory: {ret.get("returnPolicyCategory", "MISSING")}')
                            # 验证 3 字段
                            pvu = offers.get('priceValidUntil')
                            sku = offers.get('sku')
                            hmrp = offers.get('hasMerchantReturnPolicy')
                            if pvu and sku and hmrp:
                                print('\n✅ 3 字段 PASS: priceValidUntil + sku + hasMerchantReturnPolicy')
                            else:
                                print(f'\n❌ FAIL: pvu={pvu}, sku={sku}, hmrp_present={hmrp is not None}')
                else:
                    item = json.loads(ld)
                    if item.get('@type') == 'Product':
                        print(f'\nProduct (script[{i}], single):')
                        print(f'  name: {item.get("name", "?")[:80]}')
                        offers = item.get('offers', {})
                        print(f'  offers.priceValidUntil: {offers.get("priceValidUntil", "MISSING")}')
                        print(f'  offers.sku: {offers.get("sku", "MISSING")}')
                        ret = offers.get('hasMerchantReturnPolicy', {})
                        print(f'  offers.hasMerchantReturnPolicy.merchantReturnDays: {ret.get("merchantReturnDays", "MISSING")}')
            except Exception as e:
                print(f'script[{i}] parse error: {e}')
