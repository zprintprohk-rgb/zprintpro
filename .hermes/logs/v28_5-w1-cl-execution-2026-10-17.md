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

## 生成器三发现（本批 regen 实证，登记待修）

1. `generate-image-sitemap.js` 的 locale 正则 `['"]loc['"]` **只认带引号的键**——站内 IBL 的 `en:` / `ja:` 为裸键，**en/ja 图历史上从未被图站图收录**。本批 5+6 块改写为全引号键后 en/ja 首次正确入图。
2. slug 行正则 `^\s{4}slug:` 只认 4 空格缩进——`doujinshi-printing`（6 空格块）整页缺席图站图（建议 `\s{4,}`）。
3. 站点图存在系统性陈旧（HEAD 981 条 → regen 1030 条；108 条陈旧清理）——本次 regen 使图站图与 products.ts 真值对齐，属正向卫生。

## 与计划的对照

- 计划 §3：W1=10/17 ✅ 当日执行；CL=10/17 随簇 7 ✅ 同日本地落地（推送受 30min 闸排队）。
- 与千问建议的偏差（已在其方案基础上用既有工具链替代）：其手工 8-Phase 的 `git stash -- src/`（违不代持红线）、正则式路径替换（不适配 IBL 三语结构）、`public/image-sitemap.xml` 文件名与 `www.` 域名（均与实际不符）——本工具链已覆盖全部意图且断言更强。
