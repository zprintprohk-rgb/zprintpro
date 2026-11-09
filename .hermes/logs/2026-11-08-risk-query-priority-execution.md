# 2026-11-08 风险词优先级修复、生产验收与复测登记

> 执行角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师（Kimi Work 人手会话）  
> 执行顺序：海报簇 → 宣傳單張 → 喜帖 → JA 教材 → EN `a2 poster` → `コミケ 印刷` → 利是封  
> 总结：**4 项商业真值修复已上线并完成生产文字级验收；海报与喜帖保持 WAITING_K3；利是封 NO_OP。所有已修项进入 MEASURE，不宣称排名已经提升。**

## 1. 风险词处置总表

| 优先级 | 词／词簇 | 本轮判定 | 实际动作 | 后续状态 |
|---|---|---|---|---|
| 1 | 海報印刷／印海報 | 指南与交易页承接分散，但主 URL、标题、价格、认证等商业与结构决策未获本轮批准 | 不改页、不另写长文，不做 canonical／301 | **WAITING_K3** |
| 2 | 宣傳單張／宣傳單張印刷 | 既有采购指南单面价格区间与 SKU 档牌价口径不一致 | 修 A4／A5 单面价格并补数量阶梯说明 | **FIX_DEPLOYED → MEASURE** |
| 3 | 喜帖印刷 | 搜索意图错接：感谢卡 PDP 承接高于请柬类目 | 不移类目、不改 canonical／301，不改结构 | **WAITING_K3** |
| 4 | JA `教材 印刷製本` | JA 指南仍用港币旧区间，且 meta 来源与正文来源不同 | 正文、description、blog-posts excerpt 同源修正 | **FIX_DEPLOYED → MEASURE** |
| 5 | EN `a2 poster` | H1 与正文 MOQ 仍写 100，与已批准真值 10 不一致 | H1 与 4 处 MOQ 统一为 10 | **FIX_DEPLOYED → MEASURE** |
| 6 | JA `コミケ 印刷` | K3 已批准 C109 项，但 PDP 把订单起价误写为每部单价 | 改为订单起价并显式注明非每部单价 | **FIX_DEPLOYED → MEASURE** |
| 7 | 利是封印刷 | 类目承接集中且季节性强，无足够证据支持本轮改页或新增文章 | 不改页、不新增文章 | **NO_OP** |

**边界：**以上 `FIX_DEPLOYED` 只表示代码、部署和页面文案已验收，不表示 GSC 排名、点击、询盘或收入已经改善；复测证据不足时不得 `SCALE`。

## 2. 已上线的四项修复

### 2.1 宣傳單張：只修单面价格与数量阶梯

文件：`src/data/blog-data/zh-hk.json`，既有 `flyer-printing-guide`，未新建文章。

- 第二张尺寸表 A4 单面：`HK$0.15-0.30` → `HK$0.35 起`。
- A5 单面：`HK$0.08-0.18` → `HK$0.25 起`。
- 表后新增：`單張成本隨數量階梯變動：以上『起』為 100 張檔牌價，5,000 張按 5 折計算。`
- A4／A5 双面原有区间、title、excerpt、lastUpdated 均未改。线上旧字符串检查因此不能全页笼统归零，本批断言定位单面价格及新增阶梯说明。

### 2.2 JA 教材：正文和搜索摘要同步修正

文件：`src/data/blog-data/ja.json`、`src/data/blog-posts.ts`。

- `100冊から HK$5-50/冊` → `100冊から 基本仕様 ¥1,288〜`，覆盖 description 与正文。
- 表头 `単価帯 (HK$)` → `価格条件`，100 冊行同步为 `基本仕様 ¥1,288〜`。
- `blog-posts.ts` 的 JA excerpt 与两处同源注释同步修正，避免搜索摘要继续显示旧港币区间。
- 真值依据：`products.ts` textbooks `basePrice_ja: 1288`、`minQuantity: 100`；title 未改。

### 2.3 JA 同人誌：订单起价不再误写为每部单价

文件：`src/data/products.ts`、`src/data/sku-seo-data.ts`。

- DJ-001：`¥7,500〜/部〜` → `¥7,500〜/注文〜`。
- JA body 新增：`価格は指定仕様・数量の注文開始価格 ¥7,500〜（1部あたりの単価ではありません）。ページ数・部数・用紙・製本により変動し、最終価格は見積りで確定します。`
- 决策依据：K3 2026-10-30「1–5 全部按推荐」，`strategy-task-queue.json` JA-C109 已为 `DONE`，既有执行 commit `7b396bd9`。
- 本批只补价格单位误写；准备指南、官方日期、rush、安全截稿日及未批准项未动。

### 2.4 EN A2：H1 与正文 MOQ 统一为 10

文件：`zprintpro-sku-seo-data.csv`、`src/data/sku-seo-data.ts`、`src/data/products-content.ts`。

