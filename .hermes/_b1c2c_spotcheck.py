# -*- coding: utf-8 -*-
"""Post-write spot checks: verify new content in ts (3 SKUs) + faqSchema lines."""
import io, json

ts = io.open(r"F:\zprintpro-nextjs\src\data\sku-seo-data.ts", encoding="utf-8", newline="").read()
prod = io.open(r"F:\zprintpro-nextjs\src\data\products.ts", encoding="utf-8", newline="").read()

checks = [
    ("cartoon zh tail has FAQ+links", "卡通利是封可以用自己畫的插畫嗎" in ts and "zh-hk/product/custom-red-packets/" in ts),
    ("eco zh tail has FSC FAQ", "種子紙利是封真係種到出植物" in ts),
    ("large zh tail has size FAQ", "大號利是封實際有幾大" in ts),
    ("cartoon ja FAQ product-ized", "キャラクターポチ袋の最小注文数は" in ts),
    ("eco ja FAQ product-ized", "本物の植物が育つのは種子紙だけ" in ts),
    ("large ja FAQ product-ized", "通常サイズよりどれくらい大きい" in ts),
    ("MOQ-10 contradiction gone (cartoon/eco/large/embossed)", "即日少量の急ぎは10枚から" not in ts and "少量の即日対応は10枚から" not in ts),
    ("rush 24-48 claim gone from family", "24〜48時間以内" not in ts),
    ("turnaround 3-5 gone from family (zh)", "個工作天完成，港九新界免費送貨上門" not in ts or "3-5 個工作天完成，港九新界" not in ts),
    ("ja body turnaround aligned", "標準納期は3〜5営業日" not in ts),
    ("eco new title in ts", "環保利是封印刷 | FSC再生紙 | 100個起 HK$1.90起 | 智印港" in ts),
    ("large new en title in ts", "Large Red Packets | 110x200mm 100 MOQ $0.92 | ZprintPro" in ts),
    ("eco new en title in ts", "Eco Red Packets | FSC Paper 100 MOQ $0.74 | ZprintPro" in ts),
    ("no 'from ZprintPro the US' in red-packets block", "from ZprintPro the US" not in ts),
    ("old template desc gone (157g 紅金紙)", "157g 紅金紙" not in ts),
    ("old ja template desc gone (XのX)", "のエコ年賀状" not in ts and "大型年賀状の大型年賀状" not in ts and "イラスト年賀状のイラスト年賀状" not in ts),
    ("generic ja H1 gone", "高品質・短納期・グローバル配送" not in ts),
    ("cartoon zh dedupe applied", "卡通利是封採用 120g 銅版紙或環保紙，標準尺寸約 90×170mm，以四色數碼印刷呈現" not in ts),
]
ok = True
for name, cond in checks:
    print(("OK  " if cond else "FAIL") + " " + name)
    ok = ok and cond

# faqSchema lines parse
for slug in ("cartoon-red-packets", "eco-red-packets", "large-red-packets"):
    i = prod.find("slug: '%s'" % slug)
    j = prod.find("faqSchema: ", i)
    k1 = prod.find("[", j)
    k2 = prod.find("}]", k1) + 2
    raw = prod[k1:k2]
    arr = json.loads(raw)
    n = len(arr)
    good = n == 4 and all("MOQ 500" not in a["answer"] for a in arr)
    print(("OK  " if good else "FAIL") + " faqSchema %s: %d QA, no MOQ500" % (slug, n))
    ok = ok and good

print("ALL:", "PASS" if ok else "FAIL")
