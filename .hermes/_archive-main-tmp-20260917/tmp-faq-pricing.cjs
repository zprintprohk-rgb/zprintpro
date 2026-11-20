// T1 包裝盒印刷⭐ C类修复: packaging-box-pricing-2026 补 FAQ ×4 (三语言)
// 插在「延伸閱讀/Further Reading」H2 之前。FAQ 内容全部复用文中既有真实数字 (价格/MOQ/交期/工艺)。
const fs = require('fs');

const FAQS = {
  'zh-hk': [
    { q: '包裝盒印刷 500 個同 5000 個,單價差幾多?', a: '500 個白卡彩盒約 HK$0.8-1.5/個,5000 個降至 HK$0.3-0.6/個,量大約省 40-60%(拼版免刀模費)。實際報價取決於盒型、紙材同工藝。' },
    { q: '包裝盒最少訂幾多個?', a: '常規款 100 個起印;婚禮/彩盒款最低 30-50 個起;拼版彩盒免刀模費,適合跨境電商小批量試產。' },
    { q: '包裝盒交期要幾耐?', a: '常規 8-15 天交期,深圳工廠直發,DHL 全球 2-4 天;香港本地順豐 1-2 個工作天。緊急訂單可安排 3 天快印。' },
    { q: '包裝盒可以做食品級或出口認證嗎?', a: '可以。支援 FDA 21 CFR 175.300 食品級認證 + EU REACH + FSC 認證紙張,出口歐美必備。' },
  ],
  en: [
    { q: 'How much does packaging box printing cost for 500 vs 5,000 units?', a: '500 white card boxes cost approx. US$0.10-0.19/box; 5,000 units drops to US$0.04-0.08/box — about 40-60% savings (gang-run waives die-cut fees). Final quote depends on box style, material and finish.' },
    { q: 'What is the minimum order for custom boxes?', a: 'Standard boxes start at 100 units; wedding/cosmetic boxes from 30-50 units. Gang-run card boxes waive die-cut fees — ideal for small-batch e-commerce testing.' },
    { q: 'How long does box production take?', a: 'Standard 8-15 days production from our Shenzhen factory, DHL 2-4 days worldwide; Hong Kong SF Express 1-2 business days. Rush orders available in 3 days.' },
    { q: 'Can you do food-grade or export-certified boxes?', a: 'Yes. We support FDA 21 CFR 175.300 food-grade certification + EU REACH + FSC-certified paper — required for US/EU export.' },
  ],
  ja: [
    { q: 'パッケージボックス印刷 500 個と 5000 個の単価差は?', a: '500 個の白カードカラーボックスは約 HK$0.8-1.5/個、5000 個で HK$0.3-0.6/個 に下がり、約 40-60% お得(合版で型代無料)。実際の見積もりは箱型・用紙・加工による。' },
    { q: 'パッケージボックスの最小注文数は?', a: '通常 100 個から。ウェディング/化粧品ボックスは 30-50 個から。合版カラーボックスは型代無料で、越境 EC の小ロット試作に最適。' },
    { q: '納期はどのくらい?', a: '通常 8-15 日、深圳工場から直送、DHL 世界 2-4 日。香港国内は順豊 1-2 営業日。急ぎは 3 日対応可能。' },
    { q: '食品級や輸出認証のボックスは作れますか?', a: '可能です。FDA 21 CFR 175.300 食品級認証 + EU REACH + FSC 認証紙に対応、欧米輸出に必須。' },
  ],
};

const H2_MARKERS = {
  'zh-hk': /<h2[^>]*>[\s\S]*?延伸閱讀[\s\S]*?<\/h2>/,
  en: /<h2[^>]*>[\s\S]*?Further Reading[\s\S]*?<\/h2>/,
  ja: /<h2[^>]*>[\s\S]*?延伸閱讀[\s\S]*?<\/h2>/,
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
  const slug = 'packaging-box-pricing-2026';
  const p = d[slug];
  if (!p) { console.log(`[${loc}] ${slug} 不存在`); continue; }
  const c = p.content;
  // 幂等: 已含 FAQ 段则跳过
  if (c.includes('常見問題') || c.includes('Frequently Asked') || c.includes('よくある質問')) {
    console.log(`[${loc}] 已有 FAQ 段, 跳过 (幂等)`);
    continue;
  }
  const marker = H2_MARKERS[loc];
  const m = c.match(marker);
  if (!m) { console.log(`[${loc}] 未找到延伸阅读 H2, 跳过`); continue; }
  const insertAt = m.index;
  const newContent = c.slice(0, insertAt) + buildFaqBlock(FAQS[loc]) + c.slice(insertAt);
  p.content = newContent;
  fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
  totalChanged++;
  console.log(`[${loc}] ✅ 已插入 FAQ ×4 (内容 +${newContent.length - c.length}B)`);
}
console.log(`\n共修改 ${totalChanged}/3 locale`);
