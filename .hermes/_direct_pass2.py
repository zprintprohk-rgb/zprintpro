# -*- coding: utf-8 -*-
"""第二批: 30 SKU 首段插入直答（MOQ + 每件价格带），排除异常区间"""
import io, os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P_SEO = os.path.join(REPO, "src", "data", "sku-seo-data.ts")
P_PROD = os.path.join(REPO, "src", "data", "products.ts")
seo = io.open(P_SEO, encoding="utf-8", newline="").read()
prod = io.open(P_PROD, encoding="utf-8", newline="").read()

pm = [(m.group(1), m.start()) for m in re.finditer(r"^\s{4}slug: '([a-z0-9-]+)',$", prod, re.M)]
truth = {}
for i, (slug, off) in enumerate(pm):
    seg = prod[off:pm[i + 1][1] if i + 1 < len(pm) else len(prod)]
    mq = re.search(r"minQuantity: (\d+)", seg)
    pr = re.search(r"price_range: '([^']+)'", seg)
    truth[slug] = (int(mq.group(1)) if mq else None, pr.group(1) if pr else None)

SKIP = {"catalog-printing"}  # range HK$2.8-1000/本 明显异常
changed = []
for _ in range(40):  # 逐块处理, 每轮重解析
    marks = [(m.group(1), m.start()) for m in re.finditer(r'^  "([a-z0-9-]+)": \{', seo, re.M)]
    target = None
    for i, (slug, off) in enumerate(marks):
        end = marks[i + 1][1] if i + 1 < len(marks) else len(seo)
        blk = seo[off:end]
        mq, rng = truth.get(slug, (None, None))
        if not mq or not rng or slug in SKIP:
            continue
        mm = re.match(r"HK\$[\d.]+-[\d.,]+/(個|張|本|枚|冊)$", rng)
        if not mm:
            continue
        unit = mm.group(1)
        bm = re.search(r'"body":\s*"((?:[^"\\]|\\.)*)"', blk)
        if not bm:
            continue
        body = bm.group(1)
        first = body.split("\\n\\n")[0]
        if "HK$" in first and re.search(r"\d{1,5}\s*" + unit + r"\s*起", first):
            continue  # 已达标
        if "直答：" in first:
            continue
        target = (slug, off, end, bm, unit, mq, rng)
        break
    if not target:
        break
    slug, off, end, bm, unit, mq, rng = target
    blk = seo[off:end]
    body = bm.group(1)
    clause = f"直答：{mq} {unit}起印、{rng}，1 小時內免費數碼打稿，30 秒 AI 報價即時出價。\\n\\n"
    new_body = clause + body
    new_blk = blk[:bm.start(1)] + new_body + blk[bm.end(1):]
    seo = seo[:off] + new_blk + seo[end:]
    changed.append(f"{slug}: {mq}{unit} {rng}")

print("changed", len(changed))
for c in changed[:32]:
    print("  +", c)

bp = os.path.join(REPO, ".hermes", "_bak-directans-20261021", "sku-seo-data.ts.before2")
if not os.path.exists(bp):
    shutil.copy2(P_SEO, bp)
io.open(P_SEO, "w", encoding="utf-8", newline="").write(seo)
print("[written]")
