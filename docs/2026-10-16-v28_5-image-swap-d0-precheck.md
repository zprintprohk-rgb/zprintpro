# v28_5 图库换图 · D0 预检报告（2026-10-16）

> **任务**: 按 `docs/2026-10-16-image-swap-risk-and-one-week-plan.md` §3 D0 预检三项执行：① 存活白名单∩映射（剔退役/荧光）② 部署脚本 ③ EXIF alt 声明核对
> **执行**: AutoClaw 主会话（换图车道 D0）· 2026-10-16 11:41–13:5x
> **数据来源**（§0.23 强制行）:
> - 图库: `zprintpro-en-us-images/v28_5_webp/_ledger/B_sku_consolidation.csv`（1092 行 = 91 SKU × 12）+ 目录直读扫描（双方法）
> - 站内: `src/data/products.ts`（products 数组区域 slug 提取 + sku_code 配对双方法）、`src/lib/product-image.ts`、`src/app/[locale]/product/[slug]/page.tsx`、`src/middleware.ts` L145-155（RETIRED_PRODUCT_REDIRECTS 9 键实录）
> - GSC: `GSC数据/28天三站点汇总数据...2026-10-15.xlsx` + 香港/美国/日本站点 28 天三份单站档（计划引用数据源，逐 sheet 解析）
> - 簇窗口: `.hermes/logs/b1c-queue-progress.json`（10/16 12:1x 版，簇 1-8 全 DONE 日期）+ `SESSION_LOCK.md` + `docs/2026-10-16-two-week-execution-plan-v2.md`
> - 先例: Batch B `4c4cacbb`(10-12) / 利是封换血 `06590c10`(10-13) / roll-stickers `f9935e4b`+`5cc341b4`(10-12)
> - 产物: `.hermes/geo/v28_5-deploy-manifest.json`（机器可读波次清单）、`v28_5-gsc-tiers.json`、`v28_5-appearance-verify.json`、`v28_5-query-baseline-2026-10-15.json`、`v28_5-lib-inventory` 分析底稿（台账直读）
> - 校准状态: 已校准（2026-10-16 一手直读 + 双方法交叉）

---

## §0 一句话结论

**D0 三项全部完成、全绿**：91 目录 → **80 个可部署**（10 个波次逐一定位）、**9 个退役排除**（与 middleware 301 逐一核对）、**2 个建议排除**（10-12 已 byte-identical 上线）；部署脚本双件落库并 **10 波 dry-run 全部 PASS**；EXIF alt 声明普查完成并登记（**不采纳进渲染层**）。唯一需要 K3 拍板的是 §8 的 5 个确认项（均不阻塞 W1 明天开工，除确认 WI-001/003 排除口径一项建议在 W1 前给出）。

---

## §1 预检门①：存活白名单 ∩ 映射

### 1.1 图库体检（91 SKU 目录 + hero）

| 检查项 | 结果 |
|---|---|
| SKU 目录数 | **91**（+`hero/` 48 张 + `_ledger/`）|
| 文件总数 | **1140** = 91×12 + 48（直读统计与 README/计划口径一致）|
| 每目录结构 | 全部 12 张 = en/ja/zh-hk × hero/detail/variety/multi-angle（3 语 4 视图零缺失）|
| 体积 | 全部 <120KB（台账 kb 列 + 直读双方法；hero 最大 119KB）|
| 命名 | `zprintpro-<类目>-<产品>-<语言>-<视图>.webp` 全合规，0 异常 |
| final_verification | 违规 0（README 口径）|

### 1.2 存活 slug 白名单（83 个，双方法核验）

- **提取方法修正**: 接线盘点初版按全文 `slug:` 正则提取得 82（漏掉 `doujinshi-printing`——该产品块缩进特殊）或 99（混入 L122-142 `categories` 数组的 16 个类目 slug）。终版方法 = **products 数组区域切片提取**（`export const products` → 区域内首个 `\n];`），得 **83 个产品 slug**，与区域内存量 `sku_code` 配对 **83/83 全配对**（双方法一致）。
- 类目数组中的 `place-cards` / `wedding-invitations` / `japan-doujin` 等是**类目 slug**，不是产品 slug，已排除在白名单外。

### 1.3 目录 → slug 映射（文件名后缀最长匹配 + sku_code 配对）

91 目录逐一映射，结果四类：

