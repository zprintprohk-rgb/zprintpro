// Where does each ld+json mention live? + flight-copy census (post JsonLd server-component fix)
const html = await (await fetch(`https://zprintpro.com/zh-hk/product/handle-bags/?cb=${Date.now()}`)).text();
console.log('len', html.length);

let i = -1; const spots = [];
while ((i = html.indexOf('application/ld+json', i + 1)) !== -1) {
  spots.push(html.slice(Math.max(0, i - 70), i + 25).replace(/\n/g, ' '));
}
console.log('ld+json occurrences:', spots.length);
spots.forEach((s, k) => console.log(`  ${k}:`, s.slice(0, 105)));

const plain = html.split('"@type":"Product"').length - 1;
const esc = html.split('\\"@type\\":\\"Product\\"').length - 1;
console.log('plain "Product" occurrences:', plain, '| escaped-in-flight:', esc);
console.log('self.__next_f chunks:', (html.match(/self\.__next_f/g) || []).length);
console.log('ProcureAction:', html.split('ProcureAction').length - 1);
console.log('#product:', html.split('#product').length - 1);
