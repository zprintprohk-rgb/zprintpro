# K3 指令包 v9.2 — PLP/PDP 模板全站对齐 + Blog/Contact 重设计 + 导航纸袋下拉修复

> **下达**: 2026-09-10 12:20 老板拍板（PDP + PLP 模板确认定型）
> **执行层**: autoclaw 主力 / deepseek hermes 承接长批次
> **模板蓝本（唯一 SSoT，禁止自由发挥）**:
> - 线上定型页: `https://zprintpro.com/zh-hk/category/stickers/`（PLP）+ `https://zprintpro.com/zh-hk/product/waterproof-stickers/`（PDP）
> - 代码实装: `src/app/[locale]/category/[slug]/page.tsx` + 相关 category 组件 / `src/app/[locale]/product/[slug]/page.tsx` + product 组件（stickers 与 waterproof-stickers 已定型，提取为可复用模板）
> **主脑 v3.0 对齐**: 大脑只派活不执行；§0.25.9 攒批 push（30min 硬下限 + ≥1 src 行为修复/批）；作业窗口 19:00-07:30；幂等铁律（派活前 grep 实测，不重复做已完成的事）。

---

## 任务 A（P0 · 先行单独修）导航纸袋下拉出屏修复

**根因（已实证，勿重新排查）**: `src/components/layout/Header.tsx` 第 116-124 行 `dropdownOffsets` 硬编码偏移表。紙袋印刷（paper-bags）当前值 `'translateX(calc(-50% + 240px))'` 是它排在导航**左边第 1 位**时的旧值；权重调整后被移到**倒数第 2 位**，+240px 正偏移导致 950px 宽下拉面板右半截出屏。

**修法（对齐 educational 校園印刷的负偏移模式）**:
```ts
// Header.tsx dropdownOffsets 只改 1 行:
'paper-bags': 'translateX(calc(-50% - 240px))',  // 原 +240 → 改 -240, 与 blog 同档
```
- ❌ 禁止改其他类目偏移值
- ❌ 禁止改下拉宽度 950 / 结构
- ✅ 验收： 1440px 桌面打开首页 → hover 紙袋印刷 → 下拉右缘 ≤ 视口右缘 24px 内；同时回归 hover 校園印刷/印刷知識确认未被误伤
- ✅ grep 验收: `grep -n "paper-bags" src/components/layout/Header.tsx` 显示 `-240px`
- ✅ 属 §0.25.10「小改动免预览直推生产」范围：本地 tsc + build 过后可直接进攒批

---

## 任务 B（P0 · 主线）PLP 模板对齐 15 分类 × 3 语言

**范围**: 全部 category slug（products.ts 现行注册为准，约 15 个：stickers/flyers/packaging/paper-bags/posters/books/educational/menus/red-packets/calendars/banners/envelopes/greeting-cards/wedding-invitations/place-cards 等）× zh-hk/en/ja 三 locale。

**对齐清单（以 stickers 页为蓝本逐区块复制结构，内容用各分类现有文案，禁止改写）**:
1. Banner 左文右图： 左 H1+副标+4 信任徽章（文案不动），右分类 hero 图（`public/images/hero/hero-{slug}-{locale}.webp` 已存在，用同名规则；缺图分类先 grep 确认再留占位注释，禁止编造图名）
2. 3 个直接答案卡（AEO）：延用各分类现有 FAQ/答案内容重排为 3 列白卡
3. SKU 网格紧随其后（SKU 优先原则），产品图 1:1（`aspect-ratio: 1/1`），卡片固行对齐（标题 2 行 clamp / 参数等宽 2 行 / 价格 nowrap / 按钮钉底）
4. SpecFinder 紧凑单行条，放网格后
5. 核心競爭優勢： 编辑式 01/02/03 编号排版
6. 满版色交替： 材質工藝/技術參數/行業場景/6 步流程 4 区块 `#F2F6FF` 浅蓝带（圆角 22px），白底交替；藏青渐变仅 Banner/數據帶/页脚
7. 選購指南： 杂志排版（首段 19px+墨线+首字下沉蓝 3.2em；正文 17px justify；金句段橙底条）
8. FAQ 手风琴 + 渠道比較表（智印港列橙高亮）
9. 字号基线 17.5px（对齐 globals.css）

