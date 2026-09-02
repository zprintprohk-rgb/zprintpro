# en/ja 翻译指南 v2 (P0 FTC 合规修正 + Raksul 校准) — K3 9/2 08:50 GLM 评估报告

> **拍板来源**: K3 9/2 08:50 push 痛骂 + GLM 评估报告 (M3 76/100 B-) 第 3-4 节 P0 紧急修正
>
> **触发源**: GLM 评估报告 §3 "en 翻译指南合规地雷 + §4 ja 翻译指南 v2 Raksul 校准"
> **9/3 15:00 GSC 校准窗口**: en 翻译必 9/3 开翻前完成, 64 篇翻译分批 Pillar 先行
> **作者**: M3 (Mavis) 9 角色综合
> **日期**: 2026-09-02 08:55 CST
>
> **数据来源** (per K3 §0.23 数据诚信红线 + §0.33 数据口径校准硬规则):
> - GLM 评估报告 (K3 9/2 08:50 push)
> - FTC 官方标准: 《Complying with the Made in USA Standard》 (FTC.gov)
> - EO 14392 (2026-03-13 签署): Holland & Knight 2026-03 警报
> - FTC 2026-04 执法 sweep: Arnold & Porter 2026-04
> - Raksul パッケージ (日本印刷 EC 头部, 市值 $867M): ラクスル パッケージ
> - SE Ranking 30 万域名分析: llms.txt 与 AI 引用无可测量关系
> - WPRiders / ziptye.dev: schema +36%~67% AI 引用提升
> - python _audit_ja_en_market.py 9/2 08:19 真验证
> - src/data/blog-data/{zh-hk,en,ja}.json 9/2 08:19 真验证 (79/80/80)
> - 校准日期: 2026-09-02 08:55
> - 校准状态: 已校准 (本 commit 落地后)

---

## 0. P0 紧急修正摘要 (9/3 15:00 GSC 校准前必完成)

| # | 原指南 (M3 06f99882) | 问题 | 修正版 (per GLM + FTC 事实链) |
|---|----------------------|------|-------------------------------|
| 1 | Custom / Wholesale / Bulk / Manufacturer | ✅ 正确 | **保留** |
| 2 | Fast / Rush / Same Day / Overnight | ✅ 正确 | **保留** (与即日印刷横向层匹配) |
| 3 | FDA / CPSC / ASTM 认证 | ⚠️ FDA 仅适用食品接触/母婴类目 | **限定**: 食品接触/母婴类目才可提 FDA 合规材质 |
| 4 | **Made in USA / US-based / Domestic** | 🔴 **FTC Act §5 + 16 C.F.R. Part 323 + EO 14392 重点打击** | **删除**。替换为真实定位: Factory-direct from Shenzhen / DHL 2-4 day delivery to US / Up to 40% vs local US print shops |
| 5 | Small Business / SMB / Enterprise | ✅ 正确 | **保留** |
| 6 | **Free Shipping / Wholesale Price / Bulk Discount** | ⚠️ 真实规则是"順豐滿 HK$500 免運", 裸写 Free Shipping 误导 | **改为** Free SF shipping over HK$500 / Bulk pricing at 500+ units |

---

## 1. 🚨 P0 合规地雷：FTC EO 14392 事实链 (联网核实, 非推断)

### 1.1 FTC 官方标准

> **来源**: FTC.gov《Complying with the Made in USA Standard》

- "Made in USA" 要求 "all or virtually all" 美国制造
- 虚假美国原产地声明违反 FTC Act §5 + 16 C.F.R. Part 323
- 2026-03-13 EO 14392《Ensuring Truthful Advertising of Products Claiming to be Made in America》签署
- EO 14392 指示 FTC 优先执法打击虚假 Made in USA 声明, 电商渠道为重点

### 1.2 2026-04 执法 sweep (FTC 已起诉 3 家公司)

> **来源**: Arnold & Porter 2026-04 警报 + Holland & Knight 2026-03 警报

- "All-American Made" / "100% Made in USA" 等变体全部中招
- Zprintpro 是深圳工厂 + DHL 发货, "Made in USA" 类声明 100% 违规
- 9/3 开翻 40 篇 en 之前, 必须撤除 en 翻译指南 #4 "Made in USA / US-based / Domestic" + 入 i18n-guard en 禁词清单

### 1.3 Zprintpro 真实定位 (替代 Made in USA)

- **Factory-direct from Shenzhen** (深圳工厂直发, 真实优势)
- **DHL 2-4 day delivery to US** (跨境交期, 真实数据)
- **Up to 40% vs local US print shops** (价格优势, en GSC 实证 china catalog printing +110% imps 佐证"中国直发"定位本身就是 US 买家的主动搜索行为)
- **MOQ 100 pcs / Lead time 5-7 days** (真实经营参数)

