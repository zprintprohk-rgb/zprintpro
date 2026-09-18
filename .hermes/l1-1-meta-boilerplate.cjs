/** 量化: PDP meta description 样板句 + 重复词 bug 的覆盖面 (只读) */
const SLUGS = ['a2-posters', 'waterproof-stickers', 'business-envelopes', 'large-envelopes', 'saddle-stitch-booklets', 'custom-calendars', 'electronics-packaging-box', 'food-boxes', 'small-batch-stickers', 'exercise-books', 'catalog-printing', 'doujinshi-printing'];
const TEMPLATE = /採用 .{2,20} 高品質材質，支援 .{2,40} 多種規格，提供 4 色 CMYK 全彩印刷、logo 圖案自由設計。$/;
(async () => {
  let tpl = 0, dup = 0, n = 0;
  for (const s of SLUGS) {
    for (const loc of ['zh-hk']) {
      const u = `https://zprintpro.com/${loc}/product/${s}/`;
      try {
        const r = await fetch(u, { redirect: 'follow' });
        if (r.status !== 200) { console.log(`  [${s}] HTTP ${r.status}`); continue; }
        const h = await r.text();
        const meta = (h.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || [])[1] || '';
        const isTpl = TEMPLATE.test(meta);
        // 重复词 bug: "A/A " 或 "A A 100 個起"
        const dm = meta.match(/^(.{2,12})\/\1/);
        n++; if (isTpl) tpl++; if (dm) dup++;
        console.log(`  [${s}] 样板句=${isTpl ? '★是' : '否'} 重复词bug=${dm ? '★' + dm[1] + '/' + dm[1] : '否'}  meta长度=${meta.length}`);
      } catch (e) { console.log(`  [${s}] ERR ${e.message.slice(0, 40)}`); }
    }
  }
  console.log(`\n汇总: 抽查 ${n} 个 zh-hk PDP → 模板样板句 ${tpl} 个 / 重复词 bug ${dup} 个`);
})();
