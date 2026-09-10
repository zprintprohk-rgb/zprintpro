/* 合并后验证 (放工作区内跑) */
import { skuSeoData } from '../src/data/sku-seo-data';
const cjk = (s: string) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;
const keys = Object.keys(skuSeoData);
const thin = keys.filter((k) => {
  const b = skuSeoData[k]?.seo?.['zh-hk']?.body ?? '';
  const vis = b.split('\n\n').filter((p) => p.trim() && !p.trim().startsWith('交稿規範：')).join('');
  return cjk(vis) < 300;
});
console.log('总 entries:', keys.length);
console.log('zh-hk 可见<300:', thin.length, thin.slice(0, 8).join(','));
console.log('corrugated-boxes 可见字数:', cjk(skuSeoData['corrugated-boxes']?.seo?.['zh-hk']?.body ?? ''));
console.log('corrugated-boxes zh-hk title (应为空串→回退):', JSON.stringify(skuSeoData['corrugated-boxes']?.seo?.['zh-hk']?.title));
console.log('corrugated-boxes en body (应为空串):', JSON.stringify(skuSeoData['corrugated-boxes']?.seo?.['en']?.body));
console.log('waterproof-stickers (蓝本, 应未被改 ≈450):', cjk(skuSeoData['waterproof-stickers']?.seo?.['zh-hk']?.body ?? ''));
console.log('waterproof-stickers title (应保持原样):', skuSeoData['waterproof-stickers']?.seo?.['zh-hk']?.title?.slice(0, 30));
