#!/usr/bin/env python3
"""
v7 daily matrix update (2026-07-22):
- Update Q-005 covered[] entry to add v7_features (price_anchors + trust_signals)
- Append 5 v7_sku_optimizations (kraft-paper-bags r2, cosmetic-boxes, rigid-boxes r2, folded-leaflets, removable-stickers)
- Append 1 v7_pdp_review (mailer-boxes 5 dimensions)
- Append 1 v7_cron_session (mvs_fba4aab6ecf64fefa4fbf13de1a378e8)
- Update stats.last_updated

Author: mavis orchestrator (cron zprintpro-daily-content-evolve 2026-07-22)
"""
import json
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
MATRIX_JSON = ROOT / '.hermes/industry-keyword-matrix.json'

with open(MATRIX_JSON, encoding='utf-8') as f:
    matrix = json.load(f)

# === 1. Update Q-005 covered[] entry with v7_features ===
# Find the entry with id 'Q-005'
for entry in matrix['covered']:
    if entry.get('id') == 'Q-005':
        entry['v7_features'] = {
            'price_anchors': '5 档 intuan 校准錶 (HKD 965/1144/1677/1872/2800 for mailer-boxes) + e-print HK 零售天花板对比 (76-87% 优势) — added 2026-07-22',
            'trust_signals': '15+ 年 / 15,000+ 客戶 / 100+ 國家 (3 locale each, 2 places: 引子 + 新 section 八結尾) — added 2026-07-22',
            'nap_decoupled': True,
            'en_us_sharp_hooks': 'Free Shipping $99+ / Free Design / 100 MOQ / Fast Turnaround (DHL 2-4 day) — added 2026-07-22',
            'no_images': True,
            'internal_links_count': entry.get('internal_links_count', 0) + 2,  # +1 for self + 1 for added table
        }
        entry['v7_upgraded_at'] = '2026-07-22'
        entry['v7_session'] = 'mvs_fba4aab6ecf64fefa4fbf13de1a378e8'
        entry['v7_locale_chars'] = {
            'zh-hk': 6762,
            'en': 9529,
            'ja': 6853,
        }
        print(f"  [OK] Q-005 v7_features added to covered[]")
        break

# === 2. Append 5 v7_sku_optimizations ===
new_skus = [
    {
        'id': 'v7-SKU-06',
        'slug': 'kraft-paper-bags',
        'category': 'paper-bags',
        'optimizedAt': '2026-07-22',
        'optimizationRound': 2,
        'tier': 'A',
        'industries': ['服裝', '買手店', '餐廳外賣', '咖啡店', '手搖飲品', '婚慶', '跨境電商 Etsy', '禮品店'],
        'price_anchor': 'intuan × 1.3 校准 5档 HKD 811/1144/1677/1872/2800 (r2 升级, 加 v7 报价錶)',
    },
    {
        'id': 'v7-SKU-07',
        'slug': 'cosmetic-boxes',
        'category': 'packaging',
        'optimizedAt': '2026-07-22',
        'optimizationRound': 1,
        'tier': 'A',
        'industries': ['美妝護膚', '面膜', '精華液', '口紅彩妝', '香水', '手作護膚品', '跨境電商'],
    },
    {
        'id': 'v7-SKU-08',
        'slug': 'rigid-boxes',
        'category': 'packaging',
        'optimizedAt': '2026-07-22',
        'optimizationRound': 2,
        'tier': 'A',
        'industries': ['鐘錶珠寶', '3C電子', '手機配件', '禮品店', '婚慶喜糖', '聖誕禮盒', '跨境電商亞馬遜'],
    },
    {
        'id': 'v7-SKU-09',
        'slug': 'folded-leaflets',
        'category': 'flyers',
        'optimizedAt': '2026-07-22',
        'optimizationRound': 1,
        'tier': 'A',
        'industries': ['餐廳菜單', '地產樓書', '活動宣傳', '學校院刊', '培訓機構', '旅遊景點', '零售品牌'],
    },
    {
        'id': 'v7-SKU-10',
        'slug': 'removable-stickers',
        'category': 'stickers',
        'optimizedAt': '2026-07-22',
        'optimizationRound': 1,
        'tier': 'A',
        'industries': ['季節性推廣', '活動短期宣傳', '試用品包裝', '玻璃櫥窗裝飾', '學校活動', '餐廳當日貼紙', '零售促銷'],
    },
]
matrix['v7_sku_optimizations'].extend(new_skus)
print(f"  [OK] 5 v7_sku_optimizations appended (v7-SKU-06 ~ v7-SKU-10)")

