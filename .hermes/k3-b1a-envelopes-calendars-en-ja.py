#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
B1a: envelopes + calendars en/ja 12 行补全 (K3 §6 轨 1 CTR 修复 + 季节军令状 9/15 硬截止)
数据来源: money-words-ctr-rewrite-plan.md §2 批 1 + 97dac44 撞车版 en 3 行
撞车 = M3 自主 (K3 8/26 04:50 v2 预批"立即"重启)
"""
import sys

SEO_TS = r"F:\zprintpro-nextjs\src\lib\seo.ts"

# 12 行精确替换 (read old, replace new)
# 不用 ';' 半角分号, 避免 SWC 误识别
REPLACEMENTS = [
    # envelopes en title (490)
    (
        "      en: 'Custom Envelopes Free Shipping · 100 MOQ Kraft/Window/Corporate Logo | ZprintPro',",
        "      en: 'C4 / C5 / DL Envelopes from $0.06 | 100 MOQ + Free Proof + Made for USA | ZprintPro',"
    ),
    # envelopes ja title (491)
    (
        "      ja: '封筒印刷 100個〜 · クラフト/窓付き/カラー/企業ロゴ ISO認証 DHL | ZprintPro',",
        "      ja: '封筒印刷 100個〜 · C4/C5/DL/クラフト/窓付き/カラー/企業ロゴ · ISO認証 · DHL全国 | ZprintPro',"
    ),
    # envelopes en keywords (495)
    (
        "      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing',",
        "      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C4 envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing,Made for USA,Free Proof',"
    ),
    # envelopes ja keywords (496)
    (
        "      ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,企業封筒,ロゴ封筒,長3封筒,洋形封筒,エアメール封筒,印刷封筒,社名入り封筒',",
        "      ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,C4 封筒,C5 封筒,企業封筒,ロゴ封筒,長3封筒,洋形封筒,エアメール封筒,印刷封筒,社名入り封筒,日本全国,沖縄北海道,短納期',"
    ),
    # envelopes en desc (500)
    (
        "      en: 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5 + corporate branding. Free shipping over $99 to USA. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',",
        "      en: 'Custom envelope printing 100 MOQ. C4 / C5 / DL / kraft / window / colored / corporate branding. Free shipping over $99 to USA + free proof in 4 hours. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global delivery. Made for USA, perfect for business and corporate use.',"
    ),
    # envelopes ja desc (501)
    (
        "      ja: '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',",
        "      ja: '封筒印刷 100 個から対応. C4・C5・DL・クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日. 日本全国 + 沖縄・北海道対応.',"
    ),
    # calendars en title (455)
    (
        "      en: 'Custom Calendars Free Shipping · 100 MOQ 2027 Hardcover Foil | ZprintPro',",
        "      en: 'Calendar Printing 2027 from $5 | 100 MOQ + Q4 Peak + 60-Day Pre-Order + Foil Hardcover + Made for USA | ZprintPro',"
    ),
    # calendars ja title (456)
    (
        "      ja: 'カレンダー印刷 100部〜 · デスク/壁掛け/2027 箔押し上製本 ISO認証 | ZprintPro',",
        "      ja: 'カレンダー印刷 2027 100部〜 · Q4繁忙期 + 60日予約 + 箔押し上製本 + 企業 LOGO + 日本全国 | ZprintPro',"
    ),
    # calendars en keywords (460)
    (
        "      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar',",
        "      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar,Made for USA,Q4 peak,60-day pre-order',"
    ),
    # calendars ja keywords (461)
    (
        "      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品',",
        "      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品,Q4繁忙期,60日予約,日本全国,沖縄北海道,短納期',"
    ),
    # calendars en desc (465)
    (
        "      en: 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Free shipping over $99 to USA. DHL Express 2-4 day. 30-second AI quote, ISO 9001. Order 60 days before Q4 peak. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',",
        "      en: 'Custom calendar printing 2027, 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Order 60 days before Q4 peak (Sep 15 hard deadline). Free shipping over $99 to USA + free proof in 4 hours. DHL Express 2-4 day USA delivery. Made for USA, perfect for corporate gifts, schools, retail brands. 30-second AI quote, ISO 9001 certified.',"
    ),
    # calendars ja desc (466)
    (
        "      ja: 'カレンダー印刷 100 部から対応. デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日. 繁忙期の 60 日前までのご注文を推奨.',",
        "      ja: 'カレンダー印刷 2027, 100 部から対応。デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO。繁忙期 60 日前までのご注文を推奨 (9月15日 ハードデッドライン)。日本全国 DHL 2-4 日配送、沖縄・北海道対応。30 秒 AI 無料見積もり、ISO 9001 認証品質。',"
    ),
]


def main():
    with open(SEO_TS, 'r', encoding='utf-8') as f:
        content = f.read()

    replaced_count = 0
    not_found = []
    for old, new in REPLACEMENTS:
        if old in content:
            content = content.replace(old, new, 1)
            replaced_count += 1
        else:
            not_found.append(old[:60] + "...")

    if not_found:
        print(f"[FAIL] {len(not_found)} lines NOT found:")
        for nf in not_found:
            print(f"  - {nf}")
        sys.exit(1)

    # Write back with utf-8 no BOM
    with open(SEO_TS, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"[OK] {replaced_count} lines replaced in src/lib/seo.ts")
    print(f"     envelopes en/ja 6 + calendars en/ja 6 = 12 行")


if __name__ == "__main__":
    main()
