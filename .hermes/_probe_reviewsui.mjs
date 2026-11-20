// Reviews UI container probe
const h = await (await fetch('https://zprintpro.com/zh-hk/product/kraft-paper-bags/')).text();
console.log('PDP_STATUS:', h.includes('牛皮紙袋') ? 200 : 'CHECK');
console.log('CONTAINER_1320_IN_HTML:', h.includes('max-w-[1320px]'));
console.log('REVIEWSUI_PROBE_DONE');
