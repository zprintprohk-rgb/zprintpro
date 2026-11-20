# Seedream V20.2 电商主图生图技能 (K3 8/15 03:43 拍板自进化 SSoT)

> **30 小时迭代终版公式** (V1 → V16 → V17 → V18 → V19 → V20 → V20.1 → V20.2)
> K3 拍板: 之前所有版本作废, V20.2 是唯一自进化技能
> Auto-claw 工具水印 / 物理不合理 / 大品牌侵权 等历史问题全部解决

---



## 0.1 PS 去水印硬性要求 (K3 8/17 06:3x 拍板)
- 最终交付 WebP **必须 100% 无水印**；'AutoClaw AI生成' 水印一律用 PS 技术去除（Content-Aware Fill / 修复画笔 / 仿制图章）
- **K3 08-17 23:42 拍板（V20.9.1，覆盖 V20.8）**：主体与关键元素保持在画面上部/中部；后处理 **WM-STRIP 底边精准裁切**——左/上/右完全不动，只裁底部水印文字带（1200 坐标 y>=1146，实测水印 (874,1146)-(1090,1179)），输出精确 1200x1146（1.047:1），<=120KB WebP
- 裁切无法覆盖的旧图（主体分布全图）保留 PS 去水印兜底（inpaint / 内容识别填充）
- 纹理复杂区域自动 inpaint 会留痕 → 必须 PS 人工精修；纯色/模糊背景可用 OpenCV TELEA 预处理
- 完成门槛：无水印残留 + 无可见修复痕迹
## 1. 工具与平台

- **生成工具**: Seedream 5.0 (`autoglm-generate-image-seedream` 或 `doubao-seedream-5.0-lite`)
- **目标平台**: Amazon / 1688 / Shopify / 淘宝 等电商主图
- **比例**: 1:1 (适配所有电商平台列表页)
- **质量**: 8K ultra-high-definition

---

## 2. 5 视图分工 (K3 8/15 03:26 + 03:36 拍板)

| # | 视图 | 比例 | 用途 |
|---|------|------|------|
| 1 | **HERO 主图** | 80-85% | 列表页首图, 一眼识别 |
| 2 | **DETAIL 工艺特写** | **85-95%**（特写宏图，产品放大 2x+，K3 8/17 06:2x 定稿） | 详情页卖点展示 |
| 3 | **VARIETY 组合** | 75-90% | A=多颜色变体 / C=多场景, 按类目 |
| 4 | **MULTI-ANGLE 多角度** | 75-80% | 同 SKU 4 角度拼图 |
| 5 | **SPREAD 展开展示** | 80-85% | 仅 7 类目, 物理结构可展开 |

### 2.1 VARIETY A/C 决策表 (K3 8/15 03:26 拍板)

| 模式 | 适用类目 | 理由 |
|------|---------|------|
| **A (多颜色变体)** | stickers / packaging / posters / paper-bags / flyers / red-packets / banners / japan-doujin | 多颜色/多规格/多尺寸 |
| **C (多场景)** | greeting-cards / envelopes / menus / books / calendars / educational | 节日/婚礼/办公多场景 |

### 2.2 SPREAD 适用类目 (K3 8/15 03:36 拍板, 物理可展开)

- books (必选, 书本翻开展示内页)
- packaging (盒装开盖展示内容物)
- calendars (开页日历展示月历)
- greeting-cards (多页卡片展开成册)
- red-packets (一组多张红包铺开)
- educational (练习册/工作簿内页)
- japan-doujin (同人志内页插图)

**不适用** (单张不可展开): stickers / envelopes / menus / posters / paper-bags / flyers / banners

---

## 3. 每段 prompt 开头模板 (K3 8/15 03:38 拍板)

每段 prompt **第一行**必须显式声明工具和电商主图定位:

```
生图图片: Seedream 5.0 e-commerce product photo generation,
电商主图 #N <view 名称>
(<英文 view 描述>), 1:1 ratio, 8K ultra-high-definition,
← 工具声明 (Seedream 5.0) + 商业定位 (V20 视角N = 电商主图)
```

