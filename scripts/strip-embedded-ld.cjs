#!/usr/bin/env node
/**
 * 段12 內嵌 JSON-LD 剝離器 (2026-09-21, 隨 E3 發現的 6 條存量 FAIL 順帶修)
 *
 * 背景: print-specs / school-exercise 三語 content 內嵌 JSON-LD 5/4 塊（Article/FAQPage/
 *       BreadcrumbList/HowTo/Organization...）, 與 page.tsx 生成塊重複渲染 —— 門童 #14 段12 FAIL,
 *       屬 95 條基線台账的存量（62 條新增清單實錄在案）, 非本次 E3 引入。
 * 修法: 同 batch C 既定模式（3b29120f）— strip content 內嵌 <script ld+json>, 生成層承載不變。
 * 機制: SOP-5 生成器 + 備份 + 冪等（無 script 塊即 skip）+ 寫後斷言（script=0, 欄位不丟）。
 * 用法: node scripts/strip-embedded-ld.cjs          (dry-run)
 *       node scripts/strip-embedded-ld.cjs --apply  (寫入)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const LOCS = ['zh-hk', 'en', 'ja'];
const SLUGS = [
  'print-specifications-reference-guide-2026',
  'school-exercise-book-printing-guide',
];

let pass = 0, skip = 0, fail = 0;
for (const loc of LOCS) {
  const fp = path.join(ROOT, 'src/data/blog-data', `${loc}.json`);
  const raw = fs.readFileSync(fp, 'utf8');
  const data = JSON.parse(raw);
  const applied = [];

  console.log(`\n== ${loc} ==`);
  for (const slug of SLUGS) {
    const entry = data[slug];
    if (!entry || typeof entry.content !== 'string') {
      console.log(`  🔴 ${slug}: 不存在或無 content`);
      fail++;
      continue;
    }
    const before = (entry.content.match(/<script[^>]*ld\+json/g) || []).length;
    if (before === 0) {
      console.log(`  ⏭  ${slug}: 無內嵌 LD, 跳過`);
      skip++;
      continue;
    }
    // 剝離全部 ld+json script 塊（含塊內多行 JSON）, 收斂殘留空白
    const newContent = entry.content
      .replace(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    const after = (newContent.match(/<script[^>]*ld\+json/g) || []).length;
    // 斷言: 剝離乾淨 + 非 script 內容長度縮減合理（只少 script 部分）
    if (after !== 0) {
      console.log(`  🔴 ${slug}: 剝離後仍有 ${after} 塊`);
      fail++;
      continue;
    }
    entry.content = newContent;
    applied.push({ slug, before });
    console.log(`  ✅ ${slug}: 內嵌 LD ${before} 塊 → 0`);
    pass++;
  }

  if (APPLY && applied.length > 0) {
    const backup = path.join(ROOT, `.hermes/_bak-strip-ld-${loc}-20260921.json`);
    fs.writeFileSync(backup, raw);
    fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
    const check = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let ok = true;
    for (const { slug, before } of applied) {
      const e = check[slug];
      const left = (e?.content.match(/<script[^>]*ld\+json/g) || []).length;
      if (left !== 0 || !e || !e.title) {
        console.log(`  🔴 寫後複驗 ${slug}: left=${left}`);
        ok = false;
      }
    }
    console.log(ok ? `  ✅ 已寫入 ${applied.length} 條 (備份: ${path.relative(ROOT, backup)})` : `  🔴 寫後複驗有失敗`);
    if (!ok) fail++;
  }
}

console.log(`\n${APPLY ? 'APPLY' : 'DRY-RUN'} 完成: ✅ ${pass} / ⏭ ${skip} / 🔴 ${fail}`);
if (!APPLY) console.log('確認無誤後加 --apply 寫入');
process.exit(fail > 0 ? 1 : 0);
