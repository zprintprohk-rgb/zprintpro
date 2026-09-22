// g2-validator-merge-20260922.mjs — 合并 6 页 validator.schema.org 原始响应 + 线上断言 → 最终证据
import { readFileSync, writeFileSync, readdirSync } from 'fs';

const RAW = '.hermes/reports/geo-g2-raw';
const EV = '.hermes/reports/geo-g2-validation-2026-09-22-evidence.json';

const EXPECTED = (e) => {
  const a = (e.args || []).join(' ');
  return (e.errorType === 'INVALID_ITEMTYPE' && /ProcureAction/.test(a)) ||
         (e.errorType === 'INVALID_OBJECT' && /ProcureAction/.test(a)) ||
         (e.errorType === 'INVALID_PREDICATE' && /sourcingIntentKeywords/.test(a));
};

const ev = JSON.parse(readFileSync(EV, 'utf8'));
for (const page of ev.pages) {
  const f = `${RAW}/${page.locale}__${page.slug}.json`;
  let raw;
  try { raw = readFileSync(f, 'utf8'); } catch { page.validator = { error: 'raw missing' }; continue; }
  let js;
  try {
    const cut = raw.trimStart().startsWith(")]}'") ? raw.slice(raw.indexOf('\n{')) : raw;
    js = JSON.parse(cut);
  } catch (e) { page.validator = { error: 'parse ' + e.message }; continue; }
  const errs = js.errors || [];
  page.validator = {
    numObjects: js.numObjects,
    totalNumErrors: js.totalNumErrors,
    totalNumWarnings: js.totalNumWarnings,
    expectedErrors: errs.filter(EXPECTED).map((e) => ({ type: e.errorType, args: (e.args || []).slice(0, 3) })),
    unexpectedErrors: errs.filter((e) => !EXPECTED(e)).map((e) => ({ type: e.errorType, args: (e.args || []).slice(0, 4) })),
    warnings: (js.warnings || []).map((w) => ({ type: w.errorType, args: (w.args || []).slice(0, 3) })),
  };
  // 回填断言
  const vp = page.assertions.find((x) => x.k === 'validator_parse');
  if (vp) { vp.ok = !page.validator.error; vp.info = page.validator.error ? 'ERR ' + page.validator.error : `objects=${page.validator.numObjects} errors=${page.validator.totalNumErrors}`; }
  const a = page.assertions.find((x) => x.k === 'validator_no_unexpected_errors');
  if (a) { a.ok = page.validator.unexpectedErrors.length === 0; a.info = `unexpected=${page.validator.unexpectedErrors.length} expected=${page.validator.expectedErrors.length} warnings=${page.validator.totalNumWarnings}`; }
}
writeFileSync(EV, JSON.stringify(ev, null, 2));

for (const p of ev.pages) {
  console.log(`${p.locale}/${p.slug} obj=${p.validator.numObjects} exp=${p.validator.expectedErrors?.length} unexp=${p.validator.unexpectedErrors?.length} warn=${p.validator.totalNumWarnings}`);
  (p.validator.unexpectedErrors || []).slice(0, 5).forEach((e) => console.log('   UNEXP', e.type, JSON.stringify(e.args)));
  (p.validator.warnings || []).slice(0, 3).forEach((w) => console.log('   WARN', w.type, JSON.stringify(w.args)));
}
const fails = ev.pages.flatMap((r) => r.assertions.filter((a) => !a.ok).map((a) => `${r.locale}/${r.slug} :: ${a.k} ${a.info}`));
console.log('---ASSERTION FAILURES---');
console.log(fails.length ? fails.join('\n') : '(none)');
