# Batch B 执行记录：全站 SKU 图补齐 + blog 图补全 + Tier1 301 止血（2026-10-12）

## K3 指令原文
> `F:\zprintpro-nextjs\zprintpro-en-us-images\v28_5_webp` 有所有SKU的图片，先把zprintpro.com网站三语言下没有图片的SKU找到对应的图片进行上传，文件名，alt 等必须符合关键词SEO+AEO+GEO排名至首页的技术要求…另blog页中缺少图片的，也可加上最接受的SKU的首图做为blog文件的图片

## 拍板记录
- **Tier1 301 止血方案**（17:5x K3 拍板选 ①）：7 条坠 404 的退役 301 改指现存真 PDP（婚宴 3 件→foil-wedding-invitations；卡类 3 件+postcard→premium-greeting-cards；eco-tote-bag 链已 200 不动）。
- 母页 SKU（place-cards / wedding-invitations / greeting-cards）是否新建 → Wave-2 再议（本次不建）。

## 数据来源
- 缺图审计：`.hermes/_img_audit3.py`（字符串感知花括号配对终版，双方法复核）
- v28_5 图库：`zprintpro-en-us-images/v28_5_webp/`（91 SKU 目录，只读冻结，本轮仅复制出不 commit 原目录）
- Tier1 链终态：`.hermes/_chain_probe.py` 线上逐跳实测（8 条链，7 条曾终态 404）
- blog 覆盖：`.hermes/_blog_m3_fix.py` 终验（109 键，3 语全 slug 0 缺口，无重复键）
- 产品计数：`products` 数组字符串感知解析 = **82 条目**（此前 blog 报告写 83，已修正）

## 执行内容
1. **36 图入库**：WI-001（foil-wedding 12）+ WI-003（wedding-thank-you 12）+ PC-001（place-cards 12，母页资产备用）→ `public/images/products/seedream-webp/`（保留 v28_5 原名，view 后缀命名）。
2. **products.ts**：
   - foil-wedding-invitations / wedding-thank-you-cards 两零图条目补 `imagesByLocale` + `seoImages`（per-locale alt：关键词|规格|品牌，zh=智印港，en/ja=ZprintPro），legacy images[] 修指 webp hero；
   - roll-stickers legacy jpg → webp hero；
   - 摘除 11 条悬空 `-5.webp` 死引用（文件从未存在，全站 404）；
   - premium-greeting-cards 误伤数组已还原 v26 路径（当日手术误靶，已断言验证，贺卡六兄弟无损）。
3. **blog 图**（19+2 条）：
   - `blog-m3-images.ts` 扩为 `string | Record<locale,string>` 双形态，新增 19 篇无图 blog → 最近 SKU per-locale 首图（SKU 首图含本地化文案，per-locale 为正确形态）+ 新增 getBlogImage 统一解析口；
   - 6 消费点改造：Header 下拉 / blog 列表（BlogContent 内聚，去掉 prop 透传）/ 详情 hero / 首页印刷知識 / nav / JSON-LD；
   - **og:image 修复**：原写死 `/images/articles/{slug}.jpg`（该目录仅 12 文件，~95% 博文 og 404），现与 hero 同源（webp 1200×1200 申报，Discover 合规），无图时省略不发射假 og。
4. **Tier1 301 改指**（middleware RETIRED_PRODUCT_REDIRECTS 7 条，见拍板）。
5. **blog 计数 83→82** 修正（价格报告博文 ×3 语，title/description/excerpt/content）。
6. image sitemap regen：82 产品 / 1066 图。

## 门童
- encoding ✓ / tsc 54=基线 ✓ / check-brand-mentions --strict A 类 0 ✓ / gsc-leak ✓ / image sitemap regen ✓

## 遗留 / Wave-2
- 母页 SKU 三件套是否新建（K3 再议；PC-001/WI-002 图资产已备）
- wedding-invitations（分类页）仍挂 premium 贺卡图 —— 该分类页无专属产品图，若建母页 SKU 一并解决
- PC-001 12 文件当前未被任何条目引用（备用资产）
- blog 列表卡片缩略图仍为文字卡（本次未动 UI，og+hero+JSON-LD 已覆盖 SEO/AEO/GEO 诉求）
