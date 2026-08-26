# M3 执行指令卡 v3.12 — 2 天冲刺版（8/22-8/23，K3 8/21 17:29 拍板）

> 战略 SSoT：`docs/k3-strategy-v3.12-fullsite-keyword-diagnosis-2026-08-21.md` + `docs/k3-strategy-v3.11-packaging-poster-sticker-2026-08-21.md`
> 数据基础：GSC 8/14-8/20（84 国全量）。本卡所有 imps/pos 均为该窗口实测值，不许另查另算。
> 范围纪律：全部文字层改动（title/描述/Pillar/FAQ/内链），⛔ 零新 SKU、⛔ 零图片依赖、⛔ 不动 slug、⛔ 不动 schema 结构。

---

## ⛔ 铁律（8/21 两次 CF 失败教训，违反即返工）

1. **禁止 `git add -A` / `git add .`** — 逐文件 `git add "路径"`
2. **push 前必跑** `git ls-files --others --exclude-standard src/` — 输出必须为空（untracked 组件 = 本地假 PASS、CF module-not-found 的 8/21 根因）
3. 预检 4 连：`node scripts/check-encoding.js` → `npx tsc --noEmit`（quote-engine 测试历史错忽略）→ `npm run build`（必须 Compiled）→ untracked 检查
4. push 后必跑 `node scripts/verify-deploy.mjs`，**success 才算完成**；CF 失败立即停手报告，⛔ 不准自行二次盲修
5. §13.6 链接红线：新内链只用已验证路由（`/{locale}/category/<slug>/`、`/{locale}/product/<slug>/`、`/{locale}/blog/<slug>/`），写后 curl 验 200
6. §11：名片/咭片/business card/名刺 零出现（错配 T11 是清理不是新增）
7. §13.10 NAP 脱钩：en/ja 标题不塞 Shenzhen/Hong Kong/深圳；zh-hk 用香港场景词
8. 中文写文件必须 UTF-8 LF（Python `open(..., encoding='utf-8', newline='\n')`）

---

# Day 1（8/22）— 包装盒 + 纸袋 + 訂製词根 + 免刀模費杀手级注入

## T1. 4 个包装 PDP 关键词对齐（文件：`src/data/products.ts`）

只改 `name` / `title_zh` / `description` / `description_zh` / `descriptionEn` / `descriptionJa` 字段，注入词如下：

| SKU | slug | 注入词（zh-hk） | 注入词（en） |
|---|---|---|---|
| PKG-013 | white-card-boxes | **卡盒**、白卡彩盒訂製、紙盒訂製 | card boxes, custom cardboard boxes |
| PKG-014 | corrugated-boxes | **坑盒**、瓦楞紙盒訂製、紙盒印刷 | corrugated boxes, carton box printing |
| PKG-015 | tuck-end-boxes | **卡盒**、插口盒訂製、免刀模 | tuck end boxes, no die-cut fee |
| PKG-016 | gang-run-card-boxes | 补：彩盒印刷、白卡盒訂製（免刀模費已在，保留） | gang-run boxes, no die-cut fee（已在） |

规则：title_zh ≤60 字符、关键词前置、品牌后置一次；description 末尾「適配行業」列表保留。

## T2. packaging 类目 Pillar 加厚（文件：`src/data/category-seo-content.ts`，packagingContent @ L82，3 locale 全改）

逐词对齐：包裝盒訂製 13i pos31.5 / 包裝盒印刷 12i pos35.2 / 紙盒印刷 10i pos39.1 / 紙盒訂製 10i pos45.4 / 禮盒訂做 7i pos32.9（52 imps/7d 在衰减，必须止住）

1. `featuredSnippet`（40-60 字答案前置，含价格+交期数字）：
   `包裝盒訂製 100 個起印，白卡彩盒 HK$0.03/個起（拼版免刀模費），坑盒卡盒天地蓋全盒型，8-15 天交貨，DHL 全球 2-4 天。`
2. `h2` + 首段注入 5 个目标词（每词出现 ≥2 次，自然语句）
3. 新增**盒型枚举段**（对 e-print 的 10 盒型页）：白卡彩盒 / 坑盒（瓦楞）/ 卡盒（插口盒）/ 天地蓋 / 飛機盒 / 抽屜盒 / 磁吸禮盒 —— 每盒型一行：盒型词 + 1 句卖点 + 指向对应 PDP 的内链（链接必须指向已存在 slug，写完 curl 验 200）
4. 5 FAQ：① 刀模費幾錢（答：拼版免刀模費，同业收 HK$300-800）② 起印量 ③ 材质怎选（白卡 vs 坑纸）④ 交期 ⑤ 可否打样（5 天免費打樣）
5. `lastUpdated: '2026-08-22'`

