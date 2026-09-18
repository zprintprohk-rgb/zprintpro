// scripts/lib/price-label-i18n.mjs
// 零件級術語詞典 — price table 供應商原始標籤 (簡體中文) → zh-hk / en / ja 三語系
//
// 背景 (Step 2 源頭治理):
//   scripts/gen-price-data.mjs 原本把同一個源頭字串 (PRICE_TABLE_DIR/*.json 的簡體供應商標籤)
//   直接寫進 zh-hk / en / ja 三個鍵位 ⇒ 跨語系語言污染 (18 SKU / 342 欄位)。
//   源頭字串有穩定文法: {產品}-{紙張}[{克重}]-{盒型/裝訂}-{尺寸}-{面數}-{工藝}[…],{工藝}…
//   因此正確做法 = 切片 → 逐零件映射 → 按語系重組 (本模組), 而非逐條硬翻整串。
//
// 不變量 (由 gen-price-data.mjs 斷言後才寫盤):
//   1. 只替換「術語」片段; 所有非術語字元 (數字 / 尺寸寫法 / 標點 / 括號 / 分隔符) 逐字元保留
//   2. en 輸出不得殘留任何 CJK; ja 輸出不得殘留「零假名的漢字串」(C 類)
//   3. zh-hk 輸出不得含簡體專用字
//   4. 未收錄的零件 → 不猜、原樣保留, 並由 audit 收集回報 (寧可待補, 不可造錯術語)

/** @typedef {{ keys: string[], 'zh-hk': string, en: string, ja: string, tight?: string, note?: string }} Term */

