# ZprintPro 包装商业真值冲突台账（PKG-P0-01 · D1）

> 日期：2026-10-26（D1 提前执行，原排程 10-27）
> 角色：执行层（DeepSeek）——**只盘点、不猜值、不改被点名源头**
> 依据：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §4.2 / §8 / §11
> 机器可读版（SSoT）：`.kimi-work/packaging-research-20261026/packaging-truth-ledger.json`
> 基线数据源：`.kimi-work/packaging-research-20261026/packaging-local-evidence.json`（同口径 `query×page×country`）

**状态字典**：`blocked`＝未拍板冲突（发布阻断，K3 拍板前执行层不改源）｜`needs-data`＝无证据/待业务提供文件｜`conditioned`＝可条件式但需真值确认｜`keep-approved`＝K3 8/19 批准保留（需复核范围）｜`clean`＝可观察事实或已清｜`audit-p2`＝D22-23 审计对象｜`watch`＝观察项。

**负责人字典**：`K3`＝真值拍板｜`business`＝提供证据（刀模/试作/质检/认证/订单）｜`exec`＝执行层清毒/内容/内链/门禁｜`none`＝已解决。

---

## 一、页面资产状态（线上 probe 2026-10-26，全 200 / 自 canonical / index,follow）

| 页面 | 线上 title | 线上 H1 | 问题 | 优先级 |
|---|---|---|---|---|
| `/en/category/packaging/` | Packaging Boxes 100 MOQ $0.51 | Custom Packaging Boxes **Made for USA** · Food-Safe… | H1 通用意图过窄（食品类前置） | P1（D13） |
| `/en/product/rigid-boxes/` | 100 MOQ $1.84 Free Ship | **250+** | MOQ 三值冲突 | **P0 阻断** |
| `/en/product/mailer-boxes/` | 100 MOQ $0.80 | 100+ Self-Lock | — | — |
| `/en/product/food-boxes/` | 100 MOQ | Food-Grade… | FDA 泛化 | P0 |
| `/en/product/kraft-paper-packaging-box/` | 300 MOQ $1.15 | 300+ | — | — |
| `/en/product/cosmetic-boxes/` | 100 MOQ $1.84 | 4 Box Styles | — | — |
| `/ja/category/packaging/` | 100個〜 ¥69〜 | 食品用紙箱/紙袋… | 正文含「上製本箱」 | P0/P1 |
| `/ja/product/rigid-boxes/` | **上製本箱**（リジッドボックス）100個〜 | 泛企业文案「高品質・短納期・グローバル配送…」 | 术语错 + 泛 H1 + MOQ 冲突 | **P0/P1** |
| `/ja/product/kraft-paper-packaging-box/` | エコ 300個〜 | **エコ FSC認証** 300個〜 | FSC 认证未核验写进 H1 | **P0/P1** |
| `/ja/product/food-boxes/` | 100個〜 ¥101〜 | **FDA食品グレード**… | FDA 写进 H1；正文含上製本箱 | P0 |
| `/zh-hk/category/packaging/` | 包裝盒訂製 100個起…3D打稿 | 食品紙盒/紙袋/防油紙卡…前置 | 食品词前置观察项 | watch |
| `/zh-hk/product/rigid-boxes/` | 100個起 HK$8起 | 泛企业文案 | 泛 H1 + 价格冲突 | P0 |
| `/zh-hk/product/kraft-paper-packaging-box/` | 300個起 HK$5起 | **250-350g** 進口牛皮紙 | gsm 与 products.ts 300-350g 冲突 | P1 |
| `/zh-hk/product/food-boxes/` | 100個起 HK$2.5 | **FDA 食品級** | FDA 写进 H1 | **P0** |
| `/en/product/custom-boxes/` | — | — | 404 noindex（**不建新页**） | — |
| `/en/product/custom-packaging-boxes/` | — | — | 404 noindex（**不建新页**） | — |

来源：`.kimi-work/packaging-research-20261026/packaging-page-probes.json`；H1 源 `src/app/[locale]/category/[slug]/page.tsx:115-119`（customH1Map）。

