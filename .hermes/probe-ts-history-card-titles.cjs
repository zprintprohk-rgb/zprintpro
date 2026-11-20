#!/usr/bin/env node
/* 只读: 逐 commit 检查 sku-seo-data.ts 中 2 个名片 title 的尾缀 (定位线上为何是 ZprintPro) */
const { execSync } = require('child_process');
const ROOT = 'F:\\zprintpro-main-tmp';
const SHAS = ['8de45a05', 'caedc4f7', 'fb6b0bbe', '58356a34', '202e7698'];
for (const sha of SHAS) {
  let blob = '';
  try { blob = execSync(`git show ${sha}:src/data/sku-seo-data.ts`, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }); }
  catch (e) { console.log(`${sha}: (读取失败 ${e.message.slice(0, 60)})`); continue; }
  const lines = blob.split(/\r?\n/);
  const cardTitles = lines.filter(l => /"title":/.test(l) && /名片/.test(l)).map(l => l.trim().slice(0, 90));
  const entries = (blob.match(/^  "[a-z0-9-]+":\s*\{/gm) || []).length;
  console.log(`\n=== ${sha} === entries=${entries} keys=${(blob.match(/": \{/g) || []).length} titles=${(blob.match(/"title":/g) || []).length}`);
  cardTitles.forEach(t => console.log(`   ${t}`));
}
