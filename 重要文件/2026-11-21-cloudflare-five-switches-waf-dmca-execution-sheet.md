# Cloudflare 五開關核對 + 2 條 WAF 規則 + DMCA 證據包｜可執行任務單

> 日期：2026-11-21 · 簽發：Kimi（戰略層） · 執行：**K3 本人**（Cloudflare Dashboard 與 DMCA 需管理員帳號，Harness 無權限）
> 預計耗時：40–60 分鐘 · 代碼改動：**0**（不動 src/、不 push、不耗 build）
> 目標：AI 爬蟲全量放行（保 AEO/GEO 引用入口）＋ 抄襲爬蟲精準攔截（hkprint58）＋ 侵權下架證據鏈

**數據來源**：zprintpro.com/robots.txt（2026-11-21 實取，12 類 AI 爬蟲已 Allow）；hkprint58.com 首頁（2026-11-21 實取，含「鑫印吧 ZprintPro · 訂製」殘留鐵證）；Cloudflare 官方文檔/社區（2026-11-21 檢索：免費版 5 條 WAF 自定義規則、AI Crawl Control 全計劃可用、免費版 Bot Fight Mode 不可被任何規則豁免）。

---

## 一、五開關核對清單（Cloudflare Dashboard → 選 zprintpro.com）

| # | 位置 | 開關 | 應設為 | 為什麼 |
|---|---|---|---|---|
| 1 | Security → Settings → Bot traffic | **Bot Fight Mode** | **OFF（關閉）** | 免費版 Bot Fight Mode 無差別攔截，且**任何 WAF Skip/Allow 規則對它無效**（官方明示）。開著它 = AI 爬蟲永遠進不來。想精準管理只能靠下方規則 |
| 2 | Security → Settings | **Block AI bots（舊版總開關，逐步棄用中）** | **Do not block（不攔截）** | 與 AI Crawl Control 並存的舊開關，若開著會覆蓋放行 |
| 3 | 左側 **AI Crawl Control**（原 AI Audit） | 逐個爬蟲設置 | 下表 12 類全部 **Allow** | 這是 AI 爬蟲的實際放行閘門，與 robots.txt 的 Allow 互相獨立，兩邊都要對 |
| 4 | Security → WAF → Custom rules | 既有自定義規則 | 確認**無**全站性 Block／Under Attack Mode | Under Attack Mode 會連 Googlebot 一起擋，長期開 = 索引萎縮 |
| 5 | Security → Settings | **Browser Integrity Check** | 可保持 ON，但若發現 AI 爬蟲 403 則關 OFF 排查 | 它按 UA 完整性攔截，可能誤傷合法 AI 爬蟲 |

### 開關 3 的 Allow 名單（與 robots.txt 對齊）

`GPTBot` · `OAI-SearchBot` · `ChatGPT-User` · `ClaudeBot` · `Claude-User`（Claude-Web）· `PerplexityBot` · `Perplexity-User` · `Google-Extended` · `Applebot-Extended` · `Bytespider` · `CCBot`

> 註：`Google-Extended` 只影響 Gemini 訓練授權，**不影響 AI Overviews**（走 Googlebot）。`CCBot` 屬訓練語料通道，與被引用無因果關係，若 K3 想收緊訓練授權可單獨改 Block，不影響 AI 搜索引用。

---

## 二、2 條 WAF 自定義規則（Security → WAF → Custom rules，免費版 5 槽用 2）

### 規則 1：正規搜索爬蟲快速通道（必須排最前）

- 名稱：`Allow Verified Search Crawlers`
- Expression：

```
(cf.verified_bot_category eq "Search Engine Crawler")
```

- Action：**Skip** → 勾選「All remaining custom rules」（跳過後續自定義規則）
- 目的：Googlebot / Bingbot 永不觸碰下方挑戰規則，保 SEO 基本盤

### 規則 2：疑似抓取型 UA 精準挑戰

- 名稱：`Challenge Scraper UAs`
- Expression：

```
(not cf.client.bot
 and not cf.verified_bot_category in {"Search Engine Crawler" "AI Crawler"}
 and not http.request.uri.path contains "/api/"
 and (http.user_agent contains "scrapy"
      or http.user_agent contains "python-requests"
      or http.user_agent contains "python-urllib"
      or http.user_agent contains "Go-http-client"
      or http.user_agent contains "curl/"
      or http.user_agent contains "Wget"
      or http.user_agent contains "HTTrack"
      or http.user_agent contains "SiteSucker"
      or http.user_agent contains "bot" and not http.user_agent contains "WhatsApp"))
```

