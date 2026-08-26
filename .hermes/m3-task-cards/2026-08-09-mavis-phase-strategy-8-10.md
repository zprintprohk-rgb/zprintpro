# Mavis 战略大脑 · 8/10-8/12 阶段策略 (M3 自主抓取, 千问 3.8 互补)

> **签发**: Mavis (战略规划大脑) · 2026-08-09 18:23
> **互补**: 千问 3.8 战略 8/9 18:18 落盘 (`2026-08-09-qwen38-phase-strategy-8-10.md`)
> **本文件角色**: Mavis 战略补充 (架构级 + 闭环机制 + 1 周节奏)
> **抓取方**: M3 (执行体) — 每次调度扫 `m3-task-cards/` 最新日期文件, 自主闭环
> **生效**: 2026-08-09 → 2026-08-12 复盘日

---

## §0 K3 8/9 18:23 战略反馈吸收 (Mavis 视角)

**K3 18:23 拍板接受率 100%** (与千问战略一致):
- ✅ 整合 push 7 项落地 P0 (locale-aware siteName 是 GEO 实体一致性核心)
- ✅ retrofit 收官 6/6 P1 (8/10 cmyk / 8/11 paper / 8/12 same-day)
- ✅ CF Bulk Redirects P2 (K3 手动, 5 分钟)
- ✅ GMC 诊断观察 (整合 push 后 24h)

**K3 架构级变化 (18:23 拍板)**:
- ✅ **M3 自主抓取 `m3-task-cards/` 目录** (K3 不再转发, 闭环成立)
- ✅ Mavis 写 m3-task-cards/ → M3 抓取执行 → M3 写 reports/k3-inbox/ → Mavis 评估 → 写新 m3-task-cards/
- ✅ 千问 3.8 也走 m3-task-cards/ (战略大脑分工: Mavis = 战略 + 闭环, 千问 = 战术 + 排期)

**2 处台账纠偏 (千问已落盘, M3 必执行)**:
1. **8/9 push 实际 = 2 次** (0d46a4c + a69f0c1), 报告虚报 1/5, 自 8/10 起按 git log 实际计数
2. **转化验证 soft vs hard 分层**: step1 CTA href 200 + step2 quote form 存在 = hard; step3 GA4 + step4 wa.me = soft (不计入 verified 判定)

---

## §1 Mavis 战略补充 (与千问互补, 3 个差异点)

### 差异 1: M3 自主抓取闭环 (架构级, 千问没明说)

**当前架构问题**: 千问 8/9 18:18 战略 → K3 18:23 转发 → M3 18:23 接收 (3 跳延迟, 复制粘贴成本)

**Mavis 8/9 18:23 拍板架构** (K3 已 OK):
1. Mavis 写 `m3-task-cards/YYYY-MM-DD-{role}-phase-NN.md`
2. M3 cron 触发时**自动扫本目录最新日期文件** (M3 自主闭环)
3. M3 跑完写 `reports/` + `k3-inbox/`, 标记 m3-task-cards/ 完成态
4. Mavis 下一轮扫 reports/ 评估 → 写新 m3-task-cards/ (战略 + 闭环)

**实施**: 8/10 起 cron v9.0 → v9.1 升级, 含 m3-task-cards/ 扫取机制 (见 §4)

### 差异 2: 1 周节奏模板 (千问给 8/10-8/12 3 天, Mavis 给 8/10-8/21 12 天双周)

**Week 1 (8/8-8/12) 当前**: K3 §0.13 4 字+①②③ 拍板 + 8/9 整合 push + 8/10-8/12 retrofit 收官 3/3
**Week 2 (8/13-8/21) 排期** (K3 8/8 07:12 拍板, §0.16 残留清理节奏):
- 8/13 batch 1: longDescription 200 处 (高流量 PDP 优先)
- 8/15 batch 2: description + faq 300 处
- 8/17 batch 3: schema 剩余 340 处
- 8/18 全量 grep 验收 = 0 (8/21 复盘硬指标)
- 8/19-8/20 缓冲
- 8/21 双周复盘 + 抓强监控汇总

### 差异 3: §0.19 用户暂停信号规则 (8/9 17:56 K3 痛骂教训)

**新固化规则** (MEMORY §0.19): K3/用户说"暂停"那一刻**立即 `mavis cron delete <self>`**, 不再 progress-tag 烧 token。

**M3 必做**: 任何 cron task prompt 开头加 §0.19 检查段 (用户 AFK 检测 + 立即自删 + 不发 progress tag)。

---

## §2 M3 自主执行任务 (Mavis 补充, 跟千问 T1-T5 互补)

### T6 · M3 自主抓取 m3-task-cards/ 目录机制 (8/10 起, 架构级 P0)

**cron v9.1 升级** (`.hermes/cron-prompts/zprintpro-daily-content-1x7w.md`):
1. 启动第 1 步: `ls -t .hermes/m3-task-cards/ | head -1` 找最新 m3-task-cards
2. 读 m3-task-cards 头部签发 + 角色 (Mavis / 千问 / K3)
3. 评估上次 cron 完成态 (reports/ + k3-inbox/ 最新日期)
4. 按 T1-T5 任务卡执行 (千问战略) + T6 自主抓取 (Mavis 战略)
5. 写本次 cron reports/ + k3-inbox/ + 标记 m3-task-cards/ 完成

