import { readFileSync } from 'fs';
const d = readFileSync('src/data/sku-seo-data.ts', 'utf-8');
// 找 cosmetic-boxes 块
const idx = d.indexOf('"cosmetic-boxes":');
const block = d.substring(idx, idx + 5000);
// 找第一个 description 值 (不限定 zh-hk 位置)
const m = block.match(/"description":\s*"([^"]+)"/);
console.log('cosmetic-boxes description chars:', m[1].length);
console.log('content:', m[1]);
const nap = /深圳|Shenzhen|深セン|智印港|名片|咭片|旺角|觀塘|尖沙咀|銅鑼湾|荃湾|九龍湾/.test(m[1]);
console.log('NAP check:', nap ? 'FAIL' : 'PASS');
