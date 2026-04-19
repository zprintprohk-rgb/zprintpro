const fs = require('fs');
let content = fs.readFileSync('src/data/buying-guides.ts', 'utf-8');

// Remove TypeScript type annotations to convert to JS
content = content.replace("import { Locale } from '@/lib/seo';\n\n", '');

content = content.replace(
  'export type BuyingGuide = {',
  '/** @typedef {Object} BuyingGuide */\nexport const BuyingGuideShape = {'
);

content = content.replace(/: Record<Locale, string>/g, '');
content = content.replace(/: string\b/g, '');
content = content.replace(/: string\[\]/g, '');
content = content.replace(/: boolean/g, '');

fs.writeFileSync('src/data/buying-guides.js', content, 'utf-8');
console.log('Created buying-guides.js');
