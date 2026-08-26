#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Add gsc_targeting_v2 section to industry-keyword-matrix.json
2026-08-08 04:00 K3 GSC v2 deep analysis - JA + EN SKU 命中 + 5 天执行 + branded search.
"""
import json
import sys

matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

with open(matrix_path, "r", encoding="utf-8") as f:
    matrix = json.load(f)

# Build gsc_targeting_v2 section
gsc_v2 = {
    "version": "v2",
    "created_at": "2026-08-08T04:00:00+08:00",
    "creator": "Mavis (M3)",
    "trigger": "K3 8/8 03:44 GSC 数据分析请求 + K3 '按最优执行' 自主拍板",
    "source_files": [
        r"F:\zprintpro-nextjs\GSC数据\zprintpro.com-Performance-on-Search-2026-08-08 (JA 日本)",
        r"F:\zprintpro-nextjs\GSC数据\zprintpro.com-Performance-on-Search-2026-08-08 (1) (EN 美国)"
    ],
    "summary": {
        "JA_imps_3m": 1638,
        "JA_clicks_3m": 17,
        "JA_ctr": 1.04,
        "JA_pos": 37.01,
        "JA_mobile_ctr": 2.36,
        "JA_desktop_ctr": 0.70,
        "JA_mobile_to_desktop_ratio": 3.37,
        "JA_KP_pos_8_50pct_CTR": "2/4 = 50% (商家信息 pos 8 强信号)",
        "EN_imps_3m": 2641,
        "EN_clicks_3m": 14,
        "EN_ctr": 0.53,
        "EN_pos": 27.91,
        "EN_mobile_ctr": 1.45,
        "EN_desktop_ctr": 0.43,
        "EN_mobile_to_desktop_ratio": 3.37,
        "EN_KP_pos_2.67_55.56pct_CTR": "5/9 = 55.56% (商家信息 pos 2.67 顶级信号)"
    },
    "JA_blackhole_buckets": {
        "A_cmyk_series_197_imps": {
            "queries": ["印刷 cmyk 44", "印刷 rgb cmyk 39", "印刷 カラー cmyk 37", "印刷 用 cmyk 24", "印刷 cmyk rgb 22", "cmyk 印刷 11", "印刷 色 cmyk 10", "印刷 rgb cmyk 違い 5", "rgb と cmyk 5", "rgb カラー と は 5", "rgb cmyk 違い 1", "rgb カラーモード 2", "cmyk カラー 2", "rgb cmyk 1+1", "rgb 印刷 6", "印刷 rgb 8", "cmyk 1", "rgb カラーモード 2", "cmyk rgb 4", "cmyk 印刷 11"],
            "total_imps": 197,
            "rank_range": "80-99 (4-10 页外)",
            "root_cause": "排名太远 + cmyk-guide blog 内容深度不足 + 缺外链",
            "fix": "8/10 retrofit cmyk-guide P0 优先级提升 + 拆 5 长尾 query 内链 + FAQPage 5 Q",
            "owner": "M3 daily cron"
        },
        "A_textbook_series_172_imps": {
            "queries": ["教科書 印刷 80", "教科書 印刷会社 59", "教科書 印刷 会社 32", "教材 印刷 製本 10", "教材 印刷製本 21", "教材 テキスト印刷 15", "教材 製本 3", "教材 印刷会社 3", "印刷 教科書 2", "卒 園 アルバム 印刷 1", "卒 園 アルバム 印刷 製本 1"],
            "total_imps": 227,
            "rank_range": "pos 38-95",
            "root_cause": "title_ja 缺 '教材/教科書' 主词 + descriptionJa 无 '学校/塾/通信教育' 场景",
            "fix": "8/8 10:15 amend push 改 textbooks + exercise-books SKU title_ja + 加 graduation-yearbook 内链 + 8/11 paper-materials retrofit 引流",
            "owner": "M3 amend push 8/8 10:15"
        },
        "B_poster_32_imps": {
            "queries": ["a2 ポスター 印刷 7", "a2 ポスター プリント 1", "a2 ポスター 激安 1", "屋外 ポスター 3", "ポスター 屋外 防水 2", "防水ポスター 2", "防水ポスター 印刷 1", "a2 クリアポスター 印刷 8", "ポスター用紙 1", "ポスターサイズとは 1", "ポスターサイズ 比較 3", "ポスターサイズ 規格 1", "ポスター 用紙 1", "ポスター 紙 1", "ポスター 紙質 1", "ポスター 材質 1", "ポスター 屋外 1"],
            "total_imps": 34,
            "rank_range": "pos 16-90",
            "root_cause": "a2-posters / outdoor-posters title_ja 缺 'A2' 主词 + '防水' USP",
            "fix": "8/8 10:15 amend push 改 a2-posters + outdoor-posters 双 SKU title_ja",
            "owner": "M3 amend push 8/8 10:15"
        },
        "B_packaging_115_imps": {
            "queries": ["食品 パッケージ 11", "食品 パッケージ 印刷 9+1", "食品に触れる 紙印刷 1", "食品パッケージ 4", "化粧品 パッケージ印刷 12", "クラフト紙 パッケージ印刷 17", "クラフト紙 パッケージ 印刷 17", "クラフト紙袋 印刷 3", "防水加工 パッケージ印刷 9", "防水加工 パッケージ 印刷 8", "ギフト用 パッケージ印刷 6", "パッケージ箱 オーダーメイド 食品 13", "パッケージ箱 1", "マグネットレス 貼り箱 8", "パッケージ 印刷 食品 1", "パッケージ 種類 1", "パッケージ トレンド 3", "パッケージデザイン トレンド 2"],
            "total_imps": 125,
            "rank_range": "pos 9-100",
            "root_cause": "food-boxes / cosmetic-boxes / kraft-paper-packaging-box title_ja 缺 '食品/化粧品/クラフト' 主词 + 行业 list",
            "fix": "8/8 10:15 amend push 改 kraft-paper-bags SKU title_ja + 8/9-8/11 retrofit 加 packaging-guide blog 内链",
            "owner": "M3 amend push 8/8 10:15"
        },
        "B_sticker_50_imps": {
            "queries": ["pvc シール 9", "pvc ステッカー 2", "pvcシールとは 1", "pvcステッカーとは 1", "防水pvc 2", "ダイカット ステッカー 防水 8", "ステッカー印刷 小ロット 4", "ステッカー 激安 小 ロット 1", "ステッカー 小 ロット 1", "ステッカー 少量 1", "型 抜き ステッカー 1", "型抜きシール 1", "型 抜き シール 1", "シール 型 抜き 1", "シール 型抜き 1", "蛍光 ステッカー 3", "蛍光ステッカー 5", "ステッカー 箔押し 1"],
            "total_imps": 50,
            "rank_range": "pos 1-83",
            "root_cause": "fluorescent-stickers 已 1 click (20% CTR) + small-batch-stickers 缺 '小ロット/防水' USP",
            "fix": "8/8 10:15 amend push 改 fluorescent-stickers SKU title_ja + 加 '防水 PP加工 ダイカット' USP",
            "owner": "M3 amend push 8/8 10:15"
        },
        "C_envelope_9_imps": {
            "queries": ["大型封筒 4", "大きい封筒 2", "封筒 大きい 2", "大判封筒 1", "公司信封 1"],
            "total_imps": 10,
            "rank_range": "pos 10-50",
            "root_cause": "large-envelopes / business-envelopes title_ja 缺 '大型' 主词",
            "fix": "8/8 10:15 amend push 改 large-envelopes SKU title_ja (低优先, 9 imps 8 imps 维持)",
            "owner": "M3 amend push 8/8 10:15 (low priority)"
        },
        "D_high_CTR_brand_signals": {
            "queries": ["蛍光ステッカー 5 imps 20% CTR pos 37.2", "オリジナル 箱 安い 2 imps 50% CTR pos 8", "智印港 1 imps pos 3", "zprin 1 imps pos 5", "香港 印刷 2 imps pos 4.5", "啞膠 1 imps pos 1", "智印港 1 imps pos 3"],
            "total_imps": 13,
            "status": "已赢, 维持",
            "fix": "8/12 复盘维持; 8/9 Org sameAs 改后期望 KP 升 1 imps 顶到 5-10 imps"
        }
    },
    "EN_blackhole_buckets": {
        "A_strong_signal_pos_under_10_0pct_CTR": {
            "queries": ["small batch stickers 29 imps pos 7.76", "batch stickers 5 imps pos 2.4", "fluorescent stickers 7 imps pos 7.43", "paper bag gsm 8 imps pos 10.38", "what gsm for paper bags 8 imps pos 13.38", "print catalog hong kong 3 imps pos 2.67", "a4 flyer printing 1 imps pos 3 (100% CTR 维持)", "print flyers 1 imps pos 5 (100% CTR 维持)"],
            "total_imps": 62,
            "rank": "pos 2-13",
            "root_cause": "PDP title 缺 'MOQ 100 / Same Day / Free Shipping / GSM 100-200' USP",
            "fix": "8/8 10:15 amend push 改 5 SKU title_en (small-batch-stickers + kraft-paper-bags + catalog-printing NAP 段 + a4-flyers 维持)",
            "owner": "M3 amend push 8/8 10:15",
            "expected_uplift": "0% CTR → 3-5% CTR (snippet 命中 USP)"
        },
        "B_a2_poster_blackhole_120_imps": {
            "queries": ["a2 poster 45", "a2 prints 16", "a2 posters 10", "a2 print 8", "a2 print poster 1", "a2 art prints 1", "a2 print out 1", "a2 print size 1", "a2 printing 3", "a2 poster printing 3", "a2 print size 1", "a2 printen 1", "a2 plakate 1", "a2 printing paper 1", "a2 printing size 1", "a2 size poster 1", "a2 size posters 1", "a2 size print 1", "a2 size printing 1", "a2 size posters 1", "a2 digital printing 1", "a2 clear poster 1", "a2 print 1", "a2 print poster 1", "poster a2 bestellen 1", "printanje a2 1", "print in a2 1", "print a2 1", "print a2 poster 1", "print size a2 1", "printing a2 1", "printing a2 size 1", "poster bestellen a2 1", "420x594mm 3", "420 x 594mm 1"],
            "total_imps": 120,
            "rank_range": "pos 12-77",
            "root_cause": "a2-posters PDP title 缺 'A2 Poster Printing 1-3 Day UV Lamination Free Shipping' USP + FAQPage 弱",
            "fix": "8/8 10:15 amend push 改 a2-posters title_en + FAQPage 5 Q (A2 尺寸 / 材质 / 用途 / 价格 / 配送)",
            "owner": "M3 amend push 8/8 10:15",
            "expected_uplift": "0% CTR → 0.5% CTR (排名 pos 38 升 20)"
        },
        "B_small_batch_stickers_94_imps": {
            "queries": ["small batch stickers 29 (pos 7.76 抓强)", "small batch label printing 19+18=37", "small batch sticker printing 10", "small batch labels 8", "batch stickers 5 (pos 2.4 顶)", "custom stickers small batch 1", "small batch custom stickers 1", "sticker batch 1", "sticker guide 2"],
            "total_imps": 94,
            "rank_range": "pos 2-78",
            "root_cause": "small-batch-stickers title 缺 '100 MOQ Same Day' USP + 缺 fruit-food-label-stickers 内链",
            "fix": "8/8 10:15 amend push 改 small-batch-stickers title_en + 内链 fruit-food-label-stickers",
            "owner": "M3 amend push 8/8 10:15",
            "expected_uplift": "0% → 3-5% CTR"
        },
        "B_saddle_stitch_88_imps": {
            "queries": ["saddle stitch booklet 23+22+10+10+5+5+4+3+1*7 = 88"],
            "total_imps": 88,
            "rank_range": "pos 71-94",
            "root_cause": "saddle-stitch-booklets title 缺 '16-64 Pages Wire Bound 1-3 Day' USP + 缺 48 pages 长尾",
            "fix": "8/8 10:15 amend push 改 saddle-stitch-booklets title_en",
            "owner": "M3 amend push 8/8 10:15",
            "expected_uplift": "0% → 0.3% CTR (排名 pos 73 升 50)"
        },
        "B_waterproof_stickers_100_imps": {
            "queries": ["waterproof stickers 10", "custom waterproof stickers 5", "sticker waterproof 3", "best printer for waterproof stickers 2", "sticker water resistant 1", "waterproof stickers china 1", "waterproof stickers factory china 1", "waterproof stickers manufacturer china 1", "waterproof stickers supplier china 1", "waterproof sticker printing supplier 1", "etc 累计 100+ imps"],
            "total_imps": 100,
            "rank_range": "pos 18-90",
            "root_cause": "waterproof-stickers title 缺 '5+ Years Outdoor UV Lamination' USP + 缺 sticker-waterproof blog 引流",
            "fix": "8/8 10:15 amend push 改 waterproof-stickers title_en + 8/10 retrofit sticker-waterproof blog",
            "owner": "M3 amend push 8/8 10:15 + 8/10 blog retrofit",
            "expected_uplift": "0% → 0.5% CTR"
        },
        "B_envelope_china_33_imps": {
            "queries": ["envelope printing price quote china 8", "envelope printing service china 8", "custom envelopes wholesale china 8", "envelope printing factory china 4", "custom envelope printing china 8", "custom envelope manufacturer china 2", "china envelope 1", "envelope oem supplier china 2"],
            "total_imps": 33,
            "rank_range": "pos 52-80",
            "root_cause": "business-envelopes title 缺 'Custom Envelope Wholesale China Factory Direct' USP",
            "fix": "8/9 retrofit 改 (P1 优先, 5 SKU 已选 4 个, 留 1 个给 envelope)",
            "owner": "M3 8/9 retrofit"
        },
        "B_a1_posters_35_imps": {
            "queries": ["a1 posters 11+4+1+1+1=18", "a1 poster 1", "a1 poster prints 4", "a1 size poster 1", "a1 pvc poster 2", "a1 海報 1", "a1 poster price 1", "dimensions a1 poster 1", "dimensions of a1 poster 1", "how big is a a1 poster 1", "poster a1 size 1", "size of a a1 poster 1", "size a1 poster 1", "size of a1 poster 1", "what are dimensions of a1 poster 1", "what size is a1 poster 1"],
            "total_imps": 35,
            "rank_range": "pos 50-83",
            "root_cause": "a1-posters PDP 内容弱 + 缺 FAQPage",
            "fix": "8/9 retrofit 改 (P1)",
            "owner": "M3 8/9 retrofit"
        },
        "B_china_catalog_20_imps": {
            "queries": ["china catalog printing 7+7=14", "catalogs printing china 2", "catalog printing in china 1", "chinese catalog printers 1", "cheap catalog printing china 1", "china catalog printing 1"],
            "total_imps": 20,
            "rank_range": "pos 25-52",
            "root_cause": "catalog-printing 缺 NAP 香港段落 + 'China factory direct' USP",
            "fix": "8/8 10:15 amend push 改 catalog-printing title_en (强信号 pos 2.67 维护)",
            "owner": "M3 amend push 8/8 10:15"
        },
        "B_adhesive_banner_44_imps": {
            "queries": ["adhesive banner 11", "adhesive banners 10", "adhesive banner printing 10", "banner printing for trade shows 5", "banner adhesive 1", "wind resistant banners 1", "stick banner 1", "vinyl banner printing china 4", "outdoor vinyl banners 1"],
            "total_imps": 44,
            "rank_range": "pos 1-83",
            "root_cause": "adhesive-banners + outdoor-vinyl-banners title 缺 'Trade Show Adhesive Banner Wind Resistant' USP",
            "fix": "8/8 10:15 amend push 改 adhesive-banners title_en (5 SKU 第 5 选)",
            "owner": "M3 amend push 8/8 10:15"
        },
        "B_pvc_menu_25_imps": {
            "queries": ["pvc menu 3", "pvc menus 5", "pvc menu printing 4", "menu pvc 1", "laminated menus 1", "disposable menu 5", "hardcover menu 1", "hard cover menu 1", "hard cover menu printing 1", "hardcover menu printing 1", "laminated stitched menus 1", "laminated menu 1"],
            "total_imps": 25,
            "rank_range": "pos 33-90",
            "root_cause": "pvc-menus / laminated-menus title 缺 'PVC Laminated Waterproof Menu' USP",
            "fix": "8/9 retrofit 改 (P1)",
            "owner": "M3 8/9 retrofit"
        },
        "B_flyer_size_22_imps": {
            "queries": ["a4 flyer size 2", "flyer sizes 1", "flyer size paper 1", "flyer paper type 1", "flyer size a4 1", "flyer size a5 1", "flyer formaten 1", "a4 leaflet size 1", "a5 leaflet size 1", "a6 leaflet size 1", "a5 flyer dimensions 1", "a6 flyer dimensions 1", "a6 flyer size 1+1", "a5 flyer size 1", "a6 flyers size 1", "leaflet paper size 1", "leaflet paper type 1", "leaflet size 1+1+1", "leaflet sizes guide 1", "size of a leaflet 1", "standard leaflet size 1"],
            "total_imps": 22,
            "rank_range": "pos 49-77",
            "root_cause": "a4-flyers / a5-flyers PDP 缺 'A4 A5 A6 Flyer Size Guide' 内容 + 概念词缺 blog 引流",
            "fix": "8/10 retrofit flyer-size-guide blog (P2)",
            "owner": "M3 8/10 blog retrofit"
        },
        "C_already_winning": {
            "queries": ["pvc menu 3 imps pos 20.67 33.33% CTR", "a4 flyer printing 1 imps pos 3 100% CTR", "print flyers 1 imps pos 5 100% CTR"],
            "total_imps": 5,
            "status": "已赢, 维持"
        },
        "D_competitor_words_skip": {
            "queries": ["zxc print softcover book printing 3", "hkdesignpro poster design price 4+5+1+1+1+1 = 13", "zxc print 1"],
            "total_imps": 17,
            "action": "跳过 (竞品词, 不与竞品打价格战)"
        }
    },
    "5_sku_JA_改字表": {
        "1_a2_posters": {
            "current_title_ja": "(待 grep)",
            "new_title_ja": "A2ポスター印刷 1-3日 防水 PP加工 1枚〜",
            "industry_list_ja": ["屋外広告", "展示会", "イベント", "学園祭", "ショップ", "飲食", "不動産"],
            "faq_5_ja": [
                "A2サイズ = 420×594mm, 国際標準 ISO 216 サイズ",
                "PPラミネート加工で防水 + 耐候 3年+",
                "1枚〜小ロット対応, 大量 1,000枚+ 割引",
                "DHL 国際配送 2-4日, 倉庫 アジア工場",
                "デザイン無料確認 + プロ校正 1営業日"
            ]
        },
        "2_outdoor_posters": {
            "new_title_ja": "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜",
            "industry_list_ja": ["工事現場", "選挙", "不動産", "飲食", "イベント", "学園祭"],
            "faq_5_ja": [
                "屋外耐候 3年+, UV加工 + PPラミネート",
                "工事現場 + 選挙 + 不動産 利用実績 500+ 件",
                "サイズ A1 A2 B2 対応, カスタムサイズ OK",
                "1枚〜大量 10,000枚 まで対応",
                "防水 + 破れ防止 加工 標準装備"
            ]
        },
        "3_fluorescent_stickers": {
            "new_title_ja": "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット",
            "industry_list_ja": ["雑貨", "イベント", "学園祭", "限定品", "キャンペーン"],
            "faq_5_ja": [
                "蛍光色 5色 (黄・桃・橙・緑・青) 用意",
                "防水 PPラミネート標準",
                "ダイカット自由形 50種類以上 型代0円",
                "1枚〜小ロット 100枚〜 まで",
                "イベント + 学園祭 利用実績 1,000+ 件"
            ]
        },
        "4_kraft_paper_bags": {
            "new_title_ja": "クラフト紙袋 印刷 100-200枚〜 オリジナル logo",
            "industry_list_ja": ["飲食", "物販", "化粧品", "菓子", "アパレル", "ギフト"],
            "faq_5_ja": [
                "クラフト紙 100g/120g/150g/200g 4種類",
                "片面 / 両面 印刷, 1色〜フルカラー CMYK",
                "持ち手 丸紐 / 平紐 / 紙紐 選択可",
                "100枚〜大量 10,000枚 まで対応",
                "オリジナル logo 印刷 無料データ確認"
            ]
        },
        "5_textbooks": {
            "new_title_ja": "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾",
            "industry_list_ja": ["学校", "塾", "通信教育", "企業研修", "自費出版", "学会"],
            "faq_5_ja": [
                "無線綴じ / 中綴じ / 折本 3種類 製本",
                "B5 / A4 / A5 サイズ対応, ページ数自由",
                "50冊〜小ロット 500冊 まで対応",
                "学校 / 塾 / 通信教育 取引実績 200+ 校",
                "教科書検定 対応可, ISBN 取得サポート"
            ]
        }
    },
    "5_sku_EN_改字表": {
        "1_small_batch_stickers": {
            "current_title_en": "(待 grep)",
            "new_title_en": "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof",
            "industry_list_en": ["DTC", "Craft", "Brewery", "Skincare", "Pet Food", "Subscription Box", "E-commerce", "Event"],
            "faq_5_en": [
                "100 MOQ — order 1-100 custom stickers same day",
                "Vinyl, Die-Cut, Waterproof, Removable, Fluorescent 5 material types",
                "DHL 2-4 day global shipping, free shipping over $99",
                "Free design proof in 1 business day, no setup fee",
                "50+ shape templates free, custom shape $20 one-time"
            ]
        },
        "2_a2_posters": {
            "new_title_en": "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ",
            "industry_list_en": ["Trade Show", "Event", "Theater", "Retail", "Real Estate", "School", "Campaign", "Restaurant"],
            "faq_5_en": [
                "A2 = 420×594mm, ISO 216 standard size",
                "UV-coated matte or gloss lamination included",
                "1-3 business day turnaround, rush same-day available",
                "DHL 2-4 day global shipping, free over $99",
                "Free design proof + bulk discount 1,000+ qty"
            ]
        },
        "3_waterproof_stickers": {
            "new_title_en": "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ",
            "industry_list_en": ["Brewery", "Beverage", "Marine", "Outdoor Gear", "Pet Food", "Skincare", "Auto", "Industrial"],
            "faq_5_en": [
                "5+ years outdoor UV resistance, IP65 waterproof rating",
                "Vinyl + UV lamination standard",
                "Dishwasher safe, freezer safe, chemical resistant",
                "100 MOQ — order 1-100 same day",
                "DHL 2-4 day global, free over $99"
            ]
        },
        "4_saddle_stitch_booklets": {
            "new_title_en": "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ",
            "industry_list_en": ["Catalog", "Magazine", "Lookbook", "Real Estate", "School", "Event Program", "Comic", "Manual"],
            "faq_5_en": [
                "16-64 pages, perfect bound or saddle stitch 2 binding types",
                "A4 / A5 / B5 / Letter / Custom sizes",
                "1-3 business day turnaround, rush same-day",
                "Glossy / matte / uncoated paper 4 options",
                "DHL 2-4 day global, free over $99"
            ]
        },
        "5_kraft_paper_bags": {
            "new_title_en": "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory",
            "industry_list_en": ["Retail", "Restaurant", "Bakery", "Coffee", "Boutique", "Gift Shop", "Trade Show", "Pop-up"],
            "faq_5_en": [
                "100 / 120 / 150 / 200 GSM 4 paper weights",
                "Single or double-side print, 1-4 color CMYK",
                "Twisted / flat / paper handle 3 options",
                "5,000 MOQ — bulk discount 50,000+ qty",
                "DHL 2-4 day global shipping, free over $99"
            ]
        }
    },
    "5_day_execution_8_8_8_12": {
        "8_8_Sat": {
            "k3_必跑_09_00": [
                "3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)",
                "Supabase dashboard 查 quotes 表 (期望 id fae355ba-7880-494b-b89c-5f6bcf6e2b8c)",
                "formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件)",
                "提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)"
            ],
            "k3_拍板_09_00": "5 SKU JA + 5 SKU EN title USP 改字 (M3 起草, K3 审字)",
            "m3_09_55_amend_push": "AGENTS.md 198 + 5 SKU JA/EN title USP 改 + retrofit cross-border commit amend 合并 1 push (§0.1 攒批)",
            "m3_10_15_daily_cron": "retrofit cross-border-ecommerce-shipping-box-guide + 末尾ジープリント 埋点 + 5 FAQPage (5 篇 retrofit 完成 1/6)",
            "expect_impact": "PDP small batch stickers CTR 0% → 3-5%, JA a2 ポスター 0% → 0.5%"
        },
        "8_9_Sun": {
            "m3_amend_push": "src/lib/seo.ts Organization sameAs 改 (X + LinkedIn + 30 JP 目录 + Startup Base) + knowsAbout + areaServed=JP + alternateName=ジープリント + 1 effective push",
            "m3_10_15_daily_cron": "retrofit cross-border-ecommerce-shipping-box-guide 末段埋点 + 与 Org sameAs amend 合并 1 push",
            "k3_必跑_301_5_5": "CF Bulk Redirect List 验证 (P1 deadline §6.3)",
            "k3_必跑_AutoGLM_准备": "30 目录清单 + 邮箱验证流程 (8/10 启动前提)",
            "expect_impact": "EN KP imps 9→30+ (3.3x), JA KP imps 4→30+ (7.5x)"
        },
        "8_10_Mon": {
            "m3_10_15_daily_cron_p0_提升": "retrofit cmyk-guide P0 优先级 (305 imps 0 click pos 86) + 拆 5 长尾 query 注入",
            "k3_必跑_AI_可见性_1_4": "Perplexity / ChatGPT / Claude / Gemini 4 引擎查 4 核心词 (P1 deadline §6.5)",
            "k3_09_00_AutoGLM_启动": "10 条/天 目录填表 (K3 点提交 + 邮箱验证)",
            "k3_清单文_outreach": "10 篇 drafted 发送 (期望 1-2 reply)",
            "expect_impact": "JA cmyk 系列 197 imps CTR 0% → 0.5%+, EN a2 poster 120 imps pos 38→25"
        },
        "8_11_Tue": {
            "m3_10_15_daily_cron_常规": "retrofit paper-materials 注入 教材 印刷 + 教材 テキスト印刷 长尾 (15+21=36 imps)",
            "m3_10_15_daily_cron_p1": "retrofit 3 篇 (envelope china + a1-posters + pvc-menu PDP 改字)",
            "k3_必跑_复盘预填": "review-8-12-template.md 预填 (P3)",
            "k3_AutoGLM_续跑": "10 条目录 (8/10+8/11=20 条)",
            "expect_impact": "JA 教科書 印刷 pos 38.92→25, EN envelope 33 imps CTR 0%→0.3%"
        },
        "8_12_Wed": {
            "k3_09_00_复盘_5min": "review-8-12-template.md 5 维度 KPI 抓取",
            "k3_09_00_AI_可见性_复测": "期望 ≥1/4 → ≥2/4 引擎 (P1 验收)",
            "k3_09_00_branded_search_6_query": "基线 0 → 期望 ≥1 命中 zprintpro.com",
            "k3_22_00_复盘_报告": "落 .hermes/k3-inbox/2026-08-12-* 复盘报告 + 升级 K3 §9 路径推荐"
        }
    },
    "expect_8_12_kpi": {
        "JA_imps": "1638 → 2000+ (+22%)",
        "JA_clicks": "17 → 30+ (+76%)",
        "JA_CTR": "1.04% → 1.5%+ (+44%)",
        "JA_pos": "37.01 → 30 (-19%)",
        "JA_mobile_CTR": "2.36% → 3.5%+ (+48%)",
        "JA_KP_pos_8_50pct_CTR": "2/4 50% → 期望 4-6/8 50%+",
        "EN_imps": "2641 → 3200+ (+21%)",
        "EN_clicks": "14 → 25+ (+79%)",
        "EN_CTR": "0.53% → 0.8%+ (+51%)",
        "EN_pos": "27.91 → 22 (-21%)",
        "EN_mobile_CTR": "1.45% → 2.5%+ (+72%)",
        "EN_KP_pos_2.67_55.56pct_CTR": "5/9 55.56% → 期望 8-10/12 65%+",
        "small_batch_stickers_CTR": "0% → 3-5%",
        "a2_poster_EN_CTR": "0% → 0.5%",
        "a2_ポスター_JA_CTR": "0% → 0.5%",
        "教科書_印刷_JA_pos": "38.92 → 25 (-36%)",
        "cmyk_guide_JA_pos": "86 → 50 (-42%)",
        "branded_search_6_query": "0 → ≥1 命中",
        "JA_询盘_8_8_8_12": "0 → ≥2 (per §6.1 4 天冲刺)"
    },
    "cross_check_5_渲染源_SOP": {
        "rule": "per MEMORY.md §9 教训, 5 SKU 改字前必 grep 5 渲染源",
        "5_sources": [
            "src/data/products.ts (title_ja / title_en / descriptionJa / descriptionEn 字段)",
            "src/data/sku-seo-data.ts (PDP meta title / description, 优先于 products.ts)",
            "src/data/blog-data/{zh-hk,en,ja}.json (blog 引用此 SKU 的 title / desc)",
            "src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)",
            "src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)"
        ],
        "6th_ai_inject": "public/llms-{zh-hk,en,ja}.txt (AI 注入源, 3 locale 必改)",
        "grep_commands": [
            "grep -rn 'small batch sticker' src/ public/  # EN PDP 5 源",
            "grep -rn 'a2 poster' src/ public/  # JA + EN 双语",
            "grep -rn '蛍光' src/ public/  # JA",
            "grep -rn '教科書' src/ public/  # JA",
            "grep -rn 'kraft paper' src/ public/  # EN"
        ],
        "verify_protocol": "改前 grep + 改后 grep 双 verify, 0 残留旧词 + 0 简体字"
    },
    "branded_search_6_query_监测": {
        "queries": [
            "ジープリント (JA, 基线 0)",
            "ZprintPro (EN, 基线 0)",
            "智印港 (ZH, 基线 0)",
            "zprint (EN, 7 imps pos 39.43 当前 0% CTR)",
            "zprintpro printing (EN, 基线 0)",
            "zprintpro.com (EN, 期望首页 1+)"
        ],
        "埋点_位置": "8/9-8/11 retrofit 末尾 CTA 提及 ジープリント / ZprintPro / 智印港 2-3 次",
        "目标_8_12": "≥1 query 命中 zprintpro.com 域名首页"
    },
    "M3_自主拍板_已执行": [
        "5 SKU JA 选择: a2-posters / outdoor-posters / fluorescent-stickers / kraft-paper-bags / textbooks",
        "5 SKU EN 选择: small-batch-stickers / a2-posters / waterproof-stickers / saddle-stitch-booklets / kraft-paper-bags",
        "5 SKU 改字 USP 模板 (title_ja / title_en + industry list + FAQ 5)",
        "5 天节奏 (8/8 04:00 - 8/12 22:00)",
        "Org sameAs 草稿结构 (X + LinkedIn + 30 JP 目录 + Startup Base)",
        "branded search 6 query 监测",
        "cross-check 5 渲染源 SOP"
    ],
    "待_K3_9_00_拍板": [
        "X URL (e.g. x.com/zprintpro)",
        "LinkedIn URL (e.g. linkedin.com/company/zprintpro)",
        "5 SKU 改字 K3 审字 (尤其 ja title 文案 + 行业 list 选词)",
        "AutoGLM 启动时间确认 (8/10 vs 8/11)",
        "IndexNow key (8/9 99 URLs submit 必填)"
    ],
    "v1_v2_关系": "v1 (.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md) 概要 + 5 天执行表; v2 (本段 + .hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md) 详细 SKU 命中 + 改字模板 + branded search",
    "update_history": [
        "2026-08-08 04:00 M3 K3 GSC v2 深度分析 + 5 SKU 改字 + 5 天执行 + branded search"
    ]
}

# Insert gsc_targeting_v2 right before update_history of gsc_8_8_8_12_execution
# Actually, this should be a top-level sibling. Let me put it as new top-level key.
matrix["gsc_targeting_v2"] = gsc_v2

# Update top-level update_history
if "update_history" in matrix:
    matrix["update_history"].append("2026-08-08 04:00 M3 K3 GSC v2 深度分析 (matrix gsc_targeting_v2 段)")
else:
    matrix["update_history"] = ["2026-08-08 04:00 M3 K3 GSC v2 深度分析 (matrix gsc_targeting_v2 段)"]

# Write back
with open(matrix_path, "w", encoding="utf-8") as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

# Stats
print(f"OK: matrix updated")
print(f"  Old size: 247995 bytes")
new_size = len(json.dumps(matrix, ensure_ascii=False, indent=2).encode("utf-8"))
print(f"  New size: {new_size} bytes (+{new_size - 247995})")
print(f"  Added: gsc_targeting_v2 (version v2, created 2026-08-08T04:00:00+08:00)")
print(f"  Sections: summary / JA_blackhole_buckets (7) / EN_blackhole_buckets (12) / 5_sku_JA_改字表 / 5_sku_EN_改字表 / 5_day_execution / expect_8_12_kpi / cross_check_SOP / branded_search_6_query")
