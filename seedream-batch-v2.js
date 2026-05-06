/**
 * Seedream 5.0 Lite 批量图片生成 V2
 * 流程：生成完成 → 顺序点击4张缩略图预加载 → 逐张确认清晰后悬停下载
 * 用法: node seedream-batch-v2.js [起始SKU如PB-001]
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROMPTS_FILE = 'seedream-prompts-all-skus.txt';
const DOWNLOAD_DIR = path.join(__dirname, 'seedream-downloads');
const PROGRESS_FILE = path.join(__dirname, 'seedream-progress-v2.json');
const DOUBAO_URL = 'https://www.doubao.com';
const WAIT_AFTER_SEND = 90000;      // 发送后等待生成的初始时间(ms) - 增加避免验证
const WAIT_BETWEEN_TASKS = 60000;   // 任务间隔(ms) - 增加避免验证
const PRELOAD_WAIT = 5000;          // 点击缩略图预加载后等待(ms)
const CLEAR_WAIT = 3000;            // 切换图片后等待清晰(ms)

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

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

async function closeModal(page) {
  try {
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
  } catch {}
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

  // 兜底：遍历所有可见 img
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

  // 按位置从左到右排序
  allThumbs.sort((a, b) => a.box.x - b.box.x);
  return allThumbs;
}

// ============ 核心：悬停大图，点击下载按钮 ============

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
      // 1. 找当前大图
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

      // 2. 悬停大图，等操作按钮出现
      await imgEl.scrollIntoViewIfNeeded({ timeout: 10000 });
      await imgEl.hover({ timeout: 10000 });
      await page.waitForTimeout(1000);

      // 3. 找下载按钮（最右边的那个）
      const downloadBtn = await page.evaluateHandle(() => {
        // 先尝试找 aria-label/title/text 包含"下载"的按钮
        const allBtns = document.querySelectorAll('button, [role="button"]');
        const candidates = [];
        for (const btn of allBtns) {
          const text = (btn.textContent || '').trim();
          const aria = btn.getAttribute('aria-label') || '';
          const title = btn.getAttribute('title') || '';
          const rect = btn.getBoundingClientRect();
          if (rect.width < 10 || rect.height < 10) continue;

          // 下载相关
          if (/下载|download|保存|save/i.test(text + aria + title)) {
            candidates.push({ btn, x: rect.x, score: 10 });
            continue;
          }
          // 检查 svg 图标
          const svg = btn.querySelector('svg');
          if (svg) {
            const html = svg.outerHTML || '';
            if (/download|arrow.*down|保存|向下/i.test(html)) {
              candidates.push({ btn, x: rect.x, score: 5 });
            }
          }
        }

        if (candidates.length > 0) {
          // 按 x 坐标排序，取最右边的（x 最大）
          candidates.sort((a, b) => b.x - a.x);
          return candidates[0].btn;
        }

        // 兜底：找操作栏中最后一个可见按钮
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
        await btnEl.click({ timeout: 10000 });
      } else {
        // 备用：右键 → 找下载
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

      // 4. 等 download 事件触发（由 onDownload 处理）
    } catch (err) {
      if (!handled) {
        handled = true;
        cleanup();
        resolve({ success: false, error: err.message });
      }
    }
  });
}

// ============ 检查大图是否清晰（自然尺寸足够大） ============

async function waitForClearImage(page, maxWaitMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
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
    await page.waitForTimeout(800);
  }
  return { ok: false, w: 0, h: 0 };
}

// ============ 备用下载：直接 fetch 大图URL ============

async function fallbackDownload(page, savePath) {
  try {
    const bigUrl = await page.evaluate(() => {
      const imgs = document.querySelectorAll('img');
      for (const img of imgs) {
        if (img.naturalWidth >= 1024 && img.naturalHeight >= 1024) {
          return img.getAttribute('data-src') || img.getAttribute('data-original') || img.src;
        }
      }
      return null;
    });

    if (!bigUrl) return false;
    const cleanUrl = bigUrl.replace(/~tplv-[^/]+(?:\.[^/]+)?$/, '').replace(/\?.*$/, '');

    const result = await page.evaluate(async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return { success: false };
        const blob = await res.blob();
        const ab = await blob.arrayBuffer();
        return { success: true, data: Array.from(new Uint8Array(ab)), size: blob.size };
      } catch { return { success: false }; }
    }, cleanUrl);

    if (result.success && result.size > 100000) {
      fs.writeFileSync(savePath, Buffer.from(result.data));
      return true;
    }
  } catch {}
  return false;
}

// ============ 主流程 ============

async function main() {
  const startSku = process.argv[2] || 'PB-001';
  const content = fs.readFileSync(PROMPTS_FILE, 'utf8');
  const allTasks = parsePrompts(content);
  const progress = loadProgress();

  const startIndex = allTasks.findIndex(t => t.skuId === startSku);
  const tasks = allTasks.filter((t, i) => i >= startIndex && i > progress.lastIndex);

  console.log('========================================');
  console.log('Seedream 5.0 Lite 批量图片生成 V2');
  console.log('流程：生成 → 顺序点击4张预加载 → 逐张确认清晰 → 悬停下载');
  console.log('========================================');
  console.log('起始SKU:', startSku);
  console.log('总任务:', allTasks.length);
  console.log('待处理:', tasks.length);
  console.log('下载目录:', DOWNLOAD_DIR);
  console.log('========================================\n');

  if (tasks.length === 0) {
    console.log('所有任务已完成！');
    return;
  }

  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
    channel: 'chrome',
    args: ['--disable-blink-features=AutomationControlled'],
  });

  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1920, height: 1080 },
  });

  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    window.chrome = { runtime: {} };
  });

  const page = await context.newPage();

  console.log('正在打开豆包...');
  await page.goto(DOUBAO_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);

  console.log('\n========================================');
  console.log('请手动完成（你有 5 分钟）：');
  console.log('1. 登录豆包');
  console.log('2. 进入「图像生成 / Seedream 5.0 Lite」');
  console.log('3. 确认比例为 1:1');
  console.log('========================================\n');

  // 等待用户登录完成（通过文件触发或长时间等待）
  console.log('\n>>> 浏览器已打开，请完成登录和设置');
  console.log('>>> 完成后告诉我，脚本会自动继续');
  console.log('>>> 浏览器窗口保持打开，不要关闭！\n');
  await waitForReady();
  await closeModal(page);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const globalIndex = allTasks.indexOf(task);

    console.log(`\n----------------------------------------`);
    console.log(`[${globalIndex + 1}/${allTasks.length}] ${task.skuId} [${task.lang}]`);
    console.log(`提示词: ${task.prompt.substring(0, 60)}...`);
    console.log(`----------------------------------------`);

    try {
      await closeModal(page);

      // 找输入框并发送
      const inputBox = await findInputBox(page);
      if (!inputBox) {
        console.log('  [错误] 未找到输入框，跳过');
        continue;
      }

      // 彻底清空输入框（Ctrl+A 全选 + Delete，确保旧提示词完全清除）
      await inputBox.click();
      await page.waitForTimeout(200);
      await inputBox.press('Control+a');
      await page.waitForTimeout(100);
      await inputBox.press('Delete');
      await page.waitForTimeout(200);
      // 再确认一次清空（有些输入框需要多次）
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
      await page.waitForTimeout(WAIT_AFTER_SEND);
      await closeModal(page);

      // ========== 步骤1：查找缩略图（带重试）==========
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
      }

      if (thumbs.length === 0) {
        console.log('  [错误] 始终未找到图片，跳过');
        continue;
      }

      // 取前4张（或实际找到的数量）
      const totalImages = Math.min(thumbs.length, 4);

      // ========== 逐张处理：每次重新查找元素，避免引用失效 ==========
      let savedCount = 0;
      for (let imgIdx = 0; imgIdx < totalImages; imgIdx++) {
        const targetName = `${task.baseName}-${imgIdx + 1}.png`;
        const savePath = path.join(DOWNLOAD_DIR, targetName);

        console.log(`\n    [${imgIdx + 1}/${totalImages}] 处理第 ${imgIdx + 1} 张 → ${targetName}`);

        try {
          // 每次重新查找缩略图（避免元素引用失效）
          const freshThumbs = await findThumbnails(page);
          if (freshThumbs.length <= imgIdx) {
            console.log(`      ⚠ 重新查找后只有 ${freshThumbs.length} 张，跳过第 ${imgIdx + 1} 张`);
            continue;
          }

          // 点击缩略图，显示大图（用坐标点击更可靠）
          const thumbBox = await freshThumbs[imgIdx].el.boundingBox();
          if (thumbBox) {
            await freshThumbs[imgIdx].el.scrollIntoViewIfNeeded({ timeout: 5000 });
            await page.waitForTimeout(300);
            await page.mouse.click(thumbBox.x + thumbBox.width / 2, thumbBox.y + thumbBox.height / 2);
          } else {
            await freshThumbs[imgIdx].el.click({ timeout: 10000 });
          }
          await page.waitForTimeout(CLEAR_WAIT);

          // 3b. 等待大图清晰（naturalWidth >= 1024）
          console.log(`      等待大图清晰...`);
          const clearInfo = await waitForClearImage(page, 10000);
          if (clearInfo.ok) {
            console.log(`      ✓ 大图已清晰 (${clearInfo.w}×${clearInfo.h})`);
          } else {
            console.log(`      ⚠ 大图可能未完全清晰 (${clearInfo.w}×${clearInfo.h})，继续尝试下载...`);
          }

          // 3c. 悬停下载
          console.log(`      悬停并点击下载按钮...`);
          const result = await downloadViaHoverButton(page, savePath);

          if (result.success && result.size > 100000) {
            const sizeMB = (result.size / 1024 / 1024).toFixed(2);
            console.log(`      ✓ 已保存 ${targetName} (${sizeMB} MB)`);
            savedCount++;
          } else {
            console.log(`      ✗ 悬停下载失败: ${result.error || '文件太小'}`);

            // 备用方案
            console.log(`      → 尝试备用下载...`);
            const fbOk = await fallbackDownload(page, savePath);
            if (fbOk) {
              const stats = fs.statSync(savePath);
              const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
              console.log(`      ✓ 备用下载成功 ${targetName} (${sizeMB} MB)`);
              savedCount++;
            } else {
              console.log(`      ✗ 备用下载也失败`);
            }
          }
        } catch (err) {
          console.log(`      ✗ 异常: ${err.message.substring(0, 80)}`);
        }

        // 每张之间停顿
        if (imgIdx < thumbs.length - 1) {
          await page.waitForTimeout(1500);
        }
      }

      // ========== 步骤4：保存进度 ==========
      if (savedCount > 0) {
        progress.completed.push({ index: globalIndex, skuId: task.skuId, lang: task.lang, saved: savedCount });
        progress.lastIndex = globalIndex;
        saveProgress(progress);
      }

      console.log(`\n  本任务完成: ${savedCount}/${thumbs.length} 张`);

      if (i < tasks.length - 1) {
        console.log(`  等待 ${WAIT_BETWEEN_TASKS / 1000} 秒后继续...`);
        await page.waitForTimeout(WAIT_BETWEEN_TASKS);
      }

    } catch (err) {
      console.error(`  [异常] ${err.message.substring(0, 100)}`);
      await page.waitForTimeout(5000);
    }
  }

  console.log('\n========================================');
  console.log('全部任务完成！');
  console.log(`成功: ${progress.completed.length} / ${tasks.length}`);
  console.log(`下载目录: ${DOWNLOAD_DIR}`);
  console.log('========================================');

  await browser.close();
}

// ============ 辅助函数 ============

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

const READY_FILE = path.join(__dirname, 'seedream-ready.txt');

async function waitForReady() {
  let dots = 0;
  while (true) {
    if (fs.existsSync(READY_FILE)) {
      try { fs.unlinkSync(READY_FILE); } catch {}
      console.log('\n>>> 检测到就绪信号，开始自动执行！\n');
      return;
    }
    dots = (dots + 1) % 4;
    const d = '.'.repeat(dots || 1);
    process.stdout.write(`\r>>> 等待登录完成${d} `);
    await new Promise(r => setTimeout(r, 5000));
  }
}

function autoCountdown(seconds) {
  return new Promise(resolve => {
    let remaining = seconds;
    console.log(`>>> ${remaining}秒倒计时开始，请完成手动设置...`);
    const timer = setInterval(() => {
      remaining -= 10;
      if (remaining > 0) {
        if (remaining % 30 === 0) {
          console.log(`>>> 还剩 ${remaining}秒...`);
        }
      } else {
        clearInterval(timer);
        console.log('\n>>> 倒计时结束，开始自动执行！');
        resolve();
      }
    }, 10000);
  });
}

main().catch(err => {
  console.error('脚本异常:', err);
  process.exit(1);
});
