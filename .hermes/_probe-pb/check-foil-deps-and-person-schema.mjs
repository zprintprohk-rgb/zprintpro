/**
 * P1 依赖确认 + P2 结构确认 (K3 2026-09-19 评估第二/三/五点)
 *
 * 目的 A (foil 依赖确认): 区分 foil × 3 线上「生成区无 FAQPage」的**根因**:
 *   ① `content` 里根本没有 FAQ 段 (extractor 无输入)  → 必须**补正文** FAQ 段
 *   ② `content` 里有 Q&A 但格式不可解析 (extractor 解析 0 组) → 只需**改包装标签**
 *   ③ 有可解析 FAQ 但线上未部署新 build → 等部署
 *   ⚠️ 关键前提 (K3 指出): page.tsx 的 `faqJsonLd = faqs ? generateFaqJsonLd(faqs) : null`,
 *      而 `faqs` 直接由 `extractFaqFromHtml(post.content)` 得来 ⇒ **不存在独立的 faqs 字段**,
 *      正文可解析 = FAQPage 生成。故本脚本直接对 blog-data JSON 跑生产正则判定。
 *
 * 目的 B (Person schema 位置): 确认 EEAT 作者实体锚点的修改路径 (独立块 vs Article.author 嵌套)。
 */
import fs from 'fs';

const PROD_RE = /<p[^>]*>\s*<strong>\s*Q[0-9]*\s*[:：]\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)?\s*A[0-9]*\s*[:：]\s*([\s\S]*?)<\/p>/gi;
const strip = h => String(h).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();

console.log('=== A. foil × 3 依赖确认 (根因分类) ===');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = JSON.parse(fs.readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  const e = d['foil-stamping-3-applications-2026'] || {};
  const c = e.content || '';
  const faqs = [...c.matchAll(PROD_RE)];
  const faqHeading = /<h2[^>]*>[^<]*(FAQ|常見問題|常见问题|よくある|質問)/i.test(c);
  const qMarkers = (c.match(/<strong>\s*Q[0-9]*\s*[:：]/gi) || []).length;
  const qish = (c.match(/<strong>[^<]{4,80}[?？]<\/strong>/g) || []).length;
  let root;
  if (faqs.length >= 1) root = '③ 有可解析 FAQ → 等部署/待线上回归';
  else if (qMarkers > 0 || (faqHeading && qish > 0)) root = '② 有 Q&A 语义但格式不可解析 → 只改包装标签';
  else root = '① 正文无 FAQ 段 → 必须补写正文 (新写内容)';
  console.log(`  ${loc}: 可解析=${faqs.length} | Q标记=${qMarkers} | FAQ标题=${faqHeading} | 疑问句=${qish}`);
  console.log(`    根因: ${root}`);
  console.log(`    JSON 是否有独立 faqs 字段: ${Object.prototype.hasOwnProperty.call(e, 'faqs') ? '有' : '无 (符合设计: 由 extractFaqFromHtml(content) 推导)'}`);
}

console.log('\n=== B. Person schema 生成位置 (决定 EEAT 锚点修改路径) ===');
const page = fs.readFileSync('src/app/[locale]/blog/[slug]/page.tsx', 'utf8');
const lines = page.split('\n');
lines.forEach((l, i) => {
  if (/author\s*[:=]|"@type":\s*"Person"|'@type':\s*'Person'|sameAs|knowsAbout|yearsOfExperience|jobTitle/.test(l)) {
    console.log(`  L${i + 1}: ${l.trim().slice(0, 140)}`);
  }
});
const gen = page.match(/function generateBlogArticleJsonLd[\s\S]{0,1800}/);
if (gen) {
  console.log('\n  --- generateBlogArticleJsonLd 片段 (author/publisher 部分) ---');
  console.log(gen[0].split('\n').filter(l => /author|Person|publisher|sameAs/.test(l)).map(l => '  ' + l.trim()).join('\n'));
}