- H1：`A2 Posters 10+ | Retail & Events | ZprintPro`。
- `100-poster MOQ`／`100-poster minimum`／`100 posters` 等 4 处统一为 10。
- CSV 同步三处既有文案，防止生成器回退：cosmetic-boxes 的认证表述，以及 custom-red-packets 中英文 QC 表述；未改其价格、交期或 title。
- 生成器仅改变 A2 目标块，TS-only C109 内容保留。

## 3. 保持待拍板与 NO_OP 的项目

### 3.1 海报簇：WAITING_K3

2026-10-31 query×page 快照中，`海報印刷` 由 `/zh-hk/blog/poster-printing-guide/` 承接 37%，`/zh-hk/product/a2-posters/` 承接 16%，类目并非第一承接页。该快照说明需要诊断主 URL 与页面分工，但不足以授权 canonical、301 或结构重写。

本轮不改主 URL、title、价格、认证、海报指南结构，也不另写长文。`印海報` 与 `海報印刷` 合并到同一海报词簇复测，不能凭 7 天短窗恶化直接改页。

### 3.2 喜帖：WAITING_K3

同一快照中，`/zh-hk/product/wedding-thank-you-cards/` 承接 `喜帖印刷` 73%，`/zh-hk/category/wedding-invitations/` 仅 27%。这是搜索意图错接信号，不是执行层自行迁移类目或做 canonical／301 的授权。本轮不改页，待 K3 对主承接 URL 和感谢卡／请柬分工作出裁决。

### 3.3 利是封：NO_OP

`利是封印刷` 在 10 月 31 日快照中由 `/zh-hk/category/red-packets/` 承接 75%，主承接相对集中，且查询有季节性。本轮没有足够新增决策价值支持改页或新增文章，保持 NO_OP。

## 4. 本地门禁与提交

### 4.1 变更范围

- commit：`74ffa5a9668034e47a3e93b6d0c76dac902e4c91`
- message：`fix: 修正风险词承接页价格与起订量口径`
- 7 个文件，16 insertions／16 deletions。
- 已 push：`911def1e..74ffa5a9 main -> main`。
- 最终核对：`HEAD == origin/main == 74ffa5a9668034e47a3e93b6d0c76dac902e4c91`，`src/` 无本批未提交差异。

### 4.2 已执行门禁

- 目标字段断言：**8/8 PASS**；相关 JSON 解析通过。
- `node scripts/csv-to-sku-seo.mjs`：CSV 83、TS 84 keys、title drift 0，A／B／C／D／E 全 PASS；`--apply` 仅 A2 目标块变化，再次 dry-run 字节变化 0，TS-only C109 保留。
- `node scripts/check-encoding.js --fix`：6 个受检源码文件 UTF-8 LF。
- `node scripts/check-brand-mentions.mjs --strict`：A 类 0。
- `node scripts/check-content-guard.js`：red=0；yellow 1 为既有 `ja.json:92 会`，非本批。
- `node scripts/check-i18n-mix-diff.mjs`：候选 0。
- `node scripts/guards/gsc-leak-guard.js`：exit 0。
- `npx tsc --noEmit`：54 个既有错误，全部位于 `src/lib/quote-engine/__tests__/`，本批目标文件错误 0；日志 `.hermes/logs/tsc-risk-query-2026-11-08.log`。
- pre-commit 全部通过，未使用 `--no-verify`。
- push 时 12 段骨架：`PASS=324 FAIL=0 WARN=0 SKIP=0 INVALID=0`。

### 4.3 已知旧脚本口径，不作为本批失败

- `check-sku-csv-sync.mjs` 旧解析器仍报 `DRIFTED`：CSV 83／TS 85，但 title drift=0，并误识别 `small-bags/name/seo`、并列 `fruit-food-label-stickers`。实际生成器 key=84 且 A–E 断言全过，本批不为此改无关文件。
- `moq10-verify-scoped.mjs` 仍写“海报应为 1”，与 K3 的 EN A2=10 裁决不符；以目标断言和生产页面为准，未改旧脚本。

## 5. Cloudflare 与生产文字级验收

- GitHub check-run：Cloudflare Pages `completed / success`，完成时间 `2026-11-07T16:32:21Z`（Asia/Shanghai：2026-11-08 00:32:21）。
- 生产验收时间：2026-11-08 00:33:27 +08:00。
- 机器可读证据：`.hermes/logs/risk-query-online-verify-2026-11-08.json`。
- 验收脚本：`.hermes/logs/verify_risk_query_online_2026_11_08.py`；H1 按渲染文本断言，其余目标文案按生产 HTML 计数。

