# 三站点 SEO/AEO/GEO 技术面盘点（repo + live 探针）— 2026-11-25

- **执行层**: autoclaw（只读盘点，未写 src/，未 push）
- **日期/时区**: 2026-11-25；live 探针窗口 18:26:27–18:30:44 Asia/Shanghai（= 10:26–10:30 UTC）
- **对象**: zprintpro.com 三 locale 站（zh-hk / en / ja）+ repo `F:\zprintpro-nextjs`
- **方法（repo）**: git 命令 + Node v24.20.0 以 utf-8 直读文件；CJK 判定/计数一律 Node，未用 PowerShell Get-Content/Select-String（per §0.26.9）
- **方法（live）**: Node 原生 fetch，串行 18 个请求，请求间隔 ≥2.2s，UA=Chrome/131 Win64；每请求三重校验（HTTP 状态码 + 内容 marker + 长度下限），异常标 INVALID 不计 0（per §0.23.2 三闸门）。**本轮 18/18 全部 200 OK、0 INVALID、0 CF 挑战页**。
- **审计留痕**: 探针脚本与原始结果 JSON 均在 `.hermes/logs/`：`tmp-repo-check-20261125.cjs` / `tmp-repo-check-result-20261125.json`、`tmp-repo-check2-20261125.cjs` / `tmp-repo-check2-result-20261125.json`、`tmp-live-probe-20261125.cjs` / `tmp-live-probe-result-20261125.json`、`tmp-blogprobe-20261125.cjs` / `tmp-blogprobe-result-20261125.json`、`tmp-orgprobe-20261125.cjs` / `tmp-orgprobe-result-20261125.json`、`tmp-orgprobe-enja-20261125.cjs` / `tmp-orgprobe-enja-result-20261125.json`

---

## 0. 结论摘要

1. 【确定】**repo↔远端同步**：双远端（`origin/main` 与 `origin_ssh/main`）一致 = `3509abec`；本地 HEAD = `1e3c1e72`，**领先 2 个 commit**（今日 18:21 ZP-daily-content 车道产物，未 push）。`5d78f8ae`（K3 11-20 §0.39 实体统一名落地）**已在两个远端**。
2. 【确定】**§0.39 统一名「ZprintPro智印港」**在 manifest + llms 层已上线，且 repo↔live 一致（llms.txt 逐字节同 38,504 B）；但 **Organization schema 层三 locale 仍分别为 智印港 / ZprintPro / ジープリント**，统一名未落到 schema——是否按 §0.39 第 1 条执行还是按第 3 条分层豁免，待 K3 口径。
3. 【确定】**robots.txt（repo=live，1385 B 纯 ASCII）对 12 家 AI 爬虫显式 Allow**；与 §0.38.4「CF AI Bots Protection=block」的边缘策略矛盾维持原状（复原触发器未触发）。
4. 【确定】**三站点页面技术面完好**：首页/类目/PDP/blog 全 200，JSON-LD 解析 0 失败，hreflang 全存在；两处口径缺口：① blog 页 hreflang 的 en 为**单标签**（其余页面为 en-US/en-GB/en-AU 三变体）；② 抽查 1 篇 blog **无 FAQPage** schema（单样本，待全量普查）。
5. 【确定】**车道总线**：`lane-status.problems` 3 条（ZP-daily-content / ZP-blog-deepfix 调度器 `LastTaskResult=0x800710E0`＝"operator refused"；ZP-k3-review 11-25 → PARTIAL）；coordination-board **READY = tasks[] 13 条 + lane_assignment_details 12 条**（board generated_at 2026-11-25T18:17:05+0800）。

---

## 1. repo 侧检查（7 项）

### ① git 同步状态 — 判定：不一致（本地领先 2 commit）；5d78f8ae 已推远端 ✓

