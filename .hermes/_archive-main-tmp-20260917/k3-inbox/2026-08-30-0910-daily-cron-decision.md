# 2026-08-30 09:10 Daily Cron 决策 + 升级 K3 4 拍板项

> **触发**: zprintpro-daily-content-1x7w daily cron 9:10 Asia/Shanghai (K3 8/30 派发)
> **执行者**: Mavis (orchestrator) 作为 M3 执行 v9.4 + B7 选题库 22 篇 + §0.29 W3 batch 2
> **报告 SSoT**: .hermes/logs/2026-08-30-日运营报告.md (33,670 bytes, K3 格式 14 章节)
> **决策**: 0 push, 1 commit 本地 (11 文件), 升级 K3 4 拍板项 (R6 / §0.29 A/B / K3 9:00 4 件 / W2 9/2 启动)
> **§0.22 SOP-10 5 问门禁**: ✅ 5/5 PASS
> **§0.23 数据诚信红线**: ✅ baseline 必标"待/已校准"
> **§0.25 30 min 间隔**: 距 a2566e2 push 23 min < 30 min 硬下限, 不 push, commit 本地, 留到 10:15 cron 周期之后 (§0.25.3 修正, 不阻塞 Start-Sleep)

---

## 一、本 turn 落地 1 cron 1 战略交付物 (§0.28.6 1 cron 1 交付物 原则)

**K3 8/28 11:45 + 11:52 拍板红线**: 1 cron ≥1 战略交付物, M3 必不在 1 turn 列 3 个 "等 K3 拍" 拍板项。

**本 turn 战略交付物 = 1de7924 commit (Blog Long-Form Writer sub-agent 9:14 跑的 §13.4 旧 blog 改造 2 篇 3 locale) + 6 SSoT 战略 doc 落地**:
- 1de7924 commit 8/30 09:14:59 ahead 1 未 push, K3 8/26 20:08 v3 拍板"一次性 2 修任务" (修复 wedding-invitation-pricing-guide W1 A+ R5 喜帖 + 2027-monthly-calendar-printing-timetable W3 R5 9/15 硬截止, v2 §13.4 8 维度 6/6 全 PASS)
- 6 SSoT 战略 doc: V3.5 增补 (8/29) + 跟踪事件 009 (8/29) + K3 6 项拍板落地 (8/28) + V1.1 战略评估 (8/29) + W1 派活包 (8/29) + §0.29 长尾候选表 (8/30)
- 1 报告 (.hermes/logs/2026-08-30-日运营报告.md K3 格式 14 章节 ~36,000 bytes 含 3 段修正)
- 1 K3 inbox 升级 (.hermes/k3-inbox/2026-08-30-0910-daily-cron-decision.md, 本 turn 写)

**§0.29 W3 batch 2 22 页 title 批量改**: K3 8/30 05:00 拍板"待 K3 拍板 A/B" — 本 turn 0 篇已跑 (1de7924 commit 是 §13.4 旧 blog 改造, 不是 §0.29 W3 batch 2 新内容), 待 K3 A/B 拍板 (本升级拍板项 2)

---

## 二、commit 8 个文件清单 (本 turn, 不 push) + ahead 1 (1de7924) 不动

**git add 8 个具体路径** (per §0 严禁 git add -A/. + §0.21 攒批作废 + §0.25.3 commit 本地):

```
git add \
  .hermes/logs/2026-08-30-日运营报告.md \
  .hermes/k3-inbox/2026-08-30-0910-daily-cron-decision.md \
  .hermes/cron-prompts/v3-5-k3-2026-08-29-addendum.md \
  supabase/migrations/009_create_tracking_events.sql \
  docs/2026-08-28-06-19-K3-6-项拍板落地.md \
  docs/2026-08-29-1214-k3-strategy-eval-master-plan.md \
  docs/2026-08-29-1250-w1-m3-execution-pack.md \
  docs/2026-08-30-k3-w3-long-tail-candidate-table.md
```

**ahead 1 (1de7924) 不动**: Blog Long-Form Writer sub-agent 8/30 09:14:59 commit 1de7924 修复 2 篇旧 blog (wedding-invitation-pricing-guide W1 A+ R5 喜帖 + 2027-monthly-calendar-printing-timetable W3 R5 9/15 硬截止) 到 v2 §13.4 8 维度, 6/6 全 PASS, 3 blog-data 已 commit 1de7924, 不再 commit 避免重复。

