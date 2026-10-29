# 2026-10-29 C7 · D4 运行时修复报告（lane 报告命名双轨 + 校验器兼容）

> 数据来源: k3-review `2026-10-29-ZP-k3-review.md` §3 D4 行 · `lane-runs.jsonl` (ZP-daily-content 01:56:51 BLOCKED + 01:57:00 OK report=2026-10-29-daily-content.md report_auto=false; ZP-blog-deepfix 01:57:00 OK) · `node scripts/lane-status.mjs --days=3` 实跑 · 线上 curl 探针 (calendars en / greeting-cards en) · products.ts / category-conversion-blocks.ts / sku-seo-data.ts / pricing.ts / CategoryPageV9.tsx / variable-i18n.ts 源码直读

## 1. 优先级判定（本轮为何做 D4）

k3-review 今日优先 ④: `P1 修运行时（§5 重注册 + 今晚两轮四方验收）→ P2 K3 批 1 项解锁队列 → P3 真值缺陷 T1-T3 先入队 READY 再单批修`。

- §5 重注册（weekly/blog/monthly 三连 0x800710E0）= K3 管理员动作，执行层不可代做。
- 今晚 20:13/21:17 四方验收 = 时间窗未到。
- **P1 中可由执行层落地的唯一项 = D4 校验器兼容**（k3-review §3 `modify_payload`：host 归一或校验器兼容；在此之前不得用 reportStrict 单判「零产出」）。本轮完成校验器兼容。
- P3 T1-T3 = 已入队 READY（见 strategy-task-queue.json 3 条新任务），src 单批修因 peer 活跃（§0.35.7 双条件② 未满足）推至窗口期执行（见 §4）。

## 2. D4 根因与修复（双轨命名 + 粗体字段）

### 2.1 根因（两处，均已实证）
1. **命名双轨**：harness 真实 OK 报告写**短名** `{day}-{lane 去 ZP-}.md`（如 `2026-10-29-daily-content.md`）；旧 `validate_lane_report()` 只认 `{day}-ZP-{lane}.md` → 真报告漏认，AUTO-FILL stub 被写成长名 `{day}-ZP-{lane}.md` → lane 被误判 STALE。
2. **字段格式双轨**：harness 真报告用**粗体 Markdown 字段**（`- **VERDICT: OK**` / `**VERDICT: OK** — 说明`），旧正则要求行首裸 `^VERDICT:` → `contractOk` 误判缺机器可读 VERDICT。`lane-status.mjs` L266-272 已兼容双命名（`includes(laneToken) || includes(lane.task)`），但 L278-280 的正则与 lane-git-commit.py 同病。

### 2.2 修复（scripts 两文件）
**`scripts/lane-git-commit.py`** — `validate_lane_report()` 重写：
- 候选 = `[{day}-{lane}.md]` +（lane 以 ZP- 开头时）`[{day}-{lane[3:]}.md]`（双轨都试）；
- 已有候选循环**跳过 AUTO-FILL / AUTO-FILLED 文本**（continue 到兄弟候选），不把失败证据当真报告；
- 字段正则放宽 `^[-*\s]*\*?\*?{field}\*?\*?:\s*\S.*$`（裸/粗体均可）；
- VERDICT OK 正则 `^[-*\s]*\*?\*?VERDICT\*?\*?:\s*\*?\*?OK\*?\*?(?=\s*$|\s*[—–-])`（行尾或 em-dash 说明均可）；
- 无候选 → `missing exact same-day lane report: {candidates}`；全候选 AUTO-FILL → `all same-day lane report candidates are AUTO-FILL failure evidence; no real OK report`。

**`scripts/lane-status.mjs`** — `contractOk` 同步兼容：
- `fieldRe(field)` = `^[-*\s]*\*?\*?{field}\*?\*?:\s*\S.*$`（m 模式）；
- VERDICT OK 用与 lane-git-commit.py 同款 lookahead 正则；四字段 VERDICT/CONSUMED/DELIVERED/NEXT 全过 + VERDICT OK 才算 contractOk。

## 3. 测试矩阵（importlib 实跑，全部通过）

