# 2026-10-16 鑫印吧（hkprint58.com）× 智印港（zprintpro.com）逐页对比取证清单 v1

> K3 2026-10-16 指令「现在就做逐页对比取证清单」。本清单可直接用于 ① 摊牌（微信/邮件附证据）② Google DMCA 版权移除 ③ 主机商/注册商滥用投诉。
> 前置 SSoT：`docs/2026-10-16-anti-scrape-hardening.md`（指纹 ZP-OC-2610 / ZPQC-2610-*、1812 张水印、CF 三层拦截——均已线上生效）。

**数据来源**：
- 对方站现场抓取（2026-10-16 17:0x-17:3x）：`hkprint58.com/`（首页）、`/sitemap.xml`、`/robots.txt`、`/gongsixinwen/zhiyingang-brand-story.html`、`/en/tiezhiyinshua/waterproof-stickers.html`
- 域名档案：RDAP（rdap.org → Verisign，2026-10-16 17:1x）；DNS `Resolve-DnsName`（NS + A/CNAME 链，2026-10-16 17:1x）
- Wayback Machine：CDX API（hkprint58.com 全量时间线 + 20250717 快照正文）+ availability API（zprintpro.com / z-printpro.com = 0 快照）
- 我方仓库（F:\zprintpro-nextjs，本地 grep）：`src/components/home/HowItWorks.tsx:72`、`src/data/blog-posts.ts:1431/1610`、`src/data/products.ts`（99 个 slug 全量提取）
- 双方法记录（§0.23.2）：slug 交集用「rg 提取 × PowerShell 数组求交」；前两次因引号格式/尾引号未剥离得出 0 命中，经已知样本（waterproof-stickers, products.ts:715）校验修正后第三次得出 35/39——结论以第三次为准。

**校准日期**：2026-10-16 17:31（全部为当日现场抓取，非缓存）

---

## §1 一页结论（已确证事实）

| # | 事实 | 证据 |
|---|------|------|
| 1 | **整站仿制坐实**：对方 ~230 URL（14 品类 × 中英双语 + 60+ 产品页 + ~110 内容页），骨架/品类/报价格式/FAQ 话术与我站一致，仅换品牌与联系方式 | sitemap.xml 全量；首页抓取 |
| 2 | **产品 slug 1:1**：对方产品 URL slug 抽样 39 个，**35 个与我方 products.ts 完全同名**（89.7%） | 双方法交集（见头部） |
| 3 | **首页文案逐字复制**：「14 類別 84 款產品，30 秒 AI 即時報價。」= 我方 `HowItWorks.tsx:72` 一字不差；「即日急件 18:00 截單，翌日中午 12:00 前送達」= 我方话术同句 | 对方首页 vs 我方源码 |
| 4 | **EN 产品页 FAQ 逐字搬运 + 品牌机换**：贴纸 FAQ 全段逐字（白墨/防水冷藏/异形刀版/300dpi CMYK 3mm 出血）；传单 FAQ 品牌被机换成「Xinyinba」「Xin Yin Bar」 | 对方 `/en/tiezhiyinshua/waterproof-stickers.html` |
| 5 | **报价格式同源**：「HK$0.22/件起 · 100件起批 · 整批 HK$100」+ 四档数量阶梯 save 0.00%/15.00%/28.00%/45.00% + Recommended/Best deal 标签 | 同上 |
| 6 | **我方品牌词被抄进对方 URL**：对方博客 `/gongsixinwen/zhiyingang-brand-story.html`（智印港品牌故事）——slug 含我站品牌拼音，正文已改写为鑫印吧；该 slug 在我方现行仓库 0 命中（疑来自我方旧站 z-printpro.com，见 §8） | 对方页面抓取 + 全仓 grep |
| 7 | **高仿版上线时间在我方之后**：对方 2026-07-12 快照仍是旧 CMS（ThinkPHP `?m=home&c=View`）旧内容（「鑫之源柯式印刷」）；2026-08-28 全站批量 lastmod = 高仿版换血上线。我站 2026-05-08 上线、内容铺开更早 | Wayback CDX + 20250717 快照正文 + sitemap lastmod |
| 8 | **对方持续周期性再抓取**：数字文章页按 09-05/09-07/09-08/09-09/09-16/09-17/09-19/10-07/10-13 批次增量更新，与我方 daily 车道发布节奏同步 | sitemap lastmod 分组 |
| 9 | **对方身份线索**：香港九龙观塘兴业街20号联合兴业工业大厦5楼A68室 + 深圳市龙岗区平湖街道凤岐路14号 + `+86 189 2651 5048` / `852 25848612` + `shenzhentengsheng@foxmail.com` + 「週一至週六 09:00-18:00」 | 对方 robots.txt 路径泄漏的页脚 NAP（同内容在每页页脚） |
| 10 | **基础设施档案**：域名 2024-11-18 注册于阿里云 HiChina（abuse: DomainAbuse@service.aliyun.com）；NS dns17/18.hichina.com；托管 CNAME 链 `hkprint58.gotoip3.com → ssl8.hk.xp94.com → 219.234.31.65`（西部数码系香港虚拟主机） | RDAP + Resolve-DnsName |
| 11 | **对方技术粗糙（利于取证）**：`/robots.txt` 路径直接返回页脚内容；产品页内混排拼接痕迹（铜版纸贴纸页内嵌我方 A4 传单描述「157g coated paper」+ 两套规格选择块重复渲染） | 现场抓取 |