5 视图完整开头:
- **#1 主图**: `电商主图 #1 主图 (HERO image for Amazon/1688/Shopify product listing page)`
- **#2 卖点特写**: `电商主图 #2 卖点特写 (DETAIL image for product detail page selling points)`
- **#3 款式组合**: `电商主图 #3 款式组合 (VARIETY image showing color/format variations)`
- **#3 场景组合**: `电商主图 #3 场景组合 (VARIETY image showing usage scenarios)`
- **#4 多角度**: `电商主图 #4 多角度 (MULTI-ANGLE composite image showing 4 views)`
- **#5 展开展示**: `电商主图 #5 展开展示 (SPREAD image showing unfolded interior pages)`

---

## 4. 14 虚构公司矩阵 (K3 8/14 19:10 拍板, V17 起固化)

每个类目 4 个虚构公司, 按类目顺序循环使用. 不用任何真实大品牌.

| 类目 | 公司 1 | 公司 2 | 公司 3 | 公司 4 |
|------|--------|--------|--------|--------|
| greeting-cards | Maplewood Studio | Honeycomb Greetings | PaperCrane Co. | Lumen Cards |
| stickers | BriteMark | Wildroot Stickers | Stickcraft Studio | SunPop Designs |
| envelopes | LetterCraft | Ivory Mail | Sealed & Sent | Penmark Stationers |
| menus | Woodfire Bistro | Saffron & Sage | Olive Branch Kitchen | Birch Street Cafe |
| books | Quillhouse Press | Larkspur Publishing | Stitched Pages | Copper Type |
| packaging | BoxCraft Co. | Hive Packaging | FolioBox | WrapWorks Studio |
| posters | Cityline Prints | Boldframe Studio | Neon Hive | Plaster Press |
| paper-bags | Carrywell | PaperThread | Foldkraft | Loop & Leaf |
| flyers | Blueroof Studio | Locale Print Co. | Flypaper Studio | Twoblock Designs |
| red-packets | Fortune Fold | Crimson Wish | Knot & Coin | Lantern Press |
| calendars | Dayline Studio | Pagebound | Foldtime | Mark & Margin |
| educational | Brightleaf Learning | Tiny Atlas Press | Skillpath | Brightbrick |
| banners | Flagworks | Bannerly | Skyline Sign | Eventfold |
| japan-doujin | Sakura Studio | Animecraft | Junka Press | Comiket 2026 |

---

## 5. 14 类目差异化场景库 (V19 拍板)

每类目独立场景, 不用通用"窗户前"或单一重复场景.

| 类目 | 场景关键词 |
|------|----------|
| greeting-cards | 节日晚餐桌面 + 手写贺卡 + 复古瓷器 + 黄铜烛台 + 亚麻桌旗 |
| stickers | 创意工作空间 + 贴纸装饰笔记本盖 + 水壶 + 多肉植物 |
| envelopes | 高管红木办公桌 + 钢笔 + 火漆印章 + 落地书架 |
| menus | 亲密小酒馆餐桌 + 酒杯 + 蜂蜡蜡烛 + 白色亚麻桌布 |
| books | 切斯特菲尔德扶手椅 + 落地灯 + 皮面装订书堆 + 私人书房 |
| packaging | 精品礼品柜台 + 开箱 + 薄纸丝带 + 桉树叶 |
| posters | 城市画廊墙 + 框装海报 + 裸露砖墙 + 现代阁楼 |
| paper-bags | 大理石人行道 + 精品店手提 + 时尚区街道 + 棉绳手柄穿孔 |
| flyers | 社区公告板 + 咖啡馆入口 + 软木板 + 现代咖啡店 |
| red-packets | 家庭团圆桌 + 春节零食 + 麻将 + 红色纸灯笼 + 亚裔美国家庭 |
| calendars | 现代家庭办公室 + 墙挂日历 + 立式桌 + 晨光 |
| educational | 小学图书馆 + 儿童阅读角 + 木书架 + 彩色教育材料 |
| banners | 户外节日入口 + 彩色三角旗 + 餐车排 + 阳光 |
| japan-doujin | 动漫大会摊位 + 角色立牌 + 同人志堆 + 樱花瓣 |

---

## 6. K3 强制约束 (8 大红线)

每段 prompt **必须包含**以下 8 块, 用 `←` 标注:

