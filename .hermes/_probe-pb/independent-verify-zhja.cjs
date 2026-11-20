'use strict';
/**
 * 交付層獨立複算 — Self-Publishing zh-hk / ja 本地化稿
 * 自寫量測邏輯 (不呼叫寫手腳本), 並加做寫手未涵蓋的檢查:
 *   - 與 en 定稿的「數字對等」逐項比對
 *   - ja 稿是否混入「簡體專用字」(需與日文新字體區分, 否則必誤報)
 */
const fs = require('fs');
const path = require('path');
const D = 'F:\\zprintpro-nextjs\\.hermes\\staging\\';
const en = JSON.parse(fs.readFileSync(D + 'self-publishing-content.json', 'utf8'));
const zj = JSON.parse(fs.readFileSync(D + 'self-publishing-content.zhhk-ja.json', 'utf8'));

const eq = s => { let n = 0; for (const c of s) n += /[\u3000-\u9fff\uff00-\uffef]/.test(c) ? 2 : 1; return n; };
const chk = [];
const A = (name, got, ok, want) => chk.push({ name, got, ok, want });

/* 簡體專用字: 只收「繁體必與簡體不同形」者。
 * ★ 教訓 (2026-09-18 自檢): 不可把「進出/費用/計算/條件」等詞拆成單字後整批入集 ——
 *   出/算/用/件 皆為繁簡同形, 會產生假陽性 (實測本輪即誤報 4 處)。
 *   ja 另須排除日文新字體 (写 是日文正確寫法, 写真), 以及繁日同形字 (言/富)。 */
const ZH_SIMP = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场点击视频听读写语言词记录进买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数';
const JA_SIMP = '们个为无书车门问说时东华产义应该让给还两么众飞机场击视频听读语词记录买卖贵贱农医乐儿长张费认识种类别离继续绝对单';

