// 只读: 提取 zh-hk / en 的延伸閱讀全部链接目标 + 完整节长度
import fs from 'fs';
for (const loc of ['zh-hk', 'en']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const c = d['sticker-material-pvc-vinyl-removable'].content;
  const i = c.search(/<h2>(延伸閱讀|Further Reading)<\/h2>/);
  const end = c.indexOf('</ul>', i) + 5;
  const sec = c.slice(i, end);
  console.log(`\n===== ${loc} 节长度=${sec.length} =====`);
  const links = [...sec.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
  links.forEach((m, k) => console.log(`${k + 1}. ${m[1]}  ←  ${m[2]}`));
  console.log('节末尾 80 字符:', JSON.stringify(sec.slice(-80)));
}
