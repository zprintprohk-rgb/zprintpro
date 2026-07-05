# 教科書模板套用方案审计报告

**审计日期**: 2026-07-05 05:30 (Asia/Shanghai)
**审计对象**: `.hermes/cron-prompts/mavis/*.md` × 4 + `.hermes/CONTEXT.md`
**审计范围**: 4 个 zprintpro cron 模板（daily-content-evolve / weekly-meta-refresh / gsc-feedback-loop / monthly-matrix-audit）+ 顶层 CONTEXT.md

---

## 0. 审计结论摘要

| 级别 | 数量 | 必修? |
|------|------|--------|
| **P0 必修（直接冲突 / 硬约束脱节）** | **3** | 必修 |
| **P1 建议修（一致性 / 时效性）** | **5** | 建议 |
| **P2 可选修（小瑕疵）** | **3** | 可选 |

**关键发现**: **CONTEXT.md v2 与 4 个 prompt v3 直接矛盾** — CONTEXT.md §4 / §7 仍要求"标题强制带深圳"，4 个 prompt 都已写"严禁硬塞深圳"(2026-07-05 user 拍板修正)。这会导致 cron 启动时按 CONTEXT.md v2 走，违反 user 拍板。

---

## 1. 审计对象清单

```
.hermes/
├── CONTEXT.md                              # 顶层上下文 (v2, 2026-07-04)
└── cron-prompts/mavis/
    ├── daily-content-evolve.md             # v3 (114 行, 6864 bytes)
    ├── weekly-meta-refresh.md              # v3 (73 行, 3892 bytes)
    ├── gsc-feedback-loop.md                # v3 (84 行, 3674 bytes)
    └── monthly-matrix-audit.md             # v3 (91 行, 4411 bytes)
```

---

## 2. P0 必修（3 项）

### 🔴 P0-1: CONTEXT.md §4 Sub-task A 与 prompt §硬约束 #6 直接冲突

**CONTEXT.md §4 Sub-task A 第 4 条**（旧规则 v2）:
```
- ✅ **标题强制带"深圳"**：`<主关键词> · 深圳印刷指南 | 智印雲 ZprintPro`
```

**daily-content-evolve.md 第 13-17 行**（新规则 v3）:
```
6. 严禁标题硬塞 "深圳" / "Shenzhen Printing" / "深圳印刷" 作 supplier origin 前缀
   (2026-07-05 user 拍板修正):
   - zh-hk 标题 → 香港场景关键词
   - en 标题 → 全球通用卖点 (size/paper/design/material),不写地区后缀
   - ja 标题 → 日本市场卖点,不写"中国/深圳"
   - NAP 真实地址仅写在 footer / contact / schema (法务),不写 SEO 内容
```

**矛盾点**: user 2026-07-05 已拍板禁止"深圳"在标题，但 CONTEXT.md 仍要求强制带"深圳"。
**风险**: cron 启动读 CONTEXT.md → 套用"深圳"模板 → 违反 user 拍板 → 实际今天已发生（restaurant-opening-flyer-printing-guide zh-hk 页面"深圳餐饮开业旺季"被用户截图指出）。
**修复**: CONTEXT.md §4 Sub-task A 第 4 条改为 v3 规则。

### 🔴 P0-2: CONTEXT.md §7 调度算法 Rule 4 仍要求"标题必须含深圳"

**CONTEXT.md §7 pick_next_blog_topic 函数**:
```python
# Rule 4: 标题必须含"深圳"
cat.title_template = "<kw> · 深圳印刷指南 | 智印雲 ZprintPro"
```

**风险**: cron 启动可能跑此算法 → 直接生成"深圳"硬塞的标题。
**修复**: 删除 Rule 4，改成"按 locale 本地化（见硬约束 §1 #6）"。

### 🔴 P0-3: CONTEXT.md 顶部版本号过期

**CONTEXT.md 顶部注释**:
```
**Updated**: 2026-07-05 (v3 — 豆包 4 项能力 + 标题本地化 + 内链矩阵)
```

