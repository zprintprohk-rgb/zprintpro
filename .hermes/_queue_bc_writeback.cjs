// Append B/C deployment entries to queue catalog-en measurement_history
const fs = require('fs');
const F = '.hermes/cron-prompts/blog-money-keyword-queue.json';
fs.copyFileSync(F, `.hermes/_bak-queue-bc-${Date.now()}.json`);
const q = JSON.parse(fs.readFileSync(F, 'utf8'));
const it = (q.items || q.queue).find((i) => (i.id || i.cluster) === 'catalog-en');
if (!it) { console.error('ABORT: no catalog-en'); process.exit(1); }
it.measurement_history = it.measurement_history || [];
const entry = {
  date: '2026-11-09',
  kind: 'change_deployed_single_variable_bc',
  change: 'P2 B/C desc MOQ alignment: zh desc "畫冊印刷/畫冊印刷 100 起" -> "畫冊印刷 10 本起印" (dedupe + K3-3 A truth); ja desc "100〜" -> "10冊〜" (align title). Two variables on independent locale/query grains (zh-hk vs jpn), attribution isolated',
  commit: '392c5f30',
  online_verify: 'CF Pages success (run 128985513618); L3 assertions PASS: zh-hk desc contains 10 本起印 & no 100 起 residue, ja desc contains 10冊〜 & no 100〜 residue',
  baseline: { zh: { query_grain: 'zh-hk 畫冊印刷族', note: 'desc 126 chars pre-change' }, ja: { query_grain: 'jpn カタログ印刷族', note: 'desc 122 chars pre-change' } },
  next_retest: ['2026-11-14 (first same-caliber retest with H1 batch a33abd3b)', '2026-11-21'],
  decision_rule: 'FIX_DEPLOYED -> MEASURE; no SCALE without six-piece evidence',
};
if (it.measurement_history.some((m) => m.commit === entry.commit)) { console.log('ALREADY_RECORDED'); process.exit(0); }
it.measurement_history.push(entry);
fs.writeFileSync(F, JSON.stringify(q, null, 2) + '\n', 'utf8');
console.log('appended; mh_len =', it.measurement_history.length, '| status kept =', it.status);
