# SKU 图片更换风险评估与一周执行策略（2026-10-16 ~ 10-23）

> **日期**: 2026-10-16 · **作者**: 执行层（首席 SEO/AEO/GEO 数据战略分析师角色）
> **触发**: K3 2026-10-16 04:51 指令（v28_5_webp 图库已就绪未上传、hero 已换；很多 SKU 不敢换图怕影响排名 → 分析哪些可换 + 一周执行策略）
> **叠加**: `docs/2026-10-16-two-week-execution-plan-v2.md`（排程与本方案波次对齐，不撞验证窗）
>
> **数据来源**（§0.23 强制行）:
> - 图库: `zprintpro-en-us-images/v28_5_webp/README.md` + `_ledger/B_sku_consolidation.csv`（91 SKU 目录 × 12 张 + 48 hero = 1140 张，全 <120KB，final_verification 违规 0）
> - 线上接线: `src/data/products.ts`（images 数组 1031 处 /images/products/ + 78 处 /images/v26/ + seoImages 83 块）+ `src/components/seo-image.tsx` + `getProductImageAlt()`（products.ts L7794）+ `scripts/generate-image-sitemap.js`
> - GSC: 三站 28d 档（2026-10-15 导出）「搜索结果呈现」sheet + 「网页」sheet 逐 PDP 展示量（提取见 §2.2）
> - 存活 SKU: products.ts 当前 slug 集（Tier1 八 SKU 已 301 退役 per f9935e4b；fluorescent→roll-stickers per f9935e4b）
> - 校准状态: 已校准（2026-10-16 05:0x 一手直读）

---

## §1 核心结论：为什么绝大多数 SKU **可以放心换**

**三个证据级事实，把「换图伤排名」的恐惧拆成可验证的零件：**

| # | 事实 | 证据 | 含义 |
|---|---|---|---|
| 1 | **三站图片包流量 = 0** | GSC 三站 28d「搜索结果呈现」sheet：只有 产品摘要 5,861 展 / 评价摘要 1 / 商家信息 2——**零图片包、零图片搜索呈现** | 没有图片排名可丢。换图的「图片 SEO 风险」主通道不存在 |
| 2 | **渲染 alt 与图片文件解耦** | PDP 渲染 alt = `getProductImageAlt()` → sku-seo-data `imageAlt[locale]`（78 SKU 策展 alt），**不读文件 EXIF** | 换图不换 alt = 页面相关性感知信号**零变化**。v28_5 内嵌 EXIF alt 不渲染，其堆词风格（"…ISO 9001 ZprintPro sample"）不构成站内信号 |
| 3 | **换图的正向收益真实存在** | 全部 1200² webp <120KB（旧 jpg 普遍更大）；视觉质量 K3 已确认「绝大部分非常好」 | LCP/加载改善（Core Web Vitals 是排名因素）+ 转化提升 + 未来 Google Images 资产 + 文件名 SEO（zprintpro-\<类目\>-\<产品\>-\<语言\>-\<视图\>.webp） |

**唯一真实风险 = 页面字节变化触发重爬，与在测窗口归因混淆**（CTR 批验证窗 / B1c 纯化窗）。这不是「能不能换」的问题，是「什么时候换」的问题——用排期隔离解决，见 §3。

**结论：91 个 SKU 里没有任何一个因为「排名」原因不能换图；只有 3 类需要择时（§2.3），1 类需要过滤（§2.4）。**

---

## §2 换图分级清单

### 2.1 映射核对（预检门①，部署脚本第一道工序）

v28_5 的 91 个目录 ∩ products.ts 存活 slug **取交集才部署**。两组必须过滤：

- **Tier1 已退役 8 SKU**（10-12 已 301）：drink-tokens / cafe-table-cards / wedding-place-cards / save-the-date-cards / wedding-seating-charts / wedding-suite-bundle / eco-tote-bag / postcard-set——v28_5 的 PC 族（4 目录）与 WI 族部分目录**极可能对应已退役 SKU**（README 的「下架 8 型号」是 v26 口径，不含 10-12 退役批）。**这些目录的图不部署、不入库**。
- **fluorescent-stickers**（ST 族之一）已 301→roll-stickers；roll-stickers（ST-010）图已于 10-12 单独生成部署，**不在本库**——ST 族部署前逐目录对 slug。

### 2.2 展示量分层（三站 28d 合计，10-15 档）

- 有展示 PDP：**84 个**；其中 imps<5 的长尾 **16 个**；零展示 SKU **~7 个**（91-84）
- top 展示：a2-posters 516 / saddle-stitch-booklets 331 / doujinshi-printing 242 / custom-calendars 205 / handle-bags 186 / small-batch-stickers 186 / catalog-printing 184 / a1-posters 178 / food-boxes 161 / kraft-paper-packaging-box 155

### 2.3 三色分级

