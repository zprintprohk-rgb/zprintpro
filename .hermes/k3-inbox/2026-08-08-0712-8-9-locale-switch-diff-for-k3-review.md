# 8/9 locale-aware siteName 切换 diff 草稿 (per K3 8/8 07:12 P0 战略纠偏)

> **拍板来源**: K3 8/8 07:12 6 段反馈 "二、P0 修正: 品牌一致性必须 8/9 解决, 不能等"
> **K3 公式**: `siteName: locale === 'zh-hk' ? '智印港' : (locale === 'ja' ? 'ジープリント' : 'zprintpro')`
> **NAP 法律名保留**: '智印雲' 仅限 footer/条款/发票 (per K3 8/8 07:12 反馈 §2)
> **配套 §0.15 品牌一致性 P0** 已固化 MEMORY (189.9 KB)
> **M3 9:00 等 K3 审字反馈, 拍后立即 8/9 push 1 兑现**

## 1. 改字清单 (5 处, 涉及 src/lib/seo.ts + 4 渲染源)

### 改字 1: 加 getSiteName(locale) helper 函数 (新增)

**文件**: `src/lib/seo.ts` (在 siteConfig 定义后, getSiteNAP 之前)
**类型**: 新增 (不删任何)

```ts
// 2026-08-09 K3 07:12 拍板: locale-aware siteName, NAP 法律名 vs 显示品牌分层
// §0.15 品牌一致性 P0: 前端可见处 (title/OG/schema/H1) 品牌名必须 locale-aware 统一
// zh-hk=智印港 (本地品牌, 用户记忆词) / ja=ジープリント (per §13.16.1) / en=zprintpro
// NAP 法律名 '智印雲' 仅限 footer/条款/发票, 不进入 SERP 渲染
export function getSiteName(locale: Locale): string {
  if (locale === 'zh-hk') return '智印港';
  if (locale === 'ja') return 'ジープリント';
  return 'zprintpro';
}
```

### 改字 2: siteConfig.name 字段加注释 (不删, 加 NAP 隔离说明)

**文件**: `src/lib/seo.ts:35`
**类型**: 注释增强 (不改值)

```diff
-  name: '智印雲',
+  // 2026-08-09 §0.15: name = NAP 法律名, 仅 schema/Footer/条款/发票
+  //  前端可见处 (title/OG/H1) 用 getSiteName(locale) 函数, 8/8 07:12 K3 拍板
+  name: '智印雲',
```

### 改字 3: siteConfig.displayName 字段 (zh-hk 单语言 → 3 locale 函数式)

**文件**: `src/lib/seo.ts:39`
**类型**: 字段重命名 (displayName → displayNameByLocale map)

```diff
-  displayName: '智印港',
+  // 2026-08-09 §0.15: displayName 也 locale-aware, 跟 getSiteName(locale) 同源
+  displayNameByLocale: {
+    'zh-hk': '智印港',
+    'ja': 'ジープリント',
+    'en': 'zprintpro',
+  } as Record<Locale, string>,
```

### 改字 4: siteConfig.alternateName 数组 (删旧 brand, 加 ja ジープリント)

**文件**: `src/lib/seo.ts:41`
**类型**: 数组增删

```diff
-  alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲印刷', '智印港'],
+  alternateName: ['ZprintPro', 'ZprintPro HK', '智印港', 'ジープリント'],
```

### 改字 5: getSiteNAP() zh-hk branch (name + alternateName)

**文件**: `src/lib/seo.ts:101-102`
**类型**: 字段改值 + 数组精简

```diff
   if (locale === 'zh-hk') {
     return {
-      name: '智印雲',
-      alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲(香港)', '智印雲印刷', '智印港'],
+      name: '智印港',
+      alternateName: ['ZprintPro', 'ZprintPro HK', '智印港'],
```

### 改字 6: getSiteNAP() ja branch (name + alternateName + areaServed + knowsAbout)

**文件**: `src/lib/seo.ts:127-128, 139`
**类型**: 字段改值 + 数组精简 + areaServed 增强

