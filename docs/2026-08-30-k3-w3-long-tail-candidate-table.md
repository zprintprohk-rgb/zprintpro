# K3 8/30 13 品类 + 10 specs 长尾候选表 (per K3 「标题长尾 3 筛选 + 分层布局」SOP)

> **来源**: K3 8/30 05:00 拍板 (8/30 turn 指令)
> **落地时间**: 2026-08-30 05:40 M3 穷尽
> **数据基础**: gsc_data.csv 463 rows 8/28 实证 + gsc_page_query.csv 2294 rows 8/26 实证
> **应用范围**: zprintpro 全站 13 品类 + 10 specs, 后续每页 title 改写必查此表
> **筛选规则** (K3 拍板, 3 条全过才进 title):
>   1. **GSC 有展示实证** (需求已验证, 不赌未验证的词) - per §0.23 数据诚信
>   2. **T1/T2 采购意图** (带钱, per K3 12:37 拍板 三维词价值分层)
>   3. **与主词同簇** (强化主词权重, 不稀释)
> **分层布局** (K3 拍板):
>   - title 1 个长尾 (50-60 字符内) ← 本表 1 列
>   - meta description 2-3 长尾 ← 本表 2 列
>   - H1/H2/正文 3-5 长尾 ← 培育需求
>   - FAQ 问句型长尾 ← 提升长尾排名
>   - keywords 全量兜底

---

## A. 13 品类长尾候选 (9 主营 + 4 业务子类目豁免)

### A.1 主营 9 品类 (V3.5 词分层驱动)

| # | 品类 slug | 主词 (zh-hk) | GSC 实证 (8/28) | 该页进 title 的唯一长尾 | meta description 长尾 | T1/T2 |
|---|-----------|---------------|----------------|------------------------|---------------------|-------|
| 1 | **stickers** | 貼紙 | small batch sticker printing 20 imp pos 7.15 + 貼紙 16 imp pos 43.56 | **小批量貼紙印刷** | 防水貼紙, 透明貼紙, 乙烯貼紙, 自訂貼紙 | T1 |
| 2 | **transparent-stickers** | 透明貼紙 | 透明貼 13 imp pos 25.77 + 透明貼紙 7 imp pos 27.71 | **透明貼紙印刷** | 防水透明貼, 自訂透明貼, 小批量透明 | T1 |
| 3 | **labels** | 標籤 | small batch label printing 20 imp pos 27.85 + small quantity 6 imp pos 58.17 | **小批量標籤印刷** | 防水標籤, 自黏標籤, 食品標籤, 化妝品標籤 | T1 |
| 4 | **packaging-boxes** | 包裝盒 | 紙盒印刷 14 imp pos 36 + 紙盒訂製 14 imp pos 43.64 + 包裝盒訂製 11 imp pos 29.27 | **紙盒訂製** | 紙盒印刷, 包裝盒訂製, 禮盒訂製, 化妝品盒 | T1 |
| 5 | **paper-bags** | 紙袋 | 紙袋 3 imp pos 7.67 (低) | **牛皮紙袋訂製** | 紙袋印刷, 訂做紙袋, 環保紙袋, 購物袋 | T1 |
| 6 | **flyers** | 宣傳單張 | 宣傳單張 27 imp pos 37.04 + 傳單 1 imp | **A5 宣傳單張印刷** | A4 傳單, 雙面傳單, 摺頁傳單, 彩色傳單 | T1 |
| 7 | **posters** | 海報 | 海報 4 imp (8/28 实证偏少, 8/26 gsc_page 28 天 1053 imp) | **A2 海報印刷** | A1 海報, A3 海報, 展覽海報, 即日海報 | T1 |
| 8 | **brochures** | 摺頁 | 印刷 1 imp pos 78 (低) | **摺頁印刷** | 三摺頁, 雙摺頁, 公司摺頁, 產品摺頁 | T1 |
| 9 | **booklets** | 騎馬釘書刊 | saddle stitch booklet 11 imp pos 88.55 + saddle stitch booklets 8 imp pos 83.88 + 無線綴じ 2 imp pos 62 | **騎馬釘小冊子印刷** | 無線綴じ, 膠裝書刊, 食譜書, 公司年報 | T1 |

### A.2 业务子类目豁免 4 类目 (§11 K3 8/17 战略修正, 4 类目已建, 豁免主营误用禁)

