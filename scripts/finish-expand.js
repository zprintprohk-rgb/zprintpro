const fs = require('fs');
let data = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function extractString(block, label) {
  const idx = block.indexOf(label);
  if (idx === -1) return null;
  let pos = idx + label.length;
  while (pos < block.length && /\s/.test(block[pos])) pos++;
  if (block[pos] !== "'") return null;
  pos++;
  let result = '';
  while (pos < block.length) {
    if (block[pos] === '\\' && pos + 1 < block.length) {
      result += block[pos + 1]; pos += 2;
    } else if (block[pos] === "'") {
      return result;
    } else {
      result += block[pos]; pos++;
    }
  }
  return null;
}

function findBlock(startLabel, nextLabel) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  return { start, end: end > 0 ? end : data.length, block: data.slice(start, end > 0 ? end : data.length) };
}

function replaceInBlock(item, zhAdd, enAdd, jaAdd) {
  const { start, end, block } = findBlock(item.start, item.next);
  let newBlock = block;
  
  const contentIdx = newBlock.indexOf('content:');
  const contentBrace = newBlock.indexOf('{', contentIdx);
  let depth = 1;
  let pos = contentBrace + 1;
  while (depth > 0 && pos < newBlock.length) {
    if (newBlock[pos] === "'") {
      pos++;
      while (pos < newBlock.length) {
        if (newBlock[pos] === '\\' && pos + 1 < newBlock.length) pos += 2;
        else if (newBlock[pos] === "'") { pos++; break; }
        else pos++;
      }
      continue;
    }
    if (newBlock[pos] === '{') depth++;
    else if (newBlock[pos] === '}') depth--;
    pos++;
  }
  const contentBlock = newBlock.slice(contentIdx, pos);
  
  let zh = extractString(contentBlock, "'zh-hk':");
  let en = extractString(contentBlock, "'en':");
  let ja = extractString(contentBlock, "'ja':");
  
  if (zh && zhAdd) {
    const old = "'zh-hk': '" + zh.replace(/'/g, "\\'") + "',";
    zh = zh.slice(0, zh.lastIndexOf('</p>') + 4) + zhAdd;
    const rep = "'zh-hk': '" + zh.replace(/'/g, "\\'") + "',";
    newBlock = newBlock.replace(old, rep);
  }
  if (en && enAdd) {
    const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
    en = en.slice(0, en.lastIndexOf('</p>') + 4) + enAdd;
    const rep = "'en': '" + en.replace(/'/g, "\\'") + "',";
    newBlock = newBlock.replace(old, rep);
  }
  if (ja && jaAdd) {
    const old = "'ja': '" + ja.replace(/'/g, "\\'") + "',";
    ja = ja.slice(0, ja.lastIndexOf('</p>') + 4) + jaAdd;
    const rep = "'ja': '" + ja.replace(/'/g, "\\'") + "',";
    newBlock = newBlock.replace(old, rep);
  }
  
  data = data.slice(0, start) + newBlock + data.slice(end);
}

// Stickers that need expansion
const stickerGuideZhAdd = '<h2>貼紙印刷的品質控制要點</h2><p>高品質的貼紙印刷不僅取決於設備與材料，更依賴於嚴格的品質控制流程。在智印云，每批貼紙在出貨前都經過三道檢驗：首件確認、過程抽檢與全檢出貨。首件確認確保色彩與設計稿一致；過程抽檢監控批量生產中的色差與套位偏差；全檢出貨則確保每一張貼紙無污點、無翹邊、無殘膠。對於需要長期戶外使用的貼紙，我們還提供加速老化測試，模擬六個月的日曬雨淋環境，確保產品在實際使用中不褪色、不開裂。</p><h2>香港貼紙印刷的環保趨勢</h2><p>隨著香港消費者環保意識的提升，可持續包裝已成為品牌差異化的重要策略。智印云提供 FSC 認證紙張、大豆油墨與可降解覆膜選項，幫助品牌降低碳足跡。對於追求極致環保的客戶，我們還提供無覆膜啞面貼紙，以天然紙張質感傳遞品牌對環境的承諾。選擇環保材料不僅是企業社會責任的體現，更能吸引注重可持續消費的千禧世代與 Z 世代客戶群體。</p>';
const stickerGuideEnAdd = '<h2>Sticker Printing Quality Control</h2><p>High-quality sticker printing depends not only on equipment and materials but also on rigorous quality control processes. At ZPrintPro, every batch undergoes three inspections before shipment: first-piece confirmation, in-process sampling, and full inspection. First-piece confirmation ensures color accuracy against design proofs; in-process sampling monitors color drift and registration deviation during mass production; full inspection guarantees every sticker is free from stains, curling, or adhesive residue. For outdoor stickers, we also offer accelerated aging tests that simulate six months of sun and rain exposure to ensure real-world durability without fading or cracking.</p><h2>Environmental Trends in Hong Kong Sticker Printing</h2><p>As Hong Kong consumer environmental awareness grows, sustainable packaging has become a key brand differentiator. ZPrintPro offers FSC-certified paper, soy-based inks, and biodegradable lamination options to help brands reduce their carbon footprint. For clients pursuing maximum sustainability, we provide unlaminated matte stickers that communicate environmental commitment through natural paper texture. Choosing eco-friendly materials is not only corporate social responsibility but also attracts millennial and Gen-Z consumers who prioritize sustainable purchasing.</p>';

const flyerGuideEnAdd = '<h2>Flyer Design Psychology Principles</h2><p>Successful flyer design is not merely an aesthetic issue—it is applied psychology. Research shows consumers decide whether to keep or discard a flyer within 3 seconds of receiving it. Therefore, the "golden triangle"—approximately 60% of the area from upper-left to lower-right—must contain the most critical information: brand name, core selling point, and call-to-action (CTA). For color, high-contrast palettes increase readership by 40%; for typography, sans-serif headlines like Source Han Sans improve long-distance recognition by 25%. ZPrintPro\'s design team understands Hong Kong consumer psychology and provides data-driven design recommendations for your flyers.</p><h2>Flyer Paper and Finishing Options</h2><p>157gsm art paper is the standard choice for Hong Kong flyer printing, balancing cost and print quality. For brands requiring premium texture, 200gsm+ stock communicates professionalism and trustworthiness. Matte lamination reduces light reflection for outdoor or bright environments; glossy lamination delivers more vibrant, saturated colors ideal for F&B and entertainment brands. Spot UV coating adds dimensional gloss to logos or key graphics, making flyers stand out from stacks. For high-end event invitations, foil stamping combined with heavy stock is a proven luxury combination.</p><h2>Digital vs Offset Printing</h2><p>Digital printing requires no plates, making it ideal for small runs (10-500 pieces) and urgent orders with 24-hour turnaround from file confirmation. Traditional offset requires plate-making but becomes cost-effective for large runs (1,000+), with per-unit costs dropping significantly as volume increases. For promotions requiring frequent design changes, digital printing\'s flexibility is irreplaceable; for stable long-term brand campaigns, offset\'s unit cost advantage becomes more pronounced.</p>';
const flyerGuideJaAdd = '<h2>チラシ印刷の品質管理</h2><p>高品質のチラシ印刷は、設備と素材だけでなく厳格な品質管理プロセスに依存しています。智印云では、出荷前に全バッチが3段階の検査を受けます。デザイン稿との色の一致を保証し、量産中の色ずれを監視します。全数検査は各チラシに汚れや折れがないことを保証します。</p><h2>香港チラシ印刷の環境トレンド</h2><p>香港の消費者の環境意識の高まりに伴い、持続可能な印刷はブランド差別化の重要な戦略となっています。智印云はFSC認証紙と大豆油墨を提供し、ブランドの炭素フットプリント削減をサポートします。</p>';

const packagingGuideEnAdd = '<h2>Packaging Surface Finishing Options</h2><p>Surface finishing is the key variable determining packaging texture quality. Matte lamination eliminates light reflection, presenting a silky, refined tactile feel ideal for premium skincare and minimalist brands. Gloss lamination delivers more vibrant, saturated colors, suitable for products requiring strong visual impact. Soft-touch film is a newer technology that simulates velvet-like texture, creating an instant "this is premium" perception when consumers touch the packaging. Spot UV coating adds dimensional gloss to logos or key graphics, creating strong tactile contrast with surrounding matte areas that makes products automatically "pop" on shelves.</p><h2>Regulatory Compliance in Packaging Design</h2><p>Hong Kong has strict regulations for food packaging, including ingredient labeling, allergen warnings, net content, production dates, and best-before dates. This information must be presented in both Chinese and English with font sizes no smaller than 1.2mm. Products exported to the EU must also comply with the EU Packaging Directive\'s environmental requirements, including recyclability labeling and Extended Producer Responsibility (EPR). ZPrintPro\'s design team is familiar with Hong Kong and international packaging regulations, ensuring compliance at the design stage to avoid post-launch recalls due to labeling issues.</p><h2>Logistics and Warehousing for Hong Kong Packaging</h2><p>Hong Kong\'s expensive warehousing environment poses unique challenges for packaging inventory management. Folding cartons store flat with 3x the volume efficiency of rigid boxes. For e-commerce brands, we recommend an "on-demand printing" model: maintain minimal finished inventory and dynamically adjust order quantities based on sales data. ZPrintPro offers inventory hosting services—clients can store packaging boxes at our Kwun Tong warehouse and pull stock as needed, saving valuable warehousing space and rental costs.</p>';
const packagingGuideZhAdd = '<h2>包裝盒的表面工藝選擇</h2><p>表面工藝是決定包裝盒質感層次的關鍵變量。啞膜能消除光線反射，呈現絲滑細膩的觸感，適合高端護膚品與極簡設計品牌。亮膜則讓色彩更加鮮豔飽和，適合需要強烈視覺衝擊的產品。觸感膜能模擬絲絨般的觸感，讓消費者在觸摸包裝的瞬間產生高級認知。局部 UV 上光能讓 Logo 產生立體凸感，與周圍的啞面形成強烈的質感對比。</p><h2>包裝設計中的法規合規要點</h2><p>香港對食品包裝有嚴格的法規要求，包括成分標示、過敏原提示、淨含量、生產日期與最佳食用期限等。這些信息必須以中文及英文雙語呈現，字體大小不得小於 1.2mm。出口至歐盟的產品還需符合 EU Packaging Directive 的環保要求。智印云的設計團隊熟悉香港及國際包裝法規，能在設計階段即確保您的包裝合規。</p><h2>香港包裝印刷的物流與倉儲建議</h2><p>香港寸土寸金的倉儲環境對包裝庫存管理提出了獨特挑戰。摺疊盒能以平張狀態存儲，體積利用率是磁吸禮盒的 3 倍。對於電商品牌，建議採用「按需印刷」模式：保持少量成品庫存，根據銷售數據動態調整訂單量。智印云提供庫存托管服務，客戶可將包裝盒存放在我們的觀塘倉庫，按需提貨，節省寶貴的倉儲空間與租金成本。</p>';

// Apply replacements
replaceInBlock({ start: "export const stickerGuidePillar", next: "export const flyerGuidePillar" }, stickerGuideZhAdd, stickerGuideEnAdd, null);
replaceInBlock({ start: "export const flyerGuidePillar", next: "export const packagingGuidePillar" }, null, flyerGuideEnAdd, flyerGuideJaAdd);
replaceInBlock({ start: "export const packagingGuidePillar", next: "export const stickerMaterialsCluster" }, packagingGuideZhAdd, packagingGuideEnAdd, null);

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Done');
