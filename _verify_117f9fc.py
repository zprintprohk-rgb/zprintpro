# -*- coding: utf-8 -*-
"""verify 117f9fc: curl 1 zh-hk PDP 验证 3 字段 + /api/quote/ smoke"""
import sys
sys.stdout.reconfigure(encoding='utf-8')
import urllib.request
import re
import json

# Step 1: curl 1 zh-hk PDP 抓 JSON-LD Product 段
print('=== Step 1: curl /zh-hk/product/stickers/ 抓 Product schema 段 ===')
url = 'https://zprintpro.com/zh-hk/product/stickers/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
data = urllib.request.urlopen(req, timeout=30).read().decode('utf-8')
print(f'HTTP 200, body size: {len(data)}')

# 找 Product schema JSON-LD 段
m = re.search(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', data, re.DOTALL)
if m:
    try:
        ld_json = m.group(1)
        # 找 Product @type
        if '"@type":"Product"' in ld_json or '"@type": "Product"' in ld_json:
            # 找 schema Product 段 (从 @type 到 })
            product_match = re.search(r'\{[^{]*?"@type":\s*"Product".*?\}\s*\}', ld_json, re.DOTALL)
            if product_match:
                product = json.loads(product_match.group())
                print(f'Product.name: {product.get("name", "MISSING")[:100]}')
                print(f'Product.offers.price: {product.get("offers", {}).get("price", "MISSING")}')
                print(f'Product.offers.priceCurrency: {product.get("offers", {}).get("priceCurrency", "MISSING")}')
                print(f'Product.offers.priceValidUntil: {product.get("offers", {}).get("priceValidUntil", "MISSING")}')
                print(f'Product.offers.sku: {product.get("offers", {}).get("sku", "MISSING")}')
                ret = product.get("offers", {}).get("hasMerchantReturnPolicy", {})
                print(f'Product.offers.hasMerchantReturnPolicy.merchantReturnDays: {ret.get("merchantReturnDays", "MISSING")}')
                print(f'Product.offers.hasMerchantReturnPolicy.applicableCountry: {ret.get("applicableCountry", "MISSING")}')
                print(f'Product.offers.hasMerchantReturnPolicy.returnFees: {ret.get("returnFees", "MISSING")}')
                # 验证 3 字段
                pvu = product.get("offers", {}).get("priceValidUntil")
                sku = product.get("offers", {}).get("sku")
                hmrp = product.get("offers", {}).get("hasMerchantReturnPolicy")
                if pvu and sku and hmrp:
                    print('\n✅ 3 字段 PASS: priceValidUntil + sku + hasMerchantReturnPolicy')
                else:
                    print(f'\n❌ FAIL: pvu={pvu}, sku={sku}, hmrp={hmrp}')
            else:
                print('WARN: Product JSON-LD 段不匹配, 试全 parse')
                all_json = json.loads(ld_json)
                if isinstance(all_json, list):
                    for item in all_json:
                        if item.get('@type') == 'Product':
                            print(f'Product (in list): {item.get("name", "?")[:80]}')
                            break
                elif all_json.get('@type') == 'Product':
                    print(f'Product: {all_json.get("name", "?")[:80]}')
        else:
            print('WARN: Product @type not found in JSON-LD')
    except Exception as e:
        print(f'JSON parse error: {e}')
        print(f'ld_json first 500: {ld_json[:500]}')
else:
    print('FAIL: JSON-LD script tag not found')

# Step 2: /api/quote/ smoke
print('\n=== Step 2: POST /api/quote/ 验证 §0.7 production smoke 1 步 ===')
import urllib.request
api_body = json.dumps({
    'productSlug': 'stickers',
    'productName': '貼紙印刷訂製 50張起印 | 智印港 ZprintPro',
    'size': {'w': 50, 'h': 50, 'd': 0, 'unit': 'mm'},
    'material': '白色 PVC 貼紙',
    'quantity': 100,
    'printing': '4C+CMYK',
    'finish': '亮膜',
    'deadline': 'standard',
    'unitPrice': 1.5,
    'totalPrice': 150,
    'customerName': 'verify-117f9fc',
    'customerEmail': 'verify-117f9fc@zprintpro.local',
    'customerPhone': '+86 198 8085 1334',
    'deliveryLocation': 'Hong Kong',
    'notes': 'cron verify-deploy-117f9fc PASS 验证',
}).encode('utf-8')
req = urllib.request.Request('https://zprintpro.com/api/quote/', data=api_body, headers={'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0'})
try:
    r = urllib.request.urlopen(req, timeout=30)
    resp = json.loads(r.read())
    print(f'HTTP {r.status}, id: {resp.get("id", "?")}, created_at: {resp.get("created_at", "?")}')
    if r.status == 200 and resp.get('id'):
        print('✅ §0.7 production smoke step 1 PASS')
except urllib.error.HTTPError as e:
    print(f'HTTPError: {e.code} {e.reason}')
    try:
        body = e.read().decode('utf-8')
        print(f'Body: {body[:300]}')
    except: pass
except Exception as e:
    print(f'Error: {e}')
