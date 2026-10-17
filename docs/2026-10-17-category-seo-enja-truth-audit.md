# category-seo-content en/ja 真值审计报告（2026-10-17）

数据来源:
- `src/data/category-seo-content.ts`（git HEAD, 5086 行; 键矩阵双方法扫描 `.hermes/_locale_matrix.py`; 诚信扫描 `.hermes/_integrity_scan.py`）
- `src/data/products.ts` @ HEAD（SKU 真值提取 `.hermes/_pkg_truths.py`: food 100/HK$2.5 · folding 100/HK$2.5 · mailer 100/HK$3.5 · rigid 100/HK$8 · cosmetic 100/HK$8 · white-card 500/HK$129/5-7 天; 无 gift-boxes / wedding-boxes slug）
- 线上渲染验证: curl `https://zprintpro.com/en/category/packaging/`（397,106B, 命中 en 块 h2 "Free Die-Cut Design" + 优势标题 "Complete Material"）; `https://zprintpro.com/ja/category/packaging/`（364,638B, 命中 ja 块 FAQ 价格 ¥101）— 校准 2026-10-17 16:25
- K3 待核清单 #7（SGS 真伪, 见 weekly review §4.2）

校准状态: 已校准（本报告即首报, 全部行号可直接 rg 复核）
撤回声明: 撤回「category-seo-content.ts 16 类目 Record 全部仅 zh-hk, V9 en/ja 走默认层」的系统性发现（原登记于 10-16/17 周报与 b1c 台账, 撤回日期 2026-10-17）。根因 = 单方法 regex 只匹配带引号键 `'en': {`, 漏检无引号键 `en: {`（违反 §0.23.2 双方法复算铁律）。**正确事实: 16 类目全部已有 en/ja 块（16 × en 6.5-11.3K 字符 + 16 × ja 4.2-6.0K 字符）, 且 V9 正在线上渲染**（上方 curl 双方法确证）。16×2 工程从队列整体撤下。

---

## 一、结论速览

| # | 发现 | 证据 | 判定 | 处置建议 |
|---|------|------|------|---------|
| 1 | 「16 类目仅 zh-hk」为误判 | 双方法: 键矩阵扫描 + 线上 curl 渲染 | **撤回** | 16×2 工程撤下; 本报告替代 |
| 2 | SGS 主张 7 处（三语客户可见） | L163/L190(zh) L278/L294(en) L382/L399(ja) + L184 | ⚠️ K3 #7 未核, 线上在展 | 见方案 A/B/C |
| 3 | 「無毒大豆油墨」铺开主张 38 处 | 多品类 FAQ/buyingGuide 三语 | ⚠️ 品类级不可验证（大豆油墨属 eco SKU 材质项, 非全品类标配） | 定点改写 |
| 4 | h2 承诺 "3-Day Delivery"/「3日納品」 | L201(en) L305(ja) | ⚠️ vs 真值 3-5 天(數碼)/5-7(柯式) | 改 "3-5 天" |
| 5 | "10 professional series"/「10大シリーズ」 | L208(en) L312(ja) | ⚠️ packaging 族 products.ts 实为 12 SKU（双方法复算修正：初报 6 为误计，10/17 19:3x rg count=12） | 改 12 |
| 6 | ja MOQ「30個/50個から」 | L320/L362/L379/L396 | ⚠️ 无 SKU 支撑（全族 minQuantity=100; white-card=500） | 改 100 或删 |
| 7 | **新发现: rigid-boxes 价格内战第 7 例** | title_zh「HK$4.5起/個」 vs basePrice=8（ja ¥240≈HK$8 与 basePrice 一致） | ⚠️ title 与数据层漂移 | 并入 K3 价格 SSoT 裁决清单 |

## 二、SGS / 大豆油墨 三语现行文案（节选）

- zh L190: 「我們採用食品級紙張和無毒大豆油墨，通過 SGS 檢測認證，符合 HK 衛生署食品安全要求。」
- en L294: "We use food-grade paper and non-toxic soy-based inks, certified by SGS…"
- ja L399: 「食品グレード紙と無毒大豆油インクを使用。SGS認証取得済み、日本の食品衛生基準に準拠。」

参照先例: food-boxes PDP 速赢包（fea00143, 10-17）已采用**诚实请求式**表述（「落單時註明、免費打稿確認」）, 拒绝品类级不可验证主张。同一原则应适用于类目层。

## 三、处置方案（请 K3 拍板）

- **方案 A（推荐）— 定点清毒, 1 个攒批 push**: 撤 SGS 主张（改「可協助安排第三方檢測報告」诚实请求式）+ 大豆油墨改「環保油墨選項（落單時註明）」+ h2 改 3-5 天 + 「10 series」改真数 + ja MOQ 改 100。范围 ~15 处, 三语同步, 门童全绿后随下一攒批上线。
- **方案 B — 只处理 SGS（最小面）**: K3 #7 核验前先撤 SGS 7 处, 其余列入观察。风险: 大豆油墨/3 天/MOQ 主张继续在线。
- **方案 C — 真值替换块**: 用本会话已备好的 10.5K 字符真值锚 en/ja packaging 块（存 `.hermes/_catslice_apply.py`, 8 结构齐, 全部 products.ts 真值）整体替换既有 en/ja 块。改动面大（churn 风险）, 不推荐作为第一动作。

## 四、附注

- rigid-boxes title_zh HK$4.5 vs basePrice 8: 若 K3 裁定 8 为真, title 属 §13.5 价格三件套漂移, 与 posters/a1/日历/紙袋 6 例同单处理。
- 本会话对 category-seo-content.ts 的写入曾被凭据判据拦截: 命中词全为产品名 "Drink Token"（place-cards 类目文案, 9 处, L4889-L4973 区）, 文件零真实凭据（rg 全文核验）。已获 K3 会话内授权; 建议后续为守卫加产品词白名单。
- 本报告为 docs-only, 不触发 push; 方案 A/B/C 拍板后按 §0.25 攒批执行。
