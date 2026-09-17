# v10 网站端执行细化卡（deepseek 照跑版）— Lane C + Lane A + Lane O 网站侧

> **生成**: 2026-09-17 | **依据**: K3 指令 v10（2026-09-17 06:40 签发）+ masterplan v1（9/9）+ 90 天 Track B（8/31）
> **范围**: 网站端（zprintpro.com，F:\zprintpro-main-tmp）——雷达/触达侧由 autoclaw 负责，本卡只做「网站端下功夫」
> **执行层**: deepseek harness（唯一）| **生产分支**: main（F:\zprintpro-main-tmp）

---

## 〇、网站端现状盘点（2026-09-17 实测）

| 资产 | 现状 | v10 缺口 |
|------|------|---------|
| /unsubscribe 三语页 | ❌ 生产 404（3 文件建在 redesign worktree F:\zprintpro-nextjs，未进 main） | **P0-1 必须部署**（合规前置） |
| quote 页 UTM | ❌ QuoteRedirect 只认 product 参数，**丢弃 UTM** | **P0-3 改造**（归因命脉） |
| api/quote | 有 `source` 字段（→ quote_requests.source），**无 utm_source/lead_id** | **P0-3 加字段** |
| G1 insights 模板 | ✅ 已上线（IndexVol1 + stats 带 n_basis + citeThis 块） | **Lane A 直接复用** |
| blog 内容 | ✅ 85 zh-hk / 86 en；v5.1 快速答案块 12 篇已上线 | **P0-4 三篇新选题** |
| Organization schema | ✅ 站点内已有（zh-hk 智印港 / en-ja ZprintPro） | **Lane A sameAs 补新账号** |
| 作业本 exercise-books | ✅ SKU 已存在 | 缺口只在 en 内容（v10 §拍板6） |

---

## 一、P0-1：/unsubscribe 三语页部署（合规前置，先于一切触达）

**现状**：3 文件完整可用但建在 `F:\zprintpro-nextjs`（redesign worktree，28 个未推提交）→ 生产 main 404。

**执行方案**（不碰 28 个未推提交，main-tmp 重建）：
1. 从 nextjs 复制 3 文件到 main-tmp 对应路径（Node 读写保证 UTF-8 LF）：
   - `src/app/[locale]/unsubscribe/page.tsx`（30 行，edge + generateStaticParams 3 locale）
   - `src/app/[locale]/unsubscribe/UnsubscribeClient.tsx`（125 行，三语文案 + fetch /api/unsubscribe + mailto/WhatsApp 兜底）
   - `src/app/api/unsubscribe/route.ts`（2736 B，guardApiRequest + Resend 通知 zprintpro@outlook.com，无 key 时跳过返回 ok）
2. 依赖 `src/lib/api-security.ts` ✅ 已在 main-tmp
3. **CF Pages 环境变量**：配 `RESEND_API_KEY`（quotes@zprintpro.com 域名已验）；未配时页面仍正常（API 返回 skipped）
4. commit + push（攒批：unsubscribe 3 文件 + P0-3 UTM 改造可同批）→ verify-deploy

**验收**：curl `https://zprintpro.com/zh-hk/unsubscribe/` → 200 三语切换正常；`/en/unsubscribe/`、`/ja/unsubscribe/` 200。

---

## 二、P0-3：UTM 归因链路（quote 页捕获 → api 落库 → 008 lead_source）

**v10 Spec 1**：`/zh-hk/quote/?utm_source={reddit|linkedin|quora|email|wa}&utm_medium=outreach&utm_campaign=lane-o-{品类}&utm_content={lead_id}`

**网站端 3 处改造**：

1. **QuoteForm.tsx**（30 KB，client）：挂载时 `window.location.search` 解析 UTM 5 参（utm_source/utm_medium/utm_campaign/utm_content/utm_term）→ state 保存 → 提交 body 附带。
2. **api/quote/route.ts**：schema 加 `utmSource/utmCampaign/utmContent`（optional string）→ 写入：
   - `quote_requests.source` = 优先 UTM source（值域 reddit/linkedin/quora/email/wa），落 UTM 缺失则维持原逻辑
   - `quotes.design_notes` 追加 `UTM: {src}/{campaign}/{lead_id}` 留底
3. **QuoteRedirect.tsx**：`/quote?product=xxx&utm_...` → 硬重定向目标 URL **保留 UTM 参数**（拼到 `/product/xxx/?utm_...`），保证从产品页发起报价时 UTM 不丢。

**008 侧**（运营表，非代码）：周报复盘按 `quote_requests.source` 分组 = 分车道 ROI；lead_id = utm_content 与雷达台账行号对账。

**验收**：`curl 'https://zprintpro.com/zh-hk/quote/?utm_source=reddit&utm_medium=outreach&utm_campaign=lane-o-stickers&utm_content=LD-0042'` → 页面 200；表单提交后 Supabase quote_requests.source = 'reddit'。

---

## 三、P0-4：P0 三篇 en blog（Candle/Soap → Self-Publishing → Etsy）

