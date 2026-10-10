# 2026-10-11 图片资产替换影响评估 + en/ja 站点 SEO/AEO/GEO 首页提升执行方案

> 角色：ZprintPro 首席 SEO/AEO/GEO 数据战略参谋
> 触发问题：**是否要把 `zprintpro-en-us-images/v28_5_webp` 的图片全部替换进站？对三站点首页提升目标有多大影响？**
> 数据基座：v28.5 站点就绪图库（逐文件实测）+ 现网 `public/images/products/seedream-webp`（964 张逐名解析）+ `products.ts` images[]（91 条/106 路径）+ 图片 sitemap（974 条 `<image:loc>`）+ `src/generated/sitemap-content.ts` + K3 10-09 指令包 + 10-10/10-11 实测（含 10-10 B1 真源更正）
> 时间锚：**2026-10-11 02:11**；title churn 组冻结至 10/19；10/12 GSC 档未到

---

## 〇、结论先行（BLUF）

1. **不要做「文件名级全量替换」**。理由：现网 964 张图 URL 会被整体改写，而 **图片没有 301 机制** → 已积累的图片搜索索引 + GMC 已审图 + 974 条 image sitemap 全部作废重写，而收益（体积/alt 内嵌）**边际极小**——实测新旧图都在 35–120KB 区间，CWV 无实质改善。
2. **要做「保 URL 的分层补齐 + 定向换字节」**，因为真实增量在**覆盖缺口**而非画质：
   - **17 个 SKU 现网完全无图**，且**与 en/ja 首页目标簇高度重合**（6 张贺卡 SKU = 年賀状/聖誕卡/holiday cards + 名片(c) 承接页的 2 个 SKU；4 个同人 SKU = コミケ 印刷 ja 全站第一词；4 席位卡 + 4 婚礼邀请 = 婚庆簇）。
   - **21 个 SKU 存在「某语言 < 4 张」**，其中 en/ja 缺语言的正是页一/页二目标：**flyers 全簇 7 款、posters-a2（三语全缺）、packaging rigid/tuck-end/gang-run（缺 en+ja）、stickers removable（缺 ja+zh-hk）**。
3. **图片对首页目标的权重定性**：图片是**资格层 + 呈现层**变量（Product rich result 资格、GMC feed 合规、图片搜索入口、本地化一致性），**不是排名层主变量**。所以它**不能单独把词推上首页**，但**缺图会封住页一目标簇的上限**（尤其 Q4 贺卡簇与同人簇）。
4. **en/ja 页一的真正瓶颈仍是 CTR 层**（10-10 已证：live meta 早已带价格钩；CTR 断裂不是 meta 问题）→ 页一方案 = 图片资格补齐（P0）× title 解冻批（10/19）× 深水内链/答案卡。

---

## 一、资产盘点（逐文件实测，双方法复算）

### 1.1 v28_5_webp（站点就绪图库）

| 指标 | 实测值 | 校验方法 |
|---|---|---|
| SKU 目录 | **91 个**（BC-001…WI-006） | `readdir` 逐目录 |
| SKU 图 | **1092 张** = 91 × 12（**3 语言 × 4 视图** hero/detail/variety/multi-angle） | 目录计数 + 命名正则 |
| 语言分布 | en 364 / ja 364 / zh-hk 364（**完全对称**） | 命名解析 |
| hero 图 | **48 张** = 16 类目 × 3 语言，1320×525 | 目录计数 |
| 体积 | **全部 <120KB**：max **119.8KB**、min **35.8KB**、总 **106.5MB** | 我自跑 `Length -gt 120KB` = **0 命中** |
| 尺寸 | SKU 1200×1200 / hero 1320×525 | README + 台账 |
| alt | **内嵌**（EXIF ImageDescription + XMP dc:description） | README |
| 台账 | `final_verification.json`（10-11 01:53）：violations **0**、1092+48、111.7MB | 与我的实测一致 ✅ |
| 口径差（已裁决） | `B_sku_summary.json`（01:50）记 violations **7** / max 127.2KB → 为**修复前快照**；01:53 终验为 0，**且我实测 0 超限** → 以终验为准 | §0.23.2 双方法 |
| 已剔除 | 8 个下架 SKU（BN-005/DJ-002/DJ-003/MN-005/PC-003/PC-004/WI-004/WI-005） | 台账 |

