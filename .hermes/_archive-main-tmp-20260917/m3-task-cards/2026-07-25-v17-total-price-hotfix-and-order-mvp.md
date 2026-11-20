# v17 任务卡 🔴 P0 热修 — 参考价表总额 bug + meta 假承诺清除 + 半自助下单 MVP

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 任务 1+2 热修可单独 1 commit 抢发;任务 3 如超 2h 拆分第 2 个 commit
> 收入关联: PDP 参考价表「10 個 × HK$129 = 總額 HK$1,290」— 129 是整批价被当单价乘,客户看到 10 倍价直接流失。线上现存,P0。

## 任务 1 🔴 ReferencePriceBlock 总额列逻辑修复 (P0)

**Bug (K3 live 实测)**: `src/components/pdp/referencepriceblock.tsx` SSR 价格表渲染 `10 個 | HK$ 129 | 總額 HK$ 1,290` — 把整批价 129 当单价 × 数量。与 v14 QuoteCalculator 同型 bug,漏网在 v13 组件里。

**修法 — 列语义重做** (整批价不再被乘):
| 數量 | 整批參考價 | 平均每件 | 運送 |
|---|---|---|---|
| 10 | HK$129 | HK$12.9/張 | 運費另計 |

- 「整批參考價」= 该档 sell_hkd (不重算)
- 「平均每件」= 整批价 ÷ 数量,1 位小数 (帮客户理解单价感,**纯展示不参与计算**)
- 删除任何 单价×数量 的「總額」计算
- en: "Batch price" / "Avg per pc";ja:「ロット価格」/「単価目安」
- WhatsApp CTA 预填文本同步检查:不得含被乘大的金额

**验收**: a2-posters SSR 表 10 張行 = 整批 HK$129 · 平均 12.9/張;gang-run 500 枚行 = 整批价档值;全页 grep 不得出现 129×10 / 1,290。

## 任务 2 🔴 meta description 假承诺清除 (P0,顺手)

**K3 实测**: a2-posters 的 `<meta name="description">` 仍含「滿$500免運費，即日交貨」— v14 徽章修了可见区,meta 漏了,Google SERP 直接展示假承诺 (客诉 + 信任双重风险)。

**修法**: grep `src/app/[locale]/product/[slug]/page.tsx` 和 products.ts 的 description/excerpt 字段,所有「滿$500免運費」「即日交貨」「Free intl. shipping」「Same-day」「送料無料」「即日納品」按 SKU 真实交期/运费重写 (复用 v14 徽章口径:小批量順豐 · 運費實報 / 標準交期 X 天)。**全站扫,不只海报。**

## 任务 3: 半自助下单 MVP (4 品类快车道)

**K3 设计决策 (已拍板逻辑,照做)**:
- ❌ 不做在线支付 — 定制文件可能不合格,先收款=埋退款纠纷;收款码/空中云汇人工确认足够
- ❌ 不做文件上传存储 — WhatsApp 传文件是行业惯例零成本;上传+订单绑定进 V2
- ❌ 不做会员/登录 — 无账号体系时会员是空中楼阁,复购折扣先用人工跑
- ✅ 只做一件事:把「立即下單」做成结构化表单,成交路径从 24h → 5 min

**规格**:
1. 4 个试点品类 PDP (a2-posters / a5-flyers / digital-stickers / gang-run-card-boxes) 的 ReferencePriceBlock 旁加「立即下單」按钮 (与 WhatsApp 询价并列,不替代)
2. 点击开表单 (复用站点现有表单样式): 配置快照只读 (当前选中的 材质/尺寸/数量/参考价) + 姓名 + 电话/WhatsApp + 邮箱 + 收货地址 + 备注 (可选)
3. 提交走 **FormSubmit** (contact 页已验证通道,同 endpoint 同密钥机制),字段带 `_subject: 新訂單 [品类] [订单号]`
4. 订单号规则: `ZP-YYYYMMDD-XXX` (日期+3 位随机),生成后显示在成功页
5. 成功页文案 (zh-hk 为例): 「✅ 訂單已提交 [订单号] · 我們 2 小時內 WhatsApp 確認文件與收款 · 請將印刷文件發送至 WhatsApp +852 9XXX XXXX 並註明訂單號」+ 收款说明 (確認後發收款碼/空中云汇账户)
6. 隐藏字段带 locale + 来源页 URL (同 contact 页机制)

**验收**: 4 个 PDP 各提交 1 测试单,zprintpro@outlook.com 收到 4 封带订单号邮件;表单移动端可用;pollution grep = 0。

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 全过
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- 汇报: commit sha + run id + ①a2-posters SSR 表 3 档文本对照 ②meta 假承诺清除清单 (命中几处) ③4 封测试单邮件截图/主题 ④grep 结果
