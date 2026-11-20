// 生成樣版 v3: 按 K3 反馈调整
// 1. div 块去掉左边色条 (不要符号)
// 2. H2 编号颜色调浅 (#2873F5 → #60A5FA 浅蓝)
// 3. 段落开头 emoji (💡/⚡) 渲染层预处理去掉
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const arr = Array.isArray(zh) ? zh : Object.values(zh);
const s = arr.find(x => (x.slug || x.id) === 'textbook-printing-guide');
let content = s.content;

// 渲染层预处理 1: h2 去旧编号
content = content.replace(/<h2[^>]*>[\s\S]*?<\/h2>/g, (h2) => {
  return h2.replace(/>\s*(?:[一二三四五六七八九十百]+\s*[、.．]|\d+\s*[.、.)．]|[A-Za-z]\s*[.、.)])\s*/, '>');
});
// 渲染层预处理 2: 段落/块开头 emoji 去掉 (💡/⚡/✅/❌ 等)
content = content.replace(/(<p[^>]*>)\s*[💡⚡✅❌⭐🔹🔸📌🎯]+\s*/g, '$1');

// .blog-content 覆盖层 v3 (K3 反馈版)
const cssOverride = `
/* ===== .blog-content 渲染层排版 v3 (2026-09-16 K3 拍板 + 反馈) =====
   sticker 块格式 + campus 小段落小标题
   反馈调整: 块无色条 / 编号浅色 / 去 emoji */
.blog-content { font-size: 17px; line-height: 1.9; color: #4B5563; counter-reset: blog-section; }
.blog-content p { margin: 0 0 16px; font-size: 16.5px; line-height: 1.9; color: #4B5563; }
.blog-content a { color: #2873F5; text-decoration: none; }
.blog-content a:hover { text-decoration: underline; }
.blog-content strong { color: #111827; font-weight: 700; }

/* H2 — campus 编号 + 色条 (编号浅蓝 #60A5FA, 色条浅蓝) */
.blog-content h2 {
  font-size: 22px !important; font-weight: 800 !important; color: #111827 !important;
  line-height: 1.45; margin: 44px 0 18px !important; padding: 10px 16px !important;
  border-left: 4px solid #93C5FD !important; border-radius: 0 10px 10px 0 !important;
  background: linear-gradient(90deg, #F0F6FF 0%, rgba(240,246,255,0) 100%) !important;
  counter-increment: blog-section;
}
.blog-content h2::before {
  content: counter(blog-section, cjk-ideographic) "、";
  color: #60A5FA; font-weight: 700; margin-right: 4px; font-size: 19px;
}

/* H3 — sticker 子层 */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 30px 0 12px; padding-left: 12px; border-left: 3px solid #FCD34D;
}

/* 表格 — sticker 风格 */
.blog-content table {
  border-collapse: separate !important; border-spacing: 0; width: 100%;
  margin: 20px 0 28px !important; font-size: 14.5px; border-radius: 10px; overflow: hidden;
  border: 1px solid #E5E7EB; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.blog-content thead th {
  background: #F3F4F6; color: #111827; font-weight: 700; text-align: left;
  padding: 12px 14px; font-size: 14px; border-bottom: 2px solid #E5E7EB;
}
.blog-content tbody td { padding: 12px 14px !important; border: none !important; border-bottom: 1px solid #F0F1F3 !important; color: #4B5563; }
.blog-content tbody tr:nth-child(even) { background: #F9FAFB; }
.blog-content tbody tr:hover { background: #F0F6FF; }
.blog-content tbody tr:last-child td { border-bottom: none !important; }

/* div 块 — 无色条, 仅淡色底 + 圆角 (K3 反馈: 前面的符号不要) */
.blog-content div[class*="bg-amber"], .blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"], .blog-content div[class*="bg-green"] {
  border-radius: 12px; border-left: none !important;
}
.blog-content div p { margin: 0 0 8px; }
.blog-content div p:last-child { margin-bottom: 0; }

/* ul/ol */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }

/* blockquote */
.blog-content blockquote {
  border-left: 4px solid #93C5FD; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0;
}
`;

const html = `<!DOCTYPE html>
<html lang="zh-hk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>結合版樣版 v3 · K3 反馈调整 (块无色条 / 编号浅色 / 去emoji)</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, 'PingFang HK', 'Microsoft JhengHei', sans-serif; background: #f5f7fa; color: #333; }
.wrap { max-width: 860px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 56px 64px; }
.demo-tag { display: inline-block; background: #2873F5; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
h1 { font-size: 28px; line-height: 1.3; color: #111827; margin-bottom: 12px; }
.meta { font-size: 13px; color: #6B7280; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
${cssOverride}
</style></head>
<body>
<div class="wrap">
  <span class="demo-tag">結合版 v3 · K3 反馈 (块无色条 · 编号浅蓝 · 无emoji)</span>
  <h1>教科書印刷・教材印刷指南 100本起 製本方式</h1>
  <div class="meta">智印港 · 印刷知識 · 2026-09-14 · 真实 content + 渲染层预处理</div>
  <div class="blog-content">${content}</div>
</div>
</body></html>`;

fs.writeFileSync('.hermes/demo-blog-C-v3.html', html, 'utf8');
console.log('✅ 樣版 v3 已生成: .hermes/demo-blog-C-v3.html');
console.log('   调整: 1. div 块无色条 2. H2 编号浅蓝 #60A5FA 3. 段落 emoji 预处理去掉');
