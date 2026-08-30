# Autoclaw 投喂提示词: 首页重设计 v3 设计稿 (2026-08-27)

> 用法: 以下「===PROMPT START===」到「===PROMPT END===」之间全文复制投喂 Autoclaw (GLM-5.3)。
> 前提: Autoclaw 工作目录 = F:\zprintpro-nextjs (repo 根目录, 能读 src/ 取真实文案)。

===PROMPT START===

# 任务: ZprintPro 首页重设计 — 先交设计稿, 不碰代码

你是资深电商品牌视觉设计师 + 前端。为印刷跨境电商独立站 zprintpro.com 重设计首页 6 个区块。
这是一次**纯设计稿任务**: 你只交付一个独立 HTML 文件和截图, **绝对不改 src/ 里任何文件**。

## 背景 (必读)

- 客户: 香港印刷电商, 全球接单, 深圳工厂, 30 秒 AI 报价 + 72 小时交付
- 上次有人直接改代码, 产出是六色粉彩图标方块 (bg-blue-50/green-50/purple-50...), 审美翻车被否
- 全站设计标杆是即日印刷页: https://zprintpro.com/zh-hk/services/rush-printing-delivery/
  你的设计必须和它是"同一家公司"的感觉

## 交付物

1. `design/home-v3.html` — 单文件, 全部 CSS 内联在 `<style>`, 浏览器双击可直接打开, 无构建依赖
2. 两张整页截图: 桌面 1440px 视口 + 移动 375px 视口
3. 一张对比图: 你的截图与即日印刷页截图左右并排。自问: 像同一家公司吗? 不像就改到像再交
4. contact 页视觉另交 `design/contact-v3.html` (只做视觉, 表单结构保持现状, 不动任何提交逻辑)

## 设计范围 (首页 6 块, 顺序即页面顺序)

1. **HeroBanner** — 主视觉 (现有轮播逻辑不动, 你只重做视觉层: 排版/色彩/CTA 样式)
2. **HowItWorks** — 下单流程
3. **StatsBar** — 数据带
4. **WhyChooseUs** — 为什么选择我们 (上次翻车重灾区)
5. **TrustWaterfall** — 信任徽章/资质
6. **KnowledgeSection** — 印刷知识入口

## 真实文案 (强制)

所有文案/数字/链接**逐字取自代码, 一个字符不许编**:

- 文案来源: `messages/zh-hk.json` (设计稿用 zh-hk 繁体中文版)
- 现有组件 (读它们取文案和结构): `src/components/home/HeroBanner.tsx` `HowItWorks.tsx` `StatsBar.tsx` `WhyChooseUs.tsx` `TrustWaterfall.tsx` `KnowledgeSection.tsx`
- 图片: 引用线上真实图 (https://zprintpro.com/... 绝对 URL), 不许用占位灰块/假图
- ⛔ 不许发明新卖点、新数字、新承诺。缺的视觉元素用排版/色彩/空间解决, 不靠编内容

## 设计系统 tokens (全站已拍板的视觉 DNA, 必须使用)

```css
:root {
  --blue:#2873F5;  --blue-dark:#1a3f8f;  --blue-deep:#0f1f3d;
  --orange:#F87314; --orange-light:#FEF1E6; --wa:#25D366;
  --ink:#111827;   --gray:#6B7280;   --line:#E5E7EB;  --bg:#F9FAFB;
  --radius:16px;   --shadow:0 10px 30px rgba(17,24,39,.06);
}
```

配方 (照用, 这是即日页的成功语言):

- eyebrow 小标题: 13px / 600 / 字距 .12em / 蓝色, 前置 22px 橙色短横线
- section 大标题: clamp(26px, 3.4vw, 40px) / 800, 关键词用橙色 `<em>` 高亮
- 大数字: clamp(26px, 3vw, 38px) / 800, 高光用橙
- 卡片: 白底 + 1px var(--line) 边 + radius 16 + 浅 shadow, padding 34px 28px
- 图标容器: 52px / radius 14 / 纯蓝底白图标 (单色线性 SVG) — 全页唯一形态
- 主 CTA: 橙底白字 700, radius 12, padding 16px 30px, 投影 0 8px 24px rgba(248,115,20,.32)
- 深色 section: --blue-deep 底 + 白字, metric 行之间用 1px 半透白分隔
- 提示条: --orange-light 底 + 左 4px 橙边
- section padding 104px 0

## 容器宽度铁律

- 内容容器: **max-width 1320px 居中, 左右 padding 24px** (全站统一, 即日页 1120px 是唯一豁免)
- section 背景允许 full-bleed (100vw), 内容锁 1320px
- 移动 375px 下 padding 16px

## 反模式黑名单 (命中即作废, 我会逐条检查)

1. ⛔ pastel 彩色图标方块 (bg-blue-50/green-50/purple-50/orange-50/red-50/cyan-50 彩虹阵) — 上次翻车就是它
2. ⛔ emoji 当图标
3. ⛔ N 张等大等色白卡横排堆叠 — 每块必须有清晰主次层级
4. ⛔ Tailwind 默认调色板直出 (blue-500/green-500/red-500 混用)
5. ⛔ 蓝紫渐变 / 玻璃拟态 / 卡片套卡片 / 无体系乱加 shadow-md
6. ⛔ 斜体中文 / 无中文字体栈 — 字体栈必须含中文: `-apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans TC", sans-serif`

## 设计自由度 (鼓励发挥的部分)

在 tokens 和黑名单之内, 这些是你可以做出"惊艳感"的地方:

- 每块之间的节奏变化 (深浅交替 / 疏密对比 / 不对称布局)
- 至少 1 个记忆点 (大数字时刻 / 橙色高光的创造性用法 / 时间轴式元素 / 编辑感排版)
- WhyChooseUs 不许再做"图标+标题+段落 × 6"的卡片阵 — 打破它 (如: 左文右数 / 大数字锚点 / 横向时间流)
- StatsBar 参考即日页深色 metric 行做法, 但可以更进一步
- hover 微交互可以有, 但必须克制 (位移/颜色过渡, 禁缩放旋转)

## 验收标准 (我审截图时对照)

| 项 | 过线标准 |
|----|---------|
| 同品牌感 | 与即日页并排截图, 一眼同一家公司 |
| 图标 | 全页只有蓝底白图标一种容器, 0 个 pastel 彩色块 |
| 色彩 | ≤3 彩色 (蓝/橙/绿WA), 无 rainbow |
| 层级 | 每块有清晰主次, 无等大卡片阵 |
| 记忆点 | 至少 1 个 |
| 内容 | 与 messages/zh-hk.json 逐字一致, 0 编造 |
| 容器 | 桌面 1320px 居中 |

先交 design/home-v3.html + 截图 + 对比图, 我审过才谈下一步转组件。

===PROMPT END===
