// D14 写入 ja.json: 新增 textbook-printing-guide 对象
// 安全方式: 用 child_process 调用 build 脚本捕获 stdout (Node 管道 = UTF-8 纯净)
const fs = require('fs');
const { execSync } = require('child_process');
const path = 'src/data/blog-data/ja.json';

// 从 build 脚本 stdout 拿 content (Node 管道不受 PowerShell 重定向编码污染)
let content;
try {
  content = execSync('node .hermes/build-d14-content.js', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).trim();
  content = JSON.parse(content);
} catch (e) {
  console.error('content 获取失败:', e.message.slice(0, 200));
  process.exit(1);
}

// 读取 ja.json
const ja = JSON.parse(fs.readFileSync(path, 'utf8'));

// 幂等检查
if (ja['textbook-printing-guide']) {
  console.log('⚠️ textbook-printing-guide 已存在, 跳过 (幂等)');
  process.exit(0);
}

ja['textbook-printing-guide'] = {
  slug: 'textbook-printing-guide',
  title: '教科書・教材の印刷製本 100冊から 3製本方式 | ZprintPro',
  description: '教科書・教材の印刷製本ガイド。中綴じ・無線綴じ・上製本の3製本方式、紙材質4種、価格 (100冊からHK$5-50/冊)、納期5-7営業日、年度契約の進め方、ISBN・バーコード対応。学校法人・塾・教材出版社のB2B発注に最適。',
  date: '2026-09-14',
  category: '書籍印刷',
  content,
  lastUpdated: '2026-09-14',
};

// 写回 (2 空格缩进, 无 BOM)
const out = JSON.stringify(ja, null, 2) + '\n';
fs.writeFileSync(path, out, 'utf8');

// 验证
const verify = JSON.parse(fs.readFileSync(path, 'utf8'));
const p = verify['textbook-printing-guide'];
console.log('✅ textbook-printing-guide 写入成功');
console.log('  title:', p.title);
console.log('  content 长度:', p.content.length);
console.log('  总篇数:', Object.keys(verify).length);
const b = fs.readFileSync(path);
console.log('  BOM:', b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF);
console.log('  文件大小:', b.length);
