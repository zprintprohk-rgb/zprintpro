#!/usr/bin/env node
/* 只读: 取月曆 pillar (zh-hk/en/ja) slug + 指纹/名片 探针目标 URL */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\src\\data\\blog-data\\';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(ROOT + loc + '.json', 'utf8'));
  const posts = Array.isArray(j) ? j : (j.posts || Object.values(j)[0]);
  const list = Array.isArray(posts) ? posts : [];
  console.log(`\n=== ${loc} (${list.length} posts) ===`);
  // 月曆 pillar
  const cal = list.filter(p => /calendar|月曆|暦|カレンダー/i.test((p.slug || '') + (p.title || '')));
  cal.slice(0, 4).forEach(p => console.log(`  [cal] ${p.slug} | ${(p.title || '').slice(0, 70)} | words=${((p.content || '').length)}`));
  // 指纹词残留检查
  const fp = ['18,500', 'linkedin', 'LinkedIn'];
  fp.forEach(k => {
    const hits = list.filter(p => JSON.stringify(p).includes(k)).length;
    if (hits) console.log(`  [FP] ${k}: ${hits} posts`);
  });
}