| # | 品类 slug | 主词 (zh-hk) | GSC 实证 (8/28) | 该页进 title 的唯一长尾 | meta description 长尾 | T1/T2 |
|---|-----------|---------------|----------------|------------------------|---------------------|-------|
| 10 | **greeting-cards** | 賀卡 | greeting card printing with gold foil 1 imp pos 46 + グリーティングカード 1 imp pos 26 | **燙金賀卡印刷** (K3 截图实证 6 SKU) | 高級賀卡, 聖誕卡, 新年卡, 婚禮感謝卡 | T2 (豁免) |
| 11 | **wedding-invitations** | 喜帖 | (GSC 实证 0, K3 截图 6 SKU 实证) | **燙金喜帖印刷** (K3 截图实证 6 SKU) | Save the Date, 婚禮感謝卡, 婚禮節目單, 婚禮菜單卡 | T2 (豁免) |
| 12 | **place-cards** | 枱卡 | (GSC 实证 0, K3 截图 6 SKU 实证) | **婚宴枱卡印刷** (K3 截图实证 6 SKU) | 酒水牌, 座位卡, 名牌卡, 餐廳枱卡 | T2 (豁免) |
| 13 | **business-cards** | 商務咭片 (308 → greeting-cards) | (GSC 实证 0, 重定向) | N/A (已 308 重定向) | N/A | N/A (豁免) |

---

## B. 10 specs 长尾候选 (V3.5 轨 4 实施)

| # | spec slug | 主词 (zh-hk) | GSC 实证 (8/28) | 该页进 title 的唯一长尾 | meta description 长尾 | T1/T2 |
|---|-----------|---------------|----------------|------------------------|---------------------|-------|
| 1 | **transparent-stickers** | 透明貼紙 | 透明貼 13 imp pos 25.77 | **透明貼紙印刷** (跟品类同) | (同) | T1 |
| 2 | **custom-stickers** | 自定貼紙 | small batch custom stickers 6 imp pos 10.5 + custom stickers small batch 1 imp pos 6.0 | **小批量自訂貼紙** | 自定貼紙印刷, 客製化貼紙, 個人化貼紙 | T1 |
| 3 | **vinyl-stickers** | 乙烯貼紙 | 防水貼紙 14 imp pos 18.79 + 防水貼紙印刷 1 imp pos 10 | **防水乙烯貼紙** | 防水貼紙印刷, 戶外貼紙, 防UV貼紙, 浴室貼紙 | T1 |
| 4 | **kraft-paper-bags** | 牛皮紙袋 | 牛皮紙袋 1 imp pos 4.0 (8/28) | **牛皮紙袋訂製** | 環保紙袋, 訂做紙袋, 紙袋印刷, logo紙袋 | T1 |
| 5 | **folding-boxes** | 摺盒 | (GSC 实证 0, 跟 packaging-boxes 类目共享长尾簇) | **摺盒訂製** | 摺盒印刷, 禮盒訂製, 紙盒, 化妝品盒 | T1 |
| 6 | **corrugated-boxes** | 瓦楞盒 | (GSC 实证 0, 跟 packaging-boxes 类目共享长尾簇) | **瓦楞紙盒訂製** | 瓦楞盒印刷, 運輸盒, 物流盒, 緩衝盒 | T1 |
| 7 | **paper-bags** | 紙袋 | 紙袋 3 imp pos 7.67 | **紙袋印刷訂製** | 牛皮紙袋, 環保紙袋, 購物袋, 手提袋 | T1 |
| 8 | **a4-flyers** | A4 宣傳單 | 傳單 1 imp pos 23 (8/28) | **A4 彩色傳單印刷** | 雙面傳單, 摺頁, 活動傳單, 促銷傳單 | T1 |
| 9 | **a5-flyers** | A5 宣傳單 | 傳單 1 imp pos 23 (跟 a4 共池) | **A5 雙面傳單印刷** | A5 傳單, 促銷傳單, 活動傳單, 摺頁 | T1 |
| 10 | **business-cards** | 商務咭片 (308) | N/A | N/A | N/A | N/A (豁免) |

---

## C. food-boxes 验证 (K3 拍板方案 A 已落地, §A.4 pkg W2 改动)

