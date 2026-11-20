/**
 * TEMP independent cross-check (probe only): re-derives the §8 numbers straight from the
 * raw file text (no JSON.parse of content), so a parse/normalisation bug cannot hide.
 */
import fs from 'fs';
const P = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';
const raw = fs.readFileSync(P, 'utf8');
const FW = /[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/;
const hw = (s) => [...s].reduce((n, c) => n + (FW.test(c) ? 2 : 1), 0);

/* pull raw JSON string values with a byte-level scanner (unescapes \n and \" only) */
const unesc = (s) => s.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
const grab = (field, loc) => {
  const fk = new RegExp('"' + field + '":\\s*\\{');
  const fm = fk.exec(raw);
  if (!fm) return null;
  const lk = new RegExp('"' + loc + '":\\s*"', 'g');
  lk.lastIndex = fm.index + fm[0].length;
  const lm = lk.exec(raw);
  if (!lm) return null;
  let i = lm.index + lm[0].length, out = '';
  while (i < raw.length) {
    const ch = raw[i];
    if (ch === '\\') { out += raw[i] + raw[i + 1]; i += 2; continue; }
    if (ch === '"') break;
    out += ch; i++;
  }
  return unesc(out);
};

const results = {};
for (const loc of ['zh-hk', 'ja']) {
  const t = grab('title', loc), d = grab('description', loc), x = grab('excerpt', loc), c = grab('content', loc);
  const brand = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
  const q = loc === 'zh-hk' ? '快速答案' : 'クイック回答';
  const links = [...c.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  const faq = [...c.matchAll(/<p><strong>Q\d+[:：][\s\S]*?<\/strong><br\/?>\s*A\d*[:：][\s\S]*?<\/p>/g)];
  const h2 = [...c.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].replace(/<[^>]*>/g, ''));
  const qa = [...c.matchAll(new RegExp('<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">' + q + '：', 'g'))];
  results[loc] = {
    title_hw: hw(t),
    title_brand_tail_once: t.endsWith(brand) && (t.match(new RegExp(brand, 'g')) || []).length === 1,
    desc_hw: hw(d),
    exc_hw: hw(x),
    quick_answers: qa.length,
    h2: h2.length,
    h2_question: h2.filter((s) => /[?？]/.test(s)).length,
    tables: (c.match(/<table[\s>]/g) || []).length,
    thead: (c.match(/<thead[\s>]/g) || []).length,
    faq: faq.length,
    cta: (c.match(/wa\.me/g) || []).length,
    links_unique: new Set(links).size,
    links_off_list: [...new Set(links)].filter((h) => !/^\/(zh-hk|ja)\/(category\/(books|educational)|product\/(perfect-bound-books|hardcover-books|saddle-stitch-booklets|spiral-notebooks|catalog-printing)|blog\/(photo-book-printing-guide|childrens-picture-book-printing-guide|zine-small-batch-booklet-printing-guide|catalog-printing-guide)|insights\/hk-print-inquiry-index)\/$/.test(h)),
    first_para_hw: hw(c.split('\n\n')[0].replace(/<[^>]*>/g, '')),
    img: (c.match(/<img|<figure/gi) || []).length,
    script_jsonld: (c.match(/<script|application\/ld\+json/gi) || []).length,
  };
  /* brand isolation straight from raw text */
  const whole = raw;
  results[loc].brand_zhhk_in_file = (whole.match(/智印港/g) || []).length;
  results[loc].brand_zprintpro_in_file = (whole.match(/ZprintPro/g) || []).length;
}
console.log(JSON.stringify(results, null, 1));

const zh = grab('content', 'zh-hk') + grab('title', 'zh-hk') + grab('description', 'zh-hk') + grab('excerpt', 'zh-hk');
const jaC = grab('content', 'ja') + grab('title', 'ja') + grab('description', 'ja') + grab('excerpt', 'ja');
const SIMPL = /[贴纸单样胶册开环烫订专质货运标号广龙极飞术复图书制厅际备养营获证读设计构团对创药饮饰农贸铁银钟学点话认长门间国时来动场带块条组编圆压头实写将觉见购销费预项须顺领顾验历里发台适]/g;
console.log('\nzh-hk simplified (repo 口径):', (zh.match(SIMPL) || []).length);
console.log('zh-hk contains ZprintPro:', /ZprintPro/.test(zh));
console.log('ja contains 智印港:', /智印港/.test(jaC));
console.log('any 智印印港:', /智印印港/.test(raw));
console.log('dual-brand anywhere:', /智印港[\s\S]{0,12}ZprintPro|ZprintPro[\s\S]{0,12}智印港/.test(raw));
console.log('file has CR:', raw.includes('\r'), '| leading BOM:', raw.charCodeAt(0) === 0xfeff);
console.log('JSON.parse round-trip:', (() => { try { JSON.parse(raw); return 'OK'; } catch (e) { return 'FAIL ' + e.message; } })());
