// .hermes/logs/_locate-menus-copy.mjs — 定位 menus 簇文案中需對齊真值 10 的「100」
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-scan-latest.json', 'utf8'));
const MENUS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus'];

console.log('=== menus 簇相關漂移（真值已改 10，文案仍寫 100）===');
for (const slug of MENUS) {
  const items = j.findings.filter((h) => h.slug === slug);
  console.log(`\n[${slug}] ${items.length} 條`);
  for (const h of items.slice(0, 8)) {
    console.log(`  ${h.file.split('/').pop()}:${h.line} ${h.kind} found=${h.found}/truth=${h.truth}`);
    console.log(`     ${h.text.slice(0, 125)}`);
  }
}

console.log('\n\n=== 全站含「餐牌/菜單/menu」+100 起的行（含跨品類檔）===');
const FILES = ['src/data/products.ts', 'src/data/sku-seo-data.ts', 'src/data/products-content.ts', 'src/data/category-seo-content.ts'];
for (const f of FILES) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (!/(餐牌|菜單|菜谱|menu|メニュー)/i.test(l)) return;
    for (const m of l.matchAll(/(\d+)\s*[張份本個]\s*起/g)) {
      if (m[1] === '100') {
        console.log(`  ${f.split('/').pop()}:${i + 1} 「${m[0]}」`);
        console.log(`     ${l.trim().slice(0, 130)}`);
        break;
      }
    }
  });
}