## T3. 免刀模費杀手级三件套（K3 拍板的核心武器）

事实依据：e-print 及香港同业刀模費照收（HK$300-800 行业惯例），PKG-016 拼版免刀模費是独有差异点。

1. packaging Pillar 新增**对比段**：「點解拼版彩盒平 40-60%：免刀模費 vs 同业 HK$300-800 刀模費」+ 内链 PKG-016
2. FAQ #1（见 T2-4）
3. PKG-016 的 `description` 首句已含免刀模費 ✅，确认 en/ja 版同样含 no die-cut fee / 型代不要（已有 ✅，只需核对不丢）

## T4. 纸袋集群收割（4 词齐升 momentum，47 imps）

| 词 | imps | pos 走势 | 当前着陆 |
|---|---|---|---|
| 印刷紙袋 | 13 | 18.3→12.7 🚀 | blog/paper-bag-buying-guide |
| 紙袋印刷 | 12 | 14.7→12 🚀 | blog/paper-bag-buying-guide |
| 紙袋訂製 | 11 | 28.2→16.6 🚀 | blog/paper-bag-buying-guide |
| 訂做紙袋 | 11 | 24.8→19.1 🚀 | category/paper-bags |

1. `category-seo-content.ts` paper-bags 条目：featuredSnippet + h2 + 首段对齐 4 词 + 3 FAQ + lastUpdated
2. blog `paper-bag-buying-guide`（`src/data/blog-data/zh-hk.json`）：文末加「訂製直通」段 = 3 条内链（category/paper-bags + 2 个 PDP）+ CTA
3. en/ja 同步（paper bag printing / custom paper bags；紙袋 印刷 / クラフト紙袋 印刷 1i pos28 顺带）

## T5. 「訂製」词根全站注入（top 20 SKU）

事实：`利是封訂製` pos 33.6（第 4 页）也拿到 1 click——訂製词根 = 全站最强订单意图信号。

- 对 imps 最高的 20 个 SKU 的 `title_zh` 逐一检查：缺「訂製」的补上（如 利是封/月曆/餐牌/貼紙/信封 类目优先）
- 每个 title ≤60 字符，放不下就替换同义弱词（如「定製」统一为「訂製」——GSC 数据显示用户搜「訂製」）

## T6. 邊度有紙袋買 跌幅查因（pos 1→16 ⚠️）

1. `git log --oneline -5 -- src/data/products.ts` 查 handle-bags PDP 近 2 周是否被改过
2. curl 验 `/zh-hk/product/handle-bags/` 200 + title 是否还含口语词
3. 查到即修；查不到原因 → title 注入「邊度買紙袋」口语词 + 观察
4. 结果写进当日报告

**Day 1 收工闸**：预检 4 连全过 → 逐文件 add → 1 commit（`feat(seo): v3.12 Day1 - packaging 词群 + 纸袋集群 + 訂製词根 + 免刀模費`）→ push → verify-deploy.mjs PASS → curl 抽查 packaging category + PKG-013/014 PDP 200。

---

# Day 2（8/23）— 海报/贴纸 + exercise book 大单 + 错配修复 + JA + GEO 扫尾

## T7. 海报词群（67 imps，a3海報 pos 11 = 全站最快进首页的词）

1. `category-seo-content.ts` posters 条目：featuredSnippet `印海報 A6-A0 全尺寸，A2 海報 HK$X/張起，同日特急可，DHL 全球 2-4 天。`（价格数字从 pricing.ts 查真实值，禁止编造）+ h2/首段对齐 印海報 25i pos23.6 / 海報印刷 20i pos31.6 / poster 印刷 12i pos28.3 + 尺寸表段（A0-A3）+ 3 FAQ
2. blog `poster-size-guide` 加厚（a3海報大小 1i pos11 NEW）：加 A2/A3 尺寸对比表（mm+用途场景）+ 2 条内链（category/posters + a2-posters PDP）+ lastUpdated
3. en 同步（a2 poster size 8i pos67 / a3 poster size 6i pos64 — poster-size-guide en 版同样加厚）；ja 顺带（a2 ポスター 印刷 3i pos59.7）

## T8. 贴纸词群（38+ imps）

1. `category-seo-content.ts` stickers 条目：featuredSnippet + 对齐 貼紙印刷 26i pos40.7 + 5 FAQ（材质/防水/最小起印/交期/设计档要求）
2. waterproof-stickers PDP：title/description 注入「戶外貼紙」（12i pos18，striking）+「防水貼紙」（2i pos17.5 从 41.5 大升）——当前该词错落在 outdoor-vinyl-banners，本任务修主着陆，T10 修锚文本
3. removable-stickers PDP 顺带：可移貼紙 7i pos17

