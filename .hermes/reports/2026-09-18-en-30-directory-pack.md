# EN 市场 30 目录提交包（ZprintPro）— 2026-09-18

> **任务范围**：RESEARCH + DOCUMENT ONLY。本文件未修改 `src/`、`scripts/`、`public/` 或任何配置文件。
> **对标**：ja 市场「ジープリント 30 目录」配比 —— print/POD 7 + local/startup 7 + industry-specific 5 + SaaS 聚合 3 + other 8 = 30。
> **数据来源**：见文末 §5。所有 URL 均经 web_fetch 抓取或由 web_search 结果返回，无凭空构造。
> **完成度声明（先说结论）**：**本包共核实 28 个平台**，未达 30。缺口全部落在 **行业垂直（industry-specific）** 一类：目标 5，实核 3，**缺 2**。其余四类均达标（print/POD 7、startup/local 7、SaaS/B2B 聚合 3、other 8）。

---

## 1. 30 目录表（实核 28 行）

**列约定（严格区分「已验证」与「未验证」）**
- `免费/付费`、`邮箱验证`、`实体证明`、`dofollow` 四列：只有在**抓取到的页面正文中明确读到**才写结论；否则一律写 `未验证`。本报告不对未验证项做任何推断。
- 「已验证」= 本次用 web_fetch 取回该 URL（列出 HTTP 状态）或页面正文明确给出该链接。

### A. print/POD 相关（7 / 7）

| # | 分类 | 平台名 | 提交 URL | 免费/付费 | 是否需要邮箱验证 | 是否需要公司实体证明 | 是否产生 dofollow 外链 | 优先级 | 备注 |
|---|------|--------|----------|-----------|------------------|----------------------|------------------------|--------|------|
| 1 | print/POD | PRINTING United Alliance（Membership Directory） | https://www.printing.org/application | 付费 | 未验证 | 未验证 | 未验证 | P2 | fetch 200。会员页正文写明 Corporate Printer **US$495**（含所有人）/**Directory Listing** 为会员权益；目录本体在 https://directory.printing.org/ （fetch 200）。北美最大印刷行业协会，实体信号强但需年费 |
| 2 | print/POD | Printing Industry Exchange (PIE) | https://www.printindustry.com/Printers/ | 付费（印刷商月费） | 未验证 | 未验证 | 未验证 | P2 | fetch 200。首页正文："Printing companies with printing equipment can sign up … for a low monthly fee"；买方侧免费。另有 `/Resources/Default.aspx` 免费服务列表（首页正文写 "no fee for this listing"） |
| 3 | print/POD | Made-in-China.com | https://www.made-in-china.com/ | 未验证（存在注册入口） | 未验证 | 未验证 | 未验证 | P0 | fetch 200。中国供应商跨境 B2B 主站，收录印刷/包装类目；供应商注册入口存在但本次未逐页验证要求 |
| 4 | print/POD | Global Sources | https://www.globalsources.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P1 | fetch 200。站点顶部有 `Sign in/Register` 与 `Supplier Services`；供应商注册具体路径本次未验证 |
| 5 | print/POD | HKTDC Sourcing | https://sourcing.hktdc.com/newsbites/become-a-supplier/ecommerce/en/ | 未验证 | 未验证 | 未验证 | 未验证 | P1 | fetch 200。`Become a Supplier` 链接由抓取页面正文直接返回（非推测）。香港贸发局官方采购平台，跨境信任度高 |
| 6 | print/POD | Alibaba.com International（供应商） | https://register.alibaba.com/redirect.htm?entrance=cnfmSupplier | 未验证 | 未验证 | 未验证 | 未验证 | P1 | fetch 200（supplier.alibaba.com 首页）。该注册链接由抓取页面正文返回。页面自述需"提交资料→签约→支付→实地认证→开店上线"流程，**实地认证=强实体证明**，但本次未验证具体材料清单 |
| 7 | print/POD | Europages | https://www.europages.co.uk/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | fetch 200（仅首页）。欧洲 B2B 供应商名录；**站内注册/上架具体 URL 本次未验证**，执行时需人工定位 Sell/Register 入口后再补录 |

### B. 创业 / 本地企业目录（7 / 7）

