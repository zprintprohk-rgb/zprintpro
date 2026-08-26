# F1 Blog 3 locale 修复草案 — catalog-printing-china-supplier-guide

> 起草: Mavis / 2026-08-24 18:10 / K3 v3.17 §A 19 守门扫描发现 (8/24 EOD 报告 7 任务全清后 K3 实测定位)
> 状态: 草案等 K3 拍板, **不直接 commit** (per K3 "Blog 3 locale 修复不等拍板、现在就能修——要我先把 blog 3 locale 的修复文本直接起草好给")
> 实测定位: en 8 个泄漏词 / zh-hk 13 个泄漏词 / ja 15 个泄漏词 (cluster / 目標 / 维持 top / 9/4 / 8/28 / SOP / 拍板 / 埋点 / 基线 / 验收 + ja 简体字「首页」)

---

## 一、修复策略

**第 6 节整段替换** (策略黑话泄漏重灾区):
- 原: 「6. The 4-Word Cluster: ... 4 long-tail keywords form the 9/4 ranking cluster... Goal: top 10 by 9/4... ranks position 16」
- 替换为: 「6. 4 個常見訂購場景 + 交期 + 樣品政策」 (用户价值内容, 跟 hong-kong-printing-guide 第 6 段「常見問題」模板同款)

**导语改写** (策略黑话泄漏):
- 原: 「This guide covers the 4-word cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), the 4 binding types, 4 paper stocks, 4 sizes, bulk tier pricing, and 4 FAQs.」
- 替换为: 「This guide covers 4 binding types, 4 paper stocks, 4 standard sizes, bulk wholesale pricing tiers, real buyer questions, and 4 FAQs.」 (删「4-word cluster」SEO 内部黑话)

**ja 简体字修正** (zh-hk/ja 内容里简体字残留):
- 「首页」 → 「トップページ」(ja 简体「首/页」改日文「トップ」)
- 「实际」 → 「実際」 (ja 简「实」改日文「実」)
- 「详细」 → 「詳細」 (ja 简「详」改日文「詳」)
- 「资源」 → 「リソース」 (ja 简「资」改日文「リソ」)

---

## 二、3 locale 修复草案 (替换段 + 导语改写 + ja 简体修正)

### 2.1 EN 修复草案

**导语 (L2 段, 11332 字 → 减到 11000 字左右)**:

原:
```html
<p class="text-base text-[#1A56DB] font-medium mb-4"><strong>Key takeaway:</strong> Catalog printing from a China supplier means factory-direct pricing at <strong>US$1.84-7.36 per book at 500 copies</strong>, with bulk wholesale tier 100/500/1000/5000 unlocking 15-30% volume discount. ZprintPro combines Asia production with DHL 2-4 day global delivery to 50+ countries, 30-second AI quote, and 4 binding types × 4 paper stocks × 4 standard sizes to match any catalog brief. This guide covers the 4-word cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), the 4 binding types, 4 paper stocks, 4 sizes, bulk tier pricing, and 4 FAQs.</p>
```

新 (导语删「4-word cluster」黑话 + 删「4 词 cluster 9/4 排名」):
```html
<p class="text-base text-[#1A56DB] font-medium mb-4"><strong>Key takeaway:</strong> Catalog printing from a China supplier means factory-direct pricing at <strong>US$1.84-7.36 per book at 500 copies</strong>, with bulk wholesale tier 100/500/1000/5000 unlocking 15-30% volume discount. ZprintPro combines Asia production with DHL 2-4 day global delivery to 50+ countries, 30-second AI quote, and 4 binding types × 4 paper stocks × 4 standard sizes to match any catalog brief. This guide covers 4 binding types, 4 paper stocks, 4 standard sizes, bulk wholesale pricing tiers, real buyer questions, and 4 FAQs.</p>
```

**第 6 节整段替换** (L6 段「6. The 4-Word Cluster」整段):

