// where does the category description string live in the live HTML? head-meta vs RSC flight payload vs body
const t = await (await fetch('https://zprintpro.com/zh-hk/category/packaging/')).text();
const needle = '食品包裝印刷 / 包裝盒訂製 100 個起印';
const i = t.indexOf(needle);
console.log('found_at=' + i);
if (i > 0) {
  console.log('context=' + JSON.stringify(t.slice(Math.max(0, i - 120), i + 60)));
  // count occurrences
  let n = 0, k = 0;
  while ((k = t.indexOf(needle, k)) >= 0) { n++; k++; }
  console.log('occurrences=' + n);
}
console.log('WHERE_DONE');
