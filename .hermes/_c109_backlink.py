# -*- coding: utf-8 -*-
"""在两篇 comiket 博客 FAQ 前插入 C109 特设页内链（防孤儿页）"""
import io, os, json, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(REPO, ".hermes", "_bak-c109link-20261022")
os.makedirs(B, exist_ok=True)

CASES = [
    ("ja.json", "comiket-printing-prep-guide", "<h2>よくあるご質問</h2>",
     '<p>このページの内容を 1 枚にまとめた特設ページも用意しています：<a href="/ja/comiket-c109/">コミケ C109 同人誌印刷（締切逆算表・入稿チェックリスト）</a>。仕様が決まっていない段階でも、部数と締切から逆算して相談できます。</p>\n\n'),
    ("en.json", "comiket-printing-prep-guide", "<h2>Frequently Asked Questions</h2>",
     '<p>We also keep a single-page brief for this event: <a href="/en/comiket-c109/">Comiket C109 doujinshi printing (deadline countdown and file checklist)</a>. Send your spec even if it is not final — we will work backwards from your copy count and deadline.</p>\n\n'),
]

for fn, slug, anchor, ins in CASES:
    P = os.path.join(REPO, "src", "data", "blog-data", fn)
    raw = io.open(P, encoding="utf-8", newline="").read()
    j = json.loads(raw)
    c = j[slug]["content"]
    if "comiket-c109" in c:
        print("skip (already linked):", fn)
        continue
    i = c.find(anchor)
    assert i > 0, f"{fn}: anchor not found"
    c2 = c[:i] + ins + c[i:]
    assert c2.count("comiket-c109") == 1
    j[slug]["content"] = c2
    si = raw.find('"%s": {' % slug)
    ci = raw.find('"content"', si)
    vi = raw.find(':', ci) + 1
    while raw[vi] in ' \t\r\n':
        vi += 1
    k = vi + 1
    while k < len(raw):
        ch = raw[k]
        if ch == '\\':
            k += 2; continue
        if ch == '"':
            break
        k += 1
    out = raw[:vi] + json.dumps(c2, ensure_ascii=False) + raw[k + 1:]
    json.loads(out)
    bp = os.path.join(B, fn + ".before")
    if not os.path.exists(bp):
        shutil.copy2(P, bp)
    io.open(P, "w", encoding="utf-8", newline="").write(out)
    print(f"[OK] {fn}: {len(c)} -> {len(c2)} (c109 link added)")
