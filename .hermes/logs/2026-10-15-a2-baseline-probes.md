# A2 基线回归探针 — 2026-10-15（middleware/路由面治理批次 · 变更前基线）

- 目标: https://zprintpro.com · 方法: GET (curl.exe) · UA: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36`
- 串行执行, 请求间隔 420ms · 单请求 --max-time 15s · 重定向类与核心页另发 HEAD (-sI) 取 location
- 重定向类与 5xx 项重复 2 次 (共 3 次) 验证确定性 · 样本 37 条 · 实发 HTTP 请求 143 个
- 生成时间: 2026-10-15 12:47:50 本地时间 · 复跑命令（部署后对比请用同一脚本与 UA）: `node .hermes/tmp/a2-baseline-probe.mjs`
- 局限: 仅状态码/头/时延层探测; 正文仅 /quote-desk/ 与 /api/search 落盘抽查; /個から 以百分号编码发送; /{locale}/product/stickers 为字面占位符探针
- 本探针只读: 未修改任何仓库源文件, 未执行任何 git commit/push

## 摘要

- 状态分布: 2xx=14 · 3xx=20 · 4xx=0 · 5xx=3 · curl-error=0

### 5xx
- `/ja/` → **503**
- `/wp-login.php` → **500**
- `/zh-hk/product/nonexistent-probe-a2/` → **503**

### 多跳重定向链 (>1 跳)
- `/` → 2 跳 → 终态 200 @ `/zh-hk/`
- `/quote` → 2 跳 → 终态 200 @ `/zh-hk/quote/`
- `/zh-hk/quote?product=foil-stickers` → 2 跳 → 终态 200 @ `/zh-hk/product/foil-stickers/`
- `/{locale}/product/stickers` → 2 跳 → 终态 404 @ `/zh-hk/locale/product/stickers/`
- `/個から` → 2 跳 → 终态 404 @ `/zh-hk/%E5%80%8B%E3%81%8B%E3%82%89/`
- `/zh-hk/product/premium-business-cards/` → 2 跳 → 终态 200 @ `/zh-hk/product/premium-greeting-cards/`
- `/zh-hk/category/business-cards/` → 2 跳 → 终态 503 @ `/zh-hk/category/greeting-cards/`
- `/zh-hk/product/gift-boxes/` → 2 跳 → 终态 200 @ `/zh-hk/product/rigid-boxes/`

### next.config-301 样本中未按预期重定向的项
- 无 (11/11 均为 3xx 重定向)

### 确定性存疑项 (3 次结果不一致)
- `/`
- `/ja/`
- `/zh-hk/product/drink-tokens/`
- `/zh-hk/product/nonexistent-probe-a2/`

### /quote-desk/ 实测
- 状态=200 · redirect=无 · HEAD location=无 · 终态=-
- 正文 4730 B · title="Quote Desk — Internal Tool"
- 登录信号: 未检出 (password 输入框 / login·sign in 字样 / 中文后台词 均无)
- 初步判定: 疑似公开可访问 (未检出登录墙信号; 仅为状态与文本信号层判断)

## 探针明细表

