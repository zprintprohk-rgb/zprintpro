#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Upgrade cron prompt v8.6 -> v8.7 (GSC zh-hk 香港 + 5 SKU 改字 + 2 LLM blog).
2026-08-08 04:30 K3 zh-hk v3 deep analysis.
"""
import os

cron_path = r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md"

with open(cron_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update header version line
content = content.replace(
    "# Last sync: 2026-08-08 04:00 (M3 升 v8.6 GSC 数据驱动 5 天执行表 + 5 SKU JA/EN 改字 + Org sameAs 8/9 草稿)",
    "# Last sync: 2026-08-08 04:30 (M3 升 v8.7 GSC zh-hk 香港 5 SKU 改字 + 2 LLM blog + NAP 强化 4 段)"
)

# v8.7 section to insert after v8.6 section
v87_section = """

【v8.7 升级 (2026-08-08 04:30 M3 K3 GSC zh-hk 香港 5 SKU 改字 + 2 LLM blog)】
- **触发**: K3 8/8 04:30 zh-hk GSC 数据分析 (3 月 13759 imps / 7 天 1332 imps / CTR 2.7% 三市场最强) + M3 v3 深度分析 (200+ ZH query + 87 SKU 命中 + 5 顶级信号 + 2 LLM 引文 pos 1+5).
- **报告落盘** (SSoT):
  - **v3**: `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (30.6K, 详细 ZH-HK 分析)
  - **matrix**: gsc_targeting_zh_hk_v3 段 (+24K, 12 ZH 黑洞桶 + 5 SKU 改字 + 2 LLM blog + NAP 强化 4 段)
- **5 SKU zh-hk P0 (8/8 10:15 amend push 合并 1 push)**:
  1. **same-day-flyers** (3 月 333 imps 黑洞 pos 46.49 + 7 天 32 imps pos 42.16 升 4 位): title_zh "即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時" + 8 行业 (餐廳/零售/地產/活動/補習社/選舉/美容/學校) + 5 FAQ
  2. **a2-posters** (3 月 856 imps 黑洞王 pos 37.95 + 7 天 73 imps pos 26.78 升 11 位): title_zh "A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日" + 8 行业 (地產/活動展覽/餐廳/零售/補習社/選舉/學校/美容院) + 5 FAQ
  3. **doujinshi-printing** (3 月 1/2 50% CTR + 7 天 1/1 100% pos 3 顶级): title_zh "同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日" + 6 行业 (同人/動漫/插畫/學生/Cosplay/獨立出版) + 5 FAQ
  4. **kraft-paper-bags** (3 月 521 imps 黑洞 pos 57.44 + 7 天 9 imps pos 68.67): title_zh "牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保" + 6 行业 (餐廳/零售/化妝品/食品/禮品/環保) + 5 FAQ
  5. **food-boxes** (3 月 634 imps 黑洞 pos 39.98 + 7 天 25 imps pos 48.28): title_zh "食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡" + 6 行业 (餐廳外賣/食品店/烘焙店/茶飲/化妝品/電子產品) + 5 FAQ
- **2 LLM 引文 blog 主题 (8/10 + 8/11 retrofit 写)**:
  1. **eco-packaging-hong-kong-supplier-guide** (Pillar Page 3000-5000 字, 8/10 写): 锚定 LLM 引文 pos 1 "我公司想轉用環保包裝物料，請問有冇邊啲香港中小企供應商比較專業？" + 6 行业 (食品/餐廳/烘焙/茶飲/化妝品/電子) + FAQPage + BreadcrumbList
  2. **reliable-printing-supplier-hong-kong-guide** (Cluster Article 1500-2500 字, 8/11 写): 锚定 LLM 引文 pos 5 "我想為我的網店尋找一間可靠的印刷供應商，可以介紹一些中小企公司嗎？" + 5 行业 (網店/中小企/學校/補習社/同人) + FAQPage
  - **预期**: AI 可见性 ≥1/4 → ≥2/4 引擎 (Perplexity / ChatGPT 期望 pos 1-5 引用 zprintpro.com)
- **NAP 强化 4 段 (8/9 Org sameAs 改后立即生效)**:
  1. **品牌 NAP**: "智印港 印刷公司 — 香港觀塘 新蒲崗 即日取貨 / DHL 國際配送 2-4日"
  2. **MTR NAP**: "MTR 燈箱廣告 12-sheet 規格 + 價錢表" (mtr-advertising-specs blog 内链)
  3. **联系 NAP**: "WhatsApp 即時報價 +86 198 8085 1334 / zprintpro@outlook.com"
  4. **物流 NAP**: "亞洲工廠直送 + DHL 全球 2-4日 (美加澳 4-6日)"
- **5 天执行表 (8/8 - 8/12) 香港部分**:
  - 8/8: K3 9:00 跑 3 设备 + 提供 X/LinkedIn key / M3 10:15 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198 合并 1 push
  - 8/9: M3 amend push Org sameAs 改 + retrofit / K3 跑 301 5/5
  - 8/10: M3 retrofit cmyk-guide P0 + 写 eco-packaging-hk blog / K3 跑 AI 可见性 ≥1/4 + AutoGLM 启动
  - 8/11: M3 retrofit paper-materials + 写 reliable-printing-hk blog / K3 跑复盘预填
  - 8/12: 0 push 复盘 / K3 跑 5min 手测 + branded search + AI 可见性复测
- **§0.7 §0.8 §0.9 引用 (per K3 8/8 拍板)**:
  - §0.7 关键漏斗 endpoint production smoke 3 步 (8/9 Org sameAs 改后必跑, 不跑不算 PASS)
  - §0.8 Self-Reminder 防抖 (8/8 09:55 cron once 7e2cc0ba 一次性触发, 不空转)
  - §0.9 外链注册自动化边界 (8/10 起 AutoGLM 30 目录填表, K3 点提交)
- **8/12 期望 KPI (香港)**:
  - ZH CTR 3m 1.55% → 1.85%+, 7d 2.7% → 3.5%+
  - ZH pos 3m 30.63 → 26, 7d 23.69 → 18
  - 智印港 branded 31 imps pos 2.32 → 60+ imps pos 1 80%+ CTR
  - 同人誌 PDP 维持 100% CTR pos 1-3
  - a2-posters pos 26.78 → 15-20, CTR 0% → 1-2%
  - AI 可见性 ≥2/4 引擎 (LLM 引文 pos 1+5 + blog 加固)
  - ZH 询盘 0 → ≥3 (per §6.1 4 天冲刺, 香港最强市场)
- **branded search 6 query 香港部分 (已赢)**:
  - 智印港 3m 6/31 19.35% pos 2.32 → 7d 2/2 100% pos 1 ✅ 顶级信号
  - 期望 8/12: 智印港 60+ imps pos 1 80%+ CTR (Org sameAs 改后)
- **cross-check 5 渲染源 SOP (per MEMORY.md §9, 5 SKU zh-hk 改字必查)**:
  1. src/data/products.ts (title_zh / description_zh 字段)
  2. src/data/sku-seo-data.ts (PDP meta title / description, 优先于 products.ts)
  3. src/data/blog-data/{zh-hk,en,ja}.json (blog 引用此 SKU 的 title / desc)
  4. src/components/pdp/orderform.tsx (PDP 提交后 fallback 文案)
  5. src/components/pdp/referencepriceblock.tsx (PDP 价格表兜底)
  6. public/llms-zh-hk.txt (AI 注入, L11 + L222 副文件)
  - **grep SOP**: `grep -rn "即時傳單" src/ public/` / `grep -rn "A2 海報" src/ public/` / `grep -rn "同人誌" src/ public/` / `grep -rn "牛皮紙袋" src/ public/` / `grep -rn "食品包裝" src/ public/` — 0 残留旧词 + 0 简体字 (zh-hk 必须繁体中文, per §13.16.1)
- **8/8 09:55 cron once 7e2cc0ba 触发** (per §0.8 一次性):
  - 校验 SSoT v8.7 + 准备 amend push 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk) + retrofit cross-border + AGENTS.md 198
  - 与 10:15 daily cron 合并 1 effective push (§0.1 攒批)
  - 触发即终止 (per §0.8 原则 2)
- **月度 push 配额预测**:
  - 8/8: 1 push (amend 合并, 15 SKU 改字 + AGENTS.md 198 + retrofit)
  - 8/9: 1 push (Org sameAs + retrofit)
  - 8/10-8/11: 1 push/天 (per §0.1 攒批)
  - 8/12: 0 push (复盘日)
  - 8/8-8/12 总: 4 push (累计 38/500 = 7.6%)

"""

# Find 【T2 cron 治理】 marker
t2_marker = "【T2 cron 治理"
idx = content.find(t2_marker)
if idx == -1:
    raise RuntimeError("T2 marker not found")

# Insert v8.7 section before T2 marker
new_content = content[:idx] + v87_section + content[idx:]

with open(cron_path, "w", encoding="utf-8") as f:
    f.write(new_content)

old_size = 30541
new_size = os.path.getsize(cron_path)
print(f"OK: cron prompt v8.6 -> v8.7")
print(f"  Old size: {old_size} bytes (v8.6)")
print(f"  New size: {new_size} bytes (+{new_size - old_size})")
print(f"  v8.7 升级段位置: 插入在 v8.6 段后, T2 cron 治理段前")
print(f"  v8.7 段含: 5 SKU zh-hk 改字 / 2 LLM blog / NAP 强化 4 段 / 5 天节奏 / §0.7 §0.8 §0.9 引用")
