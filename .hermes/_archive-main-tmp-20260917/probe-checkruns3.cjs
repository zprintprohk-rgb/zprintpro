#!/usr/bin/env node
/* 只读: CF Pages check-runs 状态 (含错误处理, 覆盖今日 4 个 push) */
const SHAS = ['98ad5136', 'a16f95a9', '2e8a8be8', 'caedc4f7'];
(async () => {
  for (const sha of SHAS) {
    try {
      const r = await fetch(`https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/${sha}/check-runs`, {
        headers: { 'user-agent': 'zprintpro-probe/1.0', accept: 'application/vnd.github+json' },
      });
      const txt = await r.text();
      if (r.status !== 200) { console.log(`${sha}: HTTP ${r.status} — ${txt.slice(0, 90)}`); continue; }
      const j = JSON.parse(txt);
      const runs = j.check_runs || [];
      if (!runs.length) { console.log(`${sha}: 无 check run`); continue; }
      runs.forEach(c => console.log(`${sha}: ${c.name} | ${c.status} | ${c.conclusion} | started=${c.started_at} done=${c.completed_at} | ${(c.output && c.output.title) || ''}`));
    } catch (e) { console.log(`${sha}: ERR ${e.message}`); }
  }
  try {
    const r = await fetch('https://api.github.com/rate_limit', { headers: { 'user-agent': 'p' } });
    console.log('rate-limit remaining:', r.headers.get('x-ratelimit-remaining'));
  } catch (e) { console.log('rate_limit ERR', e.message); }
})();
