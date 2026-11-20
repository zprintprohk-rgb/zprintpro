'use strict';
// 兩項挂賬修復的線上驗收: ① 9 頁 title/H1/description ② en/ja qa-answer class 覆蓋
const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [];
for (const slug of ['wedding-invitation-pricing-guide', 'wedding-invitation-cost-guide', 'wedding-table-card-printing-guide']) {
  for (const loc of ['zh-hk', 'en', 'ja']) targets.push([loc, slug]);
}
const qaTargets = [
  ['zh-hk', 'photo-book-printing-guide'],
  ['en', 'photo-book-printing-guide'],
  ['ja', 'photo-book-printing-guide'],
  ['en', 'zine-small-batch-booklet-printing-guide'],
  ['ja', 'childrens-picture-book-printing-guide'],
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = '';
      r.setEncoding('utf8');
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}

async function fetchRetry(u) {
  for (let a = 1; a <= 4; a++) {
    try {
      const r = await get(u);
      if (r.status === 200) return r;
    } catch (e) { /* retry */ }
    await sleep(4000 * a);
  }
  return null;
}

(async () => {
  const L = [];
  L.push('=== ① 9 頁 (原未註冊 slug) 線上驗收 ===');
  let okTitle = 0, okDesc = 0, okBrand = 0, fail = 0;
  for (const [loc, slug] of targets) {
    const u = `https://zprintpro.com/${loc}/blog/${slug}/`;
    const r = await fetchRetry(u);
    if (!r) { L.push('FAIL  ' + loc + '/' + slug + ' 取不到'); fail++; await sleep(2000); continue; }
    const title = (r.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
    const h1 = (r.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1].replace(/<[^>]+>/g, '').trim();
    const md = r.html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    const desc = md ? md[1] : '';
    const titleFixed = title && title !== slug;
    const h1Fixed = h1 && h1 !== slug;
    const brandOk = loc === 'zh-hk' ? /智印港/.test(title) : /ZprintPro/.test(title);
    if (titleFixed && h1Fixed) okTitle++; else fail++;
    if (desc.trim()) okDesc++;
    if (brandOk) okBrand++;
    L.push((titleFixed && h1Fixed && desc.trim() ? 'OK    ' : '★BAD  ') + loc + '/' + slug);
    L.push('        title: ' + (titleFixed ? title.slice(0, 78) : '★★ 仍為 slug: ' + title));
    L.push('        h1   : ' + (h1Fixed ? h1.slice(0, 60) : '★★ 仍為 slug'));
    L.push('        desc : ' + (desc.trim() ? '[' + desc.length + '] ' + desc.slice(0, 60) : '★ 仍缺'));
    L.push('        brand: ' + (brandOk ? 'OK' : '★ 品牌分層異常'));
    await sleep(2000);
  }
  L.push('');
  L.push('小計: title/H1 修好 ' + okTitle + '/9 | 有 description ' + okDesc + '/9 | 品牌分層 ' + okBrand + '/9 | 失敗 ' + fail);

  L.push('');
  L.push('=== ② en/ja qa-answer class 覆蓋 (v5.1 快速答案塊樣式) ===');
  for (const [loc, slug] of qaTargets) {
    const u = `https://zprintpro.com/${loc}/blog/${slug}/`;
    const r = await fetchRetry(u);
    if (!r) { L.push('FAIL  ' + loc + '/' + slug); continue; }
    const qa = (r.html.match(/qa-answer/g) || []).length;
    L.push((qa > 0 ? 'OK    ' : '★BAD  ') + loc + '/' + slug + '  qa-answer 出現 ' + qa + ' 次');
    await sleep(2000);
  }
  const out = L.join('\n');
  fs.writeFileSync(path.join(__dirname, 'postfix-hangzhang.txt'), out, 'utf8');
  console.log(out);
})();
