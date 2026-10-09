# 2026-10-09 K3 大脑指令包：周执行清单 + 三站点月度战略 + 五车道重定制（DSH deepseek 4.1 flash 执行层）

> 角色：K3 大脑（战略军师，不亲自执行） · 执行层：autoclaw = DSH Desktop + deepseek 4.1 flash（5 cron）
> 框架依据：主脑 v3.0（三层闭环 · 两级决策权 · 额度纪律 ≤8%）+ 执行层 autoclaw v1.2（全量能力 · 幂等三问 · 门童六命令）+ 千问 v2.0 飞轮总指令（P0-P3 时间线 · 三站点差异化 · 本地术语对照）
> 数据基座：GSC 2026-10-09 导出 vs 10-05 vs 09-29（逐文件复算，`docs/2026-10-09-gsc-deep-audit-and-strategy.md`）
> 成熟度校准（v3.0 §1B6）：zh-hk = 年轻站（301 后第 ~13 周）；en/ja = 新生儿（~第 87 天）——en/ja 不设 30 天排名硬目标，判据 = 展示 0→有 + 位次趋势

---

## Part A · 本周执行清单（10/09 四 → 10/16 四，按日）

优先级 = 时间窗紧迫度 × 排名提升概率。**年賀状（10/31 早割倒计时 22 天）× holiday cards（Q4 B2B 采购窗）= 本周最高优先级。**

### 10/09（四）— 红旗抢修日
| 动作 | 落点 | 目标词 | 预期效果 | 验证 |
|---|---|---|---|---|
| A1 部署 ja 年賀状承接段（§B-2 原文） | `src/data/category-seo-content.ts` greetingCardsContent.ja body + faq | 年賀状印刷 / 2027年賀状 | 0→有展示（10/16 判读） | 部署后 curl `/ja/category/greeting-cards/` 含「年賀状印刷は1枚¥20から」 |
| A2 部署 en holiday cards 承接段（§B-1 原文） | 同上 .en | corporate/business/custom holiday cards | 0→有展示 | curl en 页含 "US$0.13 per card" |
| A3 内链批 1（§C #1-#3） | blog-data 三语 | 年賀状 / holiday cards 锚 | 承接段权重供给 | grep 锚文本计数 ≥1/语 |
| A4 22:43 gsc-feedback lane 消费 10-09 档 | 自动 | 新验证锚点表（§F-2） | 锚点表切换 | 当日报告含 10-09 档判定 |

### 10/10（五）— CTR 修复日（weekly-meta 23:07 主战场）
| 动作 | 落点 | 目标词 | 预期效果 | 验证 |
|---|---|---|---|---|
| B1 zero-click 池 meta description 价格钩子批（**仅 meta，不碰 title**） | seo.ts / category-seo-content.ts metaDescription 字段 | 貼紙印刷 156im c0 / 月曆印刷 118im c0 / 宣傳單張印刷 105im c0 / small batch sticker printing 99im c0 | CTR 0→≥1%（2 周窗） | 10/16 GSC c 值；线上 curl meta |
| B2 E3 效果首查（stickers:en 价格钩子上线 1 天） | 只读 | small batch sticker(s) | c0→破零观察 | GSC 24h/7d |
| B3 内链批 2（§C #4-#5） | blog-data en | china catalog printing | 17.7→≤15 | 锚上线计数 |

### 10/11（六）— blog-deepfix 05:37 主战场
| 动作 | 落点 | 目标 |
|---|---|---|
| C1 greeting-cards 簇深修：6 SKU 描述补 holiday/年賀状场景句（各 1 句，零 title 改动） | products.ts description 字段 → 或 CSV 源头走生成器（SOP-5） | 实体词密度供给 |
| C2 新块 FAQ regex 格式扫描（envelopes:en/ja、flyers:ja 新 FAQ 是否过 extractFaqFromHtml） | category-conversion-blocks.ts | FAQPage JSON-LD 收录资格 |
| C3 千问 P0 技术底座复核：hreflang 三向对称 + jp→ja 代码 + Organization sameAs ×3 locale | 只读复核 + 报告 | 技术底座零缺陷声明 |

### 10/12（日）— 数据日
- D1 K3/老板手动拉 GSC 新档（**补 3mo 窗**，恢复品牌长窗对照——连续两档缺）→ 落 `GSC数据/`
- D2 验证矩阵终判：`docs/2026-10-08-en-ja-page-one-execution-plan.md` §七 逐项（本包 §D 为预判基线）
- D3 churn 组（saddle stitch 4.2 / 教科書 34.6 / catalog china / food packaging）解冻裁决材料备齐

