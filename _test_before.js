const d = require('./src/data/blog-data/zh-hk.json');
const c = d['campus-education-printing-pillar-guide'].content;
const re = /<script\s+type=["']application\/ld\+json["']>\s*({[\s\S]*?})\s*<\/script>/g;
const blocks = [...c.matchAll(re)];
console.log('BEFORE blocks:', blocks.length);
blocks.forEach((b, i) => {
  try {
    const o = JSON.parse(b[1]);
    const t = Array.isArray(o['@type']) ? o['@type'].join(',') : o['@type'];
    console.log(' ', i+1, 'OK:', t);
  } catch(e) {
    console.log(' ', i+1, 'ERR:', e.message.substring(0,60));
  }
});
