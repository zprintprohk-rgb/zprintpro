// nengajo launch probe — 3 locales should be 200 (was 404 pre-launch)
const locales = ['zh-hk', 'en', 'ja'];
const results = [];
for (const L of locales) {
  try {
    const r = await fetch(`https://zprintpro.com/${L}/nengajo-2027/`, { redirect: 'follow' });
    const t = await r.text();
    results.push(`${L}=${r.status} len=${t.length} has2027=${t.includes('2027')}`);
  } catch (e) {
    results.push(`${L}=ERR ${e.message}`);
  }
}
console.log(results.join('\n'));
// sitemap registration check
const sm = await (await fetch('https://zprintpro.com/sitemap-zh-hk.xml')).text();
console.log('SITEMAP_HAS_NENGAJO=' + sm.includes('/zh-hk/nengajo-2027/'));
console.log('NJ_PROBE_DONE');