### 1.2 现网资产

| 指标 | 实测值 |
|---|---|
| `public/images/products/seedream-webp` | **964 张 webp**，**76 个 SKU 键**（命名 `zprintpro-<cat>-<prod>-<loc>-<N>.webp`） |
| 每 SKU×语言 张数分布 | 4 张×103 组 / 5 张×55 / 6 张×27 / 3 张×26 / 2 张×13 / 8 张×1 → **覆盖不均** |
| `public/images/hero` | 77 张（含非类目图） |
| `products.ts` `images[]` | **91 条 / 106 路径（均 1.2 张/SKU）**；根分布：`seedream-webp`=10、`/images/v26/greeting-cards`=6、其余为**遗留扁平 `.jpg`** |
| 图片 sitemap | **974 条 `<image:loc>`**；`seedream-webp` 965 条、**`/images/v26/` 0 条** |

### 1.3 三类缺口（本方案的事实基础）

| 类 | 数量 | 明细（与页一目标的关系） |
|---|---|---|
| **A. 现网完全无图** | **17 SKU 键** | 6×greeting-cards（premium/thick-400g/foil/spot-uv/matte/rounded-corner）→ **年賀状・聖誕卡・holiday cards 簇 + 名片(c) 承接页的 2 个 SKU 全在此**；3×japan-doujin（doujinshi-printing/postcard-set/eco-tote-bag）→ **コミケ 印刷（ja 全站第一词 185 imps）**；4×place-cards；4×wedding-invitations |
| **B. 某语言 <4 张** | **21 SKU 键** | **flyers 全簇 7 款**（a4/a5/double-sided/folded/thick-paper/eco/same-day，en+ja 多缺）；**posters-a2（en+ja+zh-hk 全缺 4 视图）**；packaging rigid/tuck-end/gang-run（缺 en+ja）；stickers removable（缺 ja+zh-hk）；calendars desk（缺 ja）；outdoor-posters（缺 en+ja） |
| **C. 孤儿死图** | 2 键 32 张 | `packaging-drawer-slide-gift-box`(15) / `packaging-gift-boxes`(17) —— **不在 91 slug 列表**（products.ts 无此 slug）→ 死图，可清 |

**关键接线事实（决定替换成本）**：
- 图片引用有**两套来源**：① 文件目录约定（组件按 slug/locale 拼路径，如 `RushDeliveryGrid.tsx`）② `products.ts.images[]`（91 条字面路径）。
- **6 个贺卡 SKU 的 `products.ts.images` 指向 `/images/v26/greeting-cards/...`，而图片 sitemap 中 `/images/v26/` 引用为 0 条** → 这 6 个 SKU 目前**既无 seedream 图、也没进图片 sitemap**，处于「数据指向旧路径 + 索引层空缺」的双重空转（Q4 贺卡簇 页一目标的**基础设施缺口**）。
- 现网命名用**数字视图**（`-1`/`-2`…），v28.5 用**语义视图**（`-hero`/`-detail`/`-variety`/`-multi-angle`）→ 直接拷贝 = 全站图 URL 改写。

---

## 二、图片对三站点 SEO / AEO / GEO 的影响机制与真实权重

