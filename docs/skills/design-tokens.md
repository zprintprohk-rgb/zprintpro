# 技能：A 皇室藏青设计系统

唐总拍板的全站视觉语言（正身：F:\zprintpro-nextjs\design\home-v3.html + 已上线区块）。
任何 UI/UX 改造先读本文，避免反模式返工。

## 1. Tokens
- 主渐变（藏青）：`linear-gradient(165deg, #244780 0%, #1B3163 52%, #152649 100%)`
  + 顶部 1px 内高光 `box-shadow: inset 0 1px 0 rgba(255,255,255,.10)`
- moment/横幅内层：`linear-gradient(155deg, #26477F 0%, #1D3465 55%, #17284C 100%)`
  + 光斑 `radial-gradient(circle, rgba(93,144,235,.25), transparent 68%)`（父级 isolate 防穿透）
- 橙 #F87314（CTA/强调；阴影 rgba(248,115,20,.32)）；蓝 #2873F5（链接/图标 tile）
- 墨 #111827；灰 #6B7280；线 #E5E7EB；底 #F9FAFB；radius 16；卡阴影 0 10px 30px rgba(17,24,39,.06)
- 深色底文字层级：正文 white/85、次级 white/70、标签 #9DB8F5
- 已上线锚点（可抄实现）：StatsBar 数据带 / WhyChooseUs 决策卡阵 / 页脚渐变 / 急件页 hero / 类目决策卡阵

## 2. 组件模式
- 眉题：橙短线 22×2px + 标题 13px/600/letter-spacing .12em（蓝 #2873F5 或深墨）
- 决策卡：lg:4 白卡 + 36px 蓝 tile 白图标 + DecisionCard 拆「・」粗体主句+灰副文（CategoryPillarContent.tsx）
- 图标 tile：52px/radius14 纯蓝底白线性图标——全页唯一形态
- 横幅：藏青渐变 + 橙 CTA 圆角按钮（px-6 py-3）
- 卡片 hover：border #d6e0f5 + translateY(-3px) + 轻投影

## 3. 反模式黑名单（命中即返工）
1. pastel 彩虹图标方块（bg-blue-50/green-50/purple-50 彩虹阵）
2. emoji 当图标
3. 等大等色白卡横排无层级（文字墙）
4. Tailwind 默认调色板直出混用
5. 蓝紫渐变 / 玻璃拟态 / 卡片套卡片
6. 非法任意值：text-white/78（要 text-white/[0.78]）、w-4.5、gap-4.5
7. 文案三语逐字冻结：视觉改造只动 className/style；新增结构字符串须忠实翻译并在交付说明
8. 承诺唯一版本：「18:00 截單 → 翌日中午 12:00 前送達」；禁其他时效表述

## 4. 冻结区（视觉改造禁区，改动前必须确认）
- 首屏三件套（价格锚点+交期承诺+报价/WhatsApp CTA）
- 产品网格、分页器、JSON-LD/schema/metadata/title
- SKU 页顶部左右结构（图集+报价购买箱）
- 埋点 data-event/data-source 属性
- title/meta 9/12 前冻结（K3 §5.3）

## 5. 基准站（实测解剖过，新设计先对表）
- MOO business-cards：Shop by X 分组卡阵（sticky×58/faq×33/trust×26）
- Vistaprint business-cards：H3 层级组（review×704/faq×26/trust×19）
- e-print products_Business_Cards：产品类型卡阵 + 指南块 + WhatsApp 密触点
- 三家共识版式：分组卡阵 + 信任密度 + FAQ——文字墙是反模式
- 竞品解剖方法：urllib 抓 HTML → 提取 h1/h2/h3 骨架 + 关键词密度（price/whatsapp/faq/trust/sticky）
