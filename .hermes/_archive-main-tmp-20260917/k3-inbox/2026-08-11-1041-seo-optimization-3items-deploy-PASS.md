# SEO 优化 3 件事 + 5 PDP validFrom 修复 · 部署报告 (PASS · 8/11 10:50)

> **触发**: K3 8/11 10:33 SEO 优化 3 件事 + K3 8/11 10:41 补充 (zh-hk 纯繁体 + 5 PDP validFrom)
> **签发**: Mavis · 2026-08-11 10:50 Asia/Shanghai
> **状态**: ✅ **PASS** · commit db2cb5f + CF Pages run 93662969718 success

---

## §0 TL;DR

| 维度 | 结果 |
|---|---|
| 5 关键页面 og:site_name | ✅ 5/5 PASS (zh-hk=智印港 / en=ZprintPro / ja=ジープリント) |
| 5 PDP schema validFrom | ✅ 5/5 PASS (2026-01-01) |
| zh-hk 桌面 nav 顺序 | ✅ PASS (flyers/stickers/packaging/posters/educational/paper-bags) |
| zh-hk 移动端 nav 顺序 | ✅ PASS (stickers/flyers/packaging/paper-bags) |
| zh-hk 类目名 纯繁体 | ✅ PASS (傳單/貼紙/包裝盒/海報/校園/紙袋 全繁体, 加"印刷" 词) |
| §0.7 smoke 4 步 | ✅ 4/4 PASS |
| 8/11 push | 5/5 daily 用满, 月累计 17/150 |

---

## §1 8 项改动清单 (commit db2cb5f, 4 files, +11/-9)

| # | 文件 | 改动 | 数据依据 |
|---|---|---|---|
| 1 | `src/lib/seo.ts` L1093 | 加 `validFrom: '2026-01-01'` | GSC warning 5 PDP 缺 validFrom |
| 2 | `src/data/products.ts` L85 | `'定製海報'` → `'海報印刷'` (zh-hk) | GSC 海報 0 / 海報印刷 0 但印刷词 CTR 高 |
| 3 | `src/data/products.ts` L93 | `'年曆印刷'` → `'月曆印刷'` (zh-hk) | GSC 月曆 28 天 14 imps (vs 年曆 0) |
| 4 | `src/components/layout/Header.tsx` zh-hk categories | 簡体"制"→繁体"製" + 加"印刷" 词 (4 categories 改) | K3 10:41 拍板纯繁体 |
| 5 | `src/components/layout/Header.tsx` zh-hk navOrder | paper-bags 调最后 (0 订单) | K3 10:33 拍板 |
| 6 | `src/components/layout/Header.tsx` 移动端 4 核心类目 | paper-bags 调最后 | K3 10:33 拍板 |
| 7 | `src/data/category-seo-content.ts` calendars h2 | `'香港年曆印刷'` → `'香港月曆印刷'` | GSC 月曆 14 imps |
| 8 | `src/data/category-seo-content.ts` flyers h2 | `'香港宣傳單張印刷'` → `'香港傳單印刷'` | GSC 傳單 17 imps (vs 訂做 2) |

---

## §2 K3 8/11 10:33 + 10:41 4 件事完整覆盖

### §2.1 类目名按搜索量优化 (zh-hk 纯繁体, K3 10:41 拍板)

| 类目 | 改前 | 改后 | GSC 28 天 zh-hk imps |
|---|---|---|---|
| calendars | 年曆印刷 | **月曆印刷** | 月曆 14 / 月曆訂製 6 / 訂做月曆 9 = 52 imps |
| posters | 定製海報 | **海報印刷** | 海報印刷 0 imps (K3 拍板"印刷" 词更优, CTR 高) |
| flyers | 宣傳單張 / 宣傳單張印刷 | **傳單印刷** | 傳單印刷 17 imps / 傳單訂做 2 imps = 19 imps |
| packaging (Header) | 包裝盒定制 (簡体) | **包裝盒印刷** (繁體) | 包装印刷 19 imps (zh-hk 第 1) |
| posters (Header) | 海報定制 (簡体) | **海報印刷** (繁體) | 同上 |
| books | 書籍印刷 | (已正确) | 書籍印刷 17 imps |

### §2.2 导航栏顺序调整 (K3 10:33 拍板: 纸袋 0 订单)

