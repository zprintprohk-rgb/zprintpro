# 2026-11-07 · ZP-blog-deepfix 车道报告（三项 remeasure 复测 → 全部 MEASURE，零文章；1 个价格下限缺陷登记待下一轮带门禁修）

VERDICT: OK
CONSUMED: `run-context-ZP-blog-deepfix.json` @ 2026-11-07 23:47:00（preflight 9/9 ok / retry_queue 空 / lock pid 44956）| `lane-status.json` @ 2026-11-07T14:48:17Z（verdict ATTENTION / 9 problems）| `lane-results-bus-contract.md` | `blog-money-keyword-queue.json`（updated_at 2026-11-07，8 项，3 项 remeasure 到期）| `gsc-2026-11-07-money-keyword-delta.json`（28d 窗口 2026-10-08..11-04）| `money-kw-share-baseline-2026-10-31`（query×page，7 天龄，仅归因）| `src/data/products.ts`（a4-flyers / a5-flyers 真值）| lane.lock（本车道持有）· SESSION_LOCK.md（无活跃人手锁）
DELIVERED: `.hermes/logs/blog-remeasure-triage-2026-11-07.json`（三项 baseline→11-03→11-07 观测、7d 交叉核对、query×page 承接、线上复核、owner/retry_at/exit_criteria、F-01 精确补丁）＋ 本报告。**零 `src/` 写入、零 `blog-data` 写入、零队列写入**（理由见 §6）
NEXT: **2026-11-14** ① 三项同词同窗复测（新一档 28d，约 10-15..11-11，以实际导出为准 + 7d 交叉），先看 windows 是否同向再判；② 带门禁落 F-01 flyer 价格下限补丁（2 格 + 1 句，见 §4）；③ books 复测改用 `教科書印刷`/`教材 印刷製本` 或 textbook-guide 的 page-level 指标，不再用 `書刊印刷`/`印書` 评价该页。仍无可证信息增益 → 继续 MEASURE，不产文。
OUTPUT: MEASURE (0 articles written; 3/3 remeasure items triaged; 1 P2 defect registered)
数据来源: `gsc-2026-11-07-money-keyword-delta.json`（28d 2026-10-08..11-04 / 7d 2026-10-29..11-04）· `money-kw-share-baseline-2026-10-31.json`（query×page）· `blog-money-keyword-queue.json`（updated_at 2026-11-07）· `src/data/products.ts` L1911-2069 · 线上 GET flyer/textbook 两页 2026-11-08 00:0x +08；明细见文末 §数据来源

> **VERDICT 释义（防误读）**：本行 `OK` = **车道执行完成 + 当日报告 + 可核验产物**（契约 §6.3），**不是**「文章已交付」，**不是**「带钱词排名改善」，**不是**「10-31 复写被证明有效」。本轮真实产出 = 三项复测判定 + 1 个可追溯缺陷定位；内容侧 0 篇，因为三项均无可证的信息增益（§3）。

---

## 0. 一句话结论

**三项 7 天复测全部到齐，但没有一项支持「再写一篇」：flyers 的排名页是 category 而不是 blog（87%/77% 承接），stickers 的 28d 与 7d 方向互相打架且主 URL 仍待 K3 裁定，books 的交付页（textbook-guide）根本不是 `書刊印刷`/`印書` 的承接页（承接页是 book-buying-guide 45.5%/34.5%）。** 因此本轮按 FLYWHEEL 块输出 `MEASURE`，把预算放在「谁在接词、能不能测、缺什么证据」上，并顺带查出一个页面自身的价格下限矛盾（A5 HK$0.08 / A4 HK$0.15 低于 SKU 阶梯任何可产生价）。

---

## 1. 结果总线消费（第 -1 优先级）

