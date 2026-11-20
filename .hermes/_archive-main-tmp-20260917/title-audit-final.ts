/* 最终生产审计 v3: effective = skuSeo.seo.title || generateProductMetadata 模板值
   (精确复刻 seo.ts L819-850 公式 + 探针校准) */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import { execSync } from 'node:child_process';
import * as fs from 'fs';

// main 版 sku-seo-data.ts (batch2 标题在 main)
const seoTs = execSync('git show main:src/data/sku-seo-data.ts', { cwd: 'F:/zprintpro-nextjs', maxBuffer: 64 * 1024 * 1024 }).toString('utf8');
function parseSeo(ts: string) {
  const out: Record<string, any> = {};
  const re = /"([a-z0-9-]+)"\s*:\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(ts))) {
    const slug = m[1];
    let depth = 0, i = m.index + m[0].length - 1;
    for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
    const block = ts.slice(m.index, i + 1);
    const titles = [...block.matchAll(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => JSON.parse('"' + x[1] + '"'));
    out[slug] = { 'zh-hk': titles[0] || '', en: titles[1] || '', ja: titles[2] || '' };
  }
  return out;
}
const seo = parseSeo(seoTs);

const hw = (s: string) => [...(s || '')].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);

// categoryName (探针校准): packaging→包裝盒定製, place-cards→枱卡 / 酒水牌 / 座位卡印刷, wedding-invitations→喜帖印刷, japan-doujin→同人誌印刷, 其余→品类名
const CAT_ZH: Record<string, string> = {
  packaging: '包裝盒定製', 'paper-bags': '紙袋印刷', flyers: '傳單印刷', posters: '海報印刷',
  stickers: '貼紙印刷', banners: '橫額印刷', books: '書籍印刷', calendars: '月曆印刷',
  'red-packets': '利是封印刷', menus: '餐牌印刷', envelopes: '信封印刷', 'greeting-cards': '賀卡印刷',
  educational: '教育印刷', 'japan-doujin': '同人誌印刷', 'wedding-invitations': '喜帖印刷',
  'place-cards': '枱卡 / 酒水牌 / 座位卡印刷',
};
const CAT_EN: Record<string, string> = {
  packaging: 'Custom Packaging', 'paper-bags': 'Paper Bags', flyers: 'Flyers', posters: 'Posters',
  stickers: 'Stickers', banners: 'Banners', books: 'Books', calendars: 'Calendars',
  'red-packets': 'Red Packets', menus: 'Menus', envelopes: 'Envelopes', 'greeting-cards': 'Greeting Cards',
  educational: 'Educational', 'japan-doujin': 'Doujinshi', 'wedding-invitations': 'Wedding Invitations',
  'place-cards': 'Place Cards',
};
const CAT_JA: Record<string, string> = {
  packaging: 'パッケージ', 'paper-bags': '紙袋', flyers: 'チラシ', posters: 'ポスター',
  stickers: 'ステッカー', banners: 'バナー', books: '書籍', calendars: 'カレンダー',
  'red-packets': 'ポチ袋', menus: 'メニュー', envelopes: '封筒', 'greeting-cards': 'グリーティングカード',
  educational: '教育印刷', 'japan-doujin': '同人誌', 'wedding-invitations': '結婚式招待状',
  'place-cards': '席札',
};

// 复刻 generateProductMetadata title 公式
function templateTitle(p: any, loc: string): string {
  const name = loc === 'zh-hk' ? p.name : loc === 'en' ? p.nameEn : p.nameJa;
  const suffix = loc === 'zh-hk' ? '印刷' : loc === 'en' ? 'Printing' : '印刷';
  let titleBase = `${name}${suffix}`.replace(/印刷印刷/g, '印刷');
  const cat = loc === 'zh-hk' ? CAT_ZH[p.category_slug] : loc === 'en' ? CAT_EN[p.category_slug] : CAT_JA[p.category_slug];
  const title = loc === 'zh-hk'
    ? `${titleBase} | 香港${cat}專家 | 智印港`.slice(0, 60)
    : loc === 'en'
    ? `${titleBase} | Free Shipping $99+ | ZprintPro`.slice(0, 60)
    : `${titleBase} | 日本向け高品質印刷 | ジープリント`.slice(0, 60);
  return title;
}

const FROZEN = new Set(['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']);

const rows: any[] = [];
for (const p of products) {
  const row: any = { slug: p.slug, category_slug: p.category_slug, frozen: FROZEN.has(p.slug) };
  for (const loc of ['zh-hk', 'en', 'ja'] as const) {
    const st = seo[p.slug]?.[loc] ?? '';
    const effective = st || templateTitle(p as any, loc);
    row[loc] = { seo: st, effective, hw: hw(effective), cjk: (effective.match(/[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff]/g) || []).length };
  }
  rows.push(row);
}
fs.writeFileSync('.hermes/title-audit-final.json', JSON.stringify(rows, null, 1), 'utf8');

const band = (n: number) => (n < 50 ? 'FILL<50' : n <= 54 ? 'OK50-54' : n <= 60 ? 'LEGACY55-60' : 'RED>60');
for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const st: any = {};
  for (const r of rows) { const b = band(r[loc].hw); st[b] = (st[b] || 0) + 1; }
  console.log(loc, JSON.stringify(st));
}
console.log('\n=== zh-hk FILL (final) ===');
for (const r of rows.filter((r) => r['zh-hk'].hw < 50)) console.log(`  ${r['zh-hk'].hw}\t${r['zh-hk'].cjk}全角\t${r.slug}\t${r.frozen ? '[冻]' : ''}\t${r['zh-hk'].effective}`);
console.log('\n=== en FILL (final) ===');
for (const r of rows.filter((r) => r.en.hw < 50)) console.log(`  ${r.en.hw}\t${r.slug}\t${r.en.effective}`);
console.log('\n=== ja FILL (final) ===');
for (const r of rows.filter((r) => r.ja.hw < 50)) console.log(`  ${r.ja.hw}\t${r.slug}\t${r.ja.effective}`);
console.log('\n=== RED (final) ===');
for (const loc of ['zh-hk', 'en', 'ja'] as const) for (const r of rows.filter((r) => r[loc].hw > 60)) console.log(`  ${loc} ${r[loc].hw}\t${r.slug}\t${r[loc].effective}`);