# === 3. Append 1 v7_pdp_review ===
new_pdp = {
    'id': 'v7-PDP-02',
    'slug': 'mailer-boxes',
    'category': 'packaging',
    'reviewed_at': '2026-07-22',
    '5_dimensions': {
        '1_title_ctr': "UPDATED: name + title_zh + nameEn + nameJa + '100 MOQ' + 'DHL 2-4 天' sharp hooks (zh-hk/en/ja 3 locale 一致)",
        '2_price_anchor': "UPDATED: longDescription 加 intuan 5档 校准錶 HKD 965/1144/1677/1872/2800 + e-print HK 零售天花板 76-87% 优势 + 15+ 年 trust (3 locale zh-hk/en/ja)",
        '3_trust_bar_15y': "✅ RegionalContent.tsx 3 locale '15+ 年印刷經驗' / '15+ Years Expertise' / '15+ 年の実績' (yesterday v7-PDP-01 修, today 沿用)",
        '4_nap_consistency': "✅ PDP 不硬塞 supplier origin city (no Shenzhen/深圳/深セン in name/title/description 3 locale)",
        '5_cta_path': "✅ WhatsApp link (page.tsx:351) + QuoteCalculator (page.tsx:443) + /quote/ (3 入口, 全部 zh-hk/en/ja locale-aware)",
    },
    'fixes_applied': [
        'products.ts mailer-boxes: name/title_zh/nameEn/nameJa 加 sharp hooks (100 MOQ + DHL 2-4 天 + Free Design)',
        'products.ts mailer-boxes: longDescription 加 intuan 5档 校准錶 + e-print 76-87% 优势 + 15+ 年 trust',
    ],
    'files_changed': [
        'src/data/products.ts (mailer-boxes object)',
    ],
    'v7_session': 'mvs_fba4aab6ecf64fefa4fbf13de1a378e8',
}
matrix['v7_pdp_reviews'].append(new_pdp)
print(f"  [OK] 1 v7_pdp_review appended (v7-PDP-02 mailer-boxes)")

# === 4. Append 1 v7_cron_session ===
matrix['v7_cron_sessions'].append({
    'session': 'mvs_fba4aab6ecf64fefa4fbf13de1a378e8',
    'date': '2026-07-22',
    'deliverables': {
        'blog_v7_upgrade': 1,  # Q-005 cross-border v7 upgrade
        'sku_optimizations': 5,
        'pdp_reviews': 1,
        'matrix_updates': 1,
    },
    'build_quota': 1,
    'strategy': 'v7 1 篇/天降频 + 深度提质 + 攒批 1 commit 1 build',
    'blog_topic': 'Q-005 cross-border-ecommerce-shipping-box-guide (P0 packaging × Tier A 跨境電商) v7 升级',
    'blog_chars': {'zh-hk': 6762, 'en': 9529, 'ja': 6853},
    'price_anchors': 'mailer-boxes 5档 HKD 965/1144/1677/1872/2800 + kraft-paper-bags 5档 HKD 811/1144/1677/1872/2800',
})
print(f"  [OK] 1 v7_cron_session appended (mvs_fba4aab6ecf64fefa4fbf13de1a378e8)")

# === 5. Update stats.last_updated + last_updated_event ===
matrix['stats']['last_updated'] = '2026-07-22'
matrix['stats']['last_updated_event'] = 'cron zprintpro-daily-content-evolve 2026-07-22 [v7 1 篇/天 降频]: Q-005 cross-border v7 升级 (P0 packaging × Tier A 跨境電商, 5 档 intuan × 1.3 校准錶 + 15+ 年口径) + 5 SKU 优化 (kraft-paper-bags r2 + cosmetic-boxes + rigid-boxes r2 + folded-leaflets + removable-stickers) + 1 PDP 审查 (mailer-boxes 5 维度: sharp hook + price anchor + 15+ 年 + NAP + CTA) + matrix v7 字段更新. build quota 攒批 1 commit 1 build. cron session mvs_fba4aab6ecf64fefa4fbf13de1a378e8.'

# === 6. Update lastUpdated ===
matrix['lastUpdated'] = '2026-07-22'

# Write back
with open(MATRIX_JSON, 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print()
print(f"=== Matrix update (2026-07-22) ===")
print(f"  Q-005 covered[] v7_features: appended")
print(f"  v7_sku_optimizations: +5 (v7-SKU-06~10)")
print(f"  v7_pdp_reviews: +1 (v7-PDP-02)")
print(f"  v7_cron_sessions: +1")
print(f"  stats.last_updated: 2026-07-22")
print(f"  lastUpdated: 2026-07-22")
print()
print("Total matrix size after update:")
print(f"  v7_sku_optimizations: {len(matrix['v7_sku_optimizations'])}")
print(f"  v7_pdp_reviews: {len(matrix['v7_pdp_reviews'])}")
print(f"  v7_cron_sessions: {len(matrix['v7_cron_sessions'])}")
print(f"  covered[]: {len(matrix['covered'])}")