**en/ja 注意**:
- 结构完全同 zh-hk，文案用 messages/ 现有 en/ja 条目，禁止机翻新造
- hero 图用 `hero-{slug}-en.webp` / `hero-{slug}-ja.webp`
- ja 不出现「深圳」「中国」前缀（§13.10）；en 不硬塞 Shenzhen/Hong Kong

**批次纪律（防 CF quota 浪费 + 可控回滚）**:
- 批 B1: zh-hk 15 分类（1 commit）
- 批 B2: en 15 分类（1 commit）
- 批 B3: ja 15 分类（1 commit）
- 每批独立可 revert；批间跑验收 grep

---

## 任务 C（P0 · 主线）PDP 模板对齐全部 SKU × 3 语言

**范围**: products.ts 现行全部 SKU（97+）× 3 locale。以 waterproof-stickers 页为蓝本。

**对齐清单**:
1. Hero 首屏内容冻结，仅视觉层：主图 4:3 + 四角 1.5px 裁切标记，缩略图 4 张 1:1
2. 价格阶梯： 大数字折扣 % + 横条图 + 最抵档橙高亮「最抵」标签（数据从各 SKU 现行价格表读，禁止编数字）
3. 右栏 sticky 报价轨（桌面 top:88px）
4. 交期承诺 3 卡：即日卡藏青渐变
5. 產品詳情 5 手风琴
6. 工廠品控 3 实拍图带等宽 caption。**图片选择按品类工艺对号入座**:
   - 柯式印刷类（贴纸/传单/海报/书籍等）: `factory-heidelberg-6plus1.webp`
   - 不干胶标签类: `factory-weigang-uv.webp`（caption「輪轉 UV 印刷機 · 貼紙標籤專線」）
   - 数码/包装类: `factory-hpindigo.webp` 或对应工艺实拍（`ls public/images/factory/` 先核对现有文件，禁止编造图名）
   - 品控位统一 `factory-color-chart.webp`
7. 適用場景與檔案規格： 双栏杂志版式（左首字下沉+场景胶囊+长文；右 sticky 交稿規範参数卡 + 橙底免費打稿条），文字逐字保留
8. 為何選擇 6 格 + FAQ + 相關產品 4 卡 + 页底 CTA
9. 移动端吸底报价轨（≤640px）

**批次纪律**:
- 批 C1: zh-hk 全 SKU（1 commit）
- 批 C2: en 全 SKU（1 commit）
- 批 C3: ja 全 SKU（1 commit）

---

## 任务 D（P1）Blog 二级页面（/blog/ 列表页）UX/UI 重设计

**现状问题（老板原话）**: 设计非常难受。
**对齐目标**: 视觉语言与 PLP v9.1 同族（三色调令牌 / 17.5px 基线 / 1320px 容器 / 满版色交替 / 编辑式排版）。

**重设计结构**:
1. Banner： 藏青渐变，左 H1「印刷知識」+ 副标 + 右侧装饰（不放侵权图，用排版/几何）
2. 精选/最新文章区： 头条大图卡（1 张 2:1）+ 次条 2 卡横排
3. 文章网格： 3 列白卡（封面 16:9 + 分类胶囊标签 + 标题 2 行 clamp + 摘要 2 行 + 日期/阅读时长等宽小字），卡片 hover 仅边框+阴影（禁缩放位移）
4. 分类筛选条： 紧凑单行（与 PLP SpecFinder 同语言）
5. 满版色交替： 每 2 个区块一组白/浅蓝
6. 页底 CTA： 藏青渐变带 + 橙「免費報價」+ 绿 WhatsApp
7. ❌ 禁动： 文章 slug/标题/摘要文字、blog 详情页、articleSlugs 注册表

## 任务 E（P1）Contact 页面 UX/UI 重设计

**对齐目标**: 同 PLP 模板语言。
**重设计结构**:
1. Banner 藏青渐变： H1「聯絡我們」+ 副标「2 小時內回覆 · WhatsApp 即時報價」
2. 双栏主体： 左栏询盘表单（字段最少化：姓名/電話或電郵/產品/數量/留言；提交接 `/api/quote`，字段映射不动）；右栏联系卡（WhatsApp +86 198 8085 1334 大按钮绿 / 邮箱 zprintpro@outlook.com / 深圳公司信息 NAP 真实地址 / 服務時間）
3. 信任带： 4 徽章（免費打樣/即日交貨/ISO9001/全港順豐）
4. FAQ 手风琴（3-5 条现有常见问题）
5. 页底满版 CTA
6. ❌ 禁动： `/api/quote` 后端字段、008 埋点、NAP 真实信息一字不改（§13.10）