```
git rev-parse HEAD
→ 1e3c1e724a030ab875cdb96239078d3c5c3c6755

git fetch origin main --quiet → exit 0
git rev-parse origin/main → 3509abecd77e6209ff489d9784c8eba30d045c98

git log --oneline -3 origin/main
3509abec ﻿docs(lane): 2026-11-25 daily-content — NO_OP + 貼紙第八窗 plateau + SMALLBATCH 7d 干净窗
c0edfd23 cron(ZP-k3-review): lane 报告 2026-11-25 07:15
f943036b cron(ZP-k3-review): lane 产物自动提交 2026-11-25 07:15

git log --oneline -3 HEAD
1e3c1e72 cron(ZP-daily-content): lane 报告 2026-11-25 18:21
4f8710f4 cron(ZP-daily-content): lane 产物自动提交 2026-11-25 18:21
3509abec ﻿docs(lane): 2026-11-25 daily-content — NO_OP + 貼紙第八窗 plateau + SMALLBATCH 7d 干净窗

git status -sb（fetch 前快照）
## main...origin_ssh/main [ahead 65]   ← fetch 前陈旧 tracking ref

git rev-parse --verify 5d78f8ae^{commit}
→ 5d78f8aeaa7273ab52b7de67bf9452ee3890b745

git branch -r --contains 5d78f8ae
  origin/HEAD -> origin/main
  origin/main
  origin_ssh/HEAD -> origin_ssh/main
  origin_ssh/main
```

双方法复算（fetch `origin_ssh` main 后，per §0.23.2）：

```
git rev-parse origin_ssh/main  → 3509abecd77e6209ff489d9784c8eba30d045c98（与 origin/main 一致）
git rev-list --count origin_ssh/main..HEAD → 2     git rev-list --count HEAD..origin_ssh/main → 0
git rev-list --count origin/main..HEAD     → 2     git rev-list --count HEAD..origin/main     → 0

git log --oneline -1 5d78f8ae
5d78f8ae fix(brand): 实体统一名 ZprintPro智印港 落地 (K3 11-20 拍板) - public 7 文件旧名智印云清零
(manifest PWA/logo 字标×2/blog 图 alt×4) + llms 4 份头部统一 + 生成器源头同步 + brand-guard 实体名豁免 ...
```

- 两方法差异已解释：`status -sb` 的 `[ahead 65]` 是 fetch 前 `origin_ssh/main` tracking ref 陈旧；fetch 双远端后真实状态 = **ahead 2 / behind 0**，以 rev-list 计数为准。
- 未 push 的 2 个 commit（`1e3c1e72` / `4f8710f4`）均为 2026-11-25 18:21 `ZP-daily-content` 车道产物（.hermes 报告类）。
- 附注：`3509abec` 的 commit subject 以 U+FEFF(BOM) 开头（编码残留，不影响同步判定，仅记录）。

### ② public/manifest.json name — 「ZprintPro智印港」

```
Node JSON.parse(public/manifest.json):
  name:       "ZprintPro智印港"
  short_name: "ZprintPro智印港"
  start_url:  "/?source=pwa"
  lang:       "zh-HK"
  keys: id, name, short_name, description, start_url, display, background_color, theme_color,
        orientation, scope, dir, lang, icons, categories, screenshots, shortcuts,
        related_applications, prefer_related_applications
```

### ③ public/llms*.txt 首行 H1 — 四份全部「ZprintPro智印港」系

| 文件 | 首行（原文） | 行数 / utf-8 字节 |
|---|---|---|
| llms.txt | `# ZprintPro智印港` | 657 行 / 38,504 B |
| llms-en.txt | `# ZprintPro智印港 (English) — AI Search Optimization Page` | 245 行 / 12,559 B |
| llms-ja.txt | `# ZprintPro智印港 (ジープリント) 日本向け — AI検索最適化ページ` | 245 行 / 14,364 B |
| llms-zh-hk.txt | `# ZprintPro智印港 (香港) — AI 搜尋優化頁面` | 246 行 / 12,841 B |

### ④ public/robots.txt 全文（60 行 / 1,385 B，repo 与 live 一致，见 §2.1）

