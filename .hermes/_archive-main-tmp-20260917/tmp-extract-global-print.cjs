// 提取 全球印刷资讯 关键文件纯文本 (去 HTML 标签)
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\全球印刷资讯';
const OUT = '.hermes\\global-print-insights';
fs.mkdirSync(OUT, { recursive: true });

function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h1>/gi, '\n\n# ')
    .replace(/<\/h2>/gi, '\n\n## ')
    .replace(/<\/h3>/gi, '\n\n### ')
    .replace(/<\/h4>/gi, '\n\n#### ')
    .replace(/<\/li>/gi, '\n- ')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>|<\/th>/gi, ' | ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const targets = [
  // 海外版核心
  ['DELIVERY\\小批量获客系统-海外版\\00-总览.html', '00-总览.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\01-客户地图.html', '01-客户地图.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\02-渠道清单.html', '02-渠道清单.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\03-执行手册.html', '03-执行手册.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\04-话术脚本包.html', '04-话术脚本包.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\05-内容获客方案.html', '05-内容获客方案.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\06-合规与频控.html', '06-合规与频控.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\07-需求分析报告.html', '07-需求分析报告.txt'],
  ['DELIVERY\\小批量获客系统-海外版\\08-复盘与资源分配.html', '08-复盘与资源分配.txt'],
  // 国内版 (对照)
  ['DELIVERY\\小批量获客系统\\00-总览.html', 'cn-00-总览.txt'],
  ['DELIVERY\\小批量获客系统\\01-客户地图.html', 'cn-01-客户地图.txt'],
  ['DELIVERY\\小批量获客系统\\07-需求分析报告.html', 'cn-07-需求分析报告.txt'],
  // 参考资料
  ['DELIVERY\\小批量获客系统\\参考资料\\教育出版客户地图补扫.md', '参考资料-教育出版客户地图补扫.txt'],
  // memory
  ['memory\\2026-09-16.md', 'memory-2026-09-16.txt'],
  // system readme + docs
  ['print-demand-system\\readme.md', 'system-readme.txt'],
  ['print-demand-system\\docs\\sop.md', 'system-sop.txt'],
  ['print-demand-system\\docs\\compliance.md', 'system-compliance.txt'],
  // reports
  ['print-demand-system\\reports\\daily\\latest.md', 'report-latest.txt'],
  ['print-demand-system\\logs\\drill_report.md', 'log-drill-report.txt'],
];

for (const [src, dst] of targets) {
  const p = path.join(ROOT, src);
  try {
    const raw = fs.readFileSync(p, 'utf8');
    const txt = htmlToText(raw);
    fs.writeFileSync(path.join(OUT, dst), txt, 'utf8');
    console.log(`✅ ${dst} (${(txt.length/1024).toFixed(1)}KB)`);
  } catch (e) {
    console.log(`❌ ${src}: ${e.message.slice(0, 50)}`);
  }
}

// 复制 CSV 和 keywords.json
for (const [src, dst] of [
  ['DELIVERY\\小批量获客系统-海外版\\02-渠道条目总表.csv', '02-渠道条目总表.csv'],
  ['DELIVERY\\小批量获客系统-海外版\\10-线索明细.csv', '10-线索明细.csv'],
  ['print-demand-system\\config\\keywords.json', 'system-keywords.json'],
  ['print-demand-system\\config\\sources.json', 'system-sources.json'],
]) {
  const p = path.join(ROOT, src);
  try {
    const raw = fs.readFileSync(p, 'utf8');
    fs.writeFileSync(path.join(OUT, dst), raw, 'utf8');
    console.log(`✅ ${dst} (${(raw.length/1024).toFixed(1)}KB)`);
  } catch (e) { console.log(`❌ ${src}: ${e.message.slice(0,50)}`); }
}
