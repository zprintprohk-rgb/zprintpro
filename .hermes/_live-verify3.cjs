// 线上断言探针 v3 — flyer FAQ 按品类定制 (ff2ee768) 部署验证
// NEW 指纹: zh-hk a4-flyers 含「傳單常用工藝」(新 FAQ) 且 全页无「圓角」
const BASE = 'https://www.zprintpro.com';
async function get(url) {
  const r = await fetch(BASE + url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now(), {
    redirect: 'follow',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; zprintpro-verify-v3)' },
  });
  return { status: r.status, text: await r.text() };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const deadline = Date.now() + 12 * 60 * 1000;
  let newLive = false;
  while (Date.now() < deadline && !newLive) {
    try {
      const { text } = await get('/zh-hk/product/a4-flyers/');
      if (text.includes('傳單常用工藝')) { newLive = true; console.log(`✅ 新版已上线 (${new Date().toISOString()})`); }
      else console.log('⏳ 旧版仍在 @ ' + new Date().toISOString().slice(11, 19));
    } catch (e) { console.log('⏳ fetch error:', e.message); }
    if (!newLive) await sleep(20000);
  }
  if (!newLive) { console.log('⏰ 12min 未上线'); process.exit(0); }

  const checks = [
    { url: '/zh-hk/product/a4-flyers/', want: '傳單常用工藝', noWant: '圓角', label: 'zh-hk a4 FAQ 定制+无圆角' },
    { url: '/zh-hk/product/eco-flyers/', want: '傳單常用工藝', noWant: '圓角', label: 'zh-hk eco FAQ 定制+无圆角' },
    { url: '/zh-hk/product/same-day-flyers/', want: '傳單常用工藝', noWant: '圓角', label: 'zh-hk same-day FAQ 定制+无圆角' },
    { url: '/en/product/a5-flyers/', want: 'standard die-cutting', noWant: 'rounded corners', label: 'en a5 FAQ 定制+无rounded' },
    { url: '/ja/product/a4-flyers/', want: '標準型抜き裁断', noWant: '丸角', label: 'ja a4 FAQ 定制+无丸角' },
  ];
  console.log('\n=== flyer FAQ 按品类断言 ===');
  for (const c of checks) {
    try {
      const { status, text } = await get(c.url);
      const has = text.includes(c.want);
      const no = !text.includes(c.noWant);
      console.log(`${has && no ? '✅' : '❌'} ${c.label} [${status}] 含「${c.want.slice(0, 12)}」=${has} 无「${c.noWant}」=${no}`);
    } catch (e) { console.log(`❌ ${c.url}: ${e.message}`); }
  }
})().catch((e) => { console.error('探针异常:', e.message); process.exit(1); });
