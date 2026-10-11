# ZprintPro spam 恢复：车道调整 + 防护机制 + 时间压缩评估方案

> **日期**: 2026-10-12 · **作者**: 执行层（Kimi Work 会话）· **拍板人**: K3
> **触发**: K3 2026-10-12 06:46 指令（读千问3.8MAX《灾难恢复+飞轮提升全案》→ 评估恢复时间能否再压缩 → 调整 deepseek Harness 车道 → 落地防护机制）
> **状态**: 车道注入 + 防护四机制**已落地**（本 doc 为 SSoT）；B1c 队列待 K3 过目后开跑
>
> **数据来源**（§0.23 强制行）:
> - GSC 数据: `GSC数据/` 10-09 导出（三站点 28 天档，止于 10-05）+ K3 10-12 导出的实时 24 小时档（窗口 10-09 04:00 ~ 10-10 03:00）
> - B1 审计: `docs/2026-10-12-b1-sku-template-audit.md`（commit 4d7def3b）
> - 断崖诊断: 诊断 v2（commit fcdd5b57）+ B1a/B1b 判定报告 `docs/2026-10-12-b1a-b1b-detox-and-disaster-verdict.md`（commit f9d9b1b7）
> - 千问方案: `.hermes/tmp/qwen38max-recovery-plan-20261012.txt`（外部顾问方案，本 doc §2 逐条对账）
> - 恢复系数实测: `python scripts/gsc-cliff-detector.py` → `.hermes/logs/gsc-cliff-2026-10-12.json`

---

## §0 执行摘要（先结论）

1. **灾难判定维持 85/15（真降权 / 报告 bug）**，新增铁证：实时 24h 档显示全 property 展示仅 **44 次/天、点击 1 次**，而断崖前（28 天档止于 10-05，三站点合计）日均约 **585 次** —— **恢复系数 7.5%**。这不是报告 bug 能解释的。
2. **恢复时间：Google 侧不可压缩，我方侧可压缩**。Google 算法再评估周期（3-6 个月、跟随下次 spam/core 更新）是 Google 的属性，任何「30 天恢复」承诺都是忽悠；但「Google 打开评估窗之前我们做什么」完全可控——本方案把我方窗口压到 **7-10 天完成 B1c 前 6 簇**，让评估窗打开那刻全站已绿。
3. **车道调整已落地**：5 条 lane prompt 首部注入「恢复模式块」（凌驾增产类指令，不动 10-09 大脑区的 CTR/盲开词纪律），注入器 `scripts/inject-recovery-mode-20261012.mjs`，备份 `.hermes/_bak-recovery-inject-20261011/`。
4. **防护四机制已落地**：门童 #29（keywords 去毒）+ 断崖检测器 + 看门狗线上断言 + blog/内容相似度闸门（注入车道）。同类事故再发生的每一条路径（regen 回流 / 模板词复用 / pet 词 / 渲染层改回）现在都有机器判据把守。
5. **新发现升级**：门童 #29 首扫揪出 **v22 改名残留**——CSV 68-69 行（thick-greeting-cards-400g / foil-greeting-cards）slug 已是贺卡，但三语 title/H1/正文/keywords 仍是名片/名刺/Business Cards 半成品，且 en/ja keywords 数组含繁中（跨语言污染红线）。已显式豁免进审计 JSON，**待 K3 就 §0.0 解禁块 (a)/(b)/(c) 裁决后统一处理**（见 §5）。

---

## §1 恢复时间压缩评估：能压多少，哪段不能压

### 1.1 时间轴三段拆解

| 段 | 内容 | 可否压缩 | 压缩后 |
|---|---|---|---|
| **A. 我方整改** | B1a/B1b ✅ 已完成 → B1c 簇差异化 + B1d 薄页 noindex + 重爬刺激 | ✅ 可压 | **7-10 天**（原计划 2-3 周） |
| **B. Google 再评估** | spam 命中后的信任再积累，跟随下次算法更新窗口 | ❌ 不可压 | 3-6 个月（Google 属性） |
| **C. 对冲渠道** | Bing / AI 引擎（ChatGPT/Perplexity/Gemini）/ 直接渠道 | ✅ 今天可开 | 立即 |

