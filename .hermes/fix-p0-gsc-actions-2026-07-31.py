# -*- coding: utf-8 -*-
"""
fix-p0-gsc-actions-2026-07-31.py
K3 18:34 + 20:02 立即执行 GSC 7 天数据 P0 止血:
  1. 3 blog (zh-hk doujin + mtr + en cmyk) 末尾加 3 产品内链
  2. sku-seo-data.ts a2-posters (zh-hk) seo title/description 加关键词
  3. products.ts paper-bags / stickers / same-day-flyers name + 加关键词
  4. matrix.json 新增 v7-SKU-37+ entries
"""
import io
import sys
import json
import re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# === 1. 3 blog 末尾加产品内链 ===
BLOG_LINKS = {
    'doujin-circle-printing-guide': {
        'zh-hk': {
            'title': '智印港同人週邊產品',
            'products': [
                ('/zh-hk/product/doujin-postcard-set/', '同人明信片印刷 (50-2000 套)'),
                ('/zh-hk/product/doujin-acrylic-keychain/', '同人亞加力膠牌 (UV 印刷)'),
                ('/zh-hk/product/doujin-can-badge/', '同人缶バッジ (57mm 圓型)'),
            ],
        },
    },
    'mtr-advertising-specs': {
        'zh-hk': {
            'title': '智印港相關產品推薦',
            'products': [
                ('/zh-hk/product/saddle-stitch-booklets/', '騎馬釘書刊 (A4/A5 多規格)'),
                ('/zh-hk/product/catalog-printing/', '公司 Catalog 印刷 (8-64 頁)'),
                ('/zh-hk/product/foil-stickers/', '燙金貼紙 (金色/銀色/玫瑰金)'),
            ],
        },
    },
    'cmyk-guide': {
        'zh-hk': {
            'title': '智印港相關產品',
            'products': [
                ('/zh-hk/product/business-cards/', 'CMYK 名片印刷 (4 色全彩)'),
                ('/zh-hk/product/a4-flyers/', 'A4 宣傳單張 (CMYK 全彩)'),
                ('/zh-hk/product/booklet-printing/', 'CMYK 書刊印刷'),
            ],
        },
        'en': {
            'title': 'Related ZprintPro Products',
            'products': [
                ('/en/product/business-cards/', 'CMYK Business Cards'),
                ('/en/product/a4-flyers/', 'A4 Flyers (CMYK Full Color)'),
                ('/en/product/booklet-printing/', 'CMYK Booklet Printing'),
            ],
        },
        'ja': {
            'title': '関連製品',
            'products': [
                ('/ja/product/business-cards/', 'CMYK 名刺印刷'),
                ('/ja/product/a4-flyers/', 'A4 チラシ (CMYK フルカラー)'),
                ('/ja/product/booklet-printing/', 'CMYK 冊子印刷'),
            ],
        },
    },
}

LINK_HTML_TEMPLATE = '''\n\n<div class="mt-12 pt-8 border-t border-gray-200">\n  <h3 class="text-xl font-bold text-gray-900 mb-4">{title}</h3>\n  <ul class="grid grid-cols-1 md:grid-cols-3 gap-4 list-none p-0">\n{products}\n  </ul>\n  <p class="text-sm text-gray-500 mt-4">想了解更多印刷方案？<a href="/zh-hk/quote/" class="text-blue-600 hover:underline">立即獲取報價</a> · <a href="/zh-hk/contact/" class="text-blue-600 hover:underline">WhatsApp 諮詢</a></p>\n</div>\n'''

def make_link_html(products):
    items_html = '\n'.join([
        f'    <li class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"><a href="{url}" class="text-blue-600 hover:underline font-medium">{label}</a></li>'
        for url, label in products
    ])
    return items_html

