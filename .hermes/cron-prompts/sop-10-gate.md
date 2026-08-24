# SOP-10 5 问门禁 + 数据诚信红线 (4 cron 共享 SSoT)
# Last sync: 2026-08-25 04:30 (K3 8/25 拍板 P0 落地, AGENTS.md §0.22 + §0.23 落盘)

## 0. 前置门禁 (任何 cron M3 报告必跑, 缺则报告作废)

### 0.1 SOP-10 5 问门禁 (强制级, K3 8/25 拍板 B)

> 任何 M3 派活 / 上报拍板 / 报告, 必跑 5 问, **缺 5 问 = 报告作废, K3 不拍板**。

1. **架构差异?** 派活前查前序任务实现路径 (`git show <commit> --stat` 30 秒)
2. **约束适用范围?** 上报拍板前先查 K3 拍板原文, 不替 K3 推断"红线=不动所有 src/"
3. **原数据/拍板来源?** 不推断"无来源数字"/"MOCK 数据", 上报前 3 问: ① 原数据拍板来源 ② 是不是真数据 ③ 当前 K3 拍板是"留"还是"撤"?
4. **字段值策略?** certNo/validUntil/issuer 全空, 不留联系方式
5. **Markdown 渲染?** user-facing 文本含 [text](url) 必须 parseInlineLinks 解析

### 0.2 数据诚信红线 (K3 8/25 拍板, §0.23)

> 任何 M3 报告必含"数据来源"行, 缺则报告作废。

- ❌ 任何"看起来合理"的估算 baseline 不进报告
- ❌ 任何"n=X 询盘"/"%X 转化"/"X 客户"类无来源数字不进报告
- ✅ 任何报告必含"数据来源"行, 格式: `数据来源: <表名/查询/事件>`
- ✅ baseline / 关键数字必标"待 XX 校准"或"已 XX 校准" + 校准日期
- ✅ 任何撤回声明必含原报告 commit ID + 撤回日期

### 0.3 数据来源模板 (强制)

```
数据来源:
- 008 询盘跟踪表 (8/29 首报)
- Supabase query: <查询名> 2026-08-XX
- GSC data: <文件名> <日期范围>
- IndexNow API response: <URL>
- K3 拍板记录: <commit ID> <时间>
```

## 1. 详细文档

- **AGENTS.md §0.22**: SOP-10 5 问门禁 (强制级, K3 8/25 拍板 B)
- **AGENTS.md §0.23**: 数据诚信红线 (K3 8/25 拍板)
- **.hermes/m3-self-evolution-patterns.md** (8.6KB, 8/24 22:00 已落): SOP-10 完整谱系 (1-6 款)
- **docs/eod-retraction-2026-08-24.md** (8/24 22:00 已落): 8.2-12.6 询盘 baseline 撤回

## 2. 应用范围 (4 cron 共享)

- ✅ zprintpro-daily-content-1x7w (每天 9:10 Asia/Shanghai)
- ✅ zprintpro-weekly-meta-refresh (周一 11:00)
- ✅ zprintpro-monthly-matrix-audit (每月 1 号 14:00)
- ✅ zprintpro-gsc-feedback-loop (每周三 15:00)
- ✅ 任何 M3 派活 / 上报 / 报告

## 3. 报告必含 (K3 §0.22 + §0.23 落地)

每份 M3 cron 报告必含 3 段:

```markdown
## SOP-10 5 问门禁 (K3 §0.22)
- [ ] 1. 架构差异? (查前序任务实现路径)
- [ ] 2. 约束适用范围? (查 K3 拍板原文)
- [ ] 3. 原数据/拍板来源? (3 问 ① 拍板来源 ② 真数据 ③ 留/撤)
- [ ] 4. 字段值策略? (certNo/validUntil/issuer 全空)
- [ ] 5. Markdown 渲染? ([text](url) 走 parseInlineLinks)

## 数据来源 (K3 §0.23)
- <表名/查询/事件> + <commit ID> + <时间>

## 撤回声明 (如有)
- 原报告: <commit ID> <时间>
- 撤回原因: <原因>
- 撤回日期: 2026-08-XX
```

## 4. 反例 (M3 8/24 误诊)

- ❌ 误诊 #1: B3 hydration vs B4 hreflang 架构冲突 P0 阻塞 (实际不阻塞)
- ❌ 误诊 #2: F0 红线 = 不动所有 src/ (实际 = 不删 SKU/文案/长文本字段)
- ❌ 误诊 #3 (严重): 12 件事全判"无来源数字", 实际 = K3 8/19 拍板的真实数据
- ❌ 8/24 EOD "8.2-12.6 询盘/週 n=31 baseline" 编造数字 (撤回: docs/eod-retraction-2026-08-24.md)
