/**
 * Seedream 5.0 Lite 批量图片生成 V3
 * 改进: 持久化浏览器 + 更强anti-detection + 页面保活
 * 用法: node seedream-batch-v3.js [起始SKU如PB-001]
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROMPTS_FILE = 'seedream-prompts-all-skus.txt';
const DOWNLOAD_DIR = path.join(__dirname, 'seedream-downloads');
const PROGRESS_FILE = path.join(__dirname, 'seedream-progress-v3.json');
const USER_DATA_DIR = path.join(__dirname, 'playwright-user-data');
const DOUBAO_URL = 'https://www.doubao.com';
const WAIT_AFTER_SEND = 120000;      // 发送后等待2分钟
const WAIT_BETWEEN_TASKS = 90000;    // 任务间隔90秒
const CLEAR_WAIT = 8000;  // 点击后等待大图加载

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// ============ 解析提示词 ============

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
    if (zhMatch && seoZh) tasks.push({ skuId, slug, lang: 'zh-hk', baseName: seoZh.replace(/\.(jpg|png)$/, ''), prompt: zhMatch[1].trim() });
    if (enMatch && seoEn) tasks.push({ skuId, slug, lang: 'en', baseName: seoEn.replace(/\.(jpg|png)$/, ''), prompt: enMatch[1].trim() });
    if (jaMatch && seoJa) tasks.push({ skuId, slug, lang: 'ja', baseName: seoJa.replace(/\.(jpg|png)$/, ''), prompt: jaMatch[1].trim() });
  }
  return tasks;
}

function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); } catch {}
  }
  return { completed: [], lastIndex: -1 };
}

function saveProgress(p) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(p, null, 2), 'utf8');
}

// ============ 查找缩略图 ============

async function findThumbnails(page) {
  const selectors = [
    'img[src*="byteimg"]', 'img[src*="doubao"]', 'img[src*="gen_image"]',
    '[class*="thumb"] img', '[class*="gallery"] img', '[class*="side"] img',
    '[class*="preview"] img', '[class*="image-list"] img',
  ];

  let allThumbs = [];
  for (const sel of selectors) {
    try {
      const imgs = await page.$$(sel);
      for (const img of imgs) {
        if (await img.isVisible()) {
          const box = await img.boundingBox();
          if (box && box.width > 40 && box.width < 250 && box.height > 40 && box.height < 250) {
            const src = await img.evaluate(el => el.src);
            if (!allThumbs.some(t => t.src === src)) {
              allThumbs.push({ el: img, src, box });
            }
          }
        }
      }
    } catch {}
  }

  if (allThumbs.length < 4) {
    try {
      const allImgs = await page.$$('img');
      for (const img of allImgs) {
        if (await img.isVisible()) {
          const box = await img.boundingBox();
          const src = await img.evaluate(el => el.src);
          if (box && box.width > 50 && box.width < 220 && box.height > 50 && box.height < 220
              && src && (src.includes('http') || src.includes('base64'))
              && !allThumbs.some(t => t.src === src)) {
            allThumbs.push({ el: img, src, box });
          }
        }
      }
    } catch {}
  }

  allThumbs.sort((a, b) => a.box.x - b.box.x);
  return allThumbs;
}

// ============ 悬停下载 ============

async function downloadViaHoverButton(page, targetPath) {
  return new Promise(async (resolve) => {
    let handled = false;
    let timeoutId;

    const cleanup = () => {
      if (timeoutId) clearTimeout(timeoutId);
      try { page.removeListener('download', onDownload); } catch {}
    };

    const onDownload = async (download) => {
      if (handled) return;
      handled = true;
      cleanup();
      try {
        await download.saveAs(targetPath);
        const stats = fs.statSync(targetPath);
        resolve({ success: true, size: stats.size });
      } catch (err) {
        resolve({ success: false, error: err.message });
      }
    };

    page.on('download', onDownload);
    timeoutId = setTimeout(() => {
      if (!handled) {
        handled = true;
        cleanup();
        resolve({ success: false, error: '下载超时(30s)' });
      }
    }, 30000);

    try {
      const mainImg = await page.evaluateHandle(() => {
        const imgs = document.querySelectorAll('img');
        let best = null, bestArea = 0;
        for (const img of imgs) {
          const rect = img.getBoundingClientRect();
          const area = rect.width * rect.height;
          if (rect.width > 300 && rect.height > 300 && area > bestArea) {
            bestArea = area;
            best = img;
          }
        }
        return best;
      });

      const imgEl = await mainImg.asElement();
      if (!imgEl) {
        cleanup();
        resolve({ success: false, error: '未找到大图' });
        return;
      }

      await imgEl.scrollIntoViewIfNeeded({ timeout: 5000 });
      await imgEl.hover({ timeout: 5000 });
      await page.waitForTimeout(1000);

      const downloadBtn = await page.evaluateHandle(() => {
        const allBtns = document.querySelectorAll('button, [role="button"]');
        const candidates = [];
        for (const btn of allBtns) {
          const text = (btn.textContent || '').trim();
          const aria = btn.getAttribute('aria-label') || '';
          const title = btn.getAttribute('title') || '';
          const rect = btn.getBoundingClientRect();
          if (rect.width < 10 || rect.height < 10) continue;
          if (/下载|download|保存|save/i.test(text + aria + title)) {
            candidates.push({ btn, x: rect.x, score: 10 });
            continue;
          }
          const svg = btn.querySelector('svg');
          if (svg) {
            const html = svg.outerHTML || '';
            if (/download|arrow.*down|保存|向下/i.test(html)) {
              candidates.push({ btn, x: rect.x, score: 5 });
            }
          }
        }
        if (candidates.length > 0) {
          candidates.sort((a, b) => b.x - a.x);
          return candidates[0].btn;
        }
        const bars = document.querySelectorAll('[class*="action"], [class*="toolbar"], [class*="tool"]');
        for (const bar of bars) {
          const btns = bar.querySelectorAll('button, [role="button"]');
          if (btns.length >= 2) {
            for (let i = btns.length - 1; i >= 0; i--) {
              const r = btns[i].getBoundingClientRect();
              if (r.width > 15 && r.height > 15) return btns[i];
            }
          }
        }
        return null;
      });

      const btnEl = await downloadBtn.asElement();
      if (btnEl) {
        await btnEl.click({ timeout: 5000 });
      } else {
        await imgEl.click({ button: 'right' });
        await page.waitForTimeout(600);
        const menuItem = await page.$('text=/下载|保存|download/i');
        if (menuItem) await menuItem.click();
        else {
          cleanup();
          resolve({ success: false, error: '未找到下载按钮' });
          return;
        }
      }
    } catch (err) {
      if (!handled) {
        handled = true;
        cleanup();
        resolve({ success: false, error: err.message });
      }
    }
  });
}

// ============ 检查大图清晰 ============

async function waitForClearImage(page, maxWaitMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    try {
      const info = await page.evaluate(() => {
        const imgs = document.querySelectorAll('img');
        let best = null, bestArea = 0;
        for (const img of imgs) {
          const rect = img.getBoundingClientRect();
          const area = rect.width * rect.height;
          if (rect.width > 300 && rect.height > 300 && area > bestArea) {
            bestArea = area;
            best = img;
          }
        }
        if (!best) return { ok: false, w: 0, h: 0 };
        return {
          ok: (best.naturalWidth >= 1024 && best.naturalHeight >= 1024),
          w: best.naturalWidth,
          h: best.naturalHeight,
          src: best.src?.substring(0, 60)
        };
      });
      if (info.ok) return info;
    } catch {}
    await page.waitForTimeout(800);
  }
  return { ok: false, w: 0, h: 0 };
}

// ============ 查找输入框 ============

async function findInputBox(page) {
  const selectors = [
    'textarea[class*="input"]', 'textarea[placeholder*="输入"]',
    'textarea[placeholder*="消息"]', 'textarea', 'div[contenteditable="true"]',
    'div[contenteditable]', '[class*="chat"] textarea', '[class*="editor"]',
    '[class*="sendbox"] textarea', '#chat-input', '[data-testid*="input"]',
  ];
  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el && await el.isVisible()) return el;
    } catch {}
  }
  const xpathEls = await page.$$('xpath=//textarea | //div[@contenteditable="true"]');
  for (const el of xpathEls) {
    if (await el.isVisible()) return el;
  }
  return null;
}

// ============ 尝试发送 ============

async function trySend(page, inputBox) {
  const buttonSelectors = [
    'button:has-text("发送")', 'button:has(svg)', 'button[type="submit"]',
    '[class*="send"]:not([class*="sending"])', '[class*="submit"]', 'button[class*="primary"]',
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
    } catch {}
  }
  try { await inputBox.press('Enter'); return true; } catch {}
  try { await inputBox.press('Control+Enter'); return true; } catch {}
  return false;
}

// ============ 关闭弹窗 ============

async function closeModal(page) {
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  } catch {}
}

// ============ 页面保活（定期滚动） ============

async function keepAlive(page) {
  try {
    await page.evaluate(() => {
      window.scrollBy(0, 10);
      setTimeout(() => window.scrollBy(0, -10), 500);
    });
  } catch {}
}

// ============ 倒计时 ============

function countdown(seconds) {
  return new Promise(resolve => {
    let remaining = seconds;
    console.log(`>>> ${remaining}秒倒计时...`);
    const timer = setInterval(() => {
      remaining -= 10;
      if (remaining > 0) {
        if (remaining % 30 === 0) console.log(`>>> 还剩 ${remaining}秒`);
      } else {
        clearInterval(timer);
        console.log('>>> 开始！');
        resolve();
      }
    }, 10000);
  });
}

// ============ 主函数 ============

async function main() {
  const startSku = process.argv[2] || 'PB-001';
  const content = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const allTasks = parsePrompts(content);
  const progress = loadProgress();

  const startIndex = allTasks.findIndex(t => t.skuId === startSku);
  const currentIndex = Math.max(startIndex, progress.lastIndex + 1);

  console.log('========================================');
  console.log('Seedream 5.0 Lite 批量图片生成 V3');
  console.log('改进: 持久化浏览器 + 更强anti-detection');
  console.log('========================================');
  console.log('总任务:', allTasks.length);
  console.log('起始SKU:', startSku);
  console.log('当前位置:', currentIndex + 1);
  console.log('下载目录:', DOWNLOAD_DIR);
  console.log('========================================\n');

  if (currentIndex >= allTasks.length) {
    console.log('所有任务已完成！');
    return;
  }

  // 使用持久化浏览器上下文（保存cookies，更像真实用户）
  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    slowMo: 100,
    channel: 'chrome',
    viewport: { width: 1920, height: 1080 },
    acceptDownloads: true,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  });

  // 更强anti-detection
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    Object.defineProperty(navigator, 'languages', { get: () => ['zh-CN', 'zh', 'en-US', 'en'] });
  });

  // 获取或创建页面
  let page = context.pages()[0];
  if (!page) {
    page = await context.newPage();
  }

  console.log('正在打开豆包...');
  await page.goto(DOUBAO_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  console.log('\n========================================');
  console.log('请手动完成（5分钟）：');
  console.log('1. 登录豆包');
  console.log('2. 进入「图像生成 / Seedream 5.0 Lite」');
  console.log('3. 确认比例为 1:1');
  console.log('========================================\n');

  await countdown(300);
  await closeModal(page);

  // 主循环
  for (let i = currentIndex; i < allTasks.length; i++) {
    const task = allTasks[i];

    console.log(`\n----------------------------------------`);
    console.log(`[${i + 1}/${allTasks.length}] ${task.skuId} [${task.lang}]`);
    console.log(`提示词: ${task.prompt.substring(0, 60)}...`);
    console.log(`----------------------------------------`);

    try {
      await closeModal(page);
      await keepAlive(page);

      // 找输入框
      const inputBox = await findInputBox(page);
      if (!inputBox) {
        console.log('  [错误] 未找到输入框，跳过');
        continue;
      }

      // 彻底清空输入框
      await inputBox.click();
      await page.waitForTimeout(200);
      await inputBox.press('Control+a');
      await page.waitForTimeout(100);
      await inputBox.press('Delete');
      await page.waitForTimeout(200);
      await inputBox.press('Control+a');
      await inputBox.press('Backspace');
      await page.waitForTimeout(200);
      await inputBox.fill(task.prompt);
      await page.waitForTimeout(500);

      const sent = await trySend(page, inputBox);
      if (!sent) {
        console.log('  [警告] 发送失败，尝试回车');
        await inputBox.press('Enter');
      }

      console.log('  已发送，等待生成...');
      
      // 等待期间定期保活
      for (let t = 0; t < WAIT_AFTER_SEND; t += 30000) {
        await page.waitForTimeout(30000);
        await keepAlive(page);
      }
      
      await closeModal(page);

      // 查找缩略图
      let thumbs = [];
      for (let attempt = 1; attempt <= 5; attempt++) {
        console.log(`  查找缩略图... (尝试 ${attempt}/5)`);
        thumbs = await findThumbnails(page);
        if (thumbs.length >= 4) {
          console.log(`  ✓ 找到 ${thumbs.length} 张缩略图`);
          break;
        }
        console.log(`  找到 ${thumbs.length} 张，再等 20 秒...`);
        await page.waitForTimeout(20000);
        await closeModal(page);
        await keepAlive(page);
      }

      if (thumbs.length === 0) {
        console.log('  [错误] 始终未找到图片，跳过');
        continue;
      }

      const totalImages = Math.min(thumbs.length, 4);

      // 逐张下载
      let savedCount = 0;
      for (let imgIdx = 0; imgIdx < totalImages; imgIdx++) {
        const targetName = `${task.baseName}-${imgIdx + 1}.png`;
        const savePath = path.join(DOWNLOAD_DIR, targetName);

        console.log(`\n    [${imgIdx + 1}/${totalImages}] 处理第 ${imgIdx + 1} 张 → ${targetName}`);

        try {
          // 重新查找缩略图
          const freshThumbs = await findThumbnails(page);
          if (freshThumbs.length <= imgIdx) {
            console.log(`      ⚠ 重新查找后只有 ${freshThumbs.length} 张，跳过`);
            continue;
          }

          // 坐标点击
          const box = await freshThumbs[imgIdx].el.boundingBox();
          if (box) {
            await freshThumbs[imgIdx].el.scrollIntoViewIfNeeded({ timeout: 5000 });
            await page.waitForTimeout(300);
            await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          }
          await page.waitForTimeout(CLEAR_WAIT);
          await page.waitForTimeout(3000); // 额外等待大图渲染

          // 等待大图清晰
          const clearInfo = await waitForClearImage(page, 10000);
          if (clearInfo.ok) {
            console.log(`      ✓ 大图清晰 (${clearInfo.w}×${clearInfo.h})`);
          }

          // 悬停下载
          const result = await downloadViaHoverButton(page, savePath);
          if (result.success && result.size > 100000) {
            const sizeMB = (result.size / 1024 / 1024).toFixed(2);
            console.log(`      ✓ 已保存 ${targetName} (${sizeMB} MB)`);
            savedCount++;
          } else {
            console.log(`      ✗ 下载失败: ${result.error || '文件太小'}`);
          }
        } catch (err) {
          console.log(`      ✗ 异常: ${err.message.substring(0, 80)}`);
        }

        await page.waitForTimeout(5000);
        await keepAlive(page);
      }

      // 保存进度
      progress.lastIndex = i;
      progress.completed.push({ index: i, skuId: task.skuId, lang: task.lang, saved: savedCount });
      saveProgress(progress);

      console.log(`\n  本任务完成: ${savedCount}/${totalImages} 张`);

      if (i < allTasks.length - 1) {
        console.log(`  等待 ${WAIT_BETWEEN_TASKS / 1000} 秒后继续...`);
        for (let t = 0; t < WAIT_BETWEEN_TASKS; t += 30000) {
          await page.waitForTimeout(30000);
          await keepAlive(page);
        }
      }

    } catch (err) {
      console.error(`  [异常] ${err.message.substring(0, 100)}`);
      await page.waitForTimeout(10000);
      await keepAlive(page);
    }
  }

  console.log('\n========================================');
  console.log('任务完成！');
  console.log(`成功: ${progress.completed.length} / ${allTasks.length}`);
  console.log('========================================');

  // 不关闭浏览器
  console.log('\n浏览器保持打开。按 Ctrl+C 退出脚本。');
}

main().catch(err => {
  console.error('脚本异常:', err);
  process.exit(1);
});
