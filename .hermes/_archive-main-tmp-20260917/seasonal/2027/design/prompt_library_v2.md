# 2027 丁未羊年季节性产品 · AI 出图 Prompt 库 v2 (5 段式 + 印刷适配)

> 签发: 2026-08-11 11:40 (v1 升级, 加 5 段式 PRINT 段, 适配 Seedream/image_synthesize + 印刷 300DPI 需求)
> 消费方: M3 / AutoGLM · 8/13 00:00 启动批量出图 (现提前到 8/11 下午 13:00)
> 结构: 每款 = 5 段式 (WHY/WHO+WHERE/BRAND/HOW/PRINT) + 变量矩阵 → 展开 160+ 组 prompt
> 工具栈: image_synthesize (Seedream-compatible) + Real-ESRGAN 4x + CMYK FOGRA39
> 依据: 2026-08-09 K3 战略书 §6 + 8/11 10:33 300DPI 框架确认 + 8/11 11:35 K3 3 项拍板

---

## §0 全局红线 (所有 prompt 必带 negative + 5 段硬约束)

**Negative prompt (每款必加)**:
`--no Dunhuang, Mogao Caves, feitian, nine-colored deer, Buddhist mural, glossy foil, shiny gold foil, thin paper texture, business card, 名片, 咭片, business cards, watermark, text overlay, logo, blurry, low quality, distorted proportions`

**5 段硬约束**:
1. 工艺红线: 烫金只出哑光/磨砂 (`matte foil / brushed foil / debossed foil`), 禁亮光烫金
2. 材质红线: 利是封视觉必须呈现 ≥150g 厚度感, 禁薄纸感
3. IP 红线: 敦煌吉羊仅作方向灵感, 不出具体敦煌元素
4. 品类红线: 不出名片/咭片画面 (§11 主营约束)
5. **印刷红线 (v2 新增)**: 必须留 ≥30% 干净区域供后期加文字/排版, 主体不压满出血区

---

## §1 5 段式 Prompt 模板 (zprintpro 定制版 · 全 8 SKU 通用)

### 模板 A: 红包 / 利是封类 (适用 6 款)
```
[段1 设计意图]
Premium Chinese New Year red envelope (lai see) photography, must trigger
"executive gift-grade" emotional response. Viewer should immediately think:
"This is elegant enough to give to boss/client." Differentiation:
non-cliché design avoiding generic red-gold. {visual} as hero element.

[段2 目标人群 + 场景]
Hong Kong corporate professionals 28-45 gifting lai see during Chinese New Year.
Scene: envelope held in hand at business dinner table, soft warm overhead lighting,
shallow depth of field. Cultural context: Cantonese lai see emphasizes understated
elegance over ostentatious display.

[段3 品牌一致性锚点]
Brand colors: {brand_color_primary} (primary) + {brand_color_secondary} (accent).
Texture: premium {paper_type} with visible grain. Logo placement zone:
bottom-right corner, debossed 8mm. Typography clean zone: 30% bottom area
reserved for custom text overlay (do NOT show any text in image).

[段4 技术参数]
Style: editorial product photography, soft studio lighting.
Composition: 45° angle, envelope slightly open showing inner lining.
Aspect ratio: 9:17 (lai see standard vertical).
Native resolution: 2048x3712 px (sufficient for A6 print after 4x upscale).
Lighting: key upper-left, fill right, rim back.
Quality tags: photorealistic, product-shot, premium-paper-texture, shallow-dof.

[段5 印刷适配 (v2 新)]
Print specifications:
- Final trim: 105x148mm (A6)
- 300 DPI required → 1240x1748 px minimum (will 4x upscale)
- Color space: sRGB source → CMYK FOGRA39 conversion in post
- Bleed: 3mm all sides (subject must extend into bleed)
- Safe zone: 5mm from trim (critical content within)
- Foil stamp area: mark silver/gold foil regions for post-processing
- File format: PNG-24 source → PDF/X-1a final
- {NEG}
```