/** 零件級術語表。keys = 所有可能出現的原文寫法 (含簡繁變體 / 供應商錯字變體)。 */
const TERMS = [
  /* ---------- 產品名 / 結構 ---------- */
  { keys: ['拼版白卡彩盒'], 'zh-hk': '拼版白卡彩盒', en: 'Gang-run white card colour box', ja: '合版白カードボックス' },
  { keys: ['拼版卡盒'], 'zh-hk': '拼版卡盒', en: 'Gang-run card box', ja: '合版カードボックス' },
  { keys: ['瓦楞彩盒'], 'zh-hk': '瓦楞彩盒', en: 'Corrugated colour box', ja: '段ボールカラーボックス' },
  { keys: ['瓦楞纸盒', '瓦楞紙盒'], 'zh-hk': '瓦楞紙盒', en: 'Corrugated box', ja: '段ボール箱' },
  { keys: ['白卡彩盒'], 'zh-hk': '白卡彩盒', en: 'White card colour box', ja: '白カードカラーボックス' },
  { keys: ['白卡纸手提袋', '白卡纸手袋', '白卡手提袋'], 'zh-hk': '白卡紙手提袋', en: 'White card paper bag', ja: '白カード紙袋' },
  { keys: ['白卡纸', '白卡紙'], 'zh-hk': '白卡紙', en: 'White card', ja: '白カード紙' },
  { keys: ['数码贴纸', '數碼貼紙'], 'zh-hk': '數碼貼紙', en: 'Digital sticker', ja: 'デジタルステッカー' },
  { keys: ['宣传单张', '宣傳單張'], 'zh-hk': '宣傳單張', en: 'Flyers', ja: 'チラシ' },
  { keys: ['单页', '單頁'], 'zh-hk': '單頁', en: 'single sheet', ja: 'シングル' },
  { keys: ['折页', '摺頁'], 'zh-hk': '摺頁', en: 'folded sheet', ja: '折り加工' },
  { keys: ['专版单页', '專版單頁'], 'zh-hk': '專版單頁', en: 'Dedicated single sheet', ja: '専用版シングル' },
  { keys: ['专版成本', '專版成本'], 'zh-hk': '專版成本', en: 'Dedicated run cost', ja: '専版コスト' },
  { keys: ['专版', '專版'], 'zh-hk': '專版', en: 'Dedicated run', ja: '専版' },
  { keys: ['特殊尺寸宣傳摺頁', '特殊尺寸宣传折页'], 'zh-hk': '特殊尺寸宣傳摺頁', en: 'Custom-size promotional leaflet', ja: '特殊サイズ販促リーフレット' },
  { keys: ['特殊尺寸'], 'zh-hk': '特殊尺寸', en: 'Custom size', ja: '特殊サイズ' },
  { keys: ['宣傳摺頁', '宣传折页'], 'zh-hk': '宣傳摺頁', en: 'promotional leaflet', ja: '販促リーフレット' },
  { keys: ['風琴摺', '风琴折', '风琴摺'], 'zh-hk': '風琴摺', en: 'Accordion fold', ja: 'ジャバラ折り' },
  { keys: ['插口盒'], 'zh-hk': '插口盒', en: 'Tuck-end box', ja: '差し込み式ボックス' },
  { keys: ['雙插盒', '双插盒'], 'zh-hk': '雙插盒', en: 'Double tuck-end box', ja: '差し込み式ボックス' },
  { keys: ['雙插', '双插'], 'zh-hk': '雙插', en: 'double tuck', ja: '両挿' },
  { keys: ['飞机盒', '飛機盒'], 'zh-hk': '飛機盒', en: 'Airplane box', ja: '飛行機箱' },
  { keys: ['普通扣底盒'], 'zh-hk': '普通扣底盒', en: 'Standard lock-bottom box', ja: '標準ロック底箱' },
  { keys: ['拼版'], 'zh-hk': '拼版', en: 'Gang-run', ja: '合版' },
  { keys: ['盒'], 'zh-hk': '盒', en: 'box', ja: '箱' },

  /* ---------- 紙張 / 紙材 ---------- */
  { keys: ['单粉卡', '單粉卡'], 'zh-hk': '單粉卡', en: 'C1S art card', ja: 'コートボール' },
  { keys: ['超高松', '超高鬆'], 'zh-hk': '超高鬆', en: 'Ultra high bulk', ja: '超高嵩' },
  { keys: ['铜版纸高松', '銅版紙高鬆', '铜版纸高鬆'], 'zh-hk': '銅版紙高鬆', en: 'High-bulk art paper', ja: '高嵩アート紙' },
  { keys: ['铜版纸', '銅版紙'], 'zh-hk': '銅版紙', en: 'Art paper', ja: 'アート紙' },
  { keys: ['铜板', '銅板'], 'zh-hk': '銅板', en: 'Art paper', ja: 'アート紙' },
  { keys: ['哑粉纸', '啞粉紙'], 'zh-hk': '啞粉紙', en: 'Matte art paper', ja: 'マットコート紙' },
  { keys: ['光粉紙', '光粉纸'], 'zh-hk': '光粉紙', en: 'Gloss art paper', ja: '光沢コート紙' },
  { keys: ['双胶纸', '雙膠紙'], 'zh-hk': '雙膠紙', en: 'Woodfree offset paper', ja: '上質紙' },
  { keys: ['書紙', '书纸'], 'zh-hk': '書紙', en: 'Book paper', ja: '書籍用紙' },
  { keys: ['再生纸', '再造紙'], 'zh-hk': '再造紙', en: 'Recycled paper', ja: '再生紙' },
  { keys: ['灰卡'], 'zh-hk': '灰卡', en: 'Grey board', ja: 'グレー板紙' },
  { keys: ['银卡纸', '銀卡紙'], 'zh-hk': '銀卡紙', en: 'Silver card', ja: '銀カード' },
  { keys: ['镭射银卡', '鐳射銀卡'], 'zh-hk': '鐳射銀卡', en: 'Holographic silver card', ja: 'ホログラム銀カード' },
  { keys: ['热熔胶', '熱熔膠'], 'zh-hk': '熱熔膠', en: 'Hot-melt adhesive', ja: 'ホットメルト' },
  { keys: ['克'], 'zh-hk': '克', en: 'g', ja: 'g', tight: 'left' },
  { keys: ['光'], 'zh-hk': '光', en: 'Gloss', ja: '光沢' },

  /* ---------- 尺寸 / 開數 ---------- */
  { keys: ['大度'], 'zh-hk': '大度', en: 'Large size', ja: '大判' },
  { keys: ['开', '開'], 'zh-hk': '開', en: 'mo', ja: '判', tight: 'left' },
  { keys: ['厘米手提绳', '厘米手提繩'], 'zh-hk': '厘米手提繩', en: 'cm handle cord', ja: 'cm持ち手紐', tight: 'left' },

  /* ---------- 面數 / 印刷色 ---------- */
  { keys: ['单面', '單面'], 'zh-hk': '單面', en: 'Single-sided', ja: '片面' },
  { keys: ['双面', '雙面'], 'zh-hk': '雙面', en: 'Double-sided', ja: '両面' },
  { keys: ['双面不同', '雙面不同'], 'zh-hk': '雙面不同', en: 'Different on both sides', ja: '両面異なる' },
  { keys: ['双面彩色', '雙面彩色'], 'zh-hk': '雙面彩色', en: 'Colour both sides', ja: '両面カラー' },
  { keys: ['彩色'], 'zh-hk': '彩色', en: 'Colour', ja: 'カラー' },
  { keys: ['单面白', '單面白'], 'zh-hk': '單面白', en: 'One-side white', ja: '片面白' },

  /* ---------- 盒型參數 / 瓦楞 ---------- */
  { keys: ['高加强芯', '高加強芯'], 'zh-hk': '高加強芯', en: 'High-strength core', ja: '高補強芯' },
  { keys: ['加强芯', '加強芯', '加强蕊', '加強蕊'], 'zh-hk': '加強芯', en: 'Reinforced core', ja: '補強芯', note: '供應商原文 加强蕊 = 加强芯 錯字, zh-hk 已正字化' },
  { keys: ['瓦楞纸纹', '瓦楞紙紋'], 'zh-hk': '瓦楞紙紋', en: 'Corrugated flute direction', ja: '段ボール目の方向' },
  { keys: ['长度横纹', '長度橫紋'], 'zh-hk': '長度橫紋', en: 'horizontal grain along length', ja: '長手方向の横目' },
  { keys: ['长度竖纹', '长度豎紋', '長度豎紋', '長度直紋'], 'zh-hk': '長度直紋', en: 'vertical grain along length', ja: '長手方向の縦目' },
  { keys: ['任意'], 'zh-hk': '任意', en: 'Any', ja: '任意' },
  { keys: ['手提绳', '手提繩'], 'zh-hk': '手提繩', en: 'Handle cord', ja: '持ち手紐' },
  { keys: ['黄色', '黃色'], 'zh-hk': '黃色', en: 'Yellow', ja: 'イエロー' },
  { keys: ['白色'], 'zh-hk': '白色', en: 'White', ja: 'ホワイト' },
  { keys: ['红色', '紅色'], 'zh-hk': '紅色', en: 'Red', ja: 'レッド' },

  /* ---------- 表面工藝 ---------- */
  { keys: ['模切(啤)', '模切（啤）'], 'zh-hk': '模切(啤)', en: 'Die-cut', ja: '型抜き' },
  { keys: ['数码模切', '數碼模切'], 'zh-hk': '數碼模切', en: 'Digital die-cut', ja: 'デジタル型抜き' },
  { keys: ['模切'], 'zh-hk': '模切', en: 'Die-cut', ja: '型抜き' },
  { keys: ['啤'], 'zh-hk': '啤', en: 'Die-cut', ja: '型抜き' },
  { keys: ['异形', '異形'], 'zh-hk': '異形', en: 'custom shape', ja: '異形' },
  { keys: ['不覆膜'], 'zh-hk': '不覆膜', en: 'No lamination', ja: 'ラミネートなし' },
  { keys: ['覆光膜'], 'zh-hk': '覆光膜', en: 'Gloss lamination', ja: '光沢ラミネート' },
  { keys: ['覆哑膜', '覆啞膜'], 'zh-hk': '覆啞膜', en: 'Matte lamination', ja: 'マットラミネート' },
  { keys: ['覆膜'], 'zh-hk': '覆膜', en: 'Lamination', ja: 'ラミネート' },
  { keys: ['烫金', '燙金'], 'zh-hk': '燙金', en: 'Foil stamping', ja: '箔押し' },
  { keys: ['亮黄金', '亮黃金'], 'zh-hk': '亮黃金', en: 'Bright gold', ja: 'ブライトゴールド' },
  { keys: ['哑金', '啞金'], 'zh-hk': '啞金', en: 'Matte gold', ja: 'マットゴールド' },
  { keys: ['贴胶片', '貼膠片'], 'zh-hk': '貼膠片', en: 'Film patch', ja: 'フィルム貼り' },
  { keys: ['粘吊口', '黏吊口'], 'zh-hk': '黏吊口', en: 'Hang tab', ja: '吊り下げ口' },
  { keys: ['粘盒', '黏盒'], 'zh-hk': '黏盒', en: 'Box gluing', ja: 'のり付け' },
  { keys: ['击凸', '擊凸'], 'zh-hk': '擊凸', en: 'Embossing', ja: 'エンボス' },
  { keys: ['印白墨'], 'zh-hk': '印白墨', en: 'Back-print white ink', ja: '白インク印刷' },
  { keys: ['逆向'], 'zh-hk': '逆向', en: 'Reverse', ja: 'リバース' },
  { keys: ['切成品'], 'zh-hk': '切成品', en: 'Trimmed to size', ja: '断裁済み' },
  { keys: ['普通'], 'zh-hk': '普通', en: 'Standard', ja: '標準' },

  /* ---------- 摺頁 / 裝訂 / 書刊 ---------- */
  { keys: ['对折', '對摺'], 'zh-hk': '對摺', en: 'Half fold', ja: '二つ折り' },
  { keys: ['关门折', '關門摺'], 'zh-hk': '關門摺', en: 'Gate fold', ja: '観音折り' },
  { keys: ['包心折'], 'zh-hk': '包心摺', en: 'Roll fold', ja: '巻き三つ折り' },
  { keys: ['條骨', '条骨'], 'zh-hk': '條骨', en: 'creases', ja: '山' },
  { keys: ['折'], 'zh-hk': '摺', en: 'fold', ja: '折り' },
  { keys: ['骑马钉', '騎馬釘'], 'zh-hk': '騎馬釘', en: 'Saddle stitch', ja: '中綴じ' },
  { keys: ['无线胶装', '無線膠裝'], 'zh-hk': '無線膠裝', en: 'Perfect binding', ja: '無線綴じ' },
  { keys: ['直度'], 'zh-hk': '直度', en: 'Portrait', ja: '縦向き' },
  { keys: ['封面'], 'zh-hk': '封面', en: 'Cover', ja: '表紙' },
  { keys: ['内文', '內文'], 'zh-hk': '內文', en: 'Text pages', ja: '本文' },
  { keys: ['张', '張'], 'zh-hk': '張', en: 'sheets', ja: '枚' },
  { keys: ['页', '頁'], 'zh-hk': '頁', en: 'pages', ja: 'ページ' },
  { keys: ['急件标准', '急件標準'], 'zh-hk': '急件標準', en: 'Rush standard', ja: '急ぎ標準' },

  /* ---------- 標籤 / 貼紙專用 ---------- */
  { keys: ['数码标签', '數碼標籤'], 'zh-hk': '數碼標籤', en: 'Digital label', ja: 'デジタルラベル' },
  { keys: ['标签', '標籤'], 'zh-hk': '標籤', en: 'label', ja: 'ラベル' },
  { keys: ['片装', '片裝'], 'zh-hk': '片裝', en: 'Sheet', ja: 'シート' },
  { keys: ['卷装', '卷裝'], 'zh-hk': '卷裝', en: 'Roll', ja: 'ロール' },
  { keys: ['平装', '平裝'], 'zh-hk': '平裝', en: 'Sheet', ja: 'シート' },
  { keys: ['格底'], 'zh-hk': '格仔底紙', en: 'Grid backing', ja: 'グリッド台紙' },
  { keys: ['厚白底'], 'zh-hk': '厚白底', en: 'Thick white backing', ja: '厚白台紙' },
  { keys: ['黄底', '黃底'], 'zh-hk': '黃底', en: 'Yellow backing', ja: '黄台紙' },
  { keys: ['本厂材料', '本廠材料'], 'zh-hk': '本廠材料', en: 'In-house material', ja: '自社材料' },
  { keys: ['出标方向', '出標方向'], 'zh-hk': '出標方向', en: 'Unwind direction', ja: '繰り出し方向' },
  { keys: ['横版', '橫版'], 'zh-hk': '橫版', en: 'landscape', ja: '横位置' },
  { keys: ['左出标', '左出標'], 'zh-hk': '左出標', en: 'left unwind', ja: '左出し' },
  { keys: ['卷芯直径', '卷芯直徑'], 'zh-hk': '卷芯直徑', en: 'Core diameter', ja: '巻芯径' },
  { keys: ['每卷张数', '每卷張數'], 'zh-hk': '每卷張數', en: 'Labels per roll', ja: '巻あたり枚数' },

  /* ---------- 海報 / 噴繪 ---------- */
  { keys: ['相紙海報', '相纸海报'], 'zh-hk': '相紙海報', en: 'Photo paper poster', ja: 'フォトペーパーポスター' },
  { keys: ['環保海報', '环保海报'], 'zh-hk': '環保海報', en: 'Eco poster', ja: 'エコポスター' },
  { keys: ['海報', '海报'], 'zh-hk': '海報', en: 'Poster', ja: 'ポスター' },
  { keys: ['噴繪成品', '喷绘成品'], 'zh-hk': '噴繪成品', en: 'Large-format inkjet print', ja: 'インクジェット出力' },
  { keys: ['不含安裝裱貼', '不含安装裱贴'], 'zh-hk': '不含安裝裱貼', en: 'Excluding installation and mounting', ja: '設置・貼り込みなし' },
];