```text
# robots.txt - single SSoT (2026-10-26 P0-2 static single-source)
# Background: public/robots.txt + app/robots.ts dual source caused online 404.
# app/robots.ts (MetadataRoute) does not take effect on Cloudflare Pages
# (@opennextjs/cloudflare): online robots.txt still 404, manifest.webmanifest 500
# (same root cause). Switched to static file single source served by CF Pages.
# 2026-08-04 K3 P0-1: ZprintPro not in AI training data - CF Managed defaults to
# Disallow AI crawlers; explicit Allow below overrides (12 AI crawler types).
# Note: still requires K3 to allow AI crawlers in CF Dashboard (Security > Bots).

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /cdn-cgi/
Disallow: /manifest.json
Disallow: /manifest.webmanifest
Disallow: /sw.js
Disallow: /workbox-*.js

# 2026-08-04 K3 P0-1: 12 AI crawlers explicit Allow (override CF Managed default)
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://zprintpro.com/sitemap.xml
Sitemap: https://zprintpro.com/sitemap-image.xml
```

结构：`User-agent: *` Allow 全站 + 7 条 Disallow（admin/api/cdn-cgi/manifest×2/sw/workbox）+ **12 个 AI UA 显式 Allow**（GPTBot / OAI-SearchBot / ChatGPT-User / ClaudeBot / Claude-Web / anthropic-ai / PerplexityBot / Perplexity-User / Google-Extended / Applebot-Extended / Bytespider / CCBot）+ 2 条 Sitemap 声明（sitemap.xml + sitemap-image.xml）。

### ⑤ scripts/guards/ — 32 个文件 + 1 个子目录（data/）

清单（字母序）：blog-data-integrity-guard.js / blog-quality-12-rules-guard.js / blog-standard-guard.js / brand-guard.js / bypass-audit-guard.js / ce-truncation-guard.js / common.js / count-guard.js / credibility-guard.js / cron-prompts-exemption-guard.js / entity-guard.js / gsc-leak-guard.js / gsc-source-guard.js / guard-manifest.json / hook-sync-guard.js / i18n-guard.js / institutional-promise-guard.js / internal-links-cta-guard.js / keywords-detox-guard.js / ldjson-client-guard.js / meta-description-guard.js / phone-guard.js / pillar-guard.js / price-band-guard.js / price-truth-guard.js / register-guard.js / rule-translation-guard.js / sop10-guard.js / title-band-guard.js / title-equiv.js / title-hooks.json / title-v5-guard.js。
（30 个 .js + guard-manifest.json + title-hooks.json；子目录 data/ 未计入文件数。）

### ⑥ .hermes/logs/coordination-board.json — generated_at 与 READY 数

- `generated_at` = **"2026-11-25T18:17:05+0800"**（顶层键：schema_version / generated_at / run_date / board_path / policy / inputs / lane_contract / tasks / lane_assignments / lane_assignment_details / scheduler_health / reviews）
- `tasks[]` 共 60 条，其中 `status=READY` **13 条**。
- 双方法口径（per §0.23.2）：方法 A＝深度遍历 status/state/stage=READY = **25**（tasks 13 + lane_assignment_details 12）；方法 B＝原文 `READY` 字符串出现 **73** 次（差额含 policy 等非任务字段的 READY 字样）。任务口径以方法 A 为准。

**READY 13 条清单**（task_id / owner_lane / priority / 要点）：

| # | task_id | lane | pri | 要点 |
|---|---|---|---|---|
| 1 | VERIFY-FIX-20261113-SMALLBATCH-TRUTH-RESIDUAL | ZP-k3-review | 99 | small batch sticker printing 部署验证：PUSHED_NOT_INDEPENDENTLY_ONLINE_VERIFIED，online_verify=PENDING |
| 2 | GSC-FIX-2026-11-25-87656b1b2c | ZP-weekly-meta | 95.125 | 食品包裝印刷（125 imp / pos 7.93 / CTR 0）；gate=SERP_UNAVAILABLE，仅提案禁直改 |
| 3–11 | GSC-MEASURE-2026-11-25-*（9 条） | ZP-gsc-feedback | 80.0x | 海報印刷(186/20.37)、宣傳單張(134/39.39)、印刷(127/22.91)、コミケ 印刷(110/30.49)、教材 印刷製本(57/43.95)、易拉架印刷(43/41.63)、喜帖印刷(36/44.78)、小冊子印刷(14/17.93)、證書印刷(9/12.22)；全部 CONFIRMED_TWO_WINDOW_WORSENING，measurement-only gate；retry_at=2026-11-25 |
| 12 | FIX-20261030-BLOG-CERT-PHRASES | ZP-blog-deepfix | 0.72 | 认证词组清毒（K3 11-13 CT-D1-D6 gate；EU REACH 259 / FDA 21 CFR 175.300 108 等，禁无上下文全局替换） |
| 13 | ASSET-20261030-PACKAGING-PROCUREMENT-ASSETS | manual-executor | 0.66 | 采购资产三件 20261125-BUILT（commit 留本地）；push 待 K3 §0.25.10.5 预览+确认 |