---

## 二、MOQ 冲突台账

| ID | URL | 源码 | 现值（各来源） | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-MOQ-001 | `/en/product/rigid-boxes/` | sku-seo-data.ts:1193,1195；products.ts:3404；price-tables/en/rigid-boxes.json:6 | title=100 MOQ ｜ H1=**250+** ｜ products.ts minQuantity=**100** ｜ 价格表首档=**50** | blocked | K3 | D2 拍板 rigid 真值；未拍板前**不改任何源** |
| PKG-T-MOQ-002 | `/ja/product/rigid-boxes/` | sku-seo-data.ts:1200；price-tables/ja/rigid-boxes.json | 100個〜 ｜ 价格表 50 | blocked | K3 | 随 PKG-T-MOQ-001 同一真值 |
| PKG-T-MOQ-003 | `/zh-hk\|en/product/mailer-boxes/` | products.ts:3208；price-tables/packaging.json:19-27 | minQuantity=**100** ｜ 价格表首档=**500**（HK$1.93） | needs-data | K3 | 确认真实 MOQ 与价格表档位覆盖 |
| PKG-T-MOQ-004 | `/ja\|en/product/kraft-paper-packaging-box/` | sku-seo-data.ts:2489,2493,2496,2500 | title/desc=**300 MOQ** ｜ en body=**100-piece minimum** ｜ ja body=**100枚から/100個〜即日発送** | blocked | K3 | 拍板 kraft 真实 MOQ；ja「即日発送」无源需清 |
| PKG-T-MOQ-005 | `/zh-hk\|en/product/food-boxes/` | products.ts:3006；price-tables/packaging.json:43-46 | minQuantity=**100** ｜ 价格表仅 **1000/3000** 两档 | needs-data | K3 | 确认真实 MOQ 与价格表档位 |
| PKG-T-MOQ-006 | `/zh-hk/product/white-card-boxes/` | products.ts:6487,6459 | minQuantity=**500** ｜ description_zh「**50**-10,000 件」 | blocked | K3 | 拍板 white-card 真实 MOQ |
| PKG-T-MOQ-007 | `/zh-hk\|en\|ja/product/gang-run-card-boxes/` | products.ts:6409；sku-seo-data.ts:2518,2526,2533 | 500-10,000 全部一致 | clean | none | 保留 |
| PKG-T-MOQ-008 | `/zh-hk\|en\|ja/category/packaging/` | category-seo-content.ts:84,143,201 | 「100-10,000 彈性 MOQ」「全盒型 100 個起、異形 500 個起」 vs SKU 层 300/500 | needs-data | K3 | 拍板 category 通用 MOQ 口径 |
| PKG-T-MOQ-009 | `/zh-hk/product/kraft-paper-packaging-box/` | products.ts:6362-6366 vs 6311 | variables 档 100/500/1000 vs minQuantity=**300** | blocked | K3 | 拍板后统一 products.ts 内部字段 |
| PKG-T-MOQ-010 | 全包装 PDP | products.ts variables 模板 | cosmetic/folding/mailer/rigid 共享 100/500/1000 变量档 | watch | exec | 各 SKU 真值拍板后核对变量档 |

---

