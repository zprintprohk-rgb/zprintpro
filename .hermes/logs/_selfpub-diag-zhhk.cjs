'use strict';
/**
 * 判定 zh-hk 簡體字來自何處:
 *   ① 我注入的正文是否含這些字? ② 對照組 (photo-book zh-hk, 早前交付且已知乾淨) 是否同樣命中?
 *   ③ 命中的上下文落在頁面哪一塊?
 */
const fs = require('fs');
const https = require('https');
const SIMP = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语言词记录进买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数';
const RE = new RegExp('[' + SIMP + ']', 'g');
const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej); req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}
async function retry(u) { for (let a = 1; a <= 4; a++) { try { const r = await get(u); if (r.status === 200) return r; } catch (e) {} await sleep(4000 * a); } return null; }

(async () => {
  /* ① 我注入的正文 */
  const j = JSON.parse(fs.readFileSync('F:\\zprintpro-nextjs\\src\\data\\blog-data\\zh-hk.json', 'utf8'));
  const mine = j['self-publishing-printing-guide'].content;
  const mineHits = [...new Set([...mine.matchAll(RE)].map(m => m[0]))];
  console.log('① 我注入的 zh-hk 正文命中簡體專用字: ' + (mineHits.length ? mineHits.join('') : '0 ✅'));

  /* ② 對照組: 同站其他 zh-hk blog 頁 */
  const urls = [
    ['自費出版 (本次交付)', 'https://zprintpro.com/zh-hk/blog/self-publishing-printing-guide/'],
    ['寫真書 (早前交付)', 'https://zprintpro.com/zh-hk/blog/photo-book-printing-guide/'],
    ['童書繪本 (早前交付)', 'https://zprintpro.com/zh-hk/blog/childrens-picture-book-printing-guide/'],
    ['產品頁 perfect-bound-books', 'https://zprintpro.com/zh-hk/product/perfect-bound-books/'],
  ];
  for (const [label, u] of urls) {
    const r = await retry(u);
    if (!r) { console.log('② ' + label + ' -> 取不到'); continue; }
    const text = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const hits = [...new Set([...text.matchAll(RE)].map(m => m[0]))];
    console.log('② ' + label.padEnd(28) + ' 命中 ' + (hits.length ? hits.length + ' 種: ' + hits.join('') : '0 ✅'));
    if (hits.length) {
      const first = text.search(RE);
      console.log('     上下文: …' + text.slice(Math.max(0, first - 60), first + 40) + '…');
    }
    await sleep(2500);
  }
})();
