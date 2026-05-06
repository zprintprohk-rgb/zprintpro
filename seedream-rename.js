/**
 * 批量重命名工具
 * 将手动下载的图片按正确格式重命名
 * 
 * 用法:
 *   方式1: node seedream-rename.js <SKU> <lang>
 *          （自动扫描 Downloads 目录下最近的4个图片文件）
 *   方式2: node seedream-rename.js <SKU> <lang> --source <目录路径>
 *          （指定扫描目录）
 *   方式3: node seedream-rename.js <SKU> <lang> <file1> <file2> <file3> <file4>
 *          （直接指定4个文件路径）
 */

const fs = require('fs');
const path = require('path');

const PROMPTS_FILE = 'seedream-prompts-all-skus.txt';
const TARGET_DIR = path.join(__dirname, 'seedream-downloads');
const DEFAULT_SOURCE_DIR = path.join(process.env.USERPROFILE || 'C:\\Users\\Administrator', 'Downloads');

// 解析提示词文件，获取文件名
function getBaseName(skuId, lang) {
  const content = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const blocks = content.split(/========== /).slice(1);
  for (const block of blocks) {
    const header = block.split('\n')[0].replace(/=+$/, '').trim();
    const [blockSku] = header.split(' | ').map(s => s.trim());
    if (blockSku !== skuId) continue;

    let seoFile = null;
    if (lang === 'zh-hk') seoFile = block.match(/SEO Filename ZH:\s*(.+)/)?.[1]?.trim();
    else if (lang === 'en') seoFile = block.match(/SEO Filename EN:\s*(.+)/)?.[1]?.trim();
    else if (lang === 'ja') seoFile = block.match(/SEO Filename JA:\s*(.+)/)?.[1]?.trim();

    if (seoFile) return seoFile.replace(/\.(jpg|png)$/, '');
  }
  return null;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('用法:');
    console.log('  node seedream-rename.js <SKU> <lang>');
    console.log('    自动扫描 Downloads 目录下最近的4个图片文件');
    console.log('');
    console.log('  node seedream-rename.js <SKU> <lang> --source <目录路径>');
    console.log('    指定扫描目录');
    console.log('');
    console.log('  node seedream-rename.js <SKU> <lang> <file1> <file2> <file3> <file4>');
    console.log('    直接指定4个文件路径');
    console.log('');
    console.log('示例:');
    console.log('  node seedream-rename.js PB-003 zh-hk');
    console.log('  node seedream-rename.js PB-003 en --source "C:\\Users\\Administrator\\Downloads"');
    return;
  }

  const skuId = args[0];
  const lang = args[1];

  // 解析参数
  let sourceDir = DEFAULT_SOURCE_DIR;
  let explicitFiles = [];

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--source' && i + 1 < args.length) {
      sourceDir = args[i + 1];
      i++;
    } else if (!args[i].startsWith('--')) {
      explicitFiles.push(args[i]);
    }
  }

  const baseName = getBaseName(skuId, lang);
  if (!baseName) {
    console.log(`错误: 未找到 ${skuId} [${lang}] 的文件名信息`);
    return;
  }

  console.log(`========================================`);
  console.log(`批量重命名: ${skuId} [${lang}]`);
  console.log(`文件名前缀: ${baseName}`);
  console.log(`========================================\n`);

  let files = [];

  if (explicitFiles.length > 0) {
    files = explicitFiles;
  } else {
    // 自动扫描源目录
    if (!fs.existsSync(sourceDir)) {
      console.log(`错误: 源目录不存在: ${sourceDir}`);
      return;
    }

    const allFiles = fs.readdirSync(sourceDir)
      .map(f => {
        const fullPath = path.join(sourceDir, f);
        try {
          return { name: f, path: fullPath, stat: fs.statSync(fullPath) };
        } catch { return null; }
      })
      .filter(f => f && f.stat.isFile() && /\.(png|jpg|jpeg)$/i.test(f.name))
      .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs)
      .slice(0, 4);

    if (allFiles.length === 0) {
      console.log(`错误: 在 ${sourceDir} 未找到图片文件`);
      return;
    }

    files = allFiles.map(f => f.path);
    console.log(`从 ${sourceDir} 自动找到 ${files.length} 个最近的图片文件:`);
    files.forEach((f, i) => console.log(`  [${i + 1}] ${path.basename(f)}`));
    console.log('');
  }

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  if (files.length < 4) {
    console.log(`警告: 只找到 ${files.length} 个文件\n`);
  }

  let successCount = 0;
  for (let i = 0; i < Math.min(files.length, 4); i++) {
    const src = files[i];
    if (!fs.existsSync(src)) {
      console.log(`  ✗ 跳过: 文件不存在 ${src}`);
      continue;
    }

    const ext = path.extname(src) || '.png';
    const targetName = `${baseName}-${i + 1}${ext}`;
    const dest = path.join(TARGET_DIR, targetName);

    try {
      fs.copyFileSync(src, dest);
      console.log(`  ✓ ${path.basename(src)} -> ${targetName}`);
      successCount++;
    } catch (err) {
      console.log(`  ✗ 失败: ${err.message}`);
    }
  }

  console.log(`\n========================================`);
  console.log(`重命名完成: ${successCount}/4 张`);
  console.log(`保存位置: ${TARGET_DIR}`);
  console.log('========================================');
}

main().catch(console.error);
