// .hermes/_usd_scope.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const r = await fetch('https://zprintpro.com/en/blog/doujin-circle-printing-guide/', { headers: { 'user-agent': UA } });
const b = await r.text();
const start = b.indexOf('blog-content');
const endCandidates = ['View More', 'Related', 'related-', 'You may also'].map(s => b.indexOf(s, start)).filter(x => x > 0);
const end = endCandidates.length ? Math.min(...endCandidates) : b.length;
const body = b.slice(start, end);
const vis = body.replace(/<[^>]+>/g, ' ');
console.log('body slice len:', body.length);
console.log('US$ in article body:', (vis.match(/US\$/g) || []).length);
console.log('¥ in article body:', (vis.match(/¥/g) || []).length);
console.log('h2 in body:', (body.match(/<h2/g) || []).length);
console.log('sample:', JSON.stringify(vis.slice(0, 200).replace(/\s+/g, ' ')));
