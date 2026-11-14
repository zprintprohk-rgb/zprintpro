# ZprintPro 订单自动化（POD 一件代发）可执行方案

> 日期：2026-11-14（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 输入：客户 5 问（MOQ=1／单本价格／SI·HR·AT 运费／API 自动化／时效）+ 长期 POD 一件代发合作意向
> 指令：穷尽能力分析三语言站点（zh-hk／en／ja）订单自动化的可执行方案；先解决报价，再解决运费与 DDP 税费计算；按「挂历 $19.9、台历 $19.9、单本重量 ~0.7kg」为基准定价锚。
> **二轮修订（2026-11-14 09:33 拍板意向）**：定价改为 **$49.9 全包（一本，DDP 到欧洲）**；后端增加**人工审核环节**；问：可以自动化实现吗？—— 本修订版回答：可以，并给出全包成本模型与「人工审核闸 + 前后全自动」架构（§0.1）。
> 性质：策略与执行方案（docs），不承诺生产页面已修改；数字均带来源或「待实测」标注。

---

## 0. 决策摘要

1. **客户 5 问全部可以给出正面答复，商业模式成立的前提是「产品价与运费／税费分列计价」**（对标 Printful：Wall Calendar $12.43 + 运费 from $8.79 分列）。若做「$19.9 全包到欧洲」，单本成本（生产+运费+税费）已超过 $19.9，必亏；分列后终端到手约 $35–40（经济件）／$57–67（DHL Express），毛利约 30%+。
2. **站点已有约 60% 地基可复用**：`src/lib/quote-engine/`（shipping.ts／tax.ts／markets.ts）、`src/app/quote-desk/`（内部价表：cost_rmb／sell_hkd／en USD／ja JPY／weight／shipping）、`/api/quote`（询盘落库）、`/api/create-payment-session`（下单+支付指引）、Supabase `orders` 表、RESEND 邮件、Cloudflare R2（可放 PDF）。**缺的 40%**：服务端实时计价、EU 国家市场（现仅 9 市场，无 SI／HR／AT）、真实承运商运费 API、DDP／IOSS 税费引擎、PDF 上传与自动质检、订单状态机与 webhook 回传、线上卡收单。
3. **欧盟 2026-07-01 新政是 DDP 计算的硬约束**：€150 免税额度取消，≤€150 B2C 包裹改征固定 €3 关税（芬兰海关口径「每票」，Lexology 口径「每件」，需按承运商最终口径固化）；IOSS 仍用于代收增值税。SI 22%／HR 25%／AT 20% VAT 税率已核实。
4. **两个 P0 阻塞项决定「全程无需人工」能否闭环**：① 线上卡收单（现仅银行电汇／微信／支付宝 QR，PayPal 审核中——全自动 API 下单必须补线上收单）；② IOSS 注册与欧盟中介（深圳主体需指定欧盟财政代表）。二者未落地前，API 可先做「下单+文件自动质检+半自动履约」。
5. 本报告为 docs-only 交付（未改 src，未 push），按 §0.25.9 攒批规则留本地 commit，随下个 cron 窗口推送。
6. **二轮修订（本日）**：定价改 **$49.9 全包 DDP**（一本，EU 经济件，含产品+经济件运费+进口 VAT+€3 关税+DDP 服务费，终端到手零税）；后端新增**人工审核闸**。**可以自动化实现**——全链路（下单/文件/支付/状态回传）自动，人工审核由 ZprintPro 后台执行（SLA ≤4 工作小时、一键批准/驳回），分销商侧零人工。**前提**：① 经济件（Express 须加价，否则亏损）；② IOSS 注册 + 线上卡收单（仍是 P0 阻塞）；③ 生产实测成本 ≤$8/本（§0.1 毛利测算）。

---

## 0.1 二轮修订：$49.9 全包 + 人工审核（本日拍板意向）

### 0.1.1 $49.9 全包毛利测算（一本，EU 经济件 DDP，SI 22% VAT 为例）

| 项 | 金额 | 说明 |
|---|---|---|
| 终端实付（全包） | $49.9 | 含税价（DDP，到手零税） |
| IOSS VAT（含税价内扣） | −$9.0 | 22/122 × $49.9；HR 25% → $10.0；AT 20% → $8.3（EU 价格含税口径） |
| 固定关税（€3） | −$3.2 | 2026-07-01 新政平税（每票/每件口径待承运商固化） |
| DDP 服务费（承运商代缴） | −$5.0 | 待承运商报价（€5–10 取中） |
| 生产成本（中值） | −$8.0 | 实测区间 ¥45–75（$6–10），**待生产实测** |
| 经济件运费（中值） | −$10.0 | 云途/燕文 ¥55–90（$8–13），**待物流实测** |
| 收款手续费 ~3.5% | −$1.7 | 卡收单/PayPal 通道 |
| **毛利** | **≈ $13（≈26%）** | 若生产 $6/运费 $8 → ≈$17（34%）；若走 DHL Express（$30–45）→ **亏损** |

**结论**：$49.9 全包（经济件）数学可行；**Express 必须加价单列**（建议 +$25 → 全包 Express $74.9，待 DHL 实测校准）。此模型把客户报价从「三栏明细」简化为「一个数字」，更利于自动化与 AEO 引用（单一答案）。

### 0.1.2 人工审核环节设计（自动化答案）

