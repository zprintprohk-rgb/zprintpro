// Dump full Product JSON-LD block for inspection
const html = await (await fetch('https://zprintpro.com/zh-hk/product/custom-red-packets/')).text();
const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const b = blocks.find(x => x.includes('"Product"'));
console.log(b);
console.log('---');
// case-insensitive brand-like keys anywhere in the block
const keys = [...b.matchAll(/"([a-zA-Z_]*brand[a-zA-Z_]*)"\s*:/gi)].map(m => m[1]);
console.log('brand-like keys:', keys);
// also count how many times 智印港 / ZprintPro appear as VALUES in the block
console.log('brand-name string occurrences:', (b.match(/智印港/g) || []).length);
console.log('PROD_DUMP_DONE');
