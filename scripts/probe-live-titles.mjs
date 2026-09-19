/**
 * probe-live-titles.mjs — 线上 SKU title 探针 (真值校验)
 *
 * 用途: 校验 src/data/sku-seo-data.ts 的 title 与线上实际 <title> 是否一致。
 * 纪律 (§0.23.2 三闸门):
 *   - 串行 + 间隔 (防限流假 0)
 *   - 每响应三重校验: 状态码 200 + 长度下限 + 页面 marker
 *   - 不合格判 INVALID, 不计入「不一致」
 *
 * 用法:
 *   node scripts/probe-live-titles.mjs waterproof-stickers large-envelopes a2-posters
 *   node scripts/probe-live-titles.mjs --from-census FILL --limit 10
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CENSUS = path.join(ROOT, '.hermes/reports/sku-title-census-2026-09-19.json');
const LOCALES = ['zh-hk', 'en', 'ja'];
const ORIGIN = 'https://zprintpro.com';
const UA = 'Mozilla/5.0 (compatible; zprintpro-title-probe/1.0)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

async function fetchTitle(url) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
      const status = res.status;
      const html = await res.text();
      const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = m ? decodeEntities(m[1]).trim() : null;
      const ok = status === 200 && !!title && html.length > 3000 && /<meta[^>]+name=["']description["']/i.test(html);
      return { status, title, bytes: html.length, valid: ok, attempt };
    } catch (e) {
      if (attempt === 2) return { status: 'ERR', title: null, bytes: 0, valid: false, error: e.message, attempt };
      await sleep(1500);
    }
  }
}

/* ---- 目标集 ---- */
const args = process.argv.slice(2);
let targets = [];

if (args.includes('--from-census')) {
  const band = args[args.indexOf('--from-census') + 1];
  const limit = args.includes('--limit') ? Number(args[args.indexOf('--limit') + 1]) : 10;
  const census = JSON.parse(fs.readFileSync(CENSUS, 'utf8'));
  targets = census.rows
    .filter((r) => r.band === band && r.gsc)
    .sort((a, b) => (b.gsc?.imps || 0) - (a.gsc?.imps || 0))
    .slice(0, limit)
    .map((r) => ({ slug: r.slug, locale: r.locale, expected: r.title, equiv: r.equiv, imps: r.gsc.imps }));
} else {
  const census = fs.existsSync(CENSUS) ? JSON.parse(fs.readFileSync(CENSUS, 'utf8')) : { rows: [] };
  for (const slug of args.filter((a) => !a.startsWith('--'))) {
    for (const locale of LOCALES) {
      const row = census.rows.find((r) => r.slug === slug && r.locale === locale);
      targets.push({ slug, locale, expected: row?.title ?? null, equiv: row?.equiv ?? null, imps: row?.gsc?.imps ?? null });
    }
  }
}

if (!targets.length) {
  console.error('no targets. usage: node scripts/probe-live-titles.mjs <slug...> | --from-census FILL --limit N');
  process.exit(1);
}

/* ---- 串行探测 ---- */
const results = [];
for (const t of targets) {
  const url = `${ORIGIN}/${t.locale}/product/${t.slug}/`;
  const r = await fetchTitle(url);
  const local = t.expected || '';
  // 线上 <title> 可能带站点后缀, 用「本地 title 是否为线上 title 的前缀段」判定一致性
  let verdict = 'INVALID';
  if (r.valid) {
    if (r.title === local) verdict = 'MATCH';
    else if (local && r.title.includes(local.replace(/\s*\|\s*[^|]*$/, '').trim())) verdict = 'MATCH_MOD';
    else verdict = 'DIFF';
  }
  results.push({ ...t, url, live: r.title, status: r.status, valid: r.valid, bytes: r.bytes, verdict });
  const flag = verdict === 'DIFF' ? '🔴' : verdict === 'INVALID' ? '⚠️' : '✅';
  console.log(`${flag} ${verdict}\t${t.locale}\t${t.slug}\tlocal(${t.equiv})=${local.slice(0, 48)}`);
  if (verdict !== 'MATCH') console.log(`      live=${(r.title || '(none)').slice(0, 90)} status=${r.status}`);
  await sleep(700);
}

const tally = results.reduce((m, r) => ((m[r.verdict] = (m[r.verdict] || 0) + 1), m), {});
console.log('\ntally:', JSON.stringify(tally));
const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'live-title-probe-2026-09-19.json');
fs.writeFileSync(outFile, JSON.stringify({ probedAt: new Date().toISOString(), tally, results }, null, 1));
console.log('report:', path.relative(ROOT, outFile).replace(/\\/g, '/'));
