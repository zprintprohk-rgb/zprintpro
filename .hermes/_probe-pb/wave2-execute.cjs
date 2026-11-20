'use strict';
/**
 * 波 2 执行: ja 侧 5 条术语 (K3 已拍板译法; ハイデルベルク 以 DS 原值「ク」为准)
 *  國際認證體系 → 国際認証 / 進口印刷設備 → ハイデルベルク印刷機 / 認證紙 → 認証紙 / 急件 → 特急 / 截單 → 締切
 * 单独记账: I18N_POLLUTION_JA 基线独立递减 (不与 en 的 778 合并)
 * 危险写入三件套 + 顺序消费防重复
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const JA = path.join(REPO, 'src', 'data', 'blog-data', 'ja.json');
const BAK = path.join(REPO, '.hermes', '_probe-pb', '_wave2.ja.json.bak');

// [旧串, 新串, 说明]  —— 顺序: 具体(含尾部) 先于兜底
const RULES = [
  // ---- 國際認證體系 ----
  ['國際認證體系 認証工場直販です', '国際認証工場の直販です', '消费 認証工場直販です'],
  ['國際認證體系 認証工場', '国際認証工場', '消费 認証工場'],
  ['國際認證體系 認証品質マネジメント', '国際認証の品質マネジメント', '消费 認証品質マネジメント'],
  ['國際認證體系 品質管理認証', '国際認証の品質管理認証', '消费 品質管理認証'],
  ['國際認證體系 品質認証', '国際認証の品質認証', '消费 品質認証'],
  ['國際認證體系 品質管理', '国際認証の品質管理', '消费 品質管理'],
  ['國際認證體系 品質基準準拠', '国際認証の品質基準準拠', '消费 品質基準準拠'],
  ['國際認證體系 品質基準', '国際認証の品質基準', '消费 品質基準'],
  ['國際認證體系 品質保証付き', '国際認証の品質保証付き', '消费 品質保証付き'],
  ['國際認證體系 準拠の品質管理', '国際認証準拠の品質管理', '消费 準拠の品質管理'],
  ['國際認證體系 は品質管理体系', '国際認証は品質管理体系', '消费 は品質管理体系'],
  ['國際認證體系 4 認証', '国際認証 4 認証', '四認証并列形态'],
  ['國際認證體系 認証', '国際認証', '消费 認証'],
  ['國際認證體系とFSC', '国際認証とFSC', 'と接续'],
  ['國際認證體系', '国際認証', '兜底'],

  // ---- 進口印刷設備 ----
  ['進口印刷設備 6+1', 'ハイデルベルク 6+1', '6+1 形态'],
  ['進口印刷設備 印刷機で色彩', 'ハイデルベルク印刷機で色彩', '消费 印刷機で色彩'],
  ['進口印刷設備 印刷機，', 'ハイデルベルク印刷機，', '消费 印刷機，'],
  ['進口印刷設備 印刷機', 'ハイデルベルク印刷機', '消费 印刷機'],
  ['進口印刷設備 折機ライン', 'ハイデルベルク折機ライン', '折機ライン'],
  ['進口印刷設備 実機校正', 'ハイデルベルク実機校正', '実機校正'],
  ['進口印刷設備 プルーフ', 'ハイデルベルク プルーフ', 'プルーフ'],
  ['進口印刷設備 デジタル印刷機', 'ハイデルベルク デジタル印刷機', 'デジタル印刷機'],
  ['進口印刷設備 などの国際ブランド', 'ハイデルベルクなどの国際ブランド', 'などの国際ブランド'],
  ['進口印刷設備', 'ハイデルベルク印刷機', '兜底'],

  // ---- 認證紙 ----
  ['FSC 認證紙 認証', 'FSC 認証紙', '消费 認証 (防 FSC 認証紙 認証)'],
  ['FSC 認證紙認証', 'FSC 認証紙', '消费 認証 (无空格)'],
  ['FSC 認證紙 保有', 'FSC 認証紙を保有', '消费 保有'],
  ['認證紙 認証', '認証紙', '兜底+消费'],
  ['認證紙認証', '認証紙', '兜底+消费'],
  ['認證紙', '認証紙', '兜底'],

  // ---- 急件 / 截單 ----
  ['急件 18:00 截單', '特急・18:00 締切', '固定句式 (最高优先, 合并防断裂)'],
  ['急件', '特急', '兜底'],
  ['截單', '締切', '兜底'],

  // ---- ja 侧混入的简体字形态 (I18N_POLLUTION_JA 同族) ----
  ['骑马钉', '中綴じ', '简体混入 ja (应为 中綴じ/騎馬釘)'],
];

// 形状断言: 修后不得出现重复/半截
const DUP = ['国際認証 国際認証', 'ハイデルベルク印刷機 印刷機', 'FSC 認証紙 認証', '認証紙 認証紙', '特急特急', '締切締切', '国際認証 認証', 'ハイデルベルク ハイデルベルク'];
// 保留断言: ja 里合规内容不得被误删 (仅列**确认存在于 ja.json** 的合规项)
const KEEP = ['箔押し', 'データ基準', '厚口'];   // 厚口コート紙 = 正确日文 (厚纸)

function main() {
  const before = fs.readFileSync(JA, 'utf8');

  // 计数断言 (独立口径)
  for (const [oldS, , note] of RULES) {
    const n = before.split(oldS).length - 1;
    if (n === 0) console.log(`  ⚠️ 跳过 (0 次): 「${oldS}」 [${note}]`);
  }
  console.log(`  规则数 ${RULES.length} (0 次者自动跳过, 不阻断)`);

  // 备份
  fs.writeFileSync(BAK, before, 'utf8');
  if (fs.statSync(BAK).size !== Buffer.byteLength(before, 'utf8')) { console.error('❌ 备份失败'); process.exit(1); }
  console.log(`  备份 OK: ${path.relative(REPO, BAK)}`);

  // 替换 (顺序)
  let out = before;
  for (const [oldS, newS] of RULES) out = out.split(oldS).join(newS);

  // 形状断言: 重复
  for (const d of DUP) {
    if (out.includes(d)) { console.error(`❌ 重复断言失败: 「${d}」 -> 不写盘`); process.exit(1); }
  }
  console.log('  重复断言 OK: 8 类重复形态 0 命中');

  // 形状断言: 旧 token 清零
  const LEFT = ['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單'].filter(t => out.includes(t));
  if (LEFT.length) { console.error(`❌ 残留断言失败: ${JSON.stringify(LEFT)} -> 不写盘`); process.exit(1); }
  console.log('  残留断言 OK: 5 条旧术语全部清零');

  // 保留断言
  const GONE = KEEP.filter(t => !out.includes(t));
  if (GONE.length) { console.error(`❌ 保留断言失败: 合法内容被误删 ${JSON.stringify(GONE)} -> 不写盘`); process.exit(1); }
  console.log('  保留断言 OK: ja 合规内容 (厚口チラシ/箔押し/データ基準 等) 未误删');

  // JSON 断言
  const a = JSON.parse(before), b = JSON.parse(out);
  if (Object.keys(a).length !== Object.keys(b).length) { console.error('❌ 篇目数变化 -> 不写盘'); process.exit(1); }
  console.log(`  JSON 断言 OK: 合法, 篇目 ${Object.keys(b).length} 守恒`);

  // 写盘 + 回读
  fs.writeFileSync(JA, out, 'utf8');
  const back = fs.readFileSync(JA, 'utf8');
  if (back !== out || back.charCodeAt(0) === 0xFEFF) {
    fs.writeFileSync(JA, before, 'utf8');
    console.error('❌ 写盘校验失败 -> 已回滚'); process.exit(1);
  }
  console.log(`\n✅ 波 2 写盘成功: ja.json ${Buffer.byteLength(before, 'utf8')} -> ${Buffer.byteLength(back, 'utf8')} B`);
  console.log(`   回滚: Copy-Item ${path.relative(REPO, BAK)} ${path.relative(REPO, JA)} -Force`);
}

main();
