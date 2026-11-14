# ZprintPro 三语商家结构化数据真值修复与验收报告

日期：2026-11-14  
范围：zh-hk／en／ja 的 PDP Product/Offer、分类页 ItemList 内嵌 Product/Offer、Merchant Center XML Feed  
状态：**源码与本地渲染已修复并验证；尚未 commit／push／部署，生产与 GSC 仍待复测。**

## 一、结论

本轮不是修复一个孤立的 GSC 字段，而是消除三种机器可读商业条件之间的冲突：

1. 原 PDP 与分类页 Offer 把全部商品写成运费 `0`，并附带统一 handling／transit 时效；legal 页面则明确运费另计、只有满足地区与金额门槛才免运。
2. 原 Offer 写 `MerchantReturnNotPermitted + merchantReturnDays:0`；三语 legal 均明确质量缺陷等情形可在签收后 14 天内申请退货。
3. 分类页直接使用 `product.basePrice` 并配 locale 币种；PDP 使用 localized unit-price anchor／localized from-price。生产实测 en small-batch 分类页为 `38 USD`，PDP 为 `0.55 USD`。
4. 三条生产 Merchant Feed 各有 83 个 `g:shipping`，全部为 `0.00`；这与 legal 的运费披露冲突。
5. PDP `sourcingIntentKeywords` 对所有 SKU 附加免费打样、1 小时打样及 DHL 全球派送，不能作为全 SKU 统一承诺。

这些属于**商业语义错误**，不是 `aggregateRating`／`review` 一类可选增强缺失。未新增评价、认证、退款方式、退货物流、运费或履约数字。

## 二、生产问题证据（修复前）

只读探针：`.hermes/tmp/audit-merchant-jsonld-20261114.mjs`  
证据：`.hermes/logs/merchant-jsonld-audit-2026-11-14.json`

抽测 URL：

- `/zh-hk/product/cartoon-red-packets/`
- `/en/product/small-batch-stickers/`
- `/ja/product/white-card-boxes/`
- 三语 `/category/stickers/`
- 三语 `/legal/`
- 三语 `/api/merchant-feed/[locale]/`

实测结果：

- 12 个 URL 均为 HTTP 200；raw HTML 的 JSON-LD 全部可解析。
- 三个 PDP 均有零运费、固定时效和不可退货标记。
- 三语分类页内嵌 Product 也有同类冲突。
- 三条 Feed 均为 83 个商品、83 个配送节点、83 个零运费节点。
- 三语 legal 均检出“14 天”“质量缺陷退货”“运费另计”信号。
- en small-batch 分类页 Offer=`38 USD`，PDP Offer=`0.55 USD`，`exactPriceCurrencyMatch=false`。

注意：该探针只解析真正的 `application/ld+json` 节点，明确排除 RSC flight 副本；没有把源码状态冒充线上状态。

## 三、已实施的源码修复

### 1. 统一 Offer-level 退货政策

新增 `src/lib/merchant-policy.ts`：

- `returnPolicyCategory=MerchantReturnFiniteReturnWindow`
- `merchantReturnDays=14`
- 三语 description 明确“仅质量缺陷等法定披露情形”，不是无条件退货。
- 不输出 `returnMethod`、`returnFees`、`refundType`，避免把 Organization-level 字段误用于 Offer-level 子集。

PDP 与分类页均调用同一 helper，消除后续再次漂移的入口。

### 2. 撤下无真值支持的配送承诺

从 PDP Offer、分类页 Offer 和 Merchant Feed 撤下无条件配送字段：

- 不再输出全商品 `shippingRate.value=0`。
- 不再输出统一 handlingTime／transitTime。
- Feed 不再输出全商品 `g:shipping=0.00`。

这是“宁缺勿错”，不是宣布全站没有配送服务。后续取得分国家、重量、门槛与 SKU 履约真值后，再在 GMC 账户级或 Feed／Organization markup 中有条件恢复。

### 3. 价格同源

在 `src/lib/pricing.ts` 新增 `getProductOfferPrice()`：

1. 优先 `getUnitPriceAnchor()` 的本地化页面锚点；
2. 缺失时回退 `convertToFromPrice(price_range)`；
3. 无有效数字返回 `null`，禁止用 `0` 补价。

PDP、分类页 ItemList、Merchant Feed 全部改用该入口。没有改动价格源、`UNIT_PRICE_ANCHORS`、`price_range`、报价计算器或任何 title／H1／正文。

### 4. 采购关键词去承诺化

`sourcingIntentKeywords` 只保留来自 `products.ts` 的 MOQ 与单位；删除全 SKU 免费打样、1 小时打样和 DHL 全球派送后缀。

## 四、本地验证

### 全量生成器与 Feed 断言

命令：`npx tsx scripts/tests/test-merchant-policy.ts`  
证据：`.hermes/logs/merchant-policy-test-2026-11-14.json`

结果：PASS

- 三语 × 83 SKU：PDP 249 项、分类页 249 项、Feed 249 项。
- 249 个有效 Offer 均为正数价格。
- PDP＝分类页＝Feed＝`getProductOfferPrice`。
- 三类输出均无无条件配送字段。
- 退货均为有限 14 天窗口，且无不受支持的 Offer-level 扩展字段。
- Product／Feed brand 继续统一为 `ZprintPro`。

### 本地真实页面渲染

命令：

