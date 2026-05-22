# 智印云 ZPrintPro — 高点击率产品图片策略

## 当前问题诊断

### 我们现有的图片
- `public/images/products/` — 约90张静态.jpg，可能为占位图/低质量实拍
- `public/images/hero-v21/` — 仅5张hero图，重复使用于多个产品
- **核心问题**：
  1. 缺乏使用场景（context/lifestyle），用户无法想象成品效果
  2. 没有多角度展示（正面/侧面/特写/材质细节）
  3. 无产品变体展示（不同颜色/材质/尺寸对比）
  4. 图片风格不统一，缺乏品牌一致性
  5. 分辨率不足，无法放大查看细节

### 行业标杆（e-print / Vistaprint / MOO）的做法
| 图片类型 | 作用 | 我们的现状 |
|---------|------|-----------|
| **主图 - 产品正面** | 首屏第一眼，决定点击率 | ❌ 可能缺失或质量低 |
| **场景图 - 使用中** | 让用户想象"我的品牌印上去会怎样" | ❌ 完全没有 |
| **材质特写** | 展示纸张质感/工艺细节，建立信任 | ❌ 完全没有 |
| **多角度/背面** | 消除购买疑虑 | ❌ 完全没有 |
| **尺寸对比** | 帮助用户选择正确规格 | ❌ 完全没有 |
| **工艺展示** | UV/燙金/凹凸等效果特写 | ❌ 完全没有 |

---

## 高点击率图片六大原则

1. **真实场景（Lifestyle Context）**
   - 名片 = 手持名片递出的场景 / 放在大理石桌面上的品牌套装
   - 纸袋 = 零售店收银台 / 手提购物的街拍场景
   - 贴纸 = 贴在笔记本电脑/水瓶/包装上的场景

2. **专业打光（Studio Lighting）**
   - 柔和漫射光，消除硬阴影
   - 45度角主光 + 补光，突出材质纹理
   - 纯白或浅灰背景（产品页主图）

3. **高分辨率（2000px+）**
   - 最短边不低于1000px
   - 支持缩放查看细节
   - WebP格式 + 响应式srcset

4. **品牌一致性（Brand Cohesion）**
   - 统一的光影方向
   - 统一的色调（智印云品牌蓝 #2873F5 点缀）
   - 统一的背景风格（白底主图 + 场景图配合）

5. **情感触发（Emotional Trigger）**
   - 商务场景 = 专业、信任、成功
   - 包装场景 = 开箱惊喜、品牌升级
   - 宣传品 = 活动热闹、人群聚集

6. **行动暗示（Action Cue）**
   - 图片中包含"手"的元素（手持/触摸/递出）
   - 增加动态感（飘落的传单、堆叠的纸袋）

---

## 按品类生成提示词（AI Image Generation Prompts）

### 通用提示词前缀
```
Professional product photography, studio lighting with softbox, 
clean white background, 45-degree angle, sharp focus, 
high detail, commercial photography style, 8K resolution, 
photorealistic, no text, no watermark
```

### 1. 名片 Business Cards
**主图（白底）**
```
Stack of premium business cards on white marble surface, 
300g glossy coated paper, one card slightly tilted showing thickness, 
soft shadow underneath, macro photography showing paper texture, 
professional studio lighting, 8K, photorealistic
```

**场景图**
```
Close-up of a hand exchanging a business card at a business meeting, 
blurred modern office background, warm natural lighting, 
shallow depth of field, professional corporate atmosphere, 
photorealistic, 8K
```

**工艺特写**
```
Extreme close-up of gold foil stamping on black business card, 
showing metallic reflection and embossed texture, 
macro lens photography, dramatic side lighting, 
luxury feel, 8K detail
```

### 2. 贴纸 Stickers
**主图**
```
Collection of die-cut stickers arranged on white background, 
waterproof vinyl material with glossy finish, 
showing rounded corners and clean cut edges, 
studio lighting, product photography, 8K
```

**场景图**
```
Laptop covered with creative stickers, coffee cup nearby, 
cozy creative workspace, natural window light, 
authentic lifestyle photography, young professional setting, 8K
```

