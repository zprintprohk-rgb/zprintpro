# SKU 在线评分功能 — K3 决策包（2026-10-28）

> 触发: K3 指令「增加客户可以在线给 SKU 评分…客户说要评价，要好评」+ GSC 商家信息「brand 重复」×7 + MC 有效商品 78→62。
> 性质: **新功能区首发** → 按 §0.25.10.5 不走直推, 本包交 K3 拍板; 执行层已完成全部前置调查与基建盘点。
> 数据来源: `src/data/product-reviews.ts`(8-04 K3 P0-2 裁决文件头) · `src/app/api/merchant-feed/[locale]/route.ts` · GSC 截图 ×2 · MC 邮件(10-28) · 线上探针(brands/feed/eligibleQuantity)。

## 1. 现状盘点（全部实证）

| 项 | 现状 |
|---|---|
| 评价数据管道 | **已存在**: `product-reviews.ts` = Review/AggregateRating 唯一真值源, PDP JSON-LD 与 merchant-feed **已自动消费**; 当前 0 条真实评价 |
| 合规框架 | K3 8-04 P0-2 已裁决: 只收真实评价(作者+日期+评分+正文+来源+**consent: true**), 禁编造 |
| GSC 侧 | 「评价摘要」报告入口已存在; MC 商家优化建议中「商店评分」已绿 |
| 提交通道 | **不存在**: 站内无任何评价表单/接口; 无在线下单(交易流缺失) |
| 附件两图根因 | 「brand 重复」×7 + 有效数 -16 = 3 个 locale feed 用**同一 g:id(sku_code)** 提交同一 MC 账户, 品牌三值互相冲突(智印港/ZprintPro/ジープリント, 83/83 ID 全碰撞, 线上实证); 页面 markup 本身单 brand 无重复(4 页解析实证) |

## 2. 关于「装 Google 的评分插件」

Google **没有**可安装的"站点评分插件"。官方相关物: ① **Google 商家评分**(MC 计划, 靠交易数据触发调查 — 无在线下单, 不适用); ② **Google Customer Reviews**(同上, 需订单流); ③ 第三方小部件(Trustpilot 等) = 注入第三方脚本+对 方评分政策+订阅费, 且评价数据不在自己手里。**本站已有 schema 管道, 缺的只是"收集"环节。**

## 3. 方案 A/B/C（推荐 C 立即 + A 拍板后建）

| 方案 | 内容 | 依赖 | 时效 |
|---|---|---|---|
| **C（推荐先行）** | **WhatsApp 收评 → 人工入库**: K3/客服把真实客户评价(原话+署名同意+日期)按 `product-reviews.ts` 格式交给执行层, 当日填充上线 → 星级自动出现在 PDP schema + MC feed | 零基建; 只需 K3 提供 3-5 条真实+同意的评价 | 当日 |
| **A（真"在线评分"）** | PDP 评分表单(1-5 星+文字) → Supabase `product_reviews` 表 → 后台审核(防垃圾/防刷) → 通过后进 product-reviews 管道 | ① Supabase migrations apply(K3 管理员, 当前 5 表 404) ② 新功能区首发 preview 流程 ③ 审核人力 | K3 拍板后 1-2 批 |
| B（暂缓） | Google Customer Reviews | 交易数据流(无在线下单) | 未来接单流程化后再议 |

## 4. 红线（不可妥协）

1. ❌ **禁止编造好评** — §0.23 + Google 评论政策: 虚假/自评 = 人工处置风险(整站富媒体降权), 比没有星级伤害大一个量级
2. ❌ `aggregateRating` 少于 **3 条真实评价**前不输出（Google 星级展示门槛）
3. ✅ 每条评价必须留痕: 作者(可匿名昵称)+日期+评分+原文+来源+consent
4. ✅ 评价正文语言 = 页面语言, 按 locale 独立聚合（管道已内置）

## 5. 同批已执行（本次 push, 无需拍板）

1. **feed `g:id` 加 locale 前缀**（`${locale}-${sku_code}`）— 跨语 ID 碰撞类根因永久消除; ⚠️ MC 侧商品 ID 将全量刷新, 首轮 re-fetch 后 GSC 商家信息「brand 重复」应回落
2. **K3 侧清单（MC 账户域）**: ① MC → 诊断 → 查看 16 个失效商品的具体原因 ② **Feeds 标签页确认每个 destination 只挂 1 个 feed**(HK=zh-hk / US=en / JP=ja), 多余的删 ③ 刷新后观察 48h
3. 批 #8b 渲染层假 MOQ ×24（三语对位, 真值: flyers/menus=10 · mailer=100 · envelopes=100 · red-packets=100 · calendars=1）

## 6. 请 K3 一句话

1. **C 方案**: 提供首批 3-5 条真实评价（WhatsApp 原话截图 + 客户署名同意）→ 执行层当日上线
2. **A 方案**是否立项（含 Supabase apply 排期）
3. MC feeds 配置确认结果
