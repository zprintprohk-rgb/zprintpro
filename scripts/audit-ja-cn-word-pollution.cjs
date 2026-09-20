// 全量抽查: ja 段(标题/description/h1/imageAlt/body) 出现**中文量词/中文语素** 的位置 (只读)
// 背景: 并发车道把 zh-hk 的 unitLabel「份」写进了 ja 标题 —— 繁简同形的中文词混进日文,
//       现有 i18n 门童靠**繁体专用字表**判定, 对「份/張/本/個」这类简繁同形字**天然漏检**。
//       本工具做的是「日文里不该出现的常用中文词」标记, 供人读; 不作自动修改依据。
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();

// 中文量词/中文专有语素 (简繁同形, 繁体字表抓不到); 排除日文里合法的同形汉字:
//   本(書籍/本) 在日文合法 (「1本」也是日文量词, 用于细长物) ⇒ 只在「N本起/本〜」+中文语境才可疑
//   ⇒ 只用**明确的中文量词或中文词**: 份 / 張 / 個 / 起訂 / 起印 / 報價 / 我們 / 支持 / 免費 / 香港XX製作
const CN_TOKENS = /(\d+\s*份|份〜|份起|張|个|個|起訂|起印|報價|我們|支持|免費|定製|標準|數量|價格|尺寸|顏色|款式|材質|類型|加工|適用|聯繫|諮詢|訂單|客戶)/g;

const LOCALES = ['zh-hk', 'en', 'ja'];
let n = 0;
for (const slug of Object.keys(data)) {
  const e = data[slug];
  for (const loc of LOCALES.filter((l) => l === 'ja')) {
    const s = e.seo?.[loc] || {};
    const fields = { title: s.title, description: s.description, h1: s.h1, body: s.body, imageAlt: e.imageAlt?.[loc] };
    for (const [f, v] of Object.entries(fields)) {
      if (typeof v !== 'string' || !v) continue;
      const hits = [...new Set([...v.matchAll(CN_TOKENS)].map((m) => m[0]))];
      if (!hits.length) continue;
      // 含假名 ⇒ 至少是日文句子, 只提示; 完全无假名 ⇒ 高度可疑
      const kana = /[\u3040-\u309F\u30A0-\u30FF]/.test(v);
      n++;
      console.log(`${kana ? '🟡' : '🔴'} [${slug}/${loc}/${f}] 中文词=${hits.join(',')}`);
      console.log(`     ${JSON.stringify(v.slice(0, 150))}`);
    }
  }
}
console.log(`\n合计 ${n} 个字段命中「中文量词/中文词」形态。🔴=整串无假名(高疑) / 🟡=含假名(可能是引用中文)。`);
console.log('⚠️ 只读工具, 不作自动修改依据 —— 「本/個/張」在日文中部分合法 (量词), 必须人读 (避坑 13)。');
