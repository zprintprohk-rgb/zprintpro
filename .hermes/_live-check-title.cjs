const base = 'https://zprintpro.com';
const probes = [
  ['en', 'electronics-packaging-box'],
  ['ja', 'outdoor-vinyl-banners'],
];
(async () => {
  for (const [loc, slug] of probes) {
    const paths = [`${base}/${loc}/product/${slug}`, `${base}/product/${slug}`];
    let done = false;
    for (const p of paths) {
      try {
        const r = await fetch(p, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } });
        const t = await r.text();
        const m = t.match(/<title>([\s\S]*?)<\/title>/);
        console.log(`${r.status} | ${r.url} | title: ${(m ? m[1].trim() : '?').slice(0, 80)}`);
        done = true;
        break;
      } catch (e) { console.log(`ERR ${p}: ${e.message.slice(0, 60)}`); }
    }
    if (!done) console.log(`FAIL ${loc}/${slug}: all paths errored`);
  }
})();
