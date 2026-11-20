// 2026-07-18 价格倒挂修复: 中重货 en/ja 按公式重算
// en = hkd × 0.23 (≈0.128 汇率 × 1.8 市场系数: 45%毛利差 + 运费分摊 + 支付渠道费)
// ja = hkd × 30  (≈19.5 汇率 × 1.54 市场系数)
// japan-doujin: en ×0.166 / ja ×25 (平推 uplift, 保守)
// 轻货 stickers/flyers 不动 (已是 Vistaprint/ラクスル 高锚); business-cards 禁区不动
const fs = require('fs');
const PATH = 'src/data/products.ts';
const s = fs.readFileSync(PATH, 'utf8');

const changes = JSON.parse(fs.readFileSync('.hermes/analysis/price-fix-preview.json', 'utf8'));
const bySlug = new Map(changes.map(c => [c.slug, c]));

const idRe = /\bid: '([A-Z]+-\d+)'/g;
const starts = [];
let m;
while ((m = idRe.exec(s))) starts.push(m.index);

let out = '';
let prev = 0;
let replacedEn = 0, replacedJa = 0, skipped = [];

for (let k = 0; k < starts.length; k++) {
  const start = starts[k];
  const end = k + 1 < starts.length ? starts[k + 1] : s.length;
  let chunk = s.slice(start, end);
  out += s.slice(prev, start); // 对象间空隙 (逗号/换行)
  prev = end;

  const slug = (chunk.match(/slug: '([a-z0-9-]+)'/) || [])[1];
  const c = slug && bySlug.get(slug);
  if (!c) { out += chunk; continue; }

  // 安全断言: 每个对象必须恰好 1 个 basePrice_en / basePrice_ja
  const cntEn = (chunk.match(/basePrice_en:/g) || []).length;
  const cntJa = (chunk.match(/basePrice_ja:/g) || []).length;
  if (cntEn !== 1 || cntJa !== 1) { skipped.push(slug + ' (en×' + cntEn + ',ja×' + cntJa + ')'); out += chunk; continue; }

  if (c.nEn) {
    const oldStr = 'basePrice_en: ' + c.usd;
    if (!chunk.includes(oldStr)) { skipped.push(slug + ' (en old not found: ' + oldStr + ')'); out += chunk; continue; }
    chunk = chunk.replace(oldStr, 'basePrice_en: ' + c.nEn);
    replacedEn++;
  }
  if (c.nJa) {
    const oldStr = 'basePrice_ja: ' + c.jpy;
    if (!chunk.includes(oldStr)) { skipped.push(slug + ' (ja old not found: ' + oldStr + ')'); out += chunk; continue; }
    chunk = chunk.replace(oldStr, 'basePrice_ja: ' + c.nJa);
    replacedJa++;
  }
  out += chunk;
}
out += s.slice(prev);

fs.writeFileSync(PATH, out, 'utf8');
console.log('en 替换: ' + replacedEn + ' / 预期 ' + changes.filter(c => c.nEn).length);
console.log('ja 替换: ' + replacedJa + ' / 预期 ' + changes.filter(c => c.nJa).length);
if (skipped.length) { console.log('⚠️ 跳过: ' + skipped.join(', ')); process.exit(1); }
console.log('✅ 全部替换成功, 文件已写回');