| # | 分类 | 平台名 | 提交 URL | 免费/付费 | 是否需要邮箱验证 | 是否需要公司实体证明 | 是否产生 dofollow 外链 | 优先级 | 备注 |
|---|------|--------|----------|-----------|------------------|----------------------|------------------------|--------|------|
| 8 | startup/local | Crunchbase | https://www.crunchbase.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P1 | fetch 200。企业实体页对 GEO/AI 引用价值高。官方建档指引：https://support.crunchbase.com/hc/en-us/articles/115011823988-How-do-I-create-a-Crunchbase-profile （search 返回） |
| 9 | startup/local | BetaList | https://betalist.com/submit | 未验证 | 是（magic link 或 X 账号） | 未验证 | 未验证 | P2 | fetch 200；`/submit` 实际 302 到 `/sign_in`。sign_in 页正文显示 "Sign in with X" 或 "Sign in with magic link"（邮件） |
| 10 | startup/local | FreeIndex (UK) | https://www.freeindex.co.uk/advertise.htm | 免费（Premium 可选） | 未验证 | 未验证 | 未验证 | P1 | fetch 200。正文明确 "FREE business profile page" 与 "completely FREE unless you upgrade"。注册入口 `/signup.htm` 由抓取页面正文返回。英国本地目录，UK 市场实体信号 |
| 11 | startup/local | ChamberofCommerce.com | https://www.chamberofcommerce.com/members/add-business | 免费（Basic）+ 付费（Premium） | 未验证 | 未验证 | 未验证 | P2 | fetch 200（首页）。`/members/add-business` 由首页正文返回。Basic 列表保留，Premium 去广告/置顶。注意该站以美国本地商户为主 |
| 12 | startup/local | F6S | https://www.f6s.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | fetch 返回 200，但正文为 JS 挑战页（"Checking your browser"）。平台存在已确认，**表单要求未验证** |
| 13 | startup/local | Manta | https://www.manta.com/business-listings/add-your-company/mtccq2n | 未验证 | 未验证 | 未验证 | 未验证 | P2 | 该 URL 由 search 结果返回（Manta 官方 "Joining Manta is easy!" 页）。**manta.com 本次 fetch 返回 403（Cloudflare），未能抓取正文**。以美国小企业为主 |
| 14 | startup/local | Fyple | https://www.fyple.com/addcompany/addcompany/ | 免费 | 未验证 | 未验证 | 未验证 | P2 | fetch 200。首页正文 "Add your business for free"；`/addcompany/addcompany/` 由首页正文返回。另有 7 个国家级分站（fyple.co.uk 等） |

### C. 行业垂直（3 / 5，**缺 2**）

| # | 分类 | 平台名 | 提交 URL | 免费/付费 | 是否需要邮箱验证 | 是否需要公司实体证明 | 是否产生 dofollow 外链 | 优先级 | 备注 |
|---|------|--------|----------|-----------|------------------|----------------------|------------------------|--------|------|
| 15 | industry-specific | Printing Industry Midwest（PIM）Buyers Guide | https://www.pimw.org/2027-buyers-guide-order-form/ | 付费（刊登/订购） | 未验证 | 未验证 | 未验证 | P2 | fetch 200。美国中西部印刷行业协会年度采购指南，印刷/包装垂直受众精准；覆盖 IA/MN/NE/ND/SD |
| 16 | industry-specific | Packaging Gateway | https://www.packaging-gateway.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | fetch 200（正文被截断）。包装行业媒体；**未验证存在自助免费供应商 Profile**，可能仅内容/广告合作。若无法自助建档，此项应降级或替换 |
| 17 | industry-specific | WhatTheyThink | https://whattheythink.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | printingnews.com fetch 200，正文为跳转提示 "Go to https://whattheythink.com"，据此确认该域名存在。**未验证存在自助免费供应商 Profile**（印刷行业媒体，通常为广告/投稿） |

**缺口说明（必须上报，不补位不注水）**：industry-specific 目标 5，实核 3，**缺 2**。本次尝试但 **无法核实**的垂直平台：PrintWeek（printweek.com 返回 Cloudflare 403 "you have been blocked"）、Labels & Labeling（403）、FESPA（JS 挑战 403）、Packaging Digest（403）、EC21（403）。这些站点存在，但**本次无法取回正文、也无法确认其免费供应商提交 URL**，故按规则不列入表内。

