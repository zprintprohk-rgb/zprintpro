/**
 * L1-1 SERP 实查驱动 — webbridge 真浏览器查 7 条「位置好零点击」钱词的香港 Google SERP
 * 输出: .hermes/reports/l1-1-serp-check-2026-09-21.json
 * 纪律: 只读浏览（不点击广告/不登录任何操作）；每查询提取 SERP 特征信号 + 前 10 自然结果标题。
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DAEMON = 'http://127.0.0.1:10086/command';
const SESSION = 'l1-1-serp-check';

const QUERIES = [
  { q: '食品包裝印刷', hl: 'zh-HK', note: 'P1 145imp pos6.65' },
  { q: 'a6 尺寸', hl: 'zh-HK', note: 'P1 97imp pos8.86' },
  { q: 'small batch sticker printing', hl: 'en', note: 'P1 69imp pos6.61' },
  { q: '小冊子印刷', hl: 'zh-HK', note: 'P1 48imp pos10.04' },
  { q: '大信封', hl: 'zh-HK', note: 'P1 45imp pos4.42' },
  { q: 'small batch stickers', hl: 'en', note: 'P1 40imp pos5.53' },
  { q: '邊度有紙袋買', hl: 'zh-HK', note: 'P1 36imp pos7.44' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cmd(action, args) {
  const res = await fetch(DAEMON, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, args, session: SESSION }),
  });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.success === false) throw new Error(`${action} failed: ${JSON.stringify(j).slice(0, 300)}`);
  return j.data !== undefined ? j.data : j;
}

const MARKER_JS = `(() => {
  const t = document.body ? document.body.innerText : '';
  const head = t.slice(0, 6000);
  const h3s = [...document.querySelectorAll('h3')].slice(0, 10).map((h) => h.innerText).filter(Boolean);
  return JSON.stringify({
    url: location.href,
    title: document.title,
    aiOverview: /AI (Overview|概覽|总览|總覽)/i.test(head) || !!document.querySelector('[data-attrid="AIOverview"]'),
    shopping: /購物|shopping/i.test(document.title) || !!document.querySelector('div[data-initq]') || /熱賣|暢銷/.test(head),
    localPack: !!document.querySelector('#placelist') || /在地圖上查看|Google 地圖|商家/.test(head),
    adsTop: !!document.querySelector('.ads-ad, [data-text-ad], #tads'),
    hasZprintpro: t.includes('zprintpro') || t.includes('智印港'),
    h3s,
  });
})()`;

const out = [];
let first = true;
for (const { q, hl, note } of QUERIES) {
  const url = `https://www.google.com.hk/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=hk&pws=0`;
  try {
    await cmd('navigate', first ? { url, newTab: true, group_title: 'L1-1 SERP 實查（7 錢詞）' } : { url });
    first = false;
    await sleep(3500); // 等 SERP 渲染（含 AI Overview 异步注入）
    const r = await cmd('evaluate', { code: MARKER_JS });
    const parsed = JSON.parse(r.value || '{}');
    out.push({ q, note, ...parsed });
    console.log(`✅ ${q}: ai=${parsed.aiOverview} shop=${parsed.shopping} local=${parsed.localPack} ads=${parsed.adsTop} zprintpro=${parsed.hasZprintpro} organic=${parsed.h3s ? parsed.h3s.length : 0}`);
  } catch (e) {
    out.push({ q, note, error: String(e).slice(0, 300) });
    console.error(`🔴 ${q}: ${String(e).slice(0, 200)}`);
  }
}

fs.writeFileSync(path.join(ROOT, '.hermes/reports/l1-1-serp-check-2026-09-21.json'), JSON.stringify(out, null, 2));
console.log('\n[report] .hermes/reports/l1-1-serp-check-2026-09-21.json');
