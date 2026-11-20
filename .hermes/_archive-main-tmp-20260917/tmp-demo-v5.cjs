// 生成樣版 v5: 修复 H1 被 Tailwind CDN preflight 覆盖的问题
// 根因: h1 { font-size: 38px } 特异性 (0,0,1) 被 Tailwind preflight h1{font-size:inherit} (0,0,1, 后加载) 覆盖 → H1=16px < H2=22px
// 修复: .wrap h1 { font-size: 42px !important } (特异性 + !important 必胜)
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const arr = Array.isArray(zh) ? zh : Object.values(zh);
const s = arr.find(x => (x.slug || x.id) === 'textbook-printing-guide');
let content = s.content;

content = content.replace(/<h2[^>]*>[\s\S]*?<\/h2>/g, (h2) => {
  return h2.replace(/>\s*(?:[一二三四五六七八九十百]+\s*[、.．]|\d+\s*[.、.)．]|[A-Za-z]\s*[.、.)])\s*/, '>');
});
content = content.replace(/(<p[^>]*>)\s*[💡⚡✅❌⭐🔹🔸📌🎯]+\s*/g, '$1');

const cssOverride = `
/* ===== .blog-content 渲染层排版 v5 (2026-09-16 K3 拍板 + 3 轮反馈) =====
   v5 关键修复: H1 用 !important 防 Tailwind preflight 覆盖 (H1 必须 > H2) */
.blog-content { font-size: 17px; line-height: 1.9; color: #4B5563; counter-reset: blog-section; }
.blog-content p { margin: 0 0 16px; font-size: 16.5px; line-height: 1.9; color: #4B5563; }
.blog-content a { color: #2873F5; text-decoration: none; }
.blog-content a:hover { text-decoration: underline; }
.blog-content strong { color: #111827; font-weight: 700; }

/* H2 — 皇家藏青编号 + 大字数字 + 藏青标题 + 藏青左条 + 浅藏青渐变底 */
.blog-content h2 {
  font-size: 22px !important; font-weight: 800 !important; color: #1D3465 !important;
  line-height: 1.45; margin: 44px 0 18px !important; padding: 12px 18px !important;
  border-left: 5px solid #1D3465 !important; border-radius: 0 10px 10px 0 !important;
  background: linear-gradient(90deg, #EDF1F9 0%, rgba(237,241,249,0) 100%) !important;
  counter-increment: blog-section;
}
.blog-content h2::before {
  content: counter(blog-section, cjk-ideographic) "、";
  color: #1D3465; font-weight: 800; margin-right: 6px; font-size: 24px;
}

/* H3 — 子层 */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 30px 0 12px; padding-left: 12px; border-left: 3px solid #FCD34D;
}

/* 表格 */
.blog-content table {
  border-collapse: separate !important; border-spacing: 0; width: 100%;
  margin: 20px 0 28px !important; font-size: 14.5px; border-radius: 10px; overflow: hidden;
  border: 1px solid #E5E7EB; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.blog-content thead th {
  background: #F3F4F6; color: #1D3465; font-weight: 700; text-align: left;
  padding: 12px 14px; font-size: 14px; border-bottom: 2px solid #E5E7EB;
}
.blog-content tbody td { padding: 12px 14px !important; border: none !important; border-bottom: 1px solid #F0F1F3 !important; color: #4B5563; }
.blog-content tbody tr:nth-child(even) { background: #F9FAFB; }
.blog-content tbody tr:hover { background: #F0F6FF; }
.blog-content tbody tr:last-child td { border-bottom: none !important; }

/* div 块 — 留白 + 浅灰底 (bg-blue 不撞 H2) */
.blog-content div[class*="bg-amber"], .blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"], .blog-content div[class*="bg-green"] {
  border-radius: 12px; border-left: none !important; margin: 16px 0 !important;
}
.blog-content div[class*="bg-blue"] { background: #F9FAFB !important; }
.blog-content div p { margin: 0 0 8px; }
.blog-content div p:last-child { margin-bottom: 0; }

/* ul/ol */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }

/* blockquote */
.blog-content blockquote {
  border-left: 4px solid #1D3465; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0;
}
`;

const html = `<!DOCTYPE html>
<html lang="zh-hk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>結合版樣版 v5 · H1 修复 (42px 大于 H2 22px)</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, 'PingFang HK', 'Microsoft JhengHei', sans-serif; background: #f5f7fa; color: #333; }
.wrap { max-width: 860px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 56px 64px; }
.demo-tag { display: inline-block; background: #1D3465; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 24px; }
/* H1 修复: .wrap h1 + !important, 特异性 (0,1,1)+!important 必胜 Tailwind preflight (0,0,1) */
.wrap h1 { font-size: 42px !important; line-height: 1.25; color: #111827 !important; margin-bottom: 14px; font-weight: 800; letter-spacing: -0.01em; }
.meta { font-size: 13px; color: #6B7280; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
${cssOverride}
</style></head>
<body>
<div class="wrap">
  <span class="demo-tag">結合版 v5 · H1 42px 大标题 (修复 preflight 覆盖)</span>
  <h1>教科書印刷・教材印刷指南 100本起 製本方式</h1>
  <div class="meta">智印港 · 印刷知識 · 2026-09-14</div>
  <div class="blog-content">${content}</div>
</div>
</body></html>`;

fs.writeFileSync('.hermes/demo-blog-C-v5.html', html, 'utf8');
console.log('✅ 樣版 v5 已生成: .hermes/demo-blog-C-v5.html');
console.log('   H1 修复: .wrap h1 { font-size: 42px !important } — H1(42px) > H2(22px), 层级正确');
