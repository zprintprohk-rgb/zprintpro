# 2026-09-23 render-trio-title-v5-exec 执行报告（七段）

> 指令: 「读取 F:\zprintpro-nextjs\重要文件 中 zprintpro-sku-title-rule-v5-2026-09-23.md、zprintpro-pdp-render-trio-rule-v5-2026-09-23.md、deepseek-exec-prompt-render-trio-and-title-v5.md 三个文件，全站三语言站点严格按 exec prompt 执行 所有 SKU 进行更新」
> 用户中途追加指令（本轮核心痛点）: 「圓角 为什么这个会出现圆角，传单不可能去啤圆角，从哪里出来圆角？…我的指令就是全部所有SKU都要按deepseek-exec-prompt-render-trio-and-title-v5.md 执行」

---

## ① 交付物（commit ID + 文件清单）

**commit**: `8f10f55d`（2026-09-23 09:52:13 +0800，已 push origin/main）

| # | 交付物 | 文件 | 状态 |
|---|--------|------|------|
| 交付物 1 | PDP 渲染层三件套规则 v5.1 落库（附录 A 逐字） | `docs/2026-09-23-pdp-render-trio-rule.md`（14,580 B） | ✅ 新建 |
| 交付物 2 | title 规则增补（附录 B 逐字，方案 A 新建） | `docs/2026-09-23-sku-title-rule-v5.md`（2,062 B） | ✅ 新建 |
| 交付物 3 C-0 | 门童 #28 品牌·语种全链路扫描（B-3 铁律）+ 数据/模板层 0 违规模板源 | `scripts/audit-sku-locale.cjs`（v3.1 扩展：sku-seo-data + blog-posts + blog-data JSON + seo.ts 模板层断言）· `scripts/gen-guard-manifest.mjs`（.cjs 扩展名支持）· `scripts/guards/guard-manifest.json`（#28 注册，max=28）· `scripts/canonical/pre-commit` + `.githooks/pre-commit`（3.11 门童 #28 接入） | ✅ |
| 交付物 3 C-1 | 全槽 title 五段式普查（只读清单） | `.hermes/logs/2026-09-23-title-v5-census.md`（untracked，276 槽 / 五段齐全 217 / 缺钩子 0 / 出带 0） | ✅ |
| 交付物 4 Q-1 | MOQ 问答块模板化组件（100% products.ts/price-table 派生，替换手工注入块） | `src/app/[locale]/product/[slug]/v9/MoqQaBlock.tsx`（新建）· `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx`（接入，价格阶梯之后渲染） | ✅ |
| 数据诚信修复（用户「圓角」指令） | flyer 家族假「圓角」根因清除 | `src/data/products.ts`（7 处【免費刀模】異形裁切與圓角可選 → 標準尺寸刀模模板；eco-flyers 假「覆膜」胶囊 → 【環保工藝】無覆膜（環保）或水性光油）· `src/data/sku-seo-data.ts`（a4-flyers / eco-flyers zh-hk title 去「圓角覆膜」、a5-flyers H1） | ✅ |

## ② 变更依据（提示词编号）

- `重要文件/deepseek-exec-prompt-render-trio-and-title-v5.md`（261 行，binding）交付物 1/2/3/4 + 红线。
- 附录 A/B 逐字来源: `docs/zprintpro-pdp-render-trio-rule-v5-2026-09-23.md`、`docs/zprintpro-sku-title-rule-v5-2026-09-23.md`。
- 圆角修复依据: §0.23 数据诚信红线（批量/模板复制编造工艺词 = 违规；手工块/胶囊的假工艺词必须修）+ v5 §一③（工艺词只写 products.ts 可证，禁跨品类借用）。
- 门童 #27 title-v5-guard.js（HARD/WARN 机检）为 title 合规唯一权威判据。

## ③ 验收闭环表（逐项结果）

