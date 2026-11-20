const fs = require('fs');
const t = fs.readFileSync('F:/zprintpro-nextjs/src/data/products-content.ts', 'utf8');
const lines = t.split(/\r?\n/);
const FLYERS = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers'];
let cur = '?';
const enV = new Map(); const jaV = new Map();
const enInFlyer = new Map(); const jaInFlyer = new Map();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^  '([a-z0-9-]+)': \{/);
  if (m) cur = m[1];
  const s = lines[i];
  if (/What materials and finishes do/.test(s)) {
    const key = s.includes('rounded corners') ? 'HAS-ROUNDED' : 'other';
    const full = s.replace(/^<details[^>]*><summary><strong>([^<]*)<\/strong><\/summary>/, '[S]');
    const map = FLYERS.includes(cur) ? enInFlyer : enV;
    map.set(cur + ':' + key, (map.get(cur + ':' + key) || 0) + 1);
    // full-line hash to detect variants
    if (FLYERS.includes(cur)) enInFlyer.set('hash:' + require('crypto').createHash('sha1').update(s).digest('hex').slice(0, 8), (enInFlyer.get('hash:' + require('crypto').createHash('sha1').update(s).digest('hex').slice(0, 8)) || 0) + 1);
  }
  if (/対応素材と加工は/.test(s)) {
    const full = s;
    const map = FLYERS.includes(cur) ? jaInFlyer : jaV;
    const h = require('crypto').createHash('sha1').update(s).digest('hex').slice(0, 8);
    map.set('hash:' + h, (map.get('hash:' + h) || 0) + 1);
  }
}
console.log('=== en FAQ: 非 flyer 产品出现数:', enV.size ? [...enV.entries()].map(([k, v]) => k + '×' + v).join(' ') : '0');
console.log('=== en FAQ: flyer 条目 (按 hash) ===');
for (const [k, v] of enInFlyer) console.log(' ', k, '×' + v);
console.log('=== ja FAQ: 非 flyer 产品出现数:', jaV.size ? [...jaV.entries()].map(([k, v]) => k + '×' + v).join(' ') : '0');
console.log('=== ja FAQ: flyer 条目 (按 hash) ===');
for (const [k, v] of jaInFlyer) console.log(' ', k, '×' + v);
