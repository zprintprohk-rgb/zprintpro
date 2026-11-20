#!/usr/bin/env node
/* 追加本批两条工具教训到 .hermes/logs/tool-lessons-2026-09-13.md (UTF-8 安全追加)
 * 注意: 正文含反引号, 用普通字符串数组避免模板字面量转义坑 */
const fs = require('fs');
const F = 'F:\\zprintpro-main-tmp\\.hermes\\logs\\tool-lessons-2026-09-13.md';
const L = [
  '',
  '---',
  '',
  '## 五、补记 (2026-09-13 17:45, 单品牌 B+C 批执行中新增两条)',
  '',
  '### 教训 7: 「假零」— 命令没跑起来, 却被当成 0 错',
  '- 现象: 在**无 node_modules** 的 worktree (F:\\zprintpro-main-tmp) 跑 `npx tsc --noEmit`, 命令直接失败 (tsc/next 不存在), 而我只统计 `error TS` 行数 → 误报「tsc 0 error」, 并据此认为 main 基线是 0。',
  '- 纠正后实测: main 基线 = **54** (全在 src/lib/quote-engine/__tests__/*), 与分支一致。',
  '- 修法: 任何「计数型」判定必须同时断言**命令真的执行** (exit code + 输出形态)。本批已落 `.hermes/tsc-analyze.cjs` (打印 exit code 并校验输出), 将来所有门禁脚本照此写。',
  '- 归类: 与教训 3 (「不存在」需双工具交叉) 同族 —— **负向结论更需要证明工具在工作**。',
  '',
  '### 教训 8: 替换正则吃掉尾随逗号 → 4 处 TS1005 (备份让回滚零成本)',
  '- 现象: 第一版 `fix-single-brand-data-layer.mjs` 的 alt 替换正则写成 `("zh-hk":\\s*".*)\\| ZprintPro(")\\s*,?\\s*$`, 把尾随逗号一并吃掉 → sku-seo-data.ts 4 行丢逗号, tsc 报 4 × TS1005。',
  '- 修法: (a) 正则保留逗号分组 `(")(,?)\\s*$` 并替换回去; (b) 新增断言: **尾随逗号保持** + **引号/括号守恒** (`"` `{` `}` `[` `]` 计数前后必须相等) + **行不得变长**。',
  '- 关键收获: §12 三件套里的**备份**让恢复只花 1 条命令 (从 .hermes/backup-single-brand-data-* 还原 3 文件后重跑), 没有靠 git 回滚、没有污染提交历史。',
  '- 归类: 与「双竖线 | | 被计数守卫放过」同族 —— **计数断言 ≠ 形状断言**; 本批把形状断言扩到「结构性字符守恒」。',
  '',
];
fs.appendFileSync(F, L.join('\n'), 'utf8');
const t = fs.readFileSync(F, 'utf8');
console.log('追加后大小:', t.length, '| BOM:', t.charCodeAt(0) === 0xFEFF, '| 含教训7/8:', t.includes('教训 7') && t.includes('教训 8'));
