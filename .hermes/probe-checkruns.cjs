#!/usr/bin/env node
/* 只读: GitHub check-runs 明细 (CF Pages 部署状态 + 时间戳) */
const SHAS = { '当前 push': 'caedc4f7', '上次 push': '8de45a05' };
(async () => {
  for (const [label, sha] of Object.entries(SHAS)) {
    const r = await fetch(`https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/${sha}/check-runs`, {
      headers: { 'user-agent': 'zprintpro-probe/1.0', accept: 'application/vnd.github+json' },
    });
    const j = await r.json();
    console.log(`\n=== ${label} ${sha} (HTTP ${r.status}) runs=${(j.check_runs || []).length} ===`);
    (j.check_runs || []).forEach(c => {
      console.log(`  ${c.name} | status=${c.status} conclusion=${c.conclusion} | started=${c.started_at} completed=${c.completed_at}`);
      const t = c.output && c.output.title;
      if (t) console.log(`      output: ${String(t).slice(0, 160)}`);
    });
  }
})();
