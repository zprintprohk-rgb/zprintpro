// 最终线上验证 v4 — same-day-flyers FAQ 修复 (c5cfdf9b) 部署确认 + 全量复扫
const BASE = 'https://www.zprintpro.com';
const FLYERS = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];
const LOCALES = ['zh-hk','en','ja'];
const WORDS = { 'zh-hk': ['圓角','圓角模切'], en: ['rounded corners'], ja: ['丸角','角丸'] };
async function get(url) {
  const r = await fetch(BASE + url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now() + Math.random(), { redirect: 'follow' });
  return { status: r.status, text: await r.text() };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const deadline = Date.now() + 12 * 60 * 1000;
  let live = false;
  while (Date.now() < deadline && !live) {
    try {
      const { text } = await get('/zh-hk/product/same-day-flyers/');
      if (text.includes('可加覆膜（啞膜／光膜）') && !text.includes('圓角')) { live = true; console.log(`✅ c5cfdf9b 已上线 (${new Date().toISOString()})`); }
      else console.log('⏳ 旧版仍在 @ ' + new Date().toISOString().slice(11, 19));
    } catch (e) { console.log('⏳', e.message); }
    if (!live) await sleep(20000);
  }
  if (!live) { console.log('⏰ 12min 未上线'); process.exit(0); }

  let bad = 0;
  console.log('\n=== 全量复扫 (8 flyers × 3 locale) ===');
  for (const slug of FLYERS) {
    for (const loc of LOCALES) {
      try {
        const { status, text } = await get(`/${loc}/product/${slug}/`);
        const hits = WORDS[loc].reduce((n, w) => n + (text.match(new RegExp(w, 'g')) || []).length, 0);
        if (hits > 0) bad++;
        console.log(`${hits === 0 ? '✅' : '❌'} ${loc} ${slug} [${status}] 圆角词: ${hits}`);
      } catch (e) { console.log(`❌ ${loc} ${slug}: ${e.message}`); bad++; }
    }
  }
  console.log(`\n=== 最终残留: ${bad} ===`);
})().catch((e) => { console.error(e.message); process.exit(1); });
