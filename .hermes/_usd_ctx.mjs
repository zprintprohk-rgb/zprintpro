// .hermes/_usd_ctx.mjs — 定位 en 页残留 US$ 来源（是否正文之外，如相关文章/推荐块）
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const r = await fetch('https://zprintpro.com/en/blog/doujin-circle-printing-guide/', { headers: { 'user-agent': UA } });
const b = await r.text();
const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ');
let i = -1, n = 0;
while ((i = vis.indexOf('US$', i + 1)) >= 0 && n < 5) {
  console.log(`@${i}:`, JSON.stringify(vis.slice(Math.max(0, i - 110), i + 60).replace(/\s+/g, ' ')));
  n++;
}
const art = b.slice(b.indexOf('blog-content'));
console.log('\nUS$ inside blog-content:', (art.match(/US\$/g) || []).length);
