// T1 flyer-buying-guide 集成 — 从 nextjs tmp 文件 → 写入 main-tmp
const fs = require('fs');

// 1. 读取 tmp 文件 (L10 起是 content 块, 到 L121 },)
const lines = fs.readFileSync('F:/zprintpro-nextjs/.hermes/tmp/t1-flyer-buying-guide-content.txt', 'utf8').split('\n');
// 找到 'zh-hk': ` 开始
let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(`'zh-hk': \``)) { start = i; break; }
}
if (start < 0) { console.error('❌ 找不到 zh-hk 起点'); process.exit(1); }
// 找到 }, 结束 (最后一个 }
let end = lines.length - 1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '},') { end = i; break; }
}
const block = lines.slice(start, end + 1).join('\n');
console.log('提取 flyer-buying-guide content 块:', block.length, 'B, 行数', end - start + 1);

// 2. 验证三语言 + 品牌
for (const loc of ['zh-hk', 'en', 'ja']) {
  console.log(`  ${loc}: ${block.includes(`'${loc}': \``) ? '✅' : '❌'}`);
}
if (block.includes('智印印港')) { console.error('❌ 错字'); process.exit(1); }
const jaMatch = block.match(/'ja': `([\s\S]*?)`,/);
console.log('  ja 智印港:', jaMatch ? (jaMatch[1].match(/智印港/g)||[]).length : '?', '| ZprintPro:', jaMatch ? (jaMatch[1].match(/ZprintPro/g)||[]).length : '?');

// 3. 备份 + 替换 main-tmp
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backupDir = `.hermes/backup-t1-flyerbg-${ts}`;
fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync('src/data/buying-guides.ts', `${backupDir}/buying-guides.ts`);
console.log(`备份: ${backupDir}`);

const file = 'src/data/buying-guides.ts';
let txt = fs.readFileSync(file, 'utf8');
const i = txt.indexOf(`slug: 'flyer-buying-guide'`);
const cStart = txt.indexOf('content: {', i);
const cEnd = txt.indexOf('\n  },', cStart);
const oldBlock = txt.slice(cStart, cEnd + 5);
const newTxt = txt.slice(0, cStart) + `content: {\n${block}\n` + txt.slice(cEnd + 5);
fs.writeFileSync(file, newTxt, 'utf8');
console.log(`✅ flyer-buying-guide content 替换 (${oldBlock.length}B → ${block.length}B)`);

// 4. 验证
const vTxt = fs.readFileSync(file, 'utf8');
const vI = vTxt.indexOf(`slug: 'flyer-buying-guide'`);
const vC = vTxt.indexOf('content: {', vI);
const vBlock = vTxt.slice(vC, vC + 40000);
for (const loc of ['zh-hk','en','ja']) console.log(`  [验证] ${loc}: ${vBlock.includes(`'${loc}': \``) ? '✅' : '❌'}`);