# 改 3 locale
for locale in ['zh-hk', 'en', 'ja']:
    fpath = f'F:\\zprintpro-nextjs\\src\\data\\blog-data\\{locale}.json'
    with io.open(fpath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    for slug, locale_data in BLOG_LINKS.items():
        if locale not in locale_data: continue
        if slug not in data: continue
        if 'content' not in data[slug]: continue
        
        blog = data[slug]
        content = blog['content']
        # 检查是否已经添加过 (避免重复)
        marker = 'border-t border-gray-200'
        if marker in content:
            print(f'  [SKIP] {locale}/{slug} already has link section')
            continue
        
        link_data = locale_data[locale]
        products_html = make_link_html(link_data['products'])
        link_section = LINK_HTML_TEMPLATE.format(title=link_data['title'], products=products_html)
        
        # 末尾加 (在 </body> 之前, 但 blog content 是 div, 加在末尾)
        new_content = content + link_section
        blog['content'] = new_content
        print(f'  [OK] {locale}/{slug} +{len(link_data["products"])} product links')
    
    with io.open(fpath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'  saved {fpath}')

# === 2. sku-seo-data.ts a2-posters zh-hk seo 加关键词 ===
# 当前: "A2 海報印刷 | HK$10起/張・防水材質・即日交貨 | 智印雲 ZprintPro"
# 改: 把 "海報印刷" 移到前面 + 加 "印海報" "poster 印刷" 关键词
SEO_PATH = r'F:\zprintpro-nextjs\src\data\sku-seo-data.ts'
with io.open(SEO_PATH, 'r', encoding='utf-8') as f:
    seo_content = f.read()

# 找 a2-posters zh-hk title
old_a2_title_zh = '"title": "A2 海報印刷 | HK$10起/張・防水材質・即日交貨 | 智印雲 ZprintPro"'
new_a2_title_zh = '"title": "海報印刷 | A2 大幅海印 印海報 HK$10起 即日交貨 | 智印港 ZprintPro"'

# 检查原 pattern
if old_a2_title_zh in seo_content:
    seo_content = seo_content.replace(old_a2_title_zh, new_a2_title_zh, 1)
    print(f'[seo] a2-posters zh-hk title: UPDATED')
else:
    print(f'[seo] WARN: a2-posters zh-hk title not found, trying variant')
    # 尝试 alt: 因为可能换行符
    pat = re.compile(r'"title":\s*"[^"]*A2 海報印刷[^"]*?"')
    m = pat.search(seo_content)
    if m:
        old = m.group(0)
        seo_content = seo_content.replace(old, new_a2_title_zh, 1)
        print(f'[seo] a2-posters zh-hk title: UPDATED (variant)')

# 找 a2-posters zh-hk h1 + description
# h1 当前: "A2海報印刷"
old_a2_h1_zh = '"h1": "A2海報印刷"'
new_a2_h1_zh = '"h1": "海報印刷 · A2 大幅 · 印海報 即日"'
if old_a2_h1_zh in seo_content:
    seo_content = seo_content.replace(old_a2_h1_zh, new_a2_h1_zh, 1)
    print(f'[seo] a2-posters zh-hk h1: UPDATED')

# 找 same-day-flyers zh-hk title
old_flyer_title_zh = '"title": "即日宣傳單張印刷 | HK$0.55起・2小時打稿・即日交貨 | 智印雲 ZprintPro"'
new_flyer_title_zh = '"title": "宣傳單張 | 即日印刷 HK$0.55起 2小時打稿 | 智印港 ZprintPro"'
if old_flyer_title_zh in seo_content:
    seo_content = seo_content.replace(old_flyer_title_zh, new_flyer_title_zh, 1)
    print(f'[seo] same-day-flyers zh-hk title: UPDATED')

# 写回
with io.open(SEO_PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(seo_content)
print(f'  saved {SEO_PATH}')

# === 3. products.ts paper-bags + stickers category name 加关键词 ===
PROD_PATH = r'F:\zprintpro-nextjs\src\data\products.ts'
with io.open(PROD_PATH, 'r', encoding='utf-8') as f:
    prod_content = f.read()

# paper-bags: name: '紙袋印刷' 加 '訂做紙袋'
old_paper_bags = "{ slug: 'paper-bags', name: '紙袋印刷', nameEn: 'Paper Bags', nameJa: '紙袋印刷', name_zh: '紙袋印刷', name_en: 'Paper Bags', name_ja: '紙袋印刷', sort_order: 5 },"
new_paper_bags = "{ slug: 'paper-bags', name: '紙袋印刷 / 訂做紙袋', nameEn: 'Paper Bags / Custom', nameJa: '紙袋印刷 / カスタム', name_zh: '紙袋印刷 / 訂做紙袋', name_en: 'Paper Bags / Custom', name_ja: '紙袋印刷 / カスタム', sort_order: 5 },"
if old_paper_bags in prod_content:
    prod_content = prod_content.replace(old_paper_bags, new_paper_bags, 1)
    print(f'[prod] paper-bags: UPDATED')
else:
    print(f'[prod] WARN: paper-bags not found')

# stickers: name: '貼紙印刷' 加 '透明貼'
old_stickers = "{ slug: 'stickers', name: '貼紙印刷', nameEn: 'Stickers', nameJa: 'ステッカー印刷', name_zh: '貼紙印刷', name_en: 'Stickers', name_ja: 'ステッカー印刷', sort_order: 1 },"
new_stickers = "{ slug: 'stickers', name: '貼紙印刷 / 透明貼 / 防水貼', nameEn: 'Stickers / Waterproof / Transparent', nameJa: 'ステッカー / 透明 / 防水', name_zh: '貼紙印刷 / 透明貼 / 防水貼', name_en: 'Stickers / Waterproof / Transparent', name_ja: 'ステッカー / 透明 / 防水', sort_order: 1 },"
if old_stickers in prod_content:
    prod_content = prod_content.replace(old_stickers, new_stickers, 1)
    print(f'[prod] stickers: UPDATED')
else:
    print(f'[prod] WARN: stickers not found')

with io.open(PROD_PATH, 'w', encoding='utf-8', newline='\n') as f:
    f.write(prod_content)
print(f'  saved {PROD_PATH}')

# === 4. matrix.json 新增 4 entries ===
MATRIX_PATH = r'F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json'
with io.open(MATRIX_PATH, 'r', encoding='utf-8') as f:
    matrix = json.load(f)

import datetime
today = '2026-07-31'
new_entries = [
    {
        'id': 'v7-SKU-37',
        'slug': 'doujin-circle-printing-guide',
        'category': 'blog',
        'optimized_at': today,
        'optimization_round': 1,
        'industries_zh': '同人 / 動漫周邊 / 文創 IP / 二次元 / 漫展',
        'industries_en': 'Doujin / Anime / Comic / Cosplay / Creator IP',
        'industries_ja': '同人 / アニメ / コミック / コスプレ / クリエイター',
        'note': '2026-07-31 K3 P0 止血 (GSC 7 天 5 点击 43 imps 11.63% 排名 5.21) — 末尾加 3 产品内链 (doujin-postcard-set / doujin-acrylic-keychain / doujin-can-badge), 传递 §0.7 权重到产品页'
    },
    {
        'id': 'v7-SKU-38',
        'slug': 'mtr-advertising-specs',
        'category': 'blog',
        'optimized_at': today,
        'optimization_round': 1,
        'industries_zh': 'MTR / 港鐵 / 地鐵廣告 / 公共交通廣告 / 地產',
        'industries_en': 'MTR / Subway / Transit / Real Estate / Property',
        'industries_ja': 'MTR / 地下鉄 / 交通広告 / 不動産',
        'note': '2026-07-31 K3 P0 止血 (GSC 7 天 4 点击 43 imps 9.3% 排名 5.44) — 末尾加 3 产品内链 (saddle-stitch-booklets / catalog-printing / foil-stickers), 传递 §0.7 权重'
    },
    {
        'id': 'v7-SKU-39',
        'slug': 'cmyk-guide',
        'category': 'blog',
        'optimized_at': today,
        'optimization_round': 1,
        'industries_zh': '設計 / 印刷色彩 / 品牌設計 / 印前處理',
        'industries_en': 'Design / Print Color / Brand / Prepress',
        'industries_ja': 'デザイン / 印刷色 / ブランド / プリプレス',
        'note': '2026-07-31 K3 P0 cmyk-guide blog 加 3 产品内链 (zh-hk/en/ja 三 locale) — 排名 84 太弱, 加内链不指望短期冲排名, 但给 page 注入 link juice'
    },
    {
        'id': 'v7-SKU-40',
        'slug': 'a2-posters',
        'category': 'posters',
        'optimized_at': today,
        'optimization_round': 1,
        'industries_zh': '活動海報 / 展覽海報 / 印海報 / 門店海報 / 大幅輸出',
        'industries_en': 'Event Poster / Exhibition / Retail Poster / Large Format',
        'industries_ja': 'イベントポスター / 展示会 / 店舗ポスター / 大判出力',
        'note': '2026-07-31 K3 P0 止血 (GSC 7 天 海報印刷 23 imps 排名 32.57 + poster 印刷 21 imps 34.86 + 印海報 16 imps 31.56) — sku-seo-data.ts title/h1 加 "海報印刷" 关键词, 1 个产品页覆盖 3 个搜索词'
    },
]
matrix['v7_sku_optimizations'].extend(new_entries)
matrix['lastUpdated'] = '2026-07-31T20:00:00+08:00'

with io.open(MATRIX_PATH, 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)
print(f'  saved {MATRIX_PATH} (4 new entries)')

print('\n[done] all 4 modules applied')
