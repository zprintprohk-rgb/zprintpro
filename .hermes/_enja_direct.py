# -*- coding: utf-8 -*-
"""5 包装 SKU: en/ja body 首段加 Quick answer / クイック回答（含 MOQ + 价格带）"""
import io, os, re, shutil, sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
t = io.open(P, encoding="utf-8", newline="").read()

CASES = {
    "rigid-boxes": ("HK$8-42", "size, grey-board thickness and finishing"),
    "cosmetic-boxes": ("HK$8-65", "box style and finishing"),
    "mailer-boxes": ("HK$3.5-10", "size and flute type"),
    "white-card-bags": ("HK$5-12", "size and paper weight"),
    "kraft-paper-bags": ("HK$3-8", "size, paper weight and handle style"),
}
JA_DETAIL = {
    "rigid-boxes": "サイズ・グレーボード厚・加工",
    "cosmetic-boxes": "箱型・加工",
    "mailer-boxes": "サイズ・フルート",
    "white-card-bags": "サイズ・紙の厚さ",
    "kraft-paper-bags": "サイズ・紙の厚さ・手紐",
}

def marks_of(s):
    return [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', s, re.M)]

changed = []
for slug, (rng, detail) in CASES.items():
    mk = marks_of(t)
    idx = next((i for i, (k, o) in enumerate(mk) if k == slug), None)
    if idx is None:
        print("[FAIL] no block", slug); sys.exit(2)
    off = mk[idx][1]
    end = mk[idx + 1][1] if idx + 1 < len(mk) else len(t)
    blk = t[off:end]

    en_start = blk.find('"en": {')
    ja_start = blk.find('"ja": {')
    assert en_start > 0 and ja_start > en_start, slug
    en_part = blk[en_start:ja_start]
    ja_part = blk[ja_start:]

    en_clause = f"Quick answer: 100 pcs MOQ, {rng}/pc ({detail}), free digital proof within 1 hour, instant quote in 30 seconds.\\n\\n"
    ja_clause = f"クイック回答：100 個から、{rng}/個（{JA_DETAIL[slug]}による）、1 時間以内に無料デジタル校正、30 秒で即時見積もり。\\n\\n"

    def inject(part, clause, tag):
        m = re.search(r'"body":\s*"', part)
        if not m:
            print("[FAIL] no body", slug, tag); sys.exit(2)
        head = part[:m.end()]
        rest = part[m.end():]
        if clause.split("\\n")[0] in rest[:200]:
            return part, False
        return head + clause + rest, True

    en_new, c1 = inject(en_part, en_clause, "en")
    ja_new, c2 = inject(ja_part, ja_clause, "ja")
    nblk = blk[:en_start] + en_new + ja_new
    t = t[:off] + nblk + t[end:]
    changed.append(f"{slug}: en={c1} ja={c2}")

for c in changed:
    print("[OK]", c)

# 断言
for slug in CASES:
    mk = marks_of(t)
    idx = next(i for i, (k, o) in enumerate(mk) if k == slug)
    off = mk[idx][1]
    end = mk[idx + 1][1] if idx + 1 < len(mk) else len(t)
    blk = t[off:end]
    assert "Quick answer:" in blk, slug + " en missing"
    assert "クイック回答：" in blk, slug + " ja missing"

bp = os.path.join(REPO, ".hermes", "_bak-enja-direct-20261021", "sku-seo-data.ts.before")
os.makedirs(os.path.dirname(bp), exist_ok=True)
if not os.path.exists(bp):
    shutil.copy2(P, bp)
io.open(P, "w", encoding="utf-8", newline="").write(t)
print("[PASS] written")