---

## §2 对方站点档案（投诉对象信息）

| 项 | 值 |
|---|---|
| 域名 | hkprint58.com（www 同） |
| 注册商 | Alibaba Cloud Computing Ltd. d/b/a HiChina（万网），IANA ID 1599 |
| 注册时间 | 2024-11-18T14:09:49Z（到期 2027-11-18） |
| 注册商滥用通道 | DomainAbuse@service.aliyun.com / +86.95187 |
| NS | dns17.hichina.com / dns18.hichina.com |
| 托管 | 西部数码系（gotoip3.com 主机别名 + myhostadmin.net DNS 群），香港节点 ssl8.hk.xp94.com → 219.234.31.65 |
| 对外身份 | 「鑫印吧」（EN 写作 Xinyinba / Xin Yin Bar），自称「深圳生产、香港交货」 |
| 对方 NAP | 观塘兴业街20号联合兴业工业大厦5楼A68室；深圳市龙岗区平湖街道凤岐路14号；+86 189 2651 5048 / 852 25848612；shenzhentengsheng@foxmail.com；週一至週六 09:00-18:00 |
| 内容语言 | zh-hk 全站 + /en/ 全站镜像（无 ja） |

**时间线**（原创性论证的骨架）：
```
2024-11-18  域名注册（阿里云）
2024-11-21  Wayback 首快照（旧站）
2025-07-17  快照正文 = 「鑫之源柯式印刷有限公司」传统企业站（与我站无关）
2026-02~07  仍为旧 CMS（URL 带 ?m=home&c=View&a=index&aid=N，ThinkPHP 特征）
—— 我站 zprintpro.com 2026-05-08 上线，内容持续铺开 ——
2026-08-28  对方全站批量换血为高仿版（sitemap lastmod：产品页/博客/案例/FAQ 整批 2026-08-28）
2026-09~10  周期性再抓取再发布（数字文章页批次跟进，最近一次 2026-10-13）
2026-10-16  我方指纹 ZP-OC-2610/ZPQC-2610-* 上线 + CF 三层拦截生效
```

---

## §3 我方原创证据链（现状 + 缺口 + 补法）

**已有**：
- git 仓库全历史（2026-05-08 上线至今每次内容 commit 可查证，F:\zprintpro-nextjs）
- GSC 首次收录日期（K3 后台可见，**今日补一次导出存档**，见 §7）
- 旧站 z-printpro.com 2025-12-28 上线（部分内容源头更早）

**⚠️ 缺口（今日实测）**：zprintpro.com 与 z-printpro.com 在 Wayback Machine 均 **0 快照**（archive.org availability API 返回空）——我方目前没有第三方时间戳。**今天就补**（Save Page Now 免费，1 分钟一个）。

> **✅ 补录执行（2026-10-16 18:2x，K3 全权委托）**：本地证据库已建 `docs/evidence/2026-10-16-hkprint58/`——双方 15 页 HTML 原件 + 9 张整页截图 + SHA256SUMS + 操作日志（入库 commit 即时间戳）。`/zh-hk/faq/` 路由确认存在（`src/app/[locale]/faq/page.tsx`），已照存；旧站 z-printpro.com 实测已 301 → 新站（日志有最终 URL，本身即迁移证据）。Wayback SPN 匿名接口触发 429 限流，15 URL 队列后台退避重试中（`logs/spn-log.txt`），CDX 终验随队列完成后回填。

