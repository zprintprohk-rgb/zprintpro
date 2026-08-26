import io, json, os, sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 5 类目 (§11 主营, 避开 business-cards 禁区)
CATEGORIES = ["stickers", "flyers", "packaging", "paper-bags", "labels"]

# 3 locale (§13.10 NAP 脱钩, currency 跟 locale)
LOCALES = {
    "zh-hk": "HKD",
    "en": "USD",
    "ja": "JPY",
}

# §13.16.1 zh-hk 100% 繁体
SCHEMAS = {
    "zh-hk": {
        "stickers":   {"label": "貼紙",     "name": "貼紙印刷",       "description": "專業貼紙印刷服務,支援多種尺寸、形狀、材質、數量"},
        "flyers":     {"label": "宣傳單張", "name": "宣傳單張印刷",   "description": "A3/A4/A5/客製尺寸宣傳單張印刷,即日交貨、低價優惠"},
        "packaging":  {"label": "包裝盒",   "name": "包裝盒印刷訂製", "description": "抽屜盒、天地盒、書型盒、磁吸盒等多款包裝盒訂製"},
        "paper-bags": {"label": "紙袋",     "name": "紙袋印刷訂製",   "description": "牛皮紙袋、白卡紙袋、銅版紙袋等多款紙袋訂製"},
        "labels":     {"label": "標籤",     "name": "標籤印刷訂製",   "description": "食品標籤、產品標籤、物流標籤、條碼標籤印刷"},
    },
    "en": {
        "stickers":   {"label": "Stickers",       "name": "Custom Sticker Printing",         "description": "Custom stickers with multiple sizes, shapes, materials, and quantities. Free design mockup."},
        "flyers":     {"label": "Flyers",         "name": "Custom Flyer Printing",           "description": "A3/A4/A5/custom size flyer printing, same-day delivery, low-price guarantee."},
        "packaging":  {"label": "Packaging",      "name": "Custom Packaging Box Printing",   "description": "Drawer boxes, lid boxes, book-style boxes, magnetic boxes, and more."},
        "paper-bags": {"label": "Paper Bags",     "name": "Custom Paper Bag Printing",       "description": "Kraft paper bags, white card bags, coated paper bags, and more."},
        "labels":     {"label": "Labels",         "name": "Custom Label Printing",           "description": "Food labels, product labels, shipping labels, barcode labels."},
    },
    "ja": {
        "stickers":   {"label": "ステッカー",   "name": "オリジナルステッカー印刷",       "description": "オリジナルステッカーを様々なサイズ、形、素材、枚数で印刷。デザイン無料対応。"},
        "flyers":     {"label": "フライヤー", "name": "オリジナルフライヤー印刷",         "description": "A3/A4/A5/オリジナルサイズフライヤー印刷、当日出荷、低価格保証。"},
        "packaging":  {"label": "パッケージ", "name": "オリジナルパッケージ箱印刷",       "description": "引き出し箱、フタ箱、ブック型箱、マグネット式箱など多種類のパッケージ箱を特注対応。"},
        "paper-bags": {"label": "紙袋",       "name": "オリジナル紙袋印刷",               "description": "クラフト紙袋、ホワイトカード紙袋、コート紙袋など多種類の紙袋を特注対応。"},
        "labels":     {"label": "ラベル",     "name": "オリジナルラベル印刷",             "description": "食品ラベル、製品ラベル、物流ラベル、バーコードラベル印刷。"},
    },
}

root = "src/data/price-tables"
os.makedirs(f"{root}/zh-hk", exist_ok=True)
os.makedirs(f"{root}/en", exist_ok=True)
os.makedirs(f"{root}/ja", exist_ok=True)
written = []

for loc, currency in LOCALES.items():
    for cat in CATEGORIES:
        meta = SCHEMAS[loc][cat]
        skeleton = {
            "category": cat,
            "size": "default",
            "currency": currency,
            "label": meta["label"],
            "name": meta["name"],
            "description": meta["description"],
            "tiers": []
        }
        path = f"{root}/{loc}/{cat}.json"
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(skeleton, f, ensure_ascii=False, indent=2)
            f.write("\n")
        written.append(path)
        print(f"  wrote {path}")

print(f"\nTotal: {len(written)} files")