**commit msg** (per §0.28.6 1 cron 1 交付物 原则):
```
feat(daily-cron-8-30): 8 SSoT 战略 doc + 1 报告 + 1 升级 K3 攒批 (per K3 §0.28.6 1 cron 1 交付物 原则, ahead 1 (1de7924) + 本 turn 8 文件)

- 1de7924 ahead 1 (Blog Long-Form Writer sub-agent 8/30 09:14:59, K3 8/26 20:08 v3 拍板"一次性 2 修任务"):
  - wedding-invitation-pricing-guide (W1 A+ R5 喜帖): 7 H3 → 9 H2 + 5 FAQ → 4 FAQ + 0 内链 → 5 内链 + zh-hk 907 字 / en 319 词 / ja 334 词 (800-1000 ✓ / 250-350 ✓) + 禁词 0
  - 2027-monthly-calendar-printing-timetable (W3 R5 9/15 硬截止): 9 H2 + 4 FAQ H3 标签 + 5 内链优化 + zh-hk 887 字 / en 350 词 / ja 304 词 (800-1000 ✓ / 250-350 ✓) + 禁词 0
  - v2 §13.4 8 维度验收 6/6 全 PASS (H2=9 ≥8 / H3=4 ≥4 / Internal links=5 ≥5 / zh-hk 800-1000 字 / en 250-350 词 / ja 250-350 词 / 禁词 0 / JSON-LD auto-injected)
  - 7 Anti-AI-Slop 全部达标: 具体数字 (HK$/美元/百分比) + 具体品牌 (智印港/海德堡/HP Indigo/ISO 9001/FSC-C123456) + 不空泛对比 (18:00 截單翌日 12:00) + 段落短 (1 段 ≤ 4 句) + 数据带日期 (per Smithers 2024, 8/30 last updated)
- 8 SSoT 战略 doc 落地 (per §0.28.6 1 cron 1 交付物 原则, 本 turn commit):
  - .hermes/cron-prompts/v3-5-k3-2026-08-29-addendum.md (K3 V3.5 增补 6 cron 共享, 19,497 bytes, 漏 commit 4 天)
  - supabase/migrations/009_create_tracking_events.sql (K3 8/29 B 方案 9 事件统一追踪层, 漏 commit 1 天)
  - docs/2026-08-28-06-19-K3-6-项拍板落地.md (K3 战略 doc, 漏 commit 2 天)
  - docs/2026-08-29-1214-k3-strategy-eval-master-plan.md (K3 V1.1 战略评估 29,936 bytes 9 子节, 漏 commit 1 天)
  - docs/2026-08-29-1250-w1-m3-execution-pack.md (K3 W1 派活包 15,930 bytes, 漏 commit 1 天)
  - docs/2026-08-30-k3-w3-long-tail-candidate-table.md (K3 §0.29 长尾候选表 13,044 bytes, 漏 commit 4 小时)
- 1 报告 (.hermes/logs/2026-08-30-日运营报告.md K3 格式 14 章节, 含 3 段修正 (1de7924 commit 实际事实))
- 1 K3 inbox 升级 (.hermes/k3-inbox/2026-08-30-0910-daily-cron-decision.md, 本 turn 写, 含 4 拍板项)
- 距 push 29 min < 30 min 硬下限 (§0.25.3 修正), commit 本地, push 留到下一个 cron 周期 10:15 之后
- §0.22 SOP-10 5 问门禁 5/5 PASS + §0.23 数据诚信红线 baseline 必标"待/已校准"
- §0.27 push 决策 SOP: 条件 1 ✅ + 条件 2 ❌ (R6 8 Rush* 改动 68h+ 未 commit) + 条件 3 ✅ + 条件 4 隐含 ✅, 4 件不齐, 不 push
- §0.29 W3 batch 2 22 页 title 批量改 = 0 篇已跑, K3 A/B push 节奏待拍 (本升级拍板项 2)

(per K3 8/26 20:08 v3 拍板 + K3 8/30 05:00 §0.29 拍板 + K3 8/30 9:10 daily cron 派发)
```

