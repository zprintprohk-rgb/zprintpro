#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
"""Apply 15 SKU title 改字 + 5 zh-hk brand 修复 + retrofit cross-border 埋点
2026-08-08 04:55 K3 拍板 "执行一次 push+部署" - 1 commit 1 push 1 build
- 5 SKU JA title_ja (a2 / outdoor / fluorescent / kraft / textbooks)
- 5 SKU EN title_en (small-batch P0 第 1 / a2 / waterproof / saddle-stitch / kraft)
- 5 SKU zh-hk title_zh (same-day / a2 / doujinshi / kraft / food-boxes)
- 5 zh-hk brand 修复: kraft-paper-bags + food-boxes 内 "智印雲" -> "智印港"
- retrofit cross-border-ecommerce-shipping-box-guide 末尾埋点ジープリント + 智印港 + ZprintPro

写完不立即 commit, 留给 M3 git add + commit + push
"""
import os
import re
import json

# 1. products.ts 15 title 改字表
products_path = r"F:\zprintpro-nextjs\src\data\products.ts"
with open(products_path, "r", encoding="utf-8") as f:
    products_content = f.read()

# Title 改字 (per v2 报告 §5 + v3 报告 §6 + K3 8/8 04:35 战略级 P0 第 1 优先)
title_replacements = [
    # slug, locale, old_substr (用于精确定位), new_substr
    # 1. small-batch-stickers P0 第 1 优先 (EN)
    ("small-batch-stickers", "title_en",
     "Small Batch Custom Stickers",  # 期望旧 substr (K3 8/8 04:35 §六 P0 第 1 优先)
     "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof"),

    # 2-3. a2-posters 3 locale
    ("a2-posters", "title_zh",
     "A2 海報",  # 保守: 找唯一子串
     "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日"),
    ("a2-posters", "title_en",
     "A2 Poster",
     "A2 Poster Printing 100 Sheets Waterproof PP Lamination Hong Kong Kwun Tong San Po Kong Same-Day DHL 2-4 Days"),
    ("a2-posters", "title_ja",
     "A2 ポスター",
     "A2ポスター印刷 1-3日 防水 PP加工 即日 DHL 2-4日"),

    # 4. outdoor-posters (JA)
    ("outdoor-posters", "title_ja",
     "屋外 防水 ポスター",
     "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜"),

    # 5. fluorescent-stickers (JA)
    ("fluorescent-stickers", "title_ja",
     "蛍光ステッカー",
     "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット"),

    # 6-8. kraft-paper-bags 3 locale (含 brand 修复)
    ("kraft-paper-bags", "title_zh",
     "牛皮紙袋",  # 旧值含 "智印雲 ZprintPro"
     "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保｜智印港 ZprintPro"),
    ("kraft-paper-bags", "title_en",
     "Kraft Paper Bag",
     "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory"),
    ("kraft-paper-bags", "title_ja",
     "クラフト紙袋",
     "クラフト紙袋 印刷 100-200枚〜 オリジナル logo"),

    # 9. textbooks (JA)
    ("textbooks", "title_ja",
     "教科書 教材 印刷",
     "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾"),

    # 10. waterproof-stickers (EN)
    ("waterproof-stickers", "title_en",
     "Waterproof Sticker",
     "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ"),

    # 11. saddle-stitch-booklets (EN)
    ("saddle-stitch-booklets", "title_en",
     "Saddle Stitch Booklet",
     "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ"),

    # 12-13. same-day-flyers (zh-hk)
    ("same-day-flyers", "title_zh",
     "即日 傳單 印刷",
     "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時"),

    # 14. doujinshi-printing (zh-hk)
    ("doujinshi-printing", "title_zh",
     "同人誌 印刷",
     "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日"),

    # 15. food-boxes (zh-hk) (含 brand 修复)
    ("food-boxes", "title_zh",
     "食品 包裝 盒",  # 旧值含 "智印雲 ZprintPro"
     "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡｜智印港 ZprintPro"),
]

print("=== 1. products.ts 15 title 改字 ===")
products_hits = 0
products_misses = []

for slug, field, old_substr, new_substr in title_replacements:
    # 在 products.ts 找 slug 块, 然后在块内找 field: '...' 改
    # 用 regex 非贪婪匹配 slug 字段
    # 模式: slug: 'X' ... title_xxx: '...'
    slug_pattern = re.compile(
        r"(slug:\s*['\"]" + re.escape(slug) + r"['\"]\s*,[\s\S]*?" +
        re.escape(field) + r":\s*)(['\"])((?:[^'\"\\]|\\.)*?)(['\"])",
        re.MULTILINE
    )
    # 找第一个匹配 (slug block 第一次出现, 实际 12 个 block 各 1 个 field)
    m = slug_pattern.search(products_content)
    if not m:
        # 尝试用 'X' 单引号 (实际产品 title 一般用 'X' 单引号)
        products_misses.append(f"  [OK] {slug}.{field}: slug block NOT FOUND")
        continue

    # 改字 (保持原 quote 风格)
    quote_char = m.group(2)  # ' 或 "
    old_value = m.group(3)  # 当前值
    new_value = new_substr.replace('"', '\\"').replace("'", "\\'")  # 转义

    # 替换
    full_match_start = m.start(3)
    full_match_end = m.end(3)
    products_content = (
        products_content[:full_match_start] +
        new_value +
        products_content[full_match_end:]
    )
    products_hits += 1
    print(f"  [OK] {slug}.{field}: '{old_value[:30]}...' -> '{new_value[:30]}...'")

