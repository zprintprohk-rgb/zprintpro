const res = await fetch('https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt');
const txt = await res.text();
const lines = txt.split('\n');
console.log('total lines:', lines.length);
for (const n of ['3370', '517', '518', '519', '533']) {
  const hit = lines.find((l) => new RegExp(`^${n} - `).test(l));
  console.log(`${n}: ${hit || '(not found)'}`);
}
console.log('--- greeting / stationery / paper 候选 ---');
for (const l of lines) {
  if (/greeting card|stationery|print(ed)? paper|invitation|calendar|notebook/i.test(l)) console.log(l);
}
