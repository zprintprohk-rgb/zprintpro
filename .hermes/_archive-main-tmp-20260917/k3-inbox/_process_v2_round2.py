# -*- coding: utf-8 -*-
"""
_process_v2_round2.py
=====================
K3 8/16 09:18 拍板: 处理 9 张新中文命名图 (大红红金礼盒 + 黑色折叠盒 + 工艺 + 印刷样张)
关键修复: 之前灰度世界算法 (gray world) 让红色 over-corrected 变黑, 改用:
  1. 白点检测 (find brightest neutral pixel) → 真实白点校正
  2. 温和白平衡: 只微调 5-10%, 避免破坏原色彩
  3. 强饱和度 +1.25 提升红色鲜艳度
  4. 对比度 +1.10 + 锐化 50% 提升细节

K3 拍板 "把中文翻译为英文再进行 SEO+GEO 优化就是文件名了":
  → 中文 → 英文 SEO 关键词, 不含 supplier origin 城市 (§13.10 NAP 脱钩)
  → 全小写 + 连字符
  → 统一英文命名 (factory/ 不分 locale, 跟 image-alt-map.ts 风格一致)
"""
import os
import json
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

# ── 路径配置 ──────────────────────────────────────────────────────────────
SRC_DIR = Path("F:/zprintpro-nextjs/public/images/factory")  # K3 直接放到这里
DST_DIR = Path("F:/zprintpro-nextjs/public/images/factory")
MANIFEST_PATH = Path("F:/zprintpro-nextjs/.hermes/k3-inbox/factory_round2_manifest.json")

