const fs = require('fs');

let content = fs.readFileSync('src/data/pillar-content.ts', 'utf-8');

function expandContent(contentStr, additions) {
  // Insert additions before the final CTA paragraph (which contains 獲取/報價/Get quotes/お見積)
  const patterns = [
    /<p>(?:了解更多|掌握更多|探索更多|想為你的產品|了解傳單印刷的更多|請參閱|瀏覽).*?<\/p>$/,
    /<p>For more (?:applications|flyer strategies|the complete strategy|help choosing).*?<\/p>$/,
    /<p>詳しくは<a href="\/{locale}\/guide\/[^"]+">[^<]+<\/a>をご覧ください。<\/p>$/,
    /<p>詳しくは<a href="\/{locale}\/guide\/[^"]+">[^<]+<\/a>。.*<\/p>$/,
    /<p>了解更多.*<\/p>$/,
    /<p>探索更多.*<\/p>$/,
    /<p>立即獲取.*<\/p>$/,
    /<p>無論您需要.*<\/p>$/,
    /<p>Get quotes for.*<\/p>$/,
    /<p>Learn more in our.*<\/p>$/,
    /<p>Explore more.*<\/p>$/,
    /<p>Master more.*<\/p>$/,
    /<p>Need help choosing.*<\/p>$/,
    /<p>智印港.*<\/p>$/,
    /<p>当社.*<\/p>$/,
    /<p>ZPrintPro.*<\/p>$/,
  ];
  
  for (const pattern of patterns) {
    const match = contentStr.match(pattern);
    if (match) {
      const insertPos = match.index;
      return contentStr.slice(0, insertPos) + additions + contentStr.slice(insertPos);
    }
  }
  // Fallback: append before closing </p> of last paragraph
  const lastP = contentStr.lastIndexOf('</p>');
  if (lastP > 0) {
    return contentStr.slice(0, lastP + 4) + additions;
  }
  return contentStr + additions;
}

function replaceInFile(zhOld, zhNew, enOld, enNew, jaOld, jaNew) {
  content = content.replace(zhOld, zhNew);
  content = content.replace(enOld, enNew);
  content = content.replace(jaOld, jaNew);
}

// === STICKER-GUIDE PILLAR EXPANSIONS ===
const sgZhAdd = '<h2>貼紙印刷的品質控制要點</h2><p>高品質的貼紙印刷不僅取決於設備與材料，更依賴於嚴格的品質控制流程。在智印港，每批貼紙在出貨前都經過三道檢驗：首件確認、過程抽檢與全檢出貨。首件確認確保色彩與設計稿一致；過程抽檢監控批量生產中的色差與套位偏差；全檢出貨則確保每一張貼紙無污點、無翹邊、無殘膠。對於需要長期戶外使用的貼紙，我們還提供加速老化測試，模擬六個月的日曬雨淋環境，確保產品在實際使用中不褪色、不開裂。</p><h2>香港貼紙印刷的環保趨勢</h2><p>隨著香港消費者環保意識的提升，可持續包裝已成為品牌差異化的重要策略。智印港提供 FSC 認證紙張、大豆油墨與可降解覆膜選項，幫助品牌降低碳足跡。對於追求極致環保的客戶，我們還提供無覆膜啞面貼紙，以天然紙張質感傳遞品牌對環境的承諾。選擇環保材料不僅是企業社會責任的體現，更能吸引注重可持續消費的千禧世代與 Z 世代客戶群體。</p>';

const sgEnAdd = '<h2>Sticker Printing Quality Control</h2><p>High-quality sticker printing depends not only on equipment and materials but also on rigorous quality control processes. At ZPrintPro, every batch undergoes three inspections before shipment: first-piece confirmation, in-process sampling, and full inspection. First-piece confirmation ensures color accuracy against design proofs; in-process sampling monitors color drift and registration deviation during mass production; full inspection guarantees every sticker is free from stains, curling, or adhesive residue. For outdoor stickers, we also offer accelerated aging tests that simulate six months of sun and rain exposure to ensure real-world durability without fading or cracking.</p><h2>Environmental Trends in Hong Kong Sticker Printing</h2><p>As Hong Kong consumer environmental awareness grows, sustainable packaging has become a key brand differentiator. ZPrintPro offers FSC-certified paper, soy-based inks, and biodegradable lamination options to help brands reduce their carbon footprint. For clients pursuing maximum sustainability, we provide unlaminated matte stickers that communicate environmental commitment through natural paper texture. Choosing eco-friendly materials is not only corporate social responsibility but also attracts millennial and Gen-Z consumers who prioritize sustainable purchasing.</p>';

