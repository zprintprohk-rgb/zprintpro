#!/usr/bin/env node
/* 只读: 环境/密钥文件中是否存在可用于 GitHub API 的 token (只打印键名, 不打印值) */
const fs = require('fs');
const cands = ['F:\\zprintpro-main-tmp\\.env', 'F:\\zprintpro-main-tmp\\.env.local', 'F:\\zprintpro-main-tmp\\.env.example'];
for (const f of cands) {
  if (!fs.existsSync(f)) { console.log(`${f}: (不存在)`); continue; }
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  const keys = lines.map(l => (l.match(/^\s*([A-Z0-9_]+)\s*=/) || [])[1]).filter(Boolean);
  console.log(`${f}: ${keys.length} 键 -> ${keys.filter(k => /GITHUB|GH_|TOKEN|CLOUDFLARE|CF_|API_KEY/i.test(k)).join(', ') || '(无相关键)'}`);
}
const envKeys = Object.keys(process.env).filter(k => /GITHUB|GH_TOKEN|CLOUDFLARE|CF_API/i.test(k));
console.log('\nprocess.env 相关键:', envKeys.join(', ') || '(无)');
// 检查 .hermes/secrets 目录键名
const sd = 'F:\\zprintpro-main-tmp\\.hermes\\secrets';
if (fs.existsSync(sd)) console.log('.hermes/secrets 文件:', fs.readdirSync(sd).join(', '));
