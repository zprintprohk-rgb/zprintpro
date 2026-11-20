#!/usr/bin/env node
/* 只读: 模型层现场取证 (K3 要求的「贴当前配置值与额度依据」) — 只打印键名/掩码值, 不泄露密钥 */
const fs = require('fs');
const path = require('path');
const mask = (v) => (v && v.length > 8 ? v.slice(0, 4) + '…' + v.slice(-4) : '(短值)');
const KEYS = [/MODEL/i, /API_KEY/i, /API_BASE/i, /BASE_URL/i, /PROVIDER/i, /DEEPSEEK/i, /ANTHROPIC/i, /OPENAI/i, /TOKEN/i];

console.log('== ① 进程环境 (键名 + 掩码值) ==');
const env = Object.entries(process.env).filter(([k]) => KEYS.some(re => re.test(k)));
if (!env.length) console.log('   (无匹配环境变量)');
env.forEach(([k, v]) => console.log(`   ${k} = ${/KEY|TOKEN/i.test(k) ? mask(v) : v}`));

console.log('\n== ② DSH_* harness 事实 ==');
Object.entries(process.env).filter(([k]) => /^DSH_/.test(k)).forEach(([k, v]) => console.log(`   ${k} = ${String(v).slice(0, 120)}`));

console.log('\n== ③ autoclaw 配置目录 (模型/额度相关文件) ==');
const dirs = ['C:\\Users\\Administrator\\.openclaw-autoclaw', 'C:\\Users\\Administrator\\.openclaw-autoclaw\\config'];
for (const d of dirs) {
  if (!fs.existsSync(d)) { console.log(`   ${d}: (不存在)`); continue; }
  for (const f of fs.readdirSync(d).slice(0, 25)) {
    const p = path.join(d, f);
    try { const st = fs.statSync(p); console.log(`   ${st.isDirectory() ? '[D]' : '   '} ${f} ${st.isDirectory() ? '' : st.size + 'B'} ${st.mtime.toISOString().slice(0, 16)}`); } catch { }
  }
}
console.log('\n== ④ 模型/额度 关键字扫描 (配置内的 model / balance / quota 行, 值掩码) ==');
for (const d of ['C:\\Users\\Administrator\\.openclaw-autoclaw']) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (!fs.statSync(p).isFile()) continue;
    if (!/\.(json|json5|ya?ml|toml|env|txt|ini)$/i.test(f)) continue;
    const txt = fs.readFileSync(p, 'utf8');
    const lines = txt.split(/\r?\n/).filter(l => /model|quota|balance|credit|provider|timeout/i.test(l)).slice(0, 8);
    if (lines.length) { console.log(`   --- ${f} ---`); lines.forEach(l => console.log('      ' + l.replace(/(sk-[A-Za-z0-9_-]{6})[A-Za-z0-9_-]+/g, '$1…').slice(0, 150))); }
  }
}
