// Exhaustive script audit: find EVERY ld+json script regardless of attribute style, count Product nodes + brand + @id collisions
const url = 'https://zprintpro.com/zh-hk/product/handle-bags/';
const html = await (await fetch(url)).text();

// 1) every <script ...> opening tag that mentions ld+json in ANY form
const scriptOpenTags = [...html.matchAll(/<script\b[^>]*>/gi)].map(m => m[0]);
const ldTags = scriptOpenTags.filter(t => /ld\+json/i.test(t));
console.log('total <script> tags:', scriptOpenTags.length, '| ld+json tags:', ldTags.length);
ldTags.forEach((t, i) => console.log(`  ldTag${i}:`, t.replace(/\s+/g, ' ').slice(0, 120)));

// 2) parse every ld+json block (match from its opening tag to the next </script>)
const blocks = [];
const re = /<script\b[^>]*ld\+json[^>]*>([\s\S]*?)<\/script>/gi;
let m;
while ((m = re.exec(html)) !== null) {
  blocks.push({ open: m[0].slice(0, m[0].indexOf('>') + 1), body: m[1] });
}
console.log('\nparsed blocks:', blocks.length);

function walk(node, fn, path = '$') {
  if (!node || typeof node !== 'object') return;
  fn(node, path);
  if (Array.isArray(node)) node.forEach((n, i) => walk(n, fn, `${path}[${i}]`));
  else for (const [k, v] of Object.entries(node)) walk(v, fn, `${path}.${k}`);
}

let productCount = 0;
const brandPaths = [];
const idPaths = [];
blocks.forEach((b, bi) => {
  let j;
  try { j = JSON.parse(b.body); } catch { console.log(`block${bi}: PARSE ERROR`); return; }
  walk(j, (n, path) => {
    const t = n['@type'];
    if (t === 'Product' || (Array.isArray(t) && t.includes('Product'))) {
      productCount++;
      console.log(`block${bi} PRODUCT at ${path} | @id=${n['@id'] || '(none)'} | brand=${JSON.stringify(n.brand && (n.brand.name || n.brand)).slice(0, 60)}`);
    }
    if (n && typeof n === 'object' && 'brand' in n) brandPaths.push(`block${bi}:${path}`);
    if (n && typeof n === 'object' && typeof n['@id'] === 'string' && n['@id'].includes('#product')) idPaths.push(`block${bi}:${path}=${n['@id']}`);
  });
});
console.log('\nPRODUCT nodes total:', productCount);
console.log('brand holders:', brandPaths.join(' | ') || '(none)');
console.log('#product @id holders:', idPaths.join(' | ') || '(none)');

// 3) raw counts
console.log('\nraw "#product" occurrences in HTML:', (html.match(/#product/g) || []).length);
console.log('raw "application/ld+json" occurrences:', (html.match(/application\/ld\+json/gi) || []).length);
console.log('raw "buildProductSchema"-ish marker "ProcureAction" count:', (html.match(/ProcureAction/g) || []).length);
console.log('HTML_SHOULD_BE_CLOSED:', html.includes('</html>'));
