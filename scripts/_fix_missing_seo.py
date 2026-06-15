#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
P0 修复: 给 5 个 SKU 补全 zh-hk SEO (title/desc/keywords/h1)
P1 修复: 给 29 个 SKU 补 h1

策略:
- 5 个 SKU 完全没有: 用 products.ts 的 name/title_zh/description 派生 zh-hk SEO
- 29 个 SKU 缺 h1: 复制 name.zh-hk 作为 h1 (最简洁高效,符合 Google 习惯)

H1 设计原则: 5-15 字, 简洁明确, 包含主关键词
"""
import json
import re
from pathlib import Path

SEO_FILE = Path("F:/zprintpro-nextjs/src/data/sku-seo-data.ts")
PROD_FILE = Path("F:/zprintpro-nextjs/src/data/products.ts")

seo_src = SEO_FILE.read_text(encoding="utf-8")
prod_src = PROD_FILE.read_text(encoding="utf-8")

# 缺失 title/desc/keywords 的 5 个 SKU
MISSING_FULL = {
    "magnetic-closure-gift-box": {
        "name_zh": "磁吸翻蓋禮盒",
        "name_en": "Magnetic Closure Gift Box",
        "name_ja": "マグネット式ギフトボックス",
        "category": "packaging",
        "title": "磁吸翻蓋禮盒印刷 | 高端定制 48 小時交貨 | 智印雲 ZprintPro",
        "description": "磁吸翻蓋禮盒印刷 100 個起, 採用 1200g 高密度灰板外裱特種紙, 磁吸開合儀式感強, 適合高端產品包裝、珠寶、奢侈品、月餅。48 小時快遞、觀塘門市自取。**智印雲 香港本地印刷 非智印港**: 灰板通過 FSC 認證, 免費打樣, 支持燙金、壓凹、局部光油。",
        "h1": "磁吸翻蓋禮盒",
        "keywords": ["磁吸翻蓋禮盒", "禮盒印刷", "高端禮盒", "包裝盒印刷"],
        "body_keyword": " magnetic closure gift box"
    },
    "electronics-packaging-box": {
        "name_zh": "電子產品包裝盒",
        "name_en": "Electronics Packaging Box",
        "name_ja": "電子製品包装箱",
        "category": "packaging",
        "title": "電子產品包裝盒印刷 | 3C 數碼 EVA 內襯 | 智印雲 ZprintPro",
        "description": "電子產品包裝盒印刷 100 個起, 採用瓦楞紙板或白卡紙, EVA 海棉內襯, 適合 3C 數碼、手機配件、智能設備包裝。48 小時快遞、觀塘門市自取。**智印雲 香港本地印刷 非智印港**: 緩衝抗震設計, 支持多款規格尺寸, 免費結構設計打樣。",
        "h1": "電子產品包裝盒",
        "keywords": ["電子產品包裝盒", "3C 包裝", "數碼包裝盒", "包裝盒印刷"],
        "body_keyword": " electronics packaging box"
    },
    "kraft-paper-packaging-box": {
        "name_zh": "牛皮紙包裝印刷盒",
        "name_en": "Kraft Paper Packaging Box",
        "name_ja": "クラフト紙包装箱",
        "category": "packaging",
        "title": "牛皮紙包裝印刷盒 | 環保材質 多尺寸 | 智印雲 ZprintPro",
        "description": "牛皮紙包裝印刷盒 100 個起, 採用 250g-350g 進口牛皮紙, 印刷 Logo 清晰自然, 適合茶葉、月餅、禮品、烘焙產品包裝。48 小時快遞、觀塘門市自取。**智印雲 香港本地印刷 非智印港**: 紙材通過 FSC 環保認證, 100% 可回收, 支持燙金、壓凹、局部光油。",
        "h1": "牛皮紙包裝印刷盒",
        "keywords": ["牛皮紙包裝盒", "環保包裝盒", "禮品包裝", "包裝盒印刷"],
        "body_keyword": " kraft paper packaging box"
    },
    "drawer-slide-gift-box": {
        "name_zh": "抽屜式禮盒印刷",
        "name_en": "Drawer Slide Gift Box",
        "name_ja": "引き出し式ギフトボックス",
        "category": "packaging",
        "title": "抽屜式禮盒印刷 | 高端滑動開合 定制結構 | 智印雲 ZprintPro",
        "description": "抽屜式禮盒印刷 100 個起, 採用 1200g 灰板外裱特種紙, 滑動開合設計, 結構新穎有儀式感, 適合高端首飾、手錶、化妝品禮盒。48 小時快遞、觀塘門市自取。**智印雲 香港本地印刷 非智印港**: 免費結構設計打樣, 支持燙金、壓凹、局部光油、絲帶提手。",
        "h1": "抽屜式禮盒印刷",
        "keywords": ["抽屜式禮盒", "滑動禮盒", "高端禮盒", "包裝盒印刷"],
        "body_keyword": " drawer slide gift box"
    },
    "fruit-food-label-stickers": {
        "name_zh": "水果及食品標籤印刷",
        "name_en": "Fruit & Food Label Stickers",
        "name_ja": "フルーツ・食品ラベル印刷",
        "category": "stickers",
        "title": "水果及食品標籤印刷 | 防水防油 SGS 認證 | 智印雲 ZprintPro",
        "description": "水果及食品標籤印刷 500 張起, 採用防水 PVC 或 PP 合成紙, 通過 SGS 食品接觸安全認證, 適合水果店、有機食品、烘焙店、外賣包裝。48 小時快遞、觀塘門市自取。**智印雲 香港本地印刷 非智印港**: 耐低溫防霧氣設計, 表面防水防油, 支持可變序號、二維碼。",
        "h1": "水果及食品標籤印刷",
        "keywords": ["水果標籤", "食品標籤", "防水標籤", "標籤印刷"],
        "body_keyword": " fruit food label stickers"
    }
}

# 29 个 SKU 缺 h1, 用 name.zh-hk 复制
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

# ==================== 应用修改 ====================
# 步骤 1: 补 5 个缺失 SKU 的完整 zh-hk SEO
# 步骤 2: 给 29 个 SKU 补 h1

def get_zh_name(seo_src, slug):
    """从 sku-seo-data.ts 取 name.zh-hk"""
    pat = re.compile(r'"' + slug + r'"\s*:\s*\{')
    m = pat.search(seo_src)
    if not m:
        return None
    start = m.end()
    # 找 "name" 块
    name_idx = seo_src.find('"name"', start)
    if name_idx == -1 or name_idx - start > 200:
        return None
    # 找 "zh-hk"
    sub = seo_src[name_idx:name_idx+500]
    z = re.search(r'"zh-hk"\s*:\s*"((?:[^"\\]|\\.)*)"', sub)
    return z.group(1) if z else None

# 步骤 1
new_src = seo_src
added_count = 0
for slug, data in MISSING_FULL.items():
    # 在文件结尾前找合适位置插入
    # 简单做法: 在 },  之前 (最后一个 SKU 块) 加新块
    # 但更稳: 用 products.ts 的真实数据, 在 sku-seo-data.ts 文件末尾追加
    pass

# 简单方案: 在文件结尾的 }; 之前追加 5 个新块
# 找 export const skuSeoData: Record<...> = { ... };
# 找最后的 };
# 文件以 }; 结尾
last_brace = new_src.rfind("};")
assert last_brace > 0

# 构造 5 个新块
new_blocks = []
for slug, data in MISSING_FULL.items():
    block = f'''  "{slug}": {{
    "name": {{
      "zh-hk": "{data['name_zh']}",
      "en": "{data['name_en']}",
      "ja": "{data['name_ja']}"
    }},
    "seo": {{
      "zh-hk": {{
        "title": "{data['title']}",
        "description": "{data['description']}",
        "h1": "{data['h1']}",
        "keywords": {json.dumps(data['keywords'], ensure_ascii=False)},
        "body": "{data['body_keyword']}"
      }},
      "en": {{
        "title": "{data['name_en']} | Custom Printing | ZprintPro",
        "description": "Custom {data['name_en']} from ZprintPro Hong Kong. Professional printing service with fast delivery.",
        "h1": "{data['name_en'].lower()}",
        "keywords": ["{data['name_en'].lower()}", "custom {data['name_en'].lower()}"],
        "body": " {data['name_en'].lower()}"
      }},
      "ja": {{
        "title": "{data['name_ja']} | カスタム印刷 | ZprintPro",
        "description": "{data['name_ja']}のカスタム印刷は ZprintPro にお任せ。香港直結、安心品質。",
        "h1": " {data['name_en'].lower()}",
        "keywords": ["{data['name_ja']}", "{data['name_en'].lower()}"],
        "body": " {data['name_en'].lower()}"
      }}
    }},
    "faqs": [
      {{ "q": "{data['h1']} 印刷", "a": "香港 {data['h1']}" }},
      {{ "q": "{data['h1']} 價錢", "a": "智印雲提供 {data['h1']} 透明價格" }},
      {{ "q": "急件 {data['h1']}", "a": "48 小時快遞、觀塘門市自取" }}
    ],
    "imageAlt": {{
      "zh-hk": "{data['h1']} - 香港本地印刷 智印雲",
      "en": "{data['name_en']} - Hong Kong printing ZprintPro",
      "ja": "{data['name_ja']} - 香港印刷 ZprintPro"
    }}
  }},
'''
    new_blocks.append(block)
    added_count += 1

# 插入
insertion = "\n" + "\n".join(new_blocks)
new_src = new_src[:last_brace] + insertion + "\n" + new_src[last_brace:]

# 步骤 2: 给 29 个 SKU 补 h1
h1_added = 0
for slug in MISSING_H1:
    name_zh = get_zh_name(new_src, slug)
    if not name_zh:
        print(f"  ⚠️ {slug}: 找不到 name.zh-hk, 跳过")
        continue
    # 在该 slug 的 zh-hk seo 块内加 h1
    pat = re.compile(r'("' + re.escape(slug) + r'"\s*:\s*\{.*?"seo"\s*:\s*\{)\s*"zh-hk"\s*:\s*\{', re.DOTALL)
    m = pat.search(new_src)
    if not m:
        print(f"  ⚠️ {slug}: 找不到 zh-hk seo 块, 跳过")
        continue
    # 找 zh-hk 块的 } 结束 (在该块内插入 h1)
    # 找关键字 keywords 前面插入
    zh_block_start = m.end()
    # 找 keywords 的位置
    kw_idx = new_src.find('"keywords"', zh_block_start)
    if kw_idx == -1:
        print(f"  ⚠️ {slug}: 找不到 keywords, 跳过")
        continue
    # 在 keywords 前插入 "h1": "...",\n
    h1_line = f'\n        "h1": "{name_zh}",'
    new_src = new_src[:kw_idx] + h1_line + "\n        " + new_src[kw_idx:]
    h1_added += 1

# 写回
SEO_FILE.write_text(new_src, encoding="utf-8")

print()
print("=" * 80)
print("修复完成:")
print("=" * 80)
print(f"  补 5 个完整 SEO 块: {added_count}/5")
print(f"  补 29 个 SKU h1: {h1_added}/29")
print(f"  文件字节: {len(seo_src):,} → {len(new_src):,} (delta {len(new_src)-len(seo_src):+,})")
