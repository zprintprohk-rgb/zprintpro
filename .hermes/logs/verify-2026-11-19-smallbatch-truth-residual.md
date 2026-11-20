# VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL · 独立线上验收记录

- 记录时间：2026-11-19 01:5x–02:0x (Asia/Shanghai)
- 执行者：autoclaw 人手会话（按 `重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md` §8 表 11-19 行授权动作：清 k3 独立验收积压）
- 性质：只读生产/部署验证；不改 src/、不重做源变更、不 git push、不改队列任务状态（`no_self_approval`，状态翻转留给 owner lane ZP-k3-review 下一轮消费本记录）
- 写域：仅 `.hermes/logs/`（符合该任务 write_scope）

## 1. Cloudflare 部署证据

- 锚点 commit：`a9f218f0`（origin/main 最新已推送；含 11-13 `ff97d235` small-batch 真值修复及其后全部 src 提交 c172b3d2 / 74581d7f / 7425d28d / d5c0d36f / a9f218f0，线性历史）。
- 证据：`node scripts/verify-deploy.mjs a9f218f0` → `[verify-deploy] CF Pages: success` → PASS（check-run 详情 https://github.com/zprintprohk-rgb/zprintpro/runs/134837701322）。
- 边界声明：本地 HEAD `a0921854`（docs）未推送（本地领先 origin/main 1 个 docs commit），不参与生产部署链；verify-deploy 对 a0921854 返回 GitHub 422 "No commit found"，与未推送事实一致。
- 附带发现（登记，不在本任务处置）：`origin_ssh/main` 落后 135 commits（status -sb ahead 135），本地 upstream 指向 origin_ssh；实际生产 push 走 origin。属配置卫生项，待配置负责人核对。

## 2. 线上 URL 断言（串行 fetch + 有效性三校验：status 200 / 长度 >20k / marker 命中）

### 2.1 /en/product/small-batch-stickers/ — PASS（真值修复已上线）

- status 200，HTML 290,048 bytes。
- 命中（positive 全过）：
  - `10 stickers per design` ✅（正文句例："Order from 10 stickers per design with no setup fees…"）
  - `$0.55` ✅（title "Small Batch Stickers from $0.55 | 10pcs | ZprintPro"）
  - `confirmed at quote` ✅（生产/运输条件化措辞在位）
- 命中（optional）：`A4 sheet` ✅（$0.55/pc 的 A4-sheet 口径标注在位）、`digital proof before production` ✅。
- 残留扫描（negative 全零）：`4-day` / `4 days to USA` / `50 stickers minimum` / `100% refund` / `proof included free` = 0 命中。
- 结论：ff97d235 的 6 处 A4-sheet/pcs MOQ 口径分离 + from US$0.55 条件化在 PDP 上线生效；11-13 修复的源变更不再有独立验收缺口（本条即缺失的线上断言证据）。

### 2.2 /en/category/stickers/ — 同簇类目面发现商业口径残留（新发现，另列决策项，不在本任务处置）

- status 200，HTML 320,661 bytes。
- **残留 1（价格锚冲突）**：类目 meta title `"Small Batch Sticker Printing $0.05 · 10 MOQ | ZprintPro"` + description `"…from $0.05, 10 MOQ…"` 使用 `$0.05` 锚；PDP 真值 = `$0.55/pc (A4 sheet)`（K3 10-30 裁决单#3 批准条件化口径）；同页 FAQ JSON-LD 又写 `"prices from US$0.55 per sticker"`（无 A4-sheet 标注）。三面三锚（$0.05 / $0.55 / FAQ $0.55 无标注）。源定位：`src/lib/seo.ts` stickers 段（en title/description，2026-11-13 weekly-meta 批 104→55 瘦身产物）；`$0.05` 未能在 products.ts 价格字段找到对应锚（仅 L6766 折扣值 0.05，无价格含义）。
- **残留 2（被禁时效承诺）**：en meta description 残留 `DHL 2-4 day USA delivery` — 与 K3 10-30 裁决单#3「4-day USA 不发布」直接冲突（PDP 侧已清，类目 meta 侧漏清）。
- **残留 3（未批 proof SLA）**：en meta `Free proof in 4 hours`（zh `免費設計打稿 4 小時` / ja `無料デザイン校正 4 時間` 同段）；裁决 B 项 proof/sample 未确认不宣传。
- **残留 4（产品卡时效）**：foil stickers SKU `descriptionEn` 含 `Fast 4-day turnaround`（descriptionJa `4日仕上げ`），线上类目页产品卡 JSON-LD 实锤；源 = `src/data/products.ts` L1120。
- **同类观察项（不同簇，仅登记）**：`src/data/category-conversion-blocks.ts` L4024 books 类 metaDescription 含 `DHL 2-4 day USA delivery, free shipping $99+`；`src/data/blog-data/en.json` 亦含 DHL 2-4 day USA。属其它簇既定文案（DHL 全球 2-4 天为全站标准跨境表述），是否纳入同一真值裁决待 K3。
- 判定：这是 11-19 文档 §2.4 预警的「同一产品不同页面/字段商业口径冲突」实例——AI 抽取到旧价格/旧时效的风险面在类目 meta 而非 PDP。**处置权在 K3／ZP-weekly-meta（title 冻结 + 单变量纪律），执行层不动 src。**

## 3. 任务处置建议（供 owner lane 消费）

- `VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL`：CF 部署证据（§1）+ 线上断言（§2.1）已记录 → 可按 exit_criteria 迁移出 PENDING；不设排名/CTR 主张（11-18 变更窗口不足，复测窗不变：7/14/28d）。
- 新增决策项建议（待 K3/weekly-meta）：「stickers-en 类目 meta 商业口径对齐」——对齐 PDP `$0.55 (A4 sheet)` 条件化口径、清 `DHL 2-4 day USA` / `Free proof in 4 hours` / foil 卡 `Fast 4-day turnaround`；title 属冻结面，改动需走单变量 + 审批。
- 复测：既有 7/14/28d 窗口不变；本记录不改变任何基线。

## 数据来源

- `scripts/verify-deploy.mjs a9f218f0` 输出（2026-11-19 01:5x +08）
- 线上探针原始 JSON：`.hermes/tmp/live-assert-smallbatch-1119.json`（fetch 序列 2026-11-19 02:0x +08，串行 + 1.5s 间隔）
- `git log`/`git status -sb`（origin/main = a9f218f0；工作区 src/ 干净）
- `重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md` §5.3/§8（授权与边界）
- 校准状态：已校准（CF check-run API + 线上 HTML 双方法一致：源文件字符串 ↔ 线上命中）
