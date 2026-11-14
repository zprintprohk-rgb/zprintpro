# ZprintPro 三语言站点订单自动化——执行方案（落地清单）

> 日期：2026-11-14（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 策略 SSoT：[2026-11-14-order-automation-pod-execution-plan.md](2026-11-14-order-automation-pod-execution-plan.md)（报价/$49.9 全包/运费+DDP/API 架构/人工审核闸/三语落地）；本文件只写**怎么落地**——文件级改动、验收门、里程碑、拍板项、执行纪律，不重复策略论证。
> 范围：zh-hk／en／ja 三语言站点订单自动化（POD 一件代发：$49.9 全包 DDP + 后端人工审核闸）。
> 性质：docs-only 执行方案；不承诺生产页面已修改；所有数字沿策略文档口径（未实测值一律「待实测」）。

---

## 0. 执行总纲（六项铁律，凌驾一切任务）

1. **商业真值先行**：任何数字上线前必须已冻结（生产/运费实测 + K3 拍板），沿用 11-13 飞轮 D1–D6 纪律；未拍板值只出现在 docs，不进入 products.ts/FAQ/Schema/API。
2. **单变量**：每次线上变更一个逻辑批次，同一页同一窗口不得双改（snippet/价格/时效分开走批）。
3. **门童硬闸**：title-v5（#27）、GSC 泄漏（#16）、brand、encoding、tsc 54=54 基线，缺一不可 push。
4. **双方法复算**：任何「N 个 vs M 个」/金额/数量结论，落地前用第二种独立方法复算（§0.23.2）。
5. **攒批 + 30min 机器闸**：≥3 非 docs 文件或 ≥1 src 行为修复才 push；先 `scripts/push-gate-check.mjs` 后 push（分两次调用，禁止 `;` 串联）；docs-only 不 push。
6. **锁协议**：写 `src/data/blog-data/*.json` 前看 `lane.lock`；人手会话按 `SESSION_LOCK.md` 双条件（收尾信号 + 15min 静默窗）。

---

## 1. 执行架构总览（新增组件与依赖顺序）

```
[现有地基] quote-engine(markets/shipping/tax) · quote-desk 价表 · /api/quote · /api/create-payment-session
           · Supabase orders · RESEND 邮件 · api-security.ts

[Phase 1]  quote-engine 扩展 ──→ /api/v1/quote（服务端计价）
            markets(+SI/HR/AT)      /api/v1/shipping-rates（计算器）
            shipping(实测费率表)
            ddp.ts(新增：VAT含税内扣+€3+服务费)
            pod.ts(新增：全包价表 $49.9)

[Phase 2]  R2 bucket（CF Pages 绑定，env.R2_BUCKET）
            /api/v1/files（presigned 上传）→ PDF 质检（Queues/Worker 异步）
            /api/v1/orders（幂等键+状态机）→ 支付桥接（PayPal 优先）
            /api/v1/orders/[id]（查询）    → /api/v1/review/[id]（审核）
            审核台 UI（admin/review）       → webhook 网关（HMAC+重试）

[Phase 3]  /api/v1/reports/ioss?month= · 分销商控制台 · 欧盟中转仓 C 评估

[并行]     三语 POD 服务页 + FAQ/Schema + 计算器 + 存量日历真值对齐 + GEO 探针 S2 + GSC 复测
```

**依赖顺序**：Phase 0 实测（价格/运费/IOSS/收单）→ 门 Phase 1 报价引擎（冻结值）→ 门 Phase 2 文件/订单/审核（依赖报价与支付）→ Phase 3 全自动对账。内容/SEO 可与 Phase 1–2 并行，但**数字上线必须在 Phase 0 冻结之后**。

---

## 2. Phase 0：实测冻结 + P0 阻塞项（1–2 周，本周即可启动）

