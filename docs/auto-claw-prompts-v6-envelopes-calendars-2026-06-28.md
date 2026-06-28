# v6 AutoClaw Prompts — Envelopes + Calendars + Business Cards 升级 (2026-06-28 23:58)

> **背景**: v5 doc (557 行) 把 envelopes (信封) + calendars (年历) 列为 **P3 暂不动**。
> **本轮反转 (23:56)**: user 用无痕浏览 13 个分类页，10 个已 OK，但 envelopes/calendars 2 个仍 fallback。
> **再次反转 (23:58)**: user 决定 business-cards 也补 —— "可以少做, 但是还是可以要这个流量", 这次补完 business-cards 就 done。
> **决策 (最终)**:
> - **envelopes + calendars + business-cards → 升级 P1** (按 paper-bags 长格式补 H1 + SEO meta)
> - **business-cards 例外条款** (memory 主营约束 "不写名片" 仍生效):
>   - ✅ SEO 优化 (H1 / title / keywords / description) → 拿 "咭片印刷" 香港高流量词
>   - ❌ 不写进首页 hero / 推荐位 / 主营介绍 (主营仍是贴纸/宣传单张/包装盒/纸袋/标签)
>   - ❌ 不投入新产品图 / 选购指南 / 专题内容 (跟主营品类不同投入级别)

---

## 0. 上下文 (给 GLM 5.2 喂前必读)

### 0.1 项目基础
- **项目**: F:\zprintpro-nextjs (Next.js 14 + Cloudflare Pages)
- **3 locale**: zh-hk / en / ja (不能统一, 必须分别优化)
- **3 个独立 NAP/品牌策略** (v4 doc 2026-06-28 已拍板):
  - zh-hk: 香港主场, 灰色合规, 虚拟 HK 觀塘地址
  - en: 跨境中性, 真实深圳
  - ja: 日本严格合规, 真实深圳 + 法人 + 特定商取引法

### 0.2 v5 已有成效 (10/13 category 已生效)
✅ **10 个 category 已 OK** (HTML H1 + 浏览器 title 全部 SEO 优化):
- packaging / paper-bags / flyers / menus / red-packets / stickers / posters / banners / books / educational
- 代码位置:
  - `src/lib/seo.ts` line 256-466: `categorySeoData` 已有 12 个 category 条目 (含 japan-doujin)
  - `src/app/[locale]/category/[slug]/page.tsx` line 103-154: `customH1Map` 10 个 category 3 locale 共 30 条
  - HTML 验证: `curl https://zprintpro.com/zh-hk/category/stickers/` → `<h1>` 已是 "香港貼紙印刷定制 — ..."

❌ **3 个 category 还需补** (HTML H1 走 fallback 到 categoryName):
- business-cards (咭片印刷) — **本轮补 (23:58 反转, 但仅 SEO 层面, 不进主营 UI)**
- envelopes (信封印刷) — **本轮补**
- calendars (年曆印刷) — **本轮补**

---

## 1. 改造清单 (本轮要做的全部)

### 1.1 `src/lib/seo.ts` 修改 — 3 处

#### 1.1.1 business-cards 加 `titles` 字段 (line 261-272 已有 keywords/descriptions, 补 titles)

⚠️ **特别条款 (memory 主营约束仍生效)**: business-cards 仅 SEO 层面补齐 (H1/title/keywords/description), 不进首页 hero / 推荐位 / 主营介绍。主营仍是贴纸/宣传单张/包装盒/纸袋/标签。

```ts
'business-cards': {
  titles: {
    'zh-hk': '咭片印刷 香港 | 智印雲 ZprintPro — 燙金名片 / UV名片 / 圓角名片 高檔定制',
    en: 'Custom Business Card Printing | ZprintPro — Foil Stamped / UV / Rounded Corner / Premium',
    ja: '名刺印刷 カスタム | ZprintPro — 箔押し / UV / 丸角 / プレミアム名刺',
  },
  keywords: { /* 保留 line 262-266 不变 */ },
  descriptions: { /* 保留 line 267-271 不变 */ },
},
```

#### 1.1.2 envelopes 加入 `categorySeoData` (在 red-packets 后, banners 前)

