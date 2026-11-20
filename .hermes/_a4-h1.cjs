(async () => {
  const r = await fetch('https://zprintpro.com/zh-hk/product/a4-flyers/', { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' } });
  const t = await r.text();
  const title = (t.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim();
  const h1 = (t.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').trim();
  console.log('<title>  (标签页/Google):', title);
  console.log('<h1>    (页面主标题):', h1);
  const h2 = (t.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) || [])[1]?.replace(/<[^>]+>/g, '').trim();
  console.log('<h2>    (首个h2):', h2);
})();
