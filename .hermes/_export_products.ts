import { products } from '../src/data/products';
import * as fs from 'fs';
const out = products.map(p => ({
  id: p.id, slug: p.slug, category_slug: p.category_slug,
  name: p.name, nameEn: p.nameEn, nameJa: p.nameJa,
  description: p.description, descriptionEn: p.descriptionEn, descriptionJa: p.descriptionJa,
  price_range: p.price_range,
  images: p.images,
  imagesByLocale: p.imagesByLocale,
}));
fs.writeFileSync('.hermes/_products_export.json', JSON.stringify(out, null, 1), 'utf-8');
console.log('exported', out.length, 'SKUs');
const cats = new Set(out.map(p => p.category_slug));
console.log('categories:', [...cats].join(','));
