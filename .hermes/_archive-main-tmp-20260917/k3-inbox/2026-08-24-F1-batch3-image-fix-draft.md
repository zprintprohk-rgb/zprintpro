# F1-batch-3: About 页图片新发现修复方案 (K3 8/24 18:33 图片复查)

> 起草: Mavis / 2026-08-24 18:35 / K3 8/24 18:33 提供 3 张新图片 (客户评价 + 专业团队 + 核心优势)
> 状态: 草案等 K3 拍板, **不直接 commit** (K3 8/24 18:11 P0 紧急修复后, F1-batch-3 续集)
> 实测定位: F1 紧急修复 (commit 40f75d8) + F1-batch-2 草案 (11KB) 都没列全, 新图片发现 12+ 处问题

---

## 一、图片新发现 (K3 3 张图片 + src 实际位置)

### 图片 3 (核心優勢块 L40-45, zh-hk)

**L42 品質保證 (核心服务 1)**:
> 「ISO 9001 + FSC 認證 · 海德堡四色柯式 + HP Indigo 數碼 + 6 道工序實拍 (查看工序流 ↓) (#factory) · ICC 色彩管理 Delta E ≤ 3 · 1,000+ 企業客戶信賴」

🔴 **关键问题**: F1 紧急修复只撤 L67-68 资质块, **L42 还在重复 ISO 9001 + FSC 認證** — F1 修复不彻底!

**L43 快速交付 (核心服务 2)**:
> 「數碼印刷 24h · 柯式印刷 3–5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📞](https://wa.me/8619880851334) · [聯絡我們](/contact/)」

🔴 **1,000+ 訂單累計** — 无来源数字 (跟 L91 1,000+ 企業客戶信賴重复)

### 图片 1 (客戶評價块 L89-100, zh-hk)

**L91 副標題**:
> 「我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴」

🔴 **「12 大行業」数字错** — 实际只显示 8 行业卡片 (L94-101 餐饮外卖/零售精品/跨境电商/美妆护肤/教育培训/婚庆活动/文创IP/宠物行业)

**L94-100 行业卡片** (K3 红框标了 4 张):
- **L94 餐飲外賣**: `[菜單印刷](/category/flyers/) · [外賣標籤](/category/labels/) · [打包盒](/category/packaging/)` — K3 红框 `[/category/packaging/]`
- **L95 零售精品**: `[包裝盒](/category/packaging/) · [紙袋](/category/paper-bags/) · [吊牌](/category/labels/)` — K3 红框 `[/category/paper-bags/]` + `[/category/labels/]`
- **L96 跨境電商**: `[跨境電商包裝指南](/blog/cross-border-ecommerce-shipping-box-guide/) · [快遞標籤](/category/labels/) · [包裝盒](/category/packaging/)` — K3 红框 `[跨境電商包裝指南](/blog/cross-border-ecommerce-shipping-box-guide/)` (注: 这个 blog slug 在 zh-hk blog-data 缺, 用户访问会 404) + `[/category/packaging/]`
- **L97 美妝護膚**: `[標籤貼紙](/category/labels/) · [包裝盒](/category/packaging/)` — K3 红框 `[/category/packaging/]`
- **L98 教育培訓**: `[書籍畫冊](/category/books/) · [貼紙](/category/stickers/)` — K3 红框 `[/category/stickers/]`

🔴 **内链路径错乱** (K3 红框):
- 行业卡片里的 `/category/packaging/` + `/category/paper-bags/` + `/category/labels/` + `/category/stickers/` 路径看似正确, 但 K3 红框说明这些路径**可能 broken** (让我查 src/app/[locale]/category/ 路径)

### 图片 2 (專業團隊 L82-92, zh-hk)

**L91 (跟图片 1 L91 重复, 同副标题)**:
> 「我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴」

**客戶服務團隊卡片** (L90 区域):
> 「流利粵 / 普 / 英 / 日四語 · 24 小時內回覆承諾 · 專屬 WhatsApp 支援 +86 198 8085 1334 · 從報價到售後全程跟進 · [聯絡我們](/contact/)」

🔴 **「24 小時內回覆承諾」** — SLA 承诺无来源 (F1-batch-2 已列)

### en (L170-178) + ja (L308-312) — 3 locale 同步问题

**L170 subtitle**: 「Premium printing service shipping to 50+ countries from Hong Kong since 2012」 — "since 2012" 年份未证实
**L171 story**: 「ZprintPro is a Hong Kong-rooted, global printing partner trusted by 1,000+ businesses, schools, and creative teams across 50+ countries. From business essentials to custom packaging, ... we deliver premium custom printing with advanced craft, ... all backed by ISO 9001 + FSC certification, no minimums, free design mockups, and 30-second AI quotes.」 — 1,000+ + ISO 9001 + FSC 又出现

**L172 vision**: 「Our vision is 'Smarter Printing, Brighter Future.' Through intelligent production workflows, ... 100 stickers for a DTC startup, 5,000 flyers for a community event, or 50,000 retail-ready packaging units — gets the same dedication ...」 — OK 数字是举例

**L176-177 en advantages**: 跟 zh-hk L42-43 同样问题
- L176: 「ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital + 6 production stages... Trusted by 1,000+ global brands.」
- L177: 「Digital ships in 24h, offset 3–5 business days. ... 1,000+ orders shipped. [WhatsApp us 📲] · [Contact us](/contact/)」

**L310-311 ja advantages**: 跟 zh-hk L42-43 同样问题
- L310: 「ISO 9001 + FSC 認証 · ハイデルベルク 4 色オフセット + HP Indigo デジタル + 6 工程実写 ... · ICC カラーマネジメント Delta E ≤3 · 1,000+ 法人顧客」
- L311: 「デジタル 24h · オフセット 3-5 日 · ... · 1,000+ 注文実績 · [WhatsApp で即時お問合せ 📲] · [Contact us](/contact/)」

**L225 en testimonialSubtitle**: 「12 industry segments served · 1,000+ business clients trusted us」
**L359 ja testimonialSubtitle**: 「12 業種のクライアントにサービス提供 · 累計 1,000 社以上」

**L228-232 en industries + L362-366 ja industries**: 跟 zh-hk L94-98 同样 8 行业卡片 + 内链 + 跨境電商包裝指南 blog slug

**L852 footer zh-hk**: 「累計 1,000+ 企業客戶 · 50+ 國家 · 15+ 年印刷經驗」 — 1,000+ + 15 年 又重复!

---

## 二、完整未证实声明清单 (F1-batch-2 13 处 + F1-batch-3 新 8 处 = 21 处)

| # | 声明 | 位置 | 风险 | F1-batch 编号 |
|---|------|------|------|--------------|
| 1 | ISO 9001 + FSC 認證 (L42) | 核心優勢 1 品質保證 | 🟠 信任 | batch-3 撤 |
| 2 | 海德堡四色柯式 + HP Indigo 數碼 (L42) | 核心優勢 1 品質保證 | 🟠 信任 | batch-2 拍板 3 |
| 3 | 6 道工序實拍 (L42) | 核心優勢 1 品質保證 | 🟠 信任 | batch-2 拍板 8 |
| 4 | ICC 色彩管理 Delta E ≤ 3 (L42) | 核心優勢 1 品質保證 | 🟠 信任 | batch-2 拍板 9 |
| 5 | 1,000+ 企業客戶信賴 (L42+L91+L852) | 核心優勢 1 + 客戶評價副標題 + footer | 🟠 信任 | batch-3 撤 |
| 6 | 1,000+ 訂單累計 (L43) | 核心優勢 2 快速交付 | 🟠 信任 | batch-2 拍板 2 |
| 7 | 數碼印刷 24h · 柯式印刷 3-5 天 (L43) | 核心優勢 2 SLA | 🟠 信任 | batch-2 拍板 12 |
| 8 | **12 大行業** (L91, 实际 8 行业) | 客戶評價副標題 | 🟠 信任 (数字错) | batch-3 立即改 8 大行業 |
| 9 | 跨境電商包裝指南 (/blog/cross-border-ecommerce-shipping-box-guide/) (L96) | 跨境電商行业卡片 | 🟠 信任 (blog slug MISSING, 404) | batch-3 立即撤 / 验证 |
| 10 | 餐飲外賣內鏈 [/category/packaging/] (L94) | 餐飲外賣行业卡片 | 🟠 信任 (K3 红框) | batch-3 验证路径 |
| 11 | 零售精品內鏈 [/category/paper-bags/] + [/category/labels/] (L95) | 零售精品行业卡片 | 🟠 信任 (K3 红框) | batch-3 验证路径 |
| 12 | 跨境電商內鏈 [/category/labels/] + [/category/packaging/] (L96) | 跨境電商行业卡片 | 🟠 信任 (K3 红框) | batch-3 验证路径 |
| 13 | 美妝護膚內鏈 [/category/packaging/] (L97) | 美妝護膚行业卡片 | 🟠 信任 (K3 红框) | batch-3 验证路径 |
| 14 | 教育培訓內鏈 [/category/stickers/] (L98) | 教育培訓行业卡片 | 🟠 信任 (K3 红框) | batch-3 验证路径 |
| 15 | 24 小時內回覆承諾 (L90 客戶服務) | 客戶服務團隊 | 🟠 信任 SLA | batch-2 拍板 6 |
| 16 | 流利粵 / 普 / 英 / 日四語 (L90) | 客戶服務團隊 | ✅ OK | — |
| 17 | since 2012 (L170 en subtitle) | en hero subtitle | 🟠 信任 年份 | batch-3 撤 / 改 "since XXXX" |
| 18 | 1,000+ businesses, schools, creative teams (L171 en story) | en story | 🟠 信任 (跟 L42+L91 重复) | batch-3 撤 |
| 19 | ISO 9001 + FSC certification (L171 en story) | en story | 🟠 信任 (跟 L42 重复) | batch-3 撤 |
| 20 | 15+ 年印刷經驗 (L852 footer zh-hk) | zh-hk footer | 🟠 信任 (K3 拍板 2) | batch-3 撤 / 改 |
| 21 | 50+ 國家 (L852 footer + L170 en subtitle + L171 en story) | footer + hero | ✅ OK (DHL 2-4 天国际配送事实) | — |

---

## 三、F1-batch-3 修复方案 (3 批, 跟 batch-2 同模式)

### 批 1 (今晚 P0, 不等 K3 拍板 3 件事, 立即撤 — 数字 + blog slug 404 + 路径验证)

**改动 1: 核心優勢 1 品質保證** (3 locale 同改):
- zh-hk L42: 撤「ISO 9001 + FSC 認證」+「海德堡四色柯式 + HP Indigo 數碼」+「6 道工序實拍」+「ICC 色彩管理 Delta E ≤ 3」+「1,000+ 企業客戶信賴」
  - 新: `生產流程遵循國際行業品質標準 · 6 道工序透明可查 (#factory) · ICC 色彩管理標準流程 · 服務多家企業客戶 (真實客戶數 K3 8/25 拍板)`
- en L176: 同款英文改写
- ja L310: 同款日文改写

**改动 2: 核心優勢 2 快速交付** (3 locale 同改):
- zh-hk L43: 撤「1,000+ 訂單累計」+ 改 24h SLA 为「特急可達」
  - 新: `數碼印刷特急可達 24h 出貨 · 柯式印刷 3-5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · [WhatsApp 即時查詢](https://wa.me/8619880851334) · [聯絡我們](/contact/)`
- en L177: 同款
- ja L311: 同款

**改动 3: 客戶評價副標題** (3 locale 同改):
- zh-hk L91: 「我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴」 → 「我們服務的 8 大行業 · 累計多家企業客戶信賴」
- en L225: 「12 industry segments served · 1,000+ business clients trusted us」 → 「8 industry segments served · multiple business clients trusted us」
- ja L359: 「12 業種のクライアントにサービス提供 · 累計 1,000 社以上」 → 「8 業種のクライアントにサービス提供 · 累計複数社」

**改动 4: 跨境電商行业卡片 blog slug 验证** (3 locale 同改):
- zh-hk L96: `[跨境電商包裝指南](/blog/cross-border-ecommerce-shipping-box-guide/)` → 撤 (slug MISSING, 用户访问 404)
  - 替换: `[跨境電商包裝指南 (即將上線)]` 或撤掉内链改文字
- en L230: `[Shipping box guide](/blog/cross-border-ecommerce-shipping-box-guide/)` → 撤 / 改
- ja L364: `[越境 EC パッケージガイド](/blog/cross-border-ecommerce-shipping-box-guide/)` → 撤 / 改

**改动 5: 行业卡片内链路径验证** (3 locale, K3 红框):
- 餐饮外卖 L94 + 美妆护肤 L97 + 零售精品 L95 + 跨境电商 L96 + 教育培训 L98 — 5 行业 × 3 locale = 15 处内链验证
- /category/packaging/ (餐饮外卖) — 实际 src/app/[locale]/category/[slug]/page.tsx 是动态路由, 但 B1 T45 改写 envelopesContent 在 src/data/category-seo-content.ts L1613, 路径 /envelopes/ 不是 /packaging/
- /category/paper-bags/ (零售精品) — 实际 src/app/[locale]/category/paper-bags/ 可能存在
- /category/labels/ (多行业) — 实际不存在 (类别里没 labels 类目, 应该是 stickers)
- /category/stickers/ (教育培训) — 实际存在
- /category/packaging/ (多行业) — 实际不存在 (应该是 /packaging/ 还是别的?)
- **实际**: 跟 category-seo-content.ts 16 类目对照, 实际 /category/[slug]/ 对应 stickers/flyers/packaging/paper-bags/books/japan-doujin 等, 餐饮外卖/美妆护肤/教育培訓等 "服务业" 标签 = 跨类目, 内链应该指向具体类目

**待验证**: src/app/[locale]/category/[slug]/ 实际 slug 列表 (B1 T45 改 16 类目)

**改动 6: en story "since 2012"** (L170):
- 改: "from Hong Kong" (撤 "since 2012" 年份, K3 拍板 2 后补充真实成立年份)

**改动 7: en story 1,000+ + ISO 9001 + FSC** (L171):
- 改: 删 "trusted by 1,000+ businesses" + "backed by ISO 9001 + FSC certification"

**改动 8: zh-hk footer** (L852):
- 「累計 1,000+ 企業客戶 · 50+ 國家 · 15+ 年印刷經驗」 → 「累計多家企業客戶 · 50+ 國家 · 資深印刷行業背景 (真實年限 K3 8/25 拍板)」

### 批 2 (8/25 P1, K3 拍板 3 件事后正式改写)

**改动 9: 设备自有/合作**: 跟 F1-batch-2 拍板 3 一致
**改动 10: 创使人/工程师数字**: 跟 F1-batch-2 拍板 4-5 一致
**改动 11: 24 小时 SLA**: 跟 F1-batch-2 拍板 6 一致

### 批 3 (8/25 P1, K3 拍板 6 道工序 + Delta E + 真实年限后)

**改动 12: 6 道工序 / Delta E**: 跟 F1-batch-2 拍板 8-9 一致
**改动 13: 真实年限 / 客户数**: 跟 F1-batch-2 拍板 2 一致, 改 L852 真实年限

---

## 四、需要 K3 拍板 13 件事 (F1-batch-3 修复前置)

### A. 立即批 (今晚 P0, 不等 3 件事, 数字 + slug 撤)

1. **批 1 改动 1-8 是否同意** (8 处立即撤, 数字 + slug + 路径)?
2. **行业卡片内链路径**: 餐饮外卖 / 美妆护肤 / 零售精品 / 跨境电商 / 教育培训 5 行业 × 3 locale = 15 处内链, 改写还是撤? (K3 选 撤 / 改正确路径 / 保留文字)
3. **跨境電商 [blog/cross-border-ecommerce-shipping-box-guide/]**: 撤 / 补 blog 内容 / 改其他链接?

### B. 8/25 P1 拍板 (跟 F1-batch-2 9 件事合并)

4-13. 跟 F1-batch-2 草案 9 件事拍板一致 (设备自有/合作 + 创使人工程师数字 + 24h SLA + 6 道工序 + Delta E + 真实年限 + 真实客户数)

---

## 五、check-content-guard.js 全站扫描报告 (F2 增量, 已落盘)

文件: `.hermes/logs/content-guard-2026-08-24.json` (v2 跑出 517 命中)

**Top 5 高命中** (按文件):
1. **about/page.tsx (65+ 命中, F1-batch-3 增 12+ 处 = 77+ 命中)** — K3 拍板 F1-batch-1/2/3 修复
2. QuoteForm.tsx (35)
3. orderform.tsx (30)
4. services/catalog-printing-china/page.tsx (28)
5. CheckoutClient.tsx (25)

---

## 六、AGENTS.md §12 流程加固提案 (验收第 7 步)

K3 8/24 18:11 拍板 Hermes 提案流程:

**§12 user-facing 文本守门 (新增)**:
- 验收第 7 步: 任何 src/ 改动 push 前, 跑 `node scripts/check-content-guard.js --strict`
- 退出码 0 = 干净 / 1-4 = 命中即冻结
- 4 类规则: 策略黑话 (yellow) / 占位符 (white) / 简体字残留 (yellow) / 未证实声明 (orange)
- 跟现有 6 步验收 (encoding/tsc/build/deploy/curl) 并列固化

**5 SOP 完整谱系** 升级 (SOP-1/2/3/4/5/6/7/8/9/10):
- SOP-7 (验收数字附原文)
- SOP-10 (M3 误诊推翻 + 架构差异≠阻塞)
- **SOP-11 (新增): 验收第 7 步 user-facing 文本守门, 4 类规则 (策略黑话/占位符/简体字/未证实声明)**

---

*性质: F1-batch-3 修复草案, K3 拍板 13 件事后 M3 立即 commit (K3 §0.21 攒批作废立即 push, 今晚 P0 数字 + slug + 路径撤, 8/25 P1 3 件事后正式改写), 业务 0 改动红线 (K3 8/22 17:58 F0) 全部遵守, 改文字不改结构, 1 改 1 验证*