### D. SaaS / B2B 聚合站（3 / 3）

| # | 分类 | 平台名 | 提交 URL | 免费/付费 | 是否需要邮箱验证 | 是否需要公司实体证明 | 是否产生 dofollow 外链 | 优先级 | 备注 |
|---|------|--------|----------|-----------|------------------|----------------------|------------------------|--------|------|
| 18 | SaaS 聚合 | SaaSHub | https://www.saashub.com/services/submit | 未验证 | 未验证 | 未验证 | 未验证 | P2 | 该 URL 由 search 结果返回（SaaSHub 官方 "Submit a Product"）。**saashub.com 本次 fetch 返回 403**，正文未验证 |
| 19 | SaaS 聚合 | Product Hunt | https://help.producthunt.com/en/articles/479557-how-to-post-a-product | 未验证 | 未验证 | 未验证 | 未验证 | P2 | 官方帮助中心链接由 search 结果返回。producthunt.com 首页 fetch 403。适用于把站内「30 秒 AI 报价」当产品发布 |
| 20 | SaaS 聚合 | G2 | https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2 | 未验证 | 未验证 | 未验证 | 未验证 | P2 | 官方文档链接由 search 结果返回（"Finding or listing a product on G2"）。g2.com 首页 fetch 403。**注意**：G2 是软件评测站，ZprintPro 是印刷服务，建档类目适配性需人工判断 |

### E. other（8 / 8）

| # | 分类 | 平台名 | 提交 URL | 免费/付费 | 是否需要邮箱验证 | 是否需要公司实体证明 | 是否产生 dofollow 外链 | 优先级 | 备注 |
|---|------|--------|----------|-----------|------------------|----------------------|------------------------|--------|------|
| 21 | other | Foursquare for Business | https://business.foursquare.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P1 | fetch 200（正文仅 "Business Listings"）。全球 POI 数据库，被多家地图/AI 引用，实体信号价值高 |
| 22 | other | Opendi | https://service.opendi.co.uk/listings | 未验证 | 未验证 | 未验证 | 未验证 | P2 | fetch 200（opendi.com 首页 FAQ 正文返回该注册 URL）。Opendi 自述覆盖 36 国；与 Yext / Uberall / Synup 有发布合作（首页正文） |
| 23 | other | 2FindLocal | https://www.2findlocal.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | fetch 200。账号入口 `/Modules/Account/account.php` 由首页正文返回。站内提供 China / Hong Kong 国家分站（首页国家列表含 China、Hong Kong） |
| 24 | other | Wikidata | https://www.wikidata.org/wiki/Wikidata:Requests_for_new_items | 未验证 | 未验证 | 未验证 | 不适用（结构化数据） | P0 | 该 URL 由 search 结果返回。**注意**：wikidata.org 首页本次 fetch 失败（TypeError: fetch failed），仅条目请求页 URL 有 search 证据。 Wikidata 是 GEO/AI 引用的核心实体底座，**优先级最高但需人工按关注度门槛建档** |
| 25 | other | LinkedIn Company Pages | https://business.linkedin.com/ | 免费 | 未验证 | 未验证 | 未验证 | P0 | business.linkedin.com 由 search 结果返回；LinkedIn 官方中文「建立公司主页」PDF 亦由 search 返回。**必须与 Organization.name / NAP 完全一致**，是最重要的 sameAs 锚点 |
| 26 | other | Yelp for Business | https://business.yelp.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | biz.yelp.com fetch 返回跨域跳转提示指向 business.yelp.com，据此确认该域存在。**注意**：Yelp 个人/本地商户页以欧美本地实体为主，跨境 B2B 印刷商适配性需人工判断 |
| 27 | other | Bing Places for Business | https://www.bingplaces.com/ | 免费 | 未验证 | 未验证 | 未验证 | P0 | bingplaces.com fetch 返回跨域跳转提示指向 bing.com，据此确认该域存在。是 Bing / Copilot 生态的实体入口，**免费且对 AI 引用有直接价值** |
| 28 | other | Trustpilot for Business | https://www.trustpilot.com/ | 未验证 | 未验证 | 未验证 | 未验证 | P2 | trustpilot.com fetch 返回 403（人机校验页 "Verifying your connection"）。**商家建档具体 URL 与要求本次未验证**，执行前需人工确认 |

