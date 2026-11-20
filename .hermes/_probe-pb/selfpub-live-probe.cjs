'use strict';
/**
 * Self-Publishing 三語線上探針 (驗收閘門)
 * 驗: ① 三語 HTTP 200 ② 無空 meta description ③ 無空 body ④ hreflang 齊備
 *     ⑤ qa-answer 樣式已套用 ⑥ zh-hk 無簡體字 ⑦ 標題/品牌分層
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const SLUG = 'self-publishing-printing-guide';
const LOCS = ['zh-hk', 'en', 'ja'];
const sleep = ms => new Promise(r => setTimeout(r, ms));

function get(u, depth) {
  depth = depth || 0;
  return new Promise((res, rej) => {
    const req = https.get(u, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location && depth < 3) { r.resume(); return get(r.headers.location, depth + 1).then(res, rej); }
      let d = ''; r.setEncoding('utf8'); r.on('data', c => d += c); r.on('end', () => res({ status: r.statusCode, html: d }));
    });
    req.on('error', rej);
    req.setTimeout(45000, () => req.destroy(new Error('timeout')));
  });
}
async function retry(u) {
  for (let a = 1; a <= 5; a++) {
    try { const r = await get(u); if (r.status === 200) return r; } catch (e) { /* retry */ }
    await sleep(5000 * a);
  }
  return null;
}

const SIMP = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语言词记录进买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数';

(async () => {
  const L = [];
  let fail = 0;

  /* 先建立「站點框架基線」: 取一篇早前已交付且已知乾淨的 zh-hk 頁, 其簡體字集合 = chrome 基線
   * ★ 教訓 (2026-09-18): 首版探針直接對整頁文本掃簡體 → 把**站點 footer** (GeoFooterText.tsx
   *   的 zh-hk 簡體文案, 全站每頁都有) 誤判成本次交付的缺陷。改為「與對照頁取集合差」才歸因正確。 */
  let baseline = new Set();
  const ctrl = await retry('https://zprintpro.com/zh-hk/blog/photo-book-printing-guide/');
  if (ctrl) {
    const t = ctrl.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
    baseline = new Set([...t.matchAll(new RegExp('[' + SIMP + ']', 'g'))].map(m => m[0]));
    L.push('（chrome 基線取自對照頁 photo-book zh-hk: ' + (baseline.size ? [...baseline].join('') : '無') + '）');
  } else {
    L.push('（對照頁取不到, 基線視為空 —— 簡體判定將偏嚴格）');
  }
  await sleep(2500);

  for (const loc of LOCS) {
    const u = `https://zprintpro.com/${loc}/blog/${SLUG}/`;
    const r = await retry(u);
    if (!r) { L.push('★FAIL ' + loc + ' 取不到 (5 次重試)'); fail++; continue; }
    const title = (r.html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
    const h1 = (r.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1].replace(/<[^>]+>/g, '').trim();
    const md = r.html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    const mdLen = md ? md[1].trim().length : 0;
    const hl = [...new Set([...r.html.matchAll(/hreflang="([^"]+)"/gi)].map(m => m[1]))];
    const qa = (r.html.match(/qa-answer/g) || []).length;
    const tables = (r.html.match(/<table/gi) || []).length;
    const faqQ = (r.html.match(/<h2[^>]*>[^<]*[?？]/g) || []).length;
    // 空 body 偵測: 正文是否含 <h2 與表格
    const bodyOk = /<h2/i.test(r.html) && tables >= 2;
    // zh-hk 簡體污染 (只看正文片段, 避開 script)
    const textOnly = r.html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ');
    const simp = loc === 'zh-hk'
      ? [...new Set([...textOnly.matchAll(new RegExp('[' + SIMP + ']', 'g'))].map(m => m[0]))].filter(ch => !baseline.has(ch))
      : [];
    const brand = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
    const otherBrand = loc === 'zh-hk' ? 'ZprintPro' : '智印港';
    const titleSlug = title === SLUG;

    const ok = r.status === 200 && mdLen > 0 && bodyOk && qa >= 3 && hl.length >= 3 && !titleSlug && simp.length === 0;
    if (!ok) fail++;
    L.push((ok ? 'OK    ' : '★FAIL ') + loc + '  HTTP ' + r.status);
    L.push('        title  : ' + (titleSlug ? '★★ 仍是 slug' : title.slice(0, 76)));
    L.push('        h1     : ' + (h1 === SLUG ? '★★ 仍是 slug' : h1.slice(0, 66)));
    L.push('        desc   : ' + (mdLen ? '[' + mdLen + '] OK' : '★ 空/缺失'));
    L.push('        hreflang: ' + hl.join(','));
    L.push('        qa-answer: ' + qa + ' | <table>: ' + tables + ' | 問句 H2: ' + faqQ + ' | 正文非空: ' + bodyOk);
    L.push('        品牌    : ' + (title.includes(brand) ? 'OK (' + brand + ')' : '★ 缺 ' + brand) + ' | 他語系品牌: ' + (title.includes(otherBrand) ? '★ 有 ' + otherBrand : '0'));
    if (loc === 'zh-hk') L.push('        簡體字  : ' + (simp.length ? '★ ' + simp.join('') : '0'));
    await sleep(2500);
  }
  const out = L.join('\n') + '\n\n== ' + (fail === 0 ? '✅ 全部通過 (3/3)' : '❌ 有 ' + fail + ' 項未過') + ' ==\n';
  fs.writeFileSync(path.join(__dirname, '..', 'logs', '2026-09-18-selfpub-live-probe.txt'), out, 'utf8');
  console.log(out);
  process.exit(fail === 0 ? 0 : 1);
})();
