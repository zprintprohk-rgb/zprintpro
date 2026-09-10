/* 诊断: wedding/greeting 注入后 ja body 状态 */
import { skuSeoData } from '../src/data/sku-seo-data';
for (const s of ['foil-wedding-invitations', 'save-the-date-cards', 'premium-greeting-cards', 'thick-greeting-cards-400g']) {
  const e = skuSeoData?.[s];
  const b = e?.seo?.ja?.body ?? '(no ja body)';
  console.log(s, '=> ja.body 前80字:', String(b).slice(0, 80).replace(/\n/g, '\\n'));
  console.log('   ja.body length:', b.length);
}
