const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const anchors = [...prod.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
anchors.push({ slug: '__END__', idx: prod.length });
for (const want of ['a4-flyers','eco-flyers','drink-menus','drink-tokens']) {
  for (let i = 0; i < anchors.length - 1; i++) {
    if (anchors[i].slug !== want) continue;
    const b = prod.slice(anchors[i].idx, anchors[i + 1].idx);
    console.log(`\n=== ${want} ===`);
    // show lines containing 圓角/圆角/異形/刀模/覆膜 within the block
    const lines = b.split('\n');
    lines.forEach((ln, idx) => {
      if (/圓角|圆角|異形|刀模|覆膜|finishing/i.test(ln)) console.log(`  ${idx}: ${ln.trim().slice(0, 110)}`);
    });
    break;
  }
}