| 报告文件 | 期望 | 结果 |
|---|---|---|
| `2026-10-29-daily-content.md`（短名，`- **VERDICT: OK**`） | 接受为真报告 | ✅ PASS |
| `2026-10-29-blog-deepfix.md`（短名，`**VERDICT: OK** — em-dash 说明`） | 接受 | ✅ PASS |
| `2026-10-29-ZP-gsc-feedback.md`（长名，裸 `VERDICT: OK`） | 接受（无回归） | ✅ PASS |
| `2026-10-29-ZP-k3-review.md`（长名，裸） | 接受（无回归） | ✅ PASS |
| 10-28 daily-content（仅 AUTO-FILL stub） | 拒（失败证据） | ✅ PASS |
| weekly-meta（无报告） | 拒（missing clean） | ✅ PASS |

`node scripts/lane-status.mjs --days=3` 实跑：`OK ZP-daily-content last=2026-10-29 report=yes`（原 STALE → OK）· `OK ZP-gsc-feedback` · `OK ZP-k3-review` · `UNKNOWN ZP-weekly-meta/blog-deepfix/monthly-matrix`（weekly/monthly=0x800710E0 缺报告；blog-deepfix 为 3-day 窗口非调度日伪影，01:57 OK 总线记录仍在）· problems=3（原 4，-1）。

## 4. 附带发现（T1-T3 真值已实证，src 批待窗口）

peer 12:04-12:45 持续推送 §2.2 认证词清毒（T5 族），`CategoryPageV9.tsx` 于 12:38 被 peer 改动 → §0.35.7 双条件②（peer ≥15 min 无写入）不满足，**src 单批暂缓**。真值三闸门 #1（dump 实样）已完成：
- **T1**：products.ts calendars 全 `minQuantity:1`/`HK$3-8/本`；线上 en calendars 页同现「1 MOQ」title + seo-faq「From 1 pc」与 conversion-block FAQ「50 pcs」/socialProof「50 pcs」/comparisonTable「From 50 pcs (digital)」×4 → 全 block 需对齐 1 起印。
- **T2**：sku-seo-data.ts mini-calendars en body FAQ Q3「Orders start at 1,000 units」vs 同文「1-unit minimum (bulk 300+ offset)」；CSV 正文列为空 → body 为 ts 权威域，直接改 ts 合规（§0.23 SOP-5）。
- **T3**：greeting-cards 无 DISPLAY_ANCHOR_OVERRIDES / UNIT_PRICE_ANCHORS / INDEPENDENT_PRICES → `getDisplayAnchor` null → `convertToFromPrice` 回退保留 `/100張`（pricing.ts L736-751）+ CategoryPageV9 L244 原样 `張`；ProductPageV9 的 EN_UNIT_MAP/JA_UNIT_MAP 与 variable-i18n.ts 的 QUANTITIES_ZH2EN/JA 是先例映射。

队列已登记 3 条 READY（TRUTH-T1/T2/T3-20261029），approval_gate = k3-review §2.5 classify + products.ts 真值 + 线上双证，不夹带 title/名片域。

## 5. Push 与线上验收

- **T1-T3 src 批已完成并 commit（70024963→9a2e081f amend）**：peer 13:14 push bcf6bcac 后窗口重开，T1-T3 与 D4 同批 commit；push 等待 peer 的 cf-check-run ≥30 min（后台异步 job，§0.25.8 不阻塞主循环）。
- **T3 延展（同缺陷类，线上证据 §4 已含 PDP）**：除 pricing.ts 回退 + CategoryPageV9 L244 外，同根因 live 渲染路径一并修：ProductPageV9 L806 相关产品格 / RelatedProducts.tsx L64 / SearchDropdown L421（`p.price_range` 原样 → en/ja 走 convertToFromPrice，zh-hk 原样）/ HotProducts L260（`[MOQ] 10 張` → localizePriceUnitToken）/ search 页 ProductCard L111（`price_range.split('-')[0]` → en/ja 换算）。`components/product/ProductCard.tsx`+`product/RelatedProducts.tsx` = 无 import 死代码（仅注释提及），不修。
- 攒批：2 scripts + 6 src 行为/数据修复 + 队列 + 报告 = ≥1 src 行为修复（pricing 单位本地化）+ ≥3 非 docs → 达标（§0.25.9）。
- push 后必验：CF check-run success + curl `/en/category/calendars/`（50 pcs 全消失、From 1 pc 生效）+ `/en/category/greeting-cards/`（无 100張/10 張，显示 100 pcs/pcs）+ `/en/product/mini-calendars/`（无 1,000 units）+ `/en/product/premium-greeting-cards/`（PDP 相关格无 100張）。

