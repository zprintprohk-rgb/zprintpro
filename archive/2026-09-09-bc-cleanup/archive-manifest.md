# archive-manifest — 2026-09-09 名片清理归档（K3 拍板③）

> **拍板来源**: K3 9/9 三拍板 ③「根目录产物：归档到 archive/2026-09-09-bc-cleanup/，根目录只留活跃文件，生成 archive-manifest 索引，archive/ 保留 git 追踪」
> **归档原因**: 以下文件含 v22（7347c503）改名前的名片 SKU 产物数据/一次性审计产物，属 AGENTS.md §0.0 名片禁令兜底扫描（`scripts/check-bc-ban.mjs`）阻断命中的历史产物类；非线上活数据。
> **门童联动**: `archive/` 目录已加入门童扫描排除（SKIP_DIRS），归档文件不再触发阻断；如需审计直接读本目录。

## 归档清单（13 文件）

| # | 文件 | 原路径 | 扫描阻断命中 | 性质 | git 追踪 |
|---|------|--------|------------|------|---------|
| 1 | sitemap_check_sample.txt | public/ | 75 | 旧 sitemap 检查样本（含 6 名片 SKU quote URL） | git mv（原已追踪） |
| 2 | rename-by-time-report.json | 根目录 | 66 | 图片按时间改名一次性报告 | 原未追踪，物理归档 |
| 3 | rename-report.json | 根目录 | 37 | 图片改名一次性报告 | 原未追踪，物理归档 |
| 4 | seedream-tasks.json | 根目录 | 49 | v22 前 seedream 生图任务表（名片 SKU 时代） | 原未追踪，物理归档 |
| 5 | seedream-progress.json | 根目录 | 9 | seedream 生图进度 | 原未追踪，物理归档 |
| 6 | sku-list.json | 根目录 | 29 | 旧 SKU 图片清单（6 名片 SKU alt/seo 名） | 原未追踪，物理归档 |
| 7 | lighthouse-zh.json | 根目录 | 25 | 旧 lighthouse 审计快照（含咭片 alt 文本） | git mv（原已追踪） |
| 8 | image-generation-tasks.json | 根目录 | 15 | 生图任务表（名片 SKU 时代） | git mv（原已追踪） |
| 9 | image-generation-tasks-temp.json | 根目录 | 9 | 生图任务临时版 | git mv（原已追踪） |
| 10 | image-generation-tasks-v2.json | 根目录 | 6 | 生图任务 v2 | git mv（原已追踪） |
| 11 | image-audit-report.json | 根目录 | 12 | 图片审计报告 | 原未追踪，物理归档 |
| 12 | _before-en.json | 根目录 | 2 | 博客 en 改前快照 | 原未追踪，物理归档 |
| 13 | auto-rename-retry.js | 根目录 | 1 | 一次性改名重试脚本（含名刺正则） | 原未追踪，物理归档 |

## 活代码引用影响（已核查）

- `image-audit-report.json`：被 `scripts/generate-image-prompts.js` + `scripts/image-audit.js` 读取 — 两脚本均有 not-found 优雅降级（Warning + 空清单继续/退出），不炸构建。
- `image-generation-tasks.json`：被 `scripts/seedream-prompt-router.js` 读取（console.error 退出，优雅降级）+ `scripts/generate-image-prompts.js`（输出目标）。任务表本身是 v22 前名片 SKU 时代的存量 — 后续如重启生图管线，需按 v26 贺卡 SKU 新建任务表，不复用本归档。
- `src/` 对以上 13 文件 **0 引用**（grep 实测）；Next.js 构建/运行时不受影响。

## 数据来源（§0.23）

- 归档执行: 2026-09-09 `git mv` / `Move-Item` 实录（6 tracked + 7 untracked）
- 命中数: `node scripts/check-bc-ban.mjs` 2026-09-09 终跑分布（`.hermes/reports/bc-scan-2026-09-09.txt`）
- 拍板: K3 9/9 三拍板 ③（本轮对话原文）
- 引用核查: grep src/ + scripts/ 实测（src 0 引用；scripts 3 处引用均优雅降级）

## git 追踪补注（K3 ③「archive/ 保留 git 追踪」执行细节）

- 6 个文件原命中 .gitignore 规则（`*-report.json` ×3 / `seedream-tasks.json` / `sku-list.json` / `auto-rename*.js`）→ 已 `git add -f` 强制纳入追踪，保证未来可审计。
- `seedream-progress.json` / `_before-en.json` / `archive-manifest.md` 正常 add。
- git mv 追踪保持的 5 个: lighthouse-zh.json / image-generation-tasks{,-temp,-v2}.json / public/sitemap_check_sample.txt。
