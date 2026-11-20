// .hermes/_patch_pdp_faqhead.cjs
const fs = require('fs');
const p = 'src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;
t = t.replace(
  "if (p === '**常見問題**' || p === '**FAQ**' || p === '**FAQs**') {",
  "if (/^\\*\\*(常見問題|FAQ|FAQs|よくある質問|常见问题)\\*\\*$/.test(p)) {"
);
console.log('changed:', t !== before);
fs.writeFileSync(p, t, 'utf8');