| # | 任务 | 责任人 | 产出 / 验收 |
|---|---|---|---|
| 0.1 | **生产实测**：A3 挂历 13 页 250g 双面全彩 + 金属圈 + 挂勾 + 单件包装，按 POD 单本数码工艺实测 3 本 | 生产 | 实测单本成本表；**上限 ≤$8/本 才放行 $49.9 全包**（策略 §0.1.1） |
| 0.2 | **物流实测**：云途标准/燕文挂号 → SI/HR/AT 0.7kg 实价 + 时效 + 体积重确认（0.7kg 实重→~1kg 计费）；DHL 账号价（校准 Express 加价 +$25） | 物流/运营 | 实测费率表（国家×重量×档位） |
| 0.3 | **IOSS/关税**：欧盟财政中介询价（Avalara／taxdoo 类，月报+费用）；向 DHL/邮政确认 €3「每票 vs 每件」清关口径；核 HS 4910 常规税率 | 财务/税务顾问 | IOSS 方案 + €3 口径固化 + HS 4910 结论 |
| 0.4 | **卡收单（P0 阻塞）**：PayPal 审核推进；若长期不过评估 Stripe HK／Airwallex HK 收单 | K3/财务 | 线上收单通道可用或明确替代路线 |
| 0.5 | **拍板冻结**：$49.9 终局锚 + 三语换算锚（en $49.9 / zh-hk HK$390 / ja ¥7,600）+ Express 加价额 + DDP 全站口径（legal ja 与 catalog-printing-china 统一）+ 审核 SLA ≤4h | K3 | 决策登记簿（.hermes/decision-register.md）+ 冻结真值表落 docs |

**验收门**：冻结表落盘；未实测数字零上线；P0 阻塞项有明确 owner 与 deadline。

---

## 3. Phase 1：报价引擎落地（2–4 周；引擎骨架可与 0.1–0.2 并行，数值等冻结）

| # | 文件（真实路径） | 改什么 | 验收 |
|---|---|---|---|
| 1.1 | `src/lib/quote-engine/markets.ts` | `MarketCode/Currency` 联合类型扩展 `SI/HR/AT` + `EUR`；`MARKETS` 增 3 条（taxRate 0.22/0.25/0.20、shippingZone=europe、targetMargin 0.35）；新增 `marketFromCountry()`（EU 由收货国参数选市场，不依赖 locale） | tsc 通过；SI/HR/AT 可实例化 |
| 1.2 | `src/lib/quote-engine/shipping.ts` | `RATE_TABLE.europe` 替换为 Phase 0.2 实测费率（或接承运商 API）；体积重公式保留（5000）；POD 单本不走 FREE_SHIPPING_THRESHOLDS（加 `pod: true` flag） | 0.7kg→1kg 计费示例正确；费率与实测表一致 |
| 1.3 | **新增** `src/lib/quote-engine/ddp.ts` | VAT（EU 含税价内扣 `r/(100+r)`）+ €3 平税 + DDP 服务费 + IOSS 号字段；输出 `{vatAmount, flatDuty, ddpHandling, totalDuties, iossNumber?}` | 与 §5.2 示例（SI $9.0/$3.2/$5）对账一致（双方法复算） |
| 1.4 | **新增** `src/lib/quote-engine/pod.ts` | 全包价表：SKU→区域→all-in（EU 经济件 $49.9；规格变量 A2 +$8/双面 +$4/300g +$2/相框 +$6；Express +$25）；读 `products.ts podPrice` 为真值源 | $49.9 锚与 products.ts 同源；区域分档表完整 |
| 1.5 | **新增** `src/app/api/v1/quote/route.ts` | 服务端计价（Zod 校验 + 限流 + CORS；B2B 鉴权见 4.4）；返回 `{all_in, currency, breakdown?}` | 与页面展示同源；三语数字一致 |
| 1.6 | **新增** `src/app/api/v1/shipping-rates/route.ts` | GET `?country=&weight=` → 运费+税费（前端计算器） | 计算器可用 |
| 1.7 | `src/data/products.ts` | wall/desk-calendars 增 `podPrice`（$49.9）字段 + FAQ「单本 POD 全包价、MOQ=1」（保留批量 price_range 口径） | 商业真值批 + title-v5 门童；增量最小化 |
| 1.8 | `src/app/[locale]/checkout/CheckoutClient.tsx` | 全包「一个数字」展示 + 收货国选择（SI/HR/AT…）+ Express 加价勾选；内联 i18n 键 ×3（zh-hk/en/ja） | 结算页三语一致；总价 = API 返回值 |

**验收门**：`tsc 54=54`；门童全绿（#27/#16/brand/encoding）；`/api/v1/quote` 返回与结算页数字逐字一致；SI/HR/AT 三条计价示例对账（双方法）。

---

## 4. Phase 2：文件 + 订单 + 审核台落地（4–8 周）

