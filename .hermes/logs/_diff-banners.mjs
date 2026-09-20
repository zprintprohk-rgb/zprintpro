// .hermes/logs/_diff-banners.mjs — 對比 banners 場景（SharpHooks vs Industries）
import fs from 'node:fs';

function seg(file, cat) {
  const s = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`\\n  '?${cat}'?:\\s*\\[([\\s\\S]*?)\\n  \\],`);
  const m = s.match(re);
  return m ? m[1] : null;
}

for (const [label, file] of [
  ['CategoryIndustries (權威候選)', 'src/components/category/CategoryIndustries.tsx'],
  ['CategorySharpHooks (待對齊)', 'src/components/category/CategorySharpHooks.tsx'],
]) {
  const b = seg(file, 'banners');
  console.log(`\n══════ ${label} ══════`);
  if (!b) {
    console.log('  (無 banners)');
    continue;
  }
  // 逐項印 key + zh-hk 文案
  const items = b.split(/\{\s*key:/).filter((x) => x.includes("'zh-hk'"));
  for (const it of items) {
    const k = (it.match(/^\s*'([^']+)'/) || [])[1];
    const zh = (it.match(/'zh-hk':\s*\[([^\]]*)\]/) || [])[1];
    const p = (it.match(/priority:\s*(\d+)/) || [])[1];
    const t = (it.match(/tier:\s*'([^']+)'/) || [])[1];
    console.log(`  key=${k}  priority=${p ?? '-'}  tier=${t ?? '-'}`);
    console.log(`     ${(zh || '').replace(/\s+/g, ' ').slice(0, 120)}`);
  }
}
