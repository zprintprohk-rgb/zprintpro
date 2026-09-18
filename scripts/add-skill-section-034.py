#!/usr/bin/env python3
# scripts/add-skill-section-034.py
# 在 zprintpro-seo-evolve SKILL.md 末尾添加 §0.34 12 條鐵律
# 触发: K3 9/3 23:37 派活包 "12 條鐵律寫進 Blog 技能"
import re

path = r'C:\Users\Administrator\.minimax\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md'

with open(path, 'rb') as f:
    raw = f.read()
text = raw.decode('utf-8')

# Insert before "## §9 Changelog"
insertion_marker = '## §9 Changelog'

if insertion_marker in text:
    section_034 = '''## §0.34 12 條鐵律 (K3 9/3 23:29 拍板, 9/3 23:37 寫進技能)

> **核心**: 12 條鐵律是 Pillar blog 的 SEO + AEO + GEO 質量基線, 反審門童 v1.7 #14 (blog-quality-12-rules-guard.js) 在最後一道關口審核, 5 Pillar 15 篇必須 0 命中才能 pass。

### §0.34.1 12 條鐵律完整清單

| # | 規則 | 落地形式 | 反審門童檢查 |
|---|------|---------|------------|
| 1 | **倒金字塔** - 首段 100 字內直接答核心問題 (不繞彎) | H1 後首段 < 100 字, 結論前置 | RULE1_INVERTED_PYRAMID: firstH1 OR firstP text > 100 字 → 紅 |
| 2 | **H2 必須是問題** - h2 text 含 嗎 / 點 / how / why / when / which / 什麼 / 多少 | 每個 H2 都是 AlsoAsked 搜索問題格式 | RULE2_H2_QUESTION: h2NotQuestions > h2Questions → 紅 |
| 3 | **快速答案塊 40-60 字** - `<div class="bg-amber-50 ...">` 答案塊, 至少 3 個 | div.bg-amber-50 / blue-50 / red-50 / green-50 / gray-50 + 30-80 字內文 | RULE3_QUICK_ANSWER: 通過的 div < 3 → 紅 |
| 4 | **段落不超 3 行** - 移動端可讀性 | 每段 ≤ 3 行 (browser dev tools measure) | (M3 寫作自律, 門童不檢) |
| 5 | **E-E-A-T** - Person schema + LinkedIn + FDA + EU REACH | schema 內含 Person + 同名 LinkedIn + 食品級 FDA + EU 化學品 REACH | RULE5_EEAT: 任一缺失 → 紅 |
| 6 | **原創數據** - 具體數字 (4,820 訂單, QUV 1000h, 18 行業) | 內文含 ≥ 10 個 2 位以上具體數字 | RULE6_ORIGINAL_DATA: < 10 個 → 紅 |
| 7 | **實體映射** - 主角 + 3-6 支持實體 | 1 主實體 (印刷品) + 3-6 子實體 (材質 / 工藝 / 場景) | (M3 寫作自律, 門童不檢) |
| 8 | **意圖分層 CTA ≤ 3** - 頂部 1 + 底部 1 = 2 個 WhatsApp CTA | wa.me/8619880851334 出現 ≤ 3 次 (K3 9/3 23:29 拍板減至 2 個) | RULE8_CTA_FATIGUE: > 3 → 紅 |
| 9 | **語義錨點內鏈** - 7+ 內鏈, 錨點 ≥ 5 字 | 內鏈 ≥ 7 個, 每個錨點文字 ≥ 5 字 | RULE9_SEMANTIC_ANCHOR: < 7 → 紅 |
| 10 | **Schema 齊全** - Article + FAQPage + BreadcrumbList + HowTo + Organization | 5 個 schema 塊 + 5 個 JSON-LD | RULE10_SCHEMA: 缺任一 → 紅 |
| 11 | **答案金塊密度 ≥ 0.4/1000字** - 💡 答案 nugget / 💡 回答 nugget 標記 | 每 1000 字至少 1 個, AI 引擎金標準 ≥ 6/1000字 | RULE11_ANSWER_NUGGET: density < 0.4 → 紅 |
| 12 | **AI 可引用比較表格** - table 元素 ≥ 2 | 至少 2 個 `<table>` (4 種材質 × 5 維度 + QUV 1000h 褪色對比) | RULE12_COMPARISON_TABLE: < 2 → 紅 |

### §0.34.2 Pillar 12 條鐵律必達標準

- **5 Pillar × 3 locale = 15 篇**, 全部 0 命中 (12 條門童紅線 = 0)
- **Pillar 命名**: slug 含 "pillar" OR title 含 "Pillar" 才觸發 12-rules-guard 檢查
- **未命中 Pillar** 的其他 blog (food-packaging / sticker-guide 等) 不受 12 條強制約束, 但應自覺參照

### §0.34.3 跨 4 cron 落地 (SSoT 同步)

4 條 cron 在內容生產時必跑 `node scripts/guards/blog-quality-12-rules-guard.js` 並截圖 0 命中:

1. **zprintpro-daily-content-1x7w** (每天 10:15) - 每日 Pillar / Cluster 生產後必跑
2. **zprintpro-gsc-feedback-loop** (週三 15:00) - GSC 點擊低詞改寫後必跑
3. **zprintpro-monthly-content-authority-audit** (每月 1 號 14:00) - 月度矩陣審計必跑
4. **zprintpro-blog-deepfix** (cron 按需) - 深度修復後必跑

### §0.34.4 修復 SOP (M3 自糾)

若 12-rules-guard 命中, 1 篇修復時間分配 (27 分鐘/篇 K3 模塊化提速):

| 階段 | 時間 | 動作 |
|------|------|------|
| 模塊組裝 | 8 分鐘 | 從 Pillar 1+2 模塊庫 (材質表 / 工藝表 / 作者欄 / Schema 模板) 複製 |
| 原創內容 | 12 分鐘 | 寫 3-4 個 Pillar 專屬章節 (QUV 1000h / 客戶案例 / 18 行業 / 6 步流程) |
| 門童檢查 | 5 分鐘 | 跑 blog-quality-12-rules-guard.js, 修復 RULE1-12 命中 |
| 提交 | 2 分鐘 | git commit 攢批, 1 Pillar 1 commit |

### §0.34.5 來源 + 教訓固化

- **K3 拍板**: 9/3 23:29 派活包 "12 條鐵律 SEO/AEO/GEO" + 9/3 23:37 派活包 "寫進 Blog 技能 + 24/7 不休息重寫剩餘 4 Pillar"
- **撤回聲明**: 4 Pillar 9/3 16:25 之前 9 段 + 4 FAQ + 5 內鏈舊版不符合 Pillar 12,000+ 字 5 schema 標準, K3 拍板重寫, 9/3 23:55 全部 12 規則重寫落地
- **跨 session 永久生效**: 5 Pillar 12 規則重寫 commit b85c7192 (Pillar 5 燙金) + d4d5f1af (Pillar 1 5 schema 修復) + 1f65be8f (Pillar 4 title+H1) + 3cfe59c7 (5 Pillar 11 內鏈 + 3 CTA) + be19fe55 (Pillar 2 12 規則) + 6c2f4a94 (Pillar 1 12 規則 + 門童 #14)
- **配套**: 反審門童 v1.7 #14 blog-quality-12-rules-guard.js (K3 9/3 23:29 派活包, 12 條規則 Scriptable 檢查, 5 Pillar 15 篇 0 命中 = pass)

---

'''

    # Insert before the marker
    new_text = text.replace(insertion_marker, section_034 + insertion_marker, 1)

    # Add Changelog entry at the very end
    changelog_entry = '''- **2026-09-04 v5 (K3 9/3 23:37 派活包 "12 條鐵律寫進 Blog 技能" + 9/3 23:29 12 條拍板)**: 加 §0.34 12 條鐵律完整清單 + Pillar 必達標準 + 跨 4 cron 落地 + 修復 SOP + 來源/教訓固化; 反審門童 v1.7 #14 blog-quality-12-rules-guard.js 12 條 Scriptable 檢查 5 Pillar 15 篇 0 命中驗證; 12 規則 = 倒金字塔 + H2 問題 + 快速答案塊 40-60 字 + 段落 ≤ 3 行 + E-E-A-T + 原創數據 + 實體映射 + 意圖分層 CTA ≤ 3 + 語義錨點內鏈 7+ + Schema 5 全 + 答案金塊 ≥ 0.4/1000字 + AI 可引用比較表 ≥ 2
- 來源: K3 9/3 23:29 派活包 12 條鐵律 + K3 9/3 23:37 派活包 24/7 不休息重寫剩餘 4 Pillar + scripts/guards/blog-quality-12-rules-guard.js (12 條 Scriptable 檢查) + 6 Pillar 12 規則重寫 commit (b85c7192 + d4d5f1af + 1f65be8f + 3cfe59c7 + be19fe55 + 6c2f4a94)
'''
    if '- **2026-09-04 v5' not in new_text:
        new_text = new_text + changelog_entry

    with open(path, 'wb') as f:
        f.write(new_text.encode('utf-8'))

    print(f'§0.34 inserted, file size: {len(raw)} → {len(new_text.encode("utf-8"))} bytes (+{len(new_text.encode("utf-8")) - len(raw)})')
else:
    print(f'ERROR: {insertion_marker} NOT FOUND in {path}')