| 验收项 | 结果 |
|--------|------|
| 1. 门童六命令全 PASS | ✅ encoding（--fix 无改动）、brand-mentions（A 类 0）、gsc-leak #16、title-band #25（276 槽存量 0）、title-v5 #27（HARD=8 = K3 既定基线，未新增）、hook-sync #26（SSoT 与 active 一致）、gen-guard-manifest（0 冲突 max#28）、**#28 brand·locale（0 违规模板源）** |
| 2. `npm run build` 全量过 | ✅ exit 0；sitemap 723 URLs（241×3 + index），Categories 16 / Products 91 / Blog 114。MOQ 块为组件级新增，**不新增路由 → sitemap URL 数与基线一致** |
| 3. 三闸门过 | ✅（与上一致） |
| 4a. 线上断言（push 后绕缓存 `?_cb=`） | ✅ 2026-09-23 10:03 (UTC 02:03) 部署完成实测：`/en/product/a4-flyers/` title="… | ZprintPro"；`/ja/product/a4-flyers/` title="… | ZprintPro"；`/zh-hk/product/a4-flyers/` title="A4 傳單印刷 宣傳單張 覆膜 10起印 HK$0.35起 | 智印港"（无圆角） |
| 4b. 新门童全站违规模板源 = 0 | ✅ 本地 `node scripts/audit-sku-locale.cjs` = **0 处**（sku-seo-data 92 SKU + blog-posts 624 条 + blog-data 3 语系 + seo.ts 模板层断言） |
| 4c. a4-flyers / waterproof-stickers 线上 MOQ 块 = products.ts | ✅ 线上实测（8f10f55d）：zh-hk 含「10 張起印。10 與 24 張都接…25 張以上單張明顯較平」、en 含「From 10 pcs」、ja 含「量産档（25枚〜）」；waterproof-stickers zh-hk 同（minQ=10 nextTier=25 = price-data.generated.ts 真值） |
| 4d. 五段式普查已落 `.hermes/` | ✅ `.hermes/logs/2026-09-23-title-v5-census.md`（只读，无文案改动） |
| 5. 当量体检 | ✅ title-v5-guard 全量审计 276 槽：a4-flyers zh-hk equiv=51（圆角修复 55→51）、eco-flyers zh-hk equiv=51，全部在带 50-57；**Q-1/MOQ 批不改任何 title → 当量零变化**；FILL=0 / TRIM=0 |
| 6. 数据来源行 + 报告七段 + 挂账清单 | ✅ 本报告（数据来源行见 ⑤；挂账见 ⑥） |

## ④ push 记录（时间戳 + 间隔 + check-runs）

- 上次 push: `0151726b` 2026-09-23 03:31:13 +0800（门童 #27 接入 pre-commit）
- 本次 push: `8f10f55d` 2026-09-23 09:52:13 +0800 → 09:52 推送 origin/main（`0151726b..8f10f55d`）；间隔 **6h21m** ≥ 30min 硬下限 ✅；攒批阈值 ✅（≥1 src 行为修复：圆角胶囊修复 + Q-1 组件 + 门童 #28）
- pre-push 门童: 基线对账 56=56（0 新增段级 FAIL）、#21 规则翻译层 0 命中 ✅
- check-runs: CF Pages build 已部署（2026-09-23 10:03 +08:00 线上指纹「10 與 24 張都接」+「無圓角 title」确认 8f10f55d 生效；部署耗时约 10 分钟）

## ⑤ 数据来源行

- **圆角根因**: `src/data/products.ts` L2061/2152/2245/2339/2430/2522/2616（7 处 `【免費刀模】異形裁切與圓角可選` 胶囊，a4/a5/double-sided/folded/thick/eco/same-day flyers）+ L2520-2523 eco-flyers 假「覆膜」胶囊；渲染落点 `src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` L650-652（features 胶囊 chips）
- **title 圆角修复**: `src/data/sku-seo-data.ts` a4-flyers / eco-flyers zh-hk title（55→51 / 51）、a5-flyers H1 L611
- **MOQ 块派生**: minQty = `src/data/products.ts` minQuantity（a4-flyers=10, waterproof-stickers=10）；nextTier = `src/lib/price-data.generated.ts` PRICE_TABLE_MAP（a4-flyers tiers=[10,25,50,75,99,100,300…] → nextTier=25；waterproof tiers=[10,25,50,100…] → 25）；ja counter 按附录 A §7.1 量词配置表（纸品线=枚）
- **品牌·语种**: BRAND 映射 `src/lib/seo.ts` L24-26 getBrandName（zh-hk=智印港, en/ja=ZprintPro）+ 附录 B B-3 铁律；模板层 L826/L903 均走 getBrandName(locale)
- **五段式普查**: `scripts/guards/title-equiv.js`（当量口径 SSoT）+ `src/data/sku-seo-data.ts`

