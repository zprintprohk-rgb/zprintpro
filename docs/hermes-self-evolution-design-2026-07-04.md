# Hermes × Cron 双层自进化架构 — zprintpro 落地设计

**Author**: mavis orchestrator
**Date**: 2026-07-04
**Status**: 待 user 拍板 (Phase 1 优先执行)
**Scope**: zprintpro (智印云 / ZprintPro) — 跨境印刷 SaaS

---

## 0. TL;DR (60 秒看完)

豆包建议的**核心架构完全对**(Cron + Hermes 双层、6 项自进化、Phase 1-3 分阶段),
但有 **4 处对 zprintpro 现状的错位理解**,我做了调整:

| # | 豆包建议 | 实际 zprintpro 现状 | 我的修正 |
|---|---------|-------------------|---------|
| 1 | GLM 5.2 作复杂决策模型 | zprintpro 用 Hermes 不用 AutoClaw,GLM 5.2 是 AutoClaw 体系 | **V4 Pro 是攻坚主力,GLM 5.2 留 user 拍板的硬约束场景** |
| 2 | Hermes 自动改代码做异常自修复 | Hermes 写代码能力有限,翻车率高 | **改成"检测+诊断+上报",不自动改代码**(改代码仍 user 拍板) |
| 3 | Phase 1 = 1-2 天完成 | 现状 4 条 cron 只建了 1 条,且从未成功跑过 | **Phase 1 = 1 周(先跑通 baseline)** |
| 4 | SKU TDK 自优化放 Phase 3 | context.md v2 Sub-task B 已是 daily cron 的固定 part | **提到 Phase 2**(已存在的工作不是"未来能力") |

**主线结论**: 豆包的"补决策层"建议跟 AGENTS.md §13 + context.md v2 大框架完全吻合。
我们**不是在引入新架构,而是在把已规划但未落地的 4 cron 体系跑起来,再加上 self-detection + self-evolution 闭环**。

---

## 1. 现状盘点 (2026-07-04 15:33 实测)

### 1.1 已落地 (绿)
- ✅ **AGENTS.md §13**: 完整写了 4 条 cron + Tier A/B/C + 类目 P0/P1/P2 + 链接完整性红线
- ✅ **`.hermes/context.md` v2**: 4 sub-task (Blog / SKU / Meta / Matrix tracking)
- ✅ **`.hermes/industry-keyword-matrix.json`**: queue 已 2 条 (Q-001 餐廳開業傳單 / Q-002 化妝品包裝盒)
- ✅ **`scripts/`**: ~100 个脚本 (generate-sitemap, verify-deploy, analyze-gsc, blog-content-engine, audit-blog-v2)
- ✅ **`C:\Users\Administrator\.hermes\skills\zprintpro\SKILL.md` v3.7** (608 行): 含调度算法 + Sub-task B SKU 自进化 + 链接完整性红线 + no-image 硬约束
- ✅ **mavis cron 列表里已有 6 条** (但都不是 zprintpro 相关 — 是 togthr/premarket)

### 1.2 未落地 / 缺失 (红)
- ❌ **`zprintpro-daily-seo` cron** (jobs.json 已配) `repeat.completed = 0` → **从未成功跑过**
- ❌ **3 条 weekly/monthly cron 实体没建** — AGENTS.md §13 写有但 jobs.json + mavis cron 都没落地
- ❌ **`project.yaml` deploy_commands_forbidden 含 `git push`** → 跟 context.md "允许 git push" **自相矛盾**,必须修
- ❌ **首次 baseline 没建** — 没有 GSC 收录率/周环比流量/平均排名 这些 KPI 起点