/* ---------- 索引 ---------- */
const DICT = new Map();
let MAXKEYLEN = 1;
for (const t of TERMS) {
  for (const k of t.keys) {
    if (DICT.has(k)) throw new Error('price-label-i18n: duplicate term key: ' + k);
    DICT.set(k, t);
    if (k.length > MAXKEYLEN) MAXKEYLEN = k.length;
  }
}

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const KANA = /[\u3040-\u30ff]/;
/** 簡體專用字 (僅收「繁體不會出現」者; 不含繁簡同形/傳統亦通用字, 如 格 卡 字 面 里 台 后 制 着 岳 汇? )
 *  = 原掃描器字表 + 印刷/產品高頻簡體字補漏 (专 贴 纸 册 烫 订 货 运 …)
 *  注意: ja 不套用本表 (日文新字體 学/国/体/点/双/画/写 均為正確日文) */
const SIMP_ONLY = /[们个为无与书车门问说时东华产国学体线标签页单价质简边发对开关电话从这来让给还两么义应该当经历众广号汉爷条岁习乡买亚严丝乐乔务动协卖参变叙叠专贴纸册烫订货运龙极飞术复图书厅际备养营获证读设计构团创药饮饰农贸铁银钟点认长间场带块组编圆压头实写将觉见购销费预须顺领顾验适双厉厌县叹听启员响喷园围图圣坏坚墙壮声壳处备够夹奋奖妇妈宝审宫宽宾寻导寿尔尽层属岗岛岭峡币师帮归录彻径忆怀态总恶惊惧惯愿戏战户执扩扫扰抚抢护报担拟拥择挤挥损换据摆摇敌数斩断旧旷显晒晓暂机杀杂权构柜栏树样档桥梦检楼横樱欢欧残毕气汇汉汤沟没沥沦沧沪泪泼泽洁洒浅浆测济浏浑浓涂涛涡涤润涧涨涩渐渔渗湾湿溃溅滚滞满滤滥滨滩澜灭灯灵灾灿炉炼炽烁烂烛烦烧烫热焕爱爷牵状犹独狭狮狱猎献玛环现琐琼画畅疗疮疯痒瘫瘾皱盏盐监盖盗盘睁瞒矫矿码砖砚砾础硕确碍碱礼禅离秆种积称稳窃窍窑窜窝窥竖竞笃笋笔笼筛筝筹篮篱类粮紧纠红纤约级纪纬纯纱纲纳纵纷纹纺纽练绅细织终绊绍经绑绒结绕绘给络绝绞统绢绣继绩绪续绳维绵绷绸综绽绿缀缅缆缉缎缓缔缕编缘缚缝缠缩缴网罗罚罢羡耸耻聋职联聪肃肠肤肿胀胁胆胜胶脏脑脓脱脸腻腾舰舱艰艳艺节芦苍苏苹茎茧荐荚荞荟荡荣莱莲获莹莺萝萤萧萨葱蒋蓝蓟蔷蕴虑虚虫虽虾蚀蚁蚂蚕蛊蛮蜗蜡蝇蝉衅衔补衬袄袜袭装裤见观规觅视览觉触誉计认讥讨训议讯记讲讳讶许论讼讽设访诀证评识诈诉诊词译试诗诚诞询该详诫诬语误诱诵请诸诺读课谁调谅谈谊谋谎谐谓谜谢谣谤谦谨谬谭谱谴贝贞负贡财责贤败账贩贪贫贬购贮贯贰贱贵贷贸贺贼贾贿赁赂赃资赋赌赎赏赐赔赖赘赚赛赠赡赢赵赶趋跃践踊踪躯轧轨转轮软轰轴轻载轿较辐输辕辖辗辞辩辫辽达迁过迈运进远违连迟递逻遗遥邓邮邹邻郑酝酱酿释鉴针钉钓钙钛钝钞钠钢钥钦钧钩钮钱钳钻铃铅铆铜铝铭铰铲铸铺链销锁锄锅锈锋锌锐错锚锡锣锤锥锦键锯锭镀镇镜镰闪闭闯闷闸闹闻阀阁阅阔阳阴阵阶际陆陈陕险隐隶难雏雾韩顶项顺预颈颊频颗题颜额颠颤风飘饭饮饱饲饶饺饼饿馆馅馈馋馏馒马驱驳驴驶驻驼驾骂骄骆骇骏骑骗骚骤鱼鲁鲜鲤鲨鲫鲸鳅鳄鳕鳗鳞鸟鸡鸣鸥鸦鸭鸽鸾鸿鹅鹊鹏鹌鹑鹤鹰麦麸黄龚龟]/;