## ⑥ 遗留挂账（Q-2 窗批输入）

1. **waterproof 信任段「500張起印」vs MOQ 块「10張起印」冲突残句** —— 本任务红线禁修（手工块原文只许被模板输出替换，不顺手改其他区块文案），挂账 Q-2 窗批。
2. **wall-calendars MOQ 块缺口** —— 模板单位（張/pcs/枚）不适用于月曆（ja 应为 §7.1「部」），覆盖需单位适配判断 → 挂账 Q-2（本任务仅纸品线覆盖）。
3. **wall-calendars 徽章「HK$12-40」vs 正文「HK$3-8」价格口径冲突** —— 挂账 Q-2。
4. **en a4-flyers 三 MOQ 口径** —— 挂账 Q-2。
5. **五段式缺口清单**（62 槽，多为 en/ja「工艺/尺寸」词未入正则的指示性缺口；缺钩子 0）→ 指针 `.hermes/logs/2026-09-23-title-v5-census.md`。
6. **K3 既定 title HARD=8 存量**（PRICE_MISMATCH 7 + white-card-boxes FILLER_WORD 1）—— 属 K3 判定项，本任务不自动修。
7. **⚠️ flyer 页残留「圓角」= 通用能力 FAQ**（Q-2 首要输入）: `src/data/products-content.ts` L321（+ 全站 ~50 处 per-product 复制）「智印港支援哪些材質和工藝？」回答「工藝包括…圓角模切…」。这是**全站通用工艺能力清单**（圓角模切确为贺卡/餐牌/贴纸真实工艺），**非 flyer 专属伪造**——flyer 自身 title/规格/features/胶囊已全部清除圓角（线上验证）。按执行提示词红线「不顺手改其他区块文案（FAQ归并 = C-5 后续提示词）」，本任务**未擅自修改**。建议 Q-2/FAQ归并: 该通用 FAQ 改为按品类展示工艺（flyer 不列圓角模切），或拍板从共享能力清单移除。**用户若要求立即处理，需确认越权**（涉 ~50 处复制块）。

## ⑦ 异常与事故

- **门童 #28 模板层断言首跑误报 2 处**：`seo.ts` generateProductMetadata/generateCategoryMetadata 段内「智印港」字面在**代码注释**（历史修复说明），非实际代码路径 → 断言改为剥离 `//` 行注释后判定，复跑 0 处（假阳性，已修）。
- **census 正则在 en/ja 工艺词漏判**（No Residue / ラミネート / 箔押し 等）→ 扩充 en/ja 工艺词表 + 钩子单位（個〜/枚〜/セット〜），复算 276 槽五段齐全 217、缺钩子 0。
- **线上断言首版探针误判**：检测串「10 張與 24」≠ 实际新模板「10 與 24 張」→ 首探针把旧版硬编码块「10 張起印」当上线信号提前结束，且在线旧版「圓角覆膜」/「10 張與 99」指纹曾误报 title/MOQ 异常。修正检测串（「10 與 24 張都接」+「無圓角 title」双指纹）后重跑，确认新版已部署且全断言通过。**教训: 线上断言必须以「新版独有指纹 + 旧版指纹消失」双条件判定，禁止用新旧共有子串。**
- **audit-sku-locale.cjs（.cjs）未被 gen-guard-manifest 扫描**（生成器扩展名只认 js/mjs/ts/sh）→ 生成器加 .cjs 支持，重生成 manifest 收录 #28。
- 全流程无 build 失败、无 tsc 新增错误（54=54 基线持平）。

---
*数据来源: products.ts / sku-seo-data.ts / price-data.generated.ts / seo.ts / print-method-policy.ts / title-equiv.js / title-v5-guard 审计 JSON（.hermes/logs/sku-title-v5-audit-2026-09-23.json）*
