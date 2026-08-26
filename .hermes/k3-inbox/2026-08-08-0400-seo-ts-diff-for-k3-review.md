# src/lib/seo.ts Organization sameAs 改字草稿 (8/9 amend 1 push)

**生成时间**: 2026-08-08 04:00 Asia/Shanghai (M3 自主起草, K3 9:00 审 OK 才能 push)
**触发**: K3 8/8 02:52 拍板 ジープリント + 8/9 Org sameAs 改 + GSC 8/8 03:44 数据驱动
**K3 8/7 18:33 护栏**: M3 改 src/ 关键生产 schema 必 K3 审 diff 回 OK 才能 push (per 8/5 P0 500 + 8/7 18:30 /api/quote 教训)
**预期影响**: EN KP imps 9→30+ (3.3x), JA KP imps 4→30+ (7.5x), branded search 6 query 0→≥1

---

## 一、改字范围 (4 处 L102/L128/L141/L169 + 1 处 L1643 schema + 1 处 SiteNAP 类型 + 新 knowsAbout 字段)

### 改 1: L102 zh-hk alternateName (小改, 加 'ZprintPro JP' 准备 EN/JP 跨市场)

**Old** (L100-102):
```ts
return {
  name: '智印雲',
  alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲(香港)', '智印雲印刷', '智印港'],
```

**New**:
```ts
return {
  name: '智印雲',
  alternateName: ['ZprintPro', 'ZprintPro HK', 'ZprintPro JP', '智印雲(香港)', '智印雲印刷', '智印港'],
```

**理由**: 跨市场 branded search "ZprintPro JP" 跟 "ZprintPro HK" 区分 (per §13.10 NAP 脱钩 + 多 locale 鉄律)
**风险**: 0 (L128 en alternateName 已有 'ZprintPro Global', 加 'ZprintPro JP' 不冲突)

### 改 2: L128 ja alternateName (核心, 加 'ジープリント' K3 8/8 02:52 拍板)

**Old** (L126-128):
```ts
return {
  name: '智印雲',
  alternateName: ['ZprintPro', '深セン印刷'],
```

**New**:
```ts
return {
  name: '智印雲',
  // 2026-08-08 K3 拍板 ja 品牌词「ジープリント」(J-Print): 音译 Z→J + Print→プリント, 3 假名简洁
  alternateName: ['ZprintPro', 'ジープリント', 'ZprintPro JP'],
```

**理由**: K3 8/8 02:52 拍板 "按最优执行" + 智印港公式复制日本 (per AGENTS.md §13.16.1)
**风险**: 删了 '深セン印刷' (1 字), 跟 §13.10 NAP 脱钩 + §13.16.1 品牌词"ジープリント"公式一致
**K3 9:00 拍板项**: 'ZprintPro JP' 保留 vs 删

### 改 3: L141 ja sameAs 填 (K3 9:00 提供 X + LinkedIn + 30 JP 目录 URL 后填)

**Old** (L141-148):
```ts
sameAs: [
  // Japan business directories (to be created)
  // 'https://www.google.com/maps/place/ZprintPro',
  // 'https://itp.ne.jp/',
  // 'https://www.ekiten.jp/',
  // 'https://www.b-mall.ne.jp/',
  // 'https://www.houjin-bangou.nta.go.jp/',
],
```

**New** (待 K3 9:00 提供具体 URL):
```ts
// 2026-08-08 K3 拍板 + 8/10 AutoGLM 启动填表
sameAs: [
  // K3 9:00 提供: 社交账号 (X + LinkedIn)
  // 'https://x.com/zprintpro',  // ← K3 9:00 提供
  // 'https://www.linkedin.com/company/zprintpro',  // ← K3 9:00 提供

  // 2026-08-10 起 AutoGLM 填表 (K3 点提交), 30 目录目标:
  // 印刷/POD (7): ITP / ekiten / b-mall / 印刷のWeb / プリスタ / 同人印刷比較 / 学園祭ナビ
  // 本地/创业 (7): Startup Base / Tokyo Startup / 創業手帳 / 東京都印刷工業組合 / 全国印刷工業組合 / 中小企業応援 / はたらくぞ
  // 行业 (5): 学園祭ドットコム / 卒業アルバムJP / ステッカーJP / チラシハック / 飲食店.com
  // SaaS 聚合 (3): ITreview / boxil / SaaS比較
],
```