（表内 imp/pos 数字来源 = board 内嵌 baseline，溯源 `.hermes/logs/gsc-2026-11-19-money-keyword-delta.json`，窗口 2026-10-14..2026-11-10，export 2026-11-19——board 自带口径声明「all-country query rows, 无 query/page/country join」。）

`lane_assignment_details` READY 分布：ZP-gsc-feedback 9 / ZP-weekly-meta 1 / ZP-blog-deepfix 1 / ZP-k3-review 1（ZP-daily-content / ZP-monthly-matrix / ZP-cron-watchdog = 0）。

### ⑦ .hermes/logs/lane-status.json problems 全文

```
generated_at = "2026-11-25T10:15:36.413Z"
problems = [
  "ZP-daily-content scheduler LastTaskResult=2147946720",
  "ZP-blog-deepfix scheduler LastTaskResult=2147946720",
  "ZP-k3-review 2026-11-25 -> PARTIAL"
]
```

- 2147946720 = 0x800710E0；`net helpmsg 4320` 实测返回：**"The operator or administrator has refused the request."**
- 张力记录：调度器报 refused 的同一时段，本地 HEAD 存在 `ZP-daily-content` 18:21 的车道产物 commit（`1e3c1e72`/`4f8710f4`）→ 「调度器 LastTaskResult 异常 ≠ 车道无产出」，建议按 §0.35.4 四方对账读 `lane-runs.jsonl` 对应 run 的 verdict 后再定性。

---

## 2. live 探针（zprintpro.com，18 请求全 200 OK）

### 2.0 探针清单与校验

| # | URL | 时刻(UTC) | 状态 | 校验 |
|---|---|---|---|---|
| 1 | /robots.txt | 10:26:27 | 200 | text/plain; charset=utf-8, 1,385 B, marker=User-agent ✓ |
| 2 | /sitemap-index.xml | 10:26:29 | 200 | application/xml, 566 B, marker=\<sitemapindex\> ✓ |
| 3 | /manifest.json | 10:26:32 | 200 | application/json, 2,229 B, JSON.parse ✓ |
| 4 | /llms.txt | 10:26:35 | 200 | text/plain, 38,504 B(utf-8) ✓ |
| 5 | /zh-hk/ | 10:26:38 | 200 | text/html, 220,697 B, \<title\> ✓ |
| 6 | /en/ | 10:26:41 | 200 | text/html, 227,976 B ✓ |
| 7 | /ja/ | 10:26:44 | 200 | text/html, 223,314 B ✓ |
| 8 | /zh-hk/category/flyers/ | 10:26:46 | 200 | text/html, 264,451 B, \<h1\>+ld+json ✓ |
| 9 | /en/category/stickers/ | 10:26:49 | 200 | text/html, 320,666 B ✓ |
| 10 | /ja/category/stickers/ | 10:26:51 | 200 | text/html, 295,785 B ✓ |
| 11 | /zh-hk/product/food-boxes/ | 10:26:54 | 200 | text/html, 237,861 B ✓ |
| 12 | /zh-hk/blog/（列表） | 10:26:57 | 200 | 296,608 B ✓ |
| 13 | /sitemap.xml（冗余兜底触发，见注） | 10:27:00 | 200 | application/xml, 474,228 B ✓ |
| 14 | /zh-hk/blog/corporate-calendar-customization-2027/ | 10:27:02 | 200 | 161,980 B ✓ |
| 15 | 同 14（补 JSON-LD/hreflang 结构化提取） | 10:28:22 | 200 | ✓ |
| 16 | /zh-hk/（Organization schema 提取） | 10:30:15 | 200 | ✓ |
| 17 | /en/（同上） | 10:30:41 | 200 | ✓ |
| 18 | /ja/（同上） | 10:30:44 | 200 | ✓ |

