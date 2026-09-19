// .hermes/logs/_locate-art-posters-residual.mjs — 定位 art-posters 頁面的「100 張起印」殘留來源
const url = 'https://zprintpro.com/zh-hk/product/art-posters/';
const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZP-probe/1.0)' } });
const html = await res.text();
console.log(`HTTP ${res.status} | ${html.length} bytes\n`);

const needles = ['100 張起印', '100張起印', '1 張起印', '1張起印', '100 張', 'HK$26'];
for (const n of needles) {
  const idxs = [];
  let i = -1;
  while ((i = html.indexOf(n, i + 1)) >= 0) idxs.push(i);
  console.log(`「${n}」出現 ${idxs.length} 次`);
  for (const idx of idxs.slice(0, 4)) {
    const s = Math.max(0, idx - 90);
    const e = Math.min(html.length, idx + 60);
    console.log(`   @${idx}: …${html.slice(s, e).replace(/\s+/g, ' ')}…`);
  }
  console.log('');
}
