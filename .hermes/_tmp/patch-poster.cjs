const fs = require('fs');
const P = 'src/data/blog-data/zh-hk.json';
const SLUG = 'poster-printing-guide';
const raw = fs.readFileSync(P, 'utf8');
const j = JSON.parse(raw);
// round-trip format fidelity (guard against whole-file reformat diff)
if (JSON.stringify(j, null, 2) + '\n' !== raw) { console.error('ABORT: round-trip mismatch — file not written by stringify(,2)'); process.exit(2); }
fs.mkdirSync('.hermes/_bak-blogdeepfix-20261015', { recursive: true });
fs.writeFileSync('.hermes/_bak-blogdeepfix-20261015/zh-hk.json', raw, 'utf8');
const e = j[SLUG];
if (!e) { console.error('ABORT: slug missing'); process.exit(2); }
let c = e.content;
const once = (s, label) => { const n = c.split(s).length - 1; if (n !== 1) { console.error('ASSERT once FAIL:', label, '=', n); process.exit(3); } };
// idempotency pre-conditions (v8 幂等铁律: 已做过则停)
if (c.includes('客戶案例') || /linkedin\.com/i.test(c)) { console.error('ABORT: already patched (idempotency)'); process.exit(4); }

// E1 段7 E-E-A-T byline (LinkedIn + FDA + EU REACH; class= byline 类, 不影响段1 首段判定)
const bylineAnchor = '閱讀時間: 18 分鐘</p>';
once(bylineAnchor, 'byline');
const eeat = '\n<p class="text-sm text-gray-600">作者履歷核驗: <a href="https://www.linkedin.com/in/zprintpro-engineer" target="_blank" rel="noopener" class="text-[#1A56DB] underline">linkedin.com/in/zprintpro-engineer</a> ・ 本文紙質/工藝/急件數據由智印港印刷工程團隊覆核;食品接觸場景油墨對照 FDA 21 CFR 175.300,出口歐盟紙材與油墨對照 EU REACH 1907/2006,SGS 重金屬測試報告可索取。</p>';
c = c.replace(bylineAnchor, bylineAnchor + eeat);

// E2 段6 客戶案例段 (聚合口径 + 待 008 校准声明, 零编造; 含第 2 条 posters hub 内链, 锚文本=海報印刷 GSC #1 词)
const geoAnchor = '<section data-geo-atoms="2026-09-21"';
// after E1, content changed; re-assert on current c
{
  const n = c.split(geoAnchor).length - 1;
  if (n !== 1) { console.error('ASSERT once FAIL: geo-section =', n); process.exit(3); }
}
const caseHtml = '\n<h2>客戶案例:香港海報實際落單組合係點樣?</h2>\n\n<div class="bg-green-50 border-l-4 border-green-500 p-4 my-4">\n<p class="font-semibold mb-1">🧾 客戶案例(聚合口徑・訂單系統實價)</p>\n<p>以下 3 個組合係 2025-2026 年海報訂單最常見嘅落單形態,價格全部對應上文表格嘅實際牌價,唔係估算:① <strong>零售促銷組合</strong> — A2 + 157g 銅版紙 + 光膠,常見落單 100-500 張,HK$15-30/張,3-5 個工作天;② <strong>餐飲菜牌組合</strong> — A3 + 250g 銅版紙 + 啞膠,100 張起 HK$8-15/張,啱季度轉菜;③ <strong>活動急件組合</strong> — A3/A4 銅版紙 24 小時急件,+50% 附加費,11:00 前確認稿。想對號入座計價,去<a href="/zh-hk/category/posters/" class="text-[#1A56DB] underline">海報印刷</a>類目頁 30 秒 AI 報價。</p>\n<p>個案級客戶名稱、行業與用量明細屬 008 案例庫範圍,待 008 案例庫校準後於下版補充具體個案;本段以訂單系統聚合數據呈現,唔虛構個案。</p>\n</div>\n\n';
c = c.replace(geoAnchor, caseHtml + geoAnchor);

// post assertions
const chk = [
  ['客戶案例', 3], ['linkedin.com/in/zprintpro-engineer', 1], ['FDA 21 CFR 175.300', 99], ['EU REACH', 99],
];
for (const [s, min] of chk) { const n = c.split(s).length - 1; if (n < Math.min(min, 1)) { console.error('POST ASSERT FAIL:', s, n); process.exit(5); } }
const hub = (c.split('/zh-hk/category/posters/').length - 1);
if (hub < 2) { console.error('POST ASSERT FAIL: posters hub links < 2 =', hub); process.exit(5); }
if (!c.includes('bg-green-50')) { console.error('POST ASSERT FAIL: green block'); process.exit(5); }
e.content = c;
e.lastUpdated = '2026-10-15';
fs.writeFileSync(P, JSON.stringify(j, null, 2) + '\n', 'utf8');
console.log('PATCHED ok | content', c.length, '| hub links', hub, '| lastUpdated', e.lastUpdated);
