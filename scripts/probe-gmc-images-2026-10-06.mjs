/**
 * 聚焦探针: 年賀状(贺卡 ja) 图片 URL 实际响应 + 对照组 (2026-10-06)
 * 目的: 判定 GSC「图片类型不受支持」根因 = WebP 格式 / URL 响应异常
 */
const SITE_IMG = 'https://zprintpro-19p.pages.dev';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  { tag: '年賀状-premium', url: `${SITE_IMG}/images/v26/greeting-cards/premium/ja/hero.webp` },
  { tag: '年賀状-foil', url: `${SITE_IMG}/images/v26/greeting-cards/foil/ja/hero.webp` },
  { tag: '年賀状-spotuv', url: `${SITE_IMG}/images/v26/greeting-cards/spot-uv/ja/hero.webp` },
  { tag: '年賀状-matte', url: `${SITE_IMG}/images/v26/greeting-cards/matte/ja/hero.webp` },
  { tag: '年賀状-rounded', url: `${SITE_IMG}/images/v26/greeting-cards/rounded-corner/ja/hero.webp` },
  { tag: '对照-贺卡-zh-hk', url: `${SITE_IMG}/images/v26/greeting-cards/premium/zh-hk/hero.webp` },
  { tag: '对照-官方域名同图', url: `https://zprintpro.com/images/v26/greeting-cards/premium/ja/hero.webp` },
];

for (const t of TARGETS) {
  try {
    const res = await fetch(t.url, { headers: { 'User-Agent': 'Googlebot-Image/1.0' } });
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf.slice(0, 16));
    let magic = '';
    if (bytes[0] === 0xff && bytes[1] === 0xd8) magic = 'JPEG';
    else if (bytes[0] === 0x89 && bytes[1] === 0x50) magic = 'PNG';
    else if (bytes[0] === 0x47 && bytes[1] === 0x49) magic = 'GIF';
    else if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[8] === 0x57) magic = 'WEBP(RIFF)';
    else magic = bytes[0] === 0x3c ? 'HTML!' : 'UNKNOWN(' + Array.from(bytes.slice(0, 4)).join(',') + ')';
    console.log(`${t.tag}\n  ${res.status} ${res.headers.get('content-type')} | ${buf.byteLength}B | magic=${magic}\n  ${t.url}`);
  } catch (e) {
    console.log(`${t.tag}\n  FETCH-ERR: ${e.message}\n  ${t.url}`);
  }
  await sleep(150);
}
