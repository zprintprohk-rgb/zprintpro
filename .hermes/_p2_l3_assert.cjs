// L3 online assertion: zh/ja catalog desc MOQ alignment live
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36';
(async () => {
  const out = [];
  // zh-hk: desc should contain 畫冊印刷 10 本起印, not 畫冊印刷/畫冊印刷 100 起
  let r = await fetch('https://zprintpro.com/zh-hk/product/catalog-printing/', { headers: { 'User-Agent': UA } });
  let b = await r.text();
  const zhDesc = (b.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
  out.push({ url: 'zh-hk', status: r.status, has10: zhDesc.includes('10 本起印'), hasOld: zhDesc.includes('100 起') || zhDesc.includes('畫冊印刷/畫冊印刷'), desc: zhDesc.slice(0, 80) });
  await new Promise((s) => setTimeout(s, 1200));
  // ja: desc should contain 10冊〜, not 100〜
  r = await fetch('https://zprintpro.com/ja/product/catalog-printing/', { headers: { 'User-Agent': UA } });
  b = await r.text();
  const jaDesc = (b.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [])[1] || '';
  out.push({ url: 'ja', status: r.status, has10: jaDesc.includes('10冊〜'), hasOld: jaDesc.includes('100〜'), desc: jaDesc.slice(0, 80) });
  console.log(JSON.stringify(out, null, 2));
})();
