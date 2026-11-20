// Diagnostic: locale values in locale_opportunities + locate missing zh money words
const fs = require('fs');
const p = 'F:/zprintpro-nextjs/.hermes/logs/gsc-deep-analysis-2026-10-26.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8').replace(/\bNaN\b/g, 'null'));
const LO = j.locale_opportunities || [];
const counts = {};
for (const r of LO) counts[r.locale] = (counts[r.locale] || 0) + 1;
console.log('locale_opportunities locales:', JSON.stringify(counts));
for (const w of ['食品包裝印刷', '紙袋印刷', '騎馬釘印刷', '月曆印刷', '貼紙印刷', '海報印刷']) {
  const hits = LO.filter((r) => r.query === w);
  console.log(w, '->', hits.length ? hits.map((h) => `${h.locale}(imps=${h.imps_cur},pos=${h.pos_cur})`).join(' | ') : 'NOT IN JSON');
}
console.log('full_total:', JSON.stringify(j.full_total));
console.log('full_locale locales:', (j.full_locale || []).map((r) => r.locale).join(','));
// Also: check markets present in query_market
console.log('query_market:', (j.query_market || []).map((r) => `${r.market}:imps=${r.imps_cur}`).join(' | '));