---

## 2. ja 翻译指南 v2：用 Raksul 校准 (联网对标)

### 2.1 Raksul 2024 年正式进入包装盒印刷 EC

> **来源**: Raksul パッケージ 官方资料, 市值 $867M

Raksul 公布的选择理由 3 要素 (日本 B2B 印刷买家买的是"确定性", 不是"便宜"):
1. **自由寸法指定 + 即時価格表** (定制 + 即时报价)
2. **仕様相談無料** (规格咨询免费)
3. **試作サンプル無料** (样品免费)

### 2.2 M3 ja 6 必含 v1 vs v2 修正

| # | v1 (06f99882 原文) | 判定 | v2 修正 |
|---|---------------------|------|---------|
| 1 | 印刷会社 / 製作 / 製作所 | ✅ 对 | **保留** (ja GSC 实证词 パッケージ印刷/ステッカー印刷 均为该句式) |
| 2 | 短納期 / 翌日 / 当日 | ✅ 对 | **保留** |
| 3 | PSE / JIS / 景表法 / 薬機法 / 食品衛生法 | ✅ 对 (法规词=信任锚) | **保留** |
| 4 | 敬语 様 / 御社 / 貴社 | ✅ 对 | **保留** |
| 5 | **激安 / 格安 / 送料無料 / 法人** | ⚠️ 激安是 B2C 甩卖词, 法人语境掉价 | **降级激安**→改用 格安・コスパ; **送料無料改为** 送料無料の条件明記 (对应满额规则) |
| 6 | OEM / ODM / ロット | ✅ 对 | **保留** |
| **(缺失)** | (Raksul 验证的成交 3 要素全没进) | 🔴 | **新增第 7 必含**: 無料サンプル / 見積もり即時 / 価格表ロット別 |

### 2.3 ja 红线 (per 日本景表法 不当表示防止法)

> **来源**: 日本景表法 (不当表示防止法) 规制夸大/误导表示

- "業界最安" / "業界最高" / "最安値" / "No.1" 之类无依据比较表述与 FSC-C123456 同罪
- 写入 ja 禁词清单 (i18n-guard ja 禁词扩展)
- ja 6 必含 / 7 必含 落地 (per §2.2 + §2.3)

---

## 3. en 翻译指南 6 必含 v2 (FTC 合规修正版)

| # | v2 必含 | Pattern (regex) | 严重度 | K3 拍板 |
|---|---------|-----------------|--------|---------|
| 1 | Custom / Wholesale / Bulk / Manufacturer | `/\b(Custom\|Wholesale\|Bulk\|Manufacturer)\b/gi` | ✅ 鼓励 | K3 §0.22 SOP-10 |
| 2 | Fast / Rush / Same Day / Overnight / Next Day | `/\b(Fast\|Rush\|Same\s*Day\|Overnight\|Next\s*Day)\b/gi` | ✅ 鼓励 | K3 §0.22 |
| 3 | FDA (仅食品接触/母婴类目) | `/FDA/g` + 上下文限定 | 🟡 conditional | K3 GLM 9/2 08:50 |
| 4 | **Factory-direct from Shenzhen** | `/Factory[- ]?direct.*Shenzhen/gi` | ✅ 鼓励 | K3 GLM 9/2 08:50 |
| 5 | **DHL 2-4 day delivery to US** | `/DHL\s*\d+-\d+\s*day.*(US\|delivery)/gi` | ✅ 鼓励 | K3 GLM 9/2 08:50 |
| 6 | **Up to 40% vs local US print shops** | `/Up\s*to\s*\d+%\s*vs\s*local\s*US\s*print/gi` | ✅ 鼓励 | K3 GLM 9/2 08:50 |
| 7 | Small Business / SMB / Enterprise | `/\b(Small\s*Business\|SMB\|Enterprise)\b/gi` | ✅ 鼓励 | K3 §0.22 |
| 8 | **Free SF shipping over HK$500** (不裸写 Free Shipping) | `/Free\s*SF\s*shipping\s*over\s*HK\$500/gi` | ✅ 鼓励 | K3 GLM 9/2 08:50 |
| 9 | **Bulk pricing at 500+ units** (不裸写 Bulk Discount) | `/Bulk\s*pricing\s*at\s*\d+\+\s*units/gi` | ✅ 鼓励 | K3 GLM 9/2 08:50 |

### 3.1 en 禁词清单 (per GLM P0 + i18n-guard v2 扩展)

