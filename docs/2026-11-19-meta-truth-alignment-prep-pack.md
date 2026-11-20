# 11-19 meta 真值对齐执行预备包（决策→部署 1 小时模式）

> 角色：首席 SEO/AEO/GEO 数据战略分析参谋（autoclaw 人手会话第 5 轮）
> 上游：`docs/2026-11-19-sprint-pool-main-url-and-procurement-gap-decision-pack.md` §6 裁决包 8 项 + `重要文件/2026-11-19-three-market-seo-aeo-geo-flywheel-and-scheduler-upgrade.md`
> 性质：**预备包（proposal only）**——把裁决项升级为逐条精确 before/after，K3 一句话拍板后 daily lane / 人手会话可在 1 小时内执行完毕。本包零 src 写入。
> 执行边界（全部适用）：K3 拍板 → 门童全量（title-v5/i18n/entity/brand/gsc-leak/phone/credibility）→ `check-encoding` + `tsc 54=54` → 单变量原则下按 §0.25 攒批 1 push → verify-deploy + 线上探针复验 → 7/14/28d 复测窗。

---

## A 组：真值已批的机械修复（K3 放行即执行，无新值引入）

### A1｜S1：ja 小批量贴纸 meta 被禁时效+免邮句（sku-seo-data.ts:193）
- **现状**：`…ダイカット + 箔押し + UV 加工。4 日米国配送, 99 ドル以上送料無料。30 秒 AI 見積もり、LINE 2 時間返信。`
- **改为**：`…ダイカット + 箔押し + UV 加工。配送方法・納期は見積りで確認。30 秒 AI 見積もり、LINE 2 時間返信。`
- 依据：K3 10-30 裁决单#3（4-day USA 不发布、运输报价确认）+ 同文件 L196 body 真值（`配送方法・納期は見積りで確認`）。「2 時間無料デジタル校正」本条**不动**（校正时效 2h/1h/无 三口径另见 B7）。

### A2｜S3：ja 同人誌 meta 无支撑声明（sku-seo-data.ts:2605）
- **现状**：`同人誌印刷サービス、無線綴じ・中綴じ・PUR製本対応。…10冊〜少部数対応、即日発送オプション、日本全国DHL配送2-4日追跡番号付き。無料デザインサポート、24時間特急対応可能。| ZprintPro`
- **改为**：`同人誌印刷サービス、無線綴じ・中綴じ対応（製本オプションはお見積りで確認）。A5/B5サイズ表紙フルカラー本文モノクロ印刷。コミケ・即売会向け10冊〜少部数対応。納期・配送は見積りで確認。無料デザインサポート、データ完成前提で特急相談可。| ZprintPro`
- 依据：D3（11-13）+ 正文 0 支撑实锤；「データ完成前提」= K3 10-30 裁决单#5 rush 条件化原口径。

### A3｜S4-zh：zh 同人誌正文「單價由 ¥7,500 起／部」与 ja 语义相反（sku-seo-data.ts zh DJ body）
- **现状**：`最低起印量為 10 本…單價由 ¥7,500 起／部，頁數、尺寸、裝訂與彩色範圍都會影響最終報價`
- **改为**：`最低起印量為 10 本…指定規格與數量的訂單起價為 ¥7,500 起（非每本單價），頁數、尺寸、裝訂與彩色範圍都會影響最終報價`
- 依据：ja body 已批口径 `価格は指定仕様・数量の注文開始価格 ¥7,500〜（1部あたりの単価ではありません）` 对齐；K3 10-30 裁决单#5（¥7,500 仅 ja 条件化——**注意**：zh 是否保留 ¥7,500 数字本身见 B2 联动裁决，本条先修语义反转）。

### A4｜MOQ 统一第 1 批：小批量贴纸 10/100 分裂
- `sku-seo-data.ts:143`（zh sb meta）：`可移貼紙/不殘膠貼紙 100 張起。` → `可移貼紙/不殘膠貼紙 10 張起。`
- `products-content.ts:1716`（en/ja "100-sticker MOQ"，两处）：→ `10-sticker MOQ` / `10枚から`
- 依据：products.ts minQuantity=10 结构真值 + K3 10-30 裁决单#3。

### A5｜MOQ 统一第 2 批：學校印刷同页双答（category-conversion-blocks.ts:2763）
- **现状**：「校簿印刷起訂量要幾多本？」答 `100 本起`（:2660 同问句答 10 本）→ **:2763 离群值**
- **改为**：与 :2660 同口径 `10 本起`
- 依据：products.ts exercise-books minQuantity=10 真值；两答齐入 FAQPage JSON-LD 是当前 AEO 直接冲突源。

