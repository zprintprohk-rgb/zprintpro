# ZprintPro 三站点两周详细执行方案（2026-10-16 ~ 10-29）——排名首页优化提升目标

> **日期**: 2026-10-15 · **作者**: 执行层（首席 SEO/AEO/GEO 数据战略分析师角色）
> **触发**: K3 2026-10-15 18:30 指令（读今日执行日志 + 最新 GSC 结论 → 按优先级出全站点 SEO/AEO/GEO 首页执行方案，含 blog 深度文章 + 三站点两周详案）
> **上游 SSoT**: `docs/2026-10-13-three-site-one-month-seo-aeo-geo-strategy.md`（一月战略）+ `docs/2026-10-15-w1-verdict-recovery-chain-fix-and-w2-kickoff.md`（W1 终审）+ `docs/2026-10-15-b1c-three-cluster-flywheel-and-defense-full-analysis.md`（飞轮机制）
>
> **数据来源**（§0.23 强制行）:
> - GSC: 10-15 导出全套（24h/7d/28d × 三站 + 汇总）；恢复系数链 `.hermes/logs/gsc-cliff-2026-10-15.json`（97.2%，固定基线 585.2）
> - B1c 台账: `.hermes/logs/b1c-queue-progress.json`（10-15 12:55 版，5 簇 DONE）
> - 车道总线: `.hermes/logs/lane-runs.jsonl`（10-13 起四连 OK）
> - CF CPU: `docs/2026-10-15-cf-workers-cpu-limit-root-cause-and-plan.md`（A1 $5/月 待 K3 拍板）
> - 词面: 10-15 档查询级逐词复算（见 W1 终审 §3）

---

## §0 执行摘要（先结论）

**两周唯一主轴：把「恢复中」变成「解除 + Q4 季节词全部就位」。** 10/31 年賀状早鸟截单是窗口内最硬截止，Comiket C107（12/30）与 CNY 利是封（1-2 月）的内容必须在本两周内完成主体，否则季节流量归竞品。

| 优先级 | 战线 | 两周目标 |
|---|---|---|
| **P0** | 年賀状（ja） | 早鸟页 + 深度 blog **10/24 前上线**（卡点 10/31 早鸟截单） |
| **P0** | B1c 剩余簇 | 簇 5/6/7/8 全部 DONE，全站正文指纹清零 |
| **P0** | 恢复解除判定 | 连续 3 日 ≥60% 达成（现已 1/3，97.2%）→ 宣布解除，增产接棒 |
| **P1** | Comiket C107（ja+en） | 专题页 + 双語 blog 10/26 前上线 |
| **P1** | 软化词防御 | saddle stitch / china catalog / zprint 品牌词 / 貼紙印刷 四线修复 |
| **P1** | Q4 日历（三语） | 簇 7 + 月曆印刷/calendar sizes 承接强化 |
| **P2** | GEO 对冲 | AI 盲测基线 + Bing 对账 + 卒アル提前布局 |

---

## §1 当前态势（30 秒版）

1. **恢复**：观察级（橙）。条件②已达成（28d 三站日均 581.7 ≥ 500，含断崖伤达标）；条件① 1/3 日（10-15 读数 97.2%）；条件③ GA4 待 K3。词面三站**零批次归因回退**，海報印刷 180→248 展（+38%）pos 11.9、訂做紙袋 13.6、a2 poster 24h pos 1.0。
2. **B1c 5/8 DONE**：stickers（≤0.221）/ red-packets（≤0.538）/ flyers-posters-leaflet / CTR 批 / food↔folding boxes（≤0.134）。剩：簇 5 kraft↔eco bags、簇 6 a1↔a2 posters、簇 7 calendars、簇 8 残留（10 个 packaging faqSchema + mailer 正文）。
3. **CTR 歼灭批**在验证窗内（10-15 凌晨上线，首判 = 10-22 导出对账），窗内**冻结不动**。
4. **车道**：四连 OK，恢复模式块生效中；判定链已修（新命名 glob + 固定基线）。
5. **基建**：CF CPU 超限——A2 治理已落地（686 页 SSG 预渲染 + routes.json 收窄 + middleware 摘除，顺利好 SEO：TTFB 改善 + 爬虫全静态）；**A1 $5/月 Workers Paid 待 K3 拍板**（不拍板 = 每天上千次 CPU 击杀持续，垃圾路径 500 伤抓取预算）。

---

## §2 逐日排程（10/16 周四 ~ 10/29 周四）

> 车道自动层不变：daily-content 21:17（B1c 队列+blog）/ gsc-feedback 22:43（恢复系数+词面）/ weekly-meta 周五 23:07 / blog-deepfix 周六 05:37 / 看门狗 06:43。下表为**叠加在车道之上的人手会话/专项层**；车道层按恢复模式块自动消费队列，不重复列。

