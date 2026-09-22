/**
 * fix-sticker-guide-moq-20260922.mjs — sticker-guide 博文三语 MOQ 真值修复
 *
 * 背景: K3 2026-09-19 紙品線拍板: 貼紙線 MOQ 100→10 (products.ts truth:
 *   small-batch/waterproof/die-cut/foil/transparent/removable/fluorescent/security
 *   stickers minQuantity 全部 = 10)。sticker-guide 博文仍寫 100, 與 PDP 矛盾 → 統一為 10。
 * 范围: 仅 sticker-guide 条目块 (zh-hk L42-49 / en L34-41 / ja L42-49), 其他博文不动。
 * 另修: zh-hk title 簡化字「详解」→「詳解」; blog-posts.ts ja title 截斷「応用シ」→「応用シーン」。
 * 每步断言计数, 失败不写盘。用法: --check | --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'F:/zprintpro-nextjs';
const APPLY = process.argv.includes('--apply');
const BAK = path.join(ROOT, '.hermes/_bak-sku-compress-20260922');

const FILE_OPS = {
  'zh-hk.json': [
    ['100 張', '10 張', 16],
    ['應用場景详解', '應用場景詳解', 1],
  ],
  'en.json': [
    ['100-piece minimum', '10-piece minimum', 1],
    ['100 pieces', '10 pieces', 3],
    ['100 units', '10 units', 2],
    ['100 pcs', '10 pcs', 9],
  ],
  'ja.json': [
    ['100 枚', '10 枚', 17],
  ],
};

const errors = [];
const report = [];

for (const [file, ops] of Object.entries(FILE_OPS)) {
  const fp = path.join(ROOT, 'src/data/blog-data', file);
  const lines = fs.readFileSync(fp, 'utf8').split('\n');
  let s = lines.findIndex(l => l.includes('"sticker-guide": {'));
  let e = s;
  while (e < lines.length && !/^\s+\},?\s*$/.test(lines[e])) e++;
  if (s < 0 || e >= lines.length) { errors.push(`${file}: block not found`); continue; }
  let block = lines.slice(s, e + 1).join('\n');
  for (const [oldS, newS, want] of ops) {
    const count = block.split(oldS).length - 1;
    if (count !== want) { errors.push(`${file}: "${oldS}" ×${count}, want ${want}`); continue; }
    block = block.split(oldS).join(newS);
    report.push(`${file}: OK "${oldS}" ×${count} → "${newS}"`);
  }
  // 块内残余断言
  if (block.includes('100 張') || block.includes('100 枚') || /100[- ]?(pieces|units|pcs)/.test(block)) {
    errors.push(`${file}: residual 100 MOQ in block`);
  }
  lines.splice(s, e - s + 1, block);
  if (APPLY && !errors.length) {
    fs.mkdirSync(BAK, { recursive: true });
    fs.writeFileSync(path.join(BAK, 'stickerguide-' + file + '.bak'), fs.readFileSync(fp, 'utf8'), 'utf8');
    fs.writeFileSync(fp, lines.join('\n'), 'utf8');
    report.push(`${file}: 写盘`);
  }
}

// blog-posts.ts ja 截斷標題
{
  const fp = path.join(ROOT, 'src/data/blog-posts.ts');
  const src = fs.readFileSync(fp, 'utf8');
  const oldT = "ja: '香港ステッカー印刷完全ガイド：材質、加工、応用シ | ZprintPro',";
  const newT = "ja: '香港ステッカー印刷完全ガイド：材質、加工、応用シーン | ZprintPro',";
  const count = src.split(oldT).length - 1;
  if (count !== 1) errors.push(`blog-posts.ts: ja title ×${count}, want 1`);
  else {
    report.push('blog-posts.ts: OK ja 截斷標題修復');
    if (APPLY && !errors.length) {
      fs.writeFileSync(path.join(BAK, 'blog-posts.ts.bak'), src, 'utf8');
      fs.writeFileSync(fp, src.replace(oldT, newT), 'utf8');
      report.push('blog-posts.ts: 写盘');
    }
  }
}

console.log('══════ 报告 ══════');
report.forEach(r => console.log(r));
if (errors.length) {
  console.error('\n══════ 错误 ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}
console.log(APPLY ? '\n[apply] 完成' : '\n[dry-run] OK, --apply 写盘');
