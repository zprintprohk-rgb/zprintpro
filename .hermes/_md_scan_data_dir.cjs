// .hermes/_md_scan_data_dir.cjs — 全量 src/data markdown 残留（排除 // 注释行）
const fs = require('fs');
const path = require('path');
const dir = 'src/data';
const files = fs.readdirSync(dir).filter(f => /\.(ts|tsx|json)$/.test(f));
const out = [];
for (const f of files) {
  const p = path.join(dir, f);
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split('\n');
  let links = 0, bold = 0;
  const samples = [];
  lines.forEach((ln, i) => {
    const trimmed = ln.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return;
    const L = (ln.match(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g) || []).length;
    const B = (ln.match(/\*\*[^*\n<]{2,80}\*\*/g) || []).length;
    if (L || B) {
      links += L; bold += B;
      if (samples.length < 2) samples.push(ln.trim().slice(0, 90));
    }
  });
  if (links || bold) out.push({ f, links, bold, samples });
}
out.sort((a, b) => (b.links + b.bold) - (a.links + a.bold));
out.forEach(o => console.log(`${o.f}: links=${o.links} bold=${o.bold} | ${o.samples[0] || ''}`));
console.log('files with residue:', out.length, '/', files.length);
