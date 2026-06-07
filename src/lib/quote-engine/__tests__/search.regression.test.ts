// Search regression test
import { searchProducts, categories } from '../../products';

const queries = [
  '宣传单张',   // 简体
  '宣傳單張',   // 繁体
  'flyers',     // 英文
  'A4',         // SKU code
  'business card', // 英文 + 空格
  '名片',       // 简体
  'cartão',     // 葡语/外文
  '印刷',       // 简体通用词
];

for (const q of queries) {
  const results = searchProducts(q);
  console.log(`  "${q}" → ${results.length} results${results.length > 0 ? ': ' + results.slice(0, 3).map(r => r.sku_code).join(', ') : ''}`);
}
