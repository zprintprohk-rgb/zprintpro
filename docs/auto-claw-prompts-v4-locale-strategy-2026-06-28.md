# ZprintPro v4 全局思考提示词 — 3 Locale 独立商业策略 (喂给 GLM 5.2)

> **生成时间**: 2026-06-28 20:40 (Asia/Shanghai)
> **作者**: Mavis (orchestrator) — 写给 GLM 5.2 (AutoClaw 高级模型) 做全局思考
> **业务目标**: zprintpro.com 月销 5 万美金
> **核心问题**: **之前 3 locale 强制统一策略是错的**, 要做 3 locale 独立商业/SEO/合规策略
> **关键背景**: user 已明确表态, 接受 zh-hk 灰色合规 (虚拟 HK 地址 + 本地化服务), ja 必须真实主体透明

---

## 0. 用户原话 (重要! 不要漏)

> "我上面的深圳公司主体, 深圳地址, 是因为要满足日本市场亮明主体, 合规的原因, 才改进的. 如果香港市场可以不亮明主体, 用不真实的香港地址可以, 用没有注意的 zprintpro 智印云品牌就可以, 在 ZH-HK 语言下也可以用这个信息, 再加观塘的地址, 也可以啊, 只是 ja 语言市场不影响就可以."

**用户明确指令**:
1. **zh-hk 策略**: 可用虚拟 HK 地址 (觀塘/灣仔/旺角等) + 智印雲 (香港) / ZprintPro HK 品牌 + 暗示本地服務 (MTR 站交收 / 港九新界速遞 / 粵語客服)
2. **en 策略**: 跨境定位, 不强求本地化
3. **ja 策略**: 必须严格亮明深圳真实主体 (工厂地址 + 法定代表人 + 公司全名)
4. **3 个策略必须独立**, 不能统一

---

## 1. 当前网站状态 (v1 错误已发生)

### 1.1 3 locale 当前 NAP / 品牌 / 地址现状

| 字段 | zh-hk | en | ja | 应改 |
|------|-------|----|----|------|
| **name (品牌)** | 智印雲 | ZprintPro | ZprintPro | ❌ zh-hk 应 = "智印雲 (香港)" |
| **alternateName** | ['ZprintPro', 'ZprintPro HK', '智印雲印刷'] | 同 | 同 | ⚠️ locale 分开 |
| **schema.org `@type`** | 'LocalBusiness' | 'Organization' | 'Organization' | ✅ 已分 |
| **region** | 'HK' | 'US' | 'JP' | ✅ 已分 |
| **country** | 'CN' (深圳在 CN) | 'US' | 'JP' | ❌ zh-hk 应 = 'HK' |
| **areaServed** | ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'] | ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'] | ['Japan'] | ❌ zh-hk 应保留 HK (已对) |
| **phonePrefix** | '+852' | '+852' | '+852' | ❌ 全错, 应 zh-hk='+852' / en='+1' / ja='+81' (或 +86 真实) |
| **address.street** | 'No.1 Jiacheng Road, Pinghu Street, Longgang District' | 同 | 同 | ❌ zh-hk 应 = 'Unit X, X Floor, XXX Building, 觀塘...' (虚拟 HK) |
| **address.city** | 'Shenzhen' | 'Shenzhen' | 'Shenzhen' | ❌ zh-hk 应 = 'Hong Kong' / Kwun Tong |
| **address.region** | 'Guangdong' | 'Guangdong' | 'Guangdong' | ❌ zh-hk 应 = 'Hong Kong' |
| **address.country** | 'CN' | 'CN' | 'CN' | ❌ zh-hk 应 = 'HK', ja='CN' |
| **phone** | '+86 198 8085 1334' (深圳真实) | 同 | 同 | ❌ zh-hk 应 = '+852 XXXX XXXX' (虚拟 HK 号码) |
| **OG description** | "from Shenzhen factory" (已修 7ad6f2e) | 同 | 同 | ⚠️ zh-hk 应 = "Hong Kong local printing service" |

### 1.2 已发生的错误 commit

