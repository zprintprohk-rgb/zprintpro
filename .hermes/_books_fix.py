# -*- coding: utf-8 -*-
# books meta desc fix: orphan price family 2.5/1.20/180 -> SSoT 6/1.84/258 (money-FAQ anchored)
import io, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
P = r'F:\zprintpro-nextjs\src\lib\seo.ts'
t = open(P, encoding='utf-8').read()

cur = {
    'zh': "書刊印刷 / 小冊子印刷 10 本起印，HK$2.5 起/本。騎馬釘 / 膠裝 / 精裝 / 兒童繪本 / 教材 / 公司年報 / 產品目錄，學校、出版、品牌、電商通用。免費設計打稿 4 小時，港九新界滿 HK$500 免費順豐速遞，DHL 全球 2-4 天配送。WhatsApp 30 秒即時報價，國際認證體系 + FSC 認證。",
    'en': "Custom saddle stitch booklet printing from $1.20, 10 MOQ. Also perfect bound / hardcover / children books / textbooks / annual reports / catalogs for schools, publishers, brands, e-commerce. Free design proof in 4 hours, DHL 2-4 day USA delivery, free shipping $99+. Rush 24-48h for urgent small runs. 30-second AI quote. internationally certified + FSC-certified.",
    'ja': "冊子印刷 10 部から、¥180〜。中綴じ・無線綴じ・上製本・児童書・テキスト・社内報・カタログ、学校・出版・ブランド・EC 向け。無料デザイン校正 2 時間、日本全国 DHL 2-4 日配送。急ぎ注文は 24-48 時間特急対応。30 秒 AI 無料見積もり。",
}
new = {
    'zh': "書刊印刷 / 小冊子印刷 10 本起印，HK$6 起/本。騎馬釘 / 膠裝 / 精裝 / 兒童繪本 / 教材 / 公司年報 / 產品目錄。免費設計打稿 4 小時，港九新界滿 HK$500 免費順豐速遞，DHL 全球 2-4 天配送。WhatsApp 30 秒即時報價，國際認證體系 + FSC 認證。",
    'en': "Saddle stitch booklet printing from $1.84, 10 MOQ. Perfect bound / hardcover / catalogs. Free design proof, DHL 2-4 day USA delivery, free shipping $99+.",
    'ja': "冊子印刷 10 部から、¥258〜。中綴じ・無線綴じ・上製本・児童書・テキスト・社内報・カタログ、学校・出版・ブランド・EC 向け。無料デザイン校正 2 時間、日本全国 DHL 2-4 日配送。急ぎ注文は 24-48 時間特急対応。30 秒 AI 無料見積もり。",
}
for loc in ['zh', 'en', 'ja']:
    print(f'{loc}: cur={len(cur[loc])} -> new={len(new[loc])} (<=158: {len(new[loc]) <= 158})')
ok = True
for loc, c in cur.items():
    n = t.count(c)
    if n != 1:
        print(f'  FAIL count={n} for {loc}')
        ok = False
if not ok:
    sys.exit(1)
for loc in ['zh', 'en', 'ja']:
    t = t.replace(cur[loc], new[loc])
open(P, 'w', encoding='utf-8', newline='\n').write(t)
print('books meta descs updated')
for bad in ['HK$2.5 起/本', 'from $1.20', '¥180〜']:
    print('residue', bad, ':', t.count(bad))
