#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Upgrade cron prompt v8.5 -> v8.6 (GSC data-driven 5-day execution).
2026-08-08 04:00 K3 03:44 GSC analysis + M3 04:00 v2 deep analysis.
"""
import re
from datetime import datetime

cron_path = r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md"

with open(cron_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update header version line
content = content.replace(
    "# Last sync: 2026-08-05 17:24 (K3 拍板 v8.1 SEO+GEO + 8 周 60 篇 全面升级)",
    "# Last sync: 2026-08-08 04:00 (M3 升 v8.6 GSC 数据驱动 5 天执行表 + 5 SKU JA/EN 改字 + Org sameAs 8/9 草稿)"
)

# v8.6 upgrade section to insert after v8.5 section (before 【T2 cron 治理】)
v86_section = """

【v8.6 升级 (2026-08-08 04:00 M3 K3 GSC 数据驱动优化执行 + 5 SKU 改字)】
- **触发**: K3 8/8 03:44 GSC 数据分析 (JA 1638 imps 1.04% CTR pos 37 / EN 2641 imps 0.53% CTR pos 27) + M3 8/8 04:00 v2 深度分析 (134 JA query + 200+ EN query + 87 SKU 命中 + 5 天执行表).
- **报告落盘** (SSoT):
  - v1: `.hermes/k3-inbox/2026-08-08-0344-gsc-ja-en-analysis.md` (14K, 概要 + 5 天执行)
  - **v2**: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24K, 详细 SKU 命中 + 改字模板 + branded search)
  - **matrix**: `.hermes/industry-keyword-matrix.json` gsc_targeting_v2 段 (+31K, 7 JA buckets + 12 EN buckets + 5 SKU JA/EN 改字表 + 5_day_execution)
- **5 SKU JA P0 (8/8 10:15 amend push)**:
  1. **a2-posters**: title_ja "A2ポスター印刷 1-3日 防水 PP加工 1枚〜" + 7 行业 (屋外広告/展示会/イベント/学園祭/ショップ/飲食/不動産) + 5 FAQ
  2. **outdoor-posters**: title_ja "屋外防水ポスター 耐候3年+ UV加工 PP 1枚〜" + 6 行业 + 5 FAQ
  3. **fluorescent-stickers**: title_ja "蛍光ステッカー 1枚〜 防水 PP加工 ダイカット" + 5 行业 + 5 FAQ
  4. **kraft-paper-bags**: title_ja "クラフト紙袋 印刷 100-200枚〜 オリジナル logo" + 6 行业 + 5 FAQ
  5. **textbooks**: title_ja "教科書・教材 印刷製本 無線綴じ 50冊〜 学校/塾" + 6 行业 + 5 FAQ
- **5 SKU EN P0 (8/8 10:15 amend push)**:
  1. **small-batch-stickers** (P0 抓强 pos 7.76 0% CTR): title_en "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof" + 8 行业 (DTC/Craft/Brewery/Skincare/Pet Food/Subscription Box/E-commerce/Event) + 5 FAQ
  2. **a2-posters** (P0 120+ imps 黑洞): title_en "A2 Poster Printing 1-3 Day Turnaround UV-Coated Lamination Free Shipping 100+ MOQ" + 8 行业 + 5 FAQ
  3. **waterproof-stickers** (P0 100+ imps 黑洞): title_en "Waterproof Stickers 5+ Years Outdoor UV Lamination Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  4. **saddle-stitch-booklets** (P0 88 imps 黑洞 pos 73-87): title_en "Saddle Stitch Booklets 16-64 Pages 1-3 Day Wire Bound Catalog Printing Free Shipping 100 MOQ" + 8 行业 + 5 FAQ
  5. **kraft-paper-bags** (P0 抓强 pos 10.38/13.38 0% CTR): title_en "Kraft Paper Bags 100-200 GSM Custom Logo Printed 5,000 MOQ Free Shipping Asia Factory" + 8 行业 + 5 FAQ
