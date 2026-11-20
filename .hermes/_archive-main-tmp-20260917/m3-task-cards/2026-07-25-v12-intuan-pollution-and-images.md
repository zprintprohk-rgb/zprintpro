# v12 任务卡 — intuan 对客污染清除 + BK-004/PKG-016 图片接线

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: 对客页面出现 "Pending intuan calibration" = 客户看到未完工页面直接流失;新品包装盒 3 SKU 是 Q3 主推,价格展示必须真实可信。

## K3 调查结论 (直接照做,不用重查)

### 任务 1 🔴 intuan 对客污染清除

**PDP 价格 (3 处, src/data/products.ts)**:

| 行 | SKU | 现值 | 改为 | 数据源 |
|---|---|---|---|---|
| ~18133 | PKG-013 white-card-boxes | `Pending intuan calibration` | 飞机盒档区间 **HK$129-11,737** (格式对齐同类目 PKG-016 现有 price_range 写法) | gang-run-card-boxes.json 飞机盒 56 档真实 yate98 ×1.5 |
| ~18252 | PKG-014 corrugated-boxes | 同上 | **HK$1,517-7,278** | corrugated-boxes-cost.json 49 档真实 yate98 ×1.5 |
| ~18361 | PKG-015 tuck-end-boxes | 同上 | **HK$1,538-7,478** | gang-run-card-boxes.json 双插盒 10 档 |

渲染位置 src/app/[locale]/product/[slug]/page.tsx:411 不用动,price_range 填实价后自动正常显示。

**博客 excerpt/description (5 处文件内共 ~10 条)**:
- src/data/blog-posts.ts: 1314 (注释), 1326-1328, 1332 (注释), 1345-1347
- src/app/[locale]/blog/[slug]/page.tsx: 325, 328, 336, 365, 523

把「5 檔 intuan 校準錨點 (HKD 811-4,202) 實價」改为「5 檔實價 (HK$811-4,202)」;en "5-tier intuan calibrated anchors (USD 106-546)" → "5-tier pricing (USD $106-546)";ja「5 段階 intuan 校正アンカー (JPY 16,628-86,141) 実価格」→「5 段階実価格 (¥16,628-86,141)」。**只删 intuan 词,价格数字保留**。

**验收 grep**:
```
对客文件必须 = 0: products.ts / blog-posts.ts / blog-data/*.json / app/**/page.tsx
允许残留 (内部不对客): src/data/price-tables/*.json 的 src 注释字段、src/lib/quote-engine/** 注释、calibration-status-2026-07-20.json、src/lib/price-tables.ts 文件头注释、QuoteCalculator.tsx 注释
```

### 任务 2: BK-004 毕业纪念册 + PKG-016 拼版白卡彩盒图片

**源图** (user 已放好):
- `public/images/products/seedream-webp/香港畢業紀念冊/` 9 张 jpg (注意 `zprintpro-books-hardcover-books-ja-1-2.jpg` 命名异常 → 当 ja-2 用)
- `public/images/products/seedream-webp/拼版白卡彩盒/` 10 张 jpg

**处理** (Python Pillow, 禁止 PowerShell 写二进制):
1. 逐张压缩为 webp,质量从 82 起递减,目标 120-180KB (≈150KB),输出到 `public/images/products/seedream-webp/` 根目录:
   - `zprintpro-books-hardcover-books-{zh-hk|en|ja}-{N}.webp` (N=1..3)
   - `zprintpro-packaging-gang-run-card-boxes-{locale}-{N}.webp` (沿用各源图编号)
2. products.ts 两条 SKU (`hardcover-books` BK-004 / `gang-run-card-boxes` PKG-016) 的 `imagesByLocale` 改为新 webp 路径;**改前先 grep 旧路径确认引用范围,旧文件无引用才删**(K3 纪律,已踩 3 次坑);源 jpg 目录保留不删。
3. `seoImages` 的 alt 用 user 定稿文案:

**BK-004**:
- zh-hk: `香港精裝書籍 - 精裝書籍印刷,婚慶紀念書、家族史冊、畢業紀念冊、校史特刊首選。2.5mm 灰紙板封面硬挺高檔,可加燙金書名與絲帶書籤。`
- en: `Hardcover Books - Premium hardcover book printing for wedding albums, family histories, graduation yearbooks, school anniversary publications. 2.5mm gray board cover with foil-stamped titles and ribbon bookmarks.`
- ja: `Hardcover Books - ハードカバー書籍印刷、結婚記念アルバム、家族史、卒業記念アルバム、校史特刊に最適。2.5mm 厚紙ボード表紙、箔押しタイトルとリボン栞付き。`

**PKG-016**:
- zh-hk: `拼版白卡彩盒(免刀模費) - 固定刀模共用,免刀模費 + 免排版費,成本直降 40-60%。4 種紙材 (350g/400g 單粉卡、375g 銀卡、375g 鐳射銀卡),3 種盒型 (飛機盒/扣底盒/雙插盒),8 檔標準尺寸。500-10,000 枚,8-15 天交期。香港無對手價。`
- en: `Gang-Run White Card Boxes (No Die-Cut Fee) - Shared die-cut mold, no die-cut fee, no setup fee, 40-60% lower cost than custom. 4 paper stocks, 3 box styles, 8 standard sizes. 500-10,000 pieces, 8-15 day turnaround.`
- ja: `Gang-Run White Card Boxes (No Die-Cut Fee) - 共有型代、型代不要・版代不要、カスタム比 40-60% コスト削減。4 種素材、3 種箱型、8 種標準サイズ。500-10,000 個、8-15 日納期。`

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 必过
- 1 commit: `fix(pdp): remove intuan pollution (3 SKU price_range + blog excerpts) + BK-004/PKG-016 images & alt`
- push `git push origin_ssh main` (严禁 origin / --force) → `node scripts/verify-deploy.mjs` PASS
- 汇报: commit sha + build run id + grep 结果截图文本 + 6 项 curl (2 PDP 200 + 新图 200 ×2 + price_range 显示实价 + intuan=0)

## 不在本卡范围 (K3 已排 v13 策略,别顺手做)

PDP「参考价格表 + 参数选择器」— user 要求客户能看到 材料/数量/工艺 可选价。v13 策略: 有 price-tables 的 SKU (gang-run/corrugated/white-card-bags/digital-stickers/custom-flyers/books/flyers) PDP 增加只读价格表区块「參考價·最終以 WhatsApp 報價為準」,交互式三级选择器复用 quote-desk 引擎。等本卡上线后 K3 单独出卡。
