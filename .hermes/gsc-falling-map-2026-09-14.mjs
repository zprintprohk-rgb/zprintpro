// 热度下降词 → 落地页映射 + 优化动作生成
import fs from 'fs';

const result = JSON.parse(fs.readFileSync('.hermes/gsc-falling-2026-09-14-result.json', 'utf8'));

// 落地页映射表 (基于 seo.ts categorySeoData / sku-seo-data / blog 已知路由)
const LANDING = {
  '戶外海報': { url: '/zh-hk/category/posters/', cat: 'posters', note: '海報簇' },
  '包裝盒': { url: '/zh-hk/category/packaging/', cat: 'packaging', note: '包装盒簇泛词' },
  '膠片餐牌': { url: '/zh-hk/category/menus/', cat: 'menus', note: '餐牌簇' },
  '紙袋': { url: '/zh-hk/category/paper-bags/', cat: 'paper-bags', note: 'L3 降级品类' },
  '海報列印': { url: '/zh-hk/category/posters/', cat: 'posters', note: '海報簇' },
  '車身廣告': { url: '/zh-hk/category/banners/', cat: 'banners', note: '横额/车身' },
  'a3海報印刷': { url: '/zh-hk/category/posters/', cat: 'posters', note: '海報簇' },
  '環保印刷': { url: null, cat: null, note: '泛词, 无专属落地页' },
  '包裝盒訂製': { url: '/zh-hk/category/packaging/', cat: 'packaging', note: '8 T1 锁定词, 唯一负向' },
  '宣傳單張印刷': { url: '/zh-hk/category/flyers/', cat: 'flyers', note: '8 T1 锁定词近义' },
  '校 簿 印刷': { url: '/zh-hk/category/educational/', cat: 'educational', note: '校园簇' },
  'a6 尺寸': { url: null, cat: null, note: '尺寸泛词, 展示 +203% 位置微退' },
  '防水貼紙': { url: '/zh-hk/product/waterproof-stickers/', cat: 'stickers', note: '贴纸簇' },
  '座檯月曆': { url: '/zh-hk/category/calendars/', cat: 'calendars', note: '月曆簇' },
  'pvc貼紙': { url: '/zh-hk/product/waterproof-stickers/', cat: 'stickers', note: '贴纸簇' },
  '戶外橫額': { url: '/zh-hk/category/banners/', cat: 'banners', note: 'B 组展示 -45%' }
};

console.log('=== 热度下降词 × 落地页 × 建议动作 ===');
const rows = [...result.falling_pos, ...result.falling_imp.map(r => ({ ...r, dPos: null, note: 'B组' }))];
const seen = new Set();
for (const r of rows) {
  if (seen.has(r.q)) continue;
  seen.add(r.q);
  const L = LANDING[r.q] || { url: null, note: '未映射' };
  console.log(`\n[${r.q}] ${r.dPos != null ? `pos ${r.pos93}->${r.pos10} (Δ${r.dPos})` : ''} imp ${r.imp93}->${r.imp10} (${r.impPct ?? 0}%)`);
  console.log(`  落地页: ${L.url ?? '(无专属页)'} | ${L.note}`);
}

// 汇总: 按簇聚合
const cluster = {};
for (const r of rows) {
  const L = LANDING[r.q];
  if (!L || !L.cat) continue;
  cluster[L.cat] = cluster[L.cat] || { words: [], worst: 0 };
  cluster[L.cat].words.push(r.q);
  cluster[L.cat].worst = Math.min(cluster[L.cat].worst, r.dPos ?? 0);
}
console.log('\n=== 按品类簇聚合热度下降 ===');
for (const [cat, v] of Object.entries(cluster)) {
  console.log(`  ${cat}: ${v.words.join(' / ')} (最差 Δ${v.worst})`);
}
