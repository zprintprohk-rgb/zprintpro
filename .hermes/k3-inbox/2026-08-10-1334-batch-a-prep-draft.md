# Batch A 6 项零依赖 grep 准备 + dry-run 报告 (明日 8/11 实施)

> **签发**: Mavis · 2026-08-10 13:34 Asia/Shanghai
> **来源**: K3 8/10 12:20 决策 3 "整合 push 拆 Batch A 明日合入"
> **实施时机**: 8/11 跟 paper-materials retrofit 合并 1 push
> **今日 0 push** (K3 13:34 拍板"已 3 push, 不再新增" - 实际 4 push, 但不再加)

---

## §1 Batch A 6 项具体 grep 定位

### §1.1 4 页面模板 `siteConfig.name` → `getSiteName(locale)` (7 处)

| 文件 | 行号 | 上下文 |
|---|---|---|
| src/app/[locale]/blog/[slug]/page.tsx | L817 | `siteName: siteConfig.name` (og:site_name 段) |
| src/app/[locale]/press-kit/page.tsx | L188 | `name: siteConfig.name` (Organization schema) |
| src/app/[locale]/case-studies/page.tsx | L357 | `name: siteConfig.name` (LocalBusiness schema) |
| src/app/[locale]/about/page.tsx | L253 | `name: siteConfig.name` (Organization schema) |
| src/app/[locale]/about/page.tsx | L263 | `worksFor: { ..., name: siteConfig.name }` (founder) |
| src/app/[locale]/about/page.tsx | L269 | `worksFor: { ..., name: siteConfig.name }` (Head of Prepress) |
| src/app/[locale]/about/page.tsx | L275 | `worksFor: { ..., name: siteConfig.name }` (Customer Service) |

**改动**: 全部 `siteConfig.name` → `getSiteNAP(locale).name` (per K3 8/10 13:34 决策文件 "helper 已存在")

**getSiteNAP 现状 (seo.ts L112-185)**:
- zh-hk: name='智印港' ✓ (L115)
- ja: name='智印港' (L141) ⚠️ 应该 = ジープリント
- en: name='ZprintPro' ✓ (L169)

**额外发现**: getSiteNAP ja.name 当前 = '智印港', 但 §0.15 + §13.16.1 ja brand = ジープリント. **getSiteNAP ja.name 也需要改**.

**修法** (2 个改字合并 Batch A):
1. 4 页面模板 7 处 siteConfig.name → getSiteNAP(locale).name
2. getSiteNAP L141 ja.name: '智印港' → 'ジープリント'

### §1.2 schema-extensions.ts 补 `sku: product.slug` (GMC)

**现状**: grep `sku` 0 命中. 需在 Product schema offers 段加 `sku: product.slug`.

**位置**: src/lib/seo/schema-extensions.ts (ItemList 内嵌 Product 段 L520-536 区域)

**修法**: 加 `sku: product.slug` 到 Product offers 段 (跟之前 117f9fc schema.ts L1104 sku 改动同 pattern, 但 schema-extensions.ts 是 PDP 实际渲染的)

### §1.3 AGENTS.md §0.20 4 条固化 + §0.15/0.16 段

**草稿位置**: `.hermes/k3-inbox/2026-08-10-1334-s0-20-4-lessons-draft.md` (6667 bytes, 4 条完整 + 段位 + 与 §0.10-0.19 关系表)

**写入 plan**: AGENTS.md 末尾新增 §0.20 段, 4 条完整 + cross-reference §0.10-0.19

### §1.4 删除 seo.ts L343-361 business-cards 死数据 (§11 强制)

**现状**: seo.ts L343-361 18 行 + 引用 lines, 但 sitemap 0 条 business-cards URL = 未渲染无线上风险

**§11 主营品类约束**: "绝对不要写名片/咭片/business cards/名刺 - 这不是 ZprintPro 的主营业务"

**修法**: 删 seo.ts L343-361 完整 18 行 (titles/keywords/descriptions × 3 locale) + 检查其他文件中是否还有 business-cards 引用 (grep 全树)

### §1.5 cron prompt v9.1 (working tree 已 M) + matrix.json v5 状态核对

**现状**:
- cron v9.1 68.0 KB 在 working tree (M 状态, 8/9 18:23 升级, 未 commit)
- matrix v5 322 KB 在 working tree (M 状态, 8/8 07:12 K3 拍板)
- 2 个文件 8/8 568087a commit 之后没 commit

**修法**: 状态核对 (v9.1 是否仍是最新版, v5 是否仍是最新版) + 攒批合入 1 push

### §1.6 llms.txt / llms-zh-hk.txt / llms-ja.txt siteName locale 化

**现状**:
- public/llms.txt: `# ZprintPro (智印港)` L1 (en 兜底, 缺 siteName 字段)
- public/llms-zh-hk.txt: `# 智印港 (香港) — AI 搜尋優化頁面` L1 (zh-hk 品牌词)
- public/llms-ja.txt: 已改 ジープリント (c48181b 改过)

**修法**: 3 llms.txt 文件统一 "siteName locale 化" - 顶部 brand 行 + 公司 brand 字段按 locale (zh-hk=智印港 / en=ZprintPro / ja=ジープリント)

**具体改字**:
- llms.txt (en): `# ZprintPro (智印港)` → `# ZprintPro` (en 单独)
- llms-zh-hk.txt: `# 智印港 (香港)` ✓ (zh-hk 正确)
- llms-ja.txt: 改 # ジープリント (c48181b 改过, 验证仍正确)

---

## §2 §0.7 production smoke 4 步 (实施时必跑)

| 步骤 | 标准 |
|---|---|
| 1. encoding (UTF-16/CRLF) | 0 警告 |
| 2. 简体字守门 (zh-hk.json) | 0 简体残留 |
| 3. npx tsc --noEmit | 0 新 TS error (20+ pre-existing 允许) |
| 4. npm run build | Compiled successfully + 600 URLs + IndexNow 3 locales |

---

## §3 台账 (实施时更新)

- 8/11 push: **1 effective push** (paper-materials retrofit + Batch A 攒批)
- 月累计: 13/150 (8/10 12/150 + 1 = 13/150)
- amend: 1/2 月上限 (不变)
- commit message: 标双内容 (retrofit + Batch A)

---

## §4 实施 6 步流程 (8/11 daily cron 触发时)

1. 读 paper-materials 现状 → retrofit 内容 (主菜, 类似 cmyk-guide)
2. 跑 Batch A 6 项改字:
   - 7 处 siteConfig.name + getSiteNAP ja.name 改
   - schema-extensions.ts 加 sku
   - AGENTS.md §0.20 4 条写入
   - 删 seo.ts L343-361 business-cards 死数据
   - cron v9.1 + matrix v5 核对攒批
   - llms.txt 3 locale siteName 化
3. §0.7 smoke 4 步
4. 1 commit + 1 push
5. verify-deploy PASS (CF build)
6. 报告 + matrix 标记 v8_ready

---

## §5 风险与止损

- ✅ §0.20 草稿已就位, Batch A 跑时直接复制到 AGENTS.md
- ✅ 6 项零依赖 grep 完毕, 改动定位明确
- ⏳ getSiteNAP ja.name 改 ジープリント 是额外发现 (K3 决策文件未提到), 实施时跟 K3 同步
- ⏳ §0.16 batch 1 残留清理 (5 alt 文本 "智印雲 ZprintPro · 智印港") 不在 Batch A 范围, 8/13 单独跑

EOF · .hermes/k3-inbox/2026-08-10-1334-batch-a-prep-draft.md
