/**
 * products.ts 規格四欄 (specs.material / specs.size / specs.printMethod / specs.finishing) 三語映射 — **源頭資料**
 *
 * 為什麼是這一份 (Step 4 方案 (a), K3 拍板):
 *   · products.ts 的 material / size / printMethod / finishing **保持中文單值 = 事實源**, 不改型別契約
 *     (不動 data layer schema; zh-hk 頁面輸出逐字不變 ⇒ 零 churn)。
 *   · 本檔以**原文為 key** 提供 zh-hk / en / ja 三語值, 渲染層查表; 查不到 -> fallback 中文原文 (不報錯/不留空)。
 *   · 與 src/components/ProductTabs.tsx 既有的 specsBySlug 分工不同, 故不併入:
 *     specsBySlug 是**按 slug/類目**的 16 條策展文案 (類目級, 粗粒度);
 *     本檔是**按規格值**的 311 條逐字映射 (products.ts 逐 SKU 事實源, 細粒度), 兩者 key 空間不同、不可互換。
 *   · zh-hk 值 = 原文逐字 (原文本身即繁體港式, 已用門童 #4 SIMP_ZH 字集實測 0 命中);
 *     en = 門店/海外印刷通用英文 (C1S art paper / 4-color offset / matte or gloss lamination / spot UV /
 *          foil stamping / rounded-corner die-cut / grey board / book paper);
 *     ja = 日文印刷術語 (コート紙 / 4色オフセット / マット・グロスラミネート / スポットUV / 箔押し /
 *          角丸型抜き / グレー板紙)。
 *   · 數字與尺寸一律照抄原文 (350g → 350g, 210×297mm → 210×297mm, 20–120mm 原樣), 未做任何單位換算;
 *     size 欄只譯自然語言詞 (標準/可客製/自訂…), 括號依目標語系慣例 (en 半角, ja 全角)。
 *
 * 生成: node .hermes/_probe-pb/gen-spec-i18n.cjs (源 = .hermes/_probe-pb/_spec-tr-*.json, 逐條 anchor 斷言);
 *       本檔為**資料源頭**, 請直接改譯文並重跑生成器, 不要手改渲染層的字面量。
 */
import type { Locale } from '@/lib/seo';

export interface SpecI18nValue {
  'zh-hk': string;
  en: string;
  ja: string;
}

