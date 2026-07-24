// Smoke test price-injector.ts data resolution
import { getPriceTableForSlug } from '../src/lib/price-injector';

const tests = [
  ['gang-run-card-boxes', 'PKG-016'],
  ['white-card-boxes', 'PKG-013 (飛機盒 filter)'],
  ['tuck-end-boxes', 'PKG-015 (雙插盒 filter)'],
  ['corrugated-boxes', 'PKG-014'],
  ['white-card-bags', 'PB-002'],
  ['saddle-stitch-booklets', 'BK-002'],
  ['perfect-bound-books', 'BK-003'],
  ['exercise-books', 'exercise-books'],
  ['a4-flyers', 'FL-001'],
  ['a5-flyers', 'FL-002'],
  ['same-day-flyers', 'FL-008'],
  ['eco-flyers', 'FL-007'],
  ['folded-leaflets', 'FL-004 special-fold'],
  ['nonexistent-product', 'should be null'],
];

tests.forEach(([slug, desc]) => {
  try {
    const data = getPriceTableForSlug(slug);
    if (data) {
      const configCount = data.configs.length;
      const tierCount = data.configs[0]?.tiers?.length || 0;
      console.log(`[OK] ${slug} → ${configCount} configs, ${tierCount} tiers (${desc})`);
    } else {
      console.log(`[NO] ${slug} → null (${desc})`);
    }
  } catch (e) {
    console.log(`[ERR] ${slug}: ${e.message}`);
  }
});
