# 2026-11-24 AI 爬蟲 72 小時對賬報告

VERDICT: PARTIAL — 4 項可查已查（robots.txt 12 類 Allow 未變且無 CF Managed 注入、hkprint58 sitemap 無新增抄襲頁、首頁品牌殘留仍在、DMCA 兩線未提交）；2 項 NOT EXECUTED（邊緣三向 UA 抽驗、CF AI Crawl Control metrics），原因均為本機 shell 全掛（0xC0000142），非「測過而正常」。
CONSUMED: `重要文件/2026-11-21-cloudflare-five-switches-waf-dmca-execution-sheet.md`（§七執行結果）、`.hermes/backups/cf-ai-waf-20261121/apply-result.json`、線上 `https://zprintpro.com/robots.txt`、倉庫 `public/robots.txt`、線上 `https://hkprint58.com/sitemap.xml`、線上 `https://hkprint58.com/`、`重要文件/dmca-evidence-2026-11-21/` 目錄清單。
DELIVERED: 本報告（`.hermes/logs/2026-11-24-ai-crawler-72h-recheck.md`），含基線對賬、可查項判定、NOT EXECUTED 逐項原因、K3 待辦與下一步建議。
NEXT: K3 補 E2 截圖→按 E1 §E2 五步→兩線提交並歸檔回執；K3 到 AI Crawl Control → Metrics 目視三個指標；執行層待 shell 恢復後補跑三向 UA 抽驗；WAF 在無實測證據前不調整。

---

## 0. 置頂提醒（K3 必看，兩件）

1. **DMCA 兩線仍未提交**：`重要文件/dmca-evidence-2026-11-21/` 目前只有 E1 對照表、E3 首發時間戳、Google 移除 URL 清單、可貼上投訴正文 **4 個文字檔**；**無 E2 截圖、無 E4 頁腳原創檔號截圖、無 E5 身份文件、無 Cloudflare Abuse / Google 法律移除任何一線的提交回執**。→ 抄襲頁目前**仍在線上、仍在 sitemap 內**，無任何平台層處置。
2. **本輪有兩項檢查沒跑成**（不是通過）：三向 UA 邊緣抽驗、AI Crawl Control metrics。原因見 §3、§5，補做方式見 §9。

---

## 1. 執行時點與邊界

| 項 | 值 |
|---|---|
| 執行時點 | 2026-11-24 13:41（Asia/Shanghai，timeapi.io 校時；任務單名義觸發 13:37） |
| 執行層 | DeepSeek Harness（本會話） |
| 寫入範圍 | 僅本報告檔（`.hermes/logs/`）；**未改任何 src/、未 commit、未 push、未改 Cloudflare 任何設置** |
| 讀取方式 | 檔案讀取 + 工具級 HTTP 抓取（web_fetch，UA 不可控）；shell 不可用（見 §3.2） |

---

## 2. 11-21 基線事實（從執行單 §七 + apply-result.json 提取）

| 基線項 | 11-21 值 | 出處 |
|---|---|---|
| Bot Fight Mode（`fight_mode`） | **False**（由 True 關閉，本次修復核心） | apply-result.json |
| `ai_bots_protection` | **disabled**（原本即 disabled，維持） | apply-result.json |
| WAF 自定義規則數 | **3 條**（1 條 verified-search skip 排最前 + 1 條 scraper UA managed challenge + 保留 10-16 anti-scrape block） | 執行單 §七 |
| 邊緣抽驗（11-21） | Chrome 真人 UA **200**；空 UA **403**；偽裝 Googlebot **403**（預期，未過 verified bot）；偽裝 GPTBot **403「Your request was blocked」** | 執行單 §七 |
| robots.txt CF Managed 注入 | **false**（無注入） | apply-result.json |
| `ai_training` 政策 | **維持 disallow**（K3 2026-11-21 13:25 拍板，無需 API 改動） | 執行單 §七 |
| DMCA 證據包 | E1 對照表 11 對 + E3 時間戳 + Google 移除 URL 清單 + 投訴正文已生成；**待 K3 補 E2 截圖與簽名** | 執行單 §七 |

