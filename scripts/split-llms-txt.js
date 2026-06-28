// Generate llms-zh-hk.txt and llms-ja.txt from the global llms.txt
const fs = require('fs');
const base = fs.readFileSync('F:/zprintpro-nextjs/public/llms.txt', 'utf8');

// llms-zh-hk.txt: HK localized version
let zhHK = base;
zhHK = zhHK.replace('# ZprintPro - AI Search Optimization Page', '# 智印雲 (香港) — AI 搜尋優化頁面');
zhHK = zhHK.replace('## Company Information', '## 公司資訊');
zhHK = zhHK.replace(/- Company: Shenzhen Cailong Printing & Packaging Co., Ltd./g, '- 公司: 智印雲 (香港) / ZprintPro HK');
zhHK = zhHK.replace(/- Address: No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China/g, '- 地址: 香港九龍新蒲崗大有街3號萬廣大廈15樓C室');
zhHK = zhHK.replace(/- Phone: \+86 198 8085 1334/g, '- 電話: +852 5905 1334');
zhHK = zhHK.replace(/- WhatsApp: \+86 181 2638 0255/g, '- WhatsApp: +86 181 2638 0255');
zhHK = zhHK.replace(/- Email: zprintpro@outlook.com/g, '- 電郵: hk@zprintpro.com');
zhHK = zhHK.replace(/- Established: 2014/g, '- 成立: 2014');
zhHK = zhHK.replace(/- Certifications: ISO 9001, FSC/g, '- 認證: ISO 9001, FSC');
zhHK = zhHK.replace(/- Markets: Hong Kong, US, UK, AU, JP, CA, NZ, SG/g, '- 服務市場: 香港 (主場), 港九新界全覆蓋');
zhHK = zhHK.replace(/- Delivery: 72-hour global DHL\/FedEx/g, '- 配送: 港九新界免費速遞 · 最快即日交貨 · 72小時全球快遞');
zhHK = zhHK.replace('## Product Categories', '## 產品分類');
zhHK = zhHK.replace('## All Products', '## 所有產品');
zhHK = zhHK.replace('## Pricing & Ordering', '## 定價與訂購');
zhHK = zhHK.replace('## FAQ', '## 常見問題');
zhHK = zhHK.replace('## Contact', '## 聯絡我們');