但 **§4 Sub-task A 第 4 条仍写"标题强制带深圳"**（v2 残留），矛盾 → 实际是 v2 + v3 混合体。
**修复**: 统一更新到 v3，并把所有 v2 残留扫除。

---

## 3. P1 建议修（5 项）

### 🟡 P1-1: 模型分级错误

**CONTEXT.md §9**:
```
| 普通检索 / 文案 / 数据整理 | **deepseek-v4-flash** | 默认主力 |
| SEO 方案 / 邮件润色 / 架构优化 | **deepseek-v4-pro** | 攻坚场景 |
| 高转化开发信终审 / 核心页面架构 | GLM 5.2 Coding | 必须 user 批准 |
```

**实际问题**: Mavis 当前实际模型是 **MiniMax-M3** (MiniMax-M2.7 thinking)，不是 deepseek/GLM 系列。模型名称过时。

**4 个 prompt** 的"模型分级"段同病：
- daily 第 103-106 行
- weekly（无模型段）
- gsc（无模型段）
- monthly（无模型段）

**修复**: 把模型分级改成"MiniMax-M3 (默认)"或直接删掉这 4 个 prompt 的模型分级段（4 个 prompt 大部分没写，避免不一致）。

### 🟡 P1-2: weekly 7 步 verify 与 daily 不统一

**daily §7 步 verify 第 5 步**:
```
5. curl -s <url> | grep -E "Article|BreadcrumbList|FAQPage" ≥ 3
```

**weekly §7 步 verify 第 5 步**:
```
5. curl -s <url> | grep -E "Article|BreadcrumbList" ≥ 2
```

**矛盾**: weekly 比 daily 宽松（少 1 个 schema + 阈值低 1）。
**修复**: weekly 改成 ≥ 3 + 加 FAQPage，与 daily 一致。

### 🟡 P1-3: daily Sub-task C 与 weekly 任务 2 功能重叠 / 时间冲突

**daily Sub-task C** (周一专属):
```
## Sub-task C: Category Meta Refresh (周一专属 · 30 min)
- H1 加 1 个行业最广关键词
- meta description 加 1-2 个高频行业长尾
- 新增"服务行业"区块
```

**weekly 任务 2** (每周一 11:00):
```
## 2. 类目页 meta refresh (30 min)
- H1 加 1 个 Tier B 行业最广关键词
- meta description 加 1-2 个高频行业长尾
- 新增"服务行业"区块
```

**矛盾**: daily 跑在 10:15（先），weekly 跑在 11:00（后）。两个 cron 都在修改类目页 H1/meta description，可能相互覆盖。
**修复**: 在 daily Sub-task C 头部加"⚠️ daily Sub-task C 与 weekly 任务 2 重复。daily 跑 GSC top 3 类目，weekly 跑 Tier B 行业类目。两者按域分工避免 H1/meta 冲突。"

### 🟡 P1-4: 完成标准量化程度不一

- daily: "≥1 篇博客 + 2 SKU + matrix.json + 日报" ✅ 量化
- weekly: "top 3 类目 + ≥5 条内链 + 周报" ✅ 量化
- gsc: "matrix.json 已更新 + 日报 + 给 daily 建议" ⚠️ 偏弱（"建议"无量化）
- monthly: "月报 + matrix + ≥5 篇孤儿博客 + 飞书通知(可选)" ✅ 量化

**修复**: gsc 完成标准加上"priority_boost 变更清单条数 ≥ 1（无 GSC 信号时跳过）"。

### 🟡 P1-5: R6 cron 出口"累积跳过次数"参数应该统一表述

| Cron | 累积跳过次数 | 周期 |
|------|--------------|------|
| daily | 7 次 | 7 天 |
| weekly | 4 次 | 4 周 |
| gsc | 4 次 | 4 周 |
| monthly | 12 次 | 12 月 |

