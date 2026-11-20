'use strict';
/**
 * 交付層獨立複算 (不採信寫手自檢) — Self-Publishing en 稿
 * 獨立重寫量測邏輯, 不呼叫寫手的 check-selfpub.mjs
 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\.hermes\\staging\\self-publishing-content.json';
const raw = fs.readFileSync(P);
const j = JSON.parse(raw.toString('utf8'));

const eq = (s) => { let n = 0; for (const c of s) n += /[\u3000-\u9fff\uff00-\uffef]/.test(c) ? 2 : 1; return n; };
const t = j.title.en, d = j.description.en, ex = j.excerpt.en, c = j.content.en;

const chk = [];
const A = (name, got, ok, want) => chk.push({ name, got, ok, want });

A('title.en 字符', t.length, t.length >= 50 && t.length <= 58, '50-58');
A('title.en 含 ZprintPro 收尾', /ZprintPro\s*$/.test(t.trim()), /ZprintPro\s*$/.test(t.trim()), '品牌末尾一次');
A('description.en 字符', d.length, d.length >= 150 && d.length <= 160, '150-160');
A('excerpt.en 字符', ex.length, ex.length >= 120 && ex.length <= 300, '120-300');

const qa = (c.match(/<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">/g) || []).length;
A('快速答案塊 (逐字 class 形狀)', qa, qa === 3, '=3');
const qaLead = (c.match(/<p class="font-semibold mb-1">Quick Answer: /g) || []).length;
A('快速答案塊首段以 "Quick Answer: " 開頭', qaLead, qaLead === 3, '=3');

const h2 = (c.match(/<h2[^>]*>/g) || []).length;
const h2q = (c.match(/<h2[^>]*>[^<]*\?<\/h2>/g) || []).length;
A('H2 數', h2, h2 >= 6, '>=6');
A('問句 H2 數 (>half)', h2q, h2q > h2 / 2, `>${h2 / 2}`);

const tbl = (c.match(/<table/g) || []).length;
const thead = (c.match(/<thead/g) || []).length;
A('<table>', tbl, tbl >= 2, '>=2');
A('含 <thead>', thead, thead === tbl, '=table 數');

const faqRe = /<p><strong>Q(\d+):\s*([\s\S]*?)<\/strong>\s*<br\s*\/?>\s*A(\d*):\s*([\s\S]*?)<\/p>/g;
const faqs = [...c.matchAll(faqRe)];
A('FAQ 條數 (可解析格式)', faqs.length, faqs.length >= 4 && faqs.length <= 5, '4-5');
const nums = faqs.map(m => Number(m[1]));
A('FAQ 編號連續', nums.join(','), nums.every((v, i) => v === i + 1), 'Q1..Qn');

const wa = (c.match(/wa\.me/g) || []).length;
A('CTA (wa.me)', wa, wa >= 2 && wa <= 3, '2-3');

const links = [...c.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
const internal = [...new Set(links.filter(h => h.startsWith('/')))];
const WL = ['/en/category/books/', '/en/category/educational/', '/en/product/perfect-bound-books/', '/en/product/hardcover-books/',
  '/en/product/saddle-stitch-booklets/', '/en/product/spiral-notebooks/', '/en/product/catalog-printing/',
  '/en/blog/photo-book-printing-guide/', '/en/blog/childrens-picture-book-printing-guide/',
  '/en/blog/zine-small-batch-booklet-printing-guide/', '/en/blog/catalog-printing-guide/', '/en/insights/hk-print-inquiry-index/'];
A('唯一內鏈', internal.length, internal.length >= 7, '>=7');
const off = internal.filter(h => !WL.includes(h));
A('越白名單內鏈', off.length + (off.length ? ' -> ' + off.join(',') : ''), off.length === 0, '=0');

A('<img>', (c.match(/<img/gi) || []).length, (c.match(/<img/gi) || []).length === 0, '=0');
A('<script>', (c.match(/<script/gi) || []).length, (c.match(/<script/gi) || []).length === 0, '=0');
A('JSON-LD', (c.match(/application\/ld\+json/gi) || []).length, (c.match(/application\/ld\+json/gi) || []).length === 0, '=0');
const cjk = (c.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/g) || []).length;
A('CJK 字符', cjk, cjk === 0, '=0');
const vs = (c.match(/\bvs\.?\b|\bversus\b/gi) || []).length;
A('競品對比詞 "vs/versus"', vs, vs === 0, '=0');
const prom = (c.match(/\bguarantee\w*\b|\bpromise\w*\b|\bensure\w*\b|\bassure\w*\b/gi) || []).length;
A('承諾語氣 (guarantee/promise/ensure/assure)', prom, prom === 0, '=0');
const gsc = (c.match(/\bGSC\b|\bimpressions?\b|\bCTR\b|\bSERP\b|\bposition \d/gi) || []).length;
A('GSC 後台黑話', gsc, gsc === 0, '=0');

const firstP = (c.match(/^<p>([\s\S]*?)<\/p>/) || [, ''])[1].replace(/<[^>]+>/g, '');
A('首段字符數', firstP.length, firstP.length <= 200, '<=200');

A('content.en 字符', c.length, c.length >= 5000 && c.length <= 8000, '5000-8000');
const three = ['low MOQ', 'fast samples', 'transparent factory'].filter(k => new RegExp(k, 'i').test(c));
A('三要素段 (三詞同現)', three.length, three.length === 3, '=3');
A('BOM', raw[0] === 0xEF ? 'YES' : 'no', raw[0] !== 0xEF, 'no');
A('CRLF', /\r\n/.test(raw.toString('utf8')) ? 'YES' : 'no', !/\r\n/.test(raw.toString('utf8')), 'no LF only');
A('頂層鍵', Object.keys(j).join(','), ['slug', 'title', 'description', 'excerpt', 'category', 'content'].every(k => k in j), '六鍵');
A('slug', j.slug, j.slug === 'self-publishing-printing-guide', 'self-publishing-printing-guide');
A('只寫 en (三語鍵位)', Object.keys(j.title).join(','), Object.keys(j.title).join(',') === 'en', 'en only');

let fail = 0;
console.log('=== 交付層獨立複算 (不採信寫手自檢) ===');
for (const r of chk) {
  if (!r.ok) fail++;
  console.log(`${r.ok ? 'PASS' : '★FAIL'}  ${r.name}: ${r.got}  (要求 ${r.want})`);
}
console.log(`\n${chk.length - fail}/${chk.length} PASS`);
console.log('\ntitle.en   : ' + t);
console.log('desc.en    : ' + d);
console.log('\n=== 高度可疑數字掃描 (需人工確認是否已標源) ===');
const suspicious = ['2.3-day', '95%', '88%', 'ISO 12647', '12647', '0.64', '7.36', '207.94'];
for (const s of suspicious) {
  const n = (c.match(new RegExp(s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  if (n) console.log('   ' + s + ' 出現 ' + n + ' 次');
}