| 级 | 范围 | 规模 | 排期 |
|---|---|---|---|
| 🟢 **立即换** | 零展示 + imps<5 长尾（纯收益零归因风险） | ~23 SKU | **W1 波 10/17** |
| 🟡 **择时换** | 中尾（imps 5-100）不在任何在测窗口 | ~40 SKU | **W2 波 10/18** |
| 🟡 **窗满即换** | B1c 已重写簇所属 SKU——纯化窗满 5-7 天后（防归因混淆）；或**与簇重写同批**（一次变化一次测量，更干净） | 簇 1/2/3/4/5/6 所属 SKU | W3-W6（10/19-23，逐簇窗满） |
| 🟡 **同批走** | 簇 7 calendars（10/16-17 重写中）→ **图随文同批上线** | CL-001~006 | 10/17 随簇 7 |
| 🔴 **验证窗冻结** | CTR 批四类目关联族：PB（紙袋）/ MN（餐牌）/ PKG 中 food·folding——10/22 首判通过即解冻 | ~14 目录 | **10/22-23** |
| 🔴 **随翻开关** | 年賀状页（NENGAJO_LIVE 翻开关自带图） | — | 10/22 |
| 🔴 **随裁决批** | BC-001~006（贺卡 6 兄弟 = v22 改名族）：换图 + `seoImages.filename` en/ja stickers 残留 bug 修复，随 §0.0 裁决批 | 6 目录 | 10/27（裁决后） |

**🔑 特别修复（随 BC 批）**：`premium-greeting-cards` 的 `seoImages.filename` en/ja 值是 **stickers 文件名**（v22 改名残留 bug，与 CSV 68-69 行同族）——换图时一并归位。

---

## §3 一周排程（与两周方案 v2 对齐）

| 波 | 日 | 内容 | 前置 |
|---|---|---|---|
| **D0 预检** | 10/16 | ① 存活白名单∩映射（剔退役/荧光）② 部署脚本（复制+products.ts images 数组更新+sitemap-image 重生成+IndexNow+探针）③ EXIF alt 声明核对（若未来采纳内嵌 alt 进渲染层，每条 MOQ/ISO 声明须过 products.ts 真值门——本波**不采纳**，仅登记） | — |
| **W1** | 10/17 | 🟢 零展示+长尾 ~23 SKU 换图（新 SEO 路径） | D0 全过 |
| **W2** | 10/18 | 🟡 中尾 ~40 SKU（含 BK/ED/EV/PO 非窗口族） | W1 探针全绿 |
| **W3** | 10/19 | 🟡 簇 1 stickers 5 兄弟（纯化窗满 7 天）；随 title 解冻批同窗但不同页 | W2 绿 |
| **W4** | 10/20 | 🟡 簇 3 flyers/leaflet 族（FL）+ PO posters 余量（簇 6a/6b 窗满） | — |
| **W5** | 10/21 | 停图日（年賀状真值死线 + 簇 8 残留批，避免同日多变量） | — |
| **W6** | 10/22 | 🔴 解冻批①：CTR 首判通过 → PB/MN/food·folding 换图；年賀状随翻开关带图上线；簇 2 red-packets（窗满 7 天） | CTR 首判无异常 |
| **W7** | 10/23 | 🔴 解冻批②：剩余 + 一周对账（词面零回退核验 + 技术 KPI） | — |
| 随批 | 10/27 | BC 贺卡 6 兄弟 + filename bug 修复（§0.0 裁决后） | K3 裁决 |

**「图随文走」总原则**：未来任何 B1c/内容批，该簇图片**同批更换**——一次页面变化、一次重爬、一次测量，比文图分两次变化更干净。

---

## §4 部署形态决策（已裁定）

- **用新 SEO 路径**（`/images/products/v28_5/<slug>/...webp`），旧 jpg 原位保留不删——旧 URL 永远 200（零死链风险），页面获得文件名 SEO 收益；图片搜索重索引从零开始的顾虑不适用（图片流量=0）。
- **渲染 alt 一律不动**（sku-seo-data imageAlt 保持策展现状）；EXIF 内嵌 alt 仅作文件资产，不进渲染层。
- **入库与体积**：每波图随该波 commit 入 git（public/ 惯例，roll-stickers 同款）；全量 ~110MB 分 6 波均摊（~15-25MB/波）。11 月可评估 CF R2/外部 CDN 减重，不阻塞本计划。
- **每波标配四动作**：products.ts images 数组更新（脚本断言计数）→ `generate-image-sitemap.js` 重生成 → IndexNow → 线上探针（img 200 + 字节数匹配 + sitemap 命中 + PDP 渲染 src 为新路径）。
- **回滚**：每波独立 commit，revert 即回滚；旧图文件始终在位。

## §5 验证门

1. **词面硬约束**：每波后 48h 内，该波 SKU 关联词（基线 = 10-15 档逐词表）零批次归因回退；触线 → 停下一波 + 复盘（但按 §1 证据，预期零触发）。
2. **技术门**：每波探针全绿（200 率 100% / sitemap-image 命中 = 波次 SKU 数 × 3 locale × 4 视图）。
3. **CWV 抽测**：W1 与 W7 各跑一次 3 代表页 LCP 对比（旧 jpg vs 新 webp），确认加载收益兑现。

## §6 K3 待办

| # | 事项 | 死线 |
|---|---|---|
| 1 | 确认本方案波次排期（尤其「图随文走」原则与 BC 族随裁决批） | 10-17 |
| 2 | §0.0 一句话裁决（顺带解锁 BC 族换图 + filename bug 修复） | 10-17 |
| 3 | 年賀状三真值（翻开关 + 带图上线的前提） | 10-21 |
