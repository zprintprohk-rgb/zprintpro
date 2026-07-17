/**
 * 修复 sku-seo-data.ts 中 zh-hk seo.body 的英文垃圾片段 (P1)
 * 文本级精准替换, 不重排整个文件。
 * 用法: node scripts/fix-sku-zhhk-body.cjs [--write]
 */
const fs = require('fs');
const path = 'src/data/sku-seo-data.ts';
const WRITE = process.argv.includes('--write');

let src = fs.readFileSync(path, 'utf-8');
const start = src.indexOf('= {') + 2;
const objSrc = src.slice(start).slice(0, src.slice(start).indexOf('\n};') + 2);
const data = eval('(' + objSrc + ')');

const isCardZone = (slug) =>
  /business-card|name-card|meishi/i.test(slug) || /咭片|名片/.test((data[slug].name || {})['zh-hk'] || '');

function extract(desc, re) {
  const m = desc.match(re);
  return m ? m[1].trim() : null;
}

function compose(slug, entry) {
  const desc = entry.seo['zh-hk'].description || '';
  let name = (entry.name['zh-hk'] || '').trim();
  let mat = extract(desc, /採用\s*(.+?)\s*(?:高品質)?材質/);
  let craft = extract(desc, /提供\s*(.+?)。/);
  const moq = extract(desc, /(\d+\s*[張本個份件套卷]\s*起)/);
  const del = extract(desc, /(\d+-\d+\s*個工作天交貨)/);

  if (isCardZone(slug)) {
    name = name.replace(/名片|咭片/g, '卡片');
    if (mat) mat = mat.replace(/名片|咭片/g, '卡片');
    if (craft) craft = craft.replace(/名片|咭片/g, '卡片');
  }

  let head = name + (moq ? ` ${moq}印` : ' 小批量起印') + '。';
  head = head.replace(/起起印/, '起印');
  const mid = [];
  if (mat) mid.push(`選用${mat}`);
  if (craft) mid.push(`提供${craft}`);
  const s2 = mid.length ? mid.join('，') + '。' : '';
  const tail = del ? `下單後${del}，港九新界免費速遞。` : '港九新界免費速遞，辦公室或港鐵站交收。';

  let body = head + s2 + tail;
  const len = (body.match(/[一-鿿0-9a-zA-Z]/g) || []).length;
  if (len > 70) body = head + s2;
  return body;
}

// 找出待修复条目
const targets = [];
for (const slug of Object.keys(data)) {
  const b = data[slug].seo['zh-hk'].body || '';
  const letters = (b.match(/[a-zA-Z]/g) || []).length;
  const cjk = (b.match(/[一-鿿]/g) || []).length;
  if (letters > 0 && cjk <= letters) targets.push(slug);
}
console.log('待修复条目:', targets.length);

const report = [];
let out = src;
let fixed = 0;

for (const slug of targets) {
  const newBody = compose(slug, data[slug]);
  // 定位该条目的文本 span
  const entryRe = new RegExp('\\n  "' + slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '": \\{');
  const m = out.match(entryRe);
  if (!m) { console.log('!! 找不到条目', slug); continue; }
  const spanStart = m.index;
  // 条目结束: 下一个缩进 2 的顶层 key 或文件对象尾
  const rest = out.slice(spanStart + 1);
  const nextKey = rest.search(/\n  "[\w-]+": \{/);
  const spanEnd = nextKey === -1 ? out.length : spanStart + 1 + nextKey;
  let span = out.slice(spanStart, spanEnd);

  // 在 span 内定位 seo -> zh-hk -> body 行
  const seoIdx = span.indexOf('"seo"');
  const zhhkIdx = span.indexOf('"zh-hk"', seoIdx);
  const bodyRe = /"body": "(?:[^"\\]|\\.)*"/;
  const sub = span.slice(zhhkIdx);
  const bm = sub.match(bodyRe);
  if (!bm) { console.log('!! 找不到 body', slug); continue; }
  const oldLiteral = bm[0];
  const newLiteral = '"body": ' + JSON.stringify(newBody);
  span = span.slice(0, zhhkIdx + bm.index) + newLiteral + span.slice(zhhkIdx + bm.index + oldLiteral.length);
  out = out.slice(0, spanStart) + span + out.slice(spanEnd);
  fixed++;
  report.push({ slug, old: JSON.parse(oldLiteral.slice(7)), new: newBody });
}

console.log('实际替换:', fixed);
for (const s of report.slice(0, 5)) {
  console.log('\n---', s.slug);
  console.log('OLD:', JSON.stringify(s.old));
  console.log('NEW:', s.new);
}
fs.writeFileSync('.hermes/tmp-fix1-report.json', JSON.stringify(report, null, 2), 'utf-8');

if (WRITE) {
  fs.writeFileSync(path, out, 'utf-8');
  console.log('\n已写回', path, 'size', out.length);
} else {
  console.log('\n(dry-run, 加 --write 写回)');
}
