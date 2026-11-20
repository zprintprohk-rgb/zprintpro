# -*- coding: utf-8 -*-
"""
_process_factory_images.py
============================
F:\\工厂图片 47 张 jpg 处理 → 调色 + 缩放 + 转 webp ≤120KB 上传
2026-08-16 K3 8/16 08:53 拍板 0 浪费 + K3 确认后再 push

策略:
  1. 调色: 自动白平衡 (灰度世界算法) + 对比度 +1.15 + 饱和度 +1.10 + 锐化 50%
  2. 缩放: 长边 ≤ 1600px (webp 压缩)
  3. webp 质量: 80 (高) → 70 (中) → 60 (低) 动态调整, 目标 ≤120KB
  4. 输出: F:\\zprintpro-nextjs\\public\\images\\factory\\*_*.webp

K3 8/16 拍板 "思考理解问题, 分析研究后给到答案" + 0 浪费:
  - 一次跑全部入选图, 不返工
  - 输出 manifest.json 记录尺寸/质量/文件大小, 供 K3 验收
"""
import os
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageFilter
import numpy as np

# ── 路径配置 ──────────────────────────────────────────────────────────────
SRC_DIR = Path("F:/工厂图片")
DST_DIR = Path("F:/zprintpro-nextjs/public/images/factory")
MANIFEST_PATH = Path("F:/zprintpro-nextjs/.hermes/k3-inbox/factory_image_manifest.json")

