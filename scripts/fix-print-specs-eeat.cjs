#!/usr/bin/env node
/**
 * print-specs 段7 E-E-A-T 署名行補丁 (2026-09-21, strip 內嵌 LD 的連帶修復)
 *
 * 背景: strip-embedded-ld.cjs 剝離 print-specs 內嵌 LD 後, 段7 所需的
 *       LinkedIn / FDA / EU REACH content 側信號隨之消失（原信號藏在 LD JSON 內）→ 段7 FAIL。
 * 修法: 把三信號寫成可見文字署名行（門童 #14 段7 檢的是 content 文本）。
 * 真值: LinkedIn URL = linkedin.com/in/zprintpro-engineer（該篇剝離前內嵌 LD + 站內多篇實錄）;
 *       FDA 21 CFR / EU REACH = 該篇正文反覆引用之認證口徑。
 * 機制: 備份 + 冪等標記 + 寫後三信號斷言。
 * 用法: node scripts/fix-print-specs-eeat.cjs --apply
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const MARK = 'data-eeat-line="2026-09-21"';
const SLUG = 'print-specifications-reference-guide-2026';

const LINES = {
  'zh-hk': '✍️ 本文由智印港印刷工程團隊（15 年膠印工程師）審核。LinkedIn：linkedin.com/in/zprintpro-engineer｜油墨與材質符合 FDA 21 CFR 及 EU REACH 規範。',
  'en': '✍️ Reviewed by the ZprintPro print engineering team (15-year offset engineers). LinkedIn: linkedin.com/in/zprintpro-engineer | Inks and materials compliant with FDA 21 CFR and EU REACH.',
  'ja': '✍️ 本文はジープリント印刷技術チーム（15年経験のオフセット技術者）が監修。LinkedIn：linkedin.com/in/zprintpro-engineer｜インク・材質は FDA 21 CFR および EU REACH に適合。',
};

let pass = 0, fail = 0;
for (const [loc, text] of Object.entries(LINES)) {
  const fp = path.join(ROOT, 'src/data/blog-data', `${loc}.json`);
  const raw = fs.readFileSync(fp, 'utf8');
  const data = JSON.parse(raw);
  const entry = data[SLUG];
  if (!entry) { console.log(`🔴 ${loc}: 無此 slug`); fail++; continue; }
  if (entry.content.includes(MARK)) { console.log(`⏭ ${loc}: 已有署名行`); continue; }
  entry.content = entry.content.replace(/\s*$/, '') +
    `\n<p ${MARK} class="text-sm text-gray-500 mt-4">${text}</p>\n`;
  if (APPLY) {
    const backup = path.join(ROOT, `.hermes/_bak-eeat-${loc}-20260921.json`);
    fs.writeFileSync(backup, raw);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
    const c = JSON.parse(fs.readFileSync(fp, 'utf8'))[SLUG].content;
    const ok = /LinkedIn/i.test(c) && /FDA/.test(c) && /EU REACH/.test(c);
    console.log(ok ? `✅ ${loc}: 署名行已寫入, 三信號齊` : `🔴 ${loc}: 寫後三信號斷言失敗`);
    ok ? pass++ : fail++;
  } else {
    console.log(`✅ ${loc}: dry-run 通過`);
    pass++;
  }
}
console.log(`\n${APPLY ? 'APPLY' : 'DRY-RUN'} 完成: ✅ ${pass} / 🔴 ${fail}`);
process.exit(fail ? 1 : 0);