### 模板 B: 台历 / 挂历类 (适用 2 款)
```
[段1 设计意图]
{year} {product_type} photography triggering "design object worth keeping"
emotional response. Viewer should think: "This is a calendar I'd display,
not hide." Differentiation: {light_or_illustration} as hero, not stock photography.

[段2 目标人群 + 场景]
Hong Kong/Japan/English-speaking professionals who value design objects.
Scene: calendar on minimalist desk or mounted on neutral wall, natural
daylight from window, soft shadows. Cultural context: appreciate craft,
materiality, and seasonal narrative.

[段3 品牌一致性锚点]
Brand colors: {brand_color_primary} + minimal accent.
Texture: 200-300g touch paper with subtle grain.
Layout: clean negative space, no decorative text in image (we add later).
Typography: 20% bottom reserved for date grid (place generic placeholder).

[段4 技术参数]
Style: editorial product photography + craft documentary.
Composition: 3:4 wall calendar (vertical) / 3:2 desk calendar (horizontal).
Native resolution: 1536x2048 px (wall) / 2048x1365 px (desk).
Lighting: natural daylight, soft diffused.
Quality tags: photorealistic, craft-paper-texture, clean-composition, minimal.

[段5 印刷适配 (v2 新)]
Print specifications:
- Final trim: {trim_size} (A3 wall 297x420mm / desk 216x146mm)
- 300 DPI required → {pixel_dims} (A3 = 3508x2480 / desk = 1024x2551)
- Color space: sRGB → CMYK FOGRA39 in post
- Bleed: 3mm (A3) / 2mm (desk) all sides
- Safe zone: 5mm from trim
- Spot UV / foil regions: mark separately for post-processing
- Binding allowance: 10mm left side for spiral/wire binding
- File format: PNG-24 → PDF/X-1a
- {NEG}
```

---

## §2 三市场 locale 变量矩阵 (升级 v1)

| 变量 | zh-hk 港式 | en 欧美 | ja 日式 |
|---|---|---|---|
| 主色 | #D4380D 港红 | #1A1A2E 深海军蓝 | #2D5016 侘寂绿 |
| 辅色 | #F5E6CC 米白 | #FFFFFF 纯白 | #E8E0D0 和纸色 |
| 字体偏好 | 思源黑体 Bold | Inter SemiBold | Noto Sans JP Medium |
| 材质质感 | 烫金/磨砂/布纹 | 哑光/干净利落 | 和纸/木纹/留白 |
| 情绪基调 | 温暖/喜庆/精致 | 专业/可信/大胆 | 静谧/匠心/自然 |
| 构图风格 | 满版 + 寓意完整 | 留白少 + 焦点突出 | 大留白 + 极简呼吸感 |
| 文字区预留 | 30% 底部 (繁体竖排) | 25% 横排 | 35% 极小字位 |
| 禁忌元素 | 纯白底 / 数字 4 | 过度装饰 / 文化挪用 | 鲜艳大红 / 杂乱 |

---

## §3 8 SKU 完整 5 段 Prompt 矩阵

### §3.1 红包「丁未·暖羊」6 款 × 8 变体 = 48 组 (v1 升级 v2)

**6 款参数矩阵** (每款 5 段代入 visual/craft/paper/brand_color):

| 款 | visual | craft | paper | brand_primary | brand_secondary |
|---|---|---|---|---|---|
| 1 初雪 | white ground, silver-foil sheep flock silhouette, falling snow, thin red ribbon | silver matte foil + blind emboss | 200g pearl | #FFFFFF 白 | #C0C0C0 银 |
| 2 篝火 | deep red ground, sheep by campfire, brushed gold | brushed gold matte foil + frosted touch | 150g pearl | #8B0000 暗红 | #D4A574 暖金 |
| 3 织梦 | woven knit texture ground, wool yarn sheep illustration | fabric-grain emboss + spot UV | 150g pearl | #F5E6CC 米白 | #A0937D 驼色 |
| 4 墨韻 | black ground, ink-wash sheep, single vermilion seal stamp | monochrome + red matte foil seal | 200g specialty | #0A0A0A 墨黑 | #D4380D 朱红 |
| 5 童趣 | cream ground, cartoon sheep family, rounded corners | 4-color + rounded die-cut | 150g pearl | #FFF8DC 米白 | #FF8C69 暖橘 |
| 6 百家姓 | red ground, large single Chinese surname in calligraphy, gold | digital print + gold matte foil | 200g specialty | #C8102E 正红 | #D4AF37 金 |

