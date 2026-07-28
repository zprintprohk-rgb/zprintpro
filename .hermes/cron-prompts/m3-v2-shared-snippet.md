# M3 v2 master directive 公共段 (5 cron 共享) · 2026-07-28
# 提取源: m3-master-directive-v2-2026-07-28.md (L446-524)
# 用途: 5 cron prompt v2 升级 (daily/gsc/monthly/weekly/revenue)
# 同步: 2026-07-28 10:55 (K3 拍板 v2 替代 v1)

---

## 【2026-07-28 03:34 K3 master directive v2 同步 · 替代 v1 · SEO+GEO 双引擎】

v2 相对 v1 关键变化 (5 cron 必读):
- ✅ 加 §5 GEO 模板 (P3 校园 blog 必用, 6 硬约束) — 4 cron 知晓
- ✅ 加 §6 8/12 复盘验收表 7 项 — P4 + revenue 必报
- ✅ §7 升级 8 条 (5 红线 + 7.6 Rich Results / 7.7 内链 404 / 7.8 GSC 突降)
- ✅ §8 cron 同步 (加 once-9164ea P2 7/29 06:00 触发)
- ✅ §9 拍板 6 条 (v1 是 3 条)
- ✅ §10 时间轴 4 阶段 (细化 v1 §2)
- ✅ §11 内链验证协议 3 步 (v1 是 1 行)
- ✅ §12 报告格式 K3 14 章节 (v1 是 5 行)

---

## §5 GEO 模板 (P3 校园 blog 必用, 4 cron 知晓)

### §5.2 GEO 格式化写作模板 (每篇必遵循)
```
# {{H1: 包含核心实体 + 动作}}

{{首段: 50字内直接回答"这是什么/为什么需要"，AI 优先抓取首段}}

## {{H2: 用户会问 AI 的完整问题}}
{{回答段: 100-200字，包含具体数据点}}

### よくある質問 / FAQ
**Q: {{具体问题}}**
A: {{具体回答，含数字/时间/价格}}

**Q: {{具体问题}}**
A: {{具体回答}}

**Q: {{具体问题}}**
A: {{具体回答}}

## {{H2: 第二个用户问题}}
{{回答段}}

## 関連サービス / Related Services
- [{{实体名词短语锚文本}}](/{{locale}}/product/{{slug}}) ← 内链，curl 验证 200
- [{{实体名词短语锚文本}}](/{{locale}}/product/{{slug}})
```

### §5.3 GEO 内容硬性约束 (6 条)
| # | 约束 | 原因 |
|---|---|---|
| 1 | 每篇 ≥3 个 Q&A 段落 | AI 优先引用问答结构 (来源: 简米科技 GEO 指南) |
| 2 | 每篇加 FAQPage Schema (与 Q&A 一一对应) | AI 实体识别率 35%→85% (来源: 出海品牌 GEO 实操指南) |
| 3 | 每篇 ≥1 个可引用数据点 | AI 偏好有数据支撑的内容 |
| 4 | 内链锚文本 = 实体名词短语 | 禁止 "click here" / "了解更多" / "詳しくはこちら" |
| 5 | 首段 50 字内回答核心问题 | AI 抓取首段作为摘要 |
| 6 | 正文 ≥900 字 (不含 HTML 标签) | K3 R1 拍板标准 |

### §5.5 互链规则 (K3 v2.1 修订: 单数 /product/ + 真实 slug)
| 来源页 | 链接到 | 锚文本示例 |
|---|---|---|
| 校园类目页 (zh-hk) | /zh-hk/product/premium-greeting-cards/ | "定制賀卡印刷" |
| 校园类目页 (zh-hk) | /zh-hk/product/exercise-books/ | "練習冊印刷" |
| EN 博客 | /en/product/premium-greeting-cards/ | "custom greeting card printing" |
| EN 博客 | /en/product/exercise-books/ | "workbook printing service" |
| JA 博客 | /ja/product/premium-greeting-cards/ | "年賀状印刷" |
| JA 博客 | /ja/product/exercise-books/ | "ワークブック印刷" |

每条内链写入前必须 `curl -sI` 验证 200; 非 200 跳过并报告标注。

---

## §6 8/12 复盘验收表 7 项 (P4 + revenue 必报)

| # | 指标 | baseline (7/28) | 8/12 目标 | 数据来源 |
|---|---|---|---|---|
| 1 | 开学季询盘 (8/6-8/12) | 0 (P3 落地后开始) | WhatsApp ≥5 条 (原 10 因 301 传递未完成下调) | K3 人工数 |
| 2 | 校园词排名 | 待定 | 进前 50 | GSC |
| 3 | 收录页面数增长 | baseline | +3 页 (P3 新增) | GSC |
| 4 | Rich Results Test 全产品页 PASS | 0% | 100% | K3 人工跑 |
| 5 | AI 可见性对比 (7/29 vs 8/12) | 0/7 | ≥1/7 | K3 人工测试 |
| 6 | 301 传递进度 | 7/22 baseline 5/5 PASS | 旧域名展示量趋近 0 | GSC |
| 7 | 总 push 数 | 2 (7/28) | ≤14 天 × 1 = ≤14 次 | git log |

---

## §7 升级条件 8 条 (M3 停手红线)

5 红线 (见 §1) +:
| # | 触发条件 | 动作 |
|---|---|---|
| 7.6 | Rich Results Test 报错且无法自行修复 | 报告错误详情，继续下一任务 |
| 7.7 | curl 验证内链目标 404 | 跳过该链接，报告标注 |
| 7.8 | GSC 数据异常 (展示量突降 >50%) | 停手，立即报告 |

---

## §8 Cron 同步状态 (2026-07-28 v2)