```ts
'envelopes': {
  titles: {
    'zh-hk': '信封印刷 香港 | 智印雲 ZprintPro — 牛皮信封 / 開窗信封 / 彩色信封 / 企業定制',
    en: 'Custom Envelope Printing | ZprintPro — Kraft / Window / Colored / Corporate Branding',
    ja: '封筒印刷 カスタム | ZprintPro — クラフト / 窓付き / カラー / 企業ブランディング',
  },
  keywords: {
    'zh-hk': '信封印刷,定制信封,牛皮信封,開窗信封,彩色信封,企業信封,西式信封,中式信封,LOGO信封,印刷信封',
    en: 'envelope printing,custom envelopes,kraft envelopes,window envelopes,colored envelopes,corporate envelopes,business envelopes,branded envelopes,logo envelopes,DL envelopes',
    ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,企業封筒,ビジネス封筒,ロゴ封筒,長3封筒,洋形封筒',
  },
  descriptions: {
    'zh-hk': '香港信封印刷服務｜智印雲提供牛皮信封、開窗信封、彩色信封、LOGO定制，支持各種規格。免費設計，加急交貨，全球配送！',
    en: 'Custom envelope printing — kraft, window, colored & corporate envelopes with logo branding. Multiple sizes (DL, C5, C4). Free design, rush production, global shipping.',
    ja: 'プロの封筒印刷サービス。クラフト・窓付き・カラー・企業ロゴ封筒に対応。長3・角形・洋形サイズ豊富。無料デザイン、即日納品、全国配送。',
  },
},
```

#### 1.1.3 calendars 加入 `categorySeoData` (紧接 envelopes 之后)

```ts
'calendars': {
  titles: {
    'zh-hk': '年曆印刷 香港 | 智印雲 ZprintPro — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 定制',
    en: 'Custom Calendar Printing | ZprintPro — Desk / Wall / Monthly / 2027 Calendars',
    ja: 'カレンダー印刷 カスタム | ZprintPro — デスク / 壁掛け / 月別 / 2027年カレンダー',
  },
  keywords: {
    'zh-hk': '年曆印刷,月曆印刷,座檯年曆,掛曆,2027年曆,定制月曆,企業年曆,禮品年曆,桌曆,日曆',
    en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,photo calendar',
    ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,写真カレンダー,卓上カレンダー',
  },
  descriptions: {
    'zh-hk': '香港年曆印刷服務｜智印雲提供座檯年曆、掛曆、月曆、2027年曆定制，支持企業LOGO。免費設計，加急交貨，Q4 旺季建議提前 60 天下單！',
    en: 'Custom calendar printing 2027 — desk, wall, monthly calendars with corporate branding. Premium paper, foil stamping, spiral/hardcover binding. Free design, rush available. Order 60 days before Q4 peak season.',
    ja: 'プロのカレンダー印刷サービス 2027年。デスク・壁掛け・月別、企業ロゴ対応。高級紙、箔押し、スパイラル/上製本綴じ。無料デザイン、即日対応可能。繁忙期は60日前の注文推奨。',
  },
},
```

### 1.2 `src/app/[locale]/category/[slug]/page.tsx` 修改 — 3 处

#### 1.2.1 customH1Map 加 business-cards 3 locale (放最前, line 104 之前)

⚠️ **特别条款**: business-cards H1 写 SEO 长格式, 但**不进 customH1Map 上半部分**。建议放 customH1Map 最末尾, 跟其他 category 视觉一致, 主营 UI 不强调。

```ts
'business-cards': {
  'zh-hk': '香港咭片印刷定制 — 燙金名片 / UV名片 / 圓角名片 / 高檔名片',
  en: 'Custom Business Card Printing — Foil Stamped / UV / Rounded Corner / Premium Cards',
  ja: '名刺印刷 カスタム — 箔押し / UV / 丸角 / プレミアム名刺',
},
```

#### 1.2.2 customH1Map 加 envelopes 3 locale (在 menus 之前或之后)

在 `customH1Map` (line 119-123 menus 之后, red-packets 之前) 插入:

