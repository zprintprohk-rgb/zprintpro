#!/usr/bin/env node
/**
 * verify-diff-shape.mjs — Step 2 驗收 3: diff 性質逐行核對
 * 解析 git diff --unified=0 src/lib/price-data.generated.ts,
 * 斷言所有新增/刪除的行都必須是語言字串值行 (`"zh-hk" | "en" | "ja": "…"`),
 * 且不得出現 key 名 / 結構 / 順序 / 數量相關的行改動。
 * 用法: node .hermes/_probe-pb/verify-diff-shape.mjs
 */
import { execFileSync } from 'child_process';

const FILE = 'src/lib/price-data.generated.ts';
const diff = execFileSync('git', ['diff', '--unified=0', '--', FILE], { encoding: 'utf8' });

const LOC_LINE = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)"(,?)$/;
let added = 0, removed = 0, badAdded = [], badRemoved = [], hunks = 0, contextChanged = [];
const counts = { 'zh-hk': 0, en: 0, ja: 0 };
let cur = null;
for (const line of diff.split('\n')) {
  if (line.startsWith('@@')) { hunks++; continue; }
  if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('diff ') || line.startsWith('index ')) continue;
  if (line.startsWith('+')) {
    const body = line.slice(1);
    added++;
    const m = body.match(LOC_LINE);
    if (m) counts[m[1]]++; else badAdded.push(body);
  } else if (line.startsWith('-')) {
    const body = line.slice(1);
    removed++;
    const m = body.match(LOC_LINE);
    if (!m) badRemoved.push(body);
  }
}

console.log('=== diff 性質逐行核對: ' + FILE + ' ===');
console.log('hunk 數                : ' + hunks);
console.log('新增行                 : ' + added + ' (語言字串值行 ' + (added - badAdded.length) + ')');
console.log('刪除行                 : ' + removed + ' (語言字串值行 ' + (removed - badRemoved.length) + ')');
console.log('新增行分類             : zh-hk ' + counts['zh-hk'] + ' / en ' + counts.en + ' / ja ' + counts.ja);
if (badAdded.length) { console.log('\n✗ 非語言字串的新增行 (' + badAdded.length + '):'); badAdded.slice(0, 10).forEach(l => console.log('   ' + l.slice(0, 120))); }
if (badRemoved.length) { console.log('\n✗ 非語言字串的刪除行 (' + badRemoved.length + '):'); badRemoved.slice(0, 10).forEach(l => console.log('   ' + l.slice(0, 120))); }

const pass = badAdded.length === 0 && badRemoved.length === 0 && added > 0 && added === removed;
console.log('\n結果: ' + (pass
  ? 'PASS — 所有改動行 100% 為 "zh-hk"/"en"/"ja" 字串值行; 無任何 key 名 / 結構 / 順序 / 行數改動 (新增=刪除=' + added + ')'
  : 'FAIL'));
process.exit(pass ? 0 : 1);