- **自动化覆盖**：下单 → PDF 自动质检 → 支付 → 状态/跟踪回传全自动（分销商侧零人工）。
- **人工审核闸（ZprintPro 后台）**：`paid → file_preflight → under_review → approved/rejected`。审核台 = 订单列表 + PDF 预览 + 自动质检报告 + 地址/收款核验 + 一键批准/驳回（附原因）。
- **SLA**：≤4 工作小时完成（按每日生产截单倒排优先级）；驳回自动 webhook + 邮件通知分销商，重传后重新排队。
- **为什么这是「可自动化」的关键**：把不可自动化的质量/合规判断收敛为**单一人工闸**，闸前（文件/支付/下单）与闸后（生产→出运→回传）全自动——这是 POD 业界标准（Printful 同构），既保护品牌（印刷客诉 80% 源于文件问题），又满足客户「无需人工操作」诉求（人工在 ZprintPro 侧，不在分销商侧）。

### 0.1.3 与 §1–§10 的关系

本修订**取代**原方案中的分列计价口径（§1 Q2/Q3、§4.2–4.3、§5.2 示例、§6.1/§6.5、§8.2、§10 相关行已同步更新）；原 $19.9 保留为「产品件」内部组件基准与规格变量加价起点。非 EU 区域（US/JP/HK）另表定价，不受本修订影响。

---

## 1. 客户 5 问：直接答复（三语口径）

| # | 客户问题 | 答复（en 主口径） | 关键数字 |
|---|---|---|---|
| 1 | 每单只印 1 本、无起订量？ | Yes. MOQ is 1 piece for POD calendar orders. Single-piece all-in price **US$49.9** (DDP), separate from wholesale tier pricing. | MOQ=1；单本全包 $49.9 |
| 2 | 1 本 A3 挂历（297×420mm）13 张全彩金属圈+挂勾价格 | **US$49.9 all-in per piece** (DDP to EU: print + metal spiral binding + hanger + tracked economy shipping + import VAT + €3 duty; recipient pays nothing at delivery). Express upgrade +$25. | $49.9／本全包（EU 经济件） |
| 3 | 发斯洛文尼亚／克罗地亚／奥地利运费 | Included in the $49.9 all-in price (tracked economy, 5–10 business days, DDP). Express upgrade (2–4 days): +$25. | 运费已含；Express +$25 |
| 4 | 提供 API 实现订单自动化？ | Yes. Quote API → File Upload API (auto PDF preflight) → Order API (shipping info) → **backend manual QC gate (approved within 4 working hours)** → production → webhook tracking callback. Fully automated on the reseller side. Integration window ~4–8 weeks. | 4–8 周对接；审核 SLA ≤4h |
| 5 | 生产+派送一般多久 | Production 2–3 business days + shipping 5–10 (economy) / 2–4 (Express) → 7–13 business days total (economy), 4–7 (Express) to SI/HR/AT. Q4 peak adds buffer; confirmed at quote. | 全链路 7–13（经济）／4–7（Express）工作日 |

**英文回复草稿（可直接发客户）**：

> Thank you for considering a long-term POD partnership with ZprintPro. Direct answers:
> 1. **MOQ**: 1 piece — no minimum. Each order can be a single calendar at the **all-in price of US$49.9** (A3 wall, 13 sheets, full-color, metal spiral binding + hanger; desk calendar same price).
> 2. **All-in pricing (DDP)**: **US$49.9 per piece delivered** to your customer in Slovenia/Croatia/Austria — print + tracked economy shipping (5–10 business days) + import VAT (SI 22% / HR 25% / AT 20%) + the flat €3 EU duty (new rule since 2026-07-01) + DDP handling. **Your customer pays nothing at delivery.** Express upgrade (2–4 days): +US$25.
> 3. **API**: yes — fully automated on your side: quote → PDF upload with automated file check → order with shipping info → our backend runs a manual QC gate (approved within 4 working hours, you are notified automatically) → production → webhook with tracking number. First integration typically takes 4–8 weeks.
> 4. **Turnaround**: production 2–3 business days + shipping 5–10 days economy / 2–4 days express. Total to SI/HR/AT: 7–13 business days (economy) or 4–7 (express). Q4 peak season adds buffer; we confirm exact dates at quote.
>
> We are ready to sign a POD service agreement and start technical onboarding. Please share your expected monthly volume so we can lock rates.

（zh-hk 摘要版：MOQ 1 本、**全包 US$49.9/本（DDP 到 SI/HR/AT，含產品+經濟件運費+進口 VAT+€3 關稅+代繳手續費，終端到付零稅）**、Express 加 US$25、人工審核 ≤4 工作小時（ZprintPro 後台執行，分銷商零人工）、API 4–8 週對接、全鏈路 7–13 個工作天。）

---

## 2. 现状盘点：能复用 vs 缺什么（实测结论）