/* ---------- 切片 + 重組 ---------- */
function needSpace(prev, cur, ca, cb) {
  if (prev.kind !== 'term' && cur.kind !== 'term') return false;
  if (prev.kind === 'term' && prev.tight.includes('right')) return false;
  if (cur.kind === 'term' && cur.tight.includes('left')) return false;
  const alnum = (c) => /[A-Za-z0-9]/.test(c);
  if (alnum(ca) && alnum(cb)) return true;
  if (alnum(ca) && (cb === '(' || cb === '[')) return true;
  return false;
}

/**
 * 把供應商原始標籤 (簡體中文) 本地化成指定語系。
 * 未收錄的零件原樣保留 (不猜), 並記錄到 sink (若提供)。
 * @param {string} raw
 * @param {'zh-hk'|'en'|'ja'} locale
 * @param {{unresolved: Set<string>, unknownTerms: Set<string>}} [sink]
 */
export function localize(raw, locale, sink) {
  if (raw === null || raw === undefined) return '';
  const s = String(raw);
  if (locale !== 'zh-hk' && locale !== 'en' && locale !== 'ja') throw new Error('bad locale: ' + locale);
  /** @type {{kind:'raw'|'term', text:string, tight:string, key?:string}[]} */
  const pieces = [];
  let i = 0;
  while (i < s.length) {
    let hit = null, hitLen = 0;
    const max = Math.min(MAXKEYLEN, s.length - i);
    for (let l = max; l >= 1; l--) {
      const t = DICT.get(s.substr(i, l));
      if (t) { hit = t; hitLen = l; break; }
    }
    if (hit) {
      pieces.push({ kind: 'term', text: hit[locale], tight: hit.tight || '', key: hit.keys[0] });
      i += hitLen;
      continue;
    }
    const ch = s[i];
    const last = pieces[pieces.length - 1];
    if (last && last.kind === 'raw') last.text += ch;
    else pieces.push({ kind: 'raw', text: ch, tight: '' });
    if (sink && CJK.test(ch)) sink.unresolved.add(ch + ' ⟵ ' + s.slice(0, i + 1));
    i++;
  }
  let out = '';
  for (let p = 0; p < pieces.length; p++) {
    const cur = pieces[p];
    if (p > 0) {
      const prev = pieces[p - 1];
      if (needSpace(prev, cur, prev.text[prev.text.length - 1], cur.text[0])) out += ' ';
    }
    out += cur.text;
  }
  return out;
}

