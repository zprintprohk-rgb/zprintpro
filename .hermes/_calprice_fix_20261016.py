# -*- coding: utf-8 -*-
"""
.hermes/_calprice_fix_20261016.py — 日历价格内战修正 (hub 快照 → SKU 真值)
K3 指令链: 2026-10-16 首席 SEO/AEO/GEO 战略方案 3.2 (裁定原则: SKU 真值 > hub 快照)
真值依据: products.ts wall/desk/custom/mini-calendars 四 SKU 统一 minQuantity=1 / basePrice=3 / price_range 'HK$3-8/本'
附带: 清除客户可见层内部黑话「軍令狀/軍令状」(§0.23.1 同族) + 无据「24h 出貨」(products.ts 无 turnaround 支撑) + 无据「9 折/9 割引」数字
§12 三件套: 计数断言 + 形状断言 + 备份 (断言未过不得写盘)
"""
import io, os, shutil, sys, time

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(REPO, "src", "data", "category-seo-content.ts")
BAK_DIR = os.path.join(REPO, ".hermes", "_bak-calprice-20261016")

OLD_ZH = "    featuredSnippet: '月曆印刷 9-11 月旺季軍令狀 | 100 本起 HK$28 起 | 24h 出貨 順豐本地 | 智印港. 掛曆 HK$18 / 檯曆 HK$9 / 年曆卡 HK$3, 2027 早鳥 9 折 + 免費設計 + 燙金, 企業禮品旺季採購 8-10 月落單 → 9-12 月交貨.',"
NEW_ZH = "    featuredSnippet: '月曆印刷 9-11 月旺季供應 | 1 本起 HK$3-8/本 | 順豐本地配送 | 智印港. 掛曆 / 檯曆 / 年曆卡 HK$3-8/本, 2027 年曆早鳥預訂 + 免費設計 + 燙金, 企業禮品旺季採購 8-10 月落單 → 9-12 月交貨.',"
OLD_JA = "    featuredSnippet: 'カレンダー印刷 9-11月繁忙期軍令状 | 100冊から HK$28／冊 | 24h出荷 工場直送 | ZprintPro. 卓上 HK$9 / 壁掛け HK$18 / カード HK$3, 2027 早期予約 9 割引 + 無料デザイン + 箔押し, 企業ギフト繁忙期 8-10 月注文 → 9-12 月納品.',"
NEW_JA = "    featuredSnippet: 'カレンダー印刷 9-11月繁忙期 | 1冊から HK$3-8／冊 | 工場直送 | ZprintPro. 卓上 / 壁掛け / カード HK$3-8／冊, 2027 早期予約 + 無料デザイン + 箔押し, 企業ギフト繁忙期 8-10 月注文 → 9-12 月納品.',"

def main():
    with io.open(TARGET, "r", encoding="utf-8", newline="") as fh:
        text = fh.read()

    # ① 计数断言: 每个旧串必须恰好出现 1 次
    for name, old in (("OLD_ZH", OLD_ZH), ("OLD_JA", OLD_JA)):
        c = text.count(old)
        if c != 1:
            print(f"[calprice] FAIL 计数断言: {name} 命中 {c} 次 (期望 1) -> 不写盘")
            return 2

    # ② 备份
    os.makedirs(BAK_DIR, exist_ok=True)
    bak = os.path.join(BAK_DIR, "category-seo-content.ts")
    shutil.copy2(TARGET, bak)

    new_text = text.replace(OLD_ZH, NEW_ZH).replace(OLD_JA, NEW_JA)

    # ③ 形状断言 (写盘前)
    must_absent = ["旺季軍令狀", "繁忙期軍令状", "100 本起 HK$28", "HK$28／冊",
                   "掛曆 HK$18", "檯曆 HK$9", "24h出荷", "9 割引", "早鳥 9 折"]
    must_present = ["旺季供應", "1 本起 HK$3-8/本", "1冊から HK$3-8／冊", "繁忙期 |"]
    for s in must_absent:
        if s in new_text:
            print(f"[calprice] FAIL 形状断言: 违禁串仍在 -> {s!r} -> 不写盘")
            return 3
    for s in must_present:
        if s not in new_text:
            print(f"[calprice] FAIL 形状断言: 缺少新串 -> {s!r} -> 不写盘")
            return 3

    # ④ 变更行数断言: 恰 2 行不同
    old_lines = text.split("\n")
    new_lines = new_text.split("\n")
    if len(old_lines) != len(new_lines):
        print("[calprice] FAIL 行数漂移 -> 不写盘")
        return 3
    changed = sum(1 for a, b in zip(old_lines, new_lines) if a != b)
    if changed != 2:
        print(f"[calprice] FAIL 变更行数 {changed} (期望 2) -> 不写盘")
        return 3

    # ⑤ 写盘 (UTF-8 无 BOM, 保持原换行)
    with io.open(TARGET, "w", encoding="utf-8", newline="") as fh:
        fh.write(new_text)

    print(f"[calprice] PASS: 2 行替换 + 形状断言全过 + 备份 {os.path.relpath(bak, REPO)}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
