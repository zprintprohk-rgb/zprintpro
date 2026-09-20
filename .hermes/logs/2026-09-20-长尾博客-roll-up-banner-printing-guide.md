# 交付摘要 — roll-up-banner-printing-guide (2026-09-20)

**车道**: zprintpro-daily-seo cron (18:30 启动) · **工作目录**: F:\zprintpro-nextjs · **分支**: main
**选题**: GSC 28d 香港站 `易拉架製作` — 66 imps / pos 68.6 / 0 clicks（无专属着陆页）
**词级证据三元组**: `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-18.xlsx` · [易拉架製作] · 66 imps · pos 68.6

---

## 1. commits

| commit | 时间 | 内容 | push |
|--------|------|------|------|
| `6c56a2cb` | 2026-09-20 18:37 | 正文 3 locale + blog-posts.ts 注册 + articleSlugs + sitemap 重建 (11 文件) | ✅ 已推 (`885d03d9..6c56a2cb`) |
| `f3287540` | 2026-09-20 18:42:58 | FAQ 补 `A: ` 前缀 → 激活 FAQPage schema (3 文件) | ⏳ 本地待推（§0.25 ≥30 min：锚点 = 上次 push `6c56a2cb` 2026-09-20 18:37:29 → 最早 19:07:29；后台任务定于 **19:08:00** 执行 push + verify） |

> 同批随 `6c56a2cb` 一并推送的还有并发会话的 1 个本地 commit `9330f96b` (docs(handover)+chore(tools))，属攒批范畴，未改动其内容。

## 2. 产物清单

| 文件 | 变更 |
|------|------|
| `src/data/blog-data/zh-hk.json` | +`roll-up-banner-printing-guide` (7,420 字) |
| `src/data/blog-data/en.json` | +同 slug (13,918 字符) |
| `src/data/blog-data/ja.json` | +同 slug (8,217 字符) |
| `src/data/blog-posts.ts` | +`lpRollUpBannerPrintingGuide` (categoryKey=`banners`, source=`daily`, date=2026-09-20) |
| `src/app/[locale]/blog/[slug]/page.tsx` | `articleSlugs` +1 |
| `public/sitemap*.xml` (6 文件) | 重建 — Blog 114 / 每 locale 247 URLs / 总 741 |

**title 半角当量** (`scripts/guards/title-equiv.js`, 目标区 50-57)：
- zh-hk 53 `易拉架印刷完全指南：尺寸・材質・報價 10 個起 | 智印港`
- en 54 `Roll-Up Banner Printing: 10 MOQ From HK$85 | ZprintPro`
- ja 56 `ロールアップバナー印刷 10セットから 屋外対応 | ZprintPro`

**五要件自检**（每 locale 独立达成）：3 快速答案块 / 3 `<table>` / 6 FAQ / 恰好 3 个 wa.me CTA / 唯一内链 11（4 PDP + 1 类目 + 3 blog + `/quote/` + about）
**硬性红线**：content 内嵌 JSON-LD = 0 · 三要素「低 MOQ・快樣品・透明工廠」齐 · 结尾作者团队 + 数据来源 div · 0 违禁数字（无 15 年 / 1,000+ / 海德堡 / ISO 9001 / FSC-C / 实体注册信息）

## 3. 门禁 (push 前实测)

| 检查 | 结果 |
|------|------|
| `node scripts/check-encoding.js --fix` | 全部 UTF-8 LF ✅ |
| `node scripts/guards/blog-data-integrity-guard.js` | JSON.parse + 控制字符 + mojibake + 键数 全过 ✅ |
| `node scripts/scan-simplified.mjs` | 0 简体字 ✅ |
| `npx tsc --noEmit` | **54 = 基线 54** ✅ |
| `node scripts/check-regression-guard.js --commit` | 🔴 **0** ✅（橙 507 / 黄 551 为存量 shadow） |
| pre-commit hook | 0 red / 0 orange / 0 yellow + DoD 通过 ✅ |
| 内链预检 | 26 条候选 URL curl 实测，全部 200（剔除 1 个 404 `/zh-hk/product/banners/` 与 1 个 301 `/about/`）✅ |

## 4. 6 步 verify（首轮 `6c56a2cb`，线上实测 18:41）

| 步 | 检查 | 结果 |
|----|------|------|
| 0 | `node scripts/verify-deploy.mjs` | **CF Pages: success** ✅ (`runs/106065086899`) |
| 1 | `/zh-hk/blog/SLUG/` | **200** ✅ |
| 2 | zh-hk 关键词命中 | 易拉架 ×14 / 易拉寶 ×8 ✅ |
| 3 | `/en/blog/SLUG/` + keyword | **200** · roll-up banner ×8 ✅ |
| 4 | `/ja/blog/SLUG/` + keyword | **200** · ロールアップバナー ×10 ✅ |
| 5 | `sitemap-zh-hk.xml` 含 slug | 5 命中 ✅ |
| 6 | Q1: / qa-answer / wa.me / table | Q1: 3/3 locale · `qa-answer` 各 4 · wa.me 9/8/8 · table 3 ✅ |

