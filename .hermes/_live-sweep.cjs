// 全量线上扫描: 8 个 flyer SKU × 3 locale, 检测圆角残留 (zh:圓角 / en:rounded corners / ja:丸角)
const BASE = 'https://www.zprintpro.com';
const FLYERS = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];
const LOCALES = ['zh-hk','en','ja'];
const WORDS = { 'zh-hk': '圓角', en: 'rounded corners', ja: '丸角' };
(async () => {
  let bad = 0;
  for (const slug of FLYERS) {
    for (const loc of LOCALES) {
      try {
        const r = await fetch(`${BASE}/${loc}/product/${slug}/?_cb=${Date.now()}${Math.random()}`, { redirect: 'follow' });
        const text = await r.text();
        const hits = (text.match(new RegExp(WORDS[loc], 'g')) || []).length;
        const ctx = hits ? text.slice(Math.max(0, text.indexOf(WORDS[loc]) - 60), text.indexOf(WORDS[loc]) + 80).replace(/\s+/g, ' ') : '';
        const ok = hits === 0;
        if (!ok) bad++;
        console.log(`${ok ? '✅' : '❌'} ${loc} ${slug} [${r.status}] ${WORDS[loc]}: ${hits}${ctx ? ' → …' + ctx + '…' : ''}`);
      } catch (e) { console.log(`❌ ${loc} ${slug}: ${e.message}`); }
    }
  }
  console.log(`\n=== 残留总数: ${bad} ===`);
})().catch((e) => { console.error(e.message); process.exit(1); });