/** key = products.ts 規格原文 (material / size / printMethod / finishing) */
export const SPEC_I18N: Record<string, SpecI18nValue> = {
  "300g銅版紙或250g啞粉藝術紙；啞膠／光膠覆膜": { 'zh-hk': "300g銅版紙或250g啞粉藝術紙；啞膠／光膠覆膜", en: "300g art paper or 250g matte art paper; matte or gloss lamination", ja: "300gコート紙または250gマットアート紙；マット／グロスラミネート" },
  "四色柯式印刷（海德堡）": { 'zh-hk': "四色柯式印刷（海德堡）", en: "4-color offset printing (Heidelberg)", ja: "4色オフセット印刷（ハイデルベルク）" },
  "覆膜（啞膠／光膠）、局部UV、燙金、圓角模切": { 'zh-hk': "覆膜（啞膠／光膠）、局部UV、燙金、圓角模切", en: "Lamination (matte/gloss), spot UV, foil stamping, rounded-corner die-cut", ja: "ラミネート（マット／グロス）、スポットUV、箔押し、角丸型抜き" },
  "400g超厚銅版紙；啞膠／光膠覆膜；可選三合一裱貼（700-810g 超厚檔）": { 'zh-hk': "400g超厚銅版紙；啞膠／光膠覆膜；可選三合一裱貼（700-810g 超厚檔）", en: "400g extra-thick art paper; matte or gloss lamination; optional triple-layer mounting (700-810g extra-thick option)", ja: "400g超厚コート紙；マット／グロスラミネート；オプションで3層貼り合わせ（700-810g 特厚仕様）" },
  "四色柯式印刷": { 'zh-hk': "四色柯式印刷", en: "4-color offset printing", ja: "4色オフセット印刷" },
  "覆膜（啞膠／光膠）、燙金／燙銀、局部UV、擊凸、圓角模切": { 'zh-hk': "覆膜（啞膠／光膠）、燙金／燙銀、局部UV、擊凸、圓角模切", en: "Lamination (matte/gloss), gold/silver foil stamping, spot UV, embossing, rounded-corner die-cut", ja: "ラミネート（マット／グロス）、金／銀箔押し、スポットUV、エンボス、角丸型抜き" },
  "300g銅版紙或棉質紙；燙金／燙銀／玫瑰金": { 'zh-hk': "300g銅版紙或棉質紙；燙金／燙銀／玫瑰金", en: "300g art paper or cotton paper; gold/silver/rose gold foil stamping", ja: "300gコート紙またはコットン紙；金／銀／ローズゴールド箔押し" },
  "四色柯式＋燙金": { 'zh-hk': "四色柯式＋燙金", en: "4-color offset + foil stamping", ja: "4色オフセット＋箔押し" },
  "覆膜（啞膠／光膠）、燙金、圓角模切": { 'zh-hk': "覆膜（啞膠／光膠）、燙金、圓角模切", en: "Lamination (matte/gloss), foil stamping, rounded-corner die-cut", ja: "ラミネート（マット／グロス）、箔押し、角丸型抜き" },
  "300g銅版紙或合成紙；局部UV光油": { 'zh-hk': "300g銅版紙或合成紙；局部UV光油", en: "300g art paper or synthetic paper; spot UV varnish", ja: "300gコート紙または合成紙；スポットUVニス" },
  "四色柯式＋局部UV": { 'zh-hk': "四色柯式＋局部UV", en: "4-color offset + spot UV", ja: "4色オフセット＋スポットUV" },
  "局部UV、覆膜（啞膠／光膠）、圓角模切": { 'zh-hk': "局部UV、覆膜（啞膠／光膠）、圓角模切", en: "Spot UV, lamination (matte/gloss), rounded-corner die-cut", ja: "スポットUV、ラミネート（マット／グロス）、角丸型抜き" },
  "300g啞粉紙或環保紙；啞膠覆膜": { 'zh-hk': "300g啞粉紙或環保紙；啞膠覆膜", en: "300g matte coated paper or eco paper; matte lamination", ja: "300gマットコート紙またはエコ紙；マットラミネート" },
  "啞膠覆膜、燙金、壓凹、圓角模切": { 'zh-hk': "啞膠覆膜、燙金、壓凹、圓角模切", en: "Matte lamination, foil stamping, debossing, rounded-corner die-cut", ja: "マットラミネート、箔押し、デボス、角丸型抜き" },
  "300g銅版紙或藝術紙；啞膠／光膠覆膜": { 'zh-hk': "300g銅版紙或藝術紙；啞膠／光膠覆膜", en: "300g C1S art paper or art paper; matte or gloss lamination", ja: "300gコート紙またはアート紙；マット／グロスラミネート" },
  "覆膜（啞膠／光膠）、燙金、局部UV、圓角模切": { 'zh-hk': "覆膜（啞膠／光膠）、燙金、局部UV、圓角模切", en: "Lamination (matte/gloss), spot UV, foil stamping, rounded-corner die-cut", ja: "ラミネート（マット／グロス）、スポットUV、箔押し、角丸型抜き" },
  "PVC 防水／PP 合成紙；可覆啞膜或光膜": { 'zh-hk': "PVC 防水／PP 合成紙；可覆啞膜或光膜", en: "PVC waterproof / PP synthetic paper; optional matte or gloss film lamination", ja: "PVC防水／PP合成紙；マットまたはグロスフィルム加工可" },
  "四色數碼或柯式（依數量）": { 'zh-hk': "四色數碼或柯式（依數量）", en: "4-color digital or offset (depending on quantity)", ja: "4色デジタルまたはオフセット（数量による）" },
  "模切、覆膜（啞膜／光膜）、局部可選工藝": { 'zh-hk': "模切、覆膜（啞膜／光膜）、局部可選工藝", en: "Die-cut, lamination (matte/gloss film), optional spot finishing", ja: "型抜き、ラミネート（マット／グロスフィルム）、部分オプション加工" },
  "透明 PET；可選白墨、啞膜／光膜": { 'zh-hk': "透明 PET；可選白墨、啞膜／光膜", en: "Clear PET; optional white ink, matte/gloss film", ja: "透明PET；白インキ、マット／グロスフィルム オプション" },
  "CMYK＋可選白墨（依設計）": { 'zh-hk': "CMYK＋可選白墨（依設計）", en: "CMYK + optional white ink (depending on design)", ja: "CMYK＋白インキ オプション（デザインによる）" },
  "覆膜（啞膜／光膜）、模切、可選局部 UV": { 'zh-hk': "覆膜（啞膜／光膜）、模切、可選局部 UV", en: "Lamination (matte/gloss film), die-cut, optional spot UV", ja: "ラミネート（マット／グロスフィルム）、型抜き、スポットUV オプション" },
  "PP 合成紙／PET 透明膜；可移膠": { 'zh-hk': "PP 合成紙／PET 透明膜；可移膠", en: "PP synthetic paper / clear PET film; removable adhesive", ja: "PP合成紙／透明PETフィルム；再剥離粘着剤" },
  "模切、覆膜（啞膜／光膜）": { 'zh-hk': "模切、覆膜（啞膜／光膜）", en: "Die-cut, lamination (matte/gloss film)", ja: "型抜き、ラミネート（マット／グロスフィルム）" },
  "銅版紙／PP 合成紙／透明 PVC／Kraft 牛皮紙": { 'zh-hk': "銅版紙／PP 合成紙／透明 PVC／Kraft 牛皮紙", en: "C1S art paper / PP synthetic paper / clear PVC / kraft paper", ja: "コート紙／PP合成紙／透明PVC／クラフト紙" },
  "四色數碼印刷（HP Indigo）": { 'zh-hk': "四色數碼印刷（HP Indigo）", en: "4-color digital printing (HP Indigo)", ja: "4色デジタル印刷（HP Indigo）" },
  "模切、圓角、局部燙金、覆膜": { 'zh-hk': "模切、圓角、局部燙金、覆膜", en: "Die-cut, rounded corners, spot foil stamping, lamination", ja: "型抜き、角丸、部分箔押し、ラミネート" },
  "PVC／PP 合成紙／透明 PET；可覆膜": { 'zh-hk': "PVC／PP 合成紙／透明 PET；可覆膜", en: "PVC / PP synthetic paper / clear PET; optional lamination", ja: "PVC／PP合成紙／透明PET；ラミネート加工可" },
  "四色數碼或柯式": { 'zh-hk': "四色數碼或柯式", en: "4-color digital or offset", ja: "4色デジタルまたはオフセット" },
  "模切（全切／吻切）、啞膜／光膜": { 'zh-hk': "模切（全切／吻切）、啞膜／光膜", en: "Die-cut (full cut / kiss cut), matte/gloss film", ja: "型抜き（全抜き／キスカット）、マット／グロスフィルム" },
  "銅版紙／合成紙；可覆啞膜／光膜": { 'zh-hk': "銅版紙／合成紙；可覆啞膜／光膜", en: "C1S art paper / synthetic paper; optional matte/gloss film lamination", ja: "コート紙／合成紙；マット／グロスフィルム加工可" },
  "四色印刷＋燙金（分版）": { 'zh-hk': "四色印刷＋燙金（分版）", en: "4-color printing + foil stamping (separate plate)", ja: "4色印刷＋箔押し（版分け）" },
  "燙金／燙銀、模切、可選局部 UV": { 'zh-hk': "燙金／燙銀、模切、可選局部 UV", en: "Gold/silver foil stamping, die-cut, optional spot UV", ja: "金／銀箔押し、型抜き、スポットUV オプション" },
  "易碎紙／VOID／合成紙＋全息膜等（依方案）": { 'zh-hk': "易碎紙／VOID／合成紙＋全息膜等（依方案）", en: "Tamper-evident paper / VOID / synthetic paper + holographic film, etc. (depending on the option)", ja: "易破壊紙／VOID／合成紙＋ホログラムフィルム等（仕様による）" },
  "可變數碼印刷為主；可搭配專色": { 'zh-hk': "可變數碼印刷為主；可搭配專色", en: "Mainly variable-data digital printing; spot color available", ja: "バリアブルデジタル印刷主体；特色併用可" },
  "模切、全息冷燙或燙金（依稿）": { 'zh-hk': "模切、全息冷燙或燙金（依稿）", en: "Die-cut, holographic cold foil or hot foil stamping (as per artwork)", ja: "型抜き、ホログラムコールド箔または箔押し（データによる）" },
  "螢光 PVC 膜／螢光紙；螢光油墨": { 'zh-hk': "螢光 PVC 膜／螢光紙；螢光油墨", en: "Fluorescent PVC film / fluorescent paper; fluorescent ink", ja: "蛍光PVCフィルム／蛍光紙；蛍光インキ" },
  "模切、反光條紋覆合、覆膜": { 'zh-hk': "模切、反光條紋覆合、覆膜", en: "Die-cut, reflective stripe lamination, film lamination", ja: "型抜き、反射ストライプ貼合、ラミネート" },
  "牛皮紙 120–200g 級（依報價）；可配手挽材": { 'zh-hk': "牛皮紙 120–200g 級（依報價）；可配手挽材", en: "Kraft paper 120–200g grade (per quote); handle material available", ja: "クラフト紙 120–200g グレード（見積による）；手提げ素材対応可" },
  "單色至四色；可數碼打樣": { 'zh-hk': "單色至四色；可數碼打樣", en: "1-color to 4-color; digital proofing available", ja: "1色〜4色；デジタル校正可" },
  "燙金／燙銀、局部 UV、覆膜（視材）": { 'zh-hk': "燙金／燙銀、局部 UV、覆膜（視材）", en: "Gold/silver foil stamping, spot UV, lamination (depending on material)", ja: "金／銀箔押し、スポットUV、ラミネート（素材による）" },
  "白卡紙 200–300g 級（依報價）；可覆膜": { 'zh-hk': "白卡紙 200–300g 級（依報價）；可覆膜", en: "White card stock 200–300g grade (per quote); lamination available", ja: "白カード紙 200–300g グレード（見積による）；ラミネート可" },
  "四色＋可選專色／燙金": { 'zh-hk': "四色＋可選專色／燙金", en: "4-color + optional spot color / foil stamping", ja: "4色＋特色／箔押し オプション" },
  "覆膜、燙金／燙銀、局部 UV、模切糊袋": { 'zh-hk': "覆膜、燙金／燙銀、局部 UV、模切糊袋", en: "Lamination, gold/silver foil stamping, spot UV, die-cut and bag gluing", ja: "ラミネート、金／銀箔押し、スポットUV、型抜き・袋糊付け" },
  "白卡／特種紙／珠光紙（依稿）；可覆膜": { 'zh-hk': "白卡／特種紙／珠光紙（依稿）；可覆膜", en: "White card / specialty paper / pearl paper (as per artwork); lamination available", ja: "白カード／特殊紙／パール紙（データによる）；ラミネート可" },
  "四色＋燙金／局部 UV": { 'zh-hk': "四色＋燙金／局部 UV", en: "4-color + foil stamping / spot UV", ja: "4色＋箔押し／スポットUV" },
  "燙金、局部 UV、緞帶或棉繩手挽": { 'zh-hk': "燙金、局部 UV、緞帶或棉繩手挽", en: "Foil stamping, spot UV, ribbon or cotton rope handles", ja: "箔押し、スポットUV、リボンまたは綿ロープ手提げ" },
  "FSC 牛皮／再生紙（依供應）；大豆油墨": { 'zh-hk': "FSC 牛皮／再生紙（依供應）；大豆油墨", en: "FSC kraft / recycled paper (subject to supply); soy ink", ja: "FSCクラフト／再生紙（仕入れによる）；大豆インキ" },
  "單色至四色（依設計）": { 'zh-hk': "單色至四色（依設計）", en: "1-color to 4-color (depending on design)", ja: "1色〜4色（デザインによる）" },
  "手挽、可選燙金／覆膜（視材）": { 'zh-hk': "手挽、可選燙金／覆膜（視材）", en: "Handles, optional foil stamping / lamination (depending on material)", ja: "手提げ、箔押し／ラミネート オプション（素材による）" },
  "牛皮／白卡；手挽棉繩或扁紙": { 'zh-hk': "牛皮／白卡；手挽棉繩或扁紙", en: "Kraft / white card; cotton rope or flat paper handles", ja: "クラフト／白カード；綿ロープまたは紙フラット手提げ" },
  "四色印刷為主": { 'zh-hk': "四色印刷為主", en: "Mainly 4-color printing", ja: "4色印刷主体" },
  "穿孔打釘、底卡加固、可覆膜": { 'zh-hk': "穿孔打釘、底卡加固、可覆膜", en: "Punched holes with rivets, reinforced base card, optional lamination", ja: "穴あけ・リベット留め、台紙補強、ラミネート可" },
  "250g 白卡紙／300g 牛皮紙／280g 特種紋理紙": { 'zh-hk': "250g 白卡紙／300g 牛皮紙／280g 特種紋理紙", en: "250g white card stock / 300g kraft paper / 280g textured specialty paper", ja: "250g白カード紙／300gクラフト紙／280gテクスチャー特殊紙" },
  "燙金／燙銀、擊凸、手挽繩、底部加固": { 'zh-hk': "燙金／燙銀、擊凸、手挽繩、底部加固", en: "Gold/silver foil stamping, embossing, rope handles, reinforced base", ja: "金／銀箔押し、エンボス、紙ひも手提げ、底部補強" },
  "157g銅版紙或128g啞粉紙": { 'zh-hk': "157g銅版紙或128g啞粉紙", en: "157g C1S art paper or 128g matte coated paper", ja: "157gコート紙または128gマットコート紙" },
  "四色柯式或數碼印刷": { 'zh-hk': "四色柯式或數碼印刷", en: "4-color offset or digital printing", ja: "4色オフセットまたはデジタル印刷" },
  "覆膜（啞膜／光膜可選）": { 'zh-hk': "覆膜（啞膜／光膜可選）", en: "Lamination (matte/gloss film optional)", ja: "ラミネート（マット／グロスフィルム選択可）" },
  "128g銅版紙或100g書紙": { 'zh-hk': "128g銅版紙或100g書紙", en: "128g C1S art paper or 100g book paper", ja: "128gコート紙または100g書籍紙" },
  "四色數碼印刷": { 'zh-hk': "四色數碼印刷", en: "4-color digital printing", ja: "4色デジタル印刷" },
  "四色雙面柯式印刷": { 'zh-hk': "四色雙面柯式印刷", en: "4-color double-sided offset printing", ja: "4色両面オフセット印刷" },
  "157g或200g銅版紙": { 'zh-hk': "157g或200g銅版紙", en: "157g or 200g C1S art paper", ja: "157gまたは200gコート紙" },
  "壓線、覆膜（啞膜／光膜可選）": { 'zh-hk': "壓線、覆膜（啞膜／光膜可選）", en: "Creasing, lamination (matte/gloss film optional)", ja: "スジ入れ、ラミネート（マット／グロスフィルム選択可）" },
  "200g或250g銅版紙": { 'zh-hk': "200g或250g銅版紙", en: "200g or 250g C1S art paper", ja: "200gまたは250gコート紙" },
  "FSC認證再生紙；大豆油墨": { 'zh-hk': "FSC認證再生紙；大豆油墨", en: "FSC-certified recycled paper; soy ink", ja: "FSC認証再生紙；大豆インキ" },
  "四色數碼或柯式印刷": { 'zh-hk': "四色數碼或柯式印刷", en: "4-color digital or offset printing", ja: "4色デジタルまたはオフセット印刷" },
  "無覆膜（環保）或水性光油": { 'zh-hk': "無覆膜（環保）或水性光油", en: "No lamination (eco) or water-based varnish", ja: "ラミネートなし（環境配慮）または水性ニス" },
  "157g銅版紙": { 'zh-hk': "157g銅版紙", en: "157g C1S art paper", ja: "157gコート紙" },
  "四色高速數碼印刷": { 'zh-hk': "四色高速數碼印刷", en: "4-color high-speed digital printing", ja: "4色高速デジタル印刷" },
  "無覆膜或啞膜（加時）": { 'zh-hk': "無覆膜或啞膜（加時）", en: "No lamination or matte film (extra lead time)", ja: "ラミネートなしまたはマットフィルム（納期延長）" },
  "157g 銅版紙（可升 200g／相紙）": { 'zh-hk': "157g 銅版紙（可升 200g／相紙）", en: "157g C1S art paper (upgradable to 200g / photo paper)", ja: "157gコート紙（200g／写真用紙へアップグレード可）" },
  "柯式或高品數碼": { 'zh-hk': "柯式或高品數碼", en: "Offset or high-quality digital", ja: "オフセットまたは高品質デジタル" },
  "PP 裱貼、泡沫板裱貼（可選）": { 'zh-hk': "PP 裱貼、泡沫板裱貼（可選）", en: "PP mounting, foam board mounting (optional)", ja: "PP貼り、フォームボード貼り（オプション）" },
  "157–200g 銅版或相紙": { 'zh-hk': "157–200g 銅版或相紙", en: "157–200g C1S art paper or photo paper", ja: "157–200gコート紙または写真用紙" },
  "柯式為主；急件數碼": { 'zh-hk': "柯式為主；急件數碼", en: "Mainly offset; digital for rush orders", ja: "オフセット主体；急ぎはデジタル" },
  "PP 護膜、泡沫板裱貼（可選）": { 'zh-hk': "PP 護膜、泡沫板裱貼（可選）", en: "PP protective film, foam board mounting (optional)", ja: "PP保護フィルム、フォームボード貼り（オプション）" },
  "戶外 PVC／PET／合成紙": { 'zh-hk': "戶外 PVC／PET／合成紙", en: "Outdoor PVC / PET / synthetic paper", ja: "屋外PVC／PET／合成紙" },
  "戶外噴繪或 UV": { 'zh-hk': "戶外噴繪或 UV", en: "Outdoor inkjet printing or UV printing", ja: "屋外インクジェット印刷またはUV印刷" },
  "霧面護膜、打扣（可選）": { 'zh-hk': "霧面護膜、打扣（可選）", en: "Matte protective film, grommets (optional)", ja: "マット保護フィルム、ハトメ（オプション）" },
  "180g–200g PP 合成紙／背膠 PVC；UV 固化油墨": { 'zh-hk': "180g–200g PP 合成紙／背膠 PVC；UV 固化油墨", en: "180g–200g PP synthetic paper / adhesive-backed PVC; UV-cured ink", ja: "180g–200g PP合成紙／粘着PVC；UV硬化インキ" },
  "環保溶劑或 UV 大判噴繪": { 'zh-hk': "環保溶劑或 UV 大判噴繪", en: "Eco-solvent or UV large-format inkjet printing", ja: "エコソルベントまたはUV大判インクジェット印刷" },
  "覆膜（啞膜／光膜）、穿繩孔、雙面輸出": { 'zh-hk': "覆膜（啞膜／光膜）、穿繩孔、雙面輸出", en: "Lamination (matte/gloss film), rope holes, double-sided output", ja: "ラミネート（マット／グロスフィルム）、紐通し穴、両面出力" },
  "200g–250g 啞粉藝術紙／260g 純棉無酸紙；12 色顏料墨水": { 'zh-hk': "200g–250g 啞粉藝術紙／260g 純棉無酸紙；12 色顏料墨水", en: "200g–250g matte art paper / 260g 100% cotton acid-free paper; 12-color pigment ink", ja: "200g–250gマットアート紙／260g純棉無酸性紙；12色顔料インキ" },
  "12 色藝術微噴（Giclée）": { 'zh-hk': "12 色藝術微噴（Giclée）", en: "12-color giclée printing", ja: "12色ジクレー印刷" },
  "啞面／絲絨面／半光面、無框畫裝裱": { 'zh-hk': "啞面／絲絨面／半光面、無框畫裝裱", en: "Matte / velvet / satin finish, frameless canvas mounting", ja: "マット／ベルベット／半光沢、額なしキャンバス張り" },
  "150g–180g 背膠 PP／鑄造級 PVC；導氣槽底紙": { 'zh-hk': "150g–180g 背膠 PP／鑄造級 PVC；導氣槽底紙", en: "150g–180g adhesive-backed PP / cast PVC; air-release liner", ja: "150g–180g 粘着PP／キャストPVC；エアフロー加工台紙" },
  "模切、鏤空、光膜／啞膜覆合": { 'zh-hk': "模切、鏤空、光膜／啞膜覆合", en: "Die-cut, cut-out, gloss/matte film lamination", ja: "型抜き、抜き加工、グロス／マットフィルム貼合" },
  "350g 食品級白卡／400g 灰底白板；PE 淋膜或 PLA 內層": { 'zh-hk': "350g 食品級白卡／400g 灰底白板；PE 淋膜或 PLA 內層", en: "350g food-grade white card / 400g duplex board (grey back); PE coating or PLA liner", ja: "350g食品グレード白カード／400gグレー裏白板紙；PEラミネートまたはPLA内層" },
  "四色柯式或數碼（依數量）": { 'zh-hk': "四色柯式或數碼（依數量）", en: "4-color offset or digital (depending on quantity)", ja: "4色オフセットまたはデジタル（数量による）" },
  "燙金／燙銀、窗口（PET）、局部 UV、覆膜": { 'zh-hk': "燙金／燙銀、窗口（PET）、局部 UV、覆膜", en: "Gold/silver foil stamping, PET window, spot UV, lamination", ja: "金／銀箔押し、窓（PET）、スポットUV、ラミネート" },
  "1200-1500g 灰板裱糊 白卡 / 觸感紙 / 珠光紙; 內托 EVA / 紙漿 / PET 吸塑": { 'zh-hk': "1200-1500g 灰板裱糊 白卡 / 觸感紙 / 珠光紙; 內托 EVA / 紙漿 / PET 吸塑", en: "1200-1500g grey board wrapped in white card / soft-touch paper / pearl paper; EVA / moulded pulp / PET blister insert", ja: "1200-1500gグレー板紙に白カード／ソフトタッチ紙／パール紙を貼り加工; 内台 EVA／パルプ／PETブリスタ" },
  "四色柯式 + 專色; 可逆向 UV": { 'zh-hk': "四色柯式 + 專色; 可逆向 UV", en: "4-color offset + spot color; reverse UV optional", ja: "4色オフセット＋特色; 逆UV可" },
  "覆膜 (啞/觸感/光) + 燙金 (金/銀/玫瑰金) + 局部 UV + 擊凸 + 糊盒": { 'zh-hk': "覆膜 (啞/觸感/光) + 燙金 (金/銀/玫瑰金) + 局部 UV + 擊凸 + 糊盒", en: "Lamination (matte/soft-touch/gloss) + foil stamping (gold/silver/rose gold) + spot UV + embossing + box gluing", ja: "ラミネート（マット／ソフトタッチ／グロス）＋箔押し（金／銀／ローズゴールド）＋スポットUV＋エンボス＋箱糊付け" },
  "E／B 坑瓦楞或白卡裱瓦（依載重）": { 'zh-hk': "E／B 坑瓦楞或白卡裱瓦（依載重）", en: "E/B-flute corrugated or white card laminated to corrugated (depending on load)", ja: "E／Bフルート段ボールまたは白カード貼り段ボール（耐荷重による）" },
  "柔性版或柯式（依量與色數）": { 'zh-hk': "柔性版或柯式（依量與色數）", en: "Flexo or offset (depending on volume and colors)", ja: "フレキソまたはオフセット（数量・色数による）" },
  "模切、壓線、自黏封口（可諮詢）": { 'zh-hk': "模切、壓線、自黏封口（可諮詢）", en: "Die-cut, creasing, peel-and-seal closure (on request)", ja: "型抜き、スジ入れ、粘着シール封緘（ご相談可）" },
  "300g–350g 白卡紙／E 坑瓦楞紙板": { 'zh-hk': "300g–350g 白卡紙／E 坑瓦楞紙板", en: "300g–350g white card stock / E-flute corrugated board", ja: "300g–350g白カード紙／Eフルート段ボール" },
  "覆膜（啞膜／光膜）、燙金、局部 UV、條碼": { 'zh-hk': "覆膜（啞膜／光膜）、燙金、局部 UV、條碼", en: "Lamination (matte/gloss film), foil stamping, spot UV, barcode", ja: "ラミネート（マット／グロスフィルム）、箔押し、スポットUV、バーコード" },
  "灰板＋特種裱面紙；可選磁吸五金": { 'zh-hk': "灰板＋特種裱面紙；可選磁吸五金", en: "Grey board + specialty wrapped paper; optional magnetic hardware", ja: "グレー板紙＋特殊貼り紙；マグネット金具 オプション" },
  "柯式面紙印刷＋後工": { 'zh-hk': "柯式面紙印刷＋後工", en: "Offset printing on the wrap paper + finishing", ja: "貼り紙オフセット印刷＋後加工" },
  "燙金、壓紋、局部 UV、手工糊盒": { 'zh-hk': "燙金、壓紋、局部 UV、手工糊盒", en: "Foil stamping, embossed texture, spot UV, hand-finished box gluing", ja: "箔押し、型押し、スポットUV、手作業による箱糊付け" },
  "120g紅色紙張；燙金／燙銀": { 'zh-hk': "120g紅色紙張；燙金／燙銀", en: "120g red paper; gold/silver foil stamping", ja: "120g赤い紙；金／銀箔押し" },
  "四色印刷＋燙金": { 'zh-hk': "四色印刷＋燙金", en: "4-color printing + foil stamping", ja: "4色印刷＋箔押し" },
  "燙金、壓凹、局部UV": { 'zh-hk': "燙金、壓凹、局部UV", en: "Foil stamping, debossing, spot UV", ja: "箔押し、デボス、スポットUV" },
  "150g紅色紙張；浮雕＋燙金": { 'zh-hk': "150g紅色紙張；浮雕＋燙金", en: "150g red paper; embossed relief + foil stamping", ja: "150g赤い紙；レリーフエンボス＋箔押し" },
  "四色印刷＋浮雕": { 'zh-hk': "四色印刷＋浮雕", en: "4-color printing + embossed relief", ja: "4色印刷＋レリーフエンボス" },
  "浮雕、燙金、壓凹": { 'zh-hk': "浮雕、燙金、壓凹", en: "Embossed relief, foil stamping, debossing", ja: "レリーフエンボス、箔押し、デボス" },
  "120g–150g紅色或特殊色紙張": { 'zh-hk': "120g–150g紅色或特殊色紙張", en: "120g–150g red or specialty-colored paper", ja: "120g–150g赤または特殊色の紙" },
  "四色印刷＋燙金／UV": { 'zh-hk': "四色印刷＋燙金／UV", en: "4-color printing + foil stamping / UV", ja: "4色印刷＋箔押し／UV" },
  "燙金、局部UV、壓凹、異形模切": { 'zh-hk': "燙金、局部UV、壓凹、異形模切", en: "Foil stamping, spot UV, debossing, custom-shape die-cut", ja: "箔押し、スポットUV、デボス、異形型抜き" },
  "120g銅版紙或環保紙": { 'zh-hk': "120g銅版紙或環保紙", en: "120g C1S art paper or eco paper", ja: "120gコート紙またはエコ紙" },
  "燙金、局部UV（可選）": { 'zh-hk': "燙金、局部UV（可選）", en: "Foil stamping, spot UV (optional)", ja: "箔押し、スポットUV（オプション）" },
  "FSC認證再生紙或種子紙；大豆油墨": { 'zh-hk': "FSC認證再生紙或種子紙；大豆油墨", en: "FSC-certified recycled paper or seed paper; soy ink", ja: "FSC認証再生紙またはシードペーパー；大豆インキ" },
  "無覆膜（環保）": { 'zh-hk': "無覆膜（環保）", en: "No lamination (eco)", ja: "ラミネートなし（環境配慮）" },
  "150g–200g紅色紙張": { 'zh-hk': "150g–200g紅色紙張", en: "150g–200g red paper", ja: "150g–200g赤い紙" },
  "燙金、浮雕、局部UV": { 'zh-hk': "燙金、浮雕、局部UV", en: "Foil stamping, embossed relief, spot UV", ja: "箔押し、レリーフエンボス、スポットUV" },
  "250g–300g銅版紙或啞粉紙；金屬圈": { 'zh-hk': "250g–300g銅版紙或啞粉紙；金屬圈", en: "250g–300g C1S art paper or matte coated paper; wire-o ring", ja: "250g–300gコート紙またはマットコート紙；リング" },
  "金屬圈裝訂、打掛孔": { 'zh-hk': "金屬圈裝訂、打掛孔", en: "Wire-o binding, hanging holes", ja: "リング製本、吊り下げ穴" },
  "200g–250g銅版紙或卡紙；三角座架": { 'zh-hk': "200g–250g銅版紙或卡紙；三角座架", en: "200g–250g C1S art paper or card stock; triangular easel", ja: "200g–250gコート紙またはカード紙；三角台紙スタンド" },
  "三角座架、騎馬釘或膠裝": { 'zh-hk': "三角座架、騎馬釘或膠裝", en: "Triangular easel, saddle stitch or perfect binding", ja: "三角台紙スタンド、中綴じまたは無線綴じ" },
  "250g–300g藝術紙或銅版紙": { 'zh-hk': "250g–300g藝術紙或銅版紙", en: "250g–300g art paper or C1S art paper", ja: "250g–300gアート紙またはコート紙" },
  "燙金、局部UV、金屬圈或騎馬釘": { 'zh-hk': "燙金、局部UV、金屬圈或騎馬釘", en: "Foil stamping, spot UV, wire-o ring or saddle stitch", ja: "箔押し、スポットUV、リングまたは中綴じ" },
  "150g–200g銅版紙或卡紙": { 'zh-hk': "150g–200g銅版紙或卡紙", en: "150g–200g C1S art paper or card stock", ja: "150g–200gコート紙またはカード紙" },
  "騎馬釘或單張裁切": { 'zh-hk': "騎馬釘或單張裁切", en: "Saddle stitch or single-sheet trim", ja: "中綴じまたはシート断裁" },
  "250g–300g銅版紙或相紙；硬紙板相架": { 'zh-hk': "250g–300g銅版紙或相紙；硬紙板相架", en: "250g–300g C1S art paper or photo paper; rigid board easel frame", ja: "250g–300gコート紙または写真用紙；厚紙フレームスタンド" },
  "硬紙板相架底座、騎馬釘": { 'zh-hk': "硬紙板相架底座、騎馬釘", en: "Rigid board easel base, saddle stitch", ja: "厚紙フレーム台座、中綴じ" },
  "200g–250g銅版紙或合成紙；0.5mm或1mm軟磁片": { 'zh-hk': "200g–250g銅版紙或合成紙；0.5mm或1mm軟磁片", en: "200g–250g C1S art paper or synthetic paper; 0.5mm or 1mm magnetic sheet", ja: "200g–250gコート紙または合成紙；0.5mmまたは1mmマグネットシート" },
  "軟磁片貼合、圓角裁切": { 'zh-hk': "軟磁片貼合、圓角裁切", en: "Magnetic sheet lamination, rounded-corner trim", ja: "マグネットシート貼合、角丸断裁" },
  "0.5mm–1.0mm透明或白色PVC膠片": { 'zh-hk': "0.5mm–1.0mm透明或白色PVC膠片", en: "0.5mm–1.0mm clear or white PVC sheet", ja: "0.5mm–1.0mm透明または白PVCシート" },
  "四色UV印刷": { 'zh-hk': "四色UV印刷", en: "4-color UV printing", ja: "4色UV印刷" },
  "圓角或直角裁切": { 'zh-hk': "圓角或直角裁切", en: "Rounded-corner or square-corner trim", ja: "角丸または直角断裁" },
  "200g–250g銅版紙或啞粉紙；啞膠或光膠覆膜": { 'zh-hk': "200g–250g銅版紙或啞粉紙；啞膠或光膠覆膜", en: "200g–250g C1S art paper or matte coated paper; matte or gloss lamination", ja: "200g–250gコート紙またはマットコート紙；マットまたはグロスラミネート" },
  "四色印刷": { 'zh-hk': "四色印刷", en: "4-color printing", ja: "4色印刷" },
  "覆膜（啞膠／光膠）、圓角裁切": { 'zh-hk': "覆膜（啞膠／光膠）、圓角裁切", en: "Lamination (matte/gloss), rounded-corner trim", ja: "ラミネート（マット／グロス）、角丸断裁" },
  "硬紙板封面裱糊銅版紙；內頁200g銅版紙": { 'zh-hk': "硬紙板封面裱糊銅版紙；內頁200g銅版紙", en: "Rigid board cover wrapped in C1S art paper; 200g art paper inner pages", ja: "厚紙表紙にコート紙貼り；本文200gコート紙" },
  "燙金、壓凹、騎馬釘或膠裝": { 'zh-hk': "燙金、壓凹、騎馬釘或膠裝", en: "Foil stamping, debossing, saddle stitch or perfect binding", ja: "箔押し、デボス、中綴じまたは無線綴じ" },
  "200g–250g銅版紙或合成紙；啞膠覆膜": { 'zh-hk': "200g–250g銅版紙或合成紙；啞膠覆膜", en: "200g–250g C1S art paper or synthetic paper; matte lamination", ja: "200g–250gコート紙または合成紙；マットラミネート" },
  "覆膜（啞膠）、圓角裁切": { 'zh-hk': "覆膜（啞膠）、圓角裁切", en: "Lamination (matte), rounded-corner trim", ja: "ラミネート（マット）、角丸断裁" },
  "100g–120g書紙或再生紙": { 'zh-hk': "100g–120g書紙或再生紙", en: "100g–120g book paper or recycled paper", ja: "100g–120g書籍紙または再生紙" },
  "無覆膜（即棄）": { 'zh-hk': "無覆膜（即棄）", en: "No lamination (single-use)", ja: "ラミネートなし（使い捨て）" },
  "外光／內光 PVC 燈布（依場景）": { 'zh-hk': "外光／內光 PVC 燈布（依場景）", en: "Frontlit / backlit PVC banner vinyl (depending on the use case)", ja: "前面照明／背面照明用PVCターポリン（用途による）" },
  "弱溶劑／溶劑／UV 噴繪": { 'zh-hk': "弱溶劑／溶劑／UV 噴繪", en: "Eco-solvent / solvent / UV inkjet printing", ja: "エコソルベント／ソルベント／UVインクジェット印刷" },
  "打扣、焊邊、筒芯出貨（可選）": { 'zh-hk': "打扣、焊邊、筒芯出貨（可選）", en: "Grommets, welded hem, shipped on core (optional)", ja: "ハトメ、溶着ヘム、巻き取り出荷（オプション）" },
  "PET／PVC 片或防水合成紙；鋁合金支架": { 'zh-hk': "PET／PVC 片或防水合成紙；鋁合金支架", en: "PET / PVC sheet or waterproof synthetic paper; aluminium stand", ja: "PET／PVCシートまたは防水合成紙；アルミスタンド" },
  "噴繪或 UV 印刷（依材）": { 'zh-hk': "噴繪或 UV 印刷（依材）", en: "Inkjet or UV printing (depending on material)", ja: "インクジェットまたはUV印刷（素材による）" },
  "加重桿、牛津布袋／硬殼箱（可選）": { 'zh-hk': "加重桿、牛津布袋／硬殼箱（可選）", en: "Weighted bar, Oxford bag / hard case (optional)", ja: "重りバー、オックスフォード袋／ハードケース（オプション）" },
  "PVC 車貼／可移膠／透明膜（依場景）": { 'zh-hk': "PVC 車貼／可移膠／透明膜（依場景）", en: "PVC vehicle wrap / removable adhesive / clear film (depending on the use case)", ja: "PVCカッティングシート／再剥離粘着／透明フィルム（用途による）" },
  "溶劑／弱溶劑／UV 噴繪": { 'zh-hk': "溶劑／弱溶劑／UV 噴繪", en: "Solvent / eco-solvent / UV inkjet printing", ja: "ソルベント／エコソルベント／UVインクジェット印刷" },
  "霧面護膜、異形裁切（可選）": { 'zh-hk': "霧面護膜、異形裁切（可選）", en: "Matte protective film, custom-shape trim (optional)", ja: "マット保護フィルム、異形断裁（オプション）" },
  "鑄造級 PVC 車貼 80–100 微米；可移膠＋導氣槽": { 'zh-hk': "鑄造級 PVC 車貼 80–100 微米；可移膠＋導氣槽", en: "Cast PVC vehicle wrap 80–100 micron; removable adhesive + air-release channels", ja: "キャストPVCカッティングシート 80–100ミクロン；再剥離粘着＋エアフロー加工" },
  "UV 固化或環保溶劑大判噴繪": { 'zh-hk': "UV 固化或環保溶劑大判噴繪", en: "UV-cured or eco-solvent large-format inkjet printing", ja: "UV硬化またはエコソルベント大判インクジェット印刷" },
  "亮面／啞面覆膜、單透孔、3M／Avery 品牌升級": { 'zh-hk': "亮面／啞面覆膜、單透孔、3M／Avery 品牌升級", en: "Gloss/matte lamination, one-way vision holes, upgrade to 3M / Avery brand", ja: "グロス／マットラミネート、ワンウェイビジョン穴、3M／Averyブランドへのアップグレード" },
  "270g–350g PVC 網格夾網布；UV 固化油墨": { 'zh-hk': "270g–350g PVC 網格夾網布；UV 固化油墨", en: "270g–350g PVC mesh banner fabric; UV-cured ink", ja: "270g–350g PVCメッシュ生地；UV硬化インキ" },
  "UV 大判噴繪": { 'zh-hk': "UV 大判噴繪", en: "UV large-format inkjet printing", ja: "UV大判インクジェット印刷" },
  "熱封邊、銅扣眼、阻燃處理、雙面縫邊": { 'zh-hk': "熱封邊、銅扣眼、阻燃處理、雙面縫邊", en: "Heat-sealed hem, brass grommets, flame-retardant treatment, double-stitched hem", ja: "熱溶着ヘム、真鍮ハトメ、難燃加工、両面縫いヘム" },
  "內頁157g–200g銅版紙；封面200g–250g銅版紙": { 'zh-hk': "內頁157g–200g銅版紙；封面200g–250g銅版紙", en: "157g–200g C1S art paper inner pages; 200g–250g C1S art paper cover", ja: "本文157g–200gコート紙；表紙200g–250gコート紙" },
  "覆膜（啞膜／光膜）、燙金、騎馬釘或膠裝": { 'zh-hk': "覆膜（啞膜／光膜）、燙金、騎馬釘或膠裝", en: "Lamination (matte/gloss film), foil stamping, saddle stitch or perfect binding", ja: "ラミネート（マット／グロスフィルム）、箔押し、中綴じまたは無線綴じ" },
  "128g–157g銅版紙或書紙": { 'zh-hk': "128g–157g銅版紙或書紙", en: "128g–157g C1S art paper or book paper", ja: "128g–157gコート紙または書籍紙" },
  "騎馬釘裝訂、覆膜（可選）": { 'zh-hk': "騎馬釘裝訂、覆膜（可選）", en: "Saddle-stitch binding, lamination (optional)", ja: "中綴じ製本、ラミネート（オプション）" },
  "膠裝、封面覆膜（啞膜／光膜）": { 'zh-hk': "膠裝、封面覆膜（啞膜／光膜）", en: "Perfect binding, cover lamination (matte/gloss film)", ja: "無線綴じ、表紙ラミネート（マット／グロスフィルム）" },
  "硬紙板封面裱糊銅版紙；內頁157g–200g銅版紙": { 'zh-hk': "硬紙板封面裱糊銅版紙；內頁157g–200g銅版紙", en: "Rigid board cover wrapped in C1S art paper; 157g–200g art paper inner pages", ja: "厚紙表紙にコート紙貼り；本文157g–200gコート紙" },
  "膠裝、燙金、壓凹、局部UV、封面覆膜": { 'zh-hk': "膠裝、燙金、壓凹、局部UV、封面覆膜", en: "Perfect binding, foil stamping, debossing, spot UV, cover lamination", ja: "無線綴じ、箔押し、デボス、スポットUV、表紙ラミネート" },
  "內頁80g–100g書紙或道林紙；封面200g銅版紙或PP": { 'zh-hk': "內頁80g–100g書紙或道林紙；封面200g銅版紙或PP", en: "80g–100g book or woodfree paper inner pages; 200g art paper or PP cover", ja: "本文80g–100g書籍紙または上質紙；表紙200gコート紙またはPP" },
  "YO圈或螺旋裝訂、封面覆膜": { 'zh-hk': "YO圈或螺旋裝訂、封面覆膜", en: "YO ring or spiral binding, cover lamination", ja: "YOリングまたはスパイラル製本、表紙ラミネート" },
  "80–120g 書紙／本白書紙": { 'zh-hk': "80–120g 書紙／本白書紙", en: "80–120g book paper / natural white book paper", ja: "80–120g書籍紙／オフホワイト書籍紙" },
  "單色至四色柯式或數碼": { 'zh-hk': "單色至四色柯式或數碼", en: "1-color to 4-color offset or digital", ja: "1色〜4色オフセットまたはデジタル" },
  "自黏封口、開窗貼片（可選）": { 'zh-hk': "自黏封口、開窗貼片（可選）", en: "Peel-and-seal closure, window patch (optional)", ja: "粘着シール封緘、窓貼り（オプション）" },
  "80–120g 書紙／彩色書紙": { 'zh-hk': "80–120g 書紙／彩色書紙", en: "80–120g book paper / colored book paper", ja: "80–120g書籍紙／色付き書籍紙" },
  "柯式四色＋可選專色": { 'zh-hk': "柯式四色＋可選專色", en: "Offset 4-color + optional spot color", ja: "オフセット4色＋特色 オプション" },
  "開窗、自黏封口（變數可選）": { 'zh-hk': "開窗、自黏封口（變數可選）", en: "Window, peel-and-seal closure (variable data optional)", ja: "窓抜き、粘着シール封緘（バリアブル オプション）" },
  "100–120g 書紙為主（可諮詢）": { 'zh-hk': "100–120g 書紙為主（可諮詢）", en: "Mainly 100–120g book paper (on request)", ja: "100–120g書籍紙主体（ご相談可）" },
  "單色至四色": { 'zh-hk': "單色至四色", en: "1-color to 4-color", ja: "1色〜4色" },
  "自黏封口、開窗（可選）": { 'zh-hk': "自黏封口、開窗（可選）", en: "Peel-and-seal closure, window (optional)", ja: "粘着シール封緘、窓抜き（オプション）" },
  "珠光／冰白特種書紙": { 'zh-hk': "珠光／冰白特種書紙", en: "Pearl / ice-white specialty book paper", ja: "パール／アイスホワイト特殊書籍紙" },
  "四色／專色＋可選燙金": { 'zh-hk': "四色／專色＋可選燙金", en: "4-color / spot color + optional foil stamping", ja: "4色／特色＋箔押し オプション" },
  "自黏封口、開窗、擊凸（可選）": { 'zh-hk': "自黏封口、開窗、擊凸（可選）", en: "Peel-and-seal closure, window, embossing (optional)", ja: "粘着シール封緘、窓抜き、エンボス（オプション）" },
  "80g–100g書紙或道林紙；封面200g銅版紙": { 'zh-hk': "80g–100g書紙或道林紙；封面200g銅版紙", en: "80g–100g book or woodfree paper; 200g art paper cover", ja: "80g–100g書籍紙または上質紙；表紙200gコート紙" },
  "封面四色印刷；內頁單色或雙色": { 'zh-hk': "封面四色印刷；內頁單色或雙色", en: "4-color cover printing; 1-color or 2-color inner pages", ja: "表紙4色印刷；本文1色または2色" },
  "騎馬釘裝訂、封面覆膜（可選）": { 'zh-hk': "騎馬釘裝訂、封面覆膜（可選）", en: "Saddle-stitch binding, cover lamination (optional)", ja: "中綴じ製本、表紙ラミネート（オプション）" },
  "200g–250g水印紙或棉質紙": { 'zh-hk': "200g–250g水印紙或棉質紙", en: "200g–250g watermarked or cotton paper", ja: "200g–250g透かし紙またはコットン紙" },
  "燙金、壓凹、防偽底紋、浮水印": { 'zh-hk': "燙金、壓凹、防偽底紋、浮水印", en: "Foil stamping, debossing, anti-counterfeit guilloche, watermark", ja: "箔押し、デボス、偽造防止地紋、透かし" },
  "覆膜（可選）": { 'zh-hk': "覆膜（可選）", en: "Lamination (optional)", ja: "ラミネート（オプション）" },
  "80g–100g道林紙或書紙；封面200g銅版紙": { 'zh-hk': "80g–100g道林紙或書紙；封面200g銅版紙", en: "80g–100g woodfree or book paper; 200g art paper cover", ja: "80g–100g上質紙または書籍紙；表紙200gコート紙" },
  "封面四色；內頁單色或雙色": { 'zh-hk': "封面四色；內頁單色或雙色", en: "4-color cover; 1-color or 2-color inner pages", ja: "表紙4色；本文1色または2色" },
  "膠裝或騎馬釘、封面覆膜（可選）": { 'zh-hk': "膠裝或騎馬釘、封面覆膜（可選）", en: "Perfect or saddle-stitch binding, cover lamination (optional)", ja: "無線綴じまたは中綴じ、表紙ラミネート（オプション）" },
  "灰板裱面＋隱藏磁吸；可觸感膜": { 'zh-hk': "灰板裱面＋隱藏磁吸；可觸感膜", en: "Grey board with wrapped cover + concealed magnet; soft-touch film optional", ja: "グレー板紙貼り表紙＋隠しマグネット；ソフトタッチフィルム可" },
  "面紙四色／專色＋後工": { 'zh-hk': "面紙四色／專色＋後工", en: "4-color / spot color printing on the wrap paper + finishing", ja: "貼り紙4色／特色印刷＋後加工" },
  "1200g 灰板紙裱糊銅版紙；EVA／PET 吸塑／紙漿內托": { 'zh-hk': "1200g 灰板紙裱糊銅版紙；EVA／PET 吸塑／紙漿內托", en: "1200g grey board wrapped in art paper; EVA / PET blister / moulded pulp insert", ja: "1200gグレー板紙にコート紙貼り；EVA／PETブリスタ／パルプ内台" },
  "燙金／燙銀、局部 UV、軟觸膜、磁吸扣": { 'zh-hk': "燙金／燙銀、局部 UV、軟觸膜、磁吸扣", en: "Gold/silver foil stamping, spot UV, soft-touch lamination, magnetic closure", ja: "金／銀箔押し、スポットUV、ソフトタッチラミネート、マグネット開閉" },
  "300g–350g FSC 牛皮卡紙；水性油墨": { 'zh-hk': "300g–350g FSC 牛皮卡紙；水性油墨", en: "300g–350g FSC kraft card stock; water-based ink", ja: "300g–350g FSCクラフトカード紙；水性インキ" },
  "單色／雙色水性印刷或四色柯式": { 'zh-hk': "單色／雙色水性印刷或四色柯式", en: "1-color / 2-color water-based printing or 4-color offset", ja: "1色／2色水性印刷または4色オフセット" },
  "燙黑、壓凹、絲印、手提繩": { 'zh-hk': "燙黑、壓凹、絲印、手提繩", en: "Black foil stamping, debossing, screen printing, carry rope", ja: "黒箔押し、デボス、シルク印刷、手提げひも" },
  "350g/400g 單粉卡(超高松) / 375g 銀卡紙 / 375g 鐳射銀卡": { 'zh-hk': "350g/400g 單粉卡(超高松) / 375g 銀卡紙 / 375g 鐳射銀卡", en: "350g/400g one-side coated card (ultra-high bulk) / 375g silver card stock / 375g laser silver card", ja: "350g/400g片面コートカード(超嵩高)／375g銀カード紙／375gレーザー銀カード" },
  "四色柯式印刷 + 覆光膜/啞膜": { 'zh-hk': "四色柯式印刷 + 覆光膜/啞膜", en: "4-color offset printing + gloss/matte film lamination", ja: "4色オフセット印刷＋グロス／マットフィルムラミネート" },
  "燙金 / UV 局部 / 擊凸 / 貼膠片 / 印白墨(銀卡類) / 逆向 UV(鐳射銀卡類)": { 'zh-hk': "燙金 / UV 局部 / 擊凸 / 貼膠片 / 印白墨(銀卡類) / 逆向 UV(鐳射銀卡類)", en: "Foil stamping / spot UV / embossing / film patch lamination / white ink printing (silver card) / reverse UV (laser silver card)", ja: "箔押し／スポットUV／エンボス／フィルム貼り／白インキ印刷(銀カード)／逆UV(レーザー銀カード)" },
  "食品級 BOPP／PE／PLA；大豆油墨": { 'zh-hk': "食品級 BOPP／PE／PLA；大豆油墨", en: "Food-grade BOPP / PE / PLA; soy ink", ja: "食品グレードBOPP／PE／PLA；大豆インキ" },
  "模切、覆膜（啞膜／光膜）、可變條碼": { 'zh-hk': "模切、覆膜（啞膜／光膜）、可變條碼", en: "Die-cut, lamination (matte/gloss film), variable barcode", ja: "型抜き、ラミネート（マット／グロスフィルム）、可変バーコード" },
  "FSC 認證道林紙 90g / 銅版紙 90g (封面)": { 'zh-hk': "FSC 認證道林紙 90g / 銅版紙 90g (封面)", en: "FSC-certified woodfree paper 90g / C1S art paper 90g (cover)", ja: "FSC認証上質紙 90g／コート紙 90g（表紙）" },
  "封面: 柯式四色 / 內頁: 數碼或柯式印刷": { 'zh-hk': "封面: 柯式四色 / 內頁: 數碼或柯式印刷", en: "Cover: offset 4-color / Inner pages: digital or offset printing", ja: "表紙: オフセット4色／本文: デジタルまたはオフセット印刷" },
  "膠裝 / 騎馬釘 (8-64頁) / 書脊封面": { 'zh-hk': "膠裝 / 騎馬釘 (8-64頁) / 書脊封面", en: "Perfect binding / saddle stitch (8-64 pages) / spine cover", ja: "無線綴じ／中綴じ（8-64ページ）／背表紙" },
  "透明亞加力膠板 2mm / 3mm (可選:白底 / 滿版印刷)": { 'zh-hk': "透明亞加力膠板 2mm / 3mm (可選:白底 / 滿版印刷)", en: "Clear acrylic sheet 2mm / 3mm (optional: white base / full-bleed printing)", ja: "透明アクリル板 2mm／3mm（オプション: 白地／全面印刷）" },
  "UV 噴墨四色 (CMYK + 白墨)": { 'zh-hk': "UV 噴墨四色 (CMYK + 白墨)", en: "UV inkjet 4-color (CMYK + white ink)", ja: "UVインクジェット4色（CMYK＋白インキ）" },
  "安全扣 / 珠鏈 / 掛鉤扣 / OPP 袋封裝": { 'zh-hk': "安全扣 / 珠鏈 / 掛鉤扣 / OPP 袋封裝", en: "Safety pin / ball chain / lobster clasp / OPP bag packaging", ja: "安全ピン／ボールチェーン／ナスカン／OPP袋包装" },
  "金屬底座 + 紙 / PET 印刷面 + 安全扣": { 'zh-hk': "金屬底座 + 紙 / PET 印刷面 + 安全扣", en: "Metal base + paper / PET printed face + safety pin", ja: "金属ベース＋紙／PET印刷面＋安全ピン" },
  "柯式 / 數碼四色 (CMYK)": { 'zh-hk': "柯式 / 數碼四色 (CMYK)", en: "Offset / digital 4-color (CMYK)", ja: "オフセット／デジタル4色（CMYK）" },
  "安全扣標準配備 / OPP 袋獨立包裝可選": { 'zh-hk': "安全扣標準配備 / OPP 袋獨立包裝可選", en: "Safety pin included as standard / individual OPP bag packaging optional", ja: "安全ピン標準付属／OPP袋個別包装オプション" },
  "和紙風藝術紙 180g / 雙面霧面 PP 貼膜": { 'zh-hk': "和紙風藝術紙 180g / 雙面霧面 PP 貼膜", en: "Washi-style art paper 180g / double-sided matte PP film lamination", ja: "和紙風アート紙 180g／両面マットPPフィルム貼り" },
  "數碼 / 柯式四色 (CMYK)": { 'zh-hk': "數碼 / 柯式四色 (CMYK)", en: "Digital / offset 4-color (CMYK)", ja: "デジタル／オフセット4色（CMYK）" },
  "OPP 獨立袋包裝 + 集合 OPP 袋": { 'zh-hk': "OPP 獨立袋包裝 + 集合 OPP 袋", en: "Individual OPP bag packaging + outer OPP bag set", ja: "OPP個別袋包装＋セット用OPP袋" },
  "100% 有機棉 / 12oz 厚實帆布": { 'zh-hk': "100% 有機棉 / 12oz 厚實帆布", en: "100% organic cotton / 12oz heavy canvas", ja: "オーガニックコットン100%／12oz厚手キャンバス" },
  "絲網印刷 (1-3 色) / DTG 全彩印刷": { 'zh-hk': "絲網印刷 (1-3 色) / DTG 全彩印刷", en: "Screen printing (1-3 colors) / DTG full-color printing", ja: "シルクスクリーン印刷（1〜3色）／DTGフルカラー印刷" },
  "內袋 / 底板加強 / 繡名字 (可選)": { 'zh-hk': "內袋 / 底板加強 / 繡名字 (可選)", en: "Inner pocket / reinforced base panel / embroidered name (optional)", ja: "内ポケット／底板補強／刺しゅう名入れ（オプション）" },
  "300g 棉紙 / 350g 剛古紙 / 300g 銅版紙": { 'zh-hk': "300g 棉紙 / 350g 剛古紙 / 300g 銅版紙", en: "300g cotton paper / 350g Conqueror paper / 300g C1S art paper", ja: "300gコットン紙／350gコンカラー紙／300gコート紙" },
  "柯式印刷 4C + 燙金": { 'zh-hk': "柯式印刷 4C + 燙金", en: "Offset printing 4C + foil stamping", ja: "オフセット印刷 4C＋箔押し" },
  "燙金 (金/銀/玫瑰金/香檳金) + UV 局部 + 模切異形": { 'zh-hk': "燙金 (金/銀/玫瑰金/香檳金) + UV 局部 + 模切異形", en: "Foil stamping (gold/silver/rose gold/champagne gold) + spot UV + custom-shape die-cut", ja: "箔押し（金／銀／ローズゴールド／シャンパンゴールド）＋スポットUV＋異形型抜き" },
  "300g 銅版紙 / 棉紙 / 剛古紙": { 'zh-hk': "300g 銅版紙 / 棉紙 / 剛古紙", en: "300g C1S art paper / cotton paper / Conqueror paper", ja: "300gコート紙／コットン紙／コンカラー紙" },
  "柯式印刷 4C": { 'zh-hk': "柯式印刷 4C", en: "Offset printing 4C", ja: "オフセット印刷 4C" },
  "光膠 / 啞膠 / 燙金 / UV 局部": { 'zh-hk': "光膠 / 啞膠 / 燙金 / UV 局部", en: "Gloss lamination / matte lamination / foil stamping / spot UV", ja: "グロスラミネート／マットラミネート／箔押し／スポットUV" },
  "300g 棉紙 / 銅版紙 / 剛古紙": { 'zh-hk': "300g 棉紙 / 銅版紙 / 剛古紙", en: "300g cotton paper / C1S art paper / Conqueror paper", ja: "300gコットン紙／コート紙／コンカラー紙" },
  "柯式印刷 4C + 折卡": { 'zh-hk': "柯式印刷 4C + 折卡", en: "Offset printing 4C + folded card", ja: "オフセット印刷 4C＋折りカード" },
  "燙金 / UV / 模切 / 折卡": { 'zh-hk': "燙金 / UV / 模切 / 折卡", en: "Foil stamping / UV / die-cut / folded card", ja: "箔押し／UV／型抜き／折りカード" },
  "柯式印刷 4C 雙面": { 'zh-hk': "柯式印刷 4C 雙面", en: "Offset printing 4C double-sided", ja: "オフセット印刷 4C 両面" },
  "光膠 / 啞膠 / 燙金": { 'zh-hk': "光膠 / 啞膠 / 燙金", en: "Gloss lamination / matte lamination / foil stamping", ja: "グロスラミネート／マットラミネート／箔押し" },
  "300g 棉紙 (主) + 350g 剛古紙 (請帖)": { 'zh-hk': "300g 棉紙 (主) + 350g 剛古紙 (請帖)", en: "300g cotton paper (main) + 350g Conqueror paper (invitations)", ja: "300gコットン紙（メイン）＋350gコンカラー紙（招待状）" },
  "柯式印刷 4C 雙面 + 燙金": { 'zh-hk': "柯式印刷 4C 雙面 + 燙金", en: "Offset printing 4C double-sided + foil stamping", ja: "オフセット印刷 4C 両面＋箔押し" },
  "燙金 (玫瑰金) + UV 局部 + 模切 + 折卡": { 'zh-hk': "燙金 (玫瑰金) + UV 局部 + 模切 + 折卡", en: "Foil stamping (rose gold) + spot UV + die-cut + folded card", ja: "箔押し（ローズゴールド）＋スポットUV＋型抜き＋折りカード" },
  "燙金 / 壓紋 / 模切 / 折卡 / 站立": { 'zh-hk': "燙金 / 壓紋 / 模切 / 折卡 / 站立", en: "Foil stamping / embossed texture / die-cut / folded card / self-standing", ja: "箔押し／型押し／型抜き／折りカード／自立" },
  "0.5mm 透明 PVC / 300g 銅版紙 / 350g 黑卡紙": { 'zh-hk': "0.5mm 透明 PVC / 300g 銅版紙 / 350g 黑卡紙", en: "0.5mm clear PVC / 300g C1S art paper / 350g black card stock", ja: "0.5mm透明PVC／300gコート紙／350g黒カード紙" },
  "柯式印刷 4C + UV 防水層": { 'zh-hk': "柯式印刷 4C + UV 防水層", en: "Offset printing 4C + UV waterproof coating", ja: "オフセット印刷 4C＋UV防水層" },
  "模切圓角 / 燙金 / 打孔掛繩": { 'zh-hk': "模切圓角 / 燙金 / 打孔掛繩", en: "Rounded-corner die-cut / foil stamping / punched hole with lanyard", ja: "角丸型抜き／箔押し／穴あけ・ストラップ" },
  "燙金 / UV / 模切異形 / 折卡 / 站立": { 'zh-hk': "燙金 / UV / 模切異形 / 折卡 / 站立", en: "Foil stamping / UV / custom-shape die-cut / folded card / self-standing", ja: "箔押し／UV／異形型抜き／折りカード／自立" },
  "300g 銅版紙 / 350g 白卡 / PVC 透明卡": { 'zh-hk': "300g 銅版紙 / 350g 白卡 / PVC 透明卡", en: "300g C1S art paper / 350g white card / clear PVC card", ja: "300gコート紙／350g白カード／透明PVCカード" },
  "燙金 / UV / 磁鐵背貼 / 打孔掛繩": { 'zh-hk': "燙金 / UV / 磁鐵背貼 / 打孔掛繩", en: "Foil stamping / UV / magnetic backing / punched hole with lanyard", ja: "箔押し／UV／マグネット裏面貼り／穴あけ・ストラップ" },
  "300g 銅版紙 / 0.5mm 防水 PVC": { 'zh-hk': "300g 銅版紙 / 0.5mm 防水 PVC", en: "300g C1S art paper / 0.5mm waterproof PVC", ja: "300gコート紙／0.5mm防水PVC" },
  "UV 防水 / 燙金 / 模切 / 折卡 / 站立": { 'zh-hk': "UV 防水 / 燙金 / 模切 / 折卡 / 站立", en: "UV waterproof coating / foil stamping / die-cut / folded card / self-standing", ja: "UV防水／箔押し／型抜き／折りカード／自立" },
  "300g 銅版紙 / 350g 剛古紙 (大尺寸加厚)": { 'zh-hk': "300g 銅版紙 / 350g 剛古紙 (大尺寸加厚)", en: "300g C1S art paper / 350g Conqueror paper (thicker for large sizes)", ja: "300gコート紙／350gコンカラー紙（大判用厚手）" },
  "柯式印刷 4C 單面或雙面": { 'zh-hk': "柯式印刷 4C 單面或雙面", en: "Offset printing 4C single- or double-sided", ja: "オフセット印刷 4C 片面または両面" },
  "燙金 / UV / 模切 / 摺疊": { 'zh-hk': "燙金 / UV / 模切 / 摺疊", en: "Foil stamping / UV / die-cut / folding", ja: "箔押し／UV／型抜き／折り" },
  "127×178mm（標準）；R3mm圓角可選": { 'zh-hk': "127×178mm（標準）；R3mm圓角可選", en: "127×178mm (standard); optional R3mm rounded corners", ja: "127×178mm（標準）；R3mm角丸も選択可" },
  "90×54mm（標準名片）；54×54mm 方形可選": { 'zh-hk': "90×54mm（標準名片）；54×54mm 方形可選", en: "90×54mm (standard business card); 54×54mm square optional", ja: "90×54mm（標準名刺）；54×54mm スクエアも選択可" },
  "127×178mm（標準）": { 'zh-hk': "127×178mm（標準）", en: "127×178mm (standard)", ja: "127×178mm（標準）" },
  "127×178mm（標準）；R3mm圓角": { 'zh-hk': "127×178mm（標準）；R3mm圓角", en: "127×178mm (standard); R3mm rounded corners", ja: "127×178mm（標準）；R3mm角丸" },
  "最小約 10×10mm，最大約 300×400mm（依稿而定）": { 'zh-hk': "最小約 10×10mm，最大約 300×400mm（依稿而定）", en: "Min. approx. 10×10mm, max. approx. 300×400mm (depends on artwork)", ja: "最小約 10×10mm、最大約 300×400mm（原稿により異なります）" },
  "客製模切外形，常用寬邊 20–120mm 級距": { 'zh-hk': "客製模切外形，常用寬邊 20–120mm 級距", en: "Custom die-cut outline, common width range 20–120mm", ja: "カスタム型抜き形状、一般的な幅 20–120mm" },
  "最小約 15×15mm，最大約 250×350mm": { 'zh-hk': "最小約 15×15mm，最大約 250×350mm", en: "Min. approx. 15×15mm, max. approx. 250×350mm", ja: "最小約 15×15mm、最大約 250×350mm" },
  "A4 起印；單張尺寸最小 10×10mm，最大 300×400mm": { 'zh-hk': "A4 起印；單張尺寸最小 10×10mm，最大 300×400mm", en: "From A4; single-sheet min. 10×10mm, max. 300×400mm", ja: "A4 から対応；単片最小 10×10mm、最大 300×400mm" },
  "依稿模切；建議最小元素寬度 ≥1.5mm（視材質）": { 'zh-hk': "依稿模切；建議最小元素寬度 ≥1.5mm（視材質）", en: "Die-cut to artwork; recommended min. element width ≥1.5mm (varies by material)", ja: "原稿に合わせて型抜き；最小要素幅 ≥1.5mm 推奨（素材により異なります）" },
  "依稿模切；箔面最小字高視稿評估": { 'zh-hk': "依稿模切；箔面最小字高視稿評估", en: "Die-cut to artwork; min. foil letter height assessed from artwork", ja: "原稿に合わせて型抜き；箔面の最小文字高は原稿により判断" },
  "依應用模切；小標籤至 A4 拼版皆可": { 'zh-hk': "依應用模切；小標籤至 A4 拼版皆可", en: "Die-cut to application; from small labels up to A4 imposition", ja: "用途に合わせて型抜き；小ロットのラベルから A4 面付けまで対応" },
  "最小約 20×20mm，最大約 280×380mm": { 'zh-hk': "最小約 20×20mm，最大約 280×380mm", en: "Min. approx. 20×20mm, max. approx. 280×380mm", ja: "最小約 20×20mm、最大約 280×380mm" },
  "小／中／大袋型或客製展開尺寸": { 'zh-hk': "小／中／大袋型或客製展開尺寸", en: "Small / medium / large bag styles or custom flat size", ja: "小／中／大の袋型、またはカスタム展開サイズ" },
  "小／中／大或客製展開": { 'zh-hk': "小／中／大或客製展開", en: "Small / medium / large or custom flat size", ja: "小／中／大、またはカスタム展開" },
  "禮品常用中／大袋或客製": { 'zh-hk': "禮品常用中／大袋或客製", en: "Medium / large bags commonly used for gifts, or custom", ja: "ギフトには中／大サイズが一般的、カスタムも可" },
  "小／中／大袋或客製": { 'zh-hk': "小／中／大袋或客製", en: "Small / medium / large bag or custom", ja: "小／中／大袋、またはカスタム" },
  "中／大袋為主；可客製": { 'zh-hk': "中／大袋為主；可客製", en: "Mainly medium / large bags; custom available", ja: "中／大袋が中心；カスタム対応可" },
  "展開約 320×120×380mm（可客製）": { 'zh-hk': "展開約 320×120×380mm（可客製）", en: "Flat approx. 320×120×380mm (customizable)", ja: "展開 約 320×120×380mm（カスタム可）" },
  "A4（210×297mm）": { 'zh-hk': "A4（210×297mm）", en: "A4 (210×297mm)", ja: "A4（210×297mm）" },
  "A5（148×210mm）": { 'zh-hk': "A5（148×210mm）", en: "A5 (148×210mm)", ja: "A5（148×210mm）" },
  "A4（210×297mm）或A5（148×210mm）": { 'zh-hk': "A4（210×297mm）或A5（148×210mm）", en: "A4 (210×297mm) or A5 (148×210mm)", ja: "A4（210×297mm）または A5（148×210mm）" },
  "A4展開（210×297mm）或DL（99×210mm）": { 'zh-hk': "A4展開（210×297mm）或DL（99×210mm）", en: "A4 flat (210×297mm) or DL (99×210mm)", ja: "A4 展開（210×297mm）または DL（99×210mm）" },
  "A2 420×594mm（可改比例）": { 'zh-hk': "A2 420×594mm（可改比例）", en: "A2 420×594mm (ratio adjustable)", ja: "A2 420×594mm（比率変更可）" },
  "A1 594×841mm": { 'zh-hk': "A1 594×841mm", en: "A1 594×841mm", ja: "A1 594×841mm" },
  "依稿面；可對標 A 系列或全幅": { 'zh-hk': "依稿面；可對標 A 系列或全幅", en: "To artwork; A-series or full-bleed sizes available", ja: "原稿に合わせて；A 判または全幅サイズに対応" },
  "X 展架 60×160cm／80×180cm；易拉寶 85×200cm（可客製）": { 'zh-hk': "X 展架 60×160cm／80×180cm；易拉寶 85×200cm（可客製）", en: "X-banner 60×160cm / 80×180cm; roll-up 85×200cm (customizable)", ja: "X バナー 60×160cm／80×180cm；ロールアップ 85×200cm（カスタム可）" },
  "A4 至 A0（59.4×84.1cm），更大尺寸可拼接": { 'zh-hk': "A4 至 A0（59.4×84.1cm），更大尺寸可拼接", en: "A4 to A0 (59.4×84.1cm); larger sizes can be joined", ja: "A4〜A0（59.4×84.1cm）、それ以上は分割接合で対応" },
  "A4 至 A0，異形模切依稿件而定": { 'zh-hk': "A4 至 A0，異形模切依稿件而定", en: "A4 to A0; custom die-cut shapes depend on artwork", ja: "A4〜A0；異形型抜きは原稿によります" },
  "完全訂製，常見 15×10×5cm 至 25×20×8cm": { 'zh-hk': "完全訂製，常見 15×10×5cm 至 25×20×8cm", en: "Fully custom; commonly 15×10×5cm to 25×20×8cm", ja: "完全オーダーメイド、一般的に 15×10×5cm〜25×20×8cm" },
  "依瓶器三維客製; 標準 50×50×30mm 至 250×250×120mm": { 'zh-hk': "依瓶器三維客製; 標準 50×50×30mm 至 250×250×120mm", en: "3D custom to bottle shape; standard 50×50×30mm to 250×250×120mm", ja: "ボトル形状に合わせた 3D カスタム；標準 50×50×30mm〜250×250×120mm" },
  "小／中／大或依內裝物客製": { 'zh-hk': "小／中／大或依內裝物客製", en: "Small / medium / large or custom to contents", ja: "小／中／大、または内容物に合わせてカスタム" },
  "展開平板約 40×30cm 至 60×50cm；成型後約 15×10×5cm 起": { 'zh-hk': "展開平板約 40×30cm 至 60×50cm；成型後約 15×10×5cm 起", en: "Flat approx. 40×30cm to 60×50cm; assembled from approx. 15×10×5cm", ja: "展開 約 40×30cm〜60×50cm；組立後 約 15×10×5cm から" },
  "全客製內徑；常用禮品三階尺寸": { 'zh-hk': "全客製內徑；常用禮品三階尺寸", en: "Fully custom inner dimensions; three common gift sizes", ja: "内寸は完全カスタム；ギフト向けの3段階サイズが一般的" },
  "標準約90×170mm（可客製）": { 'zh-hk': "標準約90×170mm（可客製）", en: "Standard approx. 90×170mm (customizable)", ja: "標準 約 90×170mm（カスタム可）" },
  "完全訂製": { 'zh-hk': "完全訂製", en: "Fully custom", ja: "完全オーダーメイド" },
  "標準約90×170mm": { 'zh-hk': "標準約90×170mm", en: "Standard approx. 90×170mm", ja: "標準 約 90×170mm" },
  "約110×200mm（較標準大30%–50%）": { 'zh-hk': "約110×200mm（較標準大30%–50%）", en: "Approx. 110×200mm (30%–50% larger than standard)", ja: "約 110×200mm（標準より 30%–50% 大きい）" },
  "A3（297×420mm）或A4（210×297mm）": { 'zh-hk': "A3（297×420mm）或A4（210×297mm）", en: "A3 (297×420mm) or A4 (210×297mm)", ja: "A3（297×420mm）または A4（210×297mm）" },
  "A5（148×210mm）或A4（210×297mm）": { 'zh-hk': "A5（148×210mm）或A4（210×297mm）", en: "A5 (148×210mm) or A4 (210×297mm)", ja: "A5（148×210mm）または A4（210×297mm）" },
  "A3、A4或完全客製": { 'zh-hk': "A3、A4或完全客製", en: "A3, A4 or fully custom", ja: "A3、A4、または完全カスタム" },
  "約85×55mm或90×60mm": { 'zh-hk': "約85×55mm或90×60mm", en: "Approx. 85×55mm or 90×60mm", ja: "約 85×55mm または 90×60mm" },
  "A4（210×297mm）或A3（297×420mm）": { 'zh-hk': "A4（210×297mm）或A3（297×420mm）", en: "A4 (210×297mm) or A3 (297×420mm)", ja: "A4（210×297mm）または A3（297×420mm）" },
  "按客製長寬平方米計": { 'zh-hk': "按客製長寬平方米計", en: "Priced per square metre of custom width × length", ja: "カスタムの幅×丈の平方メートル単位で算出" },
  "常見 850×2000mm 至 1200×3000mm 級": { 'zh-hk': "常見 850×2000mm 至 1200×3000mm 級", en: "Commonly 850×2000mm to 1200×3000mm", ja: "一般的に 850×2000mm〜1200×3000mm" },
  "依車型版型，常見轎車約 15–20 平方米": { 'zh-hk': "依車型版型，常見轎車約 15–20 平方米", en: "Per vehicle template; approx. 15–20 sq m for a typical car", ja: "車種別型紙に合わせて；一般的な乗用車で 約 15–20 平方メートル" },
  "最大寬度 5 米，長度無限；常見 3×6m、4×8m": { 'zh-hk': "最大寬度 5 米，長度無限；常見 3×6m、4×8m", en: "Max width 5 m, unlimited length; commonly 3×6m, 4×8m", ja: "最大幅 5 m、長さ無制限；一般的に 3×6m、4×8m" },
  "A5（148×210mm）或B5（176×250mm）": { 'zh-hk': "A5（148×210mm）或B5（176×250mm）", en: "A5 (148×210mm) or B5 (176×250mm)", ja: "A5（148×210mm）または B5（176×250mm）" },
  "DL／C5／C4 等常用規格": { 'zh-hk': "DL／C5／C4 等常用規格", en: "Common formats such as DL / C5 / C4", ja: "DL／C5／C4 などの一般的な規格" },
  "DL、C5、C4（變數可選）": { 'zh-hk': "DL、C5、C4（變數可選）", en: "DL, C5, C4 (variable options)", ja: "DL、C5、C4（変形も選択可）" },
  "C4（229×324mm）等": { 'zh-hk': "C4（229×324mm）等", en: "C4 (229×324mm) and others", ja: "C4（229×324mm）など" },
  "A4（210×297mm）或B5（176×250mm）": { 'zh-hk': "A4（210×297mm）或B5（176×250mm）", en: "A4 (210×297mm) or B5 (176×250mm)", ja: "A4（210×297mm）または B5（176×250mm）" },
  "依產品＋內襯厚度全客製": { 'zh-hk': "依產品＋內襯厚度全客製", en: "Fully custom to product + insert thickness", ja: "製品と内台の厚みに合わせて完全カスタム" },
  "完全訂製，常見 10×10×4cm 至 20×15×6cm": { 'zh-hk': "完全訂製，常見 10×10×4cm 至 20×15×6cm", en: "Fully custom; commonly 10×10×4cm to 20×15×6cm", ja: "完全オーダーメイド、一般的に 10×10×4cm〜20×15×6cm" },
  "常見 12×8×5cm 至 20×15×8cm（可客製）": { 'zh-hk': "常見 12×8×5cm 至 20×15×8cm（可客製）", en: "Commonly 12×8×5cm to 20×15×8cm (customizable)", ja: "一般的に 12×8×5cm〜20×15×8cm（カスタム可）" },
  "60x40x20 / 80x60x35 / 100x70x35 / 100x80x120 / 120x80x40 / 150x100x60 / 150x50x100 / 200x150x80 mm (8 檔標準尺寸, 飛機盒/扣底盒/雙插盒 3 種盒型)": { 'zh-hk': "60x40x20 / 80x60x35 / 100x70x35 / 100x80x120 / 120x80x40 / 150x100x60 / 150x50x100 / 200x150x80 mm (8 檔標準尺寸, 飛機盒/扣底盒/雙插盒 3 種盒型)", en: "60x40x20 / 80x60x35 / 100x70x35 / 100x80x120 / 120x80x40 / 150x100x60 / 150x50x100 / 200x150x80 mm (8 standard sizes; aircraft box / tuck-end box / two-piece box, 3 styles)", ja: "60x40x20 / 80x60x35 / 100x70x35 / 100x80x120 / 120x80x40 / 150x100x60 / 150x50x100 / 200x150x80 mm（標準8サイズ、エアクラフト箱／キャラメル箱／両差し箱の3型）" },
  "最小約 20×20mm，最大約 200×300mm": { 'zh-hk': "最小約 20×20mm，最大約 200×300mm", en: "Min. approx. 20×20mm, max. approx. 200×300mm", ja: "最小約 20×20mm、最大約 200×300mm" },
  "A5 (148×210mm) / B5 (182×257mm) / A4 (可選)": { 'zh-hk': "A5 (148×210mm) / B5 (182×257mm) / A4 (可選)", en: "A5 (148×210mm) / B5 (182×257mm) / A4 (optional)", ja: "A5（148×210mm）／B5（182×257mm）／A4（選択可）" },
  "30-80mm (自訂形狀,Illustrator パス路徑入稿)": { 'zh-hk': "30-80mm (自訂形狀,Illustrator パス路徑入稿)", en: "30-80mm (custom shape, Illustrator path artwork)", ja: "30-80mm（形状カスタム、Illustrator パス原稿入稿）" },
  "57mm (標準) / 76mm (大尺寸) / 44mm (迷你)": { 'zh-hk': "57mm (標準) / 76mm (大尺寸) / 44mm (迷你)", en: "57mm (standard) / 76mm (large) / 44mm (mini)", ja: "57mm（標準）／76mm（大サイズ）／44mm（ミニ）" },
  "105×148mm (A6 標準明信片)": { 'zh-hk': "105×148mm (A6 標準明信片)", en: "105×148mm (A6 standard postcard)", ja: "105×148mm（A6 標準ポストカード）" },
  "38×42×10cm (可收納 A4) / 側寬 10cm": { 'zh-hk': "38×42×10cm (可收納 A4) / 側寬 10cm", en: "38×42×10cm (fits A4) / 10cm gusset", ja: "38×42×10cm（A4 収納可）／マチ 10cm" },
  "130×190mm 標準請帖 / 190×260mm 對摺請帖": { 'zh-hk': "130×190mm 標準請帖 / 190×260mm 對摺請帖", en: "130×190mm standard invitation / 190×260mm folded invitation", ja: "130×190mm 標準招待状／190×260mm 二つ折り招待状" },
  "A6 (105×148mm) / 自訂": { 'zh-hk': "A6 (105×148mm) / 自訂", en: "A6 (105×148mm) / custom", ja: "A6（105×148mm）／カスタム" },
  "A6 (105×148mm) / 對摺 A5": { 'zh-hk': "A6 (105×148mm) / 對摺 A5", en: "A6 (105×148mm) / A5 folded", ja: "A6（105×148mm）／A5 二つ折り" },
  "A5 對摺 (148×210mm) / A4 對摺": { 'zh-hk': "A5 對摺 (148×210mm) / A4 對摺", en: "A5 folded (148×210mm) / A4 folded", ja: "A5 二つ折り（148×210mm）／A4 二つ折り" },
  "A5 對摺 (148×210mm) / 自訂": { 'zh-hk': "A5 對摺 (148×210mm) / 自訂", en: "A5 folded (148×210mm) / custom", ja: "A5 二つ折り（148×210mm）／カスタム" },
  "6 件不同尺寸 (請帖 130×190mm 等)": { 'zh-hk': "6 件不同尺寸 (請帖 130×190mm 等)", en: "6 pieces in different sizes (invitation 130×190mm etc.)", ja: "6 点の異なるサイズ（招待状 130×190mm など）" },
  "A6 (105×148mm) / A5 對摺 / 自訂站立式": { 'zh-hk': "A6 (105×148mm) / A5 對摺 / 自訂站立式", en: "A6 (105×148mm) / A5 folded / custom standing", ja: "A6（105×148mm）／A5 二つ折り／自立型カスタム" },
  "A8 (52×74mm) / A7 (74×105mm) / 自訂圓形": { 'zh-hk': "A8 (52×74mm) / A7 (74×105mm) / 自訂圓形", en: "A8 (52×74mm) / A7 (74×105mm) / custom round", ja: "A8（52×74mm）／A7（74×105mm）／円形カスタム" },
  "A7 (74×105mm) / A6 對摺 / 自訂站立": { 'zh-hk': "A7 (74×105mm) / A6 對摺 / 自訂站立", en: "A7 (74×105mm) / A6 folded / custom standing", ja: "A7（74×105mm）／A6 二つ折り／自立型カスタム" },
  "A7 (74×105mm) / 90×120mm / 自訂": { 'zh-hk': "A7 (74×105mm) / 90×120mm / 自訂", en: "A7 (74×105mm) / 90×120mm / custom", ja: "A7（74×105mm）／90×120mm／カスタム" },
  "A6 (105×148mm) / A5 對摺 / 自訂站立": { 'zh-hk': "A6 (105×148mm) / A5 對摺 / 自訂站立", en: "A6 (105×148mm) / A5 folded / custom standing", ja: "A6（105×148mm）／A5 二つ折り／自立型カスタム" },
  "A1 (594×841mm) / A2 (420×594mm) / 自訂": { 'zh-hk': "A1 (594×841mm) / A2 (420×594mm) / 自訂", en: "A1 (594×841mm) / A2 (420×594mm) / custom", ja: "A1（594×841mm）／A2（420×594mm）／カスタム" },
};

