#!/usr/bin/env python3
import re
seo = open('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'r', encoding='utf-8').read()
m = re.search(r'"rounded-corner-cards"\s*:\s*\{', seo)
if m:
    chunk = seo[m.end():m.end()+5000]
    seo_idx = chunk.find('"seo":')
    zh_idx = chunk.find('"zh-hk"', seo_idx)
    en_idx = chunk.find('"en":', zh_idx+10)
    zh_block = chunk[zh_idx:en_idx]
    h1_m = re.search(r'"h1"\s*:\s*"((?:[^"\\]|\\.)*)"', zh_block)
    print(f'rounded-corner-cards zh-hk h1 = {h1_m.group(1) if h1_m else None!r}')
    with open('C:/Users/Administrator/AppData/Local/Temp/r_h1.txt', 'w', encoding='utf-8') as f:
        f.write(zh_block)
