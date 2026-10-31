# 2026-10-31 带钱词 query×page 承接基线

> 数据源：`GSC数据/money-kw-query-page-2026-10-31.csv`（Search Console API 直取，维度 query×page，窗口 **2026-09-30..10-27**，与战略冻结基线同窗）。
> 口径：query 维度会省略低频匿名查询，本表合计 72 clk / 11,050 imp，**不可与 xlsx 全站总量（496 / 21,127）相加或混算**；本表只用于「同一查询里各 URL 的展示份额」比较。
> 承接集中度：主 URL 份额 ≥70% = concentrated；≤50% = split；其间 = mixed。**split 只是假设线索，不等于已证实内耗**（战略 §3.2/§3.3）。

| 市场 | 词簇 | 查询 | 展示 | 点击 | 均位(加权) | 承接URL数 | 主 URL | 主URL份额 | 判定 |
|---|---|---|---:|---:|---:|---:|---|---:|---|
| zh-hk | flyers | 宣傳單張 | 123 | 0 | 30.46 | 2 | `/zh-hk/category/flyers/` | 87% | concentrated |
| zh-hk | flyers | 宣傳單張印刷 | 128 | 0 | 34.62 | 4 | `/zh-hk/category/flyers/` | 77.3% | concentrated |
| zh-hk | stickers | 貼紙印刷 | 245 | 0 | 53.42 | 10 | `/zh-hk/category/stickers/` | 33.9% | split |
| zh-hk | stickers | 貼紙訂製 | 52 | 0 | 33.86 | 6 | `/zh-hk/blog/sticker-guide/` | 30.8% | split |
| zh-hk | books | 書刊印刷 | 202 | 0 | 44.36 | 4 | `/zh-hk/blog/book-buying-guide/` | 45.5% | split |
| zh-hk | books | 印書 | 148 | 0 | 42.87 | 7 | `/zh-hk/blog/book-buying-guide/` | 34.5% | split |
| zh-hk | posters | 海報印刷 | 567 | 1 | 34.01 | 10 | `/zh-hk/blog/poster-printing-guide/` | 37% | split |
| zh-hk | packaging | 紙盒印刷 | 73 | 0 | 41.99 | 3 | `/zh-hk/category/packaging/` | 57.5% | mixed |
| zh-hk | packaging | 包裝盒訂製 | 47 | 0 | 31.51 | 3 | `/zh-hk/category/packaging/` | 95.7% | concentrated |
| zh-hk | packaging | 包裝盒印刷 | 74 | 0 | 36.27 | 5 | `/zh-hk/category/packaging/` | 70.3% | concentrated |
| zh-hk | seasonal | 利是封印刷 | 69 | 1 | 18.57 | 4 | `/zh-hk/category/red-packets/` | 75.4% | concentrated |
| zh-hk | wedding | 喜帖印刷 | 15 | 0 | 16.13 | 2 | `/zh-hk/product/wedding-thank-you-cards/` | 73.3% | concentrated |
| zh-hk | education | 學校印刷 | 42 | 0 | 19.12 | 5 | `/zh-hk/blog/campus-education-printing-pillar-guide/` | 47.6% | split |
| en | stickers | small batch sticker printing | 46 | 0 | 5.5 | 1 | `/en/product/small-batch-stickers/` | 100% | concentrated |
| en | catalog | china catalog printing | 77 | 0 | 17.35 | 3 | `/en/product/catalog-printing/` | 72.7% | concentrated |
| ja | doujin | コミケ 印刷 | 174 | 0 | 19.23 | 2 | `/ja/product/doujinshi-printing/` | 94.3% | concentrated |
| ja | education | 教材 印刷製本 | 44 | 0 | 24.93 | 3 | `/ja/blog/textbook-printing-guide/` | 70.5% | concentrated |
| ja | education | 教科書印刷 | — | — | — | — | **本档无匹配** | — | 需补采复核 |

## 多 URL 分流明细（主 URL 份额 <70% 的词）

### 貼紙印刷（245 展示 / 主 URL 33.9%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/category/stickers/` | 83 | 33.9% | 0 | 39.41 |
| `/zh-hk/blog/sticker-guide/` | 66 | 26.9% | 0 | 55.64 |
| `/zh-hk/blog/sticker-buying-guide/` | 62 | 25.3% | 0 | 71.21 |
| `/zh-hk/product/small-batch-stickers/` | 15 | 6.1% | 0 | 50.07 |
| `/zh-hk/product/transparent-stickers/` | 10 | 4.1% | 0 | 61.4 |

### 貼紙訂製（52 展示 / 主 URL 30.8%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/blog/sticker-guide/` | 16 | 30.8% | 0 | 25.5 |
| `/zh-hk/blog/sticker-buying-guide/` | 15 | 28.8% | 0 | 43.6 |
| `/zh-hk/category/stickers/` | 13 | 25% | 0 | 36.46 |
| `/zh-hk/product/small-batch-stickers/` | 6 | 11.5% | 0 | 31.83 |
| `/zh-hk/product/removable-stickers/` | 1 | 1.9% | 0 | 11 |

### 書刊印刷（202 展示 / 主 URL 45.5%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/blog/book-buying-guide/` | 92 | 45.5% | 0 | 30.41 |
| `/zh-hk/category/books/` | 90 | 44.6% | 0 | 55.08 |
| `/zh-hk/product/catalog-printing/` | 10 | 5% | 0 | 77.1 |
| `/zh-hk/product/saddle-stitch-booklets/` | 10 | 5% | 0 | 43.4 |

