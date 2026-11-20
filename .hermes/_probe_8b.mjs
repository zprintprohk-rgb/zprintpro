// Post-push probe: feed IDs locale-prefixed + envelope ja clean + PDP brand single
let pass = 0, total = 0;
function chk(n, c) { total++; if (c) pass++; console.log(`${n}: ${c ? 'PASS' : 'FAIL'}`); }

const zh = await (await fetch('https://zprintpro.com/api/merchant-feed/zh-hk/')).text();
const en = await (await fetch('https://zprintpro.com/api/merchant-feed/en/')).text();
chk('FEED_ZH_PREFIX', zh.includes('<g:id>zh-hk-BC-001<'));
chk('FEED_EN_PREFIX', en.includes('<g:id>en-BC-001<'));
const zids = [...zh.matchAll(/<g:id>([^<]+)<\/g:id>/g)].map(m => m[1]);
chk('FEED_ZH_ALL_PREFIXED', zids.length > 0 && zids.every(i => i.startsWith('zh-hk-')));

const ja = await (await fetch('https://zprintpro.com/ja/category/envelopes/')).text();
chk('JA_ENV_100mai', ja.includes('100枚から'));
chk('JA_ENV_500mai_gone', !ja.includes('500枚から'));

const pdp = await (await fetch('https://zprintpro.com/zh-hk/product/custom-red-packets/')).text();
const blocks = [...pdp.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const prod = blocks.filter(b => b.includes('"Product"'));
const brandCount = prod.reduce((a, b) => a + (b.match(/"brand"\s*:/g) || []).length, 0);
chk('PDP_SINGLE_BRAND', prod.length === 1 && brandCount === 1);

console.log(`RESULT ${pass}/${total}`);
console.log('PUSH8B_PROBE_DONE');
