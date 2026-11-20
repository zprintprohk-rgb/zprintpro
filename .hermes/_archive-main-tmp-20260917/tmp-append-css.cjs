// 追加 .blog-content v5 样式到 globals.css 尾部 (K3 2026-09-16 拍板, blog 全站标准样式)
const fs = require('fs');
const path = 'src/app/globals.css';
const css = `
/* ============================================================
   .blog-content 渲染层排版 v5 — K3 2026-09-16 拍板固定 (自进化执行)
   来源: sticker-material 块格式 + campus 小段落小标题 结合
   适用范围: 全站所有 blog 正文 (blog/[slug]/page.tsx 容器)
   特性: H2 藏青编号(counter 自动) / 块浅灰留白 / 表格美化 / 段落排版
   配套: page.tsx 预处理 (h2 去旧编号 + 段落开头 emoji 去除)
   ============================================================ */
.blog-content { font-size: 17px; line-height: 1.9; color: #4B5563; counter-reset: blog-section; }
.blog-content p { margin: 0 0 16px; font-size: 16.5px; line-height: 1.9; color: #4B5563; }
.blog-content a { color: #2873F5; text-decoration: none; }
.blog-content a:hover { text-decoration: underline; }
.blog-content strong { color: #111827; font-weight: 700; }

/* H2 — 皇家藏青编号(counter) + 藏青标题 + 藏青左条 + 浅藏青渐变底 */
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

/* H3 — 子层 (藏青文字 + 浅橙条) */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 30px 0 12px; padding-left: 12px; border-left: 3px solid #FCD34D;
}

/* 表格 — 表头浅灰+藏青字 + 斑马纹 + 圆角 + 阴影 */
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

/* div 块 — 留白(16px) + 圆角 + 无色条; bg-blue 统一浅灰底 (不撞 H2 浅藏青底) */
.blog-content div[class*="bg-amber"], .blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"], .blog-content div[class*="bg-green"] {
  border-radius: 12px; border-left: none !important; margin: 16px 0 !important;
}
.blog-content div[class*="bg-blue"] { background: #F9FAFB !important; }
.blog-content div p { margin: 0 0 8px; }
.blog-content div p:last-child { margin-bottom: 0; }

/* ul/ol 列表 */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }

/* blockquote 引用 */
.blog-content blockquote {
  border-left: 4px solid #1D3465; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0;
}
`;
fs.appendFileSync(path, css, 'utf8');
// 验证
const b = fs.readFileSync(path);
const txt = b.toString('utf8');
console.log('✅ globals.css 追加完成, 新长度:', txt.length);
console.log('BOM 检查:', b[0] === 0xEF ? '❌ 有 BOM' : '✅ 无 BOM');
console.log('.blog-content 出现次数:', (txt.match(/\.blog-content/g) || []).length);
console.log('文件行数:', txt.split('\n').length);