## 三、价格冲突台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-PR-001 | `/zh-hk/product/food-boxes/` | products.ts:2982 vs 2983,2999 vs sku-seo-data.ts:1078 | title_zh **HK$4起** vs description/price_range **HK$2.5起** | blocked | K3 | 拍板起价与口径 |
| PKG-T-PR-002 | `/zh-hk/product/rigid-boxes/` | products.ts:3380 vs 3397-3398 vs sku-seo-data.ts:1186 | **HK$4.5起** vs **HK$8-42** vs basePrice=8 | blocked | K3 | 拍板 rigid 起价 |
| PKG-T-PR-003 | `/zh-hk/product/kraft-paper-packaging-box/` | products.ts:6304-6305 vs sku-seo-data.ts:2482 | price_range **HK$1.5-1000** vs basePrice=**5** vs HK$5起 | blocked | K3 | 拍板价格区间口径 |
| PKG-T-PR-004 | `/zh-hk/product/white-card-boxes/` | products.ts:6482 vs 6483 | **HK$0.50-3.00/個** vs basePrice=**129**（疑似批次价混入） | blocked | K3 | 拍板单价口径（個 vs 批次） |
| PKG-T-PR-005 | `/ja/product/gang-run-card-boxes/` | products.ts:6388 vs sku-seo-data.ts:2533 | **¥4.4/個** vs **¥3,800/500（=¥7.6/個）** | blocked | K3 | 拍板 ja 单价 |
| PKG-T-PR-006 | `/en/product/gang-run-card-boxes/` | products.ts:6388 vs sku-seo-data.ts:2529 | 免运 **$500** vs **$99** | blocked | K3 | 拍板免运门槛与适用范围 |
| PKG-T-PR-007 | `/en/product/rigid-boxes/` | sku-seo-data.ts:1194 vs 1197 | 同条目 description **$100** vs body **$99** | blocked | K3 | 随免运真值统一 |
| PKG-T-PR-008 | `/en/product/mailer-boxes/` | sku-seo-data.ts:1122 vs 1125 | 同条目 **$100** vs **$99** | blocked | K3 | 同上 |
| PKG-T-PR-009 | `/zh-hk/category/packaging/` | category-seo-content.ts:84 vs products.ts:6404 | 白卡彩盒 **HK$0.03/個起** vs **HK$129-17,214** 批次 | needs-data | K3 | 确认拼版单价口径与展示方式 |
| PKG-T-PR-010 | 两条 pricing blog | blog-posts.ts:1454,1929-1932 | blog「坑盒 500 個 HK$8-15/個」 vs 价格表 mailer 500=**HK$1.93** | audit-p2 | exec | D22-23 审计；blog 价格不得与表冲突 |
| PKG-T-PR-011 | `/en/product/cosmetic-boxes/` | sku-seo-data.ts:1053 | en body 用 **HK$8-65/pc**（en 页应 USD） | watch | exec | en 币种口径统一 |
| PKG-T-PR-012 | 全包装 | 策略 §11 | 价格对应规格/数量/币种/含刀模·打样·运输/有效期 未定义 | needs-data | K3 | 拍板价格展示规范（AEO 条件化价格） |

---

## 四、生产交期冲突台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-LT-001 | `/en/product/rigid-boxes/` | sku-seo-data.ts:1190,1197；价格表:14；category-seo-content.ts:144 | **3-5 / 3-7 / 4 工作日 / 5-7 / 7-10** 并存 | blocked | K3 | 拍板交期口径与起算点 |
| PKG-T-LT-002 | `/ja/product/mailer-boxes/` | sku-seo-data.ts:1129 vs 1132 | desc **7-10営業日** vs body **3-5** | blocked | K3 | 拍板 mailer 交期 |
| PKG-T-LT-003 | `/zh-hk\|en\|ja/product/gang-run-card-boxes/` | products.ts:6394 vs 6388 | zh **8-15 天** vs en/ja **8-12 day** | blocked | K3 | 拍板凑版交期 |
| PKG-T-LT-004 | `/zh-hk\|en\|ja/category/packaging/` | category-seo-content.ts:84,86,144,298 | h2「**3天交貨**」 vs techSpecs「3-5 常規/2-3 快印/5-7 offset」 vs SKU 5-7 | needs-data | K3 | 拍板 category 口径并保持与 SKU 一致 |
| PKG-T-LT-005 | 全包装 | 策略 §11 | 起算点（文件确认后/付款后）未定义 | needs-data | K3 | 拍板交期拆解规范 |
| PKG-T-LT-006 | `/zh-hk/product/kraft-paper-packaging-box/` | sku-seo-data.ts:2483 | 「**48 小時快遞**」 vs 5-7 天生产 | needs-data | K3 | 确认该承诺口径 |

---