---

## 全局验收清单（每批必跑，全 PASS 才准进攒批）

```bash
# 1. 内容零改动（数据文件必须无 diff）
git diff --stat -- src/data/ messages/
# 2. 编码 + 编译
node scripts/check-encoding.js
npx tsc --noEmit   # 54 test baseline 不新增
npm run build      # Compiled successfully
# 3. 禁词红线（必须 0 命中）
grep -rni "business.card\|名片\|智印印港\|智印印" src/app/ src/components/
# 4. 字号基线抽查
grep -rn "17.5" src/app/[locale]/category/ src/app/[locale]/blog/ | head -3
# 5. 图片文件存在性（禁止编造图名）
ls public/images/hero/ | grep <slug>; ls public/images/factory/
# 6. 线上抽查（push 后）
curl -sI https://zprintpro.com/zh-hk/category/<slug>/ | head -1  # 200
```

## 报告格式（每批 1 段回报，落盘 `.hermes/logs/2026-09-1x-v92-<批次>.md`）

`批次 / commit sha / 改动文件数 / 6 条验收逐条 PASS/FAIL / 已知偏差（无写「无」）/ 下一批待办`

## 执行顺序（铁律）

任务 A（导航修复）→ B1（zh-hk 分类）→ C1（zh-hk SKU）→ B2/B3 → C2/C3 → D（blog）→ E（contact）。
A 属小改动直推；B/C 每批攒批 push；D/E 合 1 批。

---

# 修订 v9.2.1（2026-09-10 15:19 老板拍板 + K3 终裁 5 项）

## 裁决 1 — 挂账 2（bc-ban 白名单）: ✅ 维持老板原判

继续按 §0.0.1 豁免 + §6.1 声明放行；下批修 `scripts/check-bc-ban.mjs` 白名单，豁免面严格限定 `next.config.js` 的 `GSC_404_R2` 数组内 redirect 源行；修后重扫双验证（源行 0 报 + 非 redirect 名片词仍 0）。**已消化进 B2 批次，不另占 push。**

## 裁决 2 — 挂账 3（bc-ban 剩余 37 处 pre-existing 行）: 选 B（推荐）

- A: 本批全清 — 否决，37 处跨多文件，污染 B2 批次归因
- **B（选定）: 挂账登记，weekly-meta cron 批次顺带清，每批 ≤10 处，月底前清零** — 不阻塞主线 v9.2
- C: 永久豁免 — 否决，§0.0 名片终裁不可开口子

## 裁决 3 — 「共 N 款產品」行删除: ✅ P0 全 16 分类立即删

老板实证（packaging 页圈图）：H2「包裝盒定製 — 12 款規格任選」下方 `共 12 款產品 · …` 一行信息重复（H2 与 eyebrow「PACKAGING · 12 款規格」已含数量），视觉噪音。
**执行**: PLP 模板该 `<p class="sec-sub">共 N 款產品…` 行**全 16 分类删除**（zh-hk 先行，en/ja B2/B3 同步删对应行）。H2 与 eyebrow 不动。验收: `grep -rn "共 .* 款產品\|款產品 ·" src/app/[locale]/category/ | wc -l` = 0。

## 裁决 4 — Banner 藏青渐变 → 橙色渐变: ✅ P0 老板拍板，K3 终裁同意，附 3 条护栏

**背景**: 现网 Banner 藏青渐变 + 暗图叠加，首屏压抑（老板截图实证）。
**变更（全 16 分类 PLP Banner + 首页轮播图 Banner，三语言统一）**:

```
新渐变: linear-gradient(150deg, #F87314 0%, #EA580C 52%, #C2410C 100%)
H1/副标: 纯白保留（橙底白字大标题对比度达标）
信任徽章: 保留半透明白底白字（bg rgba(255,255,255,.15) + 白边），勾号 SVG stroke 改 #FFE8D6
eyebrow 橙线: 橙底上改用白色 3px 线（防同色消失）
```