### 1.2 Google 侧为什么不可压（对 K3 的诚实说明）

- spam 更新（scaled content abuse）的恢复机制 = **下次同类更新重新打分**。2026 年 Google 更新节奏：3 月 core / 6 月 core / 8 月 spam / 9 月 spam（本次命中）。按此节奏下次窗口**可能在 12 月**——恰好落在 CNY 利是封季前，这既是压力也是机会：若 12 月窗口前全绿，利是封季能接住恢复红利。
- 「请求重新审核」仅适用于**手动处罚**。GSC 手动处罚页状态仍待 K3 核验（三项人肉核验之一）；若为纯算法命中（85% 概率分支），连「请求重新审核」按钮都没有，唯一路径 = 整改 + 等窗口。
- 任何声称能压缩 Google 侧周期的说法（含千问方案暗示的快恢复时间表）不可采信。

### 1.3 我方侧压缩动作（已排期）

| # | 动作 | 负责 | 时间 |
|---|---|---|---|
| 1 | **B1c 前 6 簇差异化重写**：daily-content 车道每日消费 1 页 + 人手会话并行 | 车道+人手 | **7-10 天**（原 2-3 周） |
| 2 | **B1d 薄页 noindex 清单**：monthly-matrix 出候选，K3 拍板后执行 | 车道→K3 | 本周出清单 |
| 3 | **重爬刺激**：sitemap lastmod 实更（随 B1c 每页真实更新）+ IndexNow 提交 + GSC 手动请求索引 top 20 页 | 车道 | 随 B1c 同步 |
| 4 | **Bing/AI 对冲**：Bing Webmaster 提交 + IndexNow 天然覆盖 Bing；AI 引擎可见性（AEO/GEO 已做的 FAQ/schema 资产在 Bing 系 AI 上不受 Google spam 影响） | 人手 | 今天可开 |
| 5 | **域名转发**：旧域名已续费（K3 10-12 确认），服务器侧 301 需在宽限期结束前恢复 | K3（域名商后台） | **本周内**（宽限期随时结束，外链权重永久蒸发风险） |

**一句话**: 把「Google 重新打分前无事可做」变成「Google 打开评估窗那刻我们已全绿」。

---

## §2 千问3.8MAX 方案对账表（采纳 / 改造 / 驳回）

| 千问建议 | 裁决 | 理由 / 落点 |
|---|---|---|
| B1c 簇差异化（主推页保留 + 兄弟页改写 30-40% + 三语独立） | ✅ **采纳** | 与 B1 审计口径一致，已排入 daily-content 车道队列 |
| 防护 4 机制（黑名单 / 相似度 / 线上断言 / GSC 预警） | ✅ **采纳** | 已全部落地（§4），但阈值按我方审计口径（见下行） |
| 相似度阈值 | 🔧 **改造** | 统一用 B1 审计口径：8-gram Jaccard，存量基线 >50% 计入，**新增内容拦 >60%**（不用千问的平行阈值） |
| 黑名单阈值 | 🔧 **改造** | 保持 >8 SKU 复用（与 B1b 一致），不改成 >5 |
| 簇清单 | 🔧 **改造** | 千问的簇 3 名片 / 簇 4 标签 / 簇 9 吊牌是**假想簇**；真实近重复实锤簇 = stickers 5 兄弟互扫 96% / a4↔a5 flyers 98% / a1↔a2 posters 98% / kraft↔eco bags 98% / food↔folding boxes 98%（B1 审计）。队列按真实簇重排（§3） |
| 簇 3「名片印刷」 | ❌ **驳回** | 违反 §0.0 展示层现状：名片解禁仅限接单层，贺卡资产不动，(a)/(b)/(c) 未裁决 |
| 「12,000+ 订单 / 平均交期 2.3 天」 | ❌ **驳回** | 编造数据，违反 §0.23；真值只能来自 products.ts / K3 拍板 |
| Wikidata / Crunchbase / Reddit 渗透 / Yahoo Shopping 入驻 | ⏸️ **挂账 K3** | 运营动作，执行层不擅自落地 |
| 双人审批 | ⏸️ **挂账** | 现制已是 K3 拍板制；B1c 批次出逐页清单给 K3 过目即可，不另建流程 |
| 恢复时间表（暗示可快） | ❌ **驳回** | Google 侧周期不可承诺（§1.2） |

