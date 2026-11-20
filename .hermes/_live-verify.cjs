// 线上断言探针 (Q-1/验收 4a/4c, 2026-09-23) — 轮询直到 CF build 部署完成
// 断言: ① /en,/ja,/zh-hk 三语 a4-flyers <title> 品牌后缀 ② a4-flyers + waterproof-stickers MOQ 块数字 = products.ts
// 绕缓存: ?_cb= 查询串
const BASE = 'https://www.zprintpro.com';
const pages = [
  { url: '/en/product/a4-flyers/', wantBrand: 'ZprintPro' },
  { url: '/ja/product/a4-flyers/', wantBrand: 'ZprintPro' },
  { url: '/zh-hk/product/a4-flyers/', wantBrand: '智印港' },
];
const moqPages = [
  { url: '/zh-hk/product/a4-flyers/', want: '10 張起印', want2: '25 張以上單張明顯較平' },
  { url: '/zh-hk/product/waterproof-stickers/', want: '10 張起印', want2: '25 張以上單張明顯較平' },
  { url: '/en/product/a4-flyers/', want: 'From 10 pcs' },
  { url: '/ja/product/a4-flyers/', want: '10枚〜', want2: '25枚〜' },
];
async function get(url) {
  const r = await fetch(BASE + url + (url.includes('?') ? '&' : '?') + '_cb=' + Date.now(), {
    redirect: 'follow',
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; zprintpro-verify)' },
  });
  return { status: r.status, text: await r.text() };
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const deadline = Date.now() + 8 * 60 * 1000; // 最多等 8 分钟
  let live = false;
  while (Date.now() < deadline && !live) {
    try {
      const { text } = await get('/zh-hk/product/a4-flyers/');
      if (text.includes('10 張起印')) { live = true; console.log('✅ MOQ 块已上线 (build 完成)'); }
    } catch (e) { /* not deployed yet */ }
    if (!live) await sleep(15000);
  }
  if (!live) { console.log('⏰ 8min 内未上线, 记录当前状态 (可能 build 更慢)'); }

  console.log('\n=== ① title 品牌后缀断言 ===');
  for (const p of pages) {
    try {
      const { status, text } = await get(p.url);
      const m = text.match(/<title>([^<]*)<\/title>/);
      const title = m ? m[1] : '(no title)';
      const ok = title.trim().endsWith(p.wantBrand) || title.includes(' | ' + p.wantBrand) || title.includes('｜' + p.wantBrand);
      console.log(`${ok ? '✅' : '❌'} ${p.url} [${status}] title="${title.slice(0, 80)}" 末尾品牌=${p.wantBrand}`);
    } catch (e) { console.log(`❌ ${p.url} fetch error: ${e.message}`); }
  }
  console.log('\n=== ② MOQ 问答块断言 ===');
  for (const p of moqPages) {
    try {
      const { status, text } = await get(p.url);
      const has1 = text.includes(p.want);
      const has2 = !p.want2 || text.includes(p.want2);
      console.log(`${has1 && has2 ? '✅' : '❌'} ${p.url} [${status}] 含「${p.want}」=${has1} 含「${p.want2 || '—'}」=${has2}`);
    } catch (e) { console.log(`❌ ${p.url} fetch error: ${e.message}`); }
  }
})().catch((e) => { console.error('探针异常:', e.message); process.exit(1); });
