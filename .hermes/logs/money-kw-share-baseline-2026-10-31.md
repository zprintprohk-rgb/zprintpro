# 17 带钱查询 · 主 URL 展示份额基线（2026-10-31 query×page 联接）

> 依据：`2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md` §2.2 / §6 / §8（承接层 KPI：主 URL 展示份额、URL 轮换次数）
> 数据：`GSC数据/money-kw-query-page-2026-10-31.csv`（1,870 行）+ `GSC数据/money-kw-query-page-country-2026-10-31.csv`（2,159 行），2026-10-31 导出
> 口径：仅**精确查询**；包含匹配另列。份额 = 该 URL 展示 ÷ 该查询在 query×page 表的全部展示。

| 查询 | 指定主 URL | 实际第一 URL | 份额 | URL 数 | 第二 URL | 判定 |
|---|---|---|---:|---:|---|---|
| 宣傳單張 | /zh-hk/category/flyers/ | /zh-hk/category/flyers/ | 87% | 2 | /zh-hk/product/a4-flyers/ 13% | ✅ 与指定一致 |
| 宣傳單張印刷 | /zh-hk/category/flyers/ | /zh-hk/category/flyers/ | 77% | 4 | /zh-hk/product/a4-flyers/ 16% | ✅ 与指定一致 |
| 貼紙印刷 | /zh-hk/category/stickers/ | /zh-hk/category/stickers/ | 34% | 10 | /zh-hk/blog/sticker-guide/ 27% | ⚠️ 一致但份额低 |
| 貼紙訂製 | /zh-hk/category/stickers/ | /zh-hk/blog/sticker-guide/ | 31% | 6 | /zh-hk/blog/sticker-buying-guide/ 29% | ❌ 与指定不一致 |
| 書刊印刷 | /zh-hk/category/books/ | /zh-hk/blog/book-buying-guide/ | 46% | 4 | /zh-hk/category/books/ 45% | ❌ 与指定不一致 |
| 印書 | /zh-hk/category/books/ | /zh-hk/blog/book-buying-guide/ | 34% | 7 | /zh-hk/category/books/ 32% | ❌ 与指定不一致 |
| 海報印刷 | /zh-hk/category/posters/ | /zh-hk/blog/poster-printing-guide/ | 37% | 10 | /zh-hk/product/a2-posters/ 16% | ❌ 与指定不一致 |
| 紙盒印刷 | /zh-hk/category/packaging/ | /zh-hk/category/packaging/ | 58% | 3 | /zh-hk/product/kraft-paper-packaging-box/ 32% | ⚠️ 一致但份额低 |
| 包裝盒訂製 | /zh-hk/category/packaging/ | /zh-hk/category/packaging/ | 96% | 3 | /zh-hk/product/cosmetic-boxes/ 2% | ✅ 与指定一致 |
| 包裝盒印刷 | /zh-hk/category/packaging/ | /zh-hk/category/packaging/ | 70% | 5 | /zh-hk/product/kraft-paper-packaging-box/ 24% | ✅ 与指定一致 |
| 利是封印刷 | — | /zh-hk/category/red-packets/ | 75% | 4 | /zh-hk/blog/cny-2027-red-packet-printing-guide/ 13% | 待定（战略未指定） |
| 喜帖印刷 | — | /zh-hk/product/wedding-thank-you-cards/ | 73% | 2 | /zh-hk/category/wedding-invitations/ 27% | 待定（战略未指定） |
| 學校印刷 | /zh-hk/category/educational/ | /zh-hk/blog/campus-education-printing-pillar-guide/ | 48% | 5 | /zh-hk/category/educational/ 38% | ❌ 与指定不一致 |
| small batch sticker printing | /en/category/stickers/ | /en/product/small-batch-stickers/ | 100% | 1 | — | ❌ 与指定不一致 |
| china catalog printing | /en/category/books/ | /en/product/catalog-printing/ | 73% | 3 | /en/blog/catalog-printing-china-supplier-guide/ 26% | ❌ 与指定不一致 |
| コミケ 印刷 | /ja/category/japan-doujin/ | /ja/product/doujinshi-printing/ | 94% | 2 | /ja/blog/comiket-printing-prep-guide/ 6% | ❌ 与指定不一致 |
| 教材 印刷製本 | /ja/category/educational/ | /ja/blog/textbook-printing-guide/ | 70% | 3 | /ja/product/textbooks/ 27% | ❌ 与指定不一致 |

## 判读要点

- 与战略指定主 URL **不一致**：9 个 —— 貼紙訂製、書刊印刷、印書、海報印刷、學校印刷、small batch sticker printing、china catalog printing、コミケ 印刷、教材 印刷製本
- 一致但份额 <60%：2 个 —— 貼紙印刷、紙盒印刷
- 本档无精确匹配：0 个 —— 无
- 「不一致」不等于内耗：需再看该 URL 是否长期稳定承接（28 天趋势）与是否多页长期分流；本基线只给一次快照。