### A6｜D4 漏网：95%+ color accuracy ×4 → ICC/打样流程措辞
| 位置 | 现状 | 改为 |
|---|---|---|
| category-conversion-blocks.ts:4058 | `Four-color printing with 95%+ color accuracy for catalogs and photo books.` | `Four-color printing with ICC-profile color management, verified by digital proof, for catalogs and photo books.` |
| category-conversion-blocks.ts:4119 | `Four-color printing with 95%+ color accuracy; small runs print digitally, large runs on offset.` | `Four-color printing with ICC-profile color management and proof confirmation; small runs print digitally, large runs on offset.` |
| category-seo-content.ts:4094 | `ICC profile (GRACoL / Fogra) + Heidelberg color separation, 95%+ color accuracy.` | `ICC profile (GRACoL / Fogra) color separation, verified by digital proof.`（设备名处置见 B-注） |
| category-seo-content.ts:4118 | `…Heidelberg offset press. Original RGB auto-converted to CMYK with 95%+ color accuracy. Sample proofing available.` | `ICC profile color management (GRACoL / Fogra39). Original RGB auto-converted to CMYK, verified by digital proof. Sample proofing available.` |
- 依据：D4（11-13）「无测量协议的 95%+ 删除或改 ICC/打样流程」（sku-seo/products 面已清，本 4 处为漏网面，live 实锤）。
- **B-注（Heidelberg）**：L4094/L4118 的设备名不属于 TrustBadgeBlock 已批逐字文案（那是 9/10 唐总修订的另一块），按 CRED_HEIDELBERG 规则应撤；若 K3 认为 books 类规格表可保留设备名，请明示豁免面。

### A7｜50-book MOQ ×5 → 10-copy（blog-data/en.json `catalog-printing-guide`，10-28 批漏网）
- 5 处 `50-book MOQ` → `10-copy MOQ`（excerpt ×1、正文 ×2、CTA 尾段 ×1）+ FAQ Q1 `A1: 50 copies —` → `A1: 10 copies —`
- 同文 `Digital printing proofs from 10 copies` 保留（合法）。依据：K3 10-30 裁决单#4（catalog MOQ 10 copies）。

### A8｜月曆博客旧 MOQ ×2（blog-data/zh-hk.json `2027-monthly-calendar-printing-timetable`）
- excerpt `起印量 100 本起` → `1 本起印（數碼印刷）`
- FAQ Q3 `…50 本小批量未必接。` → 删除该半句（同句已有 `1 本起印，500 本最劃算`）
- 依据：T1 批（124b0b11）定案数码 1 本起 + products.ts minQuantity=1。

### A9｜数据层裸路径链接（§13.6 红线）——已定案（第 6 轮）
- **渲染层已证**：`blog/[slug]/page.tsx` L806-809 在渲染时自动补 `/product/` 与 `/category/` 前缀（并把 `/en/product/`、`/ja/product/` 归一到当前 locale）——三份博客 JSON 内的裸 `/product/*`、`/category/*` 链接 live 渲染正常，属**数据层卫生项**（zh-hk.json folded L791 / en L782 / ja L775 + cny-2027 博客 10 处，随批修，低优先）。
- **唯一实际断链面 = `/quote/`**（渲染层 regex 不覆盖）：folded 博客 ×8 + cny-2027 ×1，实测 301。修法二选一：★(a) 渲染层 regex 扩一行（`href="/quote/` → `/${locale}/quote/`，一处改动全站博客生效）；(b) 数据层逐处补前缀。K3 二选一后随批。

### A10｜+852 裸号 ×6 → 唯一白名单（§13.10/门童#2 红线）
- `CategorySidebar.tsx:225`、`WhatsAppFloat.tsx:45,50`、`HotProducts.tsx:203`、`QuoteCalculator.tsx:232`：删除 `phone: '85290616204'` 覆盖参数（回落 whatsapp.ts 默认白名单 +86 198 8085 1334）
- `whatsapp.ts:14`：注释示例同步改白名单号
- 依据：K3 8/7 拍板 phase-out；运行时拼接 `wa.me/85290616204` 为线上实拨号。

### A11｜简体「适配行业」×17（products.ts，§13.16.1 最高原则）
- 行号：`876, 957, 1039, 1120, 1460, 1555, 1917, 1998, 2080, 2162, 2550, 3083, 3381, 3551, 6067, 6111, 6288`
- **改为**：`适配行业` → `適配行業`（17 处机械替换）；其中 L876/L1039/L1120 等存在「适配行业:…適配行業：…」双列表同段并存 → **去重保留繁体列表**（去重方向已定，逐行保留哪一条以「繁体在前、简体在后」原样保序：删除简体列表行）。
- ⚠️ en/ja 字段内的「适配行业」（L957/L1039 descriptionEn/descriptionJa）属跨语言污染，随本项一并清除（保留英文 Best for: 列表本身）。
- 配套：scan-simplified.mjs 扫描域扩展（description 族 + blog JSON 客户可见字段）——脚本改动随本批同提。

---

## B 组：需 K3 拍板的裁决项（每项给推荐选项）