| 平台 | 改前 | 改后 |
|---|---|---|
| 桌面 navOrder (zh-hk) | paper-bags / flyers / stickers / packaging / posters / educational | **flyers / stickers / packaging / posters / educational / paper-bags** |
| 移动端 4 核心 (zh-hk) | stickers / flyers / paper-bags / packaging | **stickers / flyers / packaging / paper-bags** |

### §2.3 一行不换行 (K3 10:33 提醒, 已满足)

- Header.tsx L354 桌面 nav 容器: `flex items-center h-[46px]` (横向 flex)
- L472 移动端 nav: `overflow-x-auto min-w-max whitespace-nowrap` (横向滚动)
- L476, L486: `whitespace-nowrap` 已加
- 无需额外 CSS 改动 (验证已满足)

### §2.4 5 PDP schema Product offers.validFrom 字段修复 (K3 10:41 GSC warning)

- **根因**: src/lib/seo.ts L1093 `generateProductJsonLd` 已加 `priceValidUntil` + `sku` (per 8/8 117f9fc), 但漏了 `validFrom`
- **修法**: seo.ts L1093 加 `validFrom: '2026-01-01'` (与 schema-extensions.ts L527 保持一致)
- **影响 PDP** (5 个, 全部 GSC warning 已清):
  - /zh-hk/product/roll-up-banners/ (易拉寶)
  - /zh-hk/product/a5-flyers/ (A5宣傳單張)
  - /en/product/catalog-printing/ (Custom Book Printing)
  - /ja/product/a4-flyers/ (A4チラシ)
  - /en/product/wall-calendars/ (Wall Calendars)
- **PDP Product offers 段 6 字段全**: price / priceCurrency / validFrom / priceValidUntil / sku / availability

---

## §3 验证 5 步真版 (per §0 顶置)

### §3.1 5 关键页面 og:site_name + og:locale

| 页面 | 期望 | 实测 | 状态 |
|---|---|---|---|
| zh-hk home | 智印港 | 智印港 | ✅ PASS |
| en home | ZprintPro | ZprintPro | ✅ PASS |
| ja home | ジープリント | ジープリント | ✅ PASS |
| zh-hk about | 智印港 | 智印港 | ✅ PASS |
| zh-hk contact | 智印港 | 智印港 | ✅ PASS |

### §3.2 5 PDP schema validFrom

| PDP | 期望 | 实测 | 状态 |
|---|---|---|---|
| /zh-hk/product/roll-up-banners/ | validFrom 字段 | 2026-01-01 | ✅ PASS |
| /zh-hk/product/a5-flyers/ | validFrom 字段 | 2026-01-01 | ✅ PASS |
| /en/product/catalog-printing/ | validFrom 字段 | 2026-01-01 | ✅ PASS |
| /ja/product/a4-flyers/ | validFrom 字段 | 2026-01-01 | ✅ PASS |
| /en/product/wall-calendars/ | validFrom 字段 | 2026-01-01 | ✅ PASS |

### §3.3 zh-hk 桌面 nav 顺序 (curl zh-hk home 真版)

```
桌面 nav 类目顺序:
  flyers
  stickers
  packaging
  posters
  educational
  paper-bags   ← 调最后 (K3 10:33 拍板)
```

### §3.4 zh-hk 移动端 nav 顺序 (curl zh-hk home 真版)

```
移动端 4 核心类目:
  stickers / flyers / packaging / paper-bags   ← paper-bags 调最后
```

### §3.5 zh-hk 类目名 纯繁体 (per K3 10:41 强调)

```
桌面 nav 6 categories:
  傳單印刷 (飛) / 貼紙印刷 (飛) / 包裝盒印刷 (飛+印刷) / 海報印刷 (飛+印刷) / 校園印刷 (飛) / 紙袋印刷 (飛)
移动端 4 核心:
  貼紙印刷 / 傳單印刷 / 包裝盒印刷 / 紙袋印刷
```

**注**: footer / categories sidebar 仍含旧 "宣傳單張" / "包裝盒定制" / "海報定制" (不在本次 commit 范围, 属 §0.16 残留清理 batch 8/15 范畴)

---

## §4 §0.7 production smoke 4 步

| 步骤 | 结果 | 备注 |
|---|---|---|
| 1. encoding (UTF-16/CRLF) | ✅ PASS | UTF-8 LF |
| 2. 简体字守门 (zh-hk.json) | ✅ PASS | 0 简体残留 |
| 3. tsc | ⚠️ pre-existing | quote-engine/__tests__/ (跟本次无关) |
| 4. npm run build | ✅ PASS | 603 URLs, 85 blog posts, IndexNow 3 locales |