注：#13 为脚本先 finalize 后判定导致的多余兜底触发（sitemap-index 本身正常返回 sitemapindex），但该请求结果有效且补充了 urlset 口径，如实记录。全部请求间隔 ≥2.2s，未触发限速（对比 §0.38.2 限速在位性存疑一事，本次 18 连发 0 拦截，仍不能证明规则在位——那是「未被触发」≠「规则存在」）。

### 2.1 /robots.txt — 与 repo 逐字节一致

- 200 / text/plain; charset=utf-8 / 1,385 B（纯 ASCII，字符数=字节数）/ 首行 `# robots.txt - single SSoT (2026-10-26 P0-2 static single-source)`。
- live 全文 = repo `public/robots.txt`（同 1,385 B，首行、12 个 AI UA 块、2 条 Sitemap 声明逐一对应，全文见 §1④）。

### 2.2 /sitemap-index.xml — 4 个子 sitemap，lastmod 全部 2026-11-25

```
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://zprintpro.com/sitemap.xml</loc>
    <lastmod>2026-11-25</lastmod>
```

- 首 5 行如上（第 5 行即第一个 lastmod）；全文 4 个 `<lastmod>`，**min = max = 2026-11-25**。
- 4 个 `<loc>`：sitemap.xml / sitemap-zh-hk.xml / sitemap-en.xml / sitemap-ja.xml。
- 注意：robots.txt 声明的 `sitemap-image.xml` **不在** index 内（是否在线未探，列入待证项）。
- 附（#13 /sitemap.xml，urlset 口径）：723 个 `<loc>`，lastmod min=max=2026-11-25，每 URL 内嵌 `xhtml:link rel="alternate" hreflang=zh-Hant-HK/en/ja-JP/x-default`（首条 URL 原文：`<xhtml:link rel="alternate" hreflang="zh-Hant-HK" href="https://zprintpro.com/zh-hk/" />` 等）。

### 2.3 /manifest.json — name = 「ZprintPro智印港」（= repo）

```
"name": "ZprintPro智印港",
"short_name": "ZprintPro智印港",
"description": "ZprintPro智印港 - 全球智能印刷定制平台。AI報價、在線上傳、Airwallex支付，30秒報價72小時全球交付。",
"lang": "zh-HK", "theme_color": "#2873F5", "start_url": "/?source=pwa"
```

### 2.4 /llms.txt — 首行 `# ZprintPro智印港`（= repo，逐字节同源）

- 200 / text/plain / utf-8 字节 38,504 = repo `public/llms.txt` 38,504 B → **repo↔live 一致**。
- 首行原文：`# ZprintPro智印港`；intro 行含「15+ 年自有工厂经验 (founded 2012)…16 大品类 / 91 SKU」（§0.28.8.2 白名单知识原子口径）。

### 2.5 三首页（title 原文 + H1 + JSON-LD + hreflang）

| 页 | \<title\> 原文 | H1（均 sr-only 隐藏式） | JSON-LD unique @type（解析 2/2 块成功） | hreflang |
|---|---|---|---|---|
| /zh-hk/ | 智印港 \| 香港印刷公司 \| 急件印刷·即日交貨 \| 貼紙/單張/包裝盒 | 香港本地印刷 · 即日交貨 | WebSite, SearchAction, Organization, PostalAddress, Place, ContactPoint, LocalBusiness, GeoCoordinates, OpeningHoursSpecification | 6 条 |
| /en/ | Custom Printing Service USA · Free Shipping + Free Proof \| ZprintPro | Custom Printing Delivered · Same-Day Rush Available | 同上集合（Place 数略多） | 6 条 |
| /ja/ | ZprintPro \| 印刷通販 \| ステッカー・チラシ・パッケージ印刷 \| 即日対応・最短3日納品 | 国内印刷 · 最短3日納品 · エコ素材対応 | 同上集合 | 6 条 |

