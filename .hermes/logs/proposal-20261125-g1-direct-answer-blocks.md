# G1 承接页「直答块」落地提案（2026-11-25 · 首席分析师起草 · 待 K3 批 · docs-only）

> 依据: `.hermes/logs/audit-20261125-g1-truth-check.md`（G1 六问×12 页 live 真值矩阵）+ 行动包 G1 零点击簇定位（846imp/3clk，页一门口 15 词）+ Kimi §4.2 直答要求 + GLM §A 承接缺口。
> 定位: G1 = 「页一在榜但零点击」的承接面问题——SERP 可见摘要/答案层要有**可直接被抓取的直答文本单元**（MOQ+价格锚 / 生产与送达分开 / 急件条件化），这是 C1 簇已验证的答案层引用形态（我方 FAQ「100 個起 HK$2.5 起/個 無開版費」3/3 跑进答案层）。
> 性质: src 客户可见内容 → **K3 批后走 daily 车道攒批**（§0.25.10 审查全绿 4 件 + 门童全量）；本文档只是提案，不含任何 src 写入。

## 一、直答块模板（三行式，照 C1 已验证形态）

**形态**：每页首屏（hero 下方 / FAQ 上方）加一个「快速答案」块（blog 面已有 qa-answer v5.1 同款结构可复用；PDP/类目面渲染层由车道决定，本文只定内容）。**首 150 字直接回答三问：起订量与价格 / 生产多久+多久送到 / 急件怎么办+怎么询价。**

```
⚡ 快速答案
① 起訂與計價：<MOQ + 已确认真值价格锚 + 免费项（如無開版費/免費打稿）>
② 生產與送達：<標準生產 X 個工作天> ＋ <本地 Y 天（順豐）/跨境 Z 個工作天（DHL）>   ← 生产与送达必须分开两句
③ 急件與詢價：<急件可加急生產，加急費用與截稿時間以報價確認>；WhatsApp 一表交齊：尺寸/數量/材質/檔案/交貨地/期望日期
```

**红线（文案层，全部硬约束）**：
- ❌ 不新增硬承诺：不写「18:00 截单」——12/12 页现口径均为「以报价确认」，18:00 是否为 SSoT 口径**待 K3 确认**（真值核查 §F.4）；K3 未拍前只允许条件化表述。
- ❌ 不编造数字：生产天数缺的页只写「以報價確認」，不填推测值（§0.23）。
- ❌ GSC/探针后台数据不入文案（§0.23.1）；价格矛盾页的价格位留占位，**随 `FIX-20261125-PRICE-TRUTH-GAPS` 卡拍板后回填**，本批不碰。
- ❌ title/meta 冻结面不动（本批只在正文/首屏）；品牌按 §13.16 v2 分层（zh-hk 智印港 / en,ja ZprintPro）。
- ✅ 数字锚只用各页**已在线且两轮复核的真值**（下表「可用真值」列）。

## 二、逐页落点与可用真值（12 页 = G1 六问矩阵全集）

