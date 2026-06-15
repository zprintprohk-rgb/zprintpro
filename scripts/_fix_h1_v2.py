#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
P0 修复 (v2): 替换空的 h1 行, 而不是新加 h1
"""
import re
from pathlib import Path

SEO_FILE = Path("F:/zprintpro-nextjs/src/data/sku-seo-data.ts")
seo_src = SEO_FILE.read_text(encoding="utf-8")
new_src = seo_src

MISSING_H1 = [
    "transparent-stickers", "kraft-paper-bags", "white-card-bags", "gift-bags",
    "a4-flyers", "a5-flyers", "double-sided-flyers", "same-day-flyers",
    "a2-posters", "a1-posters", "outdoor-posters",
    "gift-boxes", "cosmetic-boxes", "mailer-boxes",
    "foil-red-packets", "custom-red-packets",
    "wall-calendars", "desk-calendars",
    "pvc-menus", "laminated-menus", "hardcover-menus",
    "outdoor-vinyl-banners", "roll-up-banners",
    "catalog-printing", "saddle-stitch-booklets",
    "business-envelopes", "colored-envelopes",
    "exercise-books", "certificates",
]

def get_zh_name(seo_src, slug):
    pat = re.compile(r'"' + slug + r'"\s*:\s*\{')
    m = pat.search(seo_src)
    if not m:
        return None
    start = m.end()
    name_idx = seo_src.find('"name"', start)
    if name_idx == -1 or name_idx - start > 200:
        return None
    sub = seo_src[name_idx:name_idx+500]
    z = re.search(r'"zh-hk"\s*:\s*"((?:[^"\\]|\\.)*)"', sub)
    return z.group(1) if z else None

h1_fixed = 0
for slug in MISSING_H1:
    name_zh = get_zh_name(new_src, slug)
    if not name_zh:
        print(f"  ⚠️ {slug}: 找不到 name.zh-hk, 跳过")
        continue
    # 找 slug 块
    pat = re.compile(r'"' + re.escape(slug) + r'"\s*:\s*\{')
    m = pat.search(new_src)
    if not m:
        print(f"  ⚠️ {slug}: 找不到块")
        continue
    # 找 "seo": { 后面 "zh-hk": { 内的 "h1": "..."
    block = new_src[m.end():m.end()+5000]
    seo_idx = block.find('"seo":')
    zh_idx = block.find('"zh-hk"', seo_idx)
    # 找 zh-hk 块内 "h1": "..."  (空)
    h1_pat = re.compile(r'"h1"\s*:\s*"((?:[^"\\]|\\.)*)"')
    sub = block[zh_idx:zh_idx+2500]
    h1_m = h1_pat.search(sub)
    if not h1_m:
        print(f"  ⚠️ {slug}: 找不到 h1 字段")
        continue
    # 找到 h1 在 new_src 中的绝对位置
    abs_pos = m.end() + zh_idx + h1_m.start()
    # 替换空 h1 的值
    old = h1_m.group(0)
    new = f'"h1": "{name_zh}"'
    new_src = new_src[:abs_pos] + new + new_src[abs_pos+len(old):]
    h1_fixed += 1
    print(f"  OK {slug}: h1 = \"{name_zh}\"")

SEO_FILE.write_text(new_src, encoding="utf-8")
print()
print(f"修复 h1: {h1_fixed}/29")