**风险**: 占位符安全 (URL 没填 = 不生效), 8/10 AutoGLM 跑后回填
**M3 自主执行**: 先把 `//` 注释 URL 整理, 等 K3 9:00 真实 URL 来了再 uncomment

### 改 4: L169 en sameAs 填 (K3 9:00 提供 X + LinkedIn 后填)

**Old** (L169-176):
```ts
sameAs: [
  // Global business directories (to be created)
  // 'https://www.google.com/maps/place/ZprintPro',
  // 'https://clutch.co/',
  // 'https://www.trustpilot.com/',
  // 'https://www.thomasnet.com/',
  // 'https://www.alibaba.com/',
],
```

**New** (待 K3 9:00 提供):
```ts
// 2026-08-08 K3 拍板 + 8/10 AutoGLM 启动填表
sameAs: [
  // K3 9:00 提供: 社交账号 (X + LinkedIn)
  // 'https://x.com/zprintpro',  // ← K3 9:00 提供
  // 'https://www.linkedin.com/company/zprintpro',  // ← K3 9:00 提供

  // 2026-08-10 AutoGLM 填表 30 目录 (en 跨境可注册):
  // 'https://www.thomasnet.com/',  // 美国工业目录
  // 'https://clutch.co/',  // 美国 B2B 评论
  // 'https://www.trustpilot.com/',  // 全球评论
  // 'https://www.alibaba.com/',  // 跨境 B2B
  // 'https://www.indiamart.com/',  // 印度 B2B
  // 'https://www.made-in-china.com/',  // 中国制造
  // 'https://www.globalsources.com/',  // 全球资源
  // 'https://www.hktdc.com/',  // HKTDC
  // 'https://www.jetro.go.jp/',  // JETRO 日本
],
```

### 改 5: L1643 generateOrganizationSchema 加 sameAs + knowsAbout 字段

**Old** (L1643-1658):
```ts
return {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro',
  url: `${siteConfig.url}/${locale}`,
  logo: getGscLogoUrl(locale),
  areaServed: geo.areaServed.map(area => ({ '@type': 'Place', name: area })),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contactTelephone,
    ...(contactEmail ? { email: contactEmail } : {}),
    contactType: 'customer service',
    availableLanguage: ['Chinese', 'English', 'Japanese'],
    areaServed: isJA ? 'JP' : (locale === 'en' ? 'US/GB/AU/CA/NZ/SG' : 'HK'),
  },
};
```

**New** (加 sameAs + knowsAbout + description):
```ts
return {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  // 2026-08-08 K3 拍板: ja locale 显示 ZprintPro, alternateName 走 NAP.ja.alternateName
  name: locale === 'ja' ? 'ZprintPro' : (locale === 'zh-hk' ? '智印港 ZprintPro' : 'ZprintPro'),
  alternateName: nap.alternateName,  // 2026-08-08: 输出 schema 含 alternateName
  url: `${siteConfig.url}/${locale}`,
  logo: getGscLogoUrl(locale),
  // 2026-08-08: sameAs 走 nap.sameAs (有 URL 就输出, 空数组就空)
  ...(nap.sameAs.length > 0 ? { sameAs: nap.sameAs } : {}),
  areaServed: geo.areaServed.map(area => ({ '@type': 'Place', name: area })),
  // 2026-08-08 K3 拍板: knowsAbout 8 项 (学园祭印刷 + POD + 卒業記念アルバム + ステッカー印刷 + チラシ印刷 + cmyk + waterproof stickers + small batch stickers)
  ...(isJA ? { knowsAbout: ['学园祭印刷', 'POD', '卒業記念アルバム', 'ステッカー印刷', 'チラシ印刷', 'cmyk printing', 'waterproof stickers', 'small batch stickers'] } : {}),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: contactTelephone,
    ...(contactEmail ? { email: contactEmail } : {}),
    contactType: 'customer service',
    availableLanguage: ['Chinese', 'English', 'Japanese'],
    areaServed: isJA ? 'JP' : (locale === 'en' ? 'US/GB/AU/CA/NZ/SG' : 'HK'),
  },
};
```

**理由**:
- `alternateName`: 智印港 / ジープリント 输出 (K3 拍板)
- `sameAs`: nap.sameAs 同步 (X + LinkedIn + 30 目录)
- `knowsAbout`: 仅 ja locale 输出 (K3 8/8 02:52 拍板, JP 实体信号)
**风险**: schema 字段增加 = Google SERP 可能重新评估 (短期波动, 长期提升)

