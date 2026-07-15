// 检查 20 ERROR SKU 当前 ja alt 状态
import { skuSeoData } from './src/data/sku-seo-data.ts';

const errorSlugs = [
  'large-bags', 'thick-paper-flyers', 'art-posters', 'adhesive-posters',
  'gift-boxes', 'mailer-boxes', 'foil-red-packets', 'embossed-red-packets',
  'wall-calendars', 'desk-calendars', 'pvc-menus', 'laminated-menus',
  'roll-up-banners', 'vehicle-wraps', 'catalog-printing', 'saddle-stitch-booklets',
  'spiral-notebooks', 'business-envelopes', 'pearl-envelopes',
  'exercise-books', 'certificates', 'school-flyers', 'textbooks',
];

for (const slug of errorSlugs) {
  const d = skuSeoData[slug];
  if (!d) { console.log(`  ! ${slug}: NOT FOUND`); continue; }
  const ja = (d.imageAlt && d.imageAlt.ja) || '(empty)';
  console.log(`  [${slug}] ja: ${ja}`);
}
