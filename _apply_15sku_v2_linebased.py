#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Apply 15 SKU title 改字 (line-based) + 5 zh-hk brand 修复 (in-block)
2026-08-08 05:00 K3 拍板 "按最新指令执行 一天 5 次内 push"

策略:
- products.ts 按行读, 找 id: 'XX-NNN' 起点, 找 id: '},' 或 '}\n' 终点
- 在块内找 title_xxx / title_xxx: '...' 字段
- 替换新值 (转义)
- brand 修复: 只在 5 SKU zh-hk 块内, 改 title_zh / description_zh 中 "智印雲" -> "智印港"
- 不动其他块 (legal / footer / NAP 等)

时间紧 1 commit 1 push 1 build, K3 8/8 05:00 拍板一天 5 push 内
"""
import os
import re
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

products_path = r"F:\zprintpro-nextjs\src\data\products.ts"

# Title 改字表 (per v2 报告 §5 + v3 报告 §6 + K3 8/8 04:35 战略级 P0 第 1 优先)
# 格式: (slug, locale_field, new_value)
title_replacements = [
    # 1. small-batch-stickers P0 第 1 优先 (EN) - 抓强信号 ROI 最高
    ("small-batch-stickers", "title_en", "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof"),

    # 2-3. a2-posters 3 locale (ZH 改了, EN/JA 之前失败)
    ("a2-posters", "title_en", "A2 Poster Printing 100 Sheets Waterproof PP Lamination Hong Kong Kwun Tong San Po Kong Same-Day DHL 2-4 Days"),
    ("a2-posters", "title_ja", "A2ポスター印刷 1-3日 防水 PP加工 即日 DHL 2-4日"),

    # 4. outdoor-posters (JA)
    ("outdoor-posters", "title_ja", "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜"),

    # 5. fluorescent-stickers (JA)
    ("fluorescent-stickers", "title_ja", "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット"),

    # 6-8. kraft-paper-bags 3 locale (含 brand 修复)
    ("kraft-paper-bags", "title_en", "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory"),
    ("kraft-paper-bags", "title_ja", "クラフト紙袋 印刷 100-200枚〜 オリジナル logo"),

    # 9. textbooks (JA)
    ("textbooks", "title_ja", "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾"),

    # 10. waterproof-stickers (EN)
    ("waterproof-stickers", "title_en", "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ"),

    # 11. saddle-stitch-booklets (EN)
    ("saddle-stitch-booklets", "title_en", "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ"),

    # 12. same-day-flyers (zh-hk) - 之前已 OK
    # ("same-day-flyers", "title_zh", "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時"),

    # 13. doujinshi-printing (zh-hk) - 之前已 OK
    # ("doujinshi-printing", "title_zh", "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日"),

    # 14. food-boxes (zh-hk) - 之前已 OK + brand 修复
    # ("food-boxes", "title_zh", "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡｜智印港 ZprintPro"),

    # 15. kraft-paper-bags (zh-hk) - 之前已 OK
    # ("kraft-paper-bags", "title_zh", "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保｜智印港 ZprintPro"),

    # 16. a2-posters (zh-hk) - 之前已 OK
    # ("a2-posters", "title_zh", "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日"),
]

# 5 zh-hk brand 修复 (kraft-paper-bags + food-boxes, 2 SKU 块内)
brand_5_zh_hk = [
    ("kraft-paper-bags", "智印雲", "智印港"),
    ("food-boxes", "智印雲", "智印港"),
]

# 1. 读 products.ts 按行
with open(products_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print(f"products.ts total lines: {len(lines)}")

# 2. 找 SKU 块 (id: 'XX-NNN' 起点, 找下一个 }, 块结束 或 }, 跨多行)
# 模式: `  id: 'XX-NNN',` 行
# 块: 从 id 行到下一个 `  },` (或 `  }` 或 `},`)

# 3. 找 slug 第一次出现行, 然后在它之前找最近的 id 行 (因为 id 在 slug 之前)
slug_to_id_block = {}  # slug -> (start_line_idx, end_line_idx)
for i, line in enumerate(lines):
    m = re.match(r"^\s*id:\s*['\"]([A-Z]+-\d+)['\"]", line)
    if m:
        sku_id = m.group(1)
        # 找块结束 (下一个 `  },` 或 `  }`)
        end = i + 1
        for j in range(i + 1, min(len(lines), i + 500)):
            if re.match(r"^\s*\},?\s*$", lines[j]) or "}," in lines[j][:10]:
                end = j
                break
        # 找块内的 slug
        for k in range(i, min(end + 1, len(lines))):
            sm = re.match(r"^\s*slug:\s*['\"]([^'\"]+)['\"]", lines[k])
            if sm:
                slug = sm.group(1)
                slug_to_id_block[slug] = (i, end)
                break

print(f"SKU blocks found: {len(slug_to_id_block)}")

# 4. 改 title_xxx
hits = 0
misses = []
for slug, field, new_value in title_replacements:
    if slug not in slug_to_id_block:
        misses.append(f"  [MISS] {slug} not in products.ts")
        continue
    start, end = slug_to_id_block[slug]
    # 在 [start, end] 范围找 `field: '...'`
    field_pattern = re.compile(r"^(\s*" + re.escape(field) + r":\s*)(['\"])((?:[^'\"\\]|\\.)*?)(['\"])(,?\s*)$")
    replaced = False
    for idx in range(start, min(end + 1, len(lines))):
        m = field_pattern.match(lines[idx])
        if m:
            # 转义新值
            quote_char = m.group(2)
            escaped = new_value
            if quote_char == "'":
                escaped = escaped.replace("\\", "\\\\").replace("'", "\\'")
            else:
                escaped = escaped.replace("\\", "\\\\").replace('"', '\\"')
            new_line = m.group(1) + quote_char + escaped + quote_char + m.group(5) + "\n"
            old_truncated = lines[idx].strip()[:40]
            lines[idx] = new_line
            replaced = True
            hits += 1
            print(f"  [OK] {slug}.{field}: '{old_truncated}...' -> '{new_value[:40]}...'")
            break
    if not replaced:
        misses.append(f"  [MISS] {slug}.{field} field not in block [{start}-{end}]")

# 5. 5 zh-hk brand 修复 (在 2 SKU 块内)
print("\n=== 5 zh-hk brand 修复 (智印雲 -> 智印港, 2 SKU 块内) ===")
brand_total = 0
for slug, brand_old, brand_new in brand_5_zh_hk:
    if slug not in slug_to_id_block:
        print(f"  [MISS] {slug} not in products.ts")
        continue
    start, end = slug_to_id_block[slug]
    block_hits = 0
    for idx in range(start, min(end + 1, len(lines))):
        if brand_old in lines[idx]:
            lines[idx] = lines[idx].replace(brand_old, brand_new)
            block_hits += 1
    print(f"  [OK] {slug}: {block_hits} 处 brand 修复")
    brand_total += block_hits

# 6. 写回
with open(products_path, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"\n=== 总 ===")
print(f"title 改字: {hits}/{len(title_replacements)} 命中")
print(f"brand 修复: {brand_total} 处")
print(f"products.ts 写回: {os.path.getsize(products_path)} bytes")
if misses:
    print("\n失败:")
    for m in misses:
        print(m)
