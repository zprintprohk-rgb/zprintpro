# -*- coding: utf-8 -*-
"""Order 28b fixer: stickers 8 slugs 同类清毒 (cert/FDA/SGS/scn) + boxes 28a 收尾 (non-body FDA).
Per-slug segment application with per-pair count assertions. Double-method counts before/after."""
import io, re, sys

PATH = r"src\data\sku-seo-data.ts"
raw = io.open(PATH, encoding="utf-8", newline="").read()
crlf = raw.count("\r\n")
print("CRLF count:", crlf)

def seg_str(s, start):
    brace = s.find('{', start)
    depth = 0; p = brace; ins = False; esc = False
    while p < len(s):
        c = s[p]
        if ins:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': ins = False
        else:
            if c == '"': ins = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: return s[start:p+1]
        p += 1
    return s[start:]

# complete slug list: slug-like keys at any indent whose brace segment contains '"seo": {'
slug_re = re.compile(r'\n\s*"([a-z0-9][a-z0-9-]*)": \{')
reserved = {"name","seo","faqs","imageAlt","zh-hk","en","ja","title","description","h1","keywords","body","q","a","id"}
slugs = []
for m in slug_re.finditer(raw):
    key = m.group(1)
    if key in reserved: continue
    seg = seg_str(raw, m.start())
    if '"seo": {' in seg and key not in slugs:
        slugs.append(key)
print("complete slugs:", len(slugs))

def counts(seg):
    return (len(re.findall(r'国際認証体系', seg)), len(re.findall(r'FDA', seg)),
            len(re.findall(r'推廣單張、活動入口的指示牌', seg)), len(re.findall(r'SGS', seg)))

def whole_counts():
    return (len(re.findall(r'国際認証体系', raw)), len(re.findall(r'FDA', raw)),
            len(re.findall(r'推廣單張、活動入口的指示牌', raw)), len(re.findall(r'SGS', raw)))

# method-2 before: sum per-slug
m2_before = tuple(sum(counts(seg_str(raw, raw.find('"%s": {' % s)))[i] for s in slugs) for i in range(4))
m1_before = whole_counts()
print("M1 whole-file before:", m1_before)
print("M2 per-slug sum before:", m2_before)
assert m1_before == m2_before, "DOUBLE METHOD MISMATCH — stop"

