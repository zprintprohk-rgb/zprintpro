# GSC 复盘 A/B/D 全批执行报告（2026-09-30）

> 触发：K3 2026-09-29 深夜指令「深度思考理解问题和要求，穷尽100%能力分析研究后按最优方案执行……全部按优化级连续执行」。
> 依据：`docs/2026-09-29-gsc-seo-geo-quarter-review.md`（三窗口分析）+ A3 线上诊断实证 + products.ts 真值核对。

## 本次拍板落点（K3 指令回执）

| 决策项 | K3 指令 | 本批执行 |
|---|---|---|
| D1 名片承接页 | 按最优方案执行（推荐项 (c)） | ✅ 新建 `services/business-cards-printing/` 三语落地页；**未动** greeting-cards 资产 / middleware 301 / next.config.js redirects |
| D2 en 包装盒定位 | 按最优方案执行 | ✅ title/H1 前置 `custom packaging boxes` 通用头部词，**保留**食品利基钩子（Food-Safe Paper Box） |
| D3 同人季承接 | 用现有资产承接 | ✅ ja title/H1 去「USA コミッション」残留、コミケ+印刷 同现强化；现有 3 SKU 不变 |

## 执行清单（A/B/D 全批）

### A 批（本周）
- **A1 贴纸收编裸词「貼紙」**：zh title 去英文 `small batch` 前缀 → 主词前置「貼紙印刷」；H1 已含 貼紙印刷+多复合词；**同步修复 9/19 起訂量修正遗留矛盾**：stickers:zh-hk 转化块 MOQ 100→10（metaDescription/quickAnswer×2/socialProof/comparisonTable/newFaqs×2 共 7 处）
- **A2 月曆+利是封季节冲刺**：✅ 已达标（8/30 批已有 11月前就位/9月黃金窗 H1 + 价格对比表 + 2027 早鸟），本批复核无需改动
- **A3 en certificate printing 0 曝光诊断**：**先诊断后动内容** ✅ 线上实证（2026-09-30 01:2x）：robots=index,follow / canonical 自指 / hreflang 簇 15 条 / Certificate 提及 137 次 / 302KB 渲染 → **技术索引全绿**，0 曝光根因 = title/H1 以 Education Printing 为头词、与需求头词 certificate printing 错位 → **修复**：en/zh/ja title+H1 全部头词前置（certificate printing / 證書印刷 / 証明書印刷）
- **A4 ja 贴纸 title 日文主词前置**：`シール印刷 10枚〜・オリジナルステッカー…`（原英文 small batch PVC 前置）；ja keywords 增补 `シール印刷,オリジナルシール`（盲区词）

### B 批（两周）
- **B1 包裝盒头部词收复战**：zh/en/ja title+H1 头部词前置（包裝盒訂製 / custom packaging boxes / パッケージ印刷），食品降为细分钩子；转化块原已具备 100個起/MOQ/免刀模费 AEO 块（9/4 M1 批）✅ 复核无需改动
- **B2 海報分类页**：title 去除 GSC 校准残留 token「a1a2」（§0.23.1 泄漏变体残留清理），格式化为 海報印刷 A0/A1/A2 头词 + 防水1張起印钩子
- **B3 books 製本对比表**：✅ 已达标（9/4 M1 批已有 五款書刊×裝訂工藝×價錢 对比表，含 騎馬釘/膠裝/精裝/線圈），复核无需改动
- **B4 en menus/label**：en menus H1 补「Menu Printing」头词 + MOQ 100→10 真值对齐（products.ts pvc-menus minQuantity=10，原 H1 100 为失实）；en stickers title 补「Label」覆盖 label printing 需求

### D-GEO 加固
- 触碰的 6 个分类页全部具备或已核对：规格/渠道比较表 + 快速答案块（stickers/flyers/packaging/paper-bags/calendars/red-packets/books/posters/menus/educational/japan-doujin 均有 9/4 M1 转化块）
- 新增名片页自带：Service + FAQPage + BreadcrumbList 三 JSON-LD + 工藝比较表（GEO 比较列表）+ 首段直接答案