---

## §3 B1c 真实簇队列（daily-content 车道每日 1 页，三语同步）

> 排序依据：B1 审计近重复实锤程度 × Q4 商机（CNY 利是封 / 年賀状 / holiday cards 在即）。
> 每页方法：簇内**主推页保留**，兄弟页正文改写 30-40%；差异化锚点 = 材质 / 工艺 / 场景 / 真实起订差异；**数字从 products.ts 现取**（§0.23）。
> 进度登记：`.hermes/logs/b1c-queue-progress.json`（每日追加，供下一棒幂等）。

| 序 | 簇 | 实锤 | 页数 |
|---|---|---|---|
| 1 | stickers 5 兄弟（waterproof/transparent/foil/fluorescent/security） | 三语互扫 96% | 5 |
| 2 | red-packets 族（CNY Q4 在即，优先抢恢复窗） | 同模板 | ~8 |
| 3 | a4 ↔ a5 flyers | 98% | 2 |
| 4 | food ↔ folding boxes | 98% | 2 |
| 5 | kraft ↔ eco bags | 98% | 2 |
| 6 | a1 ↔ a2 posters | 98% | 2 |
| 7 | calendars 族 | 待扫 | ~4 |
| 8 | 其余 B1 清单长尾 | — | 按审计报告 |

**K3 过目点**：首簇（stickers 5 兄弟）逐页重写清单出来后会先给 K3 过目再批量跑（本批交付后的下一动作）。

---

## §4 防护四机制（已落地，机器判据）

> 目标：9/6 清洗 → regen 回流 → 10/8 spam 命中的事故链，每一环都有闸门。

| # | 机制 | 实现 | 判据 | 状态 |
|---|---|---|---|---|
| 1 | **keywords 去毒门童 #29** | `scripts/guards/keywords-detox-guard.js` + 黑名单 SSoT `scripts/guards/data/keywords-detox-blacklist.json` | R1 数组 ≤10 词 / R2 黑名单 65 词例 + pet 正则禁回流 / R3 每组 ≥1 品类语素锚；keywords 数据文件 staged 时全量硬拦 | ✅ 已挂载 pre-commit §3.12，hooks 三份同步（sha256 50768ebf40b0），manifest 登记（28 门童 0 冲突）；基线全扫 **276 槽 0 违规 / 6 显式豁免** |
| 2 | **GSC 断崖检测器** | `scripts/gsc-cliff-detector.py` | 新断崖 = 最新完整日展示 < 前 7 日均 ×30% → CRITICAL exit 1；数据龄 >5 天 → STALE；恢复系数 = 实时 24h 展示 / 断崖前日均 | ✅ 实测：当前恢复系数 **7.5%**（44/585），三站点 28d 档内无新断崖 |
| 3 | **看门狗线上 SEO 断言** | `scripts/cron-watchdog.py` 新增 `check_live_seo_assertions()`（每天 06:43 跑） | 4 个代表 URL：HTTP 200 + `<meta name="keywords">` = 0 + title 在位；网络异常只 print 不告警（防误报），确定违规才进 alerts | ✅ 实测 4/4 全过 |
| 4 | **内容相似度闸门** | 注入 blog-deepfix / daily-content 恢复模式块 | 新内容 vs 同 locale 现存正文 8-gram Jaccard >60% → 停手 BLOCKED + 证据；FAQ >50% 同样拦 | ✅ 车道指令已注入（计算工具复用 B1 审计器口径） |

