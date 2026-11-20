"""Check v8 blog content structure"""
import json

with open(r'F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# 找新加的 8/3-8/4 博客
keys_of_interest = [
    'thick-paper-flyer-printing-restaurant-takeout-guide',
    'magnetic-closure-gift-box-ecommerce-brand-guide',
    'sports-merchandise-gift-box-printing-guide',
    'auto-parts-shopping-bag-printing-guide',
    'medical-device-packaging-box-guide',
    'baby-food-packaging-box-printing-guide',
]
for k in keys_of_interest:
    if k in data:
        v = data[k]
        if isinstance(v, dict):
            keys = list(v.keys())[:8]
            print(f'== {k} (dict, keys={keys}) ==')
        elif isinstance(v, str):
            print(f'== {k} (str, len={len(v)}) ==')
            # Count FAQ
            import re
            faq_count = len(re.findall(r'<strong>Q:', v))
            h2_count = len(re.findall(r'<h2[ >]', v))
            h3_count = len(re.findall(r'<h3[ >]', v))
            print(f'  FAQ: {faq_count}, H2: {h2_count}, H3: {h3_count}')
            print(f'  preview: {v[:300]}')
            print()
        else:
            print(f'== {k} ({type(v).__name__}) ==')
            print(f'  value: {repr(v)[:200]}')
    else:
        print(f'== {k} == NOT FOUND')
