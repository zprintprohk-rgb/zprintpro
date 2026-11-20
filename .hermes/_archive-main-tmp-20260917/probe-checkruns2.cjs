#!/usr/bin/env node
/* 只读: GitHub check-runs 明细 (含 HTTP 状态, 防限流误读) */
const SHAS = ['2e8a8be8', 'caedc4f7', '8de45a05'];
(async () => {
  for (const sha of SHAS) {
    const r = await fetch(`https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/${sha}/check-runs`, {
      headers: { 'user-agent': 'zprintpro-probe/1.0', accept: 'application/vnd.github+json' },
    });
    const j = await r.json().catch(() => ({}));
    if (r.status !== 200) { console.log(`${sha}: HTTP ${r.status} ${(j.message || '').slice(0, 60)}`); continue; }
    const runs = j.check_runs || [];
    console.log(`${sha}: ${runs.length} run(s)`);
    runs.forEach(c => console.log(`   ${c.name} | ${c.status} | ${c.conclusion} | started=${c.started_at} completed=${c.completed_at} | ${(c.output && c.output.title) || ''}`));
  }
  console.log('\nrate-limit remaining:', (await fetch('https://api.github.com/rate_limit', { headers: { 'user-agent': 'p' } })).headers.get('x-ratelimit-remaining'));
})();