### 10/13（一）— 深水收编批
| 动作 | 目标词 | 预期 |
|---|---|---|
| E1 labels 簇 quickAnswers（small batch label printing 29.0 回落抢修） | small batch label printing 42im | 29→≤24 |
| E2 packaging:en 块补 food packaging FAQ | food packaging 20im @25 | 25→≤20 |

### 10/14（二）— 季节内容日（daily-content 21:17）
- F1 **年賀状印刷ガイド（ja 深度 blog 12 段）**——需老板拍板破 B7 queue（见 Part G-2）；不批则出 corporate holiday cards guide（en）
- F2 内链批 3（§C #6）

### 10/15（三）
- G1 未批篇的另一半（en/ja 互补）；G2 a2 poster 28d/7d 剪刀差复核（30.6 vs 42.6，只读）

### 10/16（四）— 周验证 + 复盘
- H1 年賀状/holiday cards 0→展示判定（§D 判据）；H2 CTR 池 c 值复查；H3 大脑周复盘 ≤30min（无调整不发文）

---

## Part B · 红旗内容块（可直接粘贴，已按 products.ts 真值 + BLUF + ≤200 词）

### §B-1 en：greeting-cards 页面 holiday cards 承接段
> 落点：`/en/category/greeting-cards/` 正文（category-seo-content.ts greetingCardsContent.en）+ faq 数组 3 条。真值：premium US$0.13 / matte US$0.14 / thick-400g US$0.15 / spot-uv US$0.18 / foil US$0.23，MOQ 10（products.ts BC-001~006）。

```html
<h2>Corporate Holiday Cards: Pricing, MOQ & Deadlines for 2026</h2>
<p><strong>Custom holiday cards start at US$0.13 per card with a 10-card minimum order</strong> and 3-5 business day production, so US teams can still hit the December mailing season. Six finishes cover every budget: premium 300g (US$0.13), matte (US$0.14), thick 400g (US$0.15), spot UV (US$0.18), and three-color foil (US$0.23). DHL Express delivers to the US in 2-4 days; a 30-second AI quote fixes your exact price before you commit.</p>
<details><summary>When should a business order holiday cards?</summary><p>Order by mid-November. Production takes 3-5 business days plus 2-4 days DHL shipping, so a November 15 order lands before Thanksgiving with buffer for addressing and stamping.</p></details>
<details><summary>How much do custom corporate holiday cards cost?</summary><p>From US$0.13 per card (premium 300g) to US$0.23 per card (foil), all at a 10-card minimum. Final pricing depends on size, stock, and finish — the AI quote confirms it in 30 seconds.</p></details>
<details><summary>Can you print our logo and pre-printed signatures?</summary><p>Yes. Send your logo and signature artwork; free prepress file check is included, and digital proofing is available before the full run.</p></details>
```

### §B-2 ja：greeting-cards 页面年賀状承接段
> 落点：`/ja/category/greeting-cards/` 正文 + faq 数组 3 条。真值：¥20/枚〜、MOQ 10、3-5 営業日、DHL 2-4 日（同上源头）。早割口径：「10 月末までが目安」（グラフィック 10/31 早割既有调研口径，到期复核日 2026-11-01）。

```html
<h2>オリジナル年賀状印刷：2027年版の注文時期・料金・納期</h2>
<p><strong>オリジナル年賀状印刷は1枚¥20から・10枚の小ロットで注文できます。</strong>印刷は3〜5営業日、DHLで日本全国へ2〜4日でお届けします。仕上がりは6種類——プレミアム300g（¥20）、マット（¥21）、極厚400g（¥23）、部分UV（¥27）、三色箔押し（¥35）。年賀状の早割は10月末までが目安で、11月以降は印刷が混み合い納期が伸びます。30秒AI見積もりで、枚数・紙質・加工込みの正確な金額をすぐ確認できます。</p>
<details><summary>年賀状印刷はいつまでに注文すべきですか？</summary><p>11月中旬までが安心です。印刷3〜5営業日＋配送2〜4日なので、11月15日の注文なら12月上旬に到着。投函の山場（12/25前）まで十分な余裕があります。早割を使うなら10月末までの注文が目安です。</p></details>
<details><summary>年賀状印刷の料金はいくらからですか？</summary><p>1枚¥20から（プレミアム300g）、箔押しでも1枚¥35から。10枚の最小ロットで全仕様注文可能です。枚数が増えるほど単価は下がります。</p></details>
<details><summary>社名入り・ロゴ入りの年賀状は作れますか？</summary><p>はい。社名・ロゴ・挨拶文のデータをお送りいただければ、無料の入稿前データチェック付きで印刷します。デジタル校正も可能です。</p></details>
```