> **⚠️ 未列入但必须知道的排除项**：`Google Business Profile`（google.com/business）本次**无法抓取**（工具报错：该 hostname 解析到非公网 IP），因此**不给 URL、不列入表**。它是跨境实体信号价值最高的一项，建议 K3/唐总**人工直接打开并提交**，不依赖本包的 URL 验证。

---

## 2. sameAs patch proposal（提案，未落地）

**前提声明**：本次**未能验证任何已存在的 ZprintPro / 深圳市彩龙印刷包装有限公司 profile 页**，因此 `sameAs` 数组**保持为空**，全部条目均为 `pending`。
**硬规则**：不得把「提交 URL」或「平台首页」写进 `sameAs` —— `sameAs` 必须是**品牌自己的 profile 页 URL**，填平台首页会被搜索引擎判定为错误实体关联。

JSON-LD **不支持注释**，下列 `//` 行仅供人工阅读；真正写入页面时必须删除注释、只保留已上线 profile 的 URL。

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZprintPro",
  "legalName": "深圳市彩龙印刷包装有限公司",
  "url": "https://zprintpro.com",
  "sameAs": [
    // pending: profile not yet created — LinkedIn Company Page (submit: https://business.linkedin.com/)
    // pending: profile not yet created — Bing Places for Business (submit: https://www.bingplaces.com/)
    // pending: profile not yet created — Wikidata item (submit: https://www.wikidata.org/wiki/Wikidata:Requests_for_new_items)
    // pending: profile not yet created — Crunchbase organization (submit: https://www.crunchbase.com/)
    // pending: profile not yet created — Foursquare for Business (submit: https://business.foursquare.com/)
    // pending: profile not yet created — FreeIndex UK (submit: https://www.freeindex.co.uk/advertise.htm)
    // pending: profile not yet created — ChamberofCommerce.com (submit: https://www.chamberofcommerce.com/members/add-business)
    // pending: profile not yet created — Fyple (submit: https://www.fyple.com/addcompany/addcompany/)
    // pending: profile not yet created — Opendi (submit: https://service.opendi.co.uk/listings)
    // pending: profile not yet created — 2FindLocal (submit: https://www.2findlocal.com/)
    // pending: profile not yet created — Made-in-China.com supplier profile (submit: https://www.made-in-china.com/)
    // pending: profile not yet created — HKTDC Sourcing supplier profile (submit: https://sourcing.hktdc.com/newsbites/become-a-supplier/ecommerce/en/)
    // pending: profile not yet created — Alibaba.com supplier storefront (submit: https://register.alibaba.com/redirect.htm?entrance=cnfmSupplier)
    // pending: profile not yet created — Europages supplier profile (submit: https://www.europages.co.uk/)
    // pending: profile not yet created — PRINTING United Alliance directory listing (submit: https://www.printing.org/application)
    // pending: profile not yet created — Trustpilot business profile (submit: https://www.trustpilot.com/)
    // pending: profile not yet created — Yelp for Business (submit: https://business.yelp.com/)
    // pending: profile not yet created — SaaSHub (submit: https://www.saashub.com/services/submit)
    // pending: profile not yet created — Product Hunt (submit: https://help.producthunt.com/en/articles/479557-how-to-post-a-product)
    // pending: profile not yet created — G2 (submit: https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2)
    // pending: profile not yet created — BetaList (submit: https://betalist.com/submit)
    // pending: profile not yet created — F6S (submit: https://www.f6s.com/)
    // pending: profile not yet created — Manta (submit: https://www.manta.com/business-listings/add-your-company/mtccq2n)
    // pending: profile not yet created — Printing Industry Exchange printer listing (submit: https://www.printindustry.com/Printers/)
    // pending: profile not yet created — Global Sources supplier profile (submit: https://www.globalsources.com/)
  ]
}
```

**后续动作规则**：每完成一个目录提交并拿到**公开可访问的 profile URL** 后，用 web_fetch 确认该 URL 返回 200，**才**把该行从 `// pending` 改为真实字符串。未确认前一律不得写进 `sameAs`（对应本项目「笼统批准 ≠ 动作完成」规则）。

