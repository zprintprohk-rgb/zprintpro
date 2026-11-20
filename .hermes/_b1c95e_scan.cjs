// .hermes/_b1c95e_scan.cjs — 簇9.5-E: CRED_1000_PLUS + 12-industries 孤立行全量上下文分类
const fs = require('fs');
const { execSync } = require('child_process');
const REPO = process.cwd();
const files = execSync('git ls-files src/data src/lib src/app src/components', { encoding: 'utf8' }).trim().split('\n').filter(f => /\.(ts|tsx|json)$/.test(f));
const out = [];
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const pat of ['1,000+', '1000+']) {
    let i = 0;
    while (true) {
      const j = t.indexOf(pat, i);
      if (j < 0) break;
      const ctx = t.slice(Math.max(0, j - 70), j + 70).replace(/\s+/g, ' ');
      out.push({ f: f.replace(/\\/g, '/'), pat, ctx });
      i = j + 1;
    }
  }
  let i2 = 0;
  while (true) {
    const j = t.indexOf('12 industries', i2);
    if (j < 0) break;
    out.push({ f: f.replace(/\\/g, '/'), pat: '12ind', ctx: t.slice(Math.max(0, j - 70), j + 70).replace(/\s+/g, ' ') });
    i2 = j + 1;
  }
  const j3 = t.indexOf('12 大行業');
  if (j3 >= 0) out.push({ f: f.replace(/\\/g, '/'), pat: '12大行業', ctx: t.slice(Math.max(0, j3 - 70), j3 + 70).replace(/\s+/g, ' ') });
  const j4 = t.indexOf('12 大行业');
  if (j4 >= 0) out.push({ f: f.replace(/\\/g, '/'), pat: '12大行业', ctx: t.slice(Math.max(0, j4 - 70), j4 + 70).replace(/\s+/g, ' ') });
}
fs.writeFileSync('.hermes/logs/b1c-cluster95e-inventory-2026-10-16.json', JSON.stringify({ scanned: new Date().toISOString(), total: out.length, items: out }, null, 1), 'utf-8');
console.log('total instances:', out.length);
// 分类统计: 数量阈值(KEEP) vs 客户数(修正) vs 灰色
const isQty = c => /(個|枚|本|張|件|部|sets?| pcs|ロット|下单|订单|享|折|以上〜|个起|MOQ| qty|quantity)/i.test(c);
const isClient = c => /(客戶|客户|clients?|customers?|brands?|ブランド|社|users?|served|服務|服务)/i.test(c);
let keep = 0, fix = 0, gray = 0;
for (const o of out) {
  if (o.pat === '12ind' || o.pat.startsWith('12大')) { gray++; continue; }
  if (isQty(o.ctx) && !isClient(o.ctx)) keep++;
  else if (isClient(o.ctx)) fix++;
  else gray++;
}
console.log(`keep(数量阈值): ${keep} | fix(客户数宣称): ${fix} | gray(待判): ${gray}`);