| 类别 | 数量 | 明细 |
|---|---|---|
| ✅ 可部署（分波） | **80** | 见 §3 波次清单 |
| ⛔ 退役排除（不部署不入库） | **9** | PC-001→wedding-place-cards · PC-002→drink-tokens · PC-005→cafe-table-cards · PC-006→wedding-seating-charts · WI-002→save-the-date-cards · WI-006→wedding-suite-bundle · DJ-004→postcard-set · DJ-005→eco-tote-bag · ST-008→fluorescent-stickers（9 个 slug 全部与 `middleware.ts` RETIRED_PRODUCT_REDIRECTS 9 键逐一吻合；三方法核验 0 存活）|
| ⚠️ 建议排除（K3 可推翻） | **2** | WI-001→foil-wedding-invitations · WI-003→wedding-thank-you-cards：**Batch B（10-12）已把两 SKU 的 12+12 张同名 seedream-webp 入库上线**，字节比对 `byte_identical`（与 roll-stickers「已单独部署不在本库」同理）。重新部署到新路径增益≈0，反而制造 24 个 URL churn。**若 K3 要全站路径统一为 `/v28_5/`，可在 W7 重估** |
| 🔁 保留但降级为可选 | 6 | RP-001~006（红包 6 兄弟）：**10-13 已原位同名换血**（72 文件，EXIF alt 已重注对齐 products.ts seoAlt，比本库 stock alt 更优）。保留在 W6（计划原排），但性质是「可选新路径升级」而非「换图」——当前文件名本就是 SEO 关键词命名，增益有限，见 §8-K2 |

计划 §2.1 的两个预判全部证实：**PC 族 4/4 目录对应已退役 SKU**；**WI 族 2/4 退役 + 2/4 已部署**。ST 族逐目录对 slug 完成：ST-001 waterproof / 002 transparent / 003 removable / 004 small-batch / 005 die-cut / 006 foil / 007 security / **008 fluorescent（退役）** / 009 fruit-food-label。

`hero/` 48 张：v28.6 批（10-11）已上线 48 张无角标 hero，本目录 hero/ 为其源拷贝，**本计划无动作**（4 个「站点暂无图位」类目——greeting-card/japan-doujin/place-cards/wedding-invitations——维持挂账，与母页 SKU 新建议题绑定，本批不动）。

---

## §2 GSC 分层与口径核验（三色分级的数据基础）

### 2.1 双方法口径对账（重要）

| 口径 | 文件 | a2-posters 例 | 结论 |
|---|---|---|---|
| 三站汇总档「网页」sheet | `28天三站点汇总数据...xlsx` | 1,340 | **不是计划口径**（含属性级汇总放大，≈2.7×）|
| **三单站 28d 档合计**（香港+美国+日本） | 3 份单站档求和 | **516** | **= 计划口径** |
| 计划 §2.2 数字 | — | 516 | — |

**独立解析将计划 top10 十个数字全部逐字复现（10/10 MATCH：516/331/242/205/186/186/184/178/161/155）**——计划 §2.2 的分层基础成立，波次分级直接采用该口径（manifest 字段 `gsc.imps` = per_site_sum）。

### 2.2 计数对照（如实报告差异）

| 指标 | 计划 §2.2 | 本机实测（83 存活 slug，单站合计口径） |
|---|---|---|
| 有展示 PDP | 84 | **77** |
| imps<5 长尾 | 16 | **14** |
| 零展示 | ~7 | **6** |
| mid 5-100 / head >100 | — | 49 / 14 |

差异原因：计划按 91 目录（含已退役 URL 的历史 GSC 行）计，本表按 83 存活 slug 计；退役 9 slug 无存活 PDP，不影响任何波次决策。

### 2.3 「零图片包」论断验证（§1 事实 1 的复核）

「搜索结果呈现」sheet 四份文件全部解析：**任何一份都没有图片包/图片搜索行**（`image_rows_present = []`），定性结论成立。产品摘要展示数存在三种口径（三站档 8,373 / 三单站合计 7,446 / 计划引用 5,861）——计划引用口径无法从现有 4 份文件完全复现（可能为导出时点差异），**不影响「零图片搜索呈现」这一决策性结论**，如实登记。

### 2.4 逐词基线（§5 词面硬约束的弹药）

4 份档的「查询数」sheet 已提取落盘：`.hermes/geo/v28_5-query-baseline-2026-10-15.json`（threesite 1,000 条 / zh-hk 553 / en 525 / ja 166）。每波后 48h 词面对账直接与该文件 diff，即计划要求的「基线 = 10-15 档逐词表」。

---

## §3 波次清单（终版，80 可部署 + 全部偏差标注）

