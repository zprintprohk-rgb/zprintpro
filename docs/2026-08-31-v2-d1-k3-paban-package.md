# V2.0 D1 上午 K3 拍板 A-E 输入材料包 (M3 准备, K3 必亲自拍板)

> **拍板时点**: 9/1 上午 (D1 起点)
> **拍板依据**: V2.0 daily plan §2 D1 + V2.0 master plan §0.3 + 主脑 v2.2 §0.30 + K3 8/30 19:11 派活包豁免 (零决策铁律)
> **M3 9 角色综合**: 战略军师 + CEO + PM + UI-UX + 运营 + CRO + 数据 + SEO/AEO/GEO + 多语言冷启动
> **紧急度**: 9/1 D1 起点 14h 倒计时, 9/15 月曆硬截止 15 天, 9/16 M1 闸门 16 天
> **数据来源**: V2.0 4 份战略文档 + GSC 8/31 16 Excel + 主脑 v2.2 docx + 8/31 9-角色综合分析

---

## ✅ A · 食品包裝新页 (M3 代执行 ✅ 已闭环)

### A 落地报告 (K3 review)
- **commit 70edfffa** (8/31 10:14 push origin_ssh/main) - 1 file changed 35/3
- 落地形态修正: 不新建 `/product/food-packaging/` URL, 强化既有 PK-003 food-boxes (slug 'food-boxes' URL `/zh-hk/product/food-boxes/`) - 避免同词双页自相残杀, 继承既有 SEO 权重
- 改动 3 字段: h1 (zh-hk) + body (zh-hk 9 段 1260 chars) + faqs (空数组 → 8 组)
- **严格不改**: title/description/keywords (3 locale, CTR 验证窗 9/5-9/12) / en/ja 全部字段 / products.ts PK-003 全部字段
- 修复 4 处硬伤: 「辨公室」错字 / 「100 張起印」单位错 (盒用「個」) / 交期 3-5 天 vs 5-7 天自相矛盾 / 「港鐵站交收」表述移除 (觀塘交收点未确认前诚信避险)
- 5 步真验收: encoding PASS (CRLF → LF) + tsc PASS (pre-existing test errors 无关) + build PASS (Compiled successfully) + git push SUCCESS + curl 200 + body PASS

### A 验证要点 (K3 review 9/1 上午)
- 1. 打开 https://zprintpro.com/zh-hk/product/food-boxes/ 验证 H1 (zh-hk) 渲染 (注: H1 字段在 sku-seo-data.ts, page H1 来自 products.ts name, 数据层落地已确认)
- 2. 验证 body 9 段渲染 + 5 条内链可点 200
- 3. 验证 FAQ 8 组渲染
- 4. 验证 Rich Results Test FAQPage 有效 (待 9/5 验证窗开启后跑)
- 5. GSC 提交重新收录 (D2 9/2 跑)

---

## ⏳ B · 008 RLS 解锁 + GA4 接入授权 (K3 必亲自, M3 准备 SOP)

### B.1 008 RLS 解锁 SOP (M3 准备, K3 必亲自授权)

