// moq10-diag3.ts — dump 指定行內所有 MOQ 命中的精確上下文
import fs from 'fs';

const targetLines = [1108, 1207, 1771, 2410, 2502, 338, 716, 915];
const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);

const MOQ_PATTERNS: { re: RegExp; kind: string }[] = [
  { re: /(\d+)\s*本\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_本起' },
  { re: /(\d+)\s*張\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_張起' },
  { re: /(\d+)\s*個\s*起(?:印|訂)?(?!\s*\/)/g, kind: 'zh_個起' },
  { re: /(\d+)\s*枚\s*(?:から|〜|~)/g, kind: 'ja_枚から' },
  { re: /(\d+)\s*冊\s*(?:から|〜|~)/g, kind: 'ja_冊から' },
  { re: /(\d+)[ \t]+(?:MOQ|Copies|copies)\b/g, kind: 'en_MOQ' },
];

for (const ln of targetLines) {
  const line = lines[ln - 1];
  if (!line) continue;
  console.log(`\n===== L${ln} (長度 ${line.length}) =====`);
  let any = false;
  for (const { re, kind } of MOQ_PATTERNS) {
    const r = new RegExp(re.source, 'g');
    let m: RegExpExecArray | null;
    while ((m = r.exec(line))) {
      any = true;
      const s = Math.max(0, m.index - 45);
      const e = Math.min(line.length, m.index + m[0].length + 25);
      console.log(`  [${kind}] 命中 "${m[0]}" @${m.index}`);
      console.log(`      …${line.slice(s, e).replace(/\n/g, '\\n')}…`);
    }
  }
  if (!any) console.log('  (無命中)');
}
