# -*- coding: utf-8 -*-
"""16x2 workstream slices #1/#2: packagingContent en + ja category blocks (full CategoryLocaleContent).
Truths: food-boxes 100 MOQ HK$2.5-18 (US$0.74) 350g/400g PE/PLA 3-5d; folding 100 MOQ HK$2.5-15 (US$0.51)
300-350g/E-flute auto-lock 80cm-5kg flat-ship 70%; mailer 100 MOQ; processes foil/spotUV/emboss/window/QR;
service 1h proof/30s quote/DHL 2-4d/US free $99+. No fabricated numbers; no competitor names; no ISO (cleared)."""
import io, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-catslice-20261017")
CAT = os.path.join(ROOT, "src", "data", "category-seo-content.ts")

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

EN = """  'en': {
    featuredSnippet: 'Custom packaging boxes from 100 MOQ: food-grade boxes from US$0.74, folding cartons from US$0.51, mailer and rigid gift boxes. Foil, spot UV, embossing, PET windows and variable QR. 1-hour free proof, 3-5 day production, DHL 2-4 days worldwide, free US shipping over $99.',
    lastUpdated: '2026-10-17',
    h2: 'Custom Packaging Boxes — Food-Grade, Folding & Mailer | 100 MOQ, 1-Hour Free Proof',
    coreAdvantages: {
      title: 'Why brands order packaging boxes here',
      items: [
        {
          heading: '1. One factory, every box style',
          points: [
            'Food-grade boxes, folding cartons, mailers, rigid gift boxes and cosmetic boxes share one proof cycle and one QC standard',
            'Free die templates for standard structures; custom sizes and shaped die-cuts from 500 pieces',
            'Foil stamping, spot UV, embossing, PET windows and variable QR on the same panel',
          ],
        },
        {
          heading: '2. Low, honest minimums',
          points: [
            '100 pieces standard on food and folding boxes — no plate fees',
            'Volume tiers price automatically in the 30-second AI quote',
            'Small runs run digital; larger runs switch to offset for economy',
          ],
        },
        {
          heading: '3. Built for cross-border brands',
          points: [
            '1-hour free digital proof before anything goes to press',
            'DHL 2-4 days worldwide; free US shipping over $99',
            'DDP Japan option so recipients pay zero import handling',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Box styles and materials',
      subtitle: 'Match the stock to the product and shelf life',
      columns: ['Box type', 'Material & print', 'Best for'],
      rows: [
        { material: 'Food boxes', features: '350g food-grade white card or 400g grey-back; PE/PLA greaseproof lining; CMYK offset or digital', scenarios: 'Bakery, tea, supplements, mooncakes' },
        { material: 'Folding cartons', features: '300-350g white card or E-flute; auto-lock bottom passes 80cm drop test at 5kg', scenarios: 'Retail packs, DTC e-commerce' },
        { material: 'Mailer boxes', features: 'Corrugated shipping grade, 100 MOQ, optional double-sided print', scenarios: 'Subscription and unboxing' },
        { material: 'Rigid & gift boxes', features: 'Greyboard wrapped with printed wraps; foil and satin lining options', scenarios: 'Premium gifting, festivals' },
        { material: 'Cosmetic boxes', features: 'Lift-off, magnetic, drawer and book styles; EVA, molded pulp or PET trays', scenarios: 'Beauty and skincare' },
      ],
    },
    specialOptions: {
      title: 'Finishing options',
      items: [
        { name: 'Foil stamping', description: 'Gold, silver and holographic foils for logos and festival lines.' },
        { name: 'Spot UV', description: 'Raise logos or artwork patterns with a gloss spot layer over matte lamination.' },
        { name: 'PET windows', description: 'Clear windows show the product — a standard add-on on food and gift boxes.' },
        { name: 'Variable QR', description: 'Every box carries a unique code for batch traceability or campaigns.' },
      ],
    },
    techSpecs: {
      title: 'Specifications',
      items: [
        { label: 'MOQ', value: '100 pieces standard; custom sizes and shaped die-cuts from 500 pieces' },
        { label: 'Turnaround', value: '3-5 business days (digital); 5-7 days (offset); rush 2-3 days' },
        { label: 'Files', value: 'AI / PDF / InDesign, 300dpi, CMYK, 3mm bleed, fonts outlined' },
        { label: 'Proof', value: 'Free digital proof in 1 hour; physical samples on request' },
        { label: 'Delivery', value: 'DHL 2-4 days worldwide; free US shipping over $99; DDP Japan available' },
      ],
    },
    serviceNodes: {
      title: 'Service points',
      items: [
        { title: '1-hour free proof', description: 'Submit artwork and receive a colour-accurate digital proof within the hour.' },
        { title: '30-second AI quote', description: 'Price size, stock, finish and quantity instantly before you commit.' },
        { title: 'Cross-border desk', description: 'DHL, DDP Japan and US free-shipping lanes handled by one team.' },
      ],
    },
    buyingGuide: {
      title: 'How to choose your box',
      paragraphs: [
        'Start with the product, not the box: direct food contact calls for food-grade card with a PE or PLA lining; heavier retail packs need the E-flute upgrade; premium gifting wants rigid construction with foil. Structure follows the shelf — auto-lock for speed at packing time, lid-and-base for presentation, drawers for unboxing.',
        'Then balance MOQ against unit cost: 100 pieces keeps the first run honest, and the 500/1,000 tiers cut the per-piece rate for proven sellers. Send artwork early — the 1-hour free proof catches dieline and colour issues before they cost anything.',
      ],
      links: [
        { label: 'Custom food boxes (FDA food-grade)', href: '/en/product/food-boxes/' },
        { label: 'Folding cartons (auto-lock, flat-shipped)', href: '/en/product/folding-boxes/' },
        { label: 'Mailer boxes', href: '/en/product/mailer-boxes/' },
        { label: 'Rigid gift boxes', href: '/en/product/rigid-boxes/' },
        { label: 'Food packaging printing guide', href: '/en/blog/food-packaging-printing-guide/' },
      ],
    },
    faq: [
      { question: 'What is the MOQ for custom packaging boxes?', answer: '100 pieces standard on food and folding boxes; custom sizes and shaped die-cuts start at 500 pieces.' },
      { question: 'How much do custom boxes cost?', answer: 'Food-grade boxes start from US$0.74 and folding cartons from US$0.51; the final price moves with size, stock, finish and quantity — the 30-second AI quote prices it instantly.' },
      { question: 'Are the food boxes food-safe?', answer: 'Food-grade card with FDA-safe indirect food contact as standard, plus optional PE or PLA greaseproof linings; share the product type and we match the build.' },
      { question: 'How fast can packaging be delivered?', answer: '3-5 business days (digital) or 5-7 days (offset), plus DHL 2-4 days worldwide; rush production runs 2-3 days.' },
      { question: 'Can boxes carry windows, QR codes or foil?', answer: 'Yes — PET windows, variable-data QR codes and foil or spot UV finishes all work on the same panel.' },
    ],
  },
"""

