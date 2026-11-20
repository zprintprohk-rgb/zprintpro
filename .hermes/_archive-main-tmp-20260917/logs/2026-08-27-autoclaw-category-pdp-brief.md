# Autoclaw 执行包: 类目页 + 产品详情页模板重设计 (2026-08-27)

> **模式**: Autoclaw (GLM-5.3) 直接在 F:\zprintpro-nextjs 写代码 + commit + push; M3 只做验收抽查
> **核心原则 (K3 拍板)**: 内容零改动, 只动结构/布局/视觉 — SEO+GEO 资产一个字符不丢

---

## §1 先回答 K3 的疑问: "内容不能动, 是不是这样?"

**对, 而且比想象的更安全。** 架构实测 (8/27 04:38):

- `category/[slug]/page.tsx` (563 行) 和 `product/[slug]/page.tsx` (647 行) 是**共享动态模板** (generateStaticParams), 14 个类目页 + 全部产品页共用一套骨架
- **内容住在数据文件里**: `src/data/category-seo-content.ts` / `products.ts` / `pillar-content.ts` / `faq/` / `price-tables/` 等 — 模板只负责"怎么摆", 不负责"说什么"

**推论**:
1. 这次只动模板层 (page.tsx + 子组件), 数据文件 ⛔ 一个字节不动
2. **改 1 套模板 = 14 类目页 + 全部产品页同时换新**, 不需要逐页做, M3 也不用手动复制——它的活变成验收抽查
3. "内容零改动"可机械验证: `git diff --stat src/data/ src/messages/` = 空 (除了新增 key 不许有改动)

### 内容边界定义 (写进提示词)

| 不可动 (SEO/GEO 资产) | 可以动 (视觉结构层) |
|---|---|
| title / meta / H1 / H2 文案 | 布局、栅格、bento、间距 |
| 产品名 / 价格 / 规格 / 起订量 | 色彩、字号、字重、视觉层级 |
| FAQ 问答 / 长尾正文 / 内链锚文本 | 图标风格、动效、组件形态 |
| Schema JSON-LD 全部字段 | CTA 按钮样式与位置 (文案不动) |
| 图片 src / alt | 图片的展示尺寸/圆角/遮罩/排列 |

## §2 试点页选择 (数据驱动)

| 试点 | 选择 | 理由 (GSC 8/24 实测) |
|------|------|---------------------|
| 类目页基准 | `/zh-hk/category/packaging/` | 包裝盒 = P0 大词 (包裝盒訂製 29.4 / 包裝盒印刷 34.9), 客单价最高, 朋友竞价年赚 300 万的品类, 值得最好的设计 |
| 产品页基准 | `/zh-hk/product/a2-posters/` | A2 海報 = 转化王词 (a2海報 @1, K3 8/26 实拍转化最好) |

⚠️ 代码层面模板改动会全量生效, "试点"只是**视觉定稿的评审基准** (K3 看这 2 个 URL 验收美感), 不是灰度发布。

## §3 定稿提示词 (可直接投喂 Autoclaw)

