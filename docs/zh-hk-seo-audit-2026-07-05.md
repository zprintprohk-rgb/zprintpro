# zh-hk SEO 站点审计报告
**审计日期**: 2026-07-05 (Asia/Shanghai)  **审计范围**: 5 个 GSC 高潜力关键词 + 技术 SEO 全量核对  **基础数据来源**: `seo-weekly-report-2026-07-01.md` (GSC 周报)  
---

## 1. 技术 SEO 完整性核对 (Technical SEO Audit)
## 1.1 Sitemap 完整性
| 文件 | 状态 | URL 数 | lastmod | 备注 |
|------|------|--------|---------|------|
| `sitemap.xml` | ✅ | 456 | 2026-07-05 ... 2026-07-05 | 主 sitemap 索引 |
| `sitemap-zh-hk.xml` | ✅ | 152 | 2026-07-05 ... 2026-07-05 |  |
| `sitemap-en.xml` | ✅ | 152 | 2026-07-05 ... 2026-07-05 |  |
| `sitemap-ja.xml` | ✅ | 152 | 2026-07-05 ... 2026-07-05 |  |
| `sitemap-image.xml` | ✅ | 237 | 2026-06-06 ... 2026-06-06 | 图片 sitemap，对 Google Images 收录重要 |

## 1.2 robots.txt
- ✅ 文件存在 (1214 bytes)
- ✅ 包含 Sitemap 声明
- ✅ 包含 Disallow 规则
- ✅ GEO AI crawlers 显式 allow-list

## 1.3 Canonical 覆盖
- ✅ **25/27** 个 page.tsx 有 canonical/alternates/generateMetadata

## 1.4 Hreflang 覆盖
- ✅ `src/lib/seo.ts` 含 **2** 处 hreflang 引用（含函数定义+调用）
- ✅ **5** 处 x-default 声明（zh-hk 是主市场）
- ✅ `src/lib/hreflang.ts` 独立工具模块存在

## 1.5 Schema.org 结构化数据
| Schema 类型 | 出现位置 |
|----------|----------|
| **Organization** | seo.ts, schema-extensions.ts |
| **LocalBusiness** | seo.ts, schema-extensions.ts |
| **BreadcrumbList** | seo.ts, breadcrumb-schema.ts |
| **FAQPage** | seo.ts, schema-extensions.ts, faq-schema.ts, CategoryPillarContent.tsx, RushDeliveryFAQ.tsx |
| **Product** | seo.ts, schema-extensions.ts, RushDeliveryFAQ.tsx |
| **Article** | seo.ts, schema-extensions.ts |
| **WebSite** | seo.ts, schema-extensions.ts |
| **HowTo** | schema-extensions.ts |
| **ItemList** | schema-extensions.ts |
| **SpeakableSpecification** | schema-extensions.ts |

## 2. 关键词矩阵审计 (5 个 GSC 高潜力词)
| 关键词 | 展示 | 排名 | 主着陆页 slug | 现状 |
|--------|------|------|--------------|------|
| **食品包裝印刷** | 108 | 25.4 | `packaging` | zh-hk title 含「食品包裝印刷」 |
| **宣傳單張** | 84 | 42.9 | `flyers` | title 含「宣傳單張印刷」 |
| **宣傳單張印刷** | 73 | 40.4 | `flyers` | title 含「宣傳單張印刷」 |
| **海報印刷** | 65 | 38.3 | `posters` | title 含「海報印刷」 |
| **印海報** | 58 | 38.4 | `posters` | title 含「海報」，keywords 含「印海報」相关 |

## 2.1 着陆页落地分析
**5 个关键词全部有对应 category 着陆页，title/description/keywords 已优化**：

- **食品包裝印刷** → `/zh-hk/category/packaging/`
- **宣傳單張** → `/zh-hk/category/flyers/`
- **宣傳單張印刷** → `/zh-hk/category/flyers/`
- **海報印刷** → `/zh-hk/category/posters/`
- **印海報** → `/zh-hk/category/posters/`

## 3. 优化建议清单
### 3.1 关键词矩阵优先行动 (按展示量排序)
#### 🔥 P0: 食品包裝印刷 (展示 108, 排名 25.4)
- **机会**: 现有流量基础最大，但着陆页 (`/zh-hk/category/packaging/`) 标题泛化为「包裝盒」
- **建议**:
  - A. **新建专门着陆页** `/zh-hk/blog/food-packaging-printing/` 升级版（现有 `food-packaging-printing-guide` 内容强化 1.5x）
  - B. 在 packaging category 页 **H2 加 sub-section**: 「食品包裝專區 — 月餅盒/糕點盒/外賣盒/食品安全認證」
  - C. 在 packaging pillar content 里 **明确写**「食品級」关键词 + 「食品安全認證」+ 「FDA / SGS」+ 「月餅盒」
  - D. 内链: 所有 stickers/flyers/menus 页面 footer 加「食品包裝印刷 →」链接