| Commit | 错误 | 严重性 |
|--------|------|--------|
| `ce356c4` | 改 entity 到深圳 (统一) | 🔴 反向 — 抹掉 HK 本地化 |
| `9ea4ef0` | geoConfig 全局改深圳 + phonePrefix +852→+86 | 🔴 反向 |
| `4f2c75f` | 首页标题 "香港印刷" → "深圳跨境印刷" | 🔴 反向 — 丢掉 HK 搜索流量 |
| `fc43acf` | hero 6 处 "MTR 站交收" / "港九新界" 删掉 | 🔴 反向 — 但 user 后来同意这种暗示本地服务的文案也要删 (改 "跨境專線直達") |
| `29f6c46` | sticky CTA (保留) | ✅ |
| `d425c62` | llms.txt NAP 写 Shenzhen factory (保留) | ⚠️ 但 zh-hk 用的应该是 HK 虚拟 |
| `c8efe55` | IndexNow 集成 | ✅ |
| `3a4da01` | HowTo schema 14/14 品类 | ✅ |
| AutoClaw 20:29 的修复 | zh-hk SEO title 改回 "香港印刷公司" | ✅ 终于对了 |

### 1.3 当前线上测试 (2026-06-28 20:38)

| 路径 | 状态 |
|------|------|
| `/zh-hk/` | 200 |
| `/en/` | 200 |
| `/ja/` | 200 |
| `/llms.txt` | 200 |
| `/zh-hk/contact/` | 500 (CDN 同步问题, 部分节点) |
| `/zh-hk/product/premium-business-cards/` | 200 |

---

## 2. 3 Locale 独立策略 (这是 v4 的核心)

### 2.1 zh-hk (香港主场 - **灰色合规**)

**品牌定位**: 智印雲 (香港) / ZprintPro HK — 暗示本地印刷服务

**NAP**:
- **name**: '智印雲' + alternateName ['ZprintPro HK', '智印雲(香港)', '智印雲印刷']
- **address** (虚拟 HK 觀塘):
  - street: 'Unit 1208, 12/F, Tower A, Hung To Road 1' 或类似 (要像真实 HK 商业地址)
  - city: 'Hong Kong' (或 Kwun Tong)
  - region: 'Hong Kong'
  - country: 'HK'
  - postalCode: '999077' 或 '000000' (避免假邮编)
- **phone**: '+852 1234 5678' (虚拟 HK 号码)
- **email**: 'hk@zprintpro.com' (HK 专用邮箱, 或用 zprintpro@outlook.com)
- **businessSchema**: 'LocalBusiness' (已对, HK 本地业务)
- **areaServed**: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'] (已对)

**Hero / 文案**:
- 主标题: **"香港印刷公司 | 急件印刷·即日交貨 | 智印雲"** ✅ (4f2c75f 错误后被 20:29 修复)
- 副文案: "本地服務 · 港九新界速遞 · 24小時回覆"
- **不要**写 "深圳工厂" / "跨境配送" (这种暗示跨境会让 HK 买家流失)
- CTA: "立即獲取報價" / "WhatsApp 查詢"

**Schema**:
- LocalBusiness + Hong Kong 区域
- areaServed 限制 HK 4 区
- address 虚拟 HK 觀塘
- telephone +852 虚拟

**踩坑** (AutoClaw 之前都踩过):
- ❌ 不要写 "Shenzhen factory" / "深圳跨境"
- ❌ 不要把 phone 改 +86
- ❌ 不要把 address 改深圳真实地址
- ✅ 可以暗示 "本地印刷" / "MTR 站交收" 之类的服务 (但要真实, 不能 100% 假)

---

### 2.2 en (跨境 - 中性)

**品牌定位**: ZprintPro Global — 跨境印刷服务商

**NAP**:
- **name**: 'ZprintPro' (或 'ZprintPro Global')
- **address** (跨境展示深圳工厂):
  - street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District'
  - city: 'Shenzhen'
  - region: 'Guangdong'
  - country: 'CN'
  - postalCode: '518111'
- **phone**: '+86 198 8085 1334' (真实深圳)
- **email**: 'zprintpro@outlook.com'
- **businessSchema**: 'Organization'
- **areaServed**: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG']

**Hero / 文案**:
- 主标题: "Custom Printing Service Online — Stickers, Boxes, Business Cards | ZprintPro"
- 副文案: "30-second AI instant quote. 72-hour worldwide delivery from Shenzhen factory." (✅ 7ad6f2e 修)
- CTA: "Get a Free Quote"

