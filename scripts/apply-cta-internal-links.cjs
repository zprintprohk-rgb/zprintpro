#!/usr/bin/env node
/**
 * E4 CTA + 語義內鏈補齊 (K3 2026-09-21 指令)
 *
 * 門童 #14 段10: wa.me CTA 恰好 2 處（頂 1 + 底 1）; 段11: 達標內鏈（錨≥5字）≥10。
 * 修法 = 門童自帶建議（1 回首页 + 4 品类 + 3 SKU PDP + 2 主題）。
 *
 * 真值核驗（§0.22 SOP-10 問3）:
 *   - 全部 href 已實錄驗證: blog slug 9/9 三語齊套（本腳本寫入前實測）;
 *     category slug 出自 products.ts L124-141 (stickers/flyers/packaging/posters/books/educational...);
 *     /services/rush-printing-delivery/ 在 zh-hk/ja 活內容有實錄（[locale] 動態路由三語通用）。
 *   - 錨文字全部 ≥5 字且描述性; 無「點擊這裡」類。
 *
 * 機制: 冪等標記 data-e4 + 備份 + 寫後 CTA/內鏈計數斷言（門童同口徑正則複算）。
 * 用法: node scripts/apply-cta-internal-links.cjs --apply
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const APPLY = process.argv.includes('--apply');
const MARK = 'data-e4="2026-09-21"';
const WA = 'https://wa.me/8619880851334';

// ── 三語詞匯 ─────────────────────────────────────────────
const V = {
  'zh-hk': {
    head: '🔗 延伸閱讀與相關服務',
    home: '智印港首頁',
    topCta: (t) => `<p class="my-4">👉 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a>，30 秒 AI 即時報價，24 小時內回覆。</p>`,
    botCta: (t) => `<p class="my-4">📲 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a>，免費數碼打稿，滿意先睇稿後開印。</p>`,
    waTop: 'WhatsApp 即日免費報價',
    waBot: 'WhatsApp 聯絡智印港',
  },
  'en': {
    head: '🔗 Related Guides & Services',
    home: 'ZprintPro Home',
    topCta: (t) => `<p class="my-4">👉 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a> — 30-second AI quote, reply within 24 hours.</p>`,
    botCta: (t) => `<p class="my-4">📲 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a> — free digital proof before printing.</p>`,
    waTop: 'WhatsApp Instant Quote',
    waBot: 'WhatsApp ZprintPro',
  },
  'ja': {
    head: '🔗 関連ガイド・サービス',
    home: 'ZprintPro ホーム',
    topCta: (t) => `<p class="my-4">👉 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a> — 30秒 AI 見積、24時間以内に回答。</p>`,
    botCta: (t) => `<p class="my-4">📲 <a href="${WA}" target="_blank" rel="noopener"><strong>${t}</strong></a> — 印刷前の無料デジタル校正付き。</p>`,
    waTop: 'WhatsApp 即時見積',
    waBot: 'ZprintPro WhatsApp',
  },
};

// ── 每條目配置 ────────────────────────────────────────────
// cta: 'both'|'bottom'|null ; links: [anchor, href] 追加清單（已避開既有 href）
const PLAN = {
  'poster-printing-guide': {
    'en': { cta: 'both', links: [
      ['ZprintPro Home', '/en/'],
      ['Poster Size Guide A0 to A4', '/en/blog/poster-size-guide/'],
      ['Flyer Printing Category', '/en/category/flyers/'],
      ['FDA Food-Grade Packaging Guide', '/en/blog/food-packaging-printing-guide/'],
    ]},
    'ja': { cta: 'both', links: [
      ['ZprintPro ホーム', '/ja/'],
      ['チラシ印刷カテゴリー', '/ja/category/flyers/'],
      ['越境EC物流ボックスガイド', '/ja/blog/cross-border-ecommerce-shipping-box-guide/'],
    ]},
  },
  'school-exercise-book-printing-guide': {
    'en': { cta: null, links: [
      ['ZprintPro Home', '/en/'],
      ['Educational Printing Category', '/en/category/educational/'],
      ['Book Printing Category', '/en/category/books/'],
      ['Same-Day Rush Printing Service', '/en/services/rush-printing-delivery/'],
      ['FDA Food-Grade Printing Guide', '/en/blog/food-packaging-printing-guide/'],
      ['Poster Printing Complete Guide', '/en/blog/poster-printing-guide/'],
    ]},
    'ja': { cta: null, links: [
      ['ZprintPro ホーム', '/ja/'],
      ['教育印刷カテゴリー', '/ja/category/educational/'],
      ['書籍印刷カテゴリー', '/ja/category/books/'],
      ['即日特急印刷サービス', '/ja/services/rush-printing-delivery/'],
      ['FDA食品グレード印刷ガイド', '/ja/blog/food-packaging-printing-guide/'],
      ['ポスター印刷完全ガイド', '/ja/blog/poster-printing-guide/'],
    ]},
    'zh-hk': { cta: null, links: [
      ['智印港首頁', '/zh-hk/'],
      ['校園教育印刷品類', '/zh-hk/category/educational/'],
      ['書籍印刷品類', '/zh-hk/category/books/'],
      ['即日特急印刷服務', '/zh-hk/services/rush-printing-delivery/'],
      ['FDA 食品級認證完整指南', '/zh-hk/blog/food-packaging-printing-guide/'],
      ['海報印刷完全指南', '/zh-hk/blog/poster-printing-guide/'],
    ]},
  },
  'packaging-box-pricing-2026': {
    'zh-hk': { cta: null, links: [
      ['智印港首頁', '/zh-hk/'],
      ['海報印刷完全指南', '/zh-hk/blog/poster-printing-guide/'],
    ]},
  },
  'sticker-material-pvc-vinyl-removable': {
    'ja': { cta: 'bottom', links: [] },
  },
};

// ── 計數（與門童 #14 同口徑）────────────────────────────
function countCta(c) { return (c.match(/wa\.me\/\d+/g) || []).length; }
function countAnchors(c) {
  const linkRe = /<a[^>]*href=["'](\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/g;
  let m, n = 0;
  while ((m = linkRe.exec(c)) !== null) {
    const href = m[1];
    if (!/^\/(zh-hk|en|ja)\//.test(href) && !/^\/(blog|product|category)\b/.test(href)) continue;
    if (m[2].replace(/<[^>]+>/g, '').length >= 5) n++;
  }
  return n;
}

function linksBlock(loc, links) {
  const items = links.map(([t, h]) => `<li><a href="${h}" class="text-[#1A56DB] underline">${t}</a></li>`).join('');
  return `\n<div ${MARK} class="bg-gray-50 rounded-lg p-4 my-6"><p class="font-semibold mb-2">${V[loc].head}</p><ul class="list-disc pl-5 space-y-1 text-sm">${items}</ul></div>\n`;
}

let pass = 0, skip = 0, fail = 0;
for (const [slug, perLoc] of Object.entries(PLAN)) {
  for (const [loc, cfg] of Object.entries(perLoc)) {
    const fp = path.join(ROOT, 'src/data/blog-data', `${loc}.json`);
    const raw = fs.readFileSync(fp, 'utf8');
    const data = JSON.parse(raw);
    const entry = data[slug];
    const tag = `${loc}/${slug}`;
    if (!entry) { console.log(`🔴 ${tag}: 無此 slug`); fail++; continue; }
    if (entry.content.includes(MARK) && (!cfg.cta || countCta(entry.content) >= 2)) {
      console.log(`⏭ ${tag}: 已處理, 跳過`); skip++; continue;
    }
    // 防重: 既有 href 不再追加
    const fresh = cfg.links.filter(([, h]) => !entry.content.includes(`"${h}"`) && !entry.content.includes(`>${h}<`));
    const ctaBefore = countCta(entry.content);
    let c = entry.content;

    if (cfg.cta === 'both' && ctaBefore === 0) {
      const firstP = c.indexOf('</p>');
      c = firstP !== -1
        ? c.slice(0, firstP + 4) + '\n' + V[loc].topCta(V[loc].waTop) + c.slice(firstP + 4)
        : V[loc].topCta(V[loc].waTop) + c;
    }
    // 底部: 內鏈塊 + 底部 CTA, 插在 E3 來源行之前（無則文末）
    let tail = '';
    if (fresh.length) tail += linksBlock(loc, fresh);
    if (cfg.cta && countCta(c + tail) < 2) tail += '\n' + V[loc].botCta(V[loc].waBot);
    if (tail) {
      const srcIdx = c.lastIndexOf('data-src-line=');
      const insertAt = srcIdx !== -1 ? c.lastIndexOf('<p', srcIdx) : c.length;
      c = c.slice(0, insertAt) + tail + c.slice(insertAt);
    }
    entry.content = c;

    // 寫後斷言（門童同口徑複算）
    const ctaAfter = countCta(entry.content);
    const anchorsAfter = countAnchors(entry.content);
    const ctaOk = cfg.cta ? (ctaAfter === 2) : true;
    const linkOk = cfg.links.length === 0 ? true : anchorsAfter >= 10;
    if (!ctaOk || !linkOk) {
      console.log(`🔴 ${tag}: 斷言失敗 CTA ${ctaBefore}→${ctaAfter} (需=2) | 內鏈=${anchorsAfter} (需≥10)`);
      fail++;
      continue;
    }
    if (APPLY) {
      const backup = path.join(ROOT, `.hermes/_bak-e4-${loc}-20260921.json`);
      fs.writeFileSync(backup, raw);
      fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n');
      const check = JSON.parse(fs.readFileSync(fp, 'utf8'))[slug].content;
      const markerOk = fresh.length === 0 ? true : check.includes(MARK);
      if (countCta(check) !== ctaAfter || countAnchors(check) !== anchorsAfter || !markerOk) {
        console.log(`🔴 ${tag}: 寫後複驗失敗`); fail++; continue;
      }
    }
    console.log(`✅ ${tag}: CTA ${ctaBefore}→${ctaAfter} | 內鏈 +${fresh.length} → ${anchorsAfter}`);
    pass++;
  }
}
console.log(`\n${APPLY ? 'APPLY' : 'DRY-RUN'} 完成: ✅ ${pass} / ⏭ ${skip} / 🔴 ${fail}`);
if (!APPLY) console.log('確認無誤後加 --apply 寫入');
process.exit(fail ? 1 : 0);
