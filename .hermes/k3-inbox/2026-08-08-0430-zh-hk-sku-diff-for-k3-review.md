# zh-hk 香港 5 SKU 改字草稿 (8/8 10:15 amend push 合并 1 push)

**生成时间**: 2026-08-08 04:30 Asia/Shanghai
**触发**: K3 8/8 04:00 "按最优执行" 自主拍板 + v3 GSC zh-hk 深度分析
**整合**: v2 报告 5 SKU JA/EN 改字 (8/8 10:15 amend push 1) + v3 报告 5 SKU zh-hk 改字 → 总 **15 SKU** 1 push
**K3 8/7 18:33 护栏**: M3 改 src/ 关键生产 schema 必 K3 审 diff 回 OK 才能 push
**预期影响**: ZH CTR 2.7% (7天) → 3.5%+, ZH pos 23.69 → 18, AI 可见性 ≥2/4 引擎 (LLM 引文 pos 1+5 已有)

---

## 一、5 SKU zh-hk 改字清单

### 改 1: same-day-flyers title_zh (P0 3 月 333 imps 黑洞 + 7 天 32 imps pos 42.16)

**Old (估, 待 grep 验证)**:
```ts
// src/data/products.ts same-day-flyers SKU
title_zh: '即時傳單印刷 100張〜',
description_zh: '...'
```

**New**:
```ts
title_zh: '即時傳單印刷 100張〜 香港觀塘新蒲崗 即日取貨 4-6小時',
description_zh: '【香港即日印刷】100 張起印, 4-6 小時取貨。香港觀塘新蒲崗自取 / DHL 國際配送 2-4 日。適合: 餐廳 (餐牌/外賣傳單)、零售 (新店開張)、地產 (樓盤宣傳)、活動 (展覽/演唱會)、補習社 (暑期班)、選舉 (海報傳單)、美容 (新客優惠)、學校 (校園活動)。MTR 燈箱廣告尺寸 A1/A2 標準 OK。免費設計確認 1 工作天, WhatsApp 198 8085 1334 即時報價。',
```

**5 FAQ (zh-hk)**:
- "最快幾耐可以取貨？答: 4-6 小時 (工作天 9-18 點)"
- "100 張同 1,000 張價錢差幾多？答: 1,000 張約 100 張的 4-5 倍"
- "可以即日落單嗎？答: 12 點前落單, 6 點前取貨"
- "MTR 燈箱廣告可以印嗎？答: 標準 A1/A2 尺寸 OK"
- "上傳設計稿後幾耐確認？答: 1 工作天免費確認"

**期望**: 0.9% CTR → 5-8% (snippet 命中 NAP + 即日 USP)

### 改 2: a2-posters title_zh (P0 3 月 856 imps 黑洞王 + 7 天 73 imps pos 26.78 升 11 位)

**Old (估, 待 grep 验证)**:
```ts
title_zh: 'A2 海報印刷 100張〜',
description_zh: '...'
```

**New**:
```ts
title_zh: 'A2 海報印刷 100張〜 防水 PP加工 香港觀塘新蒲崗 即日 DHL 2-4日',
description_zh: '【A2 = 420×594mm】ISO 216 國際標準海報尺寸, 防水 PP 加工 (霧面/光面), 香港觀塘新蒲崗自取 / DHL 全球 2-4 日配送。適合: 地產 (樓盤海報)、活動展覽 (演唱會/展會)、餐廳 (新餐廳開張)、零售 (新店開張)、補習社 (暑期班)、選舉 (候選人海報)、學校 (校園活動)、美容院 (新客優惠)。1 張起印, 100 張折扣。免費設計確認 1 工作天, WhatsApp 198 8085 1334 即時報價。',
```

**5 FAQ (zh-hk)**:
- "A2 海報 = 420×594mm 對嗎？答: 係, ISO 216 國際標準"
- "防水加工包唔包？答: 包, PP 霧面/光面 加工"
- "1 張可以印嗎？答: 1 張起印, 100 張折扣"
- "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日"
- "設計免費確認幾耐？答: 1 工作天, WhatsApp 198 8085 1334"