| 字段 | 改前 | 改后 (W2 batch, ca7103d) |
|------|------|--------------------------|
| **zh-hk title** | 食品包裝印刷 100個起訂 HK$4起 \| 智印港 ZprintPro | **食品包裝印刷 禮盒訂製 100個起 HK$4起 \| 智印港 ZprintPro** (33 字符, 主词+禮盒訂製 长尾+双数字钩子+品牌) |
| **zh-hk desc** (追加) | (原 120 chars) | + `FDA食品級 (FDA 21 CFR 176.170), 跨境合規。月饼端午禮盒 / 茶葉禮盒 / 烘焙坊 / 保健品品牌 / 手搖飲品店 適用。` (FDA + 5 业务洞察词进 meta 后半) |
| **zh-hk keywords** (追加 10) | (49 原词) | + `FDA食品包装, 食品级包装盒, 月饼包裝, 茶葉禮盒包裝, 烘焙包裝, 保健品包裝, 手搖飲品包裝, 跨境食品合规, FDA認證食品级, FSC認證紙` |
| **en title** | Custom Food Packaging Boxes \| 100 MOQ \| ZprintPro | **Custom Food Packaging Boxes 禮盒訂製 \| 100 MOQ \| ZprintPro** |
| **en desc** (追加) | (原 ~100 chars) | + `FDA-compliant (FDA 21 CFR 176.170). Mooncake & Dragon Boat Festival gift box, tea gift box, bakery, supplement brand, bubble tea shop all welcome.` |
| **en keywords** (追加 10) | (原 ~30) | + `FDA approved food packaging, FDA food grade packaging, mooncake packaging, tea gift box packaging, bakery packaging, supplement packaging, bubble tea packaging, eco food box, cross border food packaging, FSC certified paper` |
| **ja title** | 食品パッケージ印刷 \| 100個から・FSC認証 \| ZprintPro | **食品パッケージ印刷 禮盒訂製 \| 100個から \| ZprintPro** |
| **ja desc** (追加) | (原) | + `FDA適合 (FDA 21 CFR 176.170 認証)。月餅・端午節ギフトボックス、茶葉ギフト、ベーカリー、ヘルスケアブランド、タピオカ店対応。` |
| **ja keywords** (追加 9) | (原) | + `FDA食品パッケージ, 食品グレード包装, 月餅パッケージ, 茶葉ギフトボックス, ベーカリーパッケージ, ヘルスケアパッケージ, タピオカパッケージ, エコ食品箱, FSC認証紙` |

**M3 决策记录** (per §0.22 SOP-10 + §0.23 数据诚信):
- 长尾选 **禮盒訂製** (GSC 实证 5 imp pos 37.4 + 禮盒訂做 6 imp pos 30.67 + 磁吸禮盒 1 imp pos 4.0 已在首页) 而非 FDA 級 (FDA GSC 0 imp) — K3 8/30 05:00 拍板, 数据驱动决策
- FDA + mooncake/tea/bakery/supplement/bubble tea 进 meta description + keywords + 正文 (培育需求) — 业务洞察词 (K3 13:17) 培育
- 一次改定 + 冻结 2-4 周看 GSC 对照 (K3 推荐 A, 严禁频繁改 title, churn 是排名杀手)

---

## D. 「标题长尾 3 筛选 + 分层布局」SOP 全站规则

### D.1 3 筛选必过 (K3 8/30 拍板)

1. **GSC 有展示实证** (需求已验证, 不赌未验证的词) — per §0.23 数据诚信红线
2. **T1/T2 采购意图** (带钱, per K3 12:37 拍板 三维词价值分层)
3. **与主词同簇** (强化主词权重, 不稀释)

### D.2 分层布局法 (K3 8/30 拍板)

| 位置 | 数量 | 类型 | 验证 |
|------|------|------|------|
| **title** | 1 长尾 (前置不动 + 1 长尾 + 1 数字钩子 + 品牌) | 主词 + 1 长尾 (50-60 字符内) | 字符数 50-60 |
| **meta description** | 2-3 长尾 | 业务洞察词可入 | 字符数 150-160 |
| **H1/H2/正文** | 3-5 长尾 | 培育需求 | 段落 100+ 字 |
| **FAQ** | 问句型长尾 | 提升长尾排名 | 4-6 FAQ |
| **keywords 字段** | 全量兜底 | 不限数量 | 50-60 词 |

### D.3 严禁 (per K3 8/30 拍板)

- ❌ **FDA級 / 月饼 / 茶葉 / 烘焙 / 保健品 / 手搖** 等业务洞察词进 title (GSC 0 展示, 烧 title 字符)
- ❌ **频繁改 title** (churn 是排名杀手, 一次改定 2-4 周冻结)
- ❌ **长尾堆砌** (被 Google 重写标题, 反而丢控制权)
- ❌ **GSC 0 实证词进 title** (违反 §0.23 数据诚信)