### 印書（148 展示 / 主 URL 34.5%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/blog/book-buying-guide/` | 51 | 34.5% | 0 | 32.39 |
| `/zh-hk/category/books/` | 47 | 31.8% | 0 | 46.32 |
| `/zh-hk/product/catalog-printing/` | 41 | 27.7% | 0 | 49.12 |
| `/zh-hk/product/hardcover-books/` | 4 | 2.7% | 0 | 52.75 |
| `/zh-hk/product/textbooks/` | 3 | 2% | 0 | 73.33 |

### 海報印刷（567 展示 / 主 URL 37%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/blog/poster-printing-guide/` | 210 | 37% | 1 | 9.78 |
| `/zh-hk/product/a2-posters/` | 93 | 16.4% | 0 | 37.27 |
| `/zh-hk/category/posters/` | 64 | 11.3% | 0 | 61.72 |
| `/zh-hk/blog/retail-shop-poster-printing-guide/` | 60 | 10.6% | 0 | 65.95 |
| `/zh-hk/blog/poster-buying-guide/` | 55 | 9.7% | 0 | 65.75 |

### 紙盒印刷（73 展示 / 主 URL 57.5%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/category/packaging/` | 42 | 57.5% | 0 | 33.62 |
| `/zh-hk/product/kraft-paper-packaging-box/` | 23 | 31.5% | 0 | 52.13 |
| `/zh-hk/product/corrugated-boxes/` | 8 | 11% | 0 | 56.75 |

### 學校印刷（42 展示 / 主 URL 47.6%）

| 页面 | 展示 | 份额 | 点击 | 均位 |
|---|---:|---:|---:|---:|
| `/zh-hk/blog/campus-education-printing-pillar-guide/` | 20 | 47.6% | 0 | 6.7 |
| `/zh-hk/category/educational/` | 16 | 38.1% | 0 | 33 |
| `/zh-hk/product/school-flyers/` | 3 | 7.1% | 0 | 32 |
| `/zh-hk/blog/graduation-yearbook-printing-guide/` | 2 | 4.8% | 0 | 2 |
| `/zh-hk/product/folded-leaflets/` | 1 | 2.4% | 0 | 41 |


## 判读（2026-10-31 23:2x 补写）

### 1. 战略假设被实测修正的四处主 URL

| 词簇 | 战略假设主 URL | **实测 top URL（份额）** | 含义 |
|---|---|---|---|
| 書刊印刷／印書 | /zh-hk/category/books/ | **/zh-hk/blog/book-buying-guide/（45.5%／34.5%）** | 交易词由博客承接，category 未拿到；先修交易页，不是把博客升为主 URL |
| 海報印刷 | /zh-hk/category/posters/ | **/zh-hk/blog/poster-printing-guide/（37%）** | 567 展示分在 10 个 URL，guide 只占 37%，承接最散 |
| china catalog printing | /en/category/books/ | **/en/product/catalog-printing/（72.7%）** | 实测已集中，杠杆是 CTR 不是承接 |
| コミケ 印刷 | /ja/category/japan-doujin/ | **/ja/product/doujinshi-printing/（94.3%）** | 已高度集中，无需重建承接 |

### 2. 承接集中度分层（这决定下一步是修排名还是修承接）

- **concentrated（≥70%）→ 杠杆在排名/摘要/CTR**：宣傳單張 87%、宣傳單張印刷 77.3%、包裝盒訂製 95.7%、包裝盒印刷 70.3%、利是封 75.4%、喜帖 73.3%、small batch sticker printing 100%、china catalog 72.7%、コミケ 94.3%、教材 70.5%。
- **split（≤50%）→ 承接分散，先查同簇 URL 分工**：貼紙印刷 33.9%（**10 个 URL**）、貼紙訂製 30.8%、書刊印刷 45.5%、印書 34.5%、海報印刷 37%、學校印刷 47.6%。
- **mixed（50-70%）**：紙盒印刷 57.5%。

### 3. 两个直接可用的结论

1. **宣傳單張不存在承接问题**：category 已拿到 87%／77.3%，但均位 30.46／34.62、零点击 —— 这是排名与摘要问题，不是内耗。因此 flyer-printing-buying-guide 的定位应是「补采购决策信息 + 自然内链」，不应指望靠它解决排名。
2. **貼紙印刷是唯一「高展示 + 极低集中度」的组合**（245 展示、10 个 URL、top 仅 33.9%），与我 10-30 的貼紙诊断（价格三层不一致 / MOQ 同页多值）指向同一病因：页面信号不统一。

### 4. 待办与口径提醒

- **教科書印刷在本窗口 0 展示**（API 精确匹配亦为空），不能沿用旧报告 47.1 的位置当基线；列为补采词。
- **口径差异必须记住**：query×page 合计 11,050 展示，而 xlsx 全站 query 口径为 21,127 展示。差异来自 GSC query 维度省略低频匿名查询，**两者不可相加、不可混算**；本报告的份额只在 query×page 内部可比。
- 本证据已写入 .hermes/cron-prompts/blog-money-keyword-queue.json 的 query_page_evidence 字段（未改 status / primary_url），供 23:47 ZP-blog-deepfix 自然点火时读取。
