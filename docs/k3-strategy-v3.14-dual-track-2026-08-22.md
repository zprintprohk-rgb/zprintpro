# K3 战略 v3.14 — 收尾加固 + 双轨词库进攻（2026-08-22）

> 上位文件：k3-ceo-strategy-2026-08-17.md（新宪法）> 4-week-plan > 本文件
> 前序：v3.11（包装盒群）/ v3.12（纸袋+海报+贴纸+EB+错配）/ v3.13（月曆+flyers+books+food+envelopes+menus+red-packets）已全量 live
> 008 询盘度量层：8/22 06:39 端到端实证闭环（id=1 + 邮件通知 ZP-20260822-V91J + RLS 3 policy）✅

## 一、双轨词库战略（K3 8/22 07:04 拍板口径，写死）

| 轨道 | 定位 | 词例 | 节奏 |
|---|---|---|---|
| **大单词（矛头）** | 先布局抢位，一单抵百单 | bulk / wholesale / custom packaging supplier / catalog printing china / booklet printing bulk | 8/23 盘点+着陆优先做 |
| **小单词（利润底盘）** | 利润率高，大单未至时贡献现金流 | sticker / label / 貼紙 / 即日 / 邊度買 等长尾 | 大单词布局完成后全面铺开；期间 v3.11-13 已覆盖的长尾持续收割 |

**口径**：优先大单 ≠ 放过小单。排序只决定资源先后，不放弃任何一轨。

## 二、Day 1（8/22 今天）— 收尾 + 防御加固（M3 执行）

| # | 任务 | 验收 |
|---|---|---|
| T23 | T20 red-packets ja locale 补齐（v3.13 欠账） | ja 页面含利是封 snippet |
| T24 | llms.txt 更新：v3.11-13 全部新路径 + 每页 1 句摘要 | llms.txt 200 + 新路径在列 |
| T25 | **5 个最高流量 Pillar 去模板化**（防 2026-03 spam update scaled content abuse）：books 加案例段 / flyers 加设计灵感段 / calendars 加 2027 趋势段 / red-packets 加 CNY 文化段 / envelopes 加场景分层段 | 5 Pillar 结构互相差异化 |
| T26 | **featuredSnippet 加长到 130-160 字**（top 10 流量页先改）——对齐 AIO 偏好 134-167 字语义单元（wellows 15,847 条 AIO 样本研究） | 10 页 snippet 字数达标 |
| T27 | FAQ schema JSON-LD 全量校验（v3.11-13 新增 FAQ 都有 markup） | 校验 0 缺失 |

## 三、Day 2（8/23）— 进攻（大单词先行，小单词跟进）

| # | 任务 | 验收 |
|---|---|---|
| T28 | v3.10 作战包 2：school exercise book 集群（T9 前置已满足） | 集群页+内链上线 |
| T29 | **en B2B 大单词专项（矛头轨）**：盘点 GSC 7 日 en 词中 bulk/wholesale/supplier/bulk order 类 + 着陆页规划；已有 china catalog 着陆页做锚点，新词不新造页面优先挂靠现有 category/PDP | 盘点清单 + 词→页映射落盘 |
| T30 | **JA 市场词全量盘点（小单利润轨 ja 侧）**：GSC ja 高 imps 词 → 对齐到现有 Pillar/PDP，漏词补注入 | ja 词→页映射落盘 |
| T31 | IndexNow 全量提交 + **新路由 curl 验收（新 SOP 第 6 步：凡新增/修复路由必须 curl 200）** | 提交 202 + curl 全 200 |

## 四、8/28 验收硬指标（升级版：GSC 6 项 + 询盘基线）

| 指标 | 基线 | 目标 |
|---|---|---|
| striking 词进首页（pos≤10） | 0 | ≥5 |
| 有名词 7d clicks | 6 | ≥12 |
| 站点日均 imps | 682 | ≥900 |
| envelopes 点击破零 | 0 | ≥1 |
| 月曆印刷 pos | 18.4 | ≤10 |
| saddle stitch booklet pos | 79.7 | ≤50 |
| **008 询盘基线（新增）** | 1（测试单） | 记录 8/22-8/28 真实询盘数 + 来源词归因，不设硬指标，建基线 |

CTR 基准：pos 4-10 良性 ≥2% / 优秀 ≥5%；点击→询盘良性 3-5% / 优秀 ≥8%（8/29 起用 008 实测校准）。

## 五、纪律（沿用 K3 8/22 03:24 铁律 + 新增 1 条）

1. 禁 git add -A，逐文件 add；untracked src/ = 0
2. 价格不编造（e-print 事实锚 / pricing.ts 真实值）
3. T11 301 保留不删；§11 名片禁词 0；§13.10 NAP 脱钩（en/ja 不塞深圳）
4. §13.6 内链 0 404；§13.4 v3 + §13.5 v2（0 新 SKU 0 图片依赖）
5. CF build 失败立即停手升级
6. **新增：凡新增/修复路由，verify 第 6 步 curl 该 URL 确认 200（T16-1 教训固化）**
7. 报告遵循 §0.21：不列 push 计数，只报业务 actionable

## 六、8/28 后分水岭（预告 v3.15）

008 实测询盘数据 8/29 出第一份报告 → 按"哪个词带来询盘"决定深度资源投向（实拍图 5 组 / 客户案例数据锚 / B2B 大单页群）。铺量时代结束，数据驱动时代开始。

---
*落盘：Mavis（K3 战略脑）/ 2026-08-22 07:0x / 执行：M3*