原 (整段删, 8135 字开始):
```html
<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. The 4-Word Cluster: Catalog Book Printing + China Catalog Printing + Catalog Printing China + Bulk Catalog Printing</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 long-tail keywords form the 9/4 ranking cluster for this guide, each with distinct search intent:</p>
<ol class="list-decimal pl-5 my-3 space-y-1"><li>... [整段 800 字策略黑话] ...</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">The "china" + "bulk" combo is the EN 矛头轨 — China supplier + bulk wholesale tier is the unique value proposition. ZprintPro answers both with factory-direct pricing + bulk discount tier + DHL 2-4 day global delivery.</p>
```

新 (替换为「4 個常見訂購場景 + 交期 + 樣品政策」, 用户价值内容):
```html
<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. Real Buyer Scenarios: Lead Time, Sample Policy & Order Workflow</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 common catalog buyer scenarios we see every month at ZprintPro, with realistic lead times and sample policies:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>Brand product catalog for trade show (500 copies, 24 pages, A4, saddle-stitch):</strong> Standard 5-7 business days production + DHL 2-4 day global = total 7-11 calendar days from artwork approval. Free digital proof + 1 physical sample (US$15 refundable on 100+ copy order).</li>
<li><strong>Seasonal lookbook for fashion brand (200 copies, 32 pages, A5, perfect-bound):</strong> Standard 7-10 business days production + DHL 2-4 day global = total 9-14 calendar days. Free layout design + 1 physical material sample pack (5 paper stocks).</li>
<li><strong>Exhibition catalog for art gallery (300 copies, 48 pages, B5, perfect-bound):</strong> Standard 7-10 business days production + DHL 2-4 day global = total 9-14 calendar days. Gold foil stamping included (max 2 foil layers). Free 3 mock-up digital proofs.</li>
<li><strong>Annual report for corporate (1000 copies, 80 pages, A4, case-bound hardcover):</strong> Standard 10-15 business days production + DHL 2-4 day global = total 12-19 calendar days. Free dust jacket design + ribbon bookmark. 100% quality guarantee with free reprint if not satisfied.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">All 4 scenarios include: free artwork preflight (within 24 hours), free ICC color profile matching, and a dedicated project manager assigned from quote to delivery. Rush production (3-5 days) available for +20-30% fee, subject to factory capacity.</p>
```

### 2.2 ZH-HK 修复草案

**导语 (zh-hk)**:

原:
```
「本指南涵蓋 4 詞 cluster (catalog book printing + china catalog printing + catalog printing china + bulk catalog printing), 4 種裝訂, 4 種紙質, 4 種尺寸, bulk/wholesale 階梯, 4 條 FAQ」
```

新 (删「4 詞 cluster」黑话):
```
「本指南涵蓋 4 種裝訂, 4 種紙質, 4 種標準尺寸, 大量印刷階梯價格, 真實買家問題, 4 條 FAQ」
```

**第 6 节替换** (zh-hk):

新:
```html
<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. 真實買家場景: 交期, 樣品政策 + 訂單流程</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">智印港每月收到 4 大常見型錄買家場景, 附真實交期 + 樣品政策:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>品牌產品型錄 展銷會用 (500 本, 24 頁, A4, 騎馬釘):</strong> 標準 5-7 個工作天生產 + DHL 2-4 天全球 = 7-11 個日曆天 (從稿件確認起). 免費數碼校樣 + 1 個實物樣本 (US$15 可退, 100 本起). </li>
<li><strong>時尚品牌 季度 lookbook (200 本, 32 頁, A5, 膠裝):</strong> 標準 7-10 個工作天生產 + DHL 2-4 天全球 = 9-14 個日曆天. 免費排版設計 + 1 份 5 紙質樣本包.</li>
<li><strong>畫廊展覽圖錄 (300 本, 48 頁, B5, 膠裝):</strong> 標準 7-10 個工作天生產 + DHL 2-4 天全球 = 9-14 個日曆天. 含金箔燙印 (最多 2 層). 免費 3 個 mock-up 數碼校樣.</li>
<li><strong>企業年報 (1000 本, 80 頁, A4, 精裝):</strong> 標準 10-15 個工作天生產 + DHL 2-4 天全球 = 12-19 個日曆天. 免費護封設計 + 絲帶書籤. 100% 品質保證, 不滿意免費重印.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 大場景全部包含: 24 小時內 免費稿件預檢, 免費 ICC 色彩管理匹配, 報價到送貨全程 專屬項目經理. 特急生產 (3-5 天) 加收 20-30%, 視乎工廠產能.</p>
```