### ✅ 5.1 Push 与线上验收结果（2026-10-29 13:52-14:00）

- **Push 完成**：`124b0b11` @ 13:53（cf-check-run 05:52:54Z = success）；等待对端 push 其 2 个 docs commit（34cf54c0/4e7a9e6f，于 124b0b11 之前）后，后台 waiter 仅推我自己的 124b0b11（§0.35.7 未代推 peer commits）。
- **线上验收（三闸门 #2，curl 带浏览器 UA，全部 200）**：
  - `/en/category/calendars/`：`50 pcs` = **0**（修复前 15），`From 1 pc` = 17，`1 MOQ` = 24 ✓ T1
  - `/en/category/greeting-cards/`：`100張` = **0**（修复前 12），`10 張` = **0**（修复前 4），`US$33.12/100 pcs` = 4（修复前 `US$33.12/100張`）✓ T3
  - `/en/product/mini-calendars/`：`1,000 units` = **0**，`Orders start at 1 unit` = 2 ✓ T2
  - `/en/product/premium-greeting-cards/`：`100張` = **1**（修复前 18；剩余 1 处为 RSC flight payload `"price_range":"HK$100-180/100張"` 序列化数据，非渲染展示串），`100 pcs` = 18 ✓
  - `/zh-hk/category/greeting-cards/`：`100張` = 12（zh-hk 原样保留，正确）；`/ja/category/greeting-cards/`：`100張` = 0，`10 枚` = 6（ja 本地化生效）✓ 无回归
- **数据来源**：GitHub check-runs API `repos/zprintprohk-rgb/zprintpro/commits/124b0b11/check-runs`（Cloudflare Pages completed success 05:52:54Z）；curl 线上四页（browser-UA，状态 200）；本报告 §4 修复前基线（12:38-12:51 同口径 curl）。

## 6. 遗留（不属本轮）

- host 归一短名为 dsh harness 行为，不在本仓库可修范围；校验器兼容已覆盖双轨。
- blog-deepfix UNKNOWN = 窗口伪影（周六调度、周三手动 OK），非缺陷；weekly/monthly 三连 0x800710E0 仍等 K3 管理员重注册（k3-review §5 命令）。
- K3 三件（token revoke ×2 / GMC re-review / Studio approve-delete）与 包装批1 拍板 仍待 K3。
- T5（认证词清毒）由 peer 12:04-13:14 §2.2 系列执行中；T6（15,000+）待 K3 裁决，均不属本轮。

## 7. 晚间追加（19:0x-19:1x · 执行层无 K3 依赖项闭环）

### 7.1 D7 · k3-ceo-daily-review.md SSoT 文本漂移（k3-review §1.2 D7「低成本高收益, 建议随下轮 docs 批修正」）

- **问题**：Step 5 落盘名仍写 `<YYYY-MM-DD>-k3-daily-review.md`（旧名），与契约 §7.1.3 权威名 `<YYYY-MM-DD>-ZP-<lane>.md` 冲突；§注册仍写「未注册/不得声称已在跑」，而 `\ZP-k3-review` 已注册实跑（bus 63 条 / 07:10 preflight OK / wrapper runsTotal=8）。后来者照错名落盘会再被判 STALE。
- **修复**（commit `c5c845d0`，docs-only）：Step 5 改为 `<YYYY-MM-DD>-ZP-k3-review.md`；§注册更新为「已注册实跑」；Step 1 报告名同步契约权威名。
- 验收：`read` 复核 3 处改点 + `grep 'k3-daily-review'` 在 .hermes/cron-prompts/ 归零。

### 7.2 F6'/D6 · cron-watchdog.py 漏报修复（k3-review §1.2 F6'「看门狗部分恢复, 10-29 只报 1 条漏 3×0x800710E0 + k3-review Result=1」）

