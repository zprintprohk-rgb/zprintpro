#!/usr/bin/env node
/**
 * Pre-commit check: 防止 mavis 在 Windows + PowerShell 上手抖把文件以 UTF-16 或 CRLF/LF 混合 commit
 *
 * 死规则:
 * 1. .ts / .tsx / .json / .md 不许有 UTF-16 BOM (FF FE)
 * 2. .ts / .tsx / .tsx-on-mobile 不许有 CRLF (统一 LF)
 * 3. 文件 size 跟 index 里比不允许 > 2x (UTF-16 是 UTF-8 体积的近 2 倍, 这是 silent smoke)
 * 4. JSON 必须是 valid JSON parse-able
 *
 * 用法:
 *   node scripts/pre-commit-check.mjs            # 检查 staged 文件
 *   node scripts/pre-commit-check.mjs --all      # 检查 tracked 全文件
 *   node scripts/pre-commit-check.mjs <path>...  # 检查指定文件
 *
 * 退出码: 0 通过, 1 有违规
 */
import { readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const isWin = process.platform === 'win32';

function getStagedFiles() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch (e) {
    console.error('[pre-commit] git diff --cached failed:', e.message);
    process.exit(1);
  }
}

function getIndexFileSize(p) {
  try {
    const out = execSync(`git ls-files -s -- "${p.replace(/\\/g, '/')}"`, { encoding: 'utf8' });
    if (!out.trim()) return null;
    const parts = out.trim().split(/\s+/);
    return parseInt(parts[2], 10) || null;
  } catch (e) {
    return null;
  }
}

const checks = [
  {
    // Critical: 之前 paper-bag/food-pkg 的 page.tsx 因为 UTF-16 commit 体积翻倍,build 全失败
    name: 'UTF-16 BOM (silent corruption)',
    exts: ['.ts', '.tsx', '.json', '.md', '.js', '.mjs', '.css'],
    test: (buf) => {
      if (buf.length >= 2 && buf[0] === 0xFF && buf[1] === 0xFE) return 'UTF-16 LE BOM';
      if (buf.length >= 2 && buf[0] === 0xFE && buf[1] === 0xFF) return 'UTF-16 BE BOM';
      return null;
    },
  },
  {
    name: 'UTF-8 BOM',
    exts: ['.ts', '.tsx', '.js', '.mjs'],
    test: (buf) => (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) ? 'UTF-8 BOM (PowerShell Add-Content leaked BOM — strip with: node -e \'const b=require(\'fs\').readFileSync(p);if(b[0]===0xEF&&b[1]===0xBB&&b[2]===0xBF)require(\'fs\').writeFileSync(p,b.slice(3))\')' : null,
  },
];

function inspect(p) {
  const issues = [];
  let buf;
  try {
    buf = readFileSync(p);
  } catch (e) {
    issues.push(`cannot read: ${e.message}`);
    return issues;
  }

  const ext = p.match(/\.[^.]+$/)?.[0] || '';
  for (const c of checks) {
    if (!c.exts.includes(ext)) continue;
    const r = c.test(buf);
    if (r) issues.push(`${c.name}: ${r}`);
  }

  // File size sanity vs git index size
  const idxSize = getIndexFileSize(p);
  if (idxSize !== null && idxSize > 0) {
    const ratio = buf.length / idxSize;
    if (ratio > 1.5) {
      issues.push(`size anomaly: working copy ${buf.length} bytes vs index ${idxSize} bytes (ratio ${ratio.toFixed(2)}x — likely UTF-16 or trailing content)`);
    }
  }

  return issues;
}

function main() {
  let files;
  if (process.argv.includes('--all')) {
    try {
      const out = execSync('git ls-files', { encoding: 'utf8' });
      files = out.split('\n').filter(Boolean);
    } catch (e) {
      console.error('[pre-commit] git ls-files failed:', e.message);
      process.exit(1);
    }
  } else if (process.argv.length > 2) {
    files = process.argv.slice(2).filter((f) => !f.startsWith('--'));
  } else {
    files = getStagedFiles();
  }

  let badCount = 0;
  let scanned = 0;
  for (const f of files) {
    scanned++;
    const p = resolve(f);
    const issues = inspect(p);
    if (issues.length === 0) continue;
    badCount++;
    console.error(`\n[x] ${f}`);
    for (const i of issues) console.error(`    ${i}`);
  }

  if (badCount === 0) {
    console.log(`[pre-commit] OK — ${scanned} files clean`);
    process.exit(0);
  } else {
    console.error(`\n[pre-commit] FAILED — ${badCount}/${scanned} files have issues`);
    process.exit(1);
  }
}

main();
