/** v9.3 补: 内页 hero 色块收窄到导航栏宽度 (方案 A 同口径) — 精确替换 + 单次匹配断言 */
import fs from 'fs';
const ROOT = 'F:\\zprintpro-nextjs\\src\\app\\[locale]\\';
const JOBS: Array<[string, string, string]> = [
  ['trade-program\\page.tsx',
    '<section className="bg-gradient-to-br from-[#2873F5] via-blue-600 to-emerald-500 text-white py-12 md:py-20">',
    '<section className="max-w-[1320px] mx-auto bg-gradient-to-br from-[#2873F5] via-blue-600 to-emerald-500 text-white py-12 md:py-20">'],
  ['case-studies\\page.tsx',
    '<section className="relative w-full h-[400px] overflow-hidden bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white">',
    '<section className="relative w-full max-w-[1320px] mx-auto h-[400px] overflow-hidden bg-gradient-to-r from-[#1e3a8a] to-[#06b6d4] text-white">'],
  ['services\\page.tsx',
    '<section className="bg-gradient-to-r from-[#2873F5] to-[#1a5fd4] text-white">',
    '<section className="max-w-[1320px] mx-auto bg-gradient-to-r from-[#2873F5] to-[#1a5fd4] text-white">'],
  ['service-areas\\page.tsx',
    '<div className="bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white">',
    '<div className="max-w-[1320px] mx-auto bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] text-white">'],
];
for (const [rel, from, to] of JOBS) {
  const p = ROOT + rel;
  if (!fs.existsSync(p)) { console.log(`❌ 缺文件 ${rel}`); continue; }
  let t = fs.readFileSync(p, 'utf8');
  const n = t.split(from).length - 1;
  if (n !== 1) { console.log(`❌ [${rel}] 匹配 ${n} 次, 跳过`); continue; }
  fs.writeFileSync(p, t.replace(from, to), 'utf8');
  console.log(`✅ [${rel}] 已收窄 → max-w-[1320px] mx-auto`);
}