**待存档的 10 个我方 URL**（web.archive.org/save 逐个提交）：
1. `https://zprintpro.com/zh-hk/`
2. `https://zprintpro.com/en/`
3. `https://zprintpro.com/en/product/waterproof-stickers/`
4. `https://zprintpro.com/en/product/a4-flyers/`
5. `https://zprintpro.com/en/product/mailer-boxes/`
6. `https://zprintpro.com/en/product/saddle-stitch-booklets/`
7. `https://zprintpro.com/en/category/stickers/`
8. `https://zprintpro.com/zh-hk/category/packaging/`
9. `https://zprintpro.com/zh-hk/faq/`（若路由存在则以首页+1 产品页代替）
10. `https://z-printpro.com/`（旧站，若有残存页面）

同时把**对方 5 个关键页**也存档（固定侵权现状）：首页、`/en/tiezhiyinshua/waterproof-stickers.html`、`/gongsixinwen/zhiyingang-brand-story.html`、`/faq/faq-bd8520663ab2.html`、`/case/skincare-brand-packaging-case.html`。

---

## §4 逐页对比取证清单

> 图例：复制度 = 逐字（verbatim）/ 高（结构+措辞）/ 中（主题同源）。取证动作每格完成后打勾并记日期。

### A. 全站/首页层（6 项）

| # | 对方位置 | 对方内容（摘录） | 我方对应出处 | 复制度 | 取证动作 |
|---|---|---|---|---|---|
| A1 | 首页流程区 | 「14 類別 84 款產品，30 秒 AI 即時報價。」 | `HowItWorks.tsx:72` 逐字 | **逐字** | ☐ 双页截图 ☐ Save Page |
| A2 | 首页流程第5步 | 「順豐本地 / DHL 全球 5-7 天，滿 $500 免運」 | 我方 HowItWorks 同构 | 高 | ☐ 截图对照 |
| A3 | 首页为何选择区 | 「即日急件 18:00 截單，翌日中午 12:00 前送達」（出现 2 处） | `blog-posts.ts:1431` 同句式 | **逐字** | ☐ 截图对照 |
| A4 | 首页信任区 | 「2012 年起, 5000+ 訂單完成」「15+ 年服務全球中小企 · ISO 9001:2015 認證」 | 我方 foundingDate=2012 + 订单口径 + 旧版 ISO 文案（我方 10 月中旬已清 ISO 表述，对方快照停在清之前——反证抓取时点） | 高 | ☐ 截图对照 |
| A5 | 页脚品牌段 | 「鑫印吧，香港印刷公司，5台對開海德堡印刷機，3台惠普B2數字印刷機…」 | 我方页脚品牌段同构句式（逐字比对做进摊牌包） | 高 | ☐ 逐字比对 |
| A6 | robots.txt | 路径直接返回页脚 NAP 内容（构建工具粗糙） | — | — | ☐ 存档（佐证低质仿制） |

### B. 品类层映射（对方 pinyin slug ↔ 我方 category slug，14 项）

| 对方 | 对方中文 | 我方对应 | 备注 |
|---|---|---|---|
| /chuandanyinshua/ | 宣傳單印刷 | /category/flyers/ | ✔ |
| /tiezhiyinshua/ | 貼紙印刷 | /category/stickers/ | ✔ |
| /baozhuangheyinshua/ | 包裝盒印刷 | /category/packaging/ | ✔ |
| /zhidaiyinshua/ | 紙袋印刷 | /category/paper-bags/ | ✔（对方 URL 用 zhidai=纸袋，我方英文 slug） |
| /xiaoyuanyinshua/ | 校園印刷 | /category/educational/ | ✔ |
| /jipianyinshua/ | 咭片印刷 | /category/greeting-cards/ | ✔ 我方贺卡资产被对方归入「咭片印刷」并恢复「名片印刷」子项（对方行为，与我方 §0.0 展示层无关，仅记录） |
| /xinfengyinshua/ | 信封印刷 | /category/envelopes/ | ✔ |
| /shukanyinshua/ | 書刊印刷 | /category/books/ | ✔ |
| /shumayinshua/ | 數碼印刷 | 我方数码/即日服务面 | 待核 slug |
| /tongrenzhiyinshua/ | 同人誌印刷 | /category/japan-doujin/ | ✔ |
| /guanggaopenhui/ | 廣告噴繪 | /category/banners/ | ✔ |
| /canyinyinshua/ | 餐飲印刷 | /category/menus/ | ✔ |
| /bijibenyinshua/ | 筆記本印刷 | books 子类 | 待核 slug |
| /xiaoceziyinshua/ | 小冊子印刷 | books 子类 | 待核 slug |

