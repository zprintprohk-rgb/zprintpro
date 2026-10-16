#!/usr/bin/env node
// v28_5 image deploy — wave-based SKU image replacement per docs/2026-10-16-image-swap-risk-and-one-week-plan.md
//
// Subcommands:
//   node scripts/v28_5-image-deploy.mjs list [--wave=X]
//   node scripts/v28_5-image-deploy.mjs deploy --wave=W1-1017 [--dry-run]
//   node scripts/v28_5-image-deploy.mjs probe --wave=W1-1017 [--base=https://zprintpro.com]
//   node scripts/v28_5-image-deploy.mjs indexnow --wave=W1-1017
//
// Safety (§12 三件套): count assertions + shape assertions + backup before any write.
// Never touches: titles/SEO fields/alt (sku-seo-data), seoImages blocks, middleware, sitemap-*.xml (page sitemaps).
// Rollback: git checkout of products.ts + delete public/images/products/v28_5/<slug>/ (old images never removed).

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const MANIFEST = '.hermes/geo/v28_5-deploy-manifest.json';
const PRODUCTS = 'src/data/products.ts';
const SITEMAP = 'public/sitemap-image.xml';
const LIB_ROOT = 'zprintpro-en-us-images/v28_5_webp';
const URL_ROOT = '/images/products/v28_5';   // used in products.ts + sitemap + live URLs
const FS_PUBLIC = 'public';                  // filesystem root for URL_ROOT
const LOCALES = ['zh-hk', 'en', 'ja'];
const VIEWS = ['hero', 'detail', 'variety', 'multi-angle'];
const RETIRED = new Set(['drink-tokens', 'cafe-table-cards', 'wedding-place-cards', 'save-the-date-cards', 'wedding-seating-charts', 'wedding-suite-bundle', 'eco-tote-bag', 'postcard-set', 'fluorescent-stickers']);

const args = process.argv.slice(2);
const getArg = (k) => { const a = args.find(x => x === `--${k}` || x.startsWith(`--${k}=`)); return a ? (a.includes('=') ? a.split('=').slice(1).join('=') : true) : undefined; };
const cmd = args[0];
const wave = getArg('wave');
const dryRun = !!getArg('dry-run');
const base = (typeof getArg('base') === 'string' ? getArg('base') : 'https://zprintpro.com').replace(/\/$/, '');
const fail = (msg) => { console.error('ABORT: ' + msg); process.exit(2); };

