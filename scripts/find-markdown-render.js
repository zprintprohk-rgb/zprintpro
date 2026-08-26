#!/usr/bin/env node
// 2026-08-24 F1-batch-6 grep 工具: 全站找 [text](url) Markdown 渲染风险
// K3 5.1 报告 + F1-batch-4 拍板 "任何 user-facing 文本含 [text](url) 必须 parseInlineLinks 解析"
// 2026-08-24 20:25 M3
const fs = require('fs');
const path = require('path');

const ROOT = 'F:\\zprintpro-nextjs';
const SCAN_DIRS = ['src/app', 'src/components', 'src/data', 'src/lib', 'src/utils', 'messages'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.md']);
const SKIP_FILES = new Set([
  'parseInlineLinks.tsx',  // 工具本身
  'parseInlineLinks.ts',
]);

// 模式 A: 数据源 — 含 [text](url) 的字符串 (json/md 文件优先)
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

let totalFiles = 0;
let markdownInSource = 0;
const findings = [];

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
      if (SKIP_FILES.has(item.name)) continue;
      totalFiles++;
      const content = fs.readFileSync(full, 'utf-8');
      // 找 [text](url) 模式 (排除 ![alt](url) 图片)
      const matches = [];
      let m;
      const re = new RegExp(MARKDOWN_LINK_RE.source, 'g');
      while ((m = re.exec(content)) !== null) {
        // 排除图片 ![alt](url) — 检查前一个字符
        const before = content[m.index - 1];
        if (before === '!') continue;
        // 排除代码块 — 简单启发式: 行首 4 空格或制表符
        const lineStart = content.lastIndexOf('\n', m.index) + 1;
        const linePrefix = content.slice(lineStart, m.index);
        if (linePrefix.startsWith('    ') || linePrefix.startsWith('\t')) continue;
        matches.push({ text: m[1], url: m[2], index: m.index });
      }
      if (matches.length > 0) {
        markdownInSource += matches.length;
        findings.push({
          file: full.replace(ROOT, '').replace(/\\/g, '/'),
          count: matches.length,
          samples: matches.slice(0, 3).map(x => `[${x.text}](${x.url})`),
        });
      }
    }
  }
}

for (const d of SCAN_DIRS) {
  const full = path.join(ROOT, d);
  if (fs.existsSync(full)) walk(full);
}

// 按命中数排序
findings.sort((a, b) => b.count - a.count);

console.log('=== F1-batch-6 Markdown link 风险扫描 ===');
console.log(`扫描目录: ${SCAN_DIRS.join(', ')}`);
console.log(`扫描文件: ${totalFiles}`);
console.log(`含 [text](url) 的文件: ${findings.length}`);
console.log(`总命中数: ${markdownInSource}`);
console.log('');
console.log('=== Top 命中文件 ===');
for (const f of findings.slice(0, 30)) {
  console.log(`${String(f.count).padStart(4)} ${f.file}`);
  for (const s of f.samples) console.log(`     e.g. ${s}`);
}
console.log('');
console.log('=== 全部命中 (按文件) ===');
for (const f of findings) {
  console.log(`${String(f.count).padStart(4)} ${f.file}`);
}
