#!/usr/bin/env python3
# scripts/add-cron-sot-section-m.py
# 加 §M 12 條鐵律執行 SOP 段到 4 个 cron SSoT
# 触发: K3 9/4 01:02 "同步定时任务的指令中"
import os

CRON_FILES = [
    '.hermes/cron-prompts/zprintpro-daily-content-1x7w.md',
    '.hermes/cron-prompts/zprintpro-gsc-feedback-loop.md',
    '.hermes/cron-prompts/zprintpro-monthly-content-authority-audit.md',
    '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
]

# §M 段内容 (跨 4 cron 一致, 9.3 KB)
SECTION_M = '''## §M 12 條鐵律執行 SOP (K3 9/4 01:02 派活包同步, 跨 4 cron SSoT 一致性, 必跑 + 0 命中 = pass)

> **来源**: K3 9/3 23:29 拍板 12 條鐵律 + K3 9/3 23:37 寫進 Blog 技能 + K3 9/4 01:02 派活包同步定時任務指令
> **配套**: zprintpro-seo-evolve skill §0.34 (12 條鐵律完整清單 + 5 Pillar 12 規則重寫執行能力)
> **門童**: scripts/guards/blog-quality-12-rules-guard.js (v1.7 #14, 12 條 Scriptable 檢查)
> **必跑**: 寫完任何 Pillar blog 必跑 `node scripts/guards/blog-quality-12-rules-guard.js` 並截圖 0 命中

### §M.1 12 條鐵律清單 (per skill §0.34.1)

| # | 規則 | 門童 RULE ID | 紅線判定 |
|---|------|------------|---------|
| 1 | 倒金字塔 - 首段 100 字內直答核心 | RULE1_INVERTED_PYRAMID | firstH1 OR firstP > 100 字 |
| 2 | H2 必須是問題 (嗎/點/how/why/when/which) | RULE2_H2_QUESTION | 非問題 H2 > 問題 H2 |
| 3 | 快速答案塊 40-60 字, ≥ 3 個 div.alert | RULE3_QUICK_ANSWER | 通過 div.alert < 3 |
| 4 | 段落 ≤ 3 行 | (M3 自律) | 移動端可讀性 |
| 5 | E-E-A-T (Person + LinkedIn + FDA + EU REACH) | RULE5_EEAT | 任一缺失 |
| 6 | 原創數據 (≥ 10 個 2 位+ 具體數字) | RULE6_ORIGINAL_DATA | 數字 < 10 |
| 7 | 實體映射 (1 主 + 3-6 子) | (M3 自律) | schema 結構 |
| 8 | 意圖分層 CTA ≤ 3 (頂 1 + 底 1 = 2) | RULE8_CTA_FATIGUE | wa.me/... 出現 > 3 |
| 9 | 語義錨點內鏈 7+, 錨點 ≥ 5 字 | RULE9_SEMANTIC_ANCHOR | 內鏈 < 7 |
| 10 | Schema 5 全 (Article + FAQPage + BreadcrumbList + HowTo + Organization) | RULE10_SCHEMA | 缺任一 |
| 11 | 答案金塊密度 ≥ 0.4/1000字 (💡 答案/回答 nugget) | RULE11_ANSWER_NUGGET | density < 0.4 |
| 12 | AI 可引用比較表 ≥ 2 (材質表 + QUV 對比表) | RULE12_COMPARISON_TABLE | table < 2 |

### §M.2 修復 SOP 27 min/篇 模塊化提速 (per skill §0.34.4 + §0.34.6.1)

| 階段 | 時間 | 動作 | 模塊來源 |
|------|------|------|---------|
| 模塊組裝 | 8 分鐘 | 從 Pillar 1+2 模塊庫複製 (材質表 / 工藝表 / 作者欄 / Schema 模板) | Pillar 1 zh-hk + Pillar 2 zh-hk |
| 原創內容 | 12 分鐘 | 寫 3-4 個 Pillar 專屬章節 (QUV 1000h / 客戶案例 / 18 行業 / 6 步流程) | Pillar 專屬數據 |
| 門童檢查 | 5 分鐘 | 跑 blog-quality-12-rules-guard.js + 修復 RULE1-12 命中 | 14 道門童 v1.7 |
| 提交 | 2 分鐘 | git commit 攢批, 1 Pillar 1 commit | per K3 §0.25 v3 攢批 |

### §M.3 3 locale 標記統一 (per skill §0.34.6.4)

**守門 regex 跨 3 locale 統一**: `/💡\\s*答案\\s+nugget|💡\\s*回答\\s+nugget/g`

| Locale | H1 縮短 | H2 問題 | 答案金塊標記 | div.alert 顏色 |
|--------|---------|---------|------------|---------------|
| zh-hk | 51 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【結論】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| en | 89 字 ✓ | 9 個問題 H2 | `💡 答案 nugget: 【Conclusion】` | bg-amber-50 / blue-50 / green-50 / red-50 |
| ja | 58 字 ✓ | 9 個問題 H2 | `💡 答え nugget: 【結論】` (or 回答) | bg-amber-50 / blue-50 / green-50 / red-50 |

### §M.4 5 Pillar 模板庫路徑

```
.hermes/cron-prompts/templates/
├── pillar-1-zh-hk.md (包裝盒) [TBD 9/4 11:00-12:00]
├── pillar-1-en.md
├── pillar-1-ja.md
├── pillar-2-zh-hk.md (防水貼紙)
├── pillar-2-en.md
├── pillar-2-ja.md
├── pillar-3-zh-hk.md (海報) [TBD 9/4 00:30-03:00]
├── pillar-3-en.md
├── pillar-3-ja.md
├── pillar-4-zh-hk.md (校園) [12 規則重寫已落 commit 1f65be8f]
├── pillar-4-en.md
├── pillar-4-ja.md
├── pillar-5-zh-hk.md (燙金) [TBD 9/4 03:00-05:00]
├── pillar-5-en.md
└── pillar-5-ja.md
```

### §M.5 撤回聲明 (跨 session 永久生效)

> **撤回**: Pillar 9/3 16:25 之前 9 段 + 4 FAQ + 5 內鏈舊版不符合 Pillar 12,000+ 字 5 schema 標準
> **重寫**: 9/3 23:29 K3 拍板 12 規則 + 9/3 23:55 全部 12 規則重寫落地
> **驗證**: blog-quality-12-rules-guard.js (v1.7 #14) 0 命中
> **撤回原因**: 6 大閱讀體驗殺手 = 內部術語污染 / 編號邏輯 / 語言混雜 / 數據垃圾 / CTA 疲勞 / 內容跳躍
> **SSoT**: 6 commit 鏈 (b85c7192 + d4d5f1af + 1f65be8f + 3cfe59c7 + be19fe55 + 6c2f4a94)

### §M.6 門童 14 道完整清單 (per skill + 5 道 blog 標準)

- **#11 pillar-guard.js** - 12,000+ 字 + 5 schema 塊 (Pillar 標準)
- **#12 blog-standard-guard.js** - title 50-60 字 + H1 主關鍵詞 + lastUpdated 一致
- **#13 internal-links-cta-guard.js** - 7+ 內鏈 + 3 WhatsApp CTA
- **#14 blog-quality-12-rules-guard.js** - K3 9/3 23:29 12 條鐵律 Scriptable 檢查
- **#1-#10 其他門童** (per AGENTS.md §0.31.1)

### §M.7 K3 9/4 派活包 5 條硬規則

1. **K3 §0.25 v3 攢批**: ≥1 戰略交付物 (skill + cron SSoT) 或 ≥3 非 docs 文件改動才推, 1 push/天 (30 min 間隔)
2. **K3 §0.22 SOP-10 5 問門禁**: 派活 / 上報 / 報告前必跑 5 問
3. **K3 §0.23 數據誠信紅線**: 報告必含數據來源行
4. **K3 §0.32 zh-hk 5 禁詞**: 不出現實體註冊信息 (深圳 / 518111 / 彩龍印刷包裝有限公司)
5. **K3 §0.34 12 條鐵律**: Pillar blog 必 0 命中 (本段)

### §M.8 教訓固化源頭

- **2026-09-03 22:44**: K3 痛罵 Pillar 2 貼紙 7 內鏈 + 1 CTA 不達標 → 11 內鏈 + 3 CTA 段
- **2026-09-03 23:29**: K3 拍板 12 條鐵律 + 12 規則 Scriptable 檢查
- **2026-09-03 23:37**: K3 派活包寫進 Blog 技能 + 24/7 不休息重寫剩餘 4 Pillar
- **2026-09-04 00:16**: K3 12 小時 Phase 1-4 5 Pillar 15 篇 + 基礎設施升級
- **2026-09-04 01:02**: K3 派活包寫進自進化 skills + 同步定時任務指令 (本段落地)

---

'''

