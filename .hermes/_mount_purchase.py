# -*- coding: utf-8 -*-
"""Mount PdpPurchaseButtons into ProductPageV9 above the CTA row."""
import io

p = r"F:\zprintpro-nextjs" + "\\" + r"src\app\[locale]\product\[slug]\v9\ProductPageV9.tsx"
s = io.open(p, encoding="utf-8", newline="").read()

anchor = "import { parseInlineLinks } from '@/utils/parseInlineLinks';"
assert anchor in s, "import anchor missing"
assert "PdpPurchaseButtons" not in s, "already mounted"
s = s.replace(anchor, anchor + "\n" + "import PdpPurchaseButtons from '@/components/product/PdpPurchaseButtons';", 1)

cta = "          {/* CTA 行 */}"
assert cta in s, "CTA anchor missing"
mount = (
    "          {/* K3 2026-10-29 拍板「立即購買」: 購買按鈕區 (數量 + 加入購物車 + 立即購買; 幣種口徑 = feed 同源) */}\n"
    "          <PdpPurchaseButtons product={product} locale={locale} />\n\n"
)
s = s.replace(cta, mount + cta, 1)

io.open(p, "w", encoding="utf-8", newline="").write(s)
print("mounted OK; import:", "PdpPurchaseButtons from" in s, "| mount:", "product={product} locale={locale}" in s)
