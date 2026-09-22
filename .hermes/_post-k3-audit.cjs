/**
 * post-k3-v5-audit.cjs — 对 d3f165fc（K3 v5 长尾补源修复）后的当前文件做 v5 合规复审计
 * 修正：en 钩子正则不再把 Free US Ship / Free Shipping 计为数字钩子
 */
const fs = require('fs');
const { equiv, band, TITLE_MIN, TITLE_MAX } = require('F:/zprintpro-nextjs/scripts/guards/title-equiv.js');

const txt = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });

const HOOK = {
  'zh-hk': /(起印|起$|張|個|本起|冊|套|HK\$\s?\d|即日|小時|打稿|急件|交貨)/,
  en: /(\bMOQ\b|\bpcs?\b|\bfrom\s+\$\d|\$\s?\d|days?|hours?|\b24h\b|rush|express|delivery)/i,
  ja: /(〜|枚|個|冊|本|張|部|¥\d|即日|納期|短納期|特急|時間)/,
};
const EMPTY_WORDS = /(最安|安い|激安|品質保證|專業印刷|高品質|Free US Ship|Free Shipping \$99|免費送貨|低至)/i;

const issues = [];
const rows = [];
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  const slug = starts[i].slug;
  const nameM = seg.match(/"name": \{\s*"zh-hk": "((?:[^"\\]|\\.)*)"/);
  const nameEnM = seg.match(/"name": \{\s*"en": "((?:[^"\\]|\\.)*)"/);
  const nameJaM = seg.match(/"name": \{\s*"ja": "((?:[^"\\]|\\.)*)"/);
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) continue;
    const t = m[1];
    const e = equiv(t), b = band(t);
    const parts = t.split('|').map((s) => s.trim()).filter(Boolean);
    const noHook = !HOOK[loc].test(t);
    const empty = EMPTY_WORDS.test(t);
    const problems = [];
    if (e < TITLE_MIN || e > TITLE_MAX) problems.push(`BAND ${e}`);
    if (noHook) problems.push('无钩子');
    if (empty) problems.push('空洞词');
    if (parts.length < 2 && /[|]/.test(t)) problems.push('段数少');
    // 品牌检查
    if (loc === 'zh-hk' && !t.includes('智印港')) problems.push('缺品牌');
    if (loc !== 'zh-hk' && !t.includes('ZprintPro')) problems.push('缺品牌');
    if (problems.length) {
      const name = loc === 'zh-hk' ? nameM?.[1] : loc === 'en' ? nameEnM?.[1] : nameJaM?.[1];
      rows.push({ slug, locale: loc, title: t, equiv: e, band: b, problems, name: (name || '').split('|')[0].trim() });
      issues.push(`${slug}|${loc} [${problems.join(',')}] eq=${e} ${t}  (name: ${(name || '').split('|')[0].trim()})`);
    }
  }
}
console.log('=== remaining v5 issues after K3 d3f165fc ===');
for (const l of issues) console.log(l);
console.log(`\ntotal issue slots: ${rows.length}`);
fs.writeFileSync('F:/zprintpro-nextjs/.hermes/reports/post-k3-v5-audit-2026-09-23.json', JSON.stringify(rows, null, 1));