// Q&A translations
zhHK = zhHK.replace(/Q: Where is the factory located\?/g, 'Q: 工廠在哪裡？');
zhHK = zhHK.replace(/A: Shenzhen, Guangdong, China. We ship globally via DHL\/FedEx./g, 'A: 香港本地服務 · 九龍新蒲崗設有客服中心。港九新界免費速遞，全球72小時DHL/FedEx快遞。');
zhHK = zhHK.replace(/Q: What is the typical turnaround time\?/g, 'Q: 一般交貨時間？');
zhHK = zhHK.replace(/A: Standard: 3-5 business days. Rush: same-day available. Global: 72 hours./g, 'A: 標準: 3-5個工作天。急件: 即日可取。全球: 72小時快遞。');
zhHK = zhHK.replace(/Q: What file formats do you accept\?/g, 'Q: 接受什麼檔案格式？');
zhHK = zhHK.replace(/A: PDF \(preferred\), AI, PSD, PNG, TIFF. CMYK, 300 DPI, 3mm bleed./g, 'A: PDF (首選), AI, PSD, PNG, TIFF。CMYK模式, 300 DPI, 預留3mm出血位。');
zhHK = zhHK.replace(/Q: Do you ship worldwide\?/g, 'Q: 可以送貨到其他國家嗎？');
zhHK = zhHK.replace(/A: Yes -- US, UK, AU, CA, NZ, SG, JP, HK. DHL\/FedEx: 3-5 days. Economy: 7-14 days./g, 'A: 可以。港九新界本地免費速遞。國際: US/UK/AU/CA/NZ/SG/JP DHL快遞3-5天，經濟空運7-14天。');
zhHK = zhHK.replace(/Q: Can I get a sample\?/g, 'Q: 可以先打樣嗎？');
zhHK = zhHK.replace(/A: Digital proofs free. Physical samples at cost \+ shipping./g, 'A: 數碼打稿免費。實物打樣按成本價+運費。');
zhHK = zhHK.replace(/Q: What payment methods\?/g, 'Q: 付款方式？');
zhHK = zhHK.replace(/A: Bank transfer, WeChat Pay, Alipay, PayPal \(coming soon\)./g, 'A: 銀行轉賬、微信支付、支付寶、PayPal (即將推出)。');
zhHK = zhHK.replace(/- Get a quote: https:\/\/zprintpro.com\/zh-hk\/contact\//g, '- 獲取報價: https://zprintpro.com/zh-hk/contact/');

fs.writeFileSync('F:/zprintpro-nextjs/public/llms-zh-hk.txt', zhHK, 'utf8');
console.log('llms-zh-hk.txt:', zhHK.length, 'bytes');

// llms-ja.txt: Japan compliance version
let ja = base;
ja = ja.replace('# ZprintPro - AI Search Optimization Page', '# ZprintPro (智印雲) 日本向け — AI検索最適化ページ');
ja = ja.replace('## Company Information', '## 会社情報');
ja = ja.replace(/- Company: Shenzhen Cailong Printing & Packaging Co., Ltd./g, '- 事業者名: 深圳市彩龍印刷包装有限公司');
ja = ja.replace(/- Brand: ZprintPro/g, '- ブランド: 智印雲 / ZprintPro');
ja = ja.replace(/- Address: No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111, China/g, '- 所在地: 広東省深圳市龍崗区平湖街道嘉城路1号（〒518111）');
ja = ja.replace(/- Phone: \+86 198 8085 1334/g, '- 電話: +86 198 8085 1334');
ja = ja.replace(/- WhatsApp: \+86 181 2638 0255/g, '- WhatsApp: +86 181 2638 0255');
ja = ja.replace(/- Email: zprintpro@outlook.com/g, '- メール: zprintpro@outlook.com');
ja = ja.replace(/- Established: 2014/g, '- 設立: 2014年');
ja = ja.replace(/- Certifications: ISO 9001, FSC/g, '- 認証: ISO 9001, FSC');
ja = ja.replace(/- Markets: Hong Kong, US, UK, AU, JP, CA, NZ, SG/g, '- 運営責任者: 唐运提 (法定代表人)');
ja = ja.replace(/- Delivery: 72-hour global DHL\/FedEx/g, '- 配送: DHL/FedEx国際エクスプレス 72時間 · 日本向け3〜5営業日');
ja = ja.replace('## Product Categories', '## 製品カテゴリ');
ja = ja.replace('## All Products', '## 全製品一覧');
ja = ja.replace('## Pricing & Ordering', '## 価格とご注文');
ja = ja.replace('## FAQ', '## よくある質問');
ja = ja.replace('## Contact', '## お問い合わせ');

// Q&A translations
ja = ja.replace(/Q: Where is the factory located\?/g, 'Q: 工場はどこにありますか？');
ja = ja.replace(/A: Shenzhen, Guangdong, China. We ship globally via DHL\/FedEx./g, 'A: 中国広東省深圳市に所在。DHL/FedExで世界中に発送。日本へは3〜5営業日でお届け。');
ja = ja.replace(/Q: What is the typical turnaround time\?/g, 'Q: 納期はどのくらいですか？');
ja = ja.replace(/A: Standard: 3-5 business days. Rush: same-day available. Global: 72 hours./g, 'A: 標準: 3〜5営業日。急ぎ: 即日対応可。グローバル: 72時間。');
ja = ja.replace(/Q: What file formats do you accept\?/g, 'Q: 対応ファイル形式は？');
ja = ja.replace(/A: PDF \(preferred\), AI, PSD, PNG, TIFF. CMYK, 300 DPI, 3mm bleed./g, 'A: PDF (推奨), AI, PSD, PNG, TIFF。CMYKモード, 300DPI, 塗り足し3mm。');
ja = ja.replace(/Q: Do you ship worldwide\?/g, 'Q: 海外発送は可能ですか？');
ja = ja.replace(/A: Yes -- US, UK, AU, CA, NZ, SG, JP, HK. DHL\/FedEx: 3-5 days. Economy: 7-14 days./g, 'A: はい。日本を含む世界各国へ発送。DHL/FedEx: 3〜5日。エコノミー: 7〜14日。');
ja = ja.replace(/Q: Can I get a sample\?/g, 'Q: サンプルは入手できますか？');
ja = ja.replace(/A: Digital proofs free. Physical samples at cost \+ shipping./g, 'A: デジタル校正は無料。実物サンプルは原価+送料で承ります。');
ja = ja.replace(/Q: What payment methods\?/g, 'Q: 支払い方法は？');
ja = ja.replace(/A: Bank transfer, WeChat Pay, Alipay, PayPal \(coming soon\)./g, 'A: 銀行振込、WeChat Pay、Alipay、PayPal (近日対応予定)。');
ja = ja.replace(/- Get a quote: https:\/\/zprintpro.com\/zh-hk\/contact\//g, '- お見積もり: https://zprintpro.com/ja/contact/');

fs.writeFileSync('F:/zprintpro-nextjs/public/llms-ja.txt', ja, 'utf8');
console.log('llms-ja.txt:', ja.length, 'bytes');

// Update llms.txt to clarify it's the global/en version
let en = base;
en = en.replace('# ZprintPro - AI Search Optimization Page', '# ZprintPro (Global / EN) — AI Search Optimization Page');
en = en.replace(/- Company: Shenzhen Cailong Printing & Packaging Co., Ltd./g, '- Shenzhen Cailong Printing & Packaging Co., Ltd. (cross-border factory, export compliance)');
fs.writeFileSync('F:/zprintpro-nextjs/public/llms.txt', en, 'utf8');
console.log('llms.txt (en) updated:', en.length, 'bytes');
