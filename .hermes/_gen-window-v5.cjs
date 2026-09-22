const { execSync } = require('child_process');
const fs = require('fs');
const ROOT = 'F:/zprintpro-nextjs';

function parseTitles(src) {
  const out = {};
  const starts = [...src.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: src.length });
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = src.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (m) out[`${starts[i].slug}|${loc}`] = m[1].replace(/\\"/g, '"');
    }
  }
  return out;
}

const parentSrc = execSync('git show 8267e8bf:src/data/sku-seo-data.ts', { cwd: ROOT, encoding: 'utf8', maxBuffer: 30 * 1024 * 1024 });
const curSrc = fs.readFileSync(ROOT + '/src/data/sku-seo-data.ts', 'utf8');
const parent = parseTitles(parentSrc);
const cur = parseTitles(curSrc);
const changed = [];
for (const k of Object.keys(cur)) {
  if ((parent[k] || '') !== cur[k]) changed.push({ key: k, oldTitle: parent[k] || '', newTitle: cur[k] });
}
console.log('changed vs parent (8267e8bf):', changed.length);

const mine = JSON.parse(fs.readFileSync(ROOT + '/.hermes/rollback-title-v5-b2-2026-09-23.json', 'utf8'));
const mineKeys = new Set(mine.map((r) => `${r.slug}|${r.locale}`));
const k3Slots = changed.filter((c) => !mineKeys.has(c.key)).map((c) => {
  const [slug, locale] = c.key.split('|');
  return { slug, locale, oldTitle: c.oldTitle, newTitle: c.newTitle };
});
const mineSlots = changed.filter((c) => mineKeys.has(c.key)).map((c) => {
  const [slug, locale] = c.key.split('|');
  return { slug, locale, oldTitle: c.oldTitle, newTitle: c.newTitle };
});
console.log('K3 slots:', k3Slots.length, '| my slots:', mineSlots.length);

const g = JSON.parse(fs.readFileSync(ROOT + '/.hermes/gsc-2026-09-18/extract.json', 'utf8'));
const pages = g.new.combo_28d['网页'] || [];
const slugOf = {};
for (const p of pages) {
  const u = p['网页'] || '';
  const m = u.match(/\/product\/([a-z0-9-]+)(?:\/|$)/) || u.match(/\/([a-z0-9-]+)$/);
  if (!m) continue;
  const s = m[1].replace(/(?:-|\/)?(zh-hk|en|ja)$/, '');
  if (!slugOf[s] || (p['展示'] || 0) > slugOf[s].imps) slugOf[s] = { imps: p['展示'] || 0, clicks: p['点击次数'] || 0, pos: p['排名'] || null };
}
const gscOf = (slug) => slugOf[slug] || { imps: 0, clicks: 0, pos: null };
const slots = [
  ...k3Slots.map((s) => ({ ...s, gscBaseline: gscOf(s.slug) })),
  ...mineSlots.map((s) => ({ ...s, gscBaseline: gscOf(s.slug) })),
];
const out = {
  batch: 'title-v5-2026-09-23 (K3 d3f165fc 28槽 + 本会话 12槽)',
  appliedDate: '2026-09-23',
  windowDays: 10,
  windowEnd: '2026-10-03',
  baselineDate: '2026-09-18',
  rule: 'v5 规则 docs/zprintpro-sku-title-rule-v5-2026-09-23.md；窗内只读，同簇不得再改 (churn 是排名杀手)；起算日=修复日 2026-09-23',
  slots,
};
fs.writeFileSync(ROOT + '/.hermes/title-verify-window-v5-20260923.json', JSON.stringify(out, null, 1));
console.log('written; total:', slots.length);
console.log('K3 sample:', k3Slots.slice(0, 3).map((s) => `${s.slug}|${s.locale}: ${s.oldTitle} -> ${s.newTitle}`));
