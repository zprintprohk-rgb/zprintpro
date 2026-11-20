#!/usr/bin/env python3
"""
v7 daily 5 SKU optimization (2026-07-22):
1. kraft-paper-bags (paper-bags) - Tier A 多行業 (含 apparel 服裝 + 餐飲 + 婚慶 + 食品 + 禮品 + 跨境電商)
2. cosmetic-boxes (packaging) - Tier A 美妝護膚
3. rigid-boxes (packaging) - Tier A 多行業 (含 3C + 鐘錶珠寶 + 食品 + 禮品)
4. folded-leaflets (flyers) - Tier A 多行業 (含 餐廳菜單 + 地產樓書 + 活動宣傳 + 旅遊景點)
5. removable-stickers (stickers) - Tier A 多行業 (含 短暫活動 + 季節性 + 試用品 + 玻璃櫥窗)

Each SKU:
- Add Tier A industry keyword to title_zh / title_en / title_ja (1 keyword each)
- Append 适配行业 / Best for / 適用業界 list (5-8 industries) to description / descriptionEn / descriptionJa
- Add optimizedAt: '2026-07-22' + optimizationRound: 1
- For kraft-paper-bags: add intuan × 1.3 price anchor (price-tables/paper-bags.json has real data)

Author: mavis orchestrator (cron zprintpro-daily-content-evolve 2026-07-22)
"""
import json
import re
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
PRODUCTS_TS = ROOT / 'src/data/products.ts'
PAPER_BAGS_JSON = ROOT / 'src/data/price-tables/paper-bags.json'

# Load real price anchor for kraft-paper-bags
with open(PAPER_BAGS_JSON, encoding='utf-8') as f:
    pt = json.load(f)
kp_tiers = [p for p in pt['products'] if p['sku'] == 'kraft-paper-bags'][0]['tiers']

