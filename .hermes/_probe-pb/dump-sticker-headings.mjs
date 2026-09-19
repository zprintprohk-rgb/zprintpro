// 只读: dump sticker × 3 locale 的 H2/H3 分布 (为段锚改写划「可问句化 vs 分类式保留」边界)
import fs from 'fs';
const SLUG = 'sticker-material-pvc-vinyl-removable';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d[SLUG].content;
  const hs = [...c.matchAll(/<(h2|h3)[^>]*>([\s\S]*?)<\/\1>/gi)];
  const q = hs.filter(m => /[?？]/.test(m[2])).length;
  console.log(`\n===== ${loc} (H2/H3 共 ${hs.length}, 问句 ${q} = ${Math.round(q / hs.length * 100)}%) =====`);
  hs.forEach((m, i) => {
    const txt = m[2].replace(/<[^>]+>/g, '').trim();
    const isQ = /[?？]/.test(txt) ? 'Q' : '·';
    console.log(`${String(i + 1).padStart(2)}. [${m[1].toUpperCase()} ${isQ}] ${txt}`);
  });
}
