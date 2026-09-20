# menus DRIFT + 品牌-语种错配 — 只读凭证（待落盘批次）

> **性质**: 只读取证。**本文件不含任何已施行的 `src/` 改动。**
> **生成**: 2026-09-20 · 在 `SESSION_LOCK.md` 保护下生成
> **工具**: `scripts/verify-menus.cjs`（真值 vs 现状）· `scripts/audit-sku-locale.cjs`（结构解析）
> **原则**: 遵循 `LOCATE_BEFORE_PATCH` — 先 dump 真实文本再定位，禁止盲修。

---

## §0 真值来源（单一 SSoT）

`src/data/products.ts` 的 `minQuantity` / `unitLabel` 为**唯一真值**：

| SKU | minQuantity | unitLabel | 真值口径 |
|---|---|---|---|
| `pvc-menus` | 10 | 張 | 10 張起 |
| `laminated-menus` | 10 | 份 | 10 份起 |
| `hardcover-menus` | 10 | 本 | 10 本起 |
| `drink-menus` | 10 | 份 | 10 份起 |
| `disposable-menus` | 100 | 份 | 100 份起 |
| `wedding-menu-cards` | 50 | (无) | 50 套起（套为 SKU 自带口径） |

> ⚠️ **候选标题只能由 `products.ts` 实证字段构成，不得编造**（per `scripts/menus-evidence.cjs` 头注）。

---

## §1 事项 #1 — menus 文案层 DRIFT（7 处，已实测确认）

当量口径 = `scripts/guards/title-equiv.js`（全角 CJK ×2 / 其余 ×1）；目标区 **50–57**。

| # | SKU / locale | 当前当量 | 判定 | 声称起订 | 真值 | 缺陷类型 |
|---|---|---|---|---|---|---|
| 1 | `pvc-menus` / zh-hk | **66** | 🔴 超 57 → 需删 9 | **50本起** | 10 張 | 数值错 + 量词错 + 超格 |
| 2 | `laminated-menus` / zh-hk | **37** | 🟠 不足 50 → 需补 14 | 10 份起 ✓ | 10 份 | 仅长度不足（**文案正确**） |
| 3 | `hardcover-menus` / zh-hk | **37** | 🟠 不足 50 → 需补 14 | 10 本起 ✓ | 10 本 | 仅长度不足（**文案正确**） |
| 4 | `laminated-menus` / en | **62** | 🔴 超 57 → 需删 5 | — | — | 超格 |
| 5 | `hardcover-menus` / en | **62** | 🔴 超 57 → 需删 5 | — | — | 超格 |
| 6 | `disposable-menus` / en | **49** | 🟠 不足 50 → 需补 1 | — | — | 长度不足 |
| 7 | `disposable-menus` / ja | **46** | 🟠 不足 50 → 需补 4 | — | — | 长度不足 |

### §1.1 严重项：`drink-menus` / zh-hk 声称 100本起（真值 10 份）

```
drink-menus / zh-hk (54 当量 ✅)
餐廳酒水牌 | 防水 覆膜 圓角 | 100本起 HK$12起 | 智印港
                              ^^^^^^ 真值 = 10 份起 → 数值 + 量词双错
```

**本项不在活书 §5 的 7 处清单内，但性质与 #1 同族（DRIFT），且已线上可达。**
判定：**应并入同批修复**，否则「数据层 10 份 / 文案层 100 本」的分叉继续存活（避坑 18）。

### §1.1b 更正记录（2026-09-20 20:17）— 本报告 ja 量词主张**已被证伪**

- **本报告 §1.2 曾主张**：`drink-menus/ja` 的 `100枚〜` 应改为 `10份〜`（与 zh-hk 的 `unitLabel=份` 对齐）。
- **实际落盘（`43945538`）**：ja 标题写成 `10份〜`。
- **并发会话 `65198c97` 已推翻并回改为 `10枚〜`，其判断正确**：
  「**份**」是**中文量词**，日文应为「**枚**」；把 zh-hk 的 `unitLabel` 直接搬进 ja 标题 = **中文量词污染**。
- **我方错误根因**: 当时以「**同记录内自洽**」为判据（ja body/description/FAQ 确实写 `10枚`——
  即 **ja 内部本来就是 `枚` 自洽的**），我却按 **zh-hk 真值**去改 ja，**跨语种套用了 zh-hk 口径**。
  ⇒ 真值 SSoT（`products.ts` 的 `unitLabel=份`）**只约束 zh-hk 文案**，
     **不约束 ja 的量词选择**（量词属语言层，不属数据层）。
- **保留项（zh-hk `10本起` → `10份起`）仍然正确**: 那是**繁体中文内部**的单位字纠错
  （同记录 zh-hk description/body/FAQ 全写「份」），与 ja 量词问题**不同性质**。
- **门禁缺口（并发会话定案）**: i18n 门童靠**繁体专用字表**判定语言错配，
  而「**份**」**简繁同形** ⇒ 天然漏检。这是**判定维度缺口**，非门童失职。
