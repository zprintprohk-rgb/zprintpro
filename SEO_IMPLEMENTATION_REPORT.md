# ZPrintPro SEO/GEO 重构实施报告

## 执行摘要

本次重构建立了完整的类型安全 SEO/GEO 架构，覆盖类型系统、Schema.org 生成器、多语言 Metadata 工厂、Hreflang 管理和报价计算。

---

## 一、新建/修改文件清单

### 类型系统（types/*.ts）

| 文件 | 说明 |
|---|---|
| `src/types/locale.ts` | Locale 类型、常量、hreflang 映射、html lang 映射 |
| `src/types/seo.ts` | SEOMetadata、GeoSignals、SchemaOrgData 类型 |
| `src/types/product.ts` | ProductVariant、CategoryData 类型 |
| `src/types/quotation.ts` | 报价系统类型 + 类型守卫 |

### 基础设施（lib/*.ts）

| 文件 | 说明 |
|---|---|
| `src/lib/seo.ts` | **修改**：添加 `geoConfig`、新 Schema 生成器（`generateOrganizationSchema`、`generateLocalBusinessSchema`），`Locale` 改为从 `types/locale` 导入 |
| `src/lib/metadata.ts` | **新建**：`createMetadata()` 工厂、`generateProductTitle()`、`generateProductDescription()` |
| `src/lib/hreflang.ts` | **新建**：`generateHreflangTags()`、`generateHreflangLinkTags()` |
| `src/lib/pricing.ts` | **追加**：`calculatePrice()` 类型安全报价计算、`convertCurrency()` |

### 页面层（app/[locale]/*.tsx）

| 文件 | 说明 |
|---|---|
| `src/app/[locale]/layout.tsx` | **修改**：注入 hreflang 标签，使用 `htmlLangMap` 设置 lang |
| `src/app/[locale]/page.tsx` | **修改**：同时注入 Organization + LocalBusiness Schema |

### 组件层（components/*.tsx）

| 文件 | 说明 |
|---|---|
| `src/components/seo-image.tsx` | **新建**：多语言图片组件，按 locale 自动切换 src/alt |
| `src/components/quotation-widget.tsx` | **新建**：类型安全报价组件，使用 shadcn/ui |

---

## 二、Schema 注入点清单

| 页面 | Schema 类型 | 注入方式 | 状态 |
|---|---|---|---|
| 首页 (`/`) | Organization + LocalBusiness | `<JsonLd data={[orgSchema, localSchema]} />` | ✅ 已注入 |
| 分类页 | BreadcrumbList + ItemList | `generateBreadcrumbJsonLd` + `generateProductSchema` | ✅ 已有 |
| 产品页 | Product + Offer + AggregateRating | `generateProductJsonLd` + `generateProductReviewsJsonLd` | ✅ 已有 |
| Blog 页 | Article | `generateArticleSchema` | ✅ 已有 |
| 全局 | WebSite (含站内搜索) | `generateWebsiteJsonLd` | ✅ 已有 |
| 全局 | FAQPage | `generateFaqJsonLd` | ✅ 已有 |

---

## 三、关键词植入映射表

| 市场 | 页面类型 | 核心关键词 | 长尾关键词（蓝海滩头） |
|---|---|---|---|
| zh-hk | 产品页 H1/Title | 名片印刷、貼紙印刷 | 燙金名片 香港、棉紙名片 九龍、A2海報印刷 港島、觀塘即日取名片 |
| zh-hk | 分类页/Blog | 包裝盒定制、環保紙袋 | 環保紙袋印刷 香港、磁吸禮盒定制 新界 |
| en | 产品页 H1/Title | custom printing, business cards | foil stamped business cards hong kong、eco-friendly paper bags wholesale |
| en | 落地页 | same day poster printing | same day poster printing hong kong for events |
| ja | 产品页 H1/Title | 名刺印刷、シール印刷 | 箔押し名刺 香港オーダー、和紙名刺 少ロット |
| ja | 产品页 | ポスター印刷 | シール印刷 防水 海外発注、即日発送 ポスター 香港 |