const sgJaAdd = '<h2>シール印刷の品質管理の要点</h2><p>高品質のシール印刷は、設備と素材だけでなく、厳格な品質管理プロセスに依存しています。智印港では、出荷前に全バッチが3段階の検査を受けます：初品確認、工程中の抜取検査、全数検査です。初品確認はデザイン稿との色の一致を保証します。工程中の抜取検査は量産中の色ずれと套位の偏差を監視します。全数検査は各シールに汚れ、めくれ、残り膠がないことを保証します。長期屋外使用が必要なシールには、6か月の日差しと雨をシミュレートした加速老化テストも提供し、実際の使用環境で褪色や割れが生じないことを確認します。</p><h2>香港シール印刷の環境トレンド</h2><p>香港の消費者の環境意識の高まりに伴い、持続可能な包装はブランド差別化の重要な戦略となっています。智印港はFSC認証紙、大豆油墨、生分解性ラミネートオプションを提供し、ブランドの炭素フットプリント削減をサポートします。極限の環境配慮を追求するクライアントには、天然紙の質感で環境への取り組みを伝える無ラミネートマットシールも提供しています。環境に優しい素材を選ぶことは、企業の社会的責任だけでなく、持続可能な消費を優先するミレニアル世代とZ世代の顧客層を引きつけることにもなります。</p>';

// === FLYER-GUIDE PILLAR EXPANSIONS ===
const fgZhAdd = '<h2>傳單設計的心理學原則</h2><p>成功的傳單設計不僅是美學問題，更是一門應用心理學。研究顯示，消費者在接過傳單後的 3 秒內決定是否保留或丟棄。因此，傳單的「黃金三角區」—左上角到右下角約 60% 的區域—必須包含最核心的信息：品牌名稱、核心賣點與行動號召（CTA）。色彩方面，高對比度的配色能將閱讀率提升 40%；字體方面，標題使用無襯線黑體（如思源黑體）能提升 25% 的遠距離辨識度。智印港的設計團隊熟悉香港本地消費者的心理特徵，能為您的傳單提供基於數據的設計建議。</p><h2>傳單印刷的紙質與工藝選擇</h2><p>157g 銅版紙是香港傳單印刷的標準選擇，兼顧成本與印刷效果。對於需要更高質感的品牌，200g 以上的厚紙能傳遞專業與可信賴的品牌形象。啞膜處理能減少光線反射，適合在戶外或強光環境下閱讀；亮膜則能讓色彩更加鮮豔飽和，適合餐飲與娛樂品牌。局部 UV 工藝能讓傳單上的 Logo 或核心圖案產生立體光澤，在成堆的傳單中脫穎而出。對於高端活動邀請函，燙金配合厚紙是經過驗證的奢華組合。</p><h2>數碼印刷與傳統膠印的選擇</h2><p>數碼印刷無需製版，適合少批量（10-500 張）與急件訂單，從文件確認到成品交付最快 24 小時。傳統膠印則需要製版，適合大批量（1,000 張以上）訂單，單張成本隨數量增加而顯著下降。對於需要頻繁更換設計的促銷活動，數碼印刷的靈活性是無可替代的優勢；而對於長期穩定的品牌宣傳，膠印的單位成本優勢則更加明顯。</p>';

