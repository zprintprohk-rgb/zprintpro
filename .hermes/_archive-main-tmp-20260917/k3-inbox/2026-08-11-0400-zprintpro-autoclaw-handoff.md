# ZprintPro (智印云) 项目交接文档 · Autoclaw 全面执行升级必读

> **签发**: Mavis (战略大脑) · 2026-08-11 04:00 Asia/Shanghai
> **K3 拍板**: 8/11 04:00 决定把 zprintpro 全面执行升级交给 autoclaw, Mavis 写交接文档
> **目标**: autoclaw 接棒 daily cron auto / 整合 push / 残留清理 / 9/10 季节性 SKU 全部执行
> **状态**: 文档就位, 8/11 daily cron 04:00 已过, next 8/11 10:15 触发
> **SSoT 源**: AGENTS.md (33785 chars) + MEMORY.md §0.1-0.20 (199.2KB) + .hermes/k3-inbox/ 全部决策 + .hermes/m3-task-cards/ 8/9 战略

---

## §0 TL;DR · autoclaw 30 秒速读

1. **项目**: F:\zprintpro-nextjs\ (Next.js 14 + 8 locale 印刷 SaaS, Cloudflare Pages)
2. **品牌一致性公式**: zh-hk=**智印港** / ja=**ジープリント** / en=**ZprintPro** (locale-aware, 全站统一)
3. **真实 NAP**: 深圳市彩龙印刷包装有限公司 / +86 198 8085 1334 / zprintpro@outlook.com / 広東省深圳市龍崗区平湖街道嘉城路1号 〒518111
4. **push 纪律**: 1 天 ≤5 push, CF 账户级 500/月 3 项目共享, zprintpro ~150/月
5. **amend 纪律**: 月上限 2 次, **8/10 已用满 1/2 (8/8 117f9fc + 8/10 8664488)**, 后续走 revert + 重做
6. **严禁**: 名片/咭片/business cards/名刺 (主营品类 §11 强制),「智印印港」错字, GBK 乱码
7. **验证真伪 5 步**: push 无 ahead / sitemap mtime / curl 200+body / schema / IndexNow (缺一即 PARTIAL 不报 PASS)

---

## §1 项目核心定位

### 1.1 一句话定位

> 香港印刷 SaaS, 为全球用户提供 30 秒 AI 报价 + 72 小时全球交付 (per AGENTS.md §1)。

### 1.2 5 个不可妥协 (per AGENTS.md §2)

1. **双品牌分层** (2026-07-21): zh-hk = 智印港 ZprintPro, en/ja = ZprintPro
2. **8 locale 全覆盖** (zh-hk / en / ja + 5 个其他), SEO hreflang 正确
3. **GSC 数据实时分析** (gsc_data.csv + seo-weekly-analyzer.py)
4. **airwallex 多币种**结算, CN 用 alipay, 其他用 USD (注: 2026-06-25 Airwallex 永久下线, 改 bank_transfer/wechat_qr/alipay_qr/paypal)
5. **本地开发 + Cloudflare Pages 部署** (Node.js runtime via @opennextjs/cloudflare)

### 1.3 主营品类 (5 大 P0, 1 个禁区)

**P0 主推** (5 大主营):
- 貼紙 / Stickers (zh-hk/en/ja)
- 宣傳單張 / Flyers
- 包裝盒 / Packaging Boxes
- 紙袋 / Paper Bags
- 標籤 / Labels

**P1 辅助**: 海報 / Books / 菜牌 / 利是封 / 月曆

**P2 长尾**: 噴繪 / 信封 / doujin (同人周邊)

**⛔ §11 强制禁区**: **名片 / 咭片 / business cards / 名刺**
- 任何页面、产品、SEO 标题、关键词、AI 训练文本中不得出现名片相关内容
- §0.20.4 seo.ts L343-361 business-cards 死数据 (Batch A 第 4 项清理) 已确认 0 线上 URL
- 错字「智印印港」禁用 (per AGENTS.md §8.1)

---

## §2 品牌一致性 P0 (locale-aware 公式)

### 2.1 brand 公式 (per §0.15 K3 8/8 07:12 拍板 + §13.16.1 K3 8/8 02:52 拍板)

