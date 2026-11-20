# -*- coding: utf-8 -*-
# title 当量预检: 现行 vs 拟改 (title-equiv 口径)
import io, sys, re, json, subprocess
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
cands = [
    ('cny-red ja', '2027年 ポチ袋印刷：箔押し 100 枚から HK$1.1 起 | ZprintPro'),
    ('cny-red ja NEW', '2027年 ポチ袋印刷：箔押し 100枚から ¥64 起 | ZprintPro'),
    ('saddle ja', '中綴じ冊子印刷完全ガイド：ページ数・用紙・価格・低 MOQ | 10冊から対応'),
    ('saddle ja NEW', '中綴じ冊子印刷完全ガイド：ページ数・用紙・価格・低MOQ ¥258から | 10冊から対応'),
    ('saddle ja NEW2', '中綴じ冊子印刷 10冊から ¥258/冊〜｜ページ数・用紙・価格完全ガイド'),
    ('yearbook zh', '畢業紀念冊印刷指南 · 香港中學大學院校定制方案 | 智印港'),
    ('yearbook zh NEW', '畢業紀念冊印刷 HK$45起 · 香港中學大學院校定制方案'),
    ('yearbook zh NEW2', '畢業紀念冊印刷 HK$45起 中學大學院校定制 · 智印港'),
]
# 用 title-equiv.js 的当量逻辑 (半角1字/全角2字)
def equiv(t):
    n = 0
    for ch in t:
        if ord(ch) > 0x2E7F:
            n += 2
        else:
            n += 1
    return n
for name, t in cands:
    print(f'{name:18s} 当量={equiv(t):3d}  len={len(t):3d}  :: {t}')