| # | 机制 | 受影响对象 | 影响量级 | 依据/说明 |
|---|---|---|---|---|
| 1 | **Product rich result 资格** | 91 SKU PDP（三语） | **高（资格层）** | Google Product 结构化数据要求 `image`；无图 SKU 的富结果资格弱 → 影响展示形态，间接影响 CTR 与页一维持 |
| 2 | **GMC / 免费购物列表 feed** | en（us）主战场 | **高（资格层）** | feed 需 image_link + 建议 ≥800px 多图；17 个无图 SKU 在 feed 层残缺（现成脚本 `check-gmc-image-quality-2026-10-06.py`） |
| 3 | **图片搜索入口（Google Images）** | 三语全站 | **中** | 现网 974 条 image sitemap；补 17 SKU×3 语×4 视图 = **最多 +204 条可索引图**，是**本方案最确定的新增曝光入口** |
| 4 | **本地化一致性** | **ja / en 页一相关性** | **中–高** | 现网 21 个 SKU 缺某语言图（en/ja 尤甚）；若某语言图内嵌了**另一种语言的文字**，则构成本地化污染（v27.5 目录存在 `.qa.jpg` 质检件 → 图内含文字是已知事实）。**建议先 OCR 抽检现网 ja/en 首图**，取证后再定 P1 范围 |
| 5 | **CWV / LCP** | 全站 | **低（本批≈0）** | 实测新旧都在 35–120KB → **无实质改善**；故"为 CWV 全量换图"不成立 |
| 6 | **GEO / AI 引用（多模态）** | en/ja | **低–中（加分项）** | v28.5 alt 内嵌 EXIF+XMP → 多模态抓取可读；但 Google 主读 HTML `alt`，故**决定性的是 alt 与图文实体一致性**（Product schema image + hreflang 页 + 本地化 alt 三者对齐） |
| 7 | **URL 变更的负面机制** | 全站 | **高（负面）** | 图片无 301 → 全量换名 = 964 图索引权益清零 + 974 条 sitemap 重写 + GMC 复审 + 外链（Pinterest/比价站）断链 |

**一句话权重结论**：图片是**「资格 + 入口 + 一致性」三件事**，量大但**不直接给排名**；**缺图的 SKU 会被封住上限**，所以对「页一目标簇」应采取**补齐式**而非**替换式**。

---

## 三、「是否全量替换」决策 + 三层执行方案

### 3.1 决策：**否（不做全量换名）**，改三层（保 URL）

| 层 | 动作 | 数量 | URL 影响 | 为什么 |
|---|---|---|---|---|
| **P0 补缺**（最高优先） | 为 **17 个无图 SKU** 新增 v28.5 图（**en/ja 优先**，每 SKU 4 视图 × 1–3 语言） | 新增 ≤204 张 | **纯新增**（无改写） | 直接给 Q4 簇（贺卡/同人/婚庆）+ 名片承接页补上资格层 |
| **P1 补齐** | 21 个薄覆盖 SKU 的**缺语言**补到 4 视图（沿用现网数字命名，接续现有编号） | 新增约 60–80 张 | 纯新增 | 服务 en/ja 页一/页二目标（flyers 全簇 / a2-posters / packaging 三款） |
| **P2 原地换字节**（可选、低优先） | 存量 964 张**同文件名**覆盖为 v28.5 对应视图字节 | 964 张（可只做 LCP 首图） | **零** | 收益仅体积/alt 内嵌；建议**只对每页首图（hero）做**，全量做风险/收益比不划算 |
| **hero 专项** | 16 类目 hero：**12 类目同 URL 换字节**；**4 类目（greeting-card / japan-doujin / place-cards / wedding-invitations）站内暂无图位 → 先建图位再上** | 12 换 + 4 建位 | 12 零影响 / 4 新增 | 这 4 个恰是 Q4/婚庆/同人簇首页 hero |
| **清理** | 孤儿死图 2 键 32 张 + `products.ts` 遗留扁平 `.jpg` 引用校正 | 32 删 + 若干改 | 删死图零影响 | 消 404 风险与目录噪声 |

### 3.2 必配同步（缺一即埋雷）