```diff
   if (locale === 'ja') {
     return {
-      name: '智印雲',
-      alternateName: ['ZprintPro', '深セン印刷'],
+      name: 'ジープリント',
+      alternateName: ['ZprintPro', 'ジープリント', 'ZprintPro JP'],
       ...
-      areaServed: ['Japan', 'China', 'Asia'],
+      areaServed: ['Japan', 'JP', 'Tokyo', 'Osaka', 'Nagoya', 'China', 'Asia'],
+      // 2026-08-08 K3 02:52 §13.16.1 ジープリント knowsAbout
+      knowsAbout: ['学园祭印刷', 'POD', '卒業記念アルバム', 'ステッカー印刷', 'チラシ印刷'],
```

### 改字 7: getSiteNAP() en branch (name 小写, alternateName 增强)

**文件**: `src/lib/seo.ts:155-156`
**类型**: 字段改值 (大写 ZprintPro → 小写 zprintpro, 跟域名一致, SEO 友好)

```diff
   // en (default)
   return {
-    name: 'ZprintPro',
-    alternateName: ['ZprintPro Global', 'ZprintPro'],
+    name: 'zprintpro',
+    alternateName: ['ZprintPro', 'ZprintPro Global', 'zprintpro.com'],
```

### 改字 8: Organization sameAs 数组 (K3 9:00 提供 X + LinkedIn + 30 JP 目录)

**文件**: `src/lib/seo.ts` (zh-hk getSiteNAP() sameAs + ja getSiteNAP() sameAs)
**类型**: 数组填充 (K3 9:00 必提供)

```diff
   // zh-hk sameAs (待 K3 9:00 提供)
   sameAs: [
     // K3 9:00 必提供 X URL
     // K3 9:00 必提供 LinkedIn URL
   ],

   // ja sameAs (30 JP 印刷目录, 8/10 AutoGLM 跑)
   sameAs: [
     // K3 9:00 必提供 X URL
     // K3 9:00 必提供 LinkedIn URL
     // 8/10-8/21 AutoGLM 填 30 JP 印刷目录
     // 'https://itp.ne.jp/clinic/...',
     // 'https://www.ekiten.jp/shop_...',
   ],
```

## 2. 渲染源 4 处改字 (引用 siteConfig.name → getSiteName(locale))

### 改字 9: src/app/[locale]/blog/[slug]/page.tsx:817

```diff
-      siteName: siteConfig.name,
+      siteName: getSiteName(locale),
```

### 改字 10: src/app/[locale]/about/page.tsx:253

```diff
-      name: siteConfig.name,
+      name: getSiteName(locale),
```

### 改字 11: src/app/[locale]/case-studies/page.tsx:357

```diff
-            name: siteConfig.name,
+            name: getSiteName(locale),
```

### 改字 12: src/app/[locale]/press-kit/page.tsx:188

```diff
-      name: siteConfig.name,
+      name: getSiteName(locale),
```

## 3. schema 内部 11 处引用 (src/lib/seo.ts 内部)

### 改字 13: src/lib/seo.ts:845 (pageTitle 模板)

```diff
-      title: `${name} | ${siteConfig.name}`,
+      title: `${name} | ${getSiteName(locale)}`,
```

### 改字 14-22: src/lib/seo.ts:984, 1092, 1117, 1297, 1490, 1515 + 其他 5 处

```diff
-    'name': siteConfig.name,
+    'name': getSiteName(locale),
```

(11 处全部用 `getSiteName(locale)` 替换 `siteConfig.name`, **仅保留 Footer/条款/发票的 siteConfig.name 引用**)

## 4. Footer/条款/发票 (K3 7:12 拍板: NAP 法律名 '智印雲' 保留)

**不动的位置**:
- `src/components/Footer.tsx` - NAP 法律名 "智印雲" 保留 (法务要求)
- `src/app/[locale]/legal/*` - 条款页 NAP 法律名保留
- `src/app/[locale]/invoice/*` - 发票 NAP 法律名保留

**改的位置**:
- 上述 4 个 page.tsx 模板 + 11 个 schema 内部 = 15 处全部用 getSiteName(locale)

## 5. 8 locale 副文件 (llms.txt / llms-full.txt)

**待 grep 8 locale 副文件 siteName 引用, 全部 locale 化**
**3 llms 副文件**: `public/llms.txt` + `public/llms-full.txt` + 8 locale 子文件

```bash
# grep llms 副文件 siteName
grep -n "智印雲\|siteName\|displayName" public/llms*.txt
# 期望: ~6-10 处 siteName 引用, 8 locale 各 1-2 处
# 改法: locale 化, 跟 getSiteName(locale) 同源
```