| 层 | 已有（可复用） | 缺口 |
|---|---|---|
| 报价 | `src/lib/pricing.ts`（多币种换算）；`src/lib/quote-engine/`（markets/shipping/tax）；`src/app/quote-desk/`（10 张内部价表含 weight/shipping 列）；`/api/quote`（询盘落 Supabase `quotes`） | 无**服务端**计价（前端算价）；价格真值与 POD 单本价未打通；EU 国家市场未建模 |
| 运费 | `quote-engine/shipping.ts` 硬编码表（europe：economy ¥HKD 85/kg+55、standard 130/kg+75、express 240/kg+110，注释标注「DHL eCommerce 2026 Q1」） | 表以 UK 2.5kg 校准，非 SI/HR/AT；未接承运商真实 API；无体积重示例（日历 0.7kg 实重 → 体积重 ~0.9–1kg，按 1kg 计费） |
| 税费 | `quote-engine/tax.ts`（VAT/sales tax/GST/消費税 标签与含税展示逻辑）；`markets.ts` 9 市场（GB VAT 20% 是英国，非欧盟口径） | 无 SI/HR/AT；无 €150 取消后的 €3 平税逻辑；无 IOSS／DDP 服务费模型 |
| 下单/支付 | `/api/create-payment-session`（订单号 ZP+日期、双 schema 落库、order-notify 邮件兜底）；银行电汇（DBS HK）/微信/支付宝 QR | 无线上卡收单（Airwallex 卡支付已下线：深圳主体无法开通收单）；无退款与支付状态 webhook |
| 文件 | 无上传通道（结算页 file_url 字段存在但未接存储） | 需 R2 presigned 上传 + PDF 自动质检（页数/出血/色彩/尺寸/体积上限） |
| 订单状态 | `orders` 表（status/payment_status） | 无状态机（pending→paid→in_production→shipped→delivered）、无 tracking 字段、无 webhook 回传、无幂等键 |
| 客户可见承诺 | `catalog-printing-china` 页已有 DDP 文案（US 口径）；`legal` ja 页仍是「买方承担税费」DAP 口径 | **DDP vs DAP 口径全站不统一**，必须先裁决再对外承诺（复用 11-13 飞轮「商业真值 P0」纪律） |

**复用决策**：新能力一律在 `quote-engine` 体系内扩展（markets 加 EU 国家、shipping 换真实费率、tax 加 DDP），不另起炉灶；API 用 `api/v1/*` 前缀新增路由，`/api/quote` 询盘与 `/api/create-payment-session` 下单保持兼容不动。

---

## 3. 要解决的核心问题清单（问题树）

按依赖顺序（先报价 → 再运费与 DDP → 再全链路）：

| P | 问题 | 关键子问题 | 本方案落点 |
|---|---|---|---|
| P0-1 | 报价问题 | 单本 **$49.9 全包**（DDP，EU 经济件）是否覆盖成本；规格变量（A2/双面/材质/圈装）加价；Express 加价；三语价格锚一致；与 products.ts 真值同步（wall/desk `minQuantity:1` 已具备，`price_range HK$3-8/本` 是批量口径，需补「单本 POD 全包价」字段） | §4 报价引擎 |
| P0-2 | 运费问题 | 国家×重量×时效费率表（SI/HR/AT 起，扩展 EU27）；体积重（0.7kg 实重→1kg 计费）；经济件 vs Express 双档；免运门槛与 POD 不适用 | §5.1 运费 |
| P0-2 | 税费 DDP 问题 | VAT 表（SI 22/HR 25/AT 20）；2026-07-01 新政 €3 平税；IOSS 注册与欧盟中介；DDP 服务费；DDP vs DAP 口径统一 | §5.2–5.3 DDP |
| P0-3 | 支付问题 | 线上卡收单（PayPal 审核中／其他通道）；多币种结算；退款流程 | §6.4 |
| P0-3 | 文件问题 | PDF 上传（R2）；自动质检（13 页/出血 3mm/CMYK/尺寸/≤25MB）；拒收与重印兜底 | §6.3 |
| P0-3 | 履约问题 | 订单状态机（含 **under_review 人工审核闸**）；深圳生产队列（拼版/印刷/质检拍照/包装）；承运商取件；tracking 回传 | §6.5 / §6.7 |
| P0-3 | 回传对账 | webhook 验签与重试；订单/税费/IOSS 月报导出；分销商对账 | §6.6 |

---

## 4. P0-1 报价引擎：$49.9 全包定价模型（先解决报价）

### 4.1 单本成本分解（估计区间，待生产实测确认——不得当作已承诺成本）

| 项 | 估计区间 | 备注 |
|---|---|---|
| 生产成本（深圳单本数码）：A3 13 页 250g 双面全彩 + 金属圈 + 挂勾 + 单件包装 | ¥45–75（约 $6–10） | 参考：Made-in-China 同类挂历批量价 ~$2.5/本（MOQ 500）；POD 单本数码显著高于批量价。**待生产实测** |
| 经济件运费（0.7kg→1kg 计费，SI/HR/AT） | ¥55–90（约 $8–13） | 云途标准 ~¥70–90/kg；燕文挂号 ~¥60–80/kg（欧美 5–10 工作日）。**待物流账号实测** |
| DHL Express（0.7kg→1kg） | ¥260–320（约 $36–45） | 香港代理首重 0.5kg ¥174–218 起、大陆 DHL ¥272 起；住宅+¥50。**待 DHL 账号实测** |
| 税费（DDP）：IOSS VAT（含税价内扣，按终端实付 $49.9 计） | SI ≈$9.0 / HR ≈$10.0 / AT ≈$8.3 | EU 价格含税口径：VAT = 全包价 × r/(100+r)；IOSS 申报按实付全价 |
| 固定关税（2026-07-01 新政） | €3/票 | 芬兰海关口径「每票」；Lexology「每件」——按承运商最终口径固化 |
| DDP 服务费（承运商代缴） | €5–10/票 | DHL Express DDP / 邮政 PDDP |
| 收款手续费 | ~3.5% | 卡收单/PayPal 通道 |

**结论：单本到欧盟的全成本约 $25–35（经济件）／$50–60（Express）。$49.9 全包（经济件 DDP）毛利 ≈26%（中值成本，见 §0.1.1）；Express 走全包价即亏损 → 必须加价单列。**

### 4.2 报价结构（checkout 全包式，一个数字）

