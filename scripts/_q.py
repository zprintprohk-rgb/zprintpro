#!/usr/bin/env python3
import re
new = open('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'r', encoding='utf-8').read()
# 看 premium-business-cards 的 keywords
m = re.search(r'"premium-business-cards"\s*:\s*\{', new)
if m:
    chunk = new[m.end():m.end()+3000]
    seo_idx = chunk.find('"seo":')
    zh_idx = chunk.find('"zh-hk"', seo_idx)
    en_idx = chunk.find('"en":', zh_idx+10)
    zh_block = chunk[zh_idx:en_idx]
    kw_m = re.search(r'"keywords"\s*:\s*\[(.*?)\]', zh_block, re.DOTALL)
    print(f'premium-business-cards keywords: {kw_m.group(1)}')
print('OK')
