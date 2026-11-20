// Authoritative minQuantity check via PDP schema eligibleQuantity
const slugs = ['mailer-boxes', 'business-envelopes', 'red-packets'];
for (const s of slugs) {
  const h = await (await fetch(`https://zprintpro.com/zh-hk/product/${s}/`)).text();
  const m = h.match(/"eligibleQuantity"\s*:\s*{[^}]*"minValue"\s*:\s*(\d+)/);
  const price = h.match(/"price"\s*:\s*"([\d.]+)"/);
  console.log(`${s}: minQ=${m ? m[1] : '?'} price=${price ? price[1] : '?'}`);
}
console.log('MINQ_CHECK_DONE');