三站 hreflang 六条一致：`zh-Hant-HK / en-US / en-GB / en-AU / ja / x-default`，均指向对应 locale 的自身 URL，x-default → zh-hk 版。title 品牌口径符合 §13.16 v2 单品牌分层（zh-hk=智印港 / en=ZprintPro / ja=ZprintPro），无双品牌同现。

### 2.6 三类目页（H1 原文 + JSON-LD @type 清单）

| 页 | \<title\> 原文 | H1 原文 | JSON-LD（6 块全解析成功） | hreflang |
|---|---|---|---|---|
| /zh-hk/category/flyers/ | A5 宣傳單張印刷 10張起・A4/A5 雙面 \| HK$0.18 起 \| 智印港 | 香港 A5 宣傳單張印刷 — A4/A5 數碼快印 / 摺頁 / 開業傳單 / 24 小時急件 | WebSite, BreadcrumbList, CollectionPage, ItemList, Product×7(各+Brand/Offer/MerchantReturnPolicy), LocalBusiness, ContactPoint, PostalAddress, GeoCoordinates, OpeningHoursSpecification×2, SpeakableSpecification, FAQPage(10 组 Q/A), Question, Answer | 6 条 |
| /en/category/stickers/ | Small Batch Sticker Printing $0.05 · 10 MOQ \| ZprintPro | Small Batch Sticker Printing Free Shipping · 10 MOQ Die-Cut Vinyl Waterproof · Made for USA Small Business | 同上，但 LocalBusiness→Organization；Product×10；FAQPage(18 组 Q/A) | 6 条 |
| /ja/category/stickers/ | ステッカー印刷 10枚〜 オリジナル 防水 短納期 \| ZprintPro | ダイカットステッカー 防水印刷 — 防水 / 透明 / ダイカット / 商品ラベル | 同 en 结构；Product×10；FAQPage(18 组 Q/A) | 6 条 |

### 2.7 PDP /zh-hk/product/food-boxes/ — Product / Offer / FAQPage 全齐 ✓

- \<title\>：`食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 | 智印港`
- H1：`紙質食品包裝印刷訂製｜食品紙盒・食品紙袋・防油紙卡｜食品級`
- JSON-LD：8 块全部解析成功；`"@type":"Product"` ✓ / `"@type":"Offer"` ✓ / `"@type":"FAQPage"` ✓（三重正则判据均为 true）；另有 HowTo(7×HowToStep)、BreadcrumbList(3×ListItem)、SpeakableSpecification、MerchantReturnPolicy、ProcureAction、QuantitativeValue 等，unique @type 共 24 种。
- hreflang 6 条（food-boxes 三 locale URL 对应）。

### 2.8 blog 详情页（/zh-hk/blog/corporate-calendar-customization-2027/，取自列表页第一个链接）

- \<title\>：`月曆印刷訂製：尺寸×掛裝×紙材速查 1 本起 HK$3-8 | 智印港`；H1：`月曆印刷訂製：尺寸×掛裝×紙材速查 1 本起 HK$3-8`
- JSON-LD：5 块全部解析成功；unique @type = WebSite, SearchAction, **Article**(+Person 作者/Organization/ImageObject/WebPage), BreadcrumbList(3×ListItem), SpeakableSpecification, **HowTo**(6×HowToStep)。**无 FAQPage**（§13.4 v3 要求 blog 配 FAQPage——单样本观察，待全量普查，见缺口表）。
- hreflang **4 条**：`zh-Hant-HK / en / ja / x-default→zh-hk 版`——与首页/类目/PDP 的 6 条（en-US+en-GB+en-AU 三变体）**口径不一致**（en 变体粒度不同）。
- hreflang raw 出现 14 处 = 4 条 alternate link + 3 条 `<link rel="manifest" href="/manifest.*.json" hrefLang="…"/>`（camelCase 泄漏进 HTML）+ 7 处 RSC flight payload 内重复。首页/类目/PDP 同理：结构化 6 条 + 3 条 manifest hrefLang = raw 9 处。

### 2.9 补充探针：Organization schema 三 locale（核对 §0.39 / §0.36.3 缺口1）