> 口徑說明：11-21 的「偽裝 GPTBot 403」是**偽裝 UA 測試**，不能等同真 GPTBot 被擋（真爬蟲帶 verified IP）；真到訪只能用 AI Crawl Control metrics 驗證（見 §5）。

---

## 3. 邊緣三向抽驗 — **NOT EXECUTED**

### 3.1 逐項狀態

| # | 測試（UA） | 預期 | 本輪結果 | 判定 |
|---|---|---|---|---|
| 1 | Chrome 真人 UA → `https://zprintpro.com/zh-hk/` | 200 | **NOT EXECUTED** | 未取得狀態碼，不得聲稱通過 |
| 2 | 空 UA → 同上 | 403 | **NOT EXECUTED** | 同上 |
| 3 | `python-requests/2.31.0` → 同上 | 403 / 挑戰頁 | **NOT EXECUTED** | 同上 |

### 3.2 未執行原因（機器事實）

本會話 shell 無法派生：**8 次嘗試全部失敗**，退出碼 `3221225794`（= `0xC0000142`，`STATUS_DLL_INIT_FAILED`），連最小命令 `cmd /c echo hello` 亦同。已試：`curl.exe` 三向抽驗批次、環境變數查詢、`Write-Output` 冒煙、`cmd /c echo`。系統層 DLL 初始化失敗，與沙箱權限拒絕（`[sandbox: ...]`）不是同一類錯誤。

因 `curl -A` 需要可控 UA，而本會話唯一可用抓取通道（web_fetch）**不能設定 UA**，故三向抽驗**無法等價替代**，按任務單要求標 NOT EXECUTED，不假稱已測。

### 3.3 旁證（明確不等價，僅供參考）

- 以 web_fetch 取 `https://zprintpro.com/zh-hk/` 得 **HTTP 200**（頁面完整渲染，含 hero / 分類 / 產品卡）。
- 以 web_fetch 取 `https://zprintpro.com/robots.txt` 得 **HTTP 200**。
- 此二者只能說明「站點對該工具 UA 放行」，**不能替代** Chrome / 空 UA / python-requests 三向判定。

---

## 4. robots.txt 對賬 — **PASS**

| 檢查點 | 結果 | 證據 |
|---|---|---|
| 線上可取 | 200 | web_fetch |
| 12 類 AI 爬蟲 Allow 仍在 | **12/12 在**：GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、Claude-Web、anthropic-ai、PerplexityBot、Perplexity-User、Google-Extended、Applebot-Extended、Bytespider、CCBot | 線上全文 |
| 有無 Cloudflare Managed 注入 | **無**：全文無 `# Cloudflare` 類注入塊、無額外 `Disallow: /`、無 `Content-Signal`；Disallow 僅 `/admin/`、`/api/`、`/cdn-cgi/`、`/manifest.json`、`/manifest.webmanifest`、`/sw.js`、`/workbox-*.js` | 線上全文 |
| 線上與倉庫 SSoT 是否一致 | **逐行一致**（59 行，含註釋與兩條 Sitemap 行） | 線上全文 vs `public/robots.txt` |

> 雙方法：① 線上抓取 robots.txt 全文；② 與倉庫 `public/robots.txt` 逐行對照。兩者一致，且兩者均無 CF Managed 注入。

---

## 5. AI 爬蟲真實到訪 — **NOT EXECUTED**

| 項 | 狀態 |
|---|---|
| User-scope `CF_API_TOKEN` 是否仍存在 | **未能核驗**（讀環境變數需 shell） |
| Cloudflare API 拉取 zone `225b44dbbbc31d6cd4bc3ce8b8540f12` metrics | **未調用**（無 shell；且 token 存在性未證實） |
| 真實 AI 爬蟲 allowed requests | **未知**，需 K3 後台目視 |

