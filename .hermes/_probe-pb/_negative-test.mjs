/**
 * _negative-test.mjs — 證明「寫盤前斷言」是真的守衛 (§12: 只查計數的守衛是假守衛)
 * 手法: 用 Node (UTF-8 安全) 暫時把原缺陷 (zh-hk 沿用 JSON 簡體策展值) 重新注入,
 *       跑 gen-price-data.mjs, 必須 exit≠0 且命中「非詞典/非源頭字元」或「簡體專用字」守衛,
 *       且不得寫盤 (檔案 sha256 不變); 之後原樣還原並驗證 sha256。
 */
import fs from 'fs';
import crypto from 'crypto';
import { execFileSync } from 'child_process';

const M = 'scripts/lib/price-label-i18n.mjs';
const OUT = 'src/lib/price-data.generated.ts';
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');

const orig = fs.readFileSync(M, 'utf8');
const ANCHOR_FROM = "    if (locale === 'zh-hk') return localize(raw, 'zh-hk', sink);";
const ANCHOR_TO = "    if (locale === 'zh-hk') { const c0 = name['zh-hk']; if (c0) return c0; }";
const bugged = orig.replace(ANCHOR_FROM, ANCHOR_TO);
if (bugged === orig) { console.error('✗ 找不到注入錨點, 測試中止'); process.exit(2); }

const outShaBefore = sha(OUT);
let exitCode = 0, stderr = '';
try {
  fs.writeFileSync(M, bugged, 'utf-8');
  try {
    execFileSync(process.execPath, ['scripts/gen-price-data.mjs'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) {
    exitCode = e.status ?? 1;
    stderr = String(e.stderr || e.stdout || '');
  }
} finally {
  fs.writeFileSync(M, orig, 'utf-8');
}

const restored = fs.readFileSync(M, 'utf8') === orig;
const outShaAfter = sha(OUT);
const caught = /非詞典\/非源頭字元|簡體專用字/.test(stderr);

console.log('缺陷注入後 gen 退出碼        : ' + exitCode + ' (期望非 0)');
console.log('守衛命中                     : ' + (caught ? 'YES' : 'NO'));
console.log('守衛訊息 (前 3 行):');
stderr.trim().split('\n').slice(0, 3).forEach((l) => console.log('   ' + l));
console.log('輸出檔未被寫入 (sha 不變)     : ' + (outShaBefore === outShaAfter));
console.log('模組已原樣還原                : ' + restored);

const pass = exitCode !== 0 && caught && outShaBefore === outShaAfter && restored;
console.log('\n結果: ' + (pass ? 'PASS — 守衛為真守衛 (注入原缺陷即被攔下, 且未寫盤)' : 'FAIL'));
process.exit(pass ? 0 : 1);
