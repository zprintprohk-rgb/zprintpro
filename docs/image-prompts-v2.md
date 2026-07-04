# ZprintPro AI 生图提示词 v2（4 档 Style 决策树）

> **版本**：v2.1（2026-07-02 追加 v3 客户图案内容硬约束）
> **作者**：Mavis 编排
> **基线**：v1 = 单一 Style A（爆炸价格标签）
> **目标**：4 档分档适配不同 SKU + 客单价 + 受众
> **v3 强约束**：所有档位必须呈现真实客户图案内容，禁止空白印刷面（详见 §0.5）

---

## 0. TL;DR

**4 档 Style 决策树**：
- **A 爆炸价格标签**（60%）：现有风格保留 — 个人/快消/低决策
- **B 极简产品图**（15%）：B2B/企业/高单价
- **C 场景化生活图**（15%）：包装/礼品/海报/同人
- **D 技术规格图**（10%）：工业/标牌/规格驱动

**自动选型**：`scripts/seedream-prompt-router.js` 根据 SKU 类目 + 客单价自动选 Style。

---

## 0.5 【v3 全局硬约束】客户图案内容要求（2026-07-02 新增，user 反馈）

**踩坑**：v1 / v2 早期 prompt 偏向材质和工艺描述，AI 经常生成**空白印刷面**（空白的包装盒、空白的彩页、空白的贴纸），客户看不到「印完是什么样」，转化率低。

**硬规则（违反任何一条 = 该图作废）**：

### (A) 禁止空白印刷面

所有包装盒 / 彩页 / 贴纸 / 纸袋 / 名片 / 标贴 / 海报 / 书刊的**可印刷面**必须呈现真实可见的**客户内容**：

| 客户内容类型 | 必须包含 |
|---|---|
| 品牌 Logo | 公司 logo、产品系列徽标 |
| 装饰图案 | 插画、几何、渐变、IP 角色、产品照片 |
| 产品信息 | 品名、规格、配料、容量、产地 |
| 营销文案 | slogan、卖点、二维码、条形码 |
| 联系方式 | 电话、网址、IG、WeChat QR |
| 活动/节日元素 | event name、date、主办方 logo、CNY/圣诞元素 |

### (B) 不同品类的必含客户内容

| 品类 | 必含客户内容 |
|---|---|
| 名片 | 正面：logo + 姓名 + 职位 + 电话 + 邮箱；背面：服务介绍 + slogan + QR |
| 贴纸 | IP 角色 / 品牌 icon / slogan / 系列名 / 网址 |
| 包装盒 | 正面：产品名 + logo + 产品图；侧面：规格 + 容量 + 条码；背面：品牌故事 + QR |
| 彩页/宣传单张 | 活动名 + 日期 + 地点 + 主办方 logo + 主视觉 + QR 报名 |
| 纸袋 | 正面：logo + slogan；侧面：网址 / IG / 门店地址 |
| 标签 | 产品名 + 规格 + 容量 + logo + 条码 + 配料 |
| 书刊 | 封面：标题 + 作者 + 出版社 logo；可见内页排版示意 |
| 海报/喷画 | 主视觉 + 主标 + 副标 + 日期/时间/地点 + 主办赞助 logo |

### (C) 场景一致性

- 咖啡店 → 杯子/纸袋必须有咖啡品牌 + 价签 + takeaway 标签
- 礼品 → 包装盒必须有丝带/装饰/贺卡/品牌
- 美妆 → 包装必须有产品名 + 成分 + 容量 + 品牌 + 使用说明
- 餐饮 → 包装必须有菜品图 + 营养标签 + 品牌 + 过敏信息
- 活动 → 彩页/海报必须有 event name + date + 主办方 logo + 报名方式
- IP 周边 → 角色形象 + 系列名 + 版权信息 + 作者署名

### (D) 占位符约定

- ✅ 允许：`[BRAND_NAME]` `[PRODUCT_NAME]` `[PRICE]` `[PHONE]` 等语义清晰的占位
- ❌ 禁止：让 AI 自由生成 gibberish 文字、留白、或没有客户内容的"产品"

### (E) Kimi JSON 新增字段

```json
{
  "customer_content_required": true,
  "content_recipe": ["品牌 logo", "产品名称", "装饰图案", "营销 slogan", "联系方式 / 二维码"],
  "scene_consistency": "咖啡店 | 礼品 | 美妆 | 餐饮 | 活动 | IP 周边 | ..."
}
```

### (F) Seedream 脚本约束

`scripts/seedream-prompt-router.js` 与 `scripts/generate-seedream-*.js` 在生成 prompt 时，**必须自动追加** `customer_content_mandate` 字段（在变量替换之后、输出之前）。

### (G) 验证标准（生成后自查）

- ✅ 印刷品表面可识别至少 3 类客户内容（logo / 图案 / 文字）
- ✅ 内容与产品定位场景一致（礼品内容不出现在工业标牌）
- ✅ 不出现空白印刷面
- ✅ 不出现 gibberish 文字（占位符除外）

---

## 1. Style A：爆炸价格标签（保留现有，60%）