1. `← 商业定位` - 电商主图 #N
2. `← 工具声明 (Seedream 5.0)` - 工具名显式
3. `← 12字段 client` - 虚构品牌 + 工艺/材质/印刷
4. `← 14类目差异化场景` - 类目独立场景
5. `← 14虚构公司 (no侵权)` - 不用 Apple/Tiffany/Nike/Gucci/LV/Chanel/Prada/Hermès
6. `← 数字明确` - 具体百分比 (80-85% / 70-75% / 90% / 75-80%)
7. `← 明亮鲜艳不暗沉 (K3 14:35 强约束)` - 高饱和度 vivid
8. `← 设计美感 + 美国流行元素 + 电影写真` - 暖大地色 + 90s 复古 + 海岸奶奶
9. `← 字符规则` - 字符 sweet spot 1500-2000
10. `← 字符准确 + 物理合理` - 无错字, 纸袋手柄穿孔, 袋底纯色

---

## 7. Negative 反向约束 (硬规则, 触发二审)

每段 prompt 末尾必须包含的反向提示:

```
no blank, no empty, no plain, no unprinted, no missing text, no blurred text,
no partial print, no generic template, no placeholder text, no watermark,
no signature, no AI generator names, no AutoClawAI text, no copyright symbol overlay,
no cropped text, no illegible text, no dim lighting, no dark moody atmosphere,
no shadow-heavy scene, no drab muted colors, no red burst label, no price tag overlay,
no brand logo of real luxury brands, no Apple, no Tiffany, no Nike, no Gucci,
no Louis Vuitton, no Chanel, no Prada, no Hermes, no celebrity faces,
no public figure likenesses, no copyright-infringing imagery,
no other product besides main subject, all technical parameters not visible as text only invisible style,
all English words spelled correctly no sticking no gibberish, no broken hardware,
no illogical design, no impossible construction, no floating elements, no defying gravity,
no white unfinished edges, no torn holes, paper bag handles must go through reinforced metal eyelets
and rope must be threaded through, no three-strand rope without proper eyelet holes,
bottom of bag must be solid color matching exterior not white unfinished,
product construction must match real-world physics and structural integrity.
```

---

## 8. 文件命名规范

- **输出文件名** (K3 8/14 19:10 拍板, V19 起固化):
  `{sku_code}_{slugified_seo_title}_{locale}_{view}.webp`
  例: `BC-001_premium-cotton-greeting-cards-holiday-collection_EN_HERO.webp`

- **SEO 标题 slugify** (K3 8/14 19:10 拍板):
  - 转 kebab-case
  - 移除特殊字符
  - 空格 → -
  - 连续 - 合并
  - max 60 字符

- **Per-SKU 目录结构**:
  ```
  v20_per_sku/
  ├── BC-001_premium-greeting-cards.txt
  ├── BC-002_thick-greeting-cards-400g.txt
  ├── ... (87 文件)
  ```

---

## 9. 自进化 SOP (K3 拍板 "自进化的能力")

### 9.1 输入
- `src/data/products.ts` (87 SKU 数据, 含 name/description/price)
- 类目列表 (14 类目)
- K3 强制约束清单

### 9.2 处理流程
1. 提取 87 SKU 数据 (id / sku_code / slug / category / name / nameEn / description / price)
2. 按类目分配虚构公司 (cat_idx 循环)
3. 按类目选择场景 (V19_SCENE_LIBRARY)
4. 按类目确定 VARIETY 模式 (VARIETY_MODE 字典)
5. 按类目确定是否加 SPREAD (SPREAD_CATEGORIES 集合)
6. 5 视图模板生成 prompt:
   - HERO → gen_v20_hero
   - DETAIL → gen_v20_detail
   - VARIETY-A → gen_v20_variety_a
   - VARIETY-C → gen_v20_variety_c
   - MULTI-ANGLE → gen_v20_multi_angle
   - SPREAD → gen_v20_spread
