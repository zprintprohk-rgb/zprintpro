# -*- coding: utf-8 -*-
"""五大 category 商业真值审计器 v2 (2026-10-31)
关键修正 (v1 的假阳性根因):
  ① MOQ 只在「起印/起訂/最少/最低/MOQ」语境命中, 并排除「批量/階梯/以上/檔/折扣/tier」语境
  ② 价格只在「起價/起/from/以上」语境命中, 批量單價不算冲突
  ③ 输出为**候选清单** (CANDIDATES), 不给 OK/CONFLICT 判决 —— 需人工按上下文确认
用法: python scripts/audit-five-category-truth.py [--json out.json]
"""
import argparse, json, re, ssl, sys, io, urllib.request
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

ROOT = "F:/zprintpro-nextjs"
CATS = ["flyers", "stickers", "books", "packaging", "posters"]
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0", "Accept": "text/html"}

def truth():
    src = open(f"{ROOT}/src/data/products.ts", encoding="utf-8").read()
    out = {}
    for b in re.split(r"\n  \{\n", src)[1:]:
        def g(pat):
            m = re.search(pat, b)
            return m.group(1) if m else None
        slug, cat = g(r"slug:\s*'([^']+)'"), g(r"category_slug:\s*'([^']+)'")
        if not slug or cat not in CATS:
            continue
        out.setdefault(cat, []).append({
            "slug": slug, "base": float(g(r"basePrice:\s*([\d.]+)") or 0),
            "moq": int(g(r"minQuantity:\s*(\d+)") or 0),
        })
    return out

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30, context=ssl.create_default_context()) as r:
        return r.status, r.read().decode("utf-8", "replace")

def visible(html):
    html = re.sub(r"<script[\s\S]*?</script>", " ", html)
    html = re.sub(r"<style[\s\S]*?</style>", " ", html)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html))

QTY = ("張", "個", "本", "份", "套", "枚")
TIMES = ("批量", "階梯", "以上", "檔", "折扣", "tier", "volume", "大量")
MOQ_CTX = ("起印", "起訂", "起订", "最少", "最低", "MOQ", "moq")

def moq_candidates(vis):
    out = []
    for m in re.finditer(r"(\d[\d,]*)\s*(?:%s)" % "|".join(QTY), vis):
        n = int(m.group(1).replace(",", ""))
        ctx = vis[max(0, m.start() - 24): m.end() + 16]
        if any(t in ctx for t in TIMES):
            continue
        before = vis[max(0, m.start() - 16): m.start()]
        after = vis[m.end(): m.end() + 10]
        if any(k in before for k in MOQ_CTX) or any(k in after for k in MOQ_CTX):
            out.append({"value": n, "ctx": ctx})
    return out

def price_candidates(vis):
    out = []
    for m in re.finditer(r"HK\$\s*([\d,]+(?:\.\d+)?)", vis):
        p = float(m.group(1).replace(",", ""))
        after = vis[m.end(): m.end() + 14]
        ctx = vis[max(0, m.start() - 20): m.end() + 14]
        if any(t in ctx for t in TIMES):
            continue
        if re.search(r"起|from", after):
            out.append({"value": p, "ctx": ctx})
    return out

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--json"); a = ap.parse_args()
    T = truth()
    rep = {"generated": "2026-10-31", "method": "candidates-only, 语境收紧", "categories": {}}
    for cat in CATS:
        skus = T.get(cat, [])
        mos = sorted({s["moq"] for s in skus})
        lo = min((s["base"] for s in skus), default=0)
        st, html = fetch(f"https://zprintpro.com/zh-hk/category/{cat}/")
        vis = visible(html)
        mc = moq_candidates(vis)
        pc = price_candidates(vis)
        sus_moq = [c for c in mc if c["value"] not in mos]
        sus_price = [c for c in pc if 0 < c["value"] < lo]
        rep["categories"][cat] = {
            "status": st, "truth_moq_set": mos, "truth_min_price": lo,
            "moq_candidates": mc, "price_candidates": pc,
            "suspect_moq": sus_moq, "suspect_price_below_min": sus_price,
        }
        print(f"\n### {cat}  status={st}")
        print(f"  真值 MOQ={mos} 起价下限={lo}")
        print(f"  MOQ 候选 {len(mc)} 个 → 真值外 {len(sus_moq)}: {[c['value'] for c in sus_moq] or '无'}")
        print(f"  起价候选 {len(pc)} 个 → 低于下限 {len(sus_price)}: {[c['value'] for c in sus_price] or '无'}")
        for c in sus_moq[:3]:
            print(f"    [MOQ?] {c['value']} :: …{c['ctx']}…")
        for c in sus_price[:3]:
            print(f"    [價?] {c['value']} :: …{c['ctx']}…")
    if a.json:
        json.dump(rep, open(a.json, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print(f"\n→ {a.json}")

if __name__ == "__main__":
    main()
