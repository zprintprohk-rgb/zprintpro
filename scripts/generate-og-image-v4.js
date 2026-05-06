const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 明亮配色 — 不压印
const BLUE = '#2873F5';
const BLUE_LIGHT = '#5B9AFD';
const BLUE_SOFT = '#EBF2FF';
const ORANGE = '#F87314';
const ORANGE_SOFT = '#FFF0E5';
const TEXT_DARK = '#1A1A2E';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px;
  height: 630px;
  background: linear-gradient(160deg, #ffffff 0%, ${BLUE_SOFT} 50%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

/* 右上角明亮蓝色光晕 */
.glow-tr {
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(40,115,245,0.12) 0%, transparent 70%);
}
/* 左下角橙色光晕 */
.glow-bl {
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248,115,20,0.10) 0%, transparent 70%);
}

/* 地球轮廓线（细线，明亮感） */
.globe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 700px;
  border-radius: 50%;
  border: 1px solid rgba(40,115,245,0.08);
}
.globe-line-h {
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px;
  background: rgba(40,115,245,0.06);
}
.globe-line-v {
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: rgba(40,115,245,0.06);
}

/* 印刷网点装饰（很淡） */
.dot-c { position: absolute; width: 120px; height: 120px; border-radius: 50%; background: rgba(40,115,245,0.06); top: 60px; left: 80px; }
.dot-m { position: absolute; width: 80px; height: 80px; border-radius: 50%; background: rgba(248,115,20,0.08); bottom: 100px; right: 120px; }

/* 小纸张装饰 */
.paper {
  position: absolute;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(40,115,245,0.12);
  border-radius: 3px;
  box-shadow: 0 4px 20px rgba(40,115,245,0.06);
}
.paper-1 { width: 50px; height: 65px; top: 100px; right: 100px; transform: rotate(12deg); }
.paper-2 { width: 40px; height: 55px; bottom: 140px; left: 90px; transform: rotate(-10deg); }

/* 内容区 */
.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 顶部使命标签 */
.mission-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 28px;
  background: rgba(40,115,245,0.08);
  border: 1px solid rgba(40,115,245,0.15);
  border-radius: 30px;
  color: ${BLUE};
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 3px;
}
.mission-tag .dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: ${ORANGE};
}

/* 大 Logo SVG */
.logo-wrap {
  filter: drop-shadow(0 8px 30px rgba(40,115,245,0.15));
}

/* 市场标签 */
.market-tags {
  display: flex;
  gap: 16px;
  margin-top: 8px;
}
.market-tag {
  color: ${TEXT_DARK};
  font-size: 15px;
  letter-spacing: 1px;
  padding: 10px 24px;
  background: rgba(255,255,255,0.8);
  border: 1px solid rgba(40,115,245,0.12);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(40,115,245,0.05);
}

/* 底部价值 */
.values {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 24px;
  color: ${TEXT_DARK};
  font-size: 14px;
  letter-spacing: 2px;
  opacity: 0.6;
}
.values .sep {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: ${ORANGE};
}
</style>
</head>
<body>
<div class="glow-tr"></div>
<div class="glow-bl"></div>

<div class="globe">
  <div class="globe-line-h"></div>
  <div class="globe-line-v"></div>
</div>

<div class="dot-c"></div>
<div class="dot-m"></div>
<div class="paper paper-1"></div>
<div class="paper paper-2"></div>

<div class="content">
  <!-- 使命标签 -->
  <div class="mission-tag">
    <span class="dot"></span>
    <span>GLOBAL SMART PRINTING PLATFORM</span>
  </div>

  <!-- 大 Logo -->
  <div class="logo-wrap">
    <svg width="820" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5B9AFD"/>
          <stop offset="100%" stop-color="#2873F5"/>
        </linearGradient>
        <linearGradient id="gBot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E5FD1"/>
          <stop offset="100%" stop-color="#0B1B3D"/>
        </linearGradient>
        <linearGradient id="gFold" x1="100%" y1="0%" x2="80%" y2="20%">
          <stop offset="0%" stop-color="#F87314"/>
          <stop offset="100%" stop-color="#FFB366"/>
        </linearGradient>
      </defs>
      <g transform="translate(20, 8)">
        <path d="M8 12 L112 12 L112 36 L32 108 L8 108 Z" fill="url(#gTop)"/>
        <path d="M32 108 L112 36 L112 60 C124 60 132 68 132 80 C132 92 124 100 116 100 C124 100 132 108 132 120 L32 120 Z" fill="url(#gBot)"/>
        <path d="M112 12 L112 36 L92 12 Z" fill="url(#gFold)"/>
      </g>
      <text x="172" y="72" font-family="'Inter','SF Pro Display',sans-serif" font-size="56" font-weight="800" fill="#1A1A2E">ZPrint<tspan font-weight="400" fill="#64748b">Pro</tspan></text>
      <text x="174" y="100" font-family="'Inter',sans-serif" font-size="14" font-weight="500" fill="#94a3b8" letter-spacing="3">GLOBAL SMART PRINTING</text>
      <text x="470" y="82" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#F87314" letter-spacing="6">智印云</text>
      <text x="614" y="62" font-family="sans-serif" font-size="14" fill="#94a3b8">®</text>
    </svg>
  </div>

  <!-- 市场标签 -->
  <div class="market-tags">
    <span class="market-tag">🇭🇰 香港</span>
    <span class="market-tag">🌐 全球</span>
    <span class="market-tag">🇯🇵 日本</span>
  </div>
</div>

<!-- 底部价值 -->
<div class="values">
  <span>30s AI QUOTE</span>
  <div class="sep"></div>
  <span>AIRWALLEX PAYMENT</span>
  <div class="sep"></div>
  <span>72H GLOBAL DELIVERY</span>
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
  console.log(`✅ Generated og-image.jpg v4 (bright): ${(stats.size / 1024).toFixed(1)} KB`);
})();
