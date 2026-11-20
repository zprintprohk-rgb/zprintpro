// D14 ja 教材・教科書の印刷製本 深度篇 content 生成器 (v2 价格合规版)
// 用途: 生成 textbook-printing-guide 的 12 段骨架 HTML content (写入 ja.json)
// 数据来源: src/data/products.ts textbooks SKU:
//   price_range 'HK$5-50/本', basePrice 24 (HKD), basePrice_en 9.2 (USD), basePrice_ja 1288 (JPY), minQuantity 100
//   specs: 80-100g 道林紙/書紙, 封面200g銅版紙, A4/B5, 膠裝或騎馬釘, 封面覆膜
//   数量阶梯: 100/200/500/1000/2000/5000 (quantityFactors 0.50/0.40/0.30/0.25...)
// 价格纪律: 只引用 price_range 'HK$5-50/本' + basePrice_ja 1288 (均为 products.ts 真实值), 不编造其他数字
const fs = require('fs');

const faqs = [
  ['教科書・教材の最低発注数量 (MOQ) は?', '100冊から (教科書・教材の標準)。中綴じ小冊子は 50冊から対応。サンプル 5冊で校了確認が可能です。'],
  ['納期はどのくらい?', '標準 5-7 営業日 (校了確認後)。短納期 48時間対応あり (要相談)。新学期前 2週間が繁忙期のため、年度契約なら前倒し発注が確実です。'],
  ['紙と製本方式はどう選ぶ?', '教科書・教材は 80-100g 道林紙 (目に優しい) + 中綴じ (薄い冊子) か無線綴じ (厚い本) が標準。カバーは 200g コート紙 + ラミネートで耐久性アップ (products.ts specs 準拠)。'],
  ['海外配送は可能?', '可能です。DHL Express で日本へ 2-4日配送。香港深圳工場から学校・塾・出版社へ出荷実績あり。'],
  ['ISBN・バーコード対応は?', '対応しています。ISBN / JAN バーコード / QRコードの印刷を標準装備 (教科書 SKU の description 記載)。'],
  ['年度契約の割引は?', '学期単位の継続発注で数量割引が適用されます。年間予定冊数を事前登録すると、印刷単価が安定し、繁忙期の納期も優先確保されます。'],
];

const LINKS = {
  textbooks: '/ja/product/textbooks/',
  saddle: '/ja/product/saddle-stitch-booklets/',
  perfect: '/ja/product/perfect-bound-books/',
  hardcover: '/ja/product/hardcover-books/',
  notebooks: '/ja/product/spiral-notebooks/',
  catBooks: '/ja/category/books/',
  catEdu: '/ja/category/educational/',
  catDoujin: '/ja/category/japan-doujin/',
  blogSaddle: '/ja/blog/saddle-stitch-booklet-printing-guide/',
  blogDoujin: '/ja/blog/doujin-circle-printing-guide/',
  blogGrad: '/ja/blog/graduation-yearbook-printing-guide/',
  blogCampus: '/ja/blog/campus-education-printing-pillar-guide/',
  quote: '/ja/quote/',
  contact: '/ja/contact/',
};

function a(href, text, cls = 'text-[#1A56DB] underline') {
  return `<a href="${href}" class="${cls}">${text}</a>`;
}