| 波 | 日 | SKU 数 | imps 合计 | 内容 | 与计划的偏差 |
|---|---|---|---|---|---|
| **CL-1017** | 10/17 六 | 6 | 296 | 簇 7 月历 6 兄弟，图随文（簇 7 内容 10-16 05:0x 已上线）| 无（按计划「10/17 随簇 7」）|
| **W1-1017** | 10/17 六 | 5 | 11 | 零展示+长尾：BK-005 spiral-notebooks(3) · FL-005 thick-paper-flyers(3) · PKG-007 magnetic-closure-gift-box(2) · PKG-015 tuck-end-boxes(3) · PKG-016 gang-run-card-boxes(0) | **偏差 #1**: 计划估 ~23，实际 5——差额 = 退役 9（无 PDP 无 GSC 行）+ 窗口族占用的零/长尾（RP tails ×5、BC ×2、MN-004、PO-004 等，窗口优先于分级）+ 已部署 2 |
| **W2-1018** | 10/18 日 | 33 | 2,042 | 中尾+头部非窗口族：BK×4（catalog 184 / saddle 331 / perfect 17 / hardcover 8）· BN×4（vehicle 138…）· ED×5（exercise 51 / certificates 25…）· EV×4（large 84…）· FL 非簇3 ×6（a4 91 / a5 32 / double 75 / eco 22 / same-day 107）· PK×3（cosmetic 23 / mailer 20 / rigid 5）· PKG 非门控 ×7（kraft-box 155 / electronics 81 / corrugated 38…）· ST 非簇1 ×4（small-batch 186 / removable 87 / die-cut 34 / fruit-food 21）| 无（计划「含 BK/ED/EV/PO 非窗口族」）|
| **W3-1019** | 10/19 一 | 4 | 320 | 簇 1 贴纸 4 兄弟（簇窗 10-12 09:05 +7d = 10/19 整）：waterproof 151 / transparent 110 / foil 44 / security 15 | 无 |
| **W4-1020** | 10/20 二 | 1 | 25 | FL-004 folded-leaflets（簇 3 窗 10-14 +6d，落在 5-7 天带内）| 无 |
| **W5-1021** | 10/21 三 | 2 | 694 | PO-001 a2(516) / PO-002 a1(178)，簇 6a（10-15 23:35 完成）| **偏差 #2a**: 计划 W4 10/20 → 后移 1 天。10/20 全日执行会早于「+5d」窗（10-20 23:35 才满 5 天），依计划 §2.3 自己的 5-7 天窗规校准 |
| **W6-1022** | 10/22 四 | 6 | 32 | RP 簇 2 红包 6 兄弟（10-15 09:20 +7d = 10/22 整；性质=可选路径升级，§8-K2）| 无（按计划）|
| **W6-1022-CTR-gated** | 10/22 四 | 12 | 682 | CTR 批关联族解冻批（**10/22 首判通过才执行**）：PB×6（kraft 68 / eco 63 / handle 186 / large 60 / white-card 7 / gift 21）· MN×4（pvc 41 / laminated 54 / hardcover 9 / drink 3）· PKG food-boxes 161 / folding 9 | 无（簇 5 窗 10-15 21:17 +7d = 10/22 与 CTR 解冻同日对齐）|
| **W7-1023** | 10/23 五 | 4 | 91 | PO-003 outdoor(26，簇 8 当日 12:10 完成) / PO-004 display(3) / PO-005 art(18) / PO-006 adhesive(44)，簇 6b | **偏差 #2b**: 计划 W4 10/20 → 后移。6b 内容 10-16 03:40 才完成、簇 8 outdoor 10-16 12:10 才完成，10/20 会撞 3.5-4 天幼窗，+7d = 10/23 |
| **C107-1024** | 10/24 六 | 1 | 242 | DJ-001 doujinshi-printing，随 C107 专题（10/24 ja / 10/25 en）**图随文同批** | **偏差 #3**（新增）: 计划未列。GSC head 级 242 imps（ja 186），现役图还是 `/images/japan/*.jpg` 旧族——全库换图收益最大的 SKU 反而该最晚动：与 C107 专题一次变化一次测量 |
| **BC-1027** | 10/27 一 | 6 | 3 | 贺卡 6 兄弟（premium 2 / foil-gc 1 / 其余 0），随 §0.0 裁决批 | 无（按计划；**随批修 seoImages.filename en/ja stickers 残留 bug ×6**，已核实 6/6 全中，zh-hk 为 greeting-cards 命名、en/ja 为 stickers 命名）|
| 排除 | — | 9+2 | — | 退役 9 + 已部署建议排除 2（WI-001/WI-003）| 见 §1.3 |

