#!/usr/bin/env node
// 2026-08-24 F1-batch-6 扩展: 找所有 Markdown 残留 (bold/italic/heading/blockquote)
// 渲染层用 {string} 直接渲染时, 残留会原样显示给用户
const fs = require('fs');
const path = require('path');

const ROOT = 'F:\\zprintpro-nextjs';
const SCAN_DIRS = ['src/app', 'src/components', 'src/data', 'src/lib', 'src/utils', 'messages'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md']);

// 模式: 检测字符串字面量中可能的 Markdown 残留
// 1. **bold** (中文文本中常见, 误用)
// 2. *italic* (单星号)
// 3. `code` (反引号)
// 4. # heading (行首)
// 5. > blockquote (行首)
const PATTERNS = [
  { name: '**bold**', re: /\*\*[^*\n]{1,80}\*\*/g, exclude: false },
  { name: '*italic*', re: /(?<![*\\])\*[^*\n]{1,80}\*(?![*])/g, exclude: false },
  { name: '`code`', re: /`[^`\n]{1,80}`/g, exclude: false },
  { name: '# heading', re: /^#{1,6}\s+\S/gm, exclude: false },
  { name: '> blockquote', re: /^>\s+\S/gm, exclude: false },
];

let totalFiles = 0;
const findings = {};

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === '.next' || item.name.startsWith('.')) continue;
      walk(full);
    } else if (item.isFile()) {
      const ext = path.extname(item.name);
      if (!SCAN_EXT.has(ext)) continue;
      if (item.name === 'parseInlineLinks.tsx') continue;
      totalFiles++;
      const content = fs.readFileSync(full, 'utf-8');
      // 仅看字符串字面量内容 (在双引号/单引号/反引号之间)
      // 简单做法: 找形如 "..." '...' `...` 内的 Markdown
      const stringRe = /(['"`])((?:\\.|(?!\1).)*?)\1/g;
      let m;
      while ((m = stringRe.exec(content)) !== null) {
        const str = m[2];
        for (const p of PATTERNS) {
          const r = new RegExp(p.re.source, p.re.flags);
          let mm;
          while ((mm = r.exec(str)) !== null) {
            const key = p.name;
            if (!findings[key]) findings[key] = [];
            findings[key].push({
              file: full.replace(ROOT, '').replace(/\\/g, '/'),
              sample: str.slice(Math.max(0, mm.index - 20), Math.min(str.length, mm.index + mm[0].length + 20)).replace(/\n/g, '\\n'),
            });
          }
        }
      }
    }
  }
}

for (const d of SCAN_DIRS) {
  const full = path.join(ROOT, d);
  if (fs.existsSync(full)) walk(full);
}

console.log('=== F1-batch-6 Markdown 残留扫描 (扩展) ===');
console.log(`扫描文件: ${totalFiles}`);
console.log('');
for (const [k, arr] of Object.entries(findings)) {
  console.log(`=== ${k}: ${arr.length} 命中 ===`);
  // 聚合同一文件
  const byFile = {};
  for (const f of arr) {
    if (!byFile[f.file]) byFile[f.file] = [];
    byFile[f.file].push(f.sample);
  }
  const sorted = Object.entries(byFile).sort((a, b) => b[1].length - a[1].length);
  for (const [file, samples] of sorted.slice(0, 20)) {
    console.log(`  ${samples.length}  ${file}`);
    for (const s of samples.slice(0, 2)) console.log(`     ${s}`);
  }
  if (sorted.length > 20) console.log(`  ... +${sorted.length - 20} more files`);
  console.log('');
}