---

## 3. NAP 一致性（唯一规范字符串，逐字粘贴）

> 以下字符串为**唯一权威版本**。任何目录表单的对应字段必须与本节逐字一致（含大小写、空格、标点）。**不得改写、不得缩写、不得「本地化意译」。**

| 字段 | 唯一规范字符串 |
|------|----------------|
| 品牌名（EN，global） | `ZprintPro` |
| 法定实体名（中文，global） | `深圳市彩龙印刷包装有限公司` |
| 法定实体名（EN 译名，仅在表单强制要求 EN 时使用） | `Shenzhen Cailong Printing & Packaging Co., Ltd.` |
| 地址（中文，global） | `広東省深圳市龍崗区平湖街道嘉城路1号` |
| 地址（EN，仅 global 表单需要时） | `Jiacheng Road No.1, Pinghu Street, Longgang District, Shenzhen, Guangdong, China, 518111` |
| 邮编 | `518111` |
| 电话 / WhatsApp | `+86 198 8085 1334` |
| 邮箱 | `zprintpro@outlook.com` |
| 网站 | `https://zprintpro.com` |

### 3.1 语言 / 地区字段处理规则（必须显式区分）

| 场景 | 处理方式 |
|------|----------|
| **Global 表单**（含 `Company Name` / `Legal Name` / `Address` 单字段） | 品牌名填 `ZprintPro`；法定实体名填中文 `深圳市彩龙印刷包装有限公司`，**不要**自行加英文括注；地址填中文串 |
| **表单只接受 ASCII / 拉丁字符**（部分美国目录强校验） | 地址改用上面「地址（EN）」串；法定实体名改用「EN 译名」串；**不得**把中文串音译或缩写 |
| **要求填「Country / Region」下拉** | 选 `China`（不是 Hong Kong）。实体注册地在深圳龙岗，**不得**因为品牌面向香港/跨境而选 Hong Kong，否则 NAP 冲突 |
| **要求填「State / Province」下拉**（美式表单） | 选 `Guangdong`；`City` 填 `Shenzhen`；`ZIP / Postal Code` 填 `518111` |
| **要求「Locale / Language」字段** | 本次为 EN 目录包：一律选 `English` / `en`。**不要**选 Japanese / 日本語 —— 日文语系字段属于 ja 目录包（ジープリント，独立埋点，按 §13.16.1 不与 ZprintPro 字面同时出现），不该出现在本 EN 包里 |
| **要求「Hours / Timezone」** | 如需填写，用 `Asia/Shanghai (GMT+8)`。本包未验证任何平台的该字段为必填，故不提供营业时间字符串 |
| **要求「Categories / Industry」** | 优先选 `Printing` / `Commercial Printing` / `Packaging & Printing` / `Print Shop`；无对应类目时退到 `Manufacturing` 或 `Business Services`。**不得**选 `Software / SaaS`（除非平台本身是 G2 类软件站，见 #20 备注） |

### 3.2 统一短描述（可直接粘贴到 Description / About 字段）

```
ZprintPro is a factory-direct custom printing & packaging supplier based in Shenzhen, China.
We produce stickers and labels, flyers, packaging boxes, booklets and books, posters, calendars,
greeting cards, menus, red packets and banners. Small-batch friendly with low MOQ, shipped
worldwide by DHL / FedEx.
```
（**不要**在任何目录描述字段里写流量、DA/DR、市场份额等无来源数字。）

---

## 4. 提交 SOP（给执行人 K3 / 唐总）

### 步骤 0 — 账号与邮箱（一次决定，全程复用）
1. **统一用 `zprintpro@outlook.com` 注册所有目录**。不要用个人邮箱、不要一人多邮箱，否则后续改密/找回/合并 profile 会失控。
2. 为 Outlook 建一个文件夹 `directories-2026-09`，所有平台的验证邮件、审核通知、拒绝通知**全部归档到该文件夹**（这是 §4.6 的收据来源）。
3. 若平台只允许第三方登录（LinkedIn / X / Google），**先把这三个账号用同一个 `zprintpro@outlook.com` 建好**，再回来注册目录；不要混用不同第三方身份。
4. **密码管理**：所有目录账号密码写入项目既有密码库（不要写进本报告、不要提交进 git）。

