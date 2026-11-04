# 抄站战争 R1：CPU 超限因果判定 + 品牌词翻转 + DMCA 提交包（2026-11-04）

- **日期**: 2026-11-04（首席 SEO/AEO/GEO 数据战略分析师 · 第 1 轮续跑，自主全权）
- **触发**: K3 指令三连——① 思考两次 CF CPU 超限邮件（10-29 / 11-03）是不是「爬我网站」导致；② 落地搜索层抢原创权（DMCA + 精确匹配监控 + 品牌词防守）；③ 商业层拉开差距
- **前置 SSoT**: `docs/2026-10-16-anti-scrape-hardening.md`（指纹+水印+CF 三规则）· `docs/2026-10-16-hkprint58-vs-zprintpro-forensics-checklist.md`（取证清单 v1）· `docs/evidence/2026-10-16-hkprint58/`（证据原件库）· `docs/2026-11-04-cf-workers-cpu-limit-2nd-email-analysis-and-decision-pack.md`（今晨 CPU 决策包）

**数据来源**:
- git 实证：`7f1a283e` = 2026-10-16 17:06:04 +0800（CF 三防线执行报告入库）→ **防线上线时间 = 10-16 17:06，早于两封 CPU 邮件**
- 线上探针（2026-11-04 08:2x-08:5x HKT，浏览器/curl/GPTBot/zp-a2-probe 四 UA 差分 + 两组限速 burst，本会话实弹）
- 竞站 sitemap：`hkprint58.com/sitemap.xml` 现抓（`.hermes/tmp/hkprint58-sitemap-20261104.xml`，277 URL，50KB）vs 10-16 基线（forensics 附录 A）
- Google 精确匹配检索 ×4（"ZP-OC-2610" / "ZPQC-2610-ST" / "14 類別 84 款產品，30 秒 AI 即時報價" / hkprint58+品牌词，2026-11-04）
- 竞站 live fetch（browser UA）：`hkprint58.com/`、`hkprint58.com/en/brand`（原件 `.hermes/tmp/hkprint58-{home,en-brand}-20261104.html`）
- 品牌异常档案：`.hermes/logs/brand-anomaly-dossier-2026-10-23.md`（10-23 一手 web_fetch）
- 证据库日志：`docs/evidence/2026-10-16-hkprint58/logs/spn-log.txt`（round1 3/15）· 本轮启动 `spn-log-round2.txt`（后台补存 12 URL，监控已挂）
- **校准状态**: 时间线/线上行为/竞站状态 = **已校准**（双方法，见 §1.2）；CF Workers CPU 按爬虫分布 = **待校准**（Analytics scope 未到位，路径见今晨 CPU 决策包 §7.4）

---

## §1 K3 提问的正面回答：两次 CPU 超限是不是「爬我网站」导致的？

### §1.1 结论（三段式）

1. **10-15 那次（≥1,000/日）**：是「结构性 SSR × 爬虫总量」的复合结果，**爬虫贡献显著但不分敌我**——Googlebot / AI 爬虫 / 扫描噪声 / **鑫印吧 8-28~10-13 的周期性整站抓取**全部计入（10-15 SSoT 根因链 #4+#5；鑫印吧再抓节奏与我方 daily 发布同步 = forensics §1 事实 #8）。
2. **10-29 与 11-03 这两次（各 ≥100/日）**：**主要不是鑫印吧**。证据：① 三防线 10-16 17:06 上线，被拦 UA 类（python/curl/scrapy 等）与 AI 爬虫在边缘即被拦，**不产生 Worker CPU**；② 竞站 sitemap 最新 lastmod 封顶 **2026-10-13**，10-16 后零新发布批次——其「抓取→批量发布」管线在防线生效后停滞；③ 指纹 Google 检索 0 命中对方站 = 我方 10-16 后的新内容（含指纹）未被抄走 = 无再抓迹象。
3. **剩余 ≥100 次/日的真实构成** = **合法爬虫（Googlebot/Bingbot，不受 BFM/AI block/UA 拦截影响）+ 真人 + 结构性 SSR 冷启动**。即：病根仍是「686 页全量 edge SSR × 免费层 10ms」（今晨 CPU 决策包 §3），爬虫只是放大器；防爬规则解决的是「敌意爬虫份额」，**解决不了结构性份额**——Workers Paid $5/月 + HTML Cache Rules 的建议维持不变。

### §1.2 双方法复算（per §0.23.2）