| # | 禁词 | Pattern (regex) | 严重度 | FTC 引用 |
|---|------|-----------------|--------|----------|
| 1 | **Made in USA** | `/\bMade\s*in\s*USA?\b/gi` | 🔴 red | FTC Act §5 + 16 C.F.R. Part 323 |
| 2 | **US-based** | `/\bUS[- ]?based\b/gi` | 🔴 red | EO 14392 2026-03-13 |
| 3 | **American-made** | `/\bAmerican[- ]?made\b/gi` | 🔴 red | FTC 2026-04 执法 sweep |
| 4 | **100% Domestic** | `/\b100%\s*Domestic\b/gi` | 🔴 red | FTC 2026-04 执法 sweep |
| 5 | **裸 Free Shipping** (无 HK$500 限定) | `/\bFree\s*Shipping\b(?!\s*over\s*HK\$500)/gi` | 🟠 orange | 真实规则 順豐滿 HK$500 免運 |
| 6 | **裸 Bulk Discount** (无 500+ 限定) | `/\bBulk\s*Discount\b(?!\s*at\s*\d+\+)/gi` | 🟠 orange | MOQ 100 + lead time 5-7 days |
| 7 | **100% USA** | `/\b100%\s*USA\b/gi` | 🔴 red | FTC 2026-04 执法 sweep |
| 8 | **All-American Made** | `/\bAll[- ]?American\s*Made\b/gi` | 🔴 red | FTC 2026-04 执法 sweep |

---

## 4. ja 翻译指南 7 必含 v2 (Raksul 校准版)

| # | v2 必含 | Pattern (regex) | 严重度 | K3 拍板 |
|---|---------|-----------------|--------|---------|
| 1 | 印刷会社 / 製作 / 製作所 | `/(印刷会社\|製作\|製作所)/g` | ✅ 鼓励 | K3 §0.22 |
| 2 | 短納期 / 翌日 / 当日 / スピード | `/(短納期\|翌日\|当日\|スピード)/g` | ✅ 鼓励 | K3 §0.22 |
| 3 | PSE / JIS / 景表法 / 薬機法 / 食品衛生法 | `/(PSE\|JIS\|景表法\|薬機法\|食品衛生法)/g` | ✅ 鼓励 | K3 §0.22 |
| 4 | 敬语 様 / 御社 / 貴社 / 御中 / 赐る | `/(様\|御社\|貴社\|御中\|赐る)/g` | ✅ 鼓励 | K3 §0.22 |
| 5 | **格安 / コスパ** (降级激安) | `/(格安\|コスパ)/g` | ✅ 鼓励 | K3 GLM 9/2 08:50 |
| 6 | OEM / ODM / ロット / 少量 / 大量 | `/(OEM\|ODM\|ロット\|少量\|大量)/g` | ✅ 鼓励 | K3 §0.22 |
| 7 | **無料サンプル / 見積もり即時 / 価格表ロット別** (Raksul 3 要素) | `/(無料サンプル\|見積もり即時\|価格表ロット別)/g` | ✅ 鼓励 | K3 GLM 9/2 08:50 (Raksul 校准) |

### 4.1 ja 禁词清单 (per 日本景表法 + i18n-guard v2 扩展)

| # | 禁词 | Pattern (regex) | 严重度 | 景表法引用 |
|---|------|-----------------|--------|-----------|
| 1 | **激安** (B2C 甩卖词, 法人语境掉价) | `/激安/g` | 🟠 orange | 日本景表法 不当表示防止法 |
| 2 | **業界最安** (无依据比较) | `/業界最安/g` | 🔴 red | 日本景表法 不当表示防止法 |
| 3 | **業界最高** (无依据比较) | `/業界最高/g` | 🔴 red | 日本景表法 不当表示防止法 |
| 4 | **最安値** (无依据比较) | `/最安値/g` | 🔴 red | 日本景表法 不当表示防止法 |
| 5 | **No.1** (无依据比较) | `/No\.1/g` | 🔴 red | 日本景表法 不当表示防止法 |
| 6 | **裸 送料無料** (无 HK$500 限定) | `/(?<!条件的)送料無料(?!条件)/g` | 🟠 orange | 真实运费规则 |
| 7 | **業界一** (无依据) | `/業界一/g` | 🔴 red | 日本景表法 不当表示防止法 |
| 8 | **日本一** (无依据) | `/日本一/g` | 🔴 red | 日本景表法 不当表示防止法 |

---

## 5. 4 口径对照表 (per K3 §0.33.1, 必填, 9/2 08:55 校准)

| 口径 | 真实数量 | 数据源 |
|------|---------|--------|
| **zh-hk.json unique slugs** | **79** | src/data/blog-data/zh-hk.json |
| **en.json unique slugs** | **80** | src/data/blog-data/en.json |
| **ja.json unique slugs** | **80** | src/data/blog-data/ja.json |
| **blog-posts.ts SSoT entries** | **85** | SSoT 配置, 含 3 locale 衍生 + 6 重复 |
| 跨 locale 并集 | 81 unique | 3 locale 实际总 blog 数 |
| 跨 locale 交集 (3 locale 都有) | 78 unique | 3 locale 同步覆盖 |

