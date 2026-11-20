const fs = require('fs');
const out = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync('src/data/blog-data/' + loc + '.json', 'utf8'));
  const posts = Array.isArray(d) ? d : Object.values(d);
  const p = posts.find(x => x.slug === 'hong-kong-printing-cost-baseline-2026');
  const c = p.content || '';
  out.push('##### ' + loc + ' #####');
  out.push('inline-JSON-LD @type count: ' + (c.split('"@type"').length - 1));
  const text = c.replace(/<[^>]*>/g, ' ').replace(/[ \t]+/g, ' ');
  for (const kw of ['打稿', '順豐', 'DHL', '加急', '免運', 'delivery', 'shipping', 'rush', 'proof', '納品', '配送', '校正', '數碼', '柯式', 'デジタル', 'オフセット', '最短', '送料']) {
    const i = text.indexOf(kw);
    if (i >= 0) out.push('[' + kw + '] ' + text.slice(Math.max(0, i - 80), i + 220).replace(/\n/g, ' '));
  }
}
fs.writeFileSync('.scratch/cb-extracts2.txt', out.join('\n'));
console.log('ok, lines:', out.length);
