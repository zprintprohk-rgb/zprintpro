#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import re
seo = open('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'r', encoding='utf-8').read()
# 找 h1 写得好的样本
# 找 "saddle-stitch-booklets" 块 (其实缺 h1), 换一个
slugs_with_h1 = ['premium-business-cards', 'thick-business-cards-400g', 'foil-business-cards']
out = []
for s in slugs_with_h1:
    pat = re.compile(r'"' + s + r'"\s*:\s*\{')
    m = pat.search(seo)
    if m:
        start = m.end()
        # 找 seo 块
        seo_idx = seo.find('"seo":', start)
        if seo_idx > 0:
            # 找 zh-hk 块
            zh_idx = seo.find('"zh-hk"', seo_idx)
            # 找 zh-hk 块结束
            en_idx = seo.find('"en":', zh_idx+10)
            zh_block = seo[zh_idx:en_idx]
            h1_m = re.search(r'"h1"\s*:\s*"([^"]+)"', zh_block)
            out.append(f'{s}: h1 = "{h1_m.group(1) if h1_m else "无"}"')
            out.append(f'  block 头: {zh_block[:400]}')
            out.append('')
open('C:/Users/Administrator/AppData/Local/Temp/h1_samples.txt', 'w', encoding='utf-8').write("\n".join(out))
print("OK")
