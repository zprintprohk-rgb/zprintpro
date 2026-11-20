// .hermes/_probe_cat_md.mjs — 全部类目页 裸 markdown 缺陷面
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const cats = ['packaging', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'stickers', 'flyers', 'posters', 'paper-bags', 'japan-doujin', 'greeting-cards'];
let total = 0, hitCats = [];
for (const c of cats) {
  const url = `https://zprintpro.com/zh-hk/category/${c}/`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA } });
    const b = await r.text();
    // 裸 markdown = 可见文本里出现 ]( 或 【...】 形式的 [label](/path)
    const raw = (b.match(/\[[^\]<]{1,18}\]\(\/[a-z0-9\-\/]+\)/g) || []);
    const uniq = [...new Set(raw)];
    if (uniq.length) { hitCats.push(c + ':' + uniq.length); total += uniq.length; }
    console.log(`${r.status} ${c} len=${b.length} rawMd=${uniq.length}`);
    if (uniq.length) console.log('    e.g.', uniq.slice(0, 3).join(' | '));
  } catch (e) {
    console.log('ERR', c, e.message);
  }
}
console.log('\n== cats with raw markdown:', hitCats.length, '/', cats.length, '| instances:', total);
console.log(hitCats.join(' '));
