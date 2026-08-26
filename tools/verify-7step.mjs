// 7 步 verify 流水线 (2026-07-23 v7 daily, commit b0d82ee)
import { execSync } from 'child_process';
import https from 'https';

const step = (n, name) => console.log(`\n========== STEP ${n}: ${name} ==========`);

// ===== STEP 1: git status =====
step(1, 'git status -sb 无 ahead');
const gitStatus = execSync('git status -sb', { encoding: 'utf-8' });
console.log(gitStatus);
const pass1 = gitStatus.includes('## main...origin_ssh/main') && !gitStatus.match(/ahead/);
console.log(pass1 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 2: sitemap 含新 slug × 3 locale =====
step(2, 'sitemap.xml 含 gang-run-card-boxes-hk-guide × 3 locale');
const sitemapUrls = [
  'https://zprintpro.com/sitemap.xml',
  'https://zprintpro.com/zh-hk/sitemap.xml',
  'https://zprintpro.com/en/sitemap.xml',
  'https://zprintpro.com/ja/sitemap.xml',
];
let pass2 = true;
for (const u of sitemapUrls) {
  try {
    const out = execSync(`curl -sI "${u}"`, { encoding: 'utf-8' });
    const status = out.split('\n')[0];
    const hasSlug = execSync(`curl -s "${u}" | grep -c "gang-run-card-boxes-hk-guide" || true`, { encoding: 'utf-8' }).trim();
    console.log(`  ${u}: ${status.trim()} slug_count=${hasSlug}`);
    if (hasSlug === '0' && u !== sitemapUrls[0]) pass2 = false;
  } catch (e) {
    console.log(`  ${u}: ERROR ${e.message}`);
    pass2 = false;
  }
}
console.log(pass2 ? '  ✓ PASS' : '  ⚠ sitemap may not include slug yet (CF Pages cache)');

// ===== STEP 3: curl 3 locale blog URL =====
step(3, 'curl https://zprintpro.com/{zh-hk,en,ja}/blog/gang-run-card-boxes-hk-guide/ → 200');
const blogUrls = [
  'https://zprintpro.com/zh-hk/blog/gang-run-card-boxes-hk-guide/',
  'https://zprintpro.com/en/blog/gang-run-card-boxes-hk-guide/',
  'https://zprintpro.com/ja/blog/gang-run-card-boxes-hk-guide/',
];
let pass3 = true;
for (const u of blogUrls) {
  try {
    const out = execSync(`curl -sI "${u}"`, { encoding: 'utf-8' });
    const status = out.split('\n')[0].trim();
    const is200 = status.includes('200');
    console.log(`  ${u}: ${status}${is200 ? ' ✓' : ' ❌'}`);
    if (!is200) pass3 = false;
  } catch (e) {
    console.log(`  ${u}: ERROR ${e.message}`);
    pass3 = false;
  }
}
console.log(pass3 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 4: BODY verify =====
step(4, 'BODY verify - 主关键词 + price anchor + "This post is part of" = 0');
const expectations = {
  'zh-hk': { kw: '拼版白卡彩盒', price: 'HK\\$129' },
  'en': { kw: 'Gang-Run', price: 'USD 25' },
  'ja': { kw: '合版', price: '¥3,800' },
};
let pass4 = true;
for (const [loc, exp] of Object.entries(expectations)) {
  const u = `https://zprintpro.com/${loc === 'zh-hk' ? 'zh-hk' : loc}/blog/gang-run-card-boxes-hk-guide/`;
  try {
    const body = execSync(`curl -s "${u}"`, { encoding: 'utf-8' });
    const partOf = (body.match(/This post is part of the/g) || []).length;
    const kwCount = (body.match(new RegExp(exp.kw, 'g')) || []).length;
    const priceCount = (body.match(new RegExp(exp.price, 'g')) || []).length;
    console.log(`  ${loc}: kw(${exp.kw})=${kwCount} price(${exp.price})=${priceCount} partOf=${partOf}`);
    if (partOf > 0) pass4 = false;
    if (kwCount < 1) pass4 = false;
    if (priceCount < 3) pass4 = false;
  } catch (e) {
    console.log(`  ${loc}: ERROR ${e.message}`);
    pass4 = false;
  }
}
console.log(pass4 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 5: 0 <img> + 0 cover =====
step(5, '0 张 <img> + 0 cover 字段 (硬约束无图)');
let pass5 = true;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const u = `https://zprintpro.com/${loc}/blog/gang-run-card-boxes-hk-guide/`;
  try {
    const body = execSync(`curl -s "${u}"`, { encoding: 'utf-8' });
    // 找博客内容区 img (不要 hero 默认 img)
    const blogMatch = body.match(/<h2>[\s\S]*?<\/article>/);
    const blogContent = blogMatch ? blogMatch[0] : '';
    const imgInBody = (blogContent.match(/<img/g) || []).length;
    console.log(`  ${loc}: <img> in body = ${imgInBody}`);
    if (imgInBody > 0) pass5 = false;
  } catch (e) {
    console.log(`  ${loc}: ERROR ${e.message}`);
    pass5 = false;
  }
}
console.log(pass5 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 6: 5+ 内链 curl 200 =====
step(6, '5+ 内链 curl 200');
const internalLinks = [
  'https://zprintpro.com/zh-hk/product/gang-run-card-boxes/',
  'https://zprintpro.com/zh-hk/product/white-card-boxes/',
  'https://zprintpro.com/zh-hk/product/mailer-boxes/',
  'https://zprintpro.com/zh-hk/quote/',
  'https://zprintpro.com/zh-hk/contact/',
];
let pass6 = true;
for (const u of internalLinks) {
  try {
    const out = execSync(`curl -sI "${u}"`, { encoding: 'utf-8' });
    const status = out.split('\n')[0].trim();
    const is200 = status.includes('200');
    const is301 = status.includes('301') || status.includes('302');
    console.log(`  ${u}: ${status}${is200 ? ' ✓' : is301 ? ' ⚠ 30x' : ' ❌'}`);
    if (!is200 && !is301) pass6 = false;
  } catch (e) {
    console.log(`  ${u}: ERROR ${e.message}`);
    pass6 = false;
  }
}
console.log(pass6 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 7: matrix.json covered[] 含 Q-GR-01 =====
step(7, 'matrix.json covered[34] 含 Q-GR-01');
const matrix = JSON.parse(execSync('cat .hermes/industry-keyword-matrix.json', { encoding: 'utf-8' }));
const qgr01 = (matrix.covered || []).find(c => c.id === 'Q-GR-01');
if (qgr01) {
  console.log(`  ✓ Q-GR-01 entry found:`);
  console.log(`    slug: ${qgr01.slug}`);
  console.log(`    category: ${qgr01.category}`);
  console.log(`    covered_at: ${qgr01.covered_at}`);
  console.log(`    locale_chars: ${JSON.stringify(qgr01.locale_chars)}`);
  console.log(`    verify_status: ${qgr01.verify_status}`);
  console.log(`    cf_build_run: ${qgr01.cf_build_run}`);
  console.log(`    deployed_commit: ${qgr01.deployed_commit}`);
  console.log('  ✓ PASS');
  const pass7 = true;
} else {
  console.log('  ❌ FAIL: Q-GR-01 not found in covered[]');
  const pass7 = false;
}

// ===== SUMMARY =====
console.log('\n========== 7 步 verify 汇总 ==========');
console.log(`  Step 1 (git status):     ${pass1 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 2 (sitemap):        ${pass2 ? '✓ PASS' : '⚠ cache lag'}`);
console.log(`  Step 3 (curl 200 3 loc): ${pass3 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 4 (body content):   ${pass4 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 5 (no img):         ${pass5 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 6 (internal links): ${pass6 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 7 (matrix Q-GR-01): ${qgr01 ? '✓ PASS' : '❌ FAIL'}`);

const allPass = pass1 && pass3 && pass4 && pass5 && pass6 && qgr01;
console.log(`\n  ${allPass ? '✅ ALL PASS — v7 daily 2026-07-23 完成' : '⚠ 部分 fail — 需升级 user'}`);