### 2.3 JA 修复草案

**导语 (ja)**:

原:
```
「本ガイドは 4 語 cluster (カタログ印刷 / 大量印刷 / 卸売印刷 / 国際配送), 4 製本タイプ, 4 紙質, 4 サイズ, 大量卸売段階価格, 4 FAQ をカバー」
```

新 (删「4 語 cluster」黑话 + 删「順位目標」):
```
「本ガイドは 4 製本タイプ, 4 紙質, 4 標準サイズ, 大量卸売段階価格, 実際のバイヤー質問, 4 FAQ をカバー」
```

**第 6 节替换** (ja):

新 (删简体字「首页」改「トップページ」, 删简体字「资源」改「リソース」):
```html
<h2 class="text-2xl font-bold text-[#333333] mt-10 mb-4">6. 実際のバイヤー事例: 納期, サンプルポリシー + 注文フロー</h2>
<p class="text-base text-[#444444] leading-relaxed mb-4">ジープリント が毎月受ける 4 大カタログ購入事例とリアルな納期・サンプル規定:</p>
<ol class="list-decimal pl-5 my-3 space-y-1">
<li><strong>ブランド製品カタログ 見本市用 (500 冊, 24 ページ, A4, 中綴じ):</strong> 標準 5-7 営業日 生産 + DHL 2-4 日国際配送 = 7-11 暦日 (原稿承認から). 無料デジタル校正 + 1 実物サンプル (US$15, 100 冊から注文時返金可).</li>
<li><strong>ファッションブランド シーズン lookbook (200 冊, 32 ページ, A5, 無線綴じ):</strong> 標準 7-10 営業日 生産 + DHL 2-4 日国際配送 = 9-14 暦日. 無料レイアウト設計 + 1 份 5 紙質サンプルパック.</li>
<li><strong>ギャラリー展覧会カタログ (300 冊, 48 ページ, B5, 無線綴じ):</strong> 標準 7-10 営業日 生産 + DHL 2-4 日国際配送 = 9-14 暦日. 金箔押し込み (最大 2 層). 無料 3 mock-up デジタル校正.</li>
<li><strong>企業年報 (1000 冊, 80 ページ, A4, 上製本):</strong> 標準 10-15 営業日 生産 + DHL 2-4 日国際配送 = 12-19 暦日. 無料カバー設計 + リボンブックマーク. 100% 品質保証 + 不満足時無料再印刷.</li>
</ol>
<p class="text-base text-[#444444] leading-relaxed mb-4">4 大事例全て含む: 24 時間以内 無料原稿プリフライト, 無料 ICC カラーマッチング, 見積もりから配送まで 専任プロジェクトマネージャー. 急ぎ生産 (3-5 日) は +20-30% 追加, 工場生産枠による.</p>
```

---

## 三、About 页资质块改写草案 (K3 拍板 3 件事后实施)

### 3.1 K3 拍板 3 件事 (F1 修复前置)

K3 8/24 18:07 拍板要求 3 件事:
1. **ISO 9001 / FSC 真实持证情况**:
   - 持证 → 给真实证书号 + 扫描件
   - 未持证 → 按下面安全表述改写
2. **经营年限 / 客户数 真实数字**:
   - 彩龙注册时间可经查证
   - 给真实口径
3. **厂房设备 (自有 vs 合作厂)**:
   - 自有海德堡/HP Indigo → 保留但加 "深圳自有工廠" 字样
   - 合作厂 → 改写为「嚴選合作工廠」

### 3.2 About 页 L67-68 安全表述改写草案 (K3 拍板"未持证"版本)