# ---- pairs: (old, new, expected_count_in_slug) ----
PAIRS = {
 "waterproof-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("internationally certified production, FDA-compliant adhesive for indirect food contact, SGS migration tested, over a decade of print experience.", "Over a decade of print experience.", 1),
   ("国際認証体系の工場、FDA認可接着剤（間接食品接触対応）、SGS移行テスト済み、15年以上の印刷実績。", "15年以上の印刷実績。", 1),
 ],
 "transparent-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("internationally certified production, FDA-compliant adhesive for indirect food contact, SGS migration tested, over a decade of print experience.", "Over a decade of print experience.", 1),
   ("国際認証体系の工場、FDA認可接着剤（間接食品接触対応）、SGS移行テスト済み、15年以上の印刷実績。", "15年以上の印刷実績。", 1),
 ],
 "removable-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("食品標籤及 FDA 包裝、", "食品標籤及食品包裝、", 1),
   ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，", "無論是本地品牌還是跨境電商，", 1),
   ("都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。", "都能提供快速、靈活、符合成本預期的印刷方案。", 1),
   ("三種材質均通過 FDA 認可膠水（適用於間接食品接觸） 及 SGS 遷移測試 認證。", "三種材質均採用食品級膠水，適用於間接食品接觸包裝。", 1),
   ("to the lower 48 states. internationally certified production with full FDA compliance where applicable.", "to the lower 48 states.", 1),
   ("pet food labels and FDA-compliant packaging", "pet food labels and food-safe packaging", 1),
   ("All three are FDA-compliant adhesive (safe for indirect food contact) and SGS migration tested, so you can ship into the US market without compliance friction.", "All three use food-grade adhesive suitable for indirect food-contact packaging.", 1),
   ("FDA 認可接着剤（間接食品接触対応）、SGS 移行テスト済み。沖縄県・北海道も追加料金なし。国際認証体系の工場、DHL 国際配送で 2-4 日納品、長年の印刷実績。", "沖縄県・北海道も追加料金なし。DHL 国際配送で 2-4 日納品、長年の印刷実績。", 1),
   ("食品ラベル・FDA 準拠パッケージ、", "食品ラベル・食品パッケージ、", 1),
   ("すべて FDA 認可接着剤（間接食品接触対応） および SGS 移行テスト済み 認証取得。", "すべて食品グレード接着剤を使用し、間接食品接触パッケージに対応。", 1),
 ],
 "small-batch-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("食品標籤及 FDA 包裝、", "食品標籤及食品包裝、", 1),
   ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，", "無論是本地品牌還是跨境電商，", 1),
   ("都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。", "都能提供快速、靈活、符合成本預期的印刷方案。", 1),
   ("三種材質均通過 FDA 認可膠水（適用於間接食品接觸） 及 SGS 遷移測試 認證。", "三種材質均採用食品級膠水，適用於間接食品接觸包裝。", 1),
   ("to the lower 48 states. internationally certified production with full FDA compliance where applicable.", "to the lower 48 states.", 1),
   ("pet food labels and FDA-compliant packaging", "pet food labels and food-safe packaging", 1),
   ("All three are FDA-compliant adhesive (safe for indirect food contact) and SGS migration tested, so you can ship into the US market without compliance friction.", "All three use food-grade adhesive suitable for indirect food-contact packaging.", 1),
   ("FDA 認可接着剤（間接食品接触対応）、SGS 移行テスト済み。沖縄県・北海道も追加料金なし。国際認証体系の工場、DHL 国際配送で 2-4 日納品、長年の印刷実績。", "沖縄県・北海道も追加料金なし。DHL 国際配送で 2-4 日納品、長年の印刷実績。", 1),
   ("食品ラベル・FDA 準拠パッケージ、", "食品ラベル・食品パッケージ、", 1),
   ("すべて FDA 認可接着剤（間接食品接触対応） および SGS 移行テスト済み 認証取得。", "すべて食品グレード接着剤を使用し、間接食品接触パッケージに対応。", 1),
 ],
 "die-cut-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("食品標籤及 FDA 包裝、", "食品標籤及食品包裝、", 1),
   ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，", "無論是本地品牌還是跨境電商，", 1),
   ("都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。", "都能提供快速、靈活、符合成本預期的印刷方案。", 1),
   ("三種材質均通過 FDA 認可膠水（適用於間接食品接觸） 及 SGS 遷移測試 認證。", "三種材質均採用食品級膠水，適用於間接食品接觸包裝。", 1),
   ("to the lower 48 states. internationally certified production with full FDA compliance where applicable.", "to the lower 48 states.", 1),
   ("pet food labels and FDA-compliant packaging", "pet food labels and food-safe packaging", 1),
   ("All three are FDA-compliant adhesive (safe for indirect food contact) and SGS migration tested, so you can ship into the US market without compliance friction.", "All three use food-grade adhesive suitable for indirect food-contact packaging.", 1),
   ("FDA 認可接着剤（間接食品接触対応）、SGS 移行テスト済み。沖縄県・北海道も追加料金なし。国際認証体系の工場、DHL 国際配送で 2-4 日納品、長年の印刷実績。", "沖縄県・北海道も追加料金なし。DHL 国際配送で 2-4 日納品、長年の印刷実績。", 1),
   ("食品ラベル・FDA 準拠パッケージ、", "食品ラベル・食品パッケージ、", 1),
   ("すべて FDA 認可接着剤（間接食品接触対応） および SGS 移行テスト済み 認証取得。", "すべて食品グレード接着剤を使用し、間接食品接触パッケージに対応。", 1),
 ],
 "foil-stickers": [
   ("国際認証体系工廠，多年印刷經驗。", "多年印刷經驗。", 1),
   ("国際認証体系の工場、15年以上の印刷実績。", "15年以上の印刷実績。", 1),
 ],
 "security-stickers": [
   ("国際認証体系工廠，多年印刷經驗。", "多年印刷經驗。", 1),
   ("国際認証体系の工場、15年以上の印刷実績。", "15年以上の印刷実績。", 1),
 ],
 "fruit-food-label-stickers": [
   ("国際認証体系工廠，FDA 認可膠水（適用於間接食品接觸），SGS 遷移測試，多年印刷經驗。", "多年印刷經驗。", 1),
   ("食品標籤及 FDA 包裝、", "食品標籤及食品包裝、", 1),
   ("無論您需要小店餐廳的推廣單張、活動入口的指示牌，還是跨境零售品牌的精品包裝，", "無論是本地品牌還是跨境電商，", 1),
   ("都能為香港本地品牌提供快速、靈活、符合成本預期的印刷方案。", "都能提供快速、靈活、符合成本預期的印刷方案。", 1),
   ("三種材質均通過 FDA 認可膠水（適用於間接食品接觸） 及 SGS 遷移測試 認證。", "三種材質均採用食品級膠水，適用於間接食品接觸包裝。", 1),
   ("採用防水 PVC 或 PP 合成紙, 通過 SGS 食品接觸安全認證, 適合", "採用防水 PVC 或 PP 合成紙, 適合", 1),
   ("水果及食品標籤印刷 | 防水防油 SGS 食品接觸安全", "水果及食品標籤印刷 | 防水防油 食品接觸安全", 1),
   ("Fruit & Food Label Stickers on FDA-compliant, waterproof and oil-resistant stock", "Fruit & Food Label Stickers on food-safe, waterproof and oil-resistant stock", 1),
   ("Fruit & Food Label Stickers | FDA-Compliant Stock | ZprintPro", "Fruit & Food Label Stickers | Food-Safe Stock | ZprintPro", 1),
   ("食品FDA認証素材採用で果物・食品ブランドに最適", "食品グレード素材採用で果物・食品ブランドに最適", 1),
   ("防水防油 FDA 食品級材質，冷", "防水防油 食品級材質，冷", 1),
   ("waterproof oil-proof FDA", "waterproof oil-proof food-safe", 1),
   ("防水・耐油・FDA食品グレード、冷蔵対応", "防水・耐油・食品グレード、冷蔵対応", 1),
   ("to the lower 48 states. internationally certified production with full FDA compliance where applicable.", "to the lower 48 states.", 1),
   ("pet food labels and FDA-compliant packaging", "pet food labels and food-safe packaging", 1),
   ("All three are FDA-compliant adhesive (safe for indirect food contact) and SGS migration tested, so you can ship into the US market without compliance friction.", "All three use food-grade adhesive suitable for indirect food-contact packaging.", 1),
   ("FDA 認可接着剤（間接食品接触対応）、SGS 移行テスト済み。沖縄県・北海道も追加料金なし。国際認証体系の工場、DHL 国際配送で 2-4 日納品、長年の印刷実績。", "沖縄県・北海道も追加料金なし。DHL 国際配送で 2-4 日納品、長年の印刷実績。", 1),
   ("食品ラベル・FDA 準拠パッケージ、", "食品ラベル・食品パッケージ、", 1),
   ("すべて FDA 認可接着剤（間接食品接触対応） および SGS 移行テスト済み 認証取得。", "すべて食品グレード接着剤を使用し、間接食品接触パッケージに対応。", 1),
 ],
 "cosmetic-boxes": [
   ("化妝品包裝盒 4 種盒型 100 個起印 FDA 級安全 燙金 UV", "化妝品包裝盒 4 種盒型 100 個起印 燙金 UV", 1),
   ("化粧品パッケージボックス 4 種類 100 個〜 FDA対応 箔押し UV", "化粧品パッケージボックス 4 種類 100 個〜 箔押し UV", 1),
 ],
 "food-boxes": [
   ("防油食品級紙卡（FDA 標準紙可選）", "防油食品級紙卡（食品級紙可選）", 1),
   ("紙質食品包裝印刷訂製｜食品紙盒・食品紙袋・防油紙卡｜FDA 食品級", "紙質食品包裝印刷訂製｜食品紙盒・食品紙袋・防油紙卡｜食品級", 1),
   ("food-grade board (FDA-standard optional)", "food-grade board (food-safe optional)", 1),
   ("食品グレード紙（FDA基準紙は選択可）・クラフト紙対応", "食品グレード紙・クラフト紙対応", 1),
   ("食品パッケージ箱 100個〜：FDA食品グレード・防油内層・PET窓対応", "食品パッケージ箱 100個〜：食品グレード・防油内層・PET窓対応", 1),
   ("食品包裝盒印刷 / FDA食品級 / 防油", "食品包裝盒印刷 / 食品級 / 防油", 1),
   ("Food Box Printing / FDA Food-Grade / Greaseproof", "Food Box Printing / Food-Grade / Greaseproof", 1),
   ("食品パッケージ箱印刷 / FDA食品グレード / 防油", "食品パッケージ箱印刷 / 食品グレード / 防油", 1),
 ],
}