/** 三語系一次產出 (key 順序固定 zh-hk / en / ja, 與原檔一致) */
export function localizeAll(raw, sink) {
  return {
    'zh-hk': localize(raw, 'zh-hk', sink),
    en: localize(raw, 'en', sink),
    ja: localize(raw, 'ja', sink),
  };
}

/**
 * 與 localize() 同一條管線, 但同時回報「輸出中的非術語原始字元」
 * (供驗收: 證明除術語替換與可讀性空格外, 沒有動到任何字元)
 */
export function localizeParts(raw, locale) {
  const s = String(raw);
  const pieces = [];
  let i = 0;
  while (i < s.length) {
    let hit = null, hitLen = 0;
    const max = Math.min(MAXKEYLEN, s.length - i);
    for (let l = max; l >= 1; l--) {
      const t = DICT.get(s.substr(i, l));
      if (t) { hit = t; hitLen = l; break; }
    }
    if (hit) { pieces.push({ kind: 'term', text: hit[locale], tight: hit.tight || '' }); i += hitLen; continue; }
    const ch = s[i];
    const last = pieces[pieces.length - 1];
    if (last && last.kind === 'raw') last.text += ch;
    else pieces.push({ kind: 'raw', text: ch, tight: '' });
    i++;
  }
  let text = '', rawChars = '';
  for (let p = 0; p < pieces.length; p++) {
    const cur = pieces[p];
    if (p > 0) {
      const prev = pieces[p - 1];
      if (needSpace(prev, cur, prev.text[prev.text.length - 1], cur.text[0])) text += ' ';
    }
    text += cur.text;
    if (cur.kind === 'raw') rawChars += cur.text;
  }
  return { text, rawChars };
}