# ── 9 张新中文命名图 + 英文 SEO 命名 (per K3 9:18 拍板) ────────────────────
# 命名规则: 中文 → 英文 SEO 关键词
# - showcase-* = 成品展示 (高端礼盒/印刷品)
# - craft-* = 工艺细节 (手工/设备)
# - 不含 supplier origin 城市 (Shenzhen/深圳/中国)
# - 不含 en/ja/zh-hk 残留词
SELECTED = [
    {
        "src": "大红触感纸精品书型礼品盒.jpg",
        "out": "showcase-red-tactile-paper-book-style-gift-box-gold-foil.webp",
        "category": "showcase_premium",
        "sub_category": "red_lunar_new_year",
        "title_zh": "高端紅色觸感紙書型禮品盒 — 燙金印章工藝",
        "title_en": "Premium Red Tactile Paper Book-Style Gift Box with Gold Foil Seal",
        "title_ja": "プレミアム赤触感紙ブックスタイルギフトボックス — 金箔シール",
        "alt_zh": "高端紅色觸感紙書型禮品盒,燙金印章 + 半圓金箔紋樣,適合春節 / 婚慶 / 高端禮品場景",
        "alt_en": "Premium red tactile paper book-style gift box with hot-foil seal and circular gold foil pattern — ZprintPro signature Lunar New Year packaging, suitable for premium gifting and corporate events",
        "alt_ja": "プレミアム赤触感紙ブックスタイルギフトボックス — ホットフォイルシール + 円形金箔模様,ZprintPro シグネチャー春節パッケージ",
        "priority": 1,
    },
    {
        "src": "烫金高档精品天地礼品盒.jpg",
        "out": "showcase-red-hot-foil-tian-di-gift-box-lunar-new-year.webp",
        "category": "showcase_premium",
        "sub_category": "red_lunar_new_year",
        "title_zh": "燙金天地精品禮盒 — 喜迎新春 + 烟花圖案",
        "title_en": "Red Hot-Foil Tian Di Gift Box with Lunar New Year Fireworks",
        "title_ja": "赤金箔天地ギフトボックス — 春節花火模様",
        "alt_zh": "燙金紅色天地精品禮盒,燙金喜迎新春字 + 烟花圖案 + 高端燕窩禮品場景",
        "alt_en": "Red premium Tian Di gift box with hot-foil New Year greeting characters and fireworks pattern — ZprintPro custom seasonal packaging for bird's nest and premium food brands",
        "alt_ja": "赤天地ギフトボックス — ホットフォイル春節文字 + 花火模様,高級燕の巣/食品ギフト用",
        "priority": 2,
    },
    {
        "src": "连体翻盖精品礼品盒.jpg",
        "out": "showcase-red-conjoined-flip-lid-gift-box-gold-foil.webp",
        "category": "showcase_premium",
        "sub_category": "red_lunar_new_year",
        "title_zh": "連體翻蓋精品禮品盒 — 燙金文字工藝",
        "title_en": "Red Conjoined Flip-Lid Gift Box with Gold Foil Text",
        "title_ja": "赤連体翻蓋ギフトボックス — 金箔文字工芸",
        "alt_zh": "連體翻蓋紅色精品禮品盒,燙金文字工藝,高端婚慶 / 節慶 / 商務禮品場景",
        "alt_en": "Red conjoined flip-lid premium gift box with hot-foil text craftsmanship — ZprintPro signature design for wedding, festival, and corporate gifting",
        "alt_ja": "赤連体翻蓋高級ギフトボックス — ホットフォイル文字工芸,ZprintPro シグネチャー",
        "priority": 3,
    },
    {
        "src": "连体翻盖精品礼品盒打开内部.jpg",
        "out": "showcase-red-conjoined-box-interior-gold-lining.webp",
        "category": "showcase_premium",
        "sub_category": "red_lunar_new_year",
        "title_zh": "連體翻蓋禮盒內部結構 — 金色內襯工藝",
        "title_en": "Red Conjoined Box Interior with Gold Lining Craftsmanship",
        "title_ja": "赤連体翻蓋ボックス内部構造 — 金色ライニング工芸",
        "alt_zh": "連體翻蓋紅色禮盒打開內部,金色內襯 + 燙金工藝,展示 ZprintPro 細節品質",
        "alt_en": "Red conjoined flip-lid gift box opened showing gold interior lining and hot-foil details — ZprintPro craftsmanship showcase for premium packaging",
        "alt_ja": "赤連体翻蓋ギフトボックス内部 — 金色ライニング + ホットフォイル工芸,ZprintPro 細部品質",
        "priority": 4,
    },
    {
        "src": "起大型可折叠精品盒，平面交货.jpg",
        "out": "showcase-black-collapsible-fold-flat-premium-gift-box.webp",
        "category": "showcase_premium",
        "sub_category": "black_premium",
        "title_zh": "黑色可折疊精品禮盒 — 平面交貨節省運費",
        "title_en": "Black Collapsible Fold-Flat Premium Gift Box for Global Shipping",
        "title_ja": "黒折りたたみ高級ギフトボックス — 平面納品で送料削減",
        "alt_zh": "黑色可折疊精品禮盒,燙金 logo + 平面交貨,節省國際運費 70%",
        "alt_en": "Black collapsible fold-flat premium gift box with gold foil branding — ZprintPro space-saving design that cuts international shipping costs by up to 70%",
        "alt_ja": "黒折りたたみ式高級ギフトボックス — 金箔ロゴ + 平面納品で国際送料70%削減",
        "priority": 5,
    },
    {
        "src": "折叠盒制作粘胶工艺.jpg",
        "out": "craft-folding-box-manual-gluing-process.webp",
        "category": "showcase_craft",
        "sub_category": "craft_manual",
        "title_zh": "折疊盒手工粘膠工藝 — ZprintPro 細節品質",
        "title_en": "Manual Gluing Process for Folding Rigid Box Assembly",
        "title_ja": "折りたたみボックス手作業接着工程 — ZprintPro 細部品質",
        "alt_zh": "工人手工粘膠折疊盒工藝,白手套 + 精準對位,ZprintPro 注重細節品質",
        "alt_en": "Manual gluing process for folding rigid box assembly with white-glove precision alignment — ZprintPro craftsmanship at Shenzhen factory",
        "alt_ja": "折りたたみボックスの手作業接着工程 — 白手袋 + 精密位置合わせ,ZprintPro 細部品質",
        "priority": 6,
    },
    {
        "src": "异形结果三角形手工礼品盒板.jpg",
        "out": "craft-triangular-special-shape-handmade-gift-box-panel.webp",
        "category": "showcase_craft",
        "sub_category": "craft_special",
        "title_zh": "三角形異形手工禮品盒板 — 特殊結構定制",
        "title_en": "Triangular Special-Shape Handmade Gift Box Panel Stack",
        "title_ja": "三角形異形手工ギフトボックスパネル — 特殊構造カスタム",
        "alt_zh": "三角形異形手工禮品盒板堆疊,展示 ZprintPro 特殊結構定制能力",
        "alt_en": "Triangular special-shape handmade gift box panel stack — ZprintPro custom structural design capability for unique packaging",
        "alt_ja": "三角形異形手工ギフトボックスパネルスタック — ZprintPro 特殊構造カスタム能力",
        "priority": 7,
    },
    {
        "src": "坑盒印刷面纸半成品.jpg",
        "out": "showcase-printing-face-paper-semi-finished.webp",
        "category": "showcase_craft",
        "sub_category": "craft_production",
        "title_zh": "印刷面紙半成品 — 印後裝訂前",
        "title_en": "Printing Face Paper Semi-Finished Products Before Binding",
        "title_ja": "印刷面紙半製品 — 製本前",
        "alt_zh": "印刷面紙半成品堆疊,印後裝訂前的中間品,展示 ZprintPro 印刷產能",
        "alt_en": "Printing face paper semi-finished products stacked before binding — ZprintPro printing line intermediate output for global fulfillment",
        "alt_ja": "印刷面紙の半製品スタック — 製本前,ZprintPro 印刷ライン中間アウトプット",
        "priority": 8,
    },
    {
        "src": "国外校园课本印刷样张.jpg",
        "out": "showcase-international-textbook-printing-sample.webp",
        "category": "showcase_education",
        "sub_category": "textbook_export",
        "title_zh": "國外校園課本印刷樣張 — 教育出口場景",
        "title_en": "International Textbook Printing Sample Stacks for Education Export",
        "title_ja": "海外向け教科書印刷サンプル — 教育輸出",
        "alt_zh": "國外校園課本印刷樣張堆疊,出口英語教輔書,ZprintPro 教育印刷實力",
        "alt_en": "International textbook printing sample stacks ready for global education sector export — ZprintPro education printing capability for school publishers",
        "alt_ja": "海外向け教科書印刷サンプルスタック — 教育セクター輸出用,ZprintPro 教育印刷能力",
        "priority": 9,
    },
]


