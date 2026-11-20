// Surgical mount of SkuReviews into PDP (traditional comments, no blanket replace)
const fs = require('fs');
const p = 'src/app/[locale]/product/[slug]/page.tsx';
let s = fs.readFileSync(p, 'utf8');
const a = "import { coreProductFAQMap, skuMoneyFAQs } from '@/data/product-faqs';";
if (!s.includes(a)) { console.log('ANCHOR1 MISSING'); process.exit(2); }
if (s.includes('SkuReviews')) { console.log('ALREADY_MOUNTED'); process.exit(0); }
s = s.replace(a, a + '\n' + "import SkuReviews from '@/components/product/SkuReviews';");
const NL = String.fromCharCode(10);
const oldTail = '      </main>' + NL + '      )}' + NL + '    </>';
const comment = '      {/* SKU \u5ba2\u6236\u8a55\u50f9 (K3 2026-10-28 \u65b9\u6848A \u00b7 A1\u6279): fail-closed \u2014 \u9077\u79fb\u672a apply/\u7121\u6578\u64da\u6642\u6574\u6bb5\u96b1\u85cf; \u53ea\u5c55\u793a approved, \u7d05\u7dda=\u96f6\u7de8\u9020 */}';
const newTail = '      </main>' + NL + '      )}' + NL + comment + NL + '      <SkuReviews slug={product.slug} locale={locale} />' + NL + '    </>';
if (!s.includes(oldTail)) { console.log('ANCHOR2 MISSING'); process.exit(2); }
s = s.replace(oldTail, newTail);
fs.writeFileSync(p, s, 'utf8');
console.log('surgical OK, import:', s.includes("import SkuReviews"), 'mount:', s.includes('<SkuReviews slug={product.slug}'));