| 页 | Organization.name | alternateName | sameAs | LocalBusiness.name |
|---|---|---|---|---|
| /zh-hk/ | **智印港** | 7 个：ZprintPro / ZprintPro HK / 智印港(香港) / 智印港印刷 / 智印港 / zprintpro.com / z-printpro.com | 4 条（twitter / linkedin / github / …） | 智印港 |
| /en/ | **ZprintPro** | 4 个：ZprintPro Global / ZprintPro / zprintpro.com / z-printpro.com | 4 条 | ZprintPro |
| /ja/ | **ジープリント** | 5 个：ZprintPro / ジープリント / 深セン印刷 / zprintpro.com / z-printpro.com | 4 条 | ジープリント |

- 判定：**§0.39 统一名「ZprintPro智印港」未落到 Organization schema 层**——三 locale 均为 locale 品牌名（符合 §13.16 v2 旧分层，但 §0.39 第 1 条把「Organization schema 实体名」列入统一名适用面；11-20 落地记录只覆盖 public 7 文件 + llms 4 份 + 生成器源头）。属「待 K3 口径确认」项，不是事实误报。
- §0.36.3 缺口1「Organization sameAs 空壳」**已过期**：三 locale sameAs 均有 4 条实测在位（距 §13.16.1 的 30 目录目标仍远）。

---

## 3. 缺口表（面 × 现状 × 建议）

| # | 面 | 现状（证据） | 建议 | 优先级 |
|---|---|---|---|---|
| 1 | Git 推送同步 | 本地领先 2 commit（`1e3c1e72`/`4f8710f4`，ZP-daily-content 18:21 车道产物）；两远端一致=3509abec；5d78f8ae 已推 | 攒批随下次 push（§0.25 30min 硬下限 + 攒批触发），push 后跑 `verify-deploy.mjs` | 低 |
| 2 | AI bot 双层矛盾 | robots.txt 显式 Allow 12 AI UA；§0.38.4 CF「AI Bots Protection=block」未复原（触发器未触发） | 维持现状；W4 探针把 Perplexity 通道记「平台侧不可达」；DMCA 落定或 K3 一句话后复原 allow verified | 记录 |
| 3 | hreflang en 变体不一致 | 首页/类目/PDP = en-US+en-GB+en-AU（6 条）；blog = en 单标签（4 条） | 二选一统一（建议 blog 对齐三变体，或全站收敛为 en 单标签），定口径后落规则防漂移；src 行为变更走 §0.25.10 审查全绿 4 件 | 中 |
| 4 | blog JSON-LD 缺 FAQPage | 抽样 1 篇有 Article+HowTo 无 FAQPage；§13.4 v3 要求 blog 4 FAQ+FAQPage | 先全量普查 blog FAQPage 覆盖率（双方法复算 §0.23.2），再决定批改范围；勿凭单样本动手 | 中 |
| 5 | §0.39 统一名 × schema 层 | manifest/llms 已统一；Organization.name 三 locale = 智印港/ZprintPro/ジープリント | 请 K3 明确：按 §0.39 第 1 条改 schema 实体名，还是按第 3 条分层豁免（schema 属实体标识面）；确认后一次性落 | 中 |
| 6 | sameAs 覆盖 | 三 locale sameAs 各 4 条（W3 缺口1「空壳」已过期）；距 30 目录目标远 | 更新 W3 审计基线；目录建设按 §13.16.1 继续 | 低 |
| 7 | W3 缺口2 与 live 不符 | 9-30 审计称「实现 zh-HK / x-default→/」；11-25 live 实测 zh-Hant-HK / x-default→zh-hk 页（全页面型一致） | 该「待 K3 拍板」项可关闭或改写基线（其间已修复），避免按过期缺口动手 | 低 |
| 8 | 调度器 refused ×2 | ZP-daily-content / ZP-blog-deepfix LastTaskResult=0x800710E0（"operator or administrator has refused the request"）；同时段 ZP-daily-content 却有 18:21 产物 commit | 按 §0.35.4 四方对账读 lane-runs.jsonl + wrapper 日志定性；Task Scheduler 层复核属 K3 管理员动作 | 中 |
| 9 | ZP-k3-review PARTIAL | problems 第 3 条「ZP-k3-review 2026-11-25 -> PARTIAL」 | 读该 run 的 blocked_reason / recovery_plan（§0.35.6 恢复分类）再定 retry/modify_payload | 中 |
| 10 | READY 积压 | tasks[] 60 条中 READY 13（+lane_assignment 12）；其中 9 条 GSC-MEASURE retry_at=2026-11-25 今日到期 | 车道按消费契约顺序消化；GSC-MEASURE 全部 measurement-only gate，禁止直接改内容 | 中 |
| 11 | manifest link 带 hrefLang | `<link rel="manifest" href="/manifest.zh-hk.json" hrefLang="zh-HK"/>`——hreflang 对 manifest link 无意义 + React camelCase 泄漏进 HTML（全页面型 raw 多 3 处） | 低优先；下次触及 head/layout 时顺手移除 hrefLang prop | 低 |
| 12 | sitemap 声明口径 | robots 声明 sitemap.xml + sitemap-image.xml；index 只含 4 个 sitemap（无 image）；sitemap.xml 在 robots 与 index 双处声明（冗余无害） | 探测 /sitemap-image.xml 是否在线（待证项），在线则考虑并入 index 或保持双声明口径 | 低 |