- **根因**：告警去重用「全文件 contains」（L261 `a not in prev`），10-07 已记录的 0x800710E0 相同文本被**永久静默** → 持续未决的调度故障每日不再可见。
- **修复 v3**（commit `c02d2e52`，scripts 行为修复）：去重范围改为「最近一个告警 section」（`prev.rfind('\n## ')` 之后），活跃问题至少可见一次；文件仍是 K3 每周复盘单一事实源。
- **修复 v4**（commit `e3c54dbf`，v3 缺陷修正）：v3 按「最近 section」去重 → 今天 19:10 报了 3 条后，明早 06:43 会拿昨天 section 静默今日 → **只新鲜一天**，F6' 失效形态复发。v4 改为**按日历日去重**：仅当最近 section 属于**今天**才去重；昨日 section 不静默今日 → 活跃问题**每一天**至少可见一次，修复后自动消失。
- 验收：v4 边缘用例（今日 section 含 A,B → 只补 C；昨日 section 含全 3 → 今日全 3 重见；空文件 → 全 3）3/3 符合语义；实跑 `[PASS] 告警均为今日已记录项`（当日 section 内无新增，exit 0，无重复追加）；`unittest scripts/tests/test-lane-runtime.py` 9/9 PASS；tsc 54=54；brand A 类 0；encoding 干净。
- 数据来源：`.hermes/logs/cron-watchdog-alerts.md` 10-29 19:10 + 19:42 section 实跑输出 · v4 边缘用例 python 单测 · `git log origin/main..HEAD` · `scripts/tests/test-lane-runtime.py` unittest 实跑。

### 7.3 队列与今晚验收

- 队列 16 任务：DONE=3（T1-T3）/ WAITING_K3=5 / BLOCKED_INFRA=4 / SCHEDULED=3 / CLOSED_BY_K3_S0.37=1，**0 READY**（daily-content 今晚 21:17 预期 NO_OP，除非 K3 批 1 项）。
- 今晚 20:13 gsc-feedback（幂等键 0453ab66 命中跳过）+ 21:17 daily-content 四方验收提醒已设（20:21 / 21:21 触发，判据：lane-runs.jsonl 新 run + wrapper dsh exit + 当日非兜底报告 + 调度器 LastTaskResult）。
- 本轮 push 批：c5c845d0（D7 docs）+ c02d2e52（watchdog 行为修复）= ≥1 src/scripts 行为修复 达标（§0.25.9）；push 待 gate（peer 19:04 dca6652e 后 ≥30 min ≈ 19:34）。

### 7.4 登记（只登记不修）· T5/F5' 残留补盘点：catalog-printing-china 页为 F5'-EXTENDED 注册盲区 + 线上活残留

**背景**：k3-review T5（P1）=「無证认证声明」清毒；对端 §2.2 批 E-2（blog-data/products/schema/page.tsx）已完成，且七簇队列 10-29 12:0x 注册 F5'-EXTENDED = 全 src 树 210 处（products-content.ts 143 派生→SOP-5 / sku-seo-data.ts 29 / seo.ts 17 / products.ts 7 / category-conversion-blocks 3 / category-seo-content 3 / blog-posts 2 / schema-extensions 2 / components 4 / buying-guides 1）。

**本次补盘点发现（双方法，数据来源：`git ls-files src/` + node 逐行计数 · ripgrep 同口径复核 · 线上 curl 探针 19:2x）**：
- **F5'-EXTENDED 注册清单未含 `src/app/[locale]/services/catalog-printing-china/page.tsx`** —— 实为盲区：src 13 行 / 线上 zh-hk 14×國際認證體系 + 2×internationally certified、en 14×internationally certified（HTTP 200，heroSubtitle「國際認證體系 + FSC 認證」+ trustBadge「國際認證體系」+ FAQ + meta desc 均客户可见）。
- 其余 1 行命中多为 ja 术语（国際認証 = 09-19 K3 拍板译法）与 FSC/ISO 有证保留，需对端 #15 按上下文裁决；business-cards-printing 页 3 行命中属 §0.0 名片域（K3 未裁，不越域）。
- 全树现状（method2 行级单计数，含变体 國際認證體系/国際認証体系/國際品質認證/国際品質/internationally certified/international certifications）：products-content.ts 245 · sku-seo-data.ts 31 · category-seo-content.ts 15 · catalog-printing-china 13 · category-conversion-blocks 11 · seo.ts 4 · 其余 15 文件各 1-3（business-cards-printing 3 / about 2 / buying-guides 2 / 组件+页面 10 文件各 1）。**method1（子串计数）337+ 为叠加口径，以 method2 行级为准**。
- **处置（本轮不修）**：catalog-printing-china 页 13 处 src 残留 + 线上活残留 = 建议对端 #15 补清（§2.2 同款：FSC/ISO 12647 有证保留，無证「國際認證體系/internationally certified」→ 中性表述）；products-content.ts 等派生文件走 SOP-5 源修复。本登记仅证据 + 建议，不改 src（peer 活跃 + 执行层无 K3 依赖项优先级内不夹带）。

