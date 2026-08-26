# -*- coding: utf-8 -*-
"""
写 B7 选题库 22 篇派发段, 插入 4 个 zprintpro cron prompts (4 cron 共享)
- zprintpro-daily-content-1x7w.md (L122 SSoT 段后)
- zprintpro-weekly-meta-refresh.md
- zprintpro-monthly-matrix-audit.md
- zprintpro-gsc-feedback-loop.md

SSoT 来源: K3 8/26 04:50 v2 预批 B7 commit 57f304f (B7 选题库 22 篇 W1-W9 9 周 × 2-3 篇/周)
"""
from pathlib import Path

# B7 选题库 22 篇 SSoT 段 (per 57f304f 落盘, 4 cron 共享, 必读)
B7_SECTION = r"""
---

## 【2026-08-26 新增 · B7 选题库 22 篇派发】（K3 8/26 04:50 v2 预批 B7 commit 57f304f, 4 cron 共享, 必读 SSoT)

> **强制级 (K3 8/26 04:50 v2 预批 B7 commit 57f304f)**: 4 cron 共享 B7 选题库 22 篇 SSoT, 派发规则如下, 不再依赖 M3 临时选题, queue 排期按本表。

### §1 22 篇 W1-W9 9 周排期 (K3 8/26 04:50 v2 预批 + K3 8/24 11:32 §A 15 提前启动季节军令状)

| 周 | 时间 | 选题 (zh-hk 主, en/ja 同步 3 locale) | 服务词 (GSC 8/24 14:30 pos) | Tier | 状态 |
|---|---|---|---|---|---|
| **W1** | 8/26-9/1 | 即日急件印刷全攻略: 邊度最快? 幾錢? 幾點截單? | 即日急件 pos 25.2 (5 imps) | A | 🔜 |
| **W1** | 8/26-9/1 | 包裝盒印刷價格 2026: 500/1000/5000 個分別幾錢 | 包裝盒印刷 pos 34.9 + 包裝盒訂製 pos 29.4 | A | 🔜 |
| **W1** | 8/26-9/1 | 大信封印刷 C4/C5 規格 + 100 個起 HK$0.5/個起 + 即日特急 | 大信封 pos 2.21 (24 imps 0 click) | A | 🔜 |
| **W2** | 9/2-9/8 | How Much Does Catalog Printing Cost from China? | catalog printing china | A | ⏳ |
| **W2** | 9/2-9/8 | 9 月開學季印刷全攻略: 教科書 / 練習簿 / 學校刊物 | 開學季印刷 | A | ⏳ |
| **W3** | 9/9-9/15 | ⭐ 月曆印刷 2027 訂製時間表: 幾時落單最抵 | 月曆印刷 pos 21.1 (24 imps) | A | 🚨 R5 季节军令 |
| **W3** | 9/9-9/15 | MTR 燈箱海報規格 + 印刷文件要求 | mtr 燈箱海報 | A | 🚨 R5 |
| **W3** | 9/9-9/15 | 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起 | 紙袋 pos 52.71 (7 imps) | A | 🚨 R5 |
| **W4** | 9/16-9/22 | 食品包裝印刷 FDA 認證 + 食品級油墨全攻略 | 食品包裝 | A | ⏳ |
| **W4** | 9/16-9/22 | poster 印刷 A1/A2/大圖輸出 價格 + 規格 | poster 印刷 pos 23.84 (61 imps 0 click) | A | ⏳ |
| **W5** | 9/23-9/29 | 戶外貼紙印刷 防水 UV 抗曬 5 年保固 | 戶外貼紙 | A | ⏳ |
| **W5** | 9/23-9/29 | 證書印刷 / 獎狀印刷 燙金 + 162g 紙 | 證書印刷 pos 15.00 (3 clk) | A | ⏳ |
| **W6** | 9/30-10/6 | 信封印刷 100 個起 + 商業信封 + DL/C5/C4 規格 | 信封 pos 51.22 (9 imps 0 click) | A | ⏳ |
| **W6** | 9/30-10/6 | 餐牌印刷 10 份起 + 防水 + 餐廳菜單 + 燙金 | 餐牌印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 卡片印刷 0.5mm 厚度 + 燙金 + 局部 UV | 卡片印刷 | A | ⏳ |
| **W7** | 10/7-10/13 | 利是封印刷 2027 農曆新年 + 燙金 + 100 個起 | 利是封 | A | 🚨 R5 季节 |
| **W8** | 10/14-10/20 | sticker 印刷 防水 + 50 張起 + 燙金 + 局部 UV | sticker 印刷 | A | ⏳ |
| **W8** | 10/14-10/20 | 同人誌印刷 100 本起 + 中文書 + 日本向け | 同人誌印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 月曆印刷 2027 設計 + 燙金 + 企業禮品 + Q4 起量 | 月曆印刷 (W3 续做) | A | 🚨 R5 |
| **W9** | 10/21-10/27 | 海報印刷 A3/A4 + 100 張起 + 1 天交貨 | 海報 pos 2.5 (2 imps) | A | ⏳ |
| **W9** | 10/21-10/27 | 名片印刷 100 盒起 + 燙金 + 局部 UV | 名片印刷 | A | ⏳ |
| **W9** | 10/21-10/27 | 聖誕卡印刷 2026 + 燙金 + 100 張起 | 聖誕卡 | A | 🚨 R5 |

**累计**: 22 篇 blog 选题库 (W1-W9 9 周 × 2-3 篇/周), 月曆首位 (W3 季节军令 R5 9/15 硬截止), 矩阵追踪在 .hermes/industry-keyword-matrix.json queue[] + covered[]

### §1.1 月曆首位 + R5 9/15 硬截止 加固 (W3 重点, K3 8/24 11:32 §A 15 提前启动季节军令状)

> **季节军令状 (K3 8/24 11:32 §A 15 拍板)**: T42 月曆每拖 1 天, 旺季收成少 1 天. R5 9/15 硬截止, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 = K3 必拍 1 次回复 = 8/30 8:00 月曆 blog 必发 (W3 9/9-9/15 实际 9/9 周二发, 距 9/15 = 6 天缓冲, 撞车根因 = 错峰发, 旺季收成最大化).

- **W3 选题 1: 月曆印刷 2027 訂製時間表: 幾時落單最抵**
  - 目标: 月曆印刷 pos 21.1 → ≤15, 月曆訂製 pos 32.3 → ≤20
  - 内链: 3-5 链 (calendars category / 2027 月曆 blog / 月曆材質 blog / 企業禮品月曆 Q4 blog)
  - 长度: Pillar 3000-5000 字 / Cluster 1500-2500 字
  - 3 locale: zh-hk 繁体 + en 美國市場 + ja 日本市場

- **W3 选题 2: MTR 燈箱海報規格 + 印刷文件要求**
  - 目标: mtr 燈箱海報 pos 8 → ≤5
  - 内链: posters / 戶外貼紙 / 大圖輸出
  - 长度: Cluster 1500-2500 字

- **W3 选题 3: 紙袋印刷 2026 趨勢: 環保 + 燙金 + 100 個起**
  - 目标: 紙袋 pos 52.71 (7 imps) → ≤25
  - 内链: paper-bags / 環保印刷 / 燙金工藝
  - 长度: Cluster 1500-2500 字

### §1.2 W1 选题 (K3 8/26 04:36 立即跑, 季节军令状紧急启动)

- **W1 #1: 即日急件印刷全攻略** (slug: rush-printing-hk-guide)
  - 目标: 即日急件 pos 25.2 → ≤15
  - 内链: rush-printing-delivery + 傳單 + 包裝盒 + poster
  - 长度: Cluster 1500-2500 字
  - 3 locale: zh-hk / en / ja

- **W1 #2: 包裝盒印刷價格 2026** (slug: 2026-packaging-box-pricing)
  - 目标: 包裝盒印刷 pos 34.9 → ≤20, 包裝盒訂製 pos 29.4 → ≤18
  - 内链: packaging category + 食品包裝 + 禮品盒
  - 长度: Cluster 1500-2500 字

- **W1 #3: 大信封印刷 C4/C5 規格** (slug: large-envelope-printing-c4-c5)
  - 目标: 大信封 pos 2.21 (24 imps 0 click) → ≤1.5, CTR ≥10%
  - 内链: envelopes category + 商業信封 + 邀請函信封
  - 长度: Cluster 1500-2500 字
  - K3 §6 P0 第一优先 (striking 冲首页)

### §1.3 W2 选题 (9/2-9/8 落地, 撞车根因 = M3 自决)

- **W2 #1: How Much Does Catalog Printing Cost from China?**
- **W2 #2: 9 月開學季印刷全攻略**

### §1.4 W3 选题 (9/9-9/15 落地, ⭐ R5 9/15 硬截止, 季节军令状, 撞车根因 = M3 自决)

- **W3 #1: 月曆印刷 2027 訂製時間表** (slug: 2027-calendar-printing-timetable)
- **W3 #2: MTR 燈箱海報規格** (slug: mtr-lightbox-poster-specs)
- **W3 #3: 紙袋印刷 2026 趨勢** (slug: paper-bag-printing-2026-trends)

### §2 queue 排期规则 (K3 8/26 04:10 §4 + 8/26 04:50 v2 预批 B7)

1. **W1 (8/26-9/1) 3 篇 必发**: 修 3 (8/26) 撞车根因 = WhatsAppFloat 修复 (K3 8/26 08:00+ v1 撞车根因错位, 修 3 撞车根因 = 改 getWhatsAppLinkProps) 已 PASS → 撞车根因 = W1 选题 daily cron 跑
2. **daily cron 撞车根因 = queue ≥ 1 写 1 篇/天 (per K3 8/5 11:36 拍板 C 撞车根因 = 取消"0 候选常态")**
3. **W3 (9/9-9/15) R5 季节军令撞车根因 = 8/30 8:00 月曆 blog 必发 (错峰 6 天缓冲)**
4. **W7 (10/7-10/13) 利是封 R5 季节撞车根因 = 9/30 8:00 blog 必发 (错峰 7 天缓冲, 2027 农曆新年 = 1/29)**
5. **W9 (10/21-10/27) 聖誕卡 R5 季节撞车根因 = 10/14 8:00 blog 必发 (错峰 7 天缓冲, 12/25)**
6. **总产能 9 篇/周 → 2-3 篇/周 (K3 8/26 04:10 §4 拍板)**

### §3 数据来源

```
数据来源:
- K3 8/26 04:50 v2 预批 B7 commit 57f304f: B7 选题库 22 篇 W1-W9 9 周 × 2-3 篇/周, 月曆首位 R5 9/15 硬截止
- K3 8/24 11:32 §A 15 提前启动季节军令状: T42 月曆每拖 1 天, 旺季收成少 1 天
- K3 8/26 04:10 §4 验收口径 v9.4: 每周 2-3 篇, striking ≥5, pos 1-20 占比 ≥30%, 有点击词 ≥12
- K3 8/26 04:10 §6 3 轨推进: CTR 修复 2 周 / striking 冲首页 30-60 天 / 度量闭环本周
- K3 8/26 05:36 B7 落盘: docs/b7-blog-pool-2026-08-26.md (4 角色 22 篇选题库 派发 + T41/T44 audit 8/28 + money-words 5 梯队 + 8/28 中检 9 时段 + 10 KPI)
- GSC 8/24 14:30 撞车根因 baseline: pos + imps 撞车根因 = 各选题目标词
- 矩阵追踪: .hermes/industry-keyword-matrix.json queue[] + covered[]
```

### §4 教训固化源头

- 撞车根因 = 4 cron 共享 B7 选题库 22 篇 SSoT, 撞车根因 = M3 必须自决 (K3 §0.22 SOP-10 第 3 款) 撞车根因 K3 必拍 1 次回复 = 撞车根因 = 不依赖 M3 临时选题, queue 排期按本表
- 撞车根因 = K3 §0.21 push 配额不烧 token (8/20 11:54 拍板) = 报告不列 push 计数, 攒批作废
- 撞车根因 = K3 §0.23 数据诚信红线 = baseline 必标"待 XX 校准"或"已 XX 校准"
- 撞车根因 = K3 8/24 11:32 §A 15 季节军令状 = T42 月曆每拖 1 天, 旺季收成少 1 天, 撞车根因 = 8/30 8:00 月曆 blog 必发, 错峰 6 天缓冲
- 撞车根因 = K3 8/26 04:10 §4 v9.4 验收口径 = 每周 2-3 篇, 质量三件套 (striking ≥5 + 占比 ≥30% + 有点击词 ≥12)
- 撞车根因 = K3 §0.6 紧急修复例外 = 5xx 阻断 push 立即

---

"""

