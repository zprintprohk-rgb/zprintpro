'use strict';
/** 定位并发 DSH 会话 v2: 读 storages/session_projcache 与 sessions 目录的真实结构 (只读元数据) */
const fs = require('fs');
const path = require('path');
const CACHE = 'C:\\Users\\Administrator\\.dsh\\storages\\session_projcache\\sessions';
const BASE = 'C:\\Users\\Administrator\\.dsh\\sessions\\--F-zprintpro-nextjs--';

console.log('=== projcache 会话档 (按 mtime) ===');
if (fs.existsSync(CACHE)) {
  const rows = fs.readdirSync(CACHE).map(n => {
    const st = fs.statSync(path.join(CACHE, n));
    return { n, m: st.mtime, sz: st.size };
  }).sort((a, b) => b.m - a.m).slice(0, 6);
  for (const r of rows) {
    let j = {};
    try { j = JSON.parse(fs.readFileSync(path.join(CACHE, r.n), 'utf8')); } catch (e) { }
    const title = j.title || j.name || j.summary || j.firstUserMessage || '';
    console.log(`  ${r.m.toISOString()}  ${String(r.sz).padStart(7)}B  ${r.n}`);
    console.log(`      keys: ${Object.keys(j).slice(0, 12).join(', ')}`);
    if (title) console.log(`      title: ${String(title).replace(/\s+/g, ' ').slice(0, 140)}`);
  }
} else console.log('  无 projcache 目录');

console.log('\n=== sessions/<id>/ 内实际文件 ===');
if (fs.existsSync(BASE)) {
  const dirs = fs.readdirSync(BASE, { withFileTypes: true }).filter(d => d.isDirectory())
    .map(d => ({ n: d.name, m: fs.statSync(path.join(BASE, d.name)).mtime }))
    .sort((a, b) => b.m - a.m).slice(0, 3);
  for (const d of dirs) {
    const files = fs.readdirSync(path.join(BASE, d.n));
    console.log(`  ${d.m.toISOString()}  ${d.n}`);
    console.log(`      files: ${files.slice(0, 8).join(', ')}${files.length > 8 ? ' …' : ''}`);
  }
}