## 五、运输交期台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-SH-001 | 全包装 PDP | sku-seo-data en bodies | DHL 全球 2-4 天 ｜ US **4 天送达** ｜ gang-run FedEx Ground 5-7 | needs-data | K3 | 拍板各区域运输真值与表述边界 |
| PKG-T-SH-002 | zh 页 | category-seo-content.ts:84 | 港九新界順豐 1-2 天（多处一致） | conditioned | K3 | 确认 HK 本地承诺口径 |
| PKG-T-SH-003 | en 各 PDP | sku-seo-data en bodies | 「4-day to lower 48」「Asia factory」——不得造成美国本地工厂印象 | needs-data | business | 确认美国运输真实时效（§7.3 实体一致性） |
| PKG-T-SH-004 | `/zh-hk/category/packaging/` | category-seo-content.ts:152 | **旺角打樣中心**存在性（实体为深圳主体） | needs-data | business | 确认香港服务节点/打样中心真实位置 |
| PKG-T-SH-005 | ja 各 PDP | sku-seo-data ja bodies | 沖縄県・北海道も追加料金なし | keep-approved | K3 | K3 8/19 批准；复核适用范围 |

---

## 六、打样台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-PF-001 | category + 各 PDP | category-seo-content.ts:110,152-153,298,406 | 「免費打樣」并存「當日完成」「2 小時」「1 小時數碼打稿」「**5 天免費打樣**」（自矛盾） | blocked | K3 | 拍板打样产品矩阵（数码/无地/结构/实物、费用、时间、验证内容） |
| PKG-T-PF-002 | 各 PDP FAQ | sku-seo-data bodies | 免費打樣 vs **HK$299 / ¥4,980 付費樣本套裝** | blocked | K3 | 拍板免费与付费边界 |
| PKG-T-PF-003 | 各 PDP FAQ | sku-seo-data bodies | 「4 小時內免費 3D 渲染」 | needs-data | business | 确认 3D 渲染真实能力（竞品 Packlane 有 3D 工具） |

---

## 七、刀模台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-DL-001 | category + 各 PDP | category-seo-content.ts:168,201 | 「免費刀模」范围（全盒型 vs 拼版专用 vs 異形 500 起）未定义 | needs-data | K3 | 拍板免费刀模范围与条件 |
| PKG-T-DL-002 | 各 PDP | sku-seo-data bodies | 「免費刀模線模板下載」——模板资产是否真实存在 | needs-data | business | 业务提供真实模板资产（PKG-P2-ASSET-01） |
| PKG-T-DL-003 | `/zh-hk/category/packaging/` | category-seo-content.ts:84,168,FAQ | **「對比 e-print HK$300-800 刀模費」竞品推断无实证** | needs-data | K3 | 核实或撤除竞品价格对比 |

---

## 八、认证台账（P0 清毒重点）

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-CER-001 | food ×3 + category + fruit-label | sku-seo-data.ts:1080,1094,1101-1103；category-seo-content.ts:84；products.ts:6631,6634 | **FDA 食品級/FDA 標準紙/FDA 21 CFR**（title/H1/imageAlt/features）无证书证据 | blocked | K3 | 拍板 FDA 声明口径（证书/适用范围） |
| PKG-T-CER-002 | 全包装 PDP + category | sku-seo-data bodies；category-seo-content.ts:123 | **FSC 認證**范围未定义；FSC 2026 商标标准要求 license code + scope 内才可宣传 | needs-data | K3+business | 提供 FSC license code 与 scope；范围外撤「FSC 認證」 |
| PKG-T-CER-003 | category ×3 | category-seo-content.ts:278,297,398,407 | **SGS 認証取得済み/SGS 檢測**无证书 | needs-data | K3+business | 提供 SGS 报告/证书与适用范围 |
| PKG-T-CER-004 | `/zh-hk/product/cosmetic-boxes/` | products.ts:3087 | **藥機法 / FDA 21 CFR / EU 1223/2013 合規** | needs-data | K3+business | 确认合规依据或撤除 |
| PKG-T-CER-005 | `/ja/category/packaging/` | category-seo-content.ts:397,407 | **日本の食品衛生基準に準拠** | needs-data | K3+business | 确认依据或撤除 |
| PKG-T-CER-006 | `/zh-hk/product/food-boxes/` | products.ts:2985 | **SGS 與香港衛生署標準通過** | needs-data | K3+business | 确认或撤除 |
| PKG-T-CER-007 | food/cosmetic/mailer en desc + gang-run en body | products.ts:2983,3083,3185；sku-seo-data.ts:2529 | 残留「internationally certified quality management system」「internationally certified factory / decade / global clients」 | blocked | exec | K3 拍板后按 PKG-P0-02 清毒（products.ts descriptionEn ×3 + gang-run en body） |