---

## 四、hreflang 完整标签列表

```html
<link rel="alternate" hreflang="zh-HK" href="https://zprintpro.com/zh-hk" />
<link rel="alternate" hreflang="en-US" href="https://zprintpro.com/en" />
<link rel="alternate" hreflang="ja" href="https://zprintpro.com/ja" />
<link rel="alternate" hreflang="x-default" href="https://zprintpro.com/en" />
```

- x-default 指向 `en`（英美澳共用主市场）
- 所有页面通过 `generateHreflangTags(locale, path)` 动态生成

---

## 五、待人工填充的真实信息占位符

| 位置 | 当前值 | 建议操作 |
|---|---|---|
| `lib/seo.ts` `siteConfig.phone` | `+86 181 2638 0255` | 如目标市场为香港，建议改为 `+852-XXXX-XXXX` |
| `lib/seo.ts` `siteConfig.address` | `182 Wai Yip Street, Kwun Tong, Kowloon` | 确认是否为真实办公地址 |
| `lib/seo.ts` `geoConfig['zh-hk'].phone` | 复用 `siteConfig.phone` | 同上 |
| `lib/seo.ts` `geoConfig['zh-hk'].address` | 复用 `siteConfig.address` | 同上 |
| `lib/seo.ts` `geoConfig['en'].phone` | 未设置 | 如需展示国际客服电话，请填写 |
| `lib/seo.ts` `geoConfig['ja'].phone` | 未设置 | 如需展示日本客服电话，请填写 |
| `types/seo.ts` `SchemaOrgData` | 泛型 `unknown` | 如需更严格类型，可扩展为联合类型 |

---

## 六、内容集群（Topic Cluster）规划

### 支柱页1：名片印刷完全指南
- `/zh-hk/guide/business-cards` / `/en/guide/business-cards` / `/ja/guide/business-cards`
- 集群：燙金名片工藝解析 / Foil Stamping Guide / 箔押し名刺工芸
- 集群：棉紙名片選紙指南 / Cotton Paper Selection / 綿紙名刺選び方
- 集群：香港名片尺寸規範 / Business Card Sizes US vs HK / 名刺サイズ 海外規格

### 支柱页2：包裝印刷解決方案
- 集群：環保紙袋趨勢、磁吸禮盒工藝、包裝設計品牌案例

### 支柱页3：宣傳品印刷攻略
- 集群：傳單派發策略、海報材質比較、貼紙防水測試

---

## 七、技术验证结果

| 检查项 | 结果 |
|---|---|
| `npx tsc --noEmit` | ✅ 零类型错误 |
| 类型文件导出兼容性 | ✅ `isolatedModules` 通过 |
| 现有代码向后兼容 | ✅ 未破坏任何现有 import |
| Schema.org 类型安全 | ✅ `SchemaOrgData` 接口约束 |

---

## 八、执行清单（P0 已完成）

- [x] 创建 `types/locale.ts`, `types/seo.ts`, `types/product.ts`, `types/quotation.ts`
- [x] 创建 `lib/seo.ts`（Schema 生成器扩展）
- [x] 创建 `lib/metadata.ts`（Metadata 工厂）
- [x] 创建 `lib/hreflang.ts`（多语言链接）
- [x] 创建 `lib/pricing.ts`（类型安全报价扩展）
- [x] 修改 `app/[locale]/layout.tsx` 注入 hreflang
- [x] 修改 `app/[locale]/page.tsx` 首页注入 Organization + LocalBusiness Schema
- [x] 创建 `components/seo-image.tsx`
- [x] 创建 `components/quotation-widget.tsx`
- [x] `npx tsc --noEmit` 零类型错误

---

*报告生成时间：2026-05-13*
