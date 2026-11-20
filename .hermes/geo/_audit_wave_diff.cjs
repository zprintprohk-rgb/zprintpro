// Forbidden-field audit across the 4 catch-up wave commits (W2..W5) vs pre-wave base
const { execSync } = require('child_process');
const base = '5e080d7b';
const diff = execSync(`git diff ${base}..HEAD -- src/data/products.ts`, { encoding: 'utf8', maxBuffer: 64e6 });
const lines = diff.split('\n').filter(l => /^[+-]/.test(l) && !/^[+-]{3}/.test(l));
const pat = {
  title_zh: /^[+-].*title_zh/, minQuantity: /^[+-].*minQuantity/, basePrice: /^[+-].*basePrice/,
  seoImages: /^[+-].*seoImages/, imageAlt: /^[+-].*imageAlt/, name: /^[+-][^+-]*\bname:/,
  title_meta: /^[+-].*\btitle:/,
};
const counts = {};
for (const k in pat) counts[k] = lines.filter(l => pat[k].test(l)).length;
const adds = lines.filter(l => l.startsWith('+'));
const nonImgAdds = adds.filter(l => !/imagesByLocale|images:|'zh-hk':|'en':|'ja':|^\+\s*\}|\},?\s*$|^\+\s*\]|^\+\s*\{/.test(l));
console.log('changed_lines=' + lines.length + ' adds=' + adds.length + ' non_image_adds=' + nonImgAdds.length);
console.log('forbidden=' + JSON.stringify(counts));
console.log('hunks=' + (diff.match(/^@@/gm) || []).length);
if (nonImgAdds.length) console.log('NON_IMAGE_ADD_SAMPLES=' + nonImgAdds.slice(0, 5).join(' ||| '));