**预验证 (8/10 触发前必跑)**: dry-run 一次, 验证 1-5 步都通, 落 `.hermes/reports/m3-autonomous-loop-dryrun-2026-08-10.md`

### T7 · cron v9.0 → v9.1 升级 (8/10 攒批, 跟整合 push 一起 1 push)

**新增段** (跟千问 T1-T5 互补):
- §v9.1.A M3 自主抓取 m3-task-cards/ 机制 (T6)
- §v9.1.B §0.19 用户暂停信号规则 (新固化)
- §v9.1.C dry-run 验证 SOP (T6 必跑)
- §v9.1.D 1 周节奏 (Week 1 + Week 2, per Mavis §1 差异 2)

**commit message**:
```
chore(cron): v9.0 → v9.1 升级 (M3 自主抓取 m3-task-cards/ + §0.19 暂停规则 + dry-run SOP + 1 周节奏)
```

**合并时机**: 跟整合 push 7 项一起 1 push (B 方案 1 amend 1 build, 节省配额)
- 但**前提**: K3 "1-5 OK" 触发后, M3 跑 cron v9.1 dry-run 通过再 commit

### T8 · m3-task-cards/ 目录历史清理 (8/10 攒批, 跟整合 push 一起 1 push)

**当前 18 个 m3-task-cards/ 文件** (7/21-8/9 历史):
- 大部分是 v6-v20 战略 (历史归档, 不再被 M3 抓取)
- 8/9-qwen38-phase-strategy-8-10.md 是最新 (Mavis 互补 + 千问战略)
- 建议清理: 7/21-7/26 15 个 v6-v20 战略移到 `m3-task-cards/_archive/` 子目录
- 保留 8/9 两份 (Mavis + 千问) 作为模板

**Mavis 视角**: 不立即清理, 留 K3 拍板 (跨项目惯例, 清理是 K3 责任, M3 不擅自改)

---

## §3 验收标准 (Mavis 补充, 跟千问 §3 互补)

| # | 项 | 标准 | 状态 |
|---|---|---|---|
| 1 | T6 自主抓取机制 | dry-run 报告 PASS (5 步全通) | 8/10 dry-run |
| 2 | T7 cron v9.1 升级 | 合并整合 push 1 commit, 跟 K3 8/9 拍板一起 | K3 触发后跑 |
| 3 | T8 m3-task-cards/ 清理 | K3 拍板, M3 跑 | K3 拍板后跑 |
| 4 | 千问 T1-T5 | 跟 Mavis 互补, 顺序跑 | 8/10 起 |
| 5 | 8/12 复盘 §0.10 校准 + §0.12 转化 | 7 项 PASS/FAIL + §9 路径推荐 | 8/12 0 push |

---

## §4 升级 K3 清单 (Mavis 视角, 跟千问 §4 互补)

### A. 拍板输入 (整合 push 触发条件, 阻塞 P0, 跟千问 §4.A 同)

1. X URL
2. LinkedIn URL
3. 15 SKU 改字审字 (草稿 k3-inbox 0400 + 0430)
4. Org sameAs 改 diff 审字
5. locale 切换 5 处审字 (草稿 k3-inbox 0712)
6. IndexNow key

**K3 回 "1-5 OK" + 1/2/6 → M3 立即整合 push (B 方案 1 push 1 build)**, 含 Mavis T7 cron v9.1 升级

### B. K3 手动操作 (跟千问 §4.B 同)

1. CF Bulk Redirects 上线 (5 分钟, 修正版)
2. formsubmit.co 激活邮件点链接
3. Supabase dashboard 查 4 链
4. 3 设备端到端
5. GMC 诊断页查被拒数

### C. m3-task-cards/ 历史清理 (Mavis 增量)

7. m3-task-cards/ 7/21-7/26 v6-v20 战略移到 `_archive/` 子目录 (T8)

### D. 无需 K3 动作 (M3 闭环)

- T1-T8 全部 (千问 T1-T5 + Mavis T6-T8)
- 台账纠偏 + 转化验证口径修正 + dry-run 预验证

---

## §5 风险与止损 (Mavis 补充, 跟千问 §5 互补)

- **整合 push K3 不拍板**: M3 继续 retrofit 主线 (8/10 cmyk), 不顺带 push locale 切换 (两条线解耦)
- **dry-run 失败**: 立即升级 K3, 不强行 commit
- **M3 抓取机制 bug**: 兜底 = M3 仍按 v9.0 cron prompt 跑, T6 失败不影响 retrofit 主线
- **§0.19 暂停信号**: K3 说"暂停"立即 `mavis cron delete <self>`, 不发 progress tag (避免 18 次空转)
- **8/9 retrofit 进度 3/6 真实**: 8/10 cmyk 是关键节点, 失败升级 K3

---

## §6 Mavis 战略汇总 (1 段)

整合 push 7 项是 GEO 实体一致性核心 (zh-hk 智印港 / ja ジープリント / en ZprintPro 三品牌分层从"文案"升级"schema + og + title 全站一致"), retrofit 6/6 收官是 P1 基础设施, 两条线解耦互不阻塞。M3 8/10 起自主抓取 m3-task-cards/ 目录形成闭环, 减少 K3 中间环节。8/21 校准 KPI 75% 维持同意, 真增量在 locale 切换 + 抓强 + 实体建设主线。

---

**EOF · .hermes/m3-task-cards/2026-08-09-mavis-phase-strategy-8-10.md**
