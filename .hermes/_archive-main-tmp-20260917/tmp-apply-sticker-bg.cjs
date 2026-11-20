// T1 sticker-buying-guide 集成 — 子代理 9f563f49 产出 (从 redesign 提取, 修正 ja 品牌后写入 main-tmp)
const fs = require('fs');

// 1. 读取从 redesign 提取的 content 块
const block = fs.readFileSync('.hermes/tmp-sticker-block.txt', 'utf8');

// 2. ja 品牌修正: 智印港 → ZprintPro (ja=ZprintPro 品牌规则)
const jaMatch = block.match(/'ja': `([\s\S]*?)`,/);
if (!jaMatch) { console.error('❌ 提取块无 ja'); process.exit(1); }
const jaFixed = jaMatch[1].replace(/智印港/g, 'ZprintPro');
const jaNew = `'ja': \`${jaFixed}\`,`;

// 3. 组装新 content 块 (zh-hk + en 原样 + ja 修正)
const zhMatch = block.match(/'zh-hk': `([\s\S]*?)`,/);
const enMatch = block.match(/'en': `([\s\S]*?)`,/);
if (!zhMatch || !enMatch) { console.error('❌ 提取块缺 zh/en'); process.exit(1); }
const newBlock = `content: { 'zh-hk': \`${zhMatch[1]}\`, en: \`${enMatch[1]}\`, ${jaNew} },`;

// 4. 备份 main-tmp
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backupDir = `.hermes/backup-t1-sticker-bg-${ts}`;
fs.mkdirSync(backupDir, { recursive: true });
fs.copyFileSync('src/data/buying-guides.ts', `${backupDir}/buying-guides.ts`);
console.log(`备份: ${backupDir}`);

// 5. 替换 main-tmp sticker-buying-guide content
const file = 'src/data/buying-guides.ts';
let txt = fs.readFileSync(file, 'utf8');
const i = txt.indexOf(`slug: 'sticker-buying-guide'`);
const cStart = txt.indexOf('content: {', i);
const cEnd = txt.indexOf('\n  },', cStart);
const oldBlock = txt.slice(cStart, cEnd + 5);
const newTxt = txt.slice(0, cStart) + newBlock + txt.slice(cEnd + 5);
fs.writeFileSync(file, newTxt, 'utf8');
console.log(`✅ sticker-buying-guide content 替换 (${oldBlock.length}B → ${newBlock.length}B)`);

// 6. 验证
const vTxt = fs.readFileSync(file, 'utf8');
const vI = vTxt.indexOf(`slug: 'sticker-buying-guide'`);
const vC = vTxt.indexOf('content: {', vI);
const vBlock = vTxt.slice(vC, vC + 25000);
console.log('--- 验证 ---');
for (const loc of ['zh-hk','en','ja']) console.log(`  ${loc}: ${vBlock.includes(`'${loc}': \``) ? '✅' : '❌'}`);
console.log('  ja 残留 智印港:', vBlock.match(/'ja': `[\s\S]*?智印港/) ? '❌' : '✅');
console.log('  ja 含 ZprintPro:', vBlock.match(/'ja': `[\s\S]*?ZprintPro/) ? '✅' : '❌');
