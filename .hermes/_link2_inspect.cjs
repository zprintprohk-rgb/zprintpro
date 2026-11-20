// .hermes/_link2_inspect.cjs — eco-printing / restaurant-menu 三语内链现状 + 锚点机会
const fs = require('fs');
for (const l of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`src/data/blog-data/${l}.json`, 'utf8'));
  for (const slug of ['eco-printing', 'restaurant-menu-printing-guide']) {
    const c = (j[slug] || {}).content || '';
    const links = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    const pkgLinks = links.filter(h => /category\/packaging|product\/(food-boxes|folding-boxes|mailer-boxes|white-card-bags|kraft-paper-bags)/.test(h));
    // 找含包裝/盒/packaging 的段 (无链接的)
    const paras = c.split(/<\/p>|<h2|<h3|<li/).filter(p => /包裝|盒|包材|packaging|パッケージ|箱/i.test(p) && !/href=/.test(p));
    console.log(`\n[${l}|${slug}] totalLinks=${links.length} pkgLinks=${pkgLinks.length}`);
    console.log('  pkg hrefs:', pkgLinks.join(' | ') || '(none)');
    paras.slice(0, 2).forEach((p, i) => console.log(`  anchorCand${i + 1}:`, JSON.stringify(p.replace(/<[^>]+>/g, '').trim().slice(0, 120))));
  }
}
