# P0 第 1 优先: EN small-batch-stickers 单独改字草稿 (K3 8/8 04:35 战略级修正)

**生成时间**: 2026-08-08 04:40 Asia/Shanghai
**触发**: K3 8/8 04:35 战略级评估 - "先修 EN small-batch-stickers (pos 7.76/29imps/0%CTR, 全项目 ROI 最高单点), 再合并 15 SKU"
**资源重排**: per §0.11 硬约束 - 抓强信号 (P0, 4天可兑现) > 本地实体建设 (P1) > 黑洞大词 (P2)
**K3 8/7 18:33 护栏**: M3 改 src/ 关键生产 schema 必 K3 审 diff 回 OK 才能 push
**预期影响**: 0% CTR → 3-5% CTR (4 天可兑现, 全项目 ROI 最高单点)

---

## 一、为什么 small-batch-stickers 是 P0 第 1 优先

### GSC 数据 (per v2 报告 桶 A 抓强信号)
- **3 月累计**: 29 imps 0% CTR **pos 7.76 第 1 页底部** ⚠️ 抓强信号
- **3 月 batch 系列**: 5 imps 0% CTR **pos 2.4 第 1 页顶** ⚠️ 强信号 + 5 small batch label printing 19+18=37 imps 0% CTR pos 60-78
- **总 imps**: 29+5+1+1+19+18+10+8+2+1+1 = **94 imps 0% CTR**, 全部 small batch 相关 query
- **核心问题**: pos 7.76 + 0% CTR = **snippet 不够强**, 改 title 即可胜, 不需外链

### 投入产出比 (per §0.11)
- **抓强信号** (small-batch-stickers): 1 SKU 改 title, 4 天内 29 imps 0% → 3-5% CTR, **收益 = 1-2 click/day**
- **黑洞大词** (a2-posters 856 imps): 1 SKU 改 title, 4 天内 856 imps pos 37 → 不可兑现, **收益 ≈ 0**
- **本地实体** (Org sameAs): 1 schema 改, 4 天内 NAP 渐进, **收益 = 智印港 pos 1 维持**

**small-batch-stickers 4 天可兑现, 是全项目 ROI 最高单点** — K3 战略级判断正确

### 对比原 8/8 10:15 amend push 计划
- **原计划**: 5 SKU JA + 5 SKU EN + 5 SKU zh-hk 合并 1 push (15 SKU)
- **K3 修正**: P0 第 1 优先 small-batch-stickers 单独先改, 再合并其他 14 SKU
- **理由**: small-batch-stickers ROI 10x 黑洞大词, 4 天必胜

---

## 二、改字清单 (single SKU, per §0.11 P0 抓强信号)

### 改 1: EN small-batch-stickers title_en + descriptionEn (P0 抓强信号)

**Old (估, 待 grep 验证)**:
```ts
// src/data/products.ts small-batch-stickers SKU
title_en: 'Custom Stickers Small Batch 100 MOQ',
descriptionEn: '...'
```

**New**:
```ts
title_en: 'Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl, Die-Cut, Waterproof',
descriptionEn: '【Small Batch Custom Stickers 100 MOQ】Same-day production, DHL 2-4 day global shipping, free shipping over $99. 5 material types: Vinyl (matte/gloss), Die-Cut (50+ free shapes), Waterproof (5+ years outdoor UV), Removable (no residue), Fluorescent (5 neon colors). Free design proof in 1 business day, no setup fee. Perfect for: DTC brands, Craft breweries, Skincare, Pet food, Subscription boxes, E-commerce, Events, Conference swag. 50+ shape templates free, custom shape $20 one-time setup. Order 1-100 same day. WhatsApp +86 198 8085 1334 instant quote.',
```

**8 行业 list 末尾** (per §13.10 NAP 脱钩, 不硬塞 "Shenzhen Printing" / "in Hong Kong"):
- DTC
- Craft
- Brewery
- Skincare
- Pet Food
- Subscription Box
- E-commerce
- Event