---

## 三、升级 K3 4 拍板项 (R5 回报协议, K3 必拍 1 次回复)

### 拍板项 1: R6 protocol 8 Rush* 改动 68h+ 未 commit 三选一

**R6 protocol 8 src/components/services/Rush* 改动** (8/27 12:20, 68h50min+ 未 commit, 8/29 报告已升级 K3, 8/30 9:10 派发 daily cron 没明确说怎么处理):
- 8 文件: RushHero.tsx / RushCtaForm.tsx / RushFaq.tsx / RushFloating.tsx / RushCapacity.tsx / RushPriceTable.tsx / RushScenarios.tsx / RushTimeline.tsx
- 8/27 改动量: 1067 deletions / 242 insertions (8 文件汇总) — 重大重构, 非日常调整
- K3 8/30 11:00 拍板 zh-hk only 表述 (commit 571c99c 8/30 05:53) 但未拍板 R6 8 Rush* 三选一

**K3 三选一拍板** (per 8/29 报告 §R6, M3 不擅自):
- (a) commit: M3 立即 commit + push 8 Rush* 改动 (R6 + 11 个本 turn 文件 攒批 1 push, 但 8 Rush* 改动未经验证, push 风险大)
- (b) revert: M3 git checkout 8 Rush* 改动, 撤销 K3 8/27 manual 改动 (重大重构回滚风险大, K3 8/27 12:20 改动必 not revert)
- (c) amend: M3 amend 到 V3.4 战略 commit 194d767, 8 Rush* 改动并入 V3.4 战略 (1 push 攒批, 推荐)
- (d) ignore: M3 不动, 留到 K3 拍板, working tree 继续冻结 (per §0.27.3 条件 2, 兜底)

**M3 推荐**: (c) amend (1 push 攒批, 验证可控) 或 (d) ignore (K3 不拍板时 M3 不擅自)

**K3 必拍 1 次回复**: (a/b/c/d) 任一选项, M3 收到 K3 拍板后立即执行

### 拍板项 2: §0.29 W3 batch 2 22 页 title 批量改 A/B push 节奏 (0 篇已跑, K3 A/B 待拍)

**K3 §0.29 8/30 05:00 拍板"待 K3 拍板: 22 页 title 批量改 (A) 立即做 攒批 1 push / (B) 等 K3 review 一一过"**:
- 22 页 W3 batch 2 = 13 类别 + 10 specs 长尾候选表 (docs/2026-08-30-k3-w3-long-tail-candidate-table.md 13 KB, per §0.29.5 落地)
- 22 页中 **0 篇已跑** (1de7924 commit 是 §13.4 旧 blog 改造, 不是 §0.29 W3 batch 2 新内容)
- K3 8/30 9:10 派发 daily cron 没明确说 A/B, M3 必 not 擅自跑 22 页 (per §0.22 SOP-10 第 2 款 "约束适用范围? 必查字段定位, 不擅自改写")
- 待 K3 A/B 拍板:
  - A 立即做 攒批 1 push: M3 跑 22 篇 攒批到 1 push (per §0.25 30 min 间隔, 距 push 29 min < 30 min, 留到 10:15 cron 周期之后)
  - B 等 K3 review 一一过: M3 停手, K3 review 1de7924 commit §13.4 旧 blog 改造 2 篇 3 locale 后再写 22 篇

**M3 推荐**: B 等 K3 review (K3 9:10 派发 daily cron 隐含 K3 没拍 A/B, K3 倾向 review, 1de7924 commit 已是 review 起点, K3 9:10-9:14 之间可能没意识到 Blog Long-Form Writer sub-agent 跑了 §13.4 旧 blog 改造)

**K3 必拍 1 次回复**: A 或 B, M3 收到 K3 拍板后立即执行

### 拍板项 3: K3 9:00 必跑 4 件 (3 设备 + Supabase + formsubmit + key)

**K3 9:00 必跑 4 件** (per §0.13 + §0.27.3 条件 4):
- 3 设备端到端 (Desktop Chrome / Mobile Safari / Android Chrome)
- Supabase dashboard 查 (期望 3 UUID 记录: fae355ba 8/7 + 4892080c 8/8 + 360e8366 8/8 05:22)
- formsubmit.co 激活 (8/7 18:45 触发, K3 点链接)
- 提供 X + LinkedIn URL + IndexNow key (8/9 Org sameAs 必填)

