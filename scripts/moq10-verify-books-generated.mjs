// moq10-verify-books-generated.mjs — 驗證 books 階梯在生成後仍 ≤ anchor
import fs from 'fs';
const gen = fs.readFileSync('src/lib/price-data.generated.ts', 'utf-8');
const readBlock = (src, key) => {
  const k = src.indexOf(key);
  if (k < 0) return null;
  let i = src.indexOf('{', k), d = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '{') d++;
    else if (src[j] === '}') { d--; if (d === 0) return src.slice(i, j + 1); }
  }
  return null;
};
let bad = 0;
for (const slug of ['saddle-stitch-booklets', 'perfect-bound-books', 'exercise-books', 'a1-posters']) {
  const b = readBlock(gen, `'${slug}': {`);
  if (!b) { console.log(`${slug}: NOT FOUND`); bad++; continue; }
  /*
   * ⚠ 必須逐 config 檢查: a1-posters 有 2 個 config (Yupo / 相紙),
   *   直接把整個 block 的 tiers 串起來會出現「同一 qty 兩個價」的假性回升 (實測踩過)。
   */
  const cfg = readBlock(b, '"configs"');
  const scopes = [];
  if (cfg) {
    // 逐個 config 物件切出
    let depth = 0, start = -1;
    for (let i = 0; i < cfg.length; i++) {
      if (cfg[i] === '{') { if (depth === 0) start = i; depth++; }
      else if (cfg[i] === '}') { depth--; if (depth === 1 && start >= 0) { scopes.push(cfg.slice(start, i + 1)); start = -1; } }
    }
  }
  if (!scopes.length) scopes.push(b);
  let printed = 0;
  scopes.forEach((sc, si) => {
    const t = [...sc.matchAll(/"qty": (\d+),\s*\n\s*"priceHKD": (\d+)/g)].map((x) => ({ q: +x[1], p: +x[2] }));
    if (!t.length) return;
    if (printed++ < 2) console.log(`  ${slug}[cfg${si}]: ` + t.slice(0, 8).map((x) => `${x.q}→${x.p}`).join('  '));
    const sorted = [...t].sort((a, z) => a.q - z.q);
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i].p / sorted[i].q > sorted[i - 1].p / sorted[i - 1].q * 1.02) {
        console.log(`     ✗ cfg${si} 單張價回升 ${sorted[i - 1].q}→${sorted[i].q}: ${(sorted[i - 1].p / sorted[i - 1].q).toFixed(2)} → ${(sorted[i].p / sorted[i].q).toFixed(2)}`);
        bad++;
      }
    }
    const t99 = sorted.find((x) => x.q === 99);
    const anchor = sorted.filter((x) => x.q > 99).sort((a, z) => a.q - z.q)[0];
    if (anchor && t99 && t99.p > anchor.p) { console.log(`     ✗ cfg${si} 99檔 ${t99.p} > anchor ${anchor.q}檔 ${anchor.p}`); bad++; }
  });
}
console.log(bad === 0 ? '\n✓ books/A1 階梯不變量全過' : `\n✗ ${bad} 個問題`);
process.exit(bad ? 1 : 0);