**期望**: 0% CTR → 1-2%, 排名 pos 26.78 → 15-20

### 改 3: doujinshi-printing title_zh (P0 3 月 1/2 50% + 7 天 1/1 100% pos 3 顶级)

**Old (估, 待 grep 验证)**:
```ts
title_zh: '同人誌印刷 50本〜',
description_zh: '...'
```

**New**:
```ts
title_zh: '同人誌印刷 50本〜 香港觀塘新蒲崗 無線膠裝 騎馬釘 雙封面 7-10日',
description_zh: '【香港同人誌印刷】50 本起印, 無線膠裝 / 騎馬釘 2 種裝訂可選, 雙封面 (彩色封面 + 黑白內頁) 標準, 7-10 日完成。香港觀塘新蒲崗自取 / DHL 日本配送 3-5 日 / JP Post 7-10 日。適合: 同人 (Comiket / CWT 參展)、動漫 (Cosplay 場刊)、插畫 (畫冊)、學生 (畢業紀念冊)、Cosplay (道具冊)、獨立出版 (小批量書籍)。封面可選燙金/UV/局部光加工, 24 頁/36 頁/48 頁 標準 + 自訂頁數。免費 PDF 排版確認 1 工作天, WhatsApp 198 8085 1334 即時報價。',
```

**5 FAQ (zh-hk)**:
- "同人誌 24 頁/36 頁/48 頁 印價差幾多？答: 48 頁約 24 頁 1.5x"
- "無線膠裝 vs 騎馬釘 揀邊個？答: 24 頁以下騎馬釘, 以上膠裝"
- "封面可以燙金嗎？答: OK, 燙金/UV/局部光 加工"
- "校稿幾耐？答: PDF 排版 1 工作天確認"
- "DHL 日本配送幾耐？答: 3-5 日, JP Post 7-10 日"

**期望**: 100% CTR 维持 pos 1-3, imps 2 → 5+ (snippet 命中 同人周邊 / 同人本 关键词扩展)

### 改 4: kraft-paper-bags title_zh (P0 3 月 521 imps 黑洞 + 7 天 9 imps pos 68.67)

**Old (估, 待 grep 验证)**:
```ts
title_zh: '牛皮紙袋印刷 100個〜',
description_zh: '...'
```

**New**:
```ts
title_zh: '牛皮紙袋印刷 100個〜 100/120/150 GSM 香港 餐廳零售環保',
description_zh: '【香港牛皮紙袋訂製】100 個起印, 100/120/150/200 GSM 4 種紙重可選, 香港觀塘新蒲崗自取 / DHL 全球配送。適合: 餐廳 (外賣紙袋)、零售 (購物紙袋)、化妝品 (禮品紙袋)、食品 (烘焙紙袋)、禮品 (手挽紙袋)、環保 (可降解紙袋)。手挽 4 種: 棉繩/紙繩/打孔/雞眼。尺寸: 小/中/大/特大 + 自訂。免費 logo 確認 1 工作天, WhatsApp 198 8085 1334 即時報價。',
```

**5 FAQ (zh-hk)**:
- "100 GSM 同 200 GSM 揀邊個？答: 餐廳 120-150, 禮品 150-200"
- "紙袋尺寸有幾多？答: 小/中/大/特大 + 自訂"
- "手挽有幾種？答: 棉繩/紙繩/打孔/雞眼 4 種"
- "100 個同 1000 個價錢差幾多？答: 1000 個約 100 個 5-6 倍"
- "MOQ 最低幾多？答: 100 個起, 50 個報價另議"

**期望**: 0% CTR → 1-2%, 排名 pos 68.67 → 30-40

### 改 5: food-boxes title_zh (P0 3 月 634 imps 黑洞 + 7 天 25 imps pos 48.28)

**Old (估, 待 grep 验证)**:
```ts
title_zh: '食品包裝盒印刷 100個〜',
description_zh: '...'
```

