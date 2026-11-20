// T1 saddle-stitch-booklet-printing-guide 集成 — 从 tmp-saddle-{loc}.txt → blog-data JSON ×3
const fs = require('fs');

const slug = 'saddle-stitch-booklet-printing-guide';
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backupDir = `.hermes/backup-t1-saddle-${ts}`;
fs.mkdirSync(backupDir, { recursive: true });

for (const loc of ['zh-hk', 'en', 'ja']) {
  const file = `src/data/blog-data/${loc}.json`;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!d[slug]) { console.error(`[${loc}] 缺 ${slug}`); process.exit(1); }
  fs.copyFileSync(file, `${backupDir}/${loc}.json`);
  const tmpFile = `.hermes/tmp-saddle-${loc}.txt`;
  const newContent = fs.readFileSync(tmpFile, 'utf8');
  const oldLen = d[slug].content.length;
  d[slug].content = newContent;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  console.log(`[${loc}] ✅ content (${oldLen}B → ${newContent.length}B)`);
}
console.log(`备份: ${backupDir}`);