### 7.5 A17/C8 · gsc-cliff-detector 输入分裂修复（scripts 行为修复，10-30 C8 验证点前置）

**问题（A17，gsc-feedback 车道 §6 登记 P1）**：K3 自 10-15 起改导「三站点汇总」形态（全国家口径），detector glob 仍只匹配 `<站点>站点28天数据*.xlsx`（单站形态）→ 永远读 10-15 旧档（止 10-12，17 天龄）→ WARN_STALE ×3 误报 + 24h 恢复系数 135.5%（分母 585.2 = 三站和单站口径）与车道 109.9%（全国家 714.71）口径混用。

**修复（commit `f2e1dd1f` + 产物 `6c4fe56f`，scripts 行为修复，§0.25.9 ≥1 src 行为修复达标）**：
- 单站档过旧（age>STALE_DAYS）或缺失时，回退读 `28天三站点汇总数据*.xlsx`（全国家口径），记录 `caliber: full-country` + `INFO_CALIBER_SWITCH` 告警（含新旧档证据行）；不再误报 WARN_STALE。
- 24h 恢复系数：固定 585.2 分母保留但加 `recovery_ratio_vs_precliff_caliber` 标签（单站和三站和，与全国家不可比）；动态分母改用同口径全国家 mean28 并标注 `full-country`。
- 双方法验证（§0.23.2）：实跑 → WARN_STALE ×3 消除、caliber=full-country、latest 10-26 age 3d、mean28 749.2；方法 2 独立解析汇总档 28d 日均 749.18（×28=20,977 与车道 28d 总量一致）✓；排序回归：单站档较新时仍优先单站（不误回退）✓；tsc 54=54；encoding clean。
- **边界**：detector 会把同一全站序列复制到 hk/jp/us 三键（汇总档无分站数据）——诚实标注 caliber 而非伪造分站数据；历史 gsc-cliff JSON 不改写。
- **补修（commit `待填2`，§0.23 自查）**：首版修复后 `ratio_dynamic` 出现伪值——`combined_mean = sum(3×749.2) = 2247.6`（三键读同一全站序列，求和把分母放大 3 倍）→ ratio 0.353。修正：全国家口径下 dynamic 分母取**单序列 mean28**（749.2）而非求和。双方法验证：实跑 `ratio_dynamic=1.058`，方法 2 独立复算 793/(20977/28=749.18)=1.058 一致 ✓；WARN_STALE ×3 仍消除；tsc 54=54；encoding clean。
- **数据来源**：`scripts/gsc-cliff-detector.py` L31-56/L88-100/L130-145 · GSC数据/ 目录实盘（10-29 4 新档 = 三站点汇总形态，最新单站档 10-15）· 实跑输出 gsc-cliff-2026-10-29.json · openpyxl 独立复算 749.18 / 1.058。

### 7.6 登记（只登记不修）· T7：catalog-printing-china 页 FDA 食品級油墨 = 无证认证声明（§2.2 战略点名项）

**发现（本轮补盘点，线上双证 + src 锚点）**：`src/app/[locale]/services/catalog-printing-china/page.tsx` 三语种各含 **FDA 食品級油墨声明**：
- zh-hk：L165 `{ title: 'FDA 食品級油墨', desc: '大豆油墨 + 食品級油墨可選...' }` + L180 FAQ `'...FDA 食品級油墨. 每批出貨前 100% QC 抽樣, 損壞率 < 0.5%...'`
- en：L254 `'FDA Food-Grade Ink'` + L269 FAQ 同款；ja：L344 `'FDA食品グレードインク'` + L359 FAQ 同款
- 线上 zh-hk 探针（22:0x，HTTP 200）：**FDA 命中 6 / 食品級 8**（hero/FAQ/desc 均客户可见）

