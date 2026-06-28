const fs = require('fs');
let c = fs.readFileSync('F:/zprintpro-nextjs/src/lib/seo/schema-extensions.ts', 'utf8');

// 1. Replace "return null" with generic fallback
const oldReturn = '  if (!data) return null;';
const newReturn = `  // Fallback: generic printing process for all product categories
  if (!data) {
    const g = genericPrintingProcess[locale];
    return {
      name: g.name,
      description: g.description,
      steps: g.steps.map(s => ({ '@type': 'HowToStep' as const, name: s.name, text: s.text })),
      totalTime: 'P3D',
    };
  }`;

c = c.replace(oldReturn, newReturn);

// 2. Insert genericPrintingProcess before preset definition
const presetStart = '  const preset: Record<string, {';
const idx = c.indexOf(presetStart);
if (idx < 0) { console.log('preset not found'); process.exit(1); }

const genericCode = `  // Generic printing process for all 14 categories (extended from original 4)
  const genericPrintingProcess: Record<Locale, { name: string; description: string; steps: { name: string; text: string }[] }> = {
    'zh-hk': {
      name: brand + '印刷工藝流程',
      description: '了解' + brand + '從設計到交付的完整印刷流程。ISO 9001 認證深圳工廠，專業設備，品質保證。',
      steps: [
        { name: '設計準備', text: '準備 CMYK 300dpi 設計稿，預留 3mm 出血位。' + brand + '免費模板可加速設計。' },
        { name: '材質選擇', text: '根據產品需求選擇合適紙質/材質，' + brand + '團隊提供專業建議。' },
        { name: '印刷生產', text: '使用 Heidelberg 四色印刷機在 ISO 9001 認證的深圳工廠進行專業印刷。' },
        { name: '後加工處理', text: '根據訂單需求進行裁切、覆膜、燙金、UV、擊凸等後加工工藝。' },
        { name: '質檢包裝', text: '每批次產品經專業質檢員檢查色彩、裁切、材質，合格後防水包裝出廠。' },
        { name: '跨境配送', text: 'DHL/FedEx 國際快遞，72 小時全球送達。香港地區跨境專線直達。' },
      ]
    },
    en: {
      name: brand + ' Printing Process',
      description: 'Complete printing workflow from design to delivery. ISO 9001 certified Shenzhen factory, professional equipment, quality guaranteed.',
      steps: [
        { name: 'Design Preparation', text: 'Prepare CMYK 300dpi artwork with 3mm bleed. Free ' + brand + ' templates available.' },
        { name: 'Material Selection', text: 'Choose the right paper/material. ' + brand + ' team provides expert recommendations.' },
        { name: 'Printing Production', text: 'Heidelberg 4-color presses at our ISO 9001 certified Shenzhen factory.' },
        { name: 'Finishing', text: 'Cutting, lamination, foil stamping, spot UV, embossing as required.' },
        { name: 'Quality Control', text: 'QC specialists check color accuracy, cutting precision, and material quality.' },
        { name: 'Global Shipping', text: 'DHL/FedEx express, 72-hour delivery. Cross-border express to HK.' },
      ]
    },
    ja: {
      name: brand + '印刷プロセス',
      description: 'デザインから納品までの完全な印刷ワークフロー。ISO 9001認証深圳工場、専門設備、品質保証。',
      steps: [
        { name: 'デザイン準備', text: 'CMYK 300dpi、3mm塗り足し付き。' + brand + '無料テンプレート利用可能。' },
        { name: '素材選択', text: '用途に応じた最適な紙質/素材。' + brand + 'チームが専門アドバイス。' },
        { name: '印刷生産', text: 'ISO 9001認証深圳工場でHeidelberg 4色印刷機によるプロ印刷。' },
        { name: '後加工', text: '断裁、ラミネート、箔押し、UV、エンボスなど。' },
        { name: '品質検査', text: '専門検査員が各ロットの色精度、断裁、素材をチェック。' },
        { name: '国際配送', text: 'DHL/FedEx、72時間。香港へクロスボーダー直送。' },
      ]
    }
  };

`;

c = c.substring(0, idx) + genericCode + c.substring(idx);
fs.writeFileSync('F:/zprintpro-nextjs/src/lib/seo/schema-extensions.ts', c, 'utf8');
console.log('Generic HowTo fallback added. Final size:', c.length);
