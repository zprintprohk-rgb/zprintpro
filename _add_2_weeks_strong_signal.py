#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Add 2_weeks_execution + gsc_daily_strong_signal_monitor to matrix
K3 8/8 04:35 战略级 4 字+①②③ 拍板, M3 按最优执行.
"""
import json
import os

matrix_path = r"F:\zprintpro-nextjs\.hermes\industry-keyword-matrix.json"

with open(matrix_path, "r", encoding="utf-8") as f:
    matrix = json.load(f)

# 2_weeks_execution section
two_weeks = {
    "version": "v4",
    "created_at": "2026-08-08T04:40:00+08:00",
    "creator": "Mavis (M3)",
    "trigger": "K3 8/8 04:35 战略级 4 字+①②③ 拍板, M3 按最优执行",
    "framework": {
        "1_KPI_calibration": "per §0.10 硬约束: 4-5 天窗口排名 ≤ 当前位置 -15% / imps ≤ +30% / schema 变更打 5 折",
        "2_resource_allocation": "per §0.11 硬约束: 抓强信号 (P0, 4天可兑现) > 本地实体建设 (P1, 2-6周复利) > 黑洞大词 (P2, 排最后)",
        "3_conversion_metrics": "per §0.12 硬约束: imps/CTR 是过程指标, 必含询盘 + 响应时长 + 转化率",
        "4_3_market_layering": "zh-hk=收割 / ja=复制公式 / en=低成本抓强"
    },
    "Week_1_8_8_8_12_3_修正": {
        "8_8_amend_push_调整": {
            "原计划": "5 SKU JA + 5 SKU EN + 5 SKU zh-hk 合并 1 push",
            "K3_修正": "P0 第 1 优先: EN small-batch-stickers 单独先改 (pos 7.76/29imps/0%CTR/抓强信号/ROI 最高), 不跟其他合并",
            "K3_修正理由": "small-batch-stickers 4 天内必 CTR 提升 3-5%, 比 14 SKU 黑洞大词改字 ROI 高 10x",
            "新计划": "P0 small-batch-stickers 单独改 + 其他 14 SKU 改字 + AGENTS.md 198 + retrofit cross-border 合并 1 push"
        },
        "8_9_起_GSC_抓强监控": {
            "trigger": "K3 8/8 04:35 拍板, 每天 GSC 抓强监控",
            "cron": "zprintpro-gsc-feedback-loop (周三 15:00) + 8/9 起 daily 22:00 强信号追踪",
            "monitor_targets": "pos ≤ 10 但 0% CTR 的 query 清单",
            "loop": "改 title → 72h 验 CTR → 形成闭环",
            "tools": "scripts/gsc_strong_signal_monitor.py (待写)"
        },
        "8_12_复盘_校准值_转化指标": {
            "原计划": "跑 review-8-12-template.md (5 维度 KPI 抓取)",
            "K3_修正": "改用 §0.10 校准值 + §0.12 转化指标 (WhatsApp 询盘数 + 响应时长 + 表单→询盘转化率)",
            "K3_修正理由": "防止'方向正确但时间未到'误判为'策略失败'而错误转向, 转化指标更接近钱"
        }
    },
    "Week_2_8_13_8_21_排期": [
        {
            "date": "8_13_Sun",
            "push_1_天": "zh-hk 抓强二批 (mailer-boxes / laminated-menus / custom-calendars / removable-stickers 4 SKU)",
            "站外_不占_push": "AutoGLM 目录 10 条 + outreach 跟进 (清单文 10 封)"
        },
        {
            "date": "8_14_Mon",
            "push_1_天": "eco-packaging-hk pillar 内链加固 (跟 cross-border / paper-bag-guide / packaging-guide blog 互链)",
            "站外_不占_push": "AutoGLM 目录 10 条 (印刷/POD 7 → 5/7)"
        },
        {
            "date": "8_15_Tue",
            "push_1_天": "JA 移动端专项 (JA 移動 CTR 2.36% 是桌面 3.4 倍, title 前 30 字移动端截断优化, 5 SKU JA title_ja 加 短納期 + モバイル)",
            "站外_不占_push": "K3 发第二批 outreach (清单文 5 封)"
        },
        {
            "date": "8_16_Wed",
            "push_1_天": "EN 抓强二批 (paper bag gsm FAQPage 5 Q + kraft paper bags PDP title_en 强化)",
            "站外_不占_push": "AutoGLM 目录收尾 10 条 (本地/创业 7 → 5/7)"
        },
        {
            "date": "8_17_Thu",
            "push_1_天": "reliable-printing-hk cluster + eco-packaging-hk pillar 互链 (5 内链 each)",
            "站外_不占_push": "AI 可见性复测 4 引擎 (Perplexity / ChatGPT / Claude / Gemini) + branded search 6 query 复测"
        },
        {
            "date": "8_18_Fri",
            "push_1_天": "JA 教科書/教材 title 二批 (textbooks + exercise-books + graduation-yearbook 3 SKU, Week1 验证后决定)",
            "站外_不占_push": "清单文上榜确认 (期望 1-2 封 reply, 收录到清单)"
        },
        {
            "date": "8_19_Sat",
            "push_1_天": "cmyk-guide 二次 retrofit (视 pos 进展, JA cmyk 197 imps + ZH 28 imps, 期望 pos 86→70-75 校准)",
            "站外_不占_push": "branded search 6 query 复测 (智印港 / ジープリント / ZprintPro 期望 ≥1 命中)"
        },
        {
            "date": "8_20_Sun",
            "push_缓冲日": "补欠账, 无欠账则 0 push (per §0.1 攒批)",
            "站外_不占_push": "—"
        },
        {
            "date": "8_21_Mon",
            "push_0_push_双周复盘": "全 7 项 §6 验收 (per §0.10 校准值 + §0.12 转化指标)",
            "站外_不占_push": "—"
        }
    ],
    "8_21_校准_KPI": {
        "ZH_7d_CTR": "≥3.2% (校准: M3 期望 3.5% 校准至 3.1-3.3% per §0.10)",
        "ZH_询盘_累计": "≥5 (per §0.12 转化侧指标)",
        "JA_branded": "≥1 (智印港 31 imps → 40-45 imps per §0.10)",
        "JA_KP_imps": "≥10 (Org sameAs 改后渐进, per §0.10 schema 变更打 5 折)",
        "EN_small_batch_CTR": "≥3% (pos 7.76 0% → 3-5% per §0.10 抓强信号)",
        "AI_可见性_2_4": "≥2/4 引擎 (LLM 引文 pos 1+5 已有 + blog 加固)",
        "目录_30_30": "AutoGLM 8/10-8/19 完成 30 目录",
        "301_5_5": "K3 8/9 跑 CF Bulk Redirect List enabled"
    },
    "8_8_10_15_amend_push_调整": {
        "P0_第_1_优先_单独改": {
            "slug": "small-batch-stickers",
            "title_en_old": "(待 grep 验证, est. 'Custom Stickers Small Batch 100 MOQ')",
            "title_en_new": "Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof",
            "industry_list_en": ["DTC", "Craft", "Brewery", "Skincare", "Pet Food", "Subscription Box", "E-commerce", "Event"],
            "faq_5_en": [
                "100 MOQ — order 1-100 custom stickers same day",
                "Vinyl, Die-Cut, Waterproof, Removable, Fluorescent 5 material types",
                "DHL 2-4 day global shipping, free shipping over $99",
                "Free design proof in 1 business day, no setup fee",
                "50+ shape templates free, custom shape $20 one-time"
            ],
            "expect_uplift": "0% → 3-5% CTR (pos 7.76 抓强信号, 4 天可兑现)"
        },
        "P0_第_2_批_合并_1_push": {
            "5_JA": ["a2-posters", "outdoor-posters", "fluorescent-stickers", "kraft-paper-bags", "textbooks"],
            "4_EN": ["a2-posters", "waterproof-stickers", "saddle-stitch-booklets", "kraft-paper-bags"],
            "5_zh_hk": ["same-day-flyers", "a2-posters", "doujinshi-printing", "kraft-paper-bags", "food-boxes"],
            "AGENTS_md": "L39 + L439 改 198 phase-out 181 (per 8/8 00:50 K3 拍板)",
            "retrofit": "cross-border-ecommerce-shipping-box-guide 末尾ジープリント + 智印港 + ZprintPro 2-3 次埋点",
            "合并_1_push": "§0.1 攒批, 1 effective push 触发 1 CF Pages build"
        }
    },
    "9_00_任务_提前跑_M3_已跑": {
        "step_1_curl_POST_api_quote": {
            "url": "https://zprintpro.com/api/quote/",
            "method": "POST",
            "result": "HTTP 200 OK",
            "uuid": "4892080c-3e77-4be6-8368-d93944a68b29",
            "created_at": "2026-08-07T20:32:52.783053+00:00",
            "verdict": "✅ PASS"
        },
        "step_2_3_locale_contact": {
            "zh-hk": "HTTP 200, size 92714, wa198=True, wa181=False, hasForm=True",
            "en": "HTTP 200, size 93001, wa198=True, wa181=False, hasForm=True",
            "ja": "HTTP 200, size 92067, wa198=True, wa181=False, hasForm=True",
            "verdict": "✅ 3/3 PASS (wa198 3/3, wa181 0/3)"
        },
        "step_3_5_zh_hk_PDP_baseline": {
            "same-day-flyers": "title='宣傳單張 | 即日印刷 HK$0.55起 2小時打稿 | 智印港 ZprintPro' (智印港 NAP 已赢 ✅)",
            "a2-posters": "title='海報印刷 | A2 大幅海印 印海報 HK$10起 即日交貨 | 智印港 ZprintPro' (智印港 NAP 已赢 ✅)",
            "doujinshi-printing": "title='同人誌印刷 10本起印 | Comiket前24小時特急対応' (智印港 NAP 已赢 + Comiket 跨市场引流 ✅)",
            "kraft-paper-bags": "title='牛皮紙袋 | 100%環保 多尺寸 | 智印雲 ZprintPro' (旧 brand '智印雲' ⚠️ 8/8 10:15 改字时统一改 '智印港')",
            "food-boxes": "title='食品包裝盒 | 燙金 UV 100%訂製 | 智印雲 ZprintPro' (旧 brand '智印雲' ⚠️ 同上)"
        },
        "step_4_5_渲染源_0_残留_181": {
            "src/data/products.ts": "0 hits",
            "src/data/sku-seo-data.ts": "0 hits",
            "src/components/pdp/orderform.tsx": "0 hits",
            "src/components/pdp/referencepriceblock.tsx": "0 hits",
            "src/lib/seo.ts": "0 hits",
            "public/llms.txt": "0 hits",
            "public/llms-zh-hk.txt": "0 hits",
            "public/llms-ja.txt": "0 hits",
            "verdict": "✅ 8/8 PASS (5 渲染源 + 3 llms 副文件 0 残留 181)"
        },
        "step_5_Supabase_GET_验证落库": {
            "status": "M3 无 SUPABASE_SERVICE_ROLE_KEY (K3 8/7 18:22 默认 1A 授权未实际部署到 .env.local)",
            "verdict": "❌ K3 9:00 在 Supabase dashboard 查 (期望 8/7 18:30 id fae355ba-... + 8/8 04:35 id 4892080c-... 两条)"
        }
    },
    "K3_9_00_必跑_4_件_M3_不跑": [
        "1. 3 设备 /contact 端到端 (Desktop Chrome / Mobile Safari / Android Chrome)",
        "2. Supabase dashboard 查 quotes 表 (期望 8/7 18:30 + 8/8 04:35 两条)",
        "3. formsubmit.co 收件箱激活 (8/7 18:45 触发的激活邮件, K3 点链接)",
        "4. 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)"
    ],
    "update_history": "2026-08-08 04:40 M3 K3 战略级 4 字+①②③ 拍板 + 双周排期 + KPI 校准 + 3 市场分层 + 9:00 4 步 PASS"
}

# gsc_daily_strong_signal_monitor section (8/9 起 daily 22:00 跑)
gsc_monitor = {
    "version": "v1",
    "created_at": "2026-08-08T04:40:00+08:00",
    "creator": "Mavis (M3)",
    "trigger": "K3 8/8 04:35 拍板 '8/9 起每天 GSC 抓强监控'",
    "purpose": "每天自动检测 pos ≤ 10 但 0% CTR 的 query 清单, 形成 '改→验' 闭环",
    "cron_target": "zprintpro-daily-content-1x7w.md (8/9 起 daily 22:00 强信号追踪 sub-task)",
    "monitor_logic": {
        "step_1": "拉 GSC 7 天数据, 过滤 pos ≤ 10 AND clicks < 0.5 * imps/100 (即 CTR < 0.5%)",
        "step_2": "对每个 query 找当前 PDP slug (via products.ts blog-posts.ts category)",
        "step_3": "判断是否已在 7 天内被改过 (git log --since=7d)",
        "step_4": "新发现的强信号入 .hermes/k3-inbox/daily-strong-signal-YYYY-MM-DD.md",
        "step_5": "K3 9:00 拍板: 1) 立即改 2) 24h 后改 3) 加入 Week 2 排期"
    },
    "expected_output": "每日 1-3 个新抓强信号, 4 天可兑现 CTR 提升 3-5%",
    "closed_loop": "改 title → 72h 验 CTR → 形成闭环 (K3 8/8 04:35 拍板)"
}

# Insert at top level
matrix["2_weeks_execution"] = two_weeks
matrix["gsc_daily_strong_signal_monitor"] = gsc_monitor

# Update top-level update_history
if "update_history" in matrix:
    matrix["update_history"].append("2026-08-08 04:40 M3 K3 战略级 4 字+①②③ + 双周排期 + KPI 校准 + 3 市场分层 + 9:00 4 步 PASS")
else:
    matrix["update_history"] = ["2026-08-08 04:40 M3 K3 战略级 4 字+①②③ + 双周排期 + KPI 校准 + 3 市场分层 + 9:00 4 步 PASS"]

# Write back
with open(matrix_path, "w", encoding="utf-8") as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

old_size = 309996
new_size = os.path.getsize(matrix_path)
print(f"OK: matrix + 2 段 v4")
print(f"  Old size: {old_size} bytes (v2+v3)")
print(f"  New size: {new_size} bytes (+{new_size - old_size})")
print(f"  Added: 2_weeks_execution (Week 1 3 修正 + Week 2 9 天排期 + 8/21 校准 KPI + 8/8 10:15 调整 + 9:00 4 步 PASS)")
print(f"  Added: gsc_daily_strong_signal_monitor (8/9 起 daily 22:00 强信号追踪)")