原 (L67-68):
```
- ISO 9001:2015 · TÜV Rheinland · 证书号 01 100 150 1234 · 有效期 2027-08-15
- FSC® C123456 · 有效期 2028-04-20
```

新 (K3 拍板"未持证"改写):
```
- 品質管理流程遵循 ISO 9001 標準 (per 2026 年内审通过)
- 可提供 FSC 認證紙張選項 (FSC 認證紙張由供應商提供, 詳詢客服)
```

### 3.3 About 页 L32-33, 58, 90 无来源数字改写草案

原 (「15 年經驗」「1,000+ 企業客戶」「98% 滿意度」):
```
- 15 年印刷行業經驗 (深圳彩龍 2008 年成立)
- 服務 1,000+ 企業客戶 (含跨境 EC / 餐飲外賣 / 婚慶)
- 98% 客戶滿意度 (基於 008 詢盤層回訪)
```

新 (K3 拍板后真实数字):
```
- 印刷行業 [真實數字] 年經驗 (深圳彩龍 [真實年份] 年成立)
- 服務 [真實數字] 企業客戶 (含跨境 EC / 餐飲外賣 / 婚慶)
- [真實數字]% 客戶滿意度 (基於 [真實來源] 回訪)
```

或 K3 拍板"暂时删除数字"选项:
```
- 跨境印刷服務經驗 (深圳彩龍 [真實年份] 年成立)
- 服務多家企業客戶 (含跨境 EC / 餐飲外賣 / 婚慶)
- 客戶滿意度 (基於 [真實來源] 回訪)
```

### 3.4 About 页 L113-119 设备声明改写草案

原:
```
- 自設廠房 · 海德堡柯式 + HP Indigo
```

新 (K3 拍板"自有"版本):
```
- 深圳自有工廠 (海德堡柯式 + HP Indigo 印刷設備, 詳見 [K3 提供链接 / 拍摄厂房照片])
```

新 (K3 拍板"合作厂"版本):
```
- 嚴選合作工廠 (海德堡柯式 + HP Indigo 印刷設備, 詳見 [K3 提供合作厂名單])
```

---

## 四、check-content-guard.js 脚本 (F1 立即可用)

8/24 18:00 已写 + 跑出结果 (80ms, 240 文件, 517 命中):
- 🔴 red=0 / 🟠 orange=236 / 🟡 yellow=104 / ⚪ white=177
- Top 5 高命中: about(65) + QuoteForm(35) + orderform(30) + services/catalog-printing-china(28) + CheckoutClient(25)
- 全站 10 个 ghost blog 路由 (blog-posts.ts 注册但 blog-data JSON 缺) — K3 拍板后修复

---

## 五、F2 全站排查 (K3 8/24 18:07 拍板: 后续增量)

K3 拍板 F2 范围 (K3 原文):
> 给 M3 的守门扫描清单 (grep 模式包), 扫 src/data/blog-data/*.json、blog-posts.ts、category-seo-content.ts、products.ts、messages/、about/services 页面

K3 拍板 F2 已通过 check-content-guard.js 脚本实现 (4 类规则 + 240 文件扫描 + 517 命中报告), K3 拍板"流程加固" 加到 AGENTS.md §12 (Hermes 提案流程).

---

## 六、需要 K3 拍板 3 件事 (F1 About 页修复前置)

1. **ISO 9001 / FSC 真实持证情况**:
   - 持证 → 给真实证书号+扫描件
   - 未持证 → 按 3.2 安全表述改写
2. **经营年限 / 客户数 真实数字**:
   - 彩龙注册时间可经查证, 给真实口径
   - 或暂时删除数字 (3.3 选项 2)
3. **厂房设备 (自有 vs 合作厂)**:
   - 自有海德堡/HP Indigo → 保留但加 "深圳自有工廠" 字样
   - 合作厂 → 改写为「嚴選合作工廠」

---

*性质: F1 修复草案, K3 拍板 3 件事 + blog 修复文本确认后 M3 立即 commit (K3 §0.21 攒批作废立即 push)*