**8 变体 (V1-V8, 每款展开)**:
- V1: 正面平铺 (top-down flat lay)
- V2: 45° 立拍带阴影 (hero with cast shadow)
- V3: 三枚扇形叠放 (set display)
- V4: 手持场景, 不露脸 (in-hand lifestyle)
- V5: 工艺微距, 烫金/压纹特写 (craft macro)
- V6: 系列全家福 (collection family)
- V7: zh-hk 港式适配 (locale_dim)
- V8: en 欧美适配 (locale_dim)

**展开规则**: {visual} × {craft} × {paper} × {brand_color} 代入模板 A, V7/V8 代入 locale 适配段

**款 6 百家姓特例**: 变量加 {surname} ∈ [陳/李/張/黃/林/吳/蔡/王] (港式大姓前 8), 8 张轮换

### §3.2 台历「光影四季」12 月 × 1 场景 = 12 组 (升级 v2)

**12 月光影场景 (light_scene)**:

| 月 | 场景 | 主色 | 辅色 |
|---|---|---|---|
| 1 一月 | 冬晨窗光斜切雪面 | #E8F0F5 雪白 | #B0C4DE 冷蓝 |
| 2 二月 | 灯笼暖光透纸 | #FF6B35 灯笼红 | #FFD700 暖金 |
| 3 三月 | 惊蛰·雨后地面积水反光 | #4A6670 雨灰 | #87CEEB 天蓝 |
| 4 四月 | 清明·薄雾散射光 | #D4D4D4 雾灰 | #E8E0D0 米色 |
| 5 五月 | 立夏·树叶间隙光斑 | #6B8E23 橄榄绿 | #FFD700 光斑 |
| 6 六月 | 夏至·水面粼光 | #00BFFF 海蓝 | #FFFFFF 粼光 |
| 7 七月 | 盛夏·百叶窗条纹光 | #FF8C00 暖橘 | #8B4513 条纹影 |
| 8 八月 | 中秋·月光穿镂空云纹 | #191970 月夜蓝 | #FFD700 月光 |
| 9 九月 | 秋分·麦浪逆光 | #DAA520 麦金 | #8B4513 麦秆 |
| 10 十月 | 重阳·暮色长影 | #2F4F4F 暮灰 | #CD5C5C 枫红 |
| 11 十一月 | 立冬·炉火侧光 | #8B0000 炉火红 | #FF8C00 暖光 |
| 12 十二月 | 冬至·烛光穿镂空雪花 | #FFFFFF 雪白 | #FFD700 烛光 |

**Base 模板**:
```
Desk calendar page for {month} 2027, light phenomenon as hero:
{light_scene}, light passing through die-cut silhouette casting
pattern on base, triangular desk calendar 216x146mm, 300g touch
paper with spot UV, date grid minimal in bottom fifth,
{locale_dim}, photographic light quality, not illustration-cliché,
{PRINT_段}
```

### §3.3 挂历「二十四节气」24 节气 × 2 风格 = 48 组 (升级 v2)

**24 节气 (24 solar terms)**: 立春 / 雨水 / 惊蛰 / 春分 / 清明 / 谷雨 / 立夏 / 小满 / 芒种 / 夏至 / 小暑 / 大暑 / 立秋 / 处暑 / 白露 / 秋分 / 寒露 / 霜降 / 立冬 / 小雪 / 大雪 / 冬至 / 小寒 / 大寒

**2 风格**:
- S1: 水墨线描 + 单点节气色 (ink line + solar-term color accent)
- S2: 现代扁平 + 几何节气符号 (modern flat + geometric symbol)

**Base 模板**:
```
A3 wall calendar plate for {solar_term} 2027, {illustration},
solar term name in {type_style} with foil accent, 200g coated paper,
297x420mm, {locale_dim}, cultural narrative, not stock-illustration,
{PRINT_段_A3}
```

---

## §4 产出与筛选协议 (M3 执行 · 加速版)

### §4.1 时间表 (8/11 下午 → 8/13 上午)