> 执行层落地映射：category 页正文走 `category-seo-content.ts` 的 body/quickAnswers/faq 原生槽位时，`<details>` 可转写为 faq 数组条目（page.tsx 自动生成 FAQPage JSON-LD）；blog 场景则原样粘贴 HTML。两种形态语义等价，执行层按落点自选（v1.2 §0.2 实现方式拍板区）。

---

## Part C · 内链修复清单（本周）

| # | 源页面 → 目标页面 | 锚文本 | 位置 | 目标词（基线） |
|---|---|---|---|---|
| 1 | `/ja/blog/thick-card-printing-guide/` → `/ja/category/greeting-cards/` | 年賀状印刷 | 正文「用途/场景」H2 下第 1 段末 | 年賀状印刷（0→展示） |
| 2 | `/en/blog/thick-card-printing-guide/` → `/en/category/greeting-cards/` | custom holiday cards | 同上位置 | holiday cards 簇（0→展示） |
| 3 | `/zh-hk/blog/thick-card-printing-guide/` → `/zh-hk/category/greeting-cards/` | 賀卡印刷 | 同上 | 賀卡簇蓄水（W9 前） |
| 4 | `/en/blog/catalog-printing-guide/` → `/en/services/catalog-printing-china/` | china catalog printing | 正文供应商/成本 H2 下 | china catalog printing 17.7→≤15 |
| 5 | `/en/blog/catalog-printing-china-supplier-guide/` → `/en/product/catalog-printing/` | catalogue printing china | 正文价格段 | 英式变体 19.2 |
| 6 | `/ja/blog/doujin-circle-printing-guide/`（ja 版）→ `/ja/category/greeting-cards/` | 年賀状・ポストカード印刷 | 同人グッズ段（年賀状=同人冬季定番，语境自然） | 年賀状（二次供给） |
| — | ~~宣傳單張/包裝盒訂製 锚文回补~~ | — | FIX-1/FIX-2 挂账第 2 轮，**待老板拍板** | — |

> 全部锚文本 ≥5 字描述性、目标页已存在（幂等三问第 2 问已过）；#1-#3 的 thick-card blog 三语为 10/7 新交付，加锚=升级不新建。

---

## Part D · 下周预判（10/16 判读基线）与 Plan B

| 词 | 10-09 基线 | 10/16 预判区间 | 判据 | Plan B（失败时） |
|---|---|---|---|---|
| 年賀状印刷 簇 | 0 展示 | **0→有展示**（pos 20-60 初现） | 出现展示即胜（盲开纪律） | 仍 0 → ① site: 查 ja greeting-cards 页收录状态 ② GSC 请求索引 + sitemap 条目确认 ③ 独立年賀状 blog（10/14 F1）提前生效前不追加资产，先修收录 |
| corporate holiday cards 簇 | 0 展示 | 0→有展示（pos 30-80） | 同上 | 同上 en 版；加查 en 类目页在 us 站的索引覆盖 |
| doujinshi printing | 11.2（38im） | 8-12 | 进前 10 = 胜 | 停留 12+ → P2 title 层不救（词面已足），转外链/提及层 |
| large envelopes | 13.8（19im） | 10-13 | ≤13 = 在轨 | 回落 → 查 envelopes:en 块渲染（conversion 组件挂载核对） |
| small batch sticker printing | 5.6（99im，c0） | pos 持平 + **c≥1** | CTR 破零 = 胜 | 仍 c0 → meta description 价格钩子（10/10 B1 已含）+ Product schema price 呈现复核 |
| 特急印刷 激安 | 16.1（c0） | 12-15 | ≤15 = 在轨 | 横盘 → rush ja 页 FAQ 呈现位/顺序调整（内容层） |
| クラフト紙 パッケージ | 24.0/24.4 | 18-22 | ≤22 = 在轨 | 横盘 → packaging ja 料金表独立 section 化（P3） |
| コミケ 印刷 | 20.8（季后退潮） | 20-30 不追加资源 | 不失守 30 即守成 | 破 35 → L1-3 清单段加內链 1 条 |
| 教科書 印刷 | 34.6（churn 组） | 不判 | 10/19 仍 ≥30 启动诊断 | 冻结纪律优先 |

---

## Part E · 三站点月度战略规划（2026-10-09 → 11-09，执行层作战地图）

