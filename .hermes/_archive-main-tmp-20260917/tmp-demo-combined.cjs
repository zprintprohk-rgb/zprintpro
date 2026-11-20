// 生成「结合版」样版: sticker 块格式 + campus 小段落小标题, 用 .blog-content 类 (替代 prose)
const fs = require('fs');
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const arr = Array.isArray(zh) ? zh : Object.values(zh);
// 用 textbook content (K3 点名的排版差文章) 渲染, 展示升级后的效果
const s = arr.find(x => (x.slug || x.id) === 'textbook-printing-guide');
const content = s.content;

// .blog-content 渲染层样式 — sticker 块格式 + campus 小段落小标题
const cssBlogContent = `
/* ===== .blog-content 渲染层排版 (2026-09-16 K3 拍板: sticker 格式 + campus 小段落小标题) ===== */
.blog-content { font-size: 17px; line-height: 1.9; color: #4B5563; }
.blog-content p { margin: 0 0 18px; font-size: 16.5px; line-height: 1.9; color: #4B5563; }
.blog-content a { color: #2873F5; text-decoration: none; font-weight: 500; }
.blog-content a:hover { text-decoration: underline; }

/* H2 — campus 风格: 编号 + 左侧色条 + 清晰层级 */
.blog-content h2 {
  font-size: 22px; font-weight: 800; color: #111827;
  margin: 48px 0 20px; padding: 10px 16px;
  border-left: 6px solid #2873F5; border-radius: 0 10px 10px 0;
  background: linear-gradient(90deg, #F0F6FF 0%, rgba(240,246,255,0) 100%);
  line-height: 1.45; counter-increment: blog-section;
}
.blog-content h2::before {
  content: counter(blog-section, cjk-ideographic) "、";
  color: #2873F5; margin-right: 4px; font-weight: 800;
}

/* H3 — 子层标题 (sticker 风格) */
.blog-content h3 {
  font-size: 18px; font-weight: 700; color: #1D3465;
  margin: 32px 0 14px; padding-left: 12px;
  border-left: 3px solid #F87314; line-height: 1.5;
}

/* strong 关键词 — sticker 风格 (荧光高亮) */
.blog-content strong { color: #111827; font-weight: 700; }

/* 表格 — sticker 风格: 表头灰底 + 边框 + 斑马纹 + 圆角 */
.blog-content table {
  width: 100%; border-collapse: separate; border-spacing: 0;
  margin: 24px 0 30px; font-size: 14.5px; border-radius: 10px;
  overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #E5E7EB;
}
.blog-content thead th {
  background: #F3F4F6; color: #111827; font-weight: 700;
  text-align: left; padding: 12px 14px; font-size: 14px;
  border-bottom: 2px solid #E5E7EB;
}
.blog-content tbody td {
  padding: 12px 14px; border-bottom: 1px solid #F0F1F3; color: #4B5563;
}
.blog-content tbody tr:nth-child(even) { background: #F9FAFB; }
.blog-content tbody tr:last-child td { border-bottom: none; }
.blog-content tbody tr:hover { background: #F0F6FF; }

/* div 块 — sticker 风格: 色条 + 圆角 (amber/blue/gray 统一) */
.blog-content div.bg-amber-50,
.blog-content div[class*="bg-amber"],
.blog-content div[class*="bg-blue"],
.blog-content div[class*="bg-gray"],
.blog-content div[class*="bg-green"] {
  border-radius: 12px; padding: 18px 20px; margin: 20px 0;
}
.blog-content div[class*="bg-amber"] { border-left: 5px solid #F59E0B; background: #FFFBEB; }
.blog-content div[class*="bg-blue"] { border-left: 5px solid #3B82F6; background: #EFF6FF; }
.blog-content div[class*="bg-gray"] { border-left: 5px solid #9CA3AF; background: #F9FAFB; }
.blog-content div[class*="bg-green"] { border-left: 5px solid #10B981; background: #ECFDF5; }
.blog-content div p { margin: 0 0 8px; }
.blog-content div p:last-child { margin-bottom: 0; }

/* ul/ol 列表 */
.blog-content ul, .blog-content ol { margin: 12px 0 20px; padding-left: 26px; }
.blog-content ul li, .blog-content ol li { margin: 8px 0; font-size: 16px; line-height: 1.85; }
.blog-content ul { list-style: disc; }
.blog-content ol { list-style: decimal; }

/* blockquote */
.blog-content blockquote {
  border-left: 4px solid #2873F5; padding: 12px 16px; margin: 20px 0;
  background: #F0F6FF; border-radius: 0 10px 10px 0; font-style: italic;
}
`;

const html = `<!DOCTYPE html>
<html lang="zh-hk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>結合版樣版 · sticker 格式 + campus 小段落</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, 'PingFang HK', 'Microsoft JhengHei', sans-serif; background: #f5f7fa; color: #333; }
.wrap { max-width: 860px; margin: 40px auto; background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); padding: 56px 64px; }
.demo-tag { display: inline-block; background: #2873F5; color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 20px; }
h1 { font-size: 28px; line-height: 1.3; color: #111827; margin-bottom: 12px; }
.meta { font-size: 13px; color: #6B7280; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
/* 💡 信息块 (campus 开头) */
.lead-notes { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.lead-note { display: flex; align-items: flex-start; gap: 8px; background: #F0F6FF; border-left: 4px solid #2873F5; border-radius: 8px; padding: 12px 14px; font-size: 14.5px; color: #374151; }
${cssBlogContent}
.blog-content { counter-reset: blog-section; }
</style></head>
<body>
<div class="wrap">
  <span class="demo-tag">結合版 · sticker 格式 + campus 小段落小标题</span>
  <h1>教科書印刷・教材印刷指南 100本起 製本方式</h1>
  <div class="meta">智印港 · 印刷知識 · 2026-09-14</div>
  <div class="lead-notes">
    <div class="lead-note">💡 教科書・教材印刷 100 本起訂 · A4/B5 · 騎馬釘/膠裝/精裝 3 大製本方式 · 5-7 天交貨</div>
    <div class="lead-note">💡 4 大國際認證: FSC 認證紙 · ISO 9001 · FDA 食品接觸 · EU REACH</div>
    <div class="lead-note">💡 9 月開學季繁忙期: 急件 3 天 · 順豐本地 · DHL 全球 2-4 天</div>
  </div>
  <div class="blog-content">${content}</div>
</div>
</body></html>`;

fs.writeFileSync('.hermes/demo-blog-C-combined.html', html, 'utf8');
console.log('✅ 結合版樣版已生成: .hermes/demo-blog-C-combined.html');
console.log('   用 textbook content (K3 点名排版差文章) 渲染 .blog-content 样式');
console.log('   H2 编号 (campus) + 小段落 + 块色条 (sticker) + 表格斑马纹 + 💡 开头信息块');
