// moq10-live-probe.mjs — push 後線上驗收探針 (MOQ 10 三波改動)
//
// 遵循 §0.23.2 三閘門:
//   ① 匹配口徑: 先 dump 真實樣本再寫 regex (此處只做 includes 檢查, 避免正則邊界問題)
//   ② 響應有效性: 狀態碼 + 長度下限 + 頁面 marker 三重校驗; 不合格判 INVALID, 絕不計入 0
//   ③ 確定性: 每 URL 最多重試 4 次 (間隔 20s), 應對 Cloudflare 部署傳播延遲
//
// 每項: [預期出現] / [預期消失]

const BASE = 'https://zprintpro.com';
const RETRY = 4, WAIT_MS = 20000;

const CHECKS = [
  {
    name: '即日速遞頁 zh-hk (P0-1)',
    url: `${BASE}/zh-hk/services/rush-printing-delivery/`,
    marker: '即日印刷',
    /*
     * ⚠ 探針字串必須對齊**實際部署字串**, 不可寫「理想字串」:
     *   首版寫 mustHave ['10 張起印'] 而實際係「傳單／貼紙 10 張起印」(中間有全角斜線),
     *   mustNot ['下午 3 時前落單'] 而實際係「下午 3 時前落單即日交貨」⇒ 假 FAIL。
     * 同時 mustNot 不可寫只存在於源碼註釋的字串 (實測踩過)。
     */
    mustHave: ['傳單／貼紙 10 張起印'],
    mustNot: ['下午 3 時前落單', '100 張起印'],
  },
  {
    name: '即日速遞頁 en (P0-1)',
    url: `${BASE}/en/services/rush-printing-delivery/`,
    marker: 'Same-Day',
    // meta 內 & 會被轉義成 &amp; ⇒ 只比對後半段, 避開轉義問題
    mustHave: ['stickers from 10 pcs'],
    mustNot: ['100+ MOQ', '下午 3 時前落單'],
  },
  {
    name: '即日速遞頁 ja (P0-1)',
    url: `${BASE}/ja/services/rush-printing-delivery/`,
    marker: '即日印刷',
    // ja 的 desc 實際寫「チラシ・ステッカーは 10 枚〜」(無「10枚〜」連寫), 故比對此段
    mustHave: ['10 枚〜'],
    mustNot: ['100 枚〜', '100枚〜'],
  },
  {
    name: 'A1 海報 PDP zh-hk (P0-2)',
    url: `${BASE}/zh-hk/product/a1-posters/`,
    marker: 'A1',
    mustHave: ['參考價'],
    /*
     * ⚠ mustNot 必須精確到**該 SKU 自身的宣稱**, 不可用裸「100 張起印」:
     *   PDP 底部有公司級 FAQ「貼紙 10 張起、信封 100 張起、禮品包裝盒 100 個起」,
     *   該「100」屬其他品類且本來就正確 ⇒ 裸字串會造成假 FAIL (實測 A5 踩過)。
     *   故只比對「該產品描述句」的樣式。
     */
    mustNot: ['A1大幅海報 專為香港中小企、本地餐廳及跨境電商品牌設計。100', 'A1 大幅海報 厚紙・100起印'],
  },
  {
    name: 'A5 傳單 PDP zh-hk (紙品 10)',
    url: `${BASE}/zh-hk/product/a5-flyers/`,
    marker: '傳單',
    mustHave: ['參考價'],
    // 同上: 只比對 A5 傳單自身的宣稱
    mustNot: [
      'A5傳單印刷訂製，100張起印',
      'A5 傳單印刷 圓角・覆膜・100起印',
      'A5傳單印刷 專為香港中小企、本地餐廳及跨境電商品牌設計。100',
    ],
  },
  {
    name: '貼紙品類頁 zh-hk (紙品 10)',
    url: `${BASE}/zh-hk/category/stickers/`,
    marker: '貼紙',
    mustHave: [],
    mustNot: ['100 張起印', '100張起印'],
  },
  {
    name: '騎馬釘小冊子 PDP zh-hk (第三波 10 本)',
    url: `${BASE}/zh-hk/product/saddle-stitch-booklets/`,
    marker: '騎馬釘',
    mustHave: [],
    // 第三波書刊已由「1 本起印」口徑改為 10 本; 不得再出現 1 本起印
    mustNot: ['1 本起印', '1本起印'],
  },
  {
    name: '騎馬釘小冊子博客 zh-hk (門童 #19 口徑)',
    url: `${BASE}/zh-hk/blog/saddle-stitch-booklet-printing-guide/`,
    marker: '騎馬釘',
    mustHave: [],
    mustNot: ['100 本起印', '下午 3 時前落單'],
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'zprintpro-moq-probe/1.0' } });
    const text = await res.text();
    return { status: res.status, text, len: text.length };
  } catch (e) {
    return { status: 0, text: '', len: 0, error: String(e.message || e) };
  }
}

let pass = 0, fail = 0, invalid = 0;
const results = [];

for (const c of CHECKS) {
  let verdict = 'INVALID', detail = '';
  for (let attempt = 1; attempt <= RETRY; attempt++) {
    const r = await fetchText(c.url);
    // ② 響應有效性三重校驗
    if (r.status !== 200 || r.len < 5000 || !r.text.includes(c.marker)) {
      detail = `attempt ${attempt}: status=${r.status} len=${r.len} marker=${r.text.includes(c.marker)}`;
      if (attempt < RETRY) { await sleep(WAIT_MS); continue; }
      verdict = 'INVALID';
      break;
    }
    const missing = c.mustHave.filter((s) => !r.text.includes(s));
    const present = c.mustNot.filter((s) => r.text.includes(s));
    if (missing.length === 0 && present.length === 0) { verdict = 'PASS'; detail = `len=${r.len}`; break; }
    detail = `attempt ${attempt}: 缺[${missing.join('|')}] 殘留[${present.join('|')}]`;
    if (attempt < RETRY) { await sleep(WAIT_MS); continue; }
    verdict = 'FAIL';
  }
  if (verdict === 'PASS') pass++;
  else if (verdict === 'FAIL') fail++;
  else invalid++;
  results.push({ name: c.name, verdict, detail });
  console.log(`[${verdict}] ${c.name}`);
  console.log(`        ${detail}`);
}

console.log(`\n=== 匯總: PASS ${pass} | FAIL ${fail} | INVALID ${invalid} ===`);
if (invalid) console.log('⚠ INVALID 不計入內容失敗 (可能係部署未傳播完 / 限流), 需重跑');
process.exit(fail ? 1 : 0);