> 与 v3.0 §4.9 30-90 天地图对齐：当前 = Phase 2（D31-D60）中段 + Phase 3 Q4 卡位前哨。北极星 = 月有效询盘数（008 表，数字仍「待 008 校准」）；以下排名/展示全为过程指标。

### 月度主题：**「季节窗抢夺 + CTR 变现 + 新生儿地基加固」三线并进**

| 周 | 窗口 | 主线 | en | ja | zh-hk |
|---|---|---|---|---|---|
| W1 10/9-15 | 年賀状早割倒计时 | 红旗抢修（本包 Part A） | holiday cards 承接 + CTR 批 | 年賀状承接 + 年賀状ガイド blog | 聖誕卡 W9 预备 + CTR 池 meta 批 |
| W2 10/16-22 | **10/19 title 解冻** | title 批（W2.1 wholesale saddle stitch 57 当量 / W2.3 same day flyers 55 / E2 transparent-stickers 价格钩子 / TRIM 收编 catalog-china 77→56、rush en 66→55、ja 59） | same day flyers + wholesale | 両面カラー词面（flyers ja） | 数字钩子批恢复（冻结令 9/30 已到期） |
| W3 10/23-29 | 聖誕卡 W9（10/21-27）+ 年賀状加码 | 季节簇全量 + 深-2（ja 食品パッケージ/a2 激安）+ GEO 引用基线记录（AI Overview/Perplexity 首测存档） | corporate christmas cards 簇 | 年賀状旺季承接 + 卒アル蓄水维持 | 聖誕卡印刷 blog（B7 W9）+ 月曆 2027 |
| W4 10/30-11/5 | 月度切换 | 11/1 monthly-matrix 06:13 全量审计 + 11 月计划 + 千问 P3（Perplexity/ChatGPT 覆盖）启动评估 | Q4 礼品季词盘（gift boxes/holiday packaging） | 年賀状本番（11 月=旺季顶点） | 利是封预热（CNY 2027 早鸟） |

### 月度里程碑（11/9 验收）
| 指标 | 基线（10-09） | 目标 | 口径 |
|---|---|---|---|
| 年賀状/holiday cards 簇 | 0 展示 | **双站有展示且 ja 进 pos≤40** | GSC 28d |
| en 页二冲页一组（doujinshi/envelopes/china catalog） | 11.2/13.8/17.7 | ≥2 词进前 10 | GSC 28d |
| 页一 zero-click 池（≥50im c0 词） | ≥6 词 | ≤3 词 | CTR 修复验收 |
| ja 全站展示 | 2,023im/28d | ≥2,500 | 新生儿爬坡 |
| 月有效询盘 | 待 008 校准 | 首月真实基线落数 | 008 表（老板侧） |

---

## Part F · 五车道重定制指令包（DSH deepseek 4.1 flash 执行层）

> 框架不变（cron-lanes.json SSoT + wrapper 链 + 结果总线四层对账），**重定制 = 各车道 prompt 指令区刷新 + 健康修复**。注入方式：本包 §F-x 块 → 对应 `.hermes/cron-prompts/zprintpro-*.md` 指令区（机械注入可由下一人手会话执行，带备份 + 计数断言，参照 `scripts/inject-results-bus-contract.mjs` 范式）。

### F-1 ZP-daily-content（每天 21:17）— B7 选题库刷新
- W8（10/14-20）插队：**年賀状印刷ガイド ja**（待老板拍板 Part G-2）→ 备选 corporate holiday cards en；W9（10/21-27）聖誕卡维持；W10（10/28-11/3）年賀状 en 篇 + 月曆 2027 篇
- 新增第 -1 优先级段：「10-09 验证锚点表」——每篇交付的 targetKeywords 优先从锚点表取词（年賀状 / holiday cards / 聖誕卡 / doujinshi / wholesale saddle stitch）
- 保持：12 段骨架 + 门童六命令 + 攒批 push 纪律不变

### F-2 ZP-gsc-feedback（每天 22:43）— 锚点表与 CTR 判据升级
- T1 锁词追踪表切换为 **10-09 验证矩阵**（en 8 锚 + ja 9 锚 + zh 16 词，见 `docs/2026-10-09-gsc-deep-audit-and-strategy.md` §二）
- **CTR c 值升为一等判据**（10-08 判读纪律④）：页一/页二词 c=0 连续两档 → 输出「CTR 修复候选池」供 weekly-meta 消费
- 盲开词纪律：年賀状/holiday cards 每轮必查，0→展示即报胜，不看位次
- 下档要求：提醒老板 10/12 拉新档**补 3mo 窗**

