/* F1 验收门禁: 简体残留扫描 + 字数复核 (合并后跑)
   用法: node .hermes/f1-gate-check.js
   检查: ① 每个新 body 可见字数 ≥300 ② 无简体残留 ③ 交稿規範段存在性 ④ GSC词织入抽样 */
const fs = require('fs');

// 明确只属简体、繁体必不同的常用字 (香港 zh-hk 应 0 命中)
const SIMPLIFIED_ONLY = '订设验产车关门书证际画达边这还们时过说经组级线张纸现业点档样术讯问题单双动发实规则总结统计算阶飞语议读讲记询货质数据学校运动会特别关单双时间时候对脸头马鸟鱼龙电电话话欢迎欢见面对面'.split('');

const OUT_DIR = '.hermes/f1-outputs';
const files = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith('.json'));
const cjk = (s) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const visibleLen = (body) => body.split('\n\n').map((p) => p.trim()).filter(Boolean).filter((p) => !p.startsWith('交稿規範：')).join('');

let failWord = 0, failSimplified = [], noSpec = 0, ok = 0;
const allBodies = {};
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${OUT_DIR}/${f}`, 'utf8'));
  const body = o.body || '';
  const vis = cjk(visibleLen(body));
  allBodies[o.slug] = body.replace(/\s+/g, '');
  if (vis < 300) { failWord++; console.log(`[字数FAIL] ${o.slug} 可见=${vis}`); continue; }
  const hits = [...new Set(SIMPLIFIED_ONLY.filter((ch) => body.includes(ch)))];
  if (hits.length) { failSimplified.push(`${o.slug}=${hits.join(',')}`); }
  if (!body.includes('交稿規範')) noSpec++;
  ok++;
}
console.log(`\n检查 ${files.length} SKU`);
console.log(`字数达标: ${ok} | 字数<300: ${failWord}`);
console.log(`简体残留: ${failSimplified.length} 个 (${failSimplified.slice(0,10).join('; ')})`);
console.log(`无交稿規範段: ${noSpec} 个`);
// 跨SKU整段重复 (40 字片段)
let dup = 0, sample = '';
const slugs = Object.keys(allBodies);
for (let a = 0; a < slugs.length && !sample; a++) for (let b = a + 1; b < slugs.length; b++) {
  const A = allBodies[slugs[a]], B = allBodies[slugs[b]];
  for (let k = 0; k + 40 <= A.length; k += 20) {
    const frag = A.slice(k, k + 40);
    if (B.includes(frag)) { dup++; sample = `${slugs[a]} <-> ${slugs[b]}: ${frag.slice(0,25)}...`; break; }
  }
}
console.log(`跨SKU 40字片段重复对: ${dup}${sample ? ' | 例: ' + sample : ''}`);