**适合**：贴纸 / 低端名片 / doujinshi / 同人 / 电商首页

**视觉特征**：
- 鲜艳爆炸价签（neon pink/red explosion price tag）
- 物流印章（SF Express waybill 24H 印章）
- 高对比度商业摄影
- 双语文字（繁中 + EN/JA）

**Midjourney 模板**：
```text
1:1 ratio, 2048x2048 ultra-high-definition e-commerce hero image.
Top-right single burst label with bright vivid red (#DC2626) background,
white bold text, white thin stroke outline. Label main: {PRODUCT}｜From ${PRICE},
sub: Hot Sale · Free Design. No other text, gibberish, watermarks, or
multiple labels anywhere else. Foreground: physical product showing visible
customer content on its printable surface (per v3 §0.5 mandate): clearly
recognizable brand logo, product name, decorative pattern, marketing slogan,
contact info / QR code. {LANG} aesthetic. Background: blurred retail scene.
Product occupies 75-85% of frame. --ar 1:1 --style raw --stylize 50
```

> ⚠️ v3 强制：原模板"physical product with visible printed patterns"过于抽象，AI 会生成纯几何图形。改为明确的客户内容清单（logo / 产品名 / slogan / QR），让客户看到"印完什么样"。

**Kimi 2.6 JSON 模板**：
```json
{
  "tool": "generate_image",
  "style": "A_explosion",
  "parameters": {
    "prompt_seo_optimized": "...",
    "image_size": "2048x2048",
    "quality": "8K",
    "negative_prompt": "text errors, blurry, dull colors, dark shadows, low resolution, fake 3D, cartoon, watermark defects, multiple labels",
    "target_audience": "HongKong_B2C_Printing_Clients"
  }
}
```

---

## 2. Style B：极简产品图（新增，15%）

**适合**：B2B 名片 / 标签 / 吊牌 / 企业采购 / 高单价（>HK$500）

**视觉特征**：
- 干净背景（米白/浅灰/深灰）
- 静物特写（无爆炸标签，无价格印章）
- 极简文字（产品名 + SKU 即可）
- 高级感（professional/corporate）
- 留白（40-50% 空白）

**Midjourney 模板**：
```text
1:1 ratio, 2048x2048 ultra-high-definition minimalist product photography.
Single {PRODUCT} placed on clean {BACKGROUND_COLOR} background (#F5F5F0 or #FAFAFA).
Soft studio lighting from upper-left, subtle shadow. NO extra overlay text,
watermarks, or external decorations on the image. The {PRODUCT} ITSELF must
display realistic customer content printed on its surface (per v3 §0.5 mandate):
brand logo, contact info (name / phone / email / title), and decorative pattern —
demonstrating real finished-product appearance. NOT a blank printable surface.
Focus on material texture, craftsmanship details, and color accuracy.
Composition: product centered, occupies 50-60% of frame, surrounded by negative space.
Style: high-end commercial catalog photography, Apple-product aesthetic,
premium B2B feel. --ar 1:1 --style raw --stylize 30
```

> ⚠️ v3 强制：原模板"No text overlay, no labels, no decorations"让 AI 生成空白产品。明确改为「产品本身要展示客户设计稿内容（logo + 联系人 + 装饰），禁止空白印刷面」。

**Kimi 2.6 JSON 模板**：
```json
{
  "tool": "generate_image",
  "style": "B_minimalist",
  "parameters": {
    "prompt_seo_optimized": "...",
    "image_size": "2048x2048",
    "quality": "8K",
    "negative_prompt": "text, labels, watermarks, decorations, busy background, multiple objects, cartoon, blurry",
    "target_audience": "HongKong_B2B_Enterprise_Procurement"
  }
}
```

---

## 3. Style C：场景化生活图（新增，15%）

**适合**：包装 / 礼品 / 海报 / 大型喷画 / doujinshi（同人志）

**视觉特征**：
- 真实使用场景（咖啡店 / 办公室 / 礼品场合 / 漫展）
- 多元素组合（产品 + 使用者 + 环境）
- 叙事感（讲故事，不只是产品图）
- 自然光（vs 棚拍）
- 品牌情感连接

**Midjourney 模板**：
```text
1:1 ratio, 2048x2048 lifestyle photography.
{SCENE_DESCRIPTION} featuring {PRODUCT} in {LANG} cultural context.
Natural daylight, golden hour feel. {PRODUCT} clearly visible in scene with
realistic customer content on its printable surface (per v3 §0.5 mandate):
brand logo, product name, decorative pattern, marketing slogan, contact
info / QR code. Product visible but not dominant, surrounded by context
clues: {CONTEXT_ELEMENTS}. The product must show brand identity, not appear
as a blank/generic item. Style: lifestyle magazine photography, candid,
warm tones, slight film grain. No text overlay, no watermarks. Composition:
rule of thirds, depth of field, natural framing. --ar 1:1 --style raw --stylize 80
```

> ⚠️ v3 强制：原模板"{PRODUCT} visible but not dominant"是抽象描述，AI 经常生成空白产品置于场景中。明确产品表面必须呈现品牌身份（logo + slogan），场景中可见、可识别。

