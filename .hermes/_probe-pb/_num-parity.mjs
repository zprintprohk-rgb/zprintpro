import fs from 'fs';
const T = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';
const E = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json';
const loc = JSON.parse(fs.readFileSync(T, 'utf8'));
const en = JSON.parse(fs.readFileSync(E, 'utf8'));

const NUM = /\d[\d,\.]*/g;
const nums = (s) => [...new Set((String(s).match(NUM) || []).map((n) => n.replace(/[.,]$/, '')))].sort();
const norm = (n) => n.replace(/,/g, '');

const enAll = nums([en.title.en, en.description.en, en.excerpt.en, en.content.en].join(' '));
for (const l of ['zh-hk', 'ja']) {
  const all = nums([loc.title[l], loc.description[l], loc.excerpt[l], loc.content[l]].join(' '));
  const enSet = new Set(enAll.map(norm));
  const extra = all.filter((n) => !enSet.has(norm(n)));
  const missing = enAll.filter((n) => !all.map(norm).includes(norm(n)));
  console.log('== ' + l + ' ==');
  console.log('  locales numerals:', all.join(' '));
  console.log('  NOT present in en:', extra.length ? extra.join(' ') : '(none)');
  console.log('  en numerals the locale drops (may be verbalised):', missing.length ? missing.join(' ') : '(none)');
}

/* dual-caliber MOQ treatment must survive in both locales */
const checks = {
  'zh-hk: 1 本起印 + 100 本 雙口徑': /1 本起印|1 本起/.test(loc.content['zh-hk']) && /100 本/.test(loc.content['zh-hk']),
  'zh-hk: 請向我們確認口徑': /請向我們確認邊個口徑適用於你嘅規格/.test(loc.content['zh-hk']),
  'zh-hk: 類目頁來源標註': /類目頁/.test(loc.content['zh-hk']) && /產品頁/.test(loc.content['zh-hk']),
  'ja: 1 部から + 100 部 二重口径': /1 部から/.test(loc.content.ja) && /100 部/.test(loc.content.ja),
  'ja: どちらの数値が当てはまるか': /どちらの数値がお客様の仕様に当てはまるか/.test(loc.content.ja),
  'ja: カテゴリページ/製品ページ 出所明示': /カテゴリページ/.test(loc.content.ja) && /製品ページ/.test(loc.content.ja),
  'zh-hk: 價格階梯 5 檔齊全': ['US$2.08', 'US$0.66', 'US$0.36', 'US$0.14', 'US$0.11'].every((p) => loc.content['zh-hk'].includes(p)),
  'ja: 價格階梯 5 檔齊全': ['US$2.08', 'US$0.66', 'US$0.36', 'US$0.14', 'US$0.11'].every((p) => loc.content.ja.includes(p)),
  'zh-hk: 100 本批次 US$207.94': loc.content['zh-hk'].includes('US$207.94'),
  'ja: 100 部バッチ US$207.94': loc.content.ja.includes('US$207.94'),
  'zh-hk: 四項規格 (頁數/開本/內頁紙/裝訂)': ['頁數', '開本', '內頁紙', '裝訂'].every((k) => loc.content['zh-hk'].includes(k)),
  'ja: 4 項目 (ページ数/判型/本文用紙/製本)': ['ページ数', '判型', '本文用紙', '製本'].every((k) => loc.content.ja.includes(k)),
};
console.log('\n== FACT-DISCIPLINE CHECKS ==');
let fails = 0;
for (const [k, v] of Object.entries(checks)) { if (!v) fails++; console.log((v ? '  PASS  ' : '  FAIL  ') + k); }
console.log('failures:', fails);

/* file hygiene */
const b = fs.readFileSync(T);
console.log('\n== FILE HYGIENE ==');
console.log('  bytes:', b.length, '| BOM:', b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf, '| CR present:', b.includes(0x0d));
console.log('  keys:', Object.keys(loc).join(','));
console.log('  locale keys per field:', Object.entries(loc).map(([k, v]) => k + '=' + (typeof v === 'object' ? Object.keys(v).join('/') : v)).join(' | '));
