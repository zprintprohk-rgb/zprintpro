// .hermes/_anchors_raw.cjs — 6 锚点 raw 上下文
const fs = require('fs');
const probes = {
  'zh-hk.json': ['包裝上加綠色標識', '→ PVC 防水', 'PVC 防水;ESG', 'PVC 防水；ESG', '外賣速食 →'],
  'en.json': ['Add green identifiers', 'takeaway/cafe', 'US$2-6.5/sheet'],
  'ja.json': ['水性ラミネートのセット提供可能', 'テイクアウト・カフェ', '¥250-800/枚'],
};
for (const [f, keys] of Object.entries(probes)) {
  const t = fs.readFileSync(`src/data/blog-data/${f}`, 'utf8');
  for (const k of keys) {
    let i = t.indexOf(k), n = 0;
    while (i >= 0 && n < 2) {
      console.log(`[${f}] "${k}" @${i}:`, JSON.stringify(t.slice(Math.max(0, i - 45), i + 55)));
      i = t.indexOf(k, i + 1); n++;
    }
    if (i < 0 && n === 0) console.log(`[${f}] "${k}" NOT FOUND`);
  }
}