| 结论 | 方法 1 | 方法 2 | 一致性 |
|---|---|---|---|
| 防线早于两封邮件（敌意爬虫已被边缘拦截且零 CPU） | git：7f1a283e = 10-16 17:06 | 防线报告（Kimi 会话 10-16 17:0x 线上验证）+ 今日实弹 curl-UA 403 | ✅ 一致 |
| 鑫印吧 10-16 后未再抓取 | sitemap lastmod 封顶 10-13（现抓 277 URL） | 指纹 "ZP-OC-2610"/"ZPQC-2610-ST" Google 检索对方站 0 命中 | ✅ 一致 |
| 我方指纹体系未被破解 | Google 精确搜 0 对方命中 | 页脚指纹 live（今日 curl /zh-hk/ 命中 ZP-OC-2610） | ✅ 一致 |
| 剩余 CPU 超限 = 结构性 + 合法爬虫 | cf-cache-status: DYNAMIC（HTML 零边缘缓存，今晨复测） | 10-15 Build#3 回退记录（SSG 被堵死）+ 冷启动 TTFB 2.73s 实测 | ✅ 一致 |
| CPU 按 URL/爬虫精确分布 | 邮件（账户级 ≥100/24h） | CF Analytics → 403（scope 未到位） | ⚠️ 待校准（不阻塞结论） |

---

## §2 三防线独立验证（不信任报告，实弹复测）

| 规则 | 今日实测 | 判定 |
|---|---|---|
| WAF 爬虫 UA 拦截 | curl-UA → **403**；浏览器 UA → **200**；自家探针 UA（zp-a2-probe/1.0，不在拦截名单）→ **200**（监控不误伤） | ✅ 在位 |
| Bot Fight Mode + AI Bots Protection=block | GPTBot UA → **403** | ✅ 在位（附带后果见 §5） |
| 限速 v2（/category/+/product/ 20/10s，ruleset `810c7bc2...`） | /en/category/stickers/ 25 连发 = **25×200 零拦截**；/zh-hk/ 同路径 21 连发曾现 **9×503** 交错；30 秒后同路径复测 21×200 | ⚠️ **在位性存疑**（未复现 10-16 的确定性「第 21 发起拦」形态）→ **K3 Dashboard 复核规则版本**（Caching/WAF → Rate limiting rules），确认 v2 表达式仍在 + 观察其 503 形态是否为本站 SSR burst 自身错误 |
| 页脚指纹 | /zh-hk/ live 含 `ZP-OC-2610` | ✅ 在位 |
| 指纹月轮换 | 仍为 2610（10 月档） | ⚠️ 未轮换——monthly-matrix 车道 11-01 起 MISSING 的连带；轮换器未接线（10-16 遗留待拍板项）。**11 月轮换手动补跑**：`node scripts/rotate-copy-fingerprint.mjs --apply`（涉 src/Footer → 按 §0.25.9 攒批 + §0.35.7 看锁，本报告不代跑） |

---

## §3 指纹周检首检（SOP §5 执行记录，已逾期 2.5 周后补跑）

- "ZP-OC-2610"：Google 5 结果**全部为我方站**（en/quote、comiket-c109、en/faq、help-center、en 首页——指纹已进索引 = 未来可被精确搜索发现）→ **对方 0 命中**。
- "ZPQC-2610-ST"：5 结果全为我方产品页 → **对方 0 命中**。
- 逐字句 "14 類別 84 款產品，30 秒 AI 即時報價"（-site:zprintpro.com）：2 结果**全部 = hkprint58.com**（含旧 CMS 路径 `?m=home&c=Lists` 变体仍被索引）——**逐字复制现行在档，可直接入 DMCA 对照表**。
- 记录落盘：`.hermes/logs/hkprint58-monitor.jsonl`（check_no=1，2026-11-04）。**后续每周一跑**（与月度指纹轮换联动换查询词）。

---

## §4 品牌词防守：前提翻转（重要更正）

K3 的认知「他的鑫印吧目前没蹭你的品牌词，这点对你有利」**已被 11-04 live 实测推翻**：

| 证据 | 内容 |
|---|---|
| live fetch（browser UA，原件已存 tmp） | hkprint58.com 首页渲染 **「智印港」×1 + "ZprintPro"×4**（导航/品牌区，每页出现）；`/en/brand` 页标题 = "Brand story-Hong Kong printing company…"，正文整段使用 **"ZprintPro is a comprehensive printing company rooted in Shenzhen and serving the world…"** 的我方品牌叙事 |
| Google 索引 | 其 `/gongsixinwen/zhiyingang-brand-story.html`、`/order`、`/en/brand` 等多页 snippet 均含「智印港ZprintPro」/「ZprintPro」 |
| 10-23 档案互证 | logo 文件名 = `logo-zhiyingang.png`；页面模板字串混入我方旧站 WhatsApp 文案 + zprintpro@outlook.com |