- Action：**Managed Challenge**（不用 Block——給誤傷的真人留一條驗證通道）
- 目的：hkprint58 類整站鏡像工具（HTTrack／scrapy／腳本 UA）被擋在邊緣；AI 爬蟲走 `AI Crawler` 類別豁免；支付 webhook（/api/）豁免；WhatsApp 鏈接預覽豁免
- 注意：hkprint58 若改用真人瀏覽器 UA，此規則攔不住——**這是預期內的**，防線重心在第三部分 DMCA 與首發時間戳，不在貓鼠遊戲

### 可選第 3 條（免費版 1 條 rate limiting，建議開）

Security → WAF → Rate limiting rules：同一 IP **10 秒內 > 100 次請求** → Block 10 秒（免費版僅此檔位）。排除 `/api/`。防高頻批量抓取，真人瀏覽永遠碰不到此閾值。

---

## 三、DMCA 證據包模板（兩線投訴）

### 3.1 證據清單（先收齊再投訴）

| 項 | 內容 | 取得方式 |
|---|---|---|
| E1 對照表 | 我方原創 URL ↔ hkprint58 抄襲 URL，逐對列出（首頁／分類頁／產品頁／blog，至少 10 對） | 逐頁核對，見 3.3 模板 |
| E2 截圖 | 每對頁面雙方全頁截圖，標註相同段落；**必含 hkprint58 餐牌印刷產品標題殘留「鑫印吧 ZprintPro · 訂製」那一條**（自證抄襲鐵證） | 瀏覽器全頁截圖，檔名含日期 |
| E3 首發時間 | 我方頁面 git 首次提交時間：`git log --follow --format="%ai %h" -- <檔案> | tail -1`；GSC 首次收錄日期 | 本地 repo + GSC |
| E4 原創檔號 | 頁腳「原創檔號 ZP-OC-2610」+ 深圳平湖廠房原創聲明截圖 | 網站頁腳 |
| E5 身份文件 | 深圳市彩龍印刷包装有限公司營業信息、聯絡人與域名所有權（whois／CF 帳號截圖） | K3 自備 |

### 3.2 投訴通道（兩線並行）

1. **Cloudflare Abuse（DMCA）**：https://abuse.cloudflare.com/dmca → 填表要求轉送侵權通知至 hkprint58 源站主機商。附上 E1–E5。
2. **Google 法律移除（對排名保護最直接）**：https://support.google.com/legal/troubleshooter/1114905 → 選「著作權／Copyright」→ 逐條提交抄襲頁 URL 請求從搜索結果下架。Google 核准後抄襲頁失去搜索曝光，我方原創頁取而代之。

### 3.3 投訴正文模板（英文，直接複製填寫）

```
Subject: DMCA Takedown Notice – hkprint58.com wholesale copying of zprintpro.com

I am the authorized representative of Shenzhen Cailong Printing & Packaging Co., Ltd.
(深圳市彩龙印刷包装有限公司), owner of the website https://zprintpro.com (brand: ZprintPro / 智印港).

1. ORIGINAL WORKS: The category structure, product descriptions, pricing tables,
   service copy (e.g. "即日急件 18:00 截單，翌日中午 12:00 前送達") and blog articles
   originally published on zprintpro.com since [首發日期, per E3].

2. INFRINGING MATERIAL: https://hkprint58.com/ has reproduced the above content
   wholesale, including our category taxonomy, "適配行業" phrasing and exact prices
   (HK$0.25/張, HK$0.22/張, HK$3/個). One of their product titles still contains our
   brand name verbatim: "餐牌印刷 · 防水防油可水洗 | 餐廳/咖啡店/酒吧菜單 | 鑫印吧
   ZprintPro · 訂製" — direct evidence of copy-paste from our site. [附 E2 截圖]

3. URL PAIRS: [逐對列出 E1 對照表，至少 10 對]

4. I have a good-faith belief that the use of the material described above is not
   authorized by the copyright owner, its agent, or the law. The information in this
   notice is accurate, and under penalty of perjury, I am authorized to act on behalf
   of the owner of the exclusive right that is allegedly infringed.

Contact: zprintpro@outlook.com · +86 198 8085 1334
Signature: [K3 姓名 / 唐运提] · Date: 2026-11-21
```

---

## 四、驗收（配置後 10 分鐘內做完）

