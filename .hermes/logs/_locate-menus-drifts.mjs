// .hermes/logs/_locate-menus-drifts.mjs — 列出 menus 簇 27 條漂移明細（真值已改 10）
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-scan-latest.json', 'utf8'));
const MENUS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus'];

for (const slug of MENUS) {
  const items = j.findings.filter((h) => h.slug === slug);
  console.log(`\n══════ [${slug}] ${items.length} 條 ══════`);
  for (const h of items) {
    console.log(`  ${h.file.split('/').pop()}:${h.line}  ${h.kind}  found=${h.found} / truth=${h.truth}`);
    console.log(`     ${h.text.slice(0, 150)}`);
  }
}