| 日 | 主题 | 交付 |
|---|---|---|
| **10/16 四** | 簇 5 开工 + 年賀状结构 | 簇 5（kraft↔eco bags ×3 语）差异化重写；年賀状页骨架+文案成稿（价格位留空待 K3）；weekly-meta 23:07 周报到 |
| **10/17 五** | 簇 5 收尾 + blog-deepfix | 簇 5 验收（≤0.55）+ sitemap/IndexNow；blog-deepfix 车道 05:37 跑（相似度闸门）；年賀状深度 blog 成稿 |
| **10/18 六** | 簇 6 | a1↔a2 posters ×3 语重写（承接 a2 poster 24h pos 1.0 势能） |
| **10/19 日** | 簇 6 验收 + 貼紙承接页 | 簇 6 验收；貼紙印刷 category/stickers 强化（正文深度+fact-table+FAQ，**不动 title**——churn 冻结） |
| **10/20 一** | 簇 7 calendars | calendars 族 ×3 语 + 月曆印刷/calendar sizes 承接面（Q4 日历季主峰） |
| **10/21 二** | 簇 8 残留清零 | 10 个 packaging faqSchema 拆模板 + mailer 正文；B1c 全队列关闭 |
| **10/22 三** | **CTR 批首判 + 年賀状上线** | K3 导 28d 档 → CTR 歼灭批第一次对账（基线 ~0%，判据：4 词 CTR 抬升）；**年賀状早鸟页+blog 上线**（K3 报价真值填入后）；sitemap/IndexNow |
| **10/23 四** | Comiket C107 专题开工 | ja 同人誌专题页（締切倒计时块/即売会场景/搬入・搬出信息）；weekly-meta 周报 |
| **10/24 五** | C107 专题上线（ja） | ja 专题+blog 上线；blog-deepfix 车道；**年賀状早鸟 10/31 倒计时 7 天检查点** |
| **10/25 六** | C107 en 版 + 软化词防御 | doujinshi printing en 页/blog；saddle stitch booklet PDP 正文深度+FAQ 保鲜（4.2→11.7 断崖伤防御） |
| **10/26 日** | china catalog + 品牌词 | china catalog printing 承接页差异化（中国工厂直发 E-E-A-T 信任状）；zprint 品牌词压制源排查（谁占 pos 1-6，SERP 实录 + 处置） |
| **10/27 一** | CNY 利是封衔接 | 簇 2 已重写的 red-packets 面承接检查 + 「2027 馬年利是封」角度 blog 成稿（CNY 提前量） |
| **10/28 二** | GEO 专项 | AI 盲测基线（ChatGPT/Perplexity/Gemini × 5 商业词，登记引用率）；Bing Webmaster 对账；holiday cards（en 盲开词）承接检查 |
| **10/29 三** | **两周年检 + 解除判定** | 恢复系数曲线 + 词面两周总账 + B1c 全账 + CTR 批中期读数；若条件①满 3/3 且 GA4 已核 → **宣布解除**，恢复模式块撤除、增产接棒；11 月计划（含 12 月 Google 更新窗口备战） |

---

## §3 Blog 深度文章排程（12 段骨架 · 单篇 ≥2500 字 · 相似度闸门 · 每篇 ≥2 条 hub-spoke 内链）

> 纪律：单次车道 ≤2 篇；数字真值 products.ts/K3 报价；8-gram Jaccard vs 现存 >60% 停手；FAQ 与现存 >50% 停手。

| # | 站点 | 选题 | 承接词 | 上线死线 | 内链落点 |
|---|---|---|---|---|---|
| B1 | ja | **年賀状印刷 2027 早鸟完全ガイド**（宛名印刷/締切/早鸟割引） | 年賀状 簇（0 展示开荒） | **10/22** | 年賀状页 + greeting-cards 族 |
| B2 | ja | **コミケ C107 同人誌印刷 締切カレンダー**（セット仕様/搬入/特急） | コミケ 印刷（185 展 pos 19.6） | 10/24 | doujinshi-printing + 同人誌专题 |
| B3 | en | **Doujinshi Printing for Comiket C107: Deadline & Spec Guide** | doujinshi printing（pos 11.2 冲 top5） | 10/25 | doujinshi-printing + booklet 族 |
| B4 | zh-hk | **2027 馬年利是封訂製指南**（材質/燙金/起訂量/落單死線） | 利是封訂製（13.3）/ 燙金利是封（pos 1 守） | 10/27 | red-packets 族（簇 2 已重写面） |
| B5 | zh-hk | **2027 企業月曆訂製：尺寸×掛裝×紙材速查** | 月曆印刷（102 展 pos 16.1） | 10/21 随簇 7 | calendars 族 |
| B6 | en | **Calendar Sizes: The Complete Print Reference**（fact-table 直答块） | calendar sizes（23 展，AEO 精选摘要目标） | 10/21 随簇 7 | calendars 族 |
| B7 | en | **Corporate Holiday Cards 2026: Timing, Quantities & Finishes** | corporate holiday cards（盲开词 0 展示开荒） | 10/28 | greeting-cards 族 |
| B8 | zh-hk | **紙袋印刷材質全指南**（牛皮/白卡/手提繩/起訂量） | 紙袋印刷/印刷紙袋（CTR 批承接强化，**不改被验页 title**） | 10/26 | paper-bags 类目（CTR 验证页） |

