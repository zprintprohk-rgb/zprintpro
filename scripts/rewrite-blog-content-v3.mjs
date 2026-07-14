// Robust rewrite: process LOCALE in dependency order (zh-hk first, then en, then ja),
// but each locale section is processed in isolation with fresh indices.
// Do buying-guides.ts separately.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PAGE_FILE = 'src/app/[locale]/blog/[slug]/page.tsx';
const BG_FILE = 'src/data/buying-guides.ts';
const CONTENT_DIR = path.join(ROOT, 'scripts', 'content-data');

const jsonFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
const CONTENT_MAP = {};
for (const f of jsonFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8'));
  const articles = Array.isArray(data) ? data : [data];
  for (const article of articles) {
    if (article.slug) CONTENT_MAP[article.slug] = article;
  }
}
console.log(`Loaded ${Object.keys(CONTENT_MAP).length} articles`);

const REQUIRED = [
  'company-intro','sticker-guide','business-card-design','packaging-trends','cmyk-guide','paper-materials','eco-printing','hong-kong-printing-guide','design-file-specs','brand-materials-checklist','mtr-advertising-specs',
  'business-card-buying-guide','sticker-buying-guide','flyer-buying-guide','packaging-buying-guide','poster-buying-guide','paper-bag-buying-guide','banner-buying-guide','book-buying-guide','menu-buying-guide',
];

function render(slug, loc) {
  const a = CONTENT_MAP[slug];
  if (!a) return '';
  const block = a[loc];
  if (!block || !block.sections) return '';
  const intro = a.intro?.[loc] || '';
  const sections = block.sections;
  const TBL = (rows, headers) => `<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100">${
    (headers || []).map(h => `<th class="border p-2 text-left">${h}</th>`).join('')
  }</tr></thead><tbody>${
    rows.map(r => `<tr>${r.map(c => `<td class="border p-2">${c}</td>`).join('')}</tr>`).join('')
  }</tbody></table>`;
  const UL = items => `<ul class="list-disc pl-5 my-3 space-y-1">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const OL = items => `<ol class="list-decimal pl-5 my-3 space-y-1">${items.map(i => `<li>${i}</li>`).join('')}</ol>`;
  const FAQ = qas => `<div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3">${qas.map(qa => `<p><strong>Q：${qa.q}</strong><br/>A：${qa.a}</p>`).join('')}</div>`;
  const out = [`<p>${intro}</p>`];
  for (const s of sections) {
    if (s.tag === 'p') out.push(`<p>${s.body}</p>`);
    else if (s.tag === 'h3') out.push(`<h3>${s.body}</h3>`);
    else if (s.tag === 'h4') out.push(`<h4>${s.body}</h4>`);
    else if (s.tag === 'ul') out.push(UL(s.items));
    else if (s.tag === 'ol') out.push(OL(s.items));
    else if (s.tag === 'table') out.push(TBL(s.rows, s.headers));
    else if (s.tag === 'faq') out.push(FAQ(s.qas));
  }
  return out.join('\n');
}

// === REWRITE page.tsx ===
// Process ONE locale at a time, completely replacing it within the source.
// Then move to next locale.
function rewritePage() {
  let src = fs.readFileSync(PAGE_FILE, 'utf-8');
  const legacySlugs = REQUIRED.slice(0, 11);
  let count = 0;
  const postsStart = src.indexOf('const posts:');
  if (postsStart < 0) { console.error('cannot find posts'); return; }

  for (const loc of ['zh-hk', 'en', 'ja']) {
    // Locate this locale section's start
    const quotedIdx = src.indexOf("'" + loc + "': {", postsStart);
    const unquotedIdx = src.indexOf(loc + ": {", postsStart);
    let secStart = -1;
    let openBraceOffset = 0;
    if (quotedIdx > 0 && /\s/.test(src[quotedIdx - 1])) {
      secStart = quotedIdx;
      openBraceOffset = ("'" + loc + "': ").length;
    } else if (unquotedIdx > 0 && /\s/.test(src[unquotedIdx - 1])) {
      secStart = unquotedIdx;
      openBraceOffset = (loc + ": ").length;
    }
    if (secStart < 0) { console.warn(loc, 'no section'); continue; }

    // Find secEnd via brace counting starting AFTER the '{'
    const openBrace = secStart + openBraceOffset;
    let depth = 1;
    let pos = openBrace + 1;
    while (pos < src.length && depth > 0) {
      const ch = src[pos];
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      pos++;
    }
    const secEnd = pos; // exclusive

    const secText = src.slice(secStart, secEnd);

    // Within secText, for each legacy slug, find content: `\`` block and replace it.
    let newSec = secText;
    for (const slug of legacySlugs) {
      // Slug key may be quoted or unquoted
      let slugKeyStart = newSec.indexOf("'" + slug + "': {");
      if (slugKeyStart < 0) slugKeyStart = newSec.indexOf(slug + ': {');
      if (slugKeyStart < 0) continue;
      const cIdx = newSec.indexOf('content: `', slugKeyStart);
      if (cIdx < 0) continue;
      const contentStart = cIdx + 'content: `'.length;
      let i = contentStart;
      while (i < newSec.length && newSec[i] !== '`') i++;
      const contentEnd = i;
      const newHtml = render(slug, loc);
      if (!newHtml) continue;
      newSec = newSec.slice(0, contentStart) + newHtml + newSec.slice(contentEnd);
      count++;
    }

    // Splice newSec back into src
    src = src.slice(0, secStart) + newSec + src.slice(secEnd);
  }

  fs.writeFileSync(PAGE_FILE, src, 'utf-8');
  console.log(`page.tsx: rewrote ${count} blocks (expected ${legacySlugs.length * 3})`);
}

function rewriteBG() {
  let src = fs.readFileSync(BG_FILE, 'utf-8');
  const bgSlugs = REQUIRED.slice(11);
  let count = 0;
  for (const slug of bgSlugs) {
    const slugMarker = "slug: '" + slug + "',";
    const slugIdx = src.indexOf(slugMarker);
    if (slugIdx < 0) continue;
    const cMarker = 'content: {';
    const cIdx = src.indexOf(cMarker, slugIdx);
    if (cIdx < 0) continue;
    const blockStart = cIdx + cMarker.length;
    let depth = 1;
    let i = blockStart;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      i++;
    }
    const blockEnd = i;

    const locales = ['zh-hk', 'en', 'ja'];
    const newHtmls = locales.map(loc => render(slug, loc));
    if (newHtmls.some(h => !h)) continue;

    const newBlockParts = locales.map((loc, idx) => `'${loc}': \`${newHtmls[idx]}\``);
    const newBlock = '\n      ' + newBlockParts.join(',\n      ') + '\n    ';
    src = src.slice(0, blockStart) + newBlock + src.slice(blockEnd);
    count += 3;
  }
  fs.writeFileSync(BG_FILE, src, 'utf-8');
  console.log(`buying-guides.ts: rewrote ${count} blocks (expected ${bgSlugs.length * 3})`);
}

rewritePage();
rewriteBG();
console.log('Done.');
