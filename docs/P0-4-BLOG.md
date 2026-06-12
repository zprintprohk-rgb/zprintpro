# P0-4: Blog 内容生成 + 集成（超详细版）

> **目的**：用 AI 工具生成 12 篇博客内容（4 周 × 3 语言），集成到 zprintpro
> **预计时间**：30-60 分钟/篇 × 12 篇 = 6-12 小时（分 4 周完成）
> **难度**：★★★☆☆（需要会用 AI 工具 + 复制 TypeScript 对象 + push 代码）
> **前置**：能用 Kimi 2.6 / Claude / ChatGPT、能 push 代码

---

## 阶段 A：理解现有 blog 系统（2 分钟）

### A.1 blog 系统现状

zprintpro 已经有完整的 blog 系统：
- 列表页：`src/app/[locale]/blog/page.tsx`
- 详情页：`src/app/[locale]/blog/[slug]/page.tsx`
- 数据源：`src/data/buying-guides.ts`（TypeScript 对象，不是 markdown）

### A.2 BuyingGuide 接口

新增一篇博客 = 在 `buyingGuides` 数组里加一个 TypeScript 对象。结构：

```typescript
{
  slug: '业务唯一标识',                              // 用于 URL
  categorySlug: '所属分类的 slug',                   // 用于关联产品
  title: { 'zh-hk': '...', en: '...', ja: '...' }, // 3 语言
  description: { 'zh-hk': '...', en: '...', ja: '...' },
  keywords: { 'zh-hk': '...', en: '...', ja: '...' },
  category: { 'zh-hk': '...', en: '...', ja: '...' },
  date: '2026-06-07',                                // YYYY-MM-DD
  content: { 'zh-hk': '...', en: '...', ja: '...' }, // HTML 字符串
  relatedProducts: ['sku-1', 'sku-2'],               // 关联 SKU
}
```

---

## 阶段 B：选 AI 工具（1 分钟）

**推荐工具**（按质量 × 中文 × 成本）：

| 工具 | 中文 | 长文 | 成本 | 推荐度 |
|---|---|---|---|---|
| Kimi 2.6 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ |
| Claude Sonnet 4.5 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | $20/月 | ⭐⭐⭐⭐ |
| ChatGPT GPT-4o | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | $20/月 | ⭐⭐⭐⭐ |

**建议用 Kimi 2.6**（中文最好 + 免费）：
1. 打开 `https://kimi.moonshot.cn`
2. 登录（手机号或微信）

如果你已经有 Claude/ChatGPT 账号，也可以用。

---

## 阶段 C：生成第一篇博客（30-60 分钟）

### C.1 准备 ai_prompt

1. 打开 `F:\zprintpro-nextjs\docs\blog-content-calendar.json`
2. 用 VS Code 或记事本打开
3. 找第一篇 brief（Week 1 zh-hk）：
   ```json
   {
     "week": 1,
     "locale": "zh-hk",
     "topic": "香港 Same Day 印刷完全指南",
     "keyword": "香港 Same Day 印刷",
     ...
     "ai_prompt": "（1500+ 字的 prompt）"
   }
   ```
4. **只复制 `ai_prompt` 字段的内容**（不包括 `{}` 括号）
5. 备用：复制 `topic` 和 `keyword`（后面要用）

### C.2 在 Kimi 中生成

1. 打开 Kimi 2.6
2. 在对话框粘贴 ai_prompt
3. 按回车 / 点击发送
4. 等待 30-60 秒

**预期看到**：Kimi 输出 1500-2000 字的 markdown 博客

### C.3 复制 AI 输出

1. Kimi 生成完后，点击输出框右上角的 "**复制**" 按钮
2. 复制到剪贴板

### C.4 整理为 BuyingGuide 格式

新建一个文件：`F:\zprintpro-nextjs\tmp-blog-{slug}.md`（临时文件）

在文件里粘贴 Kimi 的输出，**上面加 frontmatter**：

```markdown
---
slug: hong-kong-same-day-printing
categorySlug: business-cards
title:
  zh-hk: 香港 Same Day 印刷完全指南
  en: (Kimi 之后翻译)
  ja: (Kimi 之后翻译)
description:
  zh-hk: 香港 Same Day 印刷 2026 年最新指南，含報價案例。智印云香港 Same Day 印刷專家｜ISO9001｜FSC認證｜24H交貨。
  en: (Kimi 之后翻译)
  ja: (Kimi 之后翻译)
keywords:
  zh-hk: 香港 Same Day 印刷, 即日印刷, 印刷推薦
  en: (Kimi 之后翻译)
  ja: (Kimi 之后翻译)
category:
  zh-hk: 印刷指南
  en: Printing Guide
  ja: 印刷ガイド
date: 2026-06-07
relatedProducts:
  - premium-business-cards
  - same-day-business-cards
---

# 香港 Same Day 印刷完全指南

（Kimi 生成的 markdown 正文）
```

⚠️ **这一步是占位**，你先做 zh-hk，en 和 ja 留给后面