```
1 × A3 Wall Calendar, 13p, spiral + hanger — ALL-IN DDP (EU economy)   $49.90
  (含: 产品 + 经济件运费 + 进口 VAT + €3 关税 + DDP 代缴服务费; 终端到手零税)
Express upgrade (DHL, 2–4 days)                                      +$25.00
─────────────────────────────────────────────────────
Total (DDP)                                                          $49.90 / $74.90
```

> 全包价把客户报价从三栏明细简化为**一个数字**（$49.9），自动化与 AEO 引用都更简单（单一答案）；内部仍拆成本明细（§0.1.1）用于毛利与 IOSS 申报。

### 4.3 计价规则（服务端，`POST /api/v1/quote`）

- **基准锚**：A3 挂历 / 台历（标准规格）单本**全包 $49.9**（EU 经济件 DDP）；zh-hk ≈ **HK$390**、ja ≈ **¥7,600**（按 0.128／19.5 汇率换算，锚值由 K3 拍板）。内部「产品件」组件基准 $19.9 仅作规格变量与成本核算起点。
- **规格变量**（增量，加在全包价上）：A2 挂历 +$8；双面 +$4；300g 哑粉 +$2；磁吸/相框款 +$6（建议值，待生产成本实测后校准）。
- **Express 加价**：+$25（全包 Express $74.9；待 DHL 实测校准，覆盖 $30–45 运费差）。
- **区域分档**：EU27 经济件统一 $49.9 全包（VAT 差异由毛利吸收：SI 22%／HR 25%／AT 20%）；US／JP／HK 等非 EU 区域另表（复用现有市场定价）。
- **三语一致**：en/zh-hk/ja 同一 SKU 同一实体价（多语种实体对齐口径，per §0.36.2-5），仅币种与本地化展示不同。
- **真值同步**：`products.ts` wall-calendars/desk-calendars 增加 `podPrice` 字段（全包 $49.9，EU 经济件 DDP），`price_range` 保留批量口径但 FAQ 说明「单本 POD 全包价 $49.9，MOQ=1」——**改动需 K3 拍板后走 11-13 商业真值纪律**（title-v5 门童、products.ts 对照）。

### 4.4 报价引擎技术落点

- 扩展 `quote-engine/markets.ts`：新增 `SI / HR / AT`（及 EU27 其余国家）Market 条目（taxRate 22/25/20%，shippingZone=europe，targetMargin 建议 0.35）。
- 扩展 `quote-engine/shipping.ts`：费率表替换为「承运商 API 或已实测国家×重量表」，保留 HKD 基准与 FREE_SHIPPING_THRESHOLDS（POD 不适用免运，单独 flag）。
- 新增 `quote-engine/ddp.ts`：VAT + €3 平税 + DDP 服务费 + IOSS 号字段，输出税费分栏。

---

## 5. P0-2 运费与 DDP 计算（其次要解决）

### 5.1 物流方案 A/B/C/D（0.7kg 单本 → SI/HR/AT）

| 方案 | 渠道 | 成本（0.7kg→1kg 计费） | 时效 | 适用阶段 |
|---|---|---|---|---|
| A 深圳直发经济件 | 云途标准 / 燕文挂号（全程跟踪） | $8–13 | 5–10 工作日 | 起步期（月单量 <100） |
| B 深圳直发 Express | DHL Express（香港代理/大陆） | $30–45 | 2–4 工作日 | 高价快档/急单 |
| C 欧盟中转仓拼柜 | 周度批量空运 → 德/荷分拨仓 → 本地尾程 | $6–9（含尾程 €4–6） | 7–14 工作日 | 月单量 >200–300 后启用 |
| D 欧盟本地白牌 POD | 欧洲本地代工（如 Printful 模式） | 产品 $12.43 + 运费 from $8.79（竞品零售口径） | 3–7 工作日 | 量足够大时的备选；注意品牌与毛利控制 |

**建议**：A+B 双档起步，C 在规模期引入（成本最低、DDP 最干净——本地 VAT 直接含税）；D 仅作市场参照不承诺。

### 5.2 DDP 税费模型（2026-07-01 起生效的欧盟新政为硬约束）

| 项 | 值 | 来源状态 |
|---|---|---|
| 增值税（进口 VAT） | SI 22% / HR 25% / AT 20%（EU 含税价内扣：VAT = 全包价 × r/(100+r)；IOSS 申报按终端实付全价 $49.9 为税基） | ✅ 已核实（Stripe／thevatapi 2026 口径） |
| 固定关税 | ≤€150 B2C 包裹 **€3/票**（芬兰海关 tulli.fi 口径）；Lexology 表述「€3/件」 | ⚠️ 两源口径不同，按承运商（DHL/邮政）最终清关口径固化 |
| 原 €150 免税 | 已取消（2026-07-01，Reg. (EU) 2026/382 + Delegated Reg. (EU) 2026/1022） | ✅ 已核实 |
| IOSS | ≤€150 B2C 由卖家代收 VAT，任一 EU 成员国注册 + 月报；非欧盟主体需指定欧盟财政中介 | ✅ 已核实 |
| HS 4910（印刷日历）常规税率 | 大概率 0%（需核实）；在平税机制下按 €3 处理 | ⚠️ 待核实 |
| DDP 服务费 | 承运商代缴税费手续费 €5–10/票 | 待承运商报价 |

**示例（SI，一本 $49.9 全包，经济件 DDP）**：
- 终端实付 **$49.9**（含税价，DDP，到手零税）
- IOSS VAT（含税价内扣）：$49.9 × 22/122 ≈ **$9.0**（HR 25% → $10.0；AT 20% → $8.3）
- 固定关税 ≈ **€3（≈$3.2）**（承运商 DDP 代缴）
- DDP 服务费 ≈ **€5**
- 内部成本：生产 $6–10 + 经济件运费 $8–13 + 收款 3.5% ≈ $1.7
- 毛利（中值：生产 $8／运费 $10）≈ $49.9 − 9.0 − 3.2 − 5.0 − 8 − 10 − 1.7 ≈ **$13（≈26%）**——可行；若走 DHL Express（$30–45）则亏损 → **Express 必须加价单列（+$25）**