for (const loc of ['zh-hk', 'ja']) {
  const t = zj.title[loc], d = zj.description[loc], ex = zj.excerpt[loc], c = zj.content[loc];
  const brand = loc === 'zh-hk' ? '智印港' : 'ZprintPro';
  const other = loc === 'zh-hk' ? 'ZprintPro' : '智印港';

  A(loc + ' title 半角當量', eq(t), eq(t) >= 50 && eq(t) <= 58, '50-58');
  A(loc + ' title 以本語系品牌收尾一次', `${/新$/.test(brand) ? '' : ''}${(t.match(new RegExp(brand, 'g')) || []).length} 次, 結尾=${t.trim().endsWith(brand)}`,
    (t.match(new RegExp(brand, 'g')) || []).length >= 1 && t.trim().endsWith(brand), '品牌收尾');
  A(loc + ' title 無他語系品牌', (t.match(new RegExp(other, 'g')) || []).length, !t.includes(other), '0');
  A(loc + ' description 半角當量', eq(d), eq(d) >= 150 && eq(d) <= 160, '150-160');
  A(loc + ' excerpt 半角當量', eq(ex), eq(ex) >= 120 && eq(ex) <= 300, '120-300');

  const qaLiteral = loc === 'zh-hk' ? '快速答案：' : 'クイック回答：';
  const qaShape = (c.match(/<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">/g) || []).length;
  const qaLit = (c.match(new RegExp('<p class="font-semibold mb-1">' + qaLiteral, 'g')) || []).length;
  A(loc + ' 快速答案塊 class 形狀', qaShape, qaShape === 3, '=3');
  A(loc + ' 快速答案塊引語字面 (' + qaLiteral + ')', qaLit, qaLit === 3, '=3');

  const h2 = (c.match(/<h2[^>]*>/g) || []).length;
  const h2q = (c.match(/<h2[^>]*>[^<]*[?？]<\/h2>/g) || []).length;
  A(loc + ' H2 數 / 問句', `${h2} / ${h2q}`, h2 >= 6 && h2q > h2 / 2, '≥6 且過半問句');
  A(loc + ' <table> / <thead>', `${(c.match(/<table/g) || []).length} / ${(c.match(/<thead/g) || []).length}`,
    (c.match(/<table/g) || []).length >= 2 && (c.match(/<table/g) || []).length === (c.match(/<thead/g) || []).length, '≥2 且帶 thead');

  const faqs = [...c.matchAll(/<p><strong>Q(\d+)[:：]\s*([\s\S]*?)<\/strong>\s*<br\s*\/?>\s*A\d*[:：]\s*([\s\S]*?)<\/p>/g)];
  A(loc + ' FAQ 可解析條數', faqs.length, faqs.length >= 4 && faqs.length <= 5, '4-5');

  A(loc + ' CTA (wa.me)', (c.match(/wa\.me/g) || []).length, (c.match(/wa\.me/g) || []).length >= 2 && (c.match(/wa\.me/g) || []).length <= 3, '2-3');

  const WL = ['category/books/', 'category/educational/', 'product/perfect-bound-books/', 'product/hardcover-books/',
    'product/saddle-stitch-booklets/', 'product/spiral-notebooks/', 'product/catalog-printing/',
    'blog/photo-book-printing-guide/', 'blog/childrens-picture-book-printing-guide/',
    'blog/zine-small-batch-booklet-printing-guide/', 'blog/catalog-printing-guide/', 'insights/hk-print-inquiry-index/'];
  const links = [...new Set([...c.matchAll(/href="(\/[^"]+)"/g)].map(m => m[1]))];
  const off = links.filter(h => !WL.some(w => h === `/${loc}/${w}`));
  A(loc + ' 唯一內鏈', links.length, links.length >= 7, '≥7');
  A(loc + ' 越白名單內鏈', off.length + (off.length ? ' -> ' + off.join(',') : ''), off.length === 0, '0');

  A(loc + ' <img>/<figure>', (c.match(/<img|<figure/gi) || []).length, (c.match(/<img|<figure/gi) || []).length === 0, '0');
  A(loc + ' <script>/JSON-LD', (c.match(/<script|application\/ld\+json/gi) || []).length, (c.match(/<script|application\/ld\+json/gi) || []).length === 0, '0');
  const comp = (c.match(/\bvs\.?\b|versus|比別家|比其他|便宜\s*\d+\s*倍|優於競品/gi) || []).length;
  A(loc + ' 競品對比', comp, comp === 0, '0');
  const prom = (c.match(/保證|保証|承諾|約束|確保|必ず|確実に/g) || []).length;
  A(loc + ' 承諾語氣', prom, prom === 0, '0');
  const gsc = (c.match(/\bGSC\b|\bimps\b|\bCTR\b|\bSERP\b|攻艱|衝首頁/gi) || []).length;
  A(loc + ' GSC 黑話', gsc, gsc === 0, '0');

  const first = (c.match(/^<p>([\s\S]*?)<\/p>/) || [, ''])[1].replace(/<[^>]+>/g, '');
  A(loc + ' 首段半角當量', eq(first), eq(first) <= 200, '≤200');
  A(loc + ' content 字數', c.length, c.length >= 3000, '≥3000');

  // 簡體污染 (zh-hk 用寬集合; ja 用窄集合以免誤報日文新字體)
  const set = loc === 'zh-hk' ? ZH_SIMP : JA_SIMP;
  const simpHits = [...new Set([...c.matchAll(new RegExp('[' + set + ']', 'g'))].map(m => m[0]))];
  A(loc + ' 簡體專用字殘留', simpHits.length + (simpHits.length ? ' -> ' + simpHits.join('') : ''), simpHits.length === 0, '0');
  A(loc + ' 錯字「智印印港」/ 雙品牌', (/智印印港/.test(c) || /智印港\s*ZprintPro|ZprintPro\s*智印港/.test(c)) ? 'HIT' : '0',
    !(/智印印港/.test(c) || /智印港\s*ZprintPro|ZprintPro\s*智印港/.test(c)), '0');
  const three = loc === 'zh-hk' ? ['低 MOQ', '快樣品', '透明工廠'] : ['小ロット', 'スピード', '透明'];
  A(loc + ' 三要素段三義', three.filter(k => c.includes(k)).length, three.every(k => c.includes(k)), '3');
}

/* 數字對等: 兩語稿的所有數字是否都出現在 en 稿 */
/* 數字對等: 兩語稿的所有數字是否都出現在 en 稿
 * ★ 教訓: 不可用貪婪的「數字後接任意數字或逗號或句點」樣式 —— 它會把句尾句點一起吃進去,
 *   使 "US$207.94." 不等於 "207.94", 產生假陽性。改為只吃千分位與可選小數, 再剝除尾隨標點。 */
const nums = s => [...new Set((s.match(/\d[\d,]*(?:\.\d+)?/g) || []).map(n => n.replace(/[.,]+$/, '')))];
const enAll = new Set(nums(en.content.en + en.title.en + en.description.en));
for (const loc of ['zh-hk', 'ja']) {
  const c = zj.content[loc];
  const extra = nums(c).filter(n => !enAll.has(n));
  A(loc + ' 新造數字 (en 稿沒有)', extra.length + (extra.length ? ' -> ' + extra.join(',') : ''), extra.length === 0, '0');
}

let fail = 0;
console.log('=== 交付層獨立複算: Self-Publishing zh-hk / ja ===\n');
for (const r of chk) { if (!r.ok) fail++; console.log(`${r.ok ? 'PASS' : '★FAIL'}  ${r.name}: ${r.got}  (要求 ${r.want})`); }
console.log(`\n${chk.length - fail}/${chk.length} PASS`);
console.log('\ntitle zh-hk: ' + zj.title['zh-hk']);
console.log('title ja   : ' + zj.title.ja);
console.log('desc zh-hk : ' + zj.description['zh-hk']);
console.log('desc ja    : ' + zj.description.ja);
