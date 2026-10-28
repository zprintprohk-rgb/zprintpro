# 2026-10-29 blog-deepfix 车道报告（K3 手动「立即执行」）

**VERDICT: OK** — 按最新 GSC 28d imps 排序选中 roll-up-banner-printing-guide（zh-hk 页 390 imps @ pos 21.12 高曝光未达标页），三语重写至 12 铁律达标（段 FAIL 10→0），已推送 e2ece10a。
**CONSUMED:** GSC 28 天三站点汇总导出（K3 2026-10-29 01:16-01:23 导出，网页 sheet 246 个 blog 页）+ blog-12seg-baseline.json（schema v1，54 条 FAIL）+ blog-data 三语全文 + products.ts roll-up-banners SKU 真值。
**DELIVERED:** 3 个 blog-data JSON 重写（每 locale 8 问句 H3 深潜 + 客户案例段(待校准) + E-E-A-T 合规段 + en 首段≤200 + 补 excerpt/schemas 字段 + lastUpdated=2026-10-29）；基线台账 54→44（自动递减 10 条，随批提交）；证据 JSON 留档。
**NEXT:** ① CF build 完成后续 6 URL curl + 段12 online 断言复核；② zh/ja 长度同步 80% 缺口（现 53%/59%）列入后续 blog-deepfix 批次；③ 其余 44 条存量 FAIL 按周批次续清。

**RECOVERY: 109.9%**（full-country caliber，双方法：method_1 785.43/714.71=109.9% 采纳；method_2 107.2%；2.7pp 一致，来源 gsc-daily-anomaly-2026-10-29.json）

**BUS_UNAVAILABLE:** run-context-blog-deepfix.json 缺失 + lane-runs/.jsonl 缺失 + lane-status.json 无 blog 行 → 结果总线未就绪（§0.35.3 契约消费方 = 执行层自身）。本报告按契约照常产出，不虚构「上一轮已完成」。

数据来源:
- GSC 28天三站点汇总...2026-10-29.xlsx（K3 2026-10-29 01:16-01:23 导出；网页 sheet；246 blog 页 imps 排序）
- blog-12seg-baseline.json（schema blog-12seg-baseline/v1，updated_at 2026-10-15；54 条 FAIL → 本轮后 44）
- products.ts roll-up-banners SKU 真值（尺寸 850×2000/1000×2500/1200×3000mm；倍率 ×1/1.5/2.2；布料 surcharge 0/30/50；加工 0/20/30；数量 1/5/10 折 1/0.8/0.65；HK$85-300/套；10 套起印）
- K3 拍板 12 件事（15 年 / ISO 9001 / 24h SLA；全为已拍板真实数据）
- 联网搜索 8 query（kapa99.com / 4over4.com / vslprint.com / printnpack.ie / uprinting.com / northcoastbanners.com / flintgrp.com / indexbox.io）——内容数字 100% 走白名单，未引用第三方数字（§0.36.2#1）

---

## 1. 当日修复 blog 清单（1 篇，3 locale）

| 项 | 值 |
|---|---|
| slug | `roll-up-banner-printing-guide`（易拉架/ロールアップバナー/Roll-up banner） |
| 选文理由 | GSC 28d imps 排序：zh-hk 页 **390 imps @ pos 21.12**（高曝光未达标页，clk 2/CTR 0.51%）；en 页 52 imps @ 9.31 亦 FAIL（段 1/3/6/7）；ja 页 3/6/7 FAIL → 属任务 5 步「GSC 高 imp + 3 loc 不一致」优先类 |
| 排除说明 | poster-printing-guide 28d imps 1427（第 1）但其 zh-hk 页已达标（P3 Pillar 已 12 铁律重写），未达标部分仅 en/ja 页（2/1 imps）→ 不选；folded-leaflet 499 / saddle-stitch 337 / book-buying 297 均已达标 → 不选 |
| 修复对象 | en（段 1/3/6/7 FAIL）、ja（段 3/6/7）、zh-hk（段 3/6/7）——共 10 条段级 FAIL |

## 2. 联网搜索 query 列表（8 条，数据来源 SSoT）

1. roll up banner printing price 2026 minimum order quantity trade show
2. roll up banner standard sizes 850x2000 1000x2500 1200x3000
3. retractable banner mesh vs vinyl fabric outdoor vs indoor choice
4. banner printing lead time digital proof 1 hour industry standard
5. trade show banner printing turnaround time standard 5 to 7 working days
6. EU REACH ink compliance printing materials European market
7. banner printing eyelets pole pocket grommets options meaning
8. roll up banner reusable graphics replacement stand recycling

命中来源：kapa99.com（roll-up 尺寸 2026）/ 4over4.com（vinyl-mesh-fabric 类型）/ vslprint.com（大幅面交期）/ printnpack.ie（爱尔兰 roll-up 规格）/ uprinting.com（横幅悬挂）/ northcoastbanners.com（横幅生产时间）/ flintgrp.com（EU 墨水合规）/ indexbox.io（EU 印刷墨水市场）。
口径说明：内容数字 100% 来自 products.ts 白名单 + K3 拍板 12 件事，未引用上述第三方数字（§0.36.2#1「查不到改白名单」+ 禁编造 Reference）。

## 3. 修复内容摘要（每 locale）

