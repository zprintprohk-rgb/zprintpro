// .hermes/_probe_visible_md.mjs — 仅 <main> 内可见文本的裸 markdown 快检
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,40}\]\(\/[a-z0-9\-\/]+\)/g;
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
let grand = 0;
for (const loc of ['zh-hk', 'en', 'ja']) {
  let tot = 0; const detail = [];
  for (const c of cats) {
    const r = await fetch(`https://zprintpro.com/${loc}/category/${c}/`, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const m = b.match(/<main[\s\S]*?<\/main>/);
    const vis = (m ? m[0] : b).replace(/<[^>]+>/g, ' ');
    const n = (vis.match(MD) || []).length;
    if (n) { tot += n; detail.push(`${c}:${n}`); }
  }
  grand += tot;
  console.log(`${loc}: visibleMd=${tot} ${detail.join(' ')}`);
}
console.log('GRAND', grand);
