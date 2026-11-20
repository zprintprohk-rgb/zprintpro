// T1 book-buying-guide 集成 — 从 nextjs 提取 + ja 品牌修正 → 写入 main-tmp
const fs = require('fs');

// 1. 从 nextjs 提取 book-buying-guide content 块
const nxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/buying-guides.ts', 'utf8');
const i = nxt.indexOf(`slug: 'book-buying-guide'`);
const cStart = nxt.indexOf('content: {', i);
const cEnd = nxt.indexOf('\n  },', cStart);
const block = nxt.slice(cStart, cEnd + 5);
console.log('提取 book content 块:', block.length, 'B');

// 2. ja 品牌修正: 智印港 → ZprintPro
const jaMatch = block.match(/'ja': `([\s\S]*?)`,/);
if (!jaMatch) { console.error('❌ 无 ja'); process.exit(1); }
const jaFixed = jaMatch[1].replace(/智印港/g, 'ZprintPro');
const newBlock = block.replace(/'ja': `[\s\S]*?`,/, `'ja': \`${jaFixed}\`,`);

// 3. 备份 main-tmp
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backupDir = `.hermes/backup-t1-book-${ts}`;
fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync('src/data/buying-guides.ts', `${backupDir}/buying-guides.ts`);
console.log(`备份: ${backupDir}`);

// 4. 替换 main-tmp
const file = 'src/data/buying-guides.ts';
let txt = fs.readFileSync(file, 'utf8');
const bi = txt.indexOf(`slug: 'book-buying-guide'`);
const bStart = txt.indexOf('content: {', bi);
const bEnd = txt.indexOf('\n  },', bStart);
const oldBlock = txt.slice(bStart, bEnd + 5);
const newTxt = txt.slice(0, bStart) + newBlock + txt.slice(bEnd + 5);
fs.writeFileSync(file, newTxt, 'utf8');
console.log(`✅ book-buying-guide content 替换 (${oldBlock.length}B → ${newBlock.length}B)`);

// 5. 验证
const vTxt = fs.readFileSync(file, 'utf8');
const vI = vTxt.indexOf(`slug: 'book-buying-guide'`);
const vC = vTxt.indexOf('content: {', vI);
const vBlock = vTxt.slice(vC, vC + 30000);
const vJa = vBlock.match(/'ja': `([\s\S]*?)`,/);
console.log('--- 验证 ---');
for (const loc of ['zh-hk','en','ja']) console.log(`  ${loc}: ${vBlock.includes(`'${loc}': \``) ? '✅' : '❌'}`);
console.log('  ja 残留 智印港:', vJa ? (vJa[1].match(/智印港/g)||[]).length : '?');
console.log('  ja ZprintPro:', vJa ? (vJa[1].match(/ZprintPro/g)||[]).length : '?');
