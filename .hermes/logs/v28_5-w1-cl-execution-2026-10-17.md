# v28_5 换图 W1 + CL 执行日志（2026-10-17）

> 数据来源: 脚本断言输出 + CF Pages check-runs API + 线上探针 JSON (`.hermes/logs/v28_5-probe-W1-1017-2026-10-17.json`) + curl 交叉验证 + git log

## W1（5 SKU，零展示/长尾）

| 项 | 结果 |
|---|---|
| SKU | spiral-notebooks / thick-paper-flyers / magnetic-closure-gift-box / tuck-end-boxes / gang-run-card-boxes |
| 文件 | 60 webp（5×12，全部 <120KB）入库 `public/images/products/v28_5/` |
| products.ts | 5 块 IBL 改写（3 locale × 4 视图，**全引号键**）+ legacy images→zh-hk hero；10 hunks，禁改字段（title/minQuantity/basePrice/name/seoImages/imageAlt）**零触碰** |
| sitemap | regen 后 60/60 波次 URL + 15 页 loc + 非波次零回归（对新鲜基线） |
| commit | `02610060` → 已推送（双 remote 远端均 02610060）|
| CF Pages | **success**（run 117315163710）|
| 探针 | 15 PDP + 180 图：仅 3-4 个 `fetch failed`（本机出站抖动，两轮失败 URL 完全不同且随机分布）→ **curl 独立复测全部 200 且字节匹配**；sitemap 60/60 |
| IndexNow | HTTP **200**，15 URL（3 locale × 5 SKU）|
| tsc | 54 = 基线 54（增量 0）|

### 首跑拦截与归因（如实记录）

首次真实部署被 sitemap 断言拦截（120 条非波次 URL 丢失）→ §0.23.2 双方法归因：**108 条陈旧基线**（旧编号变体 / 已退役 SKU 的存量行）+ **12 条良性取代**（cosmetic-boxes en/ja 11 条 legacy 回退被 IBL 正确取代；doujinshi 1 条生成器 6 空格缩进盲区）。断言基线改为「补丁前新鲜重生成」后全绿。详见报告 §9.6。

## CL（6 月历 SKU，图随簇 7）

| 项 | 结果 |
|---|---|
| SKU | wall / desk / custom / mini / photo-frame / magnetic-calendars |
| 文件 | 72 webp（6×12，max 119.x KB）|
| products.ts | 6 块 IBL（全引号键）+ legacy；累计 v28_5 引用 **143**（65+78 精确）、sitemap 累计 **132**（60+72 精确）|
| commit | `9fcd2407`（本地；推送受 §0.25.1 30min 闸约束，2026-10-17 12:59:59 上次 push → 窗口 13:29:59 开）|
| 断言 | validation PASS / copy 72 / patch 6 / sitemap 全绿 / tsc 54=54 |
| 待办 | push（后台到点执行）→ verify-deploy → probe → IndexNow |

## 生成器三发现（本批 regen 实证，登记待修 → **已于 2026-10-17 修完，W2 前置清零**）

### 修复记录（commit 见 git log；千问 P0×2 + P1×1 全部关闭）

| # | 缺陷 | 修法 | 验证 |
|---|---|---|---|
| P0-1 | locale 键正则 `['"]loc['"]` 只认引号键 → en/ja 裸键 IBL 从未入图站图 | 改为 `(?:['"]loc['"]|\b loc)` 兼容裸键（**修消费端不改数据**，W1/CL 的引号键写法仍兼容）| en/ja 全部按 IBL 真实数组收录 |
| P0-2 | slug 行正则 `^\s{4}slug:` 只认 4 空格 + 括号式切块（doujinshi 0 缩进对象/6 缩进字段被漏）| 改为 **slug 顺序切块**（block = [slug_i, slug_{i+1})，无括号依赖）+ slug `^[ \t]*slug:` 任意缩进 + name `^[ \t]+name:` | doujinshi 入图（zh1/en1/ja5 = 其真实 IBL）|
| P1-3 | 图站图系统性陈旧导致断言误报 | 部署脚本断言基线 = 补丁前新鲜重生成（已在 W1 首跑事件中落地）| 已生效 |

### 修复后全量核验（双方法）

- **83/83 产品全解析**（修复前 75）、**249 产品页 = 83×3**、**0 个 slug 缺 locale**；页 loc 239→297（含 48 hero）
- 图 loc 1077（distinct 1075；唯一重复 = `doujinshi-printing.webp` 在 zh/en/ja 三个页面复用，合法）
- **BC 六兄弟恢复**（此前整版缺席）：premium/foil 等各 4/4/4（v26 路径）
- **婚礼两页恢复**：foil-wedding-invitations / wedding-thank-you-cards 各 4/4/4（seedream 路径）
- v28_5 = 132（11 slug × 12）保持不变；locale 图数分布 1-8 与各 SKU 真实 IBL 一致（无捏造）
- 本修复为**纯消费端改动**（生成器），products.ts 零改动

## 7 天监控协议（千问 §7 采纳，K3/人工执行）

- 每日 2 分钟：GSC 效果→页面→筛 5 个 W1 PDP：展示/点击波动 ≤±20%；GSC 网页索引无新增排除；线上抽查 1 PDP 图片正常
- 第 3 天：PageSpeed Insights 对比 1 个 W1 PDP 的 LCP（应改善或持平）；GSC 图片搜索仍为 0
- 第 7 天（W1 归因窗关闭）：28d 对比 5 PDP 展示/点击/排名；无异常 → W2 归因窗开启
- 阈值触发→暂停后续波次并复盘

## 与计划的对照

- 计划 §3：W1=10/17 ✅ 当日执行；CL=10/17 随簇 7 ✅ 同日本地落地（推送受 30min 闸排队）。
- 与千问建议的偏差（已在其方案基础上用既有工具链替代）：其手工 8-Phase 的 `git stash -- src/`（违不代持红线）、正则式路径替换（不适配 IBL 三语结构）、`public/image-sitemap.xml` 文件名与 `www.` 域名（均与实际不符）——本工具链已覆盖全部意图且断言更强。
