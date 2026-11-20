# -*- coding: utf-8 -*-
"""Cluster4 supplement: replace folding-boxes zh body line (mailer-template clone)."""
import io, os, re, shutil, sys

ROOT = r"F:\zprintpro-nextjs"
MODE = "apply" if "--apply" in sys.argv else "verify"
BAK = os.path.join(ROOT, ".hermes", "_bak-b1c4-20261015")
TS_PATH = os.path.join(ROOT, "src", "data", "sku-seo-data.ts")

errors = []
def check(cond, msg):
    print(("  OK  " if cond else "  FAIL ") + msg)
    if not cond:
        errors.append(msg)

NEW = ('"body": "折疊盒印刷訂製，100 個起印、HK$2.5-15/個，300g-350g 白卡或 E 坑瓦楞可選。自動鎖底結構通過 80cm 跌落測試（5kg 載重不開口），'
'平板出貨節省 70% 以上倉儲空間——發貨時是一疊紙皮，上架時是成型硬盒。提交設計檔案 1 小時內免費數碼打稿，30 秒 AI 報價即時試算。'
'\\n\\n電商賣家的倉儲帳要這樣算：同一批包裝，成品盒佔用空間是摺平狀態的三倍以上。折疊盒以平板狀態交貨，'
'旺季前大量備貨不搶倉位，出貨前現場摺合成型即可；摺痕角度出廠前已壓好，附免費展開圖（刀模線）與組裝指引，收貨即摺即用。'
'\\n\\n材質與加固決策：300g-350g 白卡適合 1kg 內的零售裝；E 坑瓦楞加固適合較重電商產品；啞膜/光膜防刮耐磨，'
'局部 UV 點綴品牌位；燙金條碼一版兩用——金／銀箔品牌位與可變條碼物流掃描位共存同一面板。'
'\\n\\n盒型結構：自動鎖底插口盒、直插/反插、天地蓋、書型盒、抽屜式及異形切割，全部支援 CMYK 全彩；'
'需要直接接觸食品或防油防濕，轉 [食品包裝盒](/zh-hk/product/food-boxes/)（FDA 食品級 + PE/PLA 防油內層）；'
'重載運輸看 [快遞盒/飛機盒](/zh-hk/product/mailer-boxes/)；高級禮盒看 [精裝盒](/zh-hk/product/rigid-boxes/)；'
'盒型總覽見 [包裝盒印刷類目](/zh-hk/category/packaging/)。'
'\\n\\n交稿與收費：300 DPI、CMYK、3mm 出血、字體外框化，1 小時免費打稿、無開版費；'
'100 個起印（自訂尺寸/異形 500 個起），標準生產 5-7 個工作天，加急（24 小時打稿 + 2 天生產）加收 20%；'
'港九新界順豐 1-2 天送達，跨境 DHL 2-4 天，美國 $99+ 免運。'
'\\n\\n**常見問題**'
'\\n\\n**Q1: 折疊盒同精裝盒點揀？**'
'\\n平放貨品、要慳倉慳運費，摺疊盒；高級手感、結構固定、冇得摺，精裝盒。電商日常出貨用摺疊盒，年度禮盒先上精裝。'
'\\n\\n**Q2: 自動鎖底穩唔穩？**'
'\\n穩。自動鎖底插口結構通過 80cm 跌落測試，5kg 載重不開口；更重的貨升級 E 坑瓦楞。'
'\\n\\n**Q3: 可以印條碼或者加窗口嗎？**'
'\\n可以。燙金條碼（含可變數據）支援品牌與物流掃描兼顧；PET 透明窗口可展示內裝產品。'
'\\n\\n**Q4: 起訂量同交期？**'
'\\n100 個起印，標準 5-7 個工作天，加急（24 小時打稿 + 2 天生產）加收 20%；旺季建議提早 3-4 週落單。'
'\\n\\n準備好就落單——1 小時免費打稿，WhatsApp 客服 +86 198 8085 1334 或頁面「30 秒 AI 報價」按鈕。",')

PREFIX = '"body": "折疊盒 專為香港中小企、本地餐廳及跨境電商品牌設計。100 張起印'

raw = io.open(TS_PATH, encoding="utf-8", newline="").read()
lines = raw.split("\n")
# locate within folding block
si = raw.find('"folding-boxes": {')
ei = raw.find('\n  "', si + 4)
seg_start_line = raw[:si].count("\n")
seg_end_line = raw[:ei].count("\n") if ei > 0 else len(lines)
hits = [k for k in range(seg_start_line, seg_end_line + 1) if lines[k].strip().startswith(PREFIX)]
check(len(hits) == 1, "folding zh body line unique in block (hit=%d)" % len(hits))
if len(hits) == 1:
    k = hits[0]
    check("推廣單張" in lines[k] or "指示牌" in lines[k], "mailer template fingerprint confirmed in old line")
    if MODE == "apply":
        if errors:
            print("\nASSERTIONS FAILED — no write."); sys.exit(2)
        os.makedirs(BAK, exist_ok=True)
        shutil.copy2(TS_PATH, os.path.join(BAK, "sku-seo-data.ts.supplement.bak"))
        lines[k] = NEW
        io.open(TS_PATH, "w", encoding="utf-8", newline="").write("\n".join(lines))
        check(open(TS_PATH, "rb").read(2)[0] != 0xFF, "no BOM")
        print("WROTE folding zh body")
    else:
        print("VERIFY: 1 line pending")
print("TOTAL ERRORS: %d" % len(errors))
sys.exit(2 if errors else 0)
