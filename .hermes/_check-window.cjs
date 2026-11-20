const fs = require('fs');
for (const f of ['.hermes/title-verify-window.json', '.hermes/title-verify-window-v5-20260923.json']) {
  if (!fs.existsSync(f)) { console.log(`${f}: N/A`); continue; }
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const slots = (j.slots || []).map((s) => `${s.slug}|${s.locale}`);
  console.log(`--- ${f} (${slots.length} slots)`);
  for (const key of ['outdoor-vinyl-banners|ja', 'electronics-packaging-box|en', 'white-card-boxes|zh-hk']) {
    console.log(`  ${key}: ${slots.includes(key) ? 'IN WINDOW' : 'not in window'}`);
  }
}