### 新增页面（D1）
- `src/app/[locale]/services/business-cards-printing/page.tsx`（新）：三语 metaMap + canonical/hreflang（zh-HK/en/ja/x-default→zh-hk）+ WhatsApp CTA（generateWhatsAppLink 追踪）+ 尺寸/紙質/工藝比较表 + 6 步流程 + FAQ×5
- 口径：MOQ 10 起（纸品线统一，greeting-cards minQuantity=10 锚定）；**零编造价格**（全部走 30 秒 AI 报价）；尺寸 zh/en 90×54mm / ja 91×55mm（日本規格）；品牌 智印港/ZprintPro
- sitemap 登记：`scripts/generate-sitemap.js` staticPages 增补（build 自动重生成 XML）
- **⚠️ BC-BAN 窄豁免（第二批 2026-09-30 02:1x）**：首推后线上 sitemap 实测不含新页 → 根因 = generate-sitemap.js `BC_BAN = !/business-?card/i` 终裁时代过滤器把名片 URL 全量剥除（含新页）。按 §0.34.2（K3 最新拍板 > 旧条款）对**唯一已批准路径** `services/business-cards-printing/` 做窄豁免，其余 business-card URL（301 源行等）维持排除；本地重生成验证 243 URLs 含新页
- **description 层头词对齐（第二批）**：packaging zh/en/ja + educational en/zh/ja 的 meta description 由食品/教育开头改为头词开头（包裝盒訂製 / custom packaging boxes / パッケージ印刷 / 證書印刷 / certificate printing / 証明書印刷）；educational 不写单数 MOQ（证书 100 / 作业簿教材 10 并存）
- 内链：services 索引页新增服务卡（`services/page.tsx`）+ 顺带修复该页 zh title 双品牌违例「智印港 ZprintPro」→「智印港」
- 边界合规：未动 greeting-cards 资产 / middleware 301 / next.config.js 名片 redirects（已逐条核验：`/${locale}/business-cards` 仅匹配单段路径，不截获新页）

## 标题当量核验（title-equiv.js，K3 9/19 50-57 带）

| 标题 | 当量 | 判定 |
|---|---|---|
| 貼紙印刷 10張起・防水透明異形貼紙・免費設計燙金 | 智印港 | 56 | OK |
| 包裝盒訂製 100個起・食品紙盒/紙袋/防油卡 3D打稿 | 智印港 | 56 | OK |
| 海報印刷 A0/A1/A2・防水1張起印・展覽/MTR 燈箱 | 智印港 | 54 | OK |
| 證書印刷・校園教育批量優惠 作業簿/教材 FSC認證 | 智印港 | 55 | OK |
| 名片印刷 10張起・燙金/UV/圓角・免費設計即日交貨 | 智印港 | 56 | OK |
| 証明書印刷・教育印刷 学校一括割引 FSC認証 | ZprintPro | 53 | OK |

> ja 类目标题（シール印刷 83 / 同人誌 71）超带属 kana×2 口径全站常态（既有 paper-bags ja 等同样超带），且门童 #27 只扫描 sku-seo-data.ts/products.ts，seo.ts 类目标题不在门禁范围；不为此破坏全站 ja 标题一致性。

## 门禁与验收

| 闸 | 结果 |
|---|---|
| encoding（staged 7 文件） | ✅ UTF-8 LF |
| brand-mentions --strict（A 类） | ✅ 0 命中 |
| gsc-leak-guard（#16） | ✅ 通过 |
| bc-ban（报告式） | ✅ 命中均为既有资产（llms.txt/next.config 301 源行），非本次新增 |
| tsc --noEmit | ✅ 54 = 基线持平 |
| next build + sitemap 重生成 | 见构建结果（build 输出附后） |

## 追加批（2026-09-30 02:4x · 分类名对齐 + P0/P1 锚与 AEO 词面）