/** 給 JSON 內的 name 物件用:
 *  - zh-hk: 一律用源頭字串本地化 (源頭 zh-hk 本身就是簡體原文; 絕不沿用, 否則簡體會漏進輸出)
 *  - en/ja: 若已提供且「該語系乾淨」→ 沿用策展值; 否則本地化源頭
 */
export function localizeName(name, locale, sink) {
  if (!name) return '';
  if (typeof name === 'object') {
    const raw = name['zh-hk'] || name.zh || name.en || name.ja || '';
    if (locale === 'zh-hk') return localize(raw, 'zh-hk', sink);
    const curated = name[locale];
    if (curated && isCleanFor(curated, locale)) return curated;
    return localize(raw, locale, sink);
  }
  return localize(name, locale, sink);
}

export function localizeNameAll(name, sink) {
  return { 'zh-hk': localizeName(name, 'zh-hk', sink), en: localizeName(name, 'en', sink), ja: localizeName(name, 'ja', sink) };
}

/** 該語系「乾淨」判斷: en 不得含 CJK/假名; ja 必須含假名 (真日文); zh-hk 不得含簡體專用字 */
export function isCleanFor(v, locale) {
  if (locale === 'en') return !CJK.test(v) && !KANA.test(v);
  if (locale === 'ja') return KANA.test(v);
  return !SIMP_ONLY.test(v);
}

export function unknownPartsIn(raw, locale) {
  const sink = { unresolved: new Set(), unknownTerms: new Set() };
  const out = localize(raw, locale, sink);
  return { out, unresolved: [...sink.unresolved] };
}

export { TERMS, SIMP_ONLY, CJK, KANA };
export const TERM_COUNT = TERMS.length;
export const KEY_COUNT = DICT.size;
/** 術語譯文中自帶數字的條目 (需人工確認它們是「名稱內的數字符號」而非價格數字, 例如 C1S = coated one side) */
export const TERMS_WITH_DIGITS = TERMS
  .filter(t => /\d/.test(t.en + t.ja + t['zh-hk']))
  .map(t => ({ key: t.keys[0], 'zh-hk': t['zh-hk'], en: t.en, ja: t.ja }));