### C. 产品层（抽查 10 页；35/39 slug 同名为系统性证据）

| 对方 URL | 我方对应 | slug 同名 | 已核对证据 |
|---|---|---|---|
| /en/tiezhiyinshua/waterproof-stickers.html | /en/product/waterproof-stickers/ | ✔（页内实际内容=铜版纸贴纸，内容错位是拼接痕迹） | FAQ 逐字 + 报价格式 |
| /en/chuandanyinshua/a4-flyers.html | /en/product/a4-flyers/ | ✔ | 传单 FAQ 品牌机换 Xinyinba |
| /en/baozhuangheyinshua/mailer-boxes.html | /en/product/mailer-boxes/ | ✔ | ☐ 待抓 |
| /en/zhidaiyinshua/a2-posters.html | /en/product/a2-posters/ | ✔ | ☐ 待抓 |
| /en/shukanyinshua/saddle-stitch-booklets.html | /en/product/saddle-stitch-booklets/ | ✔ | ☐ 待抓 |
| /en/baozhuangheyinshua/food-boxes.html | /en/product/food-boxes/ | ✔ | ☐ 待抓 |
| /en/tiezhiyinshua/foil-stickers.html | /en/product/foil-stickers/ | ✔ | ☐ 待抓 |
| /en/xinfengyinshua/large-envelopes.html | /en/product/large-envelopes/ | ✔ | ☐ 待抓 |
| /en/xiaoyuanyinshua/graduation-yearbook.html | /en/product/graduation-yearbook/ | ✔ | ☐ 待抓 |
| /en/jipianyinshua/foil-greeting-cards.html | /en/product/foil-greeting-cards/ | ✔（我方贺卡 SKU） | ☐ 待抓 |

其余 25 个同名 slug：transparent-stickers / removable-stickers / die-cut-stickers / a5-flyers / double-sided-flyers / folded-leaflets / thick-paper-flyers / rigid-boxes / corrugated-boxes / cosmetic-boxes / a1-posters / outdoor-posters / display-posters / adhesive-posters / perfect-bound-books / hardcover-books / catalog-printing / spiral-notebooks / business-envelopes / colored-envelopes / pearl-envelopes / certificates / textbooks / exercise-books / school-flyers。
未命中 4 个（对方自有或源自我方旧站，DMCA 时单独核对）：invitation-envelopes / embossed-greeting-cards / new-year-cards / postcard-sets。

### D. 内容层

| 对方 | 数量 | 与我方关系 | 复制度 |
|---|---|---|---|
| /tiezhizhishi/ + /tiezhizhishi-2/ 博客 6 篇（foil-stickers-branding、transparent-stickers-white-ink、variable-data-qr-labels、food-label-materials、removable-vs-permanent、die-cut-sticker-files） | 6 | 主题与我方贴纸知识矩阵一一对应；slug 在我方现行仓 0 命中（疑抓自我方旧站或早期 sitemap） | 中-高（主题级，逐篇比对后升级） |
| /gongsixinwen/ 4 篇（global-printing-service、hong-kong-fast-delivery、factory-quality-control、**zhiyingang-brand-story**） | 4 | zhiyingang = 我方品牌拼音进对方 URL（强指向）；正文已改写品牌 | 高（slug 级指向 + 主题级） |
| /faq/faq-<12位hash>.html | 12 | 由我方 FAQ 内容生成（hash 命名法为对方生成器特征；我方无此模式路由） | 中-高（待抽 2 篇逐字比对） |
| /case/ 8 篇（festival-gift / real-estate / event / ecommerce-packaging / education / law-firm / skincare-brand-packaging / restaurant-chain） | 8 | 主题词（law-firm、skincare、festival-gift…）与我方产品文案行业场景词同源（我方 products/faq 长描述含这些行业词） | 中（待逐篇） |
| 数字文章页 74-210.html（各品类编号序列） | ~110 | 编号批次 lastmod 与我方 daily 发布节奏同步 = 周期性再抓取 | 待逐篇 |