# ── 调色算法 v2: 温和白平衡 + 强饱和保留红色 ─────────────────────────────
def gentle_white_balance(img: Image.Image, strength: float = 0.10) -> Image.Image:
    """白点检测: 找图中 1% 最亮像素, 假设是白色, 调整三通道比例 (温和版, strength=0.10)

    关键修复: 之前用灰度世界算法 (gray world), R/G/B 平均相等, 红色高 R 会被拉低 → 红变黑
    修法: 只用图中真实最亮白色像素 (通常背景/反射光) 作为参考, 调整范围小 (10%)
    """
    arr = np.array(img).astype(np.float32)
    h, w, _ = arr.shape
    # 取 1% 最亮像素 (亮度的 top percentile)
    luminance = 0.299 * arr[..., 0] + 0.587 * arr[..., 1] + 0.114 * arr[..., 2]
    threshold = np.percentile(luminance, 99)
    bright_mask = luminance >= threshold
    if bright_mask.sum() < 10:
        return img  # 极端图, 跳过白平衡
    bright_pixels = arr[bright_mask]
    avg_r = bright_pixels[:, 0].mean()
    avg_g = bright_pixels[:, 1].mean()
    avg_b = bright_pixels[:, 2].mean()
    target_gray = 240  # 不强制 255, 保留 240 给高光细节
    # 温和调整: 每通道向 target_gray 移动 strength
    for c in range(3):
        cur = [avg_r, avg_g, avg_b][c]
        if cur > 0:
            ratio = (cur + strength * (target_gray - cur)) / cur
            arr[..., c] = np.clip(arr[..., c] * ratio, 0, 255)
    return Image.fromarray(arr.astype(np.uint8))


