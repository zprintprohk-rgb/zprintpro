/**
 * GMC feed 线上探针 (2026-10-06)
 * 只读探测, 不写任何数据:
 *  1. 拉取 3 locale 线上 feed (/api/merchant-feed/{zh-hk,en,ja}/)
 *  2. 统计 item 数, 列出 title 含「年賀状」的 item 及其 image_link
 *  3. 逐个校验全部唯一 image_link: HTTP 状态 + Content-Type (串行 + 120ms 间隔)
 *  4. 校验 4 个已下架 SKU 落地页 URL 状态 (期望 308)
 *  5. 校验 sku_code 唯一性 (从本地 products.ts 不读, 以 feed id 为准)
 * 输出: 控制台报告 (UTF-8)
 */
const FEEDS = ['zh-hk', 'en', 'ja'];
const SITE = 'https://zprintpro.com';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseItems(xml) {
  const items = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const block = m[1];
    const pick = (tag) => {
      const t = new RegExp(`<g:${tag}>([\\s\\S]*?)</g:${tag}>`).exec(block);
      return t ? t[1].trim() : '';
    };
    items.push({
      id: pick('id'),
      title: pick('title'),
      price: pick('price'),
      image: pick('image_link'),
      availability: pick('availability'),
      color: pick('color'),
    });
  }
  return items;
}

async function head(url) {
  try {
    const res = await fetch(url, { method: 'GET', headers: { Range: 'bytes=0-64', 'User-Agent': 'zprintpro-gmc-probe/1.0' }, redirect: 'manual' });
    // drain tiny body
    try { await res.arrayBuffer(); } catch {}
    return { status: res.status, ct: res.headers.get('content-type') || '', loc: res.headers.get('location') || '' };
  } catch (e) {
    return { status: -1, ct: 'ERR: ' + e.message, loc: '' };
  }
}

async function main() {
  const report = { feeds: {}, badImages: [], delisted: [], nenga: [] };
  const allImageUrls = new Set();
  const nengaByFeed = {};
  const idDupes = {};

  for (const loc of FEEDS) {
    const url = `${SITE}/api/merchant-feed/${loc}/`;
    const res = await fetch(url, { headers: { 'User-Agent': 'zprintpro-gmc-probe/1.0' } });
    const xml = await res.text();
    const items = parseItems(xml);
    report.feeds[loc] = { http: res.status, bytes: xml.length, items: items.length };
    const ids = items.map((i) => i.id);
    for (const id of ids) idDupes[id] = (idDupes[id] || 0) + 1;
    const nenga = items.filter((i) => /年賀状|年賀/.test(i.title));
    nengaByFeed[loc] = nenga.map((i) => ({ id: i.id, title: i.title, price: i.price, image: i.image, color: i.color || '(无 color)' }));
    if (loc === 'ja') report.nenga = nengaByFeed[loc];
    for (const i of items) if (i.image) allImageUrls.add(i.image);
    await sleep(200);
  }

  // sku_code 是否跨 feed 冲突 (同 id 不同 title => 本地数据异常)
  report.dupIdsInFeed = Object.entries(idDupes).filter(([, n]) => n > 1).map(([id, n]) => `${id} x${n}`);

  console.log('=== FEED 概览 ===');
  for (const loc of FEEDS) console.log(`${loc}: HTTP ${report.feeds[loc].http}, items=${report.feeds[loc].items}, bytes=${report.feeds[loc].bytes}`);
  console.log(`跨 feed 重复 id: ${report.dupIdsInFeed.length === 0 ? '无' : report.dupIdsInFeed.join(', ')}`);

  console.log('\n=== ja feed 中「年賀状」item (GSC 报「图片类型不受支持」的嫌疑组) ===');
  for (const i of report.nenga) console.log(`- id=${i.id} | ${i.title} | price=${i.price} | color=${i.color}\n  img=${i.image}`);

  console.log(`\n=== 图片校验 (唯一 image_link 共 ${allImageUrls.size} 个, 串行) ===`);
  let idx = 0;
  const bad = [];
  for (const u of allImageUrls) {
    idx++;
    const r = await head(u);
    const isImg = r.status === 200 || r.status === 206;
    const ctOk = /image\//i.test(r.ct);
    if (!isImg || !ctOk) bad.push({ url: u, status: r.status, ct: r.ct });
    if (idx % 50 === 0) console.log(`  ...已校验 ${idx}/${allImageUrls.size}`);
    await sleep(120);
  }
  console.log(`图片校验完成: ${allImageUrls.size - bad.length}/${allImageUrls.size} 正常 (200/206 + image/*)`);
  if (bad.length) {
    console.log('异常图片:');
    for (const b of bad) console.log(`- ${b.status} ${b.ct} ${b.url}`);
  } else {
    console.log('异常图片: 无');
  }

  console.log('\n=== 已下架 SKU 落地页状态 (期望 308 → japan-doujin) ===');
  const delistedUrls = [
    '/en/product/acrylic-keychain/',
    '/ja/product/acrylic-keychain/',
    '/en/product/can-badge/',
    '/zh-hk/product/can-badge/',
  ];
  for (const p of delistedUrls) {
    const r = await head(SITE + p);
    console.log(`${r.status} ${p}${r.loc ? ' → ' + r.loc : ''}`);
    await sleep(150);
  }

  console.log('\n=== 抽查 ja 贺卡 PDP (当前在架 SKU 页面应 200) ===');
  for (const slug of ['premium-greeting-cards', 'foil-greeting-cards', 'rounded-corner-greeting-cards']) {
    const r = await head(`${SITE}/ja/product/${slug}/`);
    console.log(`${r.status} /ja/product/${slug}/`);
    await sleep(150);
  }
}

main().catch((e) => { console.error('PROBE FAILED:', e); process.exit(1); });
