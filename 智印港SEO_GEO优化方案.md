# 智印港 ZprintPro SEO + GEO 全局优化方案

> 目标：zprintpro.com 在 Google 各语言市场排名首页
> 生成日期：2024年4月
> 适用市场：香港（繁中）、国际（英文）、日本（日文）

---

## 一、诊断结果总览

### 1.1 已修复问题（Phase 1 完成）

| # | 问题 | 修复内容 | 状态 |
|---|------|---------|------|
| 1 | Header 下拉菜单 14 个死链 | 将 a3-flyers→double-sided-flyers, dl-flyers→folded-leaflets 等 slug 替换为实际存在的产品 | ✅ |
| 2 | 缺失页面 404 | 新建 contact / blog / blog/[slug] / search / about / faq / terms / privacy 页面（×3 语言 = 57 个路由） | ✅ |
| 3 | 根域名 404 | 新增 middleware.ts，/ → /zh-hk/ 自动重定向 | ✅ |
| 4 | hreflang 大小写 bug | 移除 layout.tsx 中手动的 hrefLang（大写 L），改用页面级 metadata alternates | ✅ |
| 5 | Sitemap 数据不匹配 | 重写 generate-sitemap.js，categories 从 8 个更新为 13 个，products 更新为 79 个实际 SKU | ✅ |
| 6 | Sitemap trailing slash | 静态页面路径统一加 trailing slash | ✅ |
| 7 | Viewport / theme-color 缺失 | layout.tsx metadata 中添加 viewport 和 themeColor: #2873F5 | ✅ |
| 8 | featuredImages / featuredDescs | 更新为与实际产品 slug 匹配 | ✅ |

### 1.2 仍需修复的问题

| 优先级 | 问题 | 影响 |
|--------|------|------|
| P1 | `public/og-image.jpg` 不存在 | 社交分享显示破图，CTR 暴跌 |
| P1 | 79 个产品 OG 图片缺失 | 产品页分享无图 |
| P1 | 分类页无 OG 图片 | 分类页社交分享无图 |
| P2 | 产品/分类页无 keywords | 排名信号弱 |
| P2 | 产品/分类页 robots 不完整 | 爬虫控制不精确 |
| P2 | Payment success 页 metadata 太薄 | 转化追踪困难 |
| P3 | 无面包屑导航 | 用户体验 + 权重传递不足 |
| P3 | 无相关产品推荐 | 内链网络弱 |
| P3 | Schema.org Category 页缺 CollectionPage | 富媒体摘要机会流失 |

---

## 二、点击率（CTR）图片专项方案

### 2.1 图片缺口清单

| 位置 | 需求数量 | 尺寸 | 当前状态 | 解决方案 |
|------|---------|------|---------|---------|
| 首页 OG 图 | 1 张 | 1200×630 | ❌ 不存在 | AI 生成品牌宣传图 |
| 产品 OG 图 | 79 张 | 1200×630 | ❌ 7 张通用图循环 | 每产品 1 张场景图 |
| 分类 OG 图 | 13 张 | 1200×630 | ❌ 完全缺失 | 分类代表性产品拼图 |
| 产品卡片图 | 79 张 | 400×400 | ❌ 6 张通用图循环 | 每产品专属主图 |
| 文章封面图 | 20+ 张 | 1200×630 | ⚠️ 4 张存在 | 每篇文章 1 张主题图 |
| Blog 列表图 | 6 张 | 800×450 | ⚠️ 渐变占位 | 文章主题图缩略版 |

### 2.2 高点击率图片设计原则

1. **产品主图（400×400）**
   - 纯白/浅色背景，产品居中
   - 添加微妙阴影增加立体感
   - 关键卖点文字覆盖（如"防水""即日交貨"）
   - 使用品牌色点缀（#2873F5 蓝色）

2. **OG 社交分享图（1200×630）**
   - 左侧 60% 放产品实拍/场景图
   - 右侧 40% 放品牌色背景 + 大标题 + CTA
   - 必须包含品牌 Logo
   - 文字不超过 20%，避免 Facebook 压缩

3. **分类封面图（1200×630）**
   - 3-4 个代表性产品平铺拼图
   - 上方叠加分类名称大字
   - 底部加品牌条

---

## 三、Blog 内容生成策略（GEO 优化）

### 3.1 核心文章清单（20 篇）