**含义**：① 商标位从「备用手段」升级为**现行证据**——对方在商业页面公开使用我方品牌词（无论是否模板残留，客观效果 = 品牌混淆）；② DMCA 材料可同时打**版权 + 品牌混淆**两条线；③ 摊牌话术升级：「请立即移除页面上所有 智印港/ZprintPro 字样与 logo-zhiyingang 资源」（可执行、可验收的诉求）。
**数字诚信边界（§0.23）**：仍只主张「抄袭 + 品牌字样使用」，不写「同一主体/同一老板」身份推断（NAP 不同，见 forensics §6）。

---

## §5 AI Bots Protection = block 的 AEO 权衡（K3 决策已记录，给出复原触发器）

- **现状**：K3 10-16 顺手把 AI 爬虫全挡（GPTBot/ClaudeBot/PerplexityBot 等 = 403，今日实测）。
- **反爬增益 ≈ 0**：CF 的 verified AI bots 走 **IP 段验证**，仿站者**无法伪装**成 GPTBot——拦 AI 爬虫不会多挡住鑫印吧一分（它要么用已拦的脚本 UA，要么用浏览器 UA）。
- **AEO 净损失**：robots.txt 明文邀请（§0.28.3/§0.36）与边缘 403 自相矛盾；§0.36 W4 的 **Perplexity / ChatGPT 引用线被切断**；Google AI Overviews（走 Googlebot）与 Bing Copilot（走 Bingbot）**不受影响**。
- **建议**：DMCA 提交落定后（或 K3 一句话拍板），把 AI Bots Protection 从 block 调回 **allow verified AI bots**（或对 GPTBot/PerplexityBot/ClaudeBot 精准放行）——需要 zone 定向 token（`cf-bot-hardening-zprintpro`，K3 手持；本会话 token 无该权限，未擅动）。在恢复前，GEO 探针（W4）读数会把 Perplexity 通道记为「平台侧不可达」，避免误判为内容质量问题。

---

## §6 Google DMCA 提交包（材料已齐，提交动作 = K3 真人动作 per §0.24）

### 6.1 已齐材料
| 件 | 状态 |
|---|---|
| 逐字对照组（可提交的最小充分集） | A1「14 類別 84 款產品，30 秒 AI 即時報價。」↔ `HowItWorks.tsx:72`；A3「即日急件 18:00 截單，翌日中午 12:00 前送達」；EN 贴纸/传单 FAQ 逐字段（品牌被机换 Xinyinba）——今日 Google 确认对方首页句仍在索引 |
| 系统性证据 | 35/39 产品 slug 完全同名（89.7%）；14 品类 1:1 映射；报价格式/数量阶梯同源 |
| 原创时间证据 | git 全历史（2026-05-08 起每次内容 commit）；**Wayback 3 条快照已封存**（zh-hk 首页 20261016100704 等）；证据库 git 入库 commit 时间戳；对方高仿版 2026-08-28 才批量上线（晚我方 3.7 个月） |
| 侵权现状固定 | 证据库 15 HTML + 9 截图 + SHA256SUMS；**本轮后台补存 12 URL SPN 进行中**（监控已挂，完成自动回传） |
| 品牌混淆证据（新） | §4 live 渲染 + Google 索引 snippet |

