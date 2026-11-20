// 生成两个 blog 排版样版 HTML 供 K3 对比选型
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const arr = Array.isArray(j) ? j : Object.values(j);
const s = arr.find(x => (x.slug || x.id) === 'textbook-printing-guide');
const content = s.content;

// 样式 A: 旧 9 段结构增强版 (prose 基础上加 H2 色条+编号徽章 / 表格斑马纹圆角 / div 升级圆角左边框)
const cssA = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, 'PingFang HK', 'Microsoft JhengHei', sans-serif; background: #f5f7fa; color: #333; }
.wrap { max-width: 820px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 56px 64px; }
.demo-tag { display: inline-block; background: #2873F5; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
h1 { font-size: 28px; line-height: 1.3; color: #111827; margin-bottom: 16px; }
.meta { font-size: 13px; color: #6B7280; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
/* A 核心: H2 左侧色条 + 圆角编号徽章 */
.content h2 { font-size: 21px; font-weight: 800; color: #111827; margin: 44px 0 18px; padding-left: 18px; border-left: 5px solid #2873F5; line-height: 1.4; position: relative; }
.content h2::before { content: attr(data-num); display: inline-block; background: #2873F5; color: #fff; font-size: 13px; font-weight: 700; border-radius: 50%; width: 26px; height: 26px; line-height: 26px; text-align: center; margin-right: 8px; vertical-align: 2px; }
/* A: p 段距 + 行高 */
.content p { font-size: 16px; line-height: 1.9; color: #4B5563; margin: 0 0 16px; }
/* A: 链接 */
.content a { color: #2873F5; text-decoration: none; font-weight: 500; }
.content a:hover { text-decoration: underline; }
/* A: strong */
.content strong { color: #111827; font-weight: 700; background: linear-gradient(transparent 60%, #FFE9A8 60%); padding: 0 2px; }
/* A: 表格斑马纹 + 圆角 + 表头蓝 */
.content table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 20px 0 28px; font-size: 14.5px; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
.content thead th { background: #2873F5; color: #fff; font-weight: 700; text-align: left; padding: 12px 16px; font-size: 13.5px; letter-spacing: 0.3px; }
.content tbody td { padding: 12px 16px; border-bottom: 1px solid #F0F1F3; color: #4B5563; }
.content tbody tr:nth-child(even) { background: #F8FAFF; }
.content tbody tr:last-child td { border-bottom: none; }
.content tbody tr:hover { background: #F0F6FF; }
/* A: div 块升级 — 圆角 + 左边框 + 浅蓝底 */
.content div { border-radius: 12px; padding: 18px 20px; margin: 18px 0; border-left: 4px solid #2873F5; background: #F0F6FF; }
.content div p { margin: 0; font-size: 15px; line-height: 1.8; }
/* A: ol 列表 */
.content ol { margin: 12px 0 20px; padding-left: 24px; }
.content ol li { margin: 8px 0; font-size: 15.5px; line-height: 1.8; color: #4B5563; }
`;

// 样式 B: v9.2 编辑式 (首字下沉 + H2 墨线 + 金句橙底条 + 17.5px 基线 + 卡片式表格)
const cssB = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, 'PingFang HK', 'Microsoft JhengHei', serif; background: #f5f7fa; color: #333; }
.wrap { max-width: 820px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 56px 64px; }
.demo-tag { display: inline-block; background: #F87314; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
h1 { font-size: 30px; font-weight: 800; color: #111827; margin-bottom: 16px; line-height: 1.25; letter-spacing: -0.01em; }
.meta { font-size: 13px; color: #6B7280; margin-bottom: 36px; padding-bottom: 20px; border-bottom: 1px solid #E5E7EB; }
/* B 核心: 首段首字下沉 */
.content > p:first-of-type::first-letter { font-size: 56px; font-weight: 800; color: #2873F5; float: left; line-height: 0.9; margin: 4px 10px 0 0; font-family: Georgia, serif; }
/* B: H2 墨线 (下划线分隔) + 编号 */
.content h2 { font-size: 22px; font-weight: 800; color: #111827; margin: 52px 0 22px; padding-bottom: 14px; border-bottom: 2px solid #111827; position: relative; letter-spacing: -0.01em; }
.content h2::after { content: attr(data-num); position: absolute; right: 0; bottom: 10px; font-size: 34px; font-weight: 800; color: #F0F1F3; font-family: Georgia, serif; }
/* B: 正文 17.5px justify */
.content p { font-size: 17.5px; line-height: 1.9; color: #374151; margin: 0 0 18px; text-align: justify; }
/* B: 链接 */
.content a { color: #2873F5; text-decoration: none; border-bottom: 1px solid rgba(40,115,245,0.3); }
.content a:hover { border-bottom-color: #2873F5; }
/* B: strong 金句橙底条 */
.content strong { color: #111827; font-weight: 700; background: #FFF3E0; padding: 1px 6px; border-radius: 4px; border-left: 3px solid #F87314; }
/* B: 表格卡片式 — 圆角 + 表头藏青 + 斑马纹 */
.content table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 24px 0 32px; font-size: 15px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(17,24,39,0.08); }
.content thead th { background: #111827; color: #fff; font-weight: 700; text-align: left; padding: 14px 18px; font-size: 14px; letter-spacing: 0.4px; }
.content tbody td { padding: 14px 18px; border-bottom: 1px solid #F0F1F3; color: #374151; }
.content tbody tr:nth-child(even) { background: #FAFAFA; }
.content tbody tr:last-child td { border-bottom: none; }
.content tbody tr:hover { background: #F5F9FF; }
/* B: div 块 — 橙渐变左边条 + 浅底 + 圆角 */
.content div { border-radius: 14px; padding: 20px 22px; margin: 22px 0; background: linear-gradient(135deg, #FFF8F0 0%, #FFFDF9 100%); border: 1px solid #FFE3C7; border-left: 5px solid #F87314; }
.content div p { margin: 0; font-size: 16px; line-height: 1.85; }
/* B: ol */
.content ol { margin: 12px 0 22px; padding-left: 26px; }
.content ol li { margin: 9px 0; font-size: 16px; line-height: 1.85; color: #374151; padding-left: 4px; }
`;

function buildDemo(css, tag, title) {
  // 给 h2 加 data-num (1,2,3...)
  let c = content;
  let num = 0;
  c = c.replace(/<h2>/g, () => { num++; return `<h2 data-num="${num}">`; });
  return `<!DOCTYPE html>
<html lang="zh-hk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><style>${css}</style></head>
<body>
<div class="wrap">
  <span class="demo-tag">${tag}</span>
  <h1>教科書印刷・教材印刷指南 100本起 製本方式</h1>
  <div class="meta">智印港 · 印刷知識 · 2026-09-14</div>
  <div class="content">${c}</div>
</div>
</body></html>`;
}

fs.writeFileSync('.hermes/demo-blog-A-old9.html', buildDemo(cssA, '樣版 A · 舊 9 段結構風格', '樣版 A'));
fs.writeFileSync('.hermes/demo-blog-B-editorial.html', buildDemo(cssB, '樣版 B · v9.2 編輯式風格', '樣版 B'));
console.log('✅ 两个样版已生成:');
console.log('  .hermes/demo-blog-A-old9.html (舊 9 段結構)');
console.log('  .hermes/demo-blog-B-editorial.html (v9.2 編輯式)');