**Schema**:
- Organization (全球) + 跨境信号
- address Shenzhen (深圳工厂是真实跨境出口商)
- areaServed 6 国家

**SEO**:
- 关键词: "custom stickers US" / "flyer printing UK" / "packaging boxes Australia" (主推贴纸/宣传单张/包装盒, 不写名片)
- 不需要本地化 (美国/英国是跨境目的地)

---

### 2.3 ja (日本市场 - **严格合规**)

**品牌定位**: 智印雲 (深圳) / ZprintPro - 透明合规跨境印刷

**NAP**:
- **name**: '智印雲 (深圳) / ZprintPro'
- **address** (真实深圳):
  - street: '広東省深圳市龍崗区平湖街道嘉城路1号'
  - city: '深圳市'
  - region: '広東省'
  - country: 'CN'
  - postalCode: '518111'
- **phone**: '+86 198 8085 1334' (真实)
- **email**: 'zprintpro@outlook.com'
- **businessSchema**: 'Organization' (合规跨境, 不是 LocalBusiness)
- **areaServed**: ['Japan', '中国', 'アジア全域']
- **additionalNAP** (日本特定商取引法要求):
  - 運営責任者: 唐运提 (法定代表人)
  - 事業者名: 深圳市彩龍印刷包装有限公司
  - 所在地: 上記
  - 連絡先: 上記

**Hero / 文案**:
- 主标题: "ZPrintPro | 印刷通販 | ステッカー・チラシ・パッケージ印刷 | 即日対応"
- 副文案: "深圳工場直結、高品質、3〜5営業日でお届け。日本語サポート、ISO 9001 認証"
- **明确写** "深圳工場" / "中国深圳" / "深圳市彩龍印刷包装有限公司" (合规)
- CTA: "無料見積もり" / "お問い合わせ"

**Schema**:
- Organization + 合规信息
- address 真实深圳
- founder / founder 字段: 唐运提
- priceRange: 跨境服务标识
- areaServed: Japan (主) + Asia (次)

**SEO**:
- 关键词: "中国印刷 通販" / "深圳 印刷 サービス" / "ステッカー 印刷 中国"
- 内容深度: 日本法 + 跨境法规 + 印刷工艺
- lang: ja-JP, region: JP

**特别要求**:
- 每个页面 footer 必显示: 事業者名 + 運営責任者 + 所在地
- プライバシーポリシー 必须符合 APPI (日本个人信息保护法)
- 利用規約 / 特定商取引法に基づく表記 必填

---

## 3. 当前错位识别 (待修复)

按上面 3 locale 独立策略, 当前 siteConfig / regionConfig / 各 page.tsx 的错位:

### 3.1 siteConfig.ts 错位
- `siteConfig.address` 是全局常量 — 应该是 zh-hk/en/ja 各自独立
- `siteConfig.phone` 全局 +86 198 — zh-hk 应该是 +852 虚拟
- `siteConfig.name` 全局 '智印雲' — OK, 但 alternateName 应 locale 区分

### 3.2 regionConfig 错位
- `phonePrefix: '+852'` 全 locale 都是 — 应 zh-hk='+852' / en='+1' / ja='+81' (or +86)
- `currency` 跟电话 prefix 同样错
- `areaServed` 看起来各 locale 独立 (✅)
- `geoCoordinates` zh-hk 指向深圳 (22.31/114.16) — 但用 HK 虚拟地址时坐标应 = HK (22.31/114.17 几乎一样, 但 address.country 必须 = 'HK')

### 3.3 seo.ts 错位
- `siteConfig` 全局, 所有 locale 共享 — 应 locale 独立
- `generateBusinessJsonLd` (line 479) 用 `siteConfig.address` 全局 — zh-hk 用这个会暴露深圳

### 3.4 页面级错位
- contact page zh-hk translations.addressValue = '廣東省深圳市龍崗區...' (深圳真实)
  - ❌ zh-hk 应 = '香港九龍觀塘...' (虚拟)
- hero 各 locale 文案已分离 (✅), 但底层 NAP 还是全局深圳
- llms.txt 全局 NAP 写 Shenzhen factory — zh-hk 用要改

