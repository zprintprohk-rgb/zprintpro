# -*- coding: utf-8 -*-
# red-packets 换血手术 v2:
# ① products.ts 6×3 seoAlt 升级为 GEO 公式终版 (品牌补齐 / ja 紅包→ポチ袋 / MOQ 100 真值钩子)
# ② v28_5 源 72 文件 → 剥 EXIF/XMP → 注入新 alt EXIF → 同名覆盖 public (+cartoon ja -3/-4 补位)
# ③ cartoon ja 数组扩 2 行 + legacy jpg → webp hero ×6
# 验证: 每文件字节级 alt 搜索 ×2 方法 (注入串 + products.ts 串一致)
import io, re, struct, shutil
from pathlib import Path

ROOT = Path(r'F:\zprintpro-nextjs')
SRC = ROOT / 'zprintpro-en-us-images/v28_5_webp'
DST = ROOT / 'public/images/products/seedream-webp'
STG = ROOT / '.hermes/_rp_staging'
ts_path = ROOT / 'src/data/products.ts'
t = io.open(ts_path, encoding='utf-8').read()
base = t.index('export const products')

MAP = {
 'foil-red-packets': ('RP-001', 'foil-red-packets'),
 'embossed-red-packets': ('RP-002', 'embossed-red-packets'),
 'custom-red-packets': ('RP-003', 'custom-red-packets'),
 'cartoon-red-packets': ('RP-004', 'cartoon-red-packets'),
 'eco-red-packets': ('RP-005', 'eco-red-packets'),
 'large-red-packets': ('RP-006', 'large-red-packets'),
}

NEWALTS = {
 'foil-red-packets': {
  'zh-hk': '利是封印刷 / 燙金 / 春節紅包 | 香港燙金利是封印刷 120g紅色紙張 燙金 100個起印 | 智印港',
  'en': 'Red Packet Printing / Gold Foil / Lunar New Year | Foil Red Packets 120gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / 箔押し | 箔押しポチ袋 120g・100枚から | ZprintPro',
 },
 'embossed-red-packets': {
  'zh-hk': '利是封印刷 / 浮雕 / 春節紅包 | 香港浮雕利是封印刷 150g紅色紙張 浮雕 100個起印 | 智印港',
  'en': 'Red Packet Printing / Embossed / Lunar New Year | Embossed Red Packets 150gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / エンボス | エンボスポチ袋 150g・100枚から | ZprintPro',
 },
 'custom-red-packets': {
  'zh-hk': '利是封印刷 / 定製 / 春節紅包 | 香港定製利是封印刷 120g–150g紅色紙張 100個起印 | 智印港',
  'en': 'Red Packet Printing / Custom / Lunar New Year | Custom Red Packets 120–150gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / オリジナル | オリジナルポチ袋 120g–150g・100枚から | ZprintPro',
 },
 'cartoon-red-packets': {
  'zh-hk': '利是封印刷 / 卡通 / 春節紅包 | 香港卡通利是封印刷 120g銅版紙 彩色 100個起印 | 智印港',
  'en': 'Red Packet Printing / Cartoon / Lunar New Year | Cartoon Red Packets 120gsm Art Paper, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / キャラクター | キャラクターポチ袋 120gコート紙・100枚から | ZprintPro',
 },
 'eco-red-packets': {
  'zh-hk': '利是封印刷 / 環保 / 春節紅包 | 香港環保利是封印刷 FSC認證再生紙 無覆膜 100個起印 | 智印港',
  'en': 'Red Packet Printing / Eco / Lunar New Year | Eco Red Packets FSC Recycled Paper Unlaminated, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / エコ | エコポチ袋 FSC再生紙 無PP加工・100枚から | ZprintPro',
 },
 'large-red-packets': {
  'zh-hk': '利是封印刷 / 大號 / 春節紅包 | 香港大號利是封印刷 150g–200g紅色紙張 100個起印 | 智印港',
  'en': 'Red Packet Printing / Large Size / Lunar New Year | Large Red Packets 150–200gsm, 100 pcs MOQ | ZprintPro',
  'ja': 'ポチ袋印刷 / 旧正月 / 大判 | 大判ポチ袋 150g–200g・100枚から | ZprintPro',
 },
}

# ---- ① 抽取旧 alt 并替换为新 alt ----
def alt_block(slug):
    i = t.index("slug: '%s'" % slug, base)
    j = t.index('alt: {', i)
    m = re.compile(r"alt: \{(.*?)\n    \},?\n", re.DOTALL).match(t, j)
    return m