| 项 | 事实 | 本轮处置 |
|---|---|---|
| `preflight` | 9/9 ok；`retry_queue` **空**；`previous_run.verdict=OK` @ 2026-10-31 | 无 RETRY_OF；无重复交付 |
| `previous_run.report` | `.hermes/logs/2026-10-31-ZP-blog-deepfix.md`（第 6 轮 books）；files=`src/data/blog-data/zh-hk.json`；`pushed:false` | 10-31 三轮（第 4/5/6 轮）共交付 3 篇（flyers/stickers/books），**本轮全部未重做**；线上复核见 §2.4 |
| `lane-status` | `ATTENTION`，9 problems：daily-content FAILED / gsc-feedback FAILED / weekly-meta BLOCKED / monthly MISSING / k3-review MISSING | 只读消费；不代跑、不改其结论；本车道不因同侪失败而停摆 |
| 同侪文件面 | daily-content 21:18 定时轮 files=[]（同侪 18:17 harness 轮据其报告亦 src 零写入）；gsc-feedback 只写 `docs/assets/2026-11-07/` + 2 个 `.hermes/logs` 文件 | `src/data/blog-data/*.json` 今日无他人写入；队列今日（2026-11-07）已被分析会话更新 → **本轮不改队列**（§6） |
| 锁 | `lane.lock` = 本车道 pid 44956；`SESSION_LOCK.md` 最后一条为 2026-10-23 已释放 | 可写判定成立；但因门禁不可执行，本轮仍不写 src |

---

## 2. 复测：冻结 baseline → 11-03 → 11-07（同词、同 xlsx 口径）

### 2.1 flyers-zh-hk

| query | 冻结 baseline（09-30..10-27） | 11-03（10-04..10-31） | **11-07（10-08..11-04）** | Δ vs 冻结 | 7d 交叉 | 判定 |
|---|---|---|---|---|---|---|
| 宣傳單張 | 117 / 0 / 29.37 | 121 / 0 / 33.74 | **127 / 0 / 34.73** | +10 imp / **+5.36 位** | 40 imp @38.67（+1.95，更差） | **两窗连续恶化** |
| 宣傳單張印刷 | 103 / 0 / 29.02 | 113 / 0 / 29.31 | **117 / 0 / 28.90** | +14 imp / −0.12 位 | 33 imp @29.42（−0.55，微好） | 稳定（深位） |

### 2.2 stickers-zh-hk

| query | 冻结 baseline | 11-03 | **11-07** | Δ vs 冻结 | 7d 交叉 | 判定 |
|---|---|---|---|---|---|---|
| 貼紙印刷 | 120 / 0 / 40.88 | 127 / 0 / 38.06 | **131 / 0 / 37.65** | +11 imp / **−3.23 位** | 44 imp @28.43（−4.88，更好） | 改善，但第二窗 −0.41 不过阈 |
| 貼紙訂製 | 34 / 0 / 32.41 | 34 / 0 / 30.59 | **38 / 0 / 29.29** | +4 imp / **−3.12 位** | 14 imp @25.93（**+7.50，更差**） | 28d 改善 vs 7d 恶化 → **反向** |

### 2.3 books-zh-hk

| query | 冻结 baseline | 11-03 | **11-07** | Δ vs 冻结 | 7d 交叉 | 判定 |
|---|---|---|---|---|---|---|
| 書刊印刷 | 101 / 0 / 32.28 | 112 / 0 / 31.98 | **121 / 0 / 33.08** | +20 imp / +0.80 位 | 41 imp @36.54（+4.51，更差） | 非连续（−0.30 → +1.10） |
| 印書 | 52 / 0 / 31.96 | 56 / 0 / 31.50 | **56 / 0 / 31.38** | +4 imp / −0.58 位 | 16 imp @30.94（−1.93，更好） | 基本稳定 |
| 教科書印刷 | — | — | **无精确/包含行** | — | — | `NO_CURRENT_BASELINE` |

### 2.4 线上复核（production_deploy / online_verify）

| 页面 | 状态 | 证据 |
|---|---|---|
| `/zh-hk/blog/flyer-printing-guide/` | **200，10-31 复写已在线上** | 可见「快速答案：宣傳單張印刷幾錢？」「10 張起印、HK$0.25 起/張」「數碼 10 張／柯式 100 張」 |
| `/zh-hk/blog/textbook-printing-guide/` | **200，10-31 复写已在线上** | 可见「教科書 SKU 100 本起」「騎馬釘、膠裝、精裝 10 本起」「數據來源…2026-10-31 校準」 |
| `/zh-hk/blog/sticker-guide/` | 未单独复抓（同批另两页已证在线） | 同批同文件；本轮不据此声称独立 online_verify |

> **口径更正**：10-31 23:53 的总线记录（第 6 轮 books）为 `pushed:false`，但线上 flyer / textbook 两页已见 10-31 标记 ⇒ **production_deploy = true**（至少这两页已上线；sticker 未单抓）。推送机制（后续攒批 / 记录未更新）在本沙箱无 git 可查，不做推断。