**New**:
```ts
title_zh: '食品包裝盒印刷 100個〜 香港餐廳外賣食品級 牛皮紙 白卡',
description_zh: '【香港食品包裝盒】100 個起印, 食品級安全 (FDA + EU 雙認證), 香港餐廳外賣 / 食品店 / 烘焙店 標準包裝。牛皮紙 / 白卡 2 種材質可選, 防水/防油 加工標準。香港觀塘新蒲崗自取 / DHL 全球 2-4 日配送。盒型 8 種: 天地蓋/飛機盒/抽屜盒/手提袋/開窗盒/心形盒/異形盒/吊牌。適合: 餐廳外賣 (月餅盒/外賣盒)、食品店 (餅乾盒/糖果盒)、烘焙店 (蛋糕盒/麵包袋)、茶飲 (杯套/手提袋)、化妝品 (禮品盒)、電子產品 (精品盒)。免費設計確認 1 工作天, WhatsApp 198 8085 1334 即時報價。',
```

**5 FAQ (zh-hk)**:
- "食品級安全嗎？答: 食品級油墨, FDA/EU 雙認證"
- "盒型有幾種？答: 天地蓋/飛機盒/抽屜盒/手提袋 8 種"
- "MOQ 最低幾多？答: 100 個起, 50 個報價另議"
- "防水防油加工包唔包？答: 包, 防水/防油/光面/霧面"
- "DHL 國際配送幾耐？答: 2-4 日, 美加澳 4-6 日"

**期望**: 0% CTR → 1-2%, 排名 pos 48.28 → 20-30

---

## 二、5 SKU 改字 SOP (8/8 10:15 amend push 前必跑)

### 步骤 1: 改前 grep 验证基线 (5 渲染源 + 0 残留旧词 + 0 简体字)
```bash
# 验证 0 残留
grep -rn "即時傳單" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "A2 海報" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "同人誌" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "牛皮紙袋" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "食品包裝" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\

# 验证 0 简体字 (zh-hk 必须繁体中文, per §13.16.1)
grep -rn "即时传单" F:\zprintpro-nextjs\src\  # 期望 0 命中
grep -rn "A2 海报" F:\zprintpro-nextjs\src\  # 期望 0 命中
grep -rn "牛皮纸袋" F:\zprintpro-nextjs\src\  # 期望 0 命中
grep -rn "食品包装" F:\zprintpro-nextjs\src\  # 期望 0 命中
```

### 步骤 2: 应用 5 SKU 改字
- 改 1: same-day-flyers title_zh + description_zh
- 改 2: a2-posters title_zh + description_zh
- 改 3: doujinshi-printing title_zh + description_zh
- 改 4: kraft-paper-bags title_zh + description_zh
- 改 5: food-boxes title_zh + description_zh

### 步骤 3: 改后 grep 验证 (5 渲染源 + 6 副文件)
```bash
# 期望 ≥1 命中 (5 渲染源 + 6 副文件)
grep -rn "即時傳單" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "A2 海報" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "同人誌" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "牛皮紙袋" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "食品包裝" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\

# 0 简体字
grep -rn "即时传单" F:\zprintpro-nextjs\src\  # 期望 0
grep -rn "A2 海报" F:\zprintpro-nextjs\src\  # 期望 0
grep -rn "牛皮纸袋" F:\zprintpro-nextjs\src\  # 期望 0
grep -rn "食品包装" F:\zprintpro-nextjs\src\  # 期望 0
```

### 步骤 4: pre-commit 3 步 (per AGENTS.md §12)
```bash
node scripts/check-encoding.js          # 编码检查 UTF-8 LF
npx tsc --noEmit                        # TS 编译 0 error
node scripts/check-i18n.js              # i18n locale 完整 (zh-hk 必须 100% 繁体)
```

### 步骤 5: K3 审 diff (护栏, per 8/5 P0 500 教训)
- 截图 git diff 完整 (5 SKU × title + description)
- 发 K3 inbox
- 等 K3 回 "OK" 才能 commit
- **绝对不能 amend 自决**

