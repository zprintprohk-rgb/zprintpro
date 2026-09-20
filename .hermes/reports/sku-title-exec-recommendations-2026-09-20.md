# SKU 标题 · 执行建议（2026-09-20 20:55）

> 性质：**只读分析 + 执行建议**。本文件不改动任何 `src/`。
> 触发：K3 要求「深度理解 SKU 标题交接报告与执行情况，符合规则（50-57 半角当量），联网抽查三站点 SKU 页面后给出执行建议」。

## 数据来源（§0.23 强制）

- 标题普查：`node scripts/sku-title-census.mjs`（校准 2026-09-19 12:40 UTC，本日重跑结果一致）→ `.hermes/reports/sku-title-census-2026-09-19.md`
- 违规台账：`.hermes/reports/sku-title-ledger.json`（未修复 42 / 已修复 84 / 累计 126，门禁 YELLOW_WARN）
- 口径 SSoT：`scripts/guards/title-equiv.js`（TITLE_MIN=50 / TITLE_MAX=57，K3 2026-09-19 裁决）
- 品牌/语种审计：`node scripts/audit-sku-locale.cjs` 四项全 0（本日 20:5x 重跑复核通过）
- 线上实测（FetchURL 2026-09-20 20:4x-20:5x）：`/zh-hk/product/custom-calendars`、`/en/product/food-boxes`、`/ja/product/graduation-yearbook`、`/ja/product/same-day-flyers`、`/zh-hk/product/pvc-menus` —— **5 页线上 title 与 repo 逐字一致，无部署滞后**
- 源码计数：`grep -o` 精确计数（见各条），全部出自 `src/data/sku-seo-data.ts`
- 输入报告：`一、执行层成果评估：P0材质对齐与量词纠.txt`（并发会话产物）

## 一、对执行报告的复核结论

| 报告结论 | 复核 | 意见 |
|---|---|---|
| P0 材质对齐 ef749685 已落地 | ✅ 线上 `/zh-hk/product/pvc-menus` title 已是「PVC 餐牌 · 防水防油覆膜 10張起印」 | 同意 |
| ja 量词 10份→10枚 纠正 | ✅ repo 已无「10份〜」 | 同意；根因（份简繁同形漏检）应固化进 i18n 门童 |
| 孤儿审计 99/100 定稿 | ✅ | 同意；「先证明量具再出结论」四级返工纪律同意固化 |
| FSC≠食品接触、ISO 9001 语境误导 | ✅ 独立复核成立（FSC 管原料来源，FDA/BfR/GB 4806.8 管食品接触） | 同意，且比报告更深的问题见 P0-3 |
| menus 文案层残留 | ✅ SESSION_LOCK.md 交接待办第 2 条已登记（verify-menus.cjs 入口） | 同意 |

**补充**：报告未覆盖的新发现（本次线上实测 + 源码计数）是更大的风险点，见下。

## 二、新发现（线上实测 + 源码计数，比标题长度更优先）

### P0-1 同 SKU 槽位内部自相矛盾（事实错误级）

**same-day-flyers（FL-008，三语全中）**：
- zh-hk title「100張起」vs description「10 張起」
- en title「10 MOQ」vs description「100 MOQ」
- ja title「10枚〜・¥125〜」vs description/body「100 枚から」vs 页面 price ladder 实际 ¥25〜368/枚（**title 价格钩 ¥125〜 与阶梯价无任何一档对得上**）
- ja `h1` = `"First choice for emergency events"` —— **英文整句混进 ja h1 槽**（sku-seo-data.ts:925）
- ja `faqs[].a` = 「專業即日傳單印刷服務 \| 智印港」—— **zh-hk 文案混进 ja FAQ 答槽**（BRAND_LOCALE_MISMATCH 家族活例）
- ja keywords 含「HK$0.5〜」—— 币种污染进 ja 关键词槽
- en imageAlt「Same-Day Flyers for holiday cards, wedding invitations」—— 贺卡模板残留（避坑 19 活例）

