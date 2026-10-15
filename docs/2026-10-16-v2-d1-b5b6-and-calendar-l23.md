# 2026-10-16 v2 方案 10/17-19 梯次提前执行 — 日历层 2/3 清零 + B5/B6 深度 blog 上线

> **触发**: K3 指令（v2 方案 10/17-10-19 + 簇 8 梯次「深度思考…按优先级执行」）
> **数据来源**（§0.23 强制行）:
> - 真值: products.ts 六 SKU 全家 HK$3-8/本 / minQ 1（上批 6/6 逐 SKU 核对）+ 站点已发布口径（數碼 3-5 / 柯式 5-7 天、Q4 檔期 10 月底）
> - 层 2/3 源头: src/lib/seo.ts L511-527（calendars titles/keywords/descriptions）+ src/data/category-conversion-blocks.ts（1394-1516 区）+ src/components/category/CategoryIndustries.tsx L326-331
> - 解除判定: GSC数据/ 目录一手 ls（最新 = 2026-10-15 12:15 档，K3 尚未导 10-16/17 档）
> - 校准状态: 已校准（2026-10-16 04:5x-05:3x 一手实测）

## 一、日历战争层 2/3 清零（P0-4，19 处替换）

| 层 | 位置 | 修正 |
|---|---|---|
| 层 2 | seo.ts zh meta | 假地板「HK$10 起/本」→ 真值「HK$3-8/本」；「批量 300 本起」去数字；ISO 9001 認證 → 國際認證體系（CRED 口径） |
| 层 2 | seo.ts en title | 假地板「from $5」→「from $0.40」（真值 basePrice_en），当量 106 超带 → **51 达标**；zh/ja title 无假价零改动（无 churn） |
| 层 2 | seo.ts en/ja desc | 「bulk offset from 300」/「300 部から」去数字 + ja ISO 9001 → 国際認証体系 |
| 层 3 | conversion-blocks | 燙金工藝 100 本起 ×2 → 燙金可選；stat 卡 1000本起 → 1本起；L1398/1507 两条旧价目串（HK$18/9/10-15 + 9 折 + 燙金 100 本起）→ 真值 HK$3-8/本起；早鳥 9 折 ×5 → 早鳥預訂；過期「9 月中前落單」×2 → 10 月底前確認（products.ts 檔期口径）；「(1) 數量上 500 本轉柯式…HK$10-15/本」→ 真值化 |
| 层 3 | CategoryIndustries | 企業年曆卡三语 bullet「100 本起 / From 100 / 100部から」→「1 本起 / From 1 / 1部から」（menus/繪本/畢業冊的 100 本起属其他类目，登记 docket 不动） |

**至此日历战争三层全部归零**（层 1 category-seo-content 上批 19 行 → 层 2 seo.ts → 层 3 conversion/industry）。執行器三件套全过（19 处计数断言 + 形状断言 + 备份 `_bak-calwar-l23-20261016`）；tsc 54=54。

## 二、B5/B6 深度 blog 三语上线（§4 排程 10/17 项）

| # | slug | 承接 | 结构 |
|---|---|---|---|
| B5 | corporate-calendar-customization-2027 | 月曆訂製族（zh-lead） | 快速答案 ×1 + 疑问句 H2 ×6 + 表格 ×2 + 檔期表 + FAQ ×6 + 內鏈 8（類目 + 6 PDP + 同簇 blog）+ CTA ×2 |
| B6 | calendar-sizes-print-reference | calendar sizes（en-lead，AEO fact-table） | 快速答案 ×1 + 主尺寸表 + A3/A2 决策段 + 座檯/卡迷你磁石规格 + 紙重裝訂表 + FAQ ×6 + 內鏈 7 + CTA ×2 |

- 三语齐备（防 sitemap 幽灵 URL，corporate-holiday-cards 10-10 范式）；数字全部 products.ts 真值（1 本起 / HK$3-8 / 尺寸 / 0.5-1mm / 3-5/5-7 天 / 10 月底）+ 站点已发布口径，零编造
- 标题当量 6/6 达标（55/57/55 + 55/57/57，title-equiv 一手断言）；meta desc 6/6 达标（139-158，138-163 带）
- sitemap 238 → **240 URL/locale**（+2 新文章 ×3）+ IndexNow 3 locale ping
- targetKeywords 已登记（B5 primary custom calendar printing / B6 primary calendar sizes → GSC 100 词追踪池）

## 三、10/18 解除判定 — 现状快照（球仍在 K3 侧）

- GSC 最新档 = 10-15 12:15（K3 尚未导 10-16/10-17「24小时三站点汇总」档）
- 条件① 仍 1/3（10-15 窗 97.2%）；条件② 已达成（581.7）；条件③ GA4 待 K3
- **K3 每日导档后**（今天/明天各一份）条件① 自动累积；两日 ≥60% + GA4 核验 → 10/18 可宣布解除、撤恢复模式块

## 四、执行器与教训

- `.hermes/_calwar_l23_apply_20261016.py`（19 处）+ `.hermes/_b5b6_integrate_20261016.mjs`（slug 冲突断言 + 当量/长度断言 + 备份 + 原子注册）
- 教训 1：`str.replace` 前缀重叠陷阱——短串替换吞掉长串前缀致长串替换落空（本批靠形状断言 '9 折' 残留揪出，改用收尾引号锚定修复）
- 教训 2：部分运行幂等——中断后重跑须容忍已写状态（JSON 冲突断言改幂等覆盖）
- 层 2 的 en title 是唯一 title 改动（17 天前 slot，冻结窗已满，且为 P0 假价修正）；zh/ja title 零 churn

## 五、下一位

- 簇 8（10/20 档）：packaging faqSchema ×10 拆模板 + outdoor-posters faqSchema 余 1 + posters desc MOQ 病灶行 + mailer 正文 + CSV zh FAQ 列映射链核实
- 10/22：年賀状翻开关（K3 真值死线 10/21）+ CTR 批首判（K3 导 28d 档）
- 10/23-25：C107 专题 ja/en + saddle stitch 防御