### 5.1 需 K3 手動確認（約 5 分鐘）

路徑：Cloudflare Dashboard → 選 `zprintpro.com` → 左側 **AI Crawl Control** → **Metrics**（免費版僅 **24 小時**窗口，故需當日看）。

三個必看指標（allowed requests 是否 > 0）：

1. **GPTBot**
2. **OAI-SearchBot**
3. **PerplexityBot**

### 5.2 判讀口徑（重要，避免誤判）

- **GPTBot = 0 屬「政策一致」，不是故障**：`ai_training` 自 11-21 起維持 **disallow**，11-21 實測偽裝 GPTBot 亦回 403「blocked」。因此以 GPTBot 是否 > 0 當「AI 爬蟲是否恢復」的判據會得出錯誤結論。
- **真正該看的是「搜索/用戶通道」**：`OAI-SearchBot`、`ChatGPT-User`、`PerplexityBot`、`Perplexity-User`。這幾類才是 AI 搜索引用入口（ChatGPT 引用走 OAI-SearchBot / ChatGPT-User，Perplexity 走 PerplexityBot）。
- **若 GPTBot allowed > 0**：表示邊緣 disallow 未生效，或 metrics 口徑把 blocked 也計入，需回報 Kimi/K3 複核，而不是當好消息。

---

## 6. hkprint58 複查 — 無新增抄襲頁；首頁殘留仍在

### 6.1 sitemap 對比

| 項 | 11-21 基線 | 11-24 實取 | 判定 |
|---|---|---|---|
| HTTP | 200 | **200** | 正常 |
| URL 數 | 未記錄 | **277**（`<loc>` 277 / `<lastmod>` 277，對齊） | 本輪建立新基線 |
| lastmod 範圍 | 集中 2026-08-28 ～ 10-13 | **2026-08-28 ～ 2026-10-13**（最早 08-28，最晚 10-13） | **與基線同區間，無新日期** |
| lastmod ≥ 2026-11-01 | — | **0 條** | 72h 內無新增/更新 |
| lastmod ≥ 2026-10-14 | — | **0 條** | 自 10-13 起 11 天無自報更新 |
| 抄襲頁是否被移除 | — | **否**，存量頁全在 sitemap 內 | 未處置 |

> 雙方法復算（per §0.23.2）：① 人工逐條讀 sitemap 日期分佈；② 正則掃描 `2026-1[12]-|2026-10-1[4-9]` → **0 命中**，且 `<loc>` 與 `<lastmod>` 計數均為 277，兩次結果一致。

### 6.2 判定與局限

- **判定**：修復後 72 小時內，hkprint58 **未新增、未更新**抄襲頁（站方自報 lastmod 停在 2026-10-13）；但**存量抄襲頁未下架**，sitemap 仍完整收錄 277 條。
- **局限（必須寫明）**：`lastmod` 由站方自行填寫，可造假、可凍結；「11 天未變」只能作**弱證據**，不能證明其停止抓取。真正的客觀證據是 DMCA 下架結果與 GSC 收錄變化，不是 lastmod。

### 6.3 首頁「鑫印吧 ZprintPro」殘留 — **仍在**

2026-11-24 13:4x 實取首頁 200，頁面模板字串（`window.hkTemplate`）中仍見我方品牌 `ZprintPro`（部分與其自有品牌「鑫印吧」同串），例如：

- `A5傳單印刷 100張起印 雙面四色 免費設計 | 鑫印吧 ZprintPro · A4單張 · 品質保證 · 鑫印吧`
- `折疊傳單印刷 A4 雙面 對摺三摺 · 餐廳菜單地產樓書活動宣傳適配 | 鑫印吧 ZprintPro · 鑫印吧`
- 站頭 logo `alt="智印港 ZprintPro"`（其 logo 檔名仍為 `logo-zhiyingang.png`）