const fgEnAdd = '<h2>Flyer Design Psychology Principles</h2><p>Successful flyer design is not merely an aesthetic issue—it is applied psychology. Research shows consumers decide whether to keep or discard a flyer within 3 seconds of receiving it. Therefore, the "golden triangle"—approximately 60% of the area from upper-left to lower-right—must contain the most critical information: brand name, core selling point, and call-to-action (CTA). For color, high-contrast palettes increase readership by 40%; for typography, sans-serif headlines like Source Han Sans improve long-distance recognition by 25%. ZPrintPro\'s design team understands Hong Kong consumer psychology and provides data-driven design recommendations for your flyers.</p><h2>Flyer Paper and Finishing Options</h2><p>157gsm art paper is the standard choice for Hong Kong flyer printing, balancing cost and print quality. For brands requiring premium texture, 200gsm+ stock communicates professionalism and trustworthiness. Matte lamination reduces light reflection for outdoor or bright environments; glossy lamination delivers more vibrant, saturated colors ideal for F&B and entertainment brands. Spot UV coating adds dimensional gloss to logos or key graphics, making flyers stand out from stacks. For high-end event invitations, foil stamping combined with heavy stock is a proven luxury combination.</p><h2>Digital vs Offset Printing</h2><p>Digital printing requires no plates, making it ideal for small runs (10-500 pieces) and urgent orders with 24-hour turnaround from file confirmation. Traditional offset requires plate-making but becomes cost-effective for large runs (1,000+), with per-unit costs dropping significantly as volume increases. For promotions requiring frequent design changes, digital printing\'s flexibility is irreplaceable; for stable long-term brand campaigns, offset\'s unit cost advantage becomes more pronounced.</p>';

const fgJaAdd = '<h2>チラシデザインの心理学原則</h2><p>成功したチラシデザインは、美学的な問題だけでなく応用心理学でもあります。研究によると、消費者はチラシを受け取ってから3秒以内に保持するか廃棄するかを決定します。したがって、「ゴールデントライアングル」—左上から右下までの約60%の領域—には最も重要な情報を含める必要があります：ブランド名、核心セールスポイント、行動喚起（CTA）です。色彩では高コントラストの配色が読者率を40%向上させ、書体では思源ゴシックのようなサンセリフの見出しが遠距離認識を25%向上させます。智印港のデザインチームは香港の消費者心理を理解し、データに基づいたデザイン提案を提供します。</p><h2>チラシの紙質と加工オプション</h2><p>157gコート紙は香港のチラシ印刷の標準選択で、コストと印刷品質のバランスが取れています。より高級な質感が必要なブランドには、200g以上の厚紙が専門性と信頼性を伝えます。マットラミネートは光の反射を減らし、屋外や明るい環境に適しています。グロスラミネートはより鮮やかで彩度の高い色彩を実現し、飲食やエンターテイメントブランドに最適です。局部UVコーティングはロゴや核心グラフィックに立体的な光沢を加え、山積みのチラシの中で際立ちます。高級イベントの招待状には、厚紙との組み合わせた箔押しが実績のある高級仕様です。</p><h2>デジタル印刷とオフセット印刷の選択</h2><p>デジタル印刷は版不要で、少ロット（10〜500枚）と急ぎの注文に最適で、ファイル確認後24時間以内の納品が可能です。従来のオフセット印刷は製版が必要ですが、大量（1,000枚以上）の注文でコスト効率が高まり、数量増加に伴い単価が大幅に低下します。頻繁にデザイン変更が必要なプロモーションでは、デジタル印刷の柔軟性は代替できない利点です。長期的で安定したブランドキャンペーンでは、オフセットの単価メリットがより顕著になります。</p>';

// === PACKAGING-GUIDE PILLAR EXPANSIONS ===
const pgZhAdd = '<h2>包裝盒的表面工藝選擇</h2><p>表面工藝是決定包裝盒質感層次的關鍵變量。啞膜（Matte Lamination）能消除光線反射，呈現絲滑細膩的觸感，適合高端護膚品與極簡設計品牌。亮膜（Gloss Lamination）則讓色彩更加鮮豔飽和，適合需要強烈視覺衝擊的產品。觸感膜（Soft-touch Film）是一種較新的工藝，能模擬絲絨般的觸感，讓消費者在觸摸包裝的瞬間產生「這是高級產品」的認知。局部 UV 上光能讓 Logo 或核心圖案產生立體凸感，與周圍的啞面形成強烈的質感對比，使產品在貨架上自動「跳出」。</p><h2>包裝設計中的法規合規要點</h2><p>香港對食品包裝有嚴格的法規要求，包括成分標示、過敏原提示、淨含量、生產日期與最佳食用期限等。這些信息必須以中文及英文雙語呈現，字體大小不得小於 1.2mm。出口至歐盟的產品還需符合 EU Packaging Directive 的環保要求，包括包裝材料的可回收性標示與生產者責任延伸（EPR）制度。智印港的設計團隊熟悉香港及國際包裝法規，能在設計階段即確保您的包裝合規，避免產品上架後因標籤問題被召回。</p><h2>香港包裝印刷的物流與倉儲建議</h2><p>香港寸土寸金的倉儲環境對包裝庫存管理提出了獨特挑戰。摺疊盒能以平張狀態存儲，體積利用率是磁吸禮盒的 3 倍。對於電商品牌，建議採用「按需印刷」模式：保持少量成品庫存，根據銷售數據動態調整訂單量。智印港提供庫存托管服務，客戶可將包裝盒存放在我們的觀塘倉庫，按需提貨，節省寶貴的倉儲空間與租金成本。</p>';