---

## 4. 待证项（本轮未查，列线索）

1. `/sitemap-image.xml` 是否在线（robots.txt 声明、index 未含；一条 curl 即可判定）。
2. blog FAQPage 覆盖率全量普查（本轮仅 1 样本；建议跑 `node` 脚本对 blog-data JSON 全量清点 FAQ 字段 + 线上 ld+json 抽样对照）。
3. en/ja 首页 Organization 的 alternateName 细节（本轮仅 zh-hk 提取了完整 alternateName 列表，en/ja 只记了 name/sameAs 计数）。
4. 限速规则在位性（§0.38 R1 遗留：/en 25 连发零拦截）——本盘 18 连发同样 0 拦截，只能证明「未被触发」，需 K3 Dashboard 复核。

## 5. 建议的下一步

1. 先消 3 条 problems：读 `lane-runs.jsonl` 对应 run → 按 recovery_plan 动作（不重跑生产 wrapper 做端到端测试，per §0.35.6 待办③）。
2. 派一个只读普查：blog FAQPage + hreflang en 变体全量盘点，产出两张清单后再请 K3 拍板统一口径（缺口 3/4 一并收口）。
3. 向 K3 提一句裁决：Organization schema 实体名是否改「ZprintPro智印港」（§0.39 第 1 条 vs 第 3 条）。
4. 本地 2 个车道产物 commit 攒批随下次 push（不单独为它触发 build）。

## 6. 数据来源 / 校准状态（per §0.23 / §0.33）

```
数据来源:
- git 命令输出（本轮实跑；fetch origin main + origin_ssh main 后的 rev-parse / rev-list / branch -r --contains / log）
- public/manifest.json、public/llms.txt、public/llms-en.txt、public/llms-ja.txt、public/llms-zh-hk.txt、public/robots.txt（Node utf-8 直读, 2026-11-25）
- scripts/guards/ 目录枚举（fs.readdirSync, 2026-11-25）
- .hermes/logs/coordination-board.json（generated_at 2026-11-25T18:17:05+0800；READY 双方法计数）
- .hermes/logs/lane-status.json（generated_at 2026-11-25T10:15:36.413Z；problems 全文 3 条）
- net helpmsg 4320（Windows 本机, 0x800710E0 语义）
- live 探针 18 次（2026-11-25 18:26:27–18:30:44 HKT, 串行 ≥2.2s, UA=Chrome/131 Win64, 状态码+marker+长度三重校验）
- board 内 GSC 数字溯源: .hermes/logs/gsc-2026-11-19-money-keyword-delta.json（窗口 2026-10-14..2026-11-10, export 2026-11-19）
校准状态: 已校准（全部数字来自本轮直接命令输出/文件直读/线上实抓，无二手转述；探针脚本与原始结果 JSON 留痕于 .hermes/logs/tmp-*-20261125*）
```

— 盘点完毕。本报告只读产出，未改 src/，未 push，未触碰 lane.lock 保护的数据文件。
