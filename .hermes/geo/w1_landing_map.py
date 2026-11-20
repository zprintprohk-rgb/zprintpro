# -*- coding: utf-8 -*-
"""W1: map selected speed-win queries -> landing pages.
Method A: root gsc_page_query.csv (2026-08-26 vintage) exact query->page rows.
Method B (cross-check): the 2026-09-29 xlsx 网页 sheet top pages for page-path agreement.
Outputs .hermes/geo/_w1_landing_map.json. Read-only over GSC sources.
"""
import json, csv, re, datetime

BASE = r"F:\zprintpro-nextjs"
SELECTED = {
    "zh_hk": ["食品包裝印刷", "a6 尺寸", "紙袋印刷", "印刷紙袋", "餐牌印刷", "小冊子印刷",
              "即日印刷", "騎馬釘印刷", "食品包裝訂製", "大信封", "邊度有紙袋買", "a1 印刷 即日"],
    "en": ["small batch sticker printing", "doujinshi printing", "small batch stickers",
           "exercise book printing business", "small batch custom stickers", "fluorescent stickers",
           "pvc menu", "saddle stitch booklet maker", "doujin printing", "exercise book printing",
           "school exercise book printing"],
    "ja": ["pvcシールとは", "封筒 両面印刷", "教材 印刷製本", "中 綴じ 無線 綴じ",
           "dhl 当日集荷 何時まで", "型抜きステッカー", "バナースタンド 即日"],
}

def load_page_query():
    rows = []
    with open(BASE + r"\gsc_page_query.csv", encoding="utf-8-sig", newline="") as f:
        rd = csv.DictReader(f)
        for r in rd:
            rows.append(r)
    return rows

def norm(q):
    return re.sub(r"\s+", " ", (q or "").strip().lower())

def main():
    rows = load_page_query()
    print("page_query rows:", len(rows), "| header:", list(rows[0].keys()) if rows else "-")
    # find column names
    cols = list(rows[0].keys()) if rows else []
    qcol = next((c for c in cols if c.lower() in ("query", "查询", "查詢", "top queries", "热门查询")), cols[0] if cols else "query")
    pcol = next((c for c in cols if "page" in c.lower() or "网页" in c or "網頁" in c), cols[1] if len(cols) > 1 else "page")
    impcol = next((c for c in cols if "impression" in c.lower() or "展示" in c), None)
    poscol = next((c for c in cols if "position" in c.lower() or "排名" in c or "位置" in c), None)
    print(f"cols: query={qcol} page={pcol} imp={impcol} pos={poscol}")
    index = {}
    for r in rows:
        q = norm(r.get(qcol))
        if q:
            index.setdefault(q, []).append({pcol: r.get(pcol),
                                            "imp": r.get(impcol), "pos": r.get(poscol)})
    out = {"generated_at": datetime.datetime.now().isoformat(timespec="seconds"),
           "source": "gsc_page_query.csv (2026-08-26 mtime)", "mappings": {}}
    for locale, terms in SELECTED.items():
        out["mappings"][locale] = {}
        for t in terms:
            hits = index.get(norm(t), [])
            out["mappings"][locale][t] = hits[:4]
            if not hits:
                print(f"[{locale}] NO page row for: {t}")
    with open(BASE + r"\.hermes\geo\_w1_landing_map.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    for locale, m in out["mappings"].items():
        print(f"== {locale} ==")
        for t, hits in m.items():
            if hits:
                for h in hits[:2]:
                    print(f"  {t} -> {h.get(pcol)} (imp={h.get('imp')}, pos={h.get('pos')})")
    print("written: .hermes/geo/_w1_landing_map.json")

if __name__ == "__main__":
    main()