```bash
AUDIT_ORIGIN=http://127.0.0.1:7100 \
AUDIT_OUT=.hermes/logs/merchant-jsonld-local-2026-11-14.json \
AUDIT_ASSERT=1 node .hermes/tmp/audit-merchant-jsonld-20261114.mjs
```

证据：`.hermes/logs/merchant-jsonld-local-2026-11-14.json`

- 12／12 URL HTTP 200。
- JSON-LD 解析错误 0。
- 商业政策断言失败 0。
- en small-batch 分类页与 PDP 的价格／币种完全一致。
- 三条本地 Feed 的 `g:shipping` 均为 0。
- 首次开发编译造成 zh PDP 单次 30 秒超时；同配置复测通过。临时开发服务器已关闭。

### 工程门禁

- `git diff --check`：PASS。
- `node scripts/check-brand-mentions.mjs --strict`：PASS，A 类 0 命中。
- `npx tsc --noEmit --pretty false`：54 个 error TS，全部位于未修改的 `src/lib/quote-engine/__tests__/`；与历史 54 个存量错误一致，本批零新增。不能表述为“类型检查全绿”。
- `node scripts/check-encoding.js --fix`：脚本只检查 staged 文件，本批未 stage，因此显示 `No staged files to check`；另以工作树字节检查补充验证本批文本无 UTF-16 BOM／CRLF。

## 五、尚未处理与边界

1. **未 commit、未 push、未部署**：生产零运费／不可退货／分类页价格冲突在部署前仍可能存在。
2. **未声称 GSC 已恢复**：Google 需要重新抓取；GSC 与 Merchant Center 还可能保留账户级配送／退货配置，优先级可高于页面 markup，需另行核对。
3. legal 内既有批量折扣、98.5% 时效统计、不同市场免运门槛，以及其他页面 visible copy 的配送承诺不在本批写域；本批没有把这些值传播进 schema。
4. `aggregateRating`／`review` 仍是可选增强；没有真实评价时继续省略，禁止编造。
5. 本轮没有修改 small-batch 已验收正文、海报 Blog 清理任务、贺卡资产、301、title、H1、Blog JSON 或价格真值。

## 六、部署后验收与搜索测量

### A. 技术验收（部署完成后立即）

运行：

```bash
AUDIT_ORIGIN=https://zprintpro.com \
AUDIT_OUT=.hermes/logs/merchant-jsonld-production-fixed-2026-11-14.json \
AUDIT_ASSERT=1 node .hermes/tmp/audit-merchant-jsonld-20261114.mjs
```

通过条件：

- 12／12 URL 200，JSON-LD 可解析。
- PDP／分类页无 `shippingDetails`，Feed 无 `g:shipping`。
- Offer 退货均为 `MerchantReturnFiniteReturnWindow + 14`。
- 不再有全 SKU 打样／DHL 采购承诺。
- en small-batch 分类页与 PDP 价格／币种一致。
- Product brand 无回退，raw HTML 无重复 Product 发射回归。

随后用 Google Rich Results Test 各测一个三语 PDP 与一个分类页，并在 Search Console URL 检查中请求重新索引。RRT 的“缺少可选配送增强”提示不等于应恢复错误零运费。

### B. 平台对账（1–3 个工作日）

- 核对 Merchant Center 账户级 shipping／returns 设置，确保不会以更高优先级重新覆盖成“全部免运／全部不可退”。
- 强制重新抓取三条 Feed，记录商品数、价格不匹配、配送与退货诊断。
- 在 GSC 商家信息报告中按 URL 抽样，不以“验证已启动”代替“已修复”。

### C. 复测窗（7–14 天）

- 保存本报告的生产前基线与部署后 JSON，按同一 URL、同一 raw HTML 口径比较。
- 记录有效商品数、价格不匹配、退货／配送诊断变化。
- 不把结构化数据修复直接归因于排名、CTR、询盘或首页提升；这些需要另设 GSC query×page 与转化窗口验证。

## 七、官方依据

- Google Merchant listing：Product/Offer 可提供价格、库存、配送与退货信息；商品级退货只支持 Organization-level 政策的子集。
- Google Merchant return policy：`MerchantReturnFiniteReturnWindow` 必须搭配 `merchantReturnDays`；通用政策推荐置于 Organization，商品级用于覆盖或无通用政策时。
- Google 同时说明：结构化问题可能涉及内容合规而非语法，RRT 不能发现所有语义错误；发布后需 URL 检查并允许重新抓取。

参考：

- https://developers.google.com/search/docs/appearance/structured-data/merchant-listing?hl=en
- https://developers.google.com/search/docs/appearance/structured-data/return-policy?hl=en
- https://developers.google.com/search/docs/appearance/structured-data/product?hl=en

## 数据来源

- 生产 raw HTML／Feed 抽测：`.hermes/logs/merchant-jsonld-audit-2026-11-14.json`，2026-11-14。
- 本地 raw HTML／Feed 抽测：`.hermes/logs/merchant-jsonld-local-2026-11-14.json`，2026-11-14。
- 全量三语生成器断言：`.hermes/logs/merchant-policy-test-2026-11-14.json`。
- 法定披露：`src/app/[locale]/legal/page.tsx` 三语 returns／additionalFees。
- 类型检查：`.hermes/tmp/merchant-tsc-20261114.log`。
- 官方文档：Google Search Central，上述三个页面，本轮直接读取。