| # | 文件 / 配置 | 改什么 | 验收 |
|---|---|---|---|
| 4.1 | CF Pages Dashboard | 新增 **R2 bucket** 绑定（`env.R2_BUCKET`）；读取方式复用 `create-payment-session` 的 `getOptionalRequestContext()` 模式（Secrets 运行时绑定） | 本地 mock + 线上上传探针 |
| 4.2 | **新增** `src/app/api/v1/files/route.ts` | R2 presigned 上传（`PUT` 直传）→ file_id 落 Supabase `files` 表；**B2B 鉴权**（X-ZP-Key，不走 origin 校验——见 4.4 设计注） | 上传→file_id 全链路 PASS |
| 4.3 | **新增** `scripts/pdf-preflight/`（或独立 Worker + CF Queues） | 异步 PDF 质检：页数=13／出血 3mm／CMYK／≤25MB／字体嵌入／≥300dpi → 结果落 `files.preflight_result`（passed/warning/rejected）；**edge 不硬解 PDF**，重活走队列或人工闸兜底（审核台 PDF 预览本身可人工目检页数） | 质检结果与人工复核一致率抽查 |
| 4.4 | **新增** `src/lib/api-v1-auth.ts` + `src/lib/webhooks.ts` | X-ZP-Key 校验（Supabase `api_keys` 表：key/scope/rate）；webhook HMAC 签名 + 3 次退避重试；**设计注**：`api-security.ts` 的 `guardApiRequest` 仅 POST+8KB+同源，B2B API 需独立守卫（允许 X-ZP-Key 免 origin、JSON body 上限放宽，文件走 R2 直传不受 8KB 限制） | 鉴权/重试单测通过 |
| 4.5 | **新增** `src/app/api/v1/orders/route.ts` | 幂等键（重复 key 返回同一 order_id）→ 写 `orders`（复用 create-payment-session 双 schema 落库逻辑）→ 触发支付（4.9）→ 存 webhook_url | 幂等压测（重复 POST 同一结果） |
| 4.6 | **新增** `src/app/api/v1/orders/[id]/route.ts` | GET 状态/tracking/review_eta（`under_review` + `review_eta ≤4h` 可见） | 状态推进正确 |
| 4.7 | Supabase migrations | `orders` 增列（tracking_no/review_status/review_eta/webhook_url/file_id/ioss_number）；新表 `files`、`api_keys`、`review_queue` | migration 应用 + 线上列名探测（复用 getOrdersColumns 模式） |
| 4.8 | 审核台：**新增** `src/app/[locale]/admin/review/page.tsx` + `src/app/api/v1/review/[id]/route.ts` | 订单列表 + PDF 预览（R2 签名 URL）+ 自动质检报告 + 地址/收款核验 + **一键批准/驳回**（驳回必填原因）；approve→`in_production`、reject→`needs_revision`（自动 webhook + RESEND 邮件）；管理员鉴权（独立 token/basic auth，**不得**与分销商 X-ZP-Key 混用） | 端到端 1 单含审核闸试跑；驳回→重传→重新排队演练 |
| 4.9 | 支付桥接 | PayPal REST（orders/capture + webhook）优先；未通前复用 bank_transfer/QR 半自动（现有 create-payment-session 不动） | 支付→paid 状态回推真实可用 |

**验收门**：端到端 1 单（上传→质检→下单→支付→审核→生产→tracking webhook）全链 PASS；拒收/驳回/重印/退款兜底演练；`tsc 54=54` + 门童全绿。

---

## 5. Phase 3：全自动 + 对账 + 规模（8–12 周）

| # | 任务 | 验收 |
|---|---|---|
| 5.1 | webhook 全自动（review_approved/rejected + shipped 含 tracking + delivered） | 10 单零人工介入（审核闸内）验收 |
| 5.2 | `POST /api/v1/reports/ioss?month=`（订单/金额/税费三栏 + IOSS 申报数据导出，管理员 scope） | 与承运商对账平账；IOSS 首月申报成功 |
| 5.3 | 分销商控制台（订单/对账/文件重传/余额） | 控制台可用 |
| 5.4 | 欧盟中转仓 C 方案评估（月单量 >200–300 触发；本地 VAT 含税、DDP 最干净） | 评估报告 + K3 决策 |

---