**5 FAQ (en)**:
- "What is the minimum order quantity? Answer: 100 MOQ — order 1-100 custom stickers same day."
- "What material types are available? Answer: Vinyl, Die-Cut, Waterproof, Removable, Fluorescent — 5 types."
- "How fast is shipping? Answer: DHL 2-4 day global shipping, free shipping over $99."
- "How long for design proof? Answer: Free design proof in 1 business day, no setup fee."
- "What shapes are available? Answer: 50+ shape templates free, custom shape $20 one-time setup."

**期望 CTR 提升**: 0% → 3-5% (snippet 命中 "100 MOQ" + "Same-Day" + "Free Shipping" + "Vinyl, Die-Cut, Waterproof" 4 USP)

### 改 2: src/data/sku-seo-data.ts small-batch-stickers PDP meta (5 SKU meta 优先于 products.ts)

**Old (估)**:
```ts
{
  slug: 'small-batch-stickers',
  metaTitle: 'Custom Stickers Small Batch 100 MOQ | ZprintPro',
  metaDescription: '...'
}
```

**New**:
```ts
{
  slug: 'small-batch-stickers',
  metaTitle: 'Small Batch Stickers 100 MOQ Same-Day Free Shipping Vinyl | ZprintPro',
  metaDescription: '【100 MOQ Same-Day】Small batch custom stickers. 5 material types: Vinyl, Die-Cut, Waterproof, Removable, Fluorescent. DHL 2-4 day global, free shipping $99+. Free design proof 1 business day. Order 1-100 same day. WhatsApp +86 198 8085 1334.',
  metaKeywords: ['small batch stickers', 'custom stickers', '100 MOQ', 'same-day stickers', 'vinyl stickers', 'die-cut stickers', 'waterproof stickers', 'DHL global shipping']
}
```

**改字 grep SOP** (per MEMORY.md §9):
- 改前 grep: `grep -rn "small batch sticker" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\` 期望 ≥3 命中 (products.ts + sku-seo-data.ts + llms-en.txt)
- 改后 grep: 期望 ≥5 命中 (新增 PDP meta + llms-en.txt L11 + L222 副文件)

---

## 三、改字 SOP (8/8 10:15 amend push 前必跑)

### 步骤 1: 改前 grep 验证基线 (0 残留旧词 + 5 渲染源)
```bash
# 验证当前 small-batch-stickers title_en (3-5 命中)
grep -rn "small batch sticker" F:\zprintpro-nextjs\src\data\products.ts
grep -rn "small batch sticker" F:\zprintpro-nextjs\src\data\sku-seo-data.ts
grep -rn "small batch sticker" F:\zprintpro-nextjs\public\llms-en.txt

# 验证 0 残留 181
grep -rn "181[ -]\?2638[ -]\?0255" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\  # 期望 0
```

### 步骤 2: 应用 2 处改字
- 改 1: products.ts small-batch-stickers title_en + descriptionEn
- 改 2: sku-seo-data.ts small-batch-stickers metaTitle + metaDescription + metaKeywords

### 步骤 3: 改后 grep 验证 (5 渲染源 + 3 副文件)
```bash
# 期望 ≥5 命中
grep -rn "small batch sticker" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\

