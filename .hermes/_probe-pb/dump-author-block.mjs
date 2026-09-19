// 只读: 提取 zh-hk 的作者署名块全文 (作为 ja 补齐的模板)
import fs from 'fs';
const d = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const c = d['sticker-material-pvc-vinyl-removable'].content;
const i = c.indexOf('linkedin.com');
const start = c.lastIndexOf('<p', i);
const end = c.indexOf('</p>', i) + 4;
console.log('作者块区间:', start, '->', end);
console.log(JSON.stringify(c.slice(start, end)));