| # | 页面 | ①起訂/計價（可用真值） | ②生產/送達（可用真值） | 待办 |
|---|---|---|---|---|
| 1 | zh food-boxes PDP | 100 個起，HK$2.5 起/個，無開版費無刀模費 | 生產 3-5 工作天；順豐 1-2 天 / DHL 2-4 天 | WA 预填补【檔案】【交貨地】 |
| 2 | zh a2-posters PDP | 10 張起，HK$16 起/張 | 生產以報價確認；送貨 1-2 天全港 | 生产天数位不编造；WA 补 2 字段 |
| 3 | zh a1-posters PDP | **价格矛盾（title HK$20 vs 卡 29-45）→ 占位待 PRICE-TRUTH** | 生產以報價確認（现状）；48h 快遞营销语不进直答 | WA 预填 A2→A1 错配必修 |
| 4 | zh transparent-stickers PDP | 10 張起，HK$0.38-1.50/張 | 生產 5-7 工作天；送達 1-2 天 | WA 5 字段最全，只补 2 |
| 5 | zh removable-stickers PDP | 10 張起，HK$0.45-1.60/張 | 生產 3-5 工作天；送達 1-2 天 | ⚠️ 同分类与 transparent 5-7 口径不一——直答块用各自现有值，**口径统一另列 K3 问** |
| 6 | zh certificates PDP | 10 張起，HK$8-40/張 | 生產/交期均以報價確認（不编造） | WA 已有工艺字段，补 2 |
| 7 | en small-batch-stickers PDP | From 10 pc, from US$0.55/pc | Production confirmed at quote；Free US shipping $99+ | WA 5 字段（Size/Qty/Material/Shape/Turnaround）补 Delivery location |
| 8 | en category stickers | **$0.05 vs US$0.55 十倍矛盾 → 全页占位待 PRICE-TRUTH（title+JSON-LD 同源先修）** | Production 2-3 working days; shipping 2.3 days avg; DHL 2-4 days | WA 从通用预填升级 7 字段模板 |
| 9 | ja small-batch-stickers PDP | **¥69 vs HK$89-196 双币并存 → 占位待 PRICE-TRUTH（円建て承诺先修）** | A4 1-50 枚即日仕上げ（特急料金）；DHL 2-4 日/航空便 3-5 日 | WA 5 字段补【納品先】 |
| 10 | zh wedding-invitations 类目 | 起訂 50 套（**价格 NT$×2 → 占位待 PRICE-TRUTH**） | 生產 7-10 工作天（急件 5 天 +30%）；順豐 24h / DHL 2-4 天 | WA 从通用升级字段模板 |
| 11 | zh red-packets 类目 | 100 個起，HK$1.10 起/個 | 標準 5-7 工作天（複雜 7-8 天）；港九免費速遞 | WA 升级；「旺季 11 月底前」可作季节提示句 |
| 12 | zh calendars 类目 | 1 本起（數碼），HK$3-8/本 | 數碼 3-5 日 / 柯式 5-7 日 / 急件 2-3 日（數碼） | WA 升级 |

**WA 预填 7 字段统一模板**（补齐【檔案】【交貨地】系统性缺失，per 真值核查 §E.5）：
`我想報價【品類：__】【尺寸：__】【材質：__】【數量：__】【檔案：已有/待提供】【交貨地：香港/澳門/海外__】【期望日期：__】`（en/ja 同构 7 字段，术语按 §13.15/§13.13 行业标准）

## 三、执行排程（K3 批后）

1. **批 1（P0 正确性前置）**：依赖 `FIX-20261125-PRICE-TRUTH-GAPS` K3 真值 → 页 3/8/9/10 价格位回填 + title/JSON-LD 同源修复（title 触及处按 title-v5 门童 + 冻结面豁免确认）。
2. **批 2（直答块内容批，不依赖真值）**：页 1/2/4/5/6/7/11/12 八页直答块 + WA 7 字段升级 → daily 车道攒批（§0.25.10 四件 + 门童 #16 GSC 泄漏 + #1 credibility + #27 title-v5 全量）。
3. **批 3（口径统一问 K3）**：贴纸 transparent 5-7 vs removable 3-5 生产口径；18:00 截单是否入 SSoT 直答句；ja 円建て统一（并入 PRICE-TRUTH 卡）。
4. **验收**：每页 online_verify 由 k3-review 独立翻转；直答块上线后 W4 探针 C1 形态复测（下一 S 轮），观察答案层引用形态是否从「FAQ 摘要」扩展到「直答块」。

## 四、数据来源
```
数据来源:
- G1 六问×12 页 live 真值矩阵: .hermes/logs/audit-20261125-g1-truth-check.md（2026-11-25，12/12 页 200 有效，疑点两轮复核）
- G1 零点击簇定位: 重要文件/2026-11-25-three-site-glm-kimi-alignment-and-money-word-homepage-action-pack.md（11-25 批 28d GSC）
- 答案层形态实证: .hermes/geo/geo-ai-probe-2026-11/summary-s2.md（C1 FAQ 文本 3/3 跑进答案层）
- 价格红线: .hermes/logs/strategy-task-queue.json#FIX-20261125-PRICE-TRUTH-GAPS（BLOCKED_K3_TRUTH）
校准状态: ✅ 已校准（全部「可用真值」来自两轮复核 live 抓取；矛盾页一律占位不取值）
```