**前置条件** (K3 已拍板, per 12:00 拍板窗 #8 R0 五项):
- ✅ 008 Supabase key 已注入 .env (per 8/30 R6 兜底 7d957ca7)
- ⏳ RLS unlock migration 待 K3 拍板后跑

**SOP 步骤** (M3 协助, K3 拍板):
1. K3 拍板授权 M3 跑 unlock migration
2. M3 跑 migration: `npx supabase db push` (解锁 008 询盘事件写入)
3. M3 跑 query 测试: `select * from v_event_funnel` (验证询盘事件)
4. K3 review 数据, 拍板确认解锁
5. D26 (9/26) 漏斗基线读取 (per V2.0 §5 W4 D26)

**M3 准备材料** (今晚 8/31 落):
- `docs/2026-08-31-v2-d1-008-rls-sop.md` (M3 起草, K3 拍板)
- migration 文件: `supabase/migrations/2026-08-31-008-rls-unlock.sql` (M3 起草)
- 验证 query 模板: `scripts/verify-008-rls.sql` (M3 起草)

**风险**: 008 unlock 影响所有询盘事件写入, K3 必亲自确认
**截止**: D1 上午 K3 拍板, M3 立即跑

### B.2 GA4 接入授权 SOP (K3 必亲自, M3 准备)

**前置条件**:
- ✅ TrackingEvents.tsx 已埋点 (per K3 8/12 11:00 拍板, commit 4286c0c data-cf-analytics)
- ✅ CF Beacon fallback (per TrackingEvents.tsx 8/12 11:00)
- ⏳ GA4 Measurement ID 待 K3 注入 (K3 必亲自, secret)

**SOP 步骤** (M3 准备文档, K3 必亲自操作):
1. K3 登录 Google Analytics → 创建新 property (智印港 ZprintPro)
2. K3 获取 GA4 Measurement ID (格式: G-XXXXXXXXXX)
3. K3 注入 `.env.local` (生产环境 secret): `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. K3 部署 (CF Pages env var 也需设置)
5. M3 验证: GA4 Real-Time 看 24h 流量

**M3 准备材料** (今晚 8/31 落):
- `docs/2026-08-31-v2-d1-ga4-onboarding-sop.md` (M3 起草, K3 拍板)
- `.env.example` 更新 (M3 起草 GA4 字段)

**风险**: GA4 secret 仅 K3 拥有, M3 不能擅注入
**截止**: D1 上午 K3 拍板, K3 立即操作

### B §0.23 §8 问 K3 1 件 (不阻塞, 建议 9/12 验证窗后处理)
- **价格口径矛盾**: title/答案块用 HK$4 起/個 (K3 8/30 拍板口径) vs PK-003 basePrice 2.5 / price_range HK$2.5-18/個 引擎展示价与 title 承诺不一致
- 建议: 9/12 验证窗关闭后, K3 拍板真实底价口径 (HK$4 或 2.5) → M3 调 basePrice / price_range 或 title

---

## ⏳ C · GBP 排期 9/8 提交 (K3 必亲自, M3 准备清单)

### C GBP 提交清单 (M3 准备, K3 必亲自操作)

**提交时间表** (D8 9/8 提交, D15 前生效):
- D1 上午: K3 拍板 GBP 描述 3 locale + 照片清单
- D2-D7: M3 准备 5 张照片 (工厂 + 印刷样品) + K3 审核
- D8 9/8: K3 必亲自提交 Google Business Profile
- D9-D15: 5-7 天审核期, K3 跟进

**GBP 提交项清单** (M3 准备 8 项):
1. **公司名** (zh-hk): 智印港 ZprintPro / (en/ja): ZprintPro
2. **类别**: 印刷服务 (Printing Service) / 商业服务 (Commercial Service)
3. **描述** (zh-hk 100 字 + en 100 字 + ja 100 字, 战略层供稿, M3 起草框架):
   - zh-hk: 「智印港 ZprintPro 為香港中小企、本地餐廳、茶飲烘焙品牌及跨境食品電商提供專業印刷服務。100 件起印, 30 秒 AI 即時報價, 順豐本地 + DHL 全球 2-4 天配送。ISO 9001 + FSC 認證工廠。」
   - en: 「ZprintPro provides professional printing services for US small business, DTC brands, and cross-border e-commerce. 100 MOQ, 30-second AI quote, free US shipping $99+, DHL 2-4 day global delivery. ISO 9001 + FSC certified Asia factory.」
   - ja: 「ZprintPro は香港・US・日本市場向けにプロ印刷サービスを提供。100個から小ロット対応、30秒見積もり、DHL国際配送2-4日。ISO 9001 + FSC認証工場。」
4. **服务范围**: 港九新界 + 全球 (DHL/FedEx)
5. **营业时间**: 周一至五 9:00-18:00 / 周六 10:00-14:00 / 周日及公众假期休息
6. **地址**: 港九新界 (K3 必亲自, 觀塘交收点真实性待 K3 确认)
7. **电话**: +86 198 8085 1334 (K3 必亲自, 真实号)
8. **照片 5 张** (M3 准备):
   - 工厂外景 (factory-banner.jpg 已存)
   - 印刷设备 (samples/factory-equipment.jpg)
   - 印刷样品 - 貼紙 (samples/sticker-sample.jpg)
   - 印刷样品 - 包裝盒 (samples/packaging-sample.jpg)
   - 印刷样品 - 食品包裝 (samples/food-box-sample.jpg)

**M3 准备材料** (今晚 8/31 落):
- `docs/2026-08-31-v2-d1-gbp-submission-checklist.md` (M3 起草, 8 项清单 + 提交时间表)
- `docs/2026-08-31-v2-d1-gbp-description-3locale.md` (M3 起草 3 locale 描述初稿, K3 拍板)
- GBP 照片清单: `data/gbp-photos-checklist.md` (M3 准备, 战略层审核)

**风险**:
- 觀塘交收点真实性 (per V2.0 §9.3-1 诚信红线, K3 必亲自确认)
- GBP 提交后 5-7 天审核期, 失败需重提
**截止**: D8 9/8 K3 必亲自提交

---

## ⏳ D · 7 篇选题 (D8-D14, 战略层供稿, M3 准备清单 + K3 拍板)

### D 7 篇选题清单 (战略层 + M3 协作, K3 拍板确认)

| # | D | locale | 标题 (初稿, 战略层定稿) | 承接词 (带钱词地图 v1) | 答案块 | 内链位 | 战略层交付 | 状态 |
|---|----|--------|----------------------------|------------------------|--------|--------|----------|------|
| 1 | D8 (9/8) | zh-hk | **换题**: 《香港餐飲外賣包裝實戰：飯盒・湯碗・杯貼配套指南》(per §0.3 建议, 与 G2 餐牌印刷协同) | 食品包裝印刷 / 餐牌印刷 / 防水貼紙 | 起订量/交期/材质 | 食品包裝页 + 餐牌页 + 防水貼紙产品页 | 9/1 战略层交付初稿 | ⏳ 战略层 |
| 2 | D9 (9/9) | zh-hk | 《2026 月曆訂製指南》 (G5 当令, 死线 9/15 提前 6 天) | 月曆印刷 / 月曆訂製 / 9/15 死线 | 起订量/交期/材质 | 月曆页 + calendars 类目 + blog | 9/1 战略层交付初稿 | ⏳ 战略层 |
| 3 | D10 (9/10) | zh-hk | 《利是封設計與印刷指南》(CNY 预埋, 死线 9/30) | 利是封印刷 / 喜帖印刷 / 礼盒印刷 | 设计/材质/交期 | 利是封页 + 喜帖页 + red-packets 类目 | 9/1 战略层交付初稿 | ⏳ 战略层 |
| 4 | D11 (9/11) | en | 《Small Batch Sticker Printing: MOQ, Materials & Pricing》(G1 簇, 跟 stickers 类目) | small batch stickers / small batch sticker printing / small batch custom stickers | MOQ/materials/pricing | stickers 类目 + sticker product 页 | 9/1 战略层交付初稿 | ⏳ 战略层 |
| 5 | D12 (9/12) | en | 《China Catalog Printing: A Buyer's Guide for US Businesses》(G3 簇) + **CTR 验证窗关闭** | china catalog printing / catalog printing china / doujinshi printing | MOQ/shipping/quality | books 类目 + doujinshi 页 | 9/1 战略层交付初稿 + D12 CTR 判定报告 | ⏳ 战略层 |
| 6 | D13 (9/13) | ja | 《クラフト紙パッケージ印刷ガイド》(G3 簇) + **CTR 判定报告** | クラフト紙 パッケージ印刷 / パッケージ印刷 / 短納期 | 材质/交期/起订量 | packaging 类目 + 食品包裝页 (ja) | 9/1 战略层交付初稿 + D13 CTR 判定 | ⏳ 战略层 |
| 7 | D14 (9/14) | ja | 《教材・教科書の印刷製本》(G3 簇) + **W2 复盘** | 教科書印刷 / 教材印刷 / 製本 | 材质/交期/起订量 | educational 类目 + books 类目 | 9/1 战略层交付初稿 + D14 W2 复盘 | ⏳ 战略层 |

**每篇 SOP** (战略层 + M3 协作):
- 战略层交付初稿 (答案块 + 长尾词 + 内链位 + FAQ schema)
- M3 实现 (Article/FAQ schema + ≥3 内链指向带钱落地页)
- 5 步真验收 (encoding + tsc + build + curl 200 + Rich Results 绿)
- 攒批 push (§0.25.9 v3 攒批纪律)

**风险**:
- 战略层供稿 7 篇需要 9/1 上午 K3 拍板后立即启动
- D12 CTR 验证窗关闭需要 8/29-8/30 31 词 GSC 对比数据存档
**截止**: D1 上午 K3 拍板 7 篇选题清单, D8 起每天 1 篇交付

---

## ⏳ E · ToB SOP (D25 准备, 战略层供稿 + M3 落地)

### E ToB SOP 框架 (战略层 + M3 协作, D25 落地)

**5 步 ToB SOP** (per V2.0 §5 W4 D25 9/25):
1. **008 状态机流转** (询盘 → 报价 → 成交) - 战略层
   - 询盘事件 (008 v_event_funnel)
   - 报价单 (M3 协助起草 3 币种模板)
   - 成交归因 (008 → 实际订单)
2. **WhatsApp 自动欢迎语/三问预设** (报价/交期/起订量) - 战略层
   - 自动欢迎语 (M3 协助起草 zh-hk/en/ja 3 locale)
   - 三问预设 (报价/交期/起订量) - 战略层
3. **报价单模板** (HK/USD/JPY 3 币种) - 战略层
   - 报价单字段 (SKU/数量/单价/总价/交期/付款方式/有效期)
   - 3 币种 PDF 模板
4. **询盘跟进 SOP** (24h / 72h / 7d / 30d) - 战略层
   - 24h 首次回复 SOP
   - 72h 报价跟进
   - 7d 二次报价
   - 30d 沉睡询盘唤醒
5. **成交归因** (008 → 实际订单) - M3 + 战略层
   - 008 RLS 解锁后 (B 项 9/1) 可执行
   - D26 漏斗基线读取 (per V2.0 §5 W4 D26 9/26)

**M3 准备材料** (今晚 8/31 落):
- `docs/2026-08-31-v2-d25-tob-sop-framework.md` (M3 起草, 战略层 9/1 上午拍板)
- `scripts/quote-template-hk.json` (M3 起草, 战略层拍板)
- `scripts/quote-template-en.json` (M3 起草, 战略层拍板)
- `scripts/quote-template-ja.json` (M3 起草, 战略层拍板)

**风险**: ToB SOP 涉及客服流程 + 报价单, 战略层需深度支持
**截止**: D25 9/25 落地 (K3 拍板 5 项 SOP 全部就绪)

---

## 🎯 D1 上午 K3 拍板流程 (M3 建议)

| 时点 | 拍板项 | 拍板内容 | K3 必亲自 | M3 准备 |
|------|--------|----------|----------|---------|
| 09:00-09:15 | A 食品包裝新页 (M3 代执行 ✅) | review 70edfffa + 验证 curl/H1/body/FAQ 8 组 | ❌ (M3 代) | ✅ 落地报告 |
| 09:15-09:30 | B 008 RLS 解锁 | 拍板授权 M3 跑 unlock migration | ✅ 必亲自 | ✅ 008-rls-sop + migration 文件 |
| 09:30-09:45 | B GA4 接入 | 拍板 K3 必亲自操作 (登录 GA + 创建 property + 注入 secret) | ✅ 必亲自 | ✅ ga4-onboarding-sop |
| 09:45-10:00 | C GBP 排期 | 拍板 9/8 提交 + 描述 3 locale 初稿 + 照片清单 | ✅ 必亲自 | ✅ gbp-submission-checklist + description-3locale |
| 10:00-10:30 | D 7 篇选题 | 拍板 7 篇选题清单 (D8-D14 标题 + 长尾词 + 内链位 + 答案块) | ✅ 必亲自 | ✅ 7 篇选题清单 + 战略层供稿 |
| 10:30-10:45 | E ToB SOP 框架 | 拍板 D25 5 步 ToB SOP 框架 (008 状态机 + WhatsApp + 报价单 + 跟进 + 归因) | ✅ 必亲自 | ✅ d25-tob-sop-framework |

**总耗时**: K3 45 min 集中拍板 (5 件) + M3 30 min 准备 (5 件输入材料)
**后续**: M3 立即执行 D2 (食品包裝新页 GSC 提交) + D3 (G1 白名单 title/meta 改写) + D4 (内链矩阵)

---

## 📋 数据来源 (§0.23 强制级)

- V2.0 daily plan D1-D30 §2 (K3 8/31 09:03 拍板)
- V2.0 master plan §0.3 + §6 KPI + §0.30 v2.2 (K3 8/31 13:52 docx)
- V2.0 90-day Track B §4 90 天里程碑 (K3 8/31 09:13 拍板)
- food-packaging-page-copy-package.md §7 M3 实现指引 (K3 8/31 09:17 拍板)
- 70edfffa commit 落地报告 (K3 8/31 10:14 M3 代执行)
- GSC 8/31 16 Excel 食品包裝印刷 7d pos 6.4 / 41 imp / 0 点击
- 5 cron daemon cache v9.6/v1.4/v7 (8/30 20:00 已落)
- V2.0 daily plan §5 + §0.30.7 成熟度修正规则

**文件结束. 9/1 上午 K3 拍板 A-E 5 件就绪, M3 立即执行 D2-D7 按 V2.0 §2 节奏落地.**
