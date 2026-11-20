'use strict';
// 線上探針分析 — photo-book-printing-guide 三語 (§0.23.1 門童 0 命中 ≠ 線上乾淨)
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const locales = ['zh-hk', 'en', 'ja'];

// GSC 後台黑話 (per §0.23.1)
const gsc = /GSC|pos\s*\d|攻艱|攻堅|衝首頁|TOP\s*3|突入|gsc-fresh|\bimps?\b|impression[s]?\s*\d|點擊率數據|速贏詞|校準後/i;
// 簡體字樣本 (高頻)
const simp = /[书画门问说时间东华产国学期车电话后发对开关无体线标签页单价格质简]/;
// 禁用承諾
const promise = /保證|保证|承諾|承诺|確保|确保|已具備|已具备|已完成/;
// 錯字 / 雙品牌
const typo = /智印印港/;
const dual = /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/;
// 競品 MOQ 對比 (紅線)
const compMoq = /(vistaprint|moo\.com|moo |printed\.com|4over|saxoprint|mixam|blurb)/i;

function txt(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

const out = {};
for (const loc of locales) {
  const html = fs.readFileSync(path.join(dir, loc + '.html'), 'utf8');
  const body = txt(html);

  // title / description
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  const desc = (html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [, ''])[1];
  const canonical = (html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i) || [, ''])[1];

  // hreflang
  const hreflangs = [...html.matchAll(/<link[^>]+hreflang="([^"]+)"[^>]*>/gi)].map(m => m[0]);
  const hlCount = hreflangs.length;
  const hlTargets = [...html.matchAll(/hreflang="([^"]+)"/gi)].map(m => m[1]);

  // 半角當量
  const eq = (s) => {
    let n = 0;
    for (const ch of s) n += /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 2 : 1;
    return n;
  };

  // 內容塊計數
  const qaBlocks = (html.match(/qa-answer/g) || []).length;
  const tables = (html.match(/<table/gi) || []).length;
  const waMe = (html.match(/wa\.me/g) || []).length;
  const h2 = (html.match(/<h2/gi) || []).length;
  const imgInContent = (html.match(/<img/gi) || []).length;
  // 內鏈 (站內 blog/ 或 product/ 或 category/ 連結)
  const internal = new Set([...html.matchAll(/href="(\/(?:zh-hk|en|ja)\/(?:blog|product|category|services)\/[^"#?]*)"/g)].map(m => m[1]));
  // FAQ 可解析
  const faqQ = (body.match(/Q\d+[：:]/g) || []).length;
  const faqSchema = (html.match(/"@type"\s*:\s*"FAQPage"/g) || []).length;
  const articleSchema = (html.match(/"@type"\s*:\s*"Article"/g) || []).length;
  const bcSchema = (html.match(/"@type"\s*:\s*"BreadcrumbList"/g) || []).length;

  const hits = {
    gsc: (body.match(new RegExp(gsc.source, 'gi')) || []).slice(0, 8),
    simp: (body.match(new RegExp(simp.source, 'g')) || []).slice(0, 8),
    promise: (body.match(new RegExp(promise.source, 'g')) || []).slice(0, 8),
    typo: (body.match(new RegExp(typo.source, 'g')) || []).length,
    dual: (body.match(new RegExp(dual.source, 'g')) || []).length,
    compMoq: (body.match(new RegExp(compMoq.source, 'gi')) || []).slice(0, 8),
  };

  out[loc] = {
    title, titleEq: eq(title),
    desc, descEq: eq(desc),
    canonical,
    hreflangCount: hlCount,
    hreflangLangs: [...new Set(hlTargets)].join(','),
    qaBlocks, tables, waMe, h2,
    imgInContent,
    internalLinks: internal.size,
    faqQ, faqSchema, articleSchema, bcSchema,
    hits,
  };
}
console.log(JSON.stringify(out, null, 2));
