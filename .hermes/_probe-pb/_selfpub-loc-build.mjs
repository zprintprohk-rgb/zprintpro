/**
 * TEMP builder (probe only) — emits .hermes/staging/self-publishing-content.zhhk-ja.json
 * NOT part of src/. Deterministic; no network.
 */
import fs from 'fs';
import path from 'path';

const OUT = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';

/* ------------------------------------------------------------------ zh-hk */
const ZHHK = {};

ZHHK.title = '自費出版印刷：1 本起印、無最低起訂量 平裝精裝 | 智印港';

ZHHK.description =
  '自費出版印刷 1 本起印、無最低起訂量。平裝、精裝、騎馬釘、線圈裝四種裝訂對比，附 100 至 10,000 本單價階梯，柯式 100 本以上更平。即刻 WhatsApp 傳規格索取報價。';

ZHHK.excerpt =
  '自費出版印刷 1 本起印、無最低起訂量，呢份指南拆解五種裝訂方式同紙材點揀，講清楚 100 本由數碼轉柯式嘅分界線，並公開 100 本到 10,000 本嘅逐本參考單價階梯，最後逐項核對低 MOQ、快樣品、透明工廠三件事。';

ZHHK.content = `<p>自費出版印刷<strong>1 本起印、無最低起訂量</strong>。數碼短版免開版費；印量上到 100 本以上轉柯式，開版費攤薄後單價更低。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：一本書最低要印幾本？</p><p class="text-sm">1 本起印、無最低起訂量。類目頁寫明書刊走數碼印刷，免開版費。</p></div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：幾時柯式會比數碼划算？</p><p class="text-sm">100 本以上；類目頁建議由呢個印量開始轉柯式。100 本以下數碼單價較高，但免開版費。</p></div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">快速答案：大批印之前點樣驗質素？</p><p class="text-sm">先訂 1 本：無線膠裝線提交檔案後 1 小時內出數碼打稿。</p></div>

<p>知自己本書有幾多頁？<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">WhatsApp 傳規格給智印港</a>，索取 100 本同 1,000 本嘅逐本報價。</p>

<h2>自費出版嘅書可以只印 1 本嗎？</h2>

<p>可以。<a href="/zh-hk/category/books/">書刊印刷類目頁</a>寫明<strong>數碼印刷 1 本起印</strong>，並列明適合自費出版同限量藝術版。眾籌開售之前，先訂 1 本、影相，之後才印整批。</p>

<h2>自費出版書刊嘅價錢係點計？</h2>

<p>書刊一律<strong>逐本報價</strong>，決定價格帶嘅係四項規格：<strong>頁數、開本、內頁紙同裝訂方式</strong>。已公佈嘅價格帶如下：<a href="/zh-hk/product/perfect-bound-books/">無線膠裝書刊</a>每本 HK$16-80、<a href="/zh-hk/product/hardcover-books/">精裝硬皮書刊</a>每本 HK$40-240、<a href="/zh-hk/product/saddle-stitch-booklets/">騎馬釘小冊子</a>每本 HK$6-32、<a href="/zh-hk/product/spiral-notebooks/">線圈筆記本</a>每本 HK$8-40、<a href="/zh-hk/product/catalog-printing/">產品目錄印刷</a>每本 HK$2.8-1000。</p>

<p>產品頁寫明用 HP Indigo 15K B2 數碼線同海德堡柯式印刷線。柯式要開版，印前準備屬固定成本，要印量夠大才攤得薄。交期：數碼 2-3 天、柯式 5-7 天、精裝 7-10 天。海外走 DHL，全球 2-4 天，美國訂單 US$99 以上免運費。</p>

<h2>你本書應該揀邊種裝訂？</h2>

<p>類目頁列出六種裝訂方式，以下五種有獨立產品頁。</p>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">裝訂方式</th><th class="border p-2 text-left">適合用途</th><th class="border p-2 text-left">頁數</th></tr></thead><tbody><tr><td class="border p-2">無線膠裝</td><td class="border p-2">小說、報告</td><td class="border p-2">48-400</td></tr><tr><td class="border p-2">精裝硬皮</td><td class="border p-2">紀念冊、年刊</td><td class="border p-2">按頁數而定</td></tr><tr><td class="border p-2">騎馬釘</td><td class="border p-2">小誌、場刊</td><td class="border p-2">8-64</td></tr><tr><td class="border p-2">線圈／螺旋裝</td><td class="border p-2">工作本、手冊</td><td class="border p-2">按頁數而定</td></tr><tr><td class="border p-2">產品目錄</td><td class="border p-2">作品集、Lookbook</td><td class="border p-2">按頁數而定</td></tr></tbody></table>

<p>無線膠裝同精裝硬皮都唔可以完全攤平，跨頁圖橫跨書脊時會有幾毫米被壓入書脊位；騎馬釘同線圈裝可以攤平，適合<a href="/zh-hk/blog/zine-small-batch-booklet-printing-guide/">小批量小冊子</a>。</p>

<h2>由 100 本到 10,000 本，單價階梯係點？</h2>

<p>無線膠裝產品頁公佈咗一組參考階梯，規格係 A5（148 x 210 mm）、4+32pp、PUR 無線膠裝。</p>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">印量</th><th class="border p-2 text-left">逐本單價</th></tr></thead><tbody><tr><td class="border p-2">100</td><td class="border p-2">US$2.08</td></tr><tr><td class="border p-2">500</td><td class="border p-2">US$0.66</td></tr><tr><td class="border p-2">1,000</td><td class="border p-2">US$0.36</td></tr><tr><td class="border p-2">5,000</td><td class="border p-2">US$0.14</td></tr><tr><td class="border p-2">10,000</td><td class="border p-2">US$0.11</td></tr></tbody></table>

<p>逐本單價由 100 本嘅 US$2.08 跌到 1,000 本嘅 US$0.36，之後走勢轉平，產品頁把 10,000 本一檔標為最抵。呢個走勢指向分兩步走：先用數碼印給支持者，需求確認之後再轉柯式。一次問<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">兩個印量嘅報價</a>，就睇到差距。</p>

<h2>邊種紙同封面材料經得起郵寄？</h2>

<p>紙材按每個書名列在產品資料內。無線膠裝同產品目錄用 157g-200g 內頁粉紙，封面 200g-250g 過膜；精裝改用 2.5mm 灰板，可加燙金或書籤絲帶；騎馬釘用 128g-157g 書紙。啞膜易現手印，光膜易現刮痕。以圖為主嘅書刊，同一套邏輯見<a href="/zh-hk/blog/childrens-picture-book-printing-guide/">兒童繪本印刷指南</a>。</p>

<h2>低 MOQ、快樣品、透明工廠</h2>

<p>低 MOQ、快樣品同透明工廠，係作者真正買緊嘅三件事，而且落單前全部查得到。</p>

<p><strong>低 MOQ。</strong>數碼印刷最低 1 本、無最低起訂量，所以打稿本同限量簽名版可以由同一個檔案出。類目頁建議 100 本以上轉柯式，並列出 500、1,000、5,000 本嘅批量折扣；而偏向柯式嘅書刊產品頁，結構化欄位寫嘅最低數量係 100 本。請向我們確認邊個口徑適用於你嘅規格。</p>

<p><strong>快樣品。</strong>無線膠裝線提交檔案後 1 小時內出數碼打稿；類目頁寫明 4 小時內提供免費設計打稿。</p>

<p><strong>透明工廠。</strong>廠房標示為 ISO 9001 同 FSC 認證，書刊產品頁寫明 ICC 色彩管理同機上打樣，類目頁亦提到設有 InDesign 排版團隊。<a href="/zh-hk/insights/hk-print-inquiry-index/">印刷詢價索引</a>列出工廠收檔案前需要嘅規格欄位。</p>

<h2>自費出版印刷常見問題</h2>

<p><strong>Q1: 係唔係真係無最低起訂量？</strong><br/>A: 類目頁寫明數碼印刷 1 本起印、無最低起訂量；而偏向柯式嘅書刊產品頁，結構化欄位寫住 100 本。</p>

<p><strong>Q2: 印 100 本平裝書要幾錢？</strong><br/>A: 以已公佈嘅 A5、4+32pp、PUR 無線膠裝參考規格計，產品頁列 100 本時每本 US$2.08，整批 US$207.94。</p>

<p><strong>Q3: 大批印之前可唔可以先攞樣品？</strong><br/>A: 可以。因為最低 1 本起印，樣品可以由同一個檔案單獨訂；類目頁亦寫明 4 小時內提供免費設計打稿。</p>

<p><strong>Q4: 印刷同送貨要幾耐？</strong><br/>A: 按類目頁：數碼 2-3 天、柯式 5-7 天、精裝 7-10 天。海外走 DHL，全球 2-4 天，美國訂單 US$99 以上免運費。</p>

<p>準備好攞住自己本書？<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">WhatsApp 傳開本同頁數給智印港</a>，索取你嘅印量報價。延伸閱讀：<a href="/zh-hk/blog/catalog-printing-guide/">產品目錄印刷</a>同<a href="/zh-hk/category/educational/">校園教育印刷</a>。</p>`;