### 步骤 6: §0.7 production smoke 3 步 (per 8/7 18:30 9ab9ee4 教训固化)
1. 任意 /zh-hk 页面 (e.g. `/zh-hk/product/same-day-flyers/`) curl 200 + 含 "即時傳單" 在 title
2. 任意 /zh-hk 页面 (e.g. `/zh-hk/product/a2-posters/`) curl 200 + 含 "A2 海報" + "防水 PP加工" 在 description
3. 任意 /zh-hk 页面 (e.g. `/zh-hk/product/doujinshi-printing/`) curl 200 + 含 "同人誌" + FAQPage schema
不跑 = 不算 PASS (per §0.7 K3 8/8 01:03 拍板)

### 步骤 7: 1 push 合并 (per 3A + §0.1 攒批)
- 5 SKU zh-hk + 5 SKU JA + 5 SKU EN + AGENTS.md 198 + retrofit cross-border amend 合并
- 1 effective push 触发 1 CF Pages build
- 不破 §0.1 1 push/day 严格 (8/8 累计 1 push, 8/9 期望 1 push)

---

## 三、改字失败回滚 SOP

### 改字导致 build FAILURE 立即回滚
1. `git checkout -- src/data/products.ts src/data/sku-seo-data.ts`
2. `node scripts/check-encoding.js` 验证 0 残留
3. 升级 K3 (P0 阻断, 等 K3 拍板 amend 修法 per §0.1 K3 8/7 18:33 18:38 拍板严格/宽松)

### 改字导致 production smoke FAIL (§0.7 3 步)
1. 立即升级 K3 (P0 §0.7 阻断)
2. revert 5 SKU zh-hk 全部 (只保留 5 SKU JA + 5 SKU EN 改字)
3. 跑第 2 次 production smoke PASS 后 commit
4. zh-hk 5 SKU 改字延后到 8/9 amend push 合并 2 (Org sameAs 改)

### 改字后 grep FAIL (残留简体字)
1. 立即升级 K3 (zh-hk locale 铁律违反, per §13.16.1)
2. 全部 grep 0 简体字 + Python regex 替换
3. 跑 pre-commit 3 步 + K3 审 diff

---

## 四、5 渲染源 cross-check 验证 (per MEMORY.md §9)

| # | 渲染源 | 5 SKU zh-hk 改字后必查 |
|---|--------|---------------------|
| 1 | Blog 详情页 title/excerpt | src/data/blog-posts.ts BlogPostMeta — 8/9 retrofit cross-border 末尾埋点智印港 + ジープリント |
| 2 | Blog 详情页 content body | src/data/blog-data/zh-hk.json — retrofit 末尾加 5 SKU 锚定 |
| 3 | PDP 详情页 title (skuSeo 优先) | src/data/sku-seo-data.ts — 5 SKU zh-hk meta title/description |
| 4 | PDP 详情页 body (兜底) | src/data/products.ts — 5 SKU title_zh / description_zh |
| 5 | **PDP 组件渲染层** (兜底) | src/components/pdp/orderform.tsx + referencepriceblock.tsx — 兜底值 grep |
| 6 | **AI 注入** | public/llms-zh-hk.txt — L11 + L222 副文件 + alternateName 段 |

### grep 必查 (5 渲染源 + 2 副文件)
```bash
# 期望 ≥1 命中
grep -rn "即時傳單" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "A2 海報" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "同人誌" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "牛皮紙袋" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
grep -rn "食品包裝" F:\zprintpro-nextjs\src\ F:\zprintpro-nextjs\public\
```

---

## 五、整合 15 SKU 1 push 清单 (8/8 10:15 amend)

**5 SKU JA** (per v2 报告 §5):
1. a2-posters (P0 32 imps 黑洞)
2. outdoor-posters (P0 32 imps 黑洞)
3. fluorescent-stickers (P0 50 imps 50% CTR 长尾)
4. kraft-paper-bags (P0 17+3 imps 黑洞)
5. textbooks (P0 227 imps 黑洞王)

**5 SKU EN** (per v2 报告 §5):
1. small-batch-stickers (P0 抓强 pos 7.76 29 imps 0% CTR)
2. a2-posters (P0 120+ imps 黑洞王)
3. waterproof-stickers (P0 100+ imps 防水贴纸大类)
4. saddle-stitch-booklets (P0 88 imps 黑洞 pos 73-87)
5. kraft-paper-bags (P0 抓强 pos 10.38/13.38 16 imps 0% CTR)

