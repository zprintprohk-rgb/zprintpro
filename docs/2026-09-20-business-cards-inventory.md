# business-cards 對照清單（K3 2026-09-20 裁決第一步產出）

**性質**：K3 裁決「補齊 business-cards 分三步」的**第一步產物** — 只產出事實清單，**未修改任何檔案**
**數據來源**：`.hermes/logs/_business-cards-inventory.mjs`（本檔同批提交）
**K3 裁決原文**：第一步「釐清 business-cards 的真實品類歸屬。產出一個對照清單，確認：
  ① business-cards SKU 的 minQuantity 是多少？② 三場景是名片場景還是賀卡場景？
  ③ 如果場景是賀卡，應該歸屬到賀卡品類」；並要求「先產出對照清單再定，不要直接改」

---

## 一、五項事實盤點

| # | 檢查項 | 實測結果 |
|---|--------|---------|
| 1 | `products.ts` 的 `business-cards` SKU | 🔴 **不存在**（v22 7347c503 已 1:1 改名為賀卡，AGENTS.md §0.0.2 有記載） |
| 2 | `greeting-cards` 品類 SKU 數與真值 | **6 個，全部 `minQuantity=10`**（premium / thick-400g / foil / spot-uv / matte / rounded-corner） |
| 3 | `CategorySharpHooks` 的 `business-cards` 三場景 | `birthday`／`holiday`／`thankyou` — **文案全為賀卡語境** |
| 4 | `CategoryIndustries` 是否有 `business-cards` | 🔴 **無**（孤兒類別確認） |
| 5 | `industry-scenario-links.ts` 是否有 `business-cards` 映射 | 🔴 **完全無**（`SCENARIO_LINKS` 與 `SCENARIO_INDUSTRY_NAMES` **皆無**） |

### 第 3 項明細（三場景逐條）

| key | zh-hk 第三行（含 MOQ） | 語境判定 |
|-----|----------------------|---------|
| `birthday` | `50 張起 · 自訂內頁祝福` | 「生日賀卡 · 燙金祝福語」→ **賀卡** |
| `holiday` | `100 張起 · 企業批量折扣` | 「節日賀卡 · 聖誕/新年/感恩節」→ **賀卡** |
| `thankyou` | `100 張起 · DTC 品牌適用` | 「感謝卡 · 婚禮/品牌隨盒卡」→ **賀卡** |

依 K3 判據（「若『50 張起』是 MOQ 宣稱 → 修正為與真實品類對應的 MOQ」）：
三者第三行皆為 **MOQ 宣稱**（非場景描述），且與賀卡真值（10）衝突。

---

## 二、★ 本清單的關鍵新發現（影響 K3 第三步的可行性）

`industry-scenario-links.ts` 的 `SCENARIO_LINKS`（L38）與 `SCENARIO_INDUSTRY_NAMES`（L184）
**都只列 13 個類別**，且**一致地不含 `business-cards`，也不含 `greeting-cards`**：

```
stickers, flyers, packaging, paper-bags, posters, menus, red-packets,
calendars, banners, books, envelopes, educational, japan-doujin   ← 13 個，無賀卡/名片
```

**這是一致的設計排除，不是遺漏**。其影響：

1. `CategorySharpHooks` 的 `business-cards` 三場景在**兩張映射表中都查不到** →
   `resolveScenarioHref()` 落空、`getScenarioIndustryName()` 落空
   （與本輪 2.2 `banners` 的情況同型，但那次是**命名不一致**，這次是**整類未納入**）
2. **K3 第三步（補齊至 `CategoryIndustries`）單獨做不會生效** ——
   補齊後卡片仍在渲染時取不到 href 與行業名
3. ⇒ 若決定保留並補齊，需**同時**新增 `SCENARIO_LINKS['business-cards']` 與
   `SCENARIO_INDUSTRY_NAMES['business-cards']` 兩處映射

---

## 三、品類歸屬判定（回答 K3 第一步的三問）

| K3 之問 | 判定 | 依據 |
|---------|------|------|
| ① `business-cards` SKU 的 minQuantity？ | **該 SKU 不存在**（已改名為賀卡） | `products.ts` 無此 slug；v22 映射記載於 §0.0.2 |
| ② 三場景是名片還是賀卡場景？ | **賀卡場景**（三個皆是） | 文案明寫「生日賀卡」「節日賀卡」「感謝卡」 |
| ③ 若為賀卡，應歸屬賀卡品類？ | **是** | 且賀卡真值 = 10（6 SKU 一致） |

⇒ **資料模型與業務語義不匹配**（K3 原話）成立：`key` 仍叫 `business-cards`，內容已是賀卡。

---

## 四、待 K3 拍板的選項（我不擅自決定）

| 選項 | 做法 | 優點 | 風險 |
|------|------|------|------|
| **A（最小改動）** | 只把三場景第三行的 MOQ 修為 10（`birthday` 50→10、`holiday`/`thankyou` 100→10），**不動 key、不補齊** | 消除與賀卡真值的矛盾；不觸及 §0.0 關聯面 | 孤兒類別仍在（雙資料源不一致未解） |
| **B（完整補齊）** | A + 補齊至 `CategoryIndustries` + **新增兩處 `industry-scenario-links` 映射** | 完成雙資料源收斂且卡片可正常取 href/行業名 | 改動面較大（3 個檔案）；`business-cards` key 名與賀卡內容仍不匹配 |
| **C（語義對齊）** | A + 把 key 由 `business-cards` 改為 `greeting-cards`，並同步兩處映射 | 資料模型與業務語義一致（根治 K3 指出的「根本問題」） | 需確認 `business-cards` key 是否被其他程式碼引用（待查）；動到 key 命名 |

**我的建議：C 的變體**（先查 `business-cards` key 的引用面 → 若僅此一處，則改為 `greeting-cards`），
理由：K3 已指出「根本問題是資料模型與業務語義不匹配」，A/B 都留下這個不匹配。

**§0.0 合規判斷**（承 K3 裁決）：本批任何選項都只改 **MOQ 數字**與 **key 命名/映射新增**，
**不刪除、不改寫任何賀卡資產的場景文案** → 不觸 §0.0 保護範圍。

---

## 五、後續（待裁決後執行）

1. 依選定選項執行（含 `business-cards` key 的引用面排查）
2. 跑門童 #24 + tsc + 分類頁渲染驗證
3. 補齊後驗證 `resolveScenarioHref` / `getScenarioIndustryName` 對該類別**確實有值**
   （本清單第二節指出的失效風險）
