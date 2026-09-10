/* F1 修复前侦察: ① '**交稿規範**' 坏前缀分布 ② 各SKU 正确口径可见字数与余量 ③ japan-doujin ¥ 价格源核对 */
const fs = require('fs');
const OUT = '.hermes/f1-outputs';
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
const cjk = (s) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const visible = (b) => b.split('\n\n').map((p) => p.trim()).filter(Boolean).filter((p) => !p.startsWith('交稿規範：')).join('');

console.log('=== ① **交稿規範** 坏前缀 ===');
let bad = 0;
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8'));
  const paras = (o.body || '').split('\n\n');
  const hit = paras.find((p) => p.trim().startsWith('**交稿規範**'));
  if (hit) { bad++; console.log(`  ${o.slug}: 可见=${cjk(visible(o.body))}`); }
}
console.log(`坏前缀 SKU: ${bad}`);

console.log('\n=== ② 全部 SKU 可见字数 (正确口径 startsWith 交稿規範：) ===');
const short = [];
for (const f of files) {
  const o = JSON.parse(fs.readFileSync(`${OUT}/${f}`, 'utf8'));
  const v = cjk(visible(o.body));
  if (v < 300) short.push(`${o.slug}=${v}`);
}
console.log(short.length ? `可见<300: ${short.join(', ')}` : '全部 ≥300 ✓');

console.log('\n=== ③ japan-doujin 价格源核对 (packet price_range vs body) ===');
for (const s of ['postcard-set','eco-tote-bag','acrylic-keychain','can-badge','doujinshi-printing']) {
  const pkt = JSON.parse(fs.readFileSync(`.hermes/f1-packets/${s}.json`, 'utf8'));
  const o = JSON.parse(fs.readFileSync(`${OUT}/${s}.json`, 'utf8'));
  const pr = pkt.product.price_range;
  const minq = pkt.product.minQuantity;
  const nums = (o.body.match(/\d[\d,]*/g) || []).slice(0, 12);
  console.log(`  ${s}: price_range=${pr} minQ=${minq} | body数字=${nums.join('/')}`);
}
