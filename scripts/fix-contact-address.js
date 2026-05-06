const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', '[locale]', 'contact', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// zh-hk
content = content.replace(
  "addressValue: '香港九龍觀塘偉業街180號 成運工業大廈',",
  "addressValue: '香港九龍觀塘偉業街182號 成運工業大廈',"
);
// en
content = content.replace(
  "addressValue: '180 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong',",
  "addressValue: '182 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong',"
);
// ja
content = content.replace(
  "addressValue: '香港九龍観塘偉業街180号 成運工業ビル',",
  "addressValue: '香港九龍観塘偉業街182号 成運工業ビル',"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Contact page address updated');
