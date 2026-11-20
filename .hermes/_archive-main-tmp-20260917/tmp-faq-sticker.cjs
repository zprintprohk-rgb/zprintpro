// T1 貼紙 C类修复: sticker-material-pvc-vinyl-removable 补 FAQ ×4 (三语言)
const fs = require('fs');

const FAQS = {
  'zh-hk': [
    { q: '防水貼紙用咩材質最襟？', a: '戶外長期曝曬揀 3M 級防水 PVC（150 微米），室內短期用可移貼紙或銅版紙過膠。防水測試標準：QUV 1000 小時加速老化（按 2026 實測）。' },
    { q: '透明貼紙同白底貼紙點揀？', a: '想貼紙融入產品表面（如玻璃、膠樽）揀透明 PVC；想顏色鮮豔遮底色揀白底 PVC。兩者都防水，價差約 10-20%。' },
    { q: '可移貼紙可以重貼幾多次？', a: '可移貼紙用低黏膠，可重貼 2-5 次不留殘膠，適合短期促銷、租借設備標籤；永久黏膠則不可移除。' },
    { q: '貼紙最少訂幾多個起？', a: '防水貼紙 50 個起印，戶外貼紙 100 個起，可移貼紙 100 個起；拼版模切免刀模費。' },
  ],
  en: [
    { q: 'Which waterproof sticker material lasts longest?', a: 'For long-term outdoor exposure choose 3M-grade waterproof PVC (150 micron); for indoor short-term use, removable vinyl or laminated art paper. Durability standard: QUV 1000-hour accelerated aging (2026 tested).' },
    { q: 'Clear vs white-backed stickers — which to choose?', a: 'Clear PVC lets stickers blend into surfaces (glass, bottles); white PVC makes colors pop over any background. Both are waterproof; clear costs 10-20% more.' },
    { q: 'How many times can removable stickers be repositioned?', a: 'Removable stickers use low-tack adhesive — repositionable 2-5 times without residue, ideal for promos and rental equipment labels; permanent adhesive is non-removable.' },
    { q: 'What is the minimum order for stickers?', a: 'Waterproof stickers from 50 units; outdoor stickers from 100; removable from 100. Gang-run die-cutting waives tooling fees.' },
  ],
  ja: [
    { q: '防水ステッカーはどの素材が一番長持ち?', a: '屋外長期は 3M 級防水 PVC(150 ミクロン)、屋内短期は再剥離ビニールかラミネート加工アート紙。耐久基準: QUV 1000 時間加速老化(2026 実測)。' },
    { q: '透明ステッカーと白地ステッカーはどう選ぶ?', a: 'ガラス・ボトルなど表面に溶け込ませたいなら透明 PVC、色を鮮やかに出したいなら白地 PVC。両方防水、透明は約 10-20% 高め。' },
    { q: '再剥離ステッカーは何回貼り直せる?', a: '再剥離ステッカーは低粘着で 2-5 回貼り直し可能・糊残りなし。短期プロモやレンタル設備ラベル向き。永久粘着は剥がせません。' },
    { q: 'ステッカーの最小注文数は?', a: '防水ステッカー 50 個から、屋外用 100 個から、再剥離 100 個から。合版トムソン抜きで型代無料。' },
  ],
};

const INSERT_H2 = {
  'zh-hk': /<h2[^>]*>[\s\S]*?延伸閱讀[\s\S]*?<\/h2>/,
  en: /<h2[^>]*>[\s\S]*?Further Reading[\s\S]*?<\/h2>/,
  ja: /<h2[^>]*>[\s\S]*?(?:ステップ選定プロセス|関連記事)[\s\S]*?<\/h2>/,
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
  const slug = 'sticker-material-pvc-vinyl-removable';
  const p = d[slug];
  if (!p) { console.log(`[${loc}] 不存在`); continue; }
  const c = p.content;
  if (c.includes('常見問題') || c.includes('Frequently Asked') || c.includes('よくある質問')) {
    console.log(`[${loc}] 已有 FAQ, 跳过`); continue;
  }
  const m = c.match(INSERT_H2[loc]);
  if (!m) { console.log(`[${loc}] 未找到插入点, 跳过`); continue; }
  const newContent = c.slice(0, m.index) + buildFaqBlock(FAQS[loc]) + c.slice(m.index);
  p.content = newContent;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  totalChanged++;
  console.log(`[${loc}] ✅ FAQ ×4 (+${newContent.length - c.length}B)`);
}
console.log(`\n共 ${totalChanged}/3`);
