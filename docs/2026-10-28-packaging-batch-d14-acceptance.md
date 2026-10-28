# D14 技术验收报告（D11-D13 + P2 批）

> 日期：2026-10-28 · 验收范围：D11-D12 rigid / D13 内链 / P2-ASSET-01 内容层 / bannerCaps 清毒

## 0. 数据来源行（§0.23）

- sitemap：`public/sitemap-{zh-hk,en,ja}.xml`（各 242 URL，2026-10-28 本地核验）
- 链接 200：线上探针 probe-d1112-d13.mjs（2026-10-28，CF build 122594898990 success 后）
- 门禁：title-v5 HARD=7（存量）/ tsc 54=54 / brand 0 / gsc 0（每批 commit 前复跑）

## 一、验收清单

| 项 | 结果 |
|---|---|
| sitemap 覆盖（kraft/food/rigid/electronics 三语各归其 sitemap） | ✅ |
| en category 内链 electronics PDP（21 处渲染） | ✅ 200 |
| ja category 内链 貼り箱/food PDP（21 处） | ✅ 200 |
| zh category 内链 kraft PDP（21 处） | ✅ 200 |
| rigid ja 貼り箱 title/术语段（上製本箱=0） | ✅ |
| en/ja bannerCaps Instant AI Quote/AI見積もり30秒 | ⏳ 待 build 122605502856 |
| kraft/mailer/food 印前·QC·尺寸 段渲染 | ⏳ 待 build 122605502856 |
| 免費樣品對比=0 全站（本地 src 已 0，线上待终验） | ⏳ 待 build 122605502856 |

## 二、验收结论

- D11-D12 / D13 技术验收 ✅（sitemap + 链接 200 + 渲染，build 122594898990）
- P2 批终验进行中（build 122605502856）

## 三、关联批报告

- D11-D12：`docs/2026-10-28-packaging-batch-d11d12-report.md`
- D13：`docs/2026-10-28-packaging-batch-d13-report.md`
- P2-ASSET-01：`docs/2026-10-28-packaging-batch-p2asset-report.md`
- P2-CONSOL-01 决策包：`docs/2026-10-28-packaging-batch-p2consol-decision.md`