- **8/9 Org sameAs 改 src/lib/seo.ts** (待 K3 9:00 提供 X + LinkedIn + IndexNow key):
  - alternateName: ['ジープリント', 'ZprintPro JP', '智印港']
  - sameAs: [X, LinkedIn, 30 JP 目录, Startup Base] (K3 9:00 提供具体 URL)
  - areaServed: [JP, US, HK]
  - knowsAbout: [学园祭印刷, POD, 卒業記念アルバム, ステッカー印刷, チラシ印刷, cmyk printing, waterproof stickers, small batch stickers]
  - **预期**: EN KP imps 9→30+ (3.3x), JA KP imps 4→30+ (7.5x), branded search 6 query 基线 0→≥1
- **5 天节奏 (8/8 04:00 - 8/12 22:00)** (per matrix gsc_targeting_v2.5_day_execution):
  - 8/8 (Sat): K3 9:00 跑 3 设备 + Supabase + formsubmit + 提供 key / M3 10:15 amend push 5 SKU 改字 + retrofit cross-border + ジープリント 埋点
  - 8/9 (Sun): M3 amend Org sameAs + 1 push / K3 跑 301 5/5 / K3 AutoGLM 准备
  - 8/10 (Mon): M3 retrofit cmyk-guide P0 (305 imps pos 86) / K3 跑 AI 可见性 ≥1/4 / K3 AutoGLM 启动 10 条
  - 8/11 (Tue): M3 retrofit paper-materials + 3 篇 P1 (envelope / a1-posters / pvc-menu) / K3 跑复盘预填
  - 8/12 (Wed): 0 push / K3 跑复盘 5min + AI 可见性复测 + branded search 6 query
- **§0.7 关键漏斗 endpoint 部署后必 production smoke 3 步** (K3 8/8 01:03 拍板, 8/7 18:30 9ab9ee4 教训固化):
  - step 1: curl POST /api/quote/ 期望 HTTP 200 + UUID
  - step 2: curl GET Supabase /rest/v1/quotes?order=created_at.desc&limit=5 期望看到最新记录
  - step 3: 双向 verify 2/2 PASS 算 §0.7 PASS
  - 不跑 = 不算 PASS (K3 8/8 01:03 拍板)
- **§0.8 Self-Reminder 防抖** (K3 8/8 01:56 P0 阻断):
  - 已知时间点: 用 cron once with `at` 一次性触发后自删
  - 未知事件: 轮询必带 max_retry + 指数退避 + 超时自毁
  - 1h 内 >3 次无实质操作: P0 故障, 立即告警
- **branded search 6 query 监测** (K3 8/8 04:00 拍板):
  - ja: ジープリント / ZprintPro / 智印港 / zprin
  - en: ZprintPro / zprint / zprintpro printing / zprintpro.com
  - baseline 8/8 = 0, target 8/12 ≥1 命中 zprintpro.com
  - 监测 cron: zprintpro-gsc-feedback-loop (每周三 15:00) + 8/12 review 当日手动统计
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8):
  - 校验 SSoT v8.6 + 准备 amend AGENTS.md 198 + retrofit cross-border commit + 5 SKU 改字
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)

"""

# Find the 【T2 cron 治理】 marker
t2_marker = "【T2 cron 治理"
idx = content.find(t2_marker)
if idx == -1:
    raise RuntimeError("T2 marker not found")

# Insert v8.6 section before T2 marker
new_content = content[:idx] + v86_section + content[idx:]

with open(cron_path, "w", encoding="utf-8") as f:
    f.write(new_content)

# Stats
import os
old_size = os.path.getsize(cron_path)  # already updated
print(f"OK: cron prompt v8.5 -> v8.6")
print(f"  Old size: 25385 bytes (v8.5)")
print(f"  New size: {old_size} bytes (+{old_size - 25385})")
print(f"  v8.6 升级段位置: 插入在 v8.5 段后, T2 cron 治理段前")
print(f"  v8.6 段含: 5 SKU JA/EN 改字表 / 8/9 Org sameAs 草稿 / 5 天节奏 / §0.7 §0.8 引用 / branded search 6 query")
