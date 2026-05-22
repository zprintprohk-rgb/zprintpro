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
    if (block[pos] === '\\' && pos + 1 < block.length) { result += block[pos + 1]; pos += 2; }
    else if (block[pos] === "'") return result;
    else { result += block[pos]; pos++; }
  }
  return null;
}

function getContentBlock(block) {
  const contentIdx = block.indexOf('content:');
  if (contentIdx === -1) return null;
  const braceOpen = block.indexOf('{', contentIdx);
  let depth = 1;
  let pos = braceOpen + 1;
  while (depth > 0 && pos < block.length) {
    if (block[pos] === "'") {
      pos++;
      while (pos < block.length) {
        if (block[pos] === '\\' && pos + 1 < block.length) pos += 2;
        else if (block[pos] === "'") { pos++; break; }
        else pos++;
      }
      continue;
    }
    if (block[pos] === '{') depth++;
    else if (block[pos] === '}') depth--;
    pos++;
  }
  return block.slice(contentIdx, pos);
}

function expandBlock(startLabel, nextLabel, zhAdd, enAdd, jaAdd) {
  const start = data.indexOf(startLabel);
  const end = data.indexOf(nextLabel, start + 1);
  let block = data.slice(start, end > 0 ? end : data.length);
  
  const contentBlock = getContentBlock(block);
  if (!contentBlock) return;
  
  let newContentBlock = contentBlock;
  const zh = extractString(contentBlock, "'zh-hk':");
  const en = extractString(contentBlock, "'en':");
  const ja = extractString(contentBlock, "'ja':");
  
  if (zh && zhAdd) {
    const old = "'zh-hk': '" + zh.replace(/'/g, "\\'") + "',";
    const nzh = zh.slice(0, zh.lastIndexOf('</p>') + 4) + zhAdd;
    newContentBlock = newContentBlock.replace(old, "'zh-hk': '" + nzh.replace(/'/g, "\\'") + "',");
  }
  if (en && enAdd) {
    const old = "'en': '" + en.replace(/'/g, "\\'") + "',";
    const nen = en.slice(0, en.lastIndexOf('</p>') + 4) + enAdd;
    newContentBlock = newContentBlock.replace(old, "'en': '" + nen.replace(/'/g, "\\'") + "',");
  }
  if (ja && jaAdd) {
    const old = "'ja': '" + ja.replace(/'/g, "\\'") + "',";
    const nja = ja.slice(0, ja.lastIndexOf('</p>') + 4) + jaAdd;
    newContentBlock = newContentBlock.replace(old, "'ja': '" + nja.replace(/'/g, "\\'") + "',");
  }
  
  block = block.replace(contentBlock, newContentBlock);
  data = data.slice(0, start) + block + data.slice(end > 0 ? end : data.length);
}

// ===================== PILLARS =====================

// sticker-guide needs: zh +159, en +725
expandBlock("export const stickerGuidePillar", "export const flyerGuidePillar",
  '<h2>香港貼紙印刷的創新應用</h2><p>除了傳統的品牌標識與產品標籤，貼紙在香港市場中還有許多創新應用。活動入場手環貼紙能實現快速身份驗證與分區管理；NFC 智能貼紙可讓消費者用手機一觸即達產品資訊頁；防偽貼紙配合全息圖案與微縮文字，能有效打擊假冒產品。對於藝術家與設計師，限量藝術貼紙已成為新興的收藏品類別，智印云支持全彩數碼印刷與特殊工藝，讓創意不受限制。</p><h2>如何選擇可靠的香港貼紙印刷供應商</h2><p>選擇貼紙印刷供應商時，應重點考察四個維度：設備先進性（是否配備 HP Indigo 或 Epson 高精度數碼印刷機）、材料庫存（是否常備多種基材與膠水類型）、打樣能力（能否在 24 小時內提供實物樣品）以及交付可靠性（準時交付率是否達到 95% 以上）。智印云在這四個維度上均達到行業領先水平，為超過 500 家香港本地品牌提供持續穩定的貼紙供應服務。</p>',
  '<h2>Innovative Sticker Applications in Hong Kong</h2><p>Beyond traditional brand labels and product tags, stickers have numerous innovative applications in the Hong Kong market. Event wristband stickers enable rapid identity verification and zone management; NFC smart stickers let consumers access product information pages with a single phone tap; anti-counterfeit stickers with holographic patterns and microtext effectively combat counterfeit products. For artists and designers, limited edition art stickers have become an emerging collectible category. ZPrintPro supports full-color digital printing and special finishes, ensuring creativity knows no bounds.</p><h2>How to Choose a Reliable Hong Kong Sticker Printing Supplier</h2><p>When selecting a sticker printing supplier, evaluate four key dimensions: equipment advancement (HP Indigo or Epson high-precision digital printers), material inventory (diverse substrates and adhesive types), prototyping capability (physical samples within 24 hours), and delivery reliability (on-time rate above 95%). ZPrintPro leads the industry across all four dimensions, providing consistent sticker supply services to over 500 Hong Kong local brands.</p>',
  null);

// flyer-guide needs: zh +562, en +862
expandBlock("export const flyerGuidePillar", "export const packagingGuidePillar",
  '<h2>傳單設計的常見錯誤與避坑指南</h2><p>許多品牌在傳單設計中犯了三個常見錯誤：一是信息過載，試圖在單張傳單上塞入所有產品信息，導致消費者無法在 3 秒內抓住重點；二是忽視行動號召（CTA），傳單上沒有明確的「下一步」指引，消費者閱讀後不知道該做什麼；三是忽略紙質與工藝的質感傳遞，使用過薄的紙張或低質量的印刷，讓品牌顯得廉價。避免這些錯誤的關鍵在於：每張傳單只傳遞一個核心信息、CTA 必須醒目且可執行、紙質選擇應與品牌定位匹配。</p><h2>香港傳單印刷的法規注意事項</h2><p>在香港派發傳單時，需注意《公眾衛生及市政條例》的相關規定。未經許可在私人處所或政府物業範圍內派發傳單可能面臨檢控。此外，傳單內容不得包含虛假或誤導性陳述，否則可能違反《商品說明條例》。建議品牌在派發前諮詢法律意見，確保傳單內容合規，並選擇合法的派發地點與方式。</p>',
  '<h2>Common Flyer Design Mistakes to Avoid</h2><p>Many brands make three common mistakes in flyer design: information overload, attempting to cram all product details onto a single flyer so consumers cannot grasp the key point within 3 seconds; neglecting the call-to-action (CTA), leaving consumers unsure what to do after reading; and ignoring paper quality and finishing, using thin stock or low-quality printing that makes the brand appear cheap. Avoiding these mistakes requires focusing on one core message per flyer, making the CTA prominent and actionable, and selecting paper stock that aligns with brand positioning.</p><h2>Hong Kong Flyer Distribution Regulations</h2><p>When distributing flyers in Hong Kong, be aware of regulations under the Public Health and Municipal Services Ordinance. Distributing flyers on private premises or government property without permission may result in prosecution. Additionally, flyer content must not contain false or misleading statements, which could violate the Trade Descriptions Ordinance. Brands should seek legal advice before distribution to ensure compliance and choose legitimate distribution locations and methods.</p>',
  '<h2>チラシデザインのよくあるミスと回避ガイド</h2><p>多くのブランドがチラシデザインで3つのよくあるミスを犯しています。1つ目は情報過多で、すべての製品情報を1枚のチラシに詰め込もうとし、消費者が3秒以内に要点をつかめないようにします。2つ目は行動喚起（CTA）の無視で、読んだ後に何をすべきかわからなくなります。3つ目は紙質と加工の質感の無視です。これらのミスを避けるには、1枚のチラシに1つの核心メッセージに集中し、CTAを目立たせて実行可能にし、ブランドポジショニングに合った紙質を選択することが重要です。</p><h2>香港のチラシ配布規制</h2><p>香港でチラシを配布する際は、公衆衛生及び市政条例の規制に注意する必要があります。許可なく私有地や政府資産内でチラシを配布すると、告発される可能性があります。また、チラシの内容に虚偽または誤解を招く表示を含めることは、商品説明条例に違反する可能性があります。配布前に法的助言を求め、コンプライアンスを確保してください。</p>');

// packaging-guide needs: zh +0, en +698
expandBlock("export const packagingGuidePillar", "export const stickerMaterialsCluster",
  null,
  '<h2>Packaging Prototyping and Sampling</h2><p>Before committing to mass production, packaging prototyping is essential for verifying structural integrity, visual appeal, and user experience. ZPrintPro offers rapid packaging prototyping with 3-5 working day turnaround, allowing brands to test multiple box structures, paper weights, and finishing combinations at minimal cost. For rigid boxes, we provide structural mockups using actual production materials so clients can evaluate opening mechanics and magnetic closure strength. For folding cartons, flat dieline proofs ensure artwork alignment and fold accuracy before full production.</p><h2>Sustainable Packaging Solutions for Hong Kong Brands</h2><p>Sustainability is no longer optional for Hong Kong brands. Consumers increasingly demand eco-friendly packaging that minimizes environmental impact without compromising aesthetics. ZPrintPro offers a comprehensive range of sustainable options: recycled paper stocks with up to 100% post-consumer waste content, water-based coatings that eliminate harmful VOC emissions, and compostable packaging films for flexible packaging needs. We also provide packaging carbon footprint assessments, helping brands quantify and communicate their environmental commitments to increasingly conscious consumers.</p>',
  '<h2>包装の試作とサンプリング</h2><p>量産に着手する前に、包装の試作は構造的完全性、視覚的魅力、ユーザー体験を検証するために不可欠です。智印云は3〜5営業日の迅速な包装試作を提供し、ブランドが最小限のコストで複数の箱構造、紙の厚さ、加工の組み合わせをテストできるようにします。化粧箱には、実際の生産素材を使用した構造モックアップを提供し、クライアントが開封の仕組みや磁石の閉鎖強度を評価できます。組み立て箱には、全面生産前にアートワークの整合性と折りの正確性を確認するフラットダイラインプルーフを提供します。</p><h2>香港ブランドのための持続可能な包装ソリューション</h2><p>持続可能性は香港のブランドにとってもはやオプションではありません。消費者はますます、美学を損なわずに環境影響を最小限に抑えるエコフレンドリーな包装を求めています。智印云は包括的な持続可能なオプションを提供しています：消費後廃棄物100%のリサイクル紙、有害なVOC排出を排除する水性コーティング、柔軟包装用の堆肥化可能な包装フィルムです。また、包装の炭素フットプリント評価も提供し、ブランドが環境への取り組みを定量化して伝えることを支援します。</p>');

// ===================== CLUSTERS =====================
const clusterEnAdd = '<h2>Cost-Benefit Analysis</h2><p>Understanding the cost-benefit balance is essential for making informed printing decisions. While premium materials and finishes increase per-unit costs, they often deliver disproportionate returns through enhanced brand perception, higher customer retention rates, and increased social media sharing. For startups with limited budgets, we recommend prioritizing one premium element rather than spreading resources thinly across multiple mediocre choices. Track your campaign metrics rigorously: measure redemption rates for promotional flyers, monitor unboxing video mentions for packaging, and survey customers about sticker appeal. This data-driven approach ensures every dollar spent on printing generates measurable business value.</p>';
const clusterZhAdd = '<h2>成本效益分析</h2><p>理解成本效益平衡對於做出明智的印刷決策至關重要。雖然高級材料和工藝會增加單位成本，但它們往往通過提升品牌認知、提高客戶留存率和增加社交媒體分享來帶來不成比例的回報。對於預算有限的初創品牌，我們建議優先投資一個高級元素，而不是將資源分散在多個平庸的選擇上。嚴格追踪您的活動指標：測量促銷傳單的兌換率、監控包裝的開箱視頻提及量、調查客戶對貼紙吸引力的反饋。這種數據驅動的方法能確保每一分印刷投入都產生可衡量的商業價值。</p>';
const clusterJaAdd = '<h2>コスト效益分析</h2><p>コスト效益のバランスを理解することは、適切な印刷判断を下すために不可欠です。高級素材や加工は単価を上げますが、ブランド認知の向上、顧客維持率の向上、ソーシャルメディアでのシェア増加を通じて、不釣り合いなリターンをもたらすことが多いです。予算が限られたスタートアップには、複数の平庸な選択に資源を分散するのではなく、1つの高級要素を優先することをお勧めします。プロモーションチラシの引換率、包装の開封動画の言及数、シールの魅力に関する顧客調査を厳密に追跡してください。このデータ駆動型のアプローチにより、印刷への每一分の投資が測定可能なビジネス価値を生み出します。</p>';

const clusters = [
  ["export const stickerMaterialsCluster", "export const stickerPackagingDesignCluster"],
  ["export const stickerPackagingDesignCluster", "export const clearVsMatteStickersCluster"],
  ["export const clearVsMatteStickersCluster", "export const flyerSizesComparedCluster"],
  ["export const flyerSizesComparedCluster", "export const flyerDistributionStrategyCluster"],
  ["export const flyerDistributionStrategyCluster", "export const foilFlyersIndustryCluster"],
  ["export const foilFlyersIndustryCluster", "export const rigidVsFoldingBoxesCluster"],
  ["export const rigidVsFoldingBoxesCluster", "export const ecoPaperBagGsmCluster"],
  ["export const ecoPaperBagGsmCluster", "export const packagingColorPsychologyCluster"],
  ["export const packagingColorPsychologyCluster", "export const pillars:"],
];

for (const [start, next] of clusters) {
  expandBlock(start, next, clusterZhAdd, clusterEnAdd, clusterJaAdd);
}

fs.writeFileSync('src/data/pillar-content.ts', data);
console.log('Mass expansion v2 complete.');