| Locale | brand 词 | 实体 | 备注 |
|---|---|---|---|
| zh-hk | **智印港** | 深圳市彩龙印刷包装有限公司 (HK 实体) | §0.15 P0 自有品牌 |
| en | **ZprintPro** | 深圳市彩龙印刷包装有限公司 (Shenzhen 实体) | §13.13 铁律纯英文 |
| ja | **ジープリント** | 深圳市彩龙印刷包装有限公司 (Shenzhen 实体) | §13.16.1 音译 Z→J |

**重要**:
- 「智印雲」是旧 NAP 法律名 + 错字, K3 8/10 10:17 拍板**全部改为「智印港」**(zh-hk locale); en/ja locale 分别用各自 brand
- 全 locale og:site_name / WebSite schema / Organization schema / Article author/publisher 都 locale-aware (per 8/10 4 commits 改造)
- Footer / 简介 / 介绍中 智印雲 → 智印港 (zh-hk 兜底)

### 2.2 NAP 法律名保留 (per §13.10)

| 层 | 写法 | 例 |
|---|---|---|
| **NAP 层** (法务真实) | ✅ 写深圳 | footer address / contact page / legal disclosure / Schema Organization.address |
| **SEO 内容层** (用户体验) | ❌ 不写 supplier origin 城市 | blog 标题 / excerpt / hero / CTA / 列表卡片 / FAQ |

**真实 NAP 实体信息** (全 locale 一致):
- 公司全名: **深圳市彩龍印刷包裝有限公司** (zh-hk 用繁中, en/ja 用 深圳市彩龙印刷包装有限公司 简中)
- 地址: 広東省深圳市龍崗区平湖街道嘉城路1号 (〒518111)
- 电话: **+86 198 8085 1334** (2026-08-07 K3 拍板 phase-out 181 2638 0255)
- 邮箱: zprintpro@outlook.com
- 法人: 唐运提

### 2.3 3 Locale 鐵律 (per §13.13)

**zh-hk**: 香港本地场景词 (餐飲旺季 / 包裝盒 / 印刷旺季 / MTR / 順豐本地) - 不出现"深圳" 作主关键词前缀
**en**: 全球通用卖点 (size / paper / design / material / DHL 2-4 days / Asia factory) - 不硬塞"Shenzhen" / "in Hong Kong" / "China factory" 作标题前缀
**ja**: 日本市场卖点 + 不带"中国/深圳"前缀

---

## §3 12 段教训固化 (MEMORY.md §0.1-0.20, 全部 K3 拍板 P0 跨项目)

### 3.1 §0.1 攒批 (CF Pages build 配额约束)
- 每天 1 effective push (攒批, 节省 build 配额)
- 紧急修复例外 (§0.6)

### 3.2 §0.6 紧急修复例外
- P0 5xx / 404 阻断, 立即修 + 立即 push (不攒批)
- 例外仍算 1 push 配额