**护栏（防橙色泛滥）**:
1. 藏青渐变**不下岗**，收缩为权威三区：數據徽章帶 / 页脚 / PDP 即日卡 —— 维持品牌沉稳锚点
2. 橙色渐变**只许** Banner 首屏 + 首页轮播，正文 CTA 按钮维持纯橙 `#F87314` 不渐变
3. 无 hero 图的 4 个品类（greeting-cards/japan-doujin/wedding-invitations/place-cards）占位渐变同步换橙色系，注释声明保留

## 裁决 5 — 首页轮播图同步橙渐变: ✅ P1 随 B2 批次

首页 HeroBanner 轮播与分类 Banner 同族换橙渐变（裁决 4 同一令牌），**禁止引入新色**。验收: `grep -rn "244780" src/components/home/HeroBanner.tsx src/app/[locale]/category/ | wc -l` 仅剩數據帶/页脚/即日卡授权区。

## 修订后执行顺序

A 导航修复（已推）→ B1 zh-hk（含裁决 3/4 橙渐变，随 15:14 攒批后的下一批）→ **B2（en PLP，派活放行，含裁决 2 挂账脚本 + 裁决 3/4 同步）** → C1（zh-hk SKU）→ **B3（ja PLP，派活放行）** → C2/C3 → D/E。

**B2/B3 今日派活批准，autoclaw 可立即接续执行，无需再等拍板。**

## 五视角裁决（本修订）

- ① PM：支持。删行与换色均为模板层 1-2 行改动，并入既有批次零额外 push 成本。
- ② UI/UX+CRO：支持。橙=品牌行动色，首屏从"沉稳压抑"转"温暖行动"，与全站 CTA 色彩叙事统一；护栏锁住藏青权威锚点，防品牌漂移。
- ③ 运营/转化：支持。印刷电商首屏情绪=询盘前置条件；橙渐变与 e-print/Vistaprint 蓝白冷调形成差异记忆点（竞品基线 §1E，复核见 gsc 周报）。
- ④ 数据分析师：条件支持。换色上线后 14 天对比 16 分类页跳出率/停留（GA4）+ CTR（GSC），若跳出率恶化 >5% 回滚至藏青。
- ⑤ CEO 终裁：**P0 全项通过**。删行立即、橙渐变放行、藏青退守三区、B2/B3 派活。

---

# 修订 v9.2.2（2026-09-10 18:56 老板指令：PDP 適用場景补齐 + SEO/AEO/GEO 结构增强）

## 裁决 1 — 蓝本 bug 修复（P0，先行）

waterproof-stickers 適用場景区 **lead 段与正文第 1 段文字完全重复**（线上实证 9/10 18:56）。执行：正文第 1 段删重，lead 保留。grep 验收：该 section 内同一句子出现次数 = 1。

## 裁决 2 — 薄内容 SKU 补齐规则（P0，三语言全 115 SKU）

**问题机制**: 適用場與檔案規格区左栏字数由 `products.ts` 各 SKU 的场景/规格字段驱动。waterproof-stickers ≈450 字（图 2 丰满），catalog-printing 等 ~100/115 SKU 仅 1-2 句（图 1 塌陷）。**薄内容 = 排版塌陷 + SEO 薄页双重伤害**。

**补齐红线（§0.23 数据诚信，违反即打回）**:
- ✅ 只许从 4 个真实数据源组装：① `products.ts` 该 SKU 现有 specs/materials/price_range/minQuantity ② 所属 category 的 RegionalContent/industries 现有文案 ③ 该 SKU 现有 FAQ 答案改写为场景段 ④ GSC 实证查询词（见下）织入
- ❌ 禁止编造：数字/认证/交期/客户名/行业事实
- ❌ 禁止跨 SKU 复制同一段文字（防站内重复内容，每个 SKU 组装结果必须唯一）

**GSC 词织入（9/10 数据处理实证，决策口径）**：每品类补齐时优先织入该品类高潜攻坚词（排名 20-50 + 展示 ≥50）——hk：海報印刷(161 imp)/貼紙印刷(153)/印海報(137)/宣傳單張(130)/包裝盒印刷(69)/騎馬釘(68)/透明貼(66)/包裝盒訂製(64)；en：small batch label printing；ja：コミケ 印刷。织入位置=场景段自然语句，禁止关键词堆砌。

**字数闸门**：左栏 < 300 字（zh-hk）/ < 180 词（en/ja）的 SKU 一律进补齐队列；≥ 该值不动（幂等）。

**批次**: F1 zh-hk（随 C1 补丁批）→ F2 en（随 C2）→ F3 ja（随 C3）。