| # | 裁决点 | 现状 | 选项（推荐★） |
|---|---|---|---|
| B1 | 免邮口径 4 套（S2b）：ja sb meta `99 ドル` / body `日本全国送料無料`（无条件）/ 面板 `$500相当` / FAQ 池 `$100 以上米国向け` | 同簇四面四值 | ★(a) 全簇统一「運費・配送は見積りで確認」（与 A1 一致，最稳）；(b) 统一门槛值需先确认真实成本口径；(c) 分市场分值（成本最高） |
| B2 | ¥7,500 价格归属：products.ts:6696 `price_range: '¥7,500〜/注文〜'` 单值三语渲染；basePrice_en 1245.0 全站 0 使用 | en/zh 面板显示日元价 | ★(a) price_range 加 locale 分层：ja 保留 ¥7,500〜/注文〜、en 改 `from US$—`（需 K3 确认 1245 的币种与真值）、zh 改「按規格報價」；(b) en/zh 面板删价格只留「30 秒 AI 報價」 |
| B3 | stickers 类目 meta `$0.05` 无源锚（seo.ts en title+desc，11-13 weekly 批产物） | PDP 真值 = `$0.55/pc (A4 sheet)` | ★(a) 对齐 `$0.55`（title `…$0.55 · 10 MOQ | ZprintPro`，字符数不变超带）；(b) 若存在合法低价锚（如大批量单张），需 K3 给出真值表 |
| B4 | meta 时效句族：en catalog meta `DHL 2-4 day delivery` vs 正文报价确认；ja DJ meta S3 已入 A2 | body 条件化 vs meta 承诺 | ★(a) meta 统一改「delivery timing confirmed at quote」族（与正文一致）；(b) 保留 DHL 2-4 天为全站标准物流表述（需 K3 明示该表述族豁免面） |
| B5 | 摺頁 PDP 价格 4 套：title/meta 0.70 vs og/schema 0.45（products.ts L2162）vs 计价器 0.38/張 vs 10 張档 HK$16.10/張 | 差 23 倍 | ★ 按 basePrice 锚统一 og/schema/title（计价器为动态实价保留）；需 K3 确认 0.45/0.70 谁是真值 |
| B6 | 柯式最小批量：product-faqs.ts:671 `500 本起` vs complete-guide `300 本起`（月曆/書刊簇） | 双文档分裂 | ★ 以产能真值二选一（若 500 为胶印真实经济批量则改 300 处）；一句话拍板 |
| B7 | 校正/打稿时效三口径：2h（ja sb meta）/1h（sku-seo 多处 CTA）/无时效（PDP 真值 confirmed at quote） | 三值并存 | ★(a) 全部收敛「免費數碼打稿，時效以報價確認」；(b) 保留 1h 作为已证产能承诺（需 K3 确认有源） |
| B8 | DJ「24 時間特急対応」三语 description（products.ts L6694/6695 + L2605 meta）无「データ完成前提」条件 | 10-30 裁决要求条件化 | ★ 补条件短语（`データ完成前提` / `檔案完成前提`）；或改「特急相談可」 |
| B9 | Footer 能力声明：三语 companyDesc 仍含「在線文件上傳/online file upload/オンラインファイルアップロード」（Footer.tsx L27/90/151） | 上传模块已移除且全站无上传路径 | ★(a) 三语删「文件上传」短語（报价/结算保留）；(b) 若未来恢复上传（Resend attachments 路径）再回填 |
| B10 | （引用不展开）pearl-envelopes 角色重定位 / nengajo 3 个 TBC 占位（死线 10/21 已过）/ 利是封大号尺寸三口径 G2 / stickers 类目 meta 其余 3 残留——见主决策包 §3.5/§6 | — | 已在 §6-7 立案 |

---

## 执行分配建议（拍板后）

- **A 组 11 项 = 一个「truth-batch-20261119」攒批**：daily lane（K3 放行后注入 READY）或人手会话执行；sku-seo-data.ts 改动走 CSV 回源规则核查（A4 涉及生成器输出域——**sku-seo-data.ts 为生成器产物，禁止手改**：A1/A2/A4-zh 若落在生成器输出区，须回 `zprintpro-sku-seo-data.csv` 改源重跑 `csv-to-sku-seo.mjs`，SOP-5 派生禁手搓）；A6/A7/A8/A9 落 blog-data/category 数据文件；A10/A11 落组件/产品文件。
- **B 组逐项一句话拍板**，拍完即并入 A 组同批或次批。
- 复测：部署日 + 7/14/28d；本包执行不单独评胜负，并入既有复测队列。

## 数据来源

- 源串实读：sku-seo-data.ts L143/193/196/2594/2605；products.ts L6694-6698 + 适配行业 17 行号；category-conversion-blocks.ts L4058/4119；category-seo-content.ts L4094/4118；blog-data/en.json catalog-printing-guide（50-book ×5）；blog-data/zh-hk.json（月曆博客 GAP-1/2、cny-2027 11 处裸路径）；Footer.tsx L27/90/151；whatsapp 族 6 处（第 2 轮已证）
- 上游裁决：K3 10-30 裁决单#3/#4/#5、CT-20261113 D1-D6、T1 批 124b0b11、D4 批 c172b3d2
- 校准状态：已校准（源=当前工作树；live 证据见主决策包 §3.3/§3.5）
