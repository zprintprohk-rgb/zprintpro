# 年賀状 2027 早鸟页骨架 + blog 成稿核验 SSoT（2026-10-15）

> **任务来源**: K3 2026-10-15 指令（两周排程 `docs/2026-10-15-two-week-execution-plan.md` §2 10/16 行「年賀状页骨架+文案成稿（价格位留空待 K3）」+ §3 B1 + §7 K3 待办 1，K3 当日原话「做」开工）
> **执行**: 首席 SEO/AEO/GEO 数据战略分析师会话（blog-deepfix 专员批次延续）
> **结果**: ✅ 页面骨架已交付（drafts，3 个 K3 槽显式标记）✅ 深度 blog = **已存在**（10/09 daily lane 提前交付，幂等确认不重写）⏳ 唯一阻塞 = K3 待办 1 报价真值（死线 10/21），真值到 → 当日上线（runbook 40 分钟）

## 数据来源（per §0.23 / §0.33）

```
数据来源:
- products.ts（2026-10-15 现取）: greeting-cards 6 SKU basePrice/basePrice_ja/minQuantity/nameJa — premium ¥20/1.0、thick-400g ¥23/1.2、foil ¥35/1.8、spot-uv ¥27/1.4、matte ¥21/1.1、rounded ¥20/1.0；全部 10 枚から；category_slug=greeting-cards（L129）
- src/data/blog-data/ja.json（2026-10-15 读）: new-year-card-printing-2027-guide content 10528 chars，title「年賀状印刷 2027：1枚¥20〜 箔押し 早割10月末 | ZprintPro」；blog-posts.ts L2243 注释「2026-10-09 ZP-daily-content: 年賀状印刷ガイド 2027（B7 queue W8 季节窗授权提前交付）」→ B1 深度文已存在
- 既有 K3 口径: 该 blog 内文「早割は10月末までが目安（2026-10-31時点の口径、2026-11-01に再確認）」→ 骨架引用同口径，不新造日期
- 模板: src/app/[locale]/services/business-cards-printing/page.tsx（§0.0 解禁块 (c) K3 9/30 拍板页）— dynamicParams=false + generateStaticParams + metaMap + JsonLd(Service/FAQPage/BreadcrumbList) + generateWhatsAppLink
- sitemap 机制: scripts/generate-sitemap.js L81 staticPages（business-cards-printing 同款登记法）
- 标题当量: scripts/guards/title-equiv.js 实测（.hermes/_tmp/nengajo-title-check.cjs）zh-hk 55 / en 53 / ja 55 = 3/3 BAND-OK（50-57）
校准状态: 已校准（2026-10-15 19:3x，本会话一手直读；草稿未入 src/，合入时按 LAUNCH-CHECKLIST 重跑门禁）
```

## §1 交付物清单

| # | 文件 | 说明 |
|---|---|---|
| 1 | `.hermes/drafts/nengajo-2027/page-nengajo-2027.tsx` | 页面骨架全文（3 locale：ja 主场 / zh-hk 賀年卡早鳥 / en Nengajo）；6 SKU 牌价表（products.ts 真值）+ 早割列；發注時間線；宛名オプション槽；FAQ 4（同步 FAQPage schema）；JsonLd 3 块；内链 8（全部已核实在册 slug）；**ZP-K3-SLOT ×30 全部显式可 grep** |
| 2 | `.hermes/drafts/nengajo-2027/MERGE-SNIPPETS.md` | 合入片段：src 路径 / sitemap staticPages / blog ×3 承接补链（各 1 段逐字 HTML）/ 标题当量核验脚本 / S2 slug 已核清单 |
| 3 | `.hermes/drafts/nengajo-2027/LAUNCH-CHECKLIST.md` | 上线 runbook（真值→合入→门禁→push→verify→IndexNow→GSC 请求索引，~40 分钟）+ 红线 |
| 4 | 本文档 | SSoT 与对账 |

## §2 幂等对账（不重复做已完成的事）

| 排程件 | 状态 | 证据 |
|---|---|---|
| B1 深度 blog「年賀状印刷 2027 早鸟完全ガイド」 | ✅ **10/09 已交付**（B7 queue W8 授权提前） | blog-posts.ts L2243 + ja.json 10528 chars + meta/targetKeywords 已注册 |
| B1 早鸟页 | 🆕 本批交付骨架 | drafts（未入 src/，零生产影响） |
| blog↔页 承接补链 | ⏳ 留待合入日（零改旧文字符） | MERGE-SNIPPETS §3 |
| 相似度风险 | 低（页面为新文案；补链段 ~80 字/语） | 合入日跑 8-gram 闸门复验 |

## §3 骨架要点（为何这样设计）

1. **三语而非 ja-only**：镜像 (c) 模板架构（generateStaticParams ×3 + hreflang trio + x-default），避免 [locale] 路由出现孤语种页；zh-hk 角度 = 賀年卡早鳥（HK 买家），en = Nengajo 2027（在日英文客群），ja = 主场。
2. **真值 vs 槽位分离**：牌价/规格/MOQ/纳期全真值（products.ts 现取）；早割率/正式締切/宛名 = K3 三槽（§7 待办 1），页面可见文案以「確定次第更新」表述，**无任何编造数字**；投函締切只引用日本郵便官方当年案内。
3. **门禁预检已过**：标题当量 3/3 BAND-OK（55/53/55）；禁词扫描 0（注释内禁词示例已改写规避，防合入后 i18n-guard 误伤）；ZP-K3-SLOT 30 处 grep 断言为合入门禁条件。
4. **上线即插即用**：合入 = 拷文件 + 填 3 槽 + sitemap 一行 + blog 补链 ×3 + 门禁 + push —— runbook 全列，满足「报价一到当日上线」。

## §4 与两周排程的对账

- §2 10/16「年賀状页骨架+文案成稿（价格位留空待 K3）」→ **本批提前完成**（10/15 夜）
- §2 10/17「年賀状深度 blog 成稿」→ **已完成（10/09），无需重做**（本报告 §2 幂等对账）
- §6 年賀状卡点 10/24 → 路径明确：K3 真值 10/21 → 合入上线 10/21-22 → 索引提交 → 10/24 卡点提前达成
- §7 K3 待办 1 死线 10/21 不变：**无真值不上线**（LAUNCH-CHECKLIST 红线）

## §5 风险与残留

- 页面为季节性活动页：2027-02 后需 noindex/归档决定（挂账 1 月复盘）。
- en 牌价列 3 SKU 用「see PDP」而非硬编码 USD（basePrice_en 字段未在本批核取，避免转汇率编造）——合入日可现取补全。
- en 牌价列已全部填真值（basePrice_en 2026-10-15 23:3x 现取：0.13/0.15/0.23/0.18/0.14/0.13），原「see PDP」残留清零。
- 宛名印刷（ZP-K3-SLOT-3）若 K3 拍「不提供」，页面槽位改「対応外」即可，不阻塞上线。
- 本报告与骨架遵循 §0.0（名片零出现，贺卡资产零触碰）/ §0.23（数字全标源）/ 单品牌分层（ja=ZprintPro）。
