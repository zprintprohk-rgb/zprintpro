'use strict';
/**
 * 修復前後復算 (雙方法復算: 本機靜態模擬 vs 稍後線上探針)
 * 模擬 getPostData 的 description 解析鏈:
 *   OLD = legacyPost?.description || ''
 *   NEW = legacyPost?.description || jsonEntry?.description || meta?.excerpt?.[locale] || ''
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';

const pageSrc = fs.readFileSync(path.join(ROOT, 'src/app/[locale]/blog/[slug]/page.tsx'), 'utf8');
const postsSrc = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');

/* ---- 1. 解析 page.tsx 內聯 legacyPosts 記錄: locale -> slug -> description ---- */
const legacy = { 'zh-hk': {}, en: {}, ja: {} };
{
  // 內聯 posts 物件範圍: 從 "const posts: Record<string" 到該物件結束 (下一個 "\n};")
  const start = pageSrc.indexOf('const posts: Record<string');
  const end = pageSrc.indexOf('\n};', start);
  const block = pageSrc.slice(start, end);
  const lines = block.split('\n');
  let loc = null;
  for (const line of lines) {
    const lm = line.match(/^\s*'?(zh-hk|en|ja)'?:\s*\{\s*$/);
    if (lm) { loc = lm[1]; continue; }
    if (!loc) continue;
    const sm = line.match(/^\s*'?([A-Za-z0-9][A-Za-z0-9-]*)'?:\s*\{[\s\S]*$/);
    if (sm) {
      const dm = line.match(/description:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
      legacy[loc][sm[1]] = dm ? (dm[1] !== undefined ? dm[1] : dm[2]) : '';
    }
  }
}
console.log('內聯 legacyPosts 解析: zh-hk ' + Object.keys(legacy['zh-hk']).length +
  ' / en ' + Object.keys(legacy.en).length + ' / ja ' + Object.keys(legacy.ja).length + ' (slug 數)');

/* ---- 2. blog-posts.ts 的 excerpt (每 locale) ---- */
const excerpt = {};
{
  const arr = postsSrc.slice(postsSrc.indexOf('const bgBusinessCard'));
  const re = /slug:\s*'([^']+)'[\s\S]*?excerpt:\s*\{([\s\S]*?)\n  \},/g;
  let m;
  while ((m = re.exec(arr)) !== null) {
    const slug = m[1];
    const body = m[2];
    const e = {};
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const q = body.match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
      e[loc] = q ? (q[2] !== undefined ? q[2] : q[3]) : '';
    }
    excerpt[slug] = e;
  }
}
console.log('blog-posts.ts excerpt 解析: ' + Object.keys(excerpt).length + ' 篇');

/* ---- 3. blog-data JSON description ---- */
const json = {};
for (const loc of ['zh-hk', 'en', 'ja']) {
  json[loc] = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/blog-data/' + loc + '.json'), 'utf8'));
}

/* ---- 4. 復算 ---- */
const allSlugs = [...new Set([...Object.keys(excerpt), ...Object.keys(json['zh-hk'])])];
let oldOk = 0, newOk = 0, fixed = 0, stillEmpty = [];
const rows = [];
for (const slug of allSlugs) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const lp = legacy[loc][slug] || '';
    const jd = (json[loc][slug] && json[loc][slug].description) || '';
    const ex = (excerpt[slug] && excerpt[slug][loc]) || '';
    const OLD = lp || '';
    const NEW = lp || jd || ex || '';
    if (OLD) oldOk++;
    if (NEW) newOk++;
    if (!OLD && NEW) { fixed++; rows.push([loc, slug, (jd ? 'json' : 'excerpt'), NEW.length].join(' | ')); }
    if (!NEW) stillEmpty.push(loc + '/' + slug);
  }
}
const total = allSlugs.length * 3;
console.log('\n=== 復算 (總 ' + total + ' 個 slug×locale 組合) ===');
console.log('修復前可解析: ' + oldOk);
console.log('修復後可解析: ' + newOk);
console.log('★ 本次補上   : ' + fixed);
console.log('仍為空       : ' + stillEmpty.length + (stillEmpty.length ? ' -> ' + stillEmpty.join(', ') : ''));
console.log('\n補上的來源分佈:');
const dist = {};
for (const r of rows) { const s = r.split(' | ')[2]; dist[s] = (dist[s] || 0) + 1; }
console.log('  ' + JSON.stringify(dist));
fs.writeFileSync(path.join(__dirname, 'simulation.txt'),
  ['修復前可解析: ' + oldOk, '修復後可解析: ' + newOk, '本次補上: ' + fixed,
   '仍為空: ' + stillEmpty.length, '來源分佈: ' + JSON.stringify(dist), '',
   'locale | slug | 來源 | 長度', ...rows].join('\n'), 'utf8');
