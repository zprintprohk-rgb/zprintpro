var fs = require('fs');
var p = fs.readFileSync('F:/zprintpro-nextjs/src/lib/pricing.ts', 'utf-8');
var fn = '\n\n/** v18: Unit price anchor from precomputed data */\nexport function getUnitPriceAnchor(slug, locale) {\n  var a = UNIT_PRICE_ANCHORS[slug];\n  if (!a) return null;\n  var l = a[locale];\n  if (!l) l = a["zh-hk"];\n  if (!l) return null;\n  return {\n    price: parseFloat(l.priceDisplay),\n    qty: l.qty,\n    batchPrice: l.batchPrice,\n    symbol: locale === "ja" ? "\\u00a5" : locale === "en" ? "$" : "HK$",\n    display: (locale === "ja" ? "\\u00a5" : locale === "en" ? "$" : "HK$") + l.priceDisplay,\n    unitLabel: l.unitLabel,\n  };\n}\n';
p = p.replace('// 2026-07-13 Step 2: 用 getLiveFxRates() 取代硬编码', fn + '// 2026-07-13 Step 2: 用 getLiveFxRates() 取代硬编码');
fs.writeFileSync('F:/zprintpro-nextjs/src/lib/pricing.ts', p, 'utf-8');
console.log('Added getUnitPriceAnchor');