```bash
# 1. AI 爬蟲應該 200（逐個換 UA 測）
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; GPTBot/1.0)" https://zprintpro.com/zh-hk/
# 2. Googlebot 應該 200（永不進挑戰）
curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" https://zprintpro.com/zh-hk/
# 3. 抓取型 UA 應該 403 / 挑戰頁
curl -s -o /dev/null -w "%{http_code}\n" -A "python-requests/2.31.0" https://zprintpro.com/zh-hk/
# 4. robots.txt 保持 12 類 Allow 不變（本次不改代碼）
```

- [ ] 三條 curl 結果符合預期（200 / 200 / 403或挑戰）
- [ ] GSC → 網址審查抽查 2 個頁面，Google 仍可取回並渲染
- [ ] DMCA 兩線提交回執截圖歸檔 `.hermes/logs/`
- [ ] 一週後覆核：GA4／CF AI Crawl Control 後台看 AI 爬蟲到訪量是否恢復；hkprint58 是否停止更新抄襲頁

## 五、邊界與紀律

- 本單全部為 Cloudflare Dashboard 與外部投訴操作，**不改代碼、不動 robots.txt**（已是正確狀態）、不 push。
- 若開關 1–5 核對後 AI 爬蟲仍 403，回頭逐項對照「CF 社區同型案例：custom domain 403 但 pages.dev 正常 = zone 級規則殘留」，把當時截圖帶回給 Kimi 定位。
- 預期管理：技術手段無法 100% 杜絕抓取；**首發時間戳 + 快速收錄 + DMCA 下架**才是排名主權的三根柱子。

---

## 六、API 自動化執行路徑（2026-11-21 追加：取代第一/二部分的手動點選）

**腳本**：`scripts/cf-apply-ai-and-waf-20261121.ps1`（純 ASCII、PS 語法已校驗；備份 → 差異展示 → 應用 → 邊緣驗證 → `apply-result.json` 全流程）

### K3 唯一手動步驟（約 3 分鐘）：建 API Token

1. dash.cloudflare.com → 右上頭像 **My Profile → API Tokens → Create Token → Custom Token**
2. 權限三條（最小必要）：`Zone.Zone = Read`、`Zone.Bot Management = Edit`、`Zone.Zone WAF = Edit`
3. Zone Resources：Include → Specific zone → `zprintpro.com`
4. 建好後**只在本機 shell 設環境變數，絕不寫進倉庫任何檔案**（SECRET_LEAK 門禁）：

```powershell
$env:CF_API_TOKEN = "<貼上 token>"   # 僅當前 session；勿存檔
```

### 執行（同 session，先預覽後應用）

```powershell
# 預覽：備份現狀 + 顯示差異，不改任何東西
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\cf-apply-ai-and-waf-20261121.ps1"
# 確認無誤後應用 + 自動驗證
powershell -NoProfile -ExecutionPolicy Bypass -File "F:\zprintpro-nextjs\scripts\cf-apply-ai-and-waf-20261121.ps1" -Apply
```

### 腳本覆蓋範圍與邊界

| 原手動項 | 自動化方式 |
|---|---|
| 開關 1 Bot Fight Mode → OFF | `PUT /zones/{id}/bot_management {fight_mode:false}` |
| 開關 2 Block AI bots → 不攔截 | 同端點 `{ai_bots_protection:"disabled"}`（邊緣放行後，AI Crawl Control 逐爬蟲開關無需逐一操作） |
| 開關 3 AI Crawl Control 名單 | 邊緣全放行由上一項達成；`ai_search/ai_training/ai_user` 腳本**只讀不寫**，列出現值供 K3 政策拍板 |
| 規則 1+2 WAF | Rulesets API 冪等 upsert（按描述去重，保留既有規則，skip 排最前） |
| 驗收三條 curl + robots.txt | 腳本自動跑，並檢查 **Cloudflare managed robots.txt 注入 bug**（dashboard 顯示 Allow 但 served robots.txt 被注入 Disallow 的已知問題） |
| DMCA 兩線投訴 | **不可自動化**（需身份聲明與法律具結），仍按第三部分手動提交 |

### 注意

- Token 洩漏 = 域名安全事件；只用 env var，腳本與備份檔均不含 token。備份目錄：`.hermes/backups/cf-ai-waf-20261121/`。
- 若 `-Apply` 報權限錯（403），即 token 權限缺項，按上方三條權限補齊重跑即可（冪等，可安全重複）。
- 後續飛輪掛鉤：同一 token 可讓 watchdog 每週拉 AI Crawl Control metrics（免費版僅 24h 窗口，故需定時快照）與 Pages 構建狀態，補上 11-20 部署盲區——另立任務單，不在本批。

---

## 七、執行結果（2026-11-21 13:2x，Kimi 以 User-scope token 實跑）

