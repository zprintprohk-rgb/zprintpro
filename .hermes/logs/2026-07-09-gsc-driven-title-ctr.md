# 2026-07-09 GSC-驱动 title + description 改造 (7 个高 imps 0-CTR 类目页)

## 任务来源

User 指出: GSC 2 个月真实搜索数据显示, 多个核心关键词排名和 CTR 均偏低, 要求基于真实数据优化 title 和 description 来提升排名和点击率.

## 数据洞察 (GSC 90-day default export)

| 指标 | 值 |
|---|---|
| 数据覆盖 | 2026-05 ~ 2026-07 (90 天, 含 2+ 月) |
| 总查询数 | 335 unique queries |
| **0-CTR 高 imps 关键词** | 23 个 imps ≥ 30, CTR = 0% |
| **机会关键词** (rank 11-30) | 9 个 page 2/3 boundary |

### Top 9 机会关键词 (rank 11-30, 可推 page 1)

| 查询 | imps | rank | 类别 |
|---|---|---|---|
| 餐牌印刷 | 43 | 20 | **menus** (page 2!) |
| 紙袋印刷 | 92 | 17 | **paper-bags** (page 2!) |
| 食品包裝訂製 | 48 | 22 | packaging |
| 印紙袋 | 44 | 26 | paper-bags |
| 印刷紙袋 | 44 | 26 | paper-bags |
| 紙袋印製 | 44 | 27 | paper-bags |
| 食品包裝印刷 | 108 | 25 | packaging |
| 紙袋訂造 | 40 | 33 | paper-bags |
| 海報印刷 | 65 | 38 | posters |

## 根因诊断

1. **0% CTR**: title 缺 sharp hook. 现有模板 `[類目]印刷 香港 | 智印雲 ZprintPro — [產品] 定制` 仅 SEO 友好但缺 click 拉力.
2. **rank 17-66**: title 长度偏短 (avg 47c), 字符密度未优化, 没有让 Google 觉得 SERP snippet 高 CTR.
3. **MOQ 信任缺失**: 用户搜索"食品包裝印刷"时, 期望看到价格 + 起印量 + 时效 — 当前 title 全无.
4. **FDA/FSC/DHL 等信任信号**: 没有显示, 但高单价印刷用户 (餐饮/美妆/婚庆) 决策需要这些.

## 修复方案

7 个类目页 × (title + description) × (zh-hk / en / ja) = 42 string 替换.

每个新 title 设计原则:
- **主关键词前置** (Google SERP bold match)
- **MOQ + 价格 + 信任 + 时效** 三 hook 在中间
- **品牌后置** (避免 layout 叠加)
- **≤ 60 字符** (Google truncate point)
- NAP 脱钩 (zh-hk 不写 Shenzhen, en 不写 Shenzhen Printing, ja 不写 中国深圳 — AGENTS.md §13.10)
- 3 locale 独立策略 (zh-hk 香港本地, en 全球卖点, ja 日本市场 — §13.13)
- 不写 business-cards (§11 禁区)

## 改动详情

| 类别 | imps / rank | 新 title (zh-hk) |
|------|-------------|-----------------|
| **paper-bags** | 92 / 17 (page 2) | 紙袋印刷 100個起印 HK\$1.8起/個 · FSC認證牛皮紙/白卡紙袋 \| 智印雲 |
| **menus** | 43 / 20 (page 2!) | 餐牌印刷 100本起 · 防水PVC/紙質菜單 餐廳茶餐廳適用 \| 智印雲 |
| **packaging** | 108 / 25 (page 3 → 2) | 食品包裝印刷 100個起印 · FDA級安全 化妝品/食品/禮盒 4種盒型 \| 智印雲 |
| **flyers** | 84 / 42 | 宣傳單張印刷 100張起印 即日交貨 A3/A4/A5摺頁傳單 \| 智印雲 |
| **stickers** | 51 / 52 | 貼紙印刷 50張起印 · 防水/透明/異形 食品級FDA合規 \| 智印雲 |
| **posters** | 93 / 57 | 海報印刷 1張起打 · A1/A2 戶外防水 展覽背板 \| 智印雲 |
| **red-packets** | 43 / 34 | 利是封印刷 100個起 · 燙金UV 婚慶/新年/企業LOGO定制 \| 智印雲 |

每个新增 description 也按同样 sharp hook 模式重写 (FDA / FSC / ISO / DHL + 30 秒 AI 即時報价 + 行業场景).

## 部署状态

- Commit: `5021722` (amended from b158a37, force-pushed)
- CF Pages build: `success` (run **85925480173**)
- live: https://zprintpro.com/zh-hk/category/paper-bags/ (已验证)

## 预期效果 (1-2 周后 GSC 反馈)

- **page 2 keywords (餐牌 rank 20, 紙袋 rank 17)** → page 1 = CTR 200%+ / organic × 3
- **0% → 5-15% CTR** 全局提升 (按 sharp hook 行业基准)
- **page 3 (rank 21-30) keywords (食品包裝 rank 25)** → page 2 = CTR +100%
- GSC 2 周后回流 → matrix priority_boost 自动更新

## 未触动 (按数据保留)

- **business-cards** (id BC-001~006, GSC imps < 30, CTR 100% for shallow): 现有 title 已合理, 不动
- **calendars / banners / books / educational / envelopes**: GSC 中 imps < 30, 不优先. 等下次 GSC 出现高 imps 0-CTR 时再改
- **description 已重写**: 同步 title sharp hook (FDA / DHL / 30 秒 AI 报价)

## 已完成的"坑"教训

1. **regex 末尾匹配导致 ,, 双逗号** (apply_title_ctr_optimization.py 在 `}` 后多加 `,`) → 触发 `npx tsc` 报错 + CF Pages build 失败 (run 85921239167)
2. **修复**: 跑 3 个 fix script (fix_trailing_commas / fix_missing_commas / fix_brace_pairs), 最终 `npx next build` 输出 "Compiled successfully"
3. **git push --force-with-lease** 覆寫 b158a37 (broken) → 5021722 (fixed)
4. **CF Pages** 2 次 build 后 success

## 后续监控

- 2026-07-15 (1 周后): 用户或 cron 拉取 GSC, 验证 CTR/impressions 提升
- 2026-07-16 Wed 15:00 (gsc-feedback cron): priority_boost 自动更新 + matrix 状态同步
- 2026-07-22 (2 周后): 如果 page 2 keywords 没 push 上去, 考虑 backlinks 或 anchor 文案微调

**Author**: mavis orchestrator (Session mvs_8bf28272b6704ccfad3fe5ff2f1da72b, 2026-07-09 00:18 CST, AGI SEO 调度)