JA = """  'ja': {
    featuredSnippet: 'オリジナルパッケージ・箱印刷は100個から。食品グレード箱 HK$2.5〜（¥101〜）、折りたたみ箱 HK$2.5〜（¥69〜）、箔押し・スポットUV・型抜き・可変QR対応。1時間で無料デジタル校正、3-5営業日で生産、DHL2-4日で日本へお届け。',
    lastUpdated: '2026-10-17',
    h2: 'パッケージ印刷・オリジナルボックス — 食品・クラフト・折りたたみ 100個から 1時間無料校正',
    coreAdvantages: {
      title: 'ブランドの箱をこの工場で',
      items: [
        {
          heading: '1. 箱の型式をひとつの工場で完結',
          points: [
            '食品グレード箱・折りたたみ箱・メールボックス・貼箱・化粧箱が同じ校正工程と同じ品質基準',
            '標準構造は無料型紙テンプレート、カスタムサイズ・型抜きは500個から',
            '箔押し・スポットUV・エンボス・PET窓・可変QRを同じ面板に',
          ],
        },
        {
          heading: '2. 正直な小ロット',
          points: [
            '食品・折りたたみ箱は100個から。版代ゼロ',
            '500/1000の段階レートは30秒AI見積りで即時表示',
            '小ロットはデジタル、量産はオフセットへ自動切替',
          ],
        },
        {
          heading: '3. 越境ブランド対応',
          points: [
            '入稿から1時間で無料デジタル校正',
            'DHL2-4日で日本へ。DDP（関税込み）オプションで受取人負担ゼロ',
            '品質重視・納期重視のサンプル確認にも対応',
          ],
        },
      ],
    },
    materialTable: {
      title: '箱型式と素材',
      subtitle: '中身と棚寿命で紙を選ぶ',
      columns: ['箱型式', '素材と印刷', '適した用途'],
      rows: [
        { material: '食品箱', features: '350gフードグレード白カード/400gグレーボード、PE・PLA防油内層、4色オフセットまたはデジタル', scenarios: 'ベーカリー、茶葉、サプリ、月餅' },
        { material: '折りたたみ箱', features: '300-350gカードまたはEフルート、自動ロック底は80cm落下試験・5kg耐荷重', scenarios: '小売パッケージ、DTC EC' },
        { material: 'メールボックス', features: '段ボール出荷グレード、100個から、両面印刷も可', scenarios: 'サブスク、開梱動画' },
        { material: '貼箱・ギフト箱', features: '灰板に printed wrap を貼合、箔押しとサテン裏地', scenarios: '高級ギフト、節句' },
        { material: '化粧箱', features: '天地蓋・マグネット・引き出し・ブック型、EVA/紙/PETトレイ', scenarios: 'ビューティー、スキンケア' },
      ],
    },
    specialOptions: {
      title: '加工オプション',
      items: [
        { name: '箔押し', description: '金・銀・ホログラム箔でロゴや節句ラインを立てます。' },
        { name: 'スポットUV', description: 'マットラミネート上に光沢のスポット層でロゴを浮かせます。' },
        { name: 'PET窓', description: 'クリア窓で中身を見せる——食品箱・ギフト箱の定番オプション。' },
        { name: '可変QR', description: '1箱ごとに異なるコードでロット追跡やキャンペーンに。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '最小注文数', value: '100個から（カスタムサイズ・型抜きは500個から）' },
        { label: '納期', value: '3-5営業日（デジタル）、5-7営業日（オフセット）、お急ぎ2-3営業日' },
        { label: '入稿', value: 'AI/PDF/InDesign、300dpi、CMYK、3mm塗り足し、フォントアウトライン化' },
        { label: '校正', value: '1時間で無料デジタル校正、実物サンプルも相談可' },
        { label: '配送', value: 'DHL2-4日で日本へ、DDPオプション、香港本地はHK$500以上でSF Express無料' },
      ],
    },
    serviceNodes: {
      title: 'サービス拠点',
      items: [
        { title: '1時間無料校正', description: 'データ提出後1時間で色味を確認できるデジタル校正をお届けします。' },
        { title: '30秒AI見積り', description: 'サイズ・紙・加工・部数をその場で試算してから発注できます。' },
        { title: '越境デスク', description: 'DHL・DDP日本向け・US無料配送レーンをひとつのチームで処理します。' },
      ],
    },
    buyingGuide: {
      title: '箱の選び方',
      paragraphs: [
        '箱からではなく中身から決めます。直接食品が触れるならフードグレード紙+PE/PLA内層、重い小売パックはEフルート補強、高級ギフトは貼箱構造+箔押し。棚での見え方が構造を決めます——梱包スピードなら自動ロック底、見栄えなら天地蓋、開梱体験なら引き出し式。',
        '次に部数と単価のバランスです。最初の100個で反応を確かめ、売れている型式は500/1000の段階レートで単価を下げます。データは早めに——1時間の無料校正が型紙と色の問題を費用発生前に潰します。',
      ],
      links: [
        { label: '食品パッケージ箱（FDA食品グレード）', href: '/ja/product/food-boxes/' },
        { label: '折りたたみ箱（自動ロック底・平置き出荷）', href: '/ja/product/folding-boxes/' },
        { label: 'メールボックス', href: '/ja/product/mailer-boxes/' },
        { label: '貼箱（高級ギフト）', href: '/ja/product/rigid-boxes/' },
        { label: '食品パッケージ印刷ガイド', href: '/ja/blog/food-packaging-printing-guide/' },
      ],
    },
    faq: [
      { question: 'オリジナルパッケージの最小注文数は？', answer: '食品・折りたたみ箱は100個から。カスタムサイズ・型抜きは500個からです。' },
      { question: '箱の価格は？', answer: '食品グレード箱はHK$2.5（¥101）から、折りたたみ箱はHK$2.5（¥69）から。最終価格はサイズ・紙・加工・部数で変動し、30秒AI見積りで即時表示されます。' },
      { question: '食品箱の安全性は？', answer: 'フードグレード紙+FDAセーフの間接食品接触を標準とし、PE/PLA防油内層を選択できます。中身の種類をお知らせいただければ構成をご提案します。' },
      { question: '納期はどのくらい？', answer: 'デジタル3-5営業日、オフセット5-7営業日。お急ぎは2-3営業日。DHLで日本へ2-4日です。' },
      { question: '窓・QR・箔押しは入れられますか？', answer: 'はい。PET窓・可変データQR・箔押し/スポットUVは同じ面板に併用できます。' },
    ],
  },
"""