**幂等键**: 波次归属以 `.hermes/geo/v28_5-deploy-manifest.json` 为准（built_at 2026-10-16，可由 `node scripts/v28_5-build-manifest.mjs` 确定性重建）；任何簇窗口变化（如 CTR 首判提前/推迟）只需改 builder 的 CLUSTERS 表重建 manifest，脚本不硬编码成员。

---

## §4 部署脚本（D0 ②，已落库）

**两件**：
- `scripts/v28_5-build-manifest.mjs` — 映射/白名单/GSC 分层/簇窗口/字节比对 → manifest（确定性重建）
- `scripts/v28_5-image-deploy.mjs` — `list` / `deploy --wave=X [--dry-run]` / `probe --wave=X` / `indexnow --wave=X`

**安全设计（§12 三件套 + 并发闸）**：
1. **计数断言**：复制 `copied == N×12`、补丁 `patched == plan - skipped`，任一不符 **先于写盘中止**；
2. **形状断言**：补丁后回读每个 slug 的 `imagesByLocale` 必须 = 3 locale × 4 路径、hero 首位、全部以 `/images/products/v28_5/<slug>/` 开头；legacy `images` = 1 条 zh-hk hero；sitemap 断言 = **波次 URL 全命中（3 页 + 12 图 ×N）且非波次既有 image URL 零丢失**（生成器既有缺口不阻塞波次，但不得因本批回退）；
3. **备份**：products.ts 改前快照 + wave-plan.json 落 `.hermes/_bak-v28_5-<wave>-<ts>/`；写后 BOM + utf8 双校验，异常自动还原；
4. **真部署前置 git 闸**：`products.ts` 有未提交改动即拒绝（dry-run 只读、豁免但打印提示）；目标目录已存在文件即拒绝（`--force` 才覆盖）；
5. **回滚**：`git checkout src/data/products.ts public/sitemap-image.xml` + 删 `public/images/products/v28_5/<slug>/`——旧图文件自始至终不删（计划 §4 形态）。

**集成形态（按先例裁定）**：更新 `imagesByLocale`（3×4）同时驱动 v9 PDP gallery、ProductCard 列表卡、merchant-feed；legacy `images[]` 同批改指新 zh-hk hero（Batch B/利是封批同款）；`seoImages` 块本波**一律不动**（og:image 旧图仍 200），BC 批随裁决修 filename bug；渲染 alt 一律不动（`getProductImageAlt` 读 sku-seo-data，与文件解耦，接线盘点已复核）。

**dry-run 结果**：10 个波次（W1/W2/W3/W4/W5/W6/W6-gated/W7/CL/C107）**全部 `validation PASS` + `DRY-RUN OK`**；BC-1027 按设计拒绝（verdict=defer-bc-ruling，裁决前不可部署）。

**IndexNow 路径**：auto 脚本按 sitemap diff 提交，换图不改页面 URL 会判 `no_new_urls`——按 wiring 盘点结论走手动 POST（同 key/keyLocation，`indexnow --wave=X` 子命令提交波次 PDP ×3 locale，key 只读不落日志），与 46e729ba/3fab203a 先例同路。

**已登记风险（不阻塞，建议单独排期）**：`generate-image-sitemap.js` 对 2 空格 IBL 块的收口正则脆弱——当前 sitemap-image.xml 与 products.ts 既有缺口（image:loc 987 vs 预期 ~1064；**BC 6 兄弟 + foil-wedding-invitations + wedding-thank-you-cards 共 8 页整页缺席**）。本波断言已保证不回归，但 8 页缺口是真实 SEO 覆盖损失，建议独立小批修复（修生成器 + 一次性 regen）。

---

## §5 EXIF alt 声明核对（D0 ③，仅登记不采纳）

台账 `alt_text` 列（273 个互异值 = 91 目录 × 3 语）全量普查：

| 声明类 | 命中 | 内容 |
|---|---|---|
| ISO 9001 | **91/91 目录** | 每条 alt 尾部均含 `ISO 9001 ZprintPro sample` |
| MOQ | **91/91 目录** | 均为 `100 pieces minimum`（一刀切） |
| 品牌 | 91/91 | ZprintPro（en/ja 语境）|
| SLA/设备/证书号/客户数 | 0 / 0 / 0 / 0 | 无海德堡类、无 C\d{6} |

**与站内真值的冲突例证**（若采纳即成编造）：custom-calendars `minQuantity=1`（簇 7 价格审计 6/6 实证 HK$3-8/本 minQ1）、a2-posters `minQuantity=10`（簇 6a 审计）、small-batch-stickers A4 起印无 100 MOQ——三者 EXIF alt 均写死 "100 pieces minimum"。

