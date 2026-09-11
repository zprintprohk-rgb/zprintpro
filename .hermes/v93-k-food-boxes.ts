import { skuSeoData } from '../src/data/sku-seo-data';

const s = (skuSeoData as Record<string, Record<string, Record<string, unknown>>>)['food-boxes'];
if (!s) { console.log('food-boxes 不存在'); process.exit(0); }
console.log('locales:', Object.keys(s).join(', '));
for (const loc of Object.keys(s)) {
  const e = s[loc];
  console.log(`\n[${loc}]`);
  console.log(`  title: ${String(e.title || '').slice(0, 200)}`);
  console.log(`  h1: ${String(e.h1 || '').slice(0, 200)}`);
  console.log(`  description: ${String(e.description || '').slice(0, 260)}`);
}