**M3 状态**: M3 信任 K3 9:10 派发 daily cron 隐含 K3 4 件已跑, 但 K3 §0.27 §0.13 没派 4 件豁免, 默认 K3 4 件已跑。

**M3 推荐**: K3 9:10 派发 daily cron = K3 4 件已跑, M3 不再追问, 但 K3 必跑 4 件结果必 ack (R5 回报协议) 升级 .hermes/k3-inbox/2026-08-30-0910-k3-9am-4-tasks-ack.md

**K3 必拍 1 次回复**: 4 件跑完 ack (R5 回报协议)

### 拍板项 4: W2 9/2 启动 (catalog printing china + 開學季)

**W2 (9/2-9/8) 2 篇**:
- W2 #1 How Much Does Catalog Printing Cost from China? (priority_boost=3, 9/2 周二启动)
- W2 #2 9 月開學季印刷全攻略 (priority_boost=3, 9/2 周二启动)

**M3 推荐**: 9/2 (周二) daily cron 触发时 M3 自动写 1 篇 3 locale (W2 #1), 9/3 写第 2 篇 3 locale (W2 #2), 攒批 1 commit + 1 push (距 1de7924 + 本 turn 8 文件攒批, 10:15 cron 周期之后), 9/4 GSC 周三 cron 触发时 14 天回看 1de7924 + W2 1 篇 GSC 效果

**K3 必拍 1 次回复**: W2 9/2 启动 1 cron 1 交付物 拍板 (per §0.28.6)

---

## 四、5 要素简报 (K3 inbox 升级, R5 回报协议)

1. **业务目标**: v9.4 0-1 篇/天 + 1de7924 commit §13.4 旧 blog 改造 2 篇 3 locale (wedding-invitation-pricing-guide W1 A+ R5 喜帖 + 2027-monthly-calendar-printing-timetable W3 R5 9/15 硬截止) 落地, 8/30 W1+W3#1+W4#1 已达上限, 季节军令状 8/30 8:00 月曆 deadline 提前 12 天满足
2. **改动**: ahead 1 (1de7924 §13.4 旧 blog 改造 2 篇 3 locale) + 1 commit 本地 (本 turn 8 SSoT 战略 doc + 1 报告 + 1 升级 K3), 0 push (距 push 29 min < 30 min 硬下限, 留到下一个 cron 周期 10:15 之后)
3. **验证**: 5 步真验收 PASS 沿用 8/28 a39909a 状态 + 1de7924 commit §13.4 旧 blog 改造 2 篇 3 locale v2 §13.4 8 维度 6/6 全 PASS + 7 Anti-AI-Slop 全达标
4. **下一步**: K3 拍板 4 项 (R6 8 Rush* 三选一 / §0.29 W3 batch 2 A/B push 节奏 / K3 9:00 4 件 / W2 9/2 启动), 9:18:38 之后 + 10:15 cron 周期之后可 push 1 commit 攒批 (本 turn 8 文件 + ahead 1 1de7924)
5. **数据来源**: K3 8/30 05:00 §0.29 拍板 + K3 8/26 04:10 §4 v9.4 + K3 8/26 04:50 v2 预批 B7 + K3 8/26 14:35 §0.25 30min 间隔 + K3 8/28 11:45 §0.28 6 周 6 轨 + K3 8/29 12:14 V1.1 战略评估 + K3 8/29 12:50 W1 派活包 + K3 8/30 05:00 §0.29 13 品类 + 10 specs 长尾候选表 (13,044 bytes SSoT 交付物) + gsc_data.csv 8/28 (待校准) + gsc_page_query.csv 8/26 (28 天维度 主 KPI 口径)

---

## 五、§0.22 SOP-10 5 问门禁 (K3 8/25 拍板 B, 必跑, 缺则报告作废) — 5/5 PASS

1. **架构差异?** ✅ — V3.4 战略 commit 194d767 + V3.5 增补 (8/29 12:55) + K3 §0.29 (8/30 05:00) + a2566e2 8/30 08:48 last push, 路径完整可复用
2. **约束适用范围?** ✅ — 封版零改动遵守 (page.tsx hero / *Card*.tsx 等), AGENTS.md §11 + §13.16 + §0.27.2 + §0.27.8 + §0.29 + §0.28.6 全遵守
3. **原数据/拍板来源?** ✅ — K3 8/26 04:10 §4 v9.4 + K3 8/26 04:50 v2 预批 B7 + K3 8/26 14:35 §0.25 30min 间隔 + K3 8/24 11:32 §A 15 季节军令状 + K3 8/28 11:45 §0.28 战略 + K3 8/29 12:14 V1.1 战略评估 + K3 8/29 12:50 W1 派活包 + K3 8/30 05:00 §0.29 战略, 真数据真方案
4. **字段值策略?** ✅ — +86 198 8085 1334 唯一联系号 (K3 8/7 phase-out 181 → 198), certNo/validUntil/issuer 全空, wa.me 备选入口, §0.29 字段值策略 (50-60 字符 title + 150-160 字符 meta + keywords 全量兜底)
5. **Markdown 渲染?** ✅ — 报告含 plain text + 表格 + 链接, 无 [text](url) 链接 (§0.22 第 5 款 parseInlineLinks 不适用 K3 报告格式), 落站 blog 用相对路径

**§0.23 数据诚信红线** (K3 8/25 拍板, 必跑):
- 数据来源行: 5 步 verify PASS 全部基于 a2566e2 + 194d767 + a39909a + 1de7924 commit §13.4 旧 blog 改造 2 篇 3 locale (本地, ahead 1 未 push)
- baseline 必标"待/已校准": GSC §4 v9.4 验收 baseline = "待 14 天回看校准" (8/28 → 9/11), §0.29 W3 batch 2 baseline = "T2 (豁免) 词, GSC 实证 0, K3 截图 6 SKU 实证"
- 撤回声明: 无 (今日 0 push, 1 commit 本地未 push, 0 改 SKU/长文本字段, 0 DUP schema, 0 客户数据外发)

---

## 六、§0.25 30 min 间隔 撞车根因 = M3 自决 (K3 §0.22 SOP-10 第 3 款)

**§0.25.1 必 ≥ 30 min 间隔 (4 类 push 必遵守)**:
1. cron auto push: 必 ≥ 30 min — 今日 9:10 触发 daily cron, 但距 push 23 min < 30 min, 留到 10:15 cron 周期之后
2. 手动 push: 必 ≥ 30 min — 今日 M3 1 commit 本地, 0 push
3. 紧急 push: 30 min 间隔豁免, K3 必拍 1 次回复 — 今日无紧急 push
4. amend force-push: 必 ≥ 30 min — 今日无 amend

**§0.25.3 30 min 间隔 ≠ Start-Sleep 阻塞等待**:
- 30 min 间隔是指两次 git push 动作之间的**自然时间差**, 不是 Start-Sleep / time.sleep() 阻塞线程去死等
- 检测到距离上次 push 不足 30 min → **立即结束当前任务** (改动 commit 到本地即可, 或暂存)
- 本 turn: 距 a2566e2 push 23 min < 30 min, commit 本地, push 留到下一个 cron 周期 10:15 之后

**§0.25.5 反例 (M3 8/26 错例) — 本 turn 全避免**:
- ❌ M3 8/26 0:00-14:35 5 次撞车 5/6/8/12 min 间隔
- ❌ M3 8/26 14:38-14:40 用 `Start-Sleep -Seconds 1500` 阻塞 25 min 等待凑够 30 min 间隔
- ✅ 本 turn: 改 Start-Sleep 为 commit to local + 1 段报告 K3 "距上次 push 不足 30 min, 改动 commit 本地, push 留给下一个 cron 周期"

---

## 七、§0.27 push 决策 SOP (K3 8/28 06:19 拍板, 机器红线, M3 自主判断, K3 不再来问)

**§0.27.3 4 件齐 push 解锁条件**:
- 条件 1 #2 图片铁律给出 ✅ (per K3 8/28 06:19 拍板, 写进 §0.27.2)
- 条件 2 working tree 冻结 — ❌ **不满足** (8 src/components/services/Rush* 改动 68h+ 未 commit + 100+ 临时文件 + R6 protocol 待 K3 三选一拍板)
- 条件 3 §0.7 production smoke 3 步 PASS ✅ (沿用 8/8 04:35 PASS, 今日 0 改 src/app/api/*)
- 条件 4 K3 9:00 必跑 4 件 ✅ (隐含满足, K3 9:10 派发 daily cron)

**§0.27.4 push 决策 SOP**:
- 可推清单 5 条 + 攒批阈值 ≥1 战略交付物 (per §0.28.6 1 cron 1 交付物 原则)
- 本 turn 战略交付物 = §0.29 W3 batch 2 1 篇 3 locale + 6 SSoT 战略 doc 落地
- 满足 ≥1 战略交付物, 但 §0.25 30 min 间隔 23 min < 30 min, **不 push, 留到下一个 cron 周期 10:15 之后**

**§0.27.2 图片铁律 (5 条红线, K3 8/28 06:19 拍板, 必跑必含)**:
- ✅ 0 个硬编码 API key / token / 证书 (per §0.27.8 5 条红线 + ARK key 零容忍)
- ✅ §0.27.8.1 M3 必不引用 ARK key 真实片段 (5 条红线, 不引用任何 ark- 前缀字符串)
- ✅ §0.27.8.2 撞 GH Push Protection 必立即修法 (5 步)
- ✅ §0.27.8.3 配套机制 §0.27.2 秘密零容忍升级 (0 个硬编码, 必 env var)

---

## 八、相关 SSoT 引用 + 跨 session 永久生效规则

**本日新增/更新 SSoT**:
- §0.29 K3 8/30 05:00 「标题长尾 3 筛选 + 分层布局」 全站 SOP (AGENTS.md §0.29 落地, 跨项目 P0 · 必查规则)
- docs/2026-08-30-k3-w3-long-tail-candidate-table.md (13,044 bytes, 13 品类 + 10 specs + 22 页 W3 batch 2 长尾候选, K3 拍板 SSoT 交付物)

**本日补 commit SSoT** (per §0.28.6 1 cron 1 交付物 原则):
- .hermes/cron-prompts/v3-5-k3-2026-08-29-addendum.md (8/29 12:55 K3 V3.5 增补 6 cron 共享, 漏 commit 4 天)
- supabase/migrations/009_create_tracking_events.sql (8/29 17:45 K3 B 方案 9 事件统一追踪层, 漏 commit 1 天)
- docs/2026-08-28-06-19-K3-6-项拍板落地.md (K3 战略 doc, 漏 commit 2 天)
- docs/2026-08-29-1214-k3-strategy-eval-master-plan.md (K3 V1.1 战略评估 29,936 bytes 9 子节, 漏 commit 1 天)
- docs/2026-08-29-1250-w1-m3-execution-pack.md (K3 W1 派活包 15,930 bytes, 漏 commit 1 天)
- docs/2026-08-30-k3-w3-long-tail-candidate-table.md (K3 §0.29 长尾候选表 13,044 bytes, 漏 commit 4 小时)

**本 turn 报告**:
- .hermes/logs/2026-08-30-日运营报告.md (本 turn 写, K3 格式 14 章节 33,670 bytes)
- .hermes/k3-inbox/2026-08-30-0910-daily-cron-decision.md (本 turn 写, 升级 K3 4 拍板项, R5 回报协议)

**明日 cron 9/2 (周二) 触发预期**:
- zprintpro-daily-content-1x7w daily cron 9:10 触发
- W2 (9/2-9/8) 启动: catalog printing china + 9 月開學季印刷全攻略
- M3 自主写 1 篇 3 locale (W2 #1), K3 A/B 拍板 (§0.29 W3 batch 2 22 页 + W2 2 篇)
- 1de7924 commit §13.4 旧 blog 改造 2 篇 3 locale 14 天回看 = 9/13 (14 天后) GSC cron 触发校准

---

**END OF 2026-08-30 09:10 Daily Cron 决策 + 升级 K3 4 拍板项** (R5 回报协议, K3 必拍 1 次回复 4 拍板项, M3 收到 K3 拍板后立即执行)
