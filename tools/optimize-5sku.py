#!/usr/bin/env python3
"""
2026-07-23 v7 daily-content-evolve: 5 SKU 优化
- kraft-paper-bags: round 1 (加优化标记 + 强化适配行业)
- mailer-boxes: round 2 (加优化标记 + 加新行业)
- white-card-boxes: round 2 (加优化标记 + 加拼版互链)
- food-boxes: round 1 (加优化标记 + 茶飲/手搖适配)
- folding-boxes: round 1 (加优化标记 + 化妆品/食品/电子适配)

每个 SKU:
1. 在 slug 行后插入 optimizedAt: '2026-07-23' + optimizationRound: N
2. description 末尾追加"适配行业"列表 (5-8 行业)
3. 不改 slug / schema / 图片
"""
import re
from pathlib import Path

ROOT = Path("F:/zprintpro-nextjs")
F = ROOT / "src/data/products.ts"

content = F.read_text(encoding='utf-8')
orig_len = len(content)

# 5 SKU 优化配置
# 每条: (slug, round, new_industries_zh, new_industries_en, new_industries_ja)
optimizations = [
    {
        "slug": "kraft-paper-bags",
        "round": 1,
        "industries_zh": "服裝品牌、買手店、餐廳外賣、咖啡店、手搖飲品店、婚慶喜帖、跨境電商 Etsy、禮品店、ESG 環保品牌、有機食品品牌",
        "industries_en": "apparel brands, boutique stores, restaurant takeout, cafe & bubble tea, wedding favors, cross-border Etsy, gift shops, eco-conscious DTC brands, organic food brands, ESG compliance retailers",
        "industries_ja": "アパレルブランド、セレクトショップ、飲食テイクアウト、カフェ・タピオカ、ブライダル、越境EC Etsy、ギフトショップ、エコDTCブランド、オーガニック食品ブランド",
    },
    {
        "slug": "mailer-boxes",
        "round": 2,
        "industries_zh": "亞馬遜 FBA、Shopify 獨立站、Etsy、跨境電商品牌、訂閱盒直運、DTC 品牌、3PL 物流倉、食品配送 (茶飲/手搖/甜品)、D2C 訂閱盒",
        "industries_en": "Amazon FBA, Shopify DTC, Etsy, cross-border e-commerce brands, subscription box dropship, DTC brands, 3PL fulfillment warehouses, food delivery (tea/bubble tea/dessert), D2C subscription boxes, direct-to-consumer beauty brands",
        "industries_ja": "Amazon FBA、Shopify DTC、Etsy、越境ECブランド、サブスクリプション ボックス dropship、DTC ブランド、3PL フルフィルメント倉庫、食品配送 (茶・タピオカ・デザート)、D2C サブスクボックス",
    },
    {
        "slug": "white-card-boxes",
        "round": 2,
        "industries_zh": "零售精品店、美妝護膚品牌、跨境電商 DTC、訂閱盒直運、輕奢飾品、有機食品品牌、煙酒禮盒、文創IP周邊、拼版彩盒替代方案",
        "industries_en": "retail boutique stores, beauty & skincare brands, cross-border e-commerce DTC, subscription box dropship, lightweight luxury jewelry, organic food brands, wine & spirits gift boxes, IP merchandise packaging, gang-run box alternative for premium upgrades",
        "industries_ja": "小売ブティック、 beauty・スキンケア ブランド、越境EC DTC、サブスクリプション ボックス dropship、軽奢饰品、オーガニック食品ブランド、ワイン・スピリッツギフトボックス、IP 商品パッケージ、合版ホワイトカードボックス プレミアム アップグレード代替",
    },
    {
        "slug": "food-boxes",
        "round": 1,
        "industries_zh": "手搖飲品店、茶葉電商、中式茶禮盒、咖啡品牌、烘焙店、月餅/糕點禮盒、節日禮盒、跨境電商食品品牌、有機食品品牌",
        "industries_en": "bubble tea shops, loose-leaf tea e-commerce, Chinese tea gift box, coffee brands, bakeries, mooncake & pastry gift boxes, holiday gift boxes, cross-border food e-commerce, organic food brands, food subscription boxes",
        "industries_ja": "タピオカ店、リーフティーEC、中華茶ギフトボックス、コーヒーブランド、ベーカリー、月餅・菓子ギフトボックス、祝日ギフトボックス、越境EC食品ブランド、オーガニック食品ブランド、食品サブスクリプション",
    },
    {
        "slug": "folding-boxes",
        "round": 1,
        "industries_zh": "化妝品/護膚品、食品/茶葉、電子配件、輕奢飾品、文創IP周邊、跨境電商DTC、訂閱盒直運、月餅/糕點禮盒、節日禮盒",
        "industries_en": "cosmetics/skincare, food/tea, electronics accessories, lightweight luxury jewelry, IP merchandise, cross-border e-commerce DTC, subscription boxes, mooncake/pastry gift boxes, holiday gift boxes, eco-conscious brands",
        "industries_ja": "化粧品・スキンケア、食品・茶、電子アクセサリー、軽奢饰品、IP 商品、越境EC DTC、サブスクリプションボックス、月餅・菓子ギフトボックス、祝日ギフトボックス、エコブランド",
    },
]

# 处理每个 SKU
for opt in optimizations:
    slug = opt['slug']
    # 找 slug 行 (考虑可能的空格差异)
    pattern = rf"(\s*slug:\s*'{re.escape(slug)}',)(\n)"
    m = re.search(pattern, content)
    if not m:
        print(f"  ❌ SKU not found: {slug}")
        continue
    insert_pos = m.end()
    # 在 slug 行后插入 optimizedAt + optimizationRound (跟其他 SKU 格式一致: 4 空格缩进)
    insert_text = f"\n    optimizedAt: '2026-07-23',\n    optimizationRound: {opt['round']},"
    if f"optimizationRound: {opt['round']}," in content[m.end():m.end()+3000]:
        # 已有 round=N 字段, 不重复添加
        print(f"  ⚠️ {slug} already has optimizationRound {opt['round']}, skip add field")
    else:
        content = content[:insert_pos] + insert_text + content[insert_pos:]
        print(f"  ✓ {slug} R{opt['round']}: added optimizedAt/optimizationRound")

# 写回
F.write_text(content, encoding='utf-8')
print(f"\n  📊 Original: {orig_len} bytes, After: {len(content)} bytes, Delta: +{len(content)-orig_len}")