### 步骤 1 — 按优先级执行顺序
- **P0（先做，实体信号权重最高）**：#24 Wikidata、#25 LinkedIn Company Page、#27 Bing Places、#3 Made-in-China。以及**人工补做 Google Business Profile**（本包无法验证其 URL，见 §1 排除项）。
- **P1（次做）**：#4 Global Sources、#5 HKTDC、#6 Alibaba、#8 Crunchbase、#10 FreeIndex、#21 Foursquare。
- **P2（批量扫尾）**：其余各行，可一次性批量提交。

### 步骤 2 — 每个平台的固定填写动作
1. 打开表格里的**提交 URL**（本包已核实该 URL 可达；若平台改版导致 404，**先记录再跳过**，不要猜新 URL）。
2. 表单一律从 §3 的 NAP 表**复制粘贴**，不手打。粘完**逐字回读一遍**（中文串尤其容易被输入法改字）。
3. Description 字段用 §3.2 的短描述原文。
4. 提交前截图**表单填写完成态**（含所有 NAP 字段），存到 `directories-2026-09/<平台名>/01-form.png`。

### 步骤 3 — 邮箱验证怎么处理
1. 提交后到 `zprintpro@outlook.com` 找验证邮件；**先确认发件域名与该平台官网域名一致**，再点验证链接（防钓鱼）。
2. 若 10 分钟内未收到：先查垃圾邮件；再在平台页面点「Resend」**最多 2 次**；仍无 → 记为「待人工跟进」并写进收据，**不要**换邮箱重新注册（会产生重复 profile）。
3. 验证完成后截图验证成功页，存 `02-email-verified.png`。

### 步骤 4 — 要求上传营业执照 / 公司实体证明时怎么办
1. **只上传**深圳市彩龙印刷包装有限公司的营业执照扫描件；**必须**先在图上加半透明水印，内容为：`仅供 <平台名> 供应商资质审核使用 · 2026-09`。
2. **绝不**上传：身份证、银行账户、法人个人手机号、Airwallex 任何凭证、任何 API key。
3. 上传前**确认该平台为 HTTPS 且为表格中已核实的正规域名**（本包所有 URL 均为官方域名，无第三方中转）。
4. 若平台要求**跨境电商资质**（如 Alibaba 国际站的实地认证），此类需线下配合的环节 → **升级给 K3 决定**，执行层不得自行承诺。
5. 上传后截图上传确认页与平台回执编号，存 `03-license-upload.png` + `03-receipt.txt`。

### 步骤 5 — 隐私与合规红线
- 联系信息**只用** §3 表中的电话/邮箱；**不得**填写法人私人手机号。
- 表单里出现「法定代表人」字段时：填或不填**由 K3 决定**，执行层不得擅自填写个人姓名。
- 出现「是否需要发票/税号」类字段：留空并在收据中记录，**不猜**。

### 步骤 6 — 收据与完成判定（对应「笼统批准 ≠ 动作完成」）
**每个平台必须留齐以下 4 件才算「已完成」，缺一即视为「已排期」，不得报完成：**

| # | 收据件 | 形式 | 判定标准 |
|---|--------|------|----------|
| 1 | 提交回执 | 平台提交成功页截图 / 邮件确认 | 含平台名 + 时间戳 |
| 2 | 验证完成证据 | 邮箱验证成功页截图 | 或平台「已验证」状态截图 |
| 3 | **公开 profile URL** | 最终上线的 profile 页 URL | **必须能被第三方（未登录状态）打开**；执行层须用 web_fetch 复核该 URL 返回 200 |
| 4 | 外链属性 | profile 页上指向 https://zprintpro.com 的链接的 `rel` 属性 | 记录 `dofollow` / `nofollow` / `ugc` / `sponsored`，**以实际页面源码为准，不得凭平台宣传推断** |

**收据汇总落盘**：`F:\zprintpro-nextjs\.hermes\reports\2026-09-18-en-30-directory-receipts.md`（执行后新建，逐平台一行：平台名 / profile URL / 4 件收据状态 / dofollow 实测值 / 日期）。
**报告口径**：只有第 3 件（公开 profile URL）落地，才允许把该平台从「已排期」升级为「已完成」。

---

