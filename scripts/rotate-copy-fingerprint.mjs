#!/usr/bin/env node
/**
 * rotate-copy-fingerprint.mjs — 反爬文案指纹轮换器 (K3 2026-10-16 拍板)
 *
 * 每月轮换页脚原创声明档号（ZP-OC-YYMM → 当月），让抄站者的过期快照自动失效：
 * 新快照带着旧档号 = 复制时间差的直接证据。
 *
 * 用法: node scripts/rotate-copy-fingerprint.mjs          # dry-run，显示是否需轮换
 *       node scripts/rotate-copy-fingerprint.mjs --apply  # 写入新档号 + 登记账本
 *
 * 幂等：当月档号已生效则 no-op。账本：.hermes/logs/copy-fingerprint-rotation.jsonl
 * 接入建议（待 K3 拍板）：monthly-matrix 车道每月 1 号运行本脚本 --apply。
 */
import fs from 'node:fs';

const PATH = 'src/data/copy-fingerprints.ts';
const LEDGER = '.hermes/logs/copy-fingerprint-rotation.jsonl';
const APPLY = process.argv.includes('--apply');

const now = new Date();
const yy = String(now.getFullYear()).slice(2);
const mm = String(now.getMonth() + 1).padStart(2, '0');
const newCode = `ZP-OC-${yy}${mm}`;

const src = fs.readFileSync(PATH, 'utf8');
const m = src.match(/COPY_FINGERPRINT_CODE = '([^']+)'/);
if (!m) { console.error('[rotate] 找不到 COPY_FINGERPRINT_CODE'); process.exit(2); }
const oldCode = m[1];

if (oldCode === newCode) {
  console.log(`[rotate] 档号已是最新 (${newCode})，no-op`);
  process.exit(0);
}
console.log(`[rotate] ${oldCode} -> ${newCode}${APPLY ? '' : ' (dry-run)'}`);
if (!APPLY) process.exit(0);

const today = now.toISOString().slice(0, 10);
const out = src
  .replace(/COPY_FINGERPRINT_CODE = '[^']+'/, `COPY_FINGERPRINT_CODE = '${newCode}'`)
  .replace(/COPY_FINGERPRINT_ISSUED_AT = '[^']+'/, `COPY_FINGERPRINT_ISSUED_AT = '${today}'`);
if (out === src) { console.error('[rotate] 替换失败，文件未改'); process.exit(2); }
fs.writeFileSync(PATH, out);
fs.mkdirSync('.hermes/logs', { recursive: true });
fs.appendFileSync(LEDGER, JSON.stringify({ at: now.toISOString(), from: oldCode, to: newCode }) + '\n');
console.log(`[rotate] 已写入 ${PATH}，账本 ${LEDGER}`);
