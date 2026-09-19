/**
 * B2 回溯验证 (K3 2026-09-19 评估第二点)
 *
 * 问题: strip 工具原版**只处理 content 开头**的 LD 序列 (poster en/ja 实测块在 5,816 / 8,405 处 ⇒ 会漏删)。
 *   B2 批1/批2 用旧版执行 ⇒ 必须回溯确认「当时删掉的字节 = 全部 LD 块的字节」, 而非仅开头序列。
 *
 * 方法 (双方法):
 *   ① 从 git 历史取 strip 前的原始 content (每个文件取「最后一次含内嵌 LD 的版本」);
 *   ② 用**新版全位置**逻辑统计 LD 总字节;
 *   ③ 用**旧版仅开头**逻辑统计开头序列字节;
 *   ④ 比对: 若两者不等 ⇒ 旧版漏删, 现已由新版补删; 若相等 ⇒ 旧版无误 (poster en/ja 除外, 已单独补删)。
 *
 * 用法: node .hermes/_probe-pb/verify-strip-backfill.mjs
 */
import { execSync } from 'child_process';

const SEQ_RE = /(?:<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*)+/g;
const LEAD_RE = /^(?:\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)+/;

const SLUGS = [
  'packaging-box-pricing-2026',
  'kraft-paper-box-types-comparison-2026',
  'poster-printing-guide',
  'sticker-material-pvc-vinyl-removable',
  'campus-education-printing-pillar-guide',
  'poster-size-guide',
  'print-specifications-reference-guide-2026',
  'restaurant-menu-printing-guide',
  'school-exercise-book-printing-guide',
  'hong-kong-printing-cost-baseline-2026',
  'foil-stamping-3-applications-2026',
];

function contentAt(rev, loc, slug) {
  try {
    const raw = execSync(`git show ${rev}:src/data/blog-data/${loc}.json`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    const d = JSON.parse(raw.replace(/^\uFEFF/, ''));
    return (d[slug] && d[slug].content) || '';
  } catch (e) { return null; }
}

// 找「最后一次仍含内嵌 LD」的历史版本 (从最老到最新扫, 保留最后一个含 LD 的)
function lastWithInline(loc, slug) {
  let found = null;
  const revs = execSync('git rev-list HEAD -- src/data/blog-data/' + loc + '.json', { encoding: 'utf8' }).split('\n').filter(Boolean);
  for (const rev of revs.reverse()) {           // 最老 → 最新
    const c = contentAt(rev, loc, slug);
    if (c && c.includes('<script type="application/ld+json"')) found = { rev, c };
    if (c && !c.includes('<script type="application/ld+json"') && found) break; // 已清空, 停止
    if (found && revs.indexOf(rev) > 400) break;  // 性能保险
  }
  return found;
}

console.log('=== B2 回溯验证: 旧版(仅开头) vs 新版(全位置) ===\n');
const rows = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  for (const slug of SLUGS) {
    const hi = lastWithInline(loc, slug);
    const cur = contentAt('HEAD', loc, slug);
    const curInline = cur ? (cur.match(/<script type="application\/ld\+json"/g) || []).length : -1;
    if (!hi) {
      rows.push({ loc, slug, histInline: 0, curInline, note: '历史中未找到含内嵌 LD 的版本' });
      continue;
    }
    const sample = hi.c;
    const lead = (sample.match(LEAD_RE) || [''])[0].length;
    const seqs = [...sample.matchAll(SEQ_RE)].filter(m => m[0].includes('<script type="application/ld+json"'));
    const total = seqs.reduce((a, m) => a + m[0].length, 0);
    const seqCount = seqs.length;
    rows.push({
      loc, slug,
      histRev: hi.rev.slice(0, 8),
      histInlineBlocks: (sample.match(/<script type="application\/ld\+json"/g) || []).length,
      seqCount, startBytes: lead, allBytes: total,
      missedByOldTool: total - lead,
      curInline,
    });
  }
}

console.log('loc\tslug\t块数\t开头字节\t全部字节\t旧版漏删\t现状内嵌');
for (const r of rows) {
  if (r.note) { console.log(`${r.loc}\t${r.slug}\t—\t—\t—\t—\t${r.curInline}\t(${r.note})`); continue; }
  console.log(`${r.loc}\t${r.slug}\t${r.histInlineBlocks}\t${r.startBytes}\t${r.allBytes}\t${r.missedByOldTool}\t${r.curInline}`);
}
const missed = rows.filter(r => r.missedByOldTool > 0);
console.log(`\n--- 结论 ---`);
console.log(`旧版「仅开头」会漏删的组合数 = ${missed.length} / ${rows.filter(r => !r.note).length}`);
for (const m of missed) console.log(`   ${m.loc}/${m.slug}: 漏删 ${m.missedByOldTool} 字节 (历史 ${m.histRev})`);
const leftover = rows.filter(r => !r.note && r.curInline > 0);
console.log(`\n当前 HEAD 仍含内嵌 LD 的组合 = ${leftover.length}`);
for (const l of leftover) console.log(`   ${l.loc}/${l.slug}: ${l.curInline} 块`);
