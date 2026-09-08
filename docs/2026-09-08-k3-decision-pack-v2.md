# K3 拍板包 v2（2026-09-08 · 每项含拍板对象/证据/选项/后果）

> v1 反馈（唐总 9/8 07:56）：①要手动提交的 blog 链接没给清单 ②拍板项没有具体内容无法拍板。本版逐项重写：**拍什么、证据原文、选项 A/B/C、不拍的后果**。

## 0. 9/10 GSC 校准：需手动提交的 blog URL 清单（9 篇 zh-hk + 三语扩展）

**操作**：GSC → 网址检查 → 逐条粘贴 URL → 看抓取状态；未收录的点「请求编入索引」。en/ja 版本 = 同 slug 换前缀（/en/blog/…、/ja/blog/…）。

| # | zh-hk URL（slug） | 篇目 | en/ja 是否同步提交 |
|---|---|---|---|
| 1 | `https://zprintpro.com/zh-hk/blog/sticker-material-pvc-vinyl-removable/` | 防水贴纸材质完全指南 | ✅ 同提交 |
| 2 | `https://zprintpro.com/zh-hk/blog/foil-stamping-3-applications-2026/` | 烫金印刷 3 大应用攻略 | ✅ 同提交 |
| 3 | `https://zprintpro.com/zh-hk/blog/instant-printing-30s-ai-quote-flow/` | 即日印刷 30 秒 AI 报价流程 | ✅ 同提交 |
| 4 | `https://zprintpro.com/zh-hk/blog/kraft-paper-box-types-comparison-2026/` | kraft 纸盒 8 盒型对比 | ✅ 同提交 |
| 5 | `https://zprintpro.com/zh-hk/blog/hong-kong-printing-cost-baseline-2026/` | 香港印刷成本基准报告 2026 | ✅ 同提交 |
| 6 | `https://zprintpro.com/zh-hk/blog/print-specifications-reference-guide-2026/` | 印刷规格完全指南 2026 | ✅ 同提交 |
| 7 | `https://zprintpro.com/zh-hk/blog/campus-education-printing-pillar-guide/` | 校园教育 Pillar | ✅ 同提交（en 版是速赢词页） |
| 8 | `https://zprintpro.com/zh-hk/blog/restaurant-menu-printing-guide/` | 餐牌印刷攻略（12 铁律重写） | ✅ 同提交 |
| 9 | `https://zprintpro.com/zh-hk/blog/large-envelope-printing-c4-c5/` | 大信封 C4/C5 指南 | ✅ 同提交 |

出处：slug 实测 src/data/blog-posts.ts；URL 结构核对 public/sitemap-{zh-hk,en,ja}.xml（三语各 231 URL，blog 各 101）。共 27 条（9 slug × 3 locale），9/10 一次过完约 40 分钟。

## 1. GA4 G-XXXX —— 只要一个字符串，不管金额

**拍什么**：GA4 衡量 ID（格式 G-XXXXXXXXXX）。
**在哪拿**：Google Analytics 后台 → 左下齿轮「管理」→「数据流」→ 点网站数据流 → 右上「衡量 ID」。
**唐总已明确**：不统计具体金额，只要底盘量（询盘数 ≥5% 这类粗口径即可）——GA4 埋好后自动记 whatsapp_click / quote_submit 两个事件计数，金额不需要。
**不拍的后果**：9/16 M1 验收的询盘层只能标「数据缺口」降级验收；询盘黑盒继续。

## 2. push 放行 —— 两个 commit 具体内容明细

| commit | 改了什么 | 规模 | 风险 |
|--------|----------|------|------|
| 63af89ab | `src/data/product-faqs.ts`：信封品类 4 问 + 月曆品类 4 问（各 ×3 语言），替换通用兜底 FAQ | +115 行（纯 FAQ 数据，无 title/营销文案改动） | ≈0：已有备份，`git revert 63af89ab` 可撤 |
| 63af89ab | 4 份 docs（总计划/变更集/看板模板/风险登记册） | +277 行 | 0（纯文档） |
| 95253a01 | 5 份 docs（词图 v4.2/竞品 R1/FAQ 普查/探针包/五视角复核） | +614 行 | 0（纯文档） |

