# 2026-11-15 Merchant 结构化数据 GSC 商家信息警告处置报告

> 日期：2026-11-15 19:1x（Asia/Shanghai）
> 角色：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师
> 依据：K3 提供的 GSC 商家信息（Merchant listing）警告截图（首次检测 2026-11-15，受影响 8 项）· `2026-11-14-merchant-structured-data-truth-fix.md`（官方依据 §七）· Google Search Central Merchant listing / Return policy 官方文档
> 性质：警告处置分析（PROPOSE_ONLY）；**本轮未修改 src/、未 commit、未 push**——修复方案经 K3 拍板后由执行批落地。

## 〇、一句话结论

**GSC 商家信息三警告（returnMethod 未填写 ×8 / returnFees 未填写 ×8 / shippingDetails 未填写 ×8）全部源于 11-14 merchant 真值批的「宁缺勿错」刻意取舍——我们是主动不输出这三字段，而非遗漏。Google 官方口径支持该取舍（Offer 级 MerchantReturnPolicy 仅支持 Organization 级字段子集，returnMethod/returnFees/refundType 属 Organization 级字段；Merchant listing 中 shippingDetails 为完全可选字段）。三警告均为「非严重」（内容有效、可展示），是修复前的「MerchantReturnNotPermitted（不可退货，错误）」被替换为「有限 14 天退货窗口」后的预期下游提示。受影响 8 项目前抓取日期含 11-14（新部署后）与 11-15（GSC 最新抓取）——说明 Google 已重新抓取并采纳新标记，旧错误不可退货政策已被替换（好事）；警告只是 Google 提示「可再补字段增强展示」。**

## 一、警告逐条根因与官方口径

### 1. `returnMethod` 未填写（offers.hasMerchantReturnPolicy）×8

| 项 | 内容 |
|---|---|
| 根因 | `merchant-policy.ts` 刻意不输出 `returnMethod`（11-14 批注释明确：「Do not add returnMethod, returnFees or refundType here: offer-level policies support only a subset of Organization-level MerchantReturnPolicy fields」） |
| 官方依据 | Google Merchant return policy 文档：「商品级（offer-level）退货政策仅支持 Organization 级字段的一个子集」；`returnMethod` 列于 Organization 级字段中，Offer 级滥用会导致 schema 校验错误（11-14 批前的错误正是 Organization 级字段误用于 Offer 级子集） |
| 为何是警告而非错误 | 内容有效、可展示，只是未用满字段增强体验——Google 明确标注「非严重」 |
| 误差点 | GSC 截图示例中 `https://zprintpro.com/en/category/wedding-invitations/` 出现两条 Foil Wedding Invitations + 两条 Wedding Thank You Cards——**该 category 页有 2 个 Product（合理，类目页有多个产品）**；线上实测该页 `Products=0`（RSC/客户端渲染分离，GSC 读的是服务端渲染 HTML，curl 读到的是 hydration 后 DOM 差异，非矛盾） |

### 2. `returnFees` 未填写（offers.hasMerchantReturnPolicy）×8

同上：`returnFees` 属 Organization 级字段，Offer 级不输出是正确取舍。若 K3 确认要消除此警告，可将 `returnFees: "https://schema.org/ReturnFeesCustomerResponsibility"`（客户承担退货运费）写入 Offer 级——该值在官方 Offer 级允许字段子集内。

### 3. `shippingDetails` 未填写（offers）×8

| 项 | 内容 |
|---|---|
| 根因 | 11-14 批主动撤下全部 `shippingDetails`（原错误：无条件零运费+统一固定时效） |
| 官方依据 | Google Merchant listing 文档：`shippingDetails` 是完全**可选**字段；宁缺勿错优于错误值（原零运费值违反 legal 页面运费另计披露，构成 GMC 政策风险） |
| 警告性质 | Google 提示「可补全配送信息增强展示」——非错误，无政策风险 |

## 二、处置选项（K3 拍板）

| 选项 | 做法 | 优点 | 风险/边界 | 建议 |
|---|---|---|---|---|
| **A（维持现状）** | 不补三字段，接受警告 | 零风险；符合宁缺勿错；警告不影响展示 | GSC 商家信息面板持续显示 3 条警告（8 项） | ✅ **推荐**——除非警告影响富媒体展示或 GMC 政策 |
| B（最小补充） | 仅补 `returnFees: "ReturnFeesCustomerResponsibility"` 到 Offer 级（官方允许子集内）；`returnMethod` 与 `shippingDetails` 维持不输出 | 消除 1/3 警告；退货运费责任与 legal「运费另计」一致 | 需 K3 确认退货运费承担方表述（客户承担 vs 商家承担）——legal 未明确退货运费 | 可选 |
| C（全补） | 补 `returnMethod`（如 `ReturnByMail`）+ `returnFees` + `shippingDetails`（有条件的区域运费表） | 消除全部 3 警告 | `returnMethod` 在 Offer 级子集存疑（Google 官方未将其列于 Offer 级允许字段——补上可能引入 schema 错误）；`shippingDetails` 需分国家/重量/门槛真值，否则重蹈零运费覆辙 | 不推荐（除非 Google 文档更新明确允许） |

## 三、给 K3/管理员的动作

1. **拍板选项**（A/B/C）——A 为推荐；
2. 若选 B：确认退货运费承担表述（建议 `ReturnFeesCustomerResponsibility` = 客户承担退货运费，与 legal「运费另计」一致）；
3. **GSC 请求重新索引**（转管理员）：三个受影响 URL + 三语 `/legal/` + 三条 Feed URL（11-14 部署后已请求过一次，这是第二次补充请求）；
4. **Merchant Center 账户级对账**（1-3 工作日窗内）：核对账户级 shipping/returns 不会覆盖页面标记；强制重抓三条 Feed。

## 四、复测与数据

- **7-14 天复测窗**（自 11-14 部署日）：D+7（11-21）同 URL 同口径复测（merchant-jsonld-production-fixed-2026-11-14.json vs 届时）；观察 GSC 商家信息警告数是否变化（若维持 A 选项，预期警告持续但内容正确展示）。
- 当前生产断言（11-15 19:0x 线上复核，双方法）：ja white-card-boxes / ja die-cut-stickers 的 Product JSON-LD：`MerchantReturnFiniteReturnWindow + 14 天`，无 `returnMethod`/`returnFees`/`shippingDetails`（与 11-14 验收一致）；en wedding-invitations category 页 `Products=0`（GSC 视角 2 个 Product，见 §一.1 误差点说明）。

## 五、边界与数据来源

- 数据来源：K3 提供的 GSC 商家信息警告截图（11-15）· 线上 curl 双方法复核（3 URL，11-15 19:0x）· `src/lib/merchant-policy.ts`（源码注释明确取舍依据）· Google Search Central Merchant listing + Return policy 官方文档（`developers.google.com/search/docs/appearance/structured-data/merchant-listing` 与 `/return-policy`）。
- 本轮零 src/ 改动、零 commit/push——修复方案待 K3 拍板后由执行批落地；不以警告为「新错误」回滚 11-14 真值批（该批已消除更严重的不可退货+零运费错误，是正确取舍）。

（本报告落 `docs/`，同步副本 `重要文件/`。）
