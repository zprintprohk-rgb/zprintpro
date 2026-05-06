const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 网站明亮蓝色系 — 不压印
const BLUE = '#2873F5';
const BLUE_LIGHT = '#4B9AF5';
const BLUE_Lighter = '#7EB3FF';
const BLUE_SOFT = '#EBF4FF';
const ORANGE = '#F87314';
const ORANGE_LIGHT = '#FFA366';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px;
  height: 630px;
  background: linear-gradient(135deg, ${BLUE} 0%, ${BLUE_LIGHT} 40%, ${BLUE_Lighter} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

/* 白色光晕装饰 */
.glow-1 {
  position: absolute;
  top: -150px;
  right: -100px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%);
}
.glow-2 {
  position: absolute;
  bottom: -100px;
  left: -80px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%);
}
.glow-3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 900px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%);
}

/* 印刷网点纹理（白色，很淡） */
.dots {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* 白色装饰圆 */
.ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.15);
}
.ring-1 { width: 300px; height: 300px; top: -60px; left: -60px; }
.ring-2 { width: 200px; height: 200px; bottom: -40px; right: -40px; border-width: 1px; }

/* 内容区 */
.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

/* 顶部使命标签 */
.mission-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 32px;
  background: rgba(255,255,255,0.18);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 30px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
}
.mission-tag .dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: ${ORANGE};
}

/* 大 Logo */
.logo-wrap {
  filter: drop-shadow(0 12px 40px rgba(0,0,0,0.12));
}

/* 市场标签 */
.market-tags {
  display: flex;
  gap: 18px;
  margin-top: 4px;
}
.market-tag {
  color: rgba(255,255,255,0.9);
  font-size: 15px;
  letter-spacing: 1px;
  padding: 10px 26px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

/* 底部价值 */
.values {
  position: absolute;
  bottom: 46px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 28px;
  color: rgba(255,255,255,0.75);
  font-size: 14px;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.values .sep {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: ${ORANGE_LIGHT};
}
</style>
</head>
<body>
<div class="glow-1"></div>
<div class="glow-2"></div>
<div class="glow-3"></div>
<div class="dots"></div>
<div class="ring ring-1"></div>
<div class="ring ring-2"></div>

<div class="content">
  <!-- 使命标签 -->
  <div class="mission-tag">
    <span class="dot"></span>
    <span>Global Smart Printing Platform</span>
  </div>

  <!-- 大 Logo -->
  <div class="logo-wrap">
    <svg width="840" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7EB3FF"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <linearGradient id="gBot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4B9AF5"/>
          <stop offset="100%" stop-color="#1E5FD1"/>
        </linearGradient>
        <linearGradient id="gFold" x1="100%" y1="0%" x2="80%" y2="20%">
          <stop offset="0%" stop-color="#F87314"/>
          <stop offset="100%" stop-color="#FFA366"/>
        </linearGradient>
      </defs>
      <g transform="translate(20, 8)">
        <path d="M8 12 L112 12 L112 36 L32 108 L8 108 Z" fill="url(#gTop)"/>
        <path d="M32 108 L112 36 L112 60 C124 60 132 68 132 80 C132 92 124 100 116 100 C124 100 132 108 132 120 L32 120 Z" fill="url(#gBot)"/>
        <path d="M112 12 L112 36 L92 12 Z" fill="url(#gFold)"/>
      </g>
      <text x="172" y="72" font-family="'Inter','SF Pro Display',sans-serif" font-size="56" font-weight="800" fill="#ffffff">ZPrint<tspan font-weight="400" fill="rgba(255,255,255,0.75)">Pro</tspan></text>
      <text x="174" y="100" font-family="'Inter',sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.55)" letter-spacing="3">GLOBAL SMART PRINTING</text>
      <text x="470" y="82" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#FFA366" letter-spacing="6">智印云</text>
      <text x="614" y="62" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.4)">®</text>
    </svg>
  </div>

  <!-- 市场标签 -->
  <div class="market-tags">
    <span class="market-tag">Hong Kong</span>
    <span class="market-tag">Global</span>
    <span class="market-tag">Japan</span>
  </div>
</div>

<!-- 底部价值 -->
<div class="values">
  <span>30s AI Quote</span>
  <div class="sep"></div>
  <span>Secure Payment</span>
  <div class="sep"></div>
  <span>72h Global Delivery</span>
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
  console.log(`✅ Generated og-image.jpg v5 (site blue): ${(stats.size / 1024).toFixed(1)} KB`);
})();
