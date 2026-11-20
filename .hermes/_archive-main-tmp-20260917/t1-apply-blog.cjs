// T1 集成: blog-data JSON content 替换 (子代理产出后填入)
// 用法: node .hermes/t1-apply-blog.cjs <slug>
// 子代理输出 content 字符串 → 填入 NEW_CONTENT_ZH / NEW_CONTENT_EN / NEW_CONTENT_JA
const fs = require('fs');

const slug = process.argv[2];
if (!slug) { console.error('用法: node t1-apply-blog.cjs <slug>'); process.exit(1); }

// ========== 子代理产出粘贴区 (运行前填入) ==========
const NEW_CONTENT_ZH = null; // zh-hk content HTML 字符串
const NEW_CONTENT_EN = null;
const NEW_CONTENT_JA = null;
// ==================================================

const contents = { 'zh-hk': NEW_CONTENT_ZH, en: NEW_CONTENT_EN, ja: NEW_CONTENT_JA };
const missing = Object.entries(contents).filter(([,v]) => !v).map(([k]) => k);
if (missing.length) { console.error(`缺少语言内容: ${missing.join(', ')}`); process.exit(1); }

for (const loc of Object.keys(contents)) {
  const file = `src/data/blog-data/${loc}.json`;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!d[slug]) { console.error(`[${loc}] slug 不存在: ${slug}`); continue; }
  // 备份
  const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19).replace(/[T-]/g,'');
  const backup = `.hermes/backup-t1-${slug}-${ts}`;
  fs.mkdirSync(backup, { recursive: true });
  fs.copyFileSync(file, `${backup}/${loc}.json`);
  // 替换
  const oldLen = d[slug].content.length;
  d[slug].content = contents[loc];
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  console.log(`[${loc}] ${slug} content 替换 (${oldLen}B → ${contents[loc].length}B)`);
}
console.log('\n备份目录: .hermes/backup-t1-<slug>-<ts>/');