---

## 3. 分流：为什么三项都不写文章

### 3.1 flyers = MEASURE（blog 不是该词的排名页）

- 10-31 query×page 实测：`宣傳單張` **87%** 落在 `/zh-hk/category/flyers/`（仅 2 个 URL）；`宣傳單張印刷` **77%** 落在同一类目（4 个 URL）。**blog 不在前二承接页内**。
- 因此 blog 再复写一篇，对这两个词的排名没有作用面；真正的杠杆在 category 的排名/摘要（它自己的 28d 页均位是 23.91，而该词落在 34.73，词位深于页均位）。
- 时间线也不支持「10-31 复写导致恶化」：11-03 档窗口 10-04..10-31 已见 33.74，恶化主要发生在 10-31 之前；7d 窗（10-29..11-04）虽再 +1.95，但只含 4 天变更后数据，单窗不判因果。
- **动作**：不改 blog；11-14 同窗复测。若 blog 进入该词前 3 URL 且份额 ≥10%，才谈「单变量内容修复」。

### 3.2 stickers = MEASURE（方向打架 + 主 URL 待 K3）

- `貼紙訂製`：28d 连续改善（−1.82 → −1.30），但 7d 恶化 +7.50（14 imp @25.93）——**两个窗不同向**，按两窗阈值规则不得宣布胜负。
- `貼紙印刷`：28d 改善 −3.23，但第二窗仅 −0.41（不过 0.5 阈）；且 10 个 URL 分流，第一是 category（33.9%），guide 只 26.9% 且位次 55.64。
- `FIX-20261031-PRIMARY-URL-MISMATCH` 仍 `WAITING_K3`：在 K3 认定主 URL 前复写 guide，会先替结构决策站队，违反「不自行扩大解释、不 301/canonical」。
- **动作**：不改 guide；11-14 看两窗是否同向再定。

### 3.3 books = MEASURE（指标与交付页错配，这是本轮最值钱的发现）

- 10-31 交付页 = `/zh-hk/blog/textbook-printing-guide/`；但 `書刊印刷` 的第一承接页是 `/zh-hk/blog/book-buying-guide/`（**45.5% @30.41**，category 44.6% @55.08），`印書` 第一也是 book-buying-guide（**34.5% @32.39**，catalog PDP 27.7%）。
- 也就是说：**用这两个词去复测 textbook-guide，测的不是被改的页**。它俩的平移不能证明复写成败；而 textbook-guide 自己的目标词 `教科書印刷` 在当前 28d 档**无任何行**（`NO_CURRENT_BASELINE`）。
- **动作**：11-14 前先修测量口径（要 `教科書印刷`/`教材 印刷製本` 行，或改用 page-level 指标），否则该簇永远只能得到「不可归因」的读数。

---

## 4. 本轮发现的缺陷（P2，已定位未落盘）

**F-20261107-FLYER-PRICE-FLOOR** — `/zh-hk/blog/flyer-printing-guide/` 第二张表（尺寸 / 適合場景 / 單張成本）与同页第一张表、以及 SKU 真值自相矛盾：

| 行 | 线上现值 | 真值（products.ts） | 判定 |
|---|---|---|---|
| A4 單面 | `HK$0.15-0.30` | basePrice **0.35**，price_range 0.35-0.95，最高 5 折 → 地板 **0.175** | 0.15 < 地板，**不可能价** |
| A5 單面 | `HK$0.08-0.18` | basePrice **0.25**，price_range 0.25-0.65，最高 5 折 → 地板 **0.125** | 0.08 < 地板，**不可能价** |

- 同页第一张表已写「A5 HK$0.25 起/張、A4 HK$0.35 起/張」，快速答案块也重复；第二张表把读者拉回 0.08，属于**同一页内两个价格标准**。
- 精确补丁（下一轮带门禁执行）：`HK$0.15-0.30 → HK$0.35 起`；`HK$0.08-0.18 → HK$0.25 起`；表后加一句「單張成本隨數量階梯變動：以上『起』為 100 張檔牌價，5,000 張按 5 折計算」。写域仅 `blog-data/zh-hk.json` 该 content 串，不动 title/excerpt/lastUpdated。
- **本轮未落盘的三条硬理由**：① pwsh 按 v9.4 注记在本车道禁用 → `check-encoding` / `tsc` / 内容门童无法执行，而车道 STOP_IF 明列「门禁失败」；② 该表需要「两格 + 一句」的一致改写，不是盲换字面量，且同一字面量在同文件另一篇文章也出现（易误伤）；③ 无 git 可核工作树字节级状态。**这是工具链约束，不是排期选择**。