### 5.3 IOSS 与 DDP 落地决策

- **主推 DDP**：注册 IOSS（经欧盟财政中介，如 Avalara／taxdoo 类，月度申报）→ 报关单带 IOSS 号 → 承运商 DDP 服务 → 终端客户零税到付。这是 POD 分销商最想要的口径（客户问「全程无需人工」的前提）。
- **DAP 兜底**：未走 IOSS 的渠道，客户到付 VAT+€3（承运商代收+手续费）——必须在结算页明示「客户到付」。
- **口径统一**：`legal` ja 页现写「买方承担税费」、`catalog-printing-china` 写「DDP 零税到付」——**需 K3 裁决 DDP 为全站统一承诺口径**，再同步三语 FAQ（11-13 飞轮「商业真值 P0」纪律）。
- **引擎固化**：`quote-engine/ddp.ts` 输出 `{vatAmount, flatDuty, ddpHandling, totalDuties, iossNumber?}`，报价与结算共用同一函数，杜绝页面与 API 两套数。

---

## 6. P0-3 API 自动化架构（全程无需人工）

### 6.1 端到端流程

```
客户/分销商系统 → POST /api/v1/quote（全包计价 $49.9，可查明细）
                → POST /api/v1/files（R2 上传 PDF → 自动质检 → file_id + 预览图）
                → POST /api/v1/orders（幂等键 + 收货信息 + webhook_url → order_id + 支付链接）
                → 支付（线上卡收单，待打通；一期可银行电汇/QR 半自动）
                → 【后端人工审核闸】支付+文件 preflight 通过 → 审核台（PDF 预览+质检报告+地址收款核验）
                  一键批准/驳回（SLA ≤4 工作小时）→ 自动通知分销商（webhook + 邮件）
                → 深圳生产队列（拼版→印刷→质检拍照→包装→承运商取件）
                → tracking 号回传：webhook POST（HMAC 验签）+ 客户邮件（RESEND 已有）
                → 状态推进：pending→paid→file_preflight→under_review→approved→in_production→shipped→delivered
```

### 6.2 端点设计（edge runtime 兼容；复用 `src/lib/api-security.ts` 四件套）

| 端点 | 方法 | 功能 | 鉴权 |
|---|---|---|---|
| `/api/v1/quote` | POST | 服务端计价（product+规格+数量+收货国 → **全包价 $49.9** + 可选明细 product/shipping/duties） | 公开（限流） |
| `/api/v1/shipping-rates?country=&weight=` | GET | 运费+税费查询（前端计算器用） | 公开（限流） |
| `/api/v1/files` | POST | R2 presigned 上传；自动质检；返回 file_id | X-ZP-Key |
| `/api/v1/orders` | POST | 建单（幂等键）；返回 order_id + 支付链接 | X-ZP-Key |
| `/api/v1/orders/:id` | GET | 查单（状态/tracking/发票） | X-ZP-Key |
| `/api/v1/webhooks` | POST | 接收分销商侧回调（自定义字段） | HMAC 验签 |
| Webhook 出 | — | 事件：`order.status_changed` / `order.shipped`（含 tracking） | 对分销商侧 HMAC 签名 |

**请求示例（POST /api/v1/orders）**：
```json
{
  "idempotency_key": "8f3c1a2b-...",
  "file_id": "fl_9x2y...",
  "items": [{ "sku": "wall-calendars", "quantity": 1, "options": { "size": "A3", "binding": "spiral", "paper": "250g" } }],
  "shipping_address": { "recipient": "Jane Doe", "street": "...", "city": "Ljubljana", "country": "SI", "postal": "1000", "phone": "+386..." },
  "customer_email": "jane@example.com",
  "webhook_url": "https://shop.example.com/hooks/zprint",
  "locale": "en"
}
```
**响应**：`{ "order_id": "ZP20261114-0001", "payment_url": "...", "status": "pending_payment", "total": {"all_in_ddp": 49.9, "express_upgrade": 25.0, "currency": "USD"}, "review": {"sla_hours": 4} }`

### 6.3 PDF 文件规范与自动质检（拒收规则）

| 检查项 | 标准 |
|---|---|
| 尺寸 | A3 297×420mm（±1mm） |
| 页数 | 13（封面+12 月）；自动剥离空白页 |
| 出血 | 3mm（默认模板优先，per D2 口径） |
| 色彩 | CMYK（RGB 自动转；超色域警告）；PDF/X 优先 |
| 体积 | ≤25MB；页数超限自动拒绝 |
| 其他 | 字体嵌入、分辨率 ≥300dpi、无低像素警告 |

质检结果：`passed`（自动进队列）／`warning`（人工复核队列，不阻断 API 返回但标记）／`rejected`（返回错误码 + 重传指引）。**拒收单不生产、不扣费**，写进 API 文档。

### 6.4 支付（P0 阻塞项）

- 现状：`bank_transfer`（DBS HK 电汇）／`wechat_qr`／`alipay_qr`；Airwallex 卡支付已下线（深圳主体无法开通收单）。
- 全自动闭环必须补**线上卡收单**：优先级 ① PayPal（审核中，尽快推进）② Stripe（香港实体路线评估）③ Airwallex 收单（HK 主体评估）。未通前 API 订单进入 `pending_payment` 半自动状态。
- 多币种：en USD／zh-hk HKD／ja JPY（沿用 `resolveSettlementCurrency`）。

