'use strict';
/**
 * 方法 2 (靜態復算, 含 buying-guide / cluster 分支) — 與方法 1 (線上探針 fullscan.txt) 對帳
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const D = __dirname;

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const pageSrc = read('src/app/[locale]/blog/[slug]/page.tsx');
const postsSrc = read('src/data/blog-posts.ts');
const bgSrc = read('src/data/buying-guides.ts');
const pillarSrc = read('src/data/pillar-content.ts');

const LOCS = ['zh-hk', 'en', 'ja'];

/* 1. 內聯 legacyPosts (page.tsx) */
const legacy = { 'zh-hk': {}, en: {}, ja: {} };
{
  const start = pageSrc.indexOf('const posts: Record<string');
  const block = pageSrc.slice(start, pageSrc.indexOf('\n};', start));
  let loc = null;
  for (const line of block.split('\n')) {
    const lm = line.match(/^\s*'?(zh-hk|en|ja)'?:\s*\{\s*$/);
    if (lm) { loc = lm[1]; continue; }
    if (!loc) continue;
    const sm = line.match(/^\s*'?([A-Za-z0-9][A-Za-z0-9-]*)'?:\s*\{/);
    if (sm) {
      const dm = line.match(/description:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/);
      legacy[loc][sm[1]] = dm ? (dm[1] !== undefined ? dm[1] : dm[2]) : '';
    }
  }
}

/* 2. blog-posts.ts excerpt */
const excerpt = {};
{
  const arr = postsSrc.slice(postsSrc.indexOf('const bgBusinessCard'));
  const re = /slug:\s*'([^']+)'[\s\S]*?excerpt:\s*\{([\s\S]*?)\n  \},/g;
  let m;
  while ((m = re.exec(arr)) !== null) {
    const e = {};
    for (const loc of LOCS) {
      const q = m[2].match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
      e[loc] = q ? (q[2] !== undefined ? q[2] : q[3]) : '';
    }
    excerpt[m[1]] = e;
  }
}

/** 通用: 抓 { slug: '...', ... description: { 'zh-hk': '...', en: '...', ja: '...' } } */
function parseRecordMap(src, fromIdx) {
  const out = {};
  const arr = src.slice(fromIdx);
  const re = /slug:\s*'([^']+)'[\s\S]*?description:\s*\{([\s\S]*?)\}/g;
  let m;
  while ((m = re.exec(arr)) !== null) {
    const e = {};
    for (const loc of LOCS) {
      const q = m[2].match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
      e[loc] = q ? (q[2] !== undefined ? q[2] : q[3]) : '';
    }
    out[m[1]] = e;
  }
  return out;
}

/* 3. buying-guides.ts / pillar-content.ts */
const bg = parseRecordMap(bgSrc, bgSrc.indexOf('export const buyingGuides'));
const pillar = parseRecordMap(pillarSrc, pillarSrc.indexOf('const stickerGuidePillar') >= 0 ? 0 : 0);

/* 4. blog-data JSON */
const json = {};
for (const loc of LOCS) json[loc] = JSON.parse(read('src/data/blog-data/' + loc + '.json'));

/* 5. 解析線上探針結果 (方法 1) */
const live = {};
let liveCount = 0;
{
  const t = fs.readFileSync(path.join(D, 'fullscan.txt'), 'utf8');
  let mode = null;
  for (const line of t.split('\n')) {
    if (/缺 name="description"/.test(line)) { mode = 'missing'; continue; }
    if (/有 name="description"/.test(line)) { mode = 'present'; continue; }
    if (/非 200/.test(line)) { mode = 'other'; continue; }
    const m = line.match(/^\s{3}(\S+)\s+\[([^\]]+)\]/);
    if (!m || !mode || mode === 'other') continue;
    const slug = m[1];
    for (const l of m[2].split(',').map(s => s.trim())) {
      live[l + '/' + slug] = mode === 'present';
      liveCount++;
    }
  }
}

/* 6. 復算 + 對帳 */
const slugs = [...new Set([...Object.keys(excerpt), ...Object.keys(json['zh-hk']), ...Object.keys(bg), ...Object.keys(pillar)])];
let oldOk = 0, newOk = 0, fixed = 0;
const newResolve = {};
for (const slug of slugs) {
  for (const loc of LOCS) {
    let OLD, NEW;
    if (bg[slug]) {                                   // 分支 1: buying-guide 優先
      OLD = NEW = bg[slug][loc] || '';
    } else if (legacy[loc][slug] || excerpt[slug] || json[loc][slug]) {
      const lp = legacy[loc][slug] || '';
      const jd = (json[loc][slug] && json[loc][slug].description) || '';
      const ex = (excerpt[slug] && excerpt[slug][loc]) || '';
      OLD = lp;
      NEW = lp || jd || ex || '';
    } else if (pillar[slug]) {                         // 分支 3: cluster
      OLD = NEW = pillar[slug][loc] || '';
    } else {
      OLD = NEW = '';
    }
    if (OLD) oldOk++;
    if (NEW) newOk++;
    if (!OLD && NEW) fixed++;
    newResolve[loc + '/' + slug] = !!NEW;
  }
}
console.log('=== 方法 2 靜態復算 ===');
console.log('組合總數: ' + slugs.length * 3 + ' | 修復前可解析: ' + oldOk + ' | 修復後可解析: ' + newOk + ' | 本次補上: ' + fixed);

console.log('\n=== 方法 1 (線上實測) vs 方法 2 (靜態復算) 對帳 ===');
console.log('線上實測組合數: ' + liveCount);
let agree = 0;
const disagree = [];
for (const [k, isPresent] of Object.entries(live)) {
  if (newResolve[k] === undefined) { disagree.push(k + ' [方法2 無此 slug]'); continue; }
  if (newResolve[k] === isPresent) agree++; else disagree.push(k + ' 線上=' + (isPresent ? 'present' : 'MISSING') + ' 復算(修後)=' + newResolve[k]);
}
console.log('一致: ' + agree + ' / ' + liveCount);
console.log('不一致: ' + disagree.length);
disagree.slice(0, 25).forEach(d => console.log('   ' + d));

// 修復後預測仍缺的 (線上實測缺 + 復算仍空)
const stillBad = Object.entries(live).filter(([k, v]) => v === false && newResolve[k] === false);
console.log('\n★ 修復後線上仍會缺 description 的組合: ' + stillBad.length);
stillBad.slice(0, 20).forEach(([k]) => console.log('   ' + k));