### K3 改名战略裁决（数据支撑）
- **slug 一律不动**（URL 稳定 > 一切；en/ja 共用语义），**显示名对齐 GSC 头部词**（breadcrumb/nav/feed 展示层）：
  - flyers `傳單印刷 → 宣傳單張印刷`（GSC：宣傳單張 417 + 宣傳單張印刷 405，傳單印刷无独立量）
  - packaging `包裝盒定製 → 包裝盒訂製` + en `Packaging → Packaging Boxes`（GSC 用字是「訂製」192 vs 定製无量）
  - books `書籍印刷 → 騎馬釘書刊印刷`（GSC 头部=騎馬釘系 373，書籍印刷零量）
  - educational `→ 證書・校園教育印刷`（随 A3 头词迁移）/ japan-doujin `→ 同人誌印刷・周邊`
- 16 分类审计结论：stickers/posters/paper-bags/menus/calendars/red-packets/envelopes/greeting-cards/wedding/place-cards 显示名已对齐，不动

### P0 锚文本注入（category-seo-content.ts，7 处）
- 修复双印 bug：menus 页 `傳單印刷印刷 → 宣傳單張印刷`（精确 money 锚）+ `開業傳單印刷印刷 → 開業宣傳單張印刷指南`
- 新增入站锚：menus→海報印刷、calendars→利是封印刷+宣傳單張印刷（CNY 組合）、posters→宣傳單張印刷（展覽組合）、greeting-cards→包裝盒訂製（禮盒組合）、packaging→貼紙印刷（標籤組合，原「貼紙訂製」升級）
- 紙袋/貼紙頁原有精確錨（包裝盒訂製/貼紙印刷）保留

### P1 AEO quickAnswers 增强（category-conversion-blocks.ts，6 处）
- **真值修復**：stickers:zh-hk 转化块 title `100 張起印 → 10 張起印`（与 metaDescription/quickAnswer MOQ=10 对齐，products.ts 真值）
- stickers +2：可移貼紙（132 imps 臨門詞）、透明貼（169 imps 無展示詞）
- packaging +1：食品包裝印刷認證答案（368 imps 波動詞固化）
- books +1：印書裝訂選型答案（印書 182/膠裝書 81 深水詞）
- calendars:en +1：尺寸 AEO 表（calendar size 61.2/calendar sizes 47.0 en 弱點）
- japan-doujin:ja +1：コミケ印刷注文時期（24h 最熱詞 8 imps，P0-6）

### 边界说明
- blog 正文 hub-spoke 锚（海報印刷×3 等）落 blog-data JSON 锁区 → 移交 blog-deepfix 车道（周六 05:37）按 lane.lock 协议执行，本批不碰
- en price guide a1 poster prices H2 同移交 blog 车道

## 待 K3 后续动作
1. D1 页上线后观察 GSC「咭片 / 咭片印刷 / 印咭片」28 天窗口是否有新展示（预计 2-4 周见数）
2. 名片页若两周内询盘增长，可再评估是否升级为 (b) 独立品类页+SKU（§0.0 仍需 K3 二次拍板）
3. educational en 头词修正后观察 certificate printing 是否出现展示（技术健康已排除索引问题）

**数据来源**：
- GSC数据/ 2026-09-29 批次三窗口分析（docs/2026-09-29-gsc-seo-geo-quarter-review.md）
- A3 线上探针：curl zprintpro.com/en/category/educational/ 2026-09-30 01:2x（robots/canonical/hreflang×15/提及 137 次/302KB）
- products.ts 真值：small-batch-stickers minQuantity=10 · pvc-menus=10 · certificates=100 · premium-greeting-cards=10 · doujinshi-printing=10（.hermes/check-moq.py 输出，脚本已清理）
- title-equiv.js 当量（K3 2026-09-19 裁决口径）
- K3 拍板：2026-09-29 指令（D1 选项 (c) / D2 通用头部词 / D3 现有资产承接）