| # | 类别 | URL | 状态 | redirect | 耗时s | 下载B | 备注 |
|---|------|-----|-----:|----------|------:|------:|------|
| 1 | core | `/` | 301 | `https://zprintpro.com/zh-hk` | 1.56 | - | NON-DETERMINISTIC(3x); terminal=200 @ /zh-hk/ · chain=301→308→200 · repeats=503/503 |
| 2 | core | `/zh-hk/` | 200 | - | 2.58 | 230282 | - |
| 3 | core | `/en/` | 200 | - | 3.41 | 227140 | - |
| 4 | core | `/ja/` | 503 | - | 0.62 | 17 | NON-DETERMINISTIC(3x) · repeats=200/200 |
| 5 | core | `/zh-hk/category/stickers/` | 200 | - | 2.25 | 365010 | - |
| 6 | core | `/zh-hk/product/roll-up-banners/` | 200 | - | 2.11 | 191744 | - |
| 7 | core | `/zh-hk/blog/` | 200 | - | 2.04 | 322536 | - |
| 8 | core | `/zh-hk/quote/` | 200 | - | 1.81 | 53237 | - |
| 9 | core | `/zh-hk/cart/` | 200 | - | 1.44 | 54217 | - |
| 10 | core | `/quote-desk/` | 200 | - | 1.09 | 4736 | qd-markers=none,title=Quote Desk — Internal Tool |
| 11 | core | `/zh-hk/help-center/` | 200 | - | 1.31 | 87968 | - |
| 12 | middleware | `/about/` | 301 | `https://zprintpro.com/zh-hk/about/` | 0.66 | - | deterministic(3x); terminal=200 @ /zh-hk/about/ · chain=301→200 · repeats=301/301 |
| 13 | middleware | `/zh-HK/` | 301 | `https://zprintpro.com/zh-hk/` | 0.84 | - | deterministic(3x); terminal=200 @ /zh-hk/ · chain=301→200 · repeats=301/301 |
| 14 | middleware | `/quote` | 308 | `https://zprintpro.com/quote/` | 0.65 | - | deterministic(3x); terminal=200 @ /zh-hk/quote/ · chain=308→301→200 · HEAD-loc=/quote/ · repeats=308/308 |
| 15 | middleware | `/zh-hk/quote?product=foil-stickers` | 308 | `https://zprintpro.com/zh-hk/quote/?product=foil-stickers` | 0.62 | - | deterministic(3x); terminal=200 @ /zh-hk/product/foil-stickers/ · chain=308→301→200 · HEAD-loc=/zh-hk/quote/?product=foil-stickers · repeats=308/308 |
| 16 | middleware | `/zh-hk/product/drink-tokens/` | 301 | `https://zprintpro.com/zh-hk/product/premium-greeting-cards/` | 0.68 | - | NON-DETERMINISTIC(3x); terminal=200 @ /zh-hk/product/premium-greeting-cards/ · chain=301→200 · repeats=503/301 |
| 17 | middleware | `/{locale}/product/stickers` | 308 | `https://zprintpro.com/locale/product/stickers/` | 0.61 | - | literal-placeholder-probe; deterministic(3x); terminal=404 @ /zh-hk/locale/product/stickers/ · chain=308→301→404 · HEAD-loc=/locale/product/stickers/ · repeats=308/308 |
| 18 | middleware | `/個から` | 308 | `https://zprintpro.com/%E5%80%8B%E3%81%8B%E3%82%89/` | 0.78 | - | sent-percent-encoded; deterministic(3x); terminal=404 @ /zh-hk/%E5%80%8B%E3%81%8B%E3%82%89/ · chain=308→301→404 · HEAD-loc=/%E5%80%8B%E3%81%8B%E3%82%89/ · repeats=308/308 |
| 19 | middleware | `/wp-login.php` | 500 | - | 1.23 | 11212 | deterministic(3x) · repeats=500/500 |
| 20 | middleware | `/zh-hk/product/nonexistent-probe-a2/` | 503 | - | 0.68 | 17 | NON-DETERMINISTIC(3x) · repeats=404/404 |
| 21 | next-config-301 | `/zh-hk/product/premium-business-cards/` | 308 | `https://zprintpro.com/zh-hk/product/premium-greeting-cards` | 0.65 | - | deterministic(3x); terminal=200 @ /zh-hk/product/premium-greeting-cards/ · chain=308→308→200 · HEAD-loc=/zh-hk/product/premium-greeting-cards · repeats=308/308 |
| 22 | next-config-301 | `/zh-hk/product/business-cards/` | 308 | `https://zprintpro.com/zh-hk/category/greeting-cards/` | 0.61 | - | deterministic(3x); terminal=200 @ /zh-hk/category/greeting-cards/ · chain=308→200 · HEAD-loc=/zh-hk/category/greeting-cards/ · repeats=308/308 |
| 23 | next-config-301 | `/zh-hk/category/business-cards/` | 308 | `https://zprintpro.com/zh-hk/category/greeting-cards` | 0.63 | - | deterministic(3x); terminal=503 @ /zh-hk/category/greeting-cards/ · chain=308→308→503 · HEAD-loc=/zh-hk/category/greeting-cards · repeats=308/308 |
| 24 | next-config-301 | `/en/guide/packaging-guide/` | 308 | `https://zprintpro.com/en/blog/packaging-box-custom-guide/` | 1.37 | - | deterministic(3x); terminal=200 @ /en/blog/packaging-box-custom-guide/ · chain=308→200 · HEAD-loc=/en/blog/packaging-box-custom-guide/ · repeats=308/308 |
| 25 | next-config-301 | `/zh-hk/returns/` | 308 | `https://zprintpro.com/zh-hk/help-center/` | 0.62 | - | deterministic(3x); terminal=503 @ /zh-hk/help-center/ · chain=308→503 · HEAD-loc=/zh-hk/help-center/ · repeats=308/308 |
| 26 | next-config-301 | `/zh-hk/product/gift-boxes/` | 308 | `https://zprintpro.com/zh-hk/product/rigid-boxes` | 0.82 | - | deterministic(3x); terminal=200 @ /zh-hk/product/rigid-boxes/ · chain=308→308→200 · HEAD-loc=/zh-hk/product/rigid-boxes · repeats=308/308 |
| 27 | next-config-301 | `/ja/services/same-day-printing-delivery/` | 308 | `https://zprintpro.com/ja/services/rush-printing-delivery/` | 0.67 | - | deterministic(3x); terminal=200 @ /ja/services/rush-printing-delivery/ · chain=308→200 · HEAD-loc=/ja/services/rush-printing-delivery/ · repeats=308/308 |
| 28 | next-config-301 | `/zh-hk/servis/rush-printing-delivery/` | 308 | `https://zprintpro.com/zh-hk/services/rush-printing-delivery/` | 0.64 | - | deterministic(3x); terminal=200 @ /zh-hk/services/rush-printing-delivery/ · chain=308→200 · HEAD-loc=/zh-hk/services/rush-printing-delivery/ · repeats=308/308 |
| 29 | next-config-301 | `/en/catalogs/` | 308 | `https://zprintpro.com/en/category/books/` | 0.60 | - | deterministic(3x); terminal=200 @ /en/category/books/ · chain=308→200 · HEAD-loc=/en/category/books/ · repeats=308/308 |
| 30 | next-config-301 | `/zh-hk/product/mesh-banners/` | 308 | `https://zprintpro.com/zh-hk/product/outdoor-vinyl-banners/` | 1.21 | - | deterministic(3x); terminal=200 @ /zh-hk/product/outdoor-vinyl-banners/ · chain=308→200 · HEAD-loc=/zh-hk/product/outdoor-vinyl-banners/ · repeats=308/308 |
| 31 | next-config-301 | `/zh-hk/product/fluorescent-stickers/` | 301 | `https://zprintpro.com/zh-hk/product/roll-stickers/` | 0.64 | - | deterministic(3x); terminal=200 @ /zh-hk/product/roll-stickers/ · chain=301→200 · repeats=301/301 |
| 32 | infra | `/robots.txt` | 200 | - | 0.67 | 1193 | - |
| 33 | infra | `/sitemap.xml` | 200 | - | 1.77 | 468507 | - |
| 34 | infra | `/sitemap-image.xml` | 200 | - | 1.57 | 251422 | - |
| 35 | infra | `/manifest.zh-hk.json` | 200 | - | 0.61 | 2238 | - |
| 36 | infra | `/images/articles/brand-story.webp` | 200 | - | 1.89 | 158082 | - |
| 37 | infra | `/api/search?q=sticker&locale=zh-hk` | 308 | `https://zprintpro.com/api/search/?q=sticker&locale=zh-hk` | 0.60 | - | deterministic(3x); terminal=200 @ /api/search/?q=sticker&locale=zh-hk · chain=308→200 · HEAD-loc=/api/search/?q=sticker&locale=zh-hk · repeats=308/308 · api-json=false,shape=- |

