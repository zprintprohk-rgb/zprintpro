#!/usr/bin/env node
/**
 * verify-price-determinism.mjs — Step 2 驗收 5: 可重生成 (決定性)
 * 1) 記錄目前 price-data.generated.ts 的 sha256
 * 2) 再跑一次 node scripts/gen-price-data.mjs
 * 3) 比對 sha256 + 逐位元組 diff ⇒ 必須 0
 * 用法: node .hermes/_probe-pb/verify-price-determinism.mjs
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import crypto from 'crypto';

const P = 'src/lib/price-data.generated.ts';
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');

const before = sha(P);
const beforeBuf = fs.readFileSync(P);

const out = execFileSync(process.execPath, ['scripts/gen-price-data.mjs'], { encoding: 'utf8' });
console.log(out.trim().split('\n').map((l) => '  gen#2: ' + l).join('\n'));

const after = sha(P);
const afterBuf = fs.readFileSync(P);

console.log('sha256 #1 : ' + before);
console.log('sha256 #2 : ' + after);
console.log('bytes  #1 : ' + beforeBuf.length + ' | #2 : ' + afterBuf.length);
const identical = before === after && beforeBuf.equals(afterBuf);
console.log('byte diff : ' + (identical ? 0 : 1));
console.log(identical ? '\n結果: PASS — 二次生成 diff = 0 (決定性)' : '\n結果: FAIL — 二次生成不一致');
process.exit(identical ? 0 : 1);
