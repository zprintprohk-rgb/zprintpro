const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px;
  height: 630px;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #06b6d4 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', sans-serif;
}
.tagline {
  color: #94a3b8;
  font-size: 18px;
  letter-spacing: 6px;
  margin-top: 24px;
  text-transform: uppercase;
}
</style>
</head>
<body>
<svg width="560" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="gBot" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
    <linearGradient id="gFold" x1="100%" y1="0%" x2="80%" y2="20%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <g transform="translate(20, 8)">
    <path d="M8 12 L112 12 L112 36 L32 108 L8 108 Z" fill="url(#gTop)"/>
    <path d="M32 108 L112 36 L112 60 C124 60 132 68 132 80 C132 92 124 100 116 100 C124 100 132 108 132 120 L32 120 Z" fill="url(#gBot)"/>
    <path d="M112 12 L112 36 L92 12 Z" fill="url(#gFold)"/>
  </g>
  <text x="172" y="72" font-family="'Inter','SF Pro Display',sans-serif" font-size="56" font-weight="800" fill="#f1f5f9">ZPrint<tspan font-weight="400" fill="#94a3b8">Pro</tspan></text>
  <text x="174" y="100" font-family="'Inter',sans-serif" font-size="14" font-weight="500" fill="#64748b" letter-spacing="3">GLOBAL SMART PRINTING</text>
  <text x="470" y="82" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#22d3ee" letter-spacing="6">智印云</text>
  <text x="614" y="62" font-family="sans-serif" font-size="14" fill="#64748b">®</text>
</svg>
<div class="tagline">Hong Kong · Global · Japan</div>
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
  console.log(`✅ Generated og-image.jpg: ${(stats.size / 1024).toFixed(1)} KB`);
})();