---

## 5. 验收与门禁（真实执行到什么程度）

| 项 | 本轮 | 说明 |
|---|---|---|
| 结果总线 preflight | ✅ 读 | 9/9 ok；锁为本车道 |
| GSC 数据窗口 | ✅ 读 | 28d 10-08..11-04；7d 10-29..11-04；不与 24h 混算 |
| Δ 复算（双方法） | ✅ | 方法 A：三档原始行逐项相减；方法 B：delta JSON 的 `delta_position_*` 字段。抽查 6 项全一致（如 34.73−29.37=5.36；37.65−40.88=−3.23） |
| query×page 归因 | ⚠️ 7 天龄 | 11-07 导出无 join；只用 10-31 份额判「谁在接词」，不当今日 CTR 原因 |
| 线上探针 | ✅ 2/3 | flyer / textbook HTTP 200 + 标记在位；sticker 未单独复抓 |
| `check-encoding` / `tsc` / 门童 | ❌ 未跑 | pwsh 受限；因此**零 src 写入**，不产生未验证 diff |
| 队列回写 | ❌ 未写 | 11-07 观测已由当日分析会话写入（source=`gsc-2026-11-07-money-keyword-delta.json`）；重复追加会造成同日双条；且跨车道避让（§6） |
| git commit/push | — | 由 host-side wrapper 执行；本报告不含 push 声明 |

> 环境如实记录：本机 pwsh 本次**单次**文件大小查询返回了结果（与 v9.4 注记不符）；未据此执行任何门禁或写操作，未重试。

---

## 6. 幂等与跨车道避让

1. **不重做 10-31**：三篇复写已于 10-31 交付（flyer / textbook 线上已核，sticker 同批未单抓）；本轮无同题重写，符合「不重复做已完成的事」。
2. **不重复写观测**：`blog-money-keyword-queue.json` 的三项 `measurement_history` 已含 2026-11-07 条目（source=`gsc-2026-11-07-money-keyword-delta.json`）；本轮不再追加第二条同日记录。
3. **不改队列**：该文件今日已被分析会话更新（`updated_at=2026-11-07`），按 STEP 0「不得改写同侪今日动过的文件」本轮零写入。**且无需写**：三项 `recheck_after=2026-11-14` 已与本轮 NEXT 一致，状态机无需迁移。
4. **不改 src**：今日无同侪写 `blog-data`，但因门禁不可执行，仍不落盘（§4）。
5. **幂等键**：本轮 `e2c2a2a60f4db26d`，`lane-status.warnings` 的 4 条 DUPLICATE 均为 10-10/10-28/10-29/10-30 历史键，不含本键。

---

## 7. 下一验证点（owner / 证据 / retry_at / exit_criteria）

| 日期 | 动作 | owner | 证据 | exit_criteria |
|---|---|---|---|---|
| 2026-11-14 | 三项同词同窗复测（新一档 28d，约 10-15..11-11，以实际导出为准 + 7d 交叉） | ZP-blog-deepfix | 新 28d xlsx + delta JSON | 两窗同向才判；否则继续 MEASURE |
| 2026-11-14 | F-01 价格下限补丁 | ZP-blog-deepfix | products.ts L1911-2069 | JSON 可解析；两表同为 0.35/0.25；encoding+tsc+门童真实退出码；线上标记复测 PASS |
| 2026-11-14 | books 指标修正 | ZP-blog-deepfix + ZP-gsc-feedback | 需要 `教科書印刷`/`教材 印刷製本` 行或 page-level | 能指认「被改页」的读数；否则该簇保持不可归因 |
| 待 K3 | `FIX-20261031-PRIMARY-URL-MISMATCH` | K3 | 10-31 份额基线 | 主 URL 认定后，stickers/posters 才能谈承接动作 |

---

## SOP-10 5 问门禁（K3 §0.22）