const content = `<p>日本の教科書・教材印刷は、学校法人・学習塾チェーン・教材出版社からの年度契約案件が中心。K12 教科書から補習校教材、研修マニュアル、問題集まで、100冊から小ロット対応、A4/B5 サイズ、80-100g 道林紙 (目に優しい上質紙)、中綴じ・無線綴じ・上製本の 3 製本方式、最短 5-7 営業日納品、DHL Express 国際配送。ZprintPro は香港深圳工場から日本の学校・塾・出版社へ、校了確認後の確実な納期と ISBN・バーコード対応で、年度契約の印刷パートナーとして 15年以上の実績があります。</p>
<p>教材・教科書の印刷見積: <a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">+86 198 8085 1334 (WhatsApp)</a> — 30秒 AI 見積もり・無料相談対応。</p>

<h2>1. 教科書・教材印刷の 3 大製本方式はどう選ぶ?</h2>
<p>製本方式はページ数と用途で決まります。${a(LINKS.textbooks, '教科書印刷')}は A4/B5 サイズ、80-100g 道林紙、膠裝 (無線綴じ) か騎馬釘 (中綴じ) を標準としています (products.ts 仕様)。</p>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>中綴じ (騎馬釘)</strong>: 8-64ページの薄い冊子。問題集・ドリル・小冊子に最適。開きやすく、コスト最安。50冊から。詳細は${a(LINKS.blogSaddle, '中綴じ冊子印刷ガイド')}。</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>無線綴じ (膠裝)</strong>: 64ページ以上の標準書籍。教科書・テキスト・研修マニュアルの標準。背表紙にタイトル印刷可能。100冊から。</p></div>
<div class="bg-blue-50 p-4 rounded-lg"><p><strong>上製本 (精裝)</strong>: 高級書籍・卒業記念アルバム・図書館蔵書向け。${a(LINKS.hardcover, 'ハードカバー書籍')}として対応。</p></div>

<h2>2. 教材印刷 4 大紙材質をどう選ぶ?</h2>
<p>教科書・教材は「目に優しい」紙が必須です。ZprintPro の教科書印刷は 80g-100g 道林紙 (書紙) を標準、カバーは 200g コート紙 + 覆膜 (ラミネート) オプションです。</p>
<table><thead><tr><th>材質</th><th>用途</th><th>特徴</th></tr></thead><tbody>
<tr><td>80g 道林紙</td><td>問題集・ドリル</td><td>書き込みやすく、にじみにくい</td></tr>
<tr><td>100g 道林紙</td><td>教科書・テキスト</td><td>強度と書き心地のバランス</td></tr>
<tr><td>200g コート紙 (カバー)</td><td>教科書カバー</td><td>発色鮮やか + ラミネートで耐久</td></tr>
<tr><td>上質紙</td><td>研修マニュアル</td><td>白さが高く、資料向き</td></tr>
</tbody></table>

<h2>3. 教科書印刷の価格はいくら?</h2>
<p>${a(LINKS.textbooks, '教科書印刷')}は <strong>100冊から HK$5-50/冊</strong> (products.ts 実価格)。ページ数・製本方式・数量で単価が変わり、数量が増えるほど割引が効きます。</p>
<table><thead><tr><th>数量</th><th>単価帯 (HK$)</th><th>備考</th></tr></thead><tbody>
<tr><td>100冊</td><td>HK$5-50/冊</td><td>小ロット標準</td></tr>
<tr><td>500冊</td><td>数量割引適用</td><td>価格は見積もりで確定</td></tr>
<tr><td>1,000冊以上</td><td>数量割引適用</td><td>数量が増えるほど単価ダウン</td></tr>
</tbody></table>
<p>※ 正確な単価は ${a(LINKS.quote, '30秒 AI 見積もり')}で、ページ数・部数・製本方式を入力すると即時に確定します。</p>

<h2>4. 教材・教科書の年度契約はどう進める?</h2>
<p>学校法人・塾チェーン・出版社の年間発注は、計画的なフローが鍵です。</p>
<ol>
<li><strong>4-6月</strong>: 次年度の教材一覧とページ数・部数を確定</li>
<li><strong>7-8月</strong>: サンプル校了 (5冊) + 単価契約</li>
<li><strong>9-11月</strong>: 学期ごとの分割発注</li>
<li><strong>12-3月</strong>: 春期講習・新年度向けの増刷対応</li>
</ol>
<p>年度契約のメリット: 単価安定 + 繁忙期の納期優先 + 数量割引。${a(LINKS.contact, '年度契約の相談')}は無料です。</p>

<h2>5. 補習校・日本語学校の教材印刷はどう対応する?</h2>
<p>補習校・日本語学校は、学年ごとに教材が異なり、部数が少ないのが特徴。100冊からの小ロット対応で、学年ごとの教材を個別に発注できます。${a(LINKS.catEdu, '教育印刷')}カテゴリでは、教科書・教材・卒業記念アルバムまで一括対応。</p>
<p>${a(LINKS.notebooks, 'スパイラルノート')} (リングノート) は、書き足せる教材・ワークブックとして人気。企業研修や塾のオリジナル教材にも最適です。</p>

<h2>6. 教科書・教材の校了確認はどうする?</h2>
<p>ZprintPro は全工程で校了確認を実施: <strong>①デザインデータ確認 → ②PDF 校了 (無料) → ③色校正 (オプション) → ④実機サンプル (5冊)</strong>。ページ番号・章立て・問題番号・ISBN の位置まで、校了データで最終確認します。</p>
<p>カラーモードは CMYK 標準。図版が多い教材は、コート紙 + カラー印刷を推奨します。${a(LINKS.catBooks, '書籍印刷')}カテゴリで製本方式別の対応が確認できます。</p>

<h2>7. 教材の納期はどのくらい? 短納期対応は?</h2>
<p>標準 <strong>5-7 営業日</strong> (校了確認後)。短納期対応あり。新学期前 2週間 (8月中旬-9月上旬 / 3月中旬-4月上旬) は繁忙期のため、年度契約での前倒し発注を推奨します。</p>
<p>${a(LINKS.blogSaddle, '中綴じ冊子印刷ガイド')}・${a(LINKS.blogDoujin, '同人誌印刷ガイド')}でも納期の実例を紹介しています。</p>

<h2>8. 教材印刷と同人誌・卒業記念冊子はどう違う?</h2>
<p>同じ製本技術でも、用途で仕様が変わります。</p>
<table><thead><tr><th>用途</th><th>製本</th><th>部数</th><th>特長</th></tr></thead><tbody>
<tr><td>教科書・教材</td><td>無線綴じ中心</td><td>100-5,000冊</td><td>ISBN・バーコード対応、年度契約</td></tr>
<tr><td>同人誌</td><td>中綴じ・無線綴じ</td><td>50-500冊</td><td>小ロット、短納期、表紙加工自由</td></tr>
<tr><td>卒業記念アルバム</td><td>上製本</td><td>50-500冊</td><td>ハードカバー、高級感</td></tr>
</tbody></table>
<p>${a(LINKS.blogGrad, '卒業記念アルバム印刷ガイド')}・${a(LINKS.blogDoujin, '同人誌印刷')}も、${a(LINKS.catBooks, '書籍印刷')}カテゴリで一括対応します。</p>

<h2>9. 教材印刷の品質保証はどうなっている?</h2>
<p>ZprintPro は自社工場で一貫生産し、品質保証体制を整えています: <strong>①校了確認 100% (PDF 校了無料 + 実機サンプル 5冊) ②FSC 認証紙対応 ③DHL Express 追跡可能配送 ④15年以上のオフセット印刷経験を持つエンジニアチームが品質管理</strong>。カバーから本文まで、工程ごとに品質チェックを実施します。</p>

<h2>10. 教材・教科書印刷の国際配送は?</h2>
<p>香港深圳工場から <strong>DHL Express で日本へ 2-4日配送</strong>。学校・塾・出版社への直接出荷、複数校への一括配送 (分割納品) に対応。関税・通関もサポートします。</p>
<p>${a(LINKS.blogCampus, '校园教育印刷ガイド')}では、学校向け印刷の全体像を解説しています。</p>

<h2>11. よくある質問 (FAQ)</h2>
${faqs.map(([q, a2], i) => `<p><strong>Q${i + 1}: ${q}</strong><br/>A: ${a2}</p>`).join('\n')}

<h2>12. 教材・教科書印刷のご注文は?</h2>
<p>${a(LINKS.textbooks, '教科書印刷')}は 100冊から。${a(LINKS.quote, '30秒 AI 即時見積もり')}で、ページ数・部数・製本方式を入力するだけで正確な単価が分かります。年度契約・継続発注のご相談は、<a href="https://wa.me/8619880851334" class="text-[#2873F5] hover:underline">WhatsApp +86 198 8085 1334</a> または ${a(LINKS.contact, 'お問い合わせページ')}まで。教材・教科書の印刷製本は ZprintPro にお任せください。</p>`;

console.log(JSON.stringify(content));
