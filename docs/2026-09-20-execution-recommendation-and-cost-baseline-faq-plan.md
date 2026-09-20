# 2026-09-20 三車道交付匯總核驗 + 深度執行建議（blog 長文缺口批）

**日期**：2026-09-20 20:45（Asia/Shanghai）
**性質**：匯總核驗 + 執行順序裁決建議（K3 拍板用）
**數據來源**：
- git 實查：`git fetch origin main && git fetch origin_ssh main` 後 `rev-list --left-right --count`（0/0）、`git log origin/main..HEAD`（空）、`branch --contains` ×5 commits
- 線上實測：`curl -sL` 三語首頁 / blog 索引 ×3 / `hong-kong-printing-cost-baseline-2026` ×3 / `drink-menus` PDP / `poster-printing-guide` ×3 / `campus-education-printing-pillar-guide` ×3（buildId `tgobJiBzX238rRrJO10kz`）
- 本地實查：`src/data/blog-data/zh-hk.json`（該文 content 字數/FAQ 計數）、`.hermes/regression-guard/pillar-wordcount-targets.json`、托管技能 `zprintpro-self-evolution-hardening/SKILL.md` 全文結構
- 聯網研究：[hkdesignpro 香港印刷價錢指南](https://hkdesignpro.com/blog/hk-printing-price-guide/)（2026-06-12 發佈、07-16 更新，權威級 B）、[hkdesignpro 書籍印刷公司比較](https://hkdesignpro.com/blog/hk-book-printing-companies/)、[淘寶 2026 小批量相冊報價指南](https://world.taobao.com/lang/zh-tw/shopping-guide/2007011380112130048.htm)、[AnyPrint 價目表](http://anyprint.hk/W5/pricelist.php?ppid=1032)

---

## 一、結論先行（執行順序建議）

| 優先級 | 事項 | 依據 | 誰拍板 |
|---|---|---|---|
| **P0** | ~~確認 deploy~~ ✅ **已完成**（本報告 §二） | 線上實測新 buildId + 新文案已生效 | 無需行動 |
| **P1a** | set -e 剩餘 **7 處**修復（交付方只點了 3 處，漏 4 處） | §三：lane 映射只看 returncode 非零，修復不改語義 | K3 一句話 |
| **P1b** | 交接去重：舊 handoff 文檔頭部加指向活書的指引；兩探針互引 | §四：技能本體已完整併入（避坑 1–24 全在） | 可自執行 |
| **P2** | **batch C：hk-cost-baseline 三語補 FAQ ×6**（本文 §五 附題庫與寫法） | §五：三語 FAQ=0 = 段 11 硬 FAIL + 競品已有 FAQ 的 AEO 差距 | K3 授權後執行 |
| **P3** | 方案 C 第二、三步（sku-seo-data 增量合併生成器 + anchor 精度 277） | hazard 文檔 §四：建議方案 C | 獨立一輪 |
| **P4** | 638 條 dirty 三分類清理 | 交付方已盤點未動手 | K3 裁決後獨立一輪 |

---

## 二、🔴 重大更正：deploy 阻塞已解除（上一車道的結論已過時）

**上一車道 20:2x 的結論**：「live build JWvFK4GkoQDgcg7et72KI 不匹配任何 commit，線上驗證不可行」——**本輪 20:45 複測已不成立**：

| 探針 | 20:2x（他們測） | 20:45（我測） |
|---|---|---|
| buildId | `JWvFK4GkoQDgcg7et72KI` | `tgobJiBzX238rRrJO10kz`（**已換新 build**） |
| zh-hk `drink-menus` title | 「10**本**起」（舊值） | 「10**份**起 HK$12起 \| 智印港」（= 今日批次新值） |
| 正文起印量語料 | — | 「酒水牌 10**張**起印」已生效 |

⇒ 今日 19:36 / 20:13 / 20:25 批次**已全部上線**。上一車道建議的「deploy 確認前不做 C」前提消失，**batch C 可立即啟動**（仍需 §七的鎖條件）。

**附帶發現（候選新漂移）**：`drink-menus` 線上 title 用「10**份**起」（unitLabel 真值，正確），正文用「10**張**起印」——份/張 跨層不一致，疑為門童 #24 待裁決 277 條之一，建議併入 anchor 精度批核實，不單獨開輪。

## 三、set -e 修復：建議拍板「修」，且是 7 處不是 3 處

交付方只點了 L26 / L49 / L62，實際同族不可達提示 **7 處**（含他們本輪新增的 3.8 塊）：

| 位置 | 區塊 | 現狀 |
|---|---|---|
| L26-29 | 1 Encoding | `cmd; if [ $? -ne 0 ]` 不可達 |
| L49-58 | 2.5 blog-data 攔截支 | 同上 |
| L62-64 | 2.5 警告支 | 同上 |
| L78-89 | 3 反審門童 | `cmd; EXIT_CODE=$?` 同樣永不執行 |
| L99-107 | 3.5 品牌基線 | 同上 |
| L184-191 | 3.8 hook 同步 | 同上（本輪新增卻用舊寫法） |
| L197-207 | 4 DoD 鐵律 | 同上 |

**lane 映射安全性（實查證據）**：`scripts/lane-git-commit.py:160-175` 的 exit 4 映射只判 `git commit` returncode 是否非零，**不讀 hook 的具體 exit code 值、不匹配輸出字串**。`if ! cmd; then ... exit 1` 與 set -e 靜默退出在 git 視角完全等價 → 修復不改變任何映射語義。交付方的顧慮屬過度謹慎誤判，**建議 K3 拍板：7 處全修**。

## 四、交接去重裁定：技能無碰撞，剩文檔/探針互引

實查托管技能 `SKILL.md` 全文結構：**避坑 1–24 全在**（§一 1-8 舊輪 + §五 9-19 車道 B + §八 20-24 車道 A menus 輪），能力 1–11 全在（§二 1-5 + §六 6-9 + §九 10-11），兩車道追加式寫入**無覆蓋**——「兩套並存」的擔憂在技能層不成立。

剩兩處真實重疊，建議處置：

1. `docs/2026-09-20-handoff-12seg-and-b2b3.md`（車道 A 舊交接）→ 頭部加一行「**本文件已被 `docs/2026-09-20-handover-living-book.md` 取代（§0 關聯產物入口），僅存檔**」，不刪（取代式標注，對應能力 8）。
2. `scripts/probe-skill-handover.mjs`（車道 B）與 `.hermes/_probe-pb/probe-self-evolution-skill.sh`（車道 A）→ **互引而非二選一**：各在頭部註明對方存在與分工（前者檢技能+活書+常量，後者檢 12seg/B2B3 交付物）。⚠️ 後者在 `_probe-pb/` 下屬「可清理」命名空間（避坑 22），建議下輪遷出或明確列入保留清單。

## 五、batch C 深度方案：hk-cost-baseline 三語補 FAQ

### 5.1 缺口實測（線上 curl + 本地 JSON 雙查）

| locale | HTTP | FAQ 組數 | FAQPage 生成 | H2 | 表格 | 正文字數 |
|---|---|---|---|---|---|---|
| zh-hk | 200 | **0** | **無** | 9 | 2 | ≈5,952 字符 |
| en | 200 | **0** | **無** | 9 | 2 | ≈9,756 詞 |
| ja | 200 | **0** | **無** | 9 | 2 | ≈4,442 詞 |

- **段 11 硬 FAIL**：FAQ ×4-8，現為 0 組（低於 4 組硬線）。
- **段 12 連帶 FAIL**：`schemas` 元數據**聲明** `FAQPage`，但 content 無可解析 FAQ → page.tsx `extractFaqFromHtml` 返回 null → 線上無 FAQPage 塊。這正是「宣言 ≠ 生效」（避坑 17）與 SSoT §3.2「段 12 必須線上 curl 斷言」的活案例。
- **字數**：zh-hk 5,952 < 2026Q3 floor 6,000（`pillar-wordcount-targets.json`，9/30 到期）→ 補 FAQ 約 +500-700 字符後**剛好過線**，一舉兩得。ja 4,442 亦低，同樣受益。
- **對照組合規**：`poster-printing-guide` ×3 locale 與 `campus-education-printing-pillar-guide` ×3 locale 本次複測 FAQPage/Article/HowTo 全在、FAQ 5-7 組——證明缺口是**這一篇特有**，不是系统性回退。

### 5.2 競品研究（AEO 差距證據）

[hkdesignpro 價錢指南](https://hkdesignpro.com/blog/hk-printing-price-guide/)（B 級權威，早我們 3 個月上線）已有 3 題 FAQ 且每題吃搜索意圖：「參考價 vs 正式報價出入」「報價要提供咩資料」「設計費點分開計」。我們的基準報告數據密度更高（16 品類 99 SKU 牌價 + 起訂量分佈 + FSC 溢價實測），**唯獨缺 FAQ 答案層**——等於拿了更好的數據卻在答案引擎層讓位。FAQ 形態對 AI 引用提升約 70-80%（SSoT §3.1 依據彙總），此批 ROI 明確。

### 5.3 題庫（7 組候選，選 6；全部可用本文已有數據自包含作答，零無來源數字風險）

| # | 題（zh-hk 示範） | 答案數據來源（本站實測） |
|---|---|---|
| Q1 | 網上參考價同正式報價點解會有出入？ | 本文「計算方法」段（basePrice=下限非均值、報價帶按 SKU） |
| Q2 | 想報價快又準，要提供咩資料？ | 品項/尺寸/頁數/紙款克重/色數/裝訂加工/數量/交期/檔案（9 項，對標競品同題） |
| Q3 | 起訂量 100 張係點嚟？可唔可以少啲？ | 起訂量分佈段（日曆 1,000=製版經濟、婚禮 50=單價攤薄邏輯） |
| Q4 | 數碼定柯式點揀？ | 裝訂/工藝段 + 同業 300-500 份分界（hkdesignpro 佐證） |
| Q5 | 打樣、設計費包唔包？ | 本站 2 小時免費數碼打稿（對同業 $300 起，不點名） |
| Q6 | 加急同運費點計？ | HK$500 順豐免運、DHL 2-4 天、加急 24h（產品頁口徑） |
| Q7 | 環保紙會貴幾多？ | FSC 零溢價 / 再生傳單 +52% / 環保利是封 +73%（本文原創數據段） |

### 5.4 執行規格（照 SSoT，不創新）

1. **B3 五要件**：`<p><strong>Qn: 问?</strong><br/>A: 答</p>`（寫前跑 `node .hermes/_probe-pb/precheck-faq-format.mjs`）；答案 40-80 詞；首句 8-12 詞直答；自包含；5-8 組。
2. **三語同步**：zh-hk 粵語書面口徑（對齊本文現有語域）；en/ja 各自語域，**ja 量詞用「枚」**（65198c97 教訓：「份」是中文量詞，且简繁同形，i18n 門童結構性攔不住）；禁止跨語種直譯量詞。
3. **驗收三閘**：① 門童 #14 checklist（段 11/12 逐項）；② 線上 curl 斷言 FAQPage 生成（禁只 JSON.parse content）；③ 語言審計（`scripts/audit-sku-locale.cjs` 同族工具口徑）。
4. **churn 紅線**：只**追加** FAQ 段，不改既有 9 個 H2 正文（存量不動原則）。
5. **數據誠信**：FAQ 答案內每個數字須能在本文表格或產品頁找到來源（§0.23）。

## 六、已被證偽/過時的聲稱清單（防下一輪誤食）

| 聲稱 | 實查 | 性質 |
|---|---|---|
| 「本地待推 d45bd4d9 / a909538f / 885d03d9」 | 三 commit 全在 main 歷史且 origin/main=HEAD（0/0），**已推** | 未 fetch 的 stale ref 假積壓（避坑 14/20 **活例**，發生在本報告撰寫前 15 分鐘內） |
| 「收尾信號未滿足（MM 8 + staged 刪除 35）」 | 現 src/ MM=0、staged 刪除=0；但 peer 20:40 仍有寫入（條件 ② 未滿足） | 條件 ① 已過時，條件 ② 仍生效 |
| 「線上未部署今日代碼，驗證不可行」 | buildId 已換、新文案已生效 | §二，已解除 |
| 「兩套技能交付並存需裁定」 | SKILL.md 避坑 1-24 全在無碰撞 | §四，僅文檔/探針需互引 |
| 「9 commits pushed, not 5」 | 現 origin..HEAD 為空，全推 | 屬實但已收斂 |

## 七、風險與前置條件

1. **鎖協議（§0.35.7）**：batch C 寫 `src/data/blog-data/*.json`，動工前必查 `SESSION_LOCK.md` + `lane.lock`，且須 **peer ≥15 min 無寫入**（20:40 有寫入記錄，須等窗口）。
2. **build quota（§0.25）**：batch C + set-e 修復 + 去重指引攢 1 次 push；方案 C 獨立輪再 1 次。
3. **門童 #24**：改 blog-data 不觸發 MOQ 閘門（非 5 檔目標），但提交時仍走全量門童。
4. **活書滯後**：§2 快照停在 20:14（HEAD 43945538），現 HEAD c2be2f2f——建議下一輪收尾時更新快照（活書規矩：每次收尾必更新）。

---

*本報告為只讀分析，未改任何版本控管檔。*