另有模板鍵 `hk_7a5b37c1c65e` 值為 `智印港 ZprintPro`。

> 說明：「鑫印吧」係其自有品牌，「ZprintPro」「智印港」為我方品牌；殘留的關鍵是 **ZprintPro / 智印港** 字樣仍嵌在其標題模板與 logo alt 中，與 11-21 E1「鐵證」描述形態一致（惟具體產品卡標題字串與 11-21 記錄略有差異，其站方似有改寫，但品牌殘留未清）。

---

## 7. DMCA 回執檢查 — **未提交**

`重要文件/dmca-evidence-2026-11-21/` 實有檔案（4 個，全為文字）：

| 檔 | 用途 | 狀態 |
|---|---|---|
| `E1-url-pairs.md` | 11 對原創↔抄襲 URL 對照 + 鐵證描述 | ✅ 在 |
| `E3-first-publish-timestamps.txt` | 我方首發時間戳 | ✅ 在 |
| `google-removal-infringing-urls.txt` | Google 移除逐條 URL 清單 | ✅ 在 |
| `dmca-complaint-ready-to-paste.txt` | 可貼上投訴正文（英文） | ✅ 在 |
| E2 截圖（逐對全頁 + 鐵證單張） | 證據主體 | ❌ **缺** |
| E4 頁腳原創檔號截圖（ZP-OC-2610） | 原創性佐證 | ❌ **缺** |
| E5 身份/域名所有權文件 | 投訴主體資格 | ❌ **缺** |
| Cloudflare Abuse 提交回執 | 一線回執 | ❌ **缺** |
| Google 法律移除提交回執 | 二線回執 | ❌ **缺** |

結論：**兩線均未提交，無任何回執**。依 §0.24（籠統批准 ≠ 動作完成），在回執歸檔前不得記為「已投訴」。

---

## 8. NOT EXECUTED 匯總

| # | 項 | 原因 | 需誰補 |
|---|---|---|---|
| 1 | Chrome UA → 200 | shell 不可用（0xC0000142 ×7），web_fetch 不能設 UA | 執行層（shell 恢復後）或 K3 手動 curl |
| 2 | 空 UA → 403 | 同上 | 同上 |
| 3 | python-requests UA → 403 | 同上 | 同上 |
| 4 | CF_API_TOKEN 存在性 | 同上（讀 User 環境變數需 shell） | 執行層 / K3 |
| 5 | AI Crawl Control metrics（GPTBot / OAI-SearchBot / PerplexityBot） | 同上；且免費版僅 24h 窗口，需即時目視 | **K3**（Dashboard） |

---

## 9. 下一步建議

### 9.1 K3（優先，合計約 20 分鐘）

1. **補 E2 截圖**：按 `E1-url-pairs.md` §E2 五步，11 對頁面雙方全頁截圖 + 鐵證單張 + 我方頁腳原創檔號，存回 `重要文件/dmca-evidence-2026-11-21/`（檔名 `E2-01-...png` / `E2-SMOKINGGUN-...png` / `E4-footer-originality.png`）。
2. **兩線提交**：Cloudflare Abuse DMCA（https://abuse.cloudflare.com/dmca）+ Google 法律移除（https://support.google.com/legal/troubleshooter/1114905）。回執截圖歸檔 `.hermes/logs/` 或同目錄。
3. **看 metrics**：AI Crawl Control → Metrics，記下 GPTBot / OAI-SearchBot / PerplexityBot 的 allowed requests（同日 24h 窗口，看過即記，免費版不保留歷史）。

### 9.2 執行層（shell 恢復後）

重跑三向抽驗，命令即任務單 §四第 1–3 條；判據：Chrome 200 / 空 UA 403 / python-requests 403 或挑戰頁。若 Chrome 非 200 或空 UA 非 403 → 立即回報，暫停任何 WAF 調整。

