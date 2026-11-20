# -*- coding: utf-8 -*-
"""
.hermes/_calprice_fix2_20261016.py — 日历价格内战综合修正 v2 (三语 19 行)
裁定原则 (K3 2026-10-16 战略方案 3.2 + §0.23 SSoT): SKU 真值 > hub 快照
真值: products.ts wall/desk/custom/mini-calendars minQuantity=1 / basePrice=3 (HK$3-8/本) / basePrice_en=0.40
附带清除: 内部黑话「軍令狀/軍令状」(§0.23.1 族) + 无据折扣数字 (9 折 / 10% off / 9 割引) + 过期死线 (R5 9/15)
§12 三件套: 计数断言 + 形状断言 (块级) + 备份; 断言未过不得写盘
"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(REPO, "src", "data", "category-seo-content.ts")
BAK_DIR = os.path.join(REPO, ".hermes", "_bak-calprice-20261016")

PAIRS = [
    # zh L1652 featuredSnippet
    ("featuredSnippet: '月曆印刷 9-11 月旺季軍令狀 | 100 本起 HK$28 起 | 24h 出貨 順豐本地 | 智印港. 掛曆 HK$18 / 檯曆 HK$9 / 年曆卡 HK$3, 2027 早鳥 9 折 + 免費設計 + 燙金, 企業禮品旺季採購 8-10 月落單 → 9-12 月交貨.',",
     "featuredSnippet: '月曆印刷 9-11 月旺季供應 | 1 本起 HK$3-8/本 | 順豐本地配送 | 智印港. 掛曆 / 檯曆 / 年曆卡 HK$3-8/本, 2027 年曆早鳥預訂 + 免費設計 + 燙金, 企業禮品旺季採購 8-10 月落單 → 9-12 月交貨.',"),
    # zh L1654 h2
    ("— 座枱曆/掛牆曆/年曆卡 100 本起訂, R5 9/15 硬截止前企業禮品旺季採購'",
     "— 座枱曆/掛牆曆/年曆卡 1 本起訂, 企業禮品旺季採購 8-10 月落單'"),
    # zh L1755 FAQ
    ("= 9 月全面轉 2027 = 早鳥 9 折窗口.",
     "= 9 月全面轉 2027 = 2027 年曆早鳥預訂窗口."),
    # zh L1758 FAQ price
    ("a: '掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張。100 本起訂製, 500 本柯式更平。2027 年曆 9 月早鳥可享 9 折 + 免費設計。'",
     "a: '掛曆 / 檯曆 / 年曆卡 HK$3-8/本（按尺寸、紙張與工藝浮動），1 本起訂，500 本柯式更平。2027 年曆早鳥預訂 + 免費設計。'"),
    # zh L1759 FAQ foil
    ("另加 HK$0.5-1.5/本, 起印量 100 本, 2-3 天加急。",
     "另加 HK$0.5-1.5/本, 2-3 天加急。"),
    # zh L1761 FAQ
    ("8 月底前落單享 9 折早鳥 + 免費設計",
     "8-9 月落單鎖定旺季檔期 + 免費設計"),
    # zh L1762 FAQ price + discount
    ("500 本柯式月曆 HK$10-15/本 (視乎尺寸/紙張/工藝), 加燙金 LOGO +$3-5/本, 雙面四色 + 封面咭紙.",
     "500 本柯式月曆按 HK$3-8/本帶內報價 (視乎尺寸/紙張/工藝), 加燙金 LOGO 按工藝另計, 雙面四色 + 封面咭紙."),
    ("(2) 8-9 月落單享早鳥 9 折",
     "(2) 8-9 月落單鎖定產能與紙價"),
    # zh L1763 FAQ stale deadline
    ("提前 9/15 前落單享 3 重優勢",
     "旺季前 2-3 個月落單享 3 重優勢"),
    # zh L1764 FAQ trend
    ("趨勢 3 數碼印刷小批量 (50-100 本試印, 啟動成本 HK$500-1,500).",
     "趨勢 3 數碼印刷小批量 (1 本起印, 50-100 本試印友好)."),
    ("8/26 起 2027 早鳥 9 折, 把握 Q4 旺季採購",
     "2027 年曆早鳥預訂已開放, 把握 Q4 旺季採購"),
    # zh L1765 FAQ one-stop
    ("q: '月曆 100 本起訂 + 9/15 硬截止前落單: 一條龍流程點走?'",
     "q: '月曆 1 本起訂 + 旺季檔期落單: 一條龍流程點走?'"),
    ("(6) 9/15 前落單享 9 折早鳥",
     "(6) 早鳥預訂鎖定產能與紙價"),
    # en L1769 featuredSnippet
    ("featuredSnippet: 'Calendar printing 9-11 month peak season | 100 copies from US$3.60/pc | 24h global delivery | ZprintPro Asia factory. Wall / desk / card 8 sizes, custom foil + free design, 2027 pre-order 10% off. DHL 2-4 day global, factory-direct.',",
     "featuredSnippet: 'Calendar printing 9-11 month peak season | From 1 pc at US$0.40/pc | ZprintPro Asia factory. Wall / desk / card calendars, custom foil + free design, 2027 pre-order open. DHL 2-4 day global, factory-direct.',"),
    # en L1771 h2
    ("— Desk/Wall/Card From 100 pcs, Corporate Gifting Sep 9-11 Peak Season'",
     "— Desk/Wall/Card From 1 pc, Corporate Gifting Aug-Oct Peak Season'"),
    # en L1786 coreAdvantages
    ("'50 pcs minimum (digital printing) — ideal for SMEs and startups creating holiday gifts.'",
     "'From 1 pc (digital printing) — ideal for SMEs and startups creating holiday gifts.'"),
    # en L1855 FAQ
    ("a: '50 pcs (digital printing). 500+ pcs recommended for offset printing.'",
     "a: 'From 1 pc (digital printing). 500+ pcs recommended for offset printing.'"),
    # en L1866 FAQ timing
    ("— early-bird 10% discount window opens.",
     "— 2027 pre-order window opens."),
    # ja L1871 featuredSnippet
    ("featuredSnippet: 'カレンダー印刷 9-11月繁忙期軍令状 | 100冊から HK$28／冊 | 24h出荷 工場直送 | ZprintPro. 卓上 HK$9 / 壁掛け HK$18 / カード HK$3, 2027 早期予約 9 割引 + 無料デザイン + 箔押し, 企業ギフト繁忙期 8-10 月注文 → 9-12 月納品.',",
     "featuredSnippet: 'カレンダー印刷 9-11月繁忙期 | 1冊から HK$3-8／冊 | 工場直送 | ZprintPro. 卓上 / 壁掛け / カード HK$3-8／冊, 2027 早期予約 + 無料デザイン + 箔押し, 企業ギフト繁忙期 8-10 月注文 → 9-12 月納品.',"),
    # ja L1873 h2
    ("— 卓上/壁掛け/カード 100冊から, 企業ギフト 9-11月繁忙期前夜'",
     "— 卓上/壁掛け/カード 1冊から, 企業ギフト 9-11月繁忙期前夜'"),
    # ja L1966 FAQ timing
    ("アーリーバード 10% 割引期間開始",
     "2027 年カレンダー早期予約受付開始"),
]

BLOCK_START, BLOCK_END = 1649, 1970  # 0-based slice of calendars section

def main():
    with io.open(TARGET, "r", encoding="utf-8", newline="") as fh:
        text = fh.read()

    # ⓪ en techSpecs 双行锚定 (L2424 educational 有同文案, 不能误伤)
    sizes_old = "value: 'Desk: 150×180mm, 200×230mm; Wall: A3(297×420mm), A2(420×594mm); Card: 100×150mm. Fully customizable.' },"
    mo_old = "{ label: 'Minimum Order', value: '50 pcs (digital printing). 500+ recommended for offset (more economical).'"
    mo_new = "{ label: 'Minimum Order', value: 'From 1 pc (digital printing). 500+ pcs recommended for offset (more economical).'"
    i = text.find(sizes_old)
    if i < 0:
        print("[calprice2] FAIL: calendars Standard Sizes 行未找到 -> 不写盘")
        return 2
    j = text.find(mo_old, i)
    if j < 0 or j - i > 400:
        print("[calprice2] FAIL: Minimum Order 行未紧跟其后 -> 不写盘")
        return 2
    between = text[i + len(sizes_old):j]
    anchor_old = sizes_old + between + mo_old
    anchor_new = sizes_old + between + mo_new
    if text.count(anchor_old) != 1:
        print("[calprice2] FAIL: 双行锚定非唯一 -> 不写盘")
        return 2

    # ① 计数断言
    for idx, (old, _new) in enumerate(PAIRS):
        c = text.count(old)
        if c != 1:
            print(f"[calprice2] FAIL 计数断言 #{idx}: 命中 {c} 次 (期望 1) -> 不写盘")
            print(f"  old[:60]={old[:60]!r}")
            return 2

    # ② 备份
    os.makedirs(BAK_DIR, exist_ok=True)
    bak = os.path.join(BAK_DIR, "category-seo-content.ts")
    if not os.path.exists(bak):
        shutil.copy2(TARGET, bak)

    new_text = text.replace(anchor_old, anchor_new)
    for old, new in PAIRS:
        new_text = new_text.replace(old, new)

    # ③ 形状断言 (仅 calendars 块内)
    old_lines = text.split("\n")
    new_lines = new_text.split("\n")
    if len(old_lines) != len(new_lines):
        print("[calprice2] FAIL 行数漂移 -> 不写盘")
        return 3
    must_absent = ["軍令狀", "軍令状", "HK$28", "US$3.60", "From 100 pcs", "100 本起 HK$28",
                   "掛曆 HK$18", "檯曆 HK$9", "HK$10-15", "早鳥 9 折", "9 折早鳥", "9 割引",
                   "10% off", "10% discount", "10% 割引", "起印量 100 本", "100 本起訂",
                   "100冊から", "50 pcs minimum", "50 pcs (digital", "R5 9/15", "9/15 硬截止",
                   "啟動成本 HK$500"]
    must_present = ["旺季供應", "1 本起 HK$3-8/本", "HK$3-8／冊", "From 1 pc", "US$0.40/pc",
                    "1 本起訂", "1冊から", "繁忙期 |"]
    # 只扫客户可见文本, 豁免代码注释行 (历史注释保留不改写)
    visible = [ln for ln in new_lines[BLOCK_START:BLOCK_END] if not ln.lstrip().startswith('//')]
    blk = "\n".join(visible)
    for s in must_absent:
        if s in blk:
            print(f"[calprice2] FAIL 形状断言: calendars 块内违禁串仍在 -> {s!r} -> 不写盘")
            return 3
    for s in must_present:
        if s not in blk:
            print(f"[calprice2] FAIL 形状断言: calendars 块内缺少新串 -> {s!r} -> 不写盘")
            return 3

    # ④ 变更行数断言: 恰 19 行 (L1765 一行含两处替换)
    changed = [k + 1 for k, (a, b) in enumerate(zip(old_lines, new_lines)) if a != b]
    if len(changed) != 19:
        print(f"[calprice2] FAIL 变更行数 {len(changed)} (期望 19): {changed} -> 不写盘")
        return 3

    # ⑤ 写盘
    with io.open(TARGET, "w", encoding="utf-8", newline="") as fh:
        fh.write(new_text)

    print(f"[calprice2] PASS: 1 锚定 + {len(PAIRS)} 串替换 / {len(changed)} 行变更 / 块级形状断言全过")
    print("changed lines:", changed)
    return 0

if __name__ == "__main__":
    sys.exit(main())