const pgEnAdd = '<h2>Packaging Surface Finishing Options</h2><p>Surface finishing is the key variable determining packaging texture quality. Matte lamination eliminates light reflection, presenting a silky, refined tactile feel ideal for premium skincare and minimalist brands. Gloss lamination delivers more vibrant, saturated colors, suitable for products requiring strong visual impact. Soft-touch film is a newer technology that simulates velvet-like texture, creating an instant "this is premium" perception when consumers touch the packaging. Spot UV coating adds dimensional gloss to logos or key graphics, creating strong tactile contrast with surrounding matte areas that makes products automatically "pop" on shelves.</p><h2>Regulatory Compliance in Packaging Design</h2><p>Hong Kong has strict regulations for food packaging, including ingredient labeling, allergen warnings, net content, production dates, and best-before dates. This information must be presented in both Chinese and English with font sizes no smaller than 1.2mm. Products exported to the EU must also comply with the EU Packaging Directive\'s environmental requirements, including recyclability labeling and Extended Producer Responsibility (EPR). ZPrintPro\'s design team is familiar with Hong Kong and international packaging regulations, ensuring compliance at the design stage to avoid post-launch recalls due to labeling issues.</p><h2>Logistics and Warehousing for Hong Kong Packaging</h2><p>Hong Kong\'s expensive warehousing environment poses unique challenges for packaging inventory management. Folding cartons store flat with 3x the volume efficiency of rigid boxes. For e-commerce brands, we recommend an "on-demand printing" model: maintain minimal finished inventory and dynamically adjust order quantities based on sales data. ZPrintPro offers inventory hosting services—clients can store packaging boxes at our Kwun Tong warehouse and pull stock as needed, saving valuable warehousing space and rental costs.</p>';

const pgJaAdd = '<h2>包装箱の表面加工オプション</h2><p>表面加工は包装の質感レベルを決定する核心変数です。マットラミネートは光の反射を排除し、絹のような細やかな触感を演出し、高級スキンケアやミニマルブランドに最適です。グロスラミネートはより鮮やかで彩度の高い色彩を実現し、強い視覚的インパクトが必要な製品に適しています。ソフトタッチフィルムは比較的新しい技術で、ベルベットのような触感をシミュレートし、消費者が包装に触れた瞬間に「これは高級品」という認識を生み出します。局部UVコーティングはロゴや核心グラフィックに立体的な光沢を加え、周囲のマット領域との強い触感対比を生み出し、棚の上で製品が自動的に「飛び出して」見えます。</p><h2>包装デザインの規制コンプライアンス</h2><p>香港は食品包装に厳格な規制があり、成分表示、アレルギー警告、正味量、製造日、消費期限などが義務付けられています。これらの情報は中国語と英語の両方で提示され、フォントサイズは1.2mm以上が必要です。EUへの輸出製品は、EU包装指針の環境要件（リサイクル可能性の表示と生産者責任延伸制度）にも準拠する必要があります。智印港のデザインチームは香港および国際的な包装規制に精通しており、設計段階でコンプライアンスを確保し、ラベル問題による発売後のリコールを防ぎます。</p><h2>香港の包装印刷の物流と倉庫保管</h2><p>香港の高価な倉庫環境は包装在庫管理に独特の課題を提示します。組み立て箱は平らに収納でき、化粧箱の3倍の体積効率を持ちます。ECブランドには「オンデマンド印刷」モデルを推奨します：最小限の完成品在庫を維持し、販売データに基づいて注文量を動的に調整します。智印港は在庫ホスティングサービスを提供しており、クライアントは包装箱を観塘の倉庫に保管し、必要に応じて在庫を引き出すことができ、貴重な倉庫スペースと賃貸コストを節約できます。</p>';

