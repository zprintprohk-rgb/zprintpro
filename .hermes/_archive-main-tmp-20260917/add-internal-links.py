#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add 5 internal links to 5 existing blog posts pointing to 5 new Tier B blogs.
Each existing blog gets 1 internal link (zh-hk + en + ja = 3 links per existing blog, 15 total).

Internal link pairs:
1. baby-product-label-sticker-printing-guide (Q-014) -> baby-food-packaging-box-printing-guide (T1 母嬰食品)
2. real-estate-brochure-box-printing-guide (T-B-01) -> real-estate-flyer-printing-guide (T2 房地產)
3. pharmaceutical-label-printing-guide (T-B-02) -> medical-device-packaging-box-guide (T3 醫藥保健)
4. car-dealership-amenity-sticker-printing-guide (T-B-04) -> auto-parts-shopping-bag-printing-guide (T4 汽車汽配)
5. marathon-event-poster-printing-guide (Q-012) -> sports-merchandise-gift-box-printing-guide (T5 體育賽事)
"""
import json
from pathlib import Path

REPO = Path(r"F:\zprintpro-nextjs")
BLOG_DIR = REPO / "src" / "data" / "blog-data"

# Each pair: (existing_slug, new_slug, related_zh, related_en, related_ja)
LINKS = [
    ('baby-product-label-sticker-printing-guide', 'baby-food-packaging-box-printing-guide',
     '嬰幼兒食品包裝盒印刷', 'Baby Food Packaging Box Printing', '幼児食品パッケージ箱印刷'),
    ('real-estate-brochure-box-printing-guide', 'real-estate-flyer-printing-guide',
     '房地產銷售單張印刷', 'Real Estate Flyer Printing', '不動産販売チラシ印刷'),
    ('pharmaceutical-label-printing-guide', 'medical-device-packaging-box-guide',
     '醫療器械包裝盒印刷', 'Medical Device Packaging Box Printing', '医療機器包装箱印刷'),
    ('car-dealership-amenity-sticker-printing-guide', 'auto-parts-shopping-bag-printing-guide',
     '汽車 4S 店售後紙袋印刷', 'Auto Parts Service Bag Printing', '自動車 4S サービス バッグ印刷'),
    ('marathon-event-poster-printing-guide', 'sports-merchandise-gift-box-printing-guide',
     '體育賽事紀念禮盒印刷', 'Sports Merchandise Gift Box Printing', 'スポーツ記念ギフトボックス印刷'),
]

def make_zh_block(existing_slug, new_slug, related_zh):
    return f'\n\n<h3>延伸閱讀：{related_zh}</h3>\n<div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 my-4">\n<p>想了解更多 {related_zh}方案? <a href="/zh-hk/blog/{new_slug}/">查看完整指南</a></p>\n</div>'

def make_en_block(existing_slug, new_slug, related_en):
    return f'\n\n<h3>Related Reading: {related_en}</h3>\n<div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 my-4">\n<p>Want to learn more about {related_en}? <a href="/en/blog/{new_slug}/">View the complete guide</a>.</p>\n</div>'

def make_ja_block(existing_slug, new_slug, related_ja):
    return f'\n\n<h3>関連コンテンツ：{related_ja}</h3>\n<div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 my-4">\n<p>{related_ja}の詳細を知りたい方は <a href="/ja/blog/{new_slug}/">完全ガイドを見る</a>。</p>\n</div>'

def main():
    for existing_slug, new_slug, related_zh, related_en, related_ja in LINKS:
        for locale, block_func, related in [
            ('zh-hk', make_zh_block, related_zh),
            ('en', make_en_block, related_en),
            ('ja', make_ja_block, related_ja),
        ]:
            file_path = BLOG_DIR / f"{locale}.json"
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            if existing_slug not in data:
                print(f"  [WARN] {existing_slug} not in {locale}.json — skipping")
                continue
            existing_content = data[existing_slug].get('content', '')
            # Check if link already present
            if new_slug in existing_content:
                print(f"  [SKIP] {existing_slug} already has link to {new_slug} in {locale}")
                continue
            # Add block at end
            if locale == 'zh-hk':
                new_block = make_zh_block(existing_slug, new_slug, related_zh)
            elif locale == 'en':
                new_block = make_en_block(existing_slug, new_slug, related_en)
            else:
                new_block = make_ja_block(existing_slug, new_slug, related_ja)
            data[existing_slug]['content'] = existing_content + new_block
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
                f.write('\n')
            print(f"  [OK] {locale}: {existing_slug} -> {new_slug} (link added)")

    print(f"\n=== Added 5 internal links × 3 locales = 15 total internal link insertions ===")

if __name__ == "__main__":
    main()
