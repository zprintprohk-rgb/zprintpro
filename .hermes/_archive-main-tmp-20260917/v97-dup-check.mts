import fs from 'fs';

const log = fs.readFileSync('.hermes/logs/2026-09-12-blog-m3-selection-v5.md', 'utf8').split('\n');
const rows = log.filter((l) => l.startsWith('OK ')).map((l) => {
  const m = l.match(/^OK \[([^\]]+)\].*<- ([^ ]+) \[/);
  return m ? { slug: m[1], path: m[2] } : null;
}).filter(Boolean);
console.log('分配条数:', rows.length);

const byName = {};
for (const r of rows) {
  const name = r.path.split('/').slice(-1)[0];
  (byName[name] = byName[name] || []).push(r.slug);
}
const dups = Object.entries(byName).filter(([, v]) => v.length > 1);
console.log('同名文件被多篇引用:', dups.length);
for (const [name, slugs] of dups) console.log(`  ${name} → ${slugs.join(', ')}`);

// 落地文件字节级去重 (真·重复图)
const dir = 'public/images/blog-m3';
const crypto = await import('crypto');
const hashes = {};
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.webp'))) {
  const h = crypto.createHash('md5').update(fs.readFileSync(`${dir}/${f}`)).digest('hex');
  (hashes[h] = hashes[h] || []).push(f);
}
const same = Object.entries(hashes).filter(([, v]) => v.length > 1);
console.log('\n落地文件字节级重复组:', same.length);
for (const [, v] of same) console.log('  ' + v.join(' = '));