/**
 * 規格值本地化: 命中映射 -> 取該語系值; 未命中 -> **fallback 中文原文** (不報錯, 不留空)
 */
export function localizeSpecValue(value: string | null | undefined, locale: Locale | string): string {
  if (!value) return '';
  const hit = SPEC_I18N[value];
  if (!hit) return value;
  const localized = hit[locale as keyof SpecI18nValue];
  return localized || value;
}

/**
 * 規格物件整批本地化 (PDP 規格條目: { material, size, printMethod, finishing })
 * 只對有映射的欄位生效, 其餘欄位原樣返回 -> 不影響未覆蓋欄位
 */
export function localizeSpecs<T extends Record<string, string | undefined>>(
  specs: T | undefined | null,
  locale: Locale | string,
): Record<string, string> {
  if (!specs) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(specs)) {
    if (typeof v === 'string' && v) out[k] = localizeSpecValue(v, locale);
  }
  return out;
}

/**
 * PDP 規格條目的**欄名** (dt) 三語映射 — Step 5 (B2)
 *
 * 為什麼需要: v9 PDP 用 Object.keys(specs) 原文渲染 dt, 導致 **zh-hk 頁也顯示英文欄名**
 * (material / size / printMethod / finishing)。欄名是 UI 文案, 不是資料值, 必須本地化。
 * · zh-hk: 材質 / 尺寸 / 印刷方式 / 後加工 (港式印刷用語)
 * · en   : Material / Size / Print Method / Finishing
 * · ja   : 素材 / サイズ / 印刷方法 / 後加工
 * ⚠️ 已知站內不一致 (未在本批修): legacy ProductTabs.tsx 的同欄名為「加工工藝」/「加工」。
 *    若要全站統一, 改本表一行並重跑生成器即可 (改動會再動 zh-hk/ja 既有輸出, 需另行拍板)。
 */
export const SPEC_FIELD_LABELS: Record<string, SpecI18nValue> = {
  material: { 'zh-hk': "材質", en: "Material", ja: "素材" },
  size: { 'zh-hk': "尺寸", en: "Size", ja: "サイズ" },
  printMethod: { 'zh-hk': "印刷方式", en: "Print Method", ja: "印刷方法" },
  finishing: { 'zh-hk': "後加工", en: "Finishing", ja: "後加工" },
};

/**
 * 規格欄名本地化: 命中映射 -> 取該語系值; 未命中 -> **fallback 原 key** (不報錯, 不留空)
 */
export function localizeSpecField(key: string, locale: Locale | string): string {
  const hit = SPEC_FIELD_LABELS[key];
  if (!hit) return key;
  return hit[locale as keyof SpecI18nValue] || key;
}
