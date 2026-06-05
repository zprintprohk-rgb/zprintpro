/**
 * 把 zprintpro-sku-seo-data.csv 转成 src/data/sku-seo-data.ts
 * 用法：node scripts/csv-to-sku-seo.mjs
 * 输出：src/data/sku-seo-data.ts (slug → {zh-hk, en, ja} → SEO metadata)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CSV = fs.readFileSync(path.join(ROOT, 'zprintpro-sku-seo-data.csv'), 'utf-8');

// 简单 CSV 解析（处理引号和制表符两种分隔符）
function parseCsvLine(line) {
  const cells = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuote = !inQuote;
    } else if (ch === ',' && !inQuote) {
      cells.push(cur);
      cur = '';
    } else if (ch === '\t' && !inQuote) {
      cells.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells;
}

const lines = CSV.split(/\r?\n/).filter((l) => l.trim());
const header = parseCsvLine(lines[0]);
// 列: 产品名称(ZH), 产品名称(EN), 产品名称(JA), Slug, 权重, SEO标题3语, SEO关键词3语, SEO描述3语, H1标题3语, 正文内容3语, FAQ3个, 图片文件名, 图片Alt3语, 内部链接建议

const col = (name) => header.findIndex((h) => h.includes(name));
const idx = {
  nameZh: col('产品名称(ZH)'),
  nameEn: col('产品名称(EN)'),
  nameJa: col('产品名称(JA)'),
  slug: col('Slug'),
  titleZh: col('SEO标题(ZH)'),
  titleEn: col('SEO标题(EN)'),
  titleJa: col('SEO标题(JA)'),
  kwZh: col('SEO关键'),
  kwEn: col('SEO关键'),
  kwJa: col('SEO关键'),
  descZh: col('SEO描述(ZH)'),
  descEn: col('SEO描述(EN)'),
  descJa: col('SEO描述(JA)'),
  h1Zh: col('H1标题(ZH)'),
  h1En: col('H1标题(EN)'),
  h1Ja: col('H1标题(JA)'),
  bodyZh: col('正文内容优化(ZH)'),
  bodyEn: col('正文内容优化(EN)'),
  bodyJa: col('正文内容优化(JA)'),
  faqQ1Zh: col('FAQ问题1(ZH)'),
  faqA1Zh: col('FAQ答案1(ZH)'),
  faqQ2Zh: col('FAQ问题2(ZH)'),
  faqA2Zh: col('FAQ答案2(ZH)'),
  faqQ3Zh: col('FAQ问题3(ZH)'),
  faqA3Zh: col('FAQ答案3(ZH)'),
  altZh: col('图片Alt标签(ZH)'),
  altEn: col('图片Alt标签(EN)'),
  altJa: col('图片Alt标签(JA)'),
};

const out = {};
for (let i = 1; i < lines.length; i++) {
  const row = parseCsvLine(lines[i]);
  if (row.length < 5) continue;
  const slug = row[idx.slug];
  if (!slug) continue;
  const pick = (lang) => ({
    title: lang === 'zh-hk' ? row[idx.titleZh] : lang === 'en' ? row[idx.titleEn] : row[idx.titleJa],
    description: lang === 'zh-hk' ? row[idx.descZh] : lang === 'en' ? row[idx.descEn] : row[idx.descJa],
    h1: lang === 'zh-hk' ? row[idx.h1Zh] : lang === 'en' ? row[idx.h1En] : row[idx.h1Ja],
    keywords: (lang === 'zh-hk' ? row[idx.kwZh] : lang === 'en' ? row[idx.kwEn] : row[idx.kwJa])?.split(/[,，]/).map((s) => s.trim()).filter(Boolean) || [],
    body: lang === 'zh-hk' ? row[idx.bodyZh] : lang === 'en' ? row[idx.bodyEn] : row[idx.bodyJa],
  });
  out[slug] = {
    name: { 'zh-hk': row[idx.nameZh], en: row[idx.nameEn], ja: row[idx.nameJa] },
    seo: {
      'zh-hk': pick('zh-hk'),
      en: pick('en'),
      ja: pick('ja'),
    },
    faqs: [
      { q: row[idx.faqQ1Zh], a: row[idx.faqA1Zh] },
      { q: row[idx.faqQ2Zh], a: row[idx.faqA2Zh] },
      { q: row[idx.faqQ3Zh], a: row[idx.faqA3Zh] },
    ],
    imageAlt: { 'zh-hk': row[idx.altZh], en: row[idx.altEn], ja: row[idx.altJa] },
  };
}

const ts = `/**
 * 从 zprintpro-sku-seo-data.csv 自动生成（运行 \`node scripts/csv-to-sku-seo.mjs\` 更新）
 * 79 个 SKU 的 SEO 增强数据
 */
import { Locale } from '@/types/locale';

export interface SkuSeoEntry {
  name: Record<Locale, string>;
  seo: Record<Locale, { title: string; description: string; h1: string; keywords: string[]; body: string }>;
  faqs: Array<{ q: string; a: string }>;
  imageAlt: Record<Locale, string>;
}

export const skuSeoData: Record<string, SkuSeoEntry> = ${JSON.stringify(out, null, 2)};

export function getSkuSeo(slug: string): SkuSeoEntry | undefined {
  return skuSeoData[slug];
}
`;

const outPath = path.join(ROOT, 'src', 'data', 'sku-seo-data.ts');
fs.writeFileSync(outPath, ts, 'utf-8');
console.log(`[csv-to-sku-seo] Wrote ${outPath} with ${Object.keys(out).length} entries`);