### 6.5 履约状态机与兜底

```
draft → quote_issued → pending_payment → paid → file_preflight → under_review
        → approved → in_production → qc_pass → shipped(tracking_no) → delivered
        → rejected → needs_revision（分销商重传后回到 file_preflight 重新排队）
异常：file_rejected / qc_fail(重印) / refunded / cancelled
```
- 生产侧：订单按 SKU+规格拼版（POD 小单混拼 A3），印刷→质检拍照（证据留档，per 履约真值）→单件包装→承运商取件。
- 兜底：承运商丢损→重印重发；QC 不合格→重印不额外收费（写进 SLA）。

### 6.6 回传与对账

- webhook 事件幂等 + HMAC 验签 + 失败重试（3 次，退避）。
- 月结对账：订单号/金额/税费三栏 + IOSS 申报数据导出（`/api/v1/reports/ioss?month=`，仅 X-ZP-Key 管理员 scope）。

### 6.7 后台人工审核环节（二轮修订新增）

| 项 | 设计 |
|---|---|
| 触发 | 支付成功 + 文件 preflight 通过 → 自动进审核队列（按「每日生产截单」倒排优先级） |
| 审核台（新后台 UI） | 订单列表（状态/国家/金额）+ PDF 预览 + 自动质检报告 + 地址与收款核验 + **一键批准/驳回**（驳回必填原因） |
| SLA | ≤4 工作小时完成审核；超时预警升级；驳回自动 webhook + 邮件通知分销商，重传重新排队 |
| 分销商视角 | **零人工**（审核在 ZprintPro 后台执行，不暴露给分销商系统；API 状态显示 `under_review`，webhook 事件 `order.status_changed` 自动推进） |
| 为什么可自动化 | 把不可自动化的质量/合规判断收敛为**单一人工闸**，闸前（下单/文件/支付）与闸后（生产→出运→回传）全自动——POD 业界标准做法（Printful 同构），印刷客诉 80% 源于文件问题，人工闸保护品牌与履约真值 |

**API 侧体现**：`/api/v1/orders/:id` 返回 `status: "under_review"` + `review_eta`（≤4h）；`/api/v1/orders` 响应不变；webhook 新增 `order.review_approved` / `order.review_rejected` 事件（rejected 附 `reason` 与重传指引）。

---

## 7. 生产 + 派送时效承诺口径（待生产确认后冻结）

| 环节 | 承诺（en 口径） | 备注 |
|---|---|---|
| 生产 | 2–3 个工作日（POD 单本） | 拼版日截单；Q4 旺季（11–12 月）加缓冲 |
| 派送（经济件，SI/HR/AT） | 5–10 个工作日 | 云途标准/燕文挂号，全程跟踪 |
| 派送（DHL Express） | 2–4 个工作日 | 住宅+偏远附加费客户可见 |
| 全链路 | 经济 7–13 工作日／Express 4–7 工作日 | 与 11-13 飞轮「自有履约删除或报价确认」纪律一致 |

**口径规则**：页面/FAQ/API 文档/报价单必须同一套数字；未拍板数字一律写「確認於報價」（确认于报价），不承诺绝对日期。

---

## 8. 三语站点落地 + SEO／AEO／GEO 联动（首席分析师本职）

### 8.1 页面清单（hub-spoke，全部走商业真值门 + 攒批部署）

| 页面 | 用途 | 关键词锚 |
|---|---|---|
| `/en/services/print-on-demand`（hub） | POD 一件代发 + API 总览；价格表、运费档、DDP 说明、FAQ、API 入口 | print on demand calendar / no minimum order / drop shipping printing |
| `/zh-hk/services/pod-api` | 按需印刷一件代發 API | 月曆印刷 一件／按需印刷 一件代發／印刷 API |
| `/ja/services/pod-api` | オンデマンド印刷 API（敬语口径） | カレンダー 1冊から印刷／オンデマンド印刷 API |
| `/en/services/print-on-demand-api`（API 文档页） | 端点/鉴权/文件规范/webhook；开发者向 | calendar printing API / POD fulfillment API |
| 报价计算器组件 | 互动：规格×数量×国家 → **全包价**（$49.9 起，DDP）+ Express 加价 | GEO 引用磁铁 |

### 8.2 AEO/GEO 内容要点

- **FAQPage（三语，答案与 §1/§5/§7 数字逐字一致）**：MOQ=1？单本 $49.9 全包含什么（产品+经济件运费+进口 VAT+€3 关税，DDP 到手零税）？到 SI/HR/AT 要多久？Express 加价多少？API 怎么接（人工审核 SLA ≤4h）？时效多久？
- **Schema**：`Service` + `FAQPage` + `HowTo`（接入 API 四步）+ `Product`（wall/desk calendars，$49.9 全包）+ 复用既有 Organization/BreadcrumbList。必须 Google Rich Results Test 可验证（§0.36.3 交付标准）。
- **GEO 探针固定问题集**（S2 口径，固定引擎+固定问题+完整答案+URL 归档，落 `.hermes/geo/`）：
  - "Can I order just one custom calendar with no minimum order?"
  - "Print on demand calendar printing price for one piece"
  - "Shipping cost and import tax to Slovenia for a printed calendar"
  - "Which printing company offers a POD fulfillment API?"