### C.5 Markdown → HTML 转换

zprintpro blog 用 HTML 字符串（不是 markdown）。**两种方法**：

#### 方法 A：手动简单转换（推荐）

1. 打开 Kimi 输出的 markdown
2. 替换：
   - `# 标题` → `<h2>标题</h2>`
   - `## 标题` → `<h3>标题</h3>`
   - `**加粗**` → `<strong>加粗</strong>`
   - `段落` → `<p>段落</p>`
   - `- 列表` → `<ul><li>列表</li></ul>`
3. 在 Kimi 重新发个 prompt：

> 请把上面这篇博客的正文部分（去掉 frontmatter）转换为 HTML 格式：
> - `# 标题` → `<h2>`
> - `## 标题` → `<h3>`
> - 段落用 `<p>`
> - 列表用 `<ul><li>`
> - 保留内链（`<a href="...">`）
> - 图片用 `<img src="..." alt="..." />`
> 
> 直接输出 HTML 代码，不要解释。

4. 复制 Kimi 的 HTML 输出

#### 方法 B：直接用 Markdown 渲染器（如果项目支持）

如果 zprintpro 用 `react-markdown` 或类似库：
1. 不用转 HTML，直接用 markdown
2. 但需要先确认项目有 markdown 渲染

⚠️ **zprintpro 当前用 HTML 字符串**（看 `buying-guides.ts` 现有内容都是 HTML 标签）。用方法 A。

### C.6 准备 final TypeScript 对象

在 `tmp-blog-{slug}.md` 文件**末尾**加：

```typescript
{
  slug: 'hong-kong-same-day-printing',
  categorySlug: 'business-cards',
  title: {
    'zh-hk': '香港 Same Day 印刷完全指南',
    // en 和 ja 暂时留空或填简化版
    'en': 'Hong Kong Same Day Printing Complete Guide',
    'ja': '香港即日印刷完全ガイド',
  },
  description: {
    'zh-hk': '香港 Same Day 印刷 2026 年最新指南...',
    'en': 'Hong Kong Same Day Printing 2026 latest guide...',
    'ja': '香港即日印刷 2026 年最新ガイド...',
  },
  keywords: {
    'zh-hk': '香港 Same Day 印刷, 即日印刷, 印刷推薦',
    'en': 'same day printing hong kong, same day rush',
    'ja': '香港即日印刷, 急ぎ印刷',
  },
  category: {
    'zh-hk': '印刷指南',
    'en': 'Printing Guide',
    'ja': '印刷ガイド',
  },
  date: '2026-06-07',
  content: {
    'zh-hk': '<p>（HTML 字符串，从 C.5 复制）</p><h2>...</h2>...',
    'en': '<p>（先简单填一段英文 placeholder，下周补完整版）</p>',
    'ja': '<p>（先填日文 placeholder）</p>',
  },
  relatedProducts: ['premium-business-cards', 'same-day-business-cards'],
}
```

⚠️ **重要**：第 1 周只生成 zh-hk 完整版，en 和 ja 可以暂时 placeholder。下周再补全。

### C.7 检查 + 保存

1. 完整 review 你的 tmp-blog-{slug}.md 文件
2. 检查：
   - 标题包含目标关键词
   - 内链 3-5 个 → zprintpro.com 分类/产品页
   - 没有编造数据（如虚假价格、虚构客户）
   - 数据来源标注（如果引用了统计数据）
3. 保存文件（不 commit，先放着）

---

## 阶段 D：添加到 buying-guides.ts（5 分钟）

### D.1 打开 buying-guides.ts

1. VS Code 打开 `F:\zprintpro-nextjs\src\data\buying-guides.ts`
2. 文件很长（910 行），用 Ctrl+F 找 `export const buyingGuides`

### D.2 找插入位置

1. 找到 `export const buyingGuides: BuyingGuide[] = [`
2. 找到数组最后一个对象的结尾（用 Ctrl+End 跳到文件末尾）
3. 在最后 `},` 之后加逗号 `},,`
4. 把 TypeScript 对象粘贴到下面

### D.3 完整插入示例

```typescript
// ... 现有的 6 篇 buyingGuides ...

  // ========== WEEK 1 NEW ==========
  {
    slug: 'hong-kong-same-day-printing',
    categorySlug: 'business-cards',
    title: {
      'zh-hk': '香港 Same Day 印刷完全指南',
      'en': 'Hong Kong Same Day Printing Complete Guide',
      'ja': '香港即日印刷完全ガイド',
    },
    description: {
      'zh-hk': '香港 Same Day 印刷 2026 年最新指南...',
      'en': 'Hong Kong Same Day Printing 2026 latest guide...',
      'ja': '香港即日印刷 2026 年最新ガイド...',
    },
    keywords: {
      'zh-hk': '香港 Same Day 印刷, 即日印刷, 印刷推薦',
      'en': 'same day printing hong kong, same day rush',
      'ja': '香港即日印刷, 急ぎ印刷',
    },
    category: {
      'zh-hk': '印刷指南',
      'en': 'Printing Guide',
      'ja': '印刷ガイド',
    },
    date: '2026-06-07',
    content: {
      'zh-hk': '<p>完整 HTML 内容...</p>',
      'en': '<p>placeholder</p>',
      'ja': '<p>placeholder</p>',
    },
    relatedProducts: ['premium-business-cards', 'same-day-business-cards'],
  },
]; // 数组结束
```