1. **图片 sitemap 重生成**（`scripts/generate-image-sitemap.js`）+ **IndexNow ping 三语**
2. **GMC feed 复核**：`scripts/check-gmc-image-quality-2026-10-06.py`（补图后必跑）
3. **Product schema image 校验**：新增图必须进 PDP 的 `image` 数组（三语），否则补了图也不进富结果
4. **接线统一**：决定「以目录为源」还是「以 `products.ts.images[]` 为源」——当前**两套并存**且 6 个贺卡 SKU 指向旧 v26 路径，是本次缺口的根因
5. **alt 三语**：沿用 `sku-seo-data.ts` 的 imageAlt（三语），新增图不得留空 alt

### 3.3 风险与红线

- title churn 冻结至 **10/19**：本方案**零 title 改动**，只动图片/接线/sitemap
- 全量换名（P2 若采用改名而非覆盖）= **禁止**（图片无 301）
- 图片不得含**错语言文字**（本地化红线）；v28.5 已按语言分版，**必须严格按 locale 投放**
- §0.25 攒批 push：图片属二进制资产，**public/images 变更随 1 次 push**，勿多次触发 CF 构建

---

## 四、en 站（us）首页提升执行方案

> 目标簇：页一守成（small batch sticker/label）· 页二冲页一（doujinshi / large envelopes / china catalog）· Q4 贺卡（corporate holiday cards / christmas cards）· GEO 引用面板

| 优先级 | 动作 | 落点 | 目标词（基线） | 图片层联动 | 验证 |
|---|---|---|---|---|---|
| **E-P0** | **17 无图 SKU 中 en 侧补图**（4 视图）| `public/images/products/seedream-webp` + PDP image 数组 | doujinshi printing 11.2 / large envelopes 13.8 / holiday cards 0→展示 | ⭐ 直接补资格层 | 10/16 GSC：0→有展示；Product 富结果测试 |
| **E-P0** | envelopes.en live meta 价钩**已修**（10-10） | `src/lib/seo.ts` | large envelopes 13.8 | — | ✅ 已上线（探针 5/5） |
| **E-P0** | GMC feed 图片质量跑批 + 缺图 SKU 修补 | `scripts/check-gmc-image-quality` | 购物/免费列表曝光 | ⭐ | feed 缺图数 0 |
| **E-P1** | **flyers 全簇 7 款缺 en 图补齐** | 同上 | same day flyers / print flyers same day（页二） | ⭐ | 10/19 GSC 位次 |
| **E-P1** | a2-posters 三语 4 视图补齐 | 同上 | a2 poster（28d 30.9） | ⭐ | 同上 |
| **E-P1** | 深水收编：label printing 簇答案卡 + food packaging FAQ | conversion/category 块 | small batch label 42im / food packaging 20im | — | 10/19 |
| **E-P2（10/19 解冻后）** | title 批：wholesale saddle stitch 57 当量 / same day flyers 55 当量 / transparent-stickers 价钩 / TRIM catalog-china 77→56 | `sku-seo-data.ts` / seo.ts | 页一/页二词 | — | 11/1 月度验收 |
| **E-P3** | GEO 深化：事实对比面板扩到 2–3 篇（现状 hong-kong-printing-guide 内 MOO/Vistaprint 面板） | blog-data/en | evaluate the printing services company | 图-文实体对齐 | AI Overview 引用抽测 |

---

## 五、ja 站首页提升执行方案

