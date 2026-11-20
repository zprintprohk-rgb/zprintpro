// Brand duplicate root cause: parse all JSON-LD blocks on an affected PDP
const url = 'https://zprintpro.com/zh-hk/product/custom-red-packets/';
const html = await (await fetch(url)).text();
// extract all <script type="application/ld+json"> blocks
const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
console.log('ld+json blocks:', blocks.length);
blocks.forEach((b, i) => {
  try {
    const j = JSON.parse(b);
    const types = [];
    const walk = (o) => {
      if (Array.isArray(o)) return o.forEach(walk);
      if (o && typeof o === 'object') {
        if (o['@type']) types.push(String(o['@type']));
        Object.values(o).forEach(walk);
      }
    };
    walk(j);
    // count brand occurrences (key-level)
    let brandKeys = [];
    const walkB = (o, path) => {
      if (Array.isArray(o)) return o.forEach((x, k) => walkB(x, path + '[' + k + ']'));
      if (o && typeof o === 'object') {
        for (const [k, v] of Object.entries(o)) {
          if (/^brand$/i.test(k)) brandKeys.push(path + '.' + k + ' = ' + JSON.stringify(v).slice(0, 80));
          walkB(v, path + '.' + k);
        }
      }
    };
    walkB(j, '');
    const hasProduct = types.includes('Product');
    console.log(`--- block ${i}: types=${[...new Set(types)].join(',')} product=${hasProduct} brandKeys=${brandKeys.length}`);
    brandKeys.forEach(x => console.log('    ' + x));
    // raw duplicate key detection inside the JSON text
    const raw = b;
    const brands = raw.match(/"brand"\s*:/g);
    if (brands && brands.length > 1) console.log(`    RAW duplicate "brand": keys in raw json = ${brands.length}`);
  } catch (e) {
    console.log(`--- block ${i}: PARSE FAIL ${e.message} (len ${b.length})`);
  }
});
console.log('BRAND_DIAG_DONE');
