# Autoclaw 设计管线 v3: 设计稿先行 + 即日页设计系统 (2026-08-27 05:35 K3 反馈驱动)

> **K3 反馈**: 首页 3 块 + 印刷知识 + contact 上线版"没有一点设计感, 还不如原来, 都不如即日印刷"
> **本文件取代**: 2026-08-27-autoclaw-direct-code-brief.md 的直改 repo 模式 + 2026-08-27-autoclaw-category-pdp-brief.md 的同类段落

---

## §1 根因诊断 (源码铁证, 不是感觉)

| 对比项 | 即日页 (好) | 首页这次 (翻车) |
|--------|-----------|----------------|
| 产出方式 | Autoclaw 先交**独立 HTML 设计稿** → K3 审截图 → M3 转组件 | GLM **直接在 repo 改 Tailwind 组件** |
| 样式载体 | 专用 CSS Module (rush-page.module.css), 自定义 tokens/clamp 字级/遮罩/时间轴 | Tailwind 默认类拼装 |
| 铁证 | `.scIc`: 52px 蓝底白图标, 全站统一 | WhyChooseUs.tsx 现版: `bg-blue-50/text-blue-500` `bg-green-50` `bg-purple-50` `bg-orange-50` `bg-red-50` `bg-cyan-50` = **六色 pastel 图标方块, AI 默认审美第一号反模式** |

**结论: 不是 Autoclaw 能力不够, 是管线错了。**
- 抽象审美词 ("大气" "Apple 级") 不产生设计, 只产生平均品
- "自由度"给错了地方: LLM 没有参照物时, 自由发挥 = 默认值回归
- 即日页模式 (设计稿→截图审批→转组件) 已被 8/26 验证成功, 这次错误地跳过了设计稿环节

## §2 v3 管线 (两个指令包共用)

```
Step 1: GLM-5.3 出独立 HTML 设计稿 (单文件内联 CSS, 浏览器直接打开) — 不碰 src/
Step 2: 渲染截图 (桌面 1440px + 移动 375px) → K3 审批 — 顺眼才放行
Step 3: 审批后转组件 (CSS Modules, 参照 rush-page.module.css 模式), 内容零改动
Step 4: 工程闸门 (encoding/tsc/build/diff data 空) + 1 commit + verify-deploy
```

## §3 设计系统 tokens (从即日页 rush-page.module.css 提取, K3 已拍板的视觉 DNA — 写进提示词)

```
--blue:#2873F5  --blue-dark:#1a3f8f  --blue-deep:#0f1f3d
--orange:#F87314  --orange-light:#FEF1E6  --wa:#25D366
--ink:#111827  --gray:#6B7280  --line:#E5E7EB  --bg:#F9FAFB
--radius:16px  --shadow:0 10px 30px rgba(17,24,39,.06)

配方 (照用):
- eyebrow 小标题: 13px/600/字距 .12em/蓝色 + 前置 22px 橙色短横线
- section 大标题: clamp(26px,3.4vw,40px) 800, 关键词橙色 <em>
- 大数字: clamp(26px,3vw,38px) 800, 高光用橙
- 卡片: 白底 + 1px var(--line) 边 + radius 16 + 浅 shadow, padding 34x28
- 图标容器: 52px radius 14 纯蓝底白图标 (lucide 单色) — 全站唯一形态
- 主 CTA: 橙底白字 700, radius 12, padding 16x30, 橙色投影 0 8px 24px rgba(248,115,20,.32)
- 深色 section: --blue-deep 底 + 白字 + 顶部 1px 半透白分隔的 metric 行
- 提示条: --orange-light 底 + 左 4px 橙边 + radius 0 12 12 0
- section padding 104px 0

容器宽度铁律 (2026-08-27 K3 更新):
- 全站桌面容器 = max-width 1320px, 左右 padding 24px (对齐 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8)
- 即日页 max-width 1120px 是唯一豁免, 新设计一律 1320px
- section 背景允许 full-bleed (100vw), 内容容器锁 1320px
```

## §4 反模式黑名单 (本次翻车铁证, 提示词中"命中即作废")

