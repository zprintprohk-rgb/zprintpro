"""填 9 文件 price-tables tier 阶梯 (paper-bags + corrugated + rigid × 3 locale)"""
import io, json, os, sys
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

# 3 locale
LOCALES = {
    "zh-hk": {"currency": "HKD", "fx": 1.0, "rate_label": "港幣", "lead_label": "工作天"},
    "en":    {"currency": "USD", "fx": 0.128, "rate_label": "USD", "lead_label": "days"},
    "ja":    {"currency": "JPY", "fx": 19.5, "rate_label": "円", "lead_label": "営業日"},
}

# 3 类目 (K3 04:29 拍板 5 类目前 3)
CATEGORIES = {
    "paper-bags": {
        "zh-hk": {"label": "紙袋", "name": "紙袋印刷訂製", "description": "牛皮紙袋、白卡紙袋、銅版紙袋等多款紙袋訂製, 100 個起印, 5-7 個工作天交付"},
        "en":    {"label": "Paper Bags", "name": "Custom Paper Bag Printing", "description": "Kraft paper bags, white card bags, coated paper bags, custom sizes. 100 MOQ, 5-7 day turnaround."},
        "ja":    {"label": "紙袋", "name": "オリジナル紙袋印刷", "description": "クラフト紙袋、ホワイトカード紙袋、コート紙袋など多種類の紙袋を特注対応。100個から、5-7営業日で出荷。"},
        # HKD 单价基准
        "unit_hkd": {
            "small":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [4.8, 3.5, 2.6, 2.0, 1.65, 1.45, 1.25, 1.05]},
            "medium": {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [7.2, 5.4, 4.0, 3.0, 2.5, 2.2, 1.9, 1.6]},
            "large":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [10.5, 7.8, 5.8, 4.4, 3.6, 3.2, 2.7, 2.3]},
        },
        "lead_hkd": "5-7 個工作天",
    },
    "corrugated-boxes": {
        "zh-hk": {"label": "瓦通盒", "name": "瓦通紙盒印刷訂製", "description": "三層/五層瓦通紙盒, 適用於電商物流、食品包裝、工業包裝, 100 個起印, 5-7 個工作天"},
        "en":    {"label": "Corrugated Boxes", "name": "Custom Corrugated Box Printing", "description": "3-ply / 5-ply corrugated boxes, ideal for e-commerce, food packaging, industrial shipping. 100 MOQ, 5-7 day turnaround."},
        "ja":    {"label": "ダンボール箱", "name": "オリジナルダンボール箱印刷", "description": "3層/5層ダンボール箱、EC物流、食品包装、工業包装に最適。100個から、5-7営業日で出荷。"},
        "unit_hkd": {
            "small":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [5.5, 4.0, 3.0, 2.3, 1.9, 1.65, 1.4, 1.2]},
            "medium": {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [8.0, 6.0, 4.5, 3.4, 2.8, 2.4, 2.1, 1.75]},
            "large":  {"qty": [100, 250, 500, 1000, 2000, 3000, 5000, 10000], "unit_price": [12.0, 9.0, 6.8, 5.0, 4.1, 3.5, 3.0, 2.5]},
        },
        "lead_hkd": "5-7 個工作天",
    },
    "rigid-boxes": {
        "zh-hk": {"label": "硬盒", "name": "硬紙盒印刷訂製", "description": "天地盒、書型盒、磁吸盒、抽屜盒等高檔硬紙盒, 適合禮品/化妝品/電子產品, 50 個起印, 7-10 個工作天"},
        "en":    {"label": "Rigid Boxes", "name": "Custom Rigid Box Printing", "description": "Lid boxes, book-style boxes, magnetic boxes, drawer boxes for premium gifts, cosmetics, electronics. 50 MOQ, 7-10 day turnaround."},
        "ja":    {"label": "堅牢箱", "name": "オリジナル堅牢紙箱印刷", "description": "フタ箱、ブック型箱、マグネット式箱、引き出し箱など高級紙箱、ギフト/化粧品/電子製品向け。50個から、7-10営業日で出荷。"},
        "unit_hkd": {
            "small":  {"qty": [50, 100, 250, 500, 1000, 2000, 3000, 5000], "unit_price": [22.0, 16.5, 12.5, 9.5, 7.5, 6.3, 5.5, 4.8]},
            "medium": {"qty": [50, 100, 250, 500, 1000, 2000, 3000, 5000], "unit_price": [32.0, 24.0, 18.0, 13.5, 10.5, 8.8, 7.7, 6.7]},
            "large":  {"qty": [50, 100, 250, 500, 1000, 2000, 3000, 5000], "unit_price": [45.0, 33.5, 25.0, 18.5, 14.5, 12.0, 10.5, 9.0]},
        },
        "lead_hkd": "7-10 個工作天",
    },
}

# 3 size (small/medium/large)
SIZES = {
    "small":  {"zh": "小 (A5 / 10×15×5 cm)", "en": "Small (A5 / 10×15×5 cm)", "ja": "小 (A5 / 10×15×5 cm)"},
    "medium": {"zh": "中 (A4 / 20×15×8 cm)", "en": "Medium (A4 / 20×15×8 cm)", "ja": "中 (A4 / 20×15×8 cm)"},
    "large":  {"zh": "大 (A3 / 30×20×10 cm)", "en": "Large (A3 / 30×20×10 cm)", "ja": "大 (A3 / 30×20×10 cm)"},
}

# lead time (跟 locale)
LEAD = {
    "paper-bags":        {"zh-hk": "5-7 個工作天", "en": "5-7 business days", "ja": "5-7 営業日"},
    "corrugated-boxes":  {"zh-hk": "5-7 個工作天", "en": "5-7 business days", "ja": "5-7 営業日"},
    "rigid-boxes":       {"zh-hk": "7-10 個工作天", "en": "7-10 business days", "ja": "7-10 営業日"},
}

root = "src/data/price-tables"
written = []

for cat_key, cat_data in CATEGORIES.items():
    for loc, loc_data in LOCALES.items():
        meta = cat_data[loc]
        currency = loc_data["currency"]
        fx = loc_data["fx"]

        tiers = []
        for size_key, size_data in SIZES.items():
            size_label = size_data[loc[:2] if loc in ("zh-hk","en","ja") else "en"]
            unit_data = cat_data["unit_hkd"][size_key]
            for i, qty in enumerate(unit_data["qty"]):
                hkd_price = unit_data["unit_price"][i]
                # currency 转换 (保留 2-3 位小数)
                if currency == "HKD":
                    unit_price = round(hkd_price, 2)
                elif currency == "USD":
                    unit_price = round(hkd_price * fx, 3)
                elif currency == "JPY":
                    unit_price = round(hkd_price * fx)  # JPY 不带小数

                tier = {
                    "size": size_key,
                    "size_label": size_label,
                    "qty": qty,
                    "unit_price": unit_price,
                    "currency": currency,
                    "lead_time": LEAD[cat_key][loc],
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
