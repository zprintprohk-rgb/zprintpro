// Readable outline dump of the staged draft (dev aid, no writes)
import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json', 'utf8'));
const c = d.content.en;
console.log('TITLE   :', d.title.en, `[${d.title.en.length}]`);
console.log('DESC    :', d.description.en, `[${d.description.en.length}]`);
console.log('EXCERPT :', d.excerpt.en, `[${d.excerpt.en.length}]`);
console.log('CATEGORY:', d.category.en);
console.log('SLUG    :', d.slug);
console.log('\n================ BODY ================');
let out = c
  .replace(/<div class="bg-amber-50[^"]*"><p class="font-semibold mb-1">/g, '\n\n>>> ')
  .replace(/<p class="text-sm">/g, '\n    ')
  .replace(/<\/div>/g, '')
  .replace(/<h2>/g, '\n\n## ')
  .replace(/<\/h2>/g, '')
  .replace(/<p><strong>Q(\d+):/g, '\n\n[FAQ $1] ')
  .replace(/<\/strong><br\/>A: /g, '\n         A: ')
  .replace(/<p>/g, '\n\n')
  .replace(/<table[^>]*>/g, '\n[TABLE] ')
  .replace(/<thead><tr class="bg-gray-100">/g, '\nHEADER: ')
  .replace(/<tbody>/g, '')
  .replace(/<tr>/g, '\nROW: ')
  .replace(/<th class="border p-2 text-left">/g, ' | ')
  .replace(/<td class="border p-2">/g, ' | ')
  .replace(/<\/t[dh]>/g, '')
  .replace(/<\/tr>/g, '')
  .replace(/<\/table>/g, '')
  .replace(/<\/p>/g, '');
console.log(out.trim());