| 优先级 | 动作 | 落点 | 目标词（基线） | 图片层联动 | 验证 |
|---|---|---|---|---|---|
| **J-P0** | **17 无图 SKU 中 ja 侧补图**（贺卡 6 + 同人 3–4） | 同上 | コミケ 印刷 20.8（185im 全站第一）/ 年賀状 0→展示 | ⭐ **本批最高杠杆** | 10/16 GSC |
| **J-P0** | 年賀状承接段已上线（10-09 A1） | `category-seo-content.ts` ja | 年賀状印刷 / 2027年賀状 | 贺卡图补 = 双保险 | ✅ 已验（探针命中） |
| **J-P1** | **flyers ja 图覆盖补齐**（a4/a5/double/thick/same-day） | 图片层 | 特急印刷 激安 100im c0 / チラシ印刷 即日 | ⭐ | 10/19 |
| **J-P1** | a2 ポスター / クリアポスター 图补齐 | 图片层 | a2 ポスター 激安 20im / a2 クリアポスター 36.0 | ⭐ | 10/19 |
| **J-P1** | クラフト紙 パッケージ 独立 section（料金表已入 FAQ） | packaging ja | クラフト紙 パッケージ 106im | packaging 图补齐 | 10/19 |
| **J-P2（10/19 后）** | ja title 批：flyers 両面カラー词面 + rush ja 59→合规带 | sku-seo-data / seo.ts | 両面カラー印刷 35.7 | — | 11/1 |
| **J-P2** | **flyers ja title 的「100枚から」→「10枚から」**（本批未动，title 冻结） | `category-conversion-blocks.ts` title | MOQ 一致性 | — | 10/19 解冻批 |
| **J-P3** | コミケ 新刊 時短チェックリスト段（10-09 已上）+ 冬季年賀状・ポストカード锚（10-09 已上） | blog-data/ja | コミケ / 年賀状 | 同人图补齐 | 11/1 |

---

## 六、验证矩阵

| 窗口 | 判据 | 口径 |
|---|---|---|
| **10/12 档** | 年賀状 / holiday cards / christmas cards **0→有展示**（盲开纪律，不看位次）；doujinshi printing ≤12；large envelopes ≤13；CTR c 值（small batch sticker）0→≥1 | GSC 28d + 7d（**补 3mo 窗**） |
| **10/16 档** | 补图 SKU 的 **Product 富结果测试通过率** + **图片搜索展现**首现；GMC feed 缺图 0 | Rich Results Test + GSC 图片搜索 + feed 报告 |
| **10/19 档** | title 解冻批执行后：页一 zero-click 池 词数 ≤3；ja 全站展示 ≥2,500/28d | GSC |
| **11/1（月度）** | en 页二冲页一 ≥2 词进前 10；ja 年賀状 pos ≤40；dead 图 0、无图 SKU 0 | GSC + 图片 sitemap 审计 |

**判读纪律（继承 10-08/10-09）**：① 盲开词先看有无展示 ② churn 组不比基线差即算对冲成功 ③ CTR c 值升为一等判据（页一词 c=0 连续两档 → 转呈现层方案）④ 图片层只看「资格/入口/一致性」，不把图片当排名归因。

---

## 七、红线与数据来源

**红线**
- 零 title 改动（churn 冻结至 10/19）；图片投放严格按 locale（错语言文字 = 本地化红线）
- 不做图片改名式全量替换（无 301）
- GSC 后台黑话不入客户可见内容（§0.23.1）；图片 alt 不得含 GSC 语境
- 价格/MOQ 一律 `products.ts` 真值；本方案未新增任何未经核实的数字

**数据来源**
```
数据来源:
- v28_5_webp 逐文件实测 (2026-10-11 02:0x): 1140 webp / 91 SKU 目录 / 1092 SKU 图 + 48 hero /
  max 119.8KB min 35.8KB 总 106.5MB / 超 120KB 0 命中（脚本 .hermes/tmp/image-swap-recon-20261011.cjs）
- v28_5_webp/_ledger/final_verification.json (10-11 01:53, violations 0) + B_sku_summary.json (01:50, 修复前快照)
- 现网 public/images/products/seedream-webp 964 张命名解析 + public/images/hero 77 张（同上脚本）
- products.ts images[] 91 条 / 106 路径（正则提取）
- src/generated/sitemap-content.ts 974 条 <image:loc>（seedream 965 / v26 0）
- K3 10-09 指令包 docs/2026-10-09-k3-brain-week-plan-and-lane-recustomization.md
- 10-10 B1 实测更正 DELIVERY/2026-10-10-ctr-meta-price-hook-batch.md §五
- 缺口量化脚本 .hermes/tmp/image-gap-20261011.cjs
```