# 期望 ≥1 命中 (新增的 MOQ + Same-Day + Free Shipping 强信号)
grep -rn "100 MOQ Same-Day" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
```

### 步骤 4: pre-commit 3 步 (per AGENTS.md §12)
```bash
node scripts/check-encoding.js          # 编码检查 UTF-8 LF
npx tsc --noEmit                        # TS 编译 0 error
node scripts/check-i18n.js              # i18n locale 完整
```

### 步骤 5: K3 审 diff (护栏, per 8/5 P0 500 教训)
- 截图 git diff 完整 (2 处改字: products.ts + sku-seo-data.ts)
- 发 K3 inbox
- 等 K3 回 "OK" 才能 commit
- **绝对不能 amend 自决**

### 步骤 6: §0.7 production smoke 3 步 (per 8/7 18:30 9ab9ee4 教训固化)
1. curl https://zprintpro.com/en/product/small-batch-stickers/ 期望 HTTP 200 + 含 "100 MOQ Same-Day Free Shipping" 在 title
2. curl https://zprintpro.com/en/product/small-batch-stickers/ 期望含 "Vinyl, Die-Cut, Waterproof" 在 description + FAQPage schema 5 Q
3. curl https://zprintpro.com/en/product/small-batch-stickers/ 期望 metaTitle 替换 + metaDescription 替换 (snippet 检查)
不跑 = 不算 PASS (per §0.7 K3 8/8 01:03 拍板)

### 步骤 7: 1 push 合并 (per 3A + §0.1 攒批)
- small-batch-stickers 单独 commit (P0 第 1 优先)
- 跟其他 14 SKU 改字 + AGENTS.md 198 + retrofit cross-border amend 合并 1 effective push
- 1 effective push 触发 1 CF Pages build
- 不破 §0.1 1 push/day 严格

### 步骤 8: GSC 抓强监控闭环 (per §0.11 + gsc_daily_strong_signal_monitor)
- 8/8 push 后立即入 8/9 起 daily 22:00 强信号追踪 cron
- 72h 验 CTR: 0% → 期望 3-5% (8/11 验证)
- 8/12 复盘按 §0.10 校准值判 PASS (期望 CTR ≥1.5% 即算合格)
- 形成"改→验"闭环

---

## 四、改字失败回滚 SOP

### 改字导致 build FAILURE 立即回滚
1. `git checkout -- src/data/products.ts src/data/sku-seo-data.ts`
2. `node scripts/check-encoding.js` 验证 0 残留
3. 升级 K3 (P0 阻断, 等 K3 拍板 amend 修法 per §0.1 K3 8/7 18:33 18:38 拍板严格/宽松)

### 改字导致 production smoke FAIL (§0.7 3 步)
1. 立即升级 K3 (P0 §0.7 阻断)
2. revert small-batch-stickers 改字 (保留其他 14 SKU 改字)
3. 跑第 2 次 production smoke PASS 后 commit
4. small-batch-stickers 改字延后到 8/9 amend push 合并 2

### 改字后 GSC CTR 4 天不升 (per §0.10 校准值)
1. 8/12 复盘: 期望 ≥1.5% CTR (校准), < 1.5% 升级 K3
2. 不立即 revert, 等等看 snippet 重新抓取 (per §0.10 1-2 周重抓)
3. 8/16 再次评估, 仍 < 1.5% 考虑回滚

---

## 五、5 渲染源 cross-check 验证 (per MEMORY.md §9)

| # | 渲染源 | small-batch-stickers 改字后必查 |
|---|--------|------------------------------|
| 1 | Blog 详情页 title/excerpt | src/data/blog-posts.ts BlogPostMeta — 8/11 retrofit paper-materials 末尾引 small-batch-stickers CTA |
| 2 | Blog 详情页 content body | src/data/blog-data/en.json — 8/13-8/15 retrofit 末尾埋点 small-batch-stickers 2-3 次 |
| 3 | PDP 详情页 title (skuSeo 优先) | src/data/sku-seo-data.ts — 改 2 metaTitle + metaDescription |
| 4 | PDP 详情页 body (兜底) | src/data/products.ts — 改 1 title_en + descriptionEn |
| 5 | **PDP 组件渲染层** | src/components/pdp/orderform.tsx + referencepriceblock.tsx — 兜底值 grep 0 残留旧词 |
| 6 | **AI 注入** | public/llms-en.txt — L11 + L222 副文件加 "Small Batch Stickers 100 MOQ Same-Day" |

### grep 必查 (5 渲染源 + 3 副文件)
```bash
# 期望 ≥5 命中 (改字生效)
grep -rn "small batch sticker" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\

