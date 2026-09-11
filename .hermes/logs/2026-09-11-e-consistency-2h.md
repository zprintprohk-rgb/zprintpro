# E 口径统一（2 小時內回覆）执行报告 — 2026-09-11

## 一、拍板来源

**唐总 2026-09-11 拍板：E 口径冲突选 A —— 统一「2 小時內回覆」（以指令为准，改 FAQ/CTA）**

## 二、冲突原始状态（4 口径并存）

| 口径 | 出处 |
|---|---|
| 「2 小時內回覆」 | E hero 副标（v9.2.3 指令原文，9/11 已上线） |
| 「24h SLA / 24 小時回覆」 | contact FAQ SLA 条款 + quote/faq/about/PDP/PLP cta + QuoteForm 等 |
| 「15 分鐘專人回覆」 | contact responseTime / bottomCtaBody、BlogContent heroCheck、RushCtaForm |
| 「5 分鐘回覆」 | FloatingQuoteCTA microCopy、CategoryConversionBlocks ctaNote、CategoryPillarContent |

## 三、统一口径（三语言）

| locale | 统一口径 |
|---|---|
| zh-hk | 2 小時內回覆 |
| en | reply within 2 hours |
| ja | 2時間以内に返信 |

## 四、改动范围（26 src 文件）

**页面/组件（20）**：
- `contact/page.tsx`：description / responseTime / features / bottomCtaBody ×3 locale + slaLink 标签中立化（「查看服務承諾 SLA 適用條款」）
- `quote/page.tsx`：metadata descriptions ×3 + SLA 链接标签
- `faq/page.tsx`：尾 CTA 跟进时效 ×3
- `about/page.tsx`：客服团队 / ctaSubtitle ×3 + SLA 链接标签
- `legal/page.tsx`：contactResponseSla ×3（1-2 工作天 → 2 小時）
- `press-kit/page.tsx`：媒体查询回覆 ×3
- `trade-program/page.tsx`：电邮支援 SLA ×3
- `services/rush-printing-delivery/page.tsx`：ja meta desc（15 分 → 2 時間）
- `services/seo/[slug]/page.tsx`：ctaSub ×3（1 分鐘 → 2 小時）
- `services/catalog-printing-china/page.tsx`：meta desc quote 时效 ×3
- `blog/BlogContent.tsx`：heroCheck ×2 + 文末 CTA ×3
- `category/[slug]/v9/CategoryPageV9.tsx`：ctaSub ×3
- `product/[slug]/v9/ProductPageV9.tsx`：ctaFooterDesc ×3
- `components/layout/FloatingQuoteCTA.tsx`：microCopy（zh 5 分鐘 / ja 4 時間 → 2 小時）
- `components/category/CategoryConversionBlocks.tsx`：ctaNote ×3
- `components/quote/QuoteForm.tsx`：successDesc / flowLabel / trustItems / fallbackDesc ×3
- `components/geo/HowToGuide.tsx`：確認報價步骤 ×3
- `components/seo/RegionalContent.tsx`：trustSignals + RegionalCta subtext ×3
- `components/services/RushCtaForm.tsx`：formNote + 成功提示
- `components/CategoryPillarContent.tsx`：WhatsApp 报价回覆 ×3

**数据层（6）**：
- `data/faq/{zh-hk,en,ja}.json`：SLA FAQ `sla-response` 类别（label/scope/question/answer/applicable/notApplicable）24 小時 → 2 小時；类别标题/描述中立化（4 类服务承诺 = 2 小時回覆 / 24 小時打樣 / 24 小時順豐本地 / 24 小時數碼印刷）
- `data/category-conversion-blocks.ts`：报价确认步骤 ×3（zh L159/L3055 + ja L437）
- `data/sku-seo-data.ts`：贴纸/食品包装 description 回覆时效 ×5（即日回覆 / 4h reply / LINE 4 時間 → 2 小時）
- `data/product-faqs.ts`：重印处理方案回覆 ×3

