// moq10-dump-desc.ts — dump 指定行的指定欄位原文（供精確編輯）
import fs from 'fs';

const targets: [number, RegExp][] = [
  [1108, /description(?:En|Ja|_zh)?/],
  [1207, /description(?:En|Ja|_zh)?/],
  [1771, /description(?:En|Ja|_zh)?/],
  [2410, /description(?:En|Ja|_zh)?/],
  [2502, /description(?:En|Ja|_zh)?/],
];

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);
const FIELD = /(description(?:En|Ja|_zh)?)\s*:\s*'((?:[^'\\]|\\.)*)'/g;

for (const [ln, filter] of targets) {
  const line = lines[ln - 1];
  if (!line) continue;
  console.log(`\n########## L${ln} ##########`);
  FIELD.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = FIELD.exec(line))) {
    if (!filter.test(m[1])) continue;
    console.log(`--- ${m[1]} ---`);
    console.log(m[2]);
  }
}
