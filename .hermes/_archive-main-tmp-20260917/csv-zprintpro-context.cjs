#!/usr/bin/env node
/* 只读: CSV 6 行的 desc/body 内 ZprintPro 上下文 (为写精确替换规则) */
const fs = require('fs');
const csvRaw = fs.readFileSync('F:\\zprintpro-main-tmp\\zprintpro-sku-seo-data.csv', 'utf8').replace(/\r/g, '');
const lines = csvRaw.split('\n').filter(l => l.trim());
const hdr = lines[0].split('\t');
const iT = hdr.indexOf('SEO标题(ZH)'), iD = hdr.indexOf('SEO描述(ZH)'), iB = hdr.indexOf('正文内容优化(ZH)'), iA = hdr.indexOf('图片Alt标签(ZH)'), iSlug = hdr.indexOf('Slug');
lines.slice(1).forEach((l, idx) => {
  const c = l.split('\t');
  const fields = { title: c[iT] || '', desc: c[iD] || '', body: c[iB] || '' };
  const any = Object.values(fields).some(v => /ZprintPro/.test(v));
  if (!any) return;
  console.log(`\n--- row${idx + 2} slug=${c[iSlug]} ---`);
  for (const [k, v] of Object.entries(fields)) {
    if (!/ZprintPro/.test(v)) continue;
    const i = v.indexOf('ZprintPro');
    console.log(`  ${k}: …${v.slice(Math.max(0, i - 30), i + 40)}…`);
  }
  console.log(`  alt: ${(c[iA] || '').slice(-45)}`);
});
