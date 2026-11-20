// .hermes/_probe_cat_enja_md.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const MD = /\[[^\]<]{1,40}\]\(\/[a-z0-9\-\/]+\)/g;
for (const [loc, cats] of [['en', ['packaging', 'menus', 'calendars', 'red-packets']], ['ja', ['packaging', 'menus']]]) {
  for (const c of cats) {
    const u = `/${loc}/category/${c}/`;
    const r = await fetch('https://zprintpro.com' + u, { headers: { 'user-agent': UA } });
    const b = await r.text();
    const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
    const n = (vis.match(MD) || []).length;
    const stars = (vis.match(/\*\*/g) || []).length;
    console.log(`${r.status} ${u} md=${n} stars=${stars}`);
  }
}
