const { execSync } = require('child_process');
const probes = ['HK$6-32/本', 'US$1.84-7.36', 'MOQ 50 本', "price_range: 'HK$6-32/本'", 'basePrice: 6,', 'basePrice_en: 1.84'];
for (const p of probes) {
  let out = '';
  try {
    out = execSync('git log -S "' + p.replace(/"/g, '') + '" --oneline -- src/data/products.ts', { encoding: 'utf8' });
  } catch (e) { out = 'ERR ' + e.message.slice(0, 120); }
  const lines = out.trim().split('\n').filter(Boolean);
  console.log('\n=== "' + p + '" — ' + lines.length + ' commits ===');
  lines.slice(0, 5).forEach((l) => console.log('  ' + l));
}
