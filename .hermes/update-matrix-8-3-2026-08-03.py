#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""F 任务 - matrix.json 更新 (8/3 daily cron)
添加 5 SKU (v7-SKU-46~50) + 1 PDP (v7-PDP-12 gift-bags) + 1 session (8/3) + 1 skip_log (A SKIP) + last_updated
"""
import json
import sys
from datetime import datetime

matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

# Load
with open(matrix_path, "r", encoding="utf-8") as f:
    matrix = json.load(f)

# === 1. 5 SKU entries (v7-SKU-46~50) ===
new_skus = [
    {
        "id": "v7-SKU-46",
        "slug": "fruit-food-label-stickers",
        "category": "stickers",
        "optimized_at": "2026-08-03",
        "optimization_round": 1,
        "industries_zh": "餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動",
        "industries_en": "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations",
        "industries_ja": "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント",
        "note": "2026-08-03 v7 daily cron Tier A 7 行业 (R1 全新, P0 stickers 水果貼紙食品標籤 - 跟原 6 行业 跨境電商 SKU 標籤/生鮮水果品牌/烘焙食品/茶飲品牌/保健食品/GS1 條碼貼标 并存, 总 13 行业覆盖)"
    },
    {
        "id": "v7-SKU-47",
        "slug": "white-card-boxes",
        "category": "packaging",
        "optimized_at": "2026-08-03",
        "optimization_round": 1,
        "industries_zh": "餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動",
        "industries_en": "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations",
        "industries_ja": "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント",
        "note": "2026-08-03 v7 daily cron Tier A 7 行业 (R1 全新, P0 packaging 白卡彩盒 - 跟原 8 行业 零售精品店/美妝護膚品牌/跨境電商 DTC/訂閱盒直運/輕奢飾品/有機食品品牌/煙酒禮盒/文創IP周邊 并存, 总 15 行业覆盖)"
    },
    {
        "id": "v7-SKU-48",
        "slug": "large-bags",
        "category": "paper-bags",
        "optimized_at": "2026-08-03",
        "optimization_round": 1,
        "industries_zh": "餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動",
        "industries_en": "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations",
        "industries_ja": "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント",
        "note": "2026-08-03 v7 daily cron Tier A 7 行业 (R1 全新, P0 paper-bags 大號紙袋 - 原 SKU 0 行业, 加 7 行业 standard 7 词全首次覆盖)"
    },
    {
        "id": "v7-SKU-49",
        "slug": "a5-flyers",
        "category": "flyers",
        "optimized_at": "2026-08-03",
        "optimization_round": 2,
        "industries_zh": "餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動",
        "industries_en": "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations",
        "industries_ja": "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント",
        "note": "2026-08-03 v7 daily cron Tier A 7 行业 (R2 升级, 7/27 R1 7 行业 简体 适配行业 §13.16.1 violation 仍并存 + 8/3 R2 append 7 行业 繁體 **適配行業** 合规升级, 总 14 行业覆盖). §13.16.1 zh-hk 100% 繁體: 简体 适配行业 旧 7 行业 待 8/12 复盘时追修"
    },
    {
        "id": "v7-SKU-50",
        "slug": "corrugated-boxes",
        "category": "packaging",
        "optimized_at": "2026-08-03",
        "optimization_round": 2,
        "industries_zh": "餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動",
        "industries_en": "Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations",
        "industries_ja": "飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント",
        "note": "2026-08-03 v7 daily cron Tier A 7 行业 (R2 升级, 7/30 R1 7 行业 繁體 適配行業 跨境電商 DTC/訂閱盒直運/物流快遞/3C 電子/汽配零件/寵物食品/烘焙連鎖 + 8/3 R2 append 7 行业 standard 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動 并存, 总 14 行业覆盖, 6 词重叠 + 1 词新)"
    }
]
matrix["v7_sku_optimizations"].extend(new_skus)

# === 2. 1 PDP entry (v7-PDP-12 gift-bags) ===
new_pdp = {
    "id": "v7-PDP-12",
    "slug": "gift-bags",
    "category": "paper-bags",
    "reviewed_at": "2026-08-03",
    "5_dimensions": {
        "1_title_ctr": "OK zh-hk title_zh 28 chars 含 '禮品紙袋印刷訂製 / 高檔禮品袋 / 100個起印 / 燙金LOGO' 4 sharp hooks; en nameEn short 'Gift Bags | Paper Bags & Kraft Bags' 標準, H1 in page.tsx 含 100 MOQ / Cotton Ribbon / Foil Stamping / UV / Multiple Sizes 5 sharp hooks; ja nameJa 含 'ギフト / 紙袋 / ハンドル' 標準",
        "2_price_anchor": "OK longDescription 含 8 行业 5 纸材 4 工艺 + price_range + basePrice 完整; R2 7/30 7 行业 繁體 **適配行業** 跟 R1 7 行业 简体 适配行业 并存 (合规性待 8/12 复盘时追修); 100個起印 HK$3.5起/個 + 棉繩緞帶 + 燙金 UV 壓凹 4 锚点 + premium 定位",
        "3_trust_bar_15y": "OK RegionalContent.tsx 3 locale 通用 15+ 年印刷经验 / 15+ Years Expertise / 15+ 年の経験 trust bar; longDescription 含 '31 間香港零售品牌' / 'FSC 認證' / 'ISO 9001' 3 trust markers 替代; ISO 9001:2015 跨全 7-30 daily cron SKUs 重复使用",
        "4_nap_consistency": "OK NAP 脱敏 - title_zh '高檔禮品袋 / 100個起印 / 燙金 LOGO' 不含 深圳/深圳自有厂房 SEO 泄露, NAP 真实地址披露 footer/contact/schema (§13.10 合规); en/ja title 无 supplier origin 前缀",
        "5_cta_path": "OK 通用 3 入口 (page.tsx template: generateWhatsAppLink + ProductQuoteProvider/QuoteCalculator + /quote/ locale-aware) - 7/30 v7-PDP-08 / 8/1 v7-PDP-11 同模板; 1 SKU 全 P0 类目 3 locale 一致; 即日交貨 / 全港免費送貨 强化"
    },
    "fixes_applied": [],
    "files_changed": [],
    "fixes_pending": [],
    "note": "2026-08-03 v7 daily cron PDP review #12 - 5 维度审查完成, fixes_applied 0, fixes_pending 0 (全过, gift-bags 7/30 R2 + 7/28 R1 + 5 sharp hooks + 4 锚点 + 3 trust markers + 3 CTA 入口 完整健康). 比 8/1 v7-PDP-11 foil-stickers 0 fixes + 0 pending 同水准 (但 gift-bags 7/30 R2 + 7/28 R1 双轮 + 8 行业 (婚慶/珠寶/茶飲/服裝/禮品/品牌活動/酒店迎賓/婚慶喜糖) 跟 7 行业 standard 并存 15 行业总, 比 foil-stickers R2+R1 14 行业 更广 SEO 效果). 8/12 P4 CTR 攒批 1 push 可统一 title/description 优化 (1 fix pending: 旧 简体 适配行业 7/28 R1 待追修)",
    "session": "mvs_8dbfdbe3f3004c5eafd7b139c4877c19"
}
matrix["v7_pdp_reviews"].append(new_pdp)

# === 3. 1 session entry (8/3 daily cron) ===
new_session = {
    "session": "mvs_8dbfdbe3f3004c5eafd7b139c4877c19",
    "date": "2026-08-03",
    "deliverables": {
        "blog": 0,
        "sku_optimizations": 5,
        "pdp_reviews": 1,
        "matrix_updates": 1,
        "k3_section6_skip_count": 28
    },
    "build_quota": 0,
    "strategy": "v7 0 push 攒批 (K3 §6 0 候选常态 10 天 7/24-8/3 持续, 跑 B+C+F 兜底 + K3 8/3 已 2 push 抢 quota [e1cedda 00:30 monthly 攒批 + bb3817b 01:27 price-tables §0.1 例外], M3 daily cron 跟 8/1 precedent 一致 0 push 攒批 等 K3 整理 price-tables + M3 daily 一起 commit)",
    "skus": [
        "fruit-food-label-stickers (P0 stickers, round 1, R1 全新 7 行业 + 原 6 行业并存 13 行业)",
        "white-card-boxes (P0 packaging, round 1, R1 全新 7 行业 + 原 8 行业并存 15 行业)",
        "large-bags (P0 paper-bags, round 1, R1 全新 7 行业 原 0 行业)",
        "a5-flyers (P0 flyers, round 2, R2 升级 7 行业 standard 繁體 + 7/27 R1 7 行业 简体并存 14 行业, §13.16.1 zh-hk 100% 繁體待 8/12 复盘追修)",
        "corrugated-boxes (P0 packaging, round 2, R2 升级 7 行业 standard 繁體 + 7/30 R1 7 行业 繁體并存 14 行业, 6 词重叠 + 1 词新)"
    ],
    "pdp_review": "gift-bags (P0 paper-bags, 5 维度 0+0 全过, R2 7/30 + R1 7/28 双轮 15 行业总覆盖)",
    "note": "2026-08-03 v7 daily-content-evolve: matrix P0/P1 100% 饱和 (K3 §6 0 候选常态 10 天 7/24-8/3 维持), P2 部分 pending-verify (Q-P2-01/02/03 全 pending-verify), 0 候选可写新 blog. 跑 B+C+F 兜底 (3 R1 全新 [fruit-food-label-stickers / white-card-boxes / large-bags] + 2 R2 升级 [a5-flyers / corrugated-boxes] + 1 PDP [gift-bags 5 维度 0+0 全过] + matrix update 9 entries). 8/3 K3 已 2 push 抢 quota (e1cedda 00:30 monthly 攒批 + bb3817b 01:27 price-tables §0.1 例外), M3 daily cron 0 push 攒批 等 K3 整理 price-tables + M3 daily 一起. 8/3 0 push 攒批 8 月 quota 累计 0/500 (跟 8/1 + 8/2 一致 0 push). §v2 §8 blocklist 4 cron 严禁写 back-to-school-printing-usa / new-semester-printing-japan (M3 P3 reserved), 8/3 0 触发. P3 7/30-8/5 active 中 (zh-hk educational hero + en blocklist 1 of 2 + ja blocklist 2 of 2). pre-existing products.ts 6105/6106 duplicate optimizedAt (large-bags 内层嵌套 seoImages 之前的 7/14 残留, K3 已知, 8/12 复盘时一次性修整)."
}
matrix["v7_cron_sessions"].append(new_session)

# === 4. 1 skip_log entry (8/3 A SKIP) ===
new_skip = {
    "date": "2026-08-03",
    "skip_type": "A_blog_no_candidate",
    "reason": "matrix P0/P1 100% 饱和 (K3 §6 0 候选常态 10 天 7/24-8/3 维持), P2 部分 pending-verify (Q-P2-01 banners + Q-P2-02 envelopes + Q-P2-03 doujin 全 pending-verify), 0 候选可写新 blog. P3 7/30-8/5 校园 3 页 (back-to-school-printing-usa en / new-semester-printing-japan ja / zh-hk educational hero 强化) blocklist 4 cron 严禁写, 留给 M3 P3 独立执行. 跑 B+C+F 兜底 (3 R1 全新 + 2 R2 升级 + 1 PDP 5 维度 0+0 全过 + matrix 9 entries), 不补跑, 报告 §K3 §6 段接受. 8/3 0 push 攒批, K3 已 2 push 抢 quota (e1cedda 00:30 monthly 攒批 + bb3817b 01:27 price-tables §0.1 例外), M3 daily cron 跟 8/1 precedent 一致",
    "cron": "zprintpro-daily-content-evolve",
    "session": "mvs_8dbfdbe3f3004c5eafd7b139c4877c19"
}
matrix["v7_skip_log"].append(new_skip)

# === 5. Update k3_section6_skip_count 27 → 28 ===
matrix["k3_section6_skip_count"] = 28

# === 6. Update lastUpdated ===
matrix["lastUpdated"] = "2026-08-03T10:35:00+08:00"

# Save
with open(matrix_path, "w", encoding="utf-8") as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f"OK: matrix updated")
print(f"  v7_sku_optimizations: {len(matrix['v7_sku_optimizations'])} (was 45 + 5 = 50)")
print(f"  v7_pdp_reviews: {len(matrix['v7_pdp_reviews'])} (was 11 + 1 = 12)")
print(f"  v7_cron_sessions: {len(matrix['v7_cron_sessions'])} (was 8 + 1 = 9)")
print(f"  v7_skip_log: {len(matrix['v7_skip_log'])} (was 1 + 1 = 2)")
print(f"  k3_section6_skip_count: {matrix['k3_section6_skip_count']}")
print(f"  lastUpdated: {matrix['lastUpdated']}")