### 3. 纸袋 Paper Bags
**主图**
```
Premium kraft paper shopping bag with twisted handles, 
standing upright on white background, 
showing bag structure and handle attachment, 
eco-friendly natural texture visible, studio lighting, 8K
```

**场景图**
```
Woman walking with branded paper shopping bags on city street, 
street fashion photography, natural daylight, 
urban lifestyle context, shallow depth of field, 8K
```

### 4. 传单 Flyers
**主图**
```
A4 flyer printed on glossy paper, slightly fanned stack showing 
multiple copies, clean white background, vibrant full-color print, 
sharp text edges visible, professional product shot, 8K
```

**场景图**
```
Person handing out colorful flyers at busy street event, 
crowd in background, dynamic action shot, marketing campaign atmosphere, 
natural lighting, documentary style photography, 8K
```

### 5. 海报 Posters
**主图**
```
Large A2 poster mounted on wall, showing full print quality, 
clean white gallery wall background, even lighting, 
showing poster edges and flat mounting, 8K
```

**场景图**
```
Restaurant storefront with large promotional poster in glass window, 
street view at dusk, warm interior lights glowing, 
urban commercial setting, photorealistic, 8K
```

### 6. 包装盒 Packaging Boxes
**主图**
```
Elegant gift box with lid slightly open, premium rigid cardboard, 
showing box construction and corner quality, 
white background, studio lighting, luxury product photography, 8K
```

**场景图**
```
Unboxing experience, hands opening branded packaging box, 
product reveal moment, premium tissue paper inside, 
warm lighting, emotional moment capture, 8K
```

---

## 图片产出计划（78 SKU × 3 张 = 234张）

| 优先级 | 品类 | SKU数 | 图片需求 | 预估工作量 |
|--------|------|-------|---------|-----------|
| P0 | 名片 | 9 | 主图+场景+工艺 | 27张 |
| P0 | 贴纸 | 8 | 主图+场景+材质 | 24张 |
| P0 | 纸袋 | 7 | 主图+场景+手提 | 21张 |
| P0 | 传单 | 7 | 主图+场景+堆叠 | 21张 |
| P1 | 海报 | 6 | 主图+场景+装裱 | 18张 |
| P1 | 包装 | 6 | 主图+场景+开箱 | 18张 |
| P1 | 利是封 | 6 | 主图+场景+工艺 | 18张 |
| P2 | 其他 | 29 | 主图+场景 | 58张 |

**总计：约225张图片**

---

## 技术实现建议

### 1. 图片格式
- 源文件：PNG (带透明通道) 或高质量 JPG
- 网站输出：WebP（Next.js Image组件自动转换）
- 备用：JPG fallback

### 2. 目录结构
```
public/images/products/
  ├── {slug}/
  │   ├── main.jpg          # 主图（白底产品图）
  │   ├── lifestyle.jpg     # 场景图
  │   ├── detail.jpg        # 工艺/材质特写
  │   └── gallery/          # 额外角度
  │       ├── angle1.jpg
  │       └── angle2.jpg
```

### 3. 组件改造
- ProductCard：使用 `main.jpg`，aspect-ratio 1:1
- Product Page：主图区支持画廊切换（主图+场景+特写）
- Hero Banner：使用 `lifestyle.jpg` 作为背景

### 4. 生成工具推荐
- **Midjourney / DALL-E 3**：生成高质量场景图
- **Placeit / Smartmockups**：快速生成产品mockup
- **Photoshop + 3D渲染**：精确控制的产品图
- **Canva Mockup**：低成本快速方案

---

## 立即行动项

1. ✅ 先为6个核心品类（名片/贴纸/纸袋/传单/海报/包装）各生成1套高质量图片
2. ✅ 替换 `public/images/hero-v21/` 的5张hero图为场景化高质量图
3. ✅ 改造 ProductCard 支持多图hover切换
4. ✅ 产品详情页增加图片画廊（主图+场景+特写）
5. ⏳ 其余品类逐步替换