# 4 个 cron prompts 路径
CRON_PROMPTS = [
    r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-daily-content-1x7w.md",
    r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-weekly-meta-refresh.md",
    r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-monthly-matrix-audit.md",
    r"F:\zprintpro-nextjs\.hermes\cron-prompts\zprintpro-gsc-feedback-loop.md",
]

# 标记位置: v9.4 §4 段 (在 v3 §0.25 段后, SOP-10 段前)
# 简单方法: 查找"## 【2026-08-26 新增 · §4 验收口径 v9.4" 字符串, 找到后插入 B7 段

MARKER = "## 【2026-08-26 新增 · §4 验收口径 v9.4"

import re

for prompt_path in CRON_PROMPTS:
    p = Path(prompt_path)
    if not p.exists():
        print(f"SKIP: {prompt_path} 不存在")
        continue

    content = p.read_text(encoding="utf-8")
    if "B7 选题库 22 篇派发" in content:
        print(f"ALREADY: {prompt_path} 已有 B7 段")
        continue

    if MARKER not in content:
        # 兜底: 找 "## 【2026-08-26 撞墙升级" 段
        alt_marker = "## 【2026-08-26 撞墙升级"
        if alt_marker in content:
            # 找下一个 "## 【" 段开头 (SOP-10 段)
            idx = content.find(alt_marker)
            # 找 alt_marker 段结束的下一个 "## 【"
            search_from = idx
            next_section_idx = content.find("## 【", search_from + 100)  # 跳过当前段
            if next_section_idx == -1:
                print(f"WARN: {prompt_path} 找不到下一段, 追加到末尾")
                new_content = content + "\n" + B7_SECTION
            else:
                # 插入到下一段之前
                new_content = content[:next_section_idx] + B7_SECTION + "\n" + content[next_section_idx:]
        else:
            print(f"WARN: {prompt_path} 找不到任何标记, 追加到末尾")
            new_content = content + "\n" + B7_SECTION
    else:
        # 找 MARKER 段结束的下一个 "## 【" 段
        idx = content.find(MARKER)
        next_section_idx = content.find("## 【", idx + 100)
        if next_section_idx == -1:
            new_content = content + "\n" + B7_SECTION
        else:
            new_content = content[:next_section_idx] + B7_SECTION + "\n" + content[next_section_idx:]

    # 写回
    p.write_text(new_content, encoding="utf-8", newline="\n")
    print(f"OK: {prompt_path} (added {len(B7_SECTION)} bytes B7 段)")

print(f"\nB7 选题库 22 篇 派发段已插入 4 cron prompts")
