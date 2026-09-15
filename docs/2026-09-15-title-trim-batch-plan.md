# Blog Title 当量修剪分批执行计划（S3-S5，2026-09-15 大脑交付）

> **依据**: `docs/2026-09-15-blog-title-length-research.md`（K3 9/15 按推荐执行）+ K3 9/13 拍板「195 条存量按遗留容忍区逐窗消化」
> **口径**: 全站 title 半角当量（CJK×2）目标区 **50-58**（SSoT = `scripts/guards/title-equiv.js`）
> **冻结**: 6 条 FROZEN_BLOG 本次不动（campus-education / foil-stamping / hong-kong-printing-cost / kraft / print-specifications / greeting-card-buying-guide），等冻结窗判
> **已在本批完成**: 3 条双品牌 P0 清理（folding-box / custom-card-boxes / cosmetic-card-boxes）+ S1 守卫口径统一 + S2 截断逻辑

---

## 0. 本次已完成（2026-09-15 会话 + 2026-09-16 提交）

| 项 | 内容 | 状态 |
|----|------|------|
| S1 | 新建 `scripts/guards/title-equiv.js`（唯一口径 CJK×2 + 50-58） | ✅ commit 4b120b17 |
| S1 | i18n-guard.js 改共享口径 + 白名单文件过滤 | ✅ commit 4b120b17 |
| S1 | blog-standard-guard.js 改共享口径 | ✅ commit 4b120b17 |
| S1 | title-audit-v4.mjs blog 分支改 equiv + 区间 50-58 | ✅ commit 4b120b17 |
| S2 | seo.ts `.slice(0,60)` → `truncateTitleByEquiv()`（保品牌 + 断词） | ✅ commit 4b120b17 |
| S3a | 3 条双品牌残留清理（blog-posts.ts meta.title） | ✅ commit 4b120b17 |
| S3a | custom-card-boxes en 残词 E-commer→E-commerce（blog-posts.ts + en.json 双源） | ✅ commit 4b120b17 |
| — | push 4b120b17 (07:41) + CF build 验证 | ✅/⏳ 后台验证中 |

> **已知遗留**: `.hermes/reports/title-audit-*.json` 新口径重跑产物含简体 title 快照 → 触发 I18N_POLLUTION 硬拦（NON_EXEMPT_RULES 设计缺陷）。本次未提交审计产物，留待下次 cron 重跑时处理（或修 common.js 豁免 reports/ 下的 I18N_POLLUTION）。

## 1. 待修剪清单（非冻结，>58 当量）

### 1.1 zh-hk：48 条可动（5 条冻结除外）
> 多数为 59-60 当量（超 1-2），修剪 1-2 字即可；**优先处理含双品牌/残词项**（品牌 P0 > 长度）

### 1.2 en：25 条可动（5 条冻结除外）
> 平均 59 当量；含已知残词 `custom-card-boxes-small-batch-usa` en「E-commer」（数据层，需补全）

### 1.3 ja：58 条可动（5 条冻结除外）
> 平均 61 当量；假名+汉字混排当量偏高，修剪优先砍冗余长尾

## 2. 分批执行规则（每批 T 批三件套）

### 2.1 每批规模
- **≤5 文件/批**（K3 T 批纪律），每批独立 commit 可单批回滚
- 按当量降序优先（>65 的先修）

### 2.2 三件套（每批必做）
1. **备份**: `.hermes/backup-title-S<批>-<ts>/`（原文件副本）
2. **回滚映射**: `.hermes/rollback-title-S<批>-<ts>.json`（逐点 before/after）
3. **探针清单**: `.hermes/probe-title-S<批>-<ts>.json`（受影响 URL）

### 2.3 修剪规则（顺序优先级）
1. **主词前置不动**（G1/T1 主词永远保）
2. **砍冗余长尾**（第 2 长尾 > 第 1 长尾优先砍）
3. **保数字钩子**（价格/MOQ/交期是 CTR 弹药）
4. **品牌末尾一次**（zh-hk=智印港 / en=ZprintPro / ja=ZprintPro）
5. **禁残词**（不在词中断，优先在 `|`/`・`/空格断）
6. **双品牌零容忍**（「智印港 ZprintPro」/「智印港 Z | 智印港」= P0）

### 2.4 排期（融入 9/17-10/8 Phase 1 窗口）
| 批 | 内容 | 窗口 |
|----|------|------|
| S3-a | ~~zh-hk 双品牌/残词 P0~~ | ✅ 已提前完成 (4b120b17) |
| S3-b1 | zh-hk 当量 >65（4 条非冻结） | 9/17 |
| S3-b2..b5 | zh-hk 59-65 当量（44 条，分 4 批） | 9/18-9/25 |
| S4-b1..b3 | en 25 条（含 E-commer 残词修复） | 9/26-10/2 |
| S5-b1..b6 | ja 58 条 | 10/3-10/8 |
| S6 | 全量复核 + 14 天 GSC 观察 | 10/9-10/23 |

### 2.5 S6 观察窗口登记（14 天 GSC）
> 触发: S3-a 已改动 4 条 title（3 双品牌 + 1 en 残词），自 push 4b120b17 (9/16 07:41) 起登记
> 观察项: 4 条受影响 URL 的 展现/点击/CTR/排名 + 品牌词「智印港」CTR（基线 10%）
> 落点: 下次 ZP-gsc-feedback lane (9/17 22:43) 首拉，登记至 9/30 终审
> 异常红线: 任一 URL CTR 骤降 >50% 或 pos 跌出前 20 → 按回滚映射回滚该条

## 3. 守卫验收（每批后必跑）
1. `node scripts/title-audit-v4.mjs` → 该批 0 条 TRIM/RED
2. 门童全量跑 → title 相关 0 命中（yellow 可容忍）
3. curl 线上 title → 当量 ≤58 + 无残词 + 品牌完整
4. `node scripts/verify-deploy.mjs` → build success

## 4. 观察与回滚
- 每批完成登记 14 天 GSC 观察（展现/点击/CTR/排名）
- 异常（CTR 骤降 / pos 崩）→ 按回滚映射单批回滚

## 数据来源（§0.23）

```
数据来源:
- K3 拍板: docs/2026-09-13-title-batch-T-freeze.md §6-3 (50-58 终裁) + docs/2026-09-13-k3-delegated-decisions.md #6 (blog 统一当量口径, 存量逐窗消化)
- 本方案: docs/2026-09-15-blog-title-length-research.md (K3 9/15 按推荐执行)
- 实证: scripts/title-audit-v4.mjs 全量审计 (580 条, 2026-09-15 新口径) + blog-posts.ts 86 篇三语言当量统计
- 代码: scripts/guards/title-equiv.js (唯一口径) + src/lib/seo.ts truncateTitleByEquiv
校准状态: SERP 像素为 Google 动态值 (550-600px), 50-58 当量为保守安全区; 无估算数字
```
