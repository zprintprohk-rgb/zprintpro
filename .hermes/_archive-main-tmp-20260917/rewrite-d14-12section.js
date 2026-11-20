// D14 zh-hk/en 重写为 12 段完整版 (用户要求: 3 篇都按 12 段写)
// ja 已是 12 段, 这里重写 zh-hk + en
const fs = require('fs');
const { execSync } = require('child_process');

function getContent(script) {
  const raw = execSync(`node .hermes/${script}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).trim();
  return JSON.parse(raw);
}

const entries = {
  en: {
    script: 'build-d14-en.js',
    title: 'Textbook Printing Guide: 3 Bindings, 100 Copies | ZprintPro',
    description: 'Textbook and educational material printing guide: 3 binding types (saddle stitch / perfect bound / hardcover), paper stocks, pricing from 100 copies at HK$5-50/book, 5-7 day turnaround, annual contracts, ISBN/barcode support. For schools, tutoring centers and publishers.',
  },
  'zh-hk': {
    script: 'build-d14-zhhk.js',
    title: '教科書印刷・教材印刷指南 100本起 製本方式 | 智印港',
    description: '教科書印刷・教材印刷指南。騎馬釘/膠裝/精裝 3 大製本方式、紙材質 4 種、價錢 (100 本起 HK$5-50/本)、交期 5-7 個工作天、年度合約流程、ISBN 條碼支援。學校、補習社、出版社 B2B 採購適用。',
  },
};

for (const [locale, cfg] of Object.entries(entries)) {
  const path = `src/data/blog-data/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const content = getContent(cfg.script);
  data['textbook-printing-guide'] = {
    slug: 'textbook-printing-guide',
    title: cfg.title,
    description: cfg.description,
    date: '2026-09-14',
    category: '書籍印刷',
    content,
    lastUpdated: '2026-09-14',
  };
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const v = JSON.parse(fs.readFileSync(path, 'utf8'));
  const p = v['textbook-printing-guide'];
  const c = p.content;
  const h2 = (c.match(/<h2/g) || []).length;
  const faq = (c.match(/<strong>Q\d+:/g) || []).length;
  const tbl = (c.match(/<table>/g) || []).length;
  const links = (c.match(/href=/g) || []).length;
  const cta = (c.match(/wa\.me/g) || []).length;
  const zp = (c.match(/ZprintPro/g) || []).length;
  const zg = (c.match(/智印港/g) || []).length;
  console.log(`✅ ${locale}: content ${c.length}字 | H2 ${h2} | FAQ ${faq} | 表格 ${tbl} | 内链 ${links} | CTA ${cta} | ZprintPro ${zp} | 智印港 ${zg}`);
}
