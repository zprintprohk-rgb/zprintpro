#!/usr/bin/env node
/**
 * Strip UTF-8 BOM from all .ts/.tsx/.js/.mjs files under the repo.
 * One-shot cleanup. Use after install or whenever a file picks up a BOM.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const isWin = process.platform === 'win32';
const ROOT = 'f:/zprintpro-nextjs';

const TARGET_EXTS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'out', '.hermes']);

function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = readdirSync(dir);
  } catch (e) {
    return out;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e)) continue;
    const p = join(dir, e);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) {
      out.push(...walk(p));
    } else {
      const ext = e.match(/\.[^.]+$/)?.[0] || '';
      if (TARGET_EXTS.has(ext)) out.push(p);
    }
  }
  return out;
}

let stripped = 0;
let scanned = 0;
const files = walk(ROOT);
for (const p of files) {
  scanned++;
  const buf = readFileSync(p);
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    writeFileSync(p, buf.slice(3));
    stripped++;
    console.log('stripped BOM:', p);
  }
}
console.log(`Done — ${stripped}/${scanned} files had UTF-8 BOM`);