**裁定（按计划 §3-D0-③）**：本波**不采纳** EXIF 内嵌 alt 进渲染层；渲染 alt 维持 sku-seo-data 策展（与文件解耦，信号零变化）。未来任何「采纳内嵌 alt」提案，必须逐 SKU 过 products.ts 真值门（MOQ=minQuantity、ISO 9001 需 K3 拍板来源，per §0.31 门童 #1 / §0.23）——本登记即为该门的第一手证据。

---

## §6 并发状态与本会话边界（§0.35.7）

- 开工时 SESSION_LOCK=已释放（05:3x）、src/ 全净、lane.lock 不存在。
- 执行期间**并发会话活跃**：B1c 簇 8（packaging faqSchema ×11）11:4x 持锁 12:1x 完成；截至本报告时点工作区仍有 `M src/components/layout/Footer.tsx`、`M src/data/products.ts`、`?? src/data/copy-fingerprints.ts` 等**他人未提交改动**。
- **本会话零 src/ 写入**（全部产出 = scripts/ ×2 + 本报告 + SESSION_LOCK 登记 + .hermes/ 分析产物）；提交仅 add 本会话文件，**不代持不代提交他人改动**。
- W1 真实执行的前置 = 双条件（§0.35.7）：① src/ 收尾信号满足 ② 对端 ≥15min 静默——脚本 git 闸会自动执行第①项机器判定。

---

## §7 W1 runbook（10/17，前置：src/ 双条件满足 + K3 未否决本报告）

```powershell
# 1) 重建/核对 manifest（可选，簇窗口无变化可跳过）
node scripts/v28_5-build-manifest.mjs
node scripts/v28_5-image-deploy.mjs list --wave=W1-1017
# 2) 部署 W1（复制 60 张 + products.ts IBL/legacy 补丁 + sitemap regen + 断言）
node scripts/v28_5-image-deploy.mjs deploy --wave=W1-1017
# 3) 三闸门
node scripts/check-encoding.js --fix ; npx tsc --noEmit   # 增量 0
# 4) commit（只 add 本批路径）
git add public/images/products/v28_5 src/data/products.ts public/sitemap-image.xml
git commit -m "images(v28_5 W1): 5 zero/tail SKUs swap (spiral-notebooks/thick-paper-flyers/magnetic-closure-gift-box/tuck-end-boxes/gang-run-card-boxes)"
# 5) push（gate 与 push 分两次调用, gate 非 0 终止——§0.25.2 铁律）
node scripts/push-gate-check.mjs
git push
# 6) 验收
node scripts/verify-deploy.mjs
node scripts/v28_5-image-deploy.mjs probe --wave=W1-1017
node scripts/v28_5-image-deploy.mjs indexnow --wave=W1-1017
# 7) 48h 后：词面对账 .hermes/geo/v28_5-query-baseline-2026-10-15.json diff
```

W1 仅 5 SKU / 60 张 / ~5MB——比计划估的 ~23 SKU 轻得多，首波最小化是**有意为之**（管线首跑 + 词面验证窗口最小化），W2 起放量。

---

## §8 K3 待办 / 请拍板

| # | 事项 | 死线 | 默认处理（若不回复）|
|---|---|---|---|
| K1 | **WI-001/WI-003 排除确认**（Batch B 已 byte-identical 上线）| W1 前 | 按建议排除；要路径统一则排 W7 重估 |
| K2 | RP 6 兄弟 W6 是否执行「可选路径升级」（像素 10-13 已上线，增益=文件名路径）| 10/22 前 | 保留 W6 槽位，届时按当日窗口再定 |
| K3 | 本报告偏差 #1-#3 确认（W1=5 / PO 后移 10-21·10-23 / DJ-001 随 C107）| 10/19 前 | 按本报告执行 |
| K4 | seoImages（og:image）是否随波次更新为 v28_5 路径 | 10/22 前 | 本波不动（旧图 200 零死链），BC 批时一并定 |
| K5 | sitemap 生成器 8 页缺口修复排期（§4 已登记）| 10/30 前 | 登记待派 |
| K6 | §0.0 一句话裁决（解锁 BC 批 + filename bug ×6）| 10-17（计划 §6 原有）| — |
| K7 | 年賀状三真值（10-22 翻开关前提）| 10-21（计划 §6 原有）| — |

---

**报告口径自查（§0.33）**：产品数 = 83（products 数组区域提取，sku_code 配对 83/83 双方法）；目录数 = 91/80/9/2（台账 + 直读双方法）；GSC 数字 = 三单站 28d 档合计口径（计划 top10 10/10 复现）；簇窗口 = b1c-queue-progress.json 完成时间戳一手。校准日期 2026-10-16 13:5x。
