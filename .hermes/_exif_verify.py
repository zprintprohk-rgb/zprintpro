# -*- coding: utf-8 -*-
# EXIF alt 双方法验证: ① webp 原始字节搜 alt UTF-8 ② PIL getexif
from pathlib import Path
ALT = {
 'zh-hk': '卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 每卷1,000張 | 智印港',
 'en': 'Custom Roll Labels on 4cm cores, 1,000 per roll for label applicators | ZprintPro',
 'ja': 'ロールラベル 印刷 | 巻芯径4cm・1巻1,000枚・ラベラー対応 | ZprintPro',
}
WEBP = Path(r'F:\zprintpro-nextjs\public\images\products\seedream-webp')
ok = 0
for loc, nmax in (('zh-hk', 3), ('en', 4), ('ja', 4)):
    alt = ALT[loc]
    for n in range(1, nmax + 1):
        p = WEBP / ('zprintpro-stickers-roll-stickers-%s-%d.webp' % (loc, n))
        data = p.read_bytes()
        m1 = alt.encode('utf-8') in data
        print('%s  %dKB  bytesearch=%s' % (p.name, p.stat().st_size // 1024, m1))
        ok += bool(m1)
print('ALT embedded in %d/11 webp files' % ok)
