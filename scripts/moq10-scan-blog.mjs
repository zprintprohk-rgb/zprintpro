// moq10-scan-blog.mjs — 掃 blog-data 內與傳單/貼紙/賀卡相關文章的 100 起印宣稱
import fs from 'fs';
import path from 'path';

const DIR = 'src/data/blog-data';
const PAT = /(100\s*張起印|100\s*張起|100\s*枚から|100\s*MOQ|MOQ\s*100|100[- ]copy MOQ|100\s*pcs?\s*MOQ|100\s*pieces?\s*(?:minimum|MOQ))/g;
const TOPIC = /(flyer|leaflet|sticker|label|傳單|單張|貼紙|標籤|賀卡|greeting|チラシ|ステッカー|シール|グリーティング)/i;

for (const loc of ['zh-hk', 'en', 'ja']) {
  const f = path.join(DIR, `${loc}.json`);
  if (!fs.existsSync(f)) { console.log(`${loc}: MISSING`); continue; }
  const raw = fs.readFileSync(f, 'utf-8');
  const j = JSON.parse(raw);
  const keys = Object.keys(j);
  let hits = 0;
  console.log(`\n=== ${loc} (${keys.length} entries) ===`);
  for (const k of keys) {
    const entry = j[k];
    const text = JSON.stringify(entry);
    const m = [...text.matchAll(PAT)];
    if (!m.length) continue;
    const title = entry.title || k;
    const topical = TOPIC.test(title) || TOPIC.test(k);
    hits += m.length;
    console.log(`  ${topical ? '[TOPIC]' : '[     ]'} ${k}`);
    console.log(`           title: ${String(title).slice(0, 110)}`);
    console.log(`           hits : ${m.length} × ${[...new Set(m.map((x) => x[1]))].join(' | ')}`);
  }
  console.log(`  --- ${loc}: ${hits} 處命中`);
}
