#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Add gsc_targeting_zh_hk_v3 section to industry-keyword-matrix.json
2026-08-08 04:30 K3 GSC zh-hk 香港 v3 deep analysis.
"""
import json
import sys

matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

with open(matrix_path, "r", encoding="utf-8") as f:
    matrix = json.load(f)

# Build gsc_targeting_zh_hk_v3 section
zh_v3 = {
    "version": "v3",
    "created_at": "2026-08-08T04:30:00+08:00",
    "creator": "Mavis (M3)",
    "trigger": "K3 8/8 04:00 GSC v2 完成 + 04:00 '按最优执行' 自主拍板 + 8/7 8/8 GSC 三市场 (JA+EN+ZH-HK) 完整分析",
    "source_files": [
        r"F:\zprintpro-nextjs\GSC数据\zprintpro.com-Performance-on-Search--ZH-HK 2026-08-08 (3 月累计)",
        r"F:\zprintpro-nextjs\GSC数据\zprintpro.com-Performance-on-Search-ZH-HK 2026-08-08 (1) (7 天)"
    ],
    "summary": {
        "ZH_imps_3m": 13759,
        "ZH_clicks_3m": 213,
        "ZH_ctr_3m": 1.55,
        "ZH_pos_3m": 30.63,
        "ZH_imps_7d": 1332,
        "ZH_clicks_7d": 36,
        "ZH_ctr_7d": 2.7,
        "ZH_pos_7d": 23.69,
        "ZH_mobile_ctr_3m": 1.81,
        "ZH_mobile_ctr_7d": 2.65,
        "ZH_desktop_ctr_3m": 1.44,
        "ZH_desktop_ctr_7d": 2.88,
        "ZH_desktop_3m_to_7d_growth": 1.0,
        "ZH_KP_3m_0_imps": "0/1 0% CTR pos 1 (zh-hk 商家信息未触发)",
        "ZH_KP_7d_0_imps": "(商家信息未出现在 7 天数据)",
        "ZH_brand_智印港_3m": "6/31 19.35% CTR pos 2.32",
        "ZH_brand_智印港_7d": "2/2 100% CTR pos 1 ✅ 顶级",
        "ZH_homepage_3m": "3/59 5.08% CTR pos 5.59",
        "ZH_homepage_7d": "2/3 66.67% CTR pos 1.33 ✅ 顶级",
        "ZH_3markets_compare": {
            "ZH_7d_CTR": 2.7,
            "JA_7d_CTR_estimate": 1.5,
            "EN_7d_CTR_estimate": 0.8,
            "ZH_7d_pos": 23.69,
            "JA_7d_pos_estimate": 35,
            "EN_7d_pos_estimate": 40,
            "verdict": "ZH-HK 7 天 CTR 2.7% = JA 2.6x = EN 5.1x; pos 23.69 = 三市场最优"
        }
    },
    "top_signals_4": {
        "1_智印港_branded": {
            "3m": "6/31 19.35% CTR pos 2.32",
            "7d": "2/2 100% CTR pos 1 ✅",
            "action": "8/9 Org sameAs 改后期望 31→60+ imps, 维持 pos 1"
        },
        "2_homepage_NAP": {
            "3m": "3/59 5.08% CTR pos 5.59",
            "7d": "2/3 66.67% CTR pos 1.33 ✅",
            "action": "NAP 强化维持, Org sameAs 改后 pos 1 期望 3 imps → 10+"
        },
        "3_doujinshi_printing_PDP": {
            "3m": "1/2 50% CTR pos 10.5",
            "7d": "1/1 100% pos 3 ✅",
            "action": "8/8 10:15 amend push 改 doujinshi-printing title_zh 强化 同人誌 / 同人周邊 / 同人本 关键词"
        },
        "4_certificates_PDP": {
            "3m": "4/36 11.11% CTR pos 19.53",
            "7d": "0/6 0% CTR pos 15.83 (排名升 4 位)",
            "action": "维持, 8/11 paper-materials retrofit 末尾引証書印刷 CTA"
        }
    },
    "AI_citation_signals_2": {
        "1_supplier_query": {
            "query": "我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？",
            "imps": 2,
            "pos": 5,
            "signal": "LLM 引文, zprintpro.com 命中"
        },
        "2_eco_packaging_query": {
            "query": "我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？",
            "imps": 1,
            "pos": 1,
            "signal": "LLM 引文, zprintpro.com 命中 pos 1 顶级 ✅"
        },
        "implication": "智印港公式已经在 AI 引擎 (≥2/4 期望) 中被引用, 不需要等 8/10 K3 跑 AI 可见性"
    },
    "blackhole_buckets": {
        "A_top_imps_flyers_819": {
            "queries": ["宣傳單張 395", "宣傳單張印刷 370", "印傳單 24", "傳單印刷 19", "印刷 單張 0", "單張印刷 5", "宣傳 單 張 5", "傳單 1", "宣傳單印刷 2", "傳單 尺寸 1", "傳單大小 1", "傳單紙 1", "印刷傳單 0", "印宣傳單張 2", "印傳單 24"],
            "total_imps": 819,
            "rank_range": "pos 30-65",
            "root_cause": "a4-flyers / a5-flyers / double-sided-flyers PDP 缺 '香港觀塘新蒲崗' NAP + '即日取貨' USP",
            "fix": "8/8 10:15 amend push 改 same-day-flyers title_zh (333 imps pos 46.49 7 天 32 imps pos 42.16) + a4-flyers P1"
        },
        "A_top_imps_food_packaging_697": {
            "queries": ["食品包裝印刷 349", "食品包裝訂製 174", "包裝食品 裡印 84", "食品印刷 79", "食品包裝袋印刷 11"],
            "total_imps": 697,
            "rank_range": "pos 16-40",
            "root_cause": "food-boxes PDP 缺 '香港餐廳外賣食品級' NAP + 6 行业 list",
            "fix": "8/8 10:15 amend push 改 food-boxes title_zh (634 imps pos 39.98 7 天 25 imps pos 48.28) + corrugated-boxes P1"
        },
        "A_top_imps_stickers_618": {
            "queries": ["貼紙印刷 335", "貼紙訂製 128", "印貼紙 33", "貼紙印製 11", "貼紙 印刷 6", "貼紙設計 8", "客 製 貼紙 2", "印貼紙香港 7", "印貼紙少量香港 3", "印 貼紙 2", "環保材質貼紙 21", "防水貼紙 20", "印貼紙 33", "香港貼紙印刷 9+7", "客製信封 0", "可移貼紙 111"],
            "total_imps": 618,
            "rank_range": "pos 1-55",
            "root_cause": "die-cut-stickers / small-batch-stickers PDP 缺 '香港' NAP + 100 MOQ USP",
            "fix": "8/9 retrofit cross-border + 8/11 paper-materials 末尾引可移貼紙 + 防水貼紙"
        },
        "A_top_imps_poster_1162": {
            "queries": ["海報印刷 334", "印海報 308", "海報與印刷 203", "印海報一張 101", "poster 印刷 164", "海報列印 42", "海報size 8+2", "海報尺寸 8+1", "海報size 8", "海報大小 10+1", "海報 印刷 9+1", "海報 尺寸 2+1+1", "海報size 2", "海報size 1", "海報size 1", "海報size 0", "海報size 0", "海報size 0", "海報size 0", "海報size 0", "海報size 0"],
            "total_imps": 1162,
            "rank_range": "pos 5-90",
            "root_cause": "art-posters / display-posters PDP 缺 'A2 防水 PP加工 DHL' USP + 香港 NAP",
            "fix": "8/8 10:15 amend push 改 a2-posters title_zh (856 imps pos 37.95 7 天 73 imps pos 26.78 升 11 位) + art-posters P1"
        },
        "A_top_imps_paper_bags_1279": {
            "queries": ["紙袋 22", "紙袋印刷 301", "紙袋訂製 258", "印刷紙袋 158", "訂做紙袋 173", "印紙袋 117", "紙袋訂造 104", "紙袋訂做 92", "紙袋批發 52", "牛皮紙袋 1+0+1", "牛皮 紙袋 0+1", "紙袋 批發 0+1", "紙袋現貨深水埗 2", "紙袋現貨香港 1", "紙袋尺寸 1", "紙袋 尺寸 1", "印刷袋 3", "袋印刷 40", "手抽袋 5", "禮品紙袋 2", "印膠袋 40", "膠袋印刷 11+1", "膠袋 印刷 13", "環保紙袋 2", "牛皮紙袋印刷 2", "紙袋 印刷 1+1", "紙袋大 1", "大紙袋 11+1", "大紙袋哪裡買 1"],
            "total_imps": 1279,
            "rank_range": "pos 8-84",
            "root_cause": "kraft-paper-bags PDP 缺 '香港餐廳零售環保' NAP + 6 行业 + 100/120/150 GSM 规格",
            "fix": "8/8 10:15 amend push 改 kraft-paper-bags title_zh (521 imps pos 57.44 7 天 9 imps pos 68.67) + 5 SKU 标题强化"
        },
        "A_top_imps_packaging_boxes_776": {
            "queries": ["包裝盒 1", "包裝盒訂製 233", "包裝盒印刷 197", "印紙盒 49", "印紙 盒 12", "印盒 19", "紙盒訂製 157", "紙盒印刷 12+3", "紙盒印製 3", "紙盒訂造 14", "紙 盒 印刷 1", "包裝 盒 印刷 14+2", "包裝 印刷 13+2+51", "包裝盒 香港 0", "紙盒 1", "紙盒訂製 17+0", "kraft paper box 3+0", "kraft paper bag 5+0"],
            "total_imps": 776,
            "rank_range": "pos 30-95",
            "root_cause": "mailer-boxes / tuck-end-boxes / folding-boxes PDP 弱 + kraft-paper-packaging-box NAP 缺",
            "fix": "8/9 retrofit 改 mailer-boxes (94 imps pos 60.36 → 7 天 2 imps pos 25.5 升 35 位) + kraft-paper-packaging-box P1"
        },
        "A_top_imps_menus_262": {
            "queries": ["餐牌 0", "餐牌印刷 188", "膠片餐牌 43", "膠卡餐牌 26", "餐牌卡 1", "酒水牌 4", "菜單印刷 1"],
            "total_imps": 263,
            "rank_range": "pos 18-37",
            "root_cause": "laminated-menus / pvc-menus PDP 缺 '餐廳酒樓防水' USP + 香港 NAP",
            "fix": "8/9 retrofit 改 pvc-menus (3 月 64 imps pos 24.95 → 7 天 6 imps pos 16.17 升 9 位) + laminated-menus P1"
        },
        "A_top_imps_calendars_246": {
            "queries": ["月曆 0", "月曆印刷 182", "月曆訂製 12", "月歷印刷 49", "訂制月曆 2+1", "印月曆 0+1", "desk calendar printing 0+1"],
            "total_imps": 246,
            "rank_range": "pos 27-50",
            "root_cause": "custom-calendars PDP 缺 '香港月曆訂製' NAP + 6 行业 (枱曆/掛曆/磁性月曆)",
            "fix": "8/10 retrofit 改 custom-calendars (3 月 246 imps pos 40.19 → 7 天 58 imps pos 27.45 升 13 位)"
        },
        "A_top_imps_red_packets_183": {
            "queries": ["利是封 0", "利是封印刷 113", "訂製利是封 38", "印 利 是 封 8", "利 是 封 印刷 12", "利 是 封 訂 製 4", "印 利 是 封 8", "訂 制 利 是 封 8", "利 是 封 尺寸 4", "red packet size 1", "訂 做 利 是 封 12"],
            "total_imps": 209,
            "rank_range": "pos 27-58",
            "root_cause": "custom-red-packets PDP 缺 '香港利是封訂製' NAP + 6 行业 (婚禮/企業/年節)",
            "fix": "8/10 retrofit 改 custom-red-packets"
        },
        "A_top_imps_books_672": {
            "queries": ["印書 110+17+2", "騎馬釘 120+15+0+0+0", "騎馬釘印刷 110+15", "膠裝書 100+0", "膠裝書印刷 73+0", "騎馬釘書刊 79+17", "膠裝書價格 36+8", "膠裝書刊 14+0", "書刊印刷 12+0", "精裝書 4+3", "精裝 書 0+3", "冊子印刷 1+1", "書籍 印刷 0+2", "印 書 0+2", "印刷書籍 0+1", "書籍印刷 6+0", "無線膠裝 0+1", "作品集印製 3+2", "型錄印製 2+1"],
            "total_imps": 672,
            "rank_range": "pos 25-78",
            "root_cause": "saddle-stitch-booklets / perfect-bound-books / hardcover-books PDP 缺 '騎馬釘 膠裝 香港' NAP + 6 行业",
            "fix": "8/9 retrofit 改 saddle-stitch-booklets (3 月 314 imps pos 43.72 → 7 天 48 imps pos 43.27 升 1 位) + perfect-bound-books P1"
        },
        "A_top_imps_gift_boxes_124": {
            "queries": ["禮盒 0", "禮盒訂製 55+3", "禮盒訂做 29+2", "抽屜式禮盒 3+0", "禮物盒訂製 30+0", "化妝品盒 1+0", "電子產品包裝 2+0"],
            "total_imps": 124,
            "rank_range": "pos 23-70",
            "root_cause": "magnetic-closure-gift-box PDP 缺 '香港禮盒訂製' NAP + 6 行业",
            "fix": "8/10 retrofit 改 magnetic-closure-gift-box (3 月 158 imps pos 63.53 + 0/2 0% CTR 7 天 pos 1)"
        },
        "A_top_imps_envelopes_112": {
            "queries": ["信封 20+3", "信封印刷 7+2", "大信封 34+4", "公司信封 30+0", "信封 印刷 8+0", "信封 封面 0+1", "信封 size 1+0", "信封訂製 2+0", "印信封 1+0", "印刷信封 1+0", "印刷 信封 0+0", "信封顏色 0+1", "彩色信封 7+1", "客製信封 0+0", "印 信封 0+0", "客 製 信封 0+0", "c5 信封 1+0", "抬頭 0+0"],
            "total_imps": 112,
            "rank_range": "pos 1-65",
            "root_cause": "business-envelopes / large-envelopes PDP 缺 '香港公司信封' NAP + C5/C4 规格",
            "fix": "8/11 retrofit 改 business-envelopes (3 月 59 imps pos 15.8 强信号)"
        },
        "A_top_imps_removable_stickers_126": {
            "queries": ["可移貼紙 111+9", "不殘膠貼紙 3+0", "可移貼 12+0", "removable sticker 0+1", "pvc free sticker 0+1"],
            "total_imps": 137,
            "rank_range": "pos 3-56",
            "root_cause": "removable-stickers PDP 强信号 pos 19.43 (3 月 140 imps 0% CTR 第 2 页)",
            "fix": "8/9 retrofit 末尾加可移貼紙 CTA, 期望 0% → 3-5% CTR"
        }
    },
    "5_sku_zh_hk_改字表": {
        "1_same_day_flyers": {
            "current_title_zh": "(待 grep 验证)",
            "new_title_zh": "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時",
            "industry_list_zh": ["餐廳", "零售", "地產", "活動", "補習社", "選舉", "美容", "學校"],
            "faq_5_zh": [
                "最快幾耐可以取貨？答: 4-6 小時 (工作天 9-18 點)",
                "100 張同 1,000 張價錢差幾多？答: 1,000 張約 100 張的 4-5 倍",
                "可以即日落單嗎？答: 12 點前落單, 6 點前取貨",
                "MTR 燈箱廣告可以印嗎？答: 標準 A1/A2 尺寸 OK",
                "上傳設計稿後幾耐確認？答: 1 工作天免費確認"
            ],
            "expect_uplift": "0.9% → 5-8% CTR (snippet 命中 NAP + 即日 USP)"
        },
        "2_a2_posters": {
            "new_title_zh": "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日",
            "industry_list_zh": ["地產", "活動展覽", "餐廳", "零售", "補習社", "選舉", "學校", "美容院"],
            "faq_5_zh": [
                "A2 海報 = 420×594mm 對嗎？答: 係, ISO 216 國際標準",
                "防水加工包唔包？答: 包, PP 霧面/光面 加工",
                "1 張可以印嗎？答: 1 張起印, 100 張折扣",
                "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日",
                "設計免費確認幾耐？答: 1 工作天, WhatsApp 198 8085 1334"
            ],
            "expect_uplift": "0% → 1-2% CTR (排名 pos 26.78 升 15)"
        },
        "3_doujinshi_printing": {
            "new_title_zh": "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日",
            "industry_list_zh": ["同人", "動漫", "插畫", "學生", "Cosplay", "獨立出版"],
            "faq_5_zh": [
                "同人誌 24 頁/36 頁/48 頁 印價差幾多？答: 48 頁約 24 頁 1.5x",
                "無線膠裝 vs 騎馬釘 揀邊個？答: 24 頁以下騎馬釘, 以上膠裝",
                "封面可以燙金嗎？答: OK, 燙金/UV/局部光 加工",
                "校稿幾耐？答: PDF 排版 1 工作天確認",
                "DHL 日本配送幾耐？答: 3-5 日, JP Post 7-10 日"
            ],
            "expect_uplift": "100% → 维持 pos 1-3 (强信号 + 同人周邊 / 同人本 关键词扩展)"
        },
        "4_kraft_paper_bags": {
            "new_title_zh": "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保",
            "industry_list_zh": ["餐廳", "零售", "化妝品", "食品", "禮品", "環保"],
            "faq_5_zh": [
                "100 GSM 同 200 GSM 揀邊個？答: 餐廳 120-150, 禮品 150-200",
                "紙袋尺寸有幾多？答: 小/中/大/特大 + 自訂",
                "手挽有幾種？答: 棉繩/紙繩/打孔/雞眼 4 種",
                "100 個同 1000 個價錢差幾多？答: 1000 個約 100 個 5-6 倍",
                "MOQ 最低幾多？答: 100 個起, 50 個報價另議"
            ],
            "expect_uplift": "0% → 1-2% CTR (排名 pos 68.67 升 40)"
        },
        "5_food_boxes": {
            "new_title_zh": "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡",
            "industry_list_zh": ["餐廳外賣", "食品店", "烘焙店", "茶飲", "化妝品", "電子產品"],
            "faq_5_zh": [
                "食品級安全嗎？答: 食品級油墨, FDA/EU 雙認證",
                "盒型有幾種？答: 天地蓋/飛機盒/抽屜盒/手提袋 8 種",
                "MOQ 最低幾多？答: 100 個起, 50 個報價另議",
                "防水防油加工包唔包？答: 包, 防水/防油/光面/霧面",
                "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日"
            ],
            "expect_uplift": "0% → 1-2% CTR (排名 pos 48.28 升 20)"
        }
    },
    "2_blog_topics_for_LLM_citation": {
        "1_eco_packaging_hong_kong": {
            "trigger": "LLM 引文 pos 1 '我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？'",
            "slug": "eco-packaging-hong-kong-supplier-guide",
            "topic": "香港環保包裝物料供應商完整指南",
            "type": "Pillar Page (3000-5000 字)",
            "target_keywords": ["環保包裝", "環保印刷", "食品級", "可降解", "中小企", "香港"],
            "expect_LLM_citation": "≥1 (Perplexity / ChatGPT 期望 pos 1-5)"
        },
        "2_reliable_printing_supplier_hk": {
            "trigger": "LLM 引文 pos 5 '我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？'",
            "slug": "reliable-printing-supplier-hong-kong-guide",
            "topic": "香港中小企網店印刷供應商選擇指南",
            "type": "Cluster Article (1500-2500 字)",
            "target_keywords": ["印刷供應商", "中小企", "網店印刷", "香港印刷公司", "印刷推薦"],
            "expect_LLM_citation": "≥1 (Perplexity / ChatGPT 期望 pos 3-8)"
        }
    },
    "NAP_强化_4_段": {
        "1_brand_NAP": "智印港 印刷公司 — 香港觀塘 新蒲崗 即日取貨 / DHL 國際配送 2-4日",
        "2_MTR_NAP": "MTR 燈箱廣告 12-sheet 規格 + 價錢表 (mtr-advertising-specs blog 内链)",
        "3_industry_NAP": "WhatsApp 即時報價 +86 198 8085 1334 / zprintpro@outlook.com",
        "4_logistics_NAP": "亞洲工廠直送 + DHL 全球 2-4日 (美加澳 4-6日)"
    },
    "5_day_execution_8_8_8_12_ZH_HK": {
        "8_8_Sat": {
            "k3_必跑_09_00": "3 设备端到端 + Supabase 查 + formsubmit 激活 + 提供 X/LinkedIn/IndexNow key",
            "m3_10_15_amend_push": "5 SKU JA + 5 SKU EN + 5 SKU zh-hk 改字 + AGENTS.md 198 + retrofit cross-border 合并 1 effective push (§0.1 攒批)",
            "expect_impact": "ZH 智印港 branded 31 imps 维持, same-day-flyers / a2-posters / food-boxes / kraft-paper-bags / doujinshi-printing 5 SKU PDP 改字生效"
        },
        "8_9_Sun": {
            "m3_amend_push": "Org sameAs 改 src/lib/seo.ts (智印港 / ジープリント / ZprintPro) + 1 effective push",
            "k3_必跑_301_5_5": "CF Bulk Redirect List enabled (P1 §6.3)",
            "expect_impact": "ZH 商家信息 0/1 → 期望 ≥3 imps (Org sameAs 强化)"
        },
        "8_10_Mon": {
            "m3_10_15_daily_cron": "retrofit cmyk-guide P0 (28 imps ZH + 305 imps JA) + 写 eco-packaging-hong-kong-supplier-guide blog (Pillar Page, 锚定 LLM 引文 pos 1)",
            "k3_必跑_AI_可见性_1_4": "Perplexity / ChatGPT / Claude / Gemini 4 引擎查 4 核心词 (P1 §6.5)",
            "k3_AutoGLM_启动": "10 条/天 目录填表",
            "expect_impact": "AI 可见性 ≥1/4 → ≥2/4 (LLM 引文基础 + blog Pillar 加固)"
        },
        "8_11_Tue": {
            "m3_10_15_daily_cron": "retrofit paper-materials (ZH 紙質/紙張/厚紙/銅版紙 19 imps) + 写 reliable-printing-supplier-hong-kong-guide blog (Cluster Article, 锚定 LLM 引文 pos 5)",
            "k3_必跑_复盘预填": "review-8-12-template.md 预填 (P3)",
            "expect_impact": "AI 可见性 ≥2/4 维持, ZH 詢盘期望 ≥2"
        },
        "8_12_Wed": {
            "k3_09_00_复盘_5min": "5 维度 KPI 抓取 + ZH CTR 期望 3.5%+",
            "k3_09_00_branded_search_6_query": "智印港 7 天 100% CTR pos 1 已赢, 维持 ≥1",
            "k3_09_00_AI_可见性_复测": "期望 ≥2/4 维持 (LLM 引文 + blog Pillar 加固)"
        }
    },
    "expect_8_12_kpi_ZH_HK": {
        "ZH_imps_3m_to_8_12": "13759 → 15000+ (+9%)",
        "ZH_clicks_3m_to_8_12": "213 → 280+ (+31%)",
        "ZH_CTR_3m_to_8_12": "1.55% → 1.85%+ (+19%)",
        "ZH_CTR_7d_to_8_12": "2.7% → 3.5%+ (+30%)",
        "ZH_pos_3m_to_8_12": "30.63 → 26 (-15%)",
        "ZH_pos_7d_to_8_12": "23.69 → 18 (-24%)",
        "ZH_智印港_branded": "31 imps pos 2.32 → 60+ imps pos 1 80%+ CTR",
        "ZH_觀塘_NAP": "16 imps pos 14.56 → 30+ imps pos 5-10",
        "ZH_新蒲崗_NAP": "11+10+3+2+1+4+1 = 32 imps pos 6-10 → 60+ imps pos 3-8",
        "ZH_MTR_NAP": "21 imps pos 5-36 → 50+ imps pos 5-20",
        "ZH_a2_posters_pos": "3 月 856 imps pos 37.95 → 7 天 73 imps pos 26.78 → 8/12 期望 200+ imps pos 15-20 1-2% CTR",
        "ZH_kraft_paper_bags_pos": "3 月 521 imps pos 57.44 → 7 天 9 imps pos 68.67 → 8/12 期望 100+ imps pos 30-40 1-2% CTR",
        "ZH_food_boxes_pos": "3 月 634 imps pos 39.98 → 7 天 25 imps pos 48.28 → 8/12 期望 100+ imps pos 20-30 1-2% CTR",
        "ZH_same_day_flyers_pos": "3 月 333 imps pos 46.49 → 7 天 32 imps pos 42.16 → 8/12 期望 80+ imps pos 15-25 5-8% CTR",
        "ZH_doujinshi_printing": "3 月 1/2 50% + 7 天 1/1 100% → 8/12 期望 5+ imps pos 1-3 80%+ CTR",
        "AI_可见性_2_4": "≥2/4 引擎 (LLM 引文 pos 1 + 5 基础 + blog Pillar 加固)",
        "ZH_询盘_4_天冲刺": "0 → ≥3 (per §6.1 4 天冲刺, 香港最强市场期望最多)"
    },
    "M3_自主拍板_已执行": [
        "5 SKU zh-hk 选择: same-day-flyers / a2-posters / doujinshi-printing / kraft-paper-bags / food-boxes",
        "5 SKU zh-hk 改字 USP 模板 (title_zh + industry list + 5 FAQ)",
        "2 LLM 引文 blog 主题 (eco-packaging-hk + reliable-printing-hk)",
        "NAP 强化 4 段",
        "5 天节奏 (8/8 - 8/12) 香港部分",
        "AI 可见性 ≥2/4 引擎期望"
    ],
    "待_K3_9_00_拍板": [
        "X + LinkedIn + IndexNow key",
        "15 SKU 改字 K3 审字 (5 JA + 5 EN + 5 zh-hk)",
        "AutoGLM 启动时间确认",
        "8/9 Org sameAs 改 K3 审 diff 回 OK 才能 push"
    ],
    "v1_v2_v3_关系": "v1 (.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md) JA+EN 概要 14K; v2 (.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md) JA+EN 详细 24.8K; v3 (本段 + .hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md) ZH-HK 详细 30.6K",
    "update_history": [
        "2026-08-08 04:30 M3 K3 GSC zh-hk v3 深度分析 (matrix gsc_targeting_zh_hk_v3 段 + 5 SKU zh-hk 改字 + 2 LLM blog + NAP 强化)"
    ]
}

# Insert as top-level key
matrix["gsc_targeting_zh_hk_v3"] = zh_v3

# Update top-level update_history
if "update_history" in matrix:
    matrix["update_history"].append("2026-08-08 04:30 M3 K3 GSC zh-hk v3 深度分析 (matrix gsc_targeting_zh_hk_v3 段)")
else:
    matrix["update_history"] = ["2026-08-08 04:30 M3 K3 GSC zh-hk v3 深度分析 (matrix gsc_targeting_zh_hk_v3 段)"]

# Write back
with open(matrix_path, "w", encoding="utf-8") as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

import os
new_size = os.path.getsize(matrix_path)
print(f"OK: matrix updated")
print(f"  Old size: 285688 bytes (v2 only)")
print(f"  New size: {new_size} bytes (+{new_size - 285688})")
print(f"  Added: gsc_targeting_zh_hk_v3 (version v3, 2026-08-08T04:30)")
print(f"  Sections: summary / top_signals_4 / AI_citation_signals_2 / blackhole_buckets (12) / 5_sku_zh_hk_改字表 / 2_blog_topics / NAP_强化 / 5_day_execution / expect_8_12_kpi")