---

## §5 新发现升级：v22 改名残留（待 K3 裁决，挂 §0.0 解禁块）

门童 #29 首扫实锤（证据：CSV 68-69 行 / `src/data/sku-seo-data.ts` 对应槽）：

- `thick-greeting-cards-400g`：slug=贺卡，但 产品名称=超厚名片/Thick 400g Business Cards/厚口名刺，三语 SEO 标题、H1、正文、keywords（`["400g名片"]` ×3 语言）全为名片；**en/ja keywords 数组含繁中**（跨语言污染红线）；SEO 描述已是贺卡（半迁移）。
- `foil-greeting-cards`：同上（keywords `["燙金名片"]` ×3）；ja 正文还有「名刺、名刺、」重复 bug。
- 同族其余 4 个 v22 改名 SKU（premium / spot-uv / matte / rounded-corner greeting-cards）未命中 keywords 问题，但建议裁决时一并核查 title/H1/正文。

**为什么不擅自动**：§0.0 解禁块明确「(a) 维持现状只接单 / (b) 新建名片品类页 / (c) 折中落地页」**待 K3 一句话裁决**，裁决前不得删改既有贺卡资产。这两行的任何方向改写都是抢跑。

**门童处理**：6 槽进 `known_exemptions`（黑名单 JSON 内显式豁免 + 理由 + 落审计 JSON，不暗放行）。**K3 裁决后移出豁免并统一修复**。

---

## §6 车道调整清单（已注入，恢复期生效）

| 车道 | 恢复模式要点 |
|---|---|
| daily-content 21:17 | 首务 = B1c 队列每日 1 页（§3 顺序）；新内容降级为次务；CRITICAL_CLIFF 当日只做诊断 |
| gsc-feedback 22:43 | STEP 0.5 断崖检测 + 每次报告必含 `RECOVERY: x%` 与逐日曲线；10-09 大脑区锚点追踪继续，但区分 spam 压制失真 vs 真实信号 |
| weekly-meta 周五 23:07 | 周报改组为 SEO 健康周报（恢复曲线 / 门童审计摘要 / 相似度抽检 / B1c 对账）；meta 刷新限缩到已恢复展示的页 |
| blog-deepfix 周六 05:37 | 相似度闸门前置（>60% 停手）；题材优先 B1c 簇 + Q4 品类；单次 ≤2 篇 |
| monthly-matrix 每月 1 号 06:13 | 首节固定 spam 恢复月度复扫（#29 全扫 / Jaccard 矩阵 / meta 复探 / B1d 薄页清单）+ 恢复总账 |

注入器：`scripts/inject-recovery-mode-20261012.mjs`（计数/形状断言 + 幂等 + 备份）；优先级 = 结果总线契约（-1) > 恢复模式 > 大脑区增产类；**CTR c 值判据 / 盲开词纪律 / churn 盯梢继续有效**。

---

## §7 待 K3 事项汇总

| # | 事项 | 紧急度 |
|---|---|---|
| 1 | 三项人肉核验：GA4 实时 / GSC 手动处罚页 / 无痕搜 3 词（GA4 最关键，一锤定音真降权 vs 报告 bug） | 🔴 高 |
| 2 | 旧域名服务器侧 301 恢复（域名已续费，宽限期随时结束） | 🔴 高 |
| 3 | §0.0 解禁块 (a)/(b)/(c) 裁决 → 解锁 §5 两行残留修复（含 en/ja 繁中污染） | 🟡 中 |
| 4 | B1c 首簇（stickers 5 兄弟）逐页重写清单过目 | 🟡 中（清单出来后） |
| 5 | B1d 薄页 noindex 候选清单拍板（monthly-matrix 产出后） | 🟢 低 |
| 6 | 千问挂账项：Wikidata / Crunchbase / Reddit / Yahoo Shopping | 🟢 低 |
