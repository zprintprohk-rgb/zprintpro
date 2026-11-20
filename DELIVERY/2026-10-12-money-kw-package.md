# 10/12 GSC 带钱词专项复盘与下批动作解冻执行 — 交付包

> 执行: deepseek hermes 人手会话 · 2026-10-08 00:4x (Asia/Shanghai)
> **数据来源**: GSC 2026-10-05 导出 12 文件（`GSC数据/`，经 `.hermes/money-kw-20261005.json` / `.hermes/gsc-2026-10-05-week-delta.json` 解析）；git 批次实况（30a60554 / 059314bd / 3ef3094b / a675b376）；线上探针 9 URL（本报告 §1.2）；products.ts packaging SKU 真值（本报告 §2.2）
> **诚信声明（§0.23）**: 今日为 **2026-10-08**，"10/12 导出"**尚不存在也不可能已存在**（GSC 滞后 2-3 天，index.json 既定 10/12 前后拉新）。已全仓 + Downloads + k3-inbox 深搜确认。凡"10/12 实际"列一律标 `PENDING_DATA`，**未回填任何虚构数字**。

---

## 1. Workflow 1 — 10/5 批次战报复盘表

### 1.1 复盘表（基线 = 任务锚点，已逐一与 10/5 导出 28d 真值对账）

| 词 | 任务基线 | 10/5 档实测锚点 | 目标 | 10/12 实际 | 达标状态 | 归因分析 |
|---|---|---|---|---|---|---|
| china catalog printing | 18.4 | **18.49** ✓ 精确匹配 | ≤12 | PENDING_DATA | ⏳ 待 10/12 窗口 | 10/5 批次已落：catalog-printing SKU en kw +3（含本词）、catalog-china 服务页 en kw 词面已全、zine 变体接住长尾；词面侧能做的已做完，位移待 GSC 重抓 |
| catalogue printing china | 20.8 | **20.8** ✓ 精确匹配 | ≤12 + 英式流量接入 | PENDING_DATA | ⏳ 待 10/12 窗口 | 英式拼写 46 imps 已注入 catalog-printing SKU en kw（探针已验 live）；接入与否 = GSC 是否为该词建立展示关联，10/12 首验 |
| pvc シール | 20.1 | **18.3-21.3** 波动带 ✓ | ≤12 | PENDING_DATA | ⏳ 待 10/12 窗口 | 已注入 waterproof-stickers ja kw（34→35，达上限，清退"ノーリボン残留"置换）；stickers 簇词面全覆盖完成 |
| 教科書 印刷会社 | 62.6 | **62.64** ✓ 精确匹配 | ≤45 | PENDING_DATA | ⏳ 待 10/12 窗口 | 已注入 textbooks ja kw +3（教科書 印刷会社 / 教材 印刷製本 / 教材 テキスト印刷，探针已验 live）；深水词（62→45 需 17 名）单批内容层难得，预期半档见效 |
| 特急印刷 激安 | 16-20 | **15.3-20.0** ✓ | 前 10 | PENDING_DATA | ⏳ 待 10/12 窗口 | rush 页 ja title 已含「特急印刷 激安」词面（存量）；ja kw 有 即日印刷/特急印刷/当日特急；前 10 需位移 6+ 名，看 10/12 |
| wholesale/low cost catalog 簇 | 39-68 | low cost 68.38 / cheap china 29-50 | 各词前移 8+ 名 + FAQ 触发 Featured Snippet | PENDING_DATA | ⏳ 待 10/12 窗口 | 簇词面已在 catalog-china 页 kw（wholesale/bulk/cheap/low moq 全覆）；**money FAQ ×2 已埋**（en "How much does wholesale catalog printing cost?" / ja「カタログ印刷の料金はいくらから？」，FAQPage JSON-LD 线上已验）——Snippet 触发与否只能 10/12 查 GSC 呈现报告 |

### 1.2 部署实况验证（线上探针，本次可真实核验项）

| URL | 标记命中 | 结论 |
|---|---|---|
| /en/services/catalog-printing-china/ | EN-wholesale-FAQ · zine-kw · FAQPage-LD | ✅ 批次已上线 |
| /ja/services/catalog-printing-china/ | JA-ryokin-FAQ · FAQPage-LD | ✅ 批次已上线 |
| /en/product/catalog-printing/ | catalogue-kw · china-catalog-kw | ✅ kw 注入生效 |
| /ja/product/waterproof-stickers/ | pvc-seal-kw | ✅ kw 注入生效 |
| /ja/product/textbooks/ | textbook-company-kw · kyozai-kw | ✅ kw 注入生效 |
| /en/product/saddle-stitch-booklets/ · /en/services/rush-printing-delivery/ | FAQPage-LD | ✅ 200 正常 |

**部署结论：10/5 批次（kw 注入 ×4 + money FAQ ×2 + zine 词面）全部 LIVE，零回退。**

### 1.3 存量超线审计发现（附带，title-band 存量口径）