**线上效果**：push → CF Pages 自动部署（5-20 分钟）→ 30 个产品页（信封 4 SKU + 月曆 6 SKU × 三语）的 FAQ 区块从 6 条通用问答换成 8 条带真实价格的品类问答；Google 富摘要多 8 组可抽取问答。
**选项**：A) 现在就 push B) 你先自己看一眼 product-faqs.ts 再说 C) 攒到下批一起。
**不拍的后果**：改动只在本地，线上页面保持旧 FAQ；9/10 校准的「FAQ schema 收录」没东西可校。

## 3. campus 校园 Pillar 投放 —— 三选一（campus 简报原文）

- **go**：9/8-9/14 启动 launch cron + 8/9 校园博客三语推广（en 速赢词 school exercise book printing 已在 pos 7.29 优先摘 → ja 教科書簇 343 imps 承接 → hk 學校印刷 pos 36.5 攻坚）
- **缓**：先归档校园询盘数据，9/16 M1 验收时一并复核再拍
- **no-go**：D-9/2-24 闭项，Pillar 页保留不撤
**不拍的后果**：9/14 开学季窗口自然流失，ja 343 imps 继续无内容承接。

## 4. PK-003 食品包裝价格口径 —— 三个数字打架，选一个

**证据原文**（全部实取）：
- 报价引擎 basePrice：**2.5**（products.ts L3194）
- price_range 字段：**HK$2.5-18/個**，MOQ 100
- 页面 title：**「食品包裝訂製 100個起印 HK$4起/個 FDA級」**（sku-seo-data.ts L1305）

**选项**：
- A) title 改 HK$2.5 起 —— 与报价引擎一致，价格锚最强（Vistaprint「starting at $10」同构）；2.5 有 price_range 背书，非编造
- B) title 保持 HK$4 起，basePrice 改 4 —— 放弃 2.5 低价展示，口径统一
- C) title 改区间式「HK$2.5-18/個」
**不拍的后果**：报价比页面便宜但页面写贵价，客户比价后流失或询盘后觉得被骗。

## 5. 008 询盘台账 —— 已实读：0 条记录（不用等数据了）

**实读**：`data/inquiry-counter.json` updatedAt 2026-09-04，inquiries: []（空），src 无自动写入口 = **人工登记制**（SOP：.hermes/sop/008-inquiry-ledger.md）。空转原因不是链路断，是没人填。
**选项**（按唐总「只要底盘量」口径）：
- A) **以后每周唐总报一次毛估数**（本周 WhatsApp 询盘大概几单），我填进台账 → 北极星立即有数据
- B) 直接放弃 008，等 GA4 上线单源统计
- C) 维持现状（黑盒）
**不拍的后果**：询盘层持续无数据，M1-M12 的「月询盘 50+」目标无从对照。

## 6. 觀塘 MTR 交收点 —— 现行表述 3 处原文

- 产品页自取栏：「門市自取: 觀塘」（ProductTabs.tsx）
- 急件 FAQ：「可選港鐵站交收（免運費）或上門速遞」（RushDeliveryFAQ.tsx，含旺角/觀塘/尖沙咀）
- 通用 FAQ：「MTR 站交收（觀塘、旺角、銅鑼灣、尖沙咀等站點 — 香港服務點，非生產地）」（product-faqs.ts）
**拍什么**：①实际是否真支持觀塘站交收？②「非生產地」澄清语是否保留（防止客户误以为工厂在觀塘上门打货）？
**选项**：A) 维持现状 B) 三处统一加「香港服務點，非生產地」澄清 C) 删除觀塘点。
**不拍的后果**：低风险挂账，无紧迫性。

## 7-10. 常规四项（一句话版）

| # | 项 | 拍什么 | 后果 |
|---|-----|--------|------|
| 7 | GBP | 商家资料提交了没？回一句「已交/未交」 | 本地搜索信号空窗 |
| 8 | 门童冻结 | 解除与否（建议：解除新增，9/15 升硬拦前过 147 cases 复盘） | 内容发布流程卡/放 |
| 9 | en china 预算 | 15,000-26,000 元/月跨境内容线，9/30 前拍 | G3 跨境 B2B 线（7d ~52 imp）开不动 |
| 10 | SKU FAQ 落点 | 9/11 前定：A) product-faqs.ts 加 SKU 级映射（推荐，复用现有渲染链）B) 给 sku-seo-data.faqs 补渲染链 | top10 FAQ 填充批无处落 |

## 拍板格式建议

回复序号+选项即可，如「1: G-ABC12345 / 2: A / 3: go / 4: A / 5: A」——每项都设计成一句话可答。