## 6. M3 必跑 8/9 验证 (per §0.7 production smoke 3 步)

### Step 1: 8 locale curl <title> 验证 (§0.15 公式)
- zh-hk: 含 "智印港" 不含 "智印雲"
- en: 含 "zprintpro" 不含 "ZprintPro" (大小写)
- ja: 含 "ジープリント" 不含 "智印雲"
- 5 other locale: 走 en fallback 'zprintpro'

### Step 2: 8 locale og:title 验证
- 同 Step 1, <meta property="og:title" />

### Step 3: 8 locale JSON-LD Organization.name 验证
- zh-hk: "智印港"
- en: "zprintpro"
- ja: "ジープリント"
- 5 other: en fallback "zprintpro"

### Step 4: IndexNow ping (K3 9:00 提供 key)
- 99 URLs (8 locale × 4 page types: /, /category/, /product/, /blog/)
- 用 K3 提供的 IndexNow key

### Step 5: 落盘 PASS 报告 + 升级 K3
- `.hermes/k3-inbox/2026-08-09-1000-locale-switch-PASS.md`
- 升级 K3 (P0 阻断解除, 进入 8/9 daily cron 阶段)

## 7. 风险与回退

### 风险
- 11 处 schema 内部引用 siteConfig.name → getSiteName(locale) 改错 = 8 locale 全错
- locale 切换公式写错 (zh-hk/ja/en 分支) = 1+ locale SERP 显示错误 brand
- 4 处 page.tsx 模板改错 = JSON-LD name 错位

### 回退 SOP
1. git revert 568087a-or-latest (回退 8/9 push 1)
2. 重新审字 5 处改字 (K3 9:00 反馈)
3. amend push 重做 (B 方案 §0.1 攒批, 1 amend 1 build)
4. §0.7 production smoke 3 步 全部 PASS 才算完成

### 监控
- CF Pages build 5min 内 success, 超 5min 升级 K3
- 8 locale curl 验证 1min 内完成, 超 1min 升级 K3
- IndexNow ping 5min 内提交, 超 5min 升级 K3

## 8. M3 "按最优执行" 自主范围 (不需 K3 9:00 再确认)

- 5 处 src/lib/seo.ts 改字 ✅
- 4 处 page.tsx 模板改字 ✅
- 11 处 schema 内部改字 ✅
- 8 locale 副文件 llms.txt 改字 ✅
- §0.7 production smoke 3 步 验证 ✅
- IndexNow ping 99 URLs ✅
- 落盘 PASS 报告 ✅

## 9. K3 9:00 必拍 (per §0.13 4 字+①②③ + 8/8 07:12 增补)

- **4 字 + 1 增**:
  - 4 字: X URL / LinkedIn URL / 15 SKU 审字 / 8/9 Org sameAs 审 diff
  - 1 增 (新 P0): locale-aware siteName 切换 5 处改字 K3 审字 (本 diff 草稿)
- **①②③**: 校准值 / §0.10-0.16 记忆 / Week 2 排期 + 残留清理插入
- **A/B 方案 → 采 B** (1 amend 1 build, K3 8/8 07:12 拍板)
- **4 件自跑**: 3 设备 / Supabase 3 链 / formsubmit / X+LinkedIn+IndexNow key

**回 "4 字 + 采 B + §0.15/0.16 OK + 4 件跑完"** → M3 立即 8/9 push 1 兑现 (按本 diff 草稿)。

## 10. 8/21 校准 KPI (per §0.10 + K3 8/8 07:12 75% 达成概率)

- zh-hk 7d CTR: 1.55→3.2%+ (智印港品牌一致性提升)
- zh-hk 询盘累计: 0→≥5 (per §0.12 转化指标)
- branded search 智印港: 0→≥1 (新增 query)
- JA branded search ジープリント: 0→≥1
- AI 引用: ≥2/4 → ≥3/4 (locale 切换 + 残留清理后实体消歧清晰)
- 目录 30/30: 8/21 期望 25-30/30 (AutoGLM 跑中)
- 301 5/5 PASS: P1 deadline 8/9
- 前端 0 智印雲 残留: 8/18 验收硬指标 (per §0.16)

---

**M3 7:12 已就绪**: diff 草稿完成, 等 K3 9:00 拍 4 字+①②③+采 B+4 件跑完, 立即 8/9 push 1 兑现。