**已應用（apply-result.json 存證於 `.hermes/backups/cf-ai-waf-20261121/`）**：
- `fight_mode`：True → **False**（本次修復核心：免費版 Bot Fight Mode 無差別攔截已解除）
- `ai_bots_protection`：本來就是 disabled，維持
- WAF 自定義規則：1 → **3 條**（新增 verified-search skip + scraper UA managed challenge，保留 10-16 anti-scrape block，skip 排最前）
- 備份：bot_management / waf-custom / ratelimit 三份 before JSON 已存

**邊緣對照測試**：
| 測試 | 結果 | 解讀 |
|---|---|---|
| Chrome 真人 UA | **200** | 真實訪客不受影響 |
| 空 UA | **403** | anti-scrape 生效 |
| 偽裝 Googlebot UA | 403 | **預期行為**：`cf.verified_bot_category` 需 IP+rDNS 驗證，偽裝 UA 不是 verified bot → 命中挑戰規則。真 Googlebot 走 skip 快速通道 |
| 偽裝 GPTBot UA | 403「Your request was blocked」 | **發現政策不一致**：`ai_training=disallow` 在邊緣主動攔截訓練型爬蟲（GPTBot/ClaudeBot/CCBot），與 robots.txt 的 Allow 方向相反 |

**待 K3 拍板（唯一遺留政策項）**：`ai_training` 目前 `disallow`。
- 維持 disallow（預設建議）：GPTBot 等訓練爬蟲被擋，但 **AI 搜索引用不受影響**（ChatGPT 引用走 OAI-SearchBot/ChatGPT-User，Perplexity 走 PerplexityBot，均屬 search/user 通道）；等於保留內容訓練授權主權。
- 改 allow：與 robots.txt 完全一致、追求最大 AI 語料曝光，一條 API 即可改。
- 真實 AI 爬蟲到訪驗證：無法靠偽裝 UA 測試，需 24–72h 後看 AI Crawl Control → Metrics（免費版 24h 窗口）+ GSC 網址審查各一次。

**Token 衛生**：User-scope `CF_API_TOKEN` 仍持久保存中。若近期不做每週 metrics 拉取，建議清除：
`[Environment]::SetEnvironmentVariable('CF_API_TOKEN',$null,'User')`

**K3 拍板（2026-11-21 13:25）**：ai_training 維持 disallow，無需 API 改動；DMCA 證據包已生成於 `重要文件/dmca-evidence-2026-11-21/`（E1 對照表 11 對、E3 git 時間戳、Google 移除 URL 清單、可貼上投訴正文），待 K3 補 E2 截圖與簽名後提交兩線。

---

## 八、72 小時對賬檢查點（DeepSeek Harness 執行，2026-11-24 13:37）

**執行層**：DeepSeek Harness（dsh headless）＋ Windows Task Scheduler 一次性任務 `ZP-ai-crawler-recheck-20261124`（K3 指定，不走 Kimi 執行層、不耗 Kimi credits）。

**已就緒**：
- Prompt：`.hermes/cron-prompts/ai-crawler-72h-recheck-20261124.md`（基線核對／三向邊緣抽驗／AI 到訪 metrics／hkprint58 sitemap 複查／DMCA 回執檢查／寫中文對賬報告，只讀不改碼）
- Wrapper：`scripts/tmp-run-ai-recheck-20261124.cmd`（純 ASCII，日誌 `.hermes/logs/ai-recheck-20261124-wrapper.log`）

**註冊（需管理員，非提升會話實測 Access Denied）**——管理員 PowerShell 執行一次：

```powershell
schtasks /Create /TN "ZP-ai-crawler-recheck-20261124" /SC ONCE /SD 2026/11/24 /ST 13:37 /TR "F:\zprintpro-nextjs\scripts\tmp-run-ai-recheck-20261124.cmd" /F
```

核對：`schtasks /Query /TN "ZP-ai-crawler-recheck-20261124" /FO LIST`

**產出**：`.hermes/logs/2026-11-24-ai-crawler-72h-recheck.md`（VERDICT/CONSUMED/DELIVERED/NEXT 格式）。

**跑後清理**（一次性任務不會自刪，/Z 與 ONCE 在本機不兼容）：

```powershell
schtasks /Delete /TN "ZP-ai-crawler-recheck-20261124" /F
```

**註冊核對（2026-11-21 13:39）**：`schtasks /Query` 確認 `\ZP-ai-crawler-recheck-20261124` 已存在，下次運行 **2026/11/24 13:37:00**，狀態就緒。本項關閉。