- **新增教训**: **跨语种修复时，判据必须是「该语种内部自洽」，不是「与主真值一致」**。
  zh-hk / ja / en 的量词、单位、惯用形**不共享同一套真值口径**。

### §1.2 新增发现：ja 侧同族 DRIFT（活书 §5 未列）

> ⚠️ **本节原主张「三处 `100枚〜` 数值错」成立（数值部分），但「应改为 `份`」已按 §1.1b 更正为 `枚`。**
> **数值对齐（100 → 10）正确保留；量词一律维持「枚」。**

| SKU / locale | 标题片段 | 声称 | 真值 | 判定 |
|---|---|---|---|---|
| `pvc-menus` / ja | `100枚〜` | 100 枚 | **10 張** | 🔴 数值错（+量词 枚↔張） |
| `hardcover-menus` / ja | `100枚〜` | 100 枚 | **10 本** | 🔴 数值错（+量词 枚↔本） |
| `drink-menus` / ja | `100枚〜` | 100 枚 | **10 份** | 🔴 数值错（+量词 枚↔份） |

> 三处当量均「达标」（55/51/50），**BAND 检查全部漏过** —— 当量只验长度、不验真值。
> 这是**避坑 17（「已施加」≠「已生效」）的活样本**：门禁绿灯 ≠ 文案正确。

### §1.3 合计

- 活书 §5 原列：**7 处**
- 本次取证新增：`drink-menus/zh-hk` + ja 三处 = **4 处**
- **批次实际应为 11 处**（7 长度类 + 4 真值类）

---

## §2 事项 #2 — 品牌-语种错配（13 处，结构解析复算确认）

判定规则（§7 品牌分层，K3 9/1 02:54）：**zh-hk = 智印港**；**en / ja = ZprintPro**。

### §2.1 ja description 挂 `| 智印港`（8 处）

| # | SKU | 字段 |
|---|---|---|
| 1 | `certificates` | description |
| 2 | `magnetic-closure-gift-box` | description |
| 3 | `electronics-packaging-box` | description |
| 4 | `kraft-paper-packaging-box` | description |
| 5 | `fruit-food-label-stickers` | description |
| 6 | `doujinshi-printing` | description |
| 7 | `acrylic-keychain` | description |
| 8 | `can-badge` | description |

修法：`| 智印港` → `| ZprintPro`（ja 单品牌）。

### §2.2 ja imageAlt 含繁体专用字（3 处）

| # | SKU | 当前 imageAlt | 缺陷 |
|---|---|---|---|
| 9 | `large-envelopes` | `可以。我們支持各種國際標準尺寸和完全定制尺寸。` | 🔴 **整条纯中文**（连繁体专用字都已命中） |
| 10 | `exercise-books` | `練習帳 / 學校向け \| 練習帳印刷 … 50冊〜 學校向け \| ZprintPro` | 繁体 `學校` → 日文应为 `学校` |
| 11 | `textbooks` | `教科書 / 高品質 \| 教科書印刷 … 50冊〜 學校向け \| ZprintPro` | 同上 |

> ⚠️ 判据 = **繁体专用字**（`學`/`練`/`習` 等日文常用体不含），非「含中文即错」。
> **禁止**手工字表（避坑 13：手工字表含共用汉字 → 132 假命中）。
> 必须用「日本常用汉字表补集」驱动，或复用 `audit-sku-locale.cjs` 的既有判据。

### §2.3 en imageAlt 含日文（2 处）

| # | SKU | 当前 imageAlt | 修法方向 |
|---|---|---|---|
| 12 | `thick-greeting-cards-400g` | `厚口 カード` | 改英文（`Thick 400gsm Cards`） |
| 13 | `foil-greeting-cards` | `箔押し カード` | 改英文（`Foil Stamped Cards`） |

### §2.4 反向核对

- `zh-hk` 段出现 `ZprintPro`（双品牌违规）：**0 处** ✅
- 即：错配为**单向**（ja/en 混入 zh-hk 品牌），无 zh-hk 混入 en/ja 品牌。

---

## §3 落盘前置条件（未满足前不得写 `src/`）

- [x] `git status --porcelain -- src/` = 0（无 `MM`）
- [x] staged 删除 = 0
- [ ] **并发会话 15 min 静默** — 未达成（见 `SESSION_LOCK.md`）
- [ ] 批次命令：`node scripts/apply-title-batch.mjs --batch=<name>` dry-run 先行

---

## §4 数据来源

```
数据来源:
- scripts/verify-menus.cjs 实测输出 (2026-09-20, 本文件 §1)
- scripts/audit-sku-locale.cjs 结构解析输出 (2026-09-20, 732938 字符 / 100 SKU / 花括号配平 ok)
- src/data/products.ts minQuantity / unitLabel (真值 SSoT)
- scripts/guards/title-equiv.js (当量口径 SSoT)
- 活书 §5 未完成事项 #1/#2 (docs/2026-09-20-handover-living-book.md)
校准日期: 2026-09-20
```