实际都合理（不同周期），但描述不一致。修复：用同一句话表述"累积 N 次跳过（本周期覆盖） → mavis cron delete mavis <cron-name>"。

---

## 4. P2 可选修（3 项）

### 🟢 P2-1: 4 个 prompt 没都引用 AGENTS.md §13.4 v2 纯文字博客规范

- daily Sub-task A 第 30 行：✅ "严格按 AGENTS.md §13.4 v2 写内容"
- weekly / gsc / monthly：❌ 无引用

**修复**: monthly "内容质量自迭代"任务里加"参考 AGENTS.md §13.4 v2 纯文字博客规范"。

### 🟢 P2-2: "硬约束"编号 4 个 prompt 不完全一致

- daily: 1-6（6 条）
- weekly: 1-5（5 条）
- gsc: 1-5（5 条）
- monthly: 1-5（5 条）

daily 多"严禁修改业务核心路由"那条。其他 3 个没写。修复：weekly/gsc/monthly 也加这条。

### 🟢 P2-3: monthly "5 选做" 任务过于模糊

monthly 任务 4 "Tier B 行业博客补充" 写"如果某个 Tier B 行业在 matrix 里 priority_boost ≥ 3 但无着陆页 → 触发 Sub-task A 类似流程写 1 篇"。"Sub-task A 类似流程"指代不清（Sub-task A 是 daily 的，不是 monthly 的）。修复：明确说"触发 daily cron 写一篇"。

---

## 5. 验证矩阵（修复后确认）

| 验证项 | 修复前 | 修复后 |
|--------|--------|--------|
| CONTEXT.md §4 Sub-task A "强制带深圳" | ❌ 仍存在 | ✅ 删除 / 改为按 locale 本地化 |
| CONTEXT.md §7 Rule 4 "标题必须含深圳" | ❌ 仍存在 | ✅ 删除 |
| CONTEXT.md 版本号与正文一致性 | ❌ v2 + v3 混合 | ✅ v3 全部对齐 |
| 4 个 prompt 模型分级与 MiniMax-M3 一致 | ⚠️ deepseek/GLM (过时) | ✅ 删掉或改为 MiniMax-M3 |
| weekly 7 步 verify schema grep | ❌ ≥ 2 | ✅ ≥ 3 + FAQPage |
| daily Sub-task C ↔ weekly 任务 2 冲突标注 | ❌ 无 | ✅ 加边界说明 |
| 4 个 prompt 引用 AGENTS.md §13.4 v2 | ⚠️ 仅 daily | ✅ 4 个都引用 |
| 4 个 prompt 硬约束 ≥ 6 条（含不改路由） | ⚠️ daily 6 / 其他 5 | ✅ 4 个都 6+ |

---

## 6. 修复优先级清单

按 ROI：

1. **P0-1, P0-2, P0-3**（3 项必修，60 min）
2. **P1-1, P1-2, P1-3**（3 项建议，30 min）
3. **P2-1, P2-2**（2 项可选，15 min）
4. **总计**: 约 105 min 工作量

**不建议本期做**: P1-5（R6 出口参数微调）、P2-3（月度任务描述模糊化） — 优先级太低，下次审计再做。

---

## 7. 修复后 cron 行为预测

修复 + commit + push 之后：

- `zprintpro-daily-content-evolve` 启动读 `CONTEXT.md` → 看到 v3 规则"严禁硬塞深圳" → 写 zh-hk 标题用香港场景，en 标题不写地区，ja 标题不写中国/深圳
- `zprintpro-weekly-meta-refresh` 启动 → verify 步骤 grep ≥ 3 schema（含 FAQPage）
- 4 个 prompt 模型描述对齐 MiniMax-M3（实际使用模型）
- 4 个 prompt 硬约束对齐 6+ 条（含"严禁改路由"）
- 不再产生"深圳"硬塞的标题（这是 2026-07-05 之前的最大隐患）

---

**Author**: Mavis orchestrator (user 授权)
**Next step**: 立即执行 P0 + P1 修复 → commit → push → 监控 CF build