// 只读: 检查指定 slug 的 content 开头内嵌 JSON-LD 序列 (逐 locale)
import fs from 'fs';
const slug = process.argv[2] || 'kraft-paper-box-types-comparison-2026';
const LEAD_RE = /^(?:\s*<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>)+/;
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const e = d[slug];
  if (!e) { console.log(`${loc}: 无该 slug`); continue; }
  const c = e.content || '';
  const lead = (c.match(LEAD_RE) || [''])[0];
  const types = [...new Set([...lead.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)].map(m => m[1]))];
  console.log(`${loc}: content=${c.length} | 内嵌LD字节=${lead.length} | 类型=[${types.join(',')}]`);
}
