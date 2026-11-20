// G2 线上探针 v2 (2026-09-11): PLP 分类页 schema 批 — 16 品类 × 3 locale
// 校验: CollectionPage / FAQPage 挂 3 直接答案卡 / 選購指南段内链 (≥1 分类 + ≥1 blog) / GEO 服务节点 / 回归
// v2: 每请求重试 3 次抗 CF 平台 503 抖动; 内链判定=Buying Guide 段窗口内 blog+category 胶囊 (数据链接/兜底链接通用)
import { execSync } from 'child_process';

const BASE = process.env.G2_BASE || 'https://zprintpro.com';
const CATS = ['stickers', 'packaging', 'flyers', 'posters', 'paper-bags', 'greeting-cards', 'banners', 'books', 'menus', 'envelopes', 'calendars', 'red-packets', 'educational', 'japan-doujin', 'wedding-invitations', 'place-cards'];
const LOCALES = ['zh-hk', 'en', 'ja'];
const GEO_NEEDLES = {
  'zh-hk': ['順豐'],
  en: ['DHL', 'Express'],
  ja: ['DHL', '速達'],
};
// Eyebrow 硬编码英文 "Buying Guide" (三语言同结构), ja 不用日文标记
const BUYING_GUIDE_MARK = 'Buying Guide';

const fetchH = (u, retries = 3) => {
  const abs = u.startsWith('http') ? u : `${BASE}${u}`;
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -m 25 "${abs}"`, { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
      if (out.length > 20000) return out; // 有效内容
    } catch { /* retry */ }
  }
  return '';
};
const statusOf = (u, retries = 3) => {
  const abs = u.startsWith('http') ? u : `${BASE}${u}`;
  for (let i = 0; i < retries; i++) {
    try {
      const out = execSync(`curl.exe -sS -o NUL -w "%{http_code}" -m 20 "${abs}"`, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
      const code = parseInt(out.trim(), 10);
      if (code === 200) return code;
    } catch { /* retry */ }
  }
  return -1;
};
const parseBlocks = (html) => {
  const blocks = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { blocks.push(JSON.parse(m[1])); } catch { /* skip */ }
  }
  return blocks;
};

let pass = 0, fail = 0;
const failures = [];
const guideHrefs = new Set();
const check = (cond, label) => {
  if (cond) pass++;
  else { fail++; failures.push(label); }
};

for (const cat of CATS) {
  for (const loc of LOCALES) {
    const url = `/${loc}/category/${cat}/`;
    const html = fetchH(url);
    if (!html) { check(false, `${url} fetch(3次重试仍失败)`); continue; }
    check(!html.includes('智印印港'), `${url} 智印印港=0`);
    const blocks = parseBlocks(html);
    const types = blocks.map((b) => b['@type']);
    check(types.includes('CollectionPage'), `${url} CollectionPage`);
    const cp = blocks.find((b) => b['@type'] === 'CollectionPage');
    if (cp) {
      check(cp.name && cp.name.length > 0, `${url} CollectionPage.name`);
      check(cp.mainEntity && cp.mainEntity['@type'] === 'ItemList', `${url} CollectionPage.mainEntity=ItemList`);
    }
    check(types.includes('BreadcrumbList'), `${url} BreadcrumbList`);
    check(types.includes('ItemList'), `${url} ItemList`);
    const itemList = blocks.find((b) => b['@type'] === 'ItemList');
    check(itemList && Array.isArray(itemList.itemListElement) && itemList.itemListElement.length >= 3, `${url} ItemList.elements>=3`);
    check(types.includes('FAQPage'), `${url} FAQPage`);
    const faq = blocks.find((b) => b['@type'] === 'FAQPage');
    if (faq) {
      const qs = (faq.mainEntity || []).filter((q) => q['@type'] === 'Question');
      check(qs.length >= 3, `${url} FAQPage.Questions>=3`);
    }
    // 选购指南段内链: Buying Guide 标题窗口内 ≥1 blog + ≥1 category 胶囊
    const gi = html.indexOf(BUYING_GUIDE_MARK);
    if (gi >= 0) {
      const win = html.slice(gi, gi + 9000);
      check(win.includes('/blog/'), `${url} 指南内链-blog`);
      check(win.includes(`/${loc}/category/`), `${url} 指南内链-分类`);
      for (const m of win.matchAll(/href="(\/[^"]*(?:\/blog\/|\/category\/)[^"]*)"/g)) {
        guideHrefs.add(m[1]);
      }
    } else {
      check(false, `${url} 指南段缺失`);
    }
    // GEO 服务节点
    const geo = GEO_NEEDLES[loc];
    check(geo.every((n) => html.includes(n)), `${url} GEO ${geo.join('/')}`);
  }
}

// 指南内链 200 校验 (禁 404/301/308 — G2.3 硬要求)
for (const href of guideHrefs) {
  const st = statusOf(href);
  check(st === 200, `指南内链200 ${href} (got ${st})`);
}

// 回归 (重试)
for (const u of ['/zh-hk/', '/en/', '/ja/', '/zh-hk/product/waterproof-stickers/', '/zh-hk/blog/sticker-guide/']) {
  const st = statusOf(u);
  check(st === 200, `回归200 ${u} (got ${st})`);
}

console.log(`\n===== G2 PROBE v2 RESULT =====`);
console.log(`PASS: ${pass}  FAIL: ${fail}`);
if (failures.length) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
} else {
  console.log('ALL GREEN');
}
process.exit(fail === 0 ? 0 : 1);