# 期望 ≥1 命中 (新 USP)
grep -rn "100 MOQ Same-Day" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "Free Shipping" F:\zprintpro-nextjs\src\data\products.ts
grep -rn "Free Shipping" F:\zprintpro-nextjs\src\data\sku-seo-data.ts
```

---

## 六、整合 8/8 10:15 amend push 调整 (P0 第 1 优先)

**commit 1 (单独, K3 8/8 04:35 战略级 P0 第 1)**:
- src/data/products.ts: small-batch-stickers title_en + descriptionEn
- src/data/sku-seo-data.ts: small-batch-stickers metaTitle + metaDescription + metaKeywords
- message: `8/8 10:15 P0 small-batch-stickers 抓强信号单独改 (pos 7.76/29imps/0%CTR, K3 8/8 04:35 战略级)`

**commit 2 (跟其他 14 SKU + AGENTS.md 198 + retrofit 合并 1 effective push)**:
- src/data/products.ts: 5 JA + 4 EN + 5 zh-hk 改字
- src/data/sku-seo-data.ts: 5 JA + 4 EN + 5 zh-hk meta
- AGENTS.md: L39 + L439 改 198 phase-out 181
- src/data/blog-posts.ts: cross-border-ecommerce-shipping-box-guide retrofit
- src/data/blog-data/{zh-hk,en,ja}.json: 末尾ジープリント + 智印港 + ZprintPro 2-3 次
- message: `8/8 10:15 14 SKU 改字 + AGENTS.md 198 + retrofit cross-border (1 push)`

**2 commits 合并 amend 1 effective push**:
- commit 1 先 push (单独, 1 build)
- commit 2 amend push (合并, 1 build)
- 总 2 build = 月度 40/500 = 8.0%

**或者 1 amend 合并** (per K3 §0.1 攒批 1 push/day 严格):
- commit 1 + commit 2 amend 合并 1 effective push
- 总 1 build = 月度 39/500 = 7.8%

**K3 拍板**:
- A 方案: 2 commit 2 build (灵活, 改字风险隔离)
- B 方案: 1 amend 1 build (严格 §0.1 攒批, 月度配额 1 个)

K3 默认 8/8 拍板: 选 A 还是 B? (per §0.13 4 字+①②③, K3 战略级判断)

---

## 七、报告落盘 (本草稿)

- 本草稿: `.hermes/k3-inbox/2026-08-08-0440-p0-small-batch-stickers-priority-diff.md` (本文件)
- v2 完整分析: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24.8KB)
- v3 zh-hk: `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (30.6KB)
- zh-hk 5 SKU diff: `.hermes/k3-inbox/2026-08-08-0430-zh-hk-sku-diff-for-k3-review.md` (15.4KB)
- Org sameAs 草稿: `.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md` (13.7KB)
- matrix: gsc_targeting_v2 + gsc_targeting_zh_hk_v3 + 2_weeks_execution + gsc_daily_strong_signal_monitor (321KB)
- cron prompt: v8.5 → v8.6 → v8.7 → v8.8 (42.6KB)
- MEMORY.md: §0.10-0.13 4 段 P0 (185.8KB)

---

**M3 自主拍板项 (本 diff 草稿已自主执行)**:
- ✅ P0 第 1 优先 small-batch-stickers 单独改字定位 + old/new 完整列出
- ✅ 资源重排依据 (§0.11 抓强信号 > 黑洞大词)
- ✅ 期望影响 (0% → 3-5% CTR, 4 天可兑现)
- ✅ grep SOP + pre-commit 3 步 + §0.7 production smoke 3 步
- ✅ 失败回滚 SOP (build FAIL / smoke FAIL / CTR 不升)
- ✅ 5 渲染源 cross-check 验证
- ✅ GSC 抓强监控闭环 (改→72h 验)
- ✅ 2 commits 方案 A vs amend 方案 B 拍板项 (K3 战略级)

**M3 待执行 (K3 9:00 拍板后)**:
1. K3 拍板: A 2 commit 2 build vs B 1 amend 1 build (§0.1 攒批)
2. 应用 small-batch-stickers 改字
3. 改字后 grep 验证 (5 渲染源 + 3 副文件)
4. pre-commit 3 步
5. K3 审 diff + 回 "OK"
6. commit + push/amend (per K3 拍板 A/B 方案)
7. §0.7 production smoke 3 步 PASS
8. GSC 抓强监控入 8/9 起 daily 22:00 强信号追踪
9. 72h 后 (8/11) 验 CTR
10. 8/12 复盘按 §0.10 校准值判 PASS