## 裁决 3 — PDP 结构 SEO/AEO/GEO 增强项（P1，三语言）

基于 9/10 GSC 实证（PDP 80 页 2,769 展示 > PLP 2,383 > Blog 1,313，PDP 已是最大流量入口），对齐增强：

1. **AEO 答案块**: 每 PDP 首屏副标下加 40-60 字「直接答案句」（价格+起订+交期三要素一句话），已有则不动——目标 = Google 精选摘要 + AI 引用
2. **FAQ schema 核查**: 全 PDP FAQ 必须过 `extractFaqFromHtml` regex（`<p><strong>QN: …</strong><br/>A: …</p>`），curl 线上验证 FAQPage JSON-LD 存在
3. **Product+Offer schema**: 有价格表的 18 SKU 补 Offer price/priceCurrency；无表 100 SKU 只挂 Product 不挂 Offer（禁编价格）
4. **GEO 品牌实体**: PDP 页脚区品牌署名按 A5 分层（zh-hk=智印港 / en=ZprintPro / ja=ZprintPro，ジープリント 不字面同现）
5. **内链**: 適用場景段内链到所属 PLP + 1 个相关 SKU（链接须在 valid 路由清单，禁 404/301）

## 裁决 4 — v4.0 主报告 + 30-90 天 masterplan 同步策略： 增补不重写

- `v4.0 执行主报告` = 历史快照，**不重写**；文末追加 1 行变更指针：「2026-09-10 起执行口径以 masterplan v1.1 addendum 为准」
- `2026-09-09-k3-brain-30-90day-masterplan-v1.md` = SSoT，**追加 v1.1 addendum**（不重排原文）：
  - Phase 1 增补：v9.2 模板全量（A-E 任务）+ v9.2.2 PDP 内容补齐（F1-F3）列入 D0-D30
  - 里程碑增补：9/17 干净改版后周环比（改动→URL 对照表）为 Phase 1 中期校验点
  - 数据口径写入：GSC 28d 图表 sheet 真值为决策口径（28d all: 349 点击/20,323 展示），采样子集只读方向
- 大脑额度纪律（§0.4）：本次同步并入本周六周复盘窗口，不另发文

## 五视角裁决（v9.2.2）

- ① PM：支持。补齐队列按字数闸门自动圈定，幂等不返工；F1-F3 挂在既有 C 批次后零额外 push。
- ② UI/UX+CRO：支持。左栏塌陷是信任破口——薄页看起来=皮包公司；300 字闸门保排版平衡。
- ③ 运营/转化：支持。PDP 是最大流量入口（GSC 实证 2,769 展示），薄内容直接漏询盘；高潜词织入把排名 20-50 的词往首页推。
- ④ 数据分析师：条件支持。8.31 至今改版密集，28d 环比只读方向；9/17 干净对比窗前不做增长定性（写入 masterplan v1.1）。
- ⑤ CEO 终裁：**P0 裁决 1/2 立即执行，P1 裁决 3 随 C2/C3，裁决 4 周六窗口落地**。

> **执行状态（2026-09-10 19:31）**：✅ 裁决1 蓝本 lead 重复 bug 已修复并部署（merge `da3a1761` / CF `3d139ec1`，蓝本 lead 块 2→1，a4-flyers 泛化 + zh 16 品类回归）。✅ F1 zh-hk 薄内容补齐已部署（merge `137549be` / CF `caf6166d`）：63/63 SKU 可见 ≥300 字（48 替换 + 15 新 entry，4 真实源组装，跨 SKU 唯一，简体 0 / 名片 0 / 深圳 0），探针 5 SKU 可见 646-732 字。报告：`.hermes/logs/2026-09-10-v922-leadfix-f1.md`。F2 en / F3 ja 随 C2/C3。

---

# 修订 v9.2.3（2026-09-10 19:07 老板指令：全站 SEO/AEO/GEO 增强 · 三语言）

**总原则**: PDP 已验证的 5 项增强模式推广到首页 / PLP / Blog 详情 / Contact，三语言同步。所有 schema 改动先本地 JSON-LD parse 验证，再 curl 线上验证；内容红线不变（禁编数字/认证/案例；A5 品牌分层；§13.10 NAP 脱钩）。

## 任务 G1 — 首页（P0，三语言）

