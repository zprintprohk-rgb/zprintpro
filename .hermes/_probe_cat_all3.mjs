// .hermes/_probe_cat_all3.mjs — 三语全类目裸 markdown 基线/验收
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g;
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
let grand = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  let tot = 0, detail = [];
  for (const c of cats) {
    const r = await fetch(`https://zprintpro.com/${loc}/category/${c}/`, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    const n = (vis.match(MD) || []).length;
    if (n) { tot += n; detail.push(`${c}:${n}`); }
  }
  grand += tot;
  console.log(`${loc}: rawMd=${tot} ${detail.join(' ')}`);
}
console.log('GRAND', grand);
