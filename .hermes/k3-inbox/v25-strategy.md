# V25 US-DTC Hybrid Strategy — 2026-08-24

**作者**: Mavis (PM/项目负责人视角)
**任务**: 分析 V20.0 → V24.2 R2 演进链路 + 联网核实 zprintpro.com + US 市场生图审美 → 设计 V25 US-DTC 终极 prompt

---

## Part 1: V20.0 → V24.2 R2 演进链路分析 (6 阶段 + 关键决策)

### V20.0 (Initial baseline, 79 SKU × 3 locale = 237 prompts)
**来源**: 用户上传的 `seedream-prompts-all-skus.txt` (2026-04-26 修过 JA)

**好的部分 (要保留)**:
- ✅ 1:1 比例 + 8K 描述 (豆包生成 4K raw, 我们 q=95 重编码到 ≥1MB)
- ✅ Top-right red burst label 模式 (#DC2626, 白色粗体, 3px stroke)
- ✅ 真实客户内容印在产品表面 (品牌名 / 产品名 / 成分表 / 净含量 / 条形码 / 环保标志)
- ✅ Anti-garbage 显式声明 (其他文字/乱码/水印/品牌名/多标签全禁)
- ✅ 75-85% 画面占比 (与 Amazon 85% 标准一致)
- ✅ 电影写真质感 (cinematic photo-real)
- ✅ 行业适配列表 (零售精品/美妆护肤/跨境电商品牌升级)
- ✅ "辅助生图描述" 创新: 第二行告诉 AI 真正想要什么 (符合市场审美的彩色印刷)

**问题 (要修)**:
- ❌ "ZprintPro" 出现在 prompt body (K3 8/24 拍板撤掉)
- ❌ "#DC2626" 颜色代码在 body (技术参数会渲染成文字)
- ❌ "PingFang HK Bold" 字体名 (模型不认识)
- ❌ 中英混杂 ("no 粘连" "产品实物展示")
- ❌ 背景重复 ("blurred modern business office, warm yellow desk lamp and leather notebook" 对所有 BC SKU)
- ❌ JA prompt 用英文描述 (问题已修 V20.1)
- ❌ 价格只用 SELLING_POINTS, 没用 products.ts 真实价格

**核心洞察**: V20.0 的 "印客户真实内容" 设计 (品牌名/产品名/成分表/净含量/条形码) 是**让图看起来信真的关键**,不是营销词。K3 8/24 拍板"信真"指的就是这个。

### V20.1-V20.9 (JA 修复, 无重大变化)
- JA 改用本地化 kanji/hiragana/katakana
- 修复部分断句

### V21 (我没看到完整文件, 但应该是 SKU 扩展)
- 99 SKU 取代 79 SKU
- 加更多类别

### V22 (12 字段多行产品描述黄金)
**关键升级**:
- ✅ 加 products.ts 12 字段解析: name / description / features[7] / specs.{material, size, printMethod, finishing} / price_range / basePrice / minQuantity / weight_score / turnaround
- ✅ 多行产品描述 (让 AI 知道产品具体规格)
- ✅ Review-2026-08-22 K3 拍板

**问题**:
- 仍含真实品牌 "ZprintPro" (V20 时代)
- 字符数 1800-2400 (K3 8/22 后说超 2300)
- 4 视图分工不清晰

### V23 (4 硬伤修复 + 16 类目差异化)
**关键升级**:
- ✅ Fix 1: AUDIENCE 断句 (一句话一个受众)
- ✅ Fix 2: 串类目 (每个 SKU 只描述自己的类目)
- ✅ Fix 3: seo_filename 缺失 (V24 修复)
- ✅ Fix 4: alt 断句
- ✅ 16 categories × 4 fictional client brands 轮转 (Hive Packaging / Maplewood Studio / BriteMark 等)
- ✅ 16 categories × per-locale 背景 / 真实小字元素

**洞察**: fictional client brand (非 ZprintPro) 印在产品表面 是 V23 最大创新 — 让图视觉有变化,不让每个 SKU 都长一样。

### V23.5 simplified (显式 Foreground/Background 分段)
**关键升级**:
- ✅ 显式 Foreground/Background 分段结构
- ✅ 2100-2500 chars
- ✅ 3 locale 独立色彩策略 (US Quiet Luxury / JA 侘び寂び / zh-hk 吉祥暖調)
- ✅ Branded search 锚文本 (ZprintPro 智印港)
- ❌ V23.5.1 之前 JA zh-hk 出现 dim/cloudy/muddy 缺陷

### V23.5.1 (HK 爆炸贴回归 + BRIGHT vivid)
**关键升级**:
- ✅ BRIGHT vivid 修复 dim/overcast/muddy
- ✅ HK 爆炸贴右上角回归 (V20 时代)
- ✅ JA/zh-hk 净化 (移除 196/222 英文 token)

### V24 (3 locale HERO 各 2-3 卖点)
**关键升级**:
- ✅ 16 类目 × 3 卖点 × 3 locale = 144 entries
- ❌ 2700 chars 超 2300 限制

### V24.1 (JA/zh-hk 翻译成纯本地化)
**关键升级**:
- ✅ JA 196 → 17 英文 token (91% 净化)
- ✅ zh-hk 222 → 13 英文 token (94% 净化)
- ❌ EN 仍 2717 chars 超 2300

### V24.2 (≤2300 chars, V20 2 行结构回归)
**关键升级**:
- ✅ V20 黄金 2 行结构 (视觉 spec + 市场审美 hint)
- ✅ 严格 ≤2300 chars
- ❌ 仍含真实品牌 "ZprintPro" (K3 8/24 拍板撤掉)
- ❌ 仍没有 V22 12 字段 (V20 精简过度)

### V24.2 R2 (当前 SSoT, K3 8/24 拍板)
**关键升级**:
- ✅ ZprintPro/智印港/ジープリント 不出现在生图 (parse_skus 清洗 products.ts 残留)
- ✅ V22 12 字段多行产品描述回归 (产品/材质/尺寸/印刷/后加工/特色/价格/起印量/交期/描述)
- ✅ 16 类目 × 4 fictional client brands 印产品表面
- ✅ 16 类目 × per-locale 背景 / 真实小字元素
- ✅ Per-locale 色彩策略 + 1 句 anti-garbage + 1 句 negative
- ✅ 4 视图分工 (HERO/DETAIL/VARIETY/MULTI-ANGLE)
- ✅ 1188 prompts 全部 ≤2300 chars
- ✅ 4 张挑战图 (BC-001/BN-001/RP-001/DJ-001) 4K 实图 PASS

**V20 → V24.2 R2 保留率**:
- V20 黄金 (1:1 8K / 真实信息印产品表面 / 电影写真 / 75-85% 画面占比 / 行业适配) = **100% 保留**
- V22 12 字段 = **100% 回归**
- V23 fictional client brand = **100% 保留**
- V23.5.1 BRIGHT vivid = **100% 保留**
- V24.1 净化 JA/zh-hk 英文 token = **100% 保留**
- V20 真实品牌策略 = **0% 保留 (撤回, 改 fictional)**

---

## Part 2: US 市场深度调研

### zprintpro.com 现状 (2026-08-24 实测)

**搜索 "zprintpro.com"** 默认返回 zh-hk 实体:
- 智印港 ZprintPro | 香港印刷服務 — 全球 72 小時交貨
- 香港專業印刷 · 一站式定制服務
- 30秒 AI 即時報價 · ISO 9001 認證 · 深圳實體工廠 · FSC 認證紙
- 主要产品: 纸袋/宣传单张/贴纸/包装盒/海报/校园印刷
- 3hr 急件印刷 · 港九新界 $500+ 免費速遞
- **EN 版需手动访问 /en/ 路径** (next-intl as-needed 模式)

**真实主体 (per K3 §0 user_profile)**: 深圳市彩龍印刷包裝有限公司 / 真实地址深圳龍崗 / 198 8085 1334 / zprintpro@outlook.com

**核心痛点**: zh-hk 是默认, US 用户搜不到也看不懂。需要 EN 版本独立 SEO/GEO 优化。

### Amazon US 2026 标准 (硬约束)

**搜索 "Amazon US product photography 2026"** 多源验证:

| 项 | 标准 | V24.2 R2 现状 |
|---|---|---|
| 主图背景 | **纯白 RGB 255,255,255** (Amazon 2026 严格执行, off-white 也会被拒) | ❌ 模糊场景背景 (US DTC unboxing 等) |
| 产品占画面 | ≥85% | ✅ 75-85% |
| 主图文字/水印 | **NO text, logos, watermarks, borders, color blocks** | ❌ 右上角红色 burst label + 产品表面小字 |
| 多视角合成 | NO (main image = single view) | ❌ MULTI-ANGLE 试图做 3 视角合成 |
| 分辨率 | 推荐 2000×2000 px (最小 1600 for zoom) | ✅ 4K 4096×4096 + 1200×1200 webp |
| 文件格式 | JPEG (PNG/TIFF/GIF 也可, **WebP NOT accepted**) | ⚠️ WebP (CF Pages + zprintpro.com 用 OK, 但若上 Amazon 需转) |
| 色彩空间 | sRGB | ✅ |
| 真实摄影 | **必须实拍, 禁止 AI 生成的 main image (Amazon AI 检测 physical authenticity)** | ❌ 全是豆包 AI 生成 |
| Apparel | 站立人体模特 (no 坐着/跪着/斜靠) | N/A (我们不卖 apparel) |
| 鞋子 | 45度角朝左 | N/A |

**结论**: zprintpro.com 不是 Amazon, 是 DTC 站。**这套标准只适用如果我们上 Amazon**。**zprintpro.com 可以用 lifestyle / 模糊背景 / 含文字** — 这是 V24.2 R2 当前设计,正确。

### 7-image 公式 + 3-second rule (US 转化黄金法则)

**搜索 "Amazon Product Photography 7 Image Formula"**:

| Slot | 用途 | 我们的 4 视图对应 |
|---|---|---|
| 1. HERO | 阻停滚动 (3 秒决定) | ✅ HERO (产品主图) |
| 2. Context | 显示规模/使用 | ⚠️ DETAIL (材质/纹理) — 应是 hand 持产品 / 比例参考 |
| 3. Lifestyle | 创造欲望 | ❌ 没专门视角 |
| 4. Infographic | 沟通关键利益 (3-5 文字 + icons) | ❌ 没专门视角 |
| 5. Detail | 质量信心 (特写) | ✅ DETAIL |
| 6. Comparison | 差异化 (vs 竞品/选项) | ❌ 没专门视角 |
| 7. Social proof | 信任强化 (UGC/评价) | ❌ 没专门视角 |

**Polarizing Elements Framework** (优化 hero image CTR 的 7 元素, 至少 1 个):

1. **Unexpected Angle**: 3D 角度 15-20° (vs 平面前视图) — V20 "slight angled perspective" 已有
2. **Scale Disruption**: 手持产品 / 旁边放熟悉物体 (手机/咖啡杯) — V24.2 R2 DETAIL 缺少
3. **Color Pop**: 饱和色 vs 白色海洋 (包装色对比强烈) — V24.2 R2 BRIGHT vivid 已有
4. **Motion Implication**: 液体流动 / 蒸汽上升 / 动作中产品 — V24.2 R2 缺
5. **Arrangement Architecture**: 多件套用 hierarchy (扇形/堆叠/分层) — VARIETY 接近
6. **Lifestyle Hint**: 微妙背景 (瑜伽垫微展 / 厨师刀带一片切片) — V24.2 R2 模糊场景有
7. **Packaging as Hero**: 礼品装季节包装 — 季节性 SKU (贺卡/红包) 适用

**3-second rule**: 2.6 秒决定点击。Hero image 必须**瞬间**说清:
- 这是什么产品 (5 大类目视觉特征)
- 什么场景用 (US 用户能识别的场景)
- 为什么值得 (3-5 字价值主张)

### DTC 网站 vs Marketplace 区别

| 项 | Marketplace (Amazon/eBay) | DTC 网站 (zprintpro.com) |
|---|---|---|
| 主图 | 必须纯白 + 单视角 | **lifestyle/场景 + 多角度合成允许** |
| 文字 | 主图禁, 二图限 | **可以, 提升 SEO** |
| 文件 | JPEG only | WebP/AVIF (CF Pages 优化) |
| 缩略图 vs 全图 | 缩略图 CTR 关键 | 详情页 CTR + 滚动 |
| 视觉风格 | "标准化" (平台规范) | "品牌化" (你的品牌) |

**zprintpro.com 是 DTC 站** → V24.2 R2 lifestyle 设计正确。

---

## Part 3: V24.2 R2 三大硬伤 (针对 US 市场)

### 硬伤 1: 价格不一致
- SELLING_POINTS 用 $0.5-1.3 (类目级别, 粗略)
- products.ts.price_range 用 HK$ (实际, 真实)
- BC-001 US 图用 $0.2-0.8 ✓
- BN-001 US 图用 HK$12-55 ❌ (应该 USD)
- DJ-001 EN 图用 ¥7,500 ❌ (ja SKU, 不是 US)

**修法**: 用 products.ts.basePrice_en 字段 (e.g. `basePrice_en: 0.13` for BC-001), 每个 SKU 自己 USD 价格。

### 硬伤 2: 没告诉 AI "图用在哪里 + 谁看"
- 现在 prompt 只说 "1:1 8K e-commerce product photo"
- 缺 US 目标用户画像: "for US cross-border DTC shoppers browsing zprintpro.com /en/ product pages, expecting premium Quiet Luxury aesthetic"
- 缺图用途: "for product detail page hero image on zprintpro.com /en/"

**修法**: 加 1 句 US 目标用户 + 1 句图用途。

### 硬伤 3: Polarizing Elements 缺 4-5 个
- Color Pop ✅ (BRIGHT vivid)
- Lifestyle Hint ✅ (模糊场景)
- Packaging as Hero ❌ (季节性 SKU 应强化)
- Scale Disruption ❌ (DETAIL 缺手 / 比例)
- Motion Implication ❌ (VARIETY 缺动作暗示)
- Arrangement Architecture ❌ (多件套 SKU 缺)
- Unexpected Angle ⚠️ (15-20° 角度未明确)

**修法**: 4 视图分工按 Polarizing Framework 重新设计:
- HERO: Color Pop + Lifestyle Hint + Packaging as Hero
- DETAIL: Scale Disruption (hand) + Detail texture
- VARIETY: Arrangement Architecture + Motion Implication
- MULTI-ANGLE: Unexpected Angle + Multi-view composite

---

## Part 4: V25 US-DTC Hybrid 设计

### 4 大核心原则
1. **US 目标用户明确**: "US cross-border DTC shopper, premium Quiet Luxury"
2. **图用途明确**: "For zprintpro.com /en/ product detail page hero image"
3. **Polarizing Elements 必选 ≥1 个 per 视图**
4. **价格统一 USD (basePrice_en 字段)**

### V25 Prompt 模板 (US 专用, ≤2300 chars)

```text
PRODUCTION-READY FINAL IMAGE ONLY. This image is the hero photo on
zprintpro.com /en/ product detail page, viewed by US cross-border DTC
shoppers expecting premium Quiet Luxury aesthetic (warm earth tones,
deep navy, brushed gold). 1:1 ratio, 8K ultra-high-definition.

[VIEW: {HERO|DETAIL|VARIETY|MULTI-ANGLE}]
HERO composition: product 80-85% of frame, slight 15-20° angled perspective
for visual depth, no flat front view. Strong color contrast against neutral
backdrop. Optional lifestyle hint in periphery.
DETAIL composition: extreme close-up 85-95% of frame, macro on material/texture,
SHALLOW DoF. INCLUDE a human hand (different skin tone) holding/touching the
product for scale reference (Polarizing Element #2 Scale Disruption).
VARIETY composition: 3-4 colorways/options arranged in clear visual hierarchy
(fanned/stacked/grouped), suggest motion with subtle arrangement variation
(Polarizing #5 Arrangement Architecture).
MULTI-ANGLE composition: 3 views in one frame (front, 3/4 angled, detail),
unconventional angle, neutral studio backdrop.

Foreground: a {CATEGORY_PRODUCT_TYPE} with fictional client brand
"{FICTIONAL_BRAND}" (e.g. Hive Packaging, Maplewood Studio, Flagworks)
printed in modern sans-serif, plus {DECORATIVE_MOTIF} pattern, and real
small text elements ({SMALL_ELEMENTS}) in neat blocks.

Product details: 12 fields (Product name / Material / Size / Print method /
Finish / Top 3 features / USD price {basePrice_en}/unit / MOQ {minQuantity} /
Turnaround {turnaround if any} / 1-line description).

Background: {US_LIFESTYLE_SCENE} (e.g. blurred Brooklyn loft unboxing,
Mission District coffee shop, Bushwick studio). Soft natural daylight.

Color: warm earth tones, deep navy, brushed gold, color-saturated vivid,
NOT muted/washed out/dim/overcast/muddy, BRIGHT CLEAR daylight.

Aesthetic: Cinematic photo-real, US DTC premium, Quiet Luxury, sharp focus,
true-to-life texture, warm trustworthy lifestyle.

Selling point: Main {SKU_NAME}|From $X-Y, sub: {TAG1}・{TAG2}.

Anti-garbage: No other text, gibberish, watermarks, brand names, or multiple
labels outside the product surface. All English spelled correctly.
No ZprintPro / 智印港 / ジープリント anywhere in image.
No technical parameters (color codes, resolution, font names) visible as text.

Negative: blurry, watermark, distorted, gibberish, dim lighting, muddy,
faded, garish neon, cluttered background, low contrast.
```

### 16 类目 × US 专属适配

| 类目 | US Lifestyle 场景 | Fictional Brand 示例 |
|---|---|---|
| stickers | Bushwick creative workspace with Hydro Flask | BriteMark, Wildroot |
| packaging | Brooklyn loft DTC unboxing | Hive Packaging, BoxCraft |
| greeting-cards | Williamsburg dinner party with candles | Maplewood Studio |
| envelopes | Manhattan executive desk with fountain pen | LetterCraft, Ivory Mail |
| menus | West Village Italian restaurant table | Woodfire Bistro, Saffron & Sage |
| books | Brooklyn Heights reading nook | Quillhouse Press |
| posters | Bushwick gallery wall | Cityline Prints, Neon Hive |
| paper-bags | SoHo boutique sidewalk | Carrywell, PaperThread |
| flyers | Mission District café entrance | Blueroof Studio |
| red-packets | (niche) US Asian-American CNY family | Fortune Fold, Crimson Wish |
| calendars | Brooklyn home office with morning light | Dayline Studio |
| educational | Boston school library | Brightleaf Learning |
| banners | Brooklyn outdoor festival with bunting | Flagworks, Bannerly |
| japan-doujin | (niche) Anime NYC convention booth | Sakura Studio, Animecraft |
| wedding-invitations | Brooklyn Botanic Garden wedding | EverAfter Press, Lace & Vow |
| place-cards | Brooklyn wedding reception with florals | TableCraft Studio |

---

## Part 5: 执行计划

### Step 1: 写 v25-us-en-prompts.py (本日)
- 基于 gen_v24_2.py 改
- 加 US_LIFESTYLE_SCENE per cat per locale=en
- 改 SELLING_POINTS 用 products.ts.basePrice_en
- 加 US 目标用户 1 句 + 图用途 1 句
- 4 视图分工按 Polarizing Framework
- 加 7-Image 公式 / 3-second rule 上下文

### Step 2: 跑 4 张挑战图 4K 验证
- en BC-001 / BN-001 / RP-001 / DJ-001
- 检查: ≤2300 chars / 无 ZprintPro / 12 字段 / USD 价格 / 视觉对比

### Step 3: 全量 99 SKU × 4 视图 = 396 prompts
- 输出 v25-us-en-prompts.txt

### Step 4: 选 5-10 SKU 跑全图 (测试批量质量)
- 16 类目各选 1 个 top SKU
- 测 V25 视觉 vs V24.2 R2

### Step 5: 上线
- 保留 V24.2 R2 (ja / zh-hk SSoT)
- V25 取代 V24.2 R2 的 en
- 更新 SKILL.md

### Step 6: 测 CTR / GEO 排名 (后续)
- 上线 7 天后, 查 GSC data: US market impressions/clicks
- 上线 30 天后, 查页面停留时间 + 加购率

---

## Part 6: 4 张挑战图视觉对比 (待 V25 跑出后填)

| 挑战图 | V24.2 R2 | V25 US-DTC (待跑) | 差异 |
|---|---|---|---|
| BC-001 (贺卡) | Maplewood Studio + 秋叶 + holiday dinner bg | 预期: + Polarizing (手 / 角度) | ? |
| BN-001 (横幅) | FLAGWORKS + HK$ + festival bunting | 预期: USD + Brooklyn loft | ? |
| RP-001 (红包) | Fortune Fold + CNY family | 预期: 保留 (ja sku, US 跳过) | ? |
| DJ-001 (同人誌) | Sakura Studio + Comiket | 预期: 保留 (ja sku, US 跳过) | ? |