1. **AEO 答案块**: Hero 下加 40-60 字「直接答案句」（30 秒報價 + 100 張起 + 18:00 截單翌日中午前到 + WhatsApp），三语言各自本地化写法
2. **Schema**: Organization JSON-LD 复核（name 按 A5 分层 / address 深圳真实 NAP / sameAs 社媒 / areaServed）+ WebSite + SearchAction；FAQPage 若首页有 FAQ 区块则挂
3. **GEO 实体归一**: og:site_name / twitter:site / Organization.name 三者一致；双域名（z-printpro.com / zprintpro.com）品牌归一声明写进 Organization.alternateName
4. **内链**: Hero 下方「主营品类」入口卡链接 5 大主营 PLP（貼紙/宣傳單張/包裝盒/紙袋/標籤）

## 任务 G2 — PLP 分类页（P1，随 B 批次落地后增量）

1. **AEO**: 3 个直接答案卡 → 挂 FAQPage schema（问句即 H3，答案 40-60 字）
2. **Schema**: BreadcrumbList 全量复核 + CollectionPage + ItemList（SKU 网格挂 itemListElement）
3. **内链**: 選購指南段内链 1 个相关分类 + 1 篇相关 blog（链接须 200，禁 404/301）
4. **GEO**: 本地化服务节点区保留 GEO 本地信号（順豐/港九新界/DHL 全球）

## 任务 G3 — Blog 详情页（P1，三语言全量）

1. **AEO**: 每篇开头 40-60 字答案块（已有不动）；FAQ 段必须过 `extractFaqFromHtml` regex（`<p><strong>QN: …</strong><br/>A: …</p>`），curl 验证 FAQPage JSON-LD
2. **Schema**: Article/BlogPosting 复核（author=品牌实体 / datePublished / dateModified / image）+ BreadcrumbList
3. **内链**: 正文内链 ≥2 个相关 PLP/PDP（相关品类优先）
4. **GEO**: 文末品牌署名块按 locale 分层

## 任务 G4 — Contact / 即日页等服务页（P2，随 D/E 批次）

1. **Schema**: ContactPage + Organization.contactPoint（电话 +86 198 8085 1334 / 邮箱 zprintpro@outlook.com / WhatsApp）
2. **GEO**: NAP 真实信息一字不改（§13.10），Schema address 与 Footer 一致
3. **AEO**: 服务页 Hero 下 40-60 字答案块（即日页：18:00 截單→翌日中午 12:00 前到，§0.23 唯一口径）

## 验收清单（G1-G4 通用，追加进全局验收）

```bash
# 7. JSON-LD parse 验证（每个改动页面类型）
node -e "JSON.parse(require('fs').readFileSync('tmp.jsonld','utf8'))"  # 或构建后 curl 页面提取 script[type*=ld+json] 逐块 parse
# 8. 线上 schema 抽查（push 后）
curl -s https://zprintpro.com/zh-hk/ | grep -o 'application/ld+json' | wc -l   # ≥ 现有基线
curl -s https://zprintpro.com/zh-hk/blog/<slug>/ | grep -c FAQPage             # ≥1
# 9. 品牌实体一致性
grep -rn "智印印港" src/ | wc -l   # = 0
```

## 批次纪律（G 系列）

- G1 首页 zh-hk/en/ja 合 1 批（1 commit，3 locale 同站同结构）
- G2 随 B2/B3 尾巴增量（不另起批）
- G3 blog 详情 1 批（79 篇结构统一改模板，非逐篇改内容）
- G4 随 D/E 批次
- 每批跑全局 6 条 + G 系列 3 条验收

## 五视角裁决（v9.2.3）

- ① PM：支持。4 个 G 任务全部挂既有批次尾巴，零额外 push；schema 改动有 parse+curl 双验证闸门。
- ② UI/UX+CRO：支持。答案块放 Hero 下不打断视觉流；内链增强=用户路径加深=询盘概率上升。
- ③ 运营/转化：支持。GSC 实证 PDP>PLP>Blog 的流量结构，AEO 答案块全站铺 = 三语言精选摘要卡位，直接把排名 5-20 的词往答案框推。
- ④ 数据分析师：条件支持。schema 上线后 7 天查 GSC「增强功能」报告确认富摘要展示量；无展示=回查 parse。
- ⑤ CEO 终裁：**G1 P0 立即，G2/G3 P1 随批，G4 P2 随 D/E**。全站三语言一盘棋，不留死角。
