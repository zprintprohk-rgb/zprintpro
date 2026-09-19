// .hermes/logs/_append-metric-rule.mjs — 以 UTF-8 安全追加錯誤模式規則（避免 PowerShell 編碼污染）
import fs from 'node:fs';

const FILE = '.hermes/regression-guard/error-patterns.md';
const RULE = `
---

### 规则 METRIC_INTEGRITY_FIVE_TRAPS — 量测脚本自身的五种系统性陷阱 (2026-09-19 实测固化)

**事故形态**: 建立 MOQ 口径扫描器（门童 #24）过程中，**同一次任务内连续 5 次计数/判定失误**，
且**全部是「指标本身错」而非「结论错」**——每次都在「下结论前」被双方法复算或形状断言拦下，
否则会把坏计数当依据去改全站文案。这正是 \`DOUBLE_METHOD_RECOUNT\` 的放大实例。

| # | 错误结论 | 真相 | 根因（陷阱） |
|---|----------|------|--------------|
| 1 | 「只有 5 条漂移」 | 实际 76 条 | **键名边界陷阱**：\`slug:\` 未加字边界 → 误匹配 \`category_slug:\` → 真值表混入分类名 → 查表回 undefined → **整段静默跳过**（假阴性最毒：不报错、只是少报） |
| 2 | 「真值表 99 个 SKU」 | 94 产品 + 16 分类 | **嵌套结构陷阱**：分类数组（缩排 2）与产品 slug（缩排 4）混入同一解析器 |
| 3 | 「双方法不一致（5 vs 121）」 | 定义域不同，假红 | **定义域陷阱**：方法 A 只数特定样式、方法 B 数全部样式 → 对帐必须**逐样式同定义域** |
| 4 | 「5 个 SKU 缺字段」 | 全部都有 | **嵌套归属陷阱**：断言写成「全档行数 == 顶级对象数」，未考虑**无顶级键的嵌套子商品**（\`japan-doujin\` 5 个子商品） |
| 5 | 「某量词样式是误配」 | 全部是真样本 | **扫描窗口陷阱**：只看行首 N 字，而真相在行内 700+ 字元处（多语系栏位挤同一行） |

**修法（五种对应机制，缺一即可能复发）**:
1. **键名加字边界** + 形状断言（真值表数 == 顶级键行数 == 字段行数）
2. **结构靠缩排/深度判定**，不靠字面窗口
3. **双方法对帐必须逐类别同定义域**（不同定义域的比较结果无意义）
4. **断言必须显式排除嵌套子对象**（无顶级键者不可归入前一对象）
5. **命中上下文取「命中处前后文」**，不用行首片段

**固化位置（可复用的机制，不是文字提醒）**:
- \`scripts/moq10-books-context-scan.ts\`：\`isProductSlugLine()\`（缩排 4 判定）、
  \`assertShape()\`（形状断言）、\`independentByStyle()\`（逐样式同定义域对帐）、
  \`nestedSubProductRanges()\`（嵌套子商品排除）、命中处上下文取样
- \`scripts/moq10-repair-drift.ts\`：改前断言 \`hit==1\`、改后断言 \`hit==0\`、**整行删除用两阶段**
  （先全扫再统一由后往前删，避免「边扫边删」造成行号位移——本任务实测踩到）
- 门童 #24：未登记的**新**漂移即拦；已登录「待裁決」项显示为 \`📋 已登录\`（**不是** ✓）

**同族规则**: \`DOUBLE_METHOD_RECOUNT\`（母规则）· \`HREFLANG_FALSE_ALARM_MEASUREMENT_BUGS\`（同源：探针自身 bug）· \`TSC_ERROR_COUNT_DROP_IS_A_RED_FLAG\`

**配套**: AGENTS.md §0.23.2 三闸门 + 双方法复算铁律 · 本文件 \`DOUBLE_METHOD_RECOUNT\`
`;

fs.appendFileSync(FILE, RULE, 'utf8');
const n = fs.readFileSync(FILE, 'utf8').split('\n').length;
console.log(`✅ 已追加规则 METRIC_INTEGRITY_FIVE_TRAPS（${FILE} 现 ${n} 行）`);