### F-3 ZP-weekly-meta（周五 23:07）— CTR 修复专项化
- 每周固定动作追加：zero-click 池（≥50im & c0）meta description 价格钩子批（title 冻结纪律不适用 meta，但禁碰 title 字段）
- 10/10 首批清单：貼紙印刷 / 月曆印刷 / 宣傳單張印刷 / small batch sticker printing / 書刊印刷
- 10/16 起并入 title 批预备（W2.1/W2.3/E2 当量候选已在 `DELIVERY/2026-10-12-money-kw-package.md`，10/19 解冻后执行）

### F-4 ZP-blog-deepfix（周六 05:37）— 簇深修优先级
- 10/11 当周：greeting-cards 簇（holiday/年賀状承接强化 + C1 SKU 场景句）+ 新块 FAQ regex 扫描 + 千问 P0 技术底座复核（hreflang/sameAs）
- 后续周六按簇轮换：books/catalog 簇 → packaging 簇 → posters 簇

### F-5 ZP-monthly-matrix（每月 1 号 06:13）— 11/1 跑批定义
- 并入千问 v2.0 P0-P3 检查表（hreflang 对称 / Organization sameAs / SKU 标题合规 / GEO 事实面板覆盖 / AI Overview 引用率基线）
- 关键词矩阵审计 + money-kw-mine 复跑 + 35 词触顶页置换算法执行
- 品牌监测加「年賀状/ホリデーカード季节词渗透」段

### F-6 调度健康修复（「一直没成功」根因处置，**需老板管理员权限**）
| 项 | 事实 | 处置 |
|---|---|---|
| 4 车道 LastTaskResult=2147946720（0x80070020 文件占用） | lane-status.json 2026-10-07 实测；10/8 两档无报告产出 | wrapper 加重试（0x80070020 → 5min 后重试 1 次）；改 `register-cron-tasks.ps1` 后管理员重跑 |
| `\ZprintPro-CronWatchdog-2125` 残留 | 每天 21:25 写假 PASS/FAIL | `scripts/remove-legacy-cron-tasks.ps1` 管理员执行一次 |
| `ZP-k3-review` 复盘实体未注册 | 目前只是 SSoT 文本 | 管理员 `schtasks /create` 注册 |
| 看门狗 06:43 | 正常 | 不动 |

---

## Part G · 问老板清单（拍板项，A/B/C + 推荐）

1. **§0.0 名片展示层**：A 维持现状只接单 / B 新建独立名片品类页 / C 折中 1 个承接落地页不动贺卡资产 → **推荐 C**（零资产风险，承接已解禁的接单流量）。
2. **年賀状 blog 破 B7 queue 提前到 10/14**：A 破 queue 提前（季节窗优先）/ B 守 queue 等 10/21 后 → **推荐 A**（早割 10/31 倒计时 22 天，内容收录需 5-10 天，等 queue = 错过早割）。
3. **FIX-3 footer 实体地址**（香港新蒲崗 vs 深圳实体口径统一）：A 全站统一深圳实体 / B 维持 → **推荐 A**（NAP 一致性 = GEO 实体信号，v3.0 §4.5）。
4. **FIX-1/FIX-2 锚文回补**（宣傳單張/包裝盒訂製 2→≥3）：A 批准本周内链批执行 / B 继续挂账 → **推荐 A**（宣傳單張 +22.1 冲首页窗口期，锚文正当期）。
5. **调度健康修复管理员执行**（Part F-6 三项）：A 本周执行 / B 下周 → **推荐 A**（10/8 已空跑两档）。

## 数据来源（§0.23 强制行）
```
数据来源:
- GSC数据/ 2026-10-09 批 ×12 xlsx vs 10-05 vs 09-29（.hermes/tmp/gsc_compare_20261009.py 复算）
- 价格/MOQ 真值: src/data/products.ts BC-001~006（US$0.13-0.23 / ¥20-35 / MOQ 10 / HK$100-180/100張）
- 框架: 主脑 v3.0 + 执行层 v1.2（F:\Zprintpro项目的深度思考提示词\ 20260910 两件）+ 千问 v2.0（附件）
- 车道实况: .hermes/cron-lanes.json + .hermes/logs/lane-status.json（2026-10-07, 4×2147946720）
- 前序: docs/2026-10-09-gsc-deep-audit-and-strategy.md / 2026-10-08-en-ja-page-one-execution-plan.md / DELIVERY/2026-10-12-money-kw-package.md
- 撤回声明: 无
```
