# -*- coding: utf-8 -*-
"""
2026-08-06 9:10 daily cron v8.2 yield 跳过 模式
更新 matrix.json:
1. v7_pdp_reviews 追加 v7-PDP-14 (removable-stickers, P0 stickers × 7 行业, R1 8/5, 5 维度 0 fixes + 2 pending)
2. v7_cron_sessions 追加 8-6-daily-cron-v8.2-yield entry (yield 跳过 A+B, 跑 C+F 兜底, 0 push)
3. lastUpdated: 2026-08-05T10:35:00+08:00 → 2026-08-06T09:10:00+08:00
4. v7_pdp_reviews_count: 13 → 14
5. v7_cron_sessions_count: 12 → 13
6. k3_section6_skip_count: 29 → 30 (yield 跳过 1 次)
"""

import json
import sys
from pathlib import Path

matrix_path = Path(r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json")

# 读 JSON
with open(matrix_path, 'r', encoding='utf-8') as f:
    matrix = json.load(f)

# 1. 追加 v7-PDP-14 entry
pdp14 = {
    "reviewId": "v7-PDP-14",
    "slug": "removable-stickers",
    "category": "stickers",
    "priority": "P0",
    "industries_covered": [
        "餐飲外賣",
        "零售精品",
        "跨境電商",
        "美妝護膚",
        "教育培訓",
        "婚慶",
        "品牌活動"
    ],
    "optimizationRound": 1,
    "previous_optimizedAt": "2026-08-05",
    "reviewAt": "2026-08-06",
    "5_dim_audit": {
        "title_ctr": {
            "status": "PASS",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "zh-hk_title_zh": "可移除貼紙印刷 50張起印 玻璃不留膠 · 季節活動試用品短期推廣適配 | 智印雲 ZprintPro",
                "zh-hk_chars": 36,
                "zh-hk_hooks": ["50張 MOQ", "玻璃不留膠", "季節活動短期推廣", "智印雲 ZprintPro 雙品牌"],
                "en_nameEn": "Removable Stickers | Waterproof & Die-Cut Stickers",
                "en_chars": 49,
                "en_hooks": ["Removable", "Waterproof", "Die-Cut"],
                "ja_nameJa": "はがせるステッカー | 防水ステッカー / ダイカット",
                "ja_chars": 28,
                "ja_hooks": ["はがせる", "防水", "ダイカット"]
            },
            "note": "全 3 locale sharp hook 命中, §13.10 NAP 脱敏 (0 深圳/Shenzhen/深セン), §v2 §8 双品牌宪法 (zh-hk=智印雲 ZprintPro / en/ja=ZprintPro) 维持"
        },
        "price_anchor": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 1,
            "evidence": {
                "description_industries_zh": "7 行业 简体 '适配行业' (季節性推廣/活動短期宣傳/試用品包裝/玻璃櫥窗裝飾/學校活動/餐廳當日貼紙/零售促銷) + 7 行业 繁体 '適配行業' (餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動) = 14 行业并存 (8/5 daily append 7 繁体 standard 3 locale)",
                "longDescription_zh_tables": "3 个 table (材質: 銅版紙/PVC/透明 PET + 工藝: 光膜/啞膜/異形模切/吻切 + 印刷工藝說明)",
                "longDescription_en_tables": "2 个 table (Material & Adhesive: Vinyl/PP/PET/Paper + Lamination & Finish: Matte/Gloss/Die-Cut/Static Cling/Variable QR)",
                "longDescription_ja_tables": "2 个 table (基材と粘着剤: ビニール/PP/PET/上質紙 + ラミネーション: マット/グロス/型抜き/静電吸着/可変 QR)",
                "5_industries_zh_scenarios": "長期活動/餐廳當日/玻璃櫥窗/季節推廣/學校活動 (含 MOQ + 應用場景)",
                "5_industries_en_scenarios": "Real estate open-house / Event companies / Rental equipment / Retail seasonal / School activities (with MOQ 100-1000 ranges)",
                "5_industries_ja_scenarios": "小売季節/不動産OE/イベント/レンタル機器/教育機関 (with MOQ + 納期)"
            },
            "pending_8_12": "缺 price_range 显式显示 (其他产品同款缺失, 8/12 §PDP 复盘统一补, 跟 8/3 v7-PDP-12 gift-bags + 8/5 v7-PDP-13 mailer-boxes fix pending 一致)"
        },
        "trust_bar_15y": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 1,
            "evidence": {
                "iso_9001": "longDescriptionEn 'Production runs on ISO 9001:2015 certified lines' ✓",
                "iso_12647_2": "longDescriptionEn 'ISO 12647-2 color management' ✓",
                "fsc_certified": "longDescriptionEn 'FSC-certified paper' + longDescriptionJa 'FSC 認証紙' ✓",
                "heidelberg_4color": "longDescriptionEn 'Heidelberg 4-color offset' ✓",
                "15_plus_years_expertise": "RegionalContent.tsx 通用 3 locale 含 15+ 年印刷经验 (跨产品通用, 跟 8/3 v7-PDP-12 + 8/5 v7-PDP-13 模式一致) ✓"
            },
            "pending_8_12": "缺 31 間香港零售品牌 量化 mark (8/3 v7-PDP-12 模式, 8/12 §PDP 复盘统一补)"
        },
        "nap_consistency": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "title_no_supplier_origin": "title_zh 不含 深圳/Shenzhen/深セン ✓ §13.10 NAP 脱敏",
                "description_industry_global": "description 14 行业全部全球通用 卖点 (餐飲外賣/零售精品/跨境電商/...) ✓",
                "nap_real_address_in_long_desc": "longDescription '深圳自設廠房直送' (法务 NAP, 不是 SEO 硬塞, 跟 8/3 v7-PDP-12 + 8/5 v7-PDP-13 模式一致) ✓"
            }
        },
        "cta_path": {
            "status": "PASS (0 fixes)",
            "fixes_count": 0,
            "pending_count": 0,
            "evidence": {
                "entry_1_whatsapp": "generateWhatsAppLink 跟 7/30 v7-PDP-08 + 8/1 v7-PDP-11 + 8/3 v7-PDP-12 + 8/5 v7-PDP-13 同模板 ✓",
                "entry_2_quote_calculator": "ProductQuoteProvider/QuoteCalculator 跨产品通用 ✓",
                "entry_3_quote_page": "/quote/ locale-aware 3 locale 入口 ✓",
                "3_locale_consistent": "P0 stickers 跨 3 locale 1 SKU 入口一致 ✓"
            }
        }
    },
    "summary": {
        "fixes_total": 0,
        "pending_total": 2,
        "pdp_dimension_score": "5/5 dimensions PASS (0 fixes + 2 pending 8/12 §P4 复盘统一补)",
        "pdp_tier": "P0 stickers × Tier A (高复购月/周频次, 跨境主力客群, 优先铺)",
        "comparison_to_predecessors": "跟 7/30 v7-PDP-09 corrugated-boxes 0+2 / 7/31 v7-PDP-10 folding-boxes 0+0 / 8/1 v7-PDP-11 foil-stickers 0+0 / 8/3 v7-PDP-12 gift-bags 0+0 / 8/5 v7-PDP-13 mailer-boxes 0+0 同水准 (P0 packaging/stickers/paper-bags 5 维度全过 + 2 pending 8/12 统一补 price_range + 31 間品牌 mark)"
    }
}