```ts
'envelopes': {
  'zh-hk': '香港信封印刷定制 — 牛皮信封 / 開窗信封 / 彩色信封 / 企業LOGO信封',
  en: 'Custom Envelope Printing — Kraft / Window / Colored / Corporate Branding',
  ja: '封筒印刷 カスタム — クラフト / 窓付き / カラー / 企業ブランディング',
},
```

#### 1.2.3 customH1Map 加 calendars 3 locale (紧接 red-packets 之后, stickers 之前)

```ts
'calendars': {
  'zh-hk': '香港年曆印刷定制 — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 / 企業LOGO',
  en: 'Custom Calendar Printing — Desk / Wall / Monthly / 2027 / Corporate Branding',
  ja: 'カレンダー印刷 カスタム — デスク / 壁掛け / 月別 / 2027年 / 企業ロゴ',
},
```

---

## 2. 验收清单 (4 步必跑)

### 2.1 本地类型检查
```bash
cd F:\zprintpro-nextjs
npx tsc --noEmit src/lib/seo.ts src/app/[locale]/category/[slug]/page.tsx
# 预期: 无新增 TS error (现有 node_modules 报错忽略)
```

### 2.2 本地 build (可选, 但建议)
```bash
npm run build 2>&1 | tail -30
# 预期: 13 categories × 3 locales = 39 静态路径全部 generate 成功
```

### 2.3 部署 commit + push
```bash
git add src/lib/seo.ts src/app/[locale]/category/[slug]/page.tsx
git commit -m "feat(seo): envelopes + calendars + business-cards 升级 P1 — 13 category 统一 SEO 长格式 H1 + title

- src/lib/seo.ts: 加 business-cards titles (line 261-272 已补), envelopes/calendars 全 categorySeoData
- src/app/[locale]/category/[slug]/page.tsx: customH1Map 加 business-cards/envelopes/calendars 3 locale 共 9 条

效果: 13 category 全部走 SEO 长格式 H1 + title (business-cards 23:58 反转, 仅 SEO 层面, 不进主营 UI)
"
git push origin main  # 触发 CF Pages 自动部署
```

### 2.4 线上 verify (deploy 完成后, 多地理节点)
```bash
# zh-hk
curl -s https://zprintpro.com/zh-hk/category/envelopes/ | grep -oE '<h1[^>]*>[^<]+</h1>'
# 预期: <h1 ...>香港信封印刷定制 — 牛皮信封 / 開窗信封 / 彩色信封 / 企業LOGO信封</h1>

curl -s https://zprintpro.com/zh-hk/category/envelopes/ | grep -oE '<title>[^<]+</title>'
# 预期: <title>信封印刷 香港 | 智印雲 ZprintPro — 牛皮信封 / 開窗信封 / 彩色信封 / 企業定制</title>

curl -s https://zprintpro.com/zh-hk/category/calendars/ | grep -oE '<h1[^>]*>[^<]+</h1>'
# 预期: <h1 ...>香港年曆印刷定制 — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 / 企業LOGO</h1>

# en
curl -s https://zprintpro.com/en/category/envelopes/ | grep -oE '<h1[^>]*>[^<]+</h1>'
curl -s https://zprintpro.com/en/category/calendars/ | grep -oE '<h1[^>]*>[^<]+</h1>'

# ja
curl -s https://zprintpro.com/ja/category/envelopes/ | grep -oE '<h1[^>]*>[^<]+</h1>'
curl -s https://zprintpro.com/ja/category/calendars/ | grep -oE '<h1[^>]*>[^<]+</h1>'

# business-cards 23:58 反转, 也补 (但仅 SEO 层面)
curl -s https://zprintpro.com/zh-hk/category/business-cards/ | grep -oE '<h1[^>]*>[^<]+</h1>'
# 预期: <h1 ...>香港咭片印刷定制 — 燙金名片 / UV名片 / 圓角名片 / 高檔名片</h1>

curl -s https://zprintpro.com/en/category/business-cards/ | grep -oE '<h1[^>]*>[^<]+</h1>'
curl -s https://zprintpro.com/ja/category/business-cards/ | grep -oE '<h1[^>]*>[^<]+</h1>'
```

