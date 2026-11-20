#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update CATEGORY_INDUSTRIES in src/lib/seo.ts to add 5 new Tier B industry hooks for 2026-07-20 weekly refresh.

- packaging: add 嬰幼兒食品 (T1) + 體育賽事紀念禮盒 (T5)
- paper-bags: add 汽車 4S 店售後服務 (T4)
- flyers: add 房地產銷售單張 + 樣板房 (T2)
- stickers: add 汽車 4S 店 (already exists, skip)
"""
import re
from pathlib import Path

REPO = Path(r"F:\zprintpro-nextjs")
SEO_TS = REPO / "src" / "lib" / "seo.ts"

# Targeted updates: replace existing strings with extended versions
UPDATES = [
    # packaging 'zh-hk'
    (
        "    'zh-hk': ['美妝護膚品牌', '跨境電商品牌', '茶飲食品', '醫藥保健合規盒 + 金融峰會禮品', '婚慶禮盒'],",
        "    'zh-hk': ['美妝護膚品牌', '跨境電商品牌', '茶飲食品', '醫藥保健合規盒 + 金融峰會禮品', '婚慶禮盒', '嬰幼兒食品 + 體育賽事紀念禮盒'],"
    ),
    # packaging 'en'
    (
        "    en: ['Beauty & skincare brands', 'Cross-border e-commerce', 'Tea & beverage brands', 'Pharmaceutical + Financial summit gifts', 'Wedding & corporate gifts'],",
        "    en: ['Beauty & skincare brands', 'Cross-border e-commerce', 'Tea & beverage brands', 'Pharmaceutical + Financial summit gifts', 'Wedding & corporate gifts', 'Baby food + Sports memorabilia gift box'],"
    ),
    # packaging 'ja'
    (
        "    ja: ['化粧品ブランド', '越境ECブランド', '茶・ドリンク', '医薬保健コンプライアンス + 金融サミット', '結婚式・企業ギフト'],",
        "    ja: ['化粧品ブランド', '越境ECブランド', '茶・ドリンク', '医薬保健コンプライアンス + 金融サミット', '結婚式・企業ギフト', 'ベビー食品 + スポーツ記念ギフトボックス'],"
    ),
    # paper-bags 'zh-hk' — add 汽車 4S 店
    (
        "    'zh-hk': ['服飾品牌', '珠寶鐘錶', '金融峰會禮品 + 體育賽事紀念', '美妝精品', '零售餐飲'],",
        "    'zh-hk': ['服飾品牌', '珠寶鐘錶', '金融峰會禮品 + 體育賽事紀念', '美妝精品', '零售餐飲', '汽車 4S 店售後服務袋'],"
    ),
    # paper-bags 'en'
    (
        "    en: ['Fashion & apparel brands', 'Jewellery & watches', 'Financial summit + Sports events', 'Beauty & cosmetics', 'Retail & F&B'],",
        "    en: ['Fashion & apparel brands', 'Jewellery & watches', 'Financial summit + Sports events', 'Beauty & cosmetics', 'Retail & F&B', 'Auto 4S dealer service bags'],"
    ),
    # paper-bags 'ja'
    (
        "    ja: ['アパレルブランド', '宝飾・腕時計', '金融サミット + スポーツイベント', '化粧品・コスメ', '小売・飲食'],",
        "    ja: ['アパレルブランド', '宝飾・腕時計', '金融サミット + スポーツイベント', '化粧品・コスメ', '小売・飲食', '自動車 4S ディーラー サービス バッグ'],"
    ),
    # flyers 'zh-hk' — add 房地產銷售單張
    (
        "    'zh-hk': ['餐廳開業', '房地產新盤', '補習社宣傳', '活動展覽', '婚慶喜帖'],",
        "    'zh-hk': ['餐廳開業', '房地產新盤 + 銷售單張 / 樣板房邀請', '補習社宣傳', '活動展覽', '婚慶喜帖'],"
    ),
    # flyers 'en'
    (
        "    en: ['Restaurant openings', 'Real estate launches', 'Tutoring centers', 'Events & exhibitions', 'Wedding invitations'],",
        "    en: ['Restaurant openings', 'Real estate launches + listing flyers / open house invites', 'Tutoring centers', 'Events & exhibitions', 'Wedding invitations'],"
    ),
    # flyers 'ja'
    (
        "    ja: ['飲食店開業', '不動産プロモ', '塾・予備校', 'イベント・展示会', '結婚式招待'],",
        "    ja: ['飲食店開業', '不動産プロモ + 販売チラシ / モデルルーム招待', '塾・予備校', 'イベント・展示会', '結婚式招待'],"
    ),
]

def main():
    import sys
    sys.stdout.reconfigure(encoding='utf-8')
    with open(SEO_TS, 'r', encoding='utf-8') as f:
        content = f.read()

    applied = 0
    for old, new in UPDATES:
        if old not in content:
            print(f"  [MISS] (line not found)")
            continue
        content = content.replace(old, new, 1)
        applied += 1
        print(f"  [OK] Updated (line replaced)")

    with open(SEO_TS, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\n=== Applied {applied}/{len(UPDATES)} CATEGORY_INDUSTRIES updates ===")

if __name__ == "__main__":
    main()