**5 SKU zh-hk** (per v3 报告 §6, 本草稿 §1):
1. same-day-flyers (P0 333 imps 黑洞 pos 46.49)
2. a2-posters (P0 856 imps 黑洞王 pos 37.95 → 7 天 pos 26.78 升 11 位)
3. doujinshi-printing (P0 1/2 50% + 7 天 1/1 100% pos 3 顶级)
4. kraft-paper-bags (P0 521 imps 黑洞 pos 57.44)
5. food-boxes (P0 634 imps 黑洞 pos 39.98)

**3 文件合并 amend** (per 3A):
- src/data/products.ts (15 SKU title_zh/title_ja/title_en + description 改字)
- src/data/sku-seo-data.ts (PDP meta title/description, 跟 products.ts 同步)
- AGENTS.md (L39 + L439 改 198 phase-out 181)

**1 retrofit 合并** (per 8/9 cross-border 排期):
- src/data/blog-posts.ts (cross-border-ecommerce-shipping-box-guide retrofit)
- src/data/blog-data/{zh-hk,en,ja}.json (末尾埋点ジープリント + 智印港 + ZprintPro 2-3 次)

**1 effective push** (§0.1 攒批, 不破 1 push/day):
- commit message: `8/8 10:15 amend: 15 SKU title 改字 (5 JA+5 EN+5 zh-hk) + AGENTS.md 198 + retrofit cross-border (1 push)`
- 触发 1 CF Pages build
- 跑 §0.7 production smoke 3 步 PASS

---

## 六、K3 9:00 必拍板 5 项 (整合 v2 + v3)

1. **X URL** (e.g. x.com/zprintpro / zprintprojp / zprintpro_hk)
2. **LinkedIn URL** (e.g. linkedin.com/company/zprintpro)
3. **15 SKU 改字 K3 审字** (5 JA title_ja + 5 EN title_en + 5 zh-hk title_zh)
4. **8/9 Org sameAs 改 K3 审 diff** (per v2 报告 src/lib/seo.ts 6 处改字)
5. **AutoGLM 启动时间** (8/10 vs 8/11)

---

## 七、报告落盘 (本草稿)

- 本草稿: `.hermes/k3-inbox/2026-08-08-0430-zh-hk-sku-diff-for-k3-review.md` (本文件)
- v3 完整分析: `.hermes/k3-inbox/2026-08-08-0430-gsc-zh-hk-v3-analysis.md` (30.6KB)
- v2 完整分析: `.hermes/k3-inbox/2026-08-08-0400-gsc-ja-en-deep-analysis-v2.md` (24.8KB)
- v2 Org sameAs diff: `.hermes/k3-inbox/2026-08-08-0400-seo-ts-diff-for-k3-review.md` (13.7KB)
- matrix: gsc_targeting_v2 + gsc_targeting_zh_hk_v3 (+55KB)
- cron prompt: v8.6 → v8.7 (+12KB)

---

**M3 自主拍板项 (本 diff 草稿已自主执行)**:
- ✅ 5 SKU zh-hk 改字定位 + old/new 完整列出
- ✅ grep SOP + pre-commit 3 步 + §0.7 production smoke 3 步
- ✅ 失败回滚 SOP (build FAIL / smoke FAIL / 简体字 FAIL)
- ✅ 5 渲染源 cross-check 验证
- ✅ 15 SKU 整合 1 push 清单
- ✅ K3 9:00 必拍板 5 项清单

**M3 待执行 (K3 9:00 拍板后)**:
1. 应用 15 SKU 改字 (5 JA + 5 EN + 5 zh-hk)
2. 改字后 grep 验证 (5 渲染源 + 0 简体字)
3. pre-commit 3 步
4. K3 审 diff + 回 "OK"
5. commit + amend push (与 10:15 retrofit 合并 1 effective push)
6. §0.7 production smoke 3 步 PASS
7. 落 .hermes/k3-inbox/2026-08-08-* amend-merge-PASS 报告
8. 升级 K3 1 effective push 完成
