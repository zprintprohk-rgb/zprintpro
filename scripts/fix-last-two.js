const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'product-seo.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const fixes = {
  'security-stickers': {
    'zh-hk': '防偽貼紙印刷,防盜貼紙,防拆貼紙,VOID貼紙,易碎貼紙,保安貼紙,防偽標籤印刷,防偽貼紙訂造,防偽貼紙設計,防偽貼紙香港,防偽貼紙報價,防偽貼紙速印,正品防偽貼',
    'en': 'security sticker printing,tamper evident stickers,void stickers,security labels,anti counterfeit stickers,tamper proof stickers,custom security stickers,security sticker design,security stickers hong kong,security sticker quote,hologram security stickers,product security stickers',
    'ja': 'セキュリティステッカー印刷,改ざん防止ステッカー,VOIDステッカー,セキュリティラベル,偽造防止ステッカー,カスタムセキュリティステッカー,セキュリティステッカーデザイン,セキュリティステッカー香港',
  },
  'adhesive-posters': {
    'zh-hk': '背膠海報印刷,自粘海報,貼牆海報,可移海報,背膠海報訂造,背膠海報設計,背膠海報香港,背膠海報報價,背膠海報速印,背膠海報少量印刷,牆貼海報,窗貼海報,室內背膠海報',
    'en': 'adhesive poster printing,self adhesive posters,stick on posters,wall posters,removable adhesive posters,custom adhesive posters,adhesive poster design,adhesive posters hong kong,adhesive poster quote,adhesive poster printing service,indoor adhesive posters,window cling posters',
    'ja': '粘着ポスター印刷,セルフ粘着ポスター,壁貼りポスター,はがせる粘着ポスター,カスタム粘着ポスター,粘着ポスターデザイン,粘着ポスター香港,粘着ポスター見積もり,屋内粘着ポスター',
  },
};

let changes = 0;

for (const [slug, keywords] of Object.entries(fixes)) {
  const productStartPattern = `'${slug}': {`;
  const startIdx = content.indexOf(productStartPattern);
  
  if (startIdx === -1) {
    console.log(`WARNING: Product '${slug}' not found`);
    continue;
  }
  
  // Find the end of this product block by counting braces
  let braceCount = 1;
  let endIdx = startIdx + productStartPattern.length;
  while (braceCount > 0 && endIdx < content.length) {
    if (content[endIdx] === '{') braceCount++;
    if (content[endIdx] === '}') braceCount--;
    endIdx++;
  }
  
  const oldProductBlock = content.substring(startIdx, endIdx);
  
  const kwStartIdx = oldProductBlock.indexOf('keywords:');
  let kwBraceCount = 1;
  let kwEndIdx = oldProductBlock.indexOf('{', kwStartIdx) + 1;
  while (kwBraceCount > 0 && kwEndIdx < oldProductBlock.length) {
    if (oldProductBlock[kwEndIdx] === '{') kwBraceCount++;
    if (oldProductBlock[kwEndIdx] === '}') kwBraceCount--;
    kwEndIdx++;
  }
  
  const oldKeywordsBlock = oldProductBlock.substring(kwStartIdx, kwEndIdx);
  
  const newKeywordsBlock = `keywords: {
      'zh-hk': '${keywords['zh-hk']}',
      'en': '${keywords['en']}',
      'ja': '${keywords['ja']}',
    }`;
  
  const newProductBlock = oldProductBlock.replace(oldKeywordsBlock, newKeywordsBlock);
  
  if (newProductBlock === oldProductBlock) {
    console.log(`WARNING: Could not replace keywords for '${slug}'`);
    continue;
  }
  
  content = content.substring(0, startIdx) + newProductBlock + content.substring(endIdx);
  changes++;
  console.log(`Updated: ${slug}`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone! Updated ${changes} products.`);
