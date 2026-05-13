/**
 * 批量扩展 pillar-content.ts 中的内容字数
 * 替换所有 pillar + cluster 的 zh-hk / en / ja content
 */
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'pillar-content.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// 辅助：安全替换（按完整旧字符串匹配）
function replaceBlock(oldZh, oldEn, oldJa, newZh, newEn, newJa) {
  const oldBlock = `'zh-hk': '${oldZh}',\n    'en': '${oldEn}',\n    'ja': '${oldJa}',`;
  const newBlock = `'zh-hk': '${newZh}',\n    'en': '${newEn}',\n    'ja': '${newJa}',`;
  if (!content.includes(oldBlock)) {
    console.error('Block not found, skipping...');
    return false;
  }
  content = content.replace(oldBlock, newBlock);
  return true;
}

// ========== PILLAR 1: sticker-guide ==========
const s1_zh_old = '<p>在香港這個商業高度密集的都市，貼紙不僅是產品標籤，更是品牌與消費者溝通的第一觸點。本指南將從香港貼紙印刷的實務角度出發，系統性拆解材質選擇、工藝搭配、設計規範與本地供應鏈要點。</p><h2>一、貼紙材質全景圖</h2><p>香港常見的貼紙材質可分為四大類：銅版紙、合成紙、PVC 與 PET 透明膜。每種材質的防水性、耐候性與成本差異極大。</p><p><strong>銅版紙貼紙</strong>成本最低，適合室內短期使用。<strong>合成紙貼紙</strong>增加了防水塗層，能短時間承受潑水。<strong>PVC 貼紙</strong>具備完全防水、防油與耐撕特性，是香港食品外賣、飲品標籤的首選。<strong>PET 透明貼紙</strong>以「無底紙感」著稱，貼於玻璃瓶或透明包裝上時，僅保留圖案與文字，視覺極為高級。</p><h2>二、表面工藝與觸感設計</h2><p>光膜能提升色彩飽和度，適合鮮豔的促銷設計；啞膜則呈現沉穩質感，常見於高端護膚品牌。燙金與燙銀工藝能在局部創造金屬光澤，特別適合節慶禮盒封條或 VIP 會員標識。局部 UV 上光可讓 Logo 產生立體凸感。</p><h2>三、香港印刷流程與交期管理</h2><p>標準流程包括：檔案檢查、數碼打樣、批量生產、模切成型、品檢包裝。對於 100-500 張的少批量訂單，數碼印刷可在 1-2 個工作日內完成；大批量則建議採用柯式印刷以降低單價。</p><h2>四、常見問題與避坑指南</h2><p>許多客戶在初次訂製貼紙時容易忽略三點：第一是出血位，建議預留 3mm；第二是色彩模式，務必使用 CMYK 而非 RGB；第三是膠水選擇，永久膠與可移膠的移除難度差異極大。</p>';

const s1_en_old = `<p>In Hong Kong's densely commercial landscape, stickers are more than product labels—they are the first touchpoint between a brand and its consumers. This guide systematically breaks down material selection, finishing options, design specifications, and local supply chain considerations.</p><h2>1. Sticker Material Landscape</h2><p>Hong Kong sticker materials fall into four main categories: art paper, synthetic paper, PVC, and PET clear film. <strong>Art paper stickers</strong> are the most economical, suitable for short-term indoor use. <strong>Synthetic paper stickers</strong> add a waterproof coating, tolerating brief water exposure. <strong>PVC stickers</strong> offer complete waterproofing, oil resistance, and tear durability. <strong>PET clear stickers</strong> create a "no-label" premium look on glass bottles.</p><h2>2. Surface Finishes</h2><p>Gloss lamination boosts color saturation; matte lamination conveys understated elegance. Foil stamping creates metallic highlights perfect for festive gift seals. Spot UV coating adds dimensional gloss to logos.</p><h2>3. Printing Workflow</h2><p>The standard workflow includes file checking, digital proofing, mass production, die cutting, and QC. Small batches of 100-500 pieces complete in 1-2 working days via digital printing.</p><h2>4. Common Pitfalls</h2><p>Reserve 3mm bleed, always use CMYK, and choose adhesive type carefully—removable adhesive is recommended for high-value product surfaces.</p>`;

const s1_ja_old = `<p>香港という商業が高度に密集した都市では、シールは単なる製品ラベルではなく、ブランドと消費者がコミュニケーションする最初の接点です。本ガイドでは素材選び、加工オプション、デザイン規格を体系的に解説します。</p><h2>一、シール素材の全体像</h2><p>香港で一般的なシール素材は4つのカテゴリーに分類されます：アート紙、合成紙、PVC、透明PETフィルム。</p><h2>二、表面加工と触感デザイン</h2><p>グロスラミネートは色彩飽和度を高め、マットラミネートは落ち着いた質感を演出します。箔押しは金属光沢を生み出します。</p><h2>三、印刷フローと納期管理</h2><p>標準フローはデータチェック、デジタル校正、量産、型抜き、品質検査。100〜500枚の少ロットは1〜2営業日で完成します。</p><h2>四、よくある失敗と回避法</h2><p>ブリード（3mm確保）、カラーモード（CMYK必須）、粘着剤の種類に注意してください。</p>`;

// 读取当前 sticker-guide 内容（已在 StrReplaceFile 中被替换过）
// 由于之前的替换，旧字符串已不存在。我们需要匹配当前文件中的字符串。
// 为了避免这个问题，让我们采用另一种方法：直接按位置替换 content 块。

console.log('Script needs to be adapted for current file state.');
