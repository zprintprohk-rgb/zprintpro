import io, sys, re
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
import glob
for p in glob.glob("F:/zprintpro-nextjs/*.csv") + glob.glob("F:/zprintpro-nextjs/zprintpro-*.csv"):
    try:
        raw = open(p, encoding="utf-8", errors="replace").read()
        if "nengajo" in raw:
            m = re.findall(r"([A-Za-z0-9_-]*nengajo[A-Za-z0-9_-]*)", raw)
            print(p.split("/")[-1], "->", sorted(set(m))[:6])
    except Exception as e:
        pass
