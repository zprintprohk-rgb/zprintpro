# 2026-09-19 长尾博客交付摘要 — folded-leaflet-printing-guide

**VERDICT**: SHIPPED_LOCAL_PENDING_PUSH (commit 已落, push 因 §0.25 30min 窗口后台排程)
**CONSUMED**: `.hermes/logs/2026-09-19-SEO-巡检清单.md` + `.hermes/logs/2026-09-19-GSC-关键词方案.md` + `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-18.xlsx`
**DELIVERED**: `folded-leaflet-printing-guide` × 3 locale (zh-hk / en / ja)
**NEXT**: push 完成后跑 6 步 verify (后台 log); 下周期候选 = 食品包裝印刷 (pos 6.7) / a6 尺寸 (pos 8.9) CTR 修复

## 一、交付物

| 项 | 值 |
|----|-----|
| slug | `folded-leaflet-printing-guide` |
| commit | **776afc93** (2026-09-19 18:38:51 +0800) |
| 前一笔 (并发会话) | 47f4112a docs(etsy) §7 交付报告 (18:31:05, **非本车道所写**) |
| push 状态 | ⏳ 后台排程 19:01:00 (上次 push 18:30:18 + 30 min 硬下限), 脚本 `.hermes/_tmp_deferred_push_foldedleaflet.sh` |
| push 日志 | `.hermes/logs/2026-09-19-deferred-push-folded-leaflet.log` |
| 篇目计数 | blog-data zh-hk 92→93 / en 93→94 / ja 92→93; sitemap 每 locale 244→246 |

## 二、选题依据 (词级证据)

| 词 | imps | pos | clicks | 源 |
|----|------|-----|--------|-----|
| 摺頁印刷 | 51 | 36.2 | 0 | GSC 28d 2026-09-18 |
| 摺頁傳單 | 28 | 25.1 | 0 | GSC 28d 2026-09-18 |

合计 79 imps, 落在 cron 选题区 (imps>50, pos 20-80)。三筛选全过 (GSC 实证 / T1 采购意图「印刷」「傳單」/ 同簇 = L1 宣传单张 pillar)。全站 113 篇 blog 无「摺頁」专属篇 (仅 5 篇零星提及 41 处)。

## 三、内容硬指标 (3 locale 逐项实测)

| 指标 | zh-hk | en | ja |
|------|-------|----|----|
| 正文字符数 | 7,331 | 13,364 | 8,456 |
| 快速答案块 | 3 | 3 | 3 |
| `<table>` | 3 | 3 | 3 |
| FAQ (`<strong>Qn`) | 5 | 5 | 5 |
| wa.me CTA | 3 | 3 | 3 |
| 唯一内链 | 13 | 13 | 13 |
| `<img>` | 0 | 0 | 0 |
| 内嵌 JSON-LD | 0 | 0 | 0 |
| 标题半角当量 | 57 (OK) | 55 (OK) | 58 (OK) |
| 低 MOQ・快樣品・透明工廠 三要素 | ✅ | ✅ (low minimum / fast samples / transparent factory) | ✅ |
| 作者团队 + 数据来源 div | ✅ | ✅ | ✅ |

内链目标 (13 个) 全部经 sitemap 3 语核对 + 线上 `/quote/` curl 200 抽验: `product/folded-leaflets` · `product/a4-flyers` · `product/double-sided-flyers` · `product/thick-paper-flyers` · `product/pvc-menus` · `category/flyers` · `category/posters` · `blog/flyer-printing-guide` · `blog/flyer-sizes-compared` · `blog/a5-vs-a6-flyer-size` · `blog/menu-buying-guide` · `blog/poster-size-guide` · `about`。

## 四、价格口径 (全部取自结构化字段, 零编造)

`src/data/products.ts` FL-004 摺疊傳單: 10 张起印 · HK$0.70-1.95/张 · 157g/200g 铜版纸 · A4 展开 或 DL · 压线+覆膜(哑膜/光膜) · 3-5 工作天。
对比: FL-001 A4 传单 HK$0.35-0.95 · FL-003 双面传单 HK$0.40-0.95 · FL-005 厚纸传单 HK$0.45-1.20 (均 10 张起印)。
数量阶梯 (产品页配置器): 100 张原价 / 500 张 8 折 / 1,000 张 65 折 / 5,000 张 5 折。

## 五、门禁实测 (push 前 5 件)

| 门禁 | 结果 |
|------|------|
| check-encoding | ✅ 10/10 staged UTF-8 LF |
| blog-data-integrity-guard | ✅ 3 JSON 严格校验全过 |
| scan-simplified | ✅ 0 简体残留 |
| npx tsc --noEmit | 54 = 基线 54 |
| check-regression-guard --commit | 🔴 0 |
| pre-commit hook (实跑) | ✅ 反审门童 v1 全过 + DoD 通过 |

## 六、安全写入 (三件套 §12)

- **备份**: `.hermes/_bak-folded-leaflet-20260919/` (5 个目标文件 + 3 个内容源文件)
- **计数断言**: 每 locale JSON 键数 92→93 / 93→94 / 92→93, 键序不变
- **形状断言**: 3 QA 块 / 3 表 / 5 FAQ / 3 CTA / ≥7 内链 / 0 img / 0 markdown-link 语法 / 0 GSC 黑话; en 正文 0 CJK
- **改写不变性断言**: 写入后重读, 逐键比对 — **所有既有条目字节级未变** (zh-hk 92/92、en 93/93、ja 92/92 全过)
- **JSON 往返**: 改写前先做 byte-identical 往返测试 (zh-hk/en/ja 三份均通过), 仅在确认格式无损后才写盘

## 七、需 K3 / 值班会话知悉

1. **本 commit 带上 page.tsx 一行非本次范围改动**: `FSC certified` → `FSC-certified` (17:54 术语波的既有未提交改动), 已逐行核对并在 commit message 披露 (§0.25.10.3)。
2. **工作区仍有 13 个他人未提交文件** (about/page.tsx、service-areas、ProductTabs、buying-guides.ts、category-seo-content.ts 等, mtime 17:54:16), 本车道**未触碰、未提交**, 请当值会话自行收口。
3. **sitemap 自动补登 Etsy 篇至 3 语**: generator 把 `etsy-seller-printing-guide` 写入 zh-hk/en/ja 三份 sitemap (该篇仅 en 有正文)。三语 URL 实测均 200, 非 404; 但 zh-hk/ja 为薄页, 建议补正文或回落。
4. **§0.25 提交时点**: 本车道巡检期有另一会话 18:31 提交 (47f4112a), 无锁竞争; 本车道按规则让位并延后 push。

数据来源: `GSC数据/28天三站点汇总数据zprintpro.com-Performance-on-Search-2026-09-18.xlsx` (校准日期 2026-09-19) · `src/data/products.ts` FL-001·FL-003·FL-004·FL-005 结构化区 · `public/sitemap-*.xml` (2026-09-19 18:3x 重建) · 门禁命令实测输出 (2026-09-19 18:33–18:38)。
