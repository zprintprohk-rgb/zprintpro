# 2026-11-28 Q16 — pillar-content 無來源數字批（K3 11:33 批准）

## VERDICT / CONSUMED / DELIVERED / NEXT

- **VERDICT**: OK — 86 操作全數落地，門童 0 red，commit `10c162be` 已 push（`3c27ce43..10c162be`，今日第 14 次 push）。
- **CONSUMED**: K3 11:33「把门童标记的 4,700/400,000/25,000/68%/500家/95% 等数字全部撤下或改描述性文案，一个 push 上线」。
- **DELIVERED**: `src/data/pillar-content.ts` 單文件真值化（4 支柱頁 × 三語 + 6 集群文章）。
- **NEXT**: 欠賬見 SESSION_LOCK.md；建議下一批 Q17 = blog 層驗真（48h/FSC/免運費 ~40 處）。

## 執行明細

### 腳本
- `.hermes/_tmp-q16-pillar-truth.js`（74 ops）+ `.hermes/_tmp-q16b-color-cluster.js`（12 ops），均含逐項計數斷言 + 殘留歸零斷言（29 項）。

### 引用塊（blockquote）45 塊全量處理
- **刪除 24 塊**（偽造機構 cite + 精確統計）：
  - 偽內部數據：68%/22% 尺寸佔比（三語）、96.8% 準時率/4.2h 處理（en/ja）、71%/18% 材料佔比（三語）、45%/32%/15%/8% 工藝佔比（三語）
  - 偽機構統計：貿發局 4,700 初創/73%、US Census 400,000、運輸署 12,000-15,000/25,000 人流、城大 40%/25%、環保署 23% FSC 年增、商會 92% 滿意度（三語鏡像）
- **重寫 21 塊**（去 cite + 去偽精確統計，保留工藝通識：300dpi/15% 燙金面積/3-5 倍成本比/30-40% 體積利用率/55-60% A6 成本比）：濕度、ISO 色彩、成本比較、色彩心理、人流、工藝面積指引

### 正文描述性化 26 處
- 500 家品牌 → 眾多香港本地品牌；95% 準時率 → 穩定準時交付紀錄（三語）
- 回購率 +30%（zh lead+body / en lead+body / ja lead+body）→ 描述性
- 轉化率 2-3 倍（zh L312/en L313/ja L314）→ 顯著提升
- 成功個案 35%/doubled/50% AOV（en 3 處，L59/97/135 共用塊）→ 描述性
- meta description「提升 3 倍/triple/3倍にする」（L307-309）→ 顯著提升

### 色彩心理學集群（Q16b，門童 red 硬拦觸發）
- ja 簡體「婴」→ ベビー（I18N_POLLUTION_JA 紅線）
- 3-7 秒決策 / Studies show 綠色包裝 / 4-6 週窗口 / 50-100 件統計意義（三語）→ 描述性

### 服務口徑（K3 無取貨拍板 + SSoT）
- 「即日取貨/即日可取」×6（L58 lead+body、L91/L102 description、L96 lead、L53/L64）→ 順豐送貨上門 / 急件快至即日交付
- L96「香港各區即日取貨」H2 整段（觀塘生產基地虛構）→ 香港各區送貨服務（深圳平湖廠房 + 3-5 工作天 + 兩檔 24h）
- 觀塘倉庫 ×2（L134 正+續）→ 深圳平湖廠房倉庫
- L134 lead「即日打樣」→ 快速數碼打樣

### 順帶修復
- 簡繁錯字 2 處：L96「被派发」→「被派發」、L134「在有机」→「在有機」

## 驗證
- tsc 0 / encoding UTF-8 LF / brand-mentions strict 0 / content-guard red=0（殘留：1,000+ 張、5,000 張等為正文工藝語境如「大批量 1,000+」屬存量 shadow，未攔）
- 殘留掃描斷言 29 項全過：4,700 / 400,000 / 25,000 / 68% / 500 家 / 96.8 / 4.2h / 12,000 / 15,000 / 92% / 年增長率達 23% / 高出約 35% / 95% 準時 / 觀塘 / 即日取貨 / 即日可取 / 婴 / 3-7 秒 等歸零

## 線上驗證（2026-11-28 15:5x，含重大架構發現）

### 集群文章（6 個）— Q16 已真實上線 ✅
- `/zh-hk/blog/rigid-vs-folding-boxes/` 實測：「回購意願」×2（新文案在線）、「觀塘」0、「平均高出 30%」0。
- 集群文章實際由 blog/[slug] 路由 `getClusterBySlug` fallback 渲染（page.tsx L15/858），線上 URL 形態 = `/blog/<cluster-slug>/`。

### ⚠️ 支柱頁（3 個）— 線上不可達（Q16 前已存在的架構問題，非本次引入）
線上驗證時發現 `/zh-hk/guide/sticker-guide/` 308→`/zh-hk/blog/sticker-guide/`（2024 legacy 博文，canonical 亦為 blog），三語支柱頁全部被擋：
- **根因**：`next.config.js` `buildGuideRedirects()`（2026-07-15 修 GSC 重定向錯誤時引入）通配規則 `/<locale>/guide/:slug+ → /<locale>/blog/:slug+/` 把**全部** /guide/ URL（含 3 個 pillar 頁）301 送走。
- 2026-09-09 曾為 flyer-guide/packaging-guide 加「幽靈 301」精準承接到**別的**博文（flyer-printing-guide / packaging-box-custom-guide）；sticker-guide 被通配送進同名 legacy 博文（2024-04-15 lpStickerGuide）。
- sitemap 三語**已無任何 /guide/ URL**；pillar 頁內部鏈接集群也用 `/blog/<slug>` 形態（guide page.tsx L278）。
- **影響**：pillar-content.ts 支柱層（hub-spoke 的 hub）在生產環境零曝光；GSC 看到的只有 blog 層。2026-11-25/28 四份戰略文件的 pillar 假設與線上事實不符。
- **legacy 博文體檢**：線上 `/zh-hk/blog/sticker-guide/` 4,700/68%/96.8/500家/觀塘 均 0（95% ×4 為 CSS gradient，良性）；順豐 ×25。
- **待 K3 拍板**：(a) 拆掉通配 301，讓 3 支柱 + 9 集群回歸 /guide/ 200（需同步 sitemap + 內鏈 + GSC 重新提交）；(b) 維持現狀，pillar 層僅作 schema/內容庫；(c) 支柱內容合併進對應 blog 博文後停用 pillar 路由。**AGENTS.md 禁改條款針對 middleware.ts，此為 next.config.js redirects，但仍屬高風險 301 變更，不擅動。**

### Q16 變更可見性結論
- 可見：集群文章 6 個（/blog/<slug>/，三語）。
- 暫不可見（已部署、待支柱頁恢復或拍板合併）：支柱頁 3 個（L58-60 / L96-98 / L134-136 的引用塊與正文真值化）。
