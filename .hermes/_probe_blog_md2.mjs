// .hermes/_probe_blog_md2.mjs — 检查 ** / # / 列表标记是否裸显示
import fs from 'fs';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const j = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const cands = Object.entries(j).filter(([k, v]) => typeof v.content === 'string' && /\*\*[^*\n]{2,40}\*\*/.test(v.content)).slice(0, 2);
for (const [slug, v] of cands) {
  const r = await fetch(`https://zprintpro.com/zh-hk/blog/${slug}/`, { headers: { 'user-agent': UA } });
  const b = await r.text();
  const vis = b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  const bold = (vis.match(/\*\*[^*\n]{2,40}\*\*/g) || []).length;
  const mdH = (vis.match(/(^|>)\s*#{1,4}\s/g) || []).length;
  console.log(`${r.status} ${slug} visibleBold=${bold} visibleMdHeading=${mdH}`);
}
