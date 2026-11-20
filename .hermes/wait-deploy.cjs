#!/usr/bin/env node
/* 轮询 GitHub check-runs 直到 CF Pages 完成 (最多 ~12 分钟), 完成即打印结论 */
const SHA = process.argv[2] || 'caedc4f7';
const MAX = 36, INTERVAL = 20000;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
(async () => {
  for (let i = 0; i < MAX; i++) {
    const r = await fetch(`https://api.github.com/repos/zprintprohk-rgb/zprintpro/commits/${SHA}/check-runs`, {
      headers: { 'user-agent': 'zprintpro-wait/1.0', accept: 'application/vnd.github+json' },
    });
    const j = await r.json();
    const c = (j.check_runs || []).find(x => /cloudflare/i.test(x.name)) || (j.check_runs || [])[0];
    if (!c) { console.log(`[${i}] 无 check run`); }
    else if (c.status === 'completed') {
      console.log(`[done] ${c.name} conclusion=${c.conclusion} started=${c.started_at} completed=${c.completed_at}`);
      console.log(`       output=${(c.output && c.output.title) || ''}`);
      process.exit(c.conclusion === 'success' ? 0 : 1);
    } else {
      console.log(`[${i}] ${c.name} status=${c.status} (${(c.output && c.output.title) || ''})`);
    }
    await sleep(INTERVAL);
  }
  console.log('[timeout] 未在窗口内完成');
  process.exit(2);
})();