内链锚文本一律用 GSC 实证词，禁 exact-match 堆叠（spam 画像三件套教训）。

---

## §4 三站点分站要点

### zh-hk（智印港）——守首页 + CTR 验证 + Q4 双峰
- 守：燙金利是封 pos 1 / 食品包裝印刷（24h 2.0）/ 訂做紙袋 13.6 / 印海報（24h 10.0）。
- 验：10/22 CTR 批首判（紙袋印刷/印刷紙袋/餐牌印刷/食品包裝印刷四词）——**10/22 前这四页任何字段不碰**。
- 攻：海報印刷（248 展 pos 11.9，两周目标稳进 top10）= 簇 6 海报重写 + B5/B6 内链；月曆印刷 Q4 主峰 = 簇 7。
- 习惯词 AEO：禮物紙袋邊度買（pos 4）类粤语问法 → FAQ 直答句抢精选摘要。

### en（ZprintPro）——守 top5 + 断崖伤修复 + 开荒词
- 守：small batch sticker printing（4.8，24h 2.0）/ a2 poster（24h 1.0）。
- 修：saddle stitch booklet（4.2→11.7，10/25 正文深度+FAQ）；china catalog printing（38.2，10/26 差异化+E-E-A-T）；**zprint 品牌词 pos 13.6 排查**（10/26，品牌词必须 pos 1——查目录站/社媒占位，必要时品牌 SERP 资产化）。
- 开荒：corporate holiday cards（B7）+ calendar sizes（B6，AEO）。

### ja（ZprintPro）——两个死线压倒一切
- **年賀状 10/31 早鸟**：页+blog 10/22-24 上线（报价真值 = 唯一阻塞项，K3 待办）。
- **コミケ 印刷**（185 展全 ja 第一词）：C107 专题 10/24 ja / 10/25 en；目标 12 月上旬进首页（提前 8 周布局是底线）。
- 守改善：クラフト紙 パッケージ印刷（+6.2 → 17.8）随簇 5 重写再推一段；教科書/教材（17.4）churn 盯梢。
- 提前量：卒業アルバム（2-3 月季）10/29 后启动，本两周只建内容大纲。

---

## §5 AEO/GEO 专项（两周内）

1. **精选摘要抢位**：calendar sizes（B6 fact-table）/ 禮物紙袋邊度買 / C107 締切（B2 倒计时块）——三个直答块目标 Google featured snippet + AI Overview 双吃。
2. **GEO 盲测基线（10/28）**：ChatGPT / Perplexity / Gemini 各 5 词（聖誕卡印刷 / 年賀状印刷 / christmas cards printing / small batch sticker printing / コミケ 印刷），登记被引用率 → 11 月起周度追踪。
3. **Bing 对账（10/28）**：Bing 侧本就健康（10-12 实测 en/ 首页在列）——确认 Webmaster Tools 验证 + sitemap 提交 + IndexNow 天然覆盖；Bing 流量是 Google 真空期的压舱石。
4. **结构化数据体检**：簇 5-8 重写后 FAQPage schema 与可见正文一致性抽验（spam 政策明令 mismatch 违规）。

---

## §6 验证门与 KPI

| 门 | 时间 | 判据 |
|---|---|---|
| 恢复解除 | 逐日，最快 10/17-18 | 连续 3 日 ≥60%（现 1/3 @97.2%）+ GA4 核验 |
| CTR 批首判 | 10/22 | 4 词 CTR 从 ~0% 抬升（28d 档对账；不达标 = 词-页匹配问题，列 W3 处置，**不二次改 title**） |
| B1c 关闭 | 10/21 | 8/8 簇 DONE，相似度台账全 ≤0.55 |
| 年賀状卡点 | 10/24 | 页+blog 上线且索引请求已提交 |
| C107 卡点 | 10/25 | ja+en 专题+blog 全上线 |
| 两周年检 | 10/29 | 本方案 §0 表格逐行对账 |

词面硬约束（任何一天触线即停手复盘）：带钱词/大词**零批次归因回退**（基线 = 10-15 档逐词位置，W1 终审 §3 表）。

---

## §7 K3 待办（按死线排序）

| # | 事项 | 死线 |
|---|---|---|
| 1 | **年賀状早鸟割引报价真值**（价格/割引幅度/截单日）——年賀状页唯一阻塞项，无真值不上线（不编数字） | **10/21** |
| 2 | 每日导一份「24小时三站点汇总」档（解除条件①自动累积，1 分钟） | 每日 |
| 3 | GA4 实时核验（解除条件③最后一环，1 分钟） | 尽快 |
| 4 | **CF Workers Paid $5/月 拍板**（A1 止血；不拍 = CPU 击杀持续 + 垃圾路径 500 耗抓取预算） | 本周 |
| 5 | 10/22 导 28d 档（CTR 批首判用） | 10/22 |
