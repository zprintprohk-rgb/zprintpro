// T1 集成: packaging-box-custom + same-day-flyers (从 redesign 提取的 tmp 文件写入 main-tmp)
const fs = require('fs');

const jobs = [
  { slug: 'packaging-box-custom-guide', prefix: 'pbc' },
  { slug: 'same-day-flyers-printing-hong-kong-guide', prefix: 'sdf' },
];

for (const job of jobs) {
  console.log(`\n=== ${job.slug} ===`);
  const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
  const backupDir = `.hermes/backup-t1-${job.prefix}-${ts}`;
  fs.mkdirSync(backupDir, { recursive: true });
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const file = `src/data/blog-data/${loc}.json`;
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!d[job.slug]) { console.error(`[${loc}] 缺 ${job.slug}`); process.exit(1); }
    // 备份
    fs.copyFileSync(file, `${backupDir}/${loc}.json`);
    // 读取子代理产出
    const tmpFile = `.hermes/tmp-${job.prefix}-${loc}.txt`;
    if (!fs.existsSync(tmpFile)) { console.error(`[${loc}] 缺 ${tmpFile}`); process.exit(1); }
    const newContent = fs.readFileSync(tmpFile, 'utf8');
    const oldLen = d[job.slug].content.length;
    d[job.slug].content = newContent;
    fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
    console.log(`[${loc}] ✅ content 替换 (${oldLen}B → ${newContent.length}B)`);
  }
  console.log(`备份: ${backupDir}`);
}
console.log('\n全部完成');