**graduation-yearbook ja**：body 含简体「适配行业:」未译字段 + 同一 body 内 ¥100-200 与 HK$45〜180 双币种并存。

### P0-2 错误电话 + 虚构履约承诺 ×36（en 共享模板）

- `+1 982 808 5133`（真值为 +86 198 8085 1334，数字被错排成美区格式）× **36**
- 「Same-day USA pickup available for orders placed before 11 AM EST in major US cities」× **36**（本站无美国自提点，深圳出货 DHL）
- 波及：所有走 en 共享 body 模板的 SKU（stickers 全簇 + 更多）
- 修法：**模板级一次修复**（36 槽同消），符合 SOP-5 回源原则；但替换话术属对外事实声称，电话口径需 K3 确认后执行（§0.23）

### P0-3 日语站虚构国内物流（62-72 槽，§0.23 红线 + 日本法域风险）

- 「日本全国送料無料」× **62**、「沖縄県・北海道も追加料金なし」遍布 ja body
- 「LINE お問い合わせ」× **72**（本站真实渠道是 WhatsApp，无 LINE 客服）
- 事实：深圳出货、DHL 国际 2-4 天。ja 页脚已挂「特定商取引法に基づく表記」，虚构国内履约与该表记的诚实义务冲突
- 修法建议（供 K3 拍板）：统一替换为「DHL・FedEx 国際速達で日本全国へ 2-4 日・追跡番号付き」；LINE→WhatsApp（+86 198 8085 1334）

## 三、标题长度红线（42 槽 = FILL 25 + TRIM 17，台账未修复 42）

### FILL（<50）—— 按既有填充流程，优先级按 GSC 展示

| 序 | SKU · locale | 当量 | 展示28d | 位置 | CTR | 备注 |
|---|---|---|---|---|---|---|
| 1 | custom-calendars · zh-hk | 35 | 215 | 22.25 | 0.47% | 位置已第 2 页，标题是唯一瓶颈，**本批最高 ROI** |
| 2 | vehicle-wraps · zh-hk | 39 | 112 | 46.44 | 0.89% | |
| 3 | eco-paper-bags · zh-hk | 35 | 86 | 32.45 | 2.33% | CTR 已健康，补长尾放大 |
| 4 | doujinshi-printing · zh-hk | 45 | 68 | **8.74** | 2.94% | 位置第 1 页；当量 45 距 50 只差一档，且品牌缺失+假名「対応」污染同槽 |
| 5 | fruit-food-label-stickers · zh-hk | 47 | 46 | 40.46 | 0% | CTR=0，标题+合规声称联动（见待拍板） |
| 6-25 | 其余 20 条 | 42-49 | ≤32 | — | — | 含 small-bags（无 GSC 行，孤儿 SKU，建议顺手补 nameJa） |

填充素材优先级（规则 SSoT）：GSC 实证长尾 → 数字钩子（起印量/价格）→ 工艺 → 品牌。

### TRIM（>57）—— 模板级批量，不逐条手搓

- **en 日历簇 6 条**（wall/mini/desk/photo-frame 等 59-61）：共享「Wire-Bound Spiral | Free US Ship | ZprintPro」模板超线 → 模板降级一次修 6+ 槽
- **en 书簇 4 条**（perfect-bound-books 62 / spiral-notebooks 59 / exercise-books 57 / textbooks）：共享「Perfect Bound | Free US Ship」—— **且「Perfect Bound」用于 spiral-notebooks/textbooks 是工艺错配**（螺旋装≠胶装），顺带修正
- **en/food-boxes 71**（最高当量）：「Paper Food Packaging Printing 100+ | Food-Safe Boxes & Bags」—— 修剪 + "Food-Safe" 声称与 ISO 9001 语境误导同槽，须与 K3 合规口径联动（不能一边修剪一边保留误导词）
- **ja/graduation-yearbook 69 / gang-run-card-boxes zh-hk 64 & ja 73 / cosmetic-boxes zh-hk 77**：散装长标题，单变量批次