| # | 主题 | 目标关键词 | 内链 SKU | 字数 |
|---|------|-----------|---------|------|
| 1 | 香港貼紙印刷完全指南 | 香港貼紙印刷、防水貼紙、透明貼紙 | waterproof-stickers, transparent-stickers, die-cut-stickers | 2500 |
| 2 | 名片設計的 10 個黃金法則 | 香港名片印刷、商務名片、高級名片 | premium-business-cards, foil-business-cards, spot-uv-business-cards | 2500 |
| 3 | 2024 包裝盒設計趨勢 | 包裝盒定制、禮品盒、食品包裝 | gift-boxes, cosmetic-boxes, food-boxes | 2500 |
| 4 | 宣傳單張印刷多少錢？ | 宣傳單張印刷、A4 傳單、派傳單 | a4-flyers, a5-flyers, double-sided-flyers | 2500 |
| 5 | 紙袋印刷選材指南 | 紙袋印刷、牛皮紙袋、禮品紙袋 | kraft-paper-bags, white-card-bags, gift-bags | 2500 |
| 6 | 海報印刷尺寸對照表 | 海報定制、A2 海報、戶外海報 | a2-posters, a1-posters, outdoor-posters | 2000 |
| 7 | CMYK vs RGB 印刷色彩詳解 | 印刷色彩、CMYK、色彩管理 | （通用） | 2000 |
| 8 | 印刷紙材選擇完全手冊 | 印刷紙張、銅版紙、特種紙 | （通用） | 2500 |
| 9 | 環保印刷：企業 ESG 必讀 | 環保印刷、可持續包裝、綠色印刷 | eco-business-cards, eco-flyers, eco-paper-bags | 2000 |
| 10 | 利是封設計與印刷指南 | 利是封印刷、定制利是封、新年紅包 | foil-red-packets, custom-red-packets, embossed-red-packets | 2000 |
| 11 | 年曆印刷：企業禮品首選 | 年曆印刷、座檯曆、掛曆 | wall-calendars, desk-calendars, custom-calendars | 2000 |
| 12 | 書籍印刷流程详解 | 書籍印刷、畫冊、騎馬釘 | catalog-printing, perfect-bound-books, hardcover-books | 2500 |
| 13 | 餐牌印刷設計要點 | 餐牌印刷、PVC 餐牌、菜單設計 | pvc-menus, laminated-menus, hardcover-menus | 2000 |
| 14 | 噴繪廣告材質對比 | 噴繪廣告、易拉架、戶外橫額 | roll-up-banners, outdoor-vinyl-banners, mesh-banners | 2000 |
| 15 | 信封印刷與品牌識別 | 信封印刷、商務信封、彩色信封 | business-envelopes, colored-envelopes, pearl-envelopes | 2000 |
| 16 | 校園印刷：學校採購指南 | 校園教育印刷、練習簿、證書 | exercise-books, certificates, school-flyers | 2000 |
| 17 | 如何選擇香港印刷公司 | 香港印刷公司、印刷報價、印刷服務 | （通用） | 2500 |
| 18 | 急件印刷：即日交貨秘訣 | 急件印刷、即日印刷、快速印刷 | same-day-business-cards, same-day-flyers | 2000 |
| 19 | 燙金工藝與應用場景 | 燙金印刷、燙金名片、燙金利是封 | foil-business-cards, foil-stickers, foil-red-packets | 2000 |
| 20 | 印刷報價單解讀指南 | 印刷報價、印刷成本、批量印刷 | （通用） | 2000 |

### 3.2 每篇文章结构模板

```
H1: [主标题，含核心关键词]
├─ 引言（150字）：痛点 + 承诺解决
├─ H2: 什么是 [主题]
│   └─ 定义 + 3个关键数据/统计
├─ H2: [主题] 的核心要素
│   ├─ H3: 要素1
│   ├─ H3: 要素2
│   └─ H3: 要素3
├─ H2: 如何选择 [主题]（表格对比）
│   └─ 4-6 行对比表格
├─ H2: [主题] 常见问题（FAQ Schema）
│   ├─ Q1 / A1
│   ├─ Q2 / A2
│   └─ Q3 / A3
├─ H2: 智印港 [主题] 服务优势
│   └─ 3-5 个 bullet point + 内链到对应 SKU
├─ H2: 立即獲取免費報價
│   └─ CTA 按钮 + WhatsApp 链接
└─ 结语（100字）：总结 + 行动号召
```