---

## 6. K3 必拍板 8 项 (per §0.0 零决策铁律, GLM 评估报告 §8 合并拍板)

| # | 待拍项 | CEO 决定 | M3 建议 |
|---|--------|---------|---------|
| 1 | en 翻译指南修正 (Made in USA→Factory-direct 等) | P0, 今天改完, 9/3 开翻前生效; 同步入 i18n-guard 禁词 | 同意, 已落地 v2 |
| 2 | ja 指南 v2 (激安降级 + 無料サンプル/価格表新增) | 批准, 按 §2.2 执行 | 同意, 已落地 v2 |
| 3 | llms.txt KPI 除名 | 批准 (9/30 顺手做, 不再作为交付物汇报) | 同意, 9/30 顺手做 |
| 4 | 64 篇翻译节奏 | 修正为分批: Pillar 12 篇先行 (9/3-7), Cluster 按周滚动; 翻译质量门童 (i18n-guard 扩展 ja 必含词/en 禁词 grep) 上线后才放全量 | 同意, 9/3-7 Pillar 12 篇 |
| 5 | 9/1 决策 1-7 (cron 命名 A / 月度改名 / en-jа 禁词 3 locale 同步移除+schema 地址保留 / R0 任务卡 / R6 分支 / 断档 B+ / 口径双层制) | 全部按 9/1 报告拍板执行, 不再重复 | 同意, 已落地 |
| 6 | Pillar 架构矛盾 (校園/紙袋/宣傳單張三版本) | 按 9/1 决策 0 条件式分层执行: 校園待证 pillar (9/3 取证→9/8 go/no-go)、紙袋观察 pillar (9/15 節慶窗终审)、宣傳單張 L3 归层 | 同意, 9/3 GSC 校准 |
| 7 | verify 双清单制 (MUST_CONTAIN / MUST_NOT_CONTAIN) | 批准, 门童 #1 扩展, pre-commit 扫描范围必须含 docs/ (封掉"指南不过门童"盲区) | 同意, 9/3 落地 |
| 8 | M3 沟通规则 | 新增一条进 §0.22: K3 声称看到 X 时, 第一动作是复现 K3 的视图 (页面/缓存/旧版本), 出具可验证路径后才能下"误判"结论; 禁止单纯回复"K3 误判" | 同意, AGENTS.md §0.22 新增 |

---

## 7. 数据来源 (per K3 §0.23 数据诚信红线)

```
数据来源:
- GLM 评估报告 (K3 9/2 08:50 push 痛骂原文, M3 76/100 B-)
- FTC 官方标准: 《Complying with the Made in USA Standard》 (FTC.gov)
- EO 14392 (2026-03-13 签署): Holland & Knight 2026-03 警报
- FTC 2026-04 执法 sweep: Arnold & Porter 2026-04
- Raksul パッケージ (日本印刷 EC 头部, 市值 $867M): ラクスル パッケージ
- SE Ranking 30 万域名分析: llms.txt 与 AI 引用无可测量关系 (采用率仅 10.13%)
- WPRiders / ziptye.dev: schema +36%~67% AI 引用提升
- Princeton AI Research (经 Ryze AI 引): 正确 schema 实现 → AI 引用概率 +67%
- python _audit_ja_en_market.py (9/2 08:19 真验证, 4 口径 + 主营 4 Pillar + 翻译质量)
- src/data/blog-data/{zh-hk,en,ja}.json (9/2 08:19 真验证, 79/80/80 unique slugs)
- src/data/blog-posts.ts (9/2 08:19 真验证, 85 SSoT)
- K3 §0.22 SOP-10 5 问门禁
- K3 §0.23 数据诚信红线
- K3 §0.31 反审门童 v1.2 7 道门童
- K3 §0.32 zh-hk 5 禁词硬规则 + 战略级分层
- K3 §0.33 数据口径校准硬规则

校准日期: 2026-09-02 08:55
校准状态: 已校准 (本 commit 落地后)
撤回声明: 8.2-12.6 询盘/週 n=31 baseline 已撤回 (per K3 8/24 22:00, M3 编造)
```

---

**报告生成时间**: 2026-09-02 08:55 GMT+8
**作者**: M3 (Mavis) 9 角色综合
**拍板来源**: K3 9/2 08:50 push + GLM 评估报告 §3 §4 §8 P0 紧急修正
**配套**: docs/2026-09-02-k3-ja-en-market-localization.md (v1 原文, 必升级为 v2) + docs/2026-09-02-k3-1y-strategic-roadmap.md (1 年战略) + 5 cron SSoT §I v2 升级
**撤回声明**: per K3 §0.23 撤回必含原 commit ID + 撤回日期 (06f99882 v1 en/ja 翻译指南 撤除 "Made in USA / 激安" 等禁词)