---

## §5 指纹监控计划（ZP-OC-2610 体系，每周 15 分钟）

**基线**：对方最后抓取 ≈ 2026-10-13（sitemap lastmod），我方指纹 2026-10-16 上线 → **对方下一次整站再抓即带毒**。

**每周一检 SOP**（任一命中 = 现行证据，走 §6）：
1. Google 精确搜（带引号）：
   - `"ZP-OC-2610"`（页脚指纹，全站每页都有）
   - `"ZPQC-2610-ST"`、`"ZPQC-2610-FL"`、`"ZPQC-2610-PBX"`、`"ZPQC-2610-PO"`、`"ZPQC-2610-PB"`、`"ZPQC-2610-CAL"`、`"ZPQC-2610-ENV"`、`"ZPQC-2610-SSB"`（8 品类 FAQ 档号）
   - `"平湖嘉城路"`（FAQ 工厂事实句关键词）
2. `site:hkprint58.com` 抽查新增 URL；对比本报告附录基线（新增页 = 新一轮抓取）。
3. 抓 `https://hkprint58.com/sitemap.xml` 与基线 diff（新增 lastmod 日期 > 2026-10-16 的 URL 重点查指纹）。
4. 月轮换后（`scripts/rotate-copy-fingerprint.mjs` → `ZP-OC-YYMM`），查询词同步换成当月档号。
5. 每次检查结果追加到 `.hermes/logs/hkprint58-monitor.jsonl`（date / queries / hits / urls / screenshots）。

**命中处置**：截图（带系统时间）→ Save Page Now 固定 → 追加 jsonl → 当日报 K3 → 按 §6 升级。

---

## §6 行动阶梯（从轻到重）

| 阶梯 | 动作 | 入口/材料 | 前提 |
|---|---|---|---|
| 1 | **摊牌**（微信/邮件，带证据包） | 指出逐字复制页对照表（§4）+ 我方时间戳证据（§3）+ 限期下架（建议 7 天）。很多人是外包建站，本人未必知情；摊牌留下「已告知」记录 | §3 存证完成 |
| 2 | **Google DMCA 版权移除**（杀伤力最大、零成本） | 提交入口：Google 搜索「Google Copyright removal」官方表单（support.google.com/legal）。材料：逐字对照表 + 双方 URL 对 + 我方原创时间证据（git/GSC/Wayback）+ 声明与签名 | §3+§4 完成；命中后对方页面从搜索结果移除 |
| 3 | **注册商/主机商滥用投诉** | 注册商：DomainAbuse@service.aliyun.com（附 DMCA 同套材料）；托管：西部数码（west.cn） abuse/工单通道 | 阶梯 2 已提交或并行 |
| 4 | **商标位**（备用） | 对方目前未蹭「智印港/ZprintPro」品牌词（对我不利点），但 `zhiyingang-brand-story` slug 是「关联我方品牌」的书证；若对方后续蹭品牌词，投诉力度升级 | 持续监控 |

**数字诚信边界（§0.23）**：现有证据支持「**内容抄袭**」（slug 1:1 + 逐字句 + 主题同源）；**不**支持「同一主体/同一老板」断言——对方 NAP（观塘 + 平湖凤岐路 14 号 + 189 号段手机 + foxmail）与我方实体（平湖嘉城路 1 号 + 198 号段 + outlook）不同。摊牌与投诉文本只写抄袭事实，不写身份推断。

---

## §7 今天 30 分钟行动包（K3 或下一会话执行，checkbox）

