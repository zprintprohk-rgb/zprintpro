/**
 * Seedream 5.0 Lite 批量图片生成自动化脚本
 * 
 * 使用方法: node seedream-automation.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// ============ 配置 ============
const PROMPTS_FILE = 'seedream-prompts-all-skus.txt';
const DOWNLOAD_DIR = path.join(__dirname, 'seedream-downloads');
const PROGRESS_FILE = path.join(__dirname, 'seedream-progress.json');
const DOUBAO_URL = 'https://www.doubao.com';
const WAIT_AFTER_SEND = 25000;      // 发送后等待生成的时间(ms)
const WAIT_BETWEEN_TASKS = 8000;    // 任务之间的间隔(ms)

// 确保下载目录存在
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// ============ 解析提示词文件 ============
function parsePrompts(content) {
  const skuBlocks = content.split(/========== /).slice(1);
  const tasks = [];

  for (const block of skuBlocks) {
    const header = block.split('\n')[0].replace(/=+$/, '').trim();
    const [skuId, slug] = header.split(' | ').map(s => s.trim());

    const seoZh = block.match(/SEO Filename ZH:\s*(.+)/)?.[1]?.trim();
    const seoEn = block.match(/SEO Filename EN:\s*(.+)/)?.[1]?.trim();
    const seoJa = block.match(/SEO Filename JA:\s*(.+)/)?.[1]?.trim();

    const zhMatch = block.match(/\[zh-hk\]\n([\s\S]*?)(?=\n\n\[en\])/);
    const enMatch = block.match(/\[en\]\n([\s\S]*?)(?=\n\n\[ja\])/);
    const jaMatch = block.match(/\[ja\]\n([\s\S]*?)(?=\n\n==========|$)/);

    if (zhMatch && seoZh) {
      tasks.push({ skuId, slug, lang: 'zh-hk', filename: seoZh, prompt: zhMatch[1].trim() });
    }
    if (enMatch && seoEn) {
      tasks.push({ skuId, slug, lang: 'en', filename: seoEn, prompt: enMatch[1].trim() });
    }
    if (jaMatch && seoJa) {
      tasks.push({ skuId, slug, lang: 'ja', filename: seoJa, prompt: jaMatch[1].trim() });
    }
  }

  return tasks;
}

// ============ 进度管理 ============
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch { }
  }
  return { completed: [], lastIndex: -1 };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

// ============ 下载图片（使用 Playwright request，继承页面 cookie） ============
async function downloadImage(page, imageUrl, savePath) {
  try {
    const response = await page.request.get(imageUrl);
    if (response.ok()) {
      const buffer = await response.body();
      fs.writeFileSync(savePath, buffer);
      return true;
    } else {
      console.log('  下载失败, HTTP状态:', response.status());
      return false;
    }
  } catch (err) {
    console.log('  下载异常:', err.message);
    return false;
  }
}

// ============ 备用：通过页面截图获取高清图 ============
async function screenshotImage(page, task) {
  const savePath = path.join(DOWNLOAD_DIR, task.filename);
  try {
    // 找到最新生成的大图元素
    const imgEl = await page.$('img[src*="byteimg"], img[src*="doubao"], .message img');
    if (!imgEl) return false;
    
    // 滚动到图片位置
    await imgEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    
    // 截取图片元素
    await imgEl.screenshot({ path: savePath, type: 'png' });
    
    const stat = fs.statSync(savePath);
    if (stat.size > 500000) {
      console.log('  截图保存成功:', (stat.size/1024/1024).toFixed(2), 'MB');
      return true;
    }
    return false;
  } catch (err) {
    console.log('  截图失败:', err.message);
    return false;
  }
}

// ============ 关闭可能的弹窗 ============
async function closeModal(page) {
  try {
    // 尝试按 Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // 尝试点击常见的关闭按钮
    const closeSelectors = [
      'button[class*="close"]',
      'button[class*="dismiss"]',
      '[class*="modal"] button',
      'svg[class*="close"]',
      'div[class*="modal"] > div > div:first-child svg',
    ];
    for (const sel of closeSelectors) {
      const btn = await page.$(sel);
      if (btn && await btn.isVisible()) {
        await btn.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(300);
      }
    }
  } catch { }
}

// ============ 主函数 ============
async function main() {
  const content = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const allTasks = parsePrompts(content);
  const progress = loadProgress();

  // 过滤已完成的任务
  const tasks = allTasks.filter((t, i) => i > progress.lastIndex);

  console.log(`============================================`);
  console.log(`Seedream 5.0 Lite 批量图片生成工具`);
  console.log(`============================================`);
  console.log(`总任务数: ${allTasks.length} (${allTasks.length / 3} SKU x 3语言)`);
  console.log(`已完成: ${progress.completed.length}`);
  console.log(`待处理: ${tasks.length}`);
  console.log(`下载目录: ${DOWNLOAD_DIR}`);
  console.log(`============================================\n`);

  if (tasks.length === 0) {
    console.log('所有任务已完成！');
    return;
  }

  console.log('启动浏览器...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 30,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.0',
  });

  // 隐藏自动化特征
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
  });

  const page = await context.newPage();

  console.log('正在打开豆包 (doubao.com)...');
  await page.goto(DOUBAO_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  console.log('\n========================================');
  console.log('请手动完成以下操作：');
  console.log('1. 登录豆包账号（如未登录）');
  console.log('2. 进入「图像生成」或 Seedream 5.0 Lite 界面');
  console.log('3. 关闭页面上任何弹窗/提示');
  console.log('4. 确认生成参数（比例1:1）');
  console.log('========================================\n');

  await countdown(60);

  // 尝试关闭可能的弹窗
  await closeModal(page);

  // 开始自动处理
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const globalIndex = allTasks.indexOf(task);

    console.log(`\n----------------------------------------`);
    console.log(`[${globalIndex + 1}/${allTasks.length}] ${task.skuId} [${task.lang}]`);
    console.log(`文件名: ${task.filename}`);
    console.log(`提示词: ${task.prompt.substring(0, 60)}...`);
    console.log(`----------------------------------------`);

    try {
      // 先关闭可能的弹窗
      await closeModal(page);

      // 找到输入框
      const inputBox = await findInputBox(page);

      if (!inputBox) {
        console.log('  [错误] 未找到输入框，3秒后重试...');
        await page.waitForTimeout(3000);
        // 重试一次
        const inputBoxRetry = await findInputBox(page);
        if (!inputBoxRetry) {
          console.log('  [跳过] 仍未找到输入框，跳过此任务');
          continue;
        }
      }

      const finalInputBox = inputBox || await findInputBox(page);

      // 清空并输入提示词
      await finalInputBox.click();
      await finalInputBox.fill('');
      await page.waitForTimeout(200);
      await finalInputBox.fill(task.prompt);
      await page.waitForTimeout(500);

      // 尝试发送
      const sent = await trySend(page, finalInputBox);
      if (!sent) {
        console.log('  [警告] 未能自动发送，尝试回车发送...');
        await finalInputBox.press('Enter');
      }

      console.log('  已发送，等待生成...');
      await page.waitForTimeout(WAIT_AFTER_SEND);

      // 尝试关闭生成后可能出现的弹窗
      await closeModal(page);

      // 尝试获取并保存图片（三层策略）
      let saved = await trySaveImage(page, task);
      
      if (!saved) {
        console.log('  [失败] 原图下载失败，尝试点击保存按钮...');
        saved = await trySaveImageFallback(page, task);
      }
      
      if (!saved) {
        console.log('  [失败] 点击保存失败，尝试截图方式...');
        saved = await screenshotImage(page, task);
      }
      
      if (saved) {
        console.log('  [成功] 图片已保存');
        progress.completed.push({ index: globalIndex, filename: task.filename, time: new Date().toISOString() });
        progress.lastIndex = globalIndex;
        saveProgress(progress);
      } else {
        console.log('  [跳过] 所有保存方式均失败，记录到日志稍后手动处理');
        fs.appendFileSync('seedream-failed.txt', `${task.filename}\t${task.prompt.substring(0,80)}...\n`, 'utf8');
      }

      // 任务间隔
      if (i < tasks.length - 1) {
        console.log(`  等待 ${WAIT_BETWEEN_TASKS / 1000} 秒后继续...`);
        await page.waitForTimeout(WAIT_BETWEEN_TASKS);
      }

    } catch (err) {
      console.error(`  [异常] ${err.message.substring(0, 120)}`);
      // 记录失败任务
      fs.appendFileSync('seedream-failed.txt', `${task.filename}\tERROR: ${err.message.substring(0,80)}\n`, 'utf8');
      await page.waitForTimeout(5000);
    }
  }

  console.log('\n========================================');
  console.log('所有任务处理完成！');
  console.log(`成功: ${progress.completed.length} / ${allTasks.length}`);
  console.log(`下载目录: ${DOWNLOAD_DIR}`);
  if (fs.existsSync('seedream-failed.txt')) {
    console.log('失败记录: seedream-failed.txt');
  }
  console.log('========================================');

  await browser.close();
}

// ============ 辅助函数：查找输入框 ============
async function findInputBox(page) {
  const selectors = [
    'textarea[class*="input"]',
    'textarea[placeholder*="输入"]',
    'textarea[placeholder*="消息"]',
    'textarea',
    'div[contenteditable="true"]',
    'div[contenteditable]',
    '[class*="chat"] textarea',
    '[class*="editor"]',
    '[class*="sendbox"] textarea',
    '#chat-input',
    '[data-testid*="input"]',
  ];

  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el && await el.isVisible()) {
        return el;
      }
    } catch { }
  }

  const xpathEls = await page.$$('xpath=//textarea | //div[@contenteditable="true"]');
  for (const el of xpathEls) {
    if (await el.isVisible()) return el;
  }

  return null;
}

// ============ 辅助函数：尝试发送 ============
async function trySend(page, inputBox) {
  const buttonSelectors = [
    'button:has-text("发送")',
    'button:has(svg)',
    'button[type="submit"]',
    '[class*="send"]:not([class*="sending"])',
    '[class*="submit"]',
    'button[class*="primary"]',
  ];

  for (const sel of buttonSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn && await btn.isVisible() && await btn.isEnabled()) {
        const box = await btn.boundingBox();
        if (box && box.width > 20 && box.height > 20) {
          await btn.click();
          return true;
        }
      }
    } catch { }
  }

  try {
    await inputBox.press('Enter');
    return true;
  } catch { }

  try {
    await inputBox.press('Control+Enter');
    return true;
  } catch { }

  return false;
}

// ============ 辅助函数：尝试保存图片（主方式） ============
async function trySaveImage(page, task) {
  const savePath = path.join(DOWNLOAD_DIR, task.filename);

  // 策略：在页面上下文中查找所有图片，获取最大尺寸的原图URL
  const imageUrl = await page.evaluate(() => {
    const candidates = [];
    const imgs = document.querySelectorAll('img');
    
    for (const img of imgs) {
      // 尝试多个可能的属性获取原图URL
      let url = img.getAttribute('data-src') || 
                img.getAttribute('data-original') || 
                img.getAttribute('src');
      
      if (!url || !url.startsWith('http')) continue;
      
      // 去掉字节跳动图片处理参数，获取原图
      // 例如: xxx.jpeg~tplv-a9rns2rl98-image.webp → xxx.jpeg
      const originalUrl = url.replace(/~tplv-[^/]+(?:\.[^/]+)?$/, '');
      
      const naturalWidth = img.naturalWidth || 0;
      const naturalHeight = img.naturalHeight || 0;
      
      candidates.push({
        url: originalUrl,
        width: naturalWidth,
        height: naturalHeight,
      });
    }
    
    // 优先选择尺寸最大的图片
    candidates.sort((a, b) => (b.width * b.height) - (a.width * a.height));
    return candidates.length > 0 ? candidates[0].url : null;
  });

  if (imageUrl) {
    console.log('  找到原图URL:', imageUrl.substring(0, 80) + '...');
    const ok = await downloadImage(page, imageUrl, savePath);
    if (ok) {
      // 验证下载的文件大小
      const stat = fs.statSync(savePath);
      if (stat.size > 500000) {
        console.log('  文件大小:', (stat.size/1024/1024).toFixed(2), 'MB');
        return true;
      } else {
        console.log('  文件太小(' + (stat.size/1024).toFixed(0) + 'KB)，可能是缩略图，尝试备用方式...');
        fs.unlinkSync(savePath);
      }
    }
  }

  return false;
}

// ============ 备用保存方式：点击保存按钮监听下载 ============
async function trySaveImageFallback(page, task) {
  const savePath = path.join(DOWNLOAD_DIR, task.filename);

  const saveButtonSelectors = [
    'button:has-text("保存")',
    'button:has-text("下载")',
    'a:has-text("保存")',
    '[class*="download"]',
    '[class*="save"]',
    'button svg[viewBox]',
  ];

  for (const sel of saveButtonSelectors) {
    try {
      const btn = await page.$(sel);
      if (btn && await btn.isVisible()) {
        const [download] = await Promise.all([
          page.waitForEvent('download', { timeout: 15000 }).catch(() => null),
          btn.click(),
        ]);

        if (download) {
          await download.saveAs(savePath);
          return true;
        }
      }
    } catch { }
  }

  return false;
}

// ============ 倒计时 ============
function countdown(seconds) {
  return new Promise((resolve) => {
    let remaining = seconds;
    console.log(`>>> ${remaining} 秒后开始自动执行...`);
    const timer = setInterval(() => {
      remaining -= 5;
      if (remaining > 0) {
        process.stdout.write(`\r>>> 还剩 ${remaining} 秒... `);
      } else {
        clearInterval(timer);
        console.log('\n>>> 开始自动处理！');
        resolve();
      }
    }, 5000);
  });
}

main().catch(err => {
  console.error('脚本异常退出:', err);
  process.exit(1);
});
