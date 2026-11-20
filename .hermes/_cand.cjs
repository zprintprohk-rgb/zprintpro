const fs = require('fs');
const { equiv, band } = require('../scripts/guards/title-equiv.js');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
const starts = [...t.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: t.length });
const map = {};
for (let i = 0; i < starts.length - 1; i++) map[starts[i].slug] = t.slice(starts[i].idx, starts[i + 1].idx);
for (const s of ['electronics-packaging-box']) {
  const b = map[s] || '';
  const g = (re) => { const m = b.match(re); return m ? m[1] : null; };
  console.log(`${s}: minQ=${g(/\bminQuantity:\s*(\d+)/)} basePrice_en=${g(/\bbasePrice_en:\s*([\d.]+)/)} bp=${g(/\bbasePrice:\s*([\d.]+)/)} name_en=${g(/nameEn:\s*'([^']*)'/)}`);
}
const candidates = [
  'Electronics Packaging Box | 200 MOQ | ZprintPro',
  'Electronics Packaging Box | From $1.84 | ZprintPro',
  'Electronics Packaging Box | 200 MOQ From $1.84 | ZprintPro',
  '屋外バナー印刷｜PVC 耐候｜1個〜 ¥360〜｜ZprintPro',
  '屋外バナー｜イベント用 PVC 耐候｜1個〜 ¥360〜｜ZprintPro',
  '屋外バナー｜防炎 PVC 耐候｜1個〜 ¥360〜｜ZprintPro',
  '屋外バナー印刷 | PVC 耐候 | 1個〜 ¥360〜 | ZprintPro',
];
for (const c of candidates) console.log(`  e=${equiv(c)} band=${band(c)} :: ${c}`);
