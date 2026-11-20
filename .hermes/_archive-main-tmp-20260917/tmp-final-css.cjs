// 最终 .blog-content CSS 设计 — 兼顾 content 已有 Tailwind 类, 只补缺失基础排版
// 原则: 不破坏 sticker/campus 等文章已有的 border-l-4 块; 给 textbook 等裸文章补色条
const css = `
/* ===== .blog-content 渲染层排版 (2026-09-16 K3 拍板) =====
   sticker-material 块格式 (amber/blue/gray 色条) + campus 小段落小标题 (编号 H2 + 密集小段落)
   放在 globals.css @layer components 或 base 后, 特异性 (0,2,1) 高于 Tailwind 单类 (0,1,0) */

/* 基础排版 */
.blog-content p { font-size: 16.5px; line-height: 1.9; color: #4B5563; margin-bottom: 16px; }
.blog-content a { color: #2873F5; text-decoration: none; }
.blog-content a:hover { text-decoration: underline; }
.blog-content strong { color: #111827; font-weight: 700; }

/* H2 — campus 编号 + 色条 (自动 cjk 编号, 无需改 content) */
.blog-content h2 {
  font-size: 22px; font-weight: 800; color: #111827; line-height: 1.45;
  margin: 44px 0 18px; padding: 10px 16px;
  border-left: 6px solid #2873F5; border-radius: 0 10px 10px 0;
  background: linear-gradient(90deg, #F0F6FF 0%, rgba(240,246,255,0) 100%);
  counter-increment: blog-section;
}
.blog-content { counter-reset: blog-section; }
.blog-content h2::before { content: counter(blog-section, cjk-ideographic) "、"; color: #2873F5; font-weight: 800; }

/* H3 — sticker 子层 */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 30px 0 12px; padding-left: 12px; border-left: 3px solid #F87314;
}

/* 表格 — sticker 风格 (覆盖 Tailwind w-full border-collapse, 补边框美化) */
.blog-content table {
  border-collapse: separate; border-spacing: 0; width: 100%;
  margin: 20px 0 28px; font-size: 14.5px; border-radius: 10px; overflow: hidden;
  border: 1px solid #E5E7EB; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.blog-content thead th {
  background: #F3F4F6; color: #111827; font-weight: 700; text-align: left;
  padding: 12px 14px; font-size: 14px; border-bottom: 2px solid #E5E7EB;
}
.blog-content tbody td { padding: 12px 14px; border-bottom: 1px solid #F0F1F3; color: #4B5563; }
.blog-content tbody tr:nth-child(even) { background: #F9FAFB; }
.blog-content tbody tr:hover { background: #F0F6FF; }
.blog-content tbody tr:last-child td { border-bottom: none; }

/* div 块 — 补色条 (保留 content 已有 bg/border 类; 无 border-l-4 的补上) */
.blog-content div[class*="bg-amber"], .blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"], .blog-content div[class*="bg-green"] {
  border-radius: 12px;
}
/* 已有 border-l-4 的保留 (sticker); 无的补色条 */
.blog-content div[class*="bg-amber"]:not([class*="border-l-4"]) { border-left: 5px solid #F59E0B; }
.blog-content div[class*="bg-blue"]:not([class*="border-l-4"]) { border-left: 5px solid #3B82F6; }
.blog-content div[class*="bg-gray"]:not([class*="border-l-4"]) { border-left: 5px solid #9CA3AF; }
.blog-content div[class*="bg-green"]:not([class*="border-l-4"]) { border-left: 5px solid #10B981; }

/* ul/ol */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }

/* blockquote */
.blog-content blockquote {
  border-left: 4px solid #2873F5; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0;
}
`;
console.log('=== 最終 .blog-content CSS 设计 ===');
console.log(css);
console.log('=== 设计要点 ===');
console.log('1. h2 用 CSS counter 自动编号 (cjk-ideographic 一、二、三…), 不改 content');
console.log('2. 表格覆盖 Tailwind 默认 (补边框/斑马纹/圆角/阴影)');
console.log('3. div 块保留 content 已有 border-l-4 (sticker), 无的补色条 (textbook)');
console.log('4. 特异性 (0,2,1) 高于 Tailwind 单类 (0,1,0), 覆盖生效');
