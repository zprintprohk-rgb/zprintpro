// .hermes/logs/_append-10traps-rule.mjs — 追加「多層硬編碼口徑同步 10 次指標踩坑」規則
import fs from 'node:fs';

const FILE = '.hermes/regression-guard/error-patterns.md';

const RULE = `
---

### 规则 MULTI_LAYER_MOQ_SYNC_10TRAPS — 多層硬編碼口徑同步的十次指標踩坑 (2026-09-19~20 全案固化)

**事故形態**: MOQ 口徑同步波（12+ commit）過程中，**同一次任務內 10 次計數/判定失誤 + 6 次解析器自糾**，
且**全部是「指標本身錯」而非「結論錯」**——每次都在下結論前被雙方法復算或形狀斷言攔下，
否則會把壞計數當依據去改全站文案。這是 \`DOUBLE_METHOD_RECOUNT\` 與
\`METRIC_INTEGRITY_FIVE_TRAPS\` 的放大實例。

| # | 錯誤結論 | 真相 | 根因 |
|---|----------|------|------|
| 1 | 「只有 5 條漂移」 | 76 條 | \`slug:\` 未加字邊界 → 誤配 \`category_slug:\` → 查表 undefined → **整段靜默跳過** |
| 2 | 「真值表 99 SKU」 | 94 產品 + 16 分類 | 分類陣列（縮排 2）混入產品物件（縮排 4） |
| 3 | 「雙方法不一致」 | 定義域不同，假紅 | 兩方法數的樣式集合不同 → 必須**逐樣式同定義域**對帳 |
| 4 | 「5 個 SKU 缺欄位」 | 全部都有 | 斷言假設「全檔行數 = 頂級物件數」，未考慮**無頂級鍵的嵌套子物件** |
| 5 | 「某量詞樣式是誤配」 | 全是真樣本 | 只看行首 N 字，真相在行內 700+ 字元處 |
| 6 | 「覆蓋率 100%」 | 實際 **8%** | 只認一種 key 風格 → 4 個目標檔**整檔跳過**（宣稱「0 漂移」即此假象，已撤回） |
| 7 | 「672 條漂移」 | 含大量歸屬錯誤 | 跨品類綜合內容 + 「後向最近 key」歸屬假設失效 |
| 8 | 「13 鍵殘留」 | 假陽性 | 斷言用「全檔出現次數」→ 把**註解與渲染端字串**一併計入 |
| 9 | 「主檔已還原」 | 仍未還原 | PowerShell \`Copy-Item\` **靜默失敗**（無報錯、檔未變） |
| 10 | 「分析基於最新真值」 | 用舊快照 | JSON 只在 \`--json\` 模式寫，hook 跑 \`--gate\` → **靜默過期** |

**解析器自糾 6 例**（工具本身有 bug）:
① 註解含關鍵詞被計入斷言 ② 物件深度追蹤 bug 吃掉結尾 \`}\` ③ 型別宣告被跨行正則誤配
④ 掃描器不認目標檔 key 風格 ⑤ 排除正則斜線重複消耗 ⑥ \`[] vs []\` 比對掩蓋「整類缺失」

**修法（固化的機制，非文字提醒）**:
1. **鍵名加字邊界** + 形狀斷言（真值表數 == 頂級鍵行數 == 欄位行數）
2. **多 schema 支援**：每個檔案宣告自己的 key 樣式（slug / json_key / record_key）
3. **雙方法逐類別同定義域**對帳；**交集優先**（兩套掃描器都標記者精度最高）
4. **斷言必須顯式排除嵌套子物件**；多值區塊須白名單
5. **命中處前後文**取樣，不用行首片段
6. **任何模式都落盤**（避免快照靜默過期）
7. **對 TS 物件勿用「正則+深度」整塊替換** → 用 edit
8. **跨品類行排除**（同 slug 但文案屬他品類）
9. **禁區清單化**：middleware 301 / 品牌落地頁 / 既有資產文案（本案 §0.0）
10. **「數字與真值不符」≠「必須改」**：先判語境與定位（本案 3 例證明「不改」才對 ——
    大量檔門檻 / 企業套組定位 / 分流語義）

**同族規則**: \`DOUBLE_METHOD_RECOUNT\`（母規則）· \`METRIC_INTEGRITY_FIVE_TRAPS\` ·
\`HREFLANG_FALSE_ALARM_MEASUREMENT_BUGS\` · \`TSC_ERROR_COUNT_DROP_IS_A_RED_FLAG\`

**配套**: AGENTS.md §0.23.2 三閘門 + 雙方法復算鐵律 ·
技能 \`docs/skills/multi-layer-moq-consistency-audit.md\` ·
交接書 \`docs/2026-09-20-handover-live-doc-moq-consistency.md\`
`;

fs.appendFileSync(FILE, RULE, 'utf8');
const n = fs.readFileSync(FILE, 'utf8').split('\n').length;
const rules = (fs.readFileSync(FILE, 'utf8').match(/^### 规则 /gm) || []).length;
console.log(`✅ 已追加规则 MULTI_LAYER_MOQ_SYNC_10TRAPS（现 ${n} 行 / 规则 ${rules} 条）`);
