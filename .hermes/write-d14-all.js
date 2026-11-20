// D14 三语写入: ja.json (完整12段) + en.json (简版) + zh-hk.json (简版)
// 安全写入: execSync 捕获 build 脚本 stdout (UTF-8 纯净) + fs.writeFileSync utf8
const fs = require('fs');
const { execSync } = require('child_process');

function getContent(script) {
  const raw = execSync(`node .hermes/${script}`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).trim();
  return JSON.parse(raw);
}

const posts = {
  ja: {
    script: 'build-d14-content.js',
    entry: {
      slug: 'textbook-printing-guide',
      title: '教科書・教材の印刷製本 100冊から 3製本方式 | ZprintPro',
      description: '教科書・教材の印刷製本ガイド。中綴じ・無線綴じ・上製本の3製本方式、紙材質4種、価格 (100冊からHK$5-50/冊)、納期5-7営業日、年度契約の進め方、ISBN・バーコード対応。学校法人・塾・教材出版社のB2B発注に最適。',
      date: '2026-09-14',
      category: '書籍印刷',
      lastUpdated: '2026-09-14',
    },
  },
  en: {
    script: 'build-d14-en.js',
    entry: {
      slug: 'textbook-printing-guide',
      title: 'Textbook Printing Guide: 3 Bindings, 100 Copies | ZprintPro',
      description: 'Textbook and educational material printing guide: 3 binding types (saddle stitch / perfect bound / hardcover), paper stocks, pricing from 100 copies at HK$5-50/book, 5-7 day turnaround, annual contracts, ISBN/barcode support. For schools, tutoring centers and publishers.',
      date: '2026-09-14',
      category: '書籍印刷',
      lastUpdated: '2026-09-14',
    },
  },
  'zh-hk': {
    script: 'build-d14-zhhk.js',
    entry: {
      slug: 'textbook-printing-guide',
      title: '教科書印刷・教材印刷指南 100本起 製本方式 | 智印港',
      description: '教科書印刷・教材印刷指南。騎馬釘/膠裝/精裝 3 大製本方式、紙材質 4 種、價錢 (100 本起 HK$5-50/本)、交期 5-7 個工作天、年度合約流程、ISBN 條碼支援。學校、補習社、出版社 B2B 採購適用。',
      date: '2026-09-14',
      category: '書籍印刷',
      lastUpdated: '2026-09-14',
    },
  },
};

for (const [locale, cfg] of Object.entries(posts)) {
  const path = `src/data/blog-data/${locale}.json`;
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  if (data['textbook-printing-guide']) {
    console.log(`⚠️ ${locale}: textbook-printing-guide 已存在, 跳过 (幂等)`);
    continue;
  }
  const content = getContent(cfg.script);
  data['textbook-printing-guide'] = { ...cfg.entry, content };
  fs.writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const v = JSON.parse(fs.readFileSync(path, 'utf8'));
  const p = v['textbook-printing-guide'];
  console.log(`✅ ${locale}: textbook-printing-guide 写入 (content ${p.content.length}字, 总 ${Object.keys(v).length} 篇, BOM ${fs.readFileSync(path)[0]===0xEF})`);
}