---

## 九、食品接触台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-FC-001 | `/zh-hk/product/fruit-food-label-stickers/` | products.ts:6634 | 「SGS／FDA 通過，大豆油墨無遷移，**可直接接觸食品**」 | blocked | K3 | 拍板直接接触边界（材质/油墨/淋膜/检测/温度） |
| PKG-T-FC-002 | food/rigid/mailer/kraft/cosmetic FAQ | sku-seo-data bodies | 间接接触 OK / 直接接触需專用內襯（条件式，较合理） | conditioned | K3+business | 确认「食品級內襯」真实可用 |
| PKG-T-FC-003 | `/zh-hk\|en\|ja/product/food-boxes/` | products.ts:2987,2994 | **PE/PLA 防油防濕**可用性 | needs-data | business | 确认材料选项与供应 |
| PKG-T-FC-004 | `/zh-hk/product/fruit-food-label-stickers/` | products.ts:6635 | 「0–4°C 冷藏保持黏性」 | needs-data | business | 确认或撤除 |

---

## 十、性能台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-PF2-001 | `/zh-hk\|en\|ja/product/folding-boxes/` | products.ts:3287；sku-seo-data.ts:1151-1161 | **80cm 跌落測試 5kg 不開口**（H1/body）无测试报告 | needs-data | business | 提供测试报告或改条件式/撤除 |
| PKG-T-PF2-002 | category ×3 | category-seo-content.ts:146,278,300,407 | **ISTA 標準壓縮/跌落測試**无报告 | needs-data | business | 提供 ISTA 报告或撤除 |
| PKG-T-PF2-003 | `/zh-hk/category/packaging/` | category-seo-content.ts:168 | **抗壓 80-200kg** | needs-data | business | 确认或撤除 |
| PKG-T-PF2-004 | `/zh-hk/product/kraft-paper-packaging-box/` | products.ts:6295 | **承重 3–5 公斤** | needs-data | business | 确认或撤除 |
| PKG-T-PF2-005 | `/zh-hk/product/kraft-paper-packaging-box/` | products.ts:6292 | **完全生物降解 90 天 / 無塑化劑殘留**无标准（ASTM/ISO）证据 | blocked | K3 | 拍板环保声明口径 |
| PKG-T-PF2-006 | `/en/product/electronics-packaging-box/` | products.ts:6191 | **防靜電（ESD）符合電子產品防護標準**——策略明确不得未经证实宣称 | blocked | K3 | 拍板 ESD 承接边界或撤除 |
| PKG-T-PF2-007 | `/zh-hk/product/electronics-packaging-box/` | products.ts:6194 | **尺寸公差 ≤0.5mm** | needs-data | business | 确认工艺公差或撤除 |
| PKG-T-PF2-008 | folding + tuck-end | products.ts:3286,6576 | **節省倉儲 70%**（工程算术） | conditioned | exec | 标注计算口径或改条件式 |
| PKG-T-PF2-009 | `/zh-hk\|en\|ja/product/gang-run-card-boxes/` | products.ts:6390 | **成本直降 40-60%**对比基线未定义 | needs-data | K3 | 确认对比口径或改「可省刀模費/排版費」事实表述 |

---

## 十一、服务边界台账

