const d = require('./src/data/blog-data/zh-hk.json');
const c = d['restaurant-menu-printing-guide'].content;
// Find section markers
const sections = [];
const re = /<h[23][^>]*>(.*?)<\/h[23]>/g;
let m;
while ((m = re.exec(c)) !== null) {
  sections.push({pos: m.index, level: m[0].startsWith('<h2') ? 'h2' : 'h3', text: m[1]});
}
sections.forEach(s => console.log(`@${s.pos} ${s.level}: ${s.text}`));
console.log('---END-MARKERS---');
const last3 = c.length - 500;
console.log(c.substring(last3));
