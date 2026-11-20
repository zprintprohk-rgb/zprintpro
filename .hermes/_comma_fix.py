# -*- coding: utf-8 -*-
"""One-spot fix: normalize the splice-point double comma '  },,' -> '  },' (user-authorized write)."""
import io, sys

p = r"F:\zprintpro-nextjs\src\data\category-seo-content.ts"
s = io.open(p, encoding="utf-8", newline="").read()
OLD = "  },,\n  'en': {"
NEW = "  },\n  'en': {"
n = s.count(OLD)
print("occurrences:", n)
if n != 1:
    sys.exit("unexpected count — abort")
s2 = s.replace(OLD, NEW, 1)
io.open(p, "w", encoding="utf-8", newline="").write(s2)
b = open(p, "rb").read(2)
print("no BOM:", b[0] != 0xFF)
print("fixed")
