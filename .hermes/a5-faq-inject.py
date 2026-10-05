# -*- coding: utf-8 -*-
"""A5: 10-block FAQ AEO injection (content layer only, zero title touch)"""
import io

P = r'F:\zprintpro-nextjs\src\data\category-seo-content.ts'
lines = io.open(P, encoding='utf-8').read().split('\n')

INS = {
    2047: [
        "      { q: '利是封訂製幾多個起？燙金要唔要加錢？', a: '100 個起訂。燙金、擊凸、UV、鏤空全部工藝可選，11 月前落單保證農曆新年前到貨，免費 4 小時打稿，3-5 個工作天交貨。' },",
    ],
    1736: [
        "      { q: '座檯月曆同掛牆月曆尺寸點揀？', a: '座檯月曆（150×180mm / 200×230mm）適合收銀位同寫字樓桌面；掛牆月曆 A3（297×420mm）適合廚房同貨倉。1 本起訂，3-5 個工作天交貨。' },",
        "      { q: '訂製月曆幾多本起印？可以放公司名同 logo？', a: '1 本起訂。公司名月曆客戶送禮常用 50-200 本批量，500/1,000 本有再折扣。免費 4 小時數碼打稿，滿 HK$500 順豐免運。' },",
    ],
    1843: [
        "      { q: 'What size is a standard wall calendar?', a: 'A standard wall calendar is 297×420mm (A3) when closed — the most common size for offices and retail. Desk calendars are 150×180mm or 200×230mm. All sizes print from 1 copy with 3-5 day turnaround.' },",
        "      { q: 'How much does a calendar weigh?', a: 'A standard A3 wire-bound wall calendar (250gsm cover + 128gsm inner pages) weighs about 180-220g — light enough for regular postage in a C4 envelope. We ship single calendars DHL 2-4 days worldwide.' },",
        "      { q: 'Can I order 2027 custom calendars in small batches?', a: 'Yes — 2027 custom calendars print from 1 copy. Company-name calendars for client gifting typically run 50-200 copies with bulk tiers at 500/1,000. Free digital proof in 4 hours, DHL 2-4 day global delivery.' },",
    ],
    1942: [
        "      { q: '社名入りカレンダーは少量注文できますか？', a: 'はい、1部から対応可能です。法人ギフト用は50-200部が標準、500/1,000部で数量割引。名入れ・ロゴ印刷対応、デジタル校正4時間、DHL国際配送2-4日。' },",
    ],
    1623: [
        "      { q: 'クラフト紙のパッケージ印刷はできますか？', a: 'はい、クラフト紙（牛皮紙）100個から印刷可能。無漂白・リサイクル対応の環境配慮型で、EC梱包・ギフト用に最適。箔押し・エンボス加工も追加でき、FSC認証紙対応。3-5営業日納期、DHL 2-4日配送。' },",
    ],
    3388: [
        "      { q: '車身廣告貼紙價錢幾多？自己貼得唔得？', a: '車身廣告用戶外級防水貼紙，按車型尺寸即時報價，1 張起印。DIY 貼裝可以，提供定位紙同刮板教學；複雜曲面建議專業安裝。耐候 3-5 年，撕走唔留痕。' },",
    ],
    3696: [
        "      { q: '膠裝書印刷價格點計？', a: '膠裝書（無線綴じ）10 本起印，32-200 頁常見規格，100 本以上享批量折扣。免費 4 小時打稿，3-5 個工作天交貨。確實價格用 30 秒 AI 報價按頁數同紙質即時計算。' },",
        "      { q: '書刊印刷同印書有咩分別？', a: '書刊印刷泛指期刊、雜誌、公司刊物的定期印製；印書通常指單本或少量書籍（個人作品集、教材、紀念冊）。兩者都 10 本起印，騎馬釘適合 8-64 頁，膠裝/精裝適合 64 頁以上。' },",
    ],
    3806: [
        "      { q: 'Do you also print product catalogs?', a: 'Yes — catalog printing covers 8-64 page saddle-stitch and perfect-bound catalogs from 10 copies, same saddle stitch pricing from $1.20. For factory-direct bulk orders see our China catalog printing service page (10 MOQ, DHL 2-4 days).' },",
    ],
    4208: [
        "      { q: 'コミケの印刷品は何部から注文できますか？', a: '同人誌は10部から、ポスター・カード類は1部から注文可能。コミケ直前の特急対応も承ります（要相談）。新刊の本文は中綴じ・無線綴じ・上製本から選択、表紙は箔押しや局部UVで差別化できます。' },",
    ],
    178: [
        "      { q: '可移貼紙同戶外貼紙有咩分別？', a: '可移貼紙（再剥離）撕走不留痕，適合玻璃櫥窗同短期推廣；戶外貼紙用防水防 UV 材質，耐候 3-5 年，適合車身同外牆。兩款都 10 張起印。' },",
        "      { q: '透明貼紙同環保材質貼紙有冇得印？', a: '有。透明貼紙可選白墨打底（全面/局部/無三種效果）；環保材質有種子紙同 FSC 認證紙，適合永續品牌。10 張起印，免費數據檢查。' },",
    ],
}

for ln in sorted(INS.keys(), reverse=True):
    assert lines[ln - 1].strip() == 'faq: [', 'L%d not faq head: %s' % (ln, lines[ln - 1].strip())
    for entry in reversed(INS[ln]):
        lines.insert(ln, entry)

io.open(P, 'w', encoding='utf-8', newline='\n').write('\n'.join(lines))
print('injected %d FAQ entries across %d blocks' % (sum(len(v) for v in INS.values()), len(INS)))
