/** Photo Book: 补做 blog-posts.ts 注册 (blog-data 已于前一步插入) */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const S = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/staging/photo-book-content.json'), 'utf8'));
const BP = path.join(ROOT, 'src/data/blog-posts.ts');
const raw = fs.readFileSync(BP, 'utf8');
const ARRAY_DECL = 'export const blogPosts: BlogPostMeta[] = [';
const TAIL = '  lpChildrensPictureBookGuide,\n  ];';
const NAME = 'lpPhotoBookPrintingGuide';

console.log('锚点: 数组声明=' + raw.includes(ARRAY_DECL) + ' 尾锚点=' + raw.includes(TAIL) + ' 已注册=' + raw.includes(NAME));
if (!raw.includes(ARRAY_DECL) || !raw.includes(TAIL)) { console.error('❌ 锚点未找到'); process.exit(1); }
if (raw.includes(NAME)) { console.error('❌ 已注册'); process.exit(1); }
fs.writeFileSync(path.join(ROOT, '.hermes/_bak-photobook-20260918/blog-posts.ts'), raw, 'utf8');

const BLOCK = `
// 2026-09-18 队列 A #3 (v10 §四.2「4 篇新需求承接」剩余项; v10 卡未排期 = 净增量)
// 队列依据: docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md §四 + docs/2026-09-17-website-traffic-expansion-plan-v1.md §四/§五 路径1
// 承接 SKU: perfect-bound-books / hardcover-books | 3 locale native | MOQ 口径 = 1 本起印 (K3 2026-09-18 业务口径)
const ${NAME}: BlogPostMeta = {
  slug: 'photo-book-printing-guide',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-18',
  title: {
    'zh-hk': ${JSON.stringify(S.title['zh-hk'])},
    en: ${JSON.stringify(S.title.en)},
    ja: ${JSON.stringify(S.title.ja)},
  },
  excerpt: {
    'zh-hk': ${JSON.stringify(S.excerpt['zh-hk'])},
    en: ${JSON.stringify(S.excerpt.en)},
    ja: ${JSON.stringify(S.excerpt.ja)},
  },
  targetKeywords: {
    primary: 'photo book printing',
    secondary: [
      'custom photo book printing', 'wedding photo album printing', 'photo book printing small batch',
      'hardcover photo book', 'perfect bound photo book', 'photography portfolio printing',
      '寫真書印刷', '相冊印刷', '相簿訂製', '婚禮相冊印刷', '攝影集印刷',
      'フォトブック 印刷', '写真集 印刷', 'アルバム 印刷', '少部数 印刷',
    ],
  },
};
`;
let bp = raw.replace(ARRAY_DECL, BLOCK + '\n' + ARRAY_DECL);
bp = bp.replace(TAIL, '  lpChildrensPictureBookGuide,\n  ' + NAME + ',\n  ];');
fs.writeFileSync(BP, bp, 'utf8');

let f = 0;
const chk = (l, ok) => { if (!ok) f++; console.log('  ' + (ok ? 'OK  ' : 'FAIL') + ' ' + l); };
chk('const 声明早于数组', bp.indexOf('const ' + NAME) < bp.indexOf(ARRAY_DECL));
chk('const 声明 1 处', (bp.match(new RegExp('const ' + NAME + ': BlogPostMeta', 'g')) || []).length === 1);
chk('数组引用 1 处', (bp.match(new RegExp('^  ' + NAME + ',$', 'm')) || []).length === 1);
chk('数组声明仍 1 处', (bp.match(/export const blogPosts: BlogPostMeta\[\] = \[/g) || []).length === 1);
chk('无 BOM', fs.readFileSync(BP)[0] !== 0xff);
const L0 = raw.split('\n'), L1 = bp.split('\n');
let changed = 0;
for (let k = 0; k < L0.length; k++) if (L0[k] !== L1[k] && !L1.includes(L0[k])) changed++;
chk('变更行 ≤1 (实测 ' + changed + ')', changed <= 1);
if (f) { console.error('❌ 未过'); fs.copyFileSync(path.join(ROOT, '.hermes/_bak-photobook-20260918/blog-posts.ts'), BP); process.exit(1); }
console.log('\n✅ 注册完成');