# ── K3 8/16 拍板入选清单 (4 大类 8 张代表) ──────────────────────────────────
# 覆盖: 海德堡车间 × 3 / 烫金礼盒 × 2 / 黑色礼盒 × 2 / 工艺细节 × 1
SELECTED = [
    # 工厂实力 (海德堡 Speedmaster + 车间全景)
    {
        "src": "20260814_204202.jpg",
        "out": "factory-heidelberg-speedmaster-with-boxes.webp",
        "title_en": "Heidelberg Speedmaster 4-color offset press producing premium gift boxes",
        "title_zh": "海德堡四色柯式印刷機 — 高端禮盒生產線",
        "title_ja": "Heidelberg スピードマスター 4色オフセット印刷機",
        "alt_zh": "海德堡四色柯式印刷機正在印刷高端禮盒 — ZprintPro 深圳工廠核心設備",
        "alt_en": "Heidelberg Speedmaster 4-color offset press producing premium gift boxes at ZprintPro Shenzhen factory",
        "alt_ja": "Heidelberg Speedmaster 4色オフセット印刷機が高級ギフトボックスを印刷中 — ZprintPro深圳工場",
        "category": "factory_equipment",
        "priority": 1,
    },
    {
        "src": "20260814_214908.jpg",
        "out": "factory-production-floor-pano.webp",
        "title_en": "ZprintPro production floor — folding machines and finishing line",
        "title_zh": "ZprintPro 印刷車間全景 — 摺紙機 + 後道加工線",
        "title_ja": "ZprintPro 印刷工場パノラマ — 折機 + 後加工ライン",
        "alt_zh": "ZprintPro 深圳印刷車間全景 — 摺紙機和後道加工線一覽",
        "alt_en": "ZprintPro Shenzhen production floor panoramic view with folding machines and finishing line",
        "alt_ja": "ZprintPro深圳印刷工場のパノラマビュー — 折機と後加工ライン",
        "category": "factory_equipment",
        "priority": 2,
    },
    {
        "src": "20260814_215004.jpg",
        "out": "factory-folding-machine-line.webp",
        "title_en": "Folding and binding machine line for booklets and packaging",
        "title_zh": "摺紙 + 裝訂機 — 書刊和包裝盒專用後道線",
        "title_ja": "折機 + 製本ライン — 冊子とパッケージボックス専用",
        "alt_zh": "ZprintPro 摺紙裝訂一體機 — 書刊和包裝盒專用後道線",
        "alt_en": "ZprintPro folding and binding integrated machine line for booklets and packaging",
        "alt_ja": "ZprintPro 折機 + 製本一体型ライン — 冊子とパッケージボックス専用",
        "category": "factory_equipment",
        "priority": 3,
    },
    # 高端烫金成品 (工艺 + 美感)
    {
        "src": "20260803_194451.jpg",
        "out": "showcase-hot-stamping-snake-year-card.webp",
        "title_en": "Hot-stamped snake year premium greeting card with circular gold foil design",
        "title_zh": "蛇年燙金賀卡 — 圓形金箔 + 燙金工藝展示",
        "title_ja": "干支（巳年）ホイルスタンピンググリーティングカード",
        "alt_zh": "蛇年燙金賀卡 — 圓形金箔浮雕工藝，ZprintPro 燙金工藝代表作品",
        "alt_en": "Snake year hot-stamped greeting card with circular gold foil embossed design — ZprintPro signature hot-stamping craft",
        "alt_ja": "干支（巳年）ホイルスタンピンググリーティングカード — ZprintPro シグネチャー",
        "category": "showcase_finish",
        "priority": 4,
    },
    {
        "src": "20260803_195142.jpg",
        "out": "showcase-premium-red-gift-box.webp",
        "title_en": "Premium red gift box with gold foil flame pattern and New Year theme",
        "title_zh": "高端紅色禮盒 — 燙金火焰紋 + 新年主題",
        "title_ja": "プレミアム赤ギフトボックス — 金箔フレーム + 新年テーマ",
        "alt_zh": "高端紅色禮盒 — 燙金火焰紋樣 + 新年主題，ZprintPro 高端定制代表",
        "alt_en": "Premium red gift box with hot-stamped gold flame pattern and New Year theme — ZprintPro premium custom showcase",
        "alt_ja": "プレミアム赤ギフトボックス — 金箔フレーム柄 + 新年テーマ",
        "category": "showcase_finish",
        "priority": 5,
    },
    # 黑色礼盒 (产品广度 + 工艺)
    {
        "src": "20260803_195641.jpg",
        "out": "showcase-rigid-box-cabinet.webp",
        "title_en": "ZprintPro premium rigid box sample cabinet — 50+ styles for global brands",
        "title_zh": "ZprintPro 高端硬盒樣品櫃 — 50+ 款全球品牌",
        "title_ja": "ZprintPro プレミアム硬質ボックスサンプルキャビネット — 50種以上",
        "alt_zh": "ZprintPro 深圳工廠高端硬盒樣品櫃 — 50+ 款全球品牌定制案例展示",
        "alt_en": "ZprintPro Shenzhen factory premium rigid box sample cabinet — 50+ custom case studies for global brands",
        "alt_ja": "ZprintPro深圳工場プレミアム硬質ボックスサンプル — 50種以上のグローバルブランド事例",
        "category": "showcase_product",
        "priority": 6,
    },
    {
        "src": "20260806_193450.jpg",
        "out": "showcase-rigid-box-interior-hot-stamping.webp",
        "title_en": "Rigid gift box interior with hot-stamped gold text and tactile finish",
        "title_zh": "高端硬盒內部 — 燙金文字 + 觸感紙工藝",
        "title_ja": "高級硬質ボックス内部 — ホットスタンピング金文字 + 触感紙",
        "alt_zh": "高端硬盒內部結構 — 燙金文字 + 觸感紙內襯，ZprintPro 細節工藝",
        "alt_en": "Premium rigid gift box interior with hot-stamped gold text and tactile paper lining — ZprintPro detail craftsmanship",
        "alt_ja": "高級硬質ボックス内部構造 — 金箔文字 + 触感紙ライニング",
        "category": "showcase_product",
        "priority": 7,
    },
    {
        "src": "20260806_193633.jpg",
        "out": "showcase-rigid-box-palletized.webp",
        "title_en": "Rigid gift boxes palletized for global fulfillment and shipping",
        "title_zh": "高端硬盒碼垛 — 全球履約出貨",
        "title_ja": "硬質ギフトボックスパレット化 — グローバル配送",
        "alt_zh": "ZprintPro 高端硬盒碼垛出貨 — 全球 50+ 國履約能力",
        "alt_en": "ZprintPro premium rigid gift boxes palletized for global fulfillment and shipping to 50+ countries",
        "alt_ja": "ZprintPro プレミアム硬質ギフトボックスのパレット化 — 50か国以上配送",
        "category": "showcase_product",
        "priority": 8,
    },
]


