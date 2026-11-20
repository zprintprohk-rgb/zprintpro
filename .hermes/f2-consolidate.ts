/* F2 合并器: .hermes/f2-outputs/*.json (63 个 en body) → sku-seo-data.ts
   逻辑: 命中 entry 的 seo.en 块 → 替换/补 body; 无 en 块 → 补建 (title/desc/h1 空串安全回退 products.ts)
   用法: npx tsx .hermes/f2-consolidate.ts */
import * as fs from 'fs';
import * as path from 'path';

const FILE = 'src/data/sku-seo-data.ts';
const OUT_DIR = path.resolve(__dirname, 'f2-outputs');
const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;

let ts = fs.readFileSync(FILE, 'utf8');
const outputs: { slug: string; body: string }[] = [];
for (const fn of fs.readdirSync(OUT_DIR)) {
  if (!fn.endsWith('.json')) continue;
  const o = JSON.parse(fs.readFileSync(path.join(OUT_DIR, fn), 'utf8'));
  outputs.push(o);
}
console.log('outputs:', outputs.length);

function blockAt(src: string, start: number): number {
  // 从 { 开始找匹配的 }
  let depth = 0, i = start;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) return i; }
  }
  return -1;
}
function findKey(src: string, key: string, from: number, to: number): number {
  const re = new RegExp('"' + key + '"\\s*:');
  const m = re.exec(src.slice(from, to));
  return m ? from + m.index : -1;
}

const report: { slug: string; action: string; words: number }[] = [];
let replaced = 0, addedBlock = 0, addedEn = 0;

for (const o of outputs) {
  const slug = o.slug;
  const bodyJson = JSON.stringify(o.body); // 带引号的转义字符串
  const entryRe = new RegExp('"' + slug + '"\\s*:\\s*\\{');
  const em = entryRe.exec(ts);
  if (!em) { report.push({ slug, action: 'NO-ENTRY', words: wc(o.body) }); continue; }
  const entryEnd = blockAt(ts, em.index + em[0].length - 1);
  if (entryEnd < 0) { report.push({ slug, action: 'BAD-ENTRY', words: wc(o.body) }); continue; }

  const seoIdx = findKey(ts, 'seo', em.index, entryEnd);
  if (seoIdx < 0) { report.push({ slug, action: 'NO-SEO', words: wc(o.body) }); continue; }
  const seoOpen = ts.indexOf('{', seoIdx);
  const seoEnd = blockAt(ts, seoOpen);
  if (seoEnd < 0) { report.push({ slug, action: 'BAD-SEO', words: wc(o.body) }); continue; }

  const enIdx = findKey(ts, 'en', seoOpen, seoEnd);
  if (enIdx >= 0) {
    const enOpen = ts.indexOf('{', enIdx);
    const enEnd = blockAt(ts, enOpen);
    if (enEnd < 0) { report.push({ slug, action: 'BAD-EN', words: wc(o.body) }); continue; }
    const bodyKey = findKey(ts, 'body', enOpen, enEnd);
    if (bodyKey >= 0) {
      // 替换 en.body
      const bodyValStart = ts.indexOf(':', bodyKey) + 1;
      const valStart = ts.slice(bodyValStart).search(/"|'/);
      const quote = ts[bodyValStart + valStart];
      const bodyValEnd = ts.indexOf(quote, bodyValStart + valStart + 1);
      ts = ts.slice(0, bodyValStart + valStart) + bodyJson + ts.slice(bodyValEnd + 1);
      replaced++;
      report.push({ slug, action: 'REPLACE', words: wc(o.body) });
    } else {
      // en 块存在但无 body → 补 body
      ts = ts.slice(0, enOpen + 1) + '\n        "body": ' + bodyJson + ',' + ts.slice(enOpen + 1);
      addedBlock++;
      report.push({ slug, action: 'ADD-BODY', words: wc(o.body) });
    }
  } else {
    // 无 en 块 → 在 seo 末尾补建 en (title/desc/h1 空串安全回退)
    const insert = '\n      "en": {\n        "title": "",\n        "description": "",\n        "h1": "",\n        "keywords": [],\n        "body": ' + bodyJson + '\n      },\n    ';
    ts = ts.slice(0, seoEnd) + insert + ts.slice(seoEnd);
    addedEn++;
    report.push({ slug, action: 'ADD-EN', words: wc(o.body) });
  }
}

fs.writeFileSync(FILE, ts, 'utf8');
console.log(`replaced=${replaced} addBody=${addedBlock} addEn=${addedEn}`);
const failed = report.filter((r) => r.action.startsWith('BAD') || r.action === 'NO-ENTRY' || r.action === 'NO-SEO');
console.log('failed:', failed.length ? JSON.stringify(failed) : '(none)');
console.log('min words:', Math.min(...report.map((r) => r.words)), 'max:', Math.max(...report.map((r) => r.words)));