# 在文件顶部 (after §I 段) 插入 §M 段
# §I 段后第一个 ## (不 §I) 之前
for cron_file in CRON_FILES:
    if not os.path.exists(cron_file):
        print(f'NOT FOUND: {cron_file}')
        continue

    with open(cron_file, 'rb') as f:
        raw = f.read()
    text = raw.decode('utf-8')

    # 找 §I 段结束 (下一个 ## §I 之外的 ##)
    # 用 §L 或 §M marker
    # 简单方式: 找 "## §L" 或 "## §J" 之类在 §I 之后的位置
    # 实际: 大部分 cron SSoT 在 §I 之后有 §J/§K/§L, 在文件较前位置
    # 在 §I 段结束前 (即 §I 之后第一个 ## 之前) 插入 §M

    # 找 ## §I 段开头和结束
    import re
    m = re.search(r'^## §I ', text, re.MULTILINE)
    if not m:
        print(f'NO §I found in {cron_file}')
        continue
    section_i_start = m.start()

    # 找 §I 段结束: 下一个 ## §X (X != I)
    # 从 section_i_start 之后找第一个 ## §[A-Z]
    after_i = text[section_i_start + 5:]
    next_section = re.search(r'^## §[A-Z]', after_i, re.MULTILINE)
    if not next_section:
        # §I 是最后一个段, 加在文件末尾
        new_text = text + '\n' + SECTION_M
    else:
        insert_pos = section_i_start + 5 + next_section.start()
        new_text = text[:insert_pos] + SECTION_M + text[insert_pos:]

    with open(cron_file, 'wb') as f:
        f.write(new_text.encode('utf-8'))

    print(f'{cron_file}: {len(raw)} → {len(new_text.encode("utf-8"))} bytes (+{len(new_text.encode("utf-8")) - len(raw)})')

print('\n=== 完成 ===')
