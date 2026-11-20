// Live probes: 9 PDP URLs (3 SKU x 3 locale) — positive markers (new content) + negative markers (purged).
// Serial + 1.2s interval; status+len+marker triple validation (INVALID never counts as pass/fail evidence).
const https = require('node:https');

const BASE = 'https://zprintpro.com';
const PAGES = [
  { slug: 'cartoon-red-packets', loc: 'zh-hk',
    pos: ['卡通利是封印刷 | 燙金 局部UV | 100個起 HK$1.10起 | 智印港', '插畫與吉祥物稿件，100 個起訂製', '卡通利是封可以用自己畫的插畫嗎', '利是封印刷總覽'],
    neg: ['即日少量の急ぎは10枚から', '24〜48時間以内', 'MOQ 500'] },
  { slug: 'cartoon-red-packets', loc: 'en',
    pos: ['Custom Cartoon Red Packets | 100 MOQ $0.46 | ZprintPro', '5-7 business day production'],
    neg: ['from ZprintPro the US', 'MOQ 500'] },
  { slug: 'cartoon-red-packets', loc: 'ja',
    pos: ['キャラクターポチ袋の最小注文数は', '標準5-7営業日', '祝儀袋印刷一覧'],
    neg: ['即日少量の急ぎは10枚から', '24〜48時間以内'] },
  { slug: 'eco-red-packets', loc: 'zh-hk',
    pos: ['環保利是封印刷 | FSC再生紙 | 100個起 HK$1.90起 | 智印港', 'FSC再生紙・種子紙與大豆油墨選材指南', '種子紙利是封真係種到出植物'],
    neg: ['157g 紅金紙', '燙金・覆膜', 'from ZprintPro the US'] },
  { slug: 'eco-red-packets', loc: 'en',
    pos: ['Eco Red Packets | FSC Paper 100 MOQ $0.74 | ZprintPro', 'FSC-certified recycled or plantable seed paper'],
    neg: ['from ZprintPro the US', 'Gold Foil Print'] },
  { slug: 'eco-red-packets', loc: 'ja',
    pos: ['エコポチ袋｜再生紙 箔押し｜100枚〜 ¥103〜｜ZprintPro', 'FSC再生紙・種子紙・大豆インク対応', '本物の植物が育つのは種子紙だけ'],
    neg: ['エコ年賀状', '157g 赤金紙', '高品質・短納期・グローバル配送'] },
  { slug: 'large-red-packets', loc: 'zh-hk',
    pos: ['大號利是封印刷 | 燙金 局部UV | 100個起 HK$2.20起 | 智印港', '大號利是封印刷 — 110×200mm 加大 30%-50% 的厚禮首選', '大號利是封實際有幾大'],
    neg: ['大利是封/大利是封', '157g 紅金紙'] },
  { slug: 'large-red-packets', loc: 'en',
    pos: ['Large Red Packets | 110x200mm 100 MOQ $0.92 | ZprintPro', '30-50% bigger than standard'],
    neg: ['from ZprintPro the US'] },
  { slug: 'large-red-packets', loc: 'ja',
    pos: ['大判ポチ袋｜箔押し UV 厚紙｜100枚〜 ¥129〜｜ZprintPro', '大判ポチ袋 100枚〜：標準より30〜50%大きい110×200mm', '通常サイズよりどれくらい大きい'],
    neg: ['大型年賀状', '高品質・短納期・グローバル配送', '24〜48時間以内'] },
];

function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'b1c2c-probe/1.0' } }, (res) => {
      if (res.statusCode !== 200) { res.resume(); return resolve({ status: res.statusCode, body: '' }); }
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => resolve({ status: 200, body: data }));
    });
    req.on('error', (e) => resolve({ status: -1, body: String(e) }));
    req.setTimeout(20000, () => { req.destroy(); resolve({ status: -2, body: 'timeout' }); });
  });
}

(async () => {
  let fail = 0, invalid = 0;
  for (const p of PAGES) {
    const url = `${BASE}/${p.loc}/product/${p.slug}/`;
    const r = await fetchPage(url);
    if (r.status !== 200 || r.body.length < 30000) {
      console.log(`INVALID ${p.loc}/${p.slug} status=${r.status} len=${r.body.length}`);
      invalid++; await new Promise((s) => setTimeout(s, 1200)); continue;
    }
    const missPos = p.pos.filter((m) => !r.body.includes(m));
    const hitNeg = p.neg.filter((m) => r.body.includes(m));
    const ok = missPos.length === 0 && hitNeg.length === 0;
    if (!ok) fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${p.loc}/${p.slug}` +
      (missPos.length ? ` | missing+${JSON.stringify(missPos)}` : '') +
      (hitNeg.length ? ` | neg-hit+${JSON.stringify(hitNeg)}` : ''));
    await new Promise((s) => setTimeout(s, 1200));
  }
  console.log(`\nRESULT: ${PAGES.length - fail - invalid}/${PAGES.length} pass, ${invalid} invalid, ${fail} fail`);
  process.exit(fail + invalid > 0 ? 2 : 0);
})();