### 2.5 HTML body 关键词检查 (memory 教训: HTTP 200 + HTML 完整 ≠ 部署生效)
- H1 文字:
  - ✅ "香港信封印刷定制 — 牛皮信封 / 開窗信封 / 彩色信封 / 企業LOGO信封"
  - ✅ "香港年曆印刷定制 — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 / 企業LOGO"
  - ✅ "香港咭片印刷定制 — 燙金名片 / UV名片 / 圓角名片 / 高檔名片" (23:58 反转补)
- Title 文字:
  - ✅ "信封印刷 香港 | 智印雲 ZprintPro — 牛皮信封 / 開窗信封 / 彩色信封 / 企業定制"
  - ✅ "年曆印刷 香港 | 智印雲 ZprintPro — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 定制"
  - ✅ "咭片印刷 香港 | 智印雲 ZprintPro — 燙金名片 / UV名片 / 圓角名片 高檔定制"
- Schema ItemList name: ✅ (会同步显示新 H1 文字)

---

## 3. SEO 关键词选择逻辑 (给 GLM 5.2 解释为什么这么写)

### 3.1 business-cards (23:58 反转补, 但仅 SEO 层面)
- **为什么补**: "咭片印刷 / 名片印刷" 香港月搜索量高, SEO 可拿客户
- **主营产品** (zh-hk): 燙金名片、UV名片、圓角名片、高檔名片
- **跨境产品** (en): foil business card, UV spot business card, rounded corner, premium card
- **日本产品** (ja): 箔押し名刺、UV名刺、丸角名刺、プレミアム名刺
- **主营约束 (memory)**: 不写名片为主营, 所以 UI 层不强调 (不进首页 hero/推荐位/主营介绍)
- **SEO 投入级别**: 跟其他 category 一样补齐 H1/title/keywords/description, 但**不投入**:
  - ❌ 新产品图 / 选购指南 (跟主营品类不同投入级别)
  - ❌ 专题内容 / 季节性 banner
  - ❌ 单独 FAQ (跟 FAQ schema 一起走)

### 3.2 envelopes
- **主营产品** (zh-hk 主场): 牛皮信封、开窗信封、彩色信封、企业 LOGO 信封
- **跨境产品** (en): kraft envelope, window envelope, corporate branded envelope
- **日本产品** (ja): クラフト封筒、窓付き封筒、企業ロゴ封筒
- **避开**: 邮票、信纸 (不是主营)

### 3.3 calendars
- **主营产品** (zh-hk): 座檯年曆、掛曆、2027年曆 (Q4 旺季品类)
- **跨境产品** (en): desk calendar, wall calendar, 2027 calendar (西方企业年底送礼)
- **日本产品** (ja): デスクカレンダー、壁掛けカレンダー、2027年カレンダー (日本忘年会季节)
- **关键时间点**: Q4 旺季 (10-12 月), 建议提前 60 天下单 (description 已写明)
- **避开**: 红包 (独立 category), 日历 emoji 元素 (技术限制)

---

## 4. 跟 v5 doc 的关系 (避免重复劳动)

### 4.1 v5 doc 已做的事 (本轮不要再做)
- 10 个 category 的 H1 + SEO meta (stickers/flyers/packaging/paper-bags/menus/red-packets/posters/banners/books/educational)
- 13 category × 3 locale 的 hero 图烧入字
- customH1Map 10 个 category 的 30 条 H1
- categorySeoData 12 个 category 的 keywords + descriptions (含 japan-doujin)

### 4.2 v6 doc 新做的事 (本轮要做)
- business-cards 加 titles (line 261-272 已补, 加 titles 字段 3 locale 共 3 条)
- envelopes + calendars 加入 categorySeoData (titles 3 locale + keywords + descriptions 共 6 条)
- business-cards + envelopes + calendars 加入 customH1Map (3 locale 共 9 条 H1)
- 13 category → 全部走 SEO 长格式 (business-cards 23:58 反转, 仅 SEO 层面, 不进主营 UI)

