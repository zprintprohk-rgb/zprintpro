// 只读: 盘点 page.tsx 生成的 JSON-LD 类型 (段12 线上齐套性的来源侧证据)
import fs from 'fs';
const f = 'src/app/[locale]/blog/[slug]/page.tsx';
const c = fs.readFileSync(f, 'utf8');
const types = [...c.matchAll(/@type['"]?\s*:\s*['"]([A-Za-z]+)['"]/g)].map(m => m[1]);
console.log('page.tsx 内硬编码 @type:', [...new Set(types)].join(', '));
const inj = [...c.matchAll(/application\/ld\+json[\s\S]{0,180}/g)].map(m => m[0].replace(/\s+/g, ' '));
console.log('ld+json 注入点数量:', inj.length);
inj.forEach((a, i) => console.log('  ' + (i + 1) + ': ' + a.slice(0, 150)));
console.log('\nOrganization 相关出现行:');
c.split('\n').forEach((l, i) => { if (/Organization/.test(l)) console.log('  ' + (i + 1) + ': ' + l.trim().slice(0, 130)); });
console.log('\ngenerateSpeakable / HowTo / FAQ 生成函数:');
c.split('\n').forEach((l, i) => { if (/function generate\w+JsonLd|const \w+JsonLd\s*=/.test(l)) console.log('  ' + (i + 1) + ': ' + l.trim().slice(0, 130)); });