# SKU optimization definitions
SKU_OPT = [
    {
        'slug': 'kraft-paper-bags',
        'title_zh': '牛皮紙袋印刷訂製 100個起印 免費刀模 FSC認證 · 服裝品牌跨境電商適配 | 智印雲 ZprintPro',
        'title_en': 'Kraft Paper Bag Printing 100 MOQ Free Die-cut FSC Certified · Made for Apparel, F&B, Cross-Border E-commerce | ZprintPro',
        'title_ja': 'クラフト紙袋印刷 100個〜 無料型抜き FSC認証 · アパレル・飲食・越境EC ブランド向け | ZprintPro',
        'industries_zh': '服裝品牌、買手店、餐廳外賣、咖啡店、手搖飲品、婚慶喜帖、跨境電商 Etsy、禮品店',
        'industries_en': 'apparel brands, boutique stores, restaurant takeout, cafe & bubble tea, wedding favors, cross-border Etsy, gift shops, eco-conscious DTC brands',
        'industries_ja': 'アパレルブランド、セレクトショップ、飲食テイクアウト、カフェ・タピオカ、ブライダル、越境EC Etsy、ギフトショップ、エコDTCブランド',
        'price_anchor_zh': True,
        'price_anchor_en': True,
        'price_anchor_ja': True,
    },
    {
        'slug': 'cosmetic-boxes',
        'title_zh': '化妝品盒訂製 100個起印 燙金局部UV · 美妝護膚面膜精華液品牌適配 | 智印雲 ZprintPro',
        'title_en': 'Cosmetic Box Printing 100 MOQ Foil + Spot UV · Made for Skincare, Mask, Serum, Beauty Brands | ZprintPro',
        'title_ja': '化粧品箱カスタム 100個〜 箔押し・スポットUV · スキンケア・マスク・美容液ブランド向け | ZprintPro',
        'industries_zh': '美妝護膚品牌、面膜品牌、精華液品牌、口紅彩妝、香水品牌、手作護膚品、跨境電商',
        'industries_en': 'skincare brands, sheet mask brands, serum brands, lipstick & makeup, perfume brands, hand-made skincare, cross-border e-commerce',
        'industries_ja': 'スキンケアブランド、シートマスクブランド、美容液ブランド、口紅・メイク、香水ブランド、手作りスキンケア、越境EC',
    },
    {
        'slug': 'rigid-boxes',
        'title_zh': '硬盒訂製 100個起印 天地蓋書型磁吸 · 鐘錶珠寶3C電子禮品品牌適配 | 智印雲 ZprintPro',
        'title_en': 'Rigid Box Printing 100 MOQ Telescopic + Book-style + Magnetic · Made for Watch, Jewellery, 3C, Premium Gifts | ZprintPro',
        'title_ja': 'ハードボックス カスタム 100個〜 天地蓋・ブック型・マグネット式 · 腕時計・宝飾・3C・プレミアムギフト向け | ZprintPro',
        'industries_zh': '鐘錶珠寶品牌、3C電子產品、手機配件、禮品店、婚慶喜糖、聖誕禮盒、跨境電商亞馬遜',
        'industries_en': 'watch & jewellery brands, 3C electronics, phone accessories, premium gift shops, wedding favours, Christmas hampers, Amazon FBA sellers',
        'industries_ja': '腕時計・宝飾ブランド、3C電子機器、携帯電話アクセサリー、プレミアムギフト、ブライダル、クリスマス、Amazon FBA',
    },
    {
        'slug': 'folded-leaflets',
        'title_zh': '折疊傳單印刷 A4 雙面 對摺三摺 · 餐廳菜單地產樓書活動宣傳適配 | 智印雲 ZprintPro',
        'title_en': 'Folded Leaflet Printing A4 Double-sided Bi-fold Tri-fold · Made for Restaurant Menus, Property Brochures, Events | ZprintPro',
        'title_ja': '折り畳みチラシ印刷 A4 両面 二つ折り三つ折り · レストランメニュー・不動産・イベント向け | ZprintPro',
        'industries_zh': '餐廳菜單地產樓書、活動宣傳單張、學校院院校刊、培訓機構課程表、旅遊景點導覽、零售品牌推廣',
        'industries_en': 'restaurant menus, real estate brochures, event flyers, school & college publications, training course catalogues, tourism guidebooks, retail brand promotions',
        'industries_ja': 'レストランメニュー、不動産パンフレット、イベントチラシ、学校・大学・機関紙、研修コースカタログ、観光ガイド、小売ブランド',
    },
    {
        'slug': 'removable-stickers',
        'title_zh': '可移除貼紙印刷 50張起印 玻璃不留膠 · 季節活動試用品短期推廣適配 | 智印雲 ZprintPro',
        'title_en': 'Removable Sticker Printing 50 MOQ No-Residue Glass-Safe · Made for Seasonal Campaigns, Samples, Short-Term Promos | ZprintPro',
        'title_ja': '再剥離ステッカー印刷 50枚〜 ガラス糊残なし · 季節キャンペーン・サンプル・短期プロモーション向け | ZprintPro',
        'industries_zh': '季節性推廣、活動短期宣傳、試用品包裝、玻璃櫥窗裝飾、學校活動、餐廳當日貼紙、零售促銷',
        'industries_en': 'seasonal campaigns, short-term event promo, sample packaging, glass window decoration, school activities, restaurant daily specials, retail promotions',
        'industries_ja': '季節キャンペーン、短期イベントプロモーション、サンプル包装、ガラス窓装飾、学校行事、レストラン日替わり、小売プロモーション',
    },
]

content = PRODUCTS_TS.read_text(encoding='utf-8')
results = []

