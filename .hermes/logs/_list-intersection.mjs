// .hermes/logs/_list-intersection.mjs — 列出 22 條交集的完整資訊（供逐條確認）
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-scanner-intersection.json', 'utf8'));
console.log(`嚴格交集 ${j.strictIntersection} 條（兩套掃描器互證）\n`);

j.strict.forEach((f, i) => {
  console.log(`[${String(i + 1).padStart(2)}] ${f.slug}`);
  console.log(`     ${f.file.split('/').pop()}:${f.line}  找到 ${f.found} / 真值 ${f.truth}  (${f.kind})`);
  console.log(`     ${f.text.replace(/\s+/g, ' ').slice(0, 150)}`);
  console.log('');
});
