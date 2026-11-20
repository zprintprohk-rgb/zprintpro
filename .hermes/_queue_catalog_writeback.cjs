// Append measurement_history entry to blog-money-keyword-queue.json catalog-en (P0 H1 batch deployed)
const fs = require('fs');
const F = '.hermes/cron-prompts/blog-money-keyword-queue.json';
const backup = `.hermes/_bak-queue-${Date.now()}.json`;
fs.copyFileSync(F, backup);
const q = JSON.parse(fs.readFileSync(F, 'utf8'));
const items = q.items || q.queue;
const it = items.find((i) => (i.id || i.cluster) === 'catalog-en');
if (!it) { console.error('ABORT: catalog-en not found'); process.exit(1); }
it.measurement_history = it.measurement_history || [];
const entry = {
  date: '2026-11-09',
  kind: 'change_deployed_single_variable',
  change: 'en PDP H1 "Catalog Printing 100+ | ZprintPro" -> "Catalog Printing 10+ | ZprintPro" (K3-3 A approved; 74ffa5a9 precedent; CSV source + generator apply, byte-level delta=1, assertions PASS)',
  commit: 'a33abd3b',
  online_verify: 'CF Pages success (run 128890190650); live H1 assertion PASS (10+ present, 100+ absent), title unchanged (10 MOQ $4.60)',
  baseline: { query: 'china catalog printing', imp: 98, pos: 14.15, clk: 0, window: '28d to 11-07', primary_url_share: '72.7% PDP' },
  next_retest: ['2026-11-14 (D1/D2 + first same-caliber retest)', '2026-11-21 (28d window)'],
  decision_rule: 'FIX_DEPLOYED -> MEASURE; no SCALE without baseline+change+approval+deploy+online_verify+retest',
};
if (it.measurement_history.some((m) => m.commit === entry.commit)) { console.log('ALREADY_RECORDED'); process.exit(0); }
it.measurement_history.push(entry);
fs.writeFileSync(F, JSON.stringify(q, null, 2) + '\n', 'utf8');
console.log('appended; mh_len =', it.measurement_history.length, '| status kept =', it.status);