| ID | URL | 源码 | 现值 | 状态 | 负责人 | 动作 |
|---|---|---|---|---|---|---|
| PKG-T-SB-001 | category FAQ ×3 | category-seo-content.ts:304,411 | **膠袋/真空袋不接**，纸类专精（边界清晰） | clean | none | 保留 |
| PKG-T-SB-002 | `/en/product/electronics-packaging-box/` | products.ts:6191 | ESD/防静电承接边界未明确 | blocked | K3 | 拍板（关联 PF2-006） |
| PKG-T-SB-003 | food ×3 | sku-seo-data bodies | 高卫生要求食品承接边界 | conditioned | K3 | 拍板边界表述（学ラクスル拆开回答） |
| PKG-T-SB-004 | `/zh-hk\|ja/product/gang-run-card-boxes/` | products.ts:6387；sku-seo-data.ts:2533 | **「香港無對手價/香港無競合価格」**无证据竞品断言 | blocked | exec | P0 清毒撤除或改可核验表述 |
| PKG-T-SB-005 | `/en/category/packaging/` | page.tsx:119 | H1「Made for USA · Food-Safe」过窄 | watch | exec | D13 修，先过 title/H1 门检 |
| PKG-T-SB-006 | ja rigid + ja category + ja food body | sku-seo-data.ts:1200,1202；probes | **「上製本箱」术语泄漏**（3 页）——应为貼り箱/リジッドボックス | blocked | exec | D11-12 重写；全站扫残留 |
| PKG-T-SB-007 | `/ja/product/mailer-boxes/` | sku-seo-data.ts:1130 | ja H1 为**英文**「Sturdy and durable」 | blocked | exec | P0 清毒重写自然日语 |
| PKG-T-SB-008 | ja kraft + folding | sku-seo-data.ts:2500,1164 | 箱类用**「枚」**单位错误（应为個） | blocked | exec | P0 清毒单位修正 |
| PKG-T-SB-009 | `/ja/category/packaging/` | category-seo-content.ts ja | **「アジア自社工場直送」**——「自社」所有权需确认 | needs-data | K3+business | 确认自社口径或改「アジア工場直送」 |

---

## 十二、K3 必须拍板清单（映射策略 §11 十项）

| # | 领域 | 需要拍板 | 关联 claim |
|---|---|---|---|
| 1 | MOQ | rigid 50/100/250 真实值；kraft 100 vs 300；white-card 50 vs 500；food/mailer 与价格表档位；定型/異形/試作是否不同；category 通用口径 | PKG-T-MOQ-001~009 |
| 2 | 价格 | food HK$2.5 vs 4；rigid HK$4.5 vs 8；kraft HK$1.5 vs 5；white-card 129 vs 0.50-3.00；gang-run ja ¥4.4 vs 7.6；免运 $99/$100/$500；价格对应规格/数量/币种/含刀模·打样·运输/有效期 | PKG-T-PR-001~012 |
| 3 | 生产交期 | rigid 3-5/3-7/4/5-7/7-10；mailer 7-10 vs 3-5；gang-run 8-12 vs 8-15；category 3 vs 3-5/5-7；起算点；kraft 48 小時 | PKG-T-LT-001~006 |
| 4 | 运输交期 | DHL 2-4 天边界；美国 4 天真实性；香港 1-2 天；旺角打样中心 | PKG-T-SH-001~004 |
| 5 | 打样 | 打样产品矩阵；免费 vs 付费（HK$299/¥4,980）；1h/2h/当日/5天统一；3D 渲染 | PKG-T-PF-001~003 |
| 6 | 刀模 | 免费范围；模板资产；e-print HK$300-800 竞品对比核实或撤 | PKG-T-DL-001~003 |
| 7 | 认证 | FDA（food/fruit-label/category）；FSC license code + scope；SGS；藥機法/FDA 21 CFR/EU 1223/2013；日本食品衛生基準；香港衛生署 | PKG-T-CER-001~007 |
| 8 | 食品接触 | 直接/间接边界；食品级内衬；PE/PLA；温度 | PKG-T-FC-001~004 |
| 9 | 性能 | 80cm 跌落/ISTA/抗压/承重测试报告；90 天降解依据；ESD 边界；公差；40-60% 口径 | PKG-T-PF2-001~009 |
| 10 | 服务边界 | ESD/高卫生承接；「香港無對手價」撤除授权；上製本箱→貼り箱替换授权；自社工場口径 | PKG-T-SB-001~009 |