## 6. 内容 / SEO / AEO / GEO 执行（并行，全部走飞轮纪律）

| # | 任务 | 落地 | 验收 / 纪律 |
|---|---|---|---|
| C1 | 三语 POD 服务页（hub-spoke） | `/en/services/print-on-demand`、`/zh-hk/services/pod-api`、`/ja/services/pod-api` + sitemap 登记 + IndexNow | 新功能区首发走预览+确认流程（§0.25.10.5）；上线后 7/14/28d 复测 |
| C2 | Schema：Service + FAQPage + HowTo（API 四步）+ Product（$49.9） | 三语 FAQ 答案与 §1/§5/§7 数字**逐字一致** | Google Rich Results Test 可验证 |
| C3 | 报价计算器组件（规格×数量×国家 → 全包价 + Express 加价） | 接 1.6 路由 | GEO 引用磁铁；数字与 API 同源 |
| C4 | **存量日历内容真值对齐（本执行方案新发现）**：`src/data/blog-posts.ts` L1477「1-piece MOQ …」、corporate calendar guide「single-copy MOQ from US$0.40」等，与「单本全包 $49.9」冲突（$0.40 是 500+ 批量档单张价） | 走 D1–D6 商业真值批：单本 POD 全包价 vs 批量档单张价分档表述，禁止并存冲突数字 | 全站日历数字一致性扫描 0 冲突（复用 11-13 飞轮 §5 方法） |
| C5 | GEO 探针 S2（窗口 11-20..24）：固定引擎+固定问题集（单本无起订/单本价/EU 运费与关税/POD API） | 完整原始答案 + citation URL 归档 `.hermes/geo/` | 不重跑 S1；普通 WebSearch 不算引用 |
| C6 | GSC 复测登记：11-14 / 11-21 / 11-28：`print on demand`/`no minimum`/calendar 词簇 query×page 基线 | 词级证据三元组（query+imps+pos）落档 | 缺证据不派单；不把本表数字写进客户可见内容 |

**C4 优先级最高**：POD 页面上线前必须先把存量「1-piece MOQ / from US$0.40」口径收编，否则三语站点自相矛盾（11-13 飞轮 P0「商业真值」教训的直接应用）。

---

## 7. 运营配套（与开发并行启动）

- IOSS 月结申报流程（中介对接人 + 每月导出清单，接 5.2）。
- 承运商 DDP 对账（€3 平税 + 服务费逐票核对）。
- **审核人力排班**：SLA ≤4 工作小时的前提 = 至少 1 名审核员 + 节假日值班表；上线前确认（拍板项 12）。
- 退款/重印 SOP：拒收不扣费、QC 不合格重印免费、丢损重发（写进 API 文档与 FAQ）。
- Q4 旺季（11–12 月）时效缓冲口径：全链路加 3–5 个工作日，页面/FAQ/API 三处同步。

---

## 8. 执行纪律速查（引用 AGENTS.md 条款）

| 场景 | 规则 |
|---|---|
| push | 攒批优先（≥3 非 docs 或 ≥1 src 行为修复）；`push-gate-check.mjs` 与 push **分两次调用**（§0.25.9/§0.25.2 撞车教训）；docs-only 不推 |
| src 变更 | 门童 #27 title-v5 / #16 gsc-leak / brand / encoding / tsc 54=54（§0.25.10.3 审查全绿 4 件） |
| blog-data 写入 | 先看 `lane.lock`（§0.35.5）；人手会话按 SESSION_LOCK 双条件（§0.35.7） |
| 新页面 | 新功能区首发走预览+确认（§0.25.10.5），非小改动免预览范围 |
| 数字 | 未拍板/未实测值只进 docs；任何金额/计数结论双方法复算（§0.23.2） |
| 客户可见内容 | GSC 后台黑话禁入（§0.23.1）；第三方品牌/假评审/无人拍板数字零容忍（check-brand-mentions --strict） |

---

## 9. 里程碑验收矩阵