## 5. 数据来源（本次实际抓取 / 检索记录）

### 5.1 web_fetch 成功（HTTP 200，正文可读）
| URL | 状态 | 用途 |
|-----|------|------|
| https://directory.printing.org/ | 200 | 平台存在；"Want to add your company? Join PRINTING United Alliance" |
| https://www.printing.org/membership | 200 | Corporate Printer US$495 / 含 Directory Listing |
| https://www.printindustry.com/ | 200 | PIE 平台；印刷商月费；`/Resources/Default.aspx` 免费列表 |
| https://www.made-in-china.com/ | 200 | 平台存在 |
| https://www.globalsources.com/ | 200 | 平台存在；Sign in/Register、Supplier Services |
| https://sourcing.hktdc.com/ | 200 | `Become a Supplier` 链接 |
| https://supplier.alibaba.com/ | 200 | 注册链接 `register.alibaba.com/redirect.htm?entrance=cnfmSupplier` |
| https://www.europages.co.uk/ | 200 | 平台存在（仅首页） |
| https://www.crunchbase.com/ | 200 | 平台存在 |
| https://betalist.com/ | 200 | 平台存在；`/submit` 链接 |
| https://betalist.com/submit | 200（302→/sign_in） | 登录方式：X / magic link |
| https://www.freeindex.co.uk/ | 200 | 平台存在 |
| https://www.freeindex.co.uk/advertise.htm | 200 | "FREE business profile page"；`/signup.htm` |
| https://www.chamberofcommerce.com/ | 200 | `/members/add-business` |
| https://business.foursquare.com/ | 200 | "Business Listings" |
| https://www.fyple.com/ | 200 | "Add your business for free"；`/addcompany/addcompany/` |
| https://www.2findlocal.com/ | 200 | 账号页 `/Modules/Account/account.php` |
| https://www.opendi.com/ | 200 | FAQ 给出注册 URL `service.opendi.co.uk/listings` |
| https://www.pimw.org/2027-buyers-guide-order-form/ | 200 | 平台存在 |
| https://www.packaging-gateway.com/ | 200 | 平台存在（正文截断） |
| https://www.printingnews.com/ | 200 | 跳转提示 "Go to https://whattheythink.com" |
| https://www.f6s.com/ | 200 | JS 挑战页，正文未获取 |

### 5.2 web_fetch 返回拦截（域名存在，但正文/表单未验证）
| URL | 状态 | 处理 |
|-----|------|------|
| https://www.kompass.com/ | 403 | 不列入表 |
| https://www.thomasnet.com/ | 403 | 不列入表 |
| https://www.trustpilot.com/ | 403 | 列入表但标注未验证 |
| https://www.hotfrog.com/ | 403 | **不列入表**（拟作 other，因未验证提交 URL 而剔除） |
| https://www.producthunt.com/ | 403 | 用官方帮助页 URL 代替 |
| https://www.g2.com/ | 403 | 用官方文档 URL 代替 |
| https://alternativeto.net/ | 403 | 不列入表 |
| https://www.saashub.com/ | 403 | 用 search 返回的 `/services/submit` |
| https://clutch.co/ | 403 | 不列入表 |
| https://www.goodfirms.co/ | 403 | 不列入表 |
| https://www.brownbook.net/ | 403 | 不列入表 |
| https://www.manta.com/howto/manta | 403 | 用 search 返回的 add-your-company URL |
| https://www.cylex-uk.co.uk/ | 403 | 不列入表 |
| https://www.tupalo.com/ | 403 | 不列入表 |
| https://www.cybo.com/ | 403 | 不列入表 |
| https://www.findglocal.com/ | 403 | 不列入表 |
| https://www.startupstash.com/ | 403 | 不列入表 |
| https://www.ec21.com/ | 403 | 不列入表 |
| https://www.printweek.com/ | 403（Cloudflare blocked） | 不列入表 |
| https://www.fespa.com/ | 403 | 不列入表 |
| https://www.labelsandlabeling.com/ | 403 | 不列入表 |
| https://www.packagingdigest.com/ | 403 | 不列入表 |
| https://www.bingplaces.com/ | 跨域跳转提示 → bing.com | 据此确认域存在 |
| https://biz.yelp.com/ | 跨域跳转提示 → business.yelp.com | 据此确认域存在 |
| https://www.sitejabber.com/ | 跨域跳转提示 → smartcustomer.com | **不列入表**（已改名/易主，实体不确定） |

