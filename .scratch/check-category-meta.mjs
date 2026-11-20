import fs from 'node:fs';
const raw = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
// 结构与 sku-seo-data 类似：提取 export 的主对象
const m = raw.match(/export const (\w+)\s*(:\s*[^{]+)?=\s*\{/);
const start = raw.indexOf('{', raw.indexOf('='));
// 从后往前找 "\n};" 或 "\n};"
let end = raw.lastIndexOf('};');
const strip = (s) => {
  let o = '', iS = false, e = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (e) { o += c; e = false; continue; }
    if (c === '\\' && iS) { o += c; e = true; continue; }
    if (c === '"') { iS = !iS; o += c; continue; }
    if (c === "'") { iS = !iS; o += c; continue; } // 容忍单引号键
    if (c === ',' && !iS) { let j = i + 1; while (j < s.length && /\s/.test(s[j])) j++; if (s[j] === '}' || s[j] === ']') continue; }
    o += c;
  }
  return o;
};
// 键可能是单引号 → 统一转双引号（仅在字符串外替换 ' 为 " 不行；改用宽松策略：先尝试直接 parse 失败则转换）
let literal = raw.slice(start, end + 1);
let data;
try {
  data = JSON.parse(strip(literal));
} catch (err) {
  // 单引号键/值容忍：把字符串外的单引号键转换为双引号
  const fix = (s) => {
    let o = '', iS = false, e = false, prev = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (e) { o += c; e = false; prev = c; continue; }
      if (c === '\\' && iS) { o += c; e = true; prev = c; continue; }
      if (c === '"') { iS = !iS; o += c; prev = c; continue; }
      if (c === "'" && !iS) {
        // 键位置：前一个非空白是 { 或 ,  → 开引号；否则可能仍是字符串（容忍按字符串处理）
        let j = o.length - 1;
        while (j >= 0 && /\s/.test(o[j])) j--;
        if (o[j] === '{' || o[j] === ',') { o += '"'; iS = true; prev = c; continue; }
      }
      o += c; prev = c;
    }
    return o;
  };
  data = JSON.parse(fix(strip(literal)));
}

const LOCS = ['zh-hk', 'en', 'ja'];
const CATS = ['calendars', 'posters', 'stickers', 'flyers', 'packaging', 'paper-bags', 'menus', 'books', 'red-packets', 'envelopes', 'educational', 'banners', 'greeting-cards', 'wedding-invitations', 'japan-doujin'];
for (const cat of CATS) {
  const entry = data[cat];
  if (!entry) { console.log(`\n### ${cat}: NOT FOUND`); continue; }
  console.log(`\n### ${cat}`);
  for (const loc of LOCS) {
    const l = entry[loc];
    if (!l) { console.log(`  [${loc}] —`); continue; }
    const title = l.metaTitle || l.title || l.seoTitle || '';
    const desc = l.metaDescription || l.description || '';
    console.log(`  [${loc}] T(${title.length}): ${String(title).slice(0, 90)}`);
    if (desc) console.log(`    D(${desc.length}): ${String(desc).slice(0, 90)}`);
  }
}
