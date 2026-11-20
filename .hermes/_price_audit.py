# -*- coding: utf-8 -*-
"""Cross-locale price consistency audit over .hermes/_allsku_truth.tsv (83 SKUs).
Flags: (1) missing basePrice_en/ja -> feed uses fallback FX (page-vs-feed mismatch risk)
       (2) basePrice != price_range min (internal SSoT conflict, e.g. white-card-boxes)
       (3) price_range min/max sanity."""
import io, re

rows = [l.split("\t") for l in io.open(r"F:\zprintpro-nextjs\.hermes\_allsku_truth.tsv", encoding="utf-8").read().strip().split("\n")]
print("SKUs:", len(rows))
missing_en, missing_ja, conflicted, range_odd = [], [], [], []
for slug, mq, bp, bpe, bpj, pr in rows:
    bp = float(bp) if bp != "-" else None
    bpe = float(bpe) if bpe != "-" else None
    bpj = float(bpj) if bpj != "-" else None
    if bp is not None and bpe is None:
        missing_en.append((slug, bp))
    if bp is not None and bpj is None:
        missing_ja.append((slug, bp))
    if bp is not None and pr:
        nums = [float(x.replace(",", "")) for x in re.findall(r"[\d,]+(?:\.\d+)?", pr)]
        if nums:
            lo = min(nums)
            # internal conflict: basePrice differs from range-min by >5%
            if abs(bp - lo) / max(lo, 1e-9) > 0.05:
                conflicted.append((slug, bp, lo, pr))
            if len(nums) >= 2 and max(nums) < min(nums):
                range_odd.append((slug, pr))

print("\n== (1) basePrice_en missing -> feed fallback FX active (%d) ==" % len(missing_en))
for s, b in missing_en:
    fb = round(b * 0.128, 2)
    print("  %-32s basePrice=%-8s feed_en_fallback=$%.2f" % (s, b, fb))
print("\n== (2) basePrice_ja missing (%d) ==" % len(missing_ja))
for s, b in missing_ja:
    fb = round(b * 19.5)
    print("  %-32s basePrice=%-8s feed_ja_fallback=¥%d" % (s, b, fb))
print("\n== (3) basePrice vs price_range-min conflict >5%% (%d) ==" % len(conflicted))
for s, b, lo, pr in conflicted:
    print("  %-32s basePrice=%-8s range_min=%-10s range=%s" % (s, b, lo, pr[:30]))
print("\nAUDIT_DONE")
