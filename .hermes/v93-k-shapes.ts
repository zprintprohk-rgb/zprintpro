import { skuSeoData } from '../src/data/sku-seo-data';
import { categorySeoContent } from '../src/data/category-seo-content';
import { packagingBoxesFAQs } from '../src/data/product-faqs';

const e = (skuSeoData as Record<string, any>)['food-boxes'];
console.log('food-boxes.faqs["0"] 结构:', JSON.stringify(e.faqs['0']).slice(0, 300));
console.log('food-boxes.faqs 键:', Object.keys(e.faqs).join(','));

const pk = (categorySeoContent as any)['packaging']['zh-hk'];
console.log('\npackaging PLP faq[0]:', JSON.stringify(pk.faq[0]).slice(0, 220));
console.log('packaging PLP faq 条数:', pk.faq.length);

console.log('\npackagingBoxesFAQs 类型:', Array.isArray(packagingBoxesFAQs) ? `数组(${packagingBoxesFAQs.length})` : typeof packagingBoxesFAQs);
if (Array.isArray(packagingBoxesFAQs)) console.log('  [0]:', JSON.stringify(packagingBoxesFAQs[0]).slice(0, 240));