**SOP-10 5问 #3 判定（原数据/拍板来源）**：K3 8/19 拍板「12 件事属实」= FSC-C123456 + 15年 + 1,000+客户 + 海德堡 6+1 + 12行业 + 24h SLA + 国际顶级 + ISO 9001 —— **不含 FDA**；FDA 21 CFR §176.170/176.180 仅为 blog 引用的公开法规（材料合规性，8/28 en/ja rewrite 数据来源），**不等于「本站油墨已获 FDA 认证」**。⇒「FDA 食品級油墨」+「損壞率 < 0.5%」均为**无来源声明**（§0.23 / §2.2「先清除未经证实的食品接触/FDA/FSC 声明，再补可证明的材质、用途、打样与报价输入」明确点名）。

**覆盖范围核实**：七簇 K3 决策队列 L113 无 FDA 条目 · strategy-task-queue.json 16 任务 FDA 命中 0 · peer F5'-EXTENDED 210 处清单（只覆盖 認證體系/internationally certified 类）不含 FDA 声明 · **= 登记盲区，新登记 T7**。

**确定性复核（三闸门 #3，node 探针 3 语 × 3 次 = 9 次全一致，22:2x）**：zh-hk FDA=6/food=8（3次一致）· en FDA=6/food=6（3次一致）· ja FDA=6/food=8（3次一致）；全部 HTTP 200 + len 128-138 KB。en food=6 为 food-grade 词（少 2 因 zh/ja 另有「食品級/食品グレード」词形计数差异，口径一致）。

**处置（本轮不修，只登记）**：FDA 声明撤/留需 K3-7 claims policy 裁决或对端 #15 按 §2.2 同款执行（有证保留 FSC/ISO 12647，無证 FDA/食品級/損壞率 < 0.5% → 中性表述「可選食品級油墨選項」）；catalog-printing-china 页属对端 #15 域 + peer 活跃（§0.35.7 双条件②未满足），执行层不夹带。本登记证据 + 建议入 `strategy-task-queue.json` 候选（§7.2 纪律：由 GSC/daily 车道消费，不自行批准）。
- **数据来源**：catalog-printing-china/page.tsx L165/180/254/269/344/359 · 线上 node 探针 3 语 ×3（HTTP 200，22:2x）· docs/2026-08-28-07-28-3-blogs-en-rewrite-report.md L6-10（K3 8/19 12件事 + FDA 21 CFR 公开法规来源）· 七簇 K3 决策队列 L113 · strategy-task-queue.json（16 任务 FDA 命中 0）· docs/2026-10-26-dual-engine-seo-aeo-geo-deep-strategy.md §2.2。

### 7.7 线上验收 · T1-T3 已在线上生效（124b0b11 批 13:53 部署确认）

k3-review §2.5 T1-T3（队列 DONE）线上复核（22:0x，三闸门 #2 响应有效性：HTTP 200 + 合理长度 230-327 KB；确定性：单次探针 + 词频计数）：
- **T1 calendars en**（`category-conversion-blocks.ts` L2241 50 pcs 对齐 1 MOQ）：线上 `/en/category/calendars/` `50 pcs` **0** 命中（已消除）· `1 pc` 24 / `1 MOQ` 24 / `From 1 pc` 17 ✓
- **T2 mini-calendars en**（`sku-seo-data.ts` L1557 1,000 units → 1 unit）：线上 `/en/product/mini-calendars/` `1,000 units` **0** · `1-unit minimum` 2 / `1 unit` 2 ✓
- **T3 greeting-cards en 量词本地化**（pricing.ts localizePriceUnitToken + CategoryPageV9 unitWord）：线上 `/en/category/greeting-cards/` `100張` **0** / `10 張` **0** / `pieces` 0 / `per 100` 0 ✓
- **数据来源**：线上 curl 探针 ×3（HTTP 200）· src 锚点（category-conversion-blocks.ts L2241 / sku-seo-data.ts L1557 / pricing.ts L736-751）· commit 124b0b11（13:53 批）· CF build 已验证。
