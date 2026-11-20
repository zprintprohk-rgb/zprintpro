#!/usr/bin/env node
/* 追加教训 9 (门禁 hooksPath 静默失效) 到 tool-lessons-2026-09-13.md */
const fs = require('fs');
const F = 'F:\\zprintpro-main-tmp\\.hermes\\logs\\tool-lessons-2026-09-13.md';
const L = [
  '',
  '### 教训 9 (最严重的一条): 门禁「装了但没生效」— core.hooksPath 陷阱',
  '- 现象: 我按 §12 把升级后的 pre-commit 装到 `.git/hooks/pre-commit`, 并对脚本做了负向测试(注入双品牌 → exit 1), 结论是「门禁已生效」。',
  '- 打脸: 端到端集成测试(真跑 `git commit`)——**commit 成功了**。查因: `git config core.hooksPath` = `.githooks`, 而 `.githooks/` 下**只有 pre-push、没有 pre-commit** → 8/26 起(为 submodule guard 设 hooksPath 那次), **整条 pre-commit 门禁(encoding / 简体字 / blog-data JSON / 反审门童 / DoD)全部静默失效**。',
  '- 修法(已落): (a) 把 canonical hook 装到 `.githooks/pre-commit`(受影响目录, 且受版本控制) + 同步 `.git/hooks/` 兜底; (b) `scripts/setup-hooks.sh` 改为**先读 `core.hooksPath` 再决定安装路径**; (c) 集成测试固化: 临时文件注入双品牌 → `git commit` 必须 exit 1。',
  '- 元教训: **只测脚本的负向用例 ≠ 测通门禁**。任何「闸门/守卫已生效」的结论, 必须有一条**端到端**证据(真触发一次被拦), 否则与「假零」同类——都是把「工具没跑」当成「没有问题」。',
  '- 归类: 教训 3(不存在需双工具交叉) + 教训 7(假零) 的同一族: **负向结论/保护性结论, 必须证明机制真的在运行**。',
  '',
].join('\n');
fs.appendFileSync(F, L, 'utf8');
const t = fs.readFileSync(F, 'utf8');
console.log('追加后大小:', t.length, '| 含教训 9:', t.includes('教训 9'), '| BOM:', t.charCodeAt(0) === 0xFEFF);