⚠️ **注意**：每个属性之间用逗号 `,` 分隔；最后一个属性后**不加逗号**（或加 trailing comma 看项目风格）

### D.4 检查 + 跑 dev-workflow

PowerShell：

```bash
cd F:\zprintpro-nextjs
powershell -ExecutionPolicy Bypass -File scripts/dev-workflow.ps1
```

**预期看到**：
- TypeScript 0 errors
- Build 0 errors
- [PASS] Build + Check all green

### D.5 push 部署

```bash
cd F:\zprintpro-nextjs
git add src/data/buying-guides.ts
git commit -m "feat(blog): add '香港 Same Day 印刷完全指南' (W1 zh-hk)"
git push origin_ssh main
```

**预期看到**：
- 1 file changed
- `xxxxxxx..yyyyyyy main -> main`

### D.6 验证

1. 等 1-2 分钟 CF Pages 部署
2. 打开 `https://zprintpro.com/zh-hk/blog/`
3. 应该看到新的博客卡片
4. 点击进入，看完整内容

---

## 阶段 E：补全 en + ja（每周 1 次）

### E.1 第二周补 en

1. 打开 Kimi 2.6
2. 输入 prompt：
   > 请把下面的中文博客翻译成英文，保留所有 SEO 关键词、内链、和 HTML 标签：
   > 
   > （粘贴第一篇 zh-hk 的 content）
3. 复制输出
4. 在 buyingGuides 数组对应对象里，替换 `content.en` 字段
5. push 部署

### E.2 第三周补 ja

类似 E.1，但翻译成日文

### E.3 重复 12 篇

| 周 | zh-hk | en | ja |
|---|---|---|---|
| W1 | ✅ 完整 | W2 翻译 | W3 翻译 |
| W2 | W4 完整 | ✅ 完整 | W5 翻译 |
| W3 | W6 完整 | W7 翻译 | ✅ 完整 |
| W4 | W8 完整 | ✅ 完整 | W9 翻译 |

**实际上更快**：用 Kimi 一次性生成 3 语言版（一次 prompt 包含"请同时输出 3 个语言版本"），但模型质量会下降。建议分 3 次。

---

## 阶段 F：节奏（持续 4 周）

### F.1 每周发布 ≥ 4 篇

OPC 目标：每周至少 4 篇高质量内容
- Week 1: 4 篇（zh-hk 2 + en 1 + ja 1）
- Week 2: 4 篇
- Week 3: 4 篇
- Week 4: 4 篇
- **总计：16 篇**（略多于 12 brief）

### F.2 时间分配

- 每天 30-60 分钟生成 1-2 篇
- 每周累计 4-6 小时
- **建议节奏**：每天 1 篇，比周末赶 4 篇质量高

### F.3 监控

每月 review：
- GSC 看 12 篇博客的搜索展现 + 点击
- Supabase 看 `whatsapp_inquiries.source = 'blog-xxx'` 的转化
- Plausible 看博客页面的参与度（停留时间、跳出率）

---

## 故障排查

### ❌ TypeScript 错误：找不到 slug / 类型不匹配

**原因**：BuyingGuide 对象字段拼错
**解决**：
- 严格按 `BuyingGuide` 接口填
- `slug` 必须是字符串
- `title/description/keywords/category/content` 必须是 `Record<Locale, string>`
- `date` 格式 `YYYY-MM-DD`
- `relatedProducts` 是 `string[]`

### ❌ Build 失败：HTML 字符串有未闭合标签

**原因**：手动转换 markdown → HTML 时漏了闭合
**解决**：
- 找对应的 `<p>` 或 `<h2>` 加 `</p>` 或 `</h2>`
- 或者让 Kimi 重新转换

### ❌ Blog 列表不显示新博客

**原因**：`getAllBuyingGuideSlugs()` 没包含新 slug
**解决**：
- `buyingGuides` 数组**自动**通过遍历包含新对象
- 但要确认 slug 没重复
- 跑 `npm run build` 看 sitemap.xml 是否包含新 URL

### ❌ AI 生成内容质量差

**解决**：
1. **换 AI 工具**（Kimi 不好用换 Claude）
2. **改 prompt**（在 ai_prompt 基础上加"请更详细"）
3. **手动修改**（AI 给框架，人工补充具体内容）

---

## 完成后

✅ **第一篇 zh-hk 博客发布** = 成功  
✅ **购买路径（WhapsApp）有数据** = blog 在产生询盘  
✅ **GSC 看到新博客的搜索展现** = 4 周后能见效

告诉我第一篇生成情况，我帮你 review 质量。
