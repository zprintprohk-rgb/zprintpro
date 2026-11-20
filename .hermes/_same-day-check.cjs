const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const i = t.indexOf("'same-day-flyers'");
const seg = t.slice(i, i + 2500);
// finishing 数组
const fin = seg.match(/finishing:\s*\[([^\]]*)\]/);
console.log('finishing:', fin ? fin[1].trim().slice(0, 250) : '(not found)');
// features 数组
const feats = seg.match(/features:\s*\[([^\]]*)\]/);
console.log('features:', feats ? feats[1].trim().slice(0, 250) : '(not found)');
// 覆膜相关
console.log('含覆膜/啞膜/光膜:', /覆膜|啞膜|光膜/.test(seg));
console.log('含圓角:', /圓角/.test(seg));
