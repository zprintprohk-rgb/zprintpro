const fs = require('fs');
const a = JSON.parse(fs.readFileSync('.hermes/logs/sku-title-v5-audit-2026-09-22.json', 'utf8'));
const byRule = {};
for (const f of a.findings) {
  for (const h of f.hard) {
    (byRule[h.rule] = byRule[h.rule] || []).push(`${f.slug}|${f.locale}: ${f.title}  → ${h.msg}`);
  }
}
for (const [rule, list] of Object.entries(byRule)) {
  console.log(`\n===== ${rule} (${list.length}) =====`);
  list.forEach((x) => console.log('  ' + x));
}
