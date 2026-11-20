// T1 packaging-buying-guide 集成 — 从 tmp-pbg-{loc}.txt → buying-guides.ts
const fs = require('fs');

const slug = 'packaging-buying-guide';
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backupDir = `.hermes/backup-t1-pbg-${ts}`;
fs.mkdirSync(backupDir, { recursive: true });

const file = 'src/data/buying-guides.ts';
const txt = fs.readFileSync(file, 'utf8');
fs.copyFileSync(file, `${backupDir}/buying-guides.ts`);

const i = txt.indexOf(`slug: '${slug}'`);
if (i < 0) { console.error('slug 不存在'); process.exit(1); }
const cStart = txt.indexOf('content: {', i);
const cEnd = txt.indexOf('\n  },', cStart);
if (cStart < 0 || cEnd < 0) { console.error('content 边界未找到'); process.exit(1); }
const oldBlock = txt.slice(cStart, cEnd + 6);

// 新 block: 三语 content (quoted keys 兼容)
const newBlock = `content: {
  'zh-hk': \`${fs.readFileSync('.hermes/tmp-pbg-zh-hk.txt','utf8').replace(/`/g,'\\`').replace(/\$\{/g,'\\${')}\`,
  en: \`${fs.readFileSync('.hermes/tmp-pbg-en.txt','utf8').replace(/`/g,'\\`').replace(/\$\{/g,'\\${')}\`,
  ja: \`${fs.readFileSync('.hermes/tmp-pbg-ja.txt','utf8').replace(/`/g,'\\`').replace(/\$\{/g,'\\${')}\`,
  }`;

const newTxt = txt.slice(0, cStart) + newBlock + txt.slice(cEnd + 6);
fs.writeFileSync(file, newTxt, 'utf8');
console.log(`✅ ${slug}: ${oldBlock.length}B → ${newBlock.length}B 备份: ${backupDir}`);
