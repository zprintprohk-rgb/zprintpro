# -*- coding: utf-8 -*-
import os
path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()
# fix zh-hk 简中
old = "imageSlotFactory: '✅ 已上线 · 22 figure 工序流 gallery (印刷机实拍 → 轮转 → 印刷机长图 → 半成品 → 后道装订 → 成品盒子), 2026-08-16 717825f',"
new = "imageSlotFactory: '✅ 已上線 · 22 figure 工序流 gallery (印刷機實拍 → 輪轉 → 印刷機長圖 → 半成品 → 後道裝訂 → 成品盒子), 2026-08-16 717825f',"
if old in src:
    src = src.replace(old, new, 1)
    print('zh-hk fixed')
else:
    print('zh-hk NOT FOUND (already fixed?)')
with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
# verify
with open(path, 'rb') as f:
    raw = f.read()
print('size:', len(raw), 'BOM:', raw[:3] == b'\xef\xbb\xbf')
