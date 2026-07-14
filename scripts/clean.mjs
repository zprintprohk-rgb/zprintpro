#!/usr/bin/env node
/**
 * 跨平台 .next 清理脚本
 * 2026-06-07 创建
 *
 * 【为什么需要】
 * 之前 build:cf 用 "rm -rf .next && ..." 是 Unix 命令，
 * Windows PowerShell 上 rm 不存在导致 build:cf 100% 失败，
 * 4 个 commit (c2661d2 / fd02d93 / 0f193df) 全部"暂无可用部署"。
 *
 * 【为什么不用 rimraf】
 * 不想加新依赖到 devDependencies（项目已经有 @cloudflare/next-on-pages 拉了 npx rimraf，
 * 但作为独立依赖会膨胀 package.json）。
 *
 * 【为什么不用 del-cli / clean-package / fs-extra】
 * 同上：Node 18+ 内置 fs.rmSync 已经能干净处理跨平台删除。
 *
 * 【Node 版本要求】
 * fs.rmSync 需要 Node 14.14.0+（CF Pages 用 Node 22，满足）。
 *
 * 【使用方式】
 * node scripts/clean.mjs [path1] [path2] ...
 * 默认清理 .next
 */

import { rmSync, existsSync } from 'fs';
import { resolve } from 'path';

const targets = process.argv.slice(2);
if (targets.length === 0) targets.push('.next');

let cleaned = 0;
for (const t of targets) {
  const abs = resolve(t);
  if (existsSync(abs)) {
    try {
      rmSync(abs, { recursive: true, force: true });
      console.log(`[clean] removed: ${abs}`);
      cleaned++;
    } catch (e) {
      console.error(`[clean] FAILED: ${abs} - ${e.message}`);
      process.exit(1);
    }
  } else {
    console.log(`[clean] skip (not exist): ${abs}`);
  }
}

console.log(`[clean] done. ${cleaned}/${targets.length} removed.`);
