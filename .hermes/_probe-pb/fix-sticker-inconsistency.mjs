/**
 * sticker × 3 两个三语不一致点修复 (K3 2026-09-19 授权)
 *
 * ① 「PVC 防水貼紙 6 大實測優勢」小节: en = H2 **问句式**「Why Does PVC Waterproof Sticker Lead 6 Field Tests?」,
 *    zh-hk / ja = H3 **陈述式** ⇒ 标签层级 + 句式双重不一致。
 *    修法: zh-hk / ja 对齐 en (H2 问句式), 答案文字逐字保留。
 * ② ja 缺「延伸閱讀 / Further Reading」整节 (zh-hk 与 en 均有, 各 11 条内链) ⇒ 补建等价日文节。
 *
 * 铁律: 仅改标题行 / 仅新增该节; 其余字节逐字不变 (断言保证)。
 * 用法: node .hermes/_probe-pb/fix-sticker-inconsistency.mjs [--apply]
 */
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const SLUG = 'sticker-material-pvc-vinyl-removable';
const CLS = 'text-[#2873F5] hover:underline';

// ① 标题对齐: zh-hk / ja 的 H3 陈述式 → H2 问句式 (与 en 同构)
const HEADING = {
  'zh-hk': ['<h3>PVC 防水貼紙 6 大實測優勢</h3>', '<h2>PVC 防水貼紙點解 6 項實測都勝出?</h2>'],
  ja: ['<h3>PVC 防水ステッカー 6 大実測優位性</h3>', '<h2>PVC 防水ステッカーはなぜ 6 項目の実測で優位なのか?</h2>'],
};

// ② ja 延伸閱讀节 (镜像 zh-hk/en 的 11 条内链目标, 日文锚文本 + 说明)
const JA_SECTION = `
<h2>関連記事</h2>

<ul class="list-disc pl-5 space-y-1">
<li>PVC 防水ステッカーの製造工程を詳しく知るには <a href="/ja/blog/packaging-box-pricing-2026/" class="${CLS}">パッケージボックス印刷価格 2026 完全ガイド</a>（9 素材 + 5 加工の比較付き）をご覧ください。</li>
<li>箔押しステッカーの 6 種箔素材（金箔 / 銀箔 / ローズゴールド / ホログラム / マットゴールド / マットシルバー）の用途は <a href="/ja/blog/foil-stamping-3-applications-2026/" class="${CLS}">箔押し印刷 3 大活用法</a> をご覧ください。</li>
<li>学園 / メニュー / ポスター / 招待状などの印刷は <a href="/ja/" class="${CLS}">ZprintPro ホーム</a> で 8 業界すべての印刷サービスを確認できます。</li>
<li>パッケージボックス / ギフトボックス / 化粧品箱の素材は <a href="/ja/blog/" class="${CLS}">パッケージ関連ブログ</a> をご覧ください。</li>
<li>当日急ぎの印刷（18:00 締切・翌日 12:00 受取）は <a href="/ja/services/rush-printing-delivery/" class="${CLS}">ZprintPro 即日特急サービス</a> をご利用ください。</li>
<li>防水ステッカーの見積もりを直接確認するには <a href="/ja/category/stickers/" class="${CLS}">防水ステッカー 5 大素材</a> をご覧ください。</li>
<li>PVC 防水ステッカーの仕様は <a href="/ja/product/waterproof-stickers/" class="${CLS}">PVC 防水ステッカー SKU</a> で確認できます。</li>
<li>導入事例は <a href="/ja/blog/" class="${CLS}">ZprintPro 導入事例</a> をご覧ください。</li>
<li>越境 EC の物流については <a href="/ja/blog/cross-border-ecommerce-shipping-box-guide/" class="${CLS}">越境 EC 物流ガイド</a> をご覧ください。</li>
<li>飲食店メニューの印刷は <a href="/ja/category/menus/" class="${CLS}">メニュー印刷</a> をご覧ください。</li>
<li>FDA 食品グレード認証については <a href="/ja/blog/food-packaging-printing-guide/" class="${CLS}">FDA 食品グレード認証ガイド</a> をご覧ください。</li>
</ul>`;

let issues = 0;
for (const loc of ['zh-hk', 'ja']) {
  const p = `src/data/blog-data/${loc}.json`;
  const data = JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
  const entry = data[SLUG];
  if (!entry) { console.log(`🔴 ${loc}: 无该 slug`); issues++; continue; }
  let c = entry.content;
  const before = c;

  // ① 标题对齐
  const [oldH, newH] = HEADING[loc];
  if (c.includes(oldH)) {
    c = c.replace(oldH, newH);
    console.log(`  ${APPLY ? '改写' : 'DRY-RUN'} ${loc}: 「${oldH}」→「${newH}」`);
  } else {
    console.log(`  ✅ ${loc}: 标题已是目标形态 (幂等跳过)`);
  }

  // ② ja 补延伸閱讀节 (插到 content 末尾)
  if (loc === 'ja' && !/関連記事|延伸閱讀|Further Reading/.test(c)) {
    c = c + JA_SECTION + '\n';
    console.log(`  ${APPLY ? '补建' : 'DRY-RUN'} ja: 「関連記事」节 (${JA_SECTION.length} 字节, 11 条内链)`);
  } else if (loc === 'ja') {
    console.log('  ✅ ja: 已有関連記事/延伸閱讀节 (幂等跳过)');
  }

  if (c === before) { console.log(`  ℹ️  ${loc}: 无改动`); continue; }

  // 断言: 改动必须恰好 = 标题替换 + (ja) 追加节, 其余字节不动
  let check = c;
  if (c.includes(newH)) check = check.replace(newH, oldH);
  if (loc === 'ja') check = check.replace(JA_SECTION + '\n', '');
  if (check !== before) { console.log(`  🔴 ${loc}: 断言失败 — 存在预期外改动, abort`); issues++; continue; }
  console.log(`  ✅ ${loc}: 断言通过 | content ${before.length} → ${c.length}`);
  if (APPLY) { entry.content = c; fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8'); }
}
console.log(`\n模式=${APPLY ? 'APPLY' : 'DRY-RUN'} | 异常=${issues}`);
process.exit(issues ? 1 : 0);