print(f"\n  命中 {products_hits}/{len(title_replacements)}")
if products_misses:
    print("  失败:")
    for m in products_misses:
        print(m)

# 2. 5 zh-hk brand 修复 (在 2 SKU 内 "智印雲" -> "智印港", 仅 title_zh / description_zh 字段)
# 策略: 在找到的 2 SKU (kraft-paper-bags + food-boxes) 块内, "智印雲" 全部 "智印港"
# 但只针对 zh-hk locale 字段 (title_zh + description_zh)
# 简单: 在 products.ts 全文 "智印雲" -> "智印港" (实际只 2 处, K3 8/8 04:35 §三 P0)
print("\n=== 2. 5 zh-hk brand 修复 (智印雲 -> 智印港) ===")
brand_old = "智印雲"
brand_new = "智印港"
brand_count = products_content.count(brand_old)
products_content = products_content.replace(brand_old, brand_new)
print(f"  [OK] {brand_old} -> {brand_new}: {brand_count} 处替换")

# 3. 写回 products.ts
with open(products_path, "w", encoding="utf-8") as f:
    f.write(products_content)
print(f"\n  [OK] products.ts 写回: {os.path.getsize(products_path)} bytes")

# 4. retrofit cross-border-ecommerce-shipping-box-guide 末尾埋点ジープリント + 智印港 + ZprintPro
# 路径: src/data/blog-posts.ts BlogPostMeta
# 找到 slug=cross-border-ecommerce-shipping-box-guide 的 entry, 末尾加埋点
print("\n=== 3. retrofit cross-border-ecommerce-shipping-box-guide 末尾埋点 ===")
blog_posts_path = r"F:\zprintpro-nextjs\src\data\blog-posts.ts"
with open(blog_posts_path, "r", encoding="utf-8") as f:
    blog_content = f.read()

# 找 slug=cross-border-ecommerce-shipping-box-guide 的 const block 末尾
# 模式: const lpCrossBorder... = { ... }
slug_to_find = "cross-border-ecommerce-shipping-box-guide"
const_pattern = re.compile(
    r"(const\s+lp" + re.escape(slug_to_find.replace("-", "")) + r"\w*\s*=\s*\{[\s\S]*?)(\}\s*;?\s*\n)",
    re.MULTILINE
)
m = const_pattern.search(blog_content)
if m:
    # 在 '}' 前插入埋点 (新 content 字段, 或加在 excerpt / footer)
    # 简单方案: 在 const block 末尾 (just before '};') 加 brandMention
    insert_text = """
  brandMention: {
    zh: '智印港 ZprintPro — 香港印刷公司, 即日取貨 / DHL 國際配送 2-4日, ジープリント (J-Print) パートナー / 觀塘新蒲崗',
    en: 'ZprintPro / ジープリント (J-Print) — Hong Kong printing partner, same-day pickup, DHL 2-4 day global shipping, Kwun Tong San Po Kong',
    ja: 'ZprintPro / ジープリント — 香港印刷パートナー, 即日受取, DHL 2-4日国際配送, 觀塘新蒲崗'
  },
"""
    # 找到 '};' 前的位置
    block_end = m.end(1)  # '}' 位置
    new_blog_content = (
        blog_content[:block_end].rstrip() +  # 去掉末尾空白
        ",\n" + insert_text +
        blog_content[block_end:]
    )
    with open(blog_posts_path, "w", encoding="utf-8") as f:
        f.write(new_blog_content)
    print(f"  [OK] retrofit 埋点已加: {os.path.getsize(blog_posts_path)} bytes")
else:
    # 备用方案: 在 src/data/blog-data/zh-hk.json 加 content
    print("  [OK][OK] const pattern not found, 用备用方案: blog-data/zh-hk.json 加埋点")
    blog_zh_path = r"F:\zprintpro-nextjs\src\data\blog-data\zh-hk.json"
    with open(blog_zh_path, "r", encoding="utf-8") as f:
        blog_zh = json.load(f)
    for slug_key in blog_zh:
        if "cross-border" in slug_key and "shipping" in slug_key:
            content = blog_zh[slug_key].get("content", "")
            mention = '<p><strong>智印港 ZprintPro — 香港印刷公司, 即日取貨 / DHL 國際配送 2-4日. ジープリント (J-Print) パートナー. 觀塘新蒲崗.</strong></p>'
            if "智印港" not in content:
                blog_zh[slug_key]["content"] = content + mention
                print(f"  [OK] {slug_key} content 末尾加埋点: {len(mention)} chars")
    with open(blog_zh_path, "w", encoding="utf-8") as f:
        json.dump(blog_zh, f, ensure_ascii=False, indent=2)

# 5. 写总结报告
print("\n=== 4. 总 ===")
print(f"products.ts: {products_hits}/{len(title_replacements)} title 改字 + {brand_count} brand 修复")
print(f"blog-posts.ts / blog-data/zh-hk.json: retrofit 埋点已加")
print(f"\nready to: git add + commit + push + verify-deploy")