// Apply expansions
const sgz = /(立即獲取貼紙印刷報價<\/h2><p>無論您需要防水貼紙、透明貼紙、燙金貼紙還是特殊模切貼紙，智印港都能為您提供專業的香港貼紙印刷服務。瀏覽<a href="\/{locale}\/product\/waterproof-stickers">防水貼紙產品頁<\/a>或<a href="\/{locale}\/product\/transparent-stickers">透明貼紙產品頁<\/a>獲取即時報價。<\/p>)/;
content = content.replace(sgz, sgZhAdd + '$1');

const sge = /(<p>Browse <a href="\/{locale}\/product\/waterproof-stickers">waterproof stickers<\/a> or <a href="\/{locale}\/product\/transparent-stickers">clear stickers<\/a> for instant quotes.<\/p>)/;
content = content.replace(sge, sgEnAdd + '$1');

const sgj = /(<p>防水シール、透明シール、箔押しシール、カスタム型抜きシールなど、智印港が香港でプロフェッショナルなシール印刷サービスを提供します。<a href="\/{locale}\/product\/waterproof-stickers">防水シール<\/a>または<a href="\/{locale}\/product\/transparent-stickers">透明シール<\/a>のページで即時見積もりをご確認ください。<\/p>)/;
content = content.replace(sgj, sgJaAdd + '$1');

const fgz = /(<h2>立即獲取傳單印刷報價<\/h2><p>無論您需要 A5 傳單、A6 傳單、摺頁傳單還是燙金傳單，智印港都能為您提供專業的香港傳單印刷服務。瀏覽<a href="\/{locale}\/product\/a5-flyers">A5 傳單產品頁<\/a>或<a href="\/{locale}\/product\/folded-leaflets">摺頁傳單產品頁<\/a>獲取即時報價。<\/p>)/;
content = content.replace(fgz, fgZhAdd + '$1');

const fge = /(<h2>Get Flyer Printing Quotes<\/h2><p>Browse <a href="\/{locale}\/product\/a5-flyers">A5 flyers<\/a> or <a href="\/{locale}\/product\/folded-leaflets">folded leaflets<\/a> for instant quotes.<\/p>)/;
content = content.replace(fge, fgEnAdd + '$1');

const fgj = /(<h2>チラシ印刷のお見積もり<\/h2><p>A5チラシ、A6チラシ、折りパンフレット、箔押しチラシなど、智印港が香港でプロフェッショナルなチラシ印刷サービスを提供します。<a href="\/{locale}\/product\/a5-flyers">A5チラシ<\/a>または<a href="\/{locale}\/product\/folded-leaflets">折りパンフレット<\/a>のページで即時見積もりをご確認ください。<\/p>)/;
content = content.replace(fgj, fgJaAdd + '$1');

const pgz = /(<h2>立即獲取包裝印刷報價<\/h2><p>無論您需要磁吸禮盒、摺疊盒、環保紙袋還是化妝品盒，智印港都能為您提供專業的香港包裝定制服務。瀏覽<a href="\/{locale}\/product\/gift-boxes">禮品盒產品頁<\/a>或<a href="\/{locale}\/product\/kraft-paper-bags">牛皮紙袋產品頁<\/a>獲取即時報價。<\/p>)/;
content = content.replace(pgz, pgZhAdd + '$1');

const pge = /(<h2>Get Packaging Quotes<\/h2><p>Browse <a href="\/{locale}\/product\/gift-boxes">gift boxes<\/a> or <a href="\/{locale}\/product\/kraft-paper-bags">kraft paper bags<\/a> for instant quotes.<\/p>)/;
content = content.replace(pge, pgEnAdd + '$1');

const pgj = /(<h2>包装印刷のお見積もり<\/h2><p>化粧箱、組み立て箱、エコ紙袋、化粧品箱など、智印港が香港でプロフェッショナルな包装オーダーメイドサービスを提供します。<a href="\/{locale}\/product\/gift-boxes">ギフト箱<\/a>または<a href="\/{locale}\/product\/kraft-paper-bags">クラフト紙袋<\/a>のページで即時見積もりをご確認ください。<\/p>)/;
content = content.replace(pgj, pgJaAdd + '$1');

fs.writeFileSync('src/data/pillar-content.ts', content);
console.log('Pillar expansions applied.');
