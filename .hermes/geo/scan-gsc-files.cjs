// W1: locate GSC data files in repo root + GSC数据/ + .hermes recent reports
const fs = require('fs');
const path = require('path');
const root = process.cwd();
function listDir(dir, depth, out) {
  let ents;
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of ents) {
    if (out.length > 200) return;
    const p = path.join(dir, e.name);
    out.push((e.isDirectory() ? '[D] ' : '[F] ') + path.relative(root, p));
    if (e.isDirectory() && depth > 0) listDir(p, depth - 1, out);
  }
}
const out = [];
listDir(root, 0, out); // root only
console.log('== ROOT entries matching gsc/GSC ==');
for (const l of out) if (/gsc/i.test(path.basename(l))) console.log(l);
const gscFolder = path.join(root, 'GSC数据');
console.log('\n== GSC数据/ folder (depth 1) ==');
if (fs.existsSync(gscFolder)) {
  const g = [];
  listDir(gscFolder, 1, g);
  console.log(g.join('\n'));
} else console.log('NOT FOUND: ' + gscFolder);
const hermesLogs = path.join(root, '.hermes', 'logs');
console.log('\n== .hermes/logs files containing "gsc" in name (depth 0) ==');
if (fs.existsSync(hermesLogs)) {
  for (const e of fs.readdirSync(hermesLogs)) if (/gsc/i.test(e)) console.log(e);
} else console.log('NOT FOUND .hermes/logs');
console.log('\n== stats of root-level gsc csv files ==');
for (const f of ['gsc_data.csv', 'gsc_page_query.csv', 'gsc_data_en.csv', 'gsc_data_ja.csv']) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) {
    const st = fs.statSync(p);
    console.log(`${f}: ${(st.size / 1024).toFixed(1)} KB, mtime=${st.mtime.toISOString()}`);
  } else console.log(`${f}: absent`);
}
