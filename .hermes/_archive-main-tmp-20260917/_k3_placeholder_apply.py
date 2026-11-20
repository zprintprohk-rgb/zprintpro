# -*- coding: utf-8 -*-
import os
path = r'F:\zprintpro-nextjs\src\app\[locale]\about\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    src = f.read()
# 3 locale placeholder 替换
replacements = [
    # zh-hk
    ("imageSlotFactory: '工廠車間 / 設備全景 (K3 拍圖後替換)',",
     "imageSlotFactory: '✅ 已上线 · 22 figure 工序流 gallery (印刷机实拍 → 轮转 → 印刷机长图 → 半成品 → 后道装订 → 成品盒子), 2026-08-16 717825f',"),
    ("imageSlotTeam: '團隊真人工作場景 (K3 拍圖後替換)',",
     "imageSlotTeam: '團隊場景 · 預留擴展位 (待 K3 拍團隊圖後上線)',"),
    # en
    ("imageSlotFactory: 'Factory floor / equipment panorama (K3 replace after photo capture)',",
     "imageSlotFactory: '✅ Live · 22-figure production flow gallery (press → rotary → wide press → semi-finished → post-press binding → finished boxes), commit 717825f 2026-08-16',"),
    ("imageSlotTeam: 'Team real work scenes (K3 replace after photo capture)',",
     "imageSlotTeam: 'Team scenes · reserved for expansion (pending K3 team photos)',"),
    # ja
    ("imageSlotFactory: '工場現場・設備全景 (K3 撮影後に差し替え)',",
     "imageSlotFactory: '✅ 公開済 · 22 枚工程フローギャラリー (印刷機 → 輪転機 → 長尺印刷 → 半製品 → 後加工 → 完成品), commit 717825f 2026-08-16',"),
    ("imageSlotTeam: 'チームの実業務シーン (K3 撮影後に差し替え)',",
     "imageSlotTeam: 'チーム実写 · 拡張用预留 (K3 チーム写真待ち)',"),
]
count = 0
for old, new in replacements:
    if old in src:
        src = src.replace(old, new, 1)
        count += 1
        print('OK: {0}'.format(old[:60]))
    else:
        print('NOT FOUND: {0}'.format(old[:60]))
print('total replaced: {0}/6'.format(count))
# Write back via UTF-8 no BOM
with open(path, 'w', encoding='utf-8', newline='\n') as f:
    f.write(src)
# Verify
with open(path, 'rb') as f:
    raw = f.read()
print('size:', len(raw), 'BOM:', raw[:3] == b'\xef\xbb\xbf')
