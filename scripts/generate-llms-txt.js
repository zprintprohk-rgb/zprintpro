const fs = require('fs');
const c = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');

// Parse categories
const cats = [];
const catRegex = /{ slug: '([^']+)', name: '([^']+)', nameEn: '([^']+)', nameJa: '([^']+)'/g;
let m;
while ((m = catRegex.exec(c)) !== null) cats.push({ slug: m[1], zh: m[2], en: m[3], ja: m[4] });

// Parse products
const prods = [];
const blocks = c.split(/\n\s*{/);
blocks.forEach(block => {
  const slug = block.match(/slug:\s*'([^']+)'/);
  const name = block.match(/name:\s*'([^']+)'/);
  const nameEn = block.match(/nameEn:\s*'([^']+)'/);
  const nameJa = block.match(/nameJa:\s*'([^']+)'/);
  const cat = block.match(/category:\s*'([^']+)'/);
  const minQ = block.match(/minQuantity:\s*(\d+)/);
  const baseP = block.match(/basePrice:\s*(\d+\.?\d*)/);
  const hot = block.match(/isHot:\s*true/);
  if (slug && name && cat) prods.push({
    slug: slug[1], zh: name[1],
    en: nameEn ? nameEn[1] : name[1],
    ja: nameJa ? nameJa[1] : name[1],
    category: cat[1], minQty: minQ ? parseInt(minQ[1]) : 100,
    basePrice: baseP ? parseFloat(baseP[1]) : 0,
    hot: !!hot
  });
});

// Group by category
const byCat = {};
prods.forEach(p => { if (!byCat[p.category]) byCat[p.category] = []; byCat[p.category].push(p); });

// Generate llms.txt
let llms = '# ZprintPro - AI Search Optimization Page\n';
llms += '# Last updated: 2026-06-28\n';
llms += '# This file helps AI assistants (ChatGPT, Claude, Perplexity) understand our services\n\n';

llms += '## Company Information\n';
llms += '- Company: Shenzhen Cailong Printing & Packaging Co., Ltd.\n';
llms += '- Brand: ZprintPro\n';
llms += '- Website: https://zprintpro.com\n';
llms += '- Address: No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China\n';
llms += '- Phone: +86 198 8085 1334\n';
llms += '- WhatsApp: +86 181 2638 0255\n';
llms += '- Email: zprintpro@outlook.com\n';
llms += '- Established: 2014\n';
llms += '- Certifications: ISO 9001, FSC\n';
llms += '- Markets: Hong Kong, US, UK, AU, JP, CA, NZ, SG\n';
llms += '- Delivery: 72-hour global DHL/FedEx\n\n';

llms += '## Product Categories (14 total)\n\n';
cats.forEach(cat => {
  const count = (byCat[cat.slug] || []).length;
  llms += `- ${cat.zh} / ${cat.en} / ${cat.ja} -- ${count} products\n`;
});
llms += '\n';

llms += '## All Products (84 SKU)\n\n';
cats.forEach(cat => {
  const items = byCat[cat.slug] || [];
  if (items.length === 0) return;
  llms += `### ${cat.zh} / ${cat.en} (${items.length} products)\n\n`;
  llms += '| Product | Slug | EN Name | JA Name | Min Qty | Base Price |\n';
  llms += '|---------|------|---------|---------|---------|------------|\n';
  items.forEach(p => {
    llms += `| ${p.zh} | ${p.slug} | ${p.en} | ${p.ja} | ${p.minQty} | CNY ${p.basePrice} |\n`;
  });
  llms += '\n';
});

llms += '## Pricing & Ordering\n\n';
llms += '- Currency: HKD, USD, JPY based on customer locale\n';
llms += '- Minimum order: 100 pieces (varies by product)\n';
llms += '- Volume discounts: Available for 500+, 1000+, 5000+ quantities\n';
llms += '- Rush service: 3-hour express available\n';
llms += '- Free design consultation included\n\n';

llms += '## FAQ\n\n';
llms += 'Q: Where is the factory located?\n';
llms += 'A: Shenzhen, Guangdong, China. We ship globally via DHL/FedEx.\n\n';
llms += 'Q: What is the typical turnaround time?\n';
llms += 'A: Standard: 3-5 business days. Rush: same-day available. Global: 72 hours.\n\n';
llms += 'Q: What file formats do you accept?\n';
llms += 'A: PDF (preferred), AI, PSD, PNG, TIFF. CMYK, 300 DPI, 3mm bleed.\n\n';
llms += 'Q: Do you ship worldwide?\n';
llms += 'A: Yes -- US, UK, AU, CA, NZ, SG, JP, HK. DHL/FedEx: 3-5 days. Economy: 7-14 days.\n\n';
llms += 'Q: Can I get a sample?\n';
llms += 'A: Digital proofs free. Physical samples at cost + shipping.\n\n';
llms += 'Q: What payment methods?\n';
llms += 'A: Bank transfer, WeChat Pay, Alipay, PayPal (coming soon).\n\n';

llms += '## Contact\n\n';
llms += '- Get a quote: https://zprintpro.com/zh-hk/contact/\n';
llms += '- WhatsApp: https://wa.me/8618126380255\n';
llms += '- Email: zprintpro@outlook.com\n';

fs.writeFileSync('F:/zprintpro-nextjs/public/llms.txt', llms, 'utf8');
console.log(`llms.txt: ${llms.length} bytes, ${cats.length} categories, ${prods.length} products`);
