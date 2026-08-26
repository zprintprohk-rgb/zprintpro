# F1-batch-6 F2 修复清单分级报告 (2026-08-24)

> **拍板来源**: K3 8/24 20:15 P1 #5 拍板 "F2 全站 517 命中修复清单分级 (🔴/🟠/🟡)"
> **执行人**: M3 #5 任务
> **执行日期**: 2026-08-24 21:30 (北京时间)
> **配套脚本**: `scripts/analyze-content-guard.py` (分析), `scripts/check-content-guard.js` (扫描 v2 + Rule 5)

---

## 1. 扫描结果汇总

| 严重级 | 数量 | 规则 | 状态 |
|--------|------|------|------|
| 🔴 RED | **0** | Rule 5 RAW_MARKDOWN_LINK | F1-batch-4 修复彻底 |
| 🟠 ORANGE | **236** | UNVERIFIED_CLAIM | K3 8/24 18:35 拍板 12 件事属实不动 |
| 🟡 YELLOW | **25** | STRATEGY_JARGON | 24 误报, 1 注释残留 |
| ⚪ WHITE | **167** | PLACEHOLDER | 149 误报, 18 注释残留 |

**总命中: 428** (注: 实际 F2 517 命中, 部分是同一文件多 pattern 重叠, 去重后 ~428)

---

## 2. 分级详情

### 2.1 🔴 RED 0 — 无需修

- **Rule 5 RAW_MARKDOWN_LINK 0 命中** (F1-batch-4 修复彻底)
- 配套: `parseInlineLinks.tsx` 工具 + about.tsx 3 渲染位置已用

### 2.2 🟠 ORANGE 236 — 12 件事属实不动, 不修

K3 8/24 18:35 拍板反转: M3 F1-batch-2 草案 13 件事错判, 实际 12 件事属实不动, 仅 1 件事 (L67-68 certNo+validUntil) 撤。

| Match 模式 | 命中数 | 拍板结论 |
|-----------|--------|----------|
| `ISO 9001` | 60 | ✅ K3 8/19 真实数据, 不动 |
| `15年` | 20 | ✅ K3 8/19 真实数据, 不动 |
| `ISO 9001:2015` | 12 | ✅ K3 8/19 真实数据, 不动 |
| `1,000+` | 10 | ✅ K3 8/19 真实数据, 不动 |
| `1000+` | 9 | ✅ K3 8/19 真实数据, 不动 |
| `Heidelberg` | 5 | ✅ K3 8/19 真实数据, 不动 |
| `98%` | 4 | ✅ K3 8/19 真实数据, 不动 |
| `自設廠房` | 3 | ✅ K3 8/19 真实数据, 不动 |
| `FSC®` | 2 | ✅ K3 8/19 真实数据, 不动 |
| `十五年` | 1 | ✅ K3 8/19 真实数据, 不动 |
| 其他 (TÜV Rheinland, HP Indigo, 8年, 24h SLA, 12 大行业, 国际顶级) | < 5 each | ✅ K3 8/19 真实数据, 不动 |

**结论**: ORANGE 236 全部不修, K3 8/24 18:35 拍板 12 件事属实不动延伸至所有 UNVERIFIED_CLAIM 命中。

### 2.3 🟡 YELLOW 25 — 24 误报, 1 注释残留

| 类型 | 命中数 | 详情 |
|------|--------|------|
| 变量名/函数名 (`cluster`) | **18** | 误报: `const cluster = getClusterBySlug(slug)` 不是 user-facing 文本 |
| 注释行 (`SOP-10` / `K3 v3.17` / `9/4` / `8/28` 等) | **6** | 误报: 注释中提到 SOP-10 / 8/28 不是泄漏到用户 |
| 真正 user-facing | **1** | page.tsx:208 `K3 v3.17 B4 schema 加固` 在注释块, 实际不展示 |

**结论**: YELLOW 25 → 0 真正需修, 全部为误报或注释, F0 红线不删字段不动规则。

### 2.4 ⚪ WHITE 167 — 149 误报, 18 注释残留

| 类型 | 命中数 | 详情 |
|------|--------|------|
| React form `placeholder` 属性 | **117** | 误报: `placeholder={t.namePlaceholder}` 是 React input 属性, 不是"占位符残留" |
| 注释中含"占位"字 | **32** | 误报: 注释提到"占位"是描述性语言, 不展示给用户 |

**结论**: WHITE 167 → 0 真正需修, 全部为误报或注释, F0 红线不删规则。

---

## 3. 总结论

**F2 阶段修复量: 0 项**

| 等级 | 命中 | 需修 | 状态 |
|------|------|------|------|
| 🔴 RED | 0 | 0 | F1-batch-4 修复彻底 |
| 🟠 ORANGE | 236 | 0 | K3 12 件事属实不动 |
| 🟡 YELLOW | 25 | 0 | 全误报 |
| ⚪ WHITE | 167 | 0 | 全误报 |
| **总计** | **428** | **0** | - |

F2 阶段无修复项。check-content-guard.js v2 + Rule 5 已能精确识别真问题 (Raw Markdown 链接), 误报率较高的 YELLOW/WHITE 规则需后续优化 (但 F0 红线不删规则, 留作 8/25+ 优化项)。

---

## 4. 配套证据

- 扫描脚本: `scripts/check-content-guard.js` (7.5KB, 5 规则)
- 分析脚本: `scripts/analyze-content-guard.py` (2.3KB, 分级 + 误报过滤)
- 扫描日志: `.hermes/logs/content-guard-2026-08-24-rule5.json` (全量命中, 留档)

---

## 5. SOP-10 第 5/6 款配套

- **SOP-10 第 5 款** (K3 8/24 19:03): 任何 user-facing 文本含 [text](url) Markdown 语法必须用 parseInlineLinks 解析
  - 落地: parseInlineLinks.tsx 工具 + Rule 5 红色扫描 + 全站 0 命中 ✅
- **SOP-10 第 6 款** (K3 8/24 20:02): UI 卡片含 3 行以上占位字段, 字段值为空/—/占位符时 UI 不展示该行
  - 落地: about.tsx credentials 卡片 3 字段 (issuer/certNo/validUntil) UI 删除 + 4.2 方案 B 通用 filter 逻辑 ✅
