# H1 SEO 首批 6 SKU × 3 locale 建议值 DRAFT（2026-11-24 凌晨预备 · 不执行）

> **状态: DRAFT — 等核心更新（November 2026 core update）完成 + 官方建议比较窗后才可执行**（K3 11-23 拍板）。
> 唯一执行源头 = `zprintpro-sku-seo-data.csv` H1 三列 → `node scripts/csv-to-sku-seo.mjs --apply`（SOP-5 禁手搓 TS）→ 门童 #27 全量 → tsc → 部署。
> H1 统一模式（K3 11-23）：**核心品類詞｜1-2 個主要規格或可驗證差異**；en H1 去品牌尾（品牌留 title/meta）；排除 certificates/foil-stickers（title 冻结窗）与名片残留项；ja 列本批不动（P0 批已达标）。

数据来源: `zprintpro-sku-seo-data.csv`（31 列, H1 = c15/16/17）+ `src/data/products.ts`（真值锚, `.hermes/tmp/h1-batch1-truth-anchors-20261124.txt`）+ 11-23 ja P0 批（c7e9df1a）。

## 一、逐 SKU 对照（现值 → 建议值）

### 1. removable-stickers 可移貼紙
| locale | 现值（CSV） | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 整段长句 54+ 字（背膠設計…智印港提供專業…） | **可移貼紙印刷｜不留殘膠 10 張起印** | 已验证 title_zh「玻璃不留膠 **10張起印**」（products.ts 真值） |
| en | `Removable Stickers 100+ \| No Residue \| ZprintPro` | **Removable Stickers \| No-Residue Adhesive, From 10 Sheets** | ⚠️ 现值 "100+" 与已验证 10 張起印冲突（同 11-23 ja 批 double-sided 冲突族）；去品牌尾 |
| ja | はがせるステッカー印刷｜再剥離 10枚〜 ¥46〜 | **不动（已达标）** | P0 批已修 |

### 2. small-batch-stickers 小批量貼紙
| locale | 现值 | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 整段长句 54+ 字 | **小批量貼紙印刷｜A4 尺寸起印** | desc_zh「最低A4尺寸起印」 |
| en | `Small Batch Stickers 10+ \| No Setup \| ZprintPro` | **Small Batch Stickers \| A4 Minimum, No Setup** | 现值 "10+" 与 A4 起印口径并存——MOQ 真值 = A4 尺寸（非数量），去数字防多答案；去品牌尾 |
| ja | 小ロットステッカー印刷｜防水PVC 10枚〜 ¥69〜 | **不动（已达标）** | P0 批已修（锚定站内 ja title） |

### 3. double-sided-flyers 雙面傳單
| locale | 现值 | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 极短「雙面傳單印刷」 | **雙面傳單印刷｜雙面全彩 A4/A5** | desc_zh「雙面全彩」+ sizes A4/A5 |
| en | `Double-sided Flyers 100+ \| ZprintPro` | **Double-sided Flyers \| Full Color Both Sides, A4/A5** | ⚠️ "100+" 与已验证 ja title 10枚〜冲突（11-23 truth-fix 同源）；MOQ 不入 en H1 直到 en 口径核实 |
| ja | 両面チラシ印刷｜両面フルカラー | **不动（已达标）** | 11-23 truth-fix 后版本 |

### 4. roll-up-banners 易拉架
| locale | 现值 | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 极短「易拉寶」（**大陆词**, 非港词） | **易拉架印刷｜850×2000mm 級 展會路演** | sizes「常見 850×2000mm 至 1200×3000mm 級」；「易拉架」= §11 GSC 帶钱词（易拉架印刷）港式用词 |
| en | `Roll-up Banners 1+ \| Wind-Resistant \| ZprintPro` | **Roll-up Banners \| 850×2000mm+, Portable Stand** | "Wind-Resistant" 无站内可验证出处（desc 只写便攜/安裝簡便）→ 换可验证规格；"1+" 无 MOQ 出处（basePrice 85 存在但 MOQ 未验证）→ 改尺寸锚；去品牌尾 |
| ja | ロールアップバナー印刷｜アルミスタンド付き | **不动（已达标）** | P0 批已修 |

### 5. catalog-printing 畫冊
| locale | 现值 | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 极短「畫冊印刷」 | **畫冊印刷｜10 本起印 ICC 色彩把關** | desc_zh「10 本起印」+「ICC 檔案與打樣確認」双真值 |
| en | `Catalog Printing 10+ \| ZprintPro` | **Catalog Printing \| From 10 Copies, ICC Color Proof** | MOQ 10 本 verified；去品牌尾 |
| ja | カタログ印刷｜製本・部数・納期相談 | **不动（已达标）** | P0 批已修 |

### 6. saddle-stitch-booklets 騎馬釘小冊子
| locale | 现值 | 建议值 | 真值锚 |
|---|---|---|---|
| zh | 极短「騎馬釘小冊子」 | **騎馬釘小冊子印刷｜10 本起 8-64 頁** | desc_zh「MOQ 10 本」+「8-64 頁可平攤 180°」 |
| en | `Saddle Stitch Booklets from 10 Copies \| ZprintPro` | **Saddle Stitch Booklets \| 10-Copy MOQ, 8-64 Pages** | MOQ + 頁数双 verified；去品牌尾 |
| ja | 中綴じ冊子印刷 10冊から対応｜A4/A5 ページ数・用紙選び | **不动（已达标）** | P0 批已修 |

## 二、冲突与风险登记

1. **en MOQ 冲突 ×3**（removable "100+" / double-sided "100+" / small-batch "10+"）与 zh/ja 已验证口径（10 張 / 10 枚 / A4）不一致 = AEO 多答案风险。建议值一律**降级到已验证口径或去掉数字**；en 数字是否回填待 title 解冻批一并核实（en SEO title 未拉取, 不推断）。
2. **「易拉寶」→「易拉架」** = 港式用词修正（§11 帶钱词 易拉架印刷 GSC 实证词），属 H1 词面修正非 title 改动（churn 规则不触 title）。
3. **品牌尾去除**（en 6/6）= K3 11-23 模式判定（H1 ≠ title）；og/site_name 品牌信号由 layout 层承担，H1 不重复。
4. zh H1 无 50-57 当量约束（该约束仅 title 族, 门童 #27 扫 title）；但建议值仍控制 ≤22 全角字防移动端折行。

## 三、执行清单（解冻后一次性）

1. CSV 六行 × c15/c16（zh/en）共 12 格改写（ja c17 全部不动）；**计数断言 = 12**，形状断言 = 行数守恒 84、其余列逐字不变。
2. `node scripts/csv-to-sku-seo.mjs --apply` → 生成器断言 A-E。
3. 门童 #27 全量 + i18n + brand + entity + tsc 0=0。
4. live 探针：6 SKU × 3 locale PDP H1 抽查 + 404/301 零新增。
5. 部署前置条件 = K3 拍板「核心更新完成 + 比较窗通过」+ §0.25 攒批窗口。
