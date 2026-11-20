// T1 紙盒⭐ C类修复: kraft-paper-box-types-comparison-2026 补 FAQ ×4 (三语言)
// FAQ 内容复用文中既有真实数据。幂等: 已含 FAQ 段则跳过。
const fs = require('fs');

const FAQS = {
  'zh-hk': [
    { q: '牛皮紙盒同坑盒有咩分別？', a: '牛皮紙盒用牛皮卡紙（250-400g）裱面，挺度好、適合同印刷彩面；坑盒用瓦楞紙（3-7層）中間夾坑紋，緩衝性強、適合快遞運輸。選邊種睇用途：禮品展示揀牛皮紙盒，物流保護揀坑盒。' },
    { q: '8 大盒型點揀？', a: '天地蓋盒（高檔禮品）、書型盒（收藏品）、抽屜盒（珠寶）、翻蓋盒（電子）、開窗盒（食品展示）、磁吸盒（美妝）、摺盒（快遞）、禮盒（節慶）。每個盒型都有對應場景，揀盒型先定用途再定材質。' },
    { q: '彩盒訂製最少幾多個起？', a: '常規白卡彩盒 100 個起印，拼版彩盒免刀模費；小批量試產可 30-50 個起（視盒型）。' },
    { q: '牛皮紙盒可以做燙金或擊凸嗎？', a: '可以。牛皮紙盒支援燙金/燙銀、擊凸/壓凹、UV 局部上光、絲網印刷 UV 等工藝，適合品牌 logo 呈現。' },
  ],
  en: [
    { q: 'What is the difference between kraft boxes and corrugated boxes?', a: 'Kraft boxes use kraft cardstock (250-400g) for a smooth printable surface with good stiffness; corrugated boxes have fluted layers (3-7 ply) for strong cushioning in shipping. Choose kraft for retail display, corrugated for logistics protection.' },
    { q: 'How do I choose among 8 box types?', a: 'Telescope boxes (premium gifts), book boxes (collectibles), drawer boxes (jewelry), flip-top boxes (electronics), window boxes (food display), magnetic boxes (cosmetics), folding boxes (shipping), and gift boxes (festive). Match box type to your use case first, then material.' },
    { q: 'What is the minimum order for custom card boxes?', a: 'Standard white card boxes start at 100 units; gang-run card boxes waive die-cut fees; small-batch trials from 30-50 units depending on style.' },
    { q: 'Can kraft boxes have foil stamping or embossing?', a: 'Yes. Kraft boxes support foil stamping (gold/silver), embossing/debossing, spot UV and screen-printed UV — ideal for premium brand logos.' },
  ],
  ja: [
    { q: 'クラフトボックスと段ボール箱の違いは?', a: 'クラフトボックスはクラフトカード(250-400g)で表面平滑・腰強く、印刷面に向く。段ボール箱は中芯段(3-7層)で緩衝性が高く、配送向き。店頭陳列はクラフト、物流保護は段ボール。' },
    { q: '8 種類の箱型はどう選ぶ?', a: '天地箱(高級ギフト)、ブック型(コレクション)、引き出し箱(宝石)、フラップ(電子機器)、窓付き(食品陳列)、マグネット(化粧品)、折り畳み(配送)、ギフトボックス(祝祭)。用途を先に決めてから箱型を選ぶ。' },
    { q: 'カラーボックスの最小注文数は?', a: '通常 100 個から。合版カラーボックスは型代無料、小ロット試作は 30-50 個から(箱型による)。' },
    { q: 'クラフトボックスに箔押しやエンボスはできますか?', a: '可能です。箔押し(金/銀)、エンボス/デボス、スポット UV、シルク印刷 UV に対応、ブランドロゴの高級表現に最適。' },
  ],
};

const H2_MARKERS = {
  'zh-hk': /<h2[^>]*>[\s\S]*?延伸閱讀[\s\S]*?<\/h2>/,
  en: /<h2[^>]*>[\s\S]*?(?:Related Reading|Further Reading)[\s\S]*?<\/h2>/,
  ja: /<h2[^>]*>[\s\S]*?関連記事[\s\S]*?<\/h2>/,
};

function buildFaqBlock(faqs) {
  const items = faqs.map(f =>
    `<p class="mb-3"><strong>Q：${f.q}</strong><br/>A：${f.a}</p>`
  ).join('\n');
  return `\n<h2>常見問題</h2>\n<div class="bg-gray-50 rounded-lg p-4 my-4 space-y-3">\n${items}\n</div>\n`;
}

let totalChanged = 0;
for (const loc of Object.keys(FAQS)) {
  const file = `src/data/blog-data/${loc}.json`;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  const slug = 'kraft-paper-box-types-comparison-2026';
  const p = d[slug];
  if (!p) { console.log(`[${loc}] ${slug} 不存在`); continue; }
  const c = p.content;
  if (c.includes('常見問題') || c.includes('Frequently Asked') || c.includes('よくある質問')) {
    console.log(`[${loc}] 已有 FAQ 段, 跳过 (幂等)`);
    continue;
  }
  const marker = H2_MARKERS[loc];
  const m = c.match(marker);
  if (!m) { console.log(`[${loc}] 未找到结尾 H2, 跳过`); continue; }
  const insertAt = m.index;
  const newContent = c.slice(0, insertAt) + buildFaqBlock(FAQS[loc]) + c.slice(insertAt);
  p.content = newContent;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  totalChanged++;
  console.log(`[${loc}] ✅ 已插入 FAQ ×4 (内容 +${newContent.length - c.length}B)`);
}
console.log(`\n共修改 ${totalChanged}/3 locale`);
