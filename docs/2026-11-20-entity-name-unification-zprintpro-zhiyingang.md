# 实体对外统一名 ZprintPro智印港 · 执行记录（K3 2026-11-20 指令）

> 指令原文：「这些要全部变成 ZprintPro智印港」（针对 11-20 实体面盘点：AI 概覽品牌标签 / Kompass 目录 / GBP 档案 / llms / 站内实体写法）
> 执行：autoclaw 人手会话（11-20 20:0x–20:3x）· commit `5d78f8ae` · 15 文件 · 门童 5 道 0 red
> 规则固化：AGENTS.md [§0.39](<AGENTS.md#text=实体对外统一名 ZprintPro智印港>)（K3 拍板，跨会话强制级）

## 1. 一句话

「智印云/智印雲」在**我方全部 live 表面已归零**（public 7 文件 + 4 份 llms + 生成器源头），门禁已按 K3 拍板加入实体名豁免（旧双品牌仍拦）；剩余两处为 **K3 对外手动项**（Kompass 两处条目、GBP 档案核对）。

## 2. 已改清单（15 文件，全部已提交）

| # | 文件 | 改动 |
|---|---|---|
| 1 | `public/manifest.json` | PWA `name` / `short_name` → **ZprintPro智印港**；`description` 前缀同步 |
| 2 | `public/images/logo.svg` | 字标 `<text>` 智印云 → **智印港**（svg 内已含 ZPrintPro 字标，避免同图重复；组合视觉读作 ZprintPro智印港） |
| 3 | `public/images/logo-dark.svg` | 同上 |
| 4-7 | `public/images/blog/blog-company-intro-zh-hk{,-2,-4,-5}.meta.json` | `alt.zh-hk` / `title.zh-hk`：智印云印刷公司簡介 → **ZprintPro智印港印刷公司簡介** |
| 8 | `public/llms.txt` | H1 `# ZprintPro / 智印港` → `# ZprintPro智印港` |
| 9-11 | `public/llms-en/ja/zh-hk.txt` | H1 前缀统一为 **ZprintPro智印港**（保留 (English)/(ジープリント)/(香港) 定位后缀） |
| 12 | `scripts/llms-root-header.md` | llms.txt 头部生成源同步 |
| 13 | `scripts/gen-llms.ts` | 三语 header 模板（L99/155/211）同步（防下次 regen 回退） |
| 14 | `scripts/guards/brand-guard.js` | **ENTITY_NAME 豁免**（扫描前掩码 `ZprintPro智印港`，与 2026-09-13「智印港（ZprintPro）」括注豁免同机制）；旧双品牌仍由 BRAND_DOUBLE 拦截 |
| 15 | `AGENTS.md` | 新增 [§0.39 实体对外统一名](<AGENTS.md#text=实体对外统一名 ZprintPro智印港>)（K3 拍板固化 + 范围边界 + 门禁配套 + 落地记录） |

## 3. 门禁自测（打补丁后实测）

| 用例 | 结果 |
|---|---|
| `智印港 ZprintPro`（旧双品牌，带空格） | **1 hit BRAND_DOUBLE**（仍拦 ✓） |
| `实体名 ZprintPro智印港`（新统一名） | **0 hit**（豁免生效 ✓） |
| 提交时 5 道门童 | 0 red / 0 orange / 0 yellow ✓ |

## 4. 不在本批（明确边界）

1. **站内 locale 营销文案**（title/desc/正文）：维持 §13.16 v2 单品牌分层（zh-hk=智印港 / en,ja=ZprintPro）——K3 指令针对实体标识面，未扩到全站文案；若 K3 要求全站统一，另行拍板（会触发 title 当量/CTR 连带影响）。
2. **Organization schema 实体名**（`src/lib/seo.ts` 走 locale `brandName`）：改 `ZprintPro智印港` 会同时影响 en/ja 的 schema 实体信号，且属 src 域 → 列为**待批批次项**（门禁已备好豁免，改动本身与 title/价格裁决同批）。
3. **llms 全量 regen**：现有 llms 文件数据日为 2026-09-21（products.ts 之后有大量真值修复），全量重跑会带入未复核的数据漂移 → 本批只统一头部（源头已同步），全量 regen 另立批次（需 diff 审查）。

## 5. 待 K3 对外手动（AI 品牌标签的根因源）

| # | 目标 | 操作 | 建议写法 |
|---|---|---|---|
| 1 | **Kompass 两处条目**（`hk.kompass.com` / `lu.kompass.com` 现「智印雲Zprintpro · 九龍」） | 登录目录后台改条目（或认领） | 名称 **ZprintPro智印港**；地址按现行 NAP 核对 |
| 2 | **GBP 商家档案**（面板显示旧九龙新蒲岗地址 + 5905 1334 电话） | 核对并更新为现行主体/联系方式（与 §13.10 口径一致） | 名称 **ZprintPro智印港** |
| 3 | （可选）88DB 等其它旧目录 | 抽查后同法处理 | 同上 |

## 6. 证据链

- commit `5d78f8ae`（15 files, +49/−20）；`check-encoding`：All 13 checked files UTF-8 LF ✓
- public 残留扫描：`rg -c "智印云|智印雲" public` → **0 hits**
- 复测方法：改后 `node scripts/guards/brand-guard.js` 级自测（上表）；推送后按部署验收（verify-deploy + curl manifest/llms）
- 与 11-20 S2 探针发现衔接：[finding 简报](<.hermes/geo/2026-11-20-s2-partial-finding-brand-entity.md>)（AI 概覽旧名标签 → Kompass/GBP 根因）
- 校准状态：已校准（源=当前工作树；live 待本次 push 部署后复验）