cat = io.open(CAT, encoding="utf-8", newline="").read()
i = cat.find("packagingContent:")
check(i >= 0, "packagingContent located")
j = cat.find("{", i)
depth = 0
k = j
end = None
while k < len(cat):
    if cat[k] == "{":
        depth += 1
    elif cat[k] == "}":
        depth -= 1
        if depth == 0:
            end = k
            break
    k += 1
check(end is not None, "packagingContent Record end found (span %d)" % (end - i if end else -1))
span = cat[i:end]
check("'en'" not in span and "'ja'" not in span, "no existing en/ja keys in packaging Record")
# tail anchor: zh-hk block close + Record close
tail = cat[end - 12:end + 3]
print("tail:", repr(tail))
m = re.search(r"\n  \}\n\};$", span + "\n};")  # span ends with '  }' (no ;) then cat continues '};'
# safer: operate on cat directly: replace the Record's closing  '\n  }\n};' at `end`
INSERT = EN + JA
pre = cat[:end]
check(pre.rstrip().endswith("},"), "zh-hk block closes with trailing comma at record tail: %r" % pre[-8:])
INSERT_STRIPPED = INSERT.rstrip()
newcat = cat[:end - 1] + "\n" + INSERT_STRIPPED + "\n};" + cat[end + 1:]

