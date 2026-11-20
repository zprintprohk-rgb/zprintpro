# -*- coding: utf-8 -*-
# 铁证级对比: ① 现网 72 文件 vs v28_5 源 sha256 ② cartoon ja 数组全量 ③ legacy jpg 存在性 ④ 当前文件 EXIF alt
import io, re, hashlib, json
from pathlib import Path
ROOT = Path(r'F:\zprintpro-nextjs')
SRC = ROOT / 'zprintpro-en-us-images/v28_5_webp'
DST = ROOT / 'public/images/products/seedream-webp'
t = io.open(ROOT / 'src/data/products.ts', encoding='utf-8').read()
base = t.index('export const products')

MAP = {  # slug -> (v28_5 dir, product-part)
 'foil-red-packets': ('RP-001', 'foil-red-packets'),
 'embossed-red-packets': ('RP-002', 'embossed-red-packets'),
 'custom-red-packets': ('RP-003', 'custom-red-packets'),
 'cartoon-red-packets': ('RP-004', 'cartoon-red-packets'),
 'eco-red-packets': ('RP-005', 'eco-red-packets'),
 'large-red-packets': ('RP-006', 'large-red-packets'),
}
def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()[:16]

same, diff, missing_src, missing_dst = 0, 0, [], []
for slug, (d, part) in MAP.items():
    for loc in ('zh-hk', 'en', 'ja'):
        for view, suffix in (('hero', ''), ('detail', '-2'), ('multi-angle', '-3'), ('variety', '-4')):
            srcf = SRC / d / ('zprintpro-red-packets-%s-%s-%s.webp' % (part, loc, view))
            dstf = DST / ('zprintpro-red-packets-%s-%s%s.webp' % (part, loc, suffix))
            if not srcf.exists():
                missing_src.append(srcf.name)
                continue
            if not dstf.exists():
                missing_dst.append(dstf.name)
                continue
            if sha(srcf) == sha(dstf):
                same += 1
            else:
                diff += 1
print('byte-compare: same=%d diff=%d missing_src=%d missing_dst=%d' % (same, diff, len(missing_src), len(missing_dst)))
print('missing_src:', missing_src[:6])
print('missing_dst:', missing_dst)

# cartoon ja 数组实际内容
i = t.index("slug: 'cartoon-red-packets'", base)
seg = t[i:i+4200]
m = re.search(r"'ja': \[(.*?)\]", seg, re.DOTALL)
print('\ncartoon ja array:', re.findall(r"'(/images/[^']+)'", m.group(1)) if m else None)

# legacy jpg 存在性
for slug in MAP:
    p = ROOT / ('public/images/products/%s.jpg' % slug)
    print('legacy jpg %-24s exists=%s' % (slug, p.exists()))

# 当前 zh 文件 EXIF alt 采样 (foil hero)
def exif_alt(p):
    b = p.read_bytes()
    for needle in (b'ZprintPro', '智印港'.encode('utf-8')):
        i = b.find(needle)
        if i >= 0:
            s = max(0, i - 160)
            return b[s:i + 40].decode('utf-8', 'ignore').replace('\x00', ' ')
    return None
cur = DST / 'zprintpro-red-packets-foil-red-packets-zh-hk.webp'
new = SRC / 'RP-001/zprintpro-red-packets-foil-red-packets-zh-hk-hero.webp'
print('\ncur zh hero EXIF ctx:', (exif_alt(cur) or 'NONE')[-120:])
print('new zh hero EXIF ctx:', (exif_alt(new) or 'NONE')[-120:])
print('\ncur bytes=%d | new bytes=%d' % (cur.stat().st_size, new.stat().st_size))
print('cur sha=%s | new sha=%s' % (sha(cur), sha(new)))
