// .hermes/logs/_verify-banners-keys.mjs — 驗證 banners key 對齊（K3 2.2）
import fs from 'node:fs';

const links = fs.readFileSync('src/data/industry-scenario-links.ts', 'utf8');
const sharp = fs.readFileSync('src/components/category/CategorySharpHooks.tsx', 'utf8');
const ind = fs.readFileSync('src/components/category/CategoryIndustries.tsx', 'utf8');

const NEW_KEYS = ['trade_show', 'outdoor_ad', 'mall_promo'];
const OLD_KEYS = ['exhibition', 'outdoor', 'mall'];

console.log('=== 新 key 是否在 industry-scenario-links.ts 有映射 ===');
for (const k of NEW_KEYS) {
  const re = new RegExp(`\\b${k}\\s*:\\s*\\{`);
  console.log(`  ${k.padEnd(14)} ${re.test(links) ? '✓ 有' : '🔴 無'}`);
}

console.log('\n=== 舊 key 在 SharpHooks 的 banners 區塊是否已清除 ===');
const bSeg = sharp.match(/\n  banners: \[([\s\S]*?)\n  \],/);
if (!bSeg) {
  console.log('  🔴 找不到 banners 區塊');
} else {
  for (const k of OLD_KEYS) {
    const used = new RegExp(`key:\\s*'${k}'`).test(bSeg[1]);
    console.log(`  ${k.padEnd(14)} ${used ? '🔴 仍在使用' : '✓ 已清除'}`);
  }
  for (const k of NEW_KEYS) {
    const used = new RegExp(`key:\\s*'${k}'`).test(bSeg[1]);
    console.log(`  ${k.padEnd(14)} ${used ? '✓ 已使用' : '🔴 未使用'}`);
  }
}

console.log('\n=== 兩檔的 banners key 是否一致 ===');
const keysOf = (src) => {
  const seg = src.match(/\n  '?banners'?: \[([\s\S]*?)\n  \],/);
  return seg ? [...seg[1].matchAll(/key:\s*'([^']+)'/g)].map((m) => m[1]) : [];
};
const sk = keysOf(sharp);
const ik = keysOf(ind);
console.log(`  SharpHooks: ${sk.join(', ')}`);
console.log(`  Industries: ${ik.join(', ')}`);
const skInIk = sk.filter((k) => ik.includes(k));
console.log(`  SharpHooks 的 key 能在 Industries 找到: ${skInIk.length}/${sk.length}`);
