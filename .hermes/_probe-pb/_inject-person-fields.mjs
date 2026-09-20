// 阶段 1: 为 authorByLocale 注入 jobTitle + knowsAbout (K3 2026-09-20 授权)
import fs from 'fs';
const p = 'src/lib/seo/schema-extensions.ts';
let s = fs.readFileSync(p, 'utf8');
let n = 0;

const PATCHES = [
  [
    "name: '智印港印刷專家',",
    "name: '智印港印刷專家',\n    jobTitle: '印刷包裝行業顧問',\n    knowsAbout: ['包裝材料', '印刷工藝', '出口合規'],",
  ],
  [
    "name: 'ZprintPro Printing Experts',",
    "name: 'ZprintPro Printing Experts',\n    jobTitle: 'Print & Packaging Industry Consultant',\n    knowsAbout: ['Packaging Materials', 'Printing Processes', 'Export Compliance'],",
  ],
  [
    "name: 'ZprintPro印刷専門家',",
    "name: 'ZprintPro印刷専門家',\n    jobTitle: '印刷・パッケージ業界コンサルタント',\n    knowsAbout: ['包装素材', '印刷加工', '輸出コンプライアンス'],",
  ],
];

for (const [oldS, newS] of PATCHES) {
  if (!s.includes(oldS)) { console.log('ℹ️ 未匹配:', oldS.slice(0, 40)); continue; }
  if (s.includes(newS)) { console.log('✅ 已存在:', oldS.slice(0, 40)); continue; }
  s = s.replace(oldS, newS);
  n++;
  console.log('✅ 注入:', oldS.slice(0, 40));
}
fs.writeFileSync(p, s, 'utf8');
console.log(`\n合计注入 ${n} 处`);
