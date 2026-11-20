// Inspect doujinshi block indentation + generator baseline counts
const fs = require('fs');
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const i = ts.indexOf("slug: 'doujinshi-printing'");
const from = ts.lastIndexOf('\n', i - 200);
const lines = ts.slice(from, i + 900).split('\n');
lines.forEach((l, k) => console.log(k + ' [' + (l.match(/^[ ]*/)[0].length) + 'sp] ' + JSON.stringify(l.slice(0, 110))));
// block-start lines pattern check
const starts = [...ts.matchAll(/^[ \t]*\{[ \t]*$/gm)].length;
console.log('LINE_ANCHORED_BRACE_LINES=' + starts);
