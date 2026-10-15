# MERGE-SNIPPETS — 年賀状 2027 早鸟页（预埋版: 页面已入 src/, 本文件仅余 sitemap + blog 补链 + 标题核验）

> 页面已预埋 `src/app/[locale]/nengajo-2027/page.tsx`（NENGAJO_LIVE=false 门禁）; 上线时只需填 3 真值 + 翻开关 + 以下两步。原「拷文件」步骤已删除。

## 2) sitemap 登记聚合页
`scripts/generate-sitemap.js` L81 `staticPages` 数组追加一项（保持字母序不强制）：
```js
'nengajo-2027/',
```
然后运行 `node scripts/generate-sitemap.js`（重新生成 `src/generated/sitemap-content.ts`），断言输出行含 nengajo-2027 ×3 locale。

## 3) blog 承接补链（new-year-card-printing-2027-guide × 3 locale，各追加 1 段）
在 `src/data/blog-data/{locale}.json` 的 `new-year-card-printing-2027-guide` 条目 `content` **末尾**（數據來源行之前）追加（逐字）：

zh-hk:
```html
<p class="mt-4">2027 年賀狀／賀年卡<a href="/zh-hk/nengajo-2027/" class="text-[#1A56DB] underline">早鳥優惠專頁</a>已開設：6 款規格牌價、發注時間線與早鳥截單日一頁睇晒，落單前先到專頁對數。</p>
```
en:
```html
<p class="mt-4">For 2027 early-bird terms, SKU list prices and the order timeline in one place, see the <a href="/en/nengajo-2027/" class="text-[#1A56DB] underline">Nengajo 2027 early-bird page</a> before ordering.</p>
```
ja:
```html
<p class="mt-4">早割の最新状況・SKU 牌価・発注タイムラインは<a href="/ja/nengajo-2027/" class="text-[#1A56DB] underline">年賀状 2027 早割ページ</a>にまとめています。発注前にご確認ください。</p>
```
纪律: 每条只加 1 处；不得改动旧文其他任何字符（零改文案）；加后跑 FAQ 格式预检 + 12seg --slug 确认无回归。

## 4) 标题当量核验（merge 前必跑）
用 `scripts/guards/title-equiv.js` 的 `equiv()` 对 3 个 title 断言 50-57（脚本：`.hermes/_tmp/nengajo-title-check.cjs`，含 3 条 title 字符串；本次预检 2026-10-15 实测 **zh-hk 55 / en 53 / ja 55 = 3/3 BAND-OK**）。若合入时改过 title → 更新脚本内字符串重跑；越带 → 主词前置重调，品牌末尾一次。

## 5) 内链真实性前置校验（S2 门禁）
本页引用的 slug 全部已核实存在（2026-10-15）：
- category: greeting-cards ✓（products.ts L129）
- product: foil-greeting-cards / premium-greeting-cards ✓
- blog: new-year-card-printing-2027-guide / foil-stamping-3-applications-2026 ✓（三语均在 ja.json map keys）
合入后仍须跑 `node scripts/guards/blog-data-integrity-guard.js` + curl 线上 200。