---

## E. 13 品类 + 10 specs 长尾候选表交付物 (per K3 拍板, 1 表交 M3 执行)

| # | 页面 | 改前 (主词 + 数字 + 品牌) | 改后 (主词 + **长尾** + 数字 + 品牌) | 必做 | K3 拍板 |
|---|------|------------------------|------------------------------------|------|----------|
| 1 | stickers | 貼紙印刷 ... 智印港 | 貼紙印刷 **小批量貼紙印刷** ... 智印港 | W3 batch 2 | 待 |
| 2 | transparent-stickers | 透明貼紙 ... 智印港 | 透明貼紙 **透明貼紙印刷** ... 智印港 | W3 batch 2 | 待 |
| 3 | labels | 標籤 ... 智印港 | 標籤 **小批量標籤印刷** ... 智印港 | W3 batch 2 | 待 |
| 4 | packaging-boxes | 包裝盒 ... 智印港 | 包裝盒 **紙盒訂製** ... 智印港 | W3 batch 2 | 待 |
| 5 | paper-bags | 紙袋 ... 智印港 | 紙袋 **牛皮紙袋訂製** ... 智印港 | W3 batch 2 | 待 |
| 6 | flyers | 宣傳單張 ... 智印港 | 宣傳單張 **A5 宣傳單張印刷** ... 智印港 | W3 batch 2 | 待 |
| 7 | posters | 海報 ... 智印港 | 海報 **A2 海報印刷** ... 智印港 | W3 batch 2 | 待 |
| 8 | brochures | 摺頁 ... 智印港 | 摺頁 **摺頁印刷** ... 智印港 | W3 batch 2 | 待 |
| 9 | booklets | 騎馬釘書刊 ... 智印港 | 騎馬釘書刊 **騎馬釘小冊子印刷** ... 智印港 | W3 batch 2 | 待 |
| 10 | greeting-cards | 賀卡 ... 智印港 | 賀卡 **燙金賀卡印刷** ... 智印港 | W3 batch 2 | 待 |
| 11 | wedding-invitations | 喜帖 ... 智印港 | 喜帖 **燙金喜帖印刷** ... 智印港 | W3 batch 2 | 待 |
| 12 | place-cards | 枱卡 ... 智印港 | 枱卡 **婚宴枱卡印刷** ... 智印港 | W3 batch 2 | 待 |
| 13-22 | 10 specs (上 B 表) | ... | ... | W3 batch 2 | 待 |

**M3 必做 (per K3 8/30 拍板)**: 1 表 (本 docs) 交付 W3 batch 2, 22 页 title 批量改, M3 自动执行, K3 review 拍板。

---

## F. 数据来源 (§0.23 数据诚信)

- GSC 实证: gsc_data.csv 463 rows 8/28 (M3 独立 curl 实证)
- GSC 页面维度: gsc_page_query.csv 2294 rows 8/26
- K3 截图实证: 8/30 04:37 3 张图 (贺卡/喜帖/枱卡类目 6 SKU 标题)
- V3.5 词分层: docs/keyword-value-layer-2026-08-29.json (G1 8 词 + G2 5 词)
- 词价值分层 (K3 12:37 拍板三维): docs/2026-08-29-1214-k3-strategy-eval-master-plan.md
- 摸底脚本: `.hermes/_tmp_k3_w3_gsc.py` + `.hermes/_tmp_k3_w3_apply.py` (不入 git per §0.27)

---

## G. 风险 + 备选

- **风险 1**: 部分品类 (labels / booklets) GSC 实证偏少 (1-6 imp), 长尾候选主要靠"同簇" + "业务洞察" 推断, K3 拍板时 review
- **风险 2**: food-boxes title 已改 (W2 ca7103d), 2-4 周冻结, 其他 22 页 W3 batch 2 改动前, K3 拍板是否同步冻结
- **备选**: 如某页 GSC 实证 0, K3 拍板 (A) 不改 (B) 改 (基于业务洞察) (C) 改但 keyword 集调整

---

**M3 报告 K3 拍板 4 件**:
1. W3 batch 2 22 页 title 批量改 - 攒批 1 push 拍板 (A) 立即做 (B) 等 K3 review 一一过
2. food-boxes 冻结 2-4 周 vs 22 页同时改 - K3 拍板
3. labels/booklets 等 GSC 实证偏少品类 - K3 拍板 (A) 暂不改 (B) 基于同簇改
4. SOP 沉淀到 skill + AGENTS.md 必做 (下个 todo)