7. 开头模板注入 (Seedream 5.0 + 电商主图 #N)
8. 段尾 K3 8 约束标注注入
9. 段尾 Negative 反向约束注入
10. 输出 per-SKU 文件 + 聚合 TXT

### 9.3 升级触发条件
- K3 反馈新问题 → 升级对应模块:
  - 新约束 → 加到 §6 K3 强制约束
  - 新物理问题 → 加到 §7 Negative 反向约束
  - 新类目 → 加到 §4 虚构公司矩阵 + §5 场景库 + §2.1/2.2 决策表
  - 新视图分工 → 加到 §2.1 视图表
  - 新命名规则 → 改 §8 文件命名规范

### 9.4 跑全量 SOP
1. 改 `_gen_v20_per_sku.py` 内的 V20 函数 / V19_SCENES / V19_CLIENT_MATRIX / VARIETY_MODE / SPREAD_CATEGORIES
2. 跑 `python _gen_v20_per_sku.py` 重出 87 per-SKU + 聚合 TXT
3. K3 测试代表图 6-8 张
4. K3 拍板通过 → 锁定公式, 更新本文档
5. K3 反馈 → 转步骤 1

### 9.5 文件 SSoT
- 公式生成脚本: `_gen_v20_per_sku.py`
- 公式文档 (本文): `SKILL_seedream_v20.md`
- 87 per-SKU prompts: `v20_per_sku/BC-001_*.txt` 等
- 聚合 TXT: `seedream_prompts_v20_87sku_4views.txt`

---

## 10. 历史教训 (V1-V19 → V20.2 迭代踩坑)

| 教训 | 出现版本 | 解决版本 |
|------|---------|---------|
| autoclaw 工具水印 (AutoClawAI) | V17 | V20.2 (negative + 工具水印 post-process) |
| 文件名 SKU_VIEW 命名 | V17 | V20.2 (SEO 标题命名) |
| 14 类目场景全是窗户前 | V17 | V20.2 (V19 14 类目差异化场景库) |
| 虚构大品牌 LOGO 侵权 (Apple/Tiffany/Nike 等) | V17 | V20.2 (14 虚构公司矩阵) |
| 物理不合理 (手提袋绳没用穿孔) | V17 | V20.2 (Negative 强制物理约束) |
| 设计美感低饱和 | V17 | V20.2 (高饱和 + 美国流行元素) |
| 4 视角语义不明确 (K3 怒骂) | V19 | V20.2 (5 视图电商主图标准) |
| 缺少 Seedream 工具声明 | V20.1 | V20.2 (开头显式工具 + 平台声明) |
| 可展开产品缺内页展示 | V20.1 | V20.2 (SPREAD 视图, 7 类目) |

---

## 11. 验证清单 (跑公式前必查)

- [ ] 5 视图开头声明 (Seedream 5.0 + 电商主图 #N)
- [ ] 14 虚构公司 (无真实品牌)
- [ ] 14 类目场景 (差异化, 不重复)
- [ ] 数字明确 (具体百分比)
- [ ] 8 块 K3 强制约束标注
- [ ] Negative 反向约束 (含物理 + 字符规则)
- [ ] VARIETY A/C 按类目正确
- [ ] SPREAD 仅 7 类目
- [ ] **SPREAD 中缝连贯** (V20.4): 1 张连续 2 页 spread, spine 在中央, 内容跨页连贯
- [ ] **SPREAD 真实可读英文** (V20.4): actual readable English words, 禁 mojibake / 乱码 / decorative squiggles
- [ ] **SPREAD 内容逻辑通** (V20.4): 插图与文字主题一致, 同章节连贯
- [ ] **SPREAD 页码顺序** (V20.4): 左页 even (42/44/46), 右页 odd (43/45/47)
- [ ] SEO 文件名格式 (slugified + locale + view)
- [ ] 字符 sweet spot 1500-2000
- [ ] 豆包生图取第 2 张图 (K3 8/15 04:11 反馈)

---

## 12. K3 拍板时间线

- **8/14 14:13**: V16 5 大升级 (禁暖黄/名片/爆炸标签)
- **8/14 15:01**: V17 锦上添花 (8K e-commerce + 80-85%)
- **8/14 18:30**: K3 反馈 6 大问题 (autoclaw 水印/文件名/场景/侵权/物理/设计)
- **8/14 19:10**: V19 7 大升级 (14 虚构公司/14 场景/物理合理/设计美感/美国审美)
- **8/15 03:26**: V20 4 视图 (HERO/DETAIL/VARIETY/MULTI-ANGLE)
- **8/15 03:36**: V20.1 SPREAD 视图 (7 类目可展开)
- **8/15 03:38**: V20.2 开头工具声明 (Seedream 5.0 + 平台)
- **8/15 03:43**: V20.2 = 30 小时迭代终版, 自进化技能
- **8/15 04:11**: V20.3 SPREAD 创意设计吸睛 (整张图 = 创意设计 + EN 语言 + 美国市场元素 + 7 类目差异化)
- **8/15 04:13**: **V20.4 SPREAD 中缝连贯 + 真实可读英文 + 内容逻辑通** (K3 看图反馈: 中间不符合逻辑 = 中缝两侧内容不连贯 + 文字 mojibake 乱码 + CSR report 配海边照片逻辑错; 3 大修复: SINGLE CONTINUOUS TWO-PAGE SPREAD / ACTUAL READABLE ENGLISH WORDS / 插图与文字主题一致)
- **8/15 04:20**: **V20.5 books 智能 layout 启动** (K3 反馈: 翻开纪念册/毕业照/photo book 应是大幅满版照片 80%, 不是文字+小图排版; 关键词检测: photo/yearbook/graduation/album → PHOTO / textbook/notebook → TEXT; 默认 PHOTO)
- **8/15 04:42**: **V20.6 books 双版本 + 空白页修复** (K3 看图反馈 2: 翻开内页直接是空白页面; 5 books 智能 layout 落盘: BK-001 catalog → PHOTO 满版照片, BK-002 saddle-stitch → TEXT 编辑文字, BK-003 perfect-bound → TEXT, BK-004 hardcover → PHOTO 满版照片, BK-005 spiral-notebooks → TEXT; CRITICAL 加固: "no blank interior pages, no empty unprinted pages, every page must show VISIBLE DETAILED CONTENT"; prompt 内嵌 "OPEN PHOTO BOOK INTERIOR SPREAD (FULL-BLEED PHOTOGRAPHY)" 或 "OPEN BOOK INTERIOR SPREAD (EDITORIAL TEXT + ILLUSTRATION)")
- **8/15 04:50+**: **V20.7 跨 category 智能 layout** (K3 问"校园教育里面也书, 有纪念册的 SKU 呢, 更新了吗"; M3 主动分析: ED-005 graduation-yearbook 应跟 BK-004 一样走 PHOTO 满版纪念册, 不能用 educational WORKBOOK INTERIOR; 加 `BOOK_LAYOUT_OVERRIDES` SKU-level hard-code 字典 + `get_spread_scene_for_layout` 跨 category SPREAD 模板选择; detect_book_layout 加 sku_code 参数; 加 WORKBOOK layout 给校园练习册专用; 5 ED SKU 全部正确判断: ED-001/002/003/004 → TEXT 走 WORKBOOK INTERIOR, ED-005 → PHOTO 跨 category 用 books[PHOTO] 模板; 5 BK SKU 保持 V20.6 判断; 总 87 SKU 1425.8 KB 落盘)
- **8/15 04:33+**: **V20.7.1 关键词扩展** (K3 追问"聚合文件更新了吗"; M3 验证发现 ED-003 school-flyers 走 PHOTO 默认了, 因为关键词没覆盖 flyer/school/newsletter/announcement; 加 flyer/newsletter/announcement/leaflet/brochure/pamphlet 到 text_keywords, 加 school/school flyer 等到 workbook_keywords; 修复后 10 SKU 全部 PASS: ED-001/002/003/004 走 WORKBOOK, ED-005 走 PHOTO, BK-001/004 走 PHOTO, BK-002/003/005 走 TEXT)
- **8/15 04:34+**: **V20.8 cat-aware SPREAD routing** (K3 关键反馈: "BC 里面都还有书本打开的效果图, 贺卡不是书"; M3 根因: V20.7 get_spread_scene_for_layout PHOTO 分支无条件返回 books[PHOTO], 让 22 SKU 全部误用 books 模板; V20.8 重写: cat-aware routing, 7 类目用各自 SPREAD 模板; BC-EXPANDED GREETING CARD COLLECTION, PK-OPENED PACKAGE INTERIOR, CL-OPEN CALENDAR SPREAD VIEW, RP-FAN-OUT RED PACKET COLLECTION, DJ-OPEN DOUJINSHI INTERIOR, BK-books[PHOTO/TEXT], ED-WORKBOOK + ED-005 books[PHOTO] 例外; 22 SKU 全部修复)
- **8/16 01:50+**: **V20.9 anti-draft prompt + _auto_select_best.py 保护模式自动选图** (K3 拍板 4 件事执行, M3 主动 P0-2 优先; V20.9 5 个 gen_v20_*.py 函数加 PRODUCTION-READY FINAL IMAGE ONLY 前缀 + NEGATIVE_BLOCK 加 anti-draft 反向约束; _auto_select_best.py V3 保护模式: 备份 K3 原选到 backup_v20_8_k3_choice/ + 自动选图到 _auto_selected/ + 5 维度评分 design 35% / text 25% / physics 15% / brand 10% / frame 15%; 12 SKU 评分完成 BC-001 A 格式 2 候选 + 11 SKU B 格式单图; 52 张 webp 备份; 87 SKU V20.9 公式重出 1.68 MB)

## 13. books 智能 layout 决策表 (V20.7 跨 category 升级)

**核心**: V20.7 加 BOOK_LAYOUT_OVERRIDES 跨 category 智能 layout, 解决"校园教育里面有纪念册 SKU" (K3 8/15 04:50+ 反馈) 盲区.

### 13.1 BOOK_LAYOUT_OVERRIDES 字典 (K3 拍板 hard-code 例外)

```python
BOOK_LAYOUT_OVERRIDES = {
    # books 类目 (V20.6 拍板)
    "BK-001": "PHOTO",  # catalog-printing (catalog/photo book/lookbook 关键词)
    "BK-002": "TEXT",   # saddle-stitch-booklets (saddle-stitch/booklet 关键词)
    "BK-003": "TEXT",   # perfect-bound-books (perfect-bound 关键词)
    "BK-004": "PHOTO",  # hardcover-books (yearbook/wedding/family/graduation 关键词)
    "BK-005": "TEXT",   # spiral-notebooks (notebook 关键词)
    # educational 类目 (V20.7 跨 category 升级, K3 关键反馈)
    "ED-005": "PHOTO",  # graduation-yearbook 走 PHOTO 满版纪念册 (跟 BK-004 一致)
}
```

### 13.2 完整决策表 (10 SKU 跨 category)

| SKU | category | slug | nameEn 关键词 | layout | 适用风格 |
|-----|---------|------|--------------|-------|---------|
| **BK-001** | books | catalog-printing | catalog, photo, lookbook | **PHOTO** | Powell's 摄影集 / 80% 满版艺术照 |
| **BK-002** | books | saddle-stitch-booklets | saddle-stitch, booklet | **TEXT** | 学术手册 / 双栏文字 + 1 大图 |
| **BK-003** | books | perfect-bound-books | perfect-bound, report | **TEXT** | CSR 报告 / 双栏文字 + 表格 |
| **BK-004** | books | hardcover-books | yearbook, wedding, family, graduation | **PHOTO** | **K3 关键拍板** 满版纪念照 |
| **BK-005** | books | spiral-notebooks | notebook, journal, training | **TEXT** | 培训手册 / 手写笔记 + 装饰线 |
| **ED-001** | educational | exercise-books | exercise, workbook | **TEXT** | 校园练习册 / 字母数字 + 插图 |
| **ED-002** | educational | certificates | certificate, award | **TEXT** | 证书 / 烫金文字 + 装饰边框 |
| **ED-003** | educational | school-flyers | flyer, school | **TEXT** | 校园传单 / 文字 + 公告 |
| **ED-004** | educational | textbooks | textbook, training | **TEXT** | 教科书 / 双栏学术 + 章节 |
| **ED-005** | educational | graduation-yearbook | **yearbook, graduation** | **PHOTO** | **V20.7 跨 category 例外** 满版纪念照 (K3 关键反馈) |

### 13.3 detect_book_layout 函数 (V20.7 升级, sku_code 参数 + 关键词检测)

```python
def detect_book_layout(slug="", name_en="", sku_code=""):
    """V20.7 跨 category 智能 layout. 返回 'PHOTO' / 'TEXT' / 'WORKBOOK'."""
    if sku_code in BOOK_LAYOUT_OVERRIDES:        # SKU-level 优先
        return BOOK_LAYOUT_OVERRIDES[sku_code]
    blob = f"{slug} {name_en}".lower()
    photo_keywords = ["photo", "yearbook", "commemorative", "graduation", "album",
                      "class-of", "class of", "memory", "memoir", "portfolio", "wedding",
                      "family", "lookbook", "catalog", "exhibition"]
    text_keywords = ["textbook", "academic", "saddle-stitch", "saddle stitch", "booklet",
                     "notebook", "journal", "novel", "manual", "report", "perfect-bound",
                     "perfect bound", "training", "workbook", "exercise", "certificate"]
    workbook_keywords = ["exercise", "workbook", "textbook", "training", "education", "school material"]
    photo_score = sum(1 for kw in photo_keywords if kw in blob)
    text_score = sum(1 for kw in text_keywords if kw in blob)
    workbook_score = sum(1 for kw in workbook_keywords if kw in blob)
    if photo_score > 0 and photo_score > text_score and photo_score > workbook_score:
        return "PHOTO"
    if workbook_score > text_score and workbook_score > 0:
        return "WORKBOOK"
    if text_score > photo_score:
        return "TEXT"
    return "PHOTO"  # 默认 PHOTO
```

### 13.4 get_spread_scene_for_layout 跨 category SPREAD 模板选择 (V20.7 新增)

```python
def get_spread_scene_for_layout(cat, layout):
    """V20.7 跨 category SPREAD 模板. 优先 books[PHOTO] > books[TEXT] > category 默认."""
    if layout == "PHOTO":
        return SPREAD_SCENE_LIBRARY["books"]["PHOTO"]   # ED-005 yearbook 用 books[PHOTO]
    if layout == "TEXT":
        if cat == "books":
            return SPREAD_SCENE_LIBRARY["books"]["TEXT"]
        return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])
    if layout == "WORKBOOK":
        return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])
    return SPREAD_SCENE_LIBRARY.get(cat, SPREAD_SCENE_LIBRARY["books"]["TEXT"])
```

**关键洞察** (M3 主动分析, K3 8/15 04:50+ 反馈启发):
- 跨 category 智能 layout = SKU-level override + category default + keyword scoring 三层
- `BOOK_LAYOUT_OVERRIDES` 是 K3 拍板的 hard-code 例外, 优先于关键词检测
- `get_spread_scene_for_layout` 让 SPREAD 模板可跨 category 复用 (ED-005 用 books[PHOTO])
- 加 WORKBOOK layout 类型 (校园练习册专用, 跟 TEXT 编辑设计区分)

### 13.5 PHOTO / TEXT / WORKBOOK 关键差异 (豆包生图时重要区分)

- **PHOTO** = 80% 满版照 (Apple Photo Book / Artifact Uprising / Blurb / National Geographic 风格), 简短 EN caption (3-8 词), 极简文字, 照片主导
- **TEXT** = 编辑设计 (Powell's / Strand 畅销书风格), 2-3 栏文本 + drop cap + pull quote, 文字+插图平衡, 章首装饰
- **WORKBOOK** = 校园教育 (Brightleaf Learning 风格), 练习题/traceable 字母数字, 字母 ABC + 数字 123 + 卡通插图, 鲜艳原色

### 13.6 V20.6 books 加固 negative (BOOKS_SPREAD_NEGATIVE_SUFFIX, K3 8/15 04:42 反馈 "翻开内页空白")

```
no blank interior pages, no empty unprinted pages, no missing interior content,
no unprinted paper showing through, every page must show VISIBLE DETAILED CONTENT
either a photograph or printed text or illustration, the book must be a FINISHED
PRINTED PRODUCT not an empty shell, interior pages fully populated with content.
```

### 13.7 V20.9 anti-draft prompt 升级 (K3 8/16 01:50 拍板 P0-1)

**根因**: 豆包 (Seedream 5.0) "重新生图" 按钮出 2 张候选, UI 排序固定 (第 1 张 = 早期 step sampling 草稿, 第 2 张 = 中后期 step sampling 稳态). K3 反复观察 "第 2 张总比第 1 张好" 实际工作流痛点.

**V20.9 改动**:
1. **5 个 gen_v20_*.py 函数开头加 PRODUCTION-READY 前缀**:
   ```
   生图图片: PRODUCTION-READY FINAL IMAGE ONLY, NOT a draft or sketch or test render.
   Output the SINGLE polished camera-ready composition as if it were the best of 4 candidates,
   skip early sampling stages entirely.
   Seedream 5.0 e-commerce product photo generation, 电商主图 #N <view>, ...
   ```
2. **NEGATIVE_BLOCK 末尾加 anti-draft 反向约束**:
   ```
   no draft composition, no sketch, no test render, no early-stage sampling,
   no work-in-progress, no low-quality preview, no placeholder elements,
   no partial layout, no exploratory composition, no A/B test format,
   no before/after format, no two candidates side by side,
   no candidate 1 vs candidate 2 output,
   each generated image must be the SINGLE FINAL POLISHED VERSION ready for commercial use
   ```

**风险评估**: 30% 豆包不接 (UI 强制 2 候选), 但 prompt 显式 anti-draft 至少让豆包"理解" K3 想要稳态, 提升第 1 张质量. K3 验证方法: BC-001 跑 V20.9 对比 V20.8, 看 2 张候选是否都变稳态.

### 13.8 _auto_select_best.py 保护模式自动选图 (K3 8/16 01:50 拍板 P0-2)

**核心**: 既然豆包 UI 第 2 张总是好, M3 写 Python 脚本自动选高分. 0 外部依赖 (Pillow + numpy + shutil), Windows 兼容.

**5 维度评分** (V2 权重, K3 拍板 - 设计美感优先 35%):
1. **设计美感 (35%)**: 暖色 (r_mean - b_mean) + 高饱和 (HSV S 均值)
2. **字符可读 (25%)**: Sobel 锐度 + 中央 50% 区域高频像素密度
3. **物理合理 (15%)**: Canny-like 边缘丰富度 (dx/dy > 30 像素占比)
4. **14 虚构公司一致 (10%)**: 中央 50% 文字 sweet spot (40-60% 是最佳, 太多/太少都扣分)
5. **frame 占比 (15%)**: 中央 60% 区域饱和度均值

**保护模式 (V3, 8/16 01:55 升级)**:
- 备份 K3 原选 webp 到 `{SKU}/backup_v20_8_k3_choice/` (52 张)
- 自动选图落盘到 `{SKU}/_auto_selected/{slug}.webp` (不覆盖原 webp)
- K3 审核对比报告后再决定是否替换 (避免 V2 误覆盖 K3 选)

**两种数据格式自适应**:
- **A 格式** (BC-001 类): `raw/_cand/*_cand1.jpg + *_cand2.jpg` (豆包"重新生图"按钮 2 候选)
- **B 格式** (ST-001/FL-001 类): `raw/*_raw.jpg` (豆包"生图"按钮 1 张直出, 评分无对照)

**12 SKU 评分落盘 (8/16 02:00 完成)**:
- A 格式 (1 SKU): BC-001 - 5 视图 cand1 3 胜 + cand2 2 胜 (脚本评分 vs K3 眼睛有差异)
- B 格式 (11 SKU): BC-002/003/004/005/006 + ST-001/002/003/004/005 + FL-001 - 单图评分
- alt-v20-cand-scores.json (38.7 KB) 完整评分明细

**BC-001 5 视图脚本评分 vs K3 眼睛感知对比** (关键发现):
| 视图 | cand1 评分 | cand2 评分 | 脚本选 | K3 选 (V20.8 webp) | 一致? |
|------|-----------|-----------|--------|-------------------|--------|
| detail | 45.6 | 39.0 | **cand1** | cand2 (V20.8 webp) | ❌ 反 K3 经验 |
| hero | 35.6 | 30.8 | **cand1** | cand2 (V20.8 webp) | ❌ 反 K3 经验 |
| multi-angle | 46.2 | 39.9 | **cand1** | cand2 (V20.8 webp) | ❌ 反 K3 经验 |
| spread | 35.7 | 44.5 | **cand2** ✓ | cand2 (V20.8 webp) | ✅ 一致 |
| variety | 50.6 | 54.3 | **cand2** ✓ | cand2 (V20.8 webp) | ✅ 一致 |

**根因分析** (M3 主动): 脚本 5 维度客观评分 (字符可读 25% + 设计美感 35%) vs K3 眼睛主观感知 (设计美感 100%). K3 "漂亮"标准跟脚本"设计美感"不完全一致. 后续 K3 验证 V20.9 + 重新校准权重.

**K3 下一步**:
1. 对比 `{SKU}/backup_v20_8_k3_choice/` (K3 原选 V20.8) vs `{SKU}/_auto_selected/` (V20.9 自动选)
2. K3 拍板: 哪些用 K3 原选 / 哪些用自动选 / 哪些重跑 V20.9 公式
3. 批量重跑 87 SKU (P3 决策)

---

**这就是 K3 8/15 03:43 拍板的"自进化能力" - V20.2 公式 + 升级 SOP 永久保留为 SSoT**。