- **季节窗口**：11 月正值 2027 日历采购高峰（站点产品命名已是 2027 年曆），POD 日历是当季最强采购词簇——内容排期优先 Q4。
- **商业真值纪律（11-13 飞轮 P0 教训复用）**：$49.9、€3、VAT 表、时效、MOQ=1、Express +$25 必须同时出现在 products.ts、FAQ、Schema、API 文档，且与报价引擎同源；禁止在内容里再发明数字。

### 8.3 关键词优先级（en 主战场，zh-hk/ja 次之）

> 口径说明：下表为**提案级关键词清单**（供 Phase 1 内容立项用），非「当前排名/流量」主张；上线前须按 11-14／11-21 GSC 复测的实际 query×page 基线 + 商业真值门核验，缺证据的深位词不派单（沿用 11-13 飞轮纪律，禁止把本表数字写进客户可见内容）。

| 层级 | en | zh-hk | ja |
|---|---|---|---|
| P0 | print on demand calendar printing / calendar printing no minimum order / one piece calendar printing | 月曆印刷 一件／掛曆 一本起印 | カレンダー 1冊から印刷／壁掛けカレンダー 1枚 |
| P1 | drop ship printing service / print on demand API / calendar POD fulfillment | 按需印刷 一件代發／印刷代發 API | オンデマンド印刷 代行／印刷 API 連携 |
| P2 | print on demand Europe shipping / DDP printing delivery | 月曆 歐洲 運費／DDP 到付 | EU 送料込み カレンダー |

---

## 9. 实施路线图（阶段 + 验收门 + 依赖）

| 阶段 | 内容 | 验收门（baseline+change+approval+deploy+verify+retest 六件齐） | 依赖 K3 |
|---|---|---|---|
| Phase 0（1–2 周） | 成本与费率实测：生产单本实测成本；DHL/云途/燕文真实报价；IOSS 中介询价；€3 口径固化；EU27 VAT 表冻结 | 实测数字落 docs + 冻结商业真值表 | 拍板 $49.9 全包锚、DDP 全站口径、EU 市场优先级 |
| Phase 1（2–4 周） | `quote-engine` 扩展（SI/HR/AT markets + ddp.ts + 真实运费表）；`POST /api/v1/quote`（全包价）；结算页一个数字 | tsc 54=54、门童全绿、线上三语页面数字一致、API 返回与页面同源 | 价格锚值、Express 加价额 |
| Phase 2（4–8 周） | R2 文件上传 + 自动质检；`/api/v1/orders` + 状态机（含 **under_review**）；**后台人工审核台**（一键批准/驳回 + SLA）；支付桥接（PayPal 打通优先）；生产队列半自动 | 端到端 1 单试跑（含审核闸）PASS；拒收/驳回/重印兜底演练 | PayPal 审核结果；IOSS 注册启动 |
| Phase 3（8–12 周） | webhook 全自动 + 对账 + IOSS 月报；分销商控制台；欧盟中转仓 C 方案评估（月单量阈值触发） | 全自动 10 单（审核闸内）无人工介入验收；对账平账；IOSS 首月申报成功 | 中转仓/量级决策 |

**节奏纪律**：每次部署走 §0.25 攒批 + 30min 机器闸 + §0.25.10 审查全绿 4 件；POD 页面上线属新功能区首发（非小改动），须走预览+确认流程（§0.25.10.5）。

---

## 10. 风险与开放问题（需 K3 拍板）

1. **$49.9 全包是否终局零售锚**（EU 经济件 DDP；zh-hk HK$390 / ja ¥7,600 建议锚；非 EU 另表）？成本区间（§4.1）未实测前，一切 $49.9 相关文案不得上线（数据诚信红线）。
2. **DDP 全站统一口径**：`legal` ja「买方承担税费」 vs `catalog-printing-china`「DDP 零税到付」冲突，须裁决 DDP 为主承诺 + DAP 兜底说明。
3. **IOSS 注册主体与欧盟中介**：深圳主体需指定财政代表（月报+费用），是否委托第三方。
4. **线上卡收单**：PayPal 审核进度；若长期不过，评估 Stripe HK / Airwallex HK 收单路线（P0 阻塞项）。
5. **欧盟中转仓 C 方案**：何时启、投多少（建议月单量 >200–300 再评估）。
6. **products.ts 真值更新**：wall/desk-calendars 增 `podPrice` 字段（全包 $49.9）与「MOQ=1、单本全包价」FAQ——涉及客户可见内容，走 title-v5 门童 + 商业真值批。
7. **€3 关税「每票 vs 每件」口径**：以实际承运商（DHL/邮政）清关结果为准，先按「每票」计、预留参数。
8. **名片禁令不受影响**：本方案仅日历/台历 POD，不触碰 §0.0 关联面。
9. **人工审核 SLA 与口径**：≤4 工作小时是否可行（需配审核人力）；驳回重传机制与「审核不通过不扣费」承诺。
10. **Express 加价额**：+$25 是否覆盖 DHL 实际运费差（$30–45），待 DHL 账号实测后冻结。
11. **IOSS VAT 计基**：按终端实付全价 $49.9（含税价内扣）申报，确认与中介/海关口径一致；全包价是否含税对外展示（EU 价格含税口径）。
12. **审核人力排班**：POD 上线前确定审核台负责人与节假日值班（影响 SLA 承诺）。

---

## 11. 数据来源

