/**
 * batch C 應用器: hk-cost-baseline-2026 三語補 FAQ + 剝離內嵌 JSON-LD
 * (K3 2026-09-20 授權; 草案 SSoT = docs/2026-09-20-cost-baseline-faq-draft.md)
 *
 * 設計要點（對應避坑庫）:
 *   - 結構定位禁正則猜歸屬 (避坑 12): JSON.parse 定位目標 post; 文本錨點全部帶唯一性斷言
 *   - 最小 diff: 不重新序列化整個 JSON 檔, 只做「舊 content 串 → 新 content 串」一次性替換,
 *     其餘字節不動 (churn 紅線)
 *   - 前斷言 (盲修防線, LOCATE_BEFORE_PATCH): script 塊在索引 0 / 錨點唯一 / 無既有 FAQ
 *   - 後斷言: 生產同源正則解析 6 組 / 內嵌 @type=0 / 其餘 post 深度不變
 *   - 備份: 寫入前 .hermes/_bak- 快照 (實測 PowerShell Copy-Item 靜默失敗前科, 用 node fs)
 *
 * 用法:
 *   node scripts/apply-cost-baseline-faq.mjs            # dry-run (零寫入)
 *   node scripts/apply-cost-baseline-faq.mjs --apply    # 實寫 (先備份)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SLUG = 'hong-kong-printing-cost-baseline-2026';
const LOCALES = ['zh-hk', 'en', 'ja'];
const DRAFT = path.join(ROOT, 'docs', '2026-09-20-cost-baseline-faq-draft.md');
const APPLY = process.argv.includes('--apply');
const NEW_DATE = '2026-09-20';

// 與 page.tsx extractFaqFromHtml 生產正則同源 (SSoT: .hermes/_probe-pb/precheck-faq-format.mjs)
const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
const CTA_ANCHOR = '<p class="mt-6"><a href="https://wa.me/8619880851334"';

let failures = 0;
const fail = (msg) => { failures++; console.log(`  🔴 ${msg}`); };
const ok = (msg) => console.log(`  ✅ ${msg}`);

// ---- 1. 從已評審草案取三語 FAQ 塊 (單一真值源, 禁在腳本內手搓第二份文案) ----
const draft = fs.readFileSync(DRAFT, 'utf8');
const blocks = [...draft.matchAll(/```html\n([\s\S]*?)```/g)].map((m) => m[1].trim());
if (blocks.length !== 3) {
  console.log(`🔴 草案 html 塊數 ${blocks.length} ≠ 3, 中止 (草案被改壞?)`);
  process.exit(1);
}
blocks.forEach((b, i) => {
  const n = (b.match(PROD_RE) || []).length;
  if (n !== 6) { console.log(`🔴 草案塊 ${i + 1} 解析 ${n} 組 ≠ 6, 中止`); process.exit(1); }
});
console.log(`草案載入: 3 語 × 6 組 FAQ, 生產正則解析全過`);

// ---- 2. 逐語處理 ----
for (const loc of LOCALES) {
  console.log(`\n== ${loc} ==`);
  let locFail = false;
  const file = path.join(ROOT, 'src', 'data', 'blog-data', `${loc}.json`);
  const raw = fs.readFileSync(file, 'utf8');
  const data = JSON.parse(raw); // 結構解析定位 (避坑 12)
  // 容器感知: blog-data JSON 頂層可能是陣列或 slug-keyed 物件 (鍵序即檔序)
  const isArr = Array.isArray(data);
  const tIdx = isArr ? data.findIndex((x) => x?.slug === SLUG) : -1;
  const tKey = isArr ? null : Object.keys(data).find((k) => data[k]?.slug === SLUG || k === SLUG);
  const post = isArr ? data[tIdx] : data[tKey];
  if (!post || post.slug !== SLUG) { fail(`找不到 slug=${SLUG}`); continue; }

  // 除目標外全量快照 (後斷言: 其餘字節級不變)
  const untouchedBefore = isArr
    ? JSON.stringify(data.filter((_, i) => i !== tIdx))
    : JSON.stringify(Object.fromEntries(Object.entries(data).filter(([k]) => k !== tKey)));

  const oldContent = post.content;
  const faqBlock = blocks[LOCALES.indexOf(loc)];

  // ---- 前斷言 ----
  if (!oldContent.startsWith('<script')) { fail('content 索引 0 非 <script>, 內嵌塊邊界假設失效'); locFail = true; }
  const scriptEnd = oldContent.indexOf('</script>');
  if (scriptEnd < 0) { fail('找不到 </script>'); locFail = true; }
  const afterStrip = oldContent.slice(oldContent.indexOf('</script>\n') + '</script>\n'.length);
  if (!afterStrip.startsWith('<h2 id="key-numbers">')) { fail('剝離後未以 <h2 id="key-numbers"> 開頭'); locFail = true; }
  if (oldContent.includes('<strong>Q1:') || oldContent.includes('<strong>Q1：')) { fail('已有 FAQ, 重複應用 (冪等攔截)'); locFail = true; }
  const anchorIdx = oldContent.lastIndexOf(CTA_ANCHOR);
  if (anchorIdx < 0 || oldContent.length - anchorIdx > 800) { fail('文末 CTA 錨點缺失或不唯一區域'); locFail = true; }
  if (locFail) continue;

  // ---- 變換 ----
  const newContent = afterStrip.slice(0, anchorIdx) + faqBlock + '\n\n' + afterStrip.slice(anchorIdx);
  const faqCount = (newContent.match(PROD_RE) || []).length;
  const inlineTypes = (newContent.split('"@type"').length - 1);
  if (faqCount !== 6) { fail(`後斷言: FAQ 解析 ${faqCount} ≠ 6`); failures++; continue; }
  if (inlineTypes !== 0) { fail(`後斷言: 內嵌 @type 殘留 ${inlineTypes}`); failures++; continue; }
  ok(`變換通過: 剝離內嵌 JSON-LD, 插入 FAQ 6 組, content ${oldContent.length} → ${newContent.length} 字符`);

  // ---- 最小 diff 替換 (禁整檔重序列化) ----
  const needle = JSON.stringify(oldContent);
  if ((raw.split(needle).length - 1) !== 1) { fail('舊 content 序列化串在檔案中非唯一出現, 拒絕字串替換'); failures++; continue; }
  const newContentNeedle = JSON.stringify(newContent);
  const newRaw = raw.replace(needle, newContentNeedle);
  // lastUpdated 同步 (內容已實質變更, dateModified 不可滯留 — 「已施加≠已生效」同族)
  // ⚠️ 作用域限定: replace() 預設改全文首個命中, 同日期 lastUpdated 在其他 post 存在
  //    (dry-run 實測攔下此 bug) ⇒ 只改「目標 content 之後」的第一個 dateNeedle
  const dateNeedle = `"lastUpdated": "${post.lastUpdated}"`;
  const scopeFrom = newRaw.indexOf(newContentNeedle);
  const datePos = newRaw.indexOf(dateNeedle, scopeFrom);
  if (datePos < 0) { fail(`目標範圍內 lastUpdated 錨點 "${post.lastUpdated}" 未命中`); failures++; continue; }
  const finalRaw = newRaw.slice(0, datePos) + `"lastUpdated": "${NEW_DATE}"` + newRaw.slice(datePos + dateNeedle.length);

  // ---- 全檔後斷言 ----
  const verify = JSON.parse(finalRaw);
  const vUntouched = isArr
    ? JSON.stringify(verify.filter((_, i) => i !== tIdx))
    : JSON.stringify(Object.fromEntries(Object.entries(verify).filter(([k]) => k !== tKey)));
  if (vUntouched !== untouchedBefore) { fail('其他 post 被波及 (深度比對不一致), 中止本語'); failures++; continue; }
  const vTarget = isArr ? verify[tIdx] : verify[tKey];
  if (vTarget.lastUpdated !== NEW_DATE) { fail('lastUpdated 未生效'); failures++; continue; }
  ok('全檔後斷言通過: 其他 post 深度不變, lastUpdated 已更新');

  if (!APPLY) {
    console.log(`  [dry-run] 不寫入. --apply 後將改寫 ${path.relative(ROOT, file)}`);
    continue;
  }
  const bak = path.join(ROOT, '.hermes', `_bak-blogdata-${loc}-before-faq-20260920.json`);
  fs.writeFileSync(bak, raw);
  if (fs.readFileSync(bak, 'utf8') !== raw) { fail('備份寫入驗證失敗 (Copy-Item 靜默失敗前科), 中止'); continue; }
  fs.writeFileSync(file, finalRaw);
  ok(`已寫入 ${path.relative(ROOT, file)} (備份: ${path.relative(ROOT, bak)})`);
}

console.log(`\n${APPLY ? 'APPLY' : 'DRY-RUN'} 完成: ${failures ? `🔴 ${failures} 項失敗` : '✅ 全部斷言通過'}`);
console.log('落地後必跑: node scripts/guards/blog-data-integrity-guard.js && npx tsx scripts/moq10-books-context-scan.ts --gate --staged && git add 後 git diff --cached --name-status 複核再 commit');
process.exit(failures ? 1 : 0);