## 五、合理保留（非回覆时效，不改）

- **打樣/打稿 SLA**：24 小時數碼打樣（FAQ sla-proofing）、加急 24 小時打稿
- **交付/物流 SLA**：數碼印刷 24h 出貨、順豐本地 24 小時送達、DHL 2-4 天
- **可用性**：24/7 WhatsApp、365×24、全天候支持
- **报价引擎速度**：30 秒 AI 報價、1 分鐘提交需求
- **竞品对比**：傳統工廠 24 小時人工報價（vs 我司 30 秒 AI）
- **汇款时效**：支付寶閃速即時-24 小時到賬
- **备份文件**：*.bak*/.w5-now（非线上事实）

## 六、顺带修复（G2.3 硬缺口，同批）

PLP 選購指南段数据 links 含 **19 条死链**（7 个已下线 blog slug：3d-pop-up-card-guide / holiday-card-printing-guide / wedding-place-card-guide / pvc-card-printing-guide / wedding-table-card-printing-guide / wedding-invitation-pricing-guide / corporate-gift-calendar-q4-guide）→ 线上 404。
修法：`CategoryPageV9` + `CategoryPillarContent` 渲染前做**目标存在性过滤**（blog slug ∈ blogPosts、category slug ∈ categories），并保持「过滤后 ≥1 分类 + ≥1 blog」兜底保证。
本地终验（`.hermes/g2-guide-links-final.ts`，48 组合）：过滤 19 死链 → 输出死链 0 / 缺分类胶囊 0 / 缺 blog 胶囊 0 = ALL GREEN。

## 七、门禁

- tsc 54=54 持平（0 命中本批改动文件）
- `npm run build` Compiled successfully, exit 0
- FAQ JSON ×3 合法性校验通过
- 编码 UTF-8 LF ✓（`press-kit/page.tsx`、`services/seo/[slug]/page.tsx` 两文件为**既有 CRLF**，与 HEAD 完全一致，本批 0 EOL 改动，未做全文件 churn）

## 八、上线与线上验收

- 提交 `21cf35c5` → main 合并 `fcd4de63`（含 sku-seo-data.ts 冲突解决：**标题取 main**（他批 title 优化已上线，不覆盖）+ **description 取本批**（2h 回覆））
- CF 部署 `3ad811cf` deploy:success
- **线上抽查 `.hermes/e-consistency-probe.mjs`：24 PASS / 4 FAIL**
  - 4 个 FAIL **全部** 是 CF 平台 503 取页失败（ja/contact、zh-hk/faq、zh-hk/quote、en/quote，各重试 6 次仍失败）
  - **内容类断言 0 失败**：所有成功取回的页面均含统一后的 2 小時 / within 2 hours / 2時間以内 文案，且不含回覆类冲突串（reply within 24 hours / 24h response / within 15 minutes / 15分以内 / 24 小時內回覆）
  - 覆盖：contact ×3 / faq ×3 / quote ×2 / about / PLP ×3 / legal / press-kit
- 注：`/en/contact/` 页面内含 SLA FAQ 手风琴（打样/顺丰/数码 24 小時为**合法保留口径**），探针用「回覆专属串」判定以避免误报

## 九、遗留

- `src/data/category-seo-content.ts` 的 `buyingGuide.links` 仍保留 7 个已下线 blog slug（渲染层已过滤，线上不再出现；是否清理数据本体待老板定）

## 数据来源

- 老板拍板: 唐总 2026-09-11（本会话 E 口径冲突 A 选项）
- 全站扫描: `grep` 回覆/返信/reply/response 全量 175+ 命中逐条甄别（src/ 全域）
- 死链核查: `getAllBlogPostSlugs()` 存在性 + `curl` 实测（3d-pop-up-card-guide=404、wedding-place-card-guide=404）
- 终验脚本: `.hermes/g2-guide-links-final.ts`（48 组合 ALL GREEN）
- 提交: 见本批 commit（main）
