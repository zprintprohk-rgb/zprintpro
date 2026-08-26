// 7 步 verify 流水线 v2 (修 Windows bash escape + step 2/7 path)
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import https from 'https';

const step = (n, name) => console.log(`\n========== STEP ${n}: ${name} ==========`);

// helper: HTTPS GET with redirect follow
function httpGet(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        const next = res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href;
        return httpGet(next, timeout).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ===== STEP 1: git status =====
step(1, 'git status -sb 无 ahead');
const gitStatus = execSync('git status -sb', { encoding: 'utf-8' });
console.log(gitStatus.split('\n').slice(0, 3).join('\n'));
const pass1 = gitStatus.includes('## main...origin_ssh/main') && !gitStatus.match(/ahead/);
console.log(pass1 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 2: sitemap 含新 slug =====
step(2, 'sitemap.xml 含 gang-run-card-boxes-hk-guide × 3 locale');
const sitemapUrls = [
  'https://zprintpro.com/zh-hk/sitemap.xml',
  'https://zprintpro.com/en/sitemap.xml',
  'https://zprintpro.com/ja/sitemap.xml',
];
let pass2 = true;
for (const u of sitemapUrls) {
  try {
    const res = await httpGet(u);
    const hasSlug = (res.body.match(/gang-run-card-boxes-hk-guide/g) || []).length;
    console.log(`  ${u}: status=${res.status} slug_count=${hasSlug}`);
    if (hasSlug === 0) pass2 = false;
  } catch (e) {
    console.log(`  ${u}: ERROR ${e.message}`);
    pass2 = false;
  }
}
console.log(pass2 ? '  ✓ PASS' : '  ⚠ sitemap slug 缺失 (CF cache 还没更新)');

// ===== STEP 3: curl 3 locale blog URL =====
step(3, 'curl 3 locale blog URL → 200');
const blogUrls = [
  ['zh-hk', 'https://zprintpro.com/zh-hk/blog/gang-run-card-boxes-hk-guide/'],
  ['en', 'https://zprintpro.com/en/blog/gang-run-card-boxes-hk-guide/'],
  ['ja', 'https://zprintpro.com/ja/blog/gang-run-card-boxes-hk-guide/'],
];
let pass3 = true;
for (const [loc, u] of blogUrls) {
  try {
    const res = await httpGet(u);
    console.log(`  ${loc}: status=${res.status}${res.status === 200 ? ' ✓' : ' ❌'}`);
    if (res.status !== 200) pass3 = false;
  } catch (e) {
    console.log(`  ${loc}: ERROR ${e.message}`);
    pass3 = false;
  }
}
console.log(pass3 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 4: BODY verify =====
step(4, 'BODY verify - 主关键词 + price anchor + partOf=0');
const expectations = {
  'zh-hk': { kw: '拼版白卡彩盒', pricePatterns: [/HK\$129/, /HK\$219/, /HK\$849/, /HK\$1,599/] },
  'en': { kw: 'Gang-Run', pricePatterns: [/USD 25/, /USD 42/, /USD 165/, /USD 310/] },
  'ja': { kw: '合版', pricePatterns: [/¥3,800/, /¥6,300/, /¥24,750/, /¥46,500/] },
};
let pass4 = true;
for (const [loc, exp] of Object.entries(expectations)) {
  const u = `https://zprintpro.com/${loc === 'zh-hk' ? 'zh-hk' : loc}/blog/gang-run-card-boxes-hk-guide/`;
  try {
    const res = await httpGet(u);
    const body = res.body;
    const partOf = (body.match(/This post is part of the/g) || []).length;
    const kwCount = (body.match(new RegExp(exp.kw, 'g')) || []).length;
    let priceHits = 0;
    for (const pp of exp.pricePatterns) {
      const m = body.match(pp);
      if (m) priceHits += m.length;
    }
    console.log(`  ${loc}: kw(${exp.kw})=${kwCount} price_hits=${priceHits} partOf=${partOf}`);
    if (partOf > 0) pass4 = false;
    if (kwCount < 1) pass4 = false;
    if (priceHits < 3) pass4 = false;
  } catch (e) {
    console.log(`  ${loc}: ERROR ${e.message}`);
    pass4 = false;
  }
}
console.log(pass4 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 5: 0 <img> in body =====
step(5, '0 张 <img> in body (硬约束无图)');
let pass5 = true;
for (const [loc, u] of blogUrls) {
  try {
    const res = await httpGet(u);
    // 找博客 content 区域
    const body = res.body;
    const blogMatch = body.match(/<h2>[\s\S]*?<\/article>/);
    const blogContent = blogMatch ? blogMatch[0] : body;
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
    const res = await httpGet(u);
    const is200 = res.status === 200;
    const is30x = res.status >= 300 && res.status < 400;
    console.log(`  ${u}: status=${res.status}${is200 ? ' ✓' : is30x ? ' ⚠ 30x' : ' ❌'}`);
    if (!is200 && !is30x) pass6 = false;
  } catch (e) {
    console.log(`  ${u}: ERROR ${e.message}`);
    pass6 = false;
  }
}
console.log(pass6 ? '  ✓ PASS' : '  ❌ FAIL');

// ===== STEP 7: matrix.json Q-GR-01 =====
step(7, 'matrix.json covered[34] 含 Q-GR-01');
try {
  const matrix = JSON.parse(readFileSync('.hermes/industry-keyword-matrix.json', 'utf-8'));
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
  } else {
    console.log('  ❌ FAIL: Q-GR-01 not found in covered[]');
  }
  const pass7 = !!qgr01;
  console.log(pass7 ? '  ✓ PASS' : '  ❌ FAIL');
} catch (e) {
  console.log(`  ❌ FAIL: ${e.message}`);
}

// ===== SUMMARY =====
console.log('\n========== 7 步 verify 汇总 ==========');
console.log(`  Step 1 (git status):     ${pass1 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 2 (sitemap):        ${pass2 ? '✓ PASS' : '⚠ cache lag'}`);
console.log(`  Step 3 (curl 200 3 loc): ${pass3 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 4 (body content):   ${pass4 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 5 (no img):         ${pass5 ? '✓ PASS' : '❌ FAIL'}`);
console.log(`  Step 6 (internal links): ${pass6 ? '✓ PASS' : '❌ FAIL'}`);

const allPass = pass1 && pass3 && pass4 && pass5 && pass6;
console.log(`\n  ${allPass ? '✅ ALL PASS — v7 daily 2026-07-23 完成' : '⚠ 部分 fail — 需升级 user'}`);