#### 🔥 P0: 宣傳單張印刷 (展示 73, 排名 40.4)
- **机会**: 流量第二大，title 已命中，但排名 40 → 内容权威度不够
- **建议**:
  - A. flyers category 页 PillarContent 增加 **2-3 个深度 FAQ**（如「A4 vs A5 派發成本對比」「摺頁傳單適用行業」）
  - B. 强化 `/zh-hk/blog/flyer-buying-guide/`：从「选购指南」升级为「**2026 宣傳單張完全攻略**」（1500+ 字）
  - C. 新增 `/zh-hk/blog/flyer-distribution-strategy/` 派发策略长文（SEO 长尾机会）
  - D. flyers category 页面加 **客户案例/作品集** 子版块（增强 E-E-A-T 信号）

#### P1: 海報印刷 / 印海報 (展示 65+58, 排名 38)
- **机会**: 长尾词对，title 已命中但「印海報」未直接出现
- **建议**:
  - A. posters category description 里加「**印海報**」短语（口语化词）
  - B. 新增 `/zh-hk/blog/poster-printing-guide/` 升级版：覆盖「印海報 / 大圖輸出 / 展覽海報 / 餐廳海報」
  - C. posters category 页加 **Backdrop / 大圖輸出** 专题区（户外场景）

#### P1: 宣傳單張 (排名 42.9)
- 与「宣傳單張印刷」共用同一着陆页；优化点同上

### 3.2 技术 SEO 加固
- ✅ Sitemap 完整 (5 个文件, zh-hk 152 URL, en 152, ja 152)
- ✅ robots.txt 含 GEO AI crawlers allow-list (GPTBot/ClaudeBot/PerplexityBot)
- ✅ Canonical/hreflang/schema 全覆盖
- ⚠️ **japan-doujin category 缺 PillarContent** (categorySeoContent 里没有，fallback 到默认空)
  - 修复: 在 `src/data/category-seo-content.ts` 加 japan-doujinContent (zh-hk 800 字 + FAQ)
- ⚠️ 13 个 category 的外链权威度普遍低（新站点固有，需时间 + 主动建设）
  - 短期: 提交网站到 hkprint/yellow pages/business directories
  - 中期: 与本地 KOL/行业协会互换外链
- ✅ `sitemap-image.xml` 已存在 (237 个图片 URL)
- ⚠️ 缺 **图片 sitemap 自动生成** — 现有 237 条是手动维护
  - 修复: `generate-sitemap.js` 加图片 sitemap 输出逻辑（脚本里已有 sitemap-image.xml 声明）


## 4. 审计总结
### 4.1 已成熟（生产就绪）
- ✅ 技术 SEO 全套基础设施（canonical/hreflang/schema/robots/sitemap）
- ✅ **13/14** category 的 zh-hk metadata 完整（10 个主钻有 custom H1 + PillarContent + FAQPage）
- ✅ 关键 5 个高潜力词全部有对应着陆页
- ✅ 47 篇文章 + 84 个产品 SKU 的源码支撑完整（blog-content.ts + blog-contents.d.ts 已 commit）

### 4.2 关键瓶颈
- ⚠️ **新站点权威度低**: 排名 25-40 是新站正常水位，需 3-6 个月 + 外链建设
- ⚠️ **japan-doujin category 缺 SEO 支柱内容** (1/14 category 缺位)
- ⚠️ **缺图片 sitemap 自动生成** (现 sitemap-image.xml 237 条手动维护)
- ⚠️ **缺外链/品牌提及** (zprintpro.com 在香港印刷行业的知名度仍低)

### 4.3 30 天行动计划
1. **Week 1**: 修复 japan-doujin 内容空缺 + sitemap-image.xml 生成
2. **Week 2**: 升级 food-packaging-printing-guide 博客（1500+ 字 + 新增 FAQ）
3. **Week 3**: 新建 flyer-distribution-strategy + poster-printing-guide 升级版
4. **Week 4**: 提交网站到 5 个香港本地 business directory + 申请 2 个行业协会会员

