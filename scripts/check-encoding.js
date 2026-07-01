#!/usr/bin/env node
/**
 * Pre-commit encoding safety check
 * Blocks commits containing UTF-16 encoded files or CRLF line endings
 * 
 * Usage: node scripts/check-encoding.js [--fix]
 *   Without --fix: reports issues and exits 1 if problems found
 *   With --fix: converts UTF-16 → UTF-8 and CRLF → LF
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FIX_MODE = process.argv.includes('--fix');
const PROJECT_ROOT = path.resolve(__dirname, '..');

const TEXT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.md', '.html', '.xml', '.txt', '.mjs', '.cjs'];
const SKIP_DIRS = ['node_modules', '.next', '.git', '.openclaw', '.hermes'];

function shouldCheck(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!TEXT_EXTENSIONS.includes(ext)) return false;
  for (const skip of SKIP_DIRS) {
    if (filePath.includes(`\\${skip}\\`) || filePath.includes(`/${skip}/`)) return false;
  }
  return true;
}

function isUTF16(buffer) {
  if (buffer.length < 2) return false;
  // UTF-16 LE BOM: FF FE
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) return true;
  // UTF-16 BE BOM: FE FF
  if (buffer[0] === 0xFE && buffer[1] === 0xFF) return true;
  // UTF-16 without BOM: check for null bytes pattern (every other byte is 0x00)
  if (buffer.length > 100) {
    let nullCount = 0;
    for (let i = 1; i < Math.min(buffer.length, 500); i += 2) {
      if (buffer[i] === 0x00) nullCount++;
    }
    if (nullCount > Math.min(buffer.length, 500) / 4) return true;
  }
  return false;
}

function hasCRLF(content) {
  return content.includes('\r\n');
}

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', {
      cwd: PROJECT_ROOT,
      encoding: 'utf-8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

console.log('🔍 Checking staged files for encoding issues...\n');

const staged = getStagedFiles();
if (staged.length === 0) {
  console.log('✅ No staged files to check.');
  process.exit(0);
}

const issues = [];
const fixed = [];

for (const file of staged) {
  if (!shouldCheck(file)) continue;
  
  const fullPath = path.join(PROJECT_ROOT, file);
  if (!fs.existsSync(fullPath)) continue;
  
  const buffer = fs.readFileSync(fullPath);
  const expectedSize = buffer.length;
  
  // Check UTF-16 (doubled file size is a strong signal)
  if (isUTF16(buffer)) {
    if (FIX_MODE) {
      // Read as UTF-16 and write as UTF-8
      const content = fs.readFileSync(fullPath, 'utf16le');
      fs.writeFileSync(fullPath, content.replace(/\r\n/g, '\n'), 'utf-8');
      execSync(`git add "${file}"`, { cwd: PROJECT_ROOT });
      fixed.push(`${file} (UTF-16 → UTF-8)`);
    } else {
      const sizeKB = (buffer.length / 1024).toFixed(1);
      issues.push(`❌ UTF-16: ${file} (${sizeKB} KB — should be ~${(sizeKB/2).toFixed(1)} KB for UTF-8)`);
    }
  }
  
  // Check CRLF
  const content = buffer.toString('utf-8');
  if (hasCRLF(content)) {
    if (FIX_MODE) {
      fs.writeFileSync(fullPath, content.replace(/\r\n/g, '\n'), 'utf-8');
      execSync(`git add "${file}"`, { cwd: PROJECT_ROOT });
      fixed.push(`${file} (CRLF → LF)`);
    } else {
      const crCount = (content.match(/\r\n/g) || []).length;
      issues.push(`⚠️ CRLF: ${file} (${crCount} lines with \\r\\n)`);
    }
  }
}

// Summary
if (fixed.length > 0) {
  console.log('🔧 Fixed:');
  fixed.forEach(f => console.log(`  ✅ ${f}`));
  console.log();
}

if (issues.length > 0) {
  console.log(`🚨 Found ${issues.length} encoding issues:\n`);
  issues.forEach(i => console.log(`  ${i}`));
  console.log(`\nRun "node scripts/check-encoding.js --fix" to auto-fix, then commit again.`);
  process.exit(1);
}

console.log(`✅ All ${staged.filter(shouldCheck).length} checked files are UTF-8 LF — safe to commit.`);