### 6.2 K3 操作（约 20 分钟，全部零成本）
1. ~~Google 版权移除表单~~ → **✅ 已提交（2026-11-04，举报 ID `1-0797000042125`，账号 zprintprohk@gmail.com，签名 Yunti Tang / Shenzhen Cailong Printing & Packaging Co., Ltd.）**；回执与追踪入口见 `docs/evidence/2026-10-16-hkprint58/DMCA-google-submission-2026-11-04.md`（信息中心 https://reportcontent.google.com/dashboard?product=1 ，入库延迟属正常）；系统将 www 变体去重，核心 10 侵权 URL 全部在单。被侵权方 = 深圳市彩龙印刷包装有限公司。
   - **Remove 这些 URL（对方）**：`hkprint58.com/`、`/en/tiezhiyinshua/waterproof-stickers.html`、`/en/chuandanyinshua/a4-flyers.html`、`/gongsixinwen/zhiyingang-brand-story.html`、`/faq/faq-bd8520663ab2.html`、`/case/skincare-brand-packaging-case.html`、`/en/brand`
   - **Work（我方对应）**：`zprintpro.com/zh-hk/`、`/en/product/waterproof-stickers/`、`/en/product/a4-flyers/`、`/zh-hk/`（HowItWorks 句）、`/zh-hk/faq/`、案例/blog 对应页、`/en/`（品牌叙事）
   - **描述模板**（可直接粘贴）：*"Our website zprintpro.com (operated since 2026-05-08; predecessor z-printpro.com since 2025-12-28) publishes original Chinese/English content. hkprint58.com copied our content verbatim, including product FAQs with only the brand name machine-replaced, our homepage process copy, and our brand name 智印港/ZprintPro displayed on their pages. Evidence: full git history of our repository, Internet Archive snapshots of our pages (web.archive.org/web/20261016100704/https://zprintpro.com/zh-hk/), and a forensic comparison pack (35/39 product slugs identical). The infringing site's current design first appeared in a mass update dated 2026-08-28 (their own sitemap lastmod), months after our first publication. We request removal of the listed URLs from Google search results."*（声明+签名按表单字段填写）
2. **注册商/主机商滥用投诉**（可并行）：`DomainAbuse@service.aliyun.com`（注册商 HiChina，IANA 1599）+ 西部数码工单（托管链 → 219.234.31.65）——同一套材料。
3. **摊牌（可选先行）**：微信/邮件附 §4 品牌字样截图 + 逐字对照表，限期 7 天下架；对方邮箱 shenzhentengsheng@foxmail.com。
4. **GSC 首收导出**（forensics §7-5 仍开口）：Search Console 导出核心页首次收录日期存 `GSC数据/`——DMCA 材料的时间证据再加一层。

### 6.3 提交后的监控闭环（本报告已建）
- 每周一跑 `.hermes/logs/hkprint58-monitor.jsonl` 口径检查（指纹查询 + sitemap diff + 品牌词检索 + site:hkprint58.com 新增 URL）。
- DMCA 命中验证：提交后 1-2 周内对被移除 URL 做 `site:` 检索——消失 = 生效；继续出现 = 升级注册商投诉。

---

## §7 商业层（K3 方向性判断的执行落点，维持既定资产）

- 对方抄走的只是 9 月底前的旧版壳（其模板字串混入我方已清扫的 ISO 9001/1,000+ 等主张——**我方 10 月 CRED 清扫反而拉开了合规差距**，10-23 档案判断维持）。
- 我方继续赢的维度 = 真实工厂事实（平湖嘉城路）、12 段深度 blog 标准的三语产能、ja 全站（对方无 ja）、GSC 6 个月索引积累、指纹/水印/反爬纵深。**本轮不新增 src 动作**，按既有 11-06 weekly-meta 批与 daily 车道节奏推进（见 11-04 K3-review NEXT）。

---

## §8 K3 待办收敛（一次 Dashboard/后台会话 + 一次表单会话）

| # | 项 | 用时 |
|---|---|---|
| 1 | ~~**Google DMCA 表单提交**~~ → ✅ **已提交（ID 1-0797000042125，2026-11-04）** | 完成 |
| 2 | 注册商/主机商 abuse 投诉（§6.2.2，可同日） | 10 min |
| 3 | **限速规则复核**：Dashboard → 规则 `810c7bc2...` 是否 v2 在位（§2 复测存疑） | 2 min |
| 4 | **AI Bots Protection 复原拍板**（§5：allow verified AI bots，一句话） | 1 min |
| 5 | GSC 首收导出（§6.2.4） | 10 min |
| 6 | （承接今晨 CPU 包）Workers Paid 升级 + HTML Cache Rules——**未决事项原样有效** | 10 min |
| 7 | CF 两个 hardening token Roll（10-16 报告遗留） | 2 min |

**执行层待办（攒批队列）**：指纹月轮换补跑（2610→2611）+ 轮换器接入 monthly-matrix 拍板件 + spn-round2 结果回填证据库 README（后台运行中，监控已挂，完成自动回报）。

---

## §9 合规声明

- 本报告 docs-only：零 src/ 改动、不触发 push；唯一后台动作 = Wayback SPN 补存（只读存证、170s 礼貌间隔，对方站仅被存档 5 页）。
- 竞站相关全部为**被动取证**（抓取其公开页面/搜索其公开索引），无任何主动攻击行为。
- 不写身份推断（NAP 不同）；不冒充车道报告；未创建定时任务（周检为 SOP 人工/会话执行，如需自动化 cron 待 K3 拍板）。
