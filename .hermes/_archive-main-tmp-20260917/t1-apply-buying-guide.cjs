// T1 集成: buying-guides.ts content 块替换 (子代理产出后填入)
// 用法: 把子代理输出的 content 对象填入 NEW_CONTENT, 运行 node .hermes/t1-apply-buying-guide.cjs <slug>
const fs = require('fs');

const slug = process.argv[2];
if (!slug) { console.error('用法: node t1-apply-buying-guide.cjs <slug>'); process.exit(1); }

// ========== 子代理产出粘贴区 (运行前填入) ==========
// 格式: content: { 'zh-hk': `...`, en: `...`, ja: `...` },
const NEW_CONTENT = null; // 例: `content: { 'zh-hk': \`...\`, en: \`...\`, ja: \`...\` },`
// ==================================================

if (!NEW_CONTENT) { console.error('请先填入 NEW_CONTENT'); process.exit(1); }

const file = 'src/data/buying-guides.ts';
let txt = fs.readFileSync(file, 'utf8');

// 定位 slug 对象
const slugIdx = txt.indexOf(`slug: '${slug}'`);
if (slugIdx < 0) { console.error(`找不到 slug: ${slug}`); process.exit(1); }

// 找 content: { 起始
const cStart = txt.indexOf('content: {', slugIdx);
if (cStart < 0) { console.error(`找不到 content: {`); process.exit(1); }

// 找 content 块结束: 下一个 "\n  },\n  }," (对象+数组闭合) 或下一个 slug 注释
// content 块 = content: { ... }, 到对象的结束 "},"
// 简单法: 找 content: { 后的第一个 "\n  }," (对象闭合)
const cEnd = txt.indexOf('\n  },', cStart);
if (cEnd < 0) { console.error('找不到 content 块结束'); process.exit(1); }

// 备份
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
const backup = `.hermes/backup-t1-${slug}-${ts}`;
fs.mkdirSync(backup, { recursive: true });
fs.copyFileSync(file, `${backup}/buying-guides.ts`);
console.log(`备份: ${backup}`);

// 替换 (保留 content: { 前缀, 替换其后的三语言内容到 "}," 前)
const oldBlock = txt.slice(cStart, cEnd + 5); // 含 "content: { ... },"
// NEW_CONTENT 应包含 "content: {" 到 "}," — 若只给三语言, 包装一下
let newBlock = NEW_CONTENT.trim();
if (!newBlock.startsWith('content:')) newBlock = `content: ${newBlock}`;
if (!newBlock.endsWith('},')) newBlock = newBlock.replace(/}\s*$/, '},');

const newTxt = txt.slice(0, cStart) + newBlock + txt.slice(cEnd + 5);
fs.writeFileSync(file, newTxt, 'utf8');
console.log(`✅ ${slug} content 已替换 (${oldBlock.length}B → ${newBlock.length}B)`);

// 验证: 提取新 content 块检查三语言
const vTxt = fs.readFileSync(file, 'utf8');
const vIdx = vTxt.indexOf(`slug: '${slug}'`);
const vCStart = vTxt.indexOf('content: {', vIdx);
const vBlock = vTxt.slice(vCStart, vCStart + 4000);
for (const loc of ['zh-hk','en','ja']) {
  const has = vBlock.includes(`'${loc}': \``);
  console.log(`  ${loc}: ${has ? '✅' : '❌'}`);
}
