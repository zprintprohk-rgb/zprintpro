// moq10-verify-scene-moq.ts — 驗證場景卡片起印量確實由 SSoT 渲染（三語）
import { withSceneMoq, sceneMoqLabel, SCENE_MOQ_SOURCE } from '../src/data/print-method-policy';
import { products } from '../src/data/products';

const LOCALES = ['zh-hk', 'en', 'ja'] as const;

let pass = 0;
let fail = 0;
const check = (cond: boolean, msg: string) => {
  if (cond) {
    pass++;
    console.log(`  ✓ ${msg}`);
  } else {
    fail++;
    console.log(`  🔴 ${msg}`);
  }
};

console.log('=== 1. 場景 → SKU 對照與真值 ===');
for (const [scene, slug] of Object.entries(SCENE_MOQ_SOURCE)) {
  const p = products.find((x) => x.slug === slug);
  console.log(`  ${scene.padEnd(18)} → ${slug.padEnd(24)} minQuantity=${p?.minQuantity ?? '🔴 找不到'}`);
}

console.log('\n=== 2. 實際卡片文案對照（原 → 新）===');
/** 線上／源碼的原始第三行 */
const CARDS: [string, string, string][] = [
  ['graduation', 'zh-hk', '全彩內頁 · 100 本起'],
  ['graduation', 'en', 'Full-color · from 100'],
  ['graduation', 'ja', 'フルカラー・100冊から'],
  ['certificates', 'zh-hk', 'A4 尺寸 · 50 張起'],
  ['certificates', 'en', 'A4 size · from 50'],
  ['certificates', 'ja', 'A4サイズ・50枚から'],
  ['tutoring_textbook', 'zh-hk', '無線膠裝 · 50 本起 · 7 天交貨'],
  ['tutoring_textbook', 'en', 'Perfect bound · from 50 · 7-day'],
  ['tutoring_textbook', 'ja', '無線綴じ・50冊から・7日納品'],
];

for (const [scene, loc, origLine3] of CARDS) {
  const lines = ['第一行', '第二行', origLine3];
  const out = withSceneMoq(scene, loc as (typeof LOCALES)[number], lines);
  const truth = products.find((p) => p.slug === SCENE_MOQ_SOURCE[scene])?.minQuantity;
  const ok = out[2].includes(String(truth));
  if (ok) pass++;
  else fail++;
  console.log(`  ${ok ? '✓' : '🔴'} [${scene}/${loc}] 原「${origLine3}」→ 新「${out[2]}」(真值 ${truth})`);
}

console.log('\n=== 3. 斷言：前兩行永不變動、原陣列不被就地修改 ===');
const orig = ['畢業紀念冊印刷 · 精裝', '布面硬皮 + 燙金校名', '全彩內頁 · 100 本起'];
const out = withSceneMoq('graduation', 'zh-hk', orig);
check(out[0] === orig[0] && out[1] === orig[1], '第 1、2 行不變');
check(orig[2] === '全彩內頁 · 100 本起', '原陣列未被就地修改');
check(out !== orig, '回傳新陣列（非同一參考）');

console.log('\n=== 4. 斷言：無 MOQ 宣稱的卡片（2 行）不追加 ===');
check(withSceneMoq('workbook', 'zh-hk', ['補習社皇牌教材印刷', '道林紙 80g']).length === 2, '2 行文案維持 2 行');

console.log('\n=== 5. 斷言：未註冊場景回傳 null（呼叫端保留原文案）===');
check(sceneMoqLabel('not_registered_scene', 'zh-hk') === null, '未註冊場景 → null');
check(
  withSceneMoq('not_registered_scene', 'zh-hk', ['a', 'b', 'c']).join('|') === 'a|b|c',
  '未註冊場景 → 文案原樣回傳'
);

console.log(`\n結果: PASS ${pass} / FAIL ${fail}`);
process.exit(fail === 0 ? 0 : 1);