## 重定向链明细

- `/`: 301 `/` → 308 `/zh-hk` → 200 `/zh-hk/`
- `/about/`: 301 `/about/` → 200 `/zh-hk/about/`
- `/zh-HK/`: 301 `/zh-HK/` → 200 `/zh-hk/`
- `/quote`: 308 `/quote` → 301 `/quote/` → 200 `/zh-hk/quote/`
- `/zh-hk/quote?product=foil-stickers`: 308 `/zh-hk/quote?product=foil-stickers` → 301 `/zh-hk/quote/?product=foil-stickers` → 200 `/zh-hk/product/foil-stickers/`
- `/zh-hk/product/drink-tokens/`: 301 `/zh-hk/product/drink-tokens/` → 200 `/zh-hk/product/premium-greeting-cards/`
- `/{locale}/product/stickers`: 308 `/{locale}/product/stickers` → 301 `/locale/product/stickers/` → 404 `/zh-hk/locale/product/stickers/`
- `/個から`: 308 `/個から` → 301 `/%E5%80%8B%E3%81%8B%E3%82%89/` → 404 `/zh-hk/%E5%80%8B%E3%81%8B%E3%82%89/`
- `/zh-hk/product/premium-business-cards/`: 308 `/zh-hk/product/premium-business-cards/` → 308 `/zh-hk/product/premium-greeting-cards` → 200 `/zh-hk/product/premium-greeting-cards/`
- `/zh-hk/product/business-cards/`: 308 `/zh-hk/product/business-cards/` → 200 `/zh-hk/category/greeting-cards/`
- `/zh-hk/category/business-cards/`: 308 `/zh-hk/category/business-cards/` → 308 `/zh-hk/category/greeting-cards` → 503 `/zh-hk/category/greeting-cards/`
- `/en/guide/packaging-guide/`: 308 `/en/guide/packaging-guide/` → 200 `/en/blog/packaging-box-custom-guide/`
- `/zh-hk/returns/`: 308 `/zh-hk/returns/` → 503 `/zh-hk/help-center/`
- `/zh-hk/product/gift-boxes/`: 308 `/zh-hk/product/gift-boxes/` → 308 `/zh-hk/product/rigid-boxes` → 200 `/zh-hk/product/rigid-boxes/`
- `/ja/services/same-day-printing-delivery/`: 308 `/ja/services/same-day-printing-delivery/` → 200 `/ja/services/rush-printing-delivery/`
- `/zh-hk/servis/rush-printing-delivery/`: 308 `/zh-hk/servis/rush-printing-delivery/` → 200 `/zh-hk/services/rush-printing-delivery/`
- `/en/catalogs/`: 308 `/en/catalogs/` → 200 `/en/category/books/`
- `/zh-hk/product/mesh-banners/`: 308 `/zh-hk/product/mesh-banners/` → 200 `/zh-hk/product/outdoor-vinyl-banners/`
- `/zh-hk/product/fluorescent-stickers/`: 301 `/zh-hk/product/fluorescent-stickers/` → 200 `/zh-hk/product/roll-stickers/`
- `/api/search?q=sticker&locale=zh-hk`: 308 `/api/search?q=sticker&locale=zh-hk` → 200 `/api/search/?q=sticker&locale=zh-hk`


## 补充验证 (followup, 同日单独执行, 仅 2 个 GET)

- `/api/search?q=sticker&locale=zh-hk`: 首轮正文抓取落在 308 空响应上 (bytes=0)；已补抓**终态** `/api/search/?q=sticker&locale=zh-hk` → bytes=4099, JSON=true, shape=object(query,locale,results,categories,total)。终态 200 结论不变。
- `/ja/`: 首轮 GET=503 (17B) → 复测 200/200；补充验证再 GET 一次 bytes=235091 → 支持「503 为瞬时/限流型, 非稳态」判断。17B 正文未捕获, 与 Cloudflare 错误页尺寸特征一致的判断属**推测**。
- 其余 503/瞬时项同理解读: `/` 复测 503×2 后自行恢复, `/zh-hk/product/nonexistent-probe-a2/` 稳态为 404, 链上 `/zh-hk/category/greeting-cards/`、`/zh-hk/help-center/` 终态 503 与 HEAD 503 均与同刻突发请求密度相关 (间隔 420ms 不足以完全避开), 部署后复跑时若提高间隔至 ≥1s 可降低噪声。
