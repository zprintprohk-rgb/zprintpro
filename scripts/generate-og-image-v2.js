const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 网站基准色
const PRIMARY_BLUE = '#2873F5';
const PRIMARY_BLUE_DARK = '#1E5FD1';
const ACCENT_ORANGE = '#F87314';
const ACCENT_ORANGE_DARK = '#E56203';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px;
  height: 630px;
  background: linear-gradient(135deg, ${PRIMARY_BLUE_DARK} 0%, ${PRIMARY_BLUE} 50%, #4B9AF5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}
/* 装饰圆 */
.circle-1 {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
  top: -200px;
  right: -150px;
}
.circle-2 {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  bottom: -100px;
  left: -100px;
}
/* 橙色装饰条 */
.accent-bar {
  position: absolute;
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, ${ACCENT_ORANGE}, ${ACCENT_ORANGE_DARK});
  border-radius: 2px;
  bottom: 210px;
  left: 50%;
  transform: translateX(-50%);
}
/* 小橙点 */
.dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${ACCENT_ORANGE};
}
.dot-1 { top: 120px; left: 100px; opacity: 0.6; }
.dot-2 { top: 200px; right: 120px; width: 8px; height: 8px; opacity: 0.4; }
.dot-3 { bottom: 140px; left: 200px; width: 6px; height: 6px; opacity: 0.3; }
/* 内容区 */
.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.brand-slogan {
  color: rgba(255,255,255,0.85);
  font-size: 22px;
  letter-spacing: 8px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 16px;
}
.market-tags {
  display: flex;
  gap: 24px;
  margin-top: 8px;
}
.market-tag {
  color: rgba(255,255,255,0.7);
  font-size: 15px;
  letter-spacing: 2px;
  padding: 6px 20px;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 20px;
}
</style>
</head>
<body>
<div class="circle-1"></div>
<div class="circle-2"></div>
<div class="dot dot-1"></div>
<div class="dot dot-2"></div>
<div class="dot dot-3"></div>
<div class="accent-bar"></div>

<div class="content">
  <!-- 大 Logo SVG -->
  <svg width="720" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4B9AF5"/>
        <stop offset="100%" stop-color="#2873F5"/>
      </linearGradient>
      <linearGradient id="gBot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E5FD1"/>
        <stop offset="100%" stop-color="#153D8A"/>
      </linearGradient>
      <linearGradient id="gFold" x1="100%" y1="0%" x2="80%" y2="20%">
        <stop offset="0%" stop-color="#F87314"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.5"/>
      </linearGradient>
    </defs>
    <g transform="translate(20, 8)">
      <path d="M8 12 L112 12 L112 36 L32 108 L8 108 Z" fill="url(#gTop)"/>
      <path d="M32 108 L112 36 L112 60 C124 60 132 68 132 80 C132 92 124 100 116 100 C124 100 132 108 132 120 L32 120 Z" fill="url(#gBot)"/>
      <path d="M112 12 L112 36 L92 12 Z" fill="url(#gFold)"/>
    </g>
    <text x="172" y="72" font-family="'Inter','SF Pro Display',sans-serif" font-size="56" font-weight="800" fill="#ffffff">ZPrint<tspan font-weight="400" fill="rgba(255,255,255,0.7)">Pro</tspan></text>
    <text x="174" y="100" font-family="'Inter',sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.5)" letter-spacing="3">GLOBAL SMART PRINTING</text>
    <text x="470" y="82" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#F87314" letter-spacing="6">智印云</text>
    <text x="614" y="62" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.4)">®</text>
  </svg>

  <div class="brand-slogan">Global Smart Printing Platform</div>
  <div class="market-tags">
    <span class="market-tag">香港 Hong Kong</span>
    <span class="market-tag">全球 Global</span>
    <span class="market-tag">日本 Japan</span>
  </div>
</div>
</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const outPath = path.join(__dirname, '..', 'public', 'og-image.jpg');
  await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 });
  await browser.close();
  const stats = fs.statSync(outPath);
  console.log(`✅ Generated og-image.jpg v2: ${(stats.size / 1024).toFixed(1)} KB`);
})();