### 4.3 v6 doc 不做的事
- ❌ 不动 13 category 的 hero 图烧入字 (v5 已做)
- ❌ 不动 Schema 框架 (FAQ/HowTo/Speakable 已在 page.tsx line 162-189)
- ❌ 不动 banners/books/educational 的 categorySeoData (v5 已加)
- ❌ 不写 business-cards 进首页 hero / 推荐位 / 主营介绍 (主营仍是贴纸/宣传单张/包装盒/纸袋/标签, memory 主营约束)
- ❌ 不投入 business-cards 新产品图 / 选购指南 / 专题内容 (SEO 拿流量, 不投资源)
- ❌ 不写 business-cards 单独 FAQ (跟 FAQ schema 一起走)

---

## 5. 时间估计 + 资源

- **GLM 5.2 任务**: 1 个 (本轮单一聚焦: envelopes + calendars + business-cards SEO 升级)
- **预计工时**: 18 分钟 (3 处代码编辑 + 1 处 commit + verify)
  - src/lib/seo.ts: 1 处 edit (business-cards titles) + 2 处 edit (envelopes + calendars 全条)
  - src/app/[locale]/category/[slug]/page.tsx: 1 处 edit (customH1Map 加 3 个 slug × 3 locale = 9 条 H1)
- **依赖**: 无 (不冲突现有逻辑, business-cards categorySeoData 已存在, 只补 titles 字段)
- **风险**: 极低 (只是 categorySeoData + customH1Map 加 3 个 slug)
- **CDN 缓存**: CF Pages 部署后用户需 hard refresh 或等 5min TTL 过期

---

## 6. 后续 (v7+ 候选)

如果 Q4 旺季 envelopes / calendars 流量起来了, 可以考虑:
- 单独的 envelopes buying guide (跟 stickers/flyers 一样)
- calendars 季节性 banner (10 月起换成 2027 主题)
- ja locale 加更多 calendar 关键词 (日本忘年会季节)

如果 business-cards 拿了流量但 ROI 不好 (名片单价低, 跨境物流成本高), 可以考虑:
- 把 business-cards 标记为 "passive SEO" (只靠现有页面拿流量, 不主动推)
- 不进 sitemap.xml priority 调整 (保持默认 0.7, 不抢主营位置)

但**不是本轮必做**, GLM 5.2 不要画蛇添足。

---

## 7. Memory 更新 (重要!)

⚠️ **本轮反转**: user 决定 business-cards 也补, 这跟之前 v4 doc "主营品类纠正" 不冲突, 但 memory / AGENTS.md 需要细化措辞。

**原 memory 措辞** (F:\zprintpro-nextjs\AGENTS.md 第 11 章节 + 多个 memory 条目):
> ❌ **绝对不要写名片/咭片/business cards/名刺** — 这不是 ZprintPro 的主营业务

**新 memory 措辞** (更精准, 不模糊):
> - ❌ **不写名片为主营**: 名片/咭片不写进首页 hero / 推荐位 / 主营介绍 / 主营介绍语
> - ✅ **可做 SEO 拿流量**: "咭片印刷 / 名片印刷" 香港月搜索量高, H1 / title / SEO meta 可补
> - ⚠️ **投入级别低**: 不投资源 (新产品图 / 选购指南 / 专题内容 / 单独 FAQ)
> - 应用: 2026-06-28 v6 doc 决定补 business-cards H1 + SEO meta 3 locale, 但页面 UI 不强调

**AutoClaw / GLM 5.2 不要动 memory / AGENTS.md**, 这条更新由 Mavis (root session) 单独负责。

---

## 8. 给 GLM 5.2 的一句话总结

> **本轮唯一任务**: 给 src/lib/seo.ts 的 business-cards 加 titles 3 locale, 给 envelopes + calendars 加完整 categorySeoData (titles + keywords + descriptions), 给 src/app/[locale]/category/[slug]/page.tsx 的 customH1Map 加 business-cards + envelopes + calendars 3 locale 共 9 条 H1。1 个 commit, 1 次 push, deploy 后 curl 验证 13 个 category 全部走 SEO 长格式。business-cards 仅 SEO 层面, 不进首页 hero/推荐位。详细代码块见 §1, 验收清单见 §2。**预计 18 分钟, 不要画蛇添足。**