#!/usr/bin/env python3
import re
seo = open('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'r', encoding='utf-8').read()
m = re.search(r'"transparent-stickers"\s*:\s*\{', seo)
if m:
    chunk = seo[m.end():m.end()+5000]
    seo_idx = chunk.find('"seo":')
    zh_idx = chunk.find('"zh-hk"', seo_idx)
    en_idx = chunk.find('"en":', zh_idx+10)
    zh_block = chunk[zh_idx:en_idx]
    open('C:/Users/Administrator/AppData/Local/Temp/zh_block2.txt', 'w', encoding='utf-8').write(zh_block)
    print(f"zh_block 长度: {len(zh_block)}")
    print("写入 C:/Users/Administrator/AppData/Local/Temp/zh_block2.txt")