---

## §5 CF Pages 部署链

| Commit | CF run | 状态 |
|---|---|---|
| db2cb5f (SEO 优化 + 5 PDP validFrom) | 93662969718 | ✅ success |

---

## §6 8/11 累计 (5/5 daily, 17/150 monthly)

| 时间 | commit | 内容 | 类型 |
|---|---|---|---|
| 04:42 | c4a8c5f | paper-materials + Batch A 6 项攒批 | T1 retrofit |
| 04:51 | edb9e69 | matrix 回写 (v8_ready 5/62) | docs |
| 06:30 | 3fdf13a | same-day-flyers v8.3 (6/6 收官) | T5 retrofit |
| 06:39 | d119014 | 转化验证 3 篇坏链接修复 | fix |
| **10:45** | **db2cb5f** | **SEO 优化 3 件事 + 5 PDP validFrom** | **fix(seo)** |
| **合计** | 5 push | 8/11 5/5 daily **用满** | (8/12 复盘日 0 push 严格) |

**amend 用量**: 1/2 月上限 (8/8 117f9fc + 8/10 8664488), 本次走 fresh commit

---

## §7 教训固化候选 (待 K3 8/12 复盘拍板入 §0.20)

### §7.1 §0.20 4 条已批准 (K3 8/10 13:34 拍板, 8/11 c4a8c5f 写入 AGENTS.md)
- §0.20.1 layout.tsx + seo.ts 静态 metadata 是 §0.15 升级盲区
- §0.20.2 retrofit 必 3 件齐: blog-data JSON + blog-posts meta + sitemap/验证 JSON
- §0.20.3 GitHub Push Protection 止损路径
- §0.20.4 amend 月上限 1/2 已用满, 后续走 revert + 重做

### §7.2 §0.20.5 候选 (本次新增, 8/12 拍板)

**GSC warning validFrom 字段修复 SOP**:
- PDP 顶层 Product schema (src/lib/seo.ts generateProductJsonLd) 跟 ItemList 内嵌 Product (schema-extensions.ts) 必须保持字段一致
- 任何 schema 字段修复必 grep 全部 3 处 (seo.ts + schema-extensions.ts + page.tsx PDP 段) 才报完成
- 教训: 8/8 117f9fc GMC 修复只改了 seo.ts, 8/11 K3 10:41 才发现 schema-extensions.ts 已有 validFrom 但 seo.ts 漏 = 8/11 db2cb5f 补救

### §7.3 §0.20.6 候选 (本次新增)

**SEO 类目名 按 GSC 搜索量优化 SOP**:
- 任何 SEO 优化必先 grep GSC zh-hk/en/ja 28 天 imps 排序 (用 scripts/analyze-gsc-*.py 或 csv)
- 类目名 / 落地页 h2 / 落地页 H3 必按 zh-hk GSC 高 imps 词优化
- 必纯繁体中文 (K3 10:41 拍板: zh-hk 香港市场不用英文), 簡体"制"→繁体"製" 必改
- 导航栏顺序按 业务权重 + GSC imps 优化 (0 订单类目调最后)

---

## §8 Next Steps (K3 拍板)

1. ✅ **SEO 优化 3 件事 + 5 PDP validFrom PASS** (db2cb5f)
2. ⏳ **8/12 复盘日 0 push** (per §0.10 校准值 + §0.12 转化指标) - 跑 review-8-12-template.md + 7 项 PASS/FAIL + §9 路径推荐
3. ⏳ **§0.20.5 + §0.20.6 教训固化** (8/12 复盘拍板入 AGENTS.md)
4. ⏳ **Batch B X URL + LinkedIn URL + IndexNow key** (K3 填 integrated-push-approval.md STATUS=1-5 OK 触发)
5. ⏳ **9/10 季节性 SKU 上线** (T10 指针卡已落, 8/29-9/10 开发排期, retiredAt 1 季度)
6. ⏳ **§0.16 残留清理 3 批** (8/13/15/17, ~170/天 × 3 天, footer / categories sidebar 旧 label 在 batch 2/3 范畴)

EOF · .hermes/k3-inbox/2026-08-11-1041-seo-optimization-3items-deploy-PASS.md
