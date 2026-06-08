// Generate a real placeholder.jpg (the existing one is 0 bytes — broken)
const sharp = require('sharp');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2873F5" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#F87314" stop-opacity="0.12"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="#f8fafc"/>
  <rect x="100" y="100" width="600" height="600" fill="url(#g)" rx="20"/>
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="36" fill="#94a3b8" text-anchor="middle" font-weight="bold">ZprintPro</text>
  <text x="400" y="420" font-family="Arial, sans-serif" font-size="18" fill="#cbd5e1" text-anchor="middle">Image Coming Soon</text>
  <text x="400" y="450" font-family="Arial, sans-serif" font-size="14" fill="#cbd5e1" text-anchor="middle">800 x 800</text>
</svg>`;

sharp(Buffer.from(svg))
  .jpeg({ quality: 85 })
  .toFile(path.join('public', 'images', 'placeholder.jpg'))
  .then((info) => {
    console.log(`OK: placeholder.jpg created (${info.size} bytes, ${info.width}x${info.height})`);
  })
  .catch((err) => {
    console.error('FAIL:', err.message);
    process.exit(1);
  });