**场景示例**：
- 包装：咖啡店礼盒场景，顾客提着纸袋
- 礼品：节日礼品堆叠场景
- 海报：活动现场张贴场景
- 同人：漫展摊位 doujinshi 展示

**Kimi 2.6 JSON 模板**：
```json
{
  "tool": "generate_image",
  "style": "C_lifestyle",
  "parameters": {
    "prompt_seo_optimized": "...",
    "image_size": "2048x2048",
    "quality": "8K",
    "negative_prompt": "studio lighting, white background, text, labels, watermarks, product-only, sterile",
    "target_audience": "HongKong_B2C_Gift_And_Lifestyle"
  }
}
```

---

## 4. Style D：技术规格图（新增，10%）

**适合**：标牌 / 工业贴纸 / 警告标签 / 规格驱动产品

**视觉特征**：
- 1:1 产品正面（orthographic projection 强制）
- 尺寸标注（mm/inch 标注线）
- 材质规格（厚度/克重/材料）
- 工程图风格（白底黑线 + 实际图混合）
- ISO/认证标志（如有）

**Midjourney 模板**：
```text
1:1 ratio, 2048x2048 technical specification image.
{PRODUCT} centered on pure white background (#FFFFFF).
Orthographic projection (no perspective distortion). Top-left corner:
specification label showing dimensions ({DIMENSIONS}), material
({MATERIAL}), weight ({WEIGHT}). The {PRODUCT} surface displays realistic
sample customer content (per v3 §0.5 mandate): brand logo, sample design
pattern, regulatory info, certification text — NOT a blank printable surface.
Right side: dimensional drawing with arrows and measurements in mm.
Bottom-right: certification badges (ISO9001, FSC, etc.) if applicable.
Style: technical datasheet, engineering manual, clean technical illustration.
No watermarks, no decorative elements, no price tags. --ar 1:1 --style raw --stylize 20
```

> ⚠️ v3 强制：技术规格图也要展示客户内容（样例 logo + 设计图案），而不是空白版面。让客户一眼看出"印出来是这种效果"。

**Kimi 2.6 JSON 模板**：
```json
{
  "tool": "generate_image",
  "style": "D_technical",
  "parameters": {
    "prompt_seo_optimized": "...",
    "image_size": "2048x2048",
    "quality": "8K",
    "negative_prompt": "perspective, decorative, text errors, watermarks, blurry, low contrast, busy",
    "target_audience": "HongKong_B2B_Industrial_Procurement"
  }
}
```

---

## 5. 决策树（自动选型）

由 `scripts/seedream-prompt-router.js` 实现：

```
SKU 类目 + 客单价 + 受众 → Style
├─ 贴纸 + <HK$200 + 个人 → A
├─ 同人/doujinshi → A 或 C（按场景）
├─ 名片 + >HK$500 + 企业 → B
├─ 标签/吊牌 + B2B → B
├─ 包装 + >HK$300 + 礼品 → C
├─ 海报/喷画 + 活动 → C
├─ 标牌/工业 + 规格 → D
└─ 默认 fallback → A
```

**类目 → Style 映射**（zprintpro 8 大分类）：

| 类目 | 默认 Style | 例外规则 |
|---|---|---|
| 贴纸 | A | — |
| 标签 | B | 食品标签 → D（规格）|
| 卡片 | A | >HK$500 企业名片 → B |
| 书刊 | C | — |
| 包装 | C | <HK$200 → A |
| 大型喷画 | C | — |
| 文具 | A | — |
| 宣传品 | A | 创意/IP → C |
| 标牌/特殊 | D | — |

---

## 6. 实施步骤

1. **复制 Style A 模板**到 `image-prompts-v2.md`（已有）
2. **追加 Style B/C/D 模板**到 `image-prompts-v2.md`
3. **修改 `seedream-prompts-all-skus.txt`**，给每个 SKU 加 `style:` 字段
4. **运行 `seedream-prompt-router.js`** 自动给存量 SKU 分配 Style
5. **批量重新生成**（先跑 P0 15 个任务验证）

---

## 7. 验证标准

- ✅ 4 档 Style 视觉差异明显（不混档）
- ✅ 决策树 100% 覆盖 79 SKU
- ✅ 跑 5-10 个 SKU 对比 v1 效果
- ✅ Style B/C/D 客单价/类目准确率 ≥ 90%

---

## 8. 与 v1 对比

| 维度 | v1 | v2 |
|---|---|---|
| Style 数 | 1 | 4 |
| 适配 SKU | 100% A | 60/15/15/10 |
| 客单价覆盖 | 低-中 | 全档 |
| 客群覆盖 | B2C | B2C + B2B + 工业 |
| 决策 | 人工 | 决策树自动 |
| 维护 | 一刀切 | 按 SKU 优化 |

---

**v2 升级完成 = 提示词层的市场精准化**。配合 W2 的水印去除（OpenCV），形成完整"4 档视觉 + 零水印"的高质量图库。