def enhance_image_v2(img: Image.Image) -> Image.Image:
    """v2 调色: 温和白平衡 + 强饱和 +1.25 + 对比度 +1.10 + 锐化 50%
    关键: 饱和度 +1.25 (之前 1.10 太少, 红色不够艳)
    """
    img = gentle_white_balance(img, strength=0.10)
    img = ImageEnhance.Contrast(img).enhance(1.10)
    img = ImageEnhance.Color(img).enhance(1.25)  # 强饱和
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
    """动态 webp 质量调整: 85 → 80 → 75 → 70 → 65 → 60 → 55, 找到 ≤ target_kb 的最高质量"""
    for q in [85, 80, 75, 70, 65, 60, 55]:
        img.save(out_path, "WEBP", quality=q, method=6, optimize=True)
        size_kb = out_path.stat().st_size / 1024
        if size_kb <= target_kb:
            return int(size_kb), q
    return int(out_path.stat().st_size / 1024), 50


# ── 主流程 ──────────────────────────────────────────────────────────────
def main():
    manifest = []
    print(f"=== K3 8/16 09:18 拍板: 处理 9 张新图 (温和白平衡 + 强饱和) ===\n")
    success_count = 0
    for item in SELECTED:
        src_path = SRC_DIR / item["src"]
        if not src_path.exists():
            print(f"  ❌ 缺失: {item['src']}")
            continue
        out_path = DST_DIR / item["out"]
        print(f"  [{item['priority']}] {item['src']}")

        # 1. 读图
        img = Image.open(src_path)
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode != "RGB":
            img = img.convert("RGB")
        orig_size = img.size
        orig_kb = src_path.stat().st_size / 1024

        # 2. v2 调色 (温和白平衡 + 强饱和保留红色)
        img = enhance_image_v2(img)
        img = resize_long_edge(img, 1600)
        new_w, new_h = img.size

        # 3. webp 压缩
        final_kb, final_q = save_webp_with_target_size(img, out_path, target_kb=120)

        # 4. 记录
        manifest.append({
            "src": str(src_path),
            "dst": str(out_path),
            "out_filename": item["out"],
            "category": item["category"],
            "sub_category": item["sub_category"],
            "title_zh": item["title_zh"],
            "title_en": item["title_en"],
            "title_ja": item["title_ja"],
            "alt_zh": item["alt_zh"],
            "alt_en": item["alt_en"],
            "alt_ja": item["alt_ja"],
            "priority": item["priority"],
            "orig_dimensions": f"{orig_size[0]}x{orig_size[1]}",
            "new_dimensions": f"{new_w}x{new_h}",
            "orig_kb": int(orig_kb),
            "final_kb": final_kb,
            "final_quality": final_q,
        })
        status = "✅" if final_kb <= 120 else "⚠️"
        print(f"      {orig_size[0]}x{orig_size[1]} ({orig_kb:.0f}KB) → {new_w}x{new_h} ({final_kb}KB q={final_q}) {status}")
        success_count += 1

    # 5. 写 manifest
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n=== 全部完成 ===")
    print(f"成功处理: {success_count}/{len(SELECTED)} 张")
    print(f"输出: {DST_DIR}")
    print(f"Manifest: {MANIFEST_PATH}")
    total_kb = sum(m["final_kb"] for m in manifest)
    print(f"合计: {total_kb}KB ({total_kb/1024:.1f}MB) / {success_count} 张")


if __name__ == "__main__":
    main()