- [x] **1. 架构差异？** 先读前序实现路径：10-31 队列交付记录、`periodic-review-weekly-2026-11-07`、10-31 query×page 基线、11-07 delta 档；确认交付页与承接页不同后才判「测错页」，未凭推断。
- [x] **2. 约束适用范围？** 查原文：契约 §6.1（blog 修旧文价格/意图/内链，不批量重写）、§7.2（不自行批准/不扩权）、FLYWHEEL 块（复测不是胜负、无信息增益 NO_OP）、§0.0（不碰贺卡资产/301）、§0.23（数字须真值）。本轮零 src、零队列、零 canonical/301。
- [x] **3. 原数据/拍板来源？** ① 来源：GSC 11-07 三档 xlsx（K3 08:41 导出，经同侪报告确认）+ 10-31 query×page 基线 + products.ts；② 真数据：三档逐项相减 + delta 字段双算一致；③ 留/撤：**零撤回**，10-31 读数在其窗口内继续有效。
- [x] **4. 字段值策略？** 不涉及 certNo/validUntil/issuer；无客户可见内容写入；价格只引 products.ts basePrice/price_range，不自造新价。
- [x] **5. Markdown 渲染？** 内部 `.hermes/logs/` 报告，非 user-facing；未引入需 `parseInlineLinks` 的链接语法。

## 数据来源（K3 §0.23）

```
数据来源:
- 结果总线: run-context-ZP-blog-deepfix.json (2026-11-07 23:47:00, preflight 9/9 ok, retry_queue 空, lock pid 44956) · lane-status.json (2026-11-07T14:48:17Z, ATTENTION / 9 problems)
- GSC: gsc-2026-11-07-money-keyword-delta.json (analysis_date 2026-11-07; 28d 2026-10-08..11-04; 7d 2026-10-29..11-04)
- 归因: money-kw-share-baseline-2026-10-31.json/.md (query×page, measured 2026-10-31T15:14Z; 仅归因，非今日业绩)
- 队列: blog-money-keyword-queue.json (updated_at 2026-11-07; 三项 measurement_history 已含 11-07 观测)
- 真值: src/data/products.ts L1911-1988 (a4-flyers: basePrice 0.35 / range 0.35-0.95 / minQuantity 10 / 5,000 張 0.5 折) · L1992-2069 (a5-flyers: 0.25 / 0.25-0.65 / 10 / 0.5 折)
- 线上: GET https://zprintpro.com/zh-hk/blog/flyer-printing-guide/ 200 · GET .../textbook-printing-guide/ 200 (2026-11-08 00:0x +08)
- 校准状态: 🟢 三档行级复算已校准 · 🟡 query×page 7 天龄 · 🟡 sticker 页未单抓 · 🔴 门禁未执行（pwsh 受限）
- 撤回声明: 无。本轮不撤回 10-31 读数；仅更正「10-31 pushed:false」与线上事实的表述（production_deploy=true）
- 口径声明: 无 blog 篇数/SKU 数/询盘/订单断言；无 GA4/008/订单数据（§0.37）；无 AI 引用结论；零客户可见内容写入
```

---

## 诚实边界

| # | 项 | 原因 |
|---|---|---|
| 1 | 未写文章 | 三项均无可证信息增益；写 = 为产量而写，违反 FLYWHEEL 块 |
| 2 | 未改价格表 | 门禁不可执行 + 需一致改写 + 字面量重复；已给精确补丁，非无限期搁置 |
| 3 | 未改队列 | 同侪今日已更新；且 `recheck_after` 已编码同一下一步 |
| 4 | sticker 页未单抓 | 同批另两页已证在线；不把「同批」冒充独立 online_verify |
| 5 | 无 page-level 读数 | 11-07 导出 page 表只到 top-20，三页均不在列；books 的错配结论来自 10-31 query×page，不是今日 join |
| 6 | 无 git 证据 | 沙箱内无 git；`pushed:false` 与线上事实的差异只记录，不解释机制 |
| 7 | 门禁未跑 | pwsh 受限；零 src 写入确保不会把未验证 diff 交给 wrapper |
| 8 | 三方证据 ①② | `lane-runs.jsonl` 与 wrapper 日志由 host 在本 lane 退出后写入；本报告只声称 ③ 当日报告 + ④ 23:47 触发/preflight 持锁 |

---

*Generated by DSH lane `ZP-blog-deepfix`（lane-results-bus-contract §6/§7 + FLYWHEEL-BLOG-REMEASURE-2026-11-07 + 2026-11-03 证据分流块 + sop-10-gate）· 2026-11-07 23:47 定时轮 · 仓根 `F:\zprintpro-nextjs` · 零 src 改动 · commit/push 由 host-side wrapper 执行*
