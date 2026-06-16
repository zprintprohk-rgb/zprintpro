// audit-content-meta.mjs
import fs from 'node:fs';

const productsText = fs.readFileSync('src/data/products.ts', 'utf8');

// 找所有 slug 块的位置
const slugRe = /slug:\s*'([^']+)'/g;
const slugPositions = [];
let m;
while ((m = slugRe.exec(productsText)) !== null) {
  slugPositions.push({ slug: m[1], pos: m.index });
}
slugPositions.push({ slug: null, pos: productsText.length }); // 哨兵

// 提取 longDescriptionEn
const longDescMap = {};
for (let i = 0; i < slugPositions.length - 1; i++) {
  const { slug, pos } = slugPositions[i];
  const nextPos = slugPositions[i + 1].pos;
  const block = productsText.substring(pos, nextPos);
  // 匹配: longDescriptionEn: `...`
  const ldMatch = block.match(/longDescriptionEn:\s*`([\s\S]+?)`(?=\s*,?\s*(?:longDescriptionJa:|seo:|category_slug:|slug:|\n\s*\},))/);
  if (ldMatch) {
    const content = ldMatch[1];
    longDescMap[slug] = {
      chars: content.length,
      h3Count: (content.match(/<h3>/g) || []).length,
      hasTable: /<table/.test(content),
      hasFaq: /<details|<summary>|Frequently Asked/i.test(content),
      hasNap: /ZprintPro|智印雲|contact@/i.test(content),
      preview: content.substring(0, 120).replace(/\n/g, ' '),
    };
  } else {
    // 备选: 找 longDescriptionEn: 后第一个 backtick 块
    const alt = block.match(/longDescriptionEn:\s*`([\s\S]+?)`/);
    if (alt) {
      const content = alt[1];
      longDescMap[slug] = {
        chars: content.length,
        h3Count: (content.match(/<h3>/g) || []).length,
        hasTable: /<table/.test(content),
        hasFaq: /FAQ|faq/i.test(content),
        hasNap: /ZprintPro|智印雲|contact@/i.test(content),
        preview: content.substring(0, 120).replace(/\n/g, ' '),
      };
    }
  }
}

// 提取 sku-seo-data.ts
const seoText = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const slugSeoRe = /^\s+'([a-z0-9-]+)':\s*\{/gm;
const seoEntries = [];
while ((m = slugSeoRe.exec(seoText)) !== null) {
  seoEntries.push({ slug: m[1], pos: m.index });
}
const seoMap = {};
for (let i = 0; i < seoEntries.length; i++) {
  const { slug, pos } = seoEntries[i];
  const nextPos = i + 1 < seoEntries.length ? seoEntries[i + 1].pos : seoText.length;
  const block = seoText.substring(pos, nextPos);
  const enMatch = block.match(/en:\s*\{([\s\S]+?)\}\s*,?\s*zh:\s*\{/);
  if (enMatch) {
    const enBlock = enMatch[1];
    const titleMatch = enBlock.match(/title:\s*'([^']+)'/);
    const descMatch = enBlock.match(/description:\s*'([^']+)'/);
    const h1Match = enBlock.match(/h1:\s*'([^']+)'/);
    const kwMatch = enBlock.match(/keywords:\s*\[([^\]]*)\]/);
    const kwCount = kwMatch ? Math.floor((kwMatch[1].match(/'/g) || []).length / 2) : 0;
    seoMap[slug] = {
      titleLen: titleMatch ? titleMatch[1].length : 0,
      descLen: descMatch ? descMatch[1].length : 0,
      h1Len: h1Match ? h1Match[1].length : 0,
      kwCount,
      title: titleMatch ? titleMatch[1] : '',
    };
  }
}

const allSlugs = new Set([...Object.keys(longDescMap), ...Object.keys(seoMap)]);
const buckets = { textbook: [], good_content: [], short_content: [], no_content: [] };
const metaBuckets = { good_meta: [], bad_meta: [], no_meta: [] };

[...allSlugs].sort().forEach(slug => {
  const c = longDescMap[slug];
  const s = seoMap[slug];
  if (c) {
    if (c.chars > 4000 && c.h3Count >= 5 && c.hasTable && c.hasFaq) buckets.textbook.push(slug);
    else if (c.chars > 2000) buckets.good_content.push(slug);
    else buckets.short_content.push(slug);
  } else {
    buckets.no_content.push(slug);
  }
  const metaGood = s && s.titleLen >= 48 && s.titleLen <= 60 && s.descLen >= 150 && s.descLen <= 160 && s.h1Len >= 30 && s.h1Len <= 50 && s.kwCount >= 8;
  if (metaGood) metaBuckets.good_meta.push(slug);
  else if (s) metaBuckets.bad_meta.push(slug);
  else metaBuckets.no_meta.push(slug);
});

const out = [];
out.push('===== longDescriptionEn (content 层) =====');
out.push(`教科书级 (5+H3 + table + FAQ + >4000 chars): ${buckets.textbook.length}`);
out.push(`中等 (>2000 chars): ${buckets.good_content.length}`);
out.push(`短 (<2000 chars): ${buckets.short_content.length}`);
out.push(`无 content: ${buckets.no_content.length}`);
out.push('');
out.push('===== sku-seo-data.ts seo.en (meta 层) =====');
out.push(`完整 (title48-60/desc150-160/h1 30-50/kw≥8): ${metaBuckets.good_meta.length}`);
out.push(`不完整: ${metaBuckets.bad_meta.length}`);
out.push(`无 meta: ${metaBuckets.no_meta.length}`);
out.push('');
out.push('===== 教科书级 (' + buckets.textbook.length + ' 个) =====');
buckets.textbook.forEach(s => out.push(`  ${s} - ${longDescMap[s].chars}c / ${longDescMap[s].h3Count}H3 / ${longDescMap[s].preview}...`));
out.push('');
out.push('===== 中等充实 (' + buckets.good_content.length + ' 个) =====');
buckets.good_content.forEach(s => out.push(`  ${s} - ${longDescMap[s].chars}c / ${longDescMap[s].h3Count}H3`));
out.push('');
out.push('===== 短 content (' + buckets.short_content.length + ' 个) =====');
buckets.short_content.forEach(s => out.push(`  ${s} - ${longDescMap[s].chars}c / ${longDescMap[s].h3Count}H3`));
out.push('');
out.push('===== 无 content (' + buckets.no_content.length + ' 个) =====');
buckets.no_content.forEach(s => out.push(`  ${s}`));
out.push('');
out.push('===== 不完整 meta (' + metaBuckets.bad_meta.length + ' 个) =====');
metaBuckets.bad_meta.forEach(s => {
  const m = seoMap[s];
  out.push(`  ${s} - t=${m.titleLen} d=${m.descLen} h1=${m.h1Len} kw=${m.kwCount} | "${m.title}"`);
});
out.push('');
out.push('===== 无 meta (' + metaBuckets.no_meta.length + ' 个) =====');
metaBuckets.no_meta.forEach(s => out.push(`  ${s}`));

fs.writeFileSync('audit-batch-b.txt', out.join('\n'), 'utf8');
console.log(out.join('\n'));