### 1.3 历史踩坑 (avoid)
- 2026-06-27 ~ 07-01: hermes 4 天 3 篇博客**只写 `.hermes/logs`,从未进 src/**
- 根因: cron prompt 禁部署 + 无 verify 流水线 + 完成判定缺失
- v2 已修(2026-07-01 拍板): "产出即上线" + 6 步 verify

---

## 2. 豆包建议 × 落地性评估

### ✅ 完全合理,接受(8 项)
1. **Cron + Hermes 双层架构** — 跟 AGENTS.md §13 完全吻合
2. **6 项自进化能力**: 矩阵自迭代 / 内容质量自优化 / 异常自修复 / 内链自生长 / SKU 自迭代 / 运维自巡检 — 跟 context.md v2 + SKILL.md v3.7 完全对齐
3. **DeepSeek V4 Flash 主模型** — jobs.json 已配 `deepseek-v4-flash`,完全一致
4. **高风险改动人工审核** — context.md §11 已写升级机制,但**缺具体清单**(Phase 1 补)
5. **冷却期避免过度优化** — 写入调度算法(SKILL.md §3.8 待加)
6. **收录率作为核心 KPI** — Phase 1 必加
7. **人工一键暂停** — mavis cron 支持 `enabled=false`,Phase 1 接好
8. **Phase 1 决策接入 = 零风险** — 跟"产出即上线"v2 完全一致

### ⚠️ 错位 / 需调整 (4 项)
1. **GLM 5.2 作复杂决策模型**:
   - zprintpro 用 Hermes 不是 AutoClaw,GLM 5.2 是 AutoClaw 体系
   - context.md §9 模型分级是 **V4 Flash → V4 Pro → GLM 5.2(需 user 批准)**,GLM 不是常规分工
   - **修正**: V4 Pro 是日常攻坚主力,GLM 5.2 只在 user 拍板的硬约束场景(如 schema 批量改写)

2. **"异常自修复 = Hermes 自动改代码"**:
   - Hermes 写代码能力有限,真让他自动改代码翻车率高
   - **修正**: Hermes **检测+诊断+上报**,不自动改代码。CF build 失败 → hermes 读 log → 输出诊断 → user 决策
   - 只有"加内链/补 alt 文本"这类**纯追加**的低风险操作 hermes 可自动改

3. **Phase 时间估计太乐观**:
   - 豆包: Phase 1 = 1-2 天,Phase 2 = 1-2 周
   - 现实: 4 cron 只建 1 条 + 从未跑过 → Phase 1 至少 1 周,Phase 2 至少 1 个月
   - **修正**: Phase 1 = 1 周 / Phase 2 = 4 周 / Phase 3 = Month 2+

4. **SKU TDK 自优化放 Phase 3**:
   - 错 — context.md v2 Sub-task B 已是 daily cron 的固定部分
   - **修正**: SKU 自进化提到 Phase 2 主体

### ❌ 不适用 / 拒绝 (4 项)
1. **"竞品关键词自动对标"** — 竞品"智印港"明确排除,不需要自动对标
2. **"旧内容二次迭代: 排名靠后博客自动补充深度"** — 优先级低,易翻车,Phase 3+ 再说
3. **"每 7 天复盘 → 自动迭代内容模板"** — 模板是 SEO 命脉,必须人工审核
4. **"自动发现新长尾词加入 Tier A"** — Tier 升降级应该规则驱动,不 hermes 即兴决策

---

## 3. 最优方案: 3 阶段落地路线

### 总原则
**"现在能落地的 > 未来要设计的"**
- 先把 AGENTS.md §13 + context.md v2 已规划但未落地的 4 cron 体系**跑起来**
- 再加 self-detection (每个 cron 的 verify 流水线)
- 最后才谈 self-evolution (hermes 自动优化模板)

### Phase 1: 补齐基础设施 + 跑通 baseline (Week 1)

**目标**: 4 cron 全建出来,**至少跑出 1 次完整循环**

| # | 动作 | 负责人 | 风险 |
|---|------|--------|------|
| 1.1 | 修 `project.yaml` 矛盾(删 git push from forbidden) | mavis | 0 |
| 1.2 | 创建 3 条缺失 cron (weekly-meta-refresh / monthly-matrix-audit / gsc-feedback-loop) | mavis | 低 |
| 1.3 | 手动触发 `zprintpro-daily-seo`,跑 Q-001(餐廳開業傳單) | hermes | 中(首次跑) |
| 1.4 | 6 步 verify (curl 200 + 关键词命中 + 内链全 200 + schema 注入 + sitemap 含 URL) | hermes | 0 |
| 1.5 | 加每条 cron 的 3 硬编码出口(TTL 自删/报告落盘自删/静默升级) | mavis | 0 |
| 1.6 | 建 KPI baseline: GSC 收录率 / 周环比流量 / 平均排名 / 7 天收录速度 | mavis | 0 |

**Phase 1 成功标准**:
- 4 cron 全部 enabled + schedule 正确
- 至少 1 篇博客**真实上线** + 6 步 verify 全过
- KPI baseline 数据**已采集**
- 任一 cron 失败有 3 出口保护,不卡死

**user 时间**: 0 (全自动,user 只看结果 + 拍板 Q-001 主题是否合适)

---

### Phase 2: 自愈生长 + KPI 闭环 (Week 2-5)

**目标**: 把"自进化"做实,hermes 决策层开始起作用

| # | 能力 | 实现 | 风险 |
|---|------|------|------|
| 2.1 | **异常检测**(不是自动修复) | hermes 跑 6 步 verify → 不通过 → 输出诊断 → user 决策 | 低 |
| 2.2 | **内链自生长**(纯追加,低风险) | 每篇新博客上线 → hermes 扫已有文章 → 用 `auto-backlinks.js` 补反向内链 | 低 |
| 2.3 | **SKU 自进化正式启用** | context.md Sub-task B 写进 daily cron prompt (title/description 加行业关键词) | 中 |
| 2.4 | **GSC 反馈闭环** | `zprintpro-gsc-feedback-loop` 周三拉数据 → 写回 matrix.json `priority_boost` | 低 |
| 2.5 | **KPI 仪表盘** | 周一 `zprintpro-weekly-meta-refresh` 出周报,含 7 天收录率 / 周环比 / 平均排名 | 低 |
| 2.6 | **冷却期规则** | SKILL.md §3.8 加: 同 SKU 30 天内只优化 1 次 | 0 |
| 2.7 | **Tier 升降级 rules**(规则驱动,非 hermes 即兴) | 30 天零展示 → 自动 Tier C; 月环比 +50% → 升 Tier A | 中 |

**Phase 2 成功标准**:
- GSC 收录率 ≥ 60%
- 平均关键词排名上升 5+ 位
- 任一异常发生时 hermes 能在 5min 内输出诊断,user 决策 < 30min

**user 时间**: 每周 30min 看周报

---

### Phase 3: 深度进化 (Month 2+, 长期, 人工兜底)

**目标**: 真正的自进化,hermes 自动优化模板 + Tier 切换

| # | 能力 | 实现 | 风险 |
|---|------|------|------|
| 3.1 | **内容模板自迭代**(人工最终拍板) | hermes 分析 top 10 文章共性 → 输出"模板 v3 建议" → **user 拍板才生效** | 高 |
| 3.2 | **新长尾词自动入 queue**(低风险) | GSC 拉新词 + 竞品监控 → 自动入 matrix.json Tier B → 30 天无展示再降 Tier C | 中 |
| 3.3 | **高转化 SKU 深度迭代** | SKU TDK 自优化,但 **schema 必须人工审核** | 高 |
| 3.4 | **跨任务协同** | Blog / SKU / 类目页 内链矩阵自动平衡 | 中 |

**Phase 3 关键规则**:
- **所有"模板/策略"变更必须 user 拍板**,hermes 不准即兴改模板
- **回滚机制**: 每次模板迭代保留 v1/v2/v3,出问题时一键回到上一版
- **A/B 测试**: 新模板先 50% 流量,2 周后看数据再全量

**user 时间**: 每月 1 小时看月报 + 拍板模板迭代

---

## 4. 自检能力 (用户原话"每个任务要有我检测的能力")

### 4.1 通用 6 步 verify (所有 daily/weekly 任务都跑)

| 步 | 检测什么 | 通过标准 |
|----|---------|---------|
| 1 | git push 成功 | `git status -sb` 无 ahead |
| 2 | sitemap mtime 是今天 | `find public/sitemap*.xml -mtime -1` |
| 3 | curl 关键 URL 200 | 至少 3 个核心 URL 返回 200 |
| 4 | content 含主关键词 | grep 关键词命中 ≥ 1 次 |
| 5 | schema JSON-LD 注入正确 | curl 页面 + grep Article/BreadcrumbList/FAQPage |
| 6 | 内链全部 200 (不 301/302/404) | 写前用 matrix valid_internal_links,写后逐个 curl |

### 4.2 每条 cron 的专项检测

| Cron | 检测什么 | 怎么检测 | 失败怎么办 |
|------|---------|---------|----------|
| **daily-content-evolve** | 6 步 verify 全过 | curl + grep | 任一不过 → 不报完成 + 升级 user |
| **weekly-meta-refresh** | 类目页 meta 改后 rank 变化 | 对比 GSC 改前改后 28 天 | rank 跌 → 自动回滚 + 升级 |
| **monthly-matrix-audit** | P0/P1/P2 覆盖率 + Tier 命中率 | 读 matrix.json + GSC | < 60% → 自动扩容 queue |
| **gsc-feedback-loop** | GSC API 拉取成功 | API 200 + 数据完整 | 失败 → 重试 3 次 + 升级 |

### 4.3 3 个硬编码 cron 出口 (R6 协议)

每条 cron 必须含:
- (a) **TTL 过期 → 自删** (e.g. `If Date.now() > expiry_ms, mavis cron delete self`)
- (b) **报告落盘 → 自删** (e.g. `If logs/YYYY-MM-DD-*.md exists, mavis cron delete self`)
- (c) **静默阈值触达 → 升级 user**,**不**继续静默 tick

---

## 5. 持续自进化能力 (用户原话"持续自进化的能力")

### Level 1: 数据驱动自进化 (Phase 1-2 已覆盖)
- GSC 真实数据 → matrix.json `priority_boost` → 下次选题
- 周环比流量 → 自动扩容/缩容 daily 任务量
- 收录率 → 自动决定是否加大 push 频率

### Level 2: 模板自迭代 (Phase 3, 人工审核)
- top 10 文章共性 → hermes 输出"模板 v3 建议"
- user 拍板 → 才生效
- 保留 v1/v2/v3,出问题一键回滚

### Level 3: 策略自进化 (Phase 3+, rules-driven)
- 行业 Tier 自动升降级 (**写在 rules 里,不 hermes 即兴**):
  - 30 天零展示 → 自动降 Tier C
  - 月环比 +50% → 自动升 Tier A
- 新长尾词自动入 queue (Phase 3+)

### 关键原则: **自进化 ≠ Hermes 自由发挥**

✅ 允许: **历史数据驱动** + **可回滚** + **硬规则约束** + **user 升级路径**
❌ 禁止: hermes "我觉得这样好就改了"

---

## 6. 第一次跑 (Phase 1.3) 的具体选题

**Q-001 (推荐先跑)**:
- 主题: 餐廳開業傳單印刷指南
- Industry: 餐飲外賣 (Tier A 高复购)
- Category: flyers (P0)
- SKU: a4-flyers
- 3 locale 标题已写好,valid_internal_links 6 条已列
- 优势: Tier A + P0 + 行业关键词明确 + 内链清单干净

**Q-002 (备选)**:
- 主题: 化妝品包裝盒印刷指南
- Industry: 美妝護膚 (Tier A)
- Category: packaging (P0)
- SKU: gift-boxes

**建议**: 第一次跑 Q-001,因为 flyers 流量大、转化路径短(餐饮老板高频决策)。

---

## 7. 风险与对策

| 风险 | 概率 | 影响 | 对策 |
|------|------|------|------|
| Hermes 又只写日志不上线 | 5% | 高(重蹈覆辙) | 6 步 verify 流水线 + 任一不过升级 user |
| CF build 失败 | 10% | 中 | hermes 读 log → 诊断 → user 决策 |
| 内容质量差(无 FAQ / 字数不够) | 15% | 中 | SKILL.md §2 硬指标,verify 第 4-5 步卡 |
| 矩阵内容写错品类(踩禁区) | 2% | 低 | matrix business_cards_excluded=true + verify grep |
| GSC 数据 28 天延迟看不到效果 | 100% | 低 | KPI 设计容忍 28 天窗口,看 7 天滚动 |
| User 没时间拍板 Phase 3 模板迭代 | 30% | 中 | Phase 3 推迟,Phase 2 已能闭环 |

---

## 8. 执行路线图 (下一步动作)

### 立即执行 (本周内)
1. **修 `project.yaml` 矛盾** (删 git push from forbidden)
2. **创建 3 条缺失 cron** (weekly / monthly / gsc-loop)
3. **手动触发 `zprintpro-daily-seo` 跑 Q-001** (先验证 baseline)
4. **跑通 6 步 verify**,把第一篇博客**真实上线**
5. **建 KPI baseline** (GSC 收录率 / 周环比流量 / 平均排名 / 7 天收录速度)

### Week 2-4
6. **加每条 cron 的 3 硬编码出口** (R6 协议)
7. **启用 SKU 自进化** (Sub-task B)
8. **启用 GSC 反馈闭环** (周三 cron)
9. **加冷却期规则** (同 SKU 30 天 1 次)
10. **加 Tier 升降级 rules**

### Month 2+
11. **内容模板自迭代** (人工拍板)
12. **新长尾词自动入 queue** (低风险)
13. **A/B 测试新模板**

---

## 9. 与豆包建议的差异总结 (1 段话)

豆包建议**架构方向完全对**,但对 zprintpro 现状有 4 处理解偏差:
GLM 5.2 不是日常攻坚主力(Hermes 不用 AutoClaw);
异常自修复应该是检测+上报,不是自动改代码(Hermes 写代码能力有限);
Phase 时间估计太乐观(4 cron 只建 1 条 → Phase 1 至少 1 周);
SKU 自进化已在 context.md v2,不用等 Phase 3。

我们的最优方案 = **豆包的双层架构 + 6 项能力 + 分阶段落地**,**减去**过度设计(竞品对标/旧内容迭代/模板自由改/自动升降 Tier),**加上** zprintpro 现状的硬约束(不写名片/纯文字博客/链接完整性红线/Hermes 写日志不上线教训)。

---

**Updated**: 2026-07-04 15:33 (Asia/Shanghai)
**Author**: mavis orchestrator (user 授权)
**Status**: 待 user 拍板 Phase 1 立即执行 / 调整方案 / 先讨论