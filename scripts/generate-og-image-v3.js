const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 网站基准色
const BLUE = '#2873F5';
const BLUE_DARK = '#1E5FD1';
const BLUE_DEEP = '#0B1B3D';
const ORANGE = '#F87314';
const ORANGE_LIGHT = '#FFB366';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: 1200px;
  height: 630px;
  background: linear-gradient(145deg, ${BLUE_DEEP} 0%, #0F2A5C 40%, ${BLUE_DARK} 70%, ${BLUE} 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Inter', -apple-system, sans-serif;
  position: relative;
  overflow: hidden;
}

/* ===== 印刷网点纹理（半透明白点阵） ===== */
.dot-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* ===== CMYK 印刷圆点装饰 ===== */
.cmyk-dot {
  position: absolute;
  border-radius: 50%;
}
.cmyk-c { width: 180px; height: 180px; background: rgba(40,115,245,0.12); top: -40px; left: -40px; }
.cmyk-m { width: 140px; height: 140px; background: rgba(248,115,20,0.10); top: 60px; right: 80px; }
.cmyk-y { width: 100px; height: 100px; background: rgba(255,200,50,0.08); bottom: 100px; left: 100px; }
.cmyk-k { width: 80px; height: 80px; background: rgba(255,255,255,0.06); bottom: 60px; right: 200px; }

/* ===== 地球轮廓线（全球感） ===== */
.globe {
  position: absolute;
  bottom: -120px;
  right: -80px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
}
.globe::before {
  content: '';
  position: absolute;
  top: 50%; left: 0; right: 0;
  height: 1px;
  background: rgba(255,255,255,0.06);
}
.globe::after {
  content: '';
  position: absolute;
  left: 50%; top: 0; bottom: 0;
  width: 1px;
  background: rgba(255,255,255,0.06);
}

/* ===== 印刷纸张飞散效果 ===== */
.paper {
  position: absolute;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 2px;
}
.paper-1 { width: 60px; height: 80px; top: 80px; left: 80px; transform: rotate(-15deg); }
.paper-2 { width: 45px; height: 60px; bottom: 120px; right: 100px; transform: rotate(12deg); }
.paper-3 { width: 35px; height: 50px; top: 200px; right: 60px; transform: rotate(-8deg); }

/* ===== 数据流线条（智能/云感） ===== */
.flow-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(40,115,245,0.3), transparent);
}
.flow-1 { width: 300px; top: 200px; left: 0; }
.flow-2 { width: 250px; top: 400px; right: 0; }

/* ===== 主内容区 ===== */
.content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

/* 使命标语 */
.mission-line {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}
.mission-line .line {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${ORANGE});
}
.mission-line .line.right {
  background: linear-gradient(90deg, ${ORANGE}, transparent);
}
.mission-text {
  color: ${ORANGE_LIGHT};
  font-size: 16px;
  letter-spacing: 6px;
  text-transform: uppercase;
  font-weight: 500;
}

/* 市场标签 */
.market-tags {
  display: flex;
  gap: 20px;
  margin-top: 12px;
}
.market-tag {
  color: rgba(255,255,255,0.65);
  font-size: 14px;
  letter-spacing: 2px;
  padding: 8px 22px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 24px;
  background: rgba(255,255,255,0.03);
}

/* 底部装饰 */
.bottom-accent {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255,255,255,0.3);
  font-size: 12px;
  letter-spacing: 4px;
}
.bottom-accent .dot-small {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: ${ORANGE};
}
</style>
</head>
<body>
<!-- 背景纹理 -->
<div class="dot-pattern"></div>

<!-- CMYK 印刷圆点 -->
<div class="cmyk-dot cmyk-c"></div>
<div class="cmyk-dot cmyk-m"></div>
<div class="cmyk-dot cmyk-y"></div>
<div class="cmyk-dot cmyk-k"></div>

<!-- 地球轮廓 -->
<div class="globe"></div>

<!-- 印刷纸张 -->
<div class="paper paper-1"></div>
<div class="paper paper-2"></div>
<div class="paper paper-3"></div>

<!-- 数据流 -->
<div class="flow-line flow-1"></div>
<div class="flow-line flow-2"></div>

<!-- 主内容 -->
<div class="content">
  <!-- 使命标语 -->
  <div class="mission-line">
    <div class="line"></div>
    <div class="mission-text">Global Smart Printing</div>
    <div class="line right"></div>
  </div>

  <!-- 大 Logo SVG -->
  <svg width="780" viewBox="0 0 720 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4B9AF5"/>
        <stop offset="100%" stop-color="#2873F5"/>
      </linearGradient>
      <linearGradient id="gBot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1E5FD1"/>
        <stop offset="100%" stop-color="#0B1B3D"/>
      </linearGradient>
      <linearGradient id="gFold" x1="100%" y1="0%" x2="80%" y2="20%">
        <stop offset="0%" stop-color="#F87314"/>
        <stop offset="100%" stop-color="#FFB366" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
    <g transform="translate(20, 8)">
      <path d="M8 12 L112 12 L112 36 L32 108 L8 108 Z" fill="url(#gTop)"/>
      <path d="M32 108 L112 36 L112 60 C124 60 132 68 132 80 C132 92 124 100 116 100 C124 100 132 108 132 120 L32 120 Z" fill="url(#gBot)"/>
      <path d="M112 12 L112 36 L92 12 Z" fill="url(#gFold)"/>
    </g>
    <text x="172" y="72" font-family="'Inter','SF Pro Display',sans-serif" font-size="56" font-weight="800" fill="#ffffff">ZPrint<tspan font-weight="400" fill="rgba(255,255,255,0.6)">Pro</tspan></text>
    <text x="174" y="100" font-family="'Inter',sans-serif" font-size="14" font-weight="500" fill="rgba(255,255,255,0.4)" letter-spacing="3">GLOBAL SMART PRINTING</text>
    <text x="470" y="82" font-family="'PingFang SC','Microsoft YaHei',sans-serif" font-size="42" font-weight="700" fill="#F87314" letter-spacing="6">智印云</text>
    <text x="614" y="62" font-family="sans-serif" font-size="14" fill="rgba(255,255,255,0.3)">®</text>
  </svg>

  <!-- 市场标签 -->
  <div class="market-tags">
    <span class="market-tag">香港 Hong Kong</span>
    <span class="market-tag">全球 Global</span>
    <span class="market-tag">日本 Japan</span>
  </div>
</div>

<!-- 底部装饰 -->
<div class="bottom-accent">
  <span>AI QUOTE</span>
  <div class="dot-small"></div>
  <span>SECURE PAYMENT</span>
  <div class="dot-small"></div>
  <span>72H DELIVERY</span>
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
  console.log(`✅ Generated og-image.jpg v3: ${(stats.size / 1024).toFixed(1)} KB`);
})();