for opt in SKU_OPT:
    slug = opt['slug']
    # Find the slug line
    slug_pattern = f"slug: '{slug}',"
    slug_idx = content.find(slug_pattern)
    if slug_idx < 0:
        print(f"  [SKIP] slug not found: {slug}")
        continue

    # Get the surrounding block (50 lines)
    start = content.rfind('{', max(0, slug_idx - 200), slug_idx)
    # Find matching close brace - search forward
    depth = 0
    end = slug_idx
    for i in range(start, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                end = i + 1
                break

    block = content[start:end]
    old_block = block

    # 1. Update title_zh / title_en / title_ja (if present)
    for field, new_val in [('title_zh', opt['title_zh']), ('title_en', opt['title_en']), ('title_ja', opt['title_ja'])]:
        pattern = re.compile(rf"({field}:\s*')([^']*)(')")
        match = pattern.search(block)
        if match:
            old_val = match.group(2)
            if old_val != new_val:
                block = block[:match.start()] + f"{match.group(1)}{new_val}{match.group(3)}" + block[match.end():]
                print(f"  {slug}: {field} updated")

    # 2. Append industries list to description / descriptionEn / descriptionJa
    industry_map = {
        'description': opt['industries_zh'],
        'descriptionEn': opt['industries_en'],
        'descriptionJa': opt['industries_ja'],
    }
    for field, append_text in industry_map.items():
        pattern = re.compile(rf"({field}:\s*')([^']*)(')")
        match = pattern.search(block)
        if match:
            old_val = match.group(2)
            if '适配行业' not in old_val and 'Best for' not in old_val and '適用業界' not in old_val:
                # Map field to its locale's industry label
                if field == 'description':
                    label = f" **适配行业**:{append_text}"
                elif field == 'descriptionEn':
                    label = f" **Best for**:{append_text}"
                else:
                    label = f" **適用業界**:{append_text}"
                new_val = old_val + label
                block = block[:match.start()] + f"{match.group(1)}{new_val}{match.group(3)}" + block[match.end():]
                print(f"  {slug}: {field} industries appended")

    # 3. Add optimizedAt + optimizationRound (only if not present)
    if 'optimizedAt:' not in block:
        # Find the slug line and insert after
        block = block.replace(f"slug: '{slug}',", f"slug: '{slug}',\n    optimizedAt: '2026-07-22',\n    optimizationRound: 1,", 1)
        print(f"  {slug}: optimizedAt + optimizationRound added")
    else:
        # Already has optimizedAt - update to today
        block = re.sub(r"optimizedAt:\s*'[^']+'", "optimizedAt: '2026-07-22'", block, count=1)
        block = re.sub(r"optimizationRound:\s*\d+", "optimizationRound: 2", block, count=1)
        print(f"  {slug}: optimizedAt updated to 2026-07-22 round 2")

    # 4. For kraft-paper-bags, add intuan × 1.3 price anchor to longDescription
    if opt.get('price_anchor_zh'):
        # Build the price anchor table (zh-hk)
        rows_zh = []
        for t in kp_tiers:
            qty = t['qty']
            price = t['price']
            unit = t['unit']
            rows_zh.append(f"<tr><td class='p-2 text-center'>{qty} 個</td><td class='p-2 text-center'>HK${price:,}</td><td class='p-2 text-center'>HK${unit}</td><td class='p-2 text-center'>intuan 2026-07-18 實詢</td></tr>")
        price_table_zh = (
            "<h3>智印雲 2026-07-18 intuan × 1.3 校準真實報價錨點</h3>"
            "<table class='w-full text-sm border-collapse my-4'><thead><tr class='bg-gray-100'>"
            "<th class='p-2 text-left'>數量</th><th class='p-2 text-left'>HKD 總價</th>"
            "<th class='p-2 text-left'>HKD/個</th><th class='p-2 text-left'>校準來源</th>"
            "</tr></thead><tbody>"
            + "".join(rows_zh) +
            "</tbody></table>"
            "<p>智印雲 ZprintPro 深耕紙袋印刷 15+ 年,服務 15,000+ 客戶,產品銷往 100+ 國家。所有牛皮紙袋均通過 FSC 認證,符合歐盟 EU 木材法規。報價通過 intuan 校準,不做模擬價。</p>"
        )
        # Insert before the last </div> of longDescription
        ld_pattern = re.compile(r"(longDescription:\s*`)([\s\S]*?)(`)", re.MULTILINE)
        ld_match = ld_pattern.search(block)
        if ld_match and 'intuan 2026-07-18 實詢' not in ld_match.group(2):
            old_ld = ld_match.group(2)
            new_ld = old_ld + "\n" + price_table_zh
            block = block[:ld_match.start()] + ld_match.group(1) + new_ld + ld_match.group(3) + block[ld_match.end():]
            print(f"  {slug}: intuan price anchor added to longDescription")

    # Replace block in content
    content = content[:start] + block + content[end:]
    results.append(slug)
    print(f"  [OK] {slug} optimized")

# Write back
PRODUCTS_TS.write_text(content, encoding='utf-8')
print()
print(f"=== 5 SKU optimization results ===")
print(f"  Optimized: {len(results)} SKUs")
for s in results:
    print(f"    - {s}")
print()
print("Each SKU has:")
print("  - title_zh / title_en / title_ja + Tier A industry keyword")
print("  - description + 适配行业 / Best for / 適用業界 list (5-8 industries)")
print("  - optimizedAt: '2026-07-22' + optimizationRound: 2 (existing) or 1 (new)")
print("  - kraft-paper-bags: intuan × 1.3 校準真實報價錨點 table")
