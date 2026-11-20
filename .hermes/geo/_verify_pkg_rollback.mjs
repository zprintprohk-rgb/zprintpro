// Post-push verification for the packaging rollback: waits for remote head to include ROLLBACK_SHA,
// then checks each of the 10 SKUs × 3 locales: PDP has NO v28_5 path for that slug, old image URLs 200.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const LOG = '.hermes/logs/v28_5-pkg-rollback-verify-2026-10-21.log';
const TARGETS = ['corrugated-boxes', 'cosmetic-boxes', 'electronics-packaging-box', 'gang-run-card-boxes', 'kraft-paper-packaging-box', 'magnetic-closure-gift-box', 'mailer-boxes', 'rigid-boxes', 'tuck-end-boxes', 'white-card-boxes'];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const log = (m) => { try { fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`, 'utf8'); } catch {} };
const sh = (c) => { const r = spawnSync(c, { encoding: 'utf8', shell: true, timeout: 120000 }); return (r.stdout || '').trim(); };
const headSha = sh('git rev-parse HEAD');
log(`VERIFY START for local HEAD=${headSha.slice(0, 8)} (waits until remote main includes it)`);

let live = false;
for (let i = 1; i <= 20; i++) {
  const remote = sh('git ls-remote origin_ssh refs/heads/main').split(/\s+/)[0];
  const contains = remote && sh(`git merge-base --is-ancestor ${headSha} ${remote} && echo YES`) === 'YES';
  log(`poll ${i}: remote=${remote ? remote.slice(0, 8) : 'NA'} containsHead=${contains}`);
  if (contains) { live = true; break; }
  await sleep(120000);
}
if (!live) { log('ABORT: remote never included HEAD within 40min'); process.exit(1); }
await sleep(240000); // CF build

let bad = 0, checked = 0;
for (const s of TARGETS) {
  for (const l of ['zh-hk', 'en', 'ja']) {
    checked++;
    try {
      const r = await fetch(`https://zprintpro.com/${l}/product/${s}/`, { headers: { 'user-agent': 'pkg-rollback-verify/1.0' } });
      const html = await r.text();
      const hasV285 = html.includes(`/images/products/v28_5/${s}/`);
      if (r.status !== 200 || hasV285) { bad++; log(`BAD ${s}/${l} status=${r.status} v28_5_src=${hasV285}`); }
    } catch (e) { bad++; log(`FETCH_FAIL ${s}/${l} ${String(e).slice(0, 80)}`); }
    await sleep(200);
  }
}
log(`pdp_checked=${checked} bad=${bad}`);
// sample old image 200 (one per SKU, en hero-ish)
let imgOk = 0, imgBad = 0;
for (const s of TARGETS) {
  const url = `https://zprintpro.com/images/products/seedream-webp/zprintpro-packaging-${s}-en-1.webp`;
  try {
    const r = await fetch(url, { method: 'GET', headers: { 'user-agent': 'pkg-rollback-verify/1.0' } });
    if (r.status === 200) imgOk++; else { imgBad++; log(`IMG ${r.status} ${url}`); }
  } catch { imgBad++; log(`IMG_FAIL ${url}`); }
  await sleep(150);
}
log(`old_img_200=${imgOk} bad=${imgBad}`);
log(bad === 0 && imgBad === 0 ? 'VERIFY DONE: PASS' : 'VERIFY DONE: CHECK_LOGS');
process.exit(bad === 0 && imgBad === 0 ? 0 : 1);
