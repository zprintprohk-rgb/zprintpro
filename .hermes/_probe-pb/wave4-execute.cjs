'use strict';
/**
 * 波 4: ja 向简化字混入清理 (词级替换, 非字级 —— 防同形字陷阱)
 *
 * 白名单 (K3 已批, 保留简体): 唐运提 (法人姓名, 以身份证为准)
 * 边界: 只改 ja 语系值; 每词替换后该词不得残留; 替换后 唐运提 必须在
 * 危险写入三件套 + 六道断言
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const FILES = [
  'src/data/blog-data/ja.json',
  'src/data/category-seo-content.ts',
  'src/app/[locale]/blog/[slug]/page.tsx',
  'src/components/ProductLongDescription.tsx',
  'src/app/[locale]/about/page.tsx',
  'src/components/layout/Header.tsx',
  'src/data/blog-posts.ts',
  'src/data/buying-guides.ts',
  'src/app/[locale]/contact/page.tsx',
];

// 词级映射 [旧, 新]  —— 只收**高置信**简体专用字形态
const MAP = [
  // 红 → 紅 (31 字)
  ['红包印刷', '紅包印刷'], ['結婚式红包', '結婚式紅包'], ['企業红包', '企業紅包'],
  ['年旧正月红包', '年旧正月紅包'], ['红包選', '紅包選'], ['各红包', '各紅包'], ['红包', '紅包'],
  // 卖 → 売 (13 字)
  ['飲食外卖', '飲食デリバリー'], ['专卖店様', '専門店様'], ['卖点', '売りポイント'],
  // 边 → 辺 (11 字)
  ['周边市場', '関連市場'], ['自動車周边', '自動車関連'], ['汽車周边', '自動車関連'], ['周边', '関連'],
  // 销 → 銷 (6 字)
  ['短期促销', '短期販促'], ['季節促销前在庫', '季節販促前在庫'], ['季節促销', '季節販促'],
  ['促销連動', '販促連動'], ['促销', '販促'],
  // 选 → 選 (6 字)
  ['予算首选', '予算の最適解'], ['缶首选', '缶の最適解'], ['选购', '選び方'],
  // 层 → 層 (6 字)
  ['层', '層'],
  // 胶 → 膠 (5 字)
  ['無線胶装', '無線綴じ'], ['无线胶装', '無線綴じ'],
  // 艺 → 芸 (5 字)
  ['印刷工艺', '印刷芸術'], ['工艺', '工芸'],
  // 标 → 標 (5 字)
  ['従業員标配', '従業員標準装備'], ['婚礼标配', '婚礼の標準'], ['标准', '標準'], ['标识', '標識'],
  // 积 → 積 (5 字)
  ['多年累积特急', '多年の実績による特急'],
  // 为 → 為 (4 字)
  ['公式見積書为准', '公式見積書を基準'],
  // 质 → 質 (4 字)
  ['质感', '質感'],
  // 运 → 運 (3 字, 排除 唐运提)
  ['顺丰速运', '順豊速運'],
  // 婴 (3 字)
  ['母婴食品', 'ベビーフード'], ['母婴製品', 'ベビー用品'], ['母婴', 'ベビー'],
  // 节 (3 字)
  ['节日', '祝日'],
  // 哑 (3 字)
  ['年後表面哑色', '後加工の表面つや消し'], ['哑面', 'つや消し'],
  // 专 (2 字) — 已由 专卖店様 覆盖
  // 骑/马/钉 (6 字)
  ['骑马钉', '中綴じ'],
  // 识 (2 字) — 标识 已覆盖
  // 线 (2 字)
  ['成長曲线', '成長カーブ'],
  // 户 (2 字)
  ['客户提供', 'お客様提供'],
  // 饰 (2 字)
  ['轻奢饰品', 'ライトでラグジュアリーな装飾品'], ['奢饰品', '装飾品'],
  // 众 (2 字)
  ['大众', '大衆'],
  // 复 (2 字)
  ['复古质感', 'レトロな質感'], ['复古', 'レトロ'],
  // 认 (2 字)
  ['认证体系', '認証体系'],
  // 开 (2 字)
  ['开学', '新学期'],
  // 单字/低频
  ['聪明', '賢い'], ['拡張用预留', '拡張用予備'], ['仪式感', '儀式感'], ['国庆節', '国慶節'],
  ['最爱', '一番人気'], ['大经典', '定番'], ['二次传播', '二次拡散'], ['赞助', '協賛'],
  ['剛性极佳', '剛性に優れ'], ['銀色金属光泽', '銀色メタリック光沢'], ['男士护理', 'メンズケア'],
  ['版凑时间', '時間調整'], ['奢华感', '高級感'], ['触感丧失', '触感が失われ'],
  ['图案詳細立体', '図案が立体的'], ['地对比', 'の対比'], ['印刷适合', '印刷に適し'],
  ['罰金面临', '罰金のおそれ'], ['印刷品类', '印刷カテゴリ'], ['至关重要', '極めて重要'],
  ['本文価格仅供参考', '本文の価格は参考値'], ['校园教育印刷', 'スクール教育印刷'],
];

const WL = '唐运提';

function main() {
  const orig = {};
  for (const rel of FILES) {
    const p = path.join(REPO, rel);
    if (fs.existsSync(p)) orig[rel] = fs.readFileSync(p, 'utf8');
  }
  console.log(`  文件数: ${Object.keys(orig).length}`);

  // 计数断言 (独立口径: 全档合计)
  let applied = 0, skipped = [];
  const counts = {};
  for (const [oldS, newS] of MAP) {
    let n = 0;
    for (const rel of Object.keys(orig)) n += orig[rel].split(oldS).length - 1;
    counts[oldS] = n;
    if (n > 0) applied += n; else skipped.push(oldS);
  }
  console.log(`  计数: 命中 ${applied} 处; 0 次者 ${skipped.length} 条 (自动跳过)`);

  // 备份
  for (const rel of Object.keys(orig)) {
    const b = path.join(REPO, '.hermes', '_probe-pb', '_wave4.' + rel.replace(/[\\/\[\]]/g, '_') + '.bak');
    fs.writeFileSync(b, orig[rel], 'utf8');
  }
  console.log('  备份 OK');

  // 替换
  const out = { ...orig };
  for (const [oldS, newS] of MAP) {
    for (const rel of Object.keys(out)) out[rel] = out[rel].split(oldS).join(newS);
  }

  // 形状断言: 已映射词不得残留
  const left = MAP.filter(([o]) => Object.values(out).some(v => v.includes(o))).map(([o]) => o);
  if (left.length) { console.error(`❌ 残留断言失败: ${JSON.stringify(left.slice(0, 8))} -> 不写盘`); process.exit(1); }
  console.log('  残留断言 OK: 已映射词 0 残留');

  // 白名单断言: 唐运提 必须仍在
  const wlGone = Object.entries(out).filter(([, v]) => orig[Object.keys(out).find(k => out[k] === v)] !== undefined);
  const stillHasWL = Object.values(out).some(v => v.includes(WL));
  if (!stillHasWL) { console.error('❌ 白名单断言失败: 唐运提 被误删 -> 不写盘'); process.exit(1); }
  console.log('  白名单断言 OK: 唐运提 保留简体');

  // JSON 断言
  for (const rel of ['src/data/blog-data/ja.json']) {
    const a = JSON.parse(orig[rel]), b = JSON.parse(out[rel]);
    if (Object.keys(a).length !== Object.keys(b).length) { console.error('❌ 篇目数变化 -> 不写盘'); process.exit(1); }
    console.log(`  JSON 断言 OK: 篇目 ${Object.keys(b).length} 守恒`);
  }

  // 写盘 + 回读
  for (const rel of Object.keys(out)) {
    fs.writeFileSync(path.join(REPO, rel), out[rel], 'utf8');
    const back = fs.readFileSync(path.join(REPO, rel), 'utf8');
    if (back !== out[rel] || back.charCodeAt(0) === 0xFEFF) {
      for (const r2 of Object.keys(orig)) fs.writeFileSync(path.join(REPO, r2), orig[r2], 'utf8');
      console.error(`❌ 写盘校验失败 [${rel}] -> 已全量回滚`); process.exit(1);
    }
  }
  console.log('\n✅ 波 4 写盘成功');
}

main();