| 页面 title | 当量 | 判定 |
|---|---|---|
| services/catalog-printing-china（en/zh-hk 同构） | **77** | TRIM（存量超 57 满格线；guard 只拦 staged sku-seo-data，存量入审计） |
| rush-printing-delivery en | **66** | TRIM（存量） |
| rush-printing-delivery ja | **59** | TRIM（存量） |

➡ 解冻窗口（10/19）建议收编；catalog-china 合规候选已备：`China Catalog Printing | MOQ 10 DHL 2-4 Days | ZprintPro`（当量 56，band=OK，词面全保留）。

---

## 2. Workflow 2 — 下批动作代码包（DRAFT，title 冻结期不落 src）

> 冻结依据：strategy doc §五「title 冻结到 10/19（churn 组）/ L3 全部待 10/12 数据」；title-window-freeze.ts 机冻集仅 certificates/foil-stickers（saddle-stitch 不在机冻集，但属 churn 纪律覆盖）。**以下全部为生成交付物，未 commit。**

### 2.1 W2.1 — wholesale saddle stitch booklet Title 植入 diff

**前置展现量核查（10/5 档实测，10/12 终判）**：`wholesale saddle stitch booklet printing` 28d us 窗 ≈ **43 imps**，pos 区间 6.5-84.8（深水为主）。达标阈值待 10/12 窗口按同口径终判。

```diff
--- a/src/data/sku-seo-data.ts
+++ b/src/data/sku-seo-data.ts
@@ "saddle-stitch-booklets" / seo.en
-        "title": "Saddle Stitch Booklets A4/A5 | 10 MOQ $1.84 | ZprintPro",
+        "title": "Wholesale Saddle Stitch Booklets 10 MOQ $1.84 | ZprintPro",
```

- 当量 55 → **57**（band=OK，满格线内；`scripts/guards/title-equiv.js` 实测）
- 词面 "Wholesale" 前置植入，MOQ + 价格钩子保留，品牌末尾一次
- 备选：`Wholesale Saddle Stitch Booklets | 10 MOQ | ZprintPro`（53）/ `Wholesale Saddle Stitch Booklets | From $1.84 | ZprintPro`（57）
- **状态：DRAFT_ONLY** — churn 组 10/19 前零 title 回调纪律 + 前置展现量待 10/12 终判

### 2.2 W2.2 — ja packaging 料金表 Section（raksul 构式，products.ts 真值）

**料金表 Markdown（数量 × 单价，仅真值档）**：

| 商品タイプ | 最低ロット | 単価（円） | 備考 |
|---|---|---|---|
| 折りたたみ箱（folding-boxes） | 100個 | ¥69〜 | EC梱包向け |
| 食品パッケージ／食品箱（food-boxes） | 100個 | ¥101〜 | 食品グレード紙・大豆インク |
| 発送箱・越境EC FBA（mailer-boxes） | 100個 | ¥105〜 | DHL 2-4日 |
| 化粧品パッケージボックス（cosmetic-boxes） | 100個 | ¥240〜 | **500個+ 15%OFF / 1,000個+ 30%OFF**（products.ts features 真值） |
| 上製本箱／リジッド（rigid-boxes） | 100個 | ¥240〜 | 硬質糊箱 |
| マグネット蓋ギフトボックス（magnetic-closure-gift-box） | 100個 | ¥450〜 | 磁石式 |
| 電子機器包裝箱（electronics-packaging-box） | 200個 | ¥240〜 | 緩衝構造 |
| クラフト紙パッケージ（kraft-paper-packaging-box） | 300個 | ¥150〜 | FSC認証 |

> tuck-end-boxes（500個・basePrice_ja 空）不入表，防编造（§0.23）。300/500/1,000 数量带単価除 cosmetic 折扣外均无真值源，**不虚构**。

**src diff（category-seo-content.ts，category 模板自动生成 FAQPage JSON-LD — 已核 page.tsx L353/386）**：

```diff
--- a/src/data/category-seo-content.ts
+++ b/src/data/category-seo-content.ts
@@ packagingContent.ja.faq（L393 faq 数组顶部，A5 craft-paper FAQ 同位式）
+      { q: 'パッケージ印刷の料金はいくらから？', a: '《料金表・最低ロット×単価》折りたたみ箱100個¥69〜／発送箱100個¥105〜／食品箱100個¥101〜／化粧品ボックス100個¥240〜（500個+15%OFF・1,000個+30%OFF）／上製本箱100個¥240〜／マグネット蓋ギフトボックス100個¥450〜／電子機器箱200個¥240〜／クラフト紙箱300個¥150〜。箱型・数量・紙材を30秒AI見積もりで入力すれば、配送・税込みの正確な金額を即座に確認できます。' },
```

**JSON-LD 节点（validator 可验，落页后由模板并入 FAQPage mainEntity）**：

