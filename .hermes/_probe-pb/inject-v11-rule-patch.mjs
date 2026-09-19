// 生成位置补丁 (cron prompt) 注入 v11: 段3 口径 + FAQ 答案长度 + 格式预检
import fs from 'fs';

const patch = [
  '',
  '> **[v11 段3/FAQ口径修订 · 2026-09-19 K3 决策 方案 a]**',
  '> ① **段 3 主段锚 H2 或 H3 均可**（判据 = (H2+H3) 总数 ≥6 且问句式 >50%；关键在「层级逻辑清晰」，不强求 H2；**不要为迁就门禁去动已上线 DOM 结构**）。',
  '> ② **新写/补写 FAQ 答案长度口径 = 40-120 词**（旧口径 80-150 词偏高；40-80 词是 AI 引擎高引用「答案胶囊」区间，上限保留深度空间）。',
  '> ③ **写 FAQ 前必跑格式预检**：`node .hermes/_probe-pb/precheck-faq-format.mjs`（8 用例，含 3 条反例）—— 必写成 `<p><strong>Qn: 问?</strong><br/>A: 答</p>`；**禁** `<li>` 列表形态 / **禁**缺 A 标记 / **禁**答案另起 `<p>`（否则「写了 FAQ 但线上无 FAQPage」静默失败）。',
  '> ④ 本修订已同步 SSoT（§3.1 段3-5 行 + §0.3 FAQ 口径）+ 门禁断言（`blog-quality-12-rules-guard.js` 段 3 判定），经门童 #21 sha256 重新绑定。',
  '',
].join('\n');

for (const f of [
  '.hermes/cron-prompts/zprintpro-blog-deepfix.md',
  '.hermes/cron-prompts/zprintpro-daily-content-1x7w.md',
]) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('v11 段3/FAQ口径修订')) { console.log('已存在, 跳过:', f); continue; }
  // 锚点: 插到最新 vN 补丁之前 (当前最新 = v9; v10 在并发会话 reset 中丢失, 已在本批一并补回)
  let i = c.indexOf('> **[v9 规则翻译层补丁');
  if (i < 0) i = c.indexOf('> **[v8 大脑指令');
  if (i < 0) { console.log('🔴 未找到补丁锚点, 跳过:', f); continue; }
  // 回退到该行行首
  const lineStart = c.lastIndexOf('\n', i) + 1;
  fs.writeFileSync(f, c.slice(0, lineStart) + patch + '\n' + c.slice(lineStart), 'utf8');
  console.log('✅ 已注入 v11:', f);
}