/* ---------------------------------------------------------------------- ja */
const JA = {};

JA.title = '自費出版印刷：1 部から、最低注文数なし 並製本 | ZprintPro';

JA.description =
  '自費出版印刷は 1 部から、最低注文数なし。並製本・上製本・中綴じ・ワイヤー綴じを比較し、100 部から 10,000 部の単価ラダーを掲載。WhatsApp でお見積りをどうぞ。';

JA.excerpt =
  '自費出版の印刷は 1 部から、最低注文数なし。5 つの製本形式と用紙の選び方を比較し、100 部でデジタルからオフセットに切り替わる分岐点を解説します。100 部から 10,000 部までの 1 部単価ラダーを掲載し、小ロット・スピード校正・透明な工場の 3 点も確認方法つきでまとめました。';

JA.content = `<p>自費出版の印刷は<strong>1 部から、最低注文数なし</strong>。少部数は版代のかからないデジタルで、100 部以上はオフセットに切り替わります。</p>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：書籍の最低注文数は？</p><p class="text-sm">1 部から、最低注文数なし。カテゴリページにはデジタル印刷で版が不要と記載されています。</p></div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：オフセットが有利になるのは？</p><p class="text-sm">100 部以上です。カテゴリページもこの部数からオフセットを推奨しています。それ未満はデジタルの単価が高いものの版代がかかりません。</p></div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">クイック回答：本番前に品質を確かめるには？</p><p class="text-sm">まず 1 部だけ注文します。無線綴じラインでは入稿後 1 時間以内にデジタル校正ができます。</p></div>

<p>ページ数は決まっていますか？<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">WhatsApp で ZprintPro に仕様を送信</a>すると、100 部と 1,000 部の 1 部単価をお見積りします。</p>

<h2>自費出版の本は 1 部から印刷できますか？</h2>

<p>できます。<a href="/ja/category/books/">書籍印刷カテゴリページ</a>には<strong>デジタル印刷で 1 部からの最小部数</strong>と記載され、自費出版や限定アート版に向くと明記されています。クラウドファンディング開始前に 1 部だけ注文して撮影し、その後に本番を刷る流れです。</p>

<h2>自費出版の印刷価格はどう決まりますか？</h2>

<p>書籍は 1 部ごとの見積りです。価格帯を決めるのは<strong>ページ数・判型・本文用紙・製本方法</strong>の 4 項目です。公開されている価格帯は、<a href="/ja/product/perfect-bound-books/">無線綴じ書籍</a>が 1 部 HK$16-80、<a href="/ja/product/hardcover-books/">ハードカバー</a>が HK$40-240、<a href="/ja/product/saddle-stitch-booklets/">中綴じ冊子</a>が HK$6-32、<a href="/ja/product/spiral-notebooks/">ワイヤー綴じノート</a>が HK$8-40、<a href="/ja/product/catalog-printing/">カタログ印刷</a>が HK$2.8-1000 です。</p>

<p>製品ページには HP Indigo 15K B2 のデジタルラインとハイデルベルクのオフセット印刷機が記載されています。オフセットは版が必要なため、仕込みのコストは部数が多いほど薄まります。納期はデジタル 2-3 日、オフセット 5-7 日、ハードカバー 7-10 日。海外は DHL で 2-4 日、米国は US$99 以上で送料無料です。</p>

<h2>本にはどの製本を選ぶべきですか？</h2>

<p>カテゴリページには 6 種類の製本方法が記載されています。このうち 5 種類に製品ページがあります。</p>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">製本</th><th class="border p-2 text-left">向く用途</th><th class="border p-2 text-left">ページ数</th></tr></thead><tbody><tr><td class="border p-2">無線綴じ</td><td class="border p-2">小説・報告書</td><td class="border p-2">48-400</td></tr><tr><td class="border p-2">ハードカバー</td><td class="border p-2">記念冊子・卒業アルバム</td><td class="border p-2">ページ数による</td></tr><tr><td class="border p-2">中綴じ</td><td class="border p-2">ジン・プログラム</td><td class="border p-2">8-64</td></tr><tr><td class="border p-2">ワイヤー綴じ・スパイラル</td><td class="border p-2">ワークブック・マニュアル</td><td class="border p-2">ページ数による</td></tr><tr><td class="border p-2">カタログ</td><td class="border p-2">ルックブック・ポートフォリオ</td><td class="border p-2">ページ数による</td></tr></tbody></table>

<p>無線綴じとハードカバーは完全には平らに開きません。背をまたぐ図版は数ミリが綴じ目に隠れるため、背の両側に余白を取ります。中綴じとワイヤー綴じは平らに開くので、薄い<a href="/ja/blog/zine-small-batch-booklet-printing-guide/">小ロットの冊子</a>に向いています。</p>

<h2>100 部から 10,000 部の単価ラダーは？</h2>

<p>無線綴じの製品ページでは、A5（148 x 210 mm）、4+32pp、PUR 無線綴じの参考ラダーが公開されています。</p>

<table class="w-full text-sm border-collapse my-4"><thead><tr class="bg-gray-100"><th class="border p-2 text-left">部数</th><th class="border p-2 text-left">1 部単価</th></tr></thead><tbody><tr><td class="border p-2">100</td><td class="border p-2">US$2.08</td></tr><tr><td class="border p-2">500</td><td class="border p-2">US$0.66</td></tr><tr><td class="border p-2">1,000</td><td class="border p-2">US$0.36</td></tr><tr><td class="border p-2">5,000</td><td class="border p-2">US$0.14</td></tr><tr><td class="border p-2">10,000</td><td class="border p-2">US$0.11</td></tr></tbody></table>

<p>1 部単価は 100 部の US$2.08 から 1,000 部の US$0.36 まで下がり、その後は横ばいになります。製品ページは 10,000 部の区分を最も割安と表示しています。これは、支援者向けにデジタルで刷り、需要が確認できてからオフセットに切り替える 2 段階の進め方が向くことを示します。<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">2 つの部数で見積り</a>を取ると差が分かります。</p>

<h2>郵送に耐える用紙と表紙は？</h2>

<p>用紙は製品データに書名ごとに記載されています。無線綴じとカタログは本文が 157g-200g のアート紙、表紙が 200g-250g のラミネート加工です。ハードカバーは 2.5mm のグレー板紙に変わり、箔押しやしおり紐を選べます。中綴じは 128g-157g の書籍用紙を使います。マットラミネートは手の跡が残り、グロスは傷が目立ちます。写真主体の書籍も同じ考え方で、<a href="/ja/blog/childrens-picture-book-printing-guide/">子ども向け絵本のガイド</a>をご覧ください。</p>

<h2>小ロット・スピード校正・透明な工場</h2>

<p>小ロット、スピード校正、透明な工場の 3 点は、著者が実際に買っている要素であり、いずれも発注前に確認できます。</p>

<p><strong>小ロット。</strong>デジタル印刷なら最小 1 部、最低注文数なしです。校正用の 1 部も限定署名版も同じ入稿データから作れます。カテゴリページは 100 部以上でオフセットを推奨し、500 部・1,000 部・5,000 部のボリューム割引を記載しています。一方、オフセット向けの書籍製品ページの構造化項目には最小 100 部と記載されています。どちらの数値がお客様の仕様に当てはまるかは、お問い合わせください。</p>

<p><strong>スピード校正。</strong>無線綴じラインでは入稿後 1 時間以内にデジタル校正ができ、カテゴリページには 4 時間以内の無料デザイン校正と記載されています。</p>

<p><strong>透明な工場。</strong>工場は ISO 9001 と FSC 認証と記載され、書籍の製品ページには ICC カラーマネジメントと機上校正が記載されています。カテゴリページには InDesign の組版チームについての記載もあります。<a href="/ja/insights/hk-print-inquiry-index/">印刷問い合わせ索引</a>には、入稿前に工場が必要とする仕様項目がまとまっています。</p>

<h2>自費出版印刷についてよくある質問</h2>

<p><strong>Q1: 本当に最低注文数はないのですか？</strong><br/>A: カテゴリページにはデジタル印刷で 1 部から、最低注文数なしと記載されています。一方、オフセット向けの書籍製品ページの構造化項目には 100 部と記載されています。</p>

<p><strong>Q2: 並製本を 100 部刷るといくらですか？</strong><br/>A: 公開されている A5、4+32pp、PUR 無線綴じの参考仕様では、製品ページに 100 部で 1 部 US$2.08、バッチ合計 US$207.94 と記載されています。</p>

<p><strong>Q3: 本番前に見本を入手できますか？</strong><br/>A: できます。最小部数が 1 部のため、同じ入稿データから見本を 1 部だけ注文できます。カテゴリページには 4 時間以内の無料デザイン校正と記載されています。</p>

<p><strong>Q4: 印刷と配送にどのくらいかかりますか？</strong><br/>A: カテゴリページによると、デジタル 2-3 日、オフセット 5-7 日、ハードカバー 7-10 日です。海外は DHL で 2-4 日、米国は US$99 以上で送料無料です。</p>

<p>ご自身の本を手元に置く準備はできましたか？<a href="https://wa.me/8619880851334" target="_blank" rel="noopener">判型とページ数を ZprintPro に WhatsApp で送信</a>すると、部数に応じた見積りをお送りします。関連記事：<a href="/ja/blog/catalog-printing-guide/">カタログ印刷</a>と<a href="/ja/category/educational/">教育機関向け印刷</a>。</p>`;

/* ------------------------------------------------------------------- emit */
const doc = {
  slug: 'self-publishing-printing-guide',
  title: { 'zh-hk': ZHHK.title, ja: JA.title },
  description: { 'zh-hk': ZHHK.description, ja: JA.description },
  excerpt: { 'zh-hk': ZHHK.excerpt, ja: JA.excerpt },
  category: { 'zh-hk': '書刊印刷', ja: '印刷知識' },
  content: { 'zh-hk': ZHHK.content, ja: JA.content },
};

const json = JSON.stringify(doc, null, 2).replace(/\r\n/g, '\n') + '\n';
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, json, { encoding: 'utf8' });
const b = fs.readFileSync(OUT);
console.log('written', OUT);
console.log('bytes', b.length, 'BOM', b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf, 'CR', b.includes(0x0d));
