// 把 D14 (textbook-printing-guide) 从 redesign 主 worktree 合并到 main worktree
// 只复制 textbook-printing-guide key, 其他 key 保持 main 版本
const fs = require('fs');

for (const loc of ['zh-hk', 'en', 'ja']) {
  const srcPath = `F:/zprintpro-nextjs/src/data/blog-data/${loc}.json`;
  const dstPath = `src/data/blog-data/${loc}.json`;

  const src = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
  const dst = JSON.parse(fs.readFileSync(dstPath, 'utf8'));

  if (!src['textbook-printing-guide']) {
    console.log(`⚠️ ${loc}: 主 worktree 无 D14, 跳过`);
    continue;
  }
  if (dst['textbook-printing-guide']) {
    console.log(`⚠️ ${loc}: main 已有 D14, 跳过 (幂等)`);
    continue;
  }

  dst['textbook-printing-guide'] = src['textbook-printing-guide'];
  fs.writeFileSync(dstPath, JSON.stringify(dst, null, 2) + '\n', 'utf8');

  const v = JSON.parse(fs.readFileSync(dstPath, 'utf8'));
  const p = v['textbook-printing-guide'];
  console.log(`✅ ${loc}: D14 合并 (content ${p.content.length}字, 总 ${Object.keys(v).length} 篇, BOM ${fs.readFileSync(dstPath)[0]===0xEF})`);
}