| 时段 | 任务 | 产出 | 工具 |
|---|---|---|---|
| 8/11 11:30-12:30 | 5 段式 prompt v2 完整版 | 本文档 v2 (已落) | 手写 |
| 8/11 12:30-13:00 | AutoGLM 抓取 ref_images | 8 类目 60+ 张 | images_search_and_download |
| 8/11 13:00-15:00 | image_synthesize 种子图 | 32 张 (4 批 × 8) | image_synthesize |
| 8/11 15:00-16:00 | 现有 Top 20 SKU 图片快速审计 | sku_image_audit.csv | AutoGLM |
| 8/11 16:00-17:00 | K3 异步审 32 张 (不阻塞) | selected_16/ | K3 + M3 |
| 8/11 17:00-18:00 | Day 1 打包 → K3 | day1_review/ | M3 |
| 8/12 09:00-14:00 | 精修 + 5 变体 + 4x upscale + CMYK | 80 张变体 + 16 张印刷样品 | image_synthesize + Real-ESRGAN |
| 8/12 14:00-17:00 | Top 20 SKU AI 重生 + 后处理 | 60 张候选 | image_synthesize + Real-ESRGAN |
| 8/12 16:00-18:00 | review-8-12-template.md | 复盘报告 | M3 |
| 8/13 09:00-13:00 | 季节性 8 SKU products.ts + PDP | 代码变更 | M3 |
| 8/13 13:00-14:00 | **Push 1: 季节性 8 SKU + Web Hero 图上线** | CF deploy | M3 |
| 8/13 14:00-16:00 | Top 20 SKU 图替换 + batch 1 清理 | 代码变更 | M3 |
| 8/13 16:00-17:00 | **Push 2: Top 20 SKU 图 + batch 1 上线** | CF deploy | M3 |
| 8/13 17:00-18:00 | IndexNow ping + 印刷样品上传 /public/samples/ | 收录加速 | M3 |

### §4.2 5 步真验证 (M3)

1. **图像加载测试**: 8 PDP 首屏 < 2s 加载 (WebP < 300KB)
2. **200px 缩略图测试**: 8 SKU 缩略图主体可辨认
3. **印刷样品可下载**: 8/14 后 /public/samples/ 12 个 PDF/X-1a 可 curl 200
4. **alt 文本完整**: 8 PDP × 3 locale = 24 段 alt 文本含关键词
5. **品牌一致性**: 每张过 5 段 §3 brand 锚点 checklist

### §4.3 工艺标注层 (打样文件 8/23 用)

每款定稿后补 `craft_notes.md`:
- 烫金区坐标 (px + mm)
- UV 区坐标
- 模切线 (svg)
- 折叠线 (dashed)
- 装订位

### §4.4 push 配额核算

| 日期 | push | 月累计 |
|---|---|---|
| 8/11 (今日) | 5/5 用满 | 17/150 |
| 8/12 (复盘日) | 0/5 | 17/150 |
| 8/13 (启动日) | 3/5 (1 batch 1 + 2 图片) | 20/150 |
| 8/14-15 (回补) | 1 | 21/150 |
| 余量 | 129 | 充足 |

---

## §5 ref_images 目录结构 (AutoGLM 抓取目标)

```
ref_images/
├── jellycat_packaging/      # 情感触发参考
├── stickermule/             # 贴纸场景参考
├── vistaprint_calendar/     # 日历对标
├── paper_texture/           # 材质特写
├── laisee_premium/          # 红包设计参考
├── wabisabi_palette/        # ja 市场色板
├── hk_cny_palette/          # zh-hk 市场色板
└── western_editorial/       # en 市场编辑风
```

---

## §6 工具栈与降级路径

| 环节 | 主路径 | 降级 (装不上) |
|---|---|---|
| 种子图生成 | image_synthesize (Seedream-compatible) | 中转用 Midjourney API |
| 4x upscale | Real-ESRGAN (本地 GPU) | sharp resize LANCZOS (质量降 1 档) |
| CMYK 转换 | Pillow + FOGRA39 ICC | GIMP 批处理 |
| PDF/X-1a 打包 | img2pdf + Ghostscript | Adobe Acrobat CLI |
| ref 图抓取 | images_search_and_download | bing image API |

---

EOF · .hermes/seasonal/2027/design/prompt_library_v2.md
5 段式 + 印刷 300DPI · 8 SKU × 8 变体 = 160+ 组 prompt · 8/13 上线