⚠️ **首轮发现的缺陷**：`FAQPage` JSON-LD = **0**（对照组 `packaging-box-pricing-2026` = 2）
- 根因：`extractFaqFromHtml` 正则要求 `</strong><br/>` 后有 `A[:：]`，首版正文缺前缀 → FAQ 静默丢失
- 修法：6 个 FAQ 段落补 `A: `（`f3287540`），离线以同源正则复算 → 3 locale 各 **6/6** 命中 `VERDICT=OK`
- 二次部署后需复核线上 FAQPage > 0（见 §6）

## 5. FAQ 修复断言明细 (f3287540)

- 6/6 FAQ 段落命中（每 locale）；`bg-amber-50`=3 · `wa.me`=3 · `<table>`=3 未受影响
- 无内嵌 script / JSON-LD；长度增量 = 6 × 3 = 18 字节（逐 locale 精确断言）
- `json.dump(ensure_ascii=False, indent=2)` round-trip 逐字比对；key 数不变（zh-hk 94 / en 95 / ja 94）

## 6. 待办

1. `f3287540` push 后线上复核 **FAQPage > 0**（3 locale）
2. **同根因外溢**：`folded-leaflet-printing-guide`（9/19 上线）线上 FAQPage 亦为 0；未越界修改，建议对应车道按同修法补齐
3. 7 天后（2026-09-27）GSC 收录复核 `易拉架` 相关 query
4. 下一轮选题建议：ja `コミケ 印刷` (93 imps / pos 29.8) → en `small batch label printing` (72 / 31.1)

---

**数据来源**：live curl 线上实测 (2026-09-20 18:41) · `scripts/verify-deploy.mjs` (CF check-runs API) · `scripts/guards/*` 7 项 · `python .hermes/tmp/_faqregex.js`(同源正则复算) · `scripts/generate-sitemap.js` stdout
**校准状态**：已校准（首轮 2026-09-20 18:41；FAQ 修复 18:43 离线复算，线上待二次部署）

---

## 8. 提交后复核 (post-commit verification, 2026-09-20 18:45–18:47)

对 **已提交的 shipped 状态**（HEAD `f3287540`）重跑全部可用闸门：

| 闸门 | 命令 | 结果 |
|------|------|------|
| 类型检查 | `npx tsc --noEmit` | **54** = 基线 54 ✅ 无新增 |
| 生产构建 | `npx next build` | **BUILD_EXIT=0** — `Compiled successfully` + `Linting and checking validity of types` 通过；路由 `/[locale]/blog/[slug]` 已在构建产物内 (341 B / 102 kB) ✅ |
| blog-data 严格校验 | `node scripts/guards/blog-data-integrity-guard.js` | 全过 ✅ |
| 繁体字 | `node scripts/scan-simplified.mjs` | 0 简体 ✅ |
| 反审门童 | `node scripts/check-regression-guard.js --commit` | 🔴 0 · 门童 #4 ★新增缺陷 **0** ✅ |
| 工作树洁净 | `git status --porcelain src/ public/` | **空**（构建未污染已提交的 sitemap）✅ |

**验证边界（诚实声明）**：
1. `npm run lint` (`next lint`) **不可用** —— 仓库**无任何 ESLint 配置**（无 `.eslintrc*` / `eslint.config.*`，`eslint` 亦不在 devDependencies），执行会进入 Next 的交互式初始化提示而挂起。**这是仓库既有状态，非本轮引入**；未擅自新建 ESLint 配置（超出任务范围）。
2. 上文 §4 的 CF Pages 生产构建 success（`runs/106065086899`）对应 `6c56a2cb`；`f3287540` 的 CF 构建将在 19:08 二次 push 后由后台任务验证并追加（§7）。
3. 本地 `next build` 与 CF Pages 构建**两者均通过**，故"构建验证"不依赖单一环境。

**复核结论**：shipped 状态在类型 / 构建 / 数据完整性 / 编码 / 门童 五个维度**全绿**；未决项仅剩 `f3287540` 的线上 FAQPage 复核（等二次部署）。

---

## 7. 二次部署复核 (延迟 push, 自动追加)

**二次 push**: 2026-09-20 19:11:59 · **commit**: `dba48bac` · `ahead-after-push=0` (0=已推) · **CF Pages**: SUCCESS

| locale | HTTP | FAQPage | Q1: | qa-answer |
|--------|------|---------|-----|-----------|
| zh-hk | 200 | 2 | 2 | 4 |
| en | 200 | 2 | 2 | 4 |
| ja | 200 | 2 | 2 | 4 |

> 判读: FAQPage > 0 = FAQPage JSON-LD 已由 page.tsx 自动生成 (修复生效); = 0 则修复未生效，需回查。

**数据来源**: live curl (2026-09-20 19:11) · `scripts/verify-deploy.mjs` (CF check-runs API)
