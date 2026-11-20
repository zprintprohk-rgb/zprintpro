#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add 5 lpXxx const declarations + 5 array entries to blog-posts.ts
T1: baby-food-packaging-box-printing-guide (food-packaging)
T2: real-estate-flyer-printing-guide (flyers)
T3: medical-device-packaging-box-guide (packaging)
T4: auto-parts-shopping-bag-printing-guide (paper-bags)
T5: sports-merchandise-gift-box-printing-guide (packaging)
"""
import re
from pathlib import Path

REPO = Path(r"F:\zprintpro-nextjs")
BLOG_POSTS = REPO / "src" / "data" / "blog-posts.ts"
DATE = "2026-07-20"

NEW_CONSTS = '''// =============================================================================
// 2026-07-20 weekly-meta-refresh Tier B 5 篇 (T1-T5) — 母嬰食品 拓點 + 房地產/醫藥保健/汽車汽配/體育賽事 2nd SKU 拓點
// =============================================================================

const lpBabyFoodPackagingBox: BlogPostMeta = {
  slug: 'baby-food-packaging-box-printing-guide',
  categoryKey: 'food-packaging',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '香港嬰幼兒食品包裝盒印刷指南 · 奶粉輔食米糊安全包裝定制 | 智印雲 ZprintPro',
    en: 'Baby Food Packaging Box Printing Guide: FDA Food-Safe Boxes for US Infant Brands | ZprintPro',
    ja: '幼児食品パッケージ箱印刷ガイド：FDA食品衛生ボックス 日本向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港嬰幼兒食品品牌、奶粉商、輔食製造商必睇。FDA 認證食品級內襯折疊盒 + BPA-free 大豆油墨 + 100 個起印，5-7 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
    en: 'US infant formula, baby food pouch, organic snack, and toddler meal brand owners: FDA food-grade lined folding cartons, BPA-free soy ink, 100 MOQ, 5-7 day production, Free Shipping over $99 USA.',
    ja: '日本の乳児用粉ミルク・ベビーフード・幼児スナック・オーガニック離乳食ブランド様へ。FDA 食品グレード内張クラフト紙箱、BPA フリー インク、100 個小ロット、5-7 営業日生産、$99 以上で全米無料配送。',
  },
};

const lpRealEstateFlyer: BlogPostMeta = {
  slug: 'real-estate-flyer-printing-guide',
  categoryKey: 'flyers',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '香港房地產銷售單張印刷指南 · 新盤樓書派發 A4 摺頁定制 | 智印雲 ZprintPro',
    en: 'Real Estate Flyer Printing Guide: Property Listing Brochures for US Real Estate Agents | ZprintPro',
    ja: '不動産販売チラシ印刷ガイド：物件資料・折り畳み 米国不動産エージェント向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港新盤代理 / 二手樓經紀 / 物業管理必睇。157g 雙銅紙 A4 摺頁 + 騎馬釘小手冊 + 100 張起印，3-5 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
    en: 'US real estate agents, brokerages, property managers, open house hosts: A4 bi-fold + tri-fold property listing flyers, 100 MOQ, 3-5 day production, Free Shipping over $99 USA.',
    ja: '米国の不動産エージェント、ブローカレッジ、プロパティ マネージャー、オープンハウス主催者様へ。A4 二つ折り・三つ折り物件資料チラシ、100 個小ロット、3-5 営業日生産、$99 以上で全米無料配送。',
  },
};

const lpMedicalDevicePackagingBox: BlogPostMeta = {
  slug: 'medical-device-packaging-box-guide',
  categoryKey: 'packaging',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '醫療器械包裝盒印刷指南 · ISO 13485 + 滅菌袋定制 | 智印雲 ZprintPro',
    en: 'Medical Device Packaging Box Printing Guide: ISO 13485, Sterile Bag Custom for US Healthcare | ZprintPro',
    ja: '医療機器包装箱印刷ガイド：ISO 13485・滅菌バッグ カスタム 日本医療業界向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '醫療器械製造商 / 醫院供應商 / 牙科診所 / 體外診斷設備商必睇。1200g 灰板硬盒 + ISO 13485 + Tyvek 滅菌袋 + 100 個起印，7-10 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
    en: 'US medical device manufacturers, hospital suppliers, dental clinics, IVD equipment makers: ISO 13485 certified grayboard rigid boxes + sterile barrier pouches, 100 MOQ, 7-10 day production.',
    ja: '日本の医療機器メーカー、病院サプライヤー、歯科医院、IVD 機器メーカー様へ。ISO 13485 認証グレー ボード硬質箱 + 滅菌バリア ポーチ、100 個小ロット、7-10 営業日生産、$99 以上で全米無料配送。',
  },
};

const lpAutoPartsShoppingBag: BlogPostMeta = {
  slug: 'auto-parts-shopping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '汽車 4S 店售後服務紙袋印刷指南 · 維修保養零件包裝定制 | 智印雲 ZprintPro',
    en: 'Auto Parts Shopping Bag Printing Guide: 4S Service Bags for US Auto Aftermarket | ZprintPro',
    ja: '自動車部品ショッピングバッグ印刷ガイド：4S アフターマーケット サービスバッグ 日本自動車業界向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '汽車 4S 店 / 二手車行 / 汽車美容 / 輪胎中心 / 維修工場必睇。120g 加強牛皮紙 + 油污防護淋膜 + 燙金 logo + 100 個起印，5-7 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
    en: 'US auto dealers, used car lots, auto detailers, tire centers, and repair shops: reinforced kraft + oil-resistant lamination + 4S logo, 100 MOQ, 5-7 day production, Free Shipping over $99 USA.',
    ja: '日本の自動車ディーラー、中古車販売店、自動車ディテイラー、タイヤ センター、修理工場様へ。強化クラフト + 耐油ラミネート + 4S ロゴ、100 個小ロット、5-7 営業日生産、$99 以上で全米無料配送。',
  },
};

const lpSportsMerchandiseGiftBox: BlogPostMeta = {
  slug: 'sports-merchandise-gift-box-printing-guide',
  categoryKey: 'packaging',
  source: 'daily',
  date: '2026-07-20',
  title: {
    'zh-hk': '體育賽事紀念禮盒印刷指南 · 球隊周邊收藏版定制 | 智印雲 ZprintPro',
    en: 'Sports Event Merchandise Gift Box Printing Guide: Team Memorabilia for US Leagues | ZprintPro',
    ja: 'スポーツイベント記念ギフトボックス印刷ガイド：チーム メモラビリア 米国スポーツ業界向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '球隊周邊 / 賽事紀念品 / 球迷收藏 / 賽事贊助商必睇。1200g 灰板硬盒 + 燙金 logo + 序號印刷 + 100 個起印，7-10 個工作天交付，順豐本地 + DHL 全球 2-4 天配送。',
    en: 'US sports team merchandise, event memorabilia, fan collectibles, event sponsors: 1200gsm grayboard rigid box + foil logo + limited edition numbering, 100 MOQ, 7-10 day production.',
    ja: '米国のスポーツ チーム メモラビリア、イベント記念品、ファン コレクティブ、イベント スポンサー様へ。1200gsm グレー ボード硬質箱 + 箔押し + 限定ナンバー印刷、100 個小ロット、7-10 営業日生産、$99 以上で全米無料配送。',
  },
};

'''

NEW_ARR_ENTRIES = '''  // 2026-07-20 weekly-meta-refresh Tier B 5 篇 (T1-T5) — 母嬰食品 拓點 + 房地產/醫藥保健/汽車汽配/體育賽事 2nd SKU 拓點
  lpBabyFoodPackagingBox,
  lpRealEstateFlyer,
  lpMedicalDevicePackagingBox,
  lpAutoPartsShoppingBag,
  lpSportsMerchandiseGiftBox,
'''

def main():
    with open(BLOG_POSTS, 'r', encoding='utf-8') as f:
        content = f.read()

    # Insert NEW_CONSTS before "export const blogPosts" (which is on a line by itself)
    target = "export const blogPosts: BlogPostMeta[] = ["
    if target not in content:
        raise RuntimeError(f"Cannot find {target} in blog-posts.ts")
    # Insert the new consts right before this line
    new_content = content.replace(target, NEW_CONSTS + target, 1)
    print(f"[1] Inserted 5 lpXxx const declarations before blogPosts array")

    # Now add 5 array entries right BEFORE the closing of the array
    # Find "];\n" after blogPosts starts. The pattern is the array ends with
    # '];' on its own line. We want to insert the entries just before the '];'.
    # Find first occurrence of array content's closing '];' after the NEW_CONSTS
    # Use a simpler approach: find the last "lpConstructionMaterialSampleBook," line and add after it
    anchor = "  lpConstructionMaterialSampleBook,\n];"
    if anchor not in new_content:
        raise RuntimeError(f"Cannot find anchor {anchor}")
    new_content = new_content.replace(anchor, "  lpConstructionMaterialSampleBook,\n" + NEW_ARR_ENTRIES + "];", 1)
    print(f"[2] Inserted 5 array entries before closing ]; of blogPosts array")

    with open(BLOG_POSTS, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"[3] Wrote {BLOG_POSTS}")

    # Verify
    with open(BLOG_POSTS, 'r', encoding='utf-8') as f:
        verify = f.read()
    for slug in ['baby-food-packaging-box-printing-guide', 'real-estate-flyer-printing-guide',
                 'medical-device-packaging-box-guide', 'auto-parts-shopping-bag-printing-guide',
                 'sports-merchandise-gift-box-printing-guide']:
        const_name = {
            'baby-food-packaging-box-printing-guide': 'lpBabyFoodPackagingBox',
            'real-estate-flyer-printing-guide': 'lpRealEstateFlyer',
            'medical-device-packaging-box-guide': 'lpMedicalDevicePackagingBox',
            'auto-parts-shopping-bag-printing-guide': 'lpAutoPartsShoppingBag',
            'sports-merchandise-gift-box-printing-guide': 'lpSportsMerchandiseGiftBox',
        }[slug]
        # Check const declaration
        has_const = f"const {const_name}: BlogPostMeta" in verify
        # Check slug
        has_slug = slug in verify
        # Check in array (as const_name ref)
        in_array = f"  {const_name}," in verify
        print(f"  {slug}: const={has_const}, slug={has_slug}, in_array={in_array}")

if __name__ == "__main__":
    main()
