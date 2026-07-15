// 综合 verify 4 cron 全部验证点 (GSC + 列表页 + P3 en/ja)
const checks = [
  // GSC redirect 修
  { name: 'GSC: /en/guide/design-file-specs/ 1 跳 308', url: 'https://zprintpro.com/en/guide/design-file-specs/', expect: async (r) => {
    if (r.status !== 308) return `status=${r.status} (期望 308)`;
    return null;
  }},
  // 列表页标题修复 (cae8fad)
  { name: 'zh-hk /category/stickers/ 防水贴纸 V8', url: 'https://zprintpro.com/zh-hk/category/stickers/', expect: async (r) => {
    const t = await r.text();
    const h3s = t.match(/<h3[^>]*>([^<]+)<\/h3>/g) || [];
    const titles = h3s.map(x => x.match(/<h3[^>]*>([^<]+)</)[1]);
    const has防水 = titles.some(x => x.includes('防水') && (x.includes('智印雲') || x.includes('ZprintPro')));
    const has简体 = titles.some(x => /贴纸|包装/.test(x)); // 简体字
    if (has简体) return '仍有简体字 (贴纸)';
    if (!has防水) return '未找到 V8 优化版标题';
    return null;
  }},
  { name: 'zh-hk /category/posters/ A2海报 V8', url: 'https://zprintpro.com/zh-hk/category/posters/', expect: async (r) => {
    const t = await r.text();
    const h3s = t.match(/<h3[^>]*>([^<]+)<\/h3>/g) || [];
    const titles = h3s.map(x => x.match(/<h3[^>]*>([^<]+)</)[1]);
    const hasA2 = titles.some(x => x.includes('A2海報印刷') && !x.match(/A2海報.*A2海報/));
    if (!hasA2) return 'A2 海报 V8 优化版缺失';
    return null;
  }},
  { name: 'zh-hk /category/paper-bags/ 牛皮纸袋 V8', url: 'https://zprintpro.com/zh-hk/category/paper-bags/', expect: async (r) => {
    const t = await r.text();
    const h3s = t.match(/<h3[^>]*>([^<]+)<\/h3>/g) || [];
    const titles = h3s.map(x => x.match(/<h3[^>]*>([^<]+)</)[1]);
    const has牛皮 = titles.some(x => x.includes('牛皮') && (x.includes('智印雲') || x.includes('ZprintPro')));
    if (!has牛皮) return '牛皮纸袋 V8 缺失';
    return null;
  }},
  // P3 en 修 (9f11353)
  { name: 'en /product/same-day-flyers/ 无重复 ZprintPro', url: 'https://zprintpro.com/en/product/same-day-flyers/', expect: async (r) => {
    const t = await r.text();
    const titleM = t.match(/<title>([^<]+)<\/title>/);
    if (!titleM) return 'no title';
    const title = titleM[1];
    const repeat = (title.match(/ZprintPro/g) || []).length > 1;
    if (repeat) return '仍有重复 ZprintPro: ' + title;
    if (!title.includes('Free US Ship')) return '缺少 Free US Ship';
    return null;
  }},
  // P3 en CTA (4c0fb8a)
  { name: 'en /product/same-day-flyers/ CTA sharp hook', url: 'https://zprintpro.com/en/product/same-day-flyers/', expect: async (r) => {
    const t = await r.text();
    const m = t.match(/<meta name="description" content="([^"]+)"/);
    if (!m) return 'no meta';
    if (!m[1].includes('Free Design')) return 'meta 缺 Free Design';
    return null;
  }},
  // P3 ja 修 (9f11353)
  { name: 'ja /product/kraft-paper-bags/ alt 100枚〜', url: 'https://zprintpro.com/ja/product/kraft-paper-bags/', expect: async (r) => {
    const t = await r.text();
    const altM = t.match(/<img[^>]*alt="([^"]+)"/g) || [];
    const alts = altM.map(x => x.match(/alt="([^"]+)"/)[1]);
    const has100 = alts.some(a => a.includes('100枚') || a.includes('100個'));
    if (!has100) return 'alt 缺 100枚〜';
    return null;
  }},
  // P3 ja CTA (4c0fb8a)
  { name: 'ja /product/kraft-paper-bags/ meta 無料', url: 'https://zprintpro.com/ja/product/kraft-paper-bags/', expect: async (r) => {
    const t = await r.text();
    const m = t.match(/<meta name="description" content="([^"]+)"/);
    if (!m) return 'no meta';
    if (!m[1].includes('無料')) return 'meta 缺 無料デザイン';
    return null;
  }},
];
let allPass = true;
for (const c of checks) {
  try {
    const r = await fetch(c.url, { redirect: 'manual' });
    const fail = await c.expect(r);
    if (fail) {
      console.log('✗', c.name, '-', fail);
      allPass = false;
    } else {
      console.log('✓', c.name);
    }
  } catch (e) {
    console.log('✗', c.name, '-', e.message);
    allPass = false;
  }
}
console.log(allPass ? '\n✅ 8/8 PASS - 全部 P3 + GSC 修 + 列表页同步生效' : '\n❌ 有验证失败');
