// 生成精确模拟样版: Tailwind CDN + textbook content 原样(含自带类) + .blog-content 覆盖层
// 模拟真实渲染: content 的 Tailwind 类生效, 我的 .blog-content CSS 覆盖
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const arr = Array.isArray(zh) ? zh : Object.values(zh);
const s = arr.find(x => (x.slug || x.id) === 'textbook-printing-guide');
let content = s.content;

// 模拟渲染层预处理: h2 去旧编号 (避免与 CSS counter 重复)
// 匹配: "1. " / "一、" / "1、" / "1) " / "Q1. " 等开头编号
content = content.replace(/<h2[^>]*>[\s\S]*?<\/h2>/g, (h2) => {
  return h2.replace(/>\s*(?:[一二三四五六七八九十百]+\s*[、.．]|\d+\s*[.、.)．]|[A-Za-z]\s*[.、.)])\s*/, '>');
});

// .blog-content 覆盖层 (最终版, 与 globals.css 将写入的一致)
const cssOverride = `
/* ===== .blog-content 渲染层排版 (2026-09-16 K3 拍板: sticker 格式 + campus 小段落小标题) ===== */
.blog-content { font-size: 17px; line-height: 1.9; color: #4B5563; counter-reset: blog-section; }
.blog-content p { margin: 0 0 16px; font-size: 16.5px; line-height: 1.9; color: #4B5563; }
.blog-content a { color: #2873F5 !important; text-decoration: none; }
.blog-content a:hover { text-decoration: underline; }
.blog-content strong { color: #111827; font-weight: 700; }

/* H2 — campus 编号 + 色条 (特异性 0,1,1 > content 的 text-2xl 0,1,0) */
.blog-content h2 {
  font-size: 22px !important; font-weight: 800 !important; color: #111827 !important;
  line-height: 1.45; margin: 44px 0 18px !important; padding: 10px 16px !important;
  border-left: 6px solid #2873F5 !important; border-radius: 0 10px 10px 0 !important;
  background: linear-gradient(90deg, #F0F6FF 0%, rgba(240,246,255,0) 100%) !important;
  counter-increment: blog-section;
}
.blog-content h2::before {
  content: counter(blog-section, cjk-ideographic) "、";
  color: #2873F5; font-weight: 800; margin-right: 2px;
}

/* H3 — sticker 子层 */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 30px 0 12px; padding-left: 12px; border-left: 3px solid #F87314;
}

/* 表格 — sticker 风格 (覆盖 content 的 w-full text-sm border-collapse) */
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

/* div 块 — 补色条 (sticker 格式; content 已有 border-l-4 的保留, 无的补) */
.blog-content div[class*="bg-amber"]:not([class*="border-l-4"]),
.blog-content div[class*="bg-blue"]:not([class*="border-l-4"]),
.blog-content div[class*="bg-gray"]:not([class*="border-l-4"]),
.blog-content div[class*="bg-green"]:not([class*="border-l-4"]) { border-left: 5px solid !important; }
.blog-content div[class*="bg-amber"]:not([class*="border-l-4"]) { border-left-color: #F59E0B !important; }
.blog-content div[class*="bg-blue"]:not([class*="border-l-4"]) { border-left-color: #3B82F6 !important; }
.blog-content div[class*="bg-gray"]:not([class*="border-l-4"]) { border-left-color: #9CA3AF !important; }
.blog-content div[class*="bg-green"]:not([class*="border-l-4"]) { border-left-color: #10B981 !important; }
.blog-content div[class*="bg-amber"], .blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"], .blog-content div[class*="bg-green"] { border-radius: 12px; }
.blog-content div p { margin: 0 0 8px; }
.blog-content div p:last-child { margin-bottom: 0; }

/* ul/ol */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }

/* blockquote */
.blog-content blockquote {
  border-left: 4px solid #2873F5; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0;
}
`;

// 构建样版: 真实模拟 (Tailwind CDN + 覆盖层)
const html = `<!DOCTYPE html>
<html lang="zh-hk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>結合版樣版 v2 · 精確模擬 (sticker 格式 + campus 小段落小标题)</title>
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
  <span class="demo-tag">結合版 v2 · 精確模擬 (Tailwind 类生效 + 覆盖层)</span>
  <h1>教科書印刷・教材印刷指南 100本起 製本方式</h1>
  <div class="meta">智印港 · 印刷知識 · 2026-09-14 · 内容为真实 content + 自带 Tailwind 类</div>
  <div class="blog-content">${content}</div>
</div>
</body></html>`;

fs.writeFileSync('.hermes/demo-blog-C-v2.html', html, 'utf8');
console.log('✅ 精確模擬樣版已生成: .hermes/demo-blog-C-v2.html');
console.log('   特点: Tailwind CDN (content 自带类真实生效) + .blog-content 覆盖层 (最终 CSS)');
console.log('   h2 去旧编号预处理已模拟 (textbook 的 "1. " → 由 CSS counter 生成 "一、" "二、"...)');