### 结构性同质化（G 组，台账已定位）

同一修饰段被 4~34 个 SKU 共享（en「Free Shipping $99+ | ZprintPro」×34、zh-hk「智印港」结尾 ×45 属正常品牌锚、ja「ノベルティ 各種サイズ」×6、ja「防水 PVC ダイカット」×5）。
建议：TRIM 模板修复时**按簇做差异化修饰轮换**（同簇内保留 1-2 个共同卖点 + 其余槽换 SKU 专属工艺/场景词），避免 SERP 内自我竞争与 Google 同质化判定。

### C 组杂项（35 槽）

- zh-hk 标题分隔符「・」（U+30FB 日文假名中点）× 30+ → 统一改全角「｜」或间隔号「·」（i18n 门童可加字符级规则）
- 「專業印刷 品質保證」无效填充词 ×2（catalog-printing / certificates）
- census「品牌不在末尾」2 条（same-day-flyers·ja / a2-posters·ja）**与线上实测不符**（线上 ZprintPro 在末位）——疑为全角「｜」分隔符导致判定逻辑误判，**先修量具再修数据**（四级返工纪律同源）

## 四、需 K3 拍板（执行层不得自决）

| # | 事项 | 建议口径 | 风险 |
|---|---|---|---|
| 1 | ISO 9001 ×167 去留 | 先核实证书真伪：有证→保留但移出食品语境；无证→清空（SOP-10 第 4 款：改空串不留联系方式） | §0.23 无来源数字红线 |
| 2 | FSC/FDA/BfR 食品合规声明体系 | 按报告 §3.2：FSC（原料）与 FDA/BfR/GB 4806.8（接触安全）分句陈述；直接接触/非直接接触分级 | 对外事实声称 |
| 3 | ja 物流话术替换（P0-3） | 「DHL 国際速達 日本全国 2-4 日・追跡番号付き」替「全国送料無料」；LINE→WhatsApp | 日本法域表记诚实义务 |
| 4 | en 电话与「美国自提」话术（P0-2） | 电话统一 +86 198 8085 1334；删「Same-day USA pickup」 | 错误电话=直接丢单 |
| 5 | same-day-flyers 真值（P0-1） | 以 products.ts MOQ/price ladder 为单源，三语槽位重排（10 还是 100 由真值定，不由文案定） | 站内自相矛盾=转化杀手 |
| 6 | faqs[].a 39 处死数据 | (a) 回 CSV 源头清 / (b) 确证死数据后建豁免台账 | 活书 §5 #11 |
| 7 | 两套并行交接产物合并 | 避坑条并入同一 skill；两探针互引不二选一 | 并发会话实测撞车 2 次 |

## 五、执行顺序（遵守 freeze 2-4 周 / 攒批 push / 30min 硬下限 / 收尾信号+15min 静默窗）

```
批次 1（事实错误级，非优化，优先级最高）: P0-2 电话/自提模板 + P0-1 same-day-flyers 真值重排
  → 一次模板改 36 槽，先 dry-run  diff 复核，再 apply
批次 2（FILL 高展示）: census A 表前 5 条（custom-calendars / vehicle-wraps / eco-paper-bags / doujinshi / fruit-food-label）
  → gen-title-fill-proposals → 人工过 → apply-title-batch
批次 3（TRIM 模板）: en 日历簇 + 书簇模板降级（含 Perfect Bound 工艺错配修正）→ food-boxes 单修（待拍板 #1/#2 联动）
批次 4（C 组）: ・分隔符统一 + 无效填充词 2 条 + census 量具修正复核
批次 5（P0-3 日语物流话术）: 待 K3 拍板后模板级替换 62-72 槽
```

