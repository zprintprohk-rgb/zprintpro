// 一次性只读诊断 v2: 剥壳真求值 ts 数据（import/interface/export 剥除）
const fs = require('fs');
let txt = fs.readFileSync(__dirname + '/../src/data/sku-seo-data.ts', 'utf8');
// 剥 import 行
txt = txt.replace(/^import[^\n]*\n/m, '');
// 剥 interface 块
txt = txt.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
// export const / export function → 普通声明； 类型标注剥除； 截断到 getSkuSeo 之前
txt = txt.replace('export const skuSeoData: Record<string, SkuSeoEntry> =', 'const skuSeoData =');
txt = txt.replace('export function getSkuSeo', 'function getSkuSeo');
txt = txt.split('function getSkuSeo')[0];
txt = txt.replace(/;\s*$/, '');
const mod = { exports: {} };
new Function('module', 'exports', 'require', txt + '\nmodule.exports = skuSeoData;')(mod, mod.exports, require);
const data = mod.exports;
const keys = Object.keys(data);
console.log('ts keys:', keys.length);
const nl = {}, cnt = { quote: 0, tab: 0, crlf: 0 };
for (const k of keys) {
  const e = data[k];
  const fields = [];
  for (const loc of ['zh-hk', 'en', 'ja']) {
    fields.push(['title', e.seo?.[loc]?.title], ['desc', e.seo?.[loc]?.description], ['h1', e.seo?.[loc]?.h1], ['body', e.seo?.[loc]?.body], ['name', e.name?.[loc]], ['alt', e.imageAlt?.[loc]]);
    (e.seo?.[loc]?.keywords || []).forEach(x => fields.push(['kw', x]));
  }
  for (const [f, v] of fields) {
    if (typeof v !== 'string') continue;
    if (v.includes('\n')) nl[f] = (nl[f] || 0) + 1;
    if (v.includes('"')) cnt.quote++;
    if (v.includes('\t')) cnt.tab++;
    if (v.includes('\r')) cnt.crlf++;
  }
}
console.log('fields containing newline:', JSON.stringify(nl));
console.log('quote/tab/cr counts:', JSON.stringify(cnt));
const csv = fs.readFileSync(__dirname + '/../zprintpro-sku-seo-data.csv', 'utf8');
const lines = csv.split(/\r?\n/).filter(l => l.trim());
const hdrCols = lines[0].split('\t').length;
console.log('csv lines:', lines.length, '; header cols:', hdrCols);
console.log('rows with non-header col count:', lines.filter(l => l.split('\t').length !== hdrCols).length);
const csvSlugs = lines.slice(1).map(l => l.split('\t')[3]);
console.log('csv slugs not in ts:', csvSlugs.filter(s => !data[s]).length);
const tsOnly = keys.filter(k => !csvSlugs.includes(k));
console.log('ts-only keys (' + tsOnly.length + '):', tsOnly.join(', '));
fs.writeFileSync(__dirname + '/_audit-ts-parsed.json', JSON.stringify(data));
console.log('parsed dump -> .hermes/_audit-ts-parsed.json');