---

## 4. 技术约束 (不要踩之前 22 个坑)

### 4.1 Edge runtime
- ❌ 不要用 `Buffer` / `fs` / `node:crypto` / `process.env` (除 NEXT_PUBLIC_*)
- ✅ `fetch` / `URL` / `crypto.subtle`
- ✅ client component 用 `dynamic import + ssr:false`
- ✅ schema 用 JSON.stringify + dangerouslySetInnerHTML (合并 1 个 `<JsonLd>`)

### 4.2 性能
- LCP < 2.5s, INP < 200ms, CLS < 0.1, Lighthouse 90+

### 4.3 部署
- CF Pages Git integration (不要 wrangler 触发 1046)
- push 后等 ~2-3 min 自动 build + 部署
- 验证: curl + HTML 关键词 + 真实浏览器 + 多地理节点 (踩坑 #21 #22)

### 4.4 i18n
- 3 locale 全覆盖: zh-hk (香港主场) / en (全球英语) / ja (日本)
- 文案不硬编码, 通过 translations 对象
- 货币 HKD / USD / JPY 按 locale

---

## 5. 任务清单 (按 ROI 排序, GLM 5.2 攻)

### 任务 A: siteConfig 拆分 (P0, 基础)
**目标**: `src/lib/siteConfig.ts` 改成 `siteConfigByLocale` 函数/对象, 3 locale 独立 NAP + 品牌 + 地址 + 电话

**要求**:
1. 拆 `siteConfig` 为 `siteConfig.zh-hk` / `siteConfig.en` / `siteConfig.ja` 三个对象
2. 保留 `siteConfig` 全局兼容 (用 zh-hk 作为 default, 或抛 warning)
3. 所有 `import { siteConfig }` 改成 `import { getSiteConfig(locale) }` 函数
4. zh-hk siteConfig:
   - name: '智印雲'
   - alternateName: ['ZprintPro HK', '智印雲(香港)', '智印雲印刷']
   - phone: '+852 1234 5678' (虚拟 HK)
   - address: { street: 'Unit 1208, Tower A, Hung To Road 1', city: 'Kwun Tong', region: 'Hong Kong', country: 'HK', postalCode: '999077' }
   - email: 'hk@zprintpro.com'
5. en siteConfig (基本就是当前全局, 改 minor)
6. ja siteConfig:
   - 真实深圳地址 + 唐运提 法人
   - 增加 founder 字段 / 運営責任者
   - 事業者名: '深圳市彩龍印刷包装有限公司'

**输入文件**:
- `src/lib/siteConfig.ts` (核心改)
- 所有引用 siteConfig 的文件 (~10+ files)

**积分**: 8-10

**验收**:
- `curl /zh-hk/` HTML 含 `+852 1234 5678` 和 `Kwun Tong` 关键词
- `curl /ja/` HTML 含 `深圳市彩龍印刷包装有限公司` 和 `唐运提` 关键词
- `curl /en/` HTML 含 `+86 198 8085 1334` 和 `Shenzhen` 关键词

---

### 任务 B: 3 locale schema 同步拆分 (P0)
**目标**: `generateBusinessJsonLd` / `generateLocalBusinessSchema` / `generateContactPageJsonLd` 全部按 locale 拆分 NAP + 地址

**要求**:
1. 接 `locale` 参数, 内部用 `getSiteConfig(locale)` 取 NAP
2. `generateBusinessJsonLd(locale)`:
   - zh-hk: LocalBusiness + 虚拟 HK 觀塘地址 + +852
   - en: Organization + 深圳跨境 (透明) + +86
   - ja: Organization + 深圳合规 (法人 + 事業者名) + +86
3. `generateLocalBusinessSchema(locale)`:
   - zh-hk: 保留 (HK 本地)
   - en/ja: 转为 Organization (合规跨境)
4. `generateContactPageJsonLd(locale)`:
   - zh-hk: 用 HK 虚拟
   - en/ja: 用深圳真实

**输入文件**:
- `src/lib/seo.ts` (line 479+)
- `src/lib/seo/schema-extensions.ts`
- 所有 schema 调用点

**积分**: 6-8

**验收**:
- Google Rich Results Test 3 locale 全过
- 抓 HTML JSON-LD 验证:
  - zh-hk 含 `+852 1234 5678` + `Kwun Tong` + `"@type":"LocalBusiness"`
  - ja 含 `深圳市彩龍印刷包装有限公司` + `唐运提` + `"@type":"Organization"`

---

### 任务 C: 3 locale OG / 标题 / 描述 拆分 (P1)
**目标**: 每个 page 的 generateMetadata 按 locale 拆分 title / description / OG

**要求**:
1. zh-hk OG / title:
   - "智印雲 ZPrintPro | 香港印刷公司 | 急件印刷·即日交貨 | 貼紙/單張/包裝盒定制"
   - description: "香港智印雲印刷平台 — 專注急件印刷及即日交貨服務..."
   - OG description: "Hong Kong local printing. 30-second quote. Same-day delivery. 港九新界速遞."
2. en OG / title: (基本不变)
3. ja OG / title:
   - "ZPrintPro | 印刷通販 | ステッカー・チラシ・パッケージ印刷 | 即日対応・最短3日納品"
   - OG description: "深圳工場直結、高品質、3〜5営業日でお届け。日本語サポート。深圳市彩龍印刷包装有限公司運営。"

**输入文件**:
- `src/lib/seo.ts` (line 96-112 homeMetadata, 也可能 page.tsx 各处)
- 各 page.tsx 的 generateMetadata
- layout.tsx 的 metadata

**积分**: 4-6

---

### 任务 D: contact page translations 拆分 (P1)
**目标**: contact page 各 locale 的 address / phone / email / office hours 全部按 3 locale 策略

**要求**:
1. zh-hk translations.addressValue = '香港九龍觀塘鴻圖道1號XX大廈12樓1208室'
2. en translations.addressValue = 'Shenzhen, Guangdong, China (深圳市彩龙印刷包装有限公司 · 龍崗区平湖街道嘉城路1号)' (保持)
3. ja translations.addressValue = '広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）· 深圳市彩龍印刷包装有限公司' (保持)

**输入文件**:
- `src/app/[locale]/contact/page.tsx` (line 13-116 translations dict)

**积分**: 3-4

---

### 任务 E: llms.txt 按 locale 拆分 (P2)
**目标**: llms.txt 当前全局 NAP 写 Shenzhen factory, zh-hk 用要改

**要求**:
1. /llms.txt 留英文/全球版 (深圳工厂透明)
2. 加 /llms-zh-hk.txt (HK 虚拟 NAP)
3. 加 /llms-ja.txt (日本合规版, 含事業者名)
4. /robots.txt 引导 AI 爬虫按 locale 取

**输入文件**:
- `scripts/generate-llms-txt.js`
- `public/llms.txt`

**积分**: 3-4

---

### 任务 F: 首页 hero 文案按 locale 重新校准 (P2)
**目标**: 之前 fc43acf 删了 6 处 "MTR 站交收" / "港九新界" / "粵語客服" 之类的暗示本地服务, user 后来同意这些暗示性语言要删. 但 zh-hk 可以加回**中性**的本地化文案 (如 "港九新界速遞" 客观描述, 不暗示实体)

**要求**:
1. zh-hk hero 主标题: "香港印刷公司 | 急件印刷·即日交貨" (20:29 修复的版本)
2. zh-hk hero 副文案: "智印雲香港本地印刷服務 · 港九新界速遞 · 30秒即時報價" (本地服务描述, 不暗示实体)
3. en hero: (保持)
4. ja hero: (保持, 加 "深圳工場直結")

**输入文件**:
- `src/components/home/HeroBanner.tsx`

**积分**: 2-3

---

## 6. 关键决策表 (GLM 5.2 用)

| 维度 | zh-hk | en | ja |
|------|-------|----|----|
| 法规 | 灰色合规 (用户接受) | 跨境合规 | 严格合规 (特定商取引法) |
| 品牌名 | 智印雲 (香港) / ZprintPro HK | ZprintPro | 智印雲 / ZprintPro (深圳明記) |
| 实体地址 | 虚拟 HK 觀塘 | 深圳 (透明) | 深圳 (法定明記) |
| 实体电话 | +852 虚拟 | +86 198 (真实) | +86 198 (真实) |
| 法定代表人 | 不亮明 | 透明写 | 必须写 (唐运提) |
| 公司全名 | 不亮明 | 透明写 | 必须写 (深圳市彩龍印刷包装有限公司) |
| schema.org | LocalBusiness | Organization | Organization |
| areaServed | HK 4 区 | 6 国 (US/UK/AU/CA/NZ/SG) | Japan + Asia |
| SEO 关键词 | "香港貼紙印刷" / "觀塘印店" / "港島宣傳單張" | "custom stickers US" / "flyer printing" / "packaging boxes" | "中国印刷 通販" / "深圳 ステッカー印刷" |
| 转化 CTA | "立即獲取報價" | "Get a Free Quote" | "無料見積もり" |
| 服务承诺 | 港九新界速遞 (本地) | 72h 全球配送 (跨境透明) | 3-5 営業日 (合规承诺) |
| 邮件 | hk@zprintpro.com (或 outlook) | zprintpro@outlook.com | zprintpro@outlook.com |

---

## 7. 验收标准

✅ **代码层**: commit + push 成功 + 本地 `npm run build` 通过
✅ **线上层 (多地理节点 verify)**:
- 抓 zh-hk HTML 含 HK 虚拟 NAP 关键词
- 抓 en HTML 含 +86 198 + Shenzhen 关键词
- 抓 ja HTML 含 深圳市彩龍印刷包装有限公司 + 唐运提 + 法人关键词
✅ **Schema 层 (Google Rich Results Test)**:
- zh-hk: LocalBusiness + 虚拟 HK 地址
- en: Organization + 深圳跨境
- ja: Organization + 日本合规 + 法人
✅ **SEO 层**:
- GSC 抓取 zh-hk 后, "香港印刷" 排名提升
- AI 搜索 (ChatGPT) 引用 "ZprintPro Shenzhen factory" 来自 en, ja
✅ **i18n 层**: 3 locale 文案地道独立
✅ **品牌层**: 3 locale 品牌名 / NAP / 法人 差异化展示, 不串号

---

## 8. 任务执行顺序 (推荐)

```
Phase 1: 基础拆分 (M3 也可做, 但 GLM 5.2 做得更稳)
  ① 任务 A (siteConfig 拆分) — P0
  ② 任务 B (schema 同步) — P0

Phase 2: 表面统一
  ③ 任务 C (OG / title 拆分)
  ④ 任务 D (contact translations)
  ⑤ 任务 F (hero 文案)

Phase 3: 资源
  ⑥ 任务 E (llms.txt 拆分)
```

**总积分预算**: 8 + 7 + 5 + 4 + 3 + 2 = ~30 积分 (6 任务)

---

## 9. 提示

**AutoClaw 接到这个 v4 提示词后**:
1. 先读 siteConfig.ts 全文 + regionConfig 全文 + 所有引用 siteConfig 的文件
2. 列出 siteConfig 拆分影响的文件清单
3. 按 A → B → C → D → E → F 顺序执行
4. 每个任务完成后 commit + push + verify (curl + HTML 关键词 + 多地理节点)
5. 报告给 user

**AutoClaw 不要再**:
- ❌ 强制统一 3 locale NAP
- ❌ 把 zh-hk 改深圳 (反方向)
- ❌ 把 ja 改虚拟地址 (反方向)
- ❌ 删 user 已经接受的本地化文案

---

## 10. 关联文件 / 资源

- 当前 v3 doc: `docs/auto-claw-prompts-2026-06-28.md` (GSC 数据 + 流量瓶颈分析)
- llms.txt: `public/llms.txt` (10.6KB, 14 categories + 84 SKUs)
- Hero: `src/components/home/HeroBanner.tsx`
- Site config: `src/lib/seo.ts` (line 7-35) + `src/lib/siteConfig.ts` (无, 在 seo.ts)
- Contact: `src/app/[locale]/contact/page.tsx` (line 13-116 translations)
- Region config: `src/lib/seo.ts` (line 55-93)

---

**AutoClaw GLM 5.2 接到此文件后, 按 Phase 1 顺序执行, 6 任务约 30 积分, 完整 v4 修复 3 locale 独立商业策略**。
