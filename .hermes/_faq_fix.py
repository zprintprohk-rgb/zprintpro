# -*- coding: utf-8 -*-
"""Fix my inserted en/ja blocks: faq question/answer -> q/a; then inspect TS1117 context."""
import io

p = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(p, encoding="utf-8", newline="").read()

# --- locate my en block start ('en': first occurrence after zh-hk close at ~408) ---
i = s.find("packagingContent:")
en_i = s.find("  'en': {", i)
ja_i = s.find("  'ja': {", i)
end_i = s.find("\n};", ja_i)
assert en_i > 0 and ja_i > en_i and end_i > ja_i, (en_i, ja_i, end_i)
en_block = s[en_i:ja_i]
ja_block = s[ja_i:end_i]

n_q_en = en_block.count("{ question: "); n_a_en = en_block.count(", answer: ")
n_q_ja = ja_block.count("{ question: "); n_a_ja = ja_block.count(", answer: ")
print("faq entries en:", n_q_en, n_a_en, "| ja:", n_q_ja, n_a_ja)
assert n_q_en == n_a_en == 5 and n_q_ja == n_a_ja == 5, "faq counts unexpected"

en2 = en_block.replace("{ question: ", "{ q: ").replace(", answer: ", ", a: ")
ja2 = ja_block.replace("{ question: ", "{ q: ").replace(", answer: ", ", a: ")
s2 = s[:en_i] + en2 + ja2 + s[end_i:]
io.open(p, "w", encoding="utf-8", newline="").write(s2)
b = open(p, "rb").read(2)
print("faq keys fixed; no BOM:", b[0] != 0xFF)

# --- dump raw context around 405-412 and 585-595 for TS1117 forensics ---
lines = s2.split("\n")
out = io.open(r"F:\zprintpro-nextjs\.hermes\_ts1117_ctx.txt", "w", encoding="utf-8", newline="")
for a, bnd in ((403, 414), (498, 508), (586, 598)):
    out.write("=== lines %d-%d ===\n" % (a, bnd))
    for i2 in range(a - 1, min(bnd, len(lines))):
        out.write("%d|%s\n" % (i2 + 1, lines[i2][:200]))
out.close()
print("context dumped")
