#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/8 03:44 GSC 数据 → matrix 加 ja_seo_gap + en_seo_gap 段.
- JA 日本 8 个高 imps 0% CTR query (412 imps 黑洞)
- EN 美国 12 个高 imps 0% CTR query (250 imps 黑洞)
- 8/8-8/12 优化执行表 (per PDP title 强化 + retrofit 优先级调整)
"""
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE = r"F:\zprintpro-nextjs"
MATRIX = os.path.join(BASE, ".hermes", "industry-keyword-matrix.json")

with open(MATRIX, "r", encoding="utf-8") as f:
    data = json.load(f)

# 1. JA seo_gap 段 (per 8/8 GSC 数据)
ja_gap = {
    "data_source": "zprintpro.com-Performance-on-Search-2026-08-08 (GSC JA 国家=日本 100%)",
    "baseline_8_8": {
        "impressions": 1638,
        "clicks": 17,
        "ctr_pct": 1.04,
        "avg_position": 37.01,
        "device_mobile_ctr_pct": 2.36,
        "device_desktop_ctr_pct": 0.70,
        "knowledge_panel_imps": 4,
        "knowledge_panel_ctr_pct": 50.0,
    },
    "high_imps_zero_ctr_queries_8": {
        "教科書 印刷": {"imps": 80, "ctr_pct": 0, "pos": 38.92, "optimize_path": "PDP textbooks title + meta 加「教科書 印刷」「教科書 印刷会社」"},
        "印刷 カラー モード": {"imps": 74, "ctr_pct": 0, "pos": 76.14, "optimize_path": "cmyk-guide 博客重建 + PDP meta"},
        "教科書 印刷会社": {"imps": 59, "ctr_pct": 0, "pos": 62.64, "optimize_path": "PDP textbooks 强化 + ブログ content"},
        "両面カラー印刷": {"imps": 47, "ctr_pct": 0, "pos": 23.81, "optimize_path": "PDP double-sided-flyers 强化 (T1 狙击 8/6 已加, 跟踪 7 天)"},
        "印刷 cmyk": {"imps": 44, "ctr_pct": 0, "pos": 86.23, "optimize_path": "cmyk-guide 博客 P0 优先级 (305 imps 0 click pos 86)"},
        "印刷 rgb cmyk": {"imps": 39, "ctr_pct": 0, "pos": 93.67, "optimize_path": "cmyk-guide 拆 5 长尾 query 注入"},
        "印刷 カラー cmyk": {"imps": 37, "ctr_pct": 0, "pos": 96.05, "optimize_path": "cmyk-guide 拆 5 长尾 query 注入"},
        "教科書 印刷 会社": {"imps": 32, "ctr_pct": 0, "pos": 64.56, "optimize_path": "PDP textbooks 强化"},
    },
    "high_ctr_anchor_queries_2": {
        "オリジナル 箱 安い": {"imps": 2, "ctr_pct": 50.0, "pos": 8, "anchor": "PDP 包装盒价格优势 snippet 强"},
        "蛍光ステッカー": {"imps": 5, "ctr_pct": 20.0, "pos": 37.2, "anchor": "PDP fluorescent-stickers 荧光贴纸"},
    },
    "high_imps_blogs_待优化": {
        "cmyk-guide": {"imps": 305, "ctr_pct": 0, "pos": 85.96, "priority": "P0 提升", "retrofit_date": "2026-08-10", "optimize_path": "5 长尾 query 注入 H2/H3 + 重點摘要 + FAQ"},
        "paper-materials": {"imps": 8, "ctr_pct": 0, "pos": 81, "priority": "P1 常规", "retrofit_date": "2026-08-11", "optimize_path": "教材 印刷 / 教材 テキスト印刷 长尾"},
        "poster-buying-guide": {"imps": 11, "ctr_pct": 0, "pos": 74, "priority": "P2 待评估", "optimize_path": "海报 size 长尾"},
    },
    "high_imps_pdp_待优化": {
        "kraft-paper-packaging-box": {"imps": 36, "ctr_pct": 2.78, "pos": 34.97, "optimize": "title 加「オリジナル 箱 安い」"},
        "double-sided-flyers": {"imps": 48, "ctr_pct": 0, "pos": 23.33, "optimize": "T1 狙击 8/6 已加両面カラー印刷, 跟踪 7 天"},
        "textbooks": {"imps": 225, "ctr_pct": 0, "pos": 52.16, "priority": "P0 提升", "optimize": "title 加「教科書 印刷」「教科書 印刷会社」「教科書 印刷 会社」"},
        "waterproof-stickers": {"imps": 38, "ctr_pct": 0, "pos": 15, "priority": "P1 维持", "optimize": "已 pos 15, 强"},
        "food-boxes": {"imps": 31, "ctr_pct": 0, "pos": 53.87, "priority": "P1 强化", "optimize": "title 加「パッケージ箱 オーダーメイド 食品」"},
        "a2-posters": {"imps": 22, "ctr_pct": 0, "pos": 48.41, "priority": "P1 强化", "optimize": "title 加「ポスター 印刷 a2」"},
    },
    "target_8_12": {
        "ctr_pct": "1.5%+ (+44%)",
        "high_imps_queries_pos": "教科書 印刷 38.92 → 15-25 (-50%) / 印刷 cmyk 86.23 → 30-50 (-55%)",
        "mobile_ctr_pct": "2.36 → 3+",
        "kp_imps": "4 → 30+ (8/9 Org sameAs 改后)",
    },
}

data["ja_seo_gap"] = ja_gap
print(f"✅ ja_seo_gap 段已加 (8 高 imps 0% CTR + 2 高 CTR + 3 高 imps 博客 + 6 高 imps PDP)")

# 2. EN seo_gap 段 (per 8/8 GSC 数据)
en_gap = {
    "data_source": "zprintpro.com-Performance-on-Search-2026-08-08 (1) (GSC EN 国家=美国 100%)",
    "baseline_8_8": {
        "impressions": 2641,
        "clicks": 14,
        "ctr_pct": 0.53,
        "avg_position": 27.91,
        "device_mobile_ctr_pct": 1.45,
        "device_desktop_ctr_pct": 0.43,
        "knowledge_panel_imps": 9,
        "knowledge_panel_ctr_pct": 55.56,
        "knowledge_panel_pos": 2.67,
    },
    "high_imps_zero_ctr_queries_12": {
        "a2 poster": {"imps": 45, "ctr_pct": 0, "pos": 38.87, "optimize": "EN PDP a2-posters title 加「Free Shipping $99+」"},
        "small batch stickers": {"imps": 29, "ctr_pct": 0, "pos": 7.76, "priority": "P0 抓强", "optimize": "第 1 页 0% CTR - title 加「100 MOQ Same Day Free Shipping」"},
        "how to print waterproof stickers": {"imps": 25, "ctr_pct": 0, "pos": 83.16, "optimize": "博客 sticker-guide 重建"},
        "saddle stitch booklet": {"imps": 23, "ctr_pct": 0, "pos": 73.26, "optimize": "博客 cross-border 改造"},
        "saddle stitch booklets": {"imps": 22, "ctr_pct": 0, "pos": 87.82, "optimize": "同上"},
        "small quantity label printing": {"imps": 19, "ctr_pct": 0, "pos": 78.11, "optimize": "EN PDP label 强化"},
        "small batch label printing": {"imps": 18, "ctr_pct": 0, "pos": 60.17, "optimize": "同上"},
        "a2 prints": {"imps": 16, "ctr_pct": 0, "pos": 60.75, "optimize": "EN PDP a2-posters 强化"},
        "a1 posters": {"imps": 11, "ctr_pct": 0, "pos": 50.18, "optimize": "EN PDP a1-posters 强化"},
        "adhesive banner": {"imps": 11, "ctr_pct": 0, "pos": 57.73, "optimize": "EN PDP adhesive-banners 强化"},
        "small batch sticker printing": {"imps": 10, "ctr_pct": 0, "pos": 23.6, "optimize": "第 3 页 0% CTR - title 加 USP"},
        "a2 posters": {"imps": 10, "ctr_pct": 0, "pos": 51.3, "optimize": "EN PDP a2-posters 强化"},
    },
    "high_ctr_anchor_queries_3": {
        "a4 flyer printing": {"imps": 1, "ctr_pct": 100, "pos": 3, "anchor": "EN PDP a4-flyers pos 3 第 1 页"},
        "print flyers": {"imps": 1, "ctr_pct": 100, "pos": 5, "anchor": "EN PDP flyers pos 5"},
        "pvc menu": {"imps": 3, "ctr_pct": 33.33, "pos": 20.67, "anchor": "EN PDP pvc-menus 强"},
    },
    "high_imps_pdp_待优化": {
        "a2-posters": {"imps": 155, "ctr_pct": 0, "pos": 52.4, "priority": "P0 提升", "optimize": "title 加「Free Shipping $99+」+ USP"},
        "small-batch-stickers": {"imps": 92, "ctr_pct": 0, "pos": 38.01, "priority": "P0 抓强", "optimize": "第 1 页 0% CTR - title 强化"},
        "saddle-stitch-booklets": {"imps": 81, "ctr_pct": 0, "pos": 81.48, "priority": "P1 强化", "optimize": "title 加「100 MOQ」"},
        "waterproof-stickers": {"imps": 40, "ctr_pct": 0, "pos": 70.65, "priority": "P1 强化", "optimize": "title 加 USP"},
        "adhesive-banners": {"imps": 33, "ctr_pct": 0, "pos": 49, "priority": "P1 强化", "optimize": "title 加 USP"},
        "a1-posters": {"imps": 31, "ctr_pct": 0, "pos": 56.16, "priority": "P1 强化", "optimize": "title 加 USP"},
    },
    "kp_强信号_维持": {
        "商家信息": {"imps": 9, "ctr_pct": 55.56, "pos": 2.67, "anchor": "EN KP 顶级信号, 维持 NAP + Org sameAs + llms.txt"},
        "目标": "8/9 Org sameAs 改后 EN KP imps 9 → 30+",
    },
    "target_8_12": {
        "ctr_pct": "0.53 → 0.8%+ (+51%)",
        "mobile_ctr_pct": "1.45 → 2.5%+ (+72%)",
        "small_batch_stickers_pos_7_76": "PDP title 强化 0% → 3-5% CTR",
        "kp_imps": "9 → 30+ (8/9 Org sameAs 改后)",
    },
}

data["en_seo_gap"] = en_gap
print(f"✅ en_seo_gap 段已加 (12 高 imps 0% CTR + 3 高 CTR + 6 高 imps PDP + KP 2.67 强信号)")

# 3. 8/8-8/12 优化执行表 (per GSC 数据)
data["gsc_8_8_8_12_execution"] = {
    "8_8_09_00_k3_runs": {
        "JA_PDP_title_optimize_5_sku": ["textbooks (P0 教科書 印刷 191 imps)", "kraft-paper-packaging-box (オリジナル 箱 安い 锚)", "a2-posters (P1 ポスター 印刷 a2)", "food-boxes (P1 パッケージ箱 オーダーメイド 食品)", "hardcover-books (P1 上製本 印刷)"],
        "EN_PDP_title_optimize_5_sku": ["small-batch-stickers (P0 第 1 页 0% CTR 抓强)", "a2-posters (P0 Free Shipping USP)", "saddle-stitch-booklets (P1 100 MOQ)", "waterproof-stickers (P1 USP)", "adhesive-banners (P1 USP)"],
    },
    "8_9_daily_cron_retrofit": "cross-border-ecommerce-shipping-box-guide (常规) - 末尾埋点ジープリント + 加 saddle stitch / sticker-guide 长尾 (EN imps 23+25 = 48)",
    "8_10_daily_cron_p0_提升": "cmyk-guide 博客重建 P0 优先级 (305 imps 0 click pos 86) - 拆 5 长尾 query 注入 (印刷 cmyk 44 + rgb cmyk 39 + カラー cmyk 37 + 用 cmyk 24 + cmyk rgb 22 = 142 imps)",
    "8_11_daily_cron_常规": "paper-materials 博客改造 (8 imps pos 81) - 注入 教材 印刷 + 教材 テキスト印刷 长尾 (15+21=36 imps)",
    "8_12_daily_cron_T1_狙击": "same-day-flyers-printing-hong-kong-guide (T1 CTR 狙击) - 跟踪両面カラー印刷 7 天变化 (pos 23.33 → 期望 10-15) + 4 FAQ 必含",
    "8_9_org_sameAs_改": "src/lib/seo.ts Organization sameAs 数组 (X + LinkedIn + 30 JP 目录 + Startup Base) + knowsAbout=[学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷] - 与 daily cron cross-border retrofit amend 合并 1 push (per 3A)",
    "8_10_8_12_AutoGLM_启动": "K3 9:00 起来跑 AutoGLM 日本目录填表, 每天 10 条, K3 点提交 + 邮箱验证 - 30 目录目标 (印刷/POD 7 + 本地/创业 7 + 行业 5 + SaaS 3 = 22 起步)",
    "8_12_branded_search_监测": "测试 6 query (ZprintPro / ジープリント / etc.) - 当前 0 命中, 目标 ≥1 命中 zprintpro.com 域名",
    "expect_8_12_kpi": {
        "JA CTR": "1.04% → 1.5%+ (+44%)",
        "EN CTR": "0.53% → 0.8%+ (+51%)",
        "EN 移动 CTR": "1.45% → 2.5%+ (+72%)",
        "JA 高 imps pos": "教科書 印刷 38.92 → 15-25 (-50%)",
        "EN small batch stickers pos 7.76": "PDP title 强化 0% → 3-5% CTR",
        "branded search": "0 → ≥1",
        "JA 询盘": "0 → ≥2 (per §6.1 4 天冲刺)",
    },
    "update_history": ["2026-08-08 03:44 K3 拍板 + GSC 数据驱动优化执行表"],
}

print(f"✅ gsc_8_8_8_12_execution 段已加 (8/8-8/12 5 天优化执行表 + 期望 KPI)")

# 写回
with open(MATRIX, "w", encoding="utf-8", newline="\n") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"\n✅ 写回 {MATRIX}")
print(f"   文件大小: {os.path.getsize(MATRIX)} bytes (was 236547)")