1. ⛔ pastel 彩色图标方块 (bg-blue-50/green-50/purple-50/orange-50/red-50/cyan-50 彩虹阵)
2. ⛔ emoji 当图标
3. ⛔ N 张等大等色白卡横排堆叠
4. ⛔ Tailwind 默认调色板直出 (blue-500/green-500/red-500 混用)
5. ⛔ 蓝紫渐变 / 玻璃拟态 / 卡片套卡片 / 无体系乱加 shadow-md
6. ⛔ 斜体中文 / 无中文字体栈

## §5 首页重做包 v3 (取代 direct-code-brief)

### 范围与上线策略
- **不 revert** fa34337/e85ad70 (含 HeroBanner 假承诺修正, revert 会带回「3 小時」) — 直接在现版上重做视觉层
- 范围: HeroBanner(已修真, 视觉可再融入) / HowItWorks / StatsBar / WhyChooseUs / TrustWaterfall(Badges) / 印刷知识入口 / contact 页视觉 (逻辑不动)

### 提示词增量 (在 v2 基础上替换/追加)
```
## 工作模式 (取代直改 repo)
Step 1: 先交付独立 HTML 设计稿 design/home-v3.html (单文件内联 CSS,
        浏览器可直接打开), 不碰 src/。设计稿含全部 6 块。
Step 2: 渲染桌面 1440px 视口 (内容容器锁 1320px 居中, 这是全站铁律,
        即日页 1120px 是唯一豁免) + 移动 375px 整页截图, 连同
        https://zprintpro.com/zh-hk/services/rush-printing-delivery/ 截图
        并排放在一张对比图里交付。自问: 像同一家公司吗? 不像就改到像再交。
Step 3: 我 (K3) 审截图确认后, 你才转组件进 src/ (CSS Modules,
        参照 src/components/services/rush-page.module.css 的写法)。

## 设计系统 (必须使用, 从即日页提取, 已拍板)
[粘贴 §3 tokens + 配方全文]

## 反模式 (命中即作废)
[粘贴 §4 全文]

## 内容零改动红线 (不变)
git diff --stat src/data/ = 空; messages/ 只增不改;
文案/title/H1/价格/FAQ/Schema/图片 src+alt 一个字符不动
```

## §6 类目页 + 产品页包 v2 更新 (取代 category-pdp-brief 对应段落)

原包的两级约束/内容零改动/试点页选择 (packaging + a2-posters) **全部保留**, 只替换工作模式:

```
## 工作模式 (同首页包)
Step 1: design/category-pdp-v2.html 单文件设计稿, 含类目页 + 产品页两个整页
        (用 packaging 类目 + a2-posters 真实数据填充, 数据从 src/data/ 读)
Step 2: 截图 + 与即日页并排对比图 → K3 审批
Step 3: 审批后改 2 个共享模板 (category/[slug]/page.tsx + product/[slug]/page.tsx),
        子组件 CSS Modules 化
Step 4: 闸门 + 14 类目 × 3 locale curl 200 抽查

## 设计系统 tokens + 反模式: 同 §3 §4 全文适用
## 内容零改动红线: 不变 (本包最高纪律)
## 特有要求: 挖数据文件里"已有但没展示好"的字段 (FAQ/规格表/价格锚点/场景)
            用更好的陈列方式呈现 — 内容不变, 陈列升级
```

## §7 验收标准 (K3 审批截图时对照)

| 项 | 过线标准 |
|----|---------|
| 同品牌感 | 与即日页并排截图, 一眼是同一公司 |
| 图标 | 全页只有蓝底白图标一种容器, 0 个 pastel 彩色块 |
| 色彩 | ≤3 彩色 (蓝/橙/绿 WA), 无 rainbow |
| 层级 | 每块有清晰主次, 无等大卡片阵 |
| 记忆点 | 至少 1 个 (如大数字时刻/橙色高光/时间轴式元素) |
| 内容 | git diff src/data/ 为空 |
| 容器宽 | 桌面内容容器 1320px 居中 (即日页 1120px 唯一豁免), 背景可 full-bleed |

*整理: 2026-08-27 / 证据: WhyChooseUs.tsx 六色 pastel 源码 + rush-page.module.css tokens 提取 / 本文件为唯一执行依据*