- **en**（14,996 → 19,664 chars，+23%）：首段 487→**167 字**直接回答（段 1 FAIL→PASS）；新增 **8 个问句 H3**（尺寸点选/计价阶梯/布料选择/后加工时机/文件规格/交期/换芯重用/10 套折扣）+ **客户案例段**（Customer Case，含「pending case-library calibration」待校准标记，段 6 FAIL→PASS）+ **E-E-A-T 段**（LinkedIn + FDA 21 CFR + EU REACH + ISO 9001 + 15 年，段 7 FAIL→PASS）；H2 10 + H3 8 = 18 段锚，问句 12/18（67%）。
- **zh-hk**（8,322 → 10,365，+25%）：同构 8 问句 H3（港式繁体原生）+ 客戶案例段（待案例庫校準）+ E-E-A-T（智印港 15 年工程团队）；问句 12/18（67%）。
- **ja**（9,132 → 11,609，+27%）：同构 8 问句 H3（敬语原生）+ 導入事例段（校正待ち）+ E-E-A-T；另 2 个陈述式 H2 转问句（後加工と付属品はどんな場面で必要？/ ご発注の流れと納期は？）；问句 10/18（56%）。
- **全 3 locale 共性**：补 `excerpt` + `schemas`（Article/FAQPage/BreadcrumbList/HowTo/Organization）字段（blog-standard-guard 检查 4/8 要求）；lastUpdated→2026-10-29；FAQ 6 组格式未动（precheck-faq-format PASS 8/8）；CTA 3 处未动；内链 11-15 条未动；表格 3 张未动；2 位数字 90-132 个 + 资料来源标记（段 5 PASS 保持）。
- **12 段骨架**：PASS 33 / FAIL 0 / WARN 0 / SKIP 3（段 12 线上断言待 build 完成后判定）。
- **长度同步**：en 19,664 / zh 10,365（53%，+2043）/ ja 11,609（59%，+2477）；80% 目标缺口列入 NEXT（全站同类现状：doujin 64% / folded 55% / poster-ja 70%）。

## 4. 5 步 verify 证据

1. **check-encoding**：✅ PASS（7 个 staged 文件 UTF-8 LF）
2. **tsc --noEmit**：✅ 54 errors = 基线持平（§0.25.10.3 口径 54=54，JSON 改动不涉 TS）
3. **npm run build**：✅ PASS（exit 0；sitemap 723 URLs；Blog 121 页）
4. **push**：✅ e2ece10a（`696413b2..e2ece10a main -> main`）；pre-push 门童 #14 基线对账 44/44、0 条新增段级 FAIL + 门童 #21 规则翻译层 0 命中
5. **curl 200**：✅ CF Pages build **success**（run 123017263818，deploy live）后 6 URL 全 200（roll-up × 3 locale + 对照 trade-show × 3）；roll-up 三语新内容 marker 线上生效（客户案例 / Customer Case / 導入事例）+ application/ld+json 含 FAQPage（见下方补充）

## 5. GSC 命中词保护校验（修复前 vs 修复后，0 删）

| locale | 代表短语 before→after | 判定 |
|---|---|---|
| en | roll-up banner 9→11 / 10 sets 7→9 / HK$85-300 4→5 / 5-7 working day 4→5 / digital proof 7→10 / exhibition 7→12 | 全部 ≥ 修复前 |
| zh-hk | 易拉架 16→25 / 10 套 8→14 / 打稿 10→15 / 展會 7→13 / 網孔布 8→13 | 全部 ≥ 修复前 |
| ja | ロールアップバナー 11→14 / 10 セット 8→14 / 校正 11→17 / 展示会 7→11 | 全部 ≥ 修复前 |

- H1 / title / meta_description / slug：**未改动**（title 当量 zh 53 / en 51 / ja 56，均落 50-57 带）
- 现有段落：**0 删**（仅 en 首段重写为 ≤200 字答案前置，命中词保留于新首段与全文）
- 全量短语清单：`.hermes/_probe-pb/_gsc-protect.py`（3 locale × 13 短语逐一 before/after）

## 达标率更新（blog-12seg-baseline.json）

**基线 54 / 现存 44 / 已修 10 / 剩余待修 44**（本轮自动递减 10 条：en 1/3/6/7 + ja 3/6/7 + zh 3/6/7；台账已随 e2ece10a 提交）

---

## 补充（build 完成后终验，2026-10-29 02:28）

- **CF Pages build**：✅ success（run 123017263818，`verify-deploy.mjs e2ece10a` → PASS deploy live）
- **curl 6 URL 全 200**：
  - /zh-hk/blog/roll-up-banner-printing-guide/ 200 | 客户案例OK | LD+ FAQPage | 174,125 B
  - /en/blog/roll-up-banner-printing-guide/ 200 | CustomerCaseOK | LD+ FAQPage | 208,064 B
  - /ja/blog/roll-up-banner-printing-guide/ 200 | 導入事例OK | LD+ FAQPage | 175,911 B
  - trade-show-banner-printing-guide × 3 locale（对照）200
- **门童 #14 段 12 线上断言**：三语全 PASS——generated=[WebSite,Article,BreadcrumbList,SpeakableSpecification,FAQPage,HowTo]，内嵌 JSON-LD = 0（无重复渲染），blocks 6+0
- **12 段骨架最终态**：**PASS 36 / FAIL 0 / WARN 0 / SKIP 0 / INVALID 0**（三语 12 铁律 100% 达标，含线上断言）
- **git 状态**：内容 push e2ece10a（origin_ssh/main 同步）；本报告本地 commit a4cee741（docs-only，未达 §0.25.9 攒批阈值，push 留下一周期）
