# ZprintPro AI 生图提示词 v2（4 档 Style 决策树）

> **版本**：v2（2026-06-07）
> **作者**：Mavis 编排
> **基线**：v1 = 单一 Style A（爆炸价格标签）
> **目标**：4 档分档适配不同 SKU + 客单价 + 受众

---

## 0. TL;DR

**4 档 Style 决策树**：
- **A 爆炸价格标签**（60%）：现有风格保留 — 个人/快消/低决策
- **B 极简产品图**（15%）：B2B/企业/高单价
- **C 场景化生活图**（15%）：包装/礼品/海报/同人
- **D 技术规格图**（10%）：工业/标牌/规格驱动

**自动选型**：`scripts/seedream-prompt-router.js` 根据 SKU 类目 + 客单价自动选 Style。

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
multiple labels anywhere else. Foreground: physical product with visible
printed patterns, {LANG} aesthetic. Background: blurred retail scene.
Product occupies 75-85% of frame. --ar 1:1 --style raw --stylize 50
```

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
Soft studio lighting from upper-left, subtle shadow. No text overlay, no labels,
no watermarks, no decorations. Focus on material texture, craftsmanship details,
and color accuracy. Composition: product centered, occupies 50-60% of frame,
surrounded by negative space. Style: high-end commercial catalog photography,
Apple-product aesthetic, premium B2B feel. --ar 1:1 --style raw --stylize 30
```

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
Natural daylight, golden hour feel. {PRODUCT} visible but not dominant,
surrounded by context clues: {CONTEXT_ELEMENTS}. Style: lifestyle magazine
photography, candid, warm tones, slight film grain. No text overlay, no
watermarks. Composition: rule of thirds, depth of field, natural framing.
--ar 1:1 --style raw --stylize 80
```

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
({MATERIAL}), weight ({WEIGHT}). Right side: dimensional drawing with
arrows and measurements in mm. Bottom-right: certification badges
(ISO9001, FSC, etc.) if applicable. Style: technical datasheet,
engineering manual, clean technical illustration. No watermarks,
no decorative elements, no price tags. --ar 1:1 --style raw --stylize 20
```

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