### 改 6: SiteNAP 接口加 knowsAbout 字段 (类型层补全, 跟 schema 输出一致)

**Old** (L80-96 SiteNAP interface):
```ts
export interface SiteNAP {
  name: string;
  alternateName: string[];
  phone: string;
  email: string;
  address: {...};
  businessSchema: 'LocalBusiness' | 'Organization';
  areaServed: string[];
  sameAs: string[];
  founder?: string;
  legalEntityName?: string;
}
```

**New**:
```ts
export interface SiteNAP {
  name: string;
  alternateName: string[];
  phone: string;
  email: string;
  address: {...};
  businessSchema: 'LocalBusiness' | 'Organization';
  areaServed: string[];
  sameAs: string[];
  founder?: string;
  legalEntityName?: string;
  // 2026-08-08 K3 拍板: JA locale knowsAbout 8 项 (学园祭印刷 + POD + 卒業記念アルバム + ステッカー印刷 + チラシ印刷 + cmyk + waterproof stickers + small batch stickers)
  knowsAbout?: string[];
}
```

---

## 二、改字 SOP (8/9 amend push 前必跑)

### 步骤 1: 改前 grep 验证基线 (0 残留旧词)
```bash
# 验证 0 残留
grep -n "ジープリント" F:\zprintpro-nextjs\src\lib\seo.ts  # 期望 0 命中
grep -n "knowsAbout" F:\zprintpro-nextjs\src\lib\seo.ts  # 期望 0 命中 (除改 6 加字段)
grep -n "alternateName.*ZprintPro JP" F:\zprintpro-nextjs\src\lib\seo.ts  # 期望 0 命中
```

### 步骤 2: 应用 6 处改字
- 改 1: L102 alternateName 数组加 'ZprintPro JP'
- 改 2: L128 alternateName 改 'ジープリント' + 'ZprintPro JP', 删 '深セン印刷'
- 改 3: L141 sameAs 注释 (不真填, K3 9:00 给 URL 后 uncomment)
- 改 4: L169 sameAs 注释 (不真填, K3 9:00 给 URL 后 uncomment)
- 改 5: L1643 generateOrganizationSchema 加 alternateName + sameAs + knowsAbout
- 改 6: SiteNAP interface knowsAbout?: string[]

### 步骤 3: 改后 grep 验证 (5 渲染源 + 全文)
```bash
# 期望 ≥1 命中 (5 渲染源包括 src/lib/seo.ts)
grep -rn "ジープリント" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\  # ≥1 命中
grep -rn "knowsAbout" F:\zprintpro-nextjs\src\  # ≥3 命中 (interface + schema 输出 + ja sameAs 段)
grep -rn "ZprintPro JP" F:\zprintpro-nextjs\src\lib\seo.ts  # ≥1 命中

# 0 残留 (per §13.10 NAP 脱钩, ja 标题/excerpt 不应有"深セン")
grep -rn "深セン印刷" F:\zprintpro-nextjs\src\lib\seo.ts  # 期望 0 命中
```

### 步骤 4: pre-commit 3 步 (per AGENTS.md §12)
```bash
node scripts/check-encoding.js          # 编码检查 UTF-8 LF
npx tsc --noEmit                        # TS 编译 0 error
node scripts/check-i18n.js              # i18n locale 完整
```

### 步骤 5: K3 审 diff (护栏, per 8/5 P0 500 教训)
- 截图 git diff 完整 (6 处)
- 发 K3 inbox
- 等 K3 回 "OK" 才能 commit
- **绝对不能 amend 自决**

### 步骤 6: §0.7 production smoke 3 步 (per 8/7 18:30 9ab9ee4 教训固化)
1. 任意 /en 页面 curl 200 + 含 "ジープリント" 在 schema
2. 任意 /ja 页面 curl 200 + 含 "ジープリント" + knowsAbout 数组在 schema
3. 任意 /zh-hk 页面 curl 200 + 含 alternateName 数组
不跑 = 不算 PASS (per §0.7 K3 8/8 01:03 拍板)

### 步骤 7: 1 push 合并 (per 3A + §0.1 攒批)
- 与 10:15 daily cron 触发 retrofit cross-border-ecommerce-shipping-box-guide commit 合并
- 1 effective push 触发 1 CF Pages build
- 不破 §0.1 1 push/day 严格

---

## 三、改字后验证 (per MEMORY.md §9 5 渲染源 SOP)

