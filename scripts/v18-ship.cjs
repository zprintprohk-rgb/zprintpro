var fs = require('fs');
var r = fs.readFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', 'utf-8');

// Check current state
var has500 = r.includes('滿$500包郵');
console.log('Already fixed:', has500);

if (!has500) {
  // Replace the getShippingText function with unified shipping
  var oldFn = r.match(/function getShippingText\(w: number \| null, locale: string\): string \{[\s\S]*?\n\}/);
  if (oldFn) {
    var newFn = 'function getShippingText(w: number | null, locale: string): string {\n  return locale === "ja" ? "$500\u76f8\u5f53\u4ee5\u4e0a \u9001\u6599\u7121\u6599" : locale === "en" ? "Free over $500" : "\u6eff$500\u5305\u90f5 (\u9806\u8c50/\u7269\u6d41) \u00b7 \u672a\u6eff$500\u904b\u8cbb\u5be6\u5831";\n}';
    r = r.replace(oldFn[0], newFn);
    fs.writeFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', r, 'utf-8');
    console.log('Shipping function fixed');
  } else {
    console.log('getShippingText not found - trying alternative patterns');
    // Just look for the whole function block
    var idx = r.indexOf('function getShippingText');
    if (idx >= 0) {
      var endIdx = r.indexOf('\n}', idx);
      if (endIdx >= 0) {
        var endIdx2 = r.indexOf('\n}', endIdx + 3);
        var before = r.slice(0, idx);
        var after = r.slice(endIdx2 + 3);
        var replacement = 'function getShippingText(w: number | null, locale: string): string {\n  return locale === "ja" ? "$500\u76f8\u5f53\u4ee5\u4e0a \u9001\u6599\u7121\u6599" : locale === "en" ? "Free over $500" : "\u6eff$500\u5305\u90f5 (\u9806\u8c50/\u7269\u6d41) \u00b7 \u672a\u6eff$500\u904b\u8cbb\u5be6\u5831";\n}';
        r = before + replacement + after;
        fs.writeFileSync('F:/zprintpro-nextjs/src/components/pdp/referencepriceblock.tsx', r, 'utf-8');
        console.log('Shipping function replaced (alt method)');
      }
    }
  }
}

console.log('Done');