# ---- apply per slug ----
new_raw = raw
for slug, pairs in PAIRS.items():
    i = new_raw.find('"%s": {' % slug)
    assert i != -1, "slug %s not found" % slug
    seg = seg_str(new_raw, i)
    seg_new = seg
    for old, new, exp in pairs:
        n = seg_new.count(old)
        assert n == exp, "pair mismatch in %s: '%s...' count=%d exp=%d" % (slug, old[:30], n, exp)
        seg_new = seg_new.replace(old, new)
    new_raw = new_raw[:i] + seg_new + new_raw[i+len(seg):]
    print("OK %s applied %d pairs" % (slug, len(PAIRS[slug])))

io.open(PATH, "w", encoding="utf-8", newline="\n").write(new_raw)
print("written")

# ---- verify ----
raw2 = io.open(PATH, encoding="utf-8", newline="").read()
m1_after = (len(re.findall(r'国際認証体系', raw2)), len(re.findall(r'FDA', raw2)),
            len(re.findall(r'推廣單張、活動入口的指示牌', raw2)), len(re.findall(r'SGS', raw2)))
print("M1 whole-file after:", m1_after)
per = {}
for s in list(PAIRS.keys()):
    seg = seg_str(raw2, raw2.find('"%s": {' % s))
    per[s] = counts(seg)
print("per-slug after (cert,fda,scn,sgs):")
for s, c in per.items():
    print("  %-28s %s" % (s, c))
stickers = ["waterproof-stickers","transparent-stickers","removable-stickers","small-batch-stickers","die-cut-stickers","foil-stickers","security-stickers","fruit-food-label-stickers"]
assert all(per[s] == (0,0,0,0) for s in stickers), "STICKER RESIDUE LEFT"
assert per["cosmetic-boxes"] == (0,0,0,0) and per["food-boxes"] == (0,0,0,0), "BOXES RESIDUE LEFT"
print("VERIFY-OK")