```json
{
  "@type": "Question",
  "name": "パッケージ印刷の料金はいくらから？",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "《料金表・最低ロット×単価》折りたたみ箱100個¥69〜／発送箱100個¥105〜／食品箱100個¥101〜／化粧品ボックス100個¥240〜（500個+15%OFF・1,000個+30%OFF）／上製本箱100個¥240〜／マグネット蓋ギフトボックス100個¥450〜／電子機器箱200個¥240〜／クラフト紙箱300個¥150〜。箱型・数量・紙材を30秒AI見積もりで入力すれば、配送・税込みの正確な金額を即座に確認できます。"
  }
}
```

- 查重：packagingContent.ja.faq 现有 10 条 + conversion newFaqs 7 条均无"料金"问句 → 无重复
- 门童 #16 自检：无 GSC 黑话、无内部数据词 ✅
- **状态：CODE_PACKAGE_READY** — 属 L2 内容层（非 title），strategy doc §四排期 10/8-10/11 窗口可随攒批落（1 push）

### 2.3 W2.3 — en flyers same day 审查 + 候选

**当前 rush 页 en title 审查**：`Same-Day & Rush Printing | Order by 6pm, Next-Day 12pm | ZprintPro` —— 当量 **66，TRIM**（存量超线）；已含 "Same-Day" 连字符形态，**裸 "same day" 词面无独立出现**（desc/keywords 有 same-day printing）。

```diff
--- a/src/app/[locale]/services/rush-printing-delivery/page.tsx
+++ b/src/app/[locale]/services/rush-printing-delivery/page.tsx
@@ metaMap.en
-    title: 'Same-Day & Rush Printing | Order by 6pm, Next-Day 12pm | ZprintPro',
+    title: 'Same Day Flyer Printing | 6pm Cut, Next-Day | ZprintPro',
```

- 当量 66 → **55**（band=OK）；**同时修复存量 TRIM 超线**
- "Same Day Flyer Printing" 完整钱词前置（GSC 构式 same day + flyer printing 双命中）
- 备选：`Same Day Flyers 10 MOQ | 6pm Cut, Next-Day | ZprintPro`（54，加 MOQ 钩子）
- **状态：DRAFT_ONLY** — 同 title 冻结纪律，10/19 窗口合并收编（连同 ja=59 存量）

---

## 3. Workflow 3 — 10/12 GAP 扫描（规格固化 + 预算普查，数据缺失未跑）

**状态：BLOCKED_ON_DATA**（10/12 导出未到）。扫描规格已固化进 `.hermes/money-kw-20261012.json`，数据一到即可跑：

1. 正则沿用 `.hermes/money-kw-mine.py` 的 MONEY_EN / MONEY_JA / MONEY_ZH（en 17 / ja 22 / zh 12 构式）
2. 过滤：`imps > 20 AND pos > 15`，并与 `money-kw-20261005.json` 反连接 = 新晋词
3. 预算纪律（本次普查实测）：

| 目标页 | 当前 kw 数 | 处置 |
|---|---|---|
| waterproof-stickers[ja] | **35（满）** | 置换算法待命：清退 pos 最差/imp 最低 1-2 词 |
| transparent-stickers[ja] / small-batch-stickers[ja] / die-cut-stickers[ja] | **35（满）** | 同上 |
| a2/a1/outdoor-posters[ja] | **35（满）** | 同上 |
| cartoon/eco/large-red-packets[en] | **35（满）** | 同上 |
| catalog-printing[en] | 12 | **有缺口 → 直接补缺** |
| textbooks[ja] | 15 | 有缺口 → 直接补缺 |
| catalog-china 服务页[en] | 22 | 有缺口 → 直接补缺 |
| saddle-stitch-booklets[en] | 9 | 有缺口 → 直接补缺 |

（注：zh-hk/en  legacy 页存在 40-77 词超档存量，属历史飞轮产物，不在本纪律管辖；置换算法仅对 ja=35 / en=35 触顶页生效。）

---

## 4. 机器可读日志

已写入 `.hermes/money-kw-20261012.json`：
- `data_window.status = MISSING` + 搜索证据 + unblock 条件
- `diff_vs_20261005_log`：新增 7 个键（data_window / batch_20261005 / verification_matrix / reserved_actions / gap_scan / title_candidates / deployment_probes），`sum/us/jp/hk` 沿用 10/5 档真值不重写
- 基线锚点核验（任务 6 锚点 ↔ 10/5 档精确匹配记录）
- 部署探针 9 条 + 全部 LIVE 判定
- 预算普查 + GAP 扫描规格 + title 候选当量

## 5. 红线自检

- §0.23 数据诚信：全表零虚构，10/12 列全部 PENDING_DATA；数据来源行在首段 ✅
- §0.23.1 GSC 黑话零泄漏（交付物为内部文档，客户可见 FAQ 文案无后台词）✅
- §0.25 push 纪律：本批**零 src 改动、零 push**（全 DRAFT/CODE_PACKAGE），不耗 build 配额 ✅
- title 冻结纪律：saddle-stitch / rush title 一律 DRAFT 不落 src ✅
- 幂等：机器日志结构 diff 明示 vs 20261005 版本，重跑可续 ✅