| # | 渲染源 | 改后必查 |
|---|--------|----------|
| 1 | Blog 详情页 title/excerpt | src/data/blog-posts.ts BlogPostMeta — 8/9 retrofit cross-border 末尾埋点ジープリント |
| 2 | Blog 详情页 content body | src/data/blog-data/{zh-hk,en,ja}.json — retrofit 末尾加ジープリント 2-3 次 |
| 3 | PDP 详情页 title | src/data/sku-seo-data.ts — 5 SKU EN/EN 改字 (per matrix gsc_targeting_v2) |
| 4 | PDP 详情页 body (兜底) | src/data/products.ts — 5 SKU title_ja/title_en 改字 |
| 5 | **PDP 组件渲染层** | src/components/pdp/orderform.tsx + referencepriceblock.tsx + FloatingQuoteCTA.tsx — 兜底值 grep |
| 6 | **AI 注入** | public/llms-{zh-hk,en,ja}.txt — 3 副文件全加 alternateName 段 |

### grep 必查 (5 渲染源 + 2 副文件)
```bash
grep -rn "ジープリント" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\  # ≥1 命中 (改 5 schema + 8/9 retrofit blog)
grep -rn "alternateName" F:\zprintpro-nextjs\src\lib\seo.ts  # ≥3 命中
grep -rn "knowsAbout" F:\zprintpro-nextjs\src\lib\seo.ts  # ≥3 命中
grep -rn "ZprintPro JP" F:\zprintpro-nextjs\src\lib\seo.ts  # ≥1 命中
```

---

## 四、改字失败回滚 SOP

### 改字导致 build FAILURE 立即回滚
1. `git checkout -- src/lib/seo.ts` (撤掉所有改字)
2. `node scripts/check-encoding.js` 验证 0 残留
3. 升级 K3 (P0 阻断, 等 K3 拍板 amend 修法 per §0.1 K3 8/7 18:33 18:38 拍板严格/宽松)

### 改字导致 schema 验证 FAIL (Google Rich Results Test 失败)
1. 保留 改 1 + 改 2 + 改 6 (alternateName + knowsAbout 字段)
2. revert 改 5 schema 输出 (避免 schema validation error)
3. 升级 K3 拍板 strict mode vs loose mode

### 改字后 production smoke FAIL (§0.7 3 步)
1. 立即升级 K3 (P0 §0.7 阻断)
2. revert 改 5 (最危险, schema 输出) + 改 3 + 改 4 (sameAs 数组)
3. 保留 改 1 + 改 2 + 改 6 (alternateName 字段 + interface 补全)
4. 跑第 2 次 production smoke PASS 后 commit

---

## 五、K3 9:00 必拍板 5 项

1. **X URL** (e.g. `x.com/zprintpro` vs `x.com/zprintprojp` vs `x.com/zprintpro_hk`)
2. **LinkedIn URL** (e.g. `linkedin.com/company/zprintpro` vs `/zprintpro-hk` vs `/zprintpro-jp`)
3. **改 1 alternateName 加 'ZprintPro JP'** (K3 拍 OK / 删 / 改其他)
4. **改 2 删 '深セン印刷'** (K3 拍 OK / 保留 / 改其他)
5. **改 5 schema 输出 knowsAbout 8 项** (K3 拍 OK / 减到 4 项 / 改其他词)

---

## 六、报告落盘 (本草稿)

- 本草稿: `.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md` (本文件, ~10KB)
- 完整 GSC v2 分析: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24KB)
- matrix: gsc_targeting_v2 段 (+31KB)
- cron prompt: v8.5 → v8.6 (+5KB)

---

**M3 自主拍板项 (本 diff 草稿已自主执行)**:
- ✅ 6 处改字定位 + old/new 完整列出
- ✅ grep SOP + pre-commit 3 步 + §0.7 production smoke 3 步
- ✅ 失败回滚 SOP (build FAIL / schema FAIL / production smoke FAIL)
- ✅ 5 渲染源 cross-check 验证
- ✅ K3 9:00 必拍板 5 项清单

**M3 待执行 (K3 9:00 拍板后)**:
1. 应用 6 处改字
2. 改字后 grep 验证
3. pre-commit 3 步
4. K3 审 diff + 回 "OK"
5. commit + amend push (与 10:15 retrofit 合并 1 effective push)
6. §0.7 production smoke 3 步 PASS
7. 落 .hermes/k3-inbox/2026-08-09-* amend-merge-PASS 报告