function loadManifest() {
  if (!fs.existsSync(MANIFEST)) fail(`manifest missing: ${MANIFEST} — run: node scripts/v28_5-build-manifest.mjs`);
  return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
}
function waveEntries(m, w) {
  if (!w) fail('--wave=<W1-1017|W2-1018|W3-1019|W4-1020|W5-1021|W6-1022|W6-1022-CTR-gated|W7-1023|CL-1017-with-cluster7|C107-1024-with-content|BC-1027> required');
  const list = m.entries.filter(e => e.wave === w && (e.verdict === 'deploy' || e.verdict === 'deploy-gated'));
  if (!list.length) fail(`no deployable entries for wave ${w} (verdict deploy/deploy-gated)`);
  return list;
}
function scanBalanced(s, openIdx, openCh, closeCh) {
  let depth = 0, inStr = null;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (inStr) { if (c === '\\') { i++; continue; } if (c === inStr) inStr = null; continue; }
    if (c === '\'' || c === '"' || c === '`') { inStr = c; continue; }
    if (c === openCh) depth++;
    else if (c === closeCh) { depth--; if (depth === 0) return i; }
  }
  return -1;
}
// slug -> { zh/en/ja files by view } from library dir
function libFilesOf(dir) {
  const out = {}; // locale -> view -> basename
  for (const f of fs.readdirSync(path.join(LIB_ROOT, dir))) {
    const m = f.match(/^zprintpro-(.+)-(en|ja|zh-hk)-(hero|detail|variety|multi-angle)\.webp$/);
    if (!m) fail(`unparsable filename in ${dir}: ${f}`);
    out[m[2]] ||= {}; out[m[2]][m[3]] = f;
  }
  for (const l of LOCALES) for (const v of VIEWS) if (!out[l]?.[v]) fail(`${dir} missing ${l}/${v}`);
  return out;
}
function libPaths(slug, dir) {
  const files = libFilesOf(dir);
  const p = {}; // locale -> [URL paths in VIEWS order]
  for (const l of LOCALES) p[l] = VIEWS.map(v => `${URL_ROOT}/${slug}/${files[l][v]}`);
  return { paths: p, files };
}
function extractIbl(block) {
  const m = block.match(/imagesByLocale:\s*\{/);
  if (!m) return null;
  const open = block.indexOf('{', m.index);
  const close = scanBalanced(block, open, '{', '}');
  if (close < 0) return null;
  const body = block.slice(open + 1, close);
  const res = {};
  for (const l of ['zh-hk', 'en', 'ja']) {
    const lm = body.match(new RegExp(`(?:'${l}'|\\b${l}):\\s*\\[([\\s\\S]*?)\\]`));
    res[l] = lm ? [...lm[1].matchAll(/'([^']+)'/g)].map(x => x[1]) : [];
  }
  return { res, start: m.index, open, close, lineStart: block.lastIndexOf('\n', m.index) + 1 };
}
function extractLegacyImages(block) {
  const m = block.match(/(^|\n)(\s*)images:\s*\[/);
  if (!m) return null;
  const open = block.indexOf('[', m.index);
  const close = scanBalanced(block, open, '[', ']');
  if (close < 0) return null;
  return { start: m.index, open, close, indent: m[2] };
}

// ---------------- list ----------------
if (cmd === 'list') {
  const m = loadManifest();
  const rows = wave ? m.entries.filter(e => e.wave === wave) : m.entries;
  for (const e of rows) console.log(`${e.dir}  ${e.slug || '-'}  verdict=${e.verdict}  wave=${e.wave || '-'}  ${e.gsc ? e.gsc.tier + '/' + e.gsc.imps + 'imps' : ''}`);
  console.log(`total=${rows.length}`);
  process.exit(0);
}

// ---------------- deploy ----------------
if (cmd === 'deploy') {
  const m = loadManifest();
  const entries = waveEntries(m, wave);
  console.log(`wave=${wave} entries=${entries.length} dryRun=${dryRun}`);

  // -- gate: for REAL deploy, src/ must be clean (no concurrent editor on products.ts); dry-run writes nothing
  if (!dryRun) {
    const st = spawnSync('git', ['status', '--porcelain', '--', PRODUCTS], { encoding: 'utf8', shell: true });
    if ((st.stdout || '').trim()) fail('products.ts has uncommitted changes — another session may be editing src/. Resolve §0.35.7 first.');
  } else {
    const st = spawnSync('git', ['status', '--porcelain', '--', PRODUCTS], { encoding: 'utf8', shell: true });
    if ((st.stdout || '').trim()) console.log('NOTE: products.ts currently dirty (concurrent session) — dry-run validates against current working tree; real deploy re-gates.');
  }

  // -- validate all entries first (abort before any write)
  const plan = [];
  for (const e of entries) {
    if (!e.slug || RETIRED.has(e.slug)) fail(`${e.dir}: retired/unknown slug`);
    if (e.files !== 12) fail(`${e.dir}: files=${e.files} != 12`);
    const { paths, files } = libPaths(e.slug, e.dir);
    for (const l of LOCALES) for (const v of VIEWS) {
      const src = path.join(LIB_ROOT, e.dir, files[l][v]);
      const sz = fs.statSync(src).size;
      if (sz > 120 * 1024) fail(`${src} ${sz}B > 120KB`);
    }
    const destDir = path.join(FS_PUBLIC, URL_ROOT, e.slug);
    const already = fs.existsSync(destDir) && fs.readdirSync(destDir).length > 0;
    if (already && !getArg('force')) fail(`${destDir} already non-empty (use --force to overwrite)`);
    plan.push({ e, paths, files, destDir });
  }
  console.log(`validation PASS for ${plan.length} entries`);

  if (dryRun) {
    for (const p of plan) {
      console.log(`DRY ${p.e.dir} -> ${p.e.slug}: copy 12 webp (${Object.values(p.paths).flat().length} paths)`);
      console.log(`   IBL <- ${JSON.stringify(p.paths)}`);
      console.log(`   legacy images <- ['${p.paths['zh-hk'][0]}']`);
    }
    console.log('DRY-RUN OK (no writes)');
    process.exit(0);
  }

  // -- copy images (count assertion)
  let copied = 0;
  for (const p of plan) {
    fs.mkdirSync(p.destDir, { recursive: true });
    for (const l of LOCALES) for (const v of VIEWS) {
      const src = path.join(LIB_ROOT, p.e.dir, p.files[l][v]);
      const dst = path.join(FS_PUBLIC, p.paths[l][VIEWS.indexOf(v)].replace(/^\//, ''));
      fs.copyFileSync(src, dst);
      if (fs.statSync(dst).size !== fs.statSync(src).size) fail(`copy size mismatch ${dst}`);
      copied++;
    }
  }
  if (copied !== plan.length * 12) fail(`copied=${copied} != expected ${plan.length * 12}`);
  console.log(`copied ${copied} webp files`);

  // -- patch products.ts
  const ts0 = fs.readFileSync(PRODUCTS, 'utf8');
  if (ts0.charCodeAt(0) === 0xFEFF) fail('products.ts has UTF-8 BOM — aborting');
  const prodStart = ts0.indexOf('export const products: Product[] = [');
  const prodEnd = ts0.indexOf('\n];', prodStart);
  const region = ts0.slice(prodStart, prodEnd);
  const slugIdx = [...region.matchAll(new RegExp(`\\bslug:\\s*'([a-z0-9-]+)'`, 'g'))].map(x => ({ slug: x[1], i: x.index }));
  let tsNew = ts0;
  const patched = [], skipped = [];
  for (const p of plan) {
    const si = slugIdx.findIndex(x => x.slug === p.e.slug);
    if (si < 0) fail(`slug ${p.e.slug} not found in products region`);
    const bStart = prodStart + slugIdx[si].i;
    const bEnd = si + 1 < slugIdx.length ? prodStart + slugIdx[si + 1].i : prodEnd;
    // recompute block against CURRENT tsNew (offsets shift after each replace)
    const curStart = tsNew.indexOf(`slug: '${p.e.slug}'`);
    if (curStart < 0) fail(`slug line vanished for ${p.e.slug}`);
    let curEnd = tsNew.length;
    for (const x of slugIdx) { if (x.slug === p.e.slug) continue; const ix = tsNew.indexOf(`slug: '${x.slug}'`, curStart + 1); if (ix > 0 && ix < curEnd) curEnd = ix; }
    let block = tsNew.slice(curStart, curEnd);
    if (block.includes('/images/products/v28_5/')) { skipped.push(p.e.slug); continue; }

    const ibl = extractIbl(block);
    if (!ibl) fail(`${p.e.slug}: imagesByLocale block not found`);
    const ind = block.slice(ibl.lineStart, ibl.start).match(/\s*$/)?.[0]?.match(/^\n?(\s*)/)?.[1] ?? '';
    const arr = (a) => `[${a.map(x => `'${x}'`).join(', ')}]`;
    const iblNew = `imagesByLocale: {\n${ind}  'zh-hk': ${arr(p.paths['zh-hk'])},\n${ind}  en: ${arr(p.paths.en)},\n${ind}  ja: ${arr(p.paths.ja)}\n${ind}}`;
    block = block.slice(0, ibl.start) + iblNew + block.slice(ibl.close + 1);

    const leg = extractLegacyImages(block);
    let legacyNote = 'legacy images: absent (skipped)';
    if (leg) { block = block.slice(0, leg.open) + `['${p.paths['zh-hk'][0]}']` + block.slice(leg.close + 1); legacyNote = `legacy images <- ['${p.paths['zh-hk'][0]}']`; }

    // shape assertion: re-extract
    const ibl2 = extractIbl(block);
    if (!ibl2) fail(`${p.e.slug}: post-patch IBL unparseable`);
    for (const l of LOCALES) {
      if (ibl2.res[l].length !== 4) fail(`${p.e.slug}: ${l} entries=${ibl2.res[l].length} != 4`);
      if (!ibl2.res[l].every(x => x.startsWith(`${URL_ROOT}/${p.e.slug}/`))) fail(`${p.e.slug}: ${l} path shape bad: ${ibl2.res[l].join(',')}`);
      if (!ibl2.res[l][0].endsWith('-hero.webp')) fail(`${p.e.slug}: ${l} first entry not hero`);
    }
    tsNew = tsNew.slice(0, curStart) + block + tsNew.slice(curEnd);
    patched.push({ slug: p.e.slug, dir: p.e.dir, legacyNote });
  }
  if (patched.length !== plan.length - skipped.length) fail(`patched=${patched.length} expected=${plan.length - skipped.length}`);
  console.log(`products.ts patched=${patched.length} skipped(already-v28_5)=${skipped.length}`);

  // -- backup + write
  const bakDir = `.hermes/_bak-v28_5-${wave}-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}`;
  fs.mkdirSync(bakDir, { recursive: true });
  fs.writeFileSync(path.join(bakDir, 'products.ts.before'), ts0, 'utf8');
  fs.writeFileSync(path.join(bakDir, 'wave-plan.json'), JSON.stringify({ wave, patched, skipped, entries: plan.map(p => ({ dir: p.e.dir, slug: p.e.slug, paths: p.paths })) }, null, 1), 'utf8');
  fs.writeFileSync(PRODUCTS, tsNew, 'utf8');
  const check = fs.readFileSync(PRODUCTS);
  if (check[0] === 0xFEFF) { fs.writeFileSync(PRODUCTS, ts0, 'utf8'); fail('BOM detected after write — reverted'); }
  if (!check.includes('智印港')) { fs.writeFileSync(PRODUCTS, ts0, 'utf8'); fail('utf8 sanity check failed — reverted'); }
  console.log(`backup -> ${bakDir}`);

  // -- sitemap regen + assertion (wave URLs must be present; pre-existing non-wave URLs must not regress)
  const beforeXml = fs.existsSync(SITEMAP) ? fs.readFileSync(SITEMAP, 'utf8') : '';
  const beforeSet = new Set([...beforeXml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1]));
  const waveSlugs = plan.map(p => p.e.slug);
  const gen = spawnSync('node', ['scripts/generate-image-sitemap.js'], { encoding: 'utf8', shell: true });
  if (gen.status !== 0) fail(`sitemap generator exit=${gen.status}: ${(gen.stderr || '').slice(0, 400)}`);
  const xml = fs.readFileSync(SITEMAP, 'utf8');
  const afterSet = new Set([...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1]));
  const lost = [...beforeSet].filter(u => !afterSet.has(u) && !waveSlugs.some(s => u.includes(s)));
  if (lost.length) fail(`sitemap regressed: ${lost.length} pre-existing non-wave image URLs dropped (e.g. ${lost.slice(0, 3).join(' | ')})`);
  const missing = [];
  for (const p of plan) {
    for (const l of LOCALES) {
      const page = `<loc>${base}/${l}/product/${p.e.slug}/</loc>`;
      if (!xml.includes(page)) missing.push('page:' + page);
    }
    for (const img of Object.values(p.paths).flat()) if (!xml.includes(img)) missing.push('img:' + img);
  }
  if (missing.length) fail(`sitemap missing ${missing.length} wave URLs (e.g. ${missing.slice(0, 5).join(' | ')}) — check generator page/image URL format`);
  console.log(`sitemap regen OK: image:loc ${beforeSet.size} -> ${afterSet.size}, wave URLs all present, 0 non-wave regression`);

  console.log('\nDONE. Next steps (manual, per §0.25/§12):');
  console.log('  1) node scripts/check-encoding.js && npx tsc --noEmit (增量 0)');
  console.log(`  2) git add public/images/products/v28_5 src/data/products.ts public/sitemap-image.xml && git commit`);
  console.log('  3) node scripts/push-gate-check.mjs  (单独调用, 非 0 终止)');
  console.log('  4) git push && node scripts/verify-deploy.mjs');
  console.log(`  5) node scripts/v28_5-image-deploy.mjs probe --wave=${wave}`);
  console.log(`  6) node scripts/v28_5-image-deploy.mjs indexnow --wave=${wave}`);
  process.exit(0);
}

// ---------------- probe (post-push) ----------------
if (cmd === 'probe') {
  const m = loadManifest();
  const entries = waveEntries(m, wave);
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const results = []; let bad = 0;
  for (const e of entries) {
    const { paths, files } = libPaths(e.slug, e.dir);
    for (const l of LOCALES) {
      await sleep(250);
      let html = '';
      try {
        const r = await fetch(`${base}/${l}/product/${e.slug}/`, { headers: { 'user-agent': 'v28_5-probe/1.0' } });
        html = r.status === 200 ? await r.text() : '';
        const okPdp = r.status === 200 && html.includes(`${URL_ROOT}/${e.slug}/`);
        if (!okPdp) { bad++; results.push({ slug: e.slug, locale: l, check: 'pdp-src', ok: false, status: r.status }); } else results.push({ slug: e.slug, locale: l, check: 'pdp-src', ok: true });
      } catch (err) { bad++; results.push({ slug: e.slug, locale: l, check: 'pdp-src', ok: false, error: String(err).slice(0, 120) }); }
      for (const v of VIEWS) {
        await sleep(200);
        const url = `${base}${paths[l][VIEWS.indexOf(v) >= 0 ? VIEWS.indexOf(v) : 0]}`;
        try {
          const r = await fetch(url, { method: 'GET', headers: { 'user-agent': 'v28_5-probe/1.0' } });
          const localSize = fs.statSync(path.join('public', paths[l][VIEWS.indexOf(v)])).size;
          const len = Number(r.headers.get('content-length') || -1);
          const ok = r.status === 200 && (len === localSize || len === -1);
          if (!ok) bad++;
          results.push({ slug: e.slug, locale: l, view: v, url, status: r.status, len, localSize, ok });
        } catch (err) { bad++; results.push({ slug: e.slug, locale: l, view: v, url, ok: false, error: String(err).slice(0, 120) }); }
      }
    }
    console.log(`probed ${e.slug} (bad so far=${bad})`);
  }
  const xml = await (await fetch(`${base}/sitemap-image.xml`)).text();
  const sitemapHits = Object.values(entries.flatMap(e => { const { paths } = libPaths(e.slug, e.dir); return Object.values(paths).flat(); })).filter(u => xml.includes(u)).length;
  const totalImg = entries.length * 12;
  console.log(`sitemap-image: ${sitemapHits}/${totalImg} wave image URLs present`);
  const out = `.hermes/logs/v28_5-probe-${wave}-${new Date().toISOString().slice(0, 10)}.json`;
  fs.mkdirSync('.hermes/logs', { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ wave, base, bad, sitemapHits, totalImg, results }, null, 1), 'utf8');
  console.log(`probe report -> ${out}  BAD=${bad}`);
  process.exit(bad === 0 && sitemapHits === totalImg ? 0 : 1);
}

// ---------------- indexnow (post-push) ----------------
if (cmd === 'indexnow') {
  const m = loadManifest();
  const entries = waveEntries(m, wave);
  let key = null;
  try {
    const kf = JSON.parse(fs.readFileSync('.hermes/secrets/indexnow-key.json', 'utf8'));
    key = JSON.stringify(kf).match(/[a-f0-9]{32}/)?.[0];
  } catch { /* handled below */ }
  if (!key) fail('indexnow key not found in .hermes/secrets/indexnow-key.json');
  const host = base.replace(/^https?:\/\//, '');
  const urlList = entries.flatMap(e => LOCALES.map(l => `${base}/${l}/product/${e.slug}/`));
  const body = { host, key, keyLocation: `${base}/${key}.txt`, urlList };
  const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
  const logLine = { at: new Date().toISOString(), wave, count: urlList.length, status: r.status, ok: r.status === 200 || r.status === 202 };
  fs.mkdirSync('.hermes/logs', { recursive: true });
  fs.appendFileSync('.hermes/logs/indexnow-v28_5.log', JSON.stringify(logLine) + '\n', 'utf8');
  console.log(`indexnow POST status=${r.status} urls=${urlList.length} (key not logged)`);
  process.exit(logLine.ok ? 0 : 1);
}

fail(`unknown command '${cmd}' — use list|deploy|probe|indexnow`);