**队列规则**（v10 §四）：月曆季收尾 + GSC 4 簇补词（9/14 已派）之后 → P0 三篇插在 8 锁词之前 → P1 三篇（zines/journals/童书）10 月初。

**每篇必含**（v10 §四红线）：
1. v5.1 快速答案块（AEO，琥珀 + ⚡ 徽标，自动渲染）
2. FAQPage JSON-LD（3-4 问）
3. 「低 MOQ / 快样品 / 透明工厂」三要素段（雷达实证转化要素）
4. 内链到对应 PLP/SKU（e.g. product-label-printing-guide ↔ label 类目）

**第 1 篇选题卡：Candle & Soap Label Printing Guide（en）**
- 目标词：candle labels / soap labels / custom product labels small batch
- 雷达实证：r/candlemaking、r/soapmaking 高频（标签+盒子），复购型（季度/月度）
- AEO 答案块要点：「Candle labels, 500 pcs, from $0.18/pc — FDA food-safe, waterproof, small-batch friendly」
- 内链：product-label-printing-guide（已有）+ waterproof-stickers + food-packaging-printing-guide
- FAQ：FDA 合规？防水？最低起订？交期？

---

## 四、Lane A 权威建设（网站端三件）

1. **《Global Small-Batch Print Demand Report》Vol.1（10 月中，en）**
   - 复用 G1 模板：`src/lib/insights/` 新建 `index-vol2.ts`（同 IndexVol1 接口）+ `src/data/insights/` + 路由页
   - 数据源：雷达台账 139+ 条公开采集线索（Reddit/招标/新闻）——标注 methodology 为公开信息聚合（与 G1 的 quote_requests 实测口径区分）
   - citeThis 块 + sourceUrl → 媒体/AI 引用磁石
2. **Organization sameAs 同步**：Reddit/Quora/LinkedIn 公司页建成后，更新站点 Organization JSON-LD sameAs（en 侧 ZprintPro + ja ジープリント）
3. **en 30 目录**：复制 ja ジープリント公式（startup base / print directories / B2B 平台），月度 cron 推进

---

## 五、执行顺序（本周可落地）

| # | 任务 | 文件 | 状态 |
|---|------|------|------|
| P0-1 | unsubscribe 部署 | 3 文件重建 + CF env | ✅ 本批执行 |
| P0-3 | UTM 归因 | QuoteForm + api/quote + QuoteRedirect | 本批执行 |
| P0-4a | Candle/Soap guide | buying-guides.ts 三语完整版 + sitemap 收录（2ce4db49+d969459c 已推 9/17 19:12） | ✅ 已上线 |
| P0-4b | Self-Publishing blog | 同上 | 排期 |
| P0-4c | Etsy 小批量包装 blog | 同上 | 排期 |
| P1-5 | Quora/LinkedIn 公司页 + sameAs | 站外 + Organization schema | 站外账号就绪后 |
| P1-6 | 数据报告 Vol.1 大纲 | src/lib/insights/ | 10 月中 |

---

## 六、数据来源（§0.23）

- K3 指令 v10：docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md（2026-09-17 06:40 签发）
- 网站端现状：本卡生成时 main-tmp 代码实测（unsubscribe 缺失 / QuoteRedirect / api-quote / G1 模板）
- G1 模板先例：src/lib/insights/index-vol1.ts + /insights/hk-print-inquiry-index/（已上线）
- 雷达资产：F:\全球印刷资讯（deepseek 2026-09-17 穷尽读取；139 条线索 + keywords.json 336 词）
- 队列现状：daily-content 21:17 / weekly-meta 周五 23:07 / gsc-feedback 22:43（§0.34.3）

---

## 七、目录迁移记录（K3 铁律 2026-09-17）

**铁律**：F:\zprintpro-nextjs = 项目根目录（唯一生产工作目录）；redesign/plp-pdp-v9 仅设计版面预览；main-tmp 不再是生产目录。

**已执行（2026-09-17 19:12 完成）**：
1. F:\zprintpro-main-tmp worktree 已移除（.hermes 2329 文件备份至 nextjs/.hermes/_archive-main-tmp-20260917/，无未 push commit）
2. nextjs 已从 redesign/plp-pdp-v9 切到 **main** 分支 + 同步 origin/main（9f50eee1）
3. redesign 分支 2 个未推 commit 内容已保全：school-exercise-book → cherry-pick 净化版 745d7e5a；GSC 补词 8866703d = main 已有 13a2725e 同款（弃）
4. 工作区未提交工作（GMC 修复/cron 脚本等）经核对均为 main 已有或旧版，stash@{0} 保留备查
5. 3 commit 已推：745d7e5a（school-exercise-book 净化）+ 2ce4db49（Candle/Soap guide）+ d969459c（sitemap 收录 buying-guides）
6. 冲突文件 22 个归档至 nextjs/.hermes/_conflict-pre-migrate-20260917/

**后续纪律**：commit/push 一律在 F:\zprintpro-nextjs（main 分支）执行；redesign 分支仅设计版面时切换。
