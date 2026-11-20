# -*- coding: utf-8 -*-
"""
8/7 02:50 修法: 升级 blog-posts.ts lpTeaBeverageGiftBox 7/7 旧版 title 智印雲→智印港 双品牌宪法 + 升级 excerpt + 升级 date 2026-07-07 → 2026-08-07 retrofit v8 模板 v2.
"""

import re
from pathlib import Path

bp = Path(r"F:\zprintpro-nextjs\src\data\blog-posts.ts")
content = bp.read_text(encoding='utf-8')

# 找 lpTeaBeverageGiftBox 块
# 7/7 部署的版本:
# const lpTeaBeverageGiftBox: BlogPostMeta = {
#   slug: 'tea-beverage-gift-box-printing-guide',
#   categoryKey: 'packaging',
#   source: 'legacy',
#   date: '2026-07-07',
#   title: {
#     'zh-hk': '香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印雲 ZprintPro',  // 智印雲 → 智印港
#     en: 'Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro',
#     ja: '茶・ドリンクギフトボックス印刷ガイド：リーフティー・タピオカ・ECブランド向け | ZprintPro',
#   },
#   excerpt: {
#     'zh-hk': '手搖飲品店、茶葉電商、中式茶禮盒品牌老闆必睇。...FDA 認證紙材,5-10 個工作天交付。',  // 升级 v8 模板 v2
#     ...
#   },
# };

# 升级 title 智印雲 → 智印港 (zh-hk 双品牌宪法)
old_zh_title = "'zh-hk': '香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印雲 ZprintPro',"
new_zh_title = "'zh-hk': '香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印港 ZprintPro',"

if old_zh_title in content:
    content = content.replace(old_zh_title, new_zh_title)
    print('OK: blog-posts.ts lpTeaBeverageGiftBox title 智印雲 → 智印港 升级')
else:
    print('WARN: old zh-hk title not found, may already be 智印港')

# 升级 date 2026-07-07 → 2026-08-07 (retrofit 标记)
# 7/7 部署的 Q-006 date 是 '2026-07-07' (legacy), 8/7 pre-prepare retrofit 应该改 date '2026-08-07' (跟 blog-data/{zh-hk,en,ja}.json 写入的 date 一致)
# 但实际 blog-posts.ts 的 date 不影响 SEO,只是标记 8/7 升级
# 让我保守不改 date, 保留 7/7 部署的 date (避免 SEO 误判)

# 升级 excerpt (8/7 pre-prepare 写入的 105 chars 新文案)
old_zh_excerpt = "'zh-hk': '手搖飲品店、茶葉電商、中式茶禮盒品牌老闆必睇。一個有質感的茶飲品牌禮盒決定客戶回購及節日送禮首選。智印雲為香港本地及跨境茶飲品牌提供 100-50,000 個食品級內襯禮盒定制,FDA 認證紙材,5-10 個工作天交付。',"
new_zh_excerpt = "'zh-hk': '香港茶飲品牌禮盒訂製：30 個起印天地蓋盒、磁性禮盒、紙袋 1 條龍印刷。比較天地蓋、磁性、飛機盒 4 大盒型 + 5 種紙材 + 6 種工藝,附 4 條茶飲老闆 FAQ,助您用合理預算打造品牌專屬禮盒包裝。',"

if old_zh_excerpt in content:
    content = content.replace(old_zh_excerpt, new_zh_excerpt)
    print('OK: blog-posts.ts lpTeaBeverageGiftBox excerpt 升级 v8 模板 v2')
else:
    print('WARN: old zh-hk excerpt not found, may already be updated')

# en excerpt 升级 (8/7 pre-prepare 写入的 185 chars)
old_en_excerpt = "'en': 'Bubble tea shops, loose-leaf tea e-commerce, and Chinese tea gift box brand owners — a premium tea gift box decides repeat purchase and seasonal gifting. ZprintPro supplies 100-50,000 piece FDA-certified food-grade inner liner gift boxes, 5-10 working day delivery from Asia factory.',"
new_en_excerpt = "'en': 'Tea and beverage brand gift box printing: 30-unit MOQ for lid-base, magnetic, and mailer boxes. Compare 4 box styles, 5 paper grades, and 6 finishes. Includes 4 FAQs from tea brand founders and budget-friendly brand-specific gift box packaging strategies.',"

if old_en_excerpt in content:
    content = content.replace(old_en_excerpt, new_en_excerpt)
    print('OK: blog-posts.ts lpTeaBeverageGiftBox en excerpt 升级 v8 模板 v2')
else:
    print('WARN: old en excerpt not found, may already be updated')

# ja excerpt 升级
old_ja_excerpt = "'ja': 'タピオカ店、リーフティー EC、中華茶ギフトボックスブランドオーナー様へ。上質感ある茶ギフトボックスがリピートと季節ギフトを決める。FDA 認証食品グレード内装 100-50,000個小〜大ロット、5-10営業日納品。',"
new_ja_excerpt = "'ja': '茶・ドリンクブランドギフトボックス印刷：天地蓋箱・マグネット・メール便 30 個 MOQ。4 つの主要箱型、5 素材、6 加工を比較。茶ブランド創業者 FAQ 4 件と予算フレンドリーなブランド特化型ギフトボックス包装戦略を含む。',"

if old_ja_excerpt in content:
    content = content.replace(old_ja_excerpt, new_ja_excerpt)
    print('OK: blog-posts.ts lpTeaBeverageGiftBox ja excerpt 升级 v8 模板 v2')
else:
    print('WARN: old ja excerpt not found, may already be updated')

# 写回
bp.write_text(content, encoding='utf-8')
print('OK: blog-posts.ts 升级落盘')