每批收尾四件套：`sku-title-census.mjs` 复算 → `audit-sku-locale.cjs` 四项 → ledger 更新 → 攒批 push（本地预检 3 步先行）。
预期收敛：批次 1+3 完成后，42 红灯槽位预计降至 ~15（FILL 20 条为主）；批次 2 完成后 ≤10 → 门禁升 red 前的安全垫。

## 六、遗留观察（不属本批，登记备查）

- zh-hk 页脚地址（香港九龍新蒲崗大有街3號）与 en/ja 页脚（深圳平湖嘉城路1号）双地址并存；FAQ 内已声明「香港服務點，非生產地」，但页脚无此限定 → NAP 一致性疑问，需 K3 定性（HK 服务点 or  stale 数据）。
- pvc-menus zh-hk 页「已服務 67 間香港餐廳、18 間米芝蓮餐廳」类客户计数（§0.23 待校准族）。
- zh-hk/custom-calendars 页「31 間企業、9 間銀行、6 間 NGO」同族。

---

## 批次1 执行回执（2026-09-20 ~21:20 · K3 拍板「批次1开工」后已落地）

**交付**：`cc28fd6a`（已 push）— `src/data/sku-seo-data.ts` + `src/data/products-content.ts` + `scripts/fix-batch1-factual-errors.mjs`
**过程**：dry-run 21 组/92 处计数断言全过 → apply 硬校验 7/7 → census byBand 不变（3 个新 title 当量 50/55/54 全 OK 带）→ audit-sku-locale 四项全 0 → pre-commit 全门童过 → push 成功。备份 `.hermes/_bak-batch1-20260920/`（未入库）。
**修复内容**：P0-2 错误电话 +1 982 808 5133→+86 198 8085 1334 ×36、虚构美国自提句→DHL 3-5 天 ×36；P0-1 same-day-flyers 三语槽位真值重排（MOQ 100→10；价格钩 ¥125→¥25 / $0.95→$0.16 / HK$0.55→HK$1.30 对齐三站点页面 hero；ja h1 英文整句→日文；keywords 去 HK$ 污染；faq 答槽繁体→日文；imageAlt ×2）；products-content en MOQ 表 100→10。

### 执行中新增的 5 个登记项（不属本批，下批/待裁）

1. **products.ts basePrice 三字段 vs price-data.generated.ts 分叉**（same-day-flyers: 0.55/0.95/125 vs 1.3/0.16/25）——title 价格钩必须以 price-data（客户可见）为单源；products.ts basePrice 疑似过时。**待 moq/价格工作流全 SKU 审计**。
2. **products.ts `features` 仅 zh-hk 串却被渲染到全部 locale**（ja/en 页面出现繁體【】spec 列表）——渲染层 locale 泄漏，结构性修复（影响 100 SKU），需独立批次。
3. **门童 #3 对 census/ledger JSON 误报**：重新生成的普查 JSON 因 G 组同质化分析段含「智印港 (locale=en)」触发 BRAND_LOCALE_MISMATCH 红拦 ⇒ 报告类文件不应随数据批提交（本批已撤出 4 个报告文件）。建议门童对 `.hermes/reports/**` 建豁免或修 G 组段结构。
4. **门童 #24 在 Git Bash 环境假拦**：hook 调 `npx tsx`，而 Kimi runtime 只有 `npx.cmd`、bash 不补 .cmd 扩展名 ⇒ 任何从 Git Bash 发起的 commit 都会被 #24 假拦。本会话用 `.hermes/_bin/npx` shim（cmd //c 转发）绕过。建议 hook 改调 `node_modules/.bin/tsx`（去 npx 依赖）。
5. **en 共享模板「100-piece minimum」 vs 各 SKU minQuantity**：本批只修了 same-day-flyers；moq-scan-latest.json 已登记 229 条存量漂移（含 rounded-corner-greeting-cards 真值 10 但文案 100 等）——归 moq10 工作流，与批次 2-5 并行排期。