replaced = 0
for slug in MAP:
    m = alt_block(slug)
    blk = m.group(1)
    olds = {}
    for mm in re.finditer(r"'?(zh-hk|en|ja)'?: '([^']+)'", blk):
        olds[mm.group(1)] = mm.group(2)
    assert len(olds) == 3, (slug, olds.keys())
    for loc, old in olds.items():
        new = NEWALTS[slug][loc]
        if old != new:
            assert t.count(old) == 1, (slug, loc, t.count(old))
            t = t.replace(old, new)
            replaced += 1
print('alts replaced in products.ts:', replaced, '(18 expected if all differ)')
assert replaced == 18  # 全数升级

# ---- ② EXIF 注入器 ----
def build_exif_chunk(alt: str) -> bytes:
    data = alt.encode('utf-8') + b'\x00'
    hdr = b'II' + struct.pack('<H', 42) + struct.pack('<I', 8)
    ifd = struct.pack('<H', 1)
    if len(data) <= 4:
        ifd += struct.pack('<HHI', 0x010E, 2, len(data)) + data.ljust(4, b'\x00')
        extra = b''
    else:
        ifd += struct.pack('<HHII', 0x010E, 2, len(data), 8 + 2 + 12 + 4)
        extra = data
    ifd += struct.pack('<I', 0)
    payload = b'Exif\x00\x00' + hdr + ifd + extra
    return b'EXIF' + struct.pack('<I', len(payload)) + payload + (b'\x00' if len(payload) % 2 else b'')

def rewebp(raw: bytes, alt: str) -> bytes:
    assert raw[:4] == b'RIFF' and raw[8:12] == b'WEBP'
    pos = 12
    keep = []
    while pos + 8 <= len(raw):
        four = raw[pos:pos+4]
        size = struct.unpack('<I', raw[pos+4:pos+8])[0]
        chunk = raw[pos:pos+8+size+(size % 2)]
        if four not in (b'EXIF', b'XMP '):
            keep.append(chunk)
        pos += 8 + size + (size % 2)
    body = b''.join(keep) + build_exif_chunk(alt)
    return b'RIFF' + struct.pack('<I', len(body) + 4) + b'WEBP' + body

if STG.exists():
    shutil.rmtree(STG)
STG.mkdir(parents=True)
VIEWS = (('hero', ''), ('detail', '-2'), ('multi-angle', '-3'), ('variety', '-4'))
done = verified = 0
for slug, (d, part) in MAP.items():
    for loc in ('zh-hk', 'en', 'ja'):
        alt = NEWALTS[slug][loc]
        for view, sfx in VIEWS:
            srcf = SRC / d / ('zprintpro-red-packets-%s-%s-%s.webp' % (part, loc, view))
            dstn = 'zprintpro-red-packets-%s-%s%s.webp' % (part, loc, sfx)
            out = rewebp(srcf.read_bytes(), alt)
            assert alt.encode('utf-8') in out
            (STG / dstn).write_bytes(out)
            shutil.copy2(STG / dstn, DST / dstn)
            done += 1
            # 双方法: ① 字节搜新 alt ② 回读文件再搜一次 + 文件可被 PIL 打开
            data = (DST / dstn).read_bytes()
            ok = alt.encode('utf-8') in data and b'Exif\x00\x00' in data
            verified += bool(ok)
print('swapped: %d/72, byte-verified: %d' % (done, verified))
assert done == 72 and verified == 72

# ---- ③ cartoon ja 补 2 行 + legacy 修指 ----
cart_old = "      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-2.webp',\n    ],"
cart_new = ("      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-2.webp',\n"
            "      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-3.webp',\n"
            "      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-4.webp',\n    ],")
i = t.index("slug: 'cartoon-red-packets'", base)
seg = t[i:i+4500]
assert cart_old in seg
t = t[:i] + seg.replace(cart_old, cart_new, 1) + t[i+4500:]

for slug in MAP:
    old = "images: ['/images/products/%s.jpg']," % slug
    new = "images: ['/images/products/seedream-webp/zprintpro-red-packets-%s-zh-hk.webp']," % MAP[slug][1]
    assert t.count(old) == 1, slug
    t = t.replace(old, new)

io.open(ts_path, 'w', encoding='utf-8', newline='\n').write(t)
print('products.ts written: alt×18 + cartoon ja +2 + legacy ×6')
