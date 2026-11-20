// 线上断言探针 v2 — 等 NEW 版 (8f10f55d) 上线后再断言
// NEW 版指纹: zh-hk a4-flyers 含「10 張與 24」(新模板 nextTier=25) 且 无「圓角覆膜」(旧 title)
const BASE = 'https://www.zprintpro.com';
async function get(url) {
  const r = await fetch(BASE + url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now(), {
    redirect: 'follow',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; zprintpro-verify-v2)' },
  });
  return { status: r.status, text: await r.text() };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const deadline = Date.now() + 12 * 60 * 1000; // 12min
  let newLive = false;
  while (Date.now() < deadline && !newLive) {
    try {
      const { text } = await get('/zh-hk/product/a4-flyers/');
      const hasNew = text.includes('10 與 24 張都接') && !text.includes('圓角覆膜');
      if (hasNew) { newLive = true; console.log(`✅ 新版已上线 (8f10f55d 部署完成, ${new Date().toISOString()})`); }
      else {
        const oldBlock = text.includes('10 張與 99') ? '旧块在' : '旧块无';
        const oldTitle = text.includes('圓角覆膜') ? '旧title在' : '旧title无';
        console.log(`⏳ 旧版仍在 (${oldBlock} / ${oldTitle}) @ ${new Date().toISOString().slice(11, 19)}`);
      }
    } catch (e) { console.log('⏳ fetch error:', e.message); }
    if (!newLive) await sleep(20000);
  }
  if (!newLive) { console.log('⏰ 12min 内未上线, 结束探针'); process.exit(0); }

  const pages = [
    { url: '/en/product/a4-flyers/', wantBrand: 'ZprintPro' },
    { url: '/ja/product/a4-flyers/', wantBrand: 'ZprintPro' },
    { url: '/zh-hk/product/a4-flyers/', wantBrand: '智印港' },
  ];
  const moqPages = [
    { url: '/zh-hk/product/a4-flyers/', want: '10 張起印。10 與 24 張都接', want2: '25 張以上單張明顯較平' },
    { url: '/zh-hk/product/waterproof-stickers/', want: '10 張起印。10 與 24 張都接', want2: '25 張以上單張明顯較平' },
    { url: '/en/product/a4-flyers/', want: 'From 10 pcs' },
    { url: '/ja/product/a4-flyers/', want: '10枚〜', want2: '量産档（25枚〜）' },
    { url: '/zh-hk/product/a4-flyers/', want: '標準尺寸刀模模板', noWant: '圓角' },
  ];
  console.log('\n=== ① title 品牌后缀断言 ===');
  for (const p of pages) {
    try {
      const { status, text } = await get(p.url);
      const m = text.match(/<title>([^<]*)<\/title>/);
      const title = m ? m[1] : '(no title)';
      const ok = title.includes('| ' + p.wantBrand) || title.includes('｜' + p.wantBrand);
      console.log(`${ok ? '✅' : '❌'} ${p.url} [${status}] title="${title.slice(0, 70)}"`);
    } catch (e) { console.log(`❌ ${p.url}: ${e.message}`); }
  }
  console.log('\n=== ② MOQ 问答块 + 圆角清除断言 ===');
  for (const p of moqPages) {
    try {
      const { status, text } = await get(p.url);
      const has1 = text.includes(p.want);
      const has2 = !p.want2 || text.includes(p.want2);
      const hasNo = !p.noWant || !text.includes(p.noWant);
      console.log(`${has1 && has2 && hasNo ? '✅' : '❌'} ${p.url} [${status}] 含「${p.want.slice(0, 20)}」=${has1} ${p.want2 ? `含「${p.want2}」=${has2}` : ''} ${p.noWant ? `无「${p.noWant}」=${hasNo}` : ''}`);
    } catch (e) { console.log(`❌ ${p.url}: ${e.message}`); }
  }
})().catch((e) => { console.error('探针异常:', e.message); process.exit(1); });