### 3.3 §0.7 关键漏斗 endpoint production smoke 3 步
- 任何改 /api/* endpoint 的 commit 必跑 3 步 (curl POST + DB 写入 + redirect)

### 3.4 §0.8 Self-Reminder 防抖 (TTL + 主动 self-delete)
- verify-deploy / watch-xxx 监控 cron 必加 3 个 hard-coded 出口:
  - (a) TTL 过期自删
  - (b) 报告落盘自删
  - (c) 静默阈值触达升级用户

### 3.5 §0.9 外链注册边界
- 论坛签名档 / 评论留链 / Web2.0 / PBN / 自动换链 全禁
- brand 词漂移 (站名 ≠ 社媒名 ≠ 目录名) 全禁

### 3.10 §0.10 KPI 校准硬约束
- 4-5 天窗口排名 ≤-15% / imps ≤+30% 触发警报
- schema 变更打 5 折 (变更后波动大, 不立即校准)

### 3.11 §0.11 资源分配原则
- P0 抓强 (4 天, 已有数据的强信号) > P1 实体建设 (2-6 周, NAP/sameAs) > P2 黑洞 (低 ROI)
- 任何 cron auto 任务分配按此优先级

### 3.12 §0.12 转化侧指标
- 8/12 起复盘必含: 询盘数 + 响应时长 + 转化率
- 不只看 SEO 指标, 看 funnel 下游

### 3.13 §0.13 K3 战略拍板 4 字 + ①②③ 模式
- 4 字 = 拍板节奏 (1 字 1 决策 1 推/不推)
- ①②③ = 决策可选方案 (P0/P1/P2)
- 任何战略级拍板 Mavis 用此格式回执

### 3.14 §0.14 CF Pages 配额校准 (2026-08-08 05:00 K3 拍板)
- CF 账户级 500/月 3 项目共享 (zprintpro / aitoptools / togthr)
- zprintpro ~150/月
- 1 天 ≤5 push
- 重要更新立即 push (不攒批过度)

### 3.15 §0.15 品牌一致性 P0 (2026-08-08 07:12 K3 拍板)
- locale-aware siteName 公式 (zh-hk=智印港 / ja=ジープリント / en=ZprintPro)
- 全站统一 (title/OG/H1/schema)
- 法律名 NAP 智印雲 → 智印港 (8/10 K3 10:17 升级撤销 §13.10 允许位)

### 3.16 §0.16 残留清理节奏 (2026-08-08 07:12 K3 拍板)
- 8/13/15/17 3 批 × ~170/天 清完
- 8/18 grep 验收 = 0 (8/21 复盘硬指标)
- batch 1: longDescription 200 处 8/13
- batch 2: description + faq 300 处 8/15
- batch 3: schema 340 处 8/17

### 3.17 §0.17 push 台账一口径 (2026-08-08 15:35 K3 拍板)
- 日/月配额以 **git push 次数** 计 (含 force-push)
- amend 止损月上限 **2 次** (8/10 已用 1/2)
- push 前必跑 **npm run build** (4703262 教训: TS 错误只该花在本地, 不该花在 CF 配额上)

### 3.18 §0.18 重定向上线 SOP (2026-08-08 15:35 K3 拍板)
- **4 步** (curl 验证目标 200 + 禁止兜底规则覆盖多 locale 活路径 + 禁止自指向规则 + m3u8 用 410 正确)
- CF Bulk Redirects 上线前必跑

### 3.19 §0.19 用户暂停信号规则 (2026-08-09 17:56 K3 痛骂教训)
- 触发词: 暂停 / pause / hold / stop / wait / "等指令" / AFK 5min × 12+ 次
- **强制动作**: 立即 `mavis cron delete <self>` + 不再 progress-tag + 不再 fetch/read
- 5 分钟一次 progress tag × 1.5h = 18 次空转, 等于把 token 倒进马桶

### 3.20 §0.20 4 条教训固化 (2026-08-10 13:34 K3 拍板, 明日 Batch A 写入 AGENTS.md)

**§0.20.1 layout.tsx + seo.ts 静态 metadata 是 §0.15 升级盲区**
- 任何品牌/schema 改动必须 grep `siteConfig.name` + `hardcoded 'ZprintPro'` 全树清零
- 教训: cefe895 commit 补漏

**§0.20.2 retrofit 必 3 件齐: blog-data JSON + blog-posts meta + sitemap/验证 JSON**
- 缺一即 PARTIAL 不报 PASS
- 教训: 8/9 baby-product 0d46a4c / 8/10 cmyk 8664488 都 3 件齐 PASS

**§0.20.3 GitHub Push Protection 止损路径**
- commit 前必 `git status --porcelain` 看清 A/M/D
- 触发 secret 扫描立即 `git reset --mixed HEAD~1` 重做, **不 amend**
- `.hermes/` 含 token 的历史报告永不入 commit
- 教训: 8/10 c04dbe9 → c48181b 事故

**§0.20.4 amend 月上限 1/2 已用满 (8/8 + 8/10)**
- 后续 2 次必走 revert + 重做路径
- 教训: 8/8 117f9fc (force-with-lease amend 替代 4703262) + 8/10 8664488 (fresh commit 替代 c04dbe9)

---

## §4 8 大红线 (autoclaw 必读 · 违反必升级 K3)

| # | 红线 | 违反后果 |
|---|---|---|
| 1 | **不出现名片/咭片/business cards/名刺** (§11) | §0.15 品牌一致性 P0 + §11 强制约束, 历史 seo.ts L343-361 死数据已清理 (Batch A) |
| 2 | **不写 supplier origin 城市** (§13.10 NAP 脱钩) | zh-hk 不写"深圳"作主关键词, en/ja 不硬塞"Shenzhen / Hong Kong / China factory" |
| 3 | **不破坏 NAP 法律名** (§13.10 仍保留层) | footer / terms / privacy / Schema Organization.address 写真实公司名+地址 (深圳市彩龙) |
| 4 | **不刷外链 / PBN / 论坛签名** (§0.9) | 平台外链建设走 directories (HK / Japan / Global) 不是 SEO spam |
| 5 | **不机械翻译 zh-hk 内容到 en/ja** (§13.13) | 3 locale 独立市场内容, 翻译必须本地化 (大小写 / 文化 / 卖点), 不直接机翻 |
| 6 | **不改 .env 真实 key** (per AGENTS.md §8.5) | 真实 secret 全部 .gitignore, 不入 commit |
| 7 | **不写 GBK 乱码** (per AGENTS.md §8.2) | 中文 / 日文 / 韩文必须 UTF-8 LF, PowerShell 5.1 默认 GBK 写文件会导致乱码 |
| 8 | **不让 /app/ 目录被提交** (per AGENTS.md §8.4) | /app/ 跟 /src/app/ 冲突 Cloudflare 构建 |

---

## §5 当前状态 (8/11 04:00 交接时)

### 5.1 已完成 deploy 链路 (8/10 1 day 4 commits)

| Commit | 内容 | CF run | 状态 |
|---|---|---|---|
| 8664488 | T1 cmyk-guide retrofit + T2 about 攒批 | 93335414345 | ✅ PASS |
| c48181b | brand-unify part 1: 49 files 514 处 智印雲 → 智印港 | 93338587205 | ✅ PASS |
| cefe895 | brand-unify part 2: layout.tsx 静态 metadata → generateMetadata | 93340279459 | ✅ PASS |
| 055d87e | brand-unify part 3: src/lib/seo.ts 9 处 ternary + getBrandName helper | 93342575697 | ✅ PASS |

### 5.2 8/10 push 配额最终

- **8/10 push**: 4/5 daily (T1 8664488 + c48181b + cefe895 + 055d87e)
- **月累计**: 12/150
- **amend 用量**: 1/2 月上限 (8/8 117f9fc + 8/10 8664488)
- **下次 amend 必走 revert + 重做** (per §0.20.4)

### 5.3 6 篇 partial retrofit 进度 5/6 (8/10 cmyk-guide 6/6 完成)

| 日期 | retrofit | 状态 | commit |
|---|---|---|---|
| 8/7 | apparel-shopping-bag-printing-guide | ✅ 100% v8_ready | 2e28154 |
| 8/8 | cross-border-ecommerce-shipping-box-guide | ✅ 100% v8_ready | 46809c3 |
| 8/9 | baby-product-label-sticker-printing-guide | ✅ 100% v8_ready | 0d46a4c |
| **8/10** | **cmyk-guide** | ✅ **100% v8_ready (本批)** | **8664488** |
| 8/11 | paper-materials (next 必跑, daily cron 10:15) | ⏳ autoclaw 必跑 | (待) |
| 8/12 | same-day-flyers + 8/12 复盘日 0 push | ⏳ autoclaw 必跑 | (待) |

### 5.4 working tree 状态 (8/10 13:34 之后)

- M .hermes/cron-prompts/zprintpro-daily-content-1x7w.md (v9.1, 68.0 KB, 未 commit)
- M src/app/[locale]/about/page.tsx (工厂图 placeholder 隐藏, 8/8 14:43 K3 拍板, 未 commit)
- M public/sitemap-*.xml (build 自动 lastmod, 6 files, 未 commit)
- 200+ A 临时文件 (8/10 K3 上报 GH013 风险, autoclaw 必跑 T4 unstage 清理, per §0.20.3)

### 5.5 m3-task-cards 自主抓取架构 (per K3 8/9 18:23 拍板)

- Mavis 写 m3-task-cards/<日期>-<战略>-<主题>.md
- M3 (mini max m3 code 执行体, 跟 Mavis 同源) 抓取 m3-task-cards/ 目录执行
- 减少 K3 中间环节
- 触发: daily cron auto 10:15 + 每周一 11:00 + 每月 1 号 14:00 + 每周三 15:00 (GSC)
- T10 指针卡已落 m3-task-cards/2026-08-10-t10-seasonal-sku-pointer.md, M3 cron 扫到即止

---

## §6 8/11-9/10 排期 (autoclaw 必跑日历)

### 6.1 本周 (8/11-8/17) — §0.16 残留清理 + 整合 push Batch A

| 日期 | 任务 | 优先级 | 状态 |
|---|---|---|---|
| **8/11 04:00** | **Mavis 交接文档落盘** (本文件) | P0 | ✅ 完成 (autoclaw 必读) |
| **8/11 10:15** | **daily cron auto 触发 paper-materials retrofit** + **Batch A 6 项攒批合入 1 push** | P0 | ⏳ autoclaw 必跑 |
| 8/11 14:00 | daily content evolution cron 二次跑 (防 daily cron 失败补救) | P1 | ⏳ |
| 8/12 03:00 | same-day-flyers retrofit 提前 (per §0.10 4-5 天窗口排名狙击) | P0 | ⏳ |
| **8/12 复盘日 0 push** | 跑 review-8-12-template.md + 7 项 PASS/FAIL + §9 路径推荐 | P0 | ⏳ autoclaw 必跑 (per §0.10 + §0.12) |
| **8/13 batch 1** | longDescription 200 处清理 (5 alt 文本"智印雲 ZprintPro · 智印港"必清) | P0 | ⏳ autoclaw 必跑 (per §0.16) |
| 8/15 batch 2 | description + faq 300 处 | P0 | ⏳ |
| 8/17 batch 3 | schema 340 处 | P0 | ⏳ |
| **8/18 grep 验收** | 全站 = 0 智印雲 残留 (除 k3-inbox 历史引用) | P0 | ⏳ (8/21 复盘硬指标) |

### 6.2 8/19-8/21 双周复盘

- 8/19 准备复盘材料
- 8/20 复盘日 0 push (per §0.10 校准 + §0.12 转化 + §0.15/0.16 2 段, 75% 达成概率维持)
- 8/21 复盘报告落 k3-inbox + 7 项 PASS/FAIL + §9 路径推荐

### 6.3 8/22 月末复盘

- 8/22 0 push
- 月累计 push 统计 (per §0.14 健康区间 0-150)
- §0.16 残留清理全 3 批 8/13/15/17 完成度

### 6.4 8/29-9/10 季节性 SKU 上线 (T10)

- 8/29-9/10: 开发排期 (2-3 push, per §0.17 台账)
- 9/10 上线: 新建 8 SKU (lai-see-custom-set / corporate-lai-see-series / desk-calendar-2027-light-shadow / a3-wall-calendar-solar-terms 等)
- 9/10 同批 301 收编 12 旧 SKU (per §0.18 四步 SOP, curl 200 + 禁止兜底首页 + 禁止自指向)
- 9/17 验收: 新 8 页 7 天 imps > 旧 12 页 90 天均值, 否则复盘
- 旧 SKU 标 `retiredAt: '2026-09-10'` 保留 1 季度再物理删除

---

## §7 整合 push Batch A + B 状态 (8/11 交接)

### 7.1 Batch A 6 项零依赖 (明日 8/11 跟 paper-materials retrofit 合并 1 push)

| # | 任务 | 改动量 | 文件 |
|---|---|---|---|
| 1 | 4 页面模板 `siteConfig.name` → `getSiteNAP(locale).name` (7 处) | 7 行改字 | blog/[slug]/page.tsx L817 + press-kit/page.tsx L188 + case-studies/page.tsx L357 + about/page.tsx L253/263/269/275 |
| 2 | `schema-extensions.ts` 补 `sku: product.slug` (GMC) | 1 行加 + 验证 | src/lib/seo/schema-extensions.ts (ItemList 内嵌 Product 段) |
| 3 | AGENTS.md §0.20 4 条固化 (4 段 11 条教训) | 大段追加 | AGENTS.md 末尾 (K3 8/10 13:34 拍板) |
| 4 | 删除 seo.ts L343-361 business-cards 死数据 (§11 强制) | 18 行删 + 全树 grep 引用 | seo.ts L343-361 (titles/keywords/descriptions × 3 locale) |
| 5 | cron prompt v9.1 (working tree 已 M) + matrix.json v5 状态核对 | 2 文件合入 | .hermes/cron-prompts/zprintpro-daily-content-1x7w.md + .hermes/industry-keyword-matrix.json |
| 6 | llms.txt / llms-zh-hk.txt / llms-ja.txt siteName locale 化 | 3 文件 brand 行改 | public/llms*.txt |

**额外发现** (准备草稿时 grep 到, autoclaw 必看): `getSiteNAP` L141 ja.name = '智印港' (应该 = ジープリнт), 一并改。

**草稿位置**: `.hermes/k3-inbox/2026-08-11-0400-batch-a-dryrun-prep.md` (Mavis 8/11 04:00 准备)

### 7.2 Batch B 等 K3 三输入 (X URL + LinkedIn URL + IndexNow key)

- 阻塞 P0, 触发条件: K3 填 `.hermes/k3-inbox/integrated-push-approval.md` 把 STATUS 改 `1-5 OK` + 3 项填真实值 (非"待填"占位)
- M3 cron 每天 10:15 自动检查本文件, STATUS=1-5 OK 且 3 项均为真实值 → 当日执行整合 push
- 未填 = 不触发, M3 只跑 dry-run, 不阻塞其他任务

**Batch B 内容** (K3 拍板后会展开):
- X URL + LinkedIn URL → Organization schema sameAs 数组 (per §0.13 GEO 实体一致性)
- IndexNow key → sitemap ping 验证 (per §0.7 sitemap mtime)

---

## §8 验证真伪 5 步流水线 (per §0 MEMORY 顶置)

任何"完成"报告必须走 5 步真 verify, 缺一即 PARTIAL 不报 PASS:

| 步骤 | 工具 | 标准 |
|---|---|---|
| 1. **push 无 ahead** | `git log --oneline -3` | 期望 commit 已到 origin/main (无 local ahead) |
| 2. **sitemap mtime** | `Get-ChildItem public/sitemap*.xml \| LastWriteTime` | 期望 < deploy 后 1 min (build 自动) |
| 3. **curl 200 + body** | `Invoke-WebRequest` 5 关键页面 (zh-hk/en/ja home + zh-hk about/contact) | 期望 200 + body 含 5 块元素 / locale-aware brand |
| 4. **schema** | `Select-String og:site_name` + `WebSite schema` + `Article author` | 期望 zh-hk=智印港 / en=ZprintPro / ja=ジープリント |
| 5. **IndexNow** | `npm run build` 末尾输出 | 期望 "IndexNow pings sent for 3 locales" |

**不可信信号** (per MEMORY §0 顶置):
- GH Actions head_sha filter (CF Pages 不用)
- 单点 curl HTTP code (edge cache 可能返回旧版)
- git status 无 ahead (没真 push)

**升级触发** (per §0.6 紧急修复 + §0.8 防抖):
- CF build 失败 / 连续 2 次
- curl 5xx / 404 / 301
- new content 7 天 GSC 仍无收录
- matrix.json 损坏 / token 超 50 万

---

## §9 Orchestrator 协议 (R1-R6, per AGENTS.md §0)

| 协议 | 强制动作 |
|---|---|
| R1 派活前 3 问 | (1) session info 查同名 worker status / (2) peers 查同类 agent / (3) workspace 查预期输出文件. 三 NO 才允许 spawn |
| R2 ACK 协议 | spawn 30s 内必须看到 inbound / lastActiveAt 动 / 输出文件 mtime 更新. 看不到 = spawn 失败, 重 spawn 一次, 二次失败立即 kill + 升级 K3 |
| R3 监控模式 | worker 跑中, 不每分钟 ping, 只 lastActiveAt 冻结超阈值 (上午 20min / 下午 40min) 才 ping. ping 后再过阈值仍无响应 = kill + force-spawn replacement, 不重发原指令 |
| R4 幂等性协议 | spawn worker 时, 提示词首段必 verbatim 包含 "BEFORE any other action, run this 3-question idempotency check" |
| R5 报告协议 | worker 完成后写完整报告到 <path> (走 file, 不塞 message body) + 给 parent session 发短 ack. orchestrator 收到 ack 后 Read 文件, 1 句话告诉 K3, 不重复发 ack |
| R6 Cron 自检 | 任何自设的 cron 监控任务, 必须包含 3 个 hard-coded 出口: (a) TTL 过期自删 / (b) 报告落盘自删 / (c) 静默阈值触达升级 K3 |

**Anti-Patterns (绝对禁止)**:
- 看到 worker 静默就无脑再发同指令
- 设 cron 每 5-10min tick "is it done?" 超过 1h 还静默
- ping worker 后没回应就再 ping
- 在 message body 塞 ≥200 行报告
- 信任 worker 的"我正在做"说辞而不查 lastActiveAt
- 设 cron 但忘出口条件

---

## §10 实战经验教训 (8/10 4 commits + K3 决策 闭环)

### 10.1 8/10 cmyk-guide retrofit 全链路 (T1 + T2 + brand unify 4 commits)

| 时序 | 事件 | 教训 |
|---|---|---|
| 9:27 | K3 触发"立即跑千问更新指令" (T1 cmyk retrofit) | K3 9:27 拍板可跳过 daily cron 10:15 提前跑, 节省 1 天 KPI 校准窗口 |
| 9:30 | c04dbe9 commit 误含 208 files (200+ .hermes/ 临时文件 + 1 个含 token 报告) | **§0.20.3** 教训: commit 前必 git status --porcelain |
| 9:30 | push 触发 GH013 secret 扫描 | **§0.20.3** 修法: git reset --mixed HEAD~1 + 重 add 4 files only + 重 commit 8664488 |
| 9:56 | 8664488 commit (T1 + T2) push success | 1 effective push, 节省 1 build 配额 |
| 10:00 | §0.7 4 步 smoke PASS + CF 93335414345 success + 5 块元素全 True 3 locale | T1 PASS |
| 10:17 | K3 拍板"智印雲 全部改智印港" (§0.15 升级) | **§0.15 P0** + 撤销 §13.10 NAP 允许位保留 |
| 10:25 | c48181b commit (49 files 514 处) push success | brand-unify part 1, CF 93338587205 success |
| 10:30 | curl 5 关键页面验证发现 layout.tsx L43 hardcoded 'ZprintPro' | **§0.20.1** 教训: 静态 metadata 是 §0.15 升级盲区 |
| 10:50 | cefe895 commit (layout.tsx generateMetadata 改造) push success | brand-unify part 2, CF 93340279459 success |
| 11:00 | 055d87e commit (src/lib/seo.ts 9 处 ternary + getBrandName helper) push success | brand-unify part 3, CF 93342575697 success, **5/5 关键页面 og:site_name + og:locale 全 PASS** |
| 12:20 | K3 4 决策回执 (4 拍板) | Mavis 写 2 准备草稿 (s0-20-4-lessons-draft.md + batch-a-prep-draft.md) |
| 13:34 | K3 §0.20 4 条全部批准固化 (随 Batch A 写入 AGENTS.md) | autoclaw 明日 Batch A 必跑 §0.20 4 条 |
| 04:00 (8/11) | K3 拍板 autoclaw 全面执行升级 | 本交接文档落盘 |

### 10.2 K3 关键决策模式 (per §0.13 K3 战略拍板 4 字+①②③)

| 决策类型 | 节奏 |
|---|---|
| P0 战略级 | 4 字: "拍板 / 实施 / 落地 / 升级" + ①②③ 方案 (P0/P1/P2) |
| 战略纠偏 | "你之前说 X 是错的, 全部改为 Y" (K3 8/8 7:12 §0.15 升级, 8/10 10:17 智印雲 撤销保留) |
| 4 决策批量 | K3 一次回执 4 拍板 (8/10 12:20), Mavis 逐项 ACK + 落 2 准备草稿 |
| Autoclaw 交接 | "如果先交给 autoclaw 全面执行, 需要它注意 X" (K3 8/11 04:00 本次) |

---

## §11 Autoclaw 必读 · 30 条黄金法则

### 11.1 5 大红线
1. 不写名片内容 (§11 强制)
2. 不破坏 NAP 法律名 (深圳市彩龙保留)
3. 不破坏 locale-aware 品牌 (zh-hk=智印港 / ja=ジープリント / en=ZprintPro)
4. 不机械翻译 (§13.13)
5. 不刷外链 / PBN / 自动换链 (§0.9)

### 11.2 5 步验证真伪
1. push 无 ahead
2. sitemap mtime
3. curl 200 + body
4. schema
5. IndexNow

### 11.3 5 段核心文件 (autoclaw 必读)
1. AGENTS.md (33785 chars, 项目 SSoT)
2. MEMORY.md §0.1-0.20 (199.2KB, 教训固化)
3. src/lib/seo.ts (L35 siteConfig + L112-185 getSiteNAP + L266-321 getSiteBrandName)
4. src/app/[locale]/layout.tsx (generateMetadata locale-aware)
5. scripts/check-encoding.js + scripts/verify-deploy.mjs (验证工具)

### 11.4 5 段禁止动作
1. 不写「智印印港」(错字)
2. 不写 GBK 乱码
3. 不漏 hreflang (8 locale 必完整)
4. 不让 /app/ 目录被提交
5. 不把 .env 真实 key 提交

### 11.5 5 段排期必跑
1. 8/11 10:15 paper-materials retrofit + Batch A 攒批
2. 8/12 复盘日 0 push (7 项 PASS/FAIL + §9 路径推荐)
3. 8/13/15/17 §0.16 残留清理 3 批
4. 8/18 grep 验收 = 0
5. 9/10 季节性 SKU 上线 + 301 收编 12 旧

### 11.6 5 段紧急动作
1. CF build 失败立即升级 K3
2. curl 5xx / 404 / 301 立即升级
3. new content 7 天 GSC 无收录升级
4. amend 必先看 1/2 月上限
5. 用户暂停信号立即 cron delete self (per §0.19)

---

## §12 交接 checklist (autoclaw 必跑 6 步启动 SOP)

| # | 步骤 | 命令 | 标准 |
|---|---|---|---|
| 1 | 读本交接文档 | Read .hermes/k3-inbox/2026-08-11-0400-zprintpro-autoclaw-handoff.md | 30 min 内读完, 12 段全理解 |
| 2 | 读 AGENTS.md | Read F:\zprintpro-nextjs\AGENTS.md (33785 chars) | 30 min 内读完, 5 大红线 + 8 locale 必理解 |
| 3 | 读 MEMORY.md §0.1-0.20 | Read C:\Users\Administrator\.minimax\agents\mavis\memory\MEMORY.md | 20 段全读 (199.2KB) |
| 4 | 检查 working tree | `git status --porcelain` + 200+ 临时文件 unstage (per §0.20.3 + T4 unstage) | 0 临时文件风险, 4 files 准备 commit |
| 5 | 跑 §0.7 4 步 smoke | `node scripts/check-encoding.js` + `node scripts/scan-simplified.mjs src/data/blog-data/zh-hk.json` + `npx tsc --noEmit` + `npm run build` | 4/4 PASS |
| 6 | 8/11 10:15 daily cron auto 触发 paper-materials retrofit + Batch A 6 项攒批合入 1 push | `mavis cron list \| grep zprintpro-daily-content-1x7w` 看下次触发 | 1 effective push, 13/150 monthly, CF build PASS |

**完成 6 步** = autoclaw 准备就绪, 可全面接管 daily cron auto / 整合 push / 残留清理 / 9/10 季节性 SKU 全部执行。

---

EOF · .hermes/k3-inbox/2026-08-11-0400-zprintpro-autoclaw-handoff.md
```

12 段教训, 8 大红线, 5 段核心文件, 5 段排期, 30 条黄金法则, 6 步启动 SOP — 全部覆盖。
