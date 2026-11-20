'use strict';
/**
 * 生成「母语者按族批复」平铺清单 v3
 * 数据源: ① Step 4 规格术语 (自 step4 报告 §5 表) ② 价格 label zh↔ja 对 (stepB2-zh-ja-pairs.json)
 *        ③ 本会话 778 字审计核心术语 5 组
 * 输出: .hermes/_probe-pb/review-v3-flat.json  (机读) + 控制台预览
 * 只读, 不改任何生产档。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

// ① Step 4 的 16 条 (原文, en, ja, 风险点) —— 取自 step4-specs-i18n-report-2026-09-19.md §5
const STEP4 = [
  ['灰底白板', 'duplex board (grey back)', 'グレー裏白板紙', '材质名地域差异'],
  ['單粉卡(超高松)', 'one-side coated card (ultra-high bulk)', '片面コートカード(超嵩高)', '港式行话直译'],
  ['易碎紙', 'tamper-evident paper', '易破壊紙', '行业称谓'],
  ['導氣槽底紙', 'air-release liner', 'エアフロー加工台紙', '日文惯用'],
  ['筒芯出貨', 'shipped on core', '巻き取り出荷', '出货形态'],
  ['單透孔', 'one-way vision holes', 'ワンウェイビジョン穴', '车贴行话'],
  ['手挽 / 手挽材', 'handles / handle material', '手提げ / 手提げ素材', '纸袋行话'],
  ['高品數碼', 'high-quality digital', '高品質デジタル', '工艺等级'],
  ['相架 / 硬紙板相架', 'easel frame / rigid board easel frame', 'フレームスタンド / 厚紙フレームスタンド', '台卡结构'],
  ['內托 / 吸塑 / 紙漿內托', 'insert / blister tray / moulded pulp insert', '内台 / ブリスタ / パルプ内台', '包装内衬'],
  ['打扣', 'grommets', 'ハトメ', '喷绘后道'],
  ['珠光／冰白', 'pearl / ice-white', 'パール／アイスホワイト', 'アイスホワイト 为品牌通称'],
  ['12 色藝術微噴（Giclée）', '12-color giclée printing', '12色ジクレー印刷', '原文已含 Giclée'],
  ['3M／Avery 品牌升級', 'upgrade to 3M / Avery brand', '3M／Averyブランドへのアップグレード', 'K3 已裁保留'],
  ['書脊封面 / 內袋 / 繡名字', 'spine cover / inner pocket / embroidered name', '背表紙 / 内ポケット / 刺しゅう名入れ', '同人周边结构'],
  ['擊凸 / 壓凹 / 局部UV / 燙金', 'embossing / debossing / spot UV / foil stamping', 'エンボス / デボス / スポットUV / 箔押し', '行业标准译法'],
];

// ② 价格 label zh↔ja 对
const price = JSON.parse(fs.readFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB2-zh-ja-pairs.json'), 'utf8'));

// ③ 本会话核心术语
const CORE = [
  ['國際認證體系', 'internationally certified', '国際認証'],
  ['進口印刷設備', 'Heidelberg presses / Heidelberg 6+1 press', 'ハイデルベルク印刷機'],
  ['認證紙', 'FSC-certified paper', '認証紙'],
  ['急件 + 截單', 'rush orders, 18:00 cutoff', '特急・18:00 締切'],
  ['答案（nugget 标签）', 'Answer nugget', '(ja 未出现)'],
];

// ---- 归族 (按优先级顺序判定, 先判专有族, 再判大类) ----
const LAM = /ラミネート|フィルム貼り|ホットメルト|のり付け|覆膜|覆光膜|覆啞膜|不覆膜|貼膠片|熱熔膠|黏盒|air-release|エアフロー|one-way vision|ワンウェイビジョン|導氣槽|單透孔|lamination|hot melt|film mounting/;
const SHEET = /片裝|シート|シートラベル|平裝標籤|sheet/;
const BIND = /摺|折|裝|綴|釘|表紙|本文|ページ|頁|騎|膠|胶|背表紙|内ポケット|刺しゅう|縫|binding|saddle|perfect bind|spine|inner pocket|embroider/;
const MAT = /紙|纸|カード|アート|上質|嵩|板紙|白板|段ボール|クラフト|paper|bond|board|card ?stock|linen|珠光|冰白|pearl|ice-white/;
const FIN = /エンボス|デボス|スポットUV|箔押し|ジクレー|型抜き|die-cut|emboss|deboss|foil|spot UV|giclée|打扣|ハトメ|grommet/;
const BOX = /ボックス|箱|盒|ロック底|差し込み|トレイ|内台|ブリスタ|パルプ|フレームスタンド|手挽|手提げ|相架|托|吸塑|飛機盒|双插|雙插/;
const WRAP = /認証|認證|certified|press|印刷機|急件|特急|締切|cutoff|nugget|國際認證|進口印刷/;

const famOf = (zh, ja) => {
  const s = zh + ' ' + ja;
  if (LAM.test(s)) return '覆膜 / 表面保护族';
  if (SHEET.test(s)) return '出货形态族（片装 / 卷装 / 标签）';
  if (BIND.test(s)) return '装订 / 折页族 ★必须整族一次批';
  if (FIN.test(s)) return '表面工艺族';
  if (BOX.test(s)) return '盒型 / 结构族';
  if (MAT.test(s)) return '纸材 / 纸板族';
  if (WRAP.test(s)) return '认证 / 设备 / 交期族';
  return '其他';
};

const rows = [];
STEP4.forEach(([zh, en, ja, risk]) => rows.push({ src: 'Step4', zh, en, ja, note: risk, fam: famOf(zh, ja) }));
price.forEach(p => rows.push({ src: 'price-label', zh: p.zh, en: '-', ja: p.ja, note: `出现 ${p.n}`, fam: famOf(p.zh, p.ja) }));
CORE.forEach(([zh, en, ja]) => rows.push({ src: 'core', zh, en, ja, note: '全站核心术语', fam: famOf(zh, ja) }));

// 去重 (zh 相同)
const seen = new Set();
const uniq = rows.filter(r => { const k = r.zh; if (seen.has(k)) return false; seen.add(k); return true; });

const fams = {};
uniq.forEach(r => { fams[r.fam] = fams[r.fam] || []; fams[r.fam].push(r); });

console.log(`总条目(去重后): ${uniq.length}   源: Step4 ${STEP4.length} + price ${price.length} + core ${CORE.length}`);
let idx = 0;
for (const [fam, list] of Object.entries(fams).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n#### ${fam}  —  ${list.length} 条 ####`);
  list.forEach(r => { idx++; console.log(`${String(idx).padStart(3)}. [${r.src}] ${r.zh}\n      en: ${r.en}\n      ja: ${r.ja}${r.note ? '\n      注: ' + r.note : ''}`); });
}
fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'review-v3-flat.json'), JSON.stringify({ total: uniq.length, families: fams }, null, 2), 'utf8');
console.log(`\n落盘: .hermes/_probe-pb/review-v3-flat.json`);