# 2. 追加 cron_sessions entry
cron_8_6 = {
    "session_id": "8-6-daily-cron-v8.2-yield",
    "date": "2026-08-06",
    "cron_name": "zprintpro-daily-content-evolve",
    "cron_id": "3684eb06",
    "trigger_type": "scheduled_cron_daily_9:10",
    "yield_mode": True,
    "yield_reason": "v8.2 同日双触发 yield 检查 (8/6 0:39 K3 拍板 3 push [T1 4 CTR 狙击 + T2 cron 治理 + v8 模板 v2 + 61 retrofit 排期] 已占 §0.1 quota, daily cron 9:10 触发跳过 A+B 攒批, 跑 C+F 兜底, 0 push)",
    "tasks_executed": {
        "A_blog": {
            "executed": False,
            "skipped_reason": "v8.2 yield 跳过, 攒批 8/7 9:10 cron 兑现 (1 新写 + 1 retrofit, 1 commit 1 push)"
        },
        "B_sku_optimization": {
            "executed": False,
            "skipped_reason": "v8.2 yield 跳过, P0 SKU 100% 优化覆盖率 8/5 已 34/34 兑现 (matrix v7_sku_optimizations 54/54), 8/6 0 SKU 待优化, 攒批 8/7 兑现"
        },
        "C_pdp_review": {
            "executed": True,
            "v7_id": "v7-PDP-14",
            "slug": "removable-stickers",
            "category": "stickers",
            "priority": "P0",
            "industries_covered_count": 7,
            "5_dim_audit": True,
            "fixes": 0,
            "pending": 2,
            "audit_evidence_complete": True
        },
        "F_matrix_tracking": {
            "executed": True,
            "v7_pdp_added": 1,
            "v7_pdp_total": 14,
            "cron_sessions_added": 1,
            "cron_sessions_total": 13,
            "lastUpdated_updated": "2026-08-05T10:35:00+08:00 → 2026-08-06T09:10:00+08:00"
        }
    },
    "push_status": "0 push (yield 跳过, §0.1 红线 8/6 已 3 push K3 拍板例外 [T1/T2/v8 模板 v2], 不再加 daily cron push)",
    "commit_status": "0 commit (纯 .hermes/ 报告 + matrix update 落盘, 不 commit 任何 src/)",
    "build_quota": 0,
    "verify_deploy_status": "N/A (0 push, 无需 verify-deploy PASS)",
    "k3_section_6_protection": "8/6 yield 跳过 1 次 (k3_section6_skip_count 29 → 30), 跟 7/24-8/4 0 候选常态 + 8/1-8/3 M3 daily cron 0 push 攒批 + 8/5 v8 1 push 兑现 precedent 一致"
}

# 应用更新
matrix['v7_pdp_reviews'].append(pdp14)
matrix['v7_cron_sessions'].append(cron_8_6)
matrix['lastUpdated'] = "2026-08-06T09:10:00+08:00"
matrix['v7_pdp_reviews_count'] = len(matrix['v7_pdp_reviews'])
matrix['v7_cron_sessions_count'] = len(matrix['v7_cron_sessions'])
matrix['k3_section6_skip_count'] = matrix.get('k3_section6_skip_count', 29) + 1

# 写回 (UTF-8 无 BOM, LF)
with open(matrix_path, 'w', encoding='utf-8', newline='\n') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f"OK: matrix.json updated")
print(f"  v7_pdp_reviews: 13 → {matrix['v7_pdp_reviews_count']} (v7-PDP-14 removable-stickers)")
print(f"  v7_cron_sessions: 12 → {matrix['v7_cron_sessions_count']} (8-6-daily-cron-v8.2-yield)")
print(f"  lastUpdated: 2026-08-05T10:35:00 → {matrix['lastUpdated']}")
print(f"  k3_section6_skip_count: 29 → {matrix['k3_section6_skip_count']}")