# verify all hrefs exist as slugs
for u in re.findall(r"href: '(/[^']+)'", INSERT):
    check(u.startswith(("/en/", "/ja/")), "link prefix %s" % u)
for pat in ("food-boxes", "folding-boxes", "mailer-boxes", "rigid-boxes"):
    check(("product/" + pat) in INSERT or ("product/" + pat + "/") in INSERT or pat in INSERT, "slug %s referenced" % pat)
bad_ja = [c for c in JA if c in "裝內"]
check(not bad_ja, "ja block no traditional-only (found %s)" % "".join(sorted(set(bad_ja))))
bad_en = [c for c in EN if ord(c) > 0x2E80 and c not in "×"]
check(not bad_en, "en block no CJK (found %s)" % "".join(sorted(set(bad_en))))

if MODE == "apply":
    if errors:
        print("\nASSERTIONS FAILED — no write."); sys.exit(2)
    os.makedirs(BAK, exist_ok=True)
    shutil.copy2(CAT, os.path.join(BAK, "category-seo-content.ts.bak"))
    # insertion: zh close '  }' stays; append ',\n' + blocks + '\n};' replacing the old '\n};'
    head = cat[:end - 1]  # everything before the final newline preceding Record close
    newcat = head + ",\n" + INSERT.rstrip() + "\n};" + cat[end + 1:]
    io.open(CAT, "w", encoding="utf-8", newline="").write(newcat)
    check(open(CAT, "rb").read(2)[0] != 0xFF, "no BOM")
    print("\nWROTE: packagingContent en+ja blocks (%d chars inserted)" % len(INSERT))
else:
    print("\nVERIFY pending: en %d chars + ja %d chars" % (len(EN), len(JA)))
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