```
你是资深 B2B 跨境电商 UI/UX 设计师 + Next.js 前端工程师。
执行模型分工: GLM-5.3 = 设计决策 + 模板代码; GLM-5.3-flash = 3 语言核对 + 验收脚本。

## 工作目录 (强制)
F:\zprintpro-nextjs  ← 真实 git 仓库, 直接改源码。

## 任务本质 (先理解再动手)
类目页 src/app/[locale]/category/[slug]/page.tsx 和产品页
src/app/[locale]/product/[slug]/page.tsx 是共享动态模板, 内容全部来自
src/data/ 数据文件。你的任务: 只改模板与视觉组件, 让 14 个类目页和全部
产品页看起来更专业、更大气、更值得信任 — 内容一个字符不动。

## 内容零改动红线 (本任务最高纪律)
⛔ 禁止修改: src/data/ 下所有文件、messages/*.json 的既有 key 值
⛔ 禁止改任何文案: title/meta/H1/H2/产品名/价格/规格/FAQ/内链锚文本/Schema 字段/图片 src+alt
✅ 只允许: 布局/栅格/间距/色彩/字号字重/视觉层级/图标/动效/组件形态/CTA 样式位置
✅ 如需新增 UI 装饰性文字 (如「查看更多」icon 旁 label), 走 messages 新增 key, 3 语言补齐
完成标准: git diff --stat src/data/ = 空; git diff messages/ 只有新增 key 无修改行

## Step 0: 读源码
1. 两个模板 page.tsx 全文
2. 它们引用的子组件 (按 import 链全部读完)
3. 数据文件结构 (category-seo-content.ts 一个类目的字段 + products.ts 一个 SKU 的字段, 理解有哪些内容可陈列)
4. 设计基准: src/components/services/RushHero.tsx + RushTimeline.tsx (即日页, 8/26 K3 拍板风格)
5. 线上现状: curl https://zprintpro.com/zh-hk/category/packaging/ 和
   https://zprintpro.com/zh-hk/product/a2-posters/ 各读一遍

## Step 1: 先出《设计方向说明》(GLM-5.3 发挥环节, 不写码)
1 页: 视觉概念一句话 + 类目页与产品页各自的布局思路 + 信息层级重排方案 +
1 个记忆点设计决策 + 你打算怎么利用数据文件里"已有但现有模板没展示好"的字段
(如 FAQ/规格表/价格锚点/场景图)。
我 (K3) 确认方向后才进 Step 2。

## Step 2: 模板重设计 (2 个 page.tsx + 子组件)

### 设计目标
- 客户 3 秒内感到: 这家专业、快、可信赖 — 敢留资料、敢询盘
- 类目页:  Hero 价值主张区 + 产品网格 (卡片升级) + 信任/流程带 + FAQ 手风琴
  + 询盘 CTA (每屏有且只有 1 个主 CTA)
- 产品页:  图左信息右 (或你设计的更好结构) + 规格/价格表清晰可读 +
  工艺材质视觉化 + FAQ + 强询盘 CTA + 相关推荐
- 类目页与产品页必须是"同一家的两层", 与即日页同一品牌语言

### 你的设计自由度
布局结构/间距节奏/图标风格/动效/组件形态全由你定;
允许提出比上述目标更好的结构, 在《设计方向说明》说理由。
审美标尺: 苹果/Stripe 级的克制大气, 不是淘宝级的热闹;
大留白、克制色彩、清晰层级、一个记忆点。

### 固定工程约束 (非审美, 是纪律)
- CTA 用品牌橙 #F87314, 主色品牌蓝 #2873F5, 全页 ≤3 彩色
- 询盘 CTA 链接 /quote/ 或 WhatsApp, 带 data-event (quote_click/whatsapp_click)
  + data-source="category" 或 "pdp" + data-locale
- 移动优先, 375px 无横向滚动
- 中文字体栈 (PingFang SC/Microsoft YaHei/Noto Sans TC), 禁斜体中文
- 图片用 next/image, 现有 src/alt 不动, 只动展示尺寸/遮罩/排列

## 真实性红线 (违反 = 作废重做)
1. ⛔ 禁「3 小時」「4 小時出貨」「當日達」「14:00 截單」— 唯一承诺 18:00 截單→翌日 12:00
2. ⛔ 禁「名片」「business cards」「咭片」
3. ⛔ 禁编造客户名/认证/数字; 回覆时效只准「15 分鐘內」
4. ⛔ en/ja 禁硬塞 Shenzhen/Hong Kong (NAP 层除外)
5. ⛔ 禁改 URL/slug/hreflang/canonical/Schema 字段名

## 工程闸门 (GLM-5.3-flash, 全过才 commit)
1. node scripts/check-encoding.js --fix   (UTF-8 + LF)
2. npx tsc --noEmit                       (54 test baseline, 不新增即过)
3. npm run build                          (Compiled successfully — build 会静态生成
   全部类目+产品页, 编译过 = 所有页可渲染)
4. git diff --stat src/data/ = 空; messages/ 只有新增 key
5. 1 个 commit: feat(category+pdp): 类目页+产品页模板重设计 (内容零改动, GLM-5.3)
6. 距上次 push ≥30 分钟; push 后 node scripts/verify-deploy.mjs exit 0

## 验收报告 (push 后)
- 《设计方向说明》+ 每块 1 句改动理由
- 内容零改动证明: git diff --stat src/data/ 输出为空 的截图/文本
- curl live 验收 (GLM-5.3-flash 跑):
  # 2 个试点页 200
  curl -sI https://zprintpro.com/zh-hk/category/packaging/ | head -1    # 200
  curl -sI https://zprintpro.com/zh-hk/product/a2-posters/ | head -1    # 200
  # 内容资产在位 (verbatim grep, 每条约换成本页真实文案词)
  类目页: title 与改前完全一致; H1 完全一致; FAQ 问题数一致
  产品页: 产品名/价格/规格全部在位
  # 14 类目 × 3 locale 全 200 抽查 (脚本批量 curl)
  # 禁词 0 命中
```

---

## §4 分工与时序

| 角色 | 动作 |
|------|------|
| **Autoclaw** | Step 0-2 + 闸门 + push + 验收报告 |
| **K3** | 唯一关口: 审《设计方向说明》(顺眼才放行写码) + push 后看 2 个试点页美感 |
| **M3** (验收层, 不重写) | ① 14 类目 × 3 locale 批量 curl 200 ② 抽样 5 产品页核对内容 verbatim ③ sitemap regen finish ④ GSC 请求编入: packaging 类目 + a2-posters + 抽查页 ⑤ 8/28 中检带上这两类页的 CTR 变化 |

## §5 风险与回滚
- 模板改坏 = 全类目/产品页同时坏 → build 闸门 + verify-deploy 兜底, 失败禁盲修, 报告 K3
- 回滚: git revert <commit> --no-edit 一次全回 (单 commit 设计)
- 内容误改 → git diff src/data/ 闸门在 commit 前就会拦下

*整理: 2026-08-27 / 事实来源: 模板架构实测 + GSC 8/24 数据 / 本文件替代口头转述*
