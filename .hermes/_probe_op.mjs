// .hermes/_probe_op.mjs — outdoor-posters 内容探针 (浏览器 UA, 绕 CF UA 差分)
const r = await fetch('https://zprintpro.com/zh-hk/product/outdoor-posters/', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
const b = await r.text();
const checks = {
  status: r.status,
  blocked: b.includes('Attention Required'),
  '1 張起': b.includes('1 張起'),
  '10 張起': b.includes('10 張起'),
  'HK$16': b.includes('HK$16'),
  '3-5': b.includes('3-5'),
  '滿 HK$500': b.includes('滿 HK$500'),
};
console.log(JSON.stringify(checks));
// 另探 food-boxes 首页直答段在线
const r2 = await fetch('https://zprintpro.com/zh-hk/product/food-boxes/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
const b2 = await r2.text();
console.log(JSON.stringify({ food_status: r2.status, 'HK$2.5': b2.includes('HK$2.5'), '100 個起': b2.includes('100 個起') }));