# ── 调色算法 (灰度世界 + 对比 + 饱和 + 锐化) ─────────────────────────────
def auto_white_balance_gray_world(img: Image.Image) -> Image.Image:
    """灰度世界算法: 假设整图平均 R=G=B"""
    arr = np.array(img).astype(np.float32)
    avg_r = arr[..., 0].mean()
    avg_g = arr[..., 1].mean()
    avg_b = arr[..., 2].mean()
    avg_gray = (avg_r + avg_g + avg_b) / 3
    if avg_r > 0:
        arr[..., 0] = np.clip(arr[..., 0] * (avg_gray / avg_r), 0, 255)
    if avg_g > 0:
        arr[..., 1] = np.clip(arr[..., 1] * (avg_gray / avg_g), 0, 255)
    if avg_b > 0:
        arr[..., 2] = np.clip(arr[..., 2] * (avg_gray / avg_b), 0, 255)
    return Image.fromarray(arr.astype(np.uint8))


def enhance_image(img: Image.Image) -> Image.Image:
    """调色: 白平衡 → 对比度 +1.15 → 饱和度 +1.10 → 锐化 50%"""
    img = auto_white_balance_gray_world(img)
    img = ImageEnhance.Contrast(img).enhance(1.15)
    img = ImageEnhance.Color(img).enhance(1.10)
    img = ImageEnhance.Sharpness(img).enhance(1.5)
    return img


def resize_long_edge(img: Image.Image, max_long: int = 1600) -> Image.Image:
    """长边缩放到 max_long (保持比例)"""
    w, h = img.size
    if max(w, h) <= max_long:
        return img
    if w > h:
        new_w = max_long
        new_h = int(h * max_long / w)
    else:
        new_h = max_long
        new_w = int(w * max_long / h)
    return img.resize((new_w, new_h), Image.LANCZOS)


def save_webp_with_target_size(img: Image.Image, out_path: Path, target_kb: int = 120) -> int:
    """动态 webp 质量调整: 80 → 70 → 60, 找到 ≤ target_kb 的最高质量"""
    for q in [85, 80, 75, 70, 65, 60, 55]:
        img.save(out_path, "WEBP", quality=q, method=6, optimize=True)
        size_kb = out_path.stat().st_size / 1024
        if size_kb <= target_kb:
            return int(size_kb), q
    return int(out_path.stat().st_size / 1024), 50  # fallback


# ── 主流程 ──────────────────────────────────────────────────────────────
def main():
    DST_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    print(f"=== 开始处理 {len(SELECTED)} 张代表图 ===\n")
    for item in SELECTED:
        src_path = SRC_DIR / item["src"]
        if not src_path.exists():
            print(f"  ❌ 缺失: {src_path}")
            continue
        out_path = DST_DIR / item["out"]
        print(f"  [{item['priority']}] {item['src']} → {item['out']}")

        # 1. 读图
        img = Image.open(src_path)
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        orig_size = img.size
        orig_kb = src_path.stat().st_size / 1024

        # 2. 调色 + 缩放
        img = enhance_image(img)
        img = resize_long_edge(img, 1600)
        new_w, new_h = img.size

        # 3. webp 压缩
        final_kb, final_q = save_webp_with_target_size(img, out_path, target_kb=120)

        # 4. 记录
        manifest.append({
            "src": str(src_path),
            "dst": str(out_path),
            "out_filename": item["out"],
            "title_zh": item["title_zh"],
            "title_en": item["title_en"],
            "title_ja": item["title_ja"],
            "alt_zh": item["alt_zh"],
            "alt_en": item["alt_en"],
            "alt_ja": item["alt_ja"],
            "category": item["category"],
            "priority": item["priority"],
            "orig_dimensions": f"{orig_size[0]}x{orig_size[1]}",
            "new_dimensions": f"{new_w}x{new_h}",
            "orig_kb": int(orig_kb),
            "final_kb": final_kb,
            "final_quality": final_q,
        })
        status = "✅" if final_kb <= 120 else "⚠️"
        print(f"      {orig_size[0]}x{orig_size[1]} ({orig_kb:.0f}KB) → {new_w}x{new_h} ({final_kb}KB q={final_q}) {status}")

    # 5. 写 manifest
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n=== 全部完成 ===")
    print(f"输出: {DST_DIR}")
    print(f"Manifest: {MANIFEST_PATH}")
    total_kb = sum(m["final_kb"] for m in manifest)
    print(f"合计: {total_kb}KB ({total_kb/1024:.1f}MB) / {len(manifest)} 张")


if __name__ == "__main__":
    main()