| Cron | Cron ID | v2 同步 | 7/29 P2 联动 | 8/12 验收 |
|---|---|---|---|---|
| zprintpro-daily-content-1x7w | 3684eb06 | ✅ v2 | ✅ | — |
| zprintpro-gsc-feedback-loop | 6f9a93af | ✅ v2 | ✅ | — |
| zprintpro-monthly-matrix-audit | 9e3c442d | ✅ v2 | ✅ 8/1 跑前读 P2 报告 | ✅ §北极星进度段 |
| zprintpro-weekly-meta-refresh | 69e01ab9 | ✅ v2 + 7/28 联动 | ✅ 8/3 跑前读 P2 报告 | ✅ §北极星进度段 |
| zprintpro-revenue-analytics-weekly | ceecf2dd | ✅ v2 + P3 校园词归因 | ✅ 7/31 跑前读 P2 报告 | ✅ 8/12 验收表必报 |
| once-9164ea (P2 7/29) | 8534c688 | — | 7/29 06:00 触发, 拉 7/22-7/28 7 天 GSC | — |

### Blocklist (防 daily/weekly 抢写 P3 2 slug)
- `back-to-school-printing-usa` (en)
- `new-semester-printing-japan` (ja)

---

## §9 拍板记录 (K3 已确认 6 条)

| # | 决策 | 结论 | 防御性追加 |
|---|---|---|---|
| 1 | daily cron vs M3 P3 协调 | daily cron 跑 B+C+F 兜底 + M3 P3 独立写 2 个新 slug | blocklist 2 slug 写进 4 cron |
| 2 | 7/25-7/26 静默补跑? | 不补跑 (K3 v7 原则维持) | 周报/月报 §K3 §6 段接受 0 候选常态 |
| 3 | 开新 weekly SKU 优化 cron? | 不开新 | 月报/周报 §建议扩容 段不主动提议 |
| 4 | R1 zh-hk Q-GR-03 | 接 (3,359 字符含 HTML, 折算 900+ 字达标) | 不补 |
| 5 | 301 继承权重 90% 确认 | 沙盒期缩短 1-2 个月 | 8/12 验收预期下调 |
| 6 | GEO 增强 | 纳入 P1-P4 全流程 | Schema + Q&A 格式化 + AI 基线 |

---

## §10 时间轴总览 (4 阶段)

```
7/28 ─── P1: v22 改造 + Schema 基建 ──── 报告 m3-p1-v22-2026-07-28.md ✅ DONE
  │
7/29 ─── P2: GSC 周检 + AI 基线 ──────── 报告 m3-p2-gsc-2026-07-29.md
  │         [K3 人工: AI 搜索测试 5 分钟]
  │
7/30 ─┐
  │   │
8/05 ─┘── P3: 校园 3 页 + GEO 内容 ──── 报告 m3-p3-campus-2026-08-05.md
  │
8/06 ─┐
  │   │
8/12 ─┘── P4: CTR 攒批 + 复盘 ────────── 报告 m3-p4-review-2026-08-12.md
            [K3 人工: WhatsApp 询盘计数]
            [K3 人工: AI 搜索复测对比]
```

---

## §11 内链验证协议 (3 步, §13.10 / §13.16.1 / §13.6 统一)

每次写入内链前:

1. **验证目标 URL 返回 200** (K3 修订: 单数 /product/):
   ```bash
   curl -sI "https://zprintpro.com/{{LOCALE}}/product/{{SLUG}}/" | head -1
   # 期望: HTTP/2 200
   ```

2. **路径是单数 /product/** (禁止 /products/ 复数, §13.6 修订)

3. **非 200 跳过该链接, 报告标注**:
   ```
   SKIP: /xx/product/yy returned {STATUS}
   ```

**内链锚文本 = 实体名词短语** (禁止 "click here" / "了解更多" / "詳しくはこちら")

---

## §12 报告格式规范 (K3 14 章节)

所有报告统一结构 (`.hermes/reports/m3-<阶段>-<日期>.md`):

1. **§摘要 (3 行内)** — 结论 ≤30 字 + 3 行数据 + ≤1 风险
2. **§数据 (表格)** — 关键 KPI 大表
3. **§已完成动作** — 5 步动作清单
4. **§6 SKU 1:1 映射 / §P1 §3.5 验收 6 步** — 验证表
5. **§v2 §0 红线** — 5 红线 compliance
6. **§异常/跳过项** — 已知 bug 跟 fallback
7. **§下阶段依赖** — 阻塞 / 待办
8. **§K3 审批栏 (留空, K3 填)** — 拍板项
9. **§K3 §6 段 (接受 0 候选常态说明)**
10. **§建议扩容段 (不主动提议, 仅记录观察)**
11. **§Commits** — commit hash + 描述
12. **§Live JSON-LD 验证 / §verify 结果** — 5 步 verify 数据
13. **§Next Steps** — 下阶段行动
14. **§附录 (技术细节, 关键文件路径)**

---

## 启动后必读 (5 cron 共享)

- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-master-directive-v2-2026-07-28.md` (master v2, L1-L611)
- `F:\zprintpro-nextjs\.hermes\cron-prompts\m3-v2-shared-snippet.md` (本文件, 公共段)
- `F:\zprintpro-nextjs\AGENTS.md` (项目宪法, §0 / §11 / §13.10 / §13.13 / §13.14 / §13.15 / §13.16.1)
- `F:\zprintpro-nextjs\.hermes\context.md` (§1 / §4 / §14 P0-2 ACTIVE 监控 + 抽样规则)

EOF · m3-v2-shared-snippet.md (5 cron 共享 v2 公共段 · 2026-07-28 v2.1)
