"""填 6 文件 price-tables tier 阶梯 (stickers + flyers × 3 locale) - 8/3 10:15 提前开工"""
import io, json, os, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 3 locale
LOCALES = {
    "zh-hk": {"currency": "HKD", "fx": 1.0, "lead_label": "工作天"},
    "en":    {"currency": "USD", "fx": 0.128, "lead_label": "days"},
    "ja":    {"currency": "JPY", "fx": 19.5, "lead_label": "営業日"},
}

# 2 类目 (K3 04:29 拍板 5 类目剩 2)
CATEGORIES = {
    "stickers": {
        "zh-hk": {"label": "貼紙", "name": "貼紙印刷訂製",
                  "description": "透明貼、防水貼、啞光貼、亮光貼、燙金貼等多款貼紙, 50 張起印, 3-5 個工作天"},
        "en":    {"label": "Stickers", "name": "Custom Sticker Printing",
                  "description": "Transparent, waterproof, matte, glossy, foil-kiss-cut stickers. 50 MOQ, 3-5 day turnaround."},
        "ja":    {"label": "ステッカー", "name": "オリジナルステッカー印刷",
                  "description": "透明、防水、マット、グロス、ホイルキスカットステッカーなど多種類。50枚から、3-5営業日で出荷。"},
        # HKD 单价基准 (贴纸单价低)
        "unit_hkd": {
            "small":  {"qty": [50, 100, 250, 500, 1000, 2000, 5000, 10000], "unit_price": [1.5, 1.0, 0.65, 0.45, 0.30, 0.22, 0.15, 0.10]},
            "medium": {"qty": [50, 100, 250, 500, 1000, 2000, 5000, 10000], "unit_price": [2.4, 1.6, 1.05, 0.72, 0.48, 0.36, 0.24, 0.18]},
            "large":  {"qty": [50, 100, 250, 500, 1000, 2000, 5000, 10000], "unit_price": [3.5, 2.4, 1.55, 1.05, 0.72, 0.52, 0.36, 0.26]},
        },
        "lead": {"zh-hk": "3-5 個工作天", "en": "3-5 business days", "ja": "3-5 営業日"},
    },
    "flyers": {
        "zh-hk": {"label": "宣傳單張", "name": "宣傳單張印刷",
                  "description": "A3 / A4 / A5 / 客製尺寸宣傳單張, 105g 銅版紙 / 157g 雙粉紙 / 騎馬釘裝, 100 張起印, 1-3 個工作天"},
        "en":    {"label": "Flyers", "name": "Custom Flyer Printing",
                  "description": "A3 / A4 / A5 / custom size flyers, 105g coated / 157g matte / saddle-stitch. 100 MOQ, 1-3 day turnaround."},
        "ja":    {"label": "フライヤー", "name": "オリジナルフライヤー印刷",
                  "description": "A3 / A4 / A5 / オリジナルサイズフライヤー、105g コート紙 / 157g マット紙 / 中綴じ製本。100枚から、1-3営業日で出荷。"},
        "unit_hkd": {
            "small":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [0.55, 0.40, 0.28, 0.20, 0.15, 0.13, 0.11, 0.09]},
            "medium": {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [0.85, 0.62, 0.45, 0.32, 0.24, 0.21, 0.18, 0.14]},
            "large":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [1.20, 0.88, 0.65, 0.46, 0.35, 0.30, 0.25, 0.20]},
        },
        "lead": {"zh-hk": "1-3 個工作天", "en": "1-3 business days", "ja": "1-3 営業日"},
    },
}

# 3 size
SIZES = {
    "small":  {"zh-hk": "小 (50×50 mm 圓角方)", "en": "Small (50×50 mm rounded square)", "ja": "小 (50×50 mm 角丸)"},  # 贴纸用 50mm
    "medium": {"zh-hk": "中 (A5 148×210 mm)",     "en": "Medium (A5 148×210 mm)",          "ja": "中 (A5 148×210 mm)"},
    "large":  {"zh-hk": "大 (A4 210×297 mm)",     "en": "Large (A4 210×297 mm)",            "ja": "大 (A4 210×297 mm)"},
}

# size 标签 - 贴纸 vs 宣传单张 size 略不同
SIZE_LABELS = {
    "stickers": {
        "small":  {"zh-hk": "小 (圓 50mm / 方 50×50 mm)",     "en": "Small (round 50mm / square 50×50 mm)",     "ja": "小 (円形 50mm / 角形 50×50 mm)"},
        "medium": {"zh-hk": "中 (圓 80mm / 方 70×100 mm)",    "en": "Medium (round 80mm / square 70×100 mm)",   "ja": "中 (円形 80mm / 角形 70×100 mm)"},
        "large":  {"zh-hk": "大 (圓 100mm / 方 100×150 mm)",   "en": "Large (round 100mm / square 100×150 mm)",  "ja": "大 (円形 100mm / 角形 100×150 mm)"},
    },
    "flyers": {
        "small":  {"zh-hk": "小 (A5 148×210 mm)",    "en": "Small (A5 148×210 mm)",    "ja": "小 (A5 148×210 mm)"},
        "medium": {"zh-hk": "中 (A4 210×297 mm)",    "en": "Medium (A4 210×297 mm)",   "ja": "中 (A4 210×297 mm)"},
        "large":  {"zh-hk": "大 (A3 297×420 mm)",    "en": "Large (A3 297×420 mm)",    "ja": "大 (A3 297×420 mm)"},
    },
}

root = "src/data/price-tables"
written = []

for cat_key, cat_data in CATEGORIES.items():
    for loc, loc_data in LOCALES.items():
        meta = cat_data[loc]
        currency = loc_data["currency"]
        fx = loc_data["fx"]

        tiers = []
        for size_key in ["small", "medium", "large"]:
            size_label = SIZE_LABELS[cat_key][size_key][loc]
            unit_data = cat_data["unit_hkd"][size_key]
            for i, qty in enumerate(unit_data["qty"]):
                hkd_price = unit_data["unit_price"][i]
                # currency 转换
                if currency == "HKD":
                    unit_price = round(hkd_price, 3)
                elif currency == "USD":
                    unit_price = round(hkd_price * fx, 4)
                elif currency == "JPY":
                    unit_price = round(hkd_price * fx)  # JPY 不带小数

                tier = {
                    "size": size_key,
                    "size_label": size_label,
                    "qty": qty,
                    "unit_price": unit_price,
                    "currency": currency,
                    "lead_time": cat_data["lead"][loc],
                }
                tiers.append(tier)

        skeleton = {
            "category": cat_key,
            "currency": currency,
            "label": meta["label"],
            "name": meta["name"],
            "description": meta["description"],
            "tiers": tiers,
            "source": "M3 2026-08-03 §11 主营品類透明定價 (K3 04:29 拍板, 不依賴 eprint 實時詢價)",
            "fx_rate": {"HKD": 1.0, "USD": 0.128, "JPY": 19.5},
            "last_updated": "2026-08-03",
        }

        path = f"{root}/{loc}/{cat_key}.json"
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(skeleton, f, ensure_ascii=False, indent=2)
            f.write("\n")
        written.append(path)
        print(f"  wrote {path}  ({len(tiers)} tiers)")

print(f"\nTotal: {len(written)} files")