---

## 十三、执行边界与今日已发生事项

1. **今日 18:17 daily-content 车道已清**（order 28a，commit `1cc5e123` 并入 `ef3140ac` push 链）：`sku-seo-data.ts` 8 个包装 SKU **body 层**撤国際認証体系（zh×7/ja×6）、FDA 无源声明（26 组）、zh 错场景（×6）。**未覆盖**：title/H1/lead/desc/imageAlt/FAQ 层、category-seo-content.ts、products.ts descriptionEn 残留、gang-run en body、blog 声明。
2. **派生链铁律**：`zprintpro-sku-seo-data.csv → scripts/csv-to-sku-seo.mjs → src/data/sku-seo-data.ts`；PKG-P0-02 执行时不得只手改派生 TS（策略 §4.1 / AGENTS.md SOP-5）。
3. **禁触红线**：`gift-boxes→rigid-boxes` 301 映射（middleware.ts:43）；title 冻结域（未拍板前不批量预写新 title，策略 §7.1.3）；被点名源头的任何数字字段（K3 拍板前）。
4. **部署披露**：`ef3140ac`（18:38）CF build **FAILED**（check run 121526836891），本地 build PASS（726 URLs）；线上可能仍为 `b0e30769` build——probe 反映的线上状态可能滞后于 src。建议 K3 查 CF Dashboard build logs（与 10-26 daily-content lane 报告一致）。
5. **新增发现（超出策略原文）**：① food title_zh「HK$4起」vs 线上「HK$2.5」（products.ts 内部 + 双源 title 冲突）；② rigid zh「HK$4.5起」vs「HK$8起」；③ kraft price_range「HK$1.5-1000」；④ white-card basePrice=129 vs HK$0.50-3.00；⑤ gang-run ja ¥4.4 vs ¥7.6；⑥ en 免运 $100 vs $99（rigid/mailer 同条目自冲突）；⑦ kraft ja「100枚から/即日発送」vs 300個；⑧ mailer ja H1 英文残留；⑨ ja category/ja food 正文含「上製本箱」；⑩ zh-hk category H1 食品词前置观察项。

---

### 数据来源

- 页面线上事实：`.kimi-work/packaging-research-20261026/packaging-page-probes.json`（2026-10-26 HTTP probe：200/404、title、H1、canonical、robots）
- GSC 基线：`.kimi-work/packaging-research-20261026/packaging-local-evidence.json`（2026-09-28—10-25 vs 08-31—09-27，query×page×country，展示加权）
- 源码：`src/data/products.ts`（包装 SKU 块 2973-3436 / 6178-6660）、`src/data/price-tables/en|ja|zh-hk/rigid-boxes.json`、`src/data/price-tables/packaging.json`、`src/data/category-seo-content.ts:78-414`、`src/data/sku-seo-data.ts:1034-1205 / 2474-2533`、`zprintpro-sku-seo-data.csv`（15 包装行）、`src/data/blog-posts.ts:1441-1462 / 1919-1934`、`src/app/[locale]/category/[slug]/page.tsx:115-119`、`src/middleware.ts:42-48`
- 车道事实：`.hermes/logs/2026-10-26-daily-content.md`（order 28a 清毒记录）
- 策略裁决：`docs/2026-10-26-packaging-seo-aeo-geo-competitor-strategy.md` §4.2/§8/§11
- 双方法复算：MOQ/价格冲突均以「线上 probe + 源码直读」两法核对；计数口径见各 claim 证据列

> **本台账只盘点未改源**：`src/` 零改动；未 commit/push（与策略文档交付同批处理见执行报告）。
