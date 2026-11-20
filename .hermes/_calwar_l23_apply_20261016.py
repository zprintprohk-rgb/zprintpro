# -*- coding: utf-8 -*-
"""
.hermes/_calwar_l23_apply_20261016.py — 日历战争层 2/3 修正 (v2 方案 P0-4)
层 2 (seo.ts): zh meta 假地板 HK$10 起/本 → HK$3-8/本 (SKU 真值) + en title 假地板 from $5 → from $0.40 (51 当量) + en/ja desc 300 部假批量阈值去数字 + ISO 9001 认证词修正 (CRED 口径)
层 3 (conversion-blocks + CategoryIndustries): 燙金 100 本起 ×2 + stat 1000本起 → 1本起 + 1507 整条旧价目串 (HK$18/9/10-15/9折) 真值重写 + 过期 9 月中死线 → 10 月底 (products.ts 檔期口径) + 三语 bullet 100→1
§12 三件套: 计数断言 + 形状断言 + 备份
"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BAK = os.path.join(REPO, ".hermes", "_bak-calwar-l23-20261016")
os.makedirs(BAK, exist_ok=True)

FILES = {
"src/lib/seo.ts": [
    ("en: 'Calendar Printing 2027 from $5 | 1 MOQ + Bulk 300+ + Q4 Peak + 60-Day Pre-Order + Foil Hardcover | ZprintPro',",
     "en: 'Calendar Printing 2027 from $0.40 | 1 MOQ | ZprintPro',"),
    ("'月曆印刷 2027 1 本起印（批量 300 本起上印刷機更抵）、HK$10 起/本。座檯月曆 / 掛牆月曆 / 月曆訂製 + 燙金精裝 + 企業 LOGO。Q4 旺季建議提前 60 天下單,月曆訂製免費設計打稿。港九新界滿 HK$500 免費順豐速遞,DHL 全球 2-4 天配送,ISO 9001 認證,WhatsApp 30 秒即時報價。'",
     "'月曆印刷 2027 1 本起印，大批量上印刷機更抵，HK$3-8/本。座檯月曆 / 掛牆月曆 / 月曆訂製 + 燙金精裝 + 企業 LOGO。Q4 旺季建議提前 60 天下單，免費設計打稿。港九新界滿 HK$500 免費順豐速遞，DHL 全球 2-4 天配送，國際認證體系，WhatsApp 30 秒即時報價。'"),
    ("Custom calendar printing 2027, 1 MOQ, bulk offset from 300. Desk & wall calendars + foil hardcover + corporate logo. Free proof in 4h, DHL 2-4 day USA. Made for USA, ideal for corporate gifts & schools.",
     "Custom calendar printing 2027, 1 MOQ, bulk offset for large runs. Desk & wall calendars + foil hardcover + corporate logo. Free proof in 4h, DHL 2-4 day USA. Made for USA, ideal for corporate gifts & schools."),
    ("カレンダー印刷 2027 1 部〜、300 部からオフセット大量対応。",
     "カレンダー印刷 2027 1 部〜、オフセット大量対応。"),
    ("30 秒 AI 無料見積もり、ISO 9001 認証。",
     "30 秒 AI 無料見積もり、国際認証体系。"),
],
"src/data/category-conversion-blocks.ts": [
    ("，燙金工藝 100 本起。", "，燙金可選。"),  # ×2 (1406 + 1509)
    ("300 本起上印刷機批量更經濟", "大批量上印刷機更經濟"),  # ×2 (1406 + 1509)
    ("\"stat\": \"1000本起\"", "\"stat\": \"1本起\""),
    ("\"1 本起（燙金 100 本起）\"", "\"1 本起（燙金可選）\""),
    ("視乎款式同數量：掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張；\"",  # L1398 短版 (收尾引号锚定, 避免误伤 L1507 前缀)
     "視乎款式同數量：掛曆 / 檯曆 / 年曆卡一律 HK$3-8/本起（按尺寸與工藝浮動）。\""),
    ("視乎款式同數量：掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張；500 本柯式企業月曆 HK$10-15/本，燙金另加 HK$0.5-1.5/本（100 本起）。2027 早鳥 9 折連免費設計，實價以 WhatsApp 報價為準。",  # L1507 長版
     "視乎款式同數量：掛曆 / 檯曆 / 年曆卡一律 HK$3-8/本起（按尺寸與工藝浮動），1 本起訂，大批量上印刷機更抵，燙金另計。2027 年曆早鳥預訂連免費設計，實價以 WhatsApp 報價為準。"),
    ("想趕 Q4 交貨建議 9 月中前落單鎖定檔期", "想趕 Q4 交貨建議 10 月底前確認鎖定檔期"),
    ("9 月中前落單，早鳥 9 折仲連免費設計", "10 月底前確認，早鳥預訂連免費設計"),
    ("2027 早鳥 9 折窗口內落單鎖價", "2027 早鳥預訂窗口內落單鎖價"),
    ("早鳥 9 折同免費設計點樣申請", "早鳥預訂同免費設計點樣申請"),
    ("(1) 數量上 500 本轉柯式印刷，企業月曆可做到 HK$10-15/本；(2) 揀檯曆或者月曆卡，單價低過掛曆；(3) 2027 早鳥期落單享 9 折兼免費設計。",
     "(1) 數量上大批量轉柯式印刷；(2) 揀檯曆或者月曆卡，單價低過掛曆；(3) 2027 早鳥期預訂兼免費設計。"),
],
"src/components/category/CategoryIndustries.tsx": [
    ("'100 本起 · 座檯/掛牆可選'", "'1 本起 · 座檯/掛牆可選'"),
    ("'From 100 · desk or wall mount'", "'From 1 · desk or wall mount'"),
    ("'100部から・卓上/壁掛け選択可'", "'1部から・卓上/壁掛け選択可'"),
],
}

# (file, old, expected_count)
COUNTS = [
    ("src/lib/seo.ts", "Calendar Printing 2027 from $5", 1),
    ("src/lib/seo.ts", "HK$10 起/本", 1),
    ("src/lib/seo.ts", "bulk offset from 300", 1),
    ("src/lib/seo.ts", "300 部からオフセット", 1),
    ("src/data/category-conversion-blocks.ts", "燙金工藝 100 本起", 2),
    ("src/data/category-conversion-blocks.ts", "300 本起上印刷機批量更經濟", 2),
    ("src/data/category-conversion-blocks.ts", "1000本起", 1),
    ("src/data/category-conversion-blocks.ts", "燙金 100 本起", 1),
    ("src/data/category-conversion-blocks.ts", "掛曆 HK$18/本", 2),
    ("src/data/category-conversion-blocks.ts", "HK$3/張；\"", 1),
    ("src/data/category-conversion-blocks.ts", "9 月中前落單", 2),
    ("src/components/category/CategoryIndustries.tsx", "100 本起 · 座檯/掛牆可選", 1),
    ("src/components/category/CategoryIndustries.tsx", "From 100 · desk or wall mount", 1),
    ("src/components/category/CategoryIndustries.tsx", "100部から・卓上/壁掛け選択可", 1),
]

def read(p):
    with io.open(p, "r", encoding="utf-8", newline="") as fh:
        return fh.read()

def main():
    texts = {rel: read(os.path.join(REPO, rel)) for rel in FILES}
    # ① 计数断言
    for rel, old, n in COUNTS:
        c = texts[rel].count(old)
        if c != n:
            print(f"[l23] FAIL 计数: {rel} {old[:40]!r} x{c} (期望 {n})"); return 2
    # ② 备份 + 替换
    for rel, pairs in FILES.items():
        p = os.path.join(REPO, rel)
        shutil.copy2(p, os.path.join(BAK, os.path.basename(p) + ".before"))
        t = texts[rel]
        for old, new in pairs:
            t = t.replace(old, new)
        texts[rel] = t
    # ③ 形状断言
    checks = [
        ("src/lib/seo.ts", "HK$3-8/本", 1), ("src/lib/seo.ts", "from $0.40", 1),
        ("src/lib/seo.ts", "HK$10 起/本", 0),
        ("src/lib/seo.ts", "ISO 9001 認証", 3),  # 余 3 处 (stickers/flyers/paper-bags ja) 属其他类目既有实例, credibility 全掃归 docket
        ("src/data/category-conversion-blocks.ts", "燙金工藝 100", 0),
        ("src/data/category-conversion-blocks.ts", "掛曆 HK$18/本", 0),
        ("src/data/category-conversion-blocks.ts", "檯曆 HK$9/本", 0),
        ("src/data/category-conversion-blocks.ts", "一律 HK$3-8/本起", 2),
        ("src/data/category-conversion-blocks.ts", "9 折", 0),
        ("src/data/category-conversion-blocks.ts", "HK$10-15", 0),
        ("src/data/category-conversion-blocks.ts", "1 本起訂（數碼印刷），大批量上印刷機更經濟，燙金可選。", 2),
        ("src/components/category/CategoryIndustries.tsx", "1 本起 · 座檯/掛牆可選", 1),
        ("src/components/category/CategoryIndustries.tsx", "From 1 · desk or wall mount", 1),
        ("src/components/category/CategoryIndustries.tsx", "1部から・卓上/壁掛け選択可", 1),
        ("src/components/category/CategoryIndustries.tsx", "100 本起 · 座檯", 0),
    ]
    for rel, s, n in checks:
        c = texts[rel].count(s)
        if c != n:
            print(f"[l23] FAIL 形状: {rel} {s[:40]!r} x{c} (期望 {n})"); return 3
    # ④ 写盘
    for rel, t in texts.items():
        with io.open(os.path.join(REPO, rel), "w", encoding="utf-8", newline="") as fh:
            fh.write(t)
    total = sum(len(v) for v in FILES.values())
    print(f"[l23] PASS: {len(FILES)} 文件 {total} 处替换 / 形状断言全过 / 备份 {os.path.relpath(BAK, REPO)}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