| 生产 URL | HTTP／索引 | 新文案断言 | 旧错误口径 | 结果 |
|---|---|---|---|---|
| `/zh-hk/blog/flyer-printing-guide/` | 200；canonical 自指；`index, follow` | A4 `HK$0.35 起`、A5 `HK$0.25 起`、阶梯说明均存在 | 双面合法区间未误删 | **PASS** |
| `/ja/blog/textbook-printing-guide/` | 200；canonical 自指；`index, follow` | meta 与正文均有 `基本仕様 ¥1,288〜`，表头为 `価格条件` | `HK$5-50/冊` = 0 | **PASS** |
| `/ja/product/doujinshi-printing/` | 200；canonical 自指；`index, follow` | 有 `¥7,500〜/注文〜` 与 `1部あたりの単価ではありません` | `¥7,500〜/部〜` = 0 | **PASS** |
| `/en/product/a2-posters/` | 200；canonical 自指；`index, follow` | H1=`A2 Posters 10+ \| Retail & Events \| ZprintPro`；`10-poster MOQ`、`10-poster minimum`、FAQ `10 posters` 均存在 | `100-poster`／`100 posters` = 0 | **PASS** |

生产验收总结果：**4/4 PASS**。

## 6. 学习队列与复测

已精准更新 `.hermes/cron-prompts/blog-money-keyword-queue.json`，未整文件 stage／commit，未代提交他人已有改动；JSON 解析通过，`updated_at=2026-11-08`。

- flyers：保留冻结 baseline 与历史窗口观察，追加本次 change、commit、deploy、online_verify、retest。
- comiket-ja：陈旧 `blocked_waiting_k3` 已改为 `remeasure`，登记 K3 裁决、既有执行 commit 与本次单位修复；学习规则增加“标 blocked 前先核对裁决队列与后续执行 commit”。
- audit notes：登记 JA 教材、EN A2、海报 WAITING_K3、喜帖 WAITING_K3、利是封 NO_OP。
- 2026-11-08 query×page API 两次刷新分别遇到代理 `ProxyConnectionError` 与直连 `TimeoutError`，未紧循环重试。份额继续引用 `.hermes/logs/money-kw-share-baseline-2026-10-31.md`，不冒充今日联接。

复测要求：

1. **2026-11-14 首轮观察**：同口径记录目标词展示、点击、CTR、位置及 query×page 主 URL 份额；同时检查生产文案是否仍在线。
2. **2026-11-21 同窗复测**：使用相同窗口长度、国家口径与查询列表，对照冻结 baseline 和本轮 change 日期。
3. 窗口移动不等于实验胜负；若样本不足、数据日未闭合或 API 联接失败，继续 `MEASURE`，不得 `SCALE`。
4. 海报与喜帖只有在 K3 裁决后才可实施结构／主 URL 变更；利是封无新证据继续 `NO_OP`。

## 7. SOP-10 五问自检

1. **架构差异？** 已查实际渲染数据源：JA 教材除 `blog-data/ja.json` 外，meta 还来自 `blog-posts.ts`；EN A2 H1 由 CSV 生成器写入 `sku-seo-data.ts`，因此源头与派生文件同步，未手选冲突。
2. **约束适用范围？** 已核对 K3 2026-10-30 JA-C109 裁决及既有执行记录；未自行批准海报、喜帖或其他 WAITING_K3 项，未做 canonical／301／noindex。
3. **原数据／拍板来源？** JA 教材取自 textbooks SKU 的 `basePrice_ja=1288`、`minQuantity=100`；C109 单位依据 K3 裁决和既有 DONE 记录；A2 MOQ 按已批准 10 执行。排名风险沿用用户给定连续窗口与队列记录，未编造新排名。
4. **字段值策略？** 未把商业字段留空或改留联系方式；只把错误区间／单位改为有来源的价格条件，未新增认证、产能或时效承诺。
5. **Markdown 渲染？** 本批未新增 user-facing Markdown 链接，无需新增 `parseInlineLinks()`；未改组件渲染逻辑。

## 8. 数据来源

- K3 2026-11-07 风险词优先级指令及连续 28 天窗口数据。
- `.hermes/logs/money-kw-share-baseline-2026-10-31.md`（2026-10-31 query×page 快照；不是 2026-11-08 新联接）。
- `GSC数据/money-kw-query-page-2026-10-31.csv`，窗口 2026-09-30..2026-10-27。
- `.hermes/logs/gsc-2026-11-07-money-keyword-delta.json`，窗口 2026-10-08..2026-11-04。
- `src/data/products.ts` textbooks 与 DJ-001 商业字段。
- `.hermes/logs/2026-10-30-k3-decision-execution-report.md`、`.hermes/logs/strategy-task-queue.json`、K3 2026-10-30「1–5 全部按推荐」及执行 commit `7b396bd9`。
- 本批 commit `74ffa5a9668034e47a3e93b6d0c76dac902e4c91` 与 GitHub／Cloudflare check-run。
- `.hermes/logs/risk-query-online-verify-2026-11-08.json`（生产 HTML 实测，4/4 PASS）。
