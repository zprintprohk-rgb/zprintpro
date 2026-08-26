#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Update matrix.json for 7/30 daily cron — append 5 SKU + 1 PDP + 1 session + 1 skip + last_updated.
   0 push 攒批, e095918 7/30 凌晨 quota 占用.
"""
import json
from collections import OrderedDict
import sys

path = r'F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json'

with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f, object_pairs_hook=OrderedDict)

# 1. Append v7_sku_optimizations entries (5 SKU)
new_skus = [
    OrderedDict([
        ('id', 'v7-SKU-26'),
        ('slug', 'foil-stickers'),
        ('category', 'stickers'),
        ('optimized_at', '2026-07-30'),
        ('optimization_round', 2),
        ('industries_zh', '餐飲外賣、美妝護膚、茶飲食品、寵物食品、母嬰、服裝、禮品包裝'),
        ('industries_en', 'Food delivery, Beauty & skincare, Tea & F&B, Pet food, Baby & maternity, Apparel, Gift packaging'),
        ('industries_ja', '飲食デリバリー、化粧品、お茶・飲料、ペットフード、ベビー用品、アパレル、ギフト包装'),
        ('note', '2026-07-30 v7 daily cron Tier A 7 行业 round 2 (append 1 行 適配行業 7 词繁体, 跟 7/22 简体适配行业并存; 7/30 0 push 攒批, 等 7/31 daily 一起 commit + push 1 build)')
    ]),
    OrderedDict([
        ('id', 'v7-SKU-27'),
        ('slug', 'eco-flyers'),
        ('category', 'flyers'),
        ('optimized_at', '2026-07-30'),
        ('optimization_round', 1),
        ('industries_zh', '環保主題活動、ESG 報告、社會企業、有機品牌、校園推廣、餐廳菜單、咖啡烘焙'),
        ('industries_en', 'Eco campaigns, ESG reports, Social enterprises, Organic brands, School promotion, Restaurant menus, Coffee roasters'),
        ('industries_ja', 'エコキャンペーン、ESGレポート、社会企業、オーガニックブランド、学校推广、レストランメニュー、コーヒー焙煎'),
        ('note', '2026-07-30 v7 daily cron Tier A 7 行业 round 1 (P0 flyers 第 4 个, 真正未优化过; 7/30 0 push 攒批, 等 7/31 一起 commit)')
    ]),
    OrderedDict([
        ('id', 'v7-SKU-28'),
        ('slug', 'corrugated-boxes'),
        ('category', 'packaging'),
        ('optimized_at', '2026-07-30'),
        ('optimization_round', 1),
        ('tier', 'A'),
        ('industries', ['跨境電商 DTC', '訂閱盒直運', '物流快遞', '3C 電子', '汽配零件', '寵物食品', '烘焙連鎖']),
        ('note', '2026-07-30 v7 daily cron P0 packaging 第 8 个 PENDING 优化. description 已有 7 词 適配行業 (繁体, §13.16.1 OK), 7/30 仅加 optimizedAt 字段 R1 (R2 等 8/12 P4 复盘时 price_anchor 5 档 + 15+ 年模板 fixes). 0 push 攒批, 等 7/31 一起 commit')
    ]),
    OrderedDict([
        ('id', 'v7-SKU-29'),
        ('slug', 'gift-bags'),
        ('category', 'paper-bags'),
        ('optimized_at', '2026-07-30'),
        ('optimization_round', 2),
        ('industries_zh', '婚慶、珠寶鐘錶、茶飲食品、服裝、禮品店、品牌活動、酒店迎賓'),
        ('industries_en', 'Weddings, Jewelry & Watches, Tea & F&B, Apparel, Gift shops, Brand events, Hotel welcome'),
        ('industries_ja', '婚礼、宝飾時計、お茶飲食、アパレル、ギフトショップ、ブランドイベント、ホテル歓迎'),
        ('note', '2026-07-30 v7 daily cron Tier A 7 行业 round 2 (跟 v7-SKU-18 7/28 R1 一致, 但用 適配行業 7 词繁体, 跟 7/22 简体并存; §13.16.1 zh-hk 100% 繁体目标). 0 push 攒批, 等 7/31 一起 commit')
    ]),
    OrderedDict([
        ('id', 'v7-SKU-30'),
        ('slug', 'premium-greeting-cards'),
        ('category', 'greeting-cards'),
        ('optimized_at', '2026-07-30'),
        ('optimization_round', 1),
        ('industries_zh', '婚慶、聖誕節、新年、節日禮品、品牌活動、酒店迎賓、企業定制'),
        ('industries_en', 'Weddings, Christmas, New Year, Holiday gifts, Brand events, Hotel welcome, Corporate customization'),
        ('industries_ja', '婚礼、クリスマス、新年、节日ギフト、ブランドイベント、ホテル歓迎、企業カスタム'),
        ('note', '2026-07-30 v7 daily cron Tier A 7 行业 round 1 (P1 v22 改造 6 SKU 之一, matrix category_priority 没列但属 P3 校园着陆页核心 SKU; 7/30 0 push 攒批, 等 7/31 一起 commit)')
    ])
]
d['v7_sku_optimizations'].extend(new_skus)

# 2. Append v7_pdp_reviews entry (corrugated-boxes)
new_pdp = OrderedDict([
    ('id', 'v7-PDP-09'),
    ('slug', 'corrugated-boxes'),
    ('category', 'packaging'),
    ('reviewed_at', '2026-07-30'),
    ('5_dimensions', OrderedDict([
        ('1_title_ctr', 'OK zh-hk title_zh 21 chars 含 5 sharp hooks (瓦楞彩盒/印刷定製/跨境電商/物流快遞/抗壓); en nameEn short, H1 in page.tsx 含 100 MOQ / 5-7 Day Turnaround / Free Shipping; ja nameJa 23 chars 標準 E/F フルート'),
        ('2_price_anchor', 'NEEDS-FIX longDescription L18189-18190 只有 2 個區間 (3 層 HK$2-4/box + 5 層 HK$4-8/box), 缺 5 檔 detail table (跟 v7-PDP-02 mailer-boxes 5 檔 HKD 965/1144/1677/1872/2800 不一致). basePrice 1517 + price_range HK$1,517-7,278 缺中段錨. 8/12 P4 复盘时 fix_count +1'),
        ('3_trust_bar_15y', 'OK RegionalContent.tsx 3 locale 15+ 年印刷經驗 / 15+ Years Expertise / 15+ 年の実績 通用 trust bar; longDescription 提 100% 滿意保證 + FSC/ISO 認證 (3 markers 替代 15+ 年模板)'),
        ('4_nap_consistency', 'OK NAP 脫敏 - title_zh 跨境電商物流快遞 无 深圳/深圳自有廠房 泄漏到 SEO title/excerpt/Hero, NAP 真實披露位置 footer/contact/schema (§13.10 合規)'),
        ('5_cta_path', 'OK 通用 3 入口 (page.tsx template: generateWhatsAppLink + ProductQuoteProvider/QuoteCalculator + /quote/ locale-aware) - 7/29 v7-PDP-08 同模式')
    ])),
    ('fixes_applied', []),
    ('files_changed', []),
    ('fixes_pending', ['2_price_anchor 5 档 detail table', '1_title_ctr title_zh 长度优化 (21→50+ chars)']),
    ('note', '2026-07-30 v7 daily cron PDP review #9 - 5 维度审查完成, fixes_applied 留空 (2 fixes 8/12 P4 复盘时再改: price_anchor 5 档 + title_zh 长度). 7/30 0 push 攒批, 等 7/31 一起 commit'),
    ('session', 'mvs_09a761726fae41b69aca39490906c290')
])
d['v7_pdp_reviews'].append(new_pdp)

# 3. Append v7_cron_sessions entry
new_session = OrderedDict([
    ('session', 'mvs_09a761726fae41b69aca39490906c290'),
    ('date', '2026-07-30'),
    ('deliverables', OrderedDict([
        ('blog', 0),
        ('sku_optimizations', 5),
        ('pdp_reviews', 1),
        ('matrix_updates', 1),
        ('k3_section6_skip_count', 24)
    ])),
    ('build_quota', 0),
    ('strategy', 'v7 0 push 攒批 + 深度提质 (K3 §6 0 候选常态, 跑 B+C+F 兜底; e095918 7/30 凌晨 quota 占用, 7/30 daily 0 push 攒批 等 7/31 一起 commit + push 1 build)'),
    ('skus', [
        'foil-stickers (P0 stickers, round 2, 7 行业 append 1 行 適配行業 7 词繁体)',
        'eco-flyers (P0 flyers, round 1, 7 行业全新)',
        'corrugated-boxes (P0 packaging, round 1, description 已有 7 词 加 optimizedAt 字段)',
        'gift-bags (P0 paper-bags, round 2, 7 行业 append 1 行 適配行業 7 词繁体)',
        'premium-greeting-cards (P1 v22 改造 6 SKU 之一, round 1, 7 行业全新)'
    ]),
    ('pdp_review', 'corrugated-boxes (P0 packaging × 跨境電商, 5 维度审查, 0 fixes + 2 pending (price_anchor 5档 + title_zh 长度) 等 8/12 P4 复盘)'),
    ('note', '2026-07-30 v7 daily-content-evolve: 5 SKU 跨 4-5 类目 (P0 stickers + P0 flyers + P0 packaging + P0 paper-bags + greeting-cards P1 v22). matrix P0/P1 100% 饱和 (K3 §6 0 候选常态, 跑 B+C+F 兜底). 0 push 攒批, e095918 7/30 凌晨已 push 1 次占 quota, 等 7/31 daily cron 一起 commit (含 user 凌晨 about/page.tsx 改动) + push 1 build. 7/30+ P3 校园着陆页 back-to-school-printing-usa (en) + new-semester-printing-japan (ja) blocklist 4 cron 严禁写 (M3 P3 reserved). 7/30 root session 跑 daily cron 模式, 不是 branch worker (R1-R6 orchestrator discipline: 派生 vs 直接跑 trade-off)')
])
d['v7_cron_sessions'].append(new_session)

# 4. Append k3_section6_skip_log entry
new_skip = OrderedDict([
    ('date', '2026-07-30'),
    ('queue_size', 31),
    ('pending_in_queue', 24),
    ('covered_skip', 24),
    ('k3_section6_skip_count', 24),
    ('new_blog_written', False),
    ('reason', 'matrix P0/P1 100% 饱和 + P2 部分 pending-verify, 0 个新题可写 (K3 §6 铁律常态, 不写新博客). 跑 B+C+F 兜底 (5 SKU + 1 PDP + matrix update). 7/30 0 push 攒批, e095918 quota 占用, 7/31 一起 commit. 7/30+ 严禁写 back-to-school-printing-usa / new-semester-printing-japan (M3 P3 reserved, §8 blocklist 4 cron). 7/30 5 SKU 跨 4-5 类目 (P0 4 + greeting-cards P1 v22), 1 PDP corrugated-boxes 5 维度审查 0 fixes + 2 pending 8/12 P4 复盘')
])
d['k3_section6_skip_log'].append(new_skip)

# 5. Update last_updated
d['last_updated'] = '2026-07-30T10:35:00+08:00'

# 6. Save back
with open(path, 'w', encoding='utf-8') as f:
    json.dump(d, f, indent=2, ensure_ascii=False)

print('Matrix updated:')
print('  v7_sku_optimizations:', len(d['v7_sku_optimizations']))
print('  v7_pdp_reviews:', len(d['v7_pdp_reviews']))
print('  v7_cron_sessions:', len(d['v7_cron_sessions']))
print('  k3_section6_skip_log:', len(d['k3_section6_skip_log']))
print('  last_updated:', d['last_updated'])
print('  file size:', __import__('os').path.getsize(path), 'bytes')