| 里程碑 | 内容 | Exit criteria |
|---|---|---|
| M0（本周） | Phase 0 启动 + C4 存量真值审计 | 实测任务派单；C4 冲突清单落档 |
| M1（2 周） | Phase 0 冻结表 + C1 页面立项 | 冻结表落盘；页面文案过商业真值门 |
| M2（4 周） | Phase 1 报价引擎上线（api/v1/quote + 结算页） | tsc/门童绿；报价与页面同源；三语一致 |
| M3（8 周） | Phase 2 全链（文件/订单/审核台/支付） | 端到端 1 单含审核闸 PASS；兜底演练 |
| M4（12 周） | Phase 3 全自动 + IOSS 首月申报 | 10 单零人工；对账平账 |
| M5（12 周+） | C2–C6 内容与 GEO 复测 | S2 引用归档；11-21/11-28 GSC 复测基线 |

---

## 10. 待 K3 拍板清单（策略 §10 十二项 + 执行新增）

1. **$49.9 全包终局锚**（EU 经济件 DDP；zh-hk HK$390 / ja ¥7,600 建议锚；非 EU 另表）。
2. DDP 全站统一口径（legal ja DAP vs catalog-printing-china DDP 冲突）。
3. IOSS 注册主体与欧盟中介委托。
4. **线上卡收单路线**（PayPal 审核 / Stripe HK / Airwallex HK）——P0 阻塞。
5. 欧盟中转仓 C 方案启用阈值（建议月单量 >200–300）。
6. products.ts `podPrice` 字段与「单本全包价」FAQ 商业真值批。
7. €3 关税「每票 vs 每件」口径（按承运商清关结果固化）。
8. 名片 §0.0 不受影响（本方案仅日历/台历）。
9. **人工审核 SLA ≤4 工作小时** + 审核人力与值班排班。
10. Express 加价额（+$25 建议，待 DHL 实测）。
11. IOSS VAT 计基（按终端实付全价含税内扣申报口径）。
12. C4 存量日历内容真值收编授权（blog-posts.ts L1477 / corporate guide / size reference 三篇 × 3 语）。
13. **执行新增**：B2B API 鉴权方案（X-ZP-Key 表 + 独立守卫，与 api-security 分离）——技术选型无需拍板，但 api_keys 表与密钥管理需 K3 知情。
14. **执行新增**：审核台管理员账号体系（独立于分销商 key，basic auth/token）。

---

## 11. 数据来源与依据

- 策略口径/数字：`docs/2026-11-14-order-automation-pod-execution-plan.md`（§0.1 毛利、§4 报价、§5 DDP、§6 API、§7 时效；外部数字来源 URL 见其 §11）。
- 仓库事实（本轮实测）：`src/lib/quote-engine/{markets,shipping,tax}.ts`（9 市场、europe 硬编码费率、VAT 含税展示逻辑已具备）；`src/lib/api-security.ts`（guardApiRequest 仅 POST+8KB+同源——B2B API 需独立守卫）；`src/app/api/{quote,create-payment-session,order-notify}/route.ts`（询盘落库/双 schema 落库/邮件兜底可复用）；`src/app/[locale]/checkout/CheckoutClient.tsx`（内联 i18n 键，无独立 messages/*.json）；仓库根**无 wrangler.toml**（CF Pages Dashboard 运行时绑定，R2 需新增）；**无 R2/Queues/Durable 引用**（PDF 存储与异步质检为全新组件）。
- 存量内容冲突（C4）：`src/data/blog-posts.ts` L1477「1-piece MOQ」日历 guide、corporate calendar guide「single-copy MOQ from US$0.40」、calendar size reference——与 $49.9 单本全包价需分档收编。

---

## 12. SOP-10 五问自检

1. **架构差异**：已核对 quote-engine/api-security/checkout/支付路由现状与两份飞轮文档；新组件在既有体系内扩展，未臆断冲突（api-security 局限为实测事实）。
2. **约束适用范围**：D1–D6、title 冻结域、名片 §0.0、贺卡资产、middleware 301 均未触及；本文件 docs-only。
3. **原数据/拍板来源**：策略数字沿 §11 来源；仓库事实标注文件路径；未实测值标「待实测」。
4. **字段值策略**：$49.9/€3/时效/SLA 等未拍板值仅出现在 docs，不写入生产内容。
5. **Markdown 渲染**：docs-only，未改 user-facing 文本。

**执行结论**：本周即启动 Phase 0（生产/物流实测、IOSS 询价、PayPal 跟进）+ C4 存量日历真值审计（零等待项）；Phase 1 报价引擎骨架可与实测并行；两个 P0 阻塞（卡收单、IOSS）的 owner 决定 12 周能否到全自动 M4。