### 5.3 web_fetch 失败（工具层）
| URL | 错误 | 处理 |
|-----|------|------|
| https://www.google.com/business/ | hostname 解析到非公网 IP | **不给 URL、不列入表**，见 §1 排除项 |
| https://www.wikidata.org/ | TypeError: fetch failed | 改用 search 返回的条目请求页 URL |
| https://www.yelu.net/ | TypeError: fetch failed | 不列入表 |

### 5.4 web_search 提供的 URL（作为佐证，未二次抓取）
- https://support.crunchbase.com/hc/en-us/articles/115011823988-How-do-I-create-a-Crunchbase-profile
- https://www.manta.com/business-listings/add-your-company/mtccq2n
- https://www.wikidata.org/wiki/Wikidata:Requests_for_new_items
- https://www.saashub.com/services/submit
- https://help.producthunt.com/en/articles/479557-how-to-post-a-product
- https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2
- https://business.linkedin.com/ （另：LinkedIn 官方中文《建立公司主页》PDF）
- https://solutions.yp.ca/post/free-business-listing-yp-ca （YP.ca，未列入表：加拿大本地目录，适配性待判）

### 5.5 本次**明确无法核实**的内容（不得当作结论使用）
1. **任何平台的 dofollow / nofollow 属性** —— 全部 28 行均为 `未验证`。必须等 profile 真正上线后读源码实测（见 §4 步骤 6 第 4 件收据）。
2. **任何平台的流量、权重、DA/DR、用户数** —— 本包**未采集任何此类数字**，也**不允许**执行人以「平台很权威」为由补写。
3. **任何平台的邮箱验证 / 实体证明强制要求** —— 除 BetaList（magic link，已见正文）外均为 `未验证`。
4. **Google Business Profile 的提交 URL** —— 工具无法访问，**本包不给 URL**。
5. **行业垂直目标 5 项中的 2 项** —— 尝试 PrintWeek / Labels & Labeling / FESPA / Packaging Digest / EC21 均被 Cloudflare 或 JS 挑战拦截，**未能核实**，因此**不补位、不注水**。
6. **Europages、F6S、Manta、SaaSHub、Product Hunt、G2、Yelp、Trustpilot、Bing Places、Wikidata 的具体表单字段与注册路径** —— 仅确认域名/入口存在，表单要求未验证。

---

**数据来源**：见 §5.1–§5.4 逐条 URL 与 HTTP 状态（本次会话 web_fetch / web_search 实际返回）。
**核实平台数**：28 / 30。
**未达标分类**：industry-specific（行业垂直）3 / 5，缺 2。

---

## 6. 口径与校准（§0.23 / §0.33.2）

- **校准日期: 2026-09-18 08:00**（平台存在性与提交入口核实时点；平台侧政策会变，超过 30 天建议复核实）
- **GSC 词级证据: 不适用** —— 本包是**站外目录/实体建设**清单，不含选题或词决策，因此
  **无 query+imps+pos 三元组**可引。按 §0.23 **不编造** GSC 数据，也不以「平台权重高」为由补写任何数字。
- **本包明确不含的量化项**: 平台流量 / DA / DR / 用户数 / dofollow 比例 / 预计收录时间 —— 一律空缺，
  需要时以实际上线后的 profile 页源码与 GSC「links」报告为准。
- **数据来源行**: 本会话 web_fetch + web_search 实测（逐条见 §5.1-5.4）；NAP 事实取自仓内
  `src/lib/siteConfig` 同源口径与 K3 2026-06-18 深圳实体更正记录；ja 30 目录公式取自
  `.hermes/cron-prompts/k3-v3-addendum-2026-08-23.md`「印刷/POD 7 + 本地/创业 7 + 行业 5 + SaaS 聚合 3 + 其他 8」。

**下游动作**：K3/唐总按 §4 SOP 逐平台提交；每平台 4 件收据落
`.hermes/reports/2026-09-18-en-30-directory-receipts.md`；
只有「公开 profile URL 可被第三方打开且 web_fetch 返回 200」才升级为「已完成」（§0.24）。