### 3.3 内链策略

每篇文章必须包含：
- 3-5 个产品页内链（锚文本含关键词）
- 1-2 个分类页内链
- 1 个联系/报价页内链
- 1-2 个相关文章内链

---

## 四、千问3.5 Prompt 模板库

### Prompt 1: 单篇 Blog 文章生成

```
你是香港顶级印刷行业内容营销专家，为"智印港 ZprintPro"（zprintpro.com）撰写SEO+GEO优化文章。

文章主题：[填入主题]
目标关键词：[填入3-5个关键词]
必须内链的产品SKU：[填入3个产品slug]
字数要求：2500字
语言：繁体中文

要求：
1. 使用H1/H2/H3层级结构
2. 包含1个对比表格
3. 包含3-5个FAQ（带Q/A格式）
4. 每300字自然植入1个产品内链，锚文本格式：<a href="/zh-hk/product/[slug]/">[关键词]</a>
5. 结尾有明确的CTA（WhatsApp: +86 181 2638 0255）
6. E-E-A-T原则：体现经验、专业、权威、可信
7. 目标让Google Gemini/ChatGPT在回答"[相关查询]"时引用本文

请直接输出完整的HTML格式文章内容（仅body内的article部分）。
```

### Prompt 2: 产品描述生成

```
你是香港印刷行业产品文案专家。为以下SKU生成完整的多语言详情页内容。

产品：[产品名]
分类：[分类名]
价格区间：[价格]
核心特性：[特性列表]

请生成：
1. 繁中/英文/日文 三个版本
2. 每个版本包含：
   - H1 标题（60字内，含关键词）
   - 副标题（一句话价值主张）
   - 详细描述（300字）
   - 5个卖点bullet points
   - 3个FAQ
   - CTA文案
```

### Prompt 3: 产品OG图生成

```
请生成一张电商产品主图，用于印刷服务网站。

产品：[产品名]
场景：[使用场景]
风格：专业电商摄影风格，白色背景，产品居中，微妙阴影
文字：右下角小字"智印港 ZprintPro"，左下角卖点标签"[卖点]"
色调：以产品本色为主，蓝色(#2873F5)点缀
尺寸：1200×630（OG图）或 400×400（产品卡）

要求：
- 高清、专业、有购买欲望
- 符合SEO图片alt描述要求
- 文件大小控制在200KB以内
```

---

## 五、分阶段执行指令

### Phase 1: 技术骨架 ✅ 已完成
- 死链修复、缺失页面、middleware、viewport、sitemap

### Phase 2: 内容与图片（当前阶段）

**Week 1-2: 核心内容**
1. 生成首页 OG 图（1200×630）
2. 生成前 5 篇核心 Blog 文章（繁中+英文+日文）
3. 生成前 20 个产品的 OG 图 + 卡片图
4. 填充 Contact / About / FAQ 页面详细内容

**Week 3-4: 批量内容**
1. 使用脚本批量生成剩余 Blog 文章
2. 批量生成剩余 59 个产品图片
3. 生成 13 个分类 OG 图

**Week 5-6: 高级 SEO**
1. 添加面包屑导航组件
2. 添加相关产品推荐组件
3. 完善 Schema.org（CollectionPage、ItemList、FAQPage）
4. 优化 Core Web Vitals

### Phase 3: 外链与持续优化

1. Google Business Profile 注册与优化
2. 香港本地目录提交
3. 社交媒体内容矩阵
4. 每月监控排名、更新内容、A/B测试图片

---

## 六、关键指标监控

| 指标 | 当前 | 3个月目标 | 6个月目标 |
|------|------|----------|----------|
| Google索引页面数 | ~285 | 400+ | 500+ |
| 核心关键词排名 | 未排名 | 前20 | 前10 |
| 有机流量（月） | ~0 | 1000+ | 5000+ |
| 页面加载速度(LCP) | ~3s | <2.5s | <2s |
| 社交分享CTR | 0% | 2%+ | 5%+ |
| 404错误数 | 15+ | 0 | 0 |

---

*本方案由 Kimi Code CLI + 千问3.5 联合生成*
*执行请按 Phase 顺序，先内容后外链*