### 9.3 WAF 是否調整

**本輪不建議調整**。理由：三向抽驗未取得實測數據，任何調整都是在無證據下改配置；且 11-21 的三條規則（skip 排最前 + scraper 挑戰 + anti-scrape block）與 robots.txt 方向一致，未見自相矛盾。待 §9.2 有結果、且 §9.1.3 顯示搜索通道 allowed = 0 時，再考慮放寬（例如把 `python-requests` 由 Managed Challenge 改為放行特定 verified AI 類別）——但那屬於政策變更，需 K3 拍板。

### 9.4 下次對賬

- DMCA 提交後 **T+72h** 覆核：抄襲頁是否消失、Google 是否已下架、hkprint58 sitemap 是否縮減。
- 若 DMCA 未提交，則維持每週一次輕量覆核（sitemap lastmod 是否越過 2026-10-13、首頁殘留是否清除）。

---

## 10. 數據來源

- 執行單：`重要文件/2026-11-21-cloudflare-five-switches-waf-dmca-execution-sheet.md`（§六 API 路徑、§七 11-21 13:2x 執行結果與 K3 13:25 拍板）
- 機器存證：`.hermes/backups/cf-ai-waf-20261121/apply-result.json`（ts 2026-11-21T13:20:26）
- 線上 robots.txt：`https://zprintpro.com/robots.txt`（2026-11-24 13:4x，HTTP 200）
- 倉庫 SSoT：`public/robots.txt`（59 行）
- hkprint58 sitemap：`https://hkprint58.com/sitemap.xml`（2026-11-24 13:4x，HTTP 200，277 `<loc>` / 277 `<lastmod>`）
- hkprint58 首頁：`https://hkprint58.com/`（2026-11-24 13:4x，HTTP 200）
- DMCA 目錄：`重要文件/dmca-evidence-2026-11-21/`（glob 實列，4 檔）
- 校時：`https://timeapi.io/api/Time/current/zone?timeZone=Asia/Shanghai` → 2026-11-24T13:41:01+08:00
- shell 故障：8 次派生退出碼 `3221225794`（0xC0000142 STATUS_DLL_INIT_FAILED）

## 11. 邊界聲明

- 全程只讀核查；**未寫 src/、未 commit、未 push、未改 Cloudflare、未改 robots.txt、未動 DMCA 檔案**。
- 未執行項一律標 NOT EXECUTED，未以旁證冒充實測。
- 本報告不含任何未經核實的估算數字；277 / 日期區間 / 12 類 UA 均為當次實取可復現值。

---

> ## 9. 補跑完成（2026-11-25 00:55 · shell 已恢復）

> **§3 邊緣三向 UA 抽驗 — 已補跑，CLOSED**（§0.23.2 確定性：每向 ≥3 次串行間隔，全部一致）：

| 向 | 方法 | 結果 | 期望 | 判定 |
|---|---|---|---|---|
| Chrome 真人 UA | curl.exe ×3 | 200 / 200 / 200 | 200 | ✅ 在位 |
| 空 UA（無 User-Agent header） | node https（無 UA header）×4 | 403 ×4 | 403 / 挑戰 | ✅ 在位 |
| python-requests/2.31.0 | curl.exe ×3 | 403 ×3 | 403 / 挑戰頁 | ✅ 在位 |

- 空向首兩次跑 `.cjs` 靜默（exit 0 無輸出，原因未查明已登記），改用最小內聯探針復測 4 次全 403——**測量有效，非旁證**；對照 example.com 200 確認 node https 出站健康。
- **§5 CF AI Crawl Control metrics — 維持 NOT EXECUTED（K3 Dashboard 真人動作）**，非執行層可補項。
- **VERDICT 維持 PARTIAL**（6 查項已閉 + 1 K3 真人項待辦），UA 防線判定：**三向全部按 10-16 防線設計在位，無規則漂移**；WAF 維持不調整（無新證據）。