**已核实（含日期）**：
- 欧盟 VAT 税率 2026：SI 22% / HR 25% / AT 20% — [thevatapi EU VAT Rates 2026](https://www.thevatapi.com/blog/eu-vat-rates-by-country-2026)（2026-01-26）· [Stripe 欧盟增值税税率](https://stripe.com/cn/resources/more/eu-vat-rates#1)（2026-07-28）
- 欧盟 2026-07-01 新政（€150 免税取消 + €3 平税 + IOSS 仍适用）：[Lexology: LVCR abolished & €3 duty](https://www.lexology.com/library/detail.aspx?g=98e1e508-48e5-41c9-94be-6545976e4f57#1)（2026-07-02）· [Lexology: end of €150 exemption](https://www.lexology.com/library/detail.aspx?g=430395eb-8180-496a-885e-a6ecf14b0ad8#1)（2026-07-27）· [Finnish Customs tulli.fi](https://tulli.fi/en/-/starting-july-1-2026-customs-duties-must-also-be-paid-on-shipments-arriving-from-outside-the-eu-with-a-value-of-up-to-150-euros?languageId=en_US)（2025-12-21）· [epost: EU VAT rules & IOSS](https://epostglobalshipping.com/wp-content/uploads/2023/11/Navigating-the-New-EU-Regulations.pdf#1#1#1)
- DHL 中国→SI 运费参考（香港代理首重 ¥174–218 起、大陆 ¥272 起、住宅+¥50）：[pfcexpress DHL 斯洛文尼亚](https://www.pfcexpress.com/dhl/Slovenia.html) · [xinexpress 斯洛文尼亚快递价](http://www.xinexpress.com/Document/Document-Slovenia.html)（2026-10-22）
- DHL 中国价目表 Zone 表（0.5kg 非文件 374–445 CNY，Zone 3–4 档）：[DHL Service & Rate Guide 2024 China](https://mydhlplus.dhl.com/content/dam/downloads/cn/en/rate-guide/service_and_rate_guide_cn_en_2024.pdf.coredownload.pdf#4#7#4)
- 经济件费率：云途 ~¥70–90/kg、燕文经济小包低至 ¥40/kg、挂号 ¥60–80/kg：[CocoLoop 燕文 vs YunExpress 评测](https://ask.cocoloop.cn/zh-cn/vs/yansheng-vs-yunexpress)
- 竞品零售基准：Printful Wall Calendar $12.43 + shipping from $8.79：[Printful Wall Calendar](https://www.printful.com/ca/custom/decor/personalized/wall-calendar-2026)
- 欧盟本地印刷成本参考：A3 13 页螺旋挂历 10 本 €45.70 net（≈€4.57/本）：[druckass.de Kalender](https://www.druckass.de/katalog/Kalender/33595)（2026-11-06）· [VolantinoVolante A3 13p spirale](https://www.volantino-volante.it/Calendari/A3-13-pagine-rilegatura-a-spirale-orizzontale-Stampa-solo-fronte-a-colori-250g-patinata-lucida-con-copertina-trasparente/)
- 中国批量挂历价 ~$2.5/本（MOQ 500）：[Made-in-China calendar printing](https://www.madeinchina.com/mall/show-2024-Hot-Selling-Custom-Design-Monthly-Spiral-Binding-Wall-Calendar-Printing_1222510.html#1)
- HS 4910（印刷日历）：[zolltarifnummer Tischkalender 4910.00.00](https://www.zolltarifnummer.com/einreihung/tischkalender)（税率待核）

**估计待实测（未拍板前不得上线为承诺）**：§4.1 生产成本区间（¥45–75）、DDP 服务费（€5–10）、$49.9 全包毛利测算（§0.1.1）、三语换算锚（HK$390/¥7,600）、Express 加价（+$25）、审核 SLA（≤4h）、Phase 2–3 时间窗。

**仓库内依据**：`src/lib/pricing.ts`（多币种与 INDEPENDENT_PRICES）、`src/lib/quote-engine/{markets,shipping,tax}.ts`、`src/app/quote-desk/`、`src/app/api/{quote,create-payment-session,order-notify}/route.ts`、`src/data/products.ts`（wall/desk-calendars `minQuantity:1`、`price_range HK$3-8/本`）、`src/app/[locale]/legal/page.tsx`（ja 买方承担税费口径）、`src/app/[locale]/services/catalog-printing-china/page.tsx`（DDP 文案）、`SESSION_LOCK.md`（已释放，无并发持有）。

---

## 12. SOP-10 五问自检

1. **架构差异**：已核对 pricing.ts/quote-engine/quote-desk/api 路由现状与两份飞轮文档（11-07、11-13），方案在既有 quote-engine 体系内扩展，未臆断冲突。
2. **约束适用范围**：D1–D6 商业真值裁决、title 冻结域、名片 §0.0、贺卡资产、middleware 301 均未触及；本报告 docs-only。
3. **原数据/拍板来源**：外部数字全部带 URL+日期；内部数字标注文件路径；未实测数字一律标「待实测」，不写成承诺。
4. **字段值策略**：$49.9 全包锚、VAT/€3/Express 加价/时效等未拍板值仅出现在方案建议，不写入任何生产内容。
5. **Markdown 渲染**：本报告为 docs，未改 user-facing 文本，无需 parseInlineLinks。

**最终结论**：订单自动化的可执行顺序 = 先报价（$49.9 全包锚 + 服务端真值计价）→ 再运费与 DDP（EU27 市场 + €3 新政 + IOSS）→ 后全链路 API（文件质检→**人工审核闸**→订单状态机→webhook 回传）。**$49.9 全包 + 后端人工审核可以自动化实现**：全链路自动、人工仅作单一审核闸（≤4h，ZprintPro 侧执行，分销商零人工）；前提是经济件 DDP（Express 加价）与两个 P0 阻塞（线上卡收单、IOSS 注册）先打通，二者先于一切内容营销投入推进。
