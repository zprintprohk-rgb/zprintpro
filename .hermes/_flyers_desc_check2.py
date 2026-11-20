# -*- coding: utf-8 -*-
import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
t = open(r'F:\zprintpro-nextjs\src\data\category-seo-content.ts', encoding='utf-8').read()
keys = re.findall(r"^\s*'([\w-]+)':\s*\{", t, re.M)
print('category keys:', keys)
# 找 flyers 相关的 key 块
for k in keys:
    if 'flyer' in k or 'leaflet' in k or '传单' in k or 'チラシ' in k:
        i = t.find("'" + k + "':")
        seg = t[i:i+3000]
        prices = re.findall(r"(HK\$\s?[\d.]+|US\$\s?[\d.]+|¥\s?[\d.,]+|\$\s?[\d.]+)", seg)
        print(f'\n=== {k} (prices: {prices[:12]}) ===')
        # description per locale
        for loc in ['zh-hk', 'en', 'ja']:
            m = re.search(r"'%s':\s*\{(?P<b>[\s\S]*?)\n\s*\},\n" % loc, seg)
            if m:
                b = m.group('b')
                for f in ['seoTitle', 'description', 'featuredSnippet']:
                    mm = re.search(re.escape(f) + r":\s*'((?:[^'\\]|\\.)*)'", b)
                    if mm:
                        print(f'  [{loc} {f}] {mm.group(1)[:160]}')