## T9. exercise-books en PDP 大单加厚（K3 点名的大单方向，~50 imps 集群冲首页）

文件：`src/data/products.ts` exercise-books + 如 Pillar 存在则同步

- 对齐词：school exercise book printing 16i pos23.8 / school exercise book print 16i pos26.2 / exercise book printing pos10.7 / custom exercise book printing pos17 / school textbook printing pos12 NEW
- **大单三锤**（对 Alibaba/Made-in-China 黄页的差异化，已核实：竞对 MOQ 500-50,000、询盘制、海运数周）：
  1. MOQ 50-100 本起（黄页 500+）
  2. 30 秒 AI 报价（黄页邮件询盘 2 天）
  3. DHL 2-4 天（黄页海运 3-4 周）
- 目标市场场景：非洲/中东/东南亚教育局 + 培训学校批量采购（竞对事实：Togo/Ghana/Burkina Faso 出口商活跃）
- CTA：30 秒报价表单 + WhatsApp 双通道

## T10. 着陆页错配修复（白捡的排名）

| # | 词 | 动作 |
|---|---|---|
| 1 | 戶外貼紙→banner 页 | 全站 grep 指向 outdoor-vinyl-banners 的「戶外貼紙」锚文本，改为指 waterproof-stickers |
| 2 | 教科書 印刷→/ja/ textbooks | zh textbooks PDP title 注入「教科書印刷」（12i pos42.7） |
| 3 | a2 poster(en)→/zh-hk/ PDP | en a2-posters PDP title/keywords 对齐 "a2 poster printing" |
| 4 | 特急印刷 激安→ja rush 页 | ja rush title 补价格锚「激安」（3i pos16 NEW） |
| 5 | 燙銀→foil-greeting-cards | PDP 加「燙銀」工艺段（1i pos19，顺带） |

## T11. business-card-design 页面诊断 + §11 处置

事实：该 URL 线上 200 且在 ranking（貼紙設計 2i / golden rules of business card design 1i），但 blog-posts.ts / blog-data/*.json / buying-guides.ts 均无此 slug = 渲染来源不明（疑似 fallback 页）。

1. 诊断：`curl https://zprintpro.com/zh-hk/blog/business-card-design/` 抓 HTML 看 title/content 来源；grep `generateStaticParams` 与 page.tsx fallback 逻辑
2. 处置：加 301 → `/blog/sticker-design/`（sticker-design blog 已存在 ✅），`_redirects` 或 next.config.js redirects 均可，改完 curl 验 301→200
3. 报告写清渲染来源（技术债登记）

## T12. JA 立足点（61 imps 小盘，3 个点）

1. blog `poster-printing-price-guide` ja 版加厚：ポスター 印刷 費用 1i pos13 NEW = ja 第一个首页词候选，价格表 + FAQ
2. kraft-paper-packaging-box ja PDP：クラフト紙 パッケージ印刷 11i pos22-25 集群，title/description 对齐
3. 両面カラー印刷 21.1→40.1：⛔ 不动（R3 五件套 8/19 刚改，Google 重评估期），8/28 观察

## T13. GEO 扫尾 + 发布

1. Day 1-2 所有改动页确认 featuredSnippet / FAQ 就位（AI 引用率最直接单动作）
2. IndexNow 3 locale ping 全部改动 URL
3. sitemap 重新生成确认（npm run build 产物）

**Day 2 收工闸**：同 Day 1 铁律 4 连 + 1 commit（`feat(seo): v3.12 Day2 - 海报/贴纸 + exercise book 大单 + 错配修复 + JA`）→ push → verify-deploy.mjs PASS → curl 抽查 8 个改动 URL 全 200 + business-card-design 301 生效。

---

# 验收口径（8/28 GSC cron 对账，写进 8/23 报告）

| 指标 | 基线 | 目标 |
|---|---|---|
| striking 词进首页（pos≤10） | 0 | ≥3（候选：印刷紙袋 12.7 / 紙袋印刷 12 / exercise book printing 10.7 / a3海報大小 11 / ポスター 印刷 費用 13） |
| 包装盒 5 词 avg pos | ~37 | ≤28 |
| 纸袋 4 词 clicks | 0 | ≥2 |
| 有名词 7d clicks | 6 | ≥10 |
| 邊度有紙袋買 | pos 16 | 回 top 5 |
| 站点日均 imps | 682 | ≥900 |

# 报告格式（§0.21）

⛔ 不列 push 计数/配额。报告只写：①落地项+文件 ②5 步验收结果 ③异常 ④下一步。每日收工报告落盘 `.hermes/logs/2026-08-2X-v312-dayN.md`。
