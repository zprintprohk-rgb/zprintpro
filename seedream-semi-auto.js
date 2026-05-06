/**
 * Seedream 半自动下载工具
 * 用户手动发送提示词，脚本自动监控并下载生成的图片
 * 用法: node seedream-semi-auto.js [起始SKU如PB-001]
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PROMPTS_FILE = 'seedream-prompts-all-skus.txt';
const DOWNLOAD_DIR = path.join(__dirname, 'seedream-downloads');
const PROGRESS_FILE = path.join(__dirname, 'seedream-progress-semi.json');
const CURRENT_PROMPT_FILE = path.join(__dirname, 'seedream-current-prompt.txt');
const DOUBAO_URL = 'https://www.doubao.com';
const WAIT_FOR_SEND = 120000;      // 给用户120秒发送提示词(ms)
const WAIT_AFTER_TASK = 15000;     // 任务间隔(ms)

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

// ============ 倒计时 ============

function countdown(seconds) {
  return new Promise(resolve => {
    let remaining = seconds;
    console.log(`>>> ${remaining}秒倒计时开始...`);
    const timer = setInterval(() => {
      remaining -= 10;
      if (remaining > 0) {
        if (remaining % 30 === 0) {
          console.log(`>>> 还剩 ${remaining}秒...`);
        }
      } else {
        clearInterval(timer);
        console.log('\n>>> 倒计时结束！');
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
  console.log('Seedream 半自动下载工具');
  console.log('========================================');
  console.log('流程: 你手动发提示词 → 脚本自动监控下载');
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
  console.log('请手动完成（5分钟）：');
  console.log('1. 登录豆包');
  console.log('2. 进入「图像生成 / Seedream 5.0 Lite」');
  console.log('3. 确认比例为 1:1');
  console.log('========================================\n');

  await countdown(300);

  // 主循环
  for (let i = currentIndex; i < allTasks.length; i++) {
    const task = allTasks[i];

    // 写入当前提示词到文件
    const promptInfo = `
========================================
任务 [${i + 1}/${allTasks.length}]
SKU: ${task.skuId} | 语言: ${task.lang}
文件名: ${task.baseName}-1.png ~ -4.png
========================================
提示词（请复制到浏览器发送）:
${task.prompt}
========================================
请在2分钟内手动发送上方提示词
生成完成后脚本将自动检测并下载
========================================
`;
    fs.writeFileSync(CURRENT_PROMPT_FILE, promptInfo, 'utf8');

    console.log(`\n----------------------------------------`);
    console.log(`[${i + 1}/${allTasks.length}] ${task.skuId} [${task.lang}]`);
    console.log(`----------------------------------------`);
    console.log(`提示词已写入文件: ${CURRENT_PROMPT_FILE}`);
    console.log(`提示词开头: ${task.prompt.substring(0, 60)}...`);
    console.log(`\n>>> 请在120秒内手动复制上方提示词到浏览器发送...`);

    // 倒计时120秒，同时监控图片
    let thumbs = [];
    const startTime = Date.now();
    while (Date.now() - startTime < WAIT_FOR_SEND) {
      try {
        thumbs = await findThumbnails(page);
        if (thumbs.length >= 4) {
          console.log(`\n✓ 检测到 ${thumbs.length} 张图片，开始下载！`);
          break;
        }
      } catch (err) {
        console.log(`  监控异常: ${err.message.substring(0, 50)}`);
      }
      await page.waitForTimeout(5000);
    }

    if (thumbs.length < 4) {
      console.log(`\n⚠ 120秒内未检测到4张图片，继续监控60秒...`);
      for (let attempt = 1; attempt <= 4; attempt++) {
        try {
          thumbs = await findThumbnails(page);
          if (thumbs.length >= 4) {
            console.log(`\n✓ 检测到 ${thumbs.length} 张图片！`);
            break;
          }
        } catch {}
        console.log(`  继续监控... (${attempt}/4)`);
        await page.waitForTimeout(15000);
      }
    }

    if (thumbs.length === 0) {
      console.log('\n✗ 始终未找到图片，跳过此任务');
      continue;
    }

    console.log(`\n开始下载 ${Math.min(thumbs.length, 4)} 张图片...`);

    // 逐张下载
    let savedCount = 0;
    for (let imgIdx = 0; imgIdx < Math.min(thumbs.length, 4); imgIdx++) {
      const targetName = `${task.baseName}-${imgIdx + 1}.png`;
      const savePath = path.join(DOWNLOAD_DIR, targetName);

      console.log(`\n  [${imgIdx + 1}/4] ${targetName}`);

      try {
        // 重新查找缩略图（避免元素引用失效）
        const freshThumbs = await findThumbnails(page);
        if (freshThumbs.length <= imgIdx) {
          console.log(`    ⚠ 重新查找后只有 ${freshThumbs.length} 张，跳过`);
          continue;
        }

        // 坐标点击
        const box = await freshThumbs[imgIdx].el.boundingBox();
        if (box) {
          await freshThumbs[imgIdx].el.scrollIntoViewIfNeeded({ timeout: 5000 });
          await page.waitForTimeout(300);
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        }
        await page.waitForTimeout(3000);

        // 等待大图清晰
        const clearInfo = await waitForClearImage(page, 10000);
        if (clearInfo.ok) {
          console.log(`    ✓ 大图清晰 (${clearInfo.w}×${clearInfo.h})`);
        }

        // 悬停下载
        const result = await downloadViaHoverButton(page, savePath);
        if (result.success && result.size > 100000) {
          console.log(`    ✓ 已保存 (${(result.size / 1024 / 1024).toFixed(2)} MB)`);
          savedCount++;
        } else {
          console.log(`    ✗ 下载失败: ${result.error || '文件太小'}`);
        }
      } catch (err) {
        console.log(`    ✗ 异常: ${err.message.substring(0, 80)}`);
      }

      await page.waitForTimeout(3000);
    }

    // 保存进度
    progress.lastIndex = i;
    progress.completed.push({ index: i, skuId: task.skuId, lang: task.lang, saved: savedCount });
    saveProgress(progress);

    console.log(`\n✓ 本任务完成: ${savedCount}/4 张`);
    console.log(`>>> 等待 ${WAIT_AFTER_TASK / 1000} 秒后进入下一个...`);
    await page.waitForTimeout(WAIT_AFTER_TASK);
  }

  console.log('\n========================================');
  console.log('全部任务完成！');
  console.log(`成功: ${progress.completed.length} / ${allTasks.length}`);
  console.log('========================================');

  // 清理当前提示词文件
  try { fs.unlinkSync(CURRENT_PROMPT_FILE); } catch {}

  // 不关闭浏览器
  console.log('\n浏览器保持打开，你可以继续使用。');
  console.log('按 Ctrl+C 退出脚本。');
}

main().catch(err => {
  console.error('脚本异常:', err);
  process.exit(1);
});