1. ☐ **CF token Roll**：CF 后台 → My Profile → API Tokens → `cf-bot-hardening-zprintpro` → Roll（一键，旧值立即作废；已核对本仓无 cron/自动化依赖该 token，Roll 无副作用——它只被一次性脚本 `scripts/cf-bot-hardening.sh` 引用，三条规则已生效）
2. 🔄 我方 10 URL Save Page Now（§3 清单）——SPN 匿名 429 限流，后台队列退避重试中（evidence/logs/spn-log.txt）
3. 🔄 对方 5 关键 URL Save Page Now——同上队列，完成后 CDX 终验
4. ✅ 已完成（2026-10-16 18:1x）：对方 5 页 + 我方 4 页整页截图 + 双方 15 页 HTML 原件入 `docs/evidence/2026-10-16-hkprint58/`
5. ☐ GSC 导出我站核心页首次收录日期（Search Console → 效果/索引，存 `GSC数据/`）
6. ☐ 本报告附录基线 diff 一次（确认 2026-10-16 后对方无新增）——首检从下周一起每周一跑
7. ☐ （可选）把轮换器接入 monthly-matrix 车道拍板（遗留项，见反爬报告）
8. ⚠️ **K3 必读——CF 限速规则有真人误伤面（2026-10-16 18:19 实测，需拍板）**：取证截图时 `/product/`、`/category/` 页一次加载并发拉数十张 `/images/`，触发 20 次/10 秒阈值 → Cloudflare Error 1015（已截获 Ray ID ab6521e1ab543df9）。真人快速连点 2-3 页即可能命中。建议拆分规则：HTML 路径（/category/、/product/）维持 20/10s；`/images/` 单独放宽至 ≥60/10s 或移出限速（批量爬图仍有 BFM + scraper UA 拦截兜底）。需 CF 后台改规则，或 Roll 新 token 后交执行层调 API。

---

## §8 诚实区：未核完项（不作为已证事实引用）

1. **博客 slug 级 1:1 未坐实**：对方 6+4 篇博客 slug 在我方现行仓 0 命中——疑抓自我方旧站 z-printpro.com（旧站内容不在本仓）。K3 可查旧站后台/GSC 验证「foil-stickers-branding」「zhiyingang-brand-story」等是否旧站 slug。zhiyingang-brand-story 若在旧站存在 = 对方连旧站一起抄的书证。
2. **faq-<hash> 12 篇未逐字比对**：仅确认我方无此路由模式；抽 2 篇比对后可升级为逐字证据。
3. **case 8 篇未逐篇比对**：主题词同源已确认，逐字对照未做。
4. **图片取证未做**：对方产品图若直接引用我方文件名/图片 URL，是额外证据；下一步：view-source 对方产品页收集 `/images/*` 路径与我方比对 + 查看是否盗链。我方 1812 张水印 2026-10-16 上线，对方现有图片快照在上线前。
5. **§4 C 块 9 页未抓全文**：slug 同名已证，页内逐字对照待抓（不影响 DMCA 主证据链，A1-A3 + C 第一行已构成可提交的逐字证据组）。

---

## 附录 A：对方 sitemap 基线（2026-10-16 抓取，供周检 diff）

- 全站 ~230 URL；lastmod 分布：**2026-08-28**（产品页 60+ / 博客+案例+FAQ 整批）→ 09-05 → 09-07 → 09-08 → 09-09 → 09-16 → 09-17 → 09-19（数字文章页批次）→ **2026-10-07、2026-10-13**（最新两批：/en/gongsixinwen/210、208 等）。
- 结构：10 大品类导航（pinyin）× zh + /en/ 双语镜像；产品页 /en/<品类>/<slug>.html ~60 个（35 个与我方同名，见 §4C）；内容页 ~110 个数字文章页 + 6 博客 + 4 公司新闻 + 8 案例 + 12 FAQ。
- **监控口径**：凡 lastmod > 2026-10-16 的 URL，重点搜当月指纹档号。
- 本基线的完整 230 URL 原文已在抓取当日进入会话记录；如需机器可读版，下次周检时把 sitemap 存为 `.hermes/logs/hkprint58-sitemap-baseline-20261016.txt`。

## 附录 B：一步法检查命令（下次周检直接跑）

```
# 1) 对方 sitemap 是否有新抓取（对比 2026-10-16 基线 lastmod）
fetch https://hkprint58.com/sitemap.xml  → grep 2026-10-1[6-9]|2026-10-2|2026-11
# 2) 指纹是否被抄走（Google 带引号搜）
"ZP-OC-2610"  /  "ZPQC-2610-ST" ... 8 个档号  /  "平湖嘉城路"
# 3) site:hkprint58.com 新增 URL 抽查页脚与 FAQ
```

---

*v1 · 2026-10-16 17:31 · 执行：AutoClaw 会话（取证现场抓取 12 次独立来源）· docs-only 攒批，随下一批 push（不单独触发 CF build，per §0.25.9）*
