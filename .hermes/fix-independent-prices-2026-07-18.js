// 2026-07-18 第二部分: 同步修复 pricing.ts INDEPENDENT_PRICES 的倒挂区间
// 规则: 与 products.ts 同一 SKU 等比缩放 (factor = 新basePrice/旧basePrice)
const fs = require('fs');
const PATH = 'src/lib/pricing.ts';
let s = fs.readFileSync(PATH, 'utf8');

const changes = JSON.parse(fs.readFileSync('.hermes/analysis/price-fix-preview.json', 'utf8'));
let fixed = 0;
const report = [];

for (const c of changes) {
  const re = new RegExp(
    "('" + c.slug + "': \\{\\s*'en': \\{ min: )([\\d.]+)(, max: )([\\d.]+)(, unit: '[^']*' \\},\\s*'ja': \\{ min: )([\\d.]+)(, max: )([\\d.]+)(, unit: '[^']*' \\},\\s*\\},)"
  );
  const m = s.match(re);
  if (!m) { report.push(c.slug + ': 不在 INDEPENDENT_PRICES, 跳过'); continue; }
  const [, p1, enMin, p2, enMax, p3, jaMin, p4, jaMax, p5] = m;
  const fEn = c.nEn / c.usd;
  const fJa = c.nJa / c.jpy;
  const nEnMin = Math.round(+enMin * fEn * 100) / 100;
  const nEnMax = Math.round(+enMax * fEn * 100) / 100;
  const nJaMin = Math.round(+jaMin * fJa);
  const nJaMax = Math.round(+jaMax * fJa);
  const newStr = p1 + nEnMin + p2 + nEnMax + p3 + nJaMin + p4 + nJaMax + p5;
  s = s.replace(m[0], newStr);
  fixed++;
  report.push(c.slug + ': en ' + enMin + '-' + enMax + ' → ' + nEnMin + '-' + nEnMax + ' | ja ' + jaMin + '-' + jaMax + ' → ' + nJaMin + '-' + nJaMax);
}

fs.writeFileSync(PATH, s, 'utf8');
console.log('修复: ' + fixed + ' / ' + changes.length);
report.forEach(r => console.log('  ' + r));
