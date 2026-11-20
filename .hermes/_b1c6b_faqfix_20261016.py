# -*- coding: utf-8 -*-
"""修复 faqSchema 重复: 撤回 3 行插入 + 块内原位替换既有共享模板行"""
import io, os, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD_P = os.path.join(REPO, "src", "data", "products.ts")
BAK = os.path.join(REPO, ".hermes", "_bak-b1c6b-20261016")

MY_PREFIXES = [
    '    faqSchema: [{"question": "Which stand sizes do display posters fit?"',
    '    faqSchema: [{"question": "What makes a Giclée art print archival?"',
    '    faqSchema: [{"question": "How long do adhesive posters last outdoors?"',
]
OLD_TEMPLATE_PREFIX = '    faqSchema: [{"question": "What is the best paper weight for posters?"'
SLUGS = ["display-posters", "art-posters", "adhesive-posters"]
NEWS = {
"display-posters": '[{"question": "Which stand sizes do display posters fit?", "answer": "Standard 60x160cm and 80x180cm formats match common X-banner and roll-up stands; send your stand model and we run a free size check before output."}, {"question": "What resolution should display poster artwork be?", "answer": "100-150dpi is sufficient at typical viewing distance; submit 200dpi for close-up detail. Every file gets a free preflight before printing."}, {"question": "What is the minimum order for display posters?", "answer": "Single-set MOQ from US$7.36 per set, with volume tiers from 10 sets upward. No plate or setup fees on digital output."}, {"question": "Which stock works best for exhibitions?", "answer": "PP synthetic paper handles repeated installs and transport; glossy photo stock suits colour-critical booths. Both take lamination for multi-day shows."}]',
"art-posters": '[{"question": "What makes a Giclée art print archival?", "answer": "12-colour pigment inks on 260gsm acid-free fine-art paper are rated for roughly 100 years of display under normal indoor conditions."}, {"question": "Can I print limited editions with numbering?", "answer": "Yes - variable data lets each copy carry its own edition number; send the numbering layout with your artwork and we preflight it free."}, {"question": "What is the minimum order for art posters?", "answer": "Single-piece MOQ from US$5.98; typical gallery editions of 10-50 copies run digitally with no plate cost."}, {"question": "Do you provide colour proofs before output?", "answer": "A free digital proof is standard; physical proof sheets can be arranged for gallery-critical colour matching."}]',
"adhesive-posters": '[{"question": "How long do adhesive posters last outdoors?", "answer": "Cast vinyl faces are rated 6-12 months outdoors; indoor window displays last considerably longer away from direct weather."}, {"question": "Will the sticker leave bubbles or residue?", "answer": "Air-egress adhesive channels let bubbles escape during application; within the rated window the material removes cleanly without tearing."}, {"question": "Can adhesive posters be die-cut to shape?", "answer": "Yes - contour cutting follows your vector outline for window, wall and vehicle shapes at no design charge."}, {"question": "How fast can a short run be ready?", "answer": "Digital short runs are ready in as fast as the same day; a free digital proof confirms colour before output."}]'
}

def main():
    with io.open(PROD_P, "r", encoding="utf-8", newline="") as fh:
        text = fh.read()
    lines = text.split("\n")

    # ① 撤回我插入的 3 行 (全文件各恰 1 次)
    to_null = []
    for pfx in MY_PREFIXES:
        hits = [i for i, ln in enumerate(lines) if ln.startswith(pfx)]
        if len(hits) != 1:
            print(f"[fix] FAIL 撤回定位 {pfx[:50]}: {len(hits)}"); return 2
        to_null.append(hits[0])
    for i in to_null:
        lines[i] = None
    lines = [ln for ln in lines if ln is not None]

    # ② slug 区间定位既有共享模板行并原位替换
    slug_idx = {}
    for i, ln in enumerate(lines):
        for s in SLUGS:
            if ln == f"    slug: '{s}',":
                slug_idx[s] = i
    if len(slug_idx) != 3:
        print(f"[fix] FAIL slug 锚: {slug_idx}"); return 2
    order = sorted(slug_idx.items(), key=lambda kv: kv[1])
    replaced = 0
    for k, (slug, start) in enumerate(order):
        end = order[k + 1][1] if k + 1 < len(order) else len(lines)
        hits = [i for i in range(start, end) if lines[i].startswith(OLD_TEMPLATE_PREFIX)]
        if len(hits) != 1:
            print(f"[fix] FAIL {slug} 共享模板行 {len(hits)} (区间 {start}-{end})"); return 2
        lines[hits[0]] = "    faqSchema: " + NEWS[slug] + ","
        replaced += 1

    new_text = "\n".join(lines)
    # ③ 形状断言
    for slug, val in NEWS.items():
        if new_text.count(val[:60]) != 1:
            print(f"[fix] FAIL 新 faqSchema {slug} 落位"); return 3
    if new_text.count(OLD_TEMPLATE_PREFIX) != 1:
        # 原共享模板 4 份 -> 本批替换 3 份, 余 1 份 (outdoor-posters) 归残留登记
        print(f"[fix] WARN/FAIL: 共享模板余 {new_text.count(OLD_TEMPLATE_PREFIX)} (预期 1)"); return 3
    shutil.copy2(PROD_P, os.path.join(BAK, "products.ts.before-faqfix"))
    with io.open(PROD_P, "w", encoding="utf-8", newline="") as fh:
        fh.write(new_text)
    print(f"[fix] PASS: 撤 3 插入 + 替换 {replaced} 共享模板行 / 余 2 份归残留")
    return 0

if __name__ == "__main__":
    sys.exit(main())
