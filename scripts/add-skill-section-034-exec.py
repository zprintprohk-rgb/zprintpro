#!/usr/bin/env python3
# scripts/add-skill-section-034-exec.py
# 扩展 zprintpro-seo-evolve SKILL.md §0.34 加入 5 Pillar 12 规则重写执行能力
# 触发: K3 9/4 01:00 "把这些执行的能力写进我们的自进化的skills里"

path = r'C:\Users\Administrator\.minimax\agents\mavis\skills\zprintpro-seo-evolve\SKILL.md'

with open(path, 'rb') as f:
    raw = f.read()
text = raw.decode('utf-8')

# 在 §0.34.5 后面 + §9 前面插入 §0.34.6 + §0.34.7
insertion_marker = '## §9 Changelog'

exec_section = '''### §0.34.6 5 Pillar 12 规则重写执行能力 (K3 9/3 23:37 派活包实战沉淀)

> **来源**: 9/3 23:55 Pillar 1 + 9/4 00:30 Pillar 4 12 规则重写实战 + 14 道门童 v1.7 验证

#### §0.34.6.1 模块化提速公式 (27 min/篇, K3 拍板)

| 阶段 | 时间 | 动作 | 模塊來源 |
|------|------|------|---------|
| **模塊組裝** | 8 分鐘 | 從 Pillar 1+2 模塊庫複製 (材質表 / 工藝表 / 作者欄 / Schema 模板 / 6 步流程) | Pillar 1 zh-hk + Pillar 2 zh-hk |
| **原創內容** | 12 分鐘 | 寫 3-4 個 Pillar 專屬章節 (QUV 1000h / 客戶案例 / 18 行業 / 6 步流程) | Pillar 專屬數據 |
| **門童檢查** | 5 分鐘 | 跑 blog-quality-12-rules-guard.js, 修復 RULE1-12 命中 | 14 道門童 v1.7 |
| **提交** | 2 分鐘 | git commit 攢批, 1 Pillar 1 commit | per K3 §0.25 v3 攢批 |

#### §0.34.6.2 12 规则 Scriptable 检查实战 (K3 9/3 23:29 拍板)

**門童 v1.7 #14 blog-quality-12-rules-guard.js** 检测 12 条铁律, Pillar 命中条件 (slug OR title 含 "pillar"):

| RULE ID | 檢查內容 | 命中判定 | 修復動作 |
|---------|---------|---------|---------|
| RULE1_INVERTED_PYRAMID | firstH1 OR firstP text > 100 字 | H1/P text > 100 字符 | 改寫首段 100 字內直答核心 |
| RULE2_H2_QUESTION | h2 text 含 嗎 / 點 / how / why / when / which / 什麼 | 問題型 H2 數 < 非問題型 | 改 H2 為 AlsoAsked 問題格式 |
| RULE3_QUICK_ANSWER | `<div class="bg-amber-50">` 30-80 字 答案塊 ≥ 3 個 | 通過 div.alert < 3 | 加 3+ 短 div.alert 40-60 字 |
| RULE5_EEAT | Person + LinkedIn + FDA + EU REACH | 任一缺失 | 加 4 項 E-E-A-T 信號 |
| RULE6_ORIGINAL_DATA | content 含 ≥ 10 個 2 位以上具體數字 | 數字 < 10 | 加 4,820 訂單 / QUV 1000h / 18 行業 等 |
| RULE8_CTA_FATIGUE | wa.me/8619880851334 出現 ≤ 3 次 | > 3 次 | 減至頂 1 + 底 1 = 2 個 |
| RULE9_SEMANTIC_ANCHOR | href 內鏈 ≥ 7, 錨點 ≥ 5 字 | 內鏈 < 7 | 加 7+ 內鏈 (長錨點) |
| RULE10_SCHEMA | 5 schema 標籤全 | 缺任一 | 加 Article + FAQPage + BreadcrumbList + HowTo + Organization |
| RULE11_ANSWER_NUGGET | 💡 答案 nugget / 💡 回答 nugget 標記 ≥ 0.4/1000字 | density < 0.4 | 加答案金塊, 每 1000 字 1 個 |
| RULE12_COMPARISON_TABLE | `<table>` 元素 ≥ 2 | < 2 | 加 4 種材質 × 5 維度 + QUV 1000h 對比表 |

#### §0.34.6.3 12 规则修復 v1-v5 实战 (Pillar 4 校園 修复时间线)

| 版本 | 動作 | 結果 |
|------|------|------|
| v1 | 加 H1 縮短 (en 126→89 字, ja 114→58 字) | RULE1 通過 |
| v2 | 加 div.alert 30-80 字 + 💡 答案/回答 nugget 標記 | RULE3 RULE11 接近 |
| v3 | 守門 emoji 是 💡 不是 🎯, "答案/回答" 不是 "回覆" | 修復標記格式 |
| v4 | 跨 locale 統一短 div (40-60 字) | zh-hk 0.39/1000 接近 0.4 |
| v5 | ja 用 "回答" 不是 "答え", 加更多 anchor 達 ≥ 0.4/1000字 | **0 命中** |

#### §0.34.6.4 3 locale 標記統一 (Pillar 跨 locale 同步)

**守門 regex 跨 3 locale 統一**: `/💡\\s*答案\\s+nugget|💡\\s*回答\\s+nugget/g`

| Locale | H1 縮短 | H2 問題 | 答案金塊標記 | div.alert 顏色 |
|--------|---------|---------|------------|---------------|
| zh-hk | 51 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【結論】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| en | 89 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【Conclusion】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| ja | 58 字 ✓ | 9 個問題 H2 | `💡 答え nugget: 【結論】` (or 回答) | bg-amber-50 / blue-50 / green-50 / red-50 |

#### §0.34.6.5 5 Pillar 12 规则重写 commit 链 (跨 session 永久生效)

| # | Commit | Pillar | locale | 字数 |
|---|--------|--------|--------|------|
| 1 | `03e8e34` (foundation) | Pillar 1-3 基础 | zh-hk/en/ja | 12,000+ |
| 2 | `b85c7192` | Pillar 5 燙金 3 大應用 | zh-hk/en/ja | 19,486/16,778/24,536 |
| 3 | `d4d5f1af` | Pillar 1 5 schema 完整修復 + 門童 v1.4 | en/ja | 22,170/17,064 |
| 4 | `1f65be8f` | Pillar 4 title 50-60 + H1 主關鍵詞 | zh-hk/en/ja | 17,065/22,536/21,412 |
| 5 | `3cfe59c7` | 5 Pillar 11 內鏈 + 3 WhatsApp CTA 段 | 全部 | +11 內鏈 + 3 CTA |
| 6 | `be19fe55` | Pillar 2 防水貼紙 12 規則 | zh-hk/en/ja | 15,581/23,347/13,613 |
| 7 | `6c2f4a94` | Pillar 1 12 規則 + 門童 v1.7 #14 | zh-hk/en/ja | 19,257/22,170/17,064 |
| 8 | `f5d50092` | Pillar 4 校園 lastUpdated + pillar-guard 平衡花括號 regex | zh-hk/en/ja | 校準後 |

### §0.34.7 同步到 4 cron SSoT (K3 9/4 01:02 派活包)

> **触发**: K3 9/4 01:02 "把这些执行的能力写进我们的自进化的skills里，并同步定时任务的指令中"
> **落地**: 4 cron SSoT (zprintpro-daily-content-1x7w / gsc-feedback-loop / monthly-content-authority-audit / blog-deepfix) 头部加 §M 段, 内容 = §0.34.1-§0.34.6 浓缩

#### §0.34.7.1 4 cron 落地 §M 段 SOP

1. **zprintpro-daily-content-1x7w.md** (每天 10:15) - §M 12 條鐵律生產檢查清單 + 5 Pillar 模板庫
2. **zprintpro-gsc-feedback-loop.md** (週三 15:00) - §M GSC 點擊低詞改寫必跑 12 條 + 修復時間分配
3. **zprintpro-monthly-content-authority-audit.md** (每月 1 號 14:00) - §M 月度矩陣審計 12 條門童 0 命中驗證
4. **zprintpro-blog-deepfix.md** (cron 按需) - §M 深度修復流程 27 min/篇 + 模塊化提速

#### §0.34.7.2 4 cron §M 段共同内容 (跨 cron SSoT 一致性)

```markdown
## §M 12 條鐵律執行 SOP (K3 9/4 01:02 同步, 跨 4 cron SSoT 一致)

> **必跑命令**: 寫完 Pillar blog 必跑 `node scripts/guards/blog-quality-12-rules-guard.js` 並截圖 0 命中
> **0 命中 = pass**, 任一 RULE1-12 紅 = 重寫該 section 至達標

### §M.1 12 條鐵律清單 (per zprintpro-seo-evolve skill §0.34.1)
### §M.2 修復 SOP 27 min/篇 (per skill §0.34.4)
### §M.3 3 locale 標記統一 (per skill §0.34.6.4)
### §M.4 5 Pillar 模板庫路徑 (.hermes/cron-prompts/templates/pillar-{1,2,3,4,5}-{zh-hk,en,ja}.md)
### §M.5 撤回聲明 (Pillar 9/3 16:25 之前 9 段+4 FAQ+5 內鏈舊版不符合 12 規則, 9/3 23:55 全部重寫)
```

#### §0.34.7.3 模板庫路徑規劃 (K3 9/4 01:02 拍板)

```
.hermes/cron-prompts/templates/
├── pillar-1-zh-hk.md (包裝盒)
├── pillar-1-en.md
├── pillar-1-ja.md
├── pillar-2-zh-hk.md (防水貼紙)
├── pillar-2-en.md
├── pillar-2-ja.md
├── pillar-3-zh-hk.md (海報) [TBD 9/4 00:30-03:00]
├── pillar-3-en.md
├── pillar-3-ja.md
├── pillar-4-zh-hk.md (校園) [12 規則重寫已落]
├── pillar-4-en.md
├── pillar-4-ja.md
├── pillar-5-zh-hk.md (燙金) [TBD 9/4 03:00-05:00]
├── pillar-5-en.md
└── pillar-5-ja.md
```

---

'''

if insertion_marker in text:
    new_text = text.replace(insertion_marker, exec_section + insertion_marker, 1)

    with open(path, 'wb') as f:
        f.write(new_text.encode('utf-8'))

    print(f'§0.34.6 + §0.34.7 inserted, file size: {len(raw)} → {len(new_text.encode("utf-8"))} bytes (+{len(new_text.encode("utf-8")) - len(raw)})')
else:
    print(f'ERROR: {insertion_marker} NOT FOUND')
