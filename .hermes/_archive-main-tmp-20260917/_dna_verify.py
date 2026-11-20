#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
_dna_verify.py - V20.9 视图逻辑断层 DNA 验证脚本 (D-3 修法)
K3 8/17 01:41 拍板固化, 落地 P1 评分标准升级 4 维度硬门槛

4 维度评分 (满分各 10 分, 加权平均):
- V1 图案 pHash 匹配 (40%): 候选 vs HERO final_webp perceptual hash
- V2 主色板 ΔE  (20%): 候选主色 5 个 vs HERO 主色 5 个 CIEDE2000
- V3 工艺元素 presence (20%): 颜色方差 + 边缘密度 + 金属高光
- V4 完整产品入镜 (20%): 检测主体区域占比 (60-70% 满分, <30% 或 >90% 扣分)

门槛 (K3 拍板, 默认):
- 4 维平均 ≥ 7.5
- 任一维度 < 6.0 直接淘汰 (硬门槛)
- 总分 < 6.0 整体淘汰

输出:
- JSON 评分表 (每候选每维度分数 + 总分 + 达标/淘汰)
- TXT 报告 (按 SKU × View 分组, 列出推荐 best)

Usage:
    python _dna_verify.py [--sku BC-001] [--view detail] [--threshold 7.5]
"""
import os
import sys
import json
import time
import argparse
import struct
from pathlib import Path

# Constants
ROOT = Path(__file__).parent.parent
IMG_DIR = ROOT / "zprintpro-en-us-images"
FINAL_DIR_NAME = "final_webp"
CAND_DIR_NAME = "raw"  # cand files in raw/_cand/

# Pillow optional
try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False
    print("WARN: PIL not available, falling back to file-size heuristic")


def perceptual_hash(img_path, size=16):
    """Simple pHash via DCT approximation (no numpy/scipy)."""
    if not HAS_PIL:
        return None
    try:
        img = Image.open(img_path).convert('L').resize((size * 4, size * 4), Image.LANCZOS)
        pixels = list(img.getdata())
        # Simple block-average pHash
        block = (size * 4) // size
        avg = 0
        matrix = []
        for y in range(size):
            row = []
            for x in range(size):
                s = 0
                cnt = 0
                for dy in range(block):
                    for dx in range(block):
                        idx = (y * block + dy) * (size * 4) + (x * block + dx)
                        s += pixels[idx]
                        cnt += 1
                v = s // cnt
                row.append(v)
                avg += v
            matrix.append(row)
        avg //= (size * size)
        # Hash bits
        bits = 0
        for y in range(size):
            for x in range(size):
                if matrix[y][x] >= avg:
                    bits = (bits << 1) | 1
                else:
                    bits <<= 1
        return bits
    except Exception as e:
        print(f"WARN: pHash failed for {img_path}: {e}")
        return None


def hamming_distance(h1, h2):
    if h1 is None or h2 is None:
        return None
    return bin(h1 ^ h2).count('1')


def extract_palette(img_path, n_colors=5):
    """Extract dominant n colors (simple k-means lite)."""
    if not HAS_PIL:
        return None
    try:
        img = Image.open(img_path).convert('RGB').resize((100, 100), Image.LANCZOS)
        pixels = list(img.getdata())
        # Quantize to 16 levels per channel
        quant = [(p[0] >> 4, p[1] >> 4, p[2] >> 4) for p in pixels]
        from collections import Counter
        c = Counter(quant)
        top = c.most_common(n_colors * 4)  # over-sample
        # Cluster adjacent buckets
        palette = []
        for (r, g, b), cnt in top:
            # Check if close to existing palette entry
            merged = False
            for i, (pr, pg, pb) in enumerate(palette):
                if abs(r - pr) <= 1 and abs(g - pg) <= 1 and abs(b - pb) <= 1:
                    merged = True
                    break
            if not merged and len(palette) < n_colors:
                palette.append((r, g, b))
        # Convert back to 0-255
        return [(r << 4, g << 4, b << 4) for r, g, b in palette]
    except Exception as e:
        print(f"WARN: palette failed for {img_path}: {e}")
        return None


def ciede2000_simple(c1, c2):
    """Simplified CIEDE2000 in RGB space (rough ΔE approximation)."""
    # Use weighted RGB distance as proxy
    dr = (c1[0] - c2[0]) * 0.30
    dg = (c1[1] - c2[1]) * 0.59
    db = (c1[2] - c2[2]) * 0.11
    return ((dr * dr + dg * dg + db * db) ** 0.5) * 0.5


def palette_delta_e(p1, p2):
    """Match each color in p1 to nearest in p2, return average."""
    if not p1 or not p2:
        return None
    if len(p1) != len(p2):
        # Pad shorter
        m = max(len(p1), len(p2))
        p1 = (p1 + p1[-1:] * m)[:m]
        p2 = (p2 + p2[-1:] * m)[:m]
    deltas = []
    for c1 in p1:
        min_d = min(ciede2000_simple(c1, c2) for c2 in p2)
        deltas.append(min_d)
    return sum(deltas) / len(deltas)


def craft_presence(img_path):
    """Score craft element presence (0-10) based on color variance + edge density + metallic highlight.
    Optimized v2: use 100x100 instead of 300x300, single-pass loops."""
    if not HAS_PIL:
        return None
    try:
        img = Image.open(img_path).convert('RGB').resize((100, 100), Image.LANCZOS)
        w, h = 100, 100
        n = w * h
        # Single pass: compute sum, sum-of-squares, metallic, edge
        sum_r = sum_g = sum_b = 0
        sum_r2 = sum_g2 = sum_b2 = 0
        metallic_count = 0
        # First pass: sums + metallic
        pixels = []
        for px in img.getdata():
            r, g, b = px
            pixels.append(px)
            sum_r += r; sum_g += g; sum_b += b
            sum_r2 += r*r; sum_g2 += g*g; sum_b2 += b*b
            mx = r if r > g else g
            mx = mx if mx > b else b
            mn = r if r < g else g
            mn = mn if mn < b else b
            if mx > 200 and (mx - mn) < 30:
                metallic_count += 1
        # Variance
        mean_r = sum_r / n
        mean_g = sum_g / n
        mean_b = sum_b / n
        var_r = (sum_r2 / n) - mean_r * mean_r
        var_g = (sum_g2 / n) - mean_g * mean_g
        var_b = (sum_b2 / n) - mean_b * mean_b
        var_total = (var_r + var_g + var_b) / 3
        var_score = min(10, max(0, var_total / 200))
        # Edge density (sample every 5 pixels for speed)
        edge_count = 0
        sampled = 0
        for y in range(1, h - 1, 2):
            for x in range(1, w - 1, 2):
                idx = y * w + x
                p = pixels[idx]
                p_right = pixels[idx + 1]
                p_down = pixels[idx + w]
                diff_h = abs(p[0] - p_right[0]) + abs(p[1] - p_right[1]) + abs(p[2] - p_right[2])
                diff_v = abs(p[0] - p_down[0]) + abs(p[1] - p_down[1]) + abs(p[2] - p_down[2])
                sampled += 1
                if diff_h > 60 or diff_v > 60:
                    edge_count += 1
        edge_score = min(10, max(0, edge_count / max(1, sampled) * 5))
        metallic_score = min(10, metallic_count / 50)
        return round(var_score * 0.4 + edge_score * 0.4 + metallic_score * 0.2, 2)
    except Exception as e:
        print(f"WARN: craft_presence failed for {img_path}: {e}")
        return None


def product_in_frame_ratio(img_path):
    """Score 0-10 for product being 60-70% in frame (penalize too small or too large)."""
    if not HAS_PIL:
        return None
    try:
        img = Image.open(img_path).convert('L').resize((100, 100), Image.LANCZOS)
        pixels = list(img.getdata())
        w = h = 100
        # Find main subject (non-background) by edge detection
        # Simplified: count "mid-tone" pixels (likely product body, not pure bg)
        mid = sum(1 for p in pixels if 30 < p < 230)
        ratio = mid / (w * h)
        # Ideal: 0.6-0.7
        if 0.55 <= ratio <= 0.75:
            return 10.0
        elif 0.40 <= ratio < 0.55 or 0.75 < ratio <= 0.85:
            return 7.0
        elif 0.25 <= ratio < 0.40 or 0.85 < ratio <= 0.95:
            return 4.0
        else:
            return 2.0
    except Exception as e:
        print(f"WARN: ratio failed for {img_path}: {e}")
        return None


def load_scene_dictionary():
    """Load scene_dictionary.json for V5 scene-selling-point alignment scoring."""
    # Try multiple paths
    candidates = [
        IMG_DIR.parent / "seedream" / "scene_dictionary.json",
        IMG_DIR.parent / "zprintpro" / "seedream" / "scene_dictionary.json",
        Path("seedream/scene_dictionary.json"),
        Path("zprintpro/seedream/scene_dictionary.json"),
    ]
    for p in candidates:
        if p.exists():
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"WARN: scene_dictionary load failed at {p}: {e}")
    print("WARN: scene_dictionary.json not found, V5 disabled")
    return None


# SKU → category + selling_point mapping (K3 8/17 拍板默认)
SKU_DNA = {
    "ST-001": {"category": "stickers", "selling_point": "waterproof", "type": "function"},
    "BC-001": {"category": "stickers", "selling_point": "foil-stamped", "type": "craft"},
    "BC-002": {"category": "stickers", "selling_point": "die-cut", "type": "craft"},
    "FL-001": {"category": "flyers", "selling_point": "thick-card", "type": "material"},
    # Default for unknown SKU
}


def scene_selling_point_alignment(img_path, sku, view, scene_dict):
    """P0-6 V5 评分: 场景-卖点匹配度 (0-10). K3 8/17 01:47 拍板.
    v2: must_contain 加分 + must_not_contain 减分 (严公式).
    简化启发式: 颜色特征 → 卖点元素匹配度.
    - waterproof 必须有水/雨 (蓝调 + 反射) + 不能有办公场景 (灰白单色)
    - foil-stamped 必须有金/银高光
    - CNY 必须有红色 + 暖光
    - material 必须有纹理 (颜色方差)
    """
    if not HAS_PIL or not scene_dict:
        return None
    dna = SKU_DNA.get(sku, {"category": "stickers", "selling_point": "waterproof", "type": "function"})
    cat = dna["category"]
    sp = dna["selling_point"]
    rules = scene_dict.get(cat, {}).get("by_selling_point", {}).get(sp, {})
    if not rules:
        return 5.0  # No rule = neutral
    try:
        img = Image.open(img_path).convert('RGB').resize((100, 100), Image.LANCZOS)
        pixels = list(img.getdata())
        n = len(pixels)
        # Color features
        metallic = sum(1 for p in pixels if max(p) > 200 and (max(p) - min(p)) < 30)
        metallic_ratio = metallic / n
        red_sat = sum(1 for p in pixels if p[0] > 150 and p[1] < 100 and p[2] < 100)
        red_ratio = red_sat / n
        blue_dom = sum(1 for p in pixels if p[2] > 130 and p[2] > p[0] + 20)
        blue_ratio = blue_dom / n
        warm = sum(1 for p in pixels if p[0] > 140 and p[1] > 80 and p[1] < 180 and p[2] < 100)
        warm_ratio = warm / n
        # Office scene detection (must_not_contain) - grayish uniform (低色彩饱和)
        # 计算 HSV saturation
        sat_count = 0
        for p in pixels:
            mx = max(p); mn = min(p)
            if mx > 0 and (mx - mn) / mx > 0.3:
                sat_count += 1
        sat_ratio = sat_count / n
        office_dry = sat_ratio < 0.10  # 高度单色 = 办公干燥场景
        # Base score by selling point
        if sp == "waterproof":
            # 必须有水/雨/反射. 没水元素 = 严重扣分
            has_water = blue_ratio > 0.08 or metallic_ratio > 0.05
            if has_water:
                score = (blue_ratio * 40) + (metallic_ratio * 30) + 4.0
            else:
                # 没水元素 (MacBook/Moleskine 干燥办公) → 强制低分
                score = 2.0
            if office_dry and not has_water:
                score = 1.5  # 双信号 (没水 + 干燥) = 极低分
        elif sp == "oilproof":
            has_oil = warm_ratio > 0.05
            score = (warm_ratio * 50) + 3.0 if has_oil else 2.0
        elif sp == "foil-stamped":
            # 必须有金/银高光 (金属反射)
            has_foil = metallic_ratio > 0.02
            score = (metallic_ratio * 80) + 2.0 if has_foil else 3.0
        elif sp == "die-cut":
            var = sum((p[0]-sum(x[0] for x in pixels)/n)**2 +
                      (p[1]-sum(x[1] for x in pixels)/n)**2 +
                      (p[2]-sum(x[2] for x in pixels)/n)**2 for p in pixels) / n
            score = min(10, var / 300) + 2.0
        elif sp == "chinese-new-year" or (sp == "foil-stamped" and cat == "red-packets"):
            has_red = red_ratio > 0.05
            score = (red_ratio * 50) + (metallic_ratio * 25) + 2.0 if has_red else 2.5
        else:
            score = 5.0
        return round(min(10, max(0, score)), 2)
    except Exception as e:
        print(f"WARN: V5 failed for {img_path}: {e}")
        return None


def find_hero_baseline(sku):
    """Find HERO final_webp as baseline for DNA comparison."""
    final_dir = IMG_DIR / sku / FINAL_DIR_NAME
    if not final_dir.exists():
        return None
    for f in final_dir.iterdir():
        if f.suffix.lower() in ('.webp', '.jpg', '.png'):
            name = f.stem.lower()
            if 'hero' in name:
                return f
    # Fallback: any webp
    webps = list(final_dir.glob('*.webp'))
    return webps[0] if webps else None


def find_candidates(sku, view):
    """Find cand1/2/3 jpg files in raw/_cand/."""
    cand_dir = IMG_DIR / sku / CAND_DIR_NAME / "_cand"
    if not cand_dir.exists():
        return []
    suffix = f"-{view}_cand"
    results = []
    for f in cand_dir.iterdir():
        if f.suffix.lower() in ('.jpg', '.webp', '.png') and suffix in f.stem:
            results.append(f)
    return sorted(results)


def score_candidate(sku, view, cand_path, hero_path, threshold=7.5, scene_dict=None):
    """Score one candidate on 5 dimensions (P0-6 K3 8/17: V1-V4 + V5 scene-selling-point)."""
    result = {
        "sku": sku, "view": view, "candidate": cand_path.name,
        "v1_phash": None, "v2_palette_de": None,
        "v3_craft": None, "v4_ratio": None,
        "v5_scene": None,
        "avg": None, "verdict": "UNKNOWN", "reasons": []
    }
    # V1: pHash distance (lower = better; normalize to 0-10)
    h_cand = perceptual_hash(cand_path)
    h_hero = perceptual_hash(hero_path) if hero_path else None
    if h_cand is not None and h_hero is not None:
        dist = hamming_distance(h_cand, h_hero)
        v1 = max(0, 10 - dist / 20)
        result["v1_phash"] = round(v1, 2)
    # V2: Palette ΔE (lower = better)
    p_cand = extract_palette(cand_path)
    p_hero = extract_palette(hero_path) if hero_path else None
    if p_cand and p_hero:
        de = palette_delta_e(p_cand, p_hero)
        if de is not None:
            v2 = max(0, 10 - de / 2)
            result["v2_palette_de"] = round(v2, 2)
    # V3: Craft presence
    v3 = craft_presence(cand_path)
    if v3 is not None:
        result["v3_craft"] = v3
    # V4: Product in frame ratio
    v4 = product_in_frame_ratio(cand_path)
    if v4 is not None:
        result["v4_ratio"] = v4
    # V5: Scene-selling-point alignment (P0-6 K3 8/17 拍板)
    v5 = scene_selling_point_alignment(cand_path, sku, view, scene_dict)
    if v5 is not None:
        result["v5_scene"] = v5
    # Average (only over non-None)
    scores = [s for s in [result["v1_phash"], result["v2_palette_de"],
                          result["v3_craft"], result["v4_ratio"],
                          result["v5_scene"]] if s is not None]
    if scores:
        avg = sum(scores) / len(scores)
        result["avg"] = round(avg, 2)
        # Verdict
        if avg < 6.0:
            result["verdict"] = "REJECT"
            result["reasons"].append(f"avg {avg} < 6.0")
        elif any(s < 6.0 for s in scores):
            result["verdict"] = "REJECT"
            result["reasons"].append(f"hard threshold: {[s for s in scores if s < 6.0]}")
        elif avg < threshold:
            result["verdict"] = "MARGINAL"
            result["reasons"].append(f"avg {avg} < threshold {threshold}")
        else:
            result["verdict"] = "PASS"
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--sku", help="Single SKU (e.g. BC-001)")
    parser.add_argument("--view", help="Single view (e.g. detail)")
    parser.add_argument("--threshold", type=float, default=7.5, help="Avg threshold (default 7.5)")
    parser.add_argument("--output", default="dna_verify_report", help="Output prefix")
    args = parser.parse_args()

    if not HAS_PIL:
        print("ERROR: PIL/Pillow required. pip install Pillow")
        sys.exit(1)

    # Load scene dictionary for V5
    scene_dict = load_scene_dictionary()
    if scene_dict:
        print(f"scene_dictionary loaded ({sum(len(v.get('by_selling_point', {})) for v in scene_dict.values() if isinstance(v, dict))} selling points)")
    else:
        print("scene_dictionary not loaded, V5 disabled")

    skus = [args.sku] if args.sku else ["BC-001", "ST-001"]
    all_results = []
    for sku in skus:
        hero = find_hero_baseline(sku)
        if not hero:
            print(f"WARN: {sku} no HERO baseline found, skipping")
            continue
        print(f"[{sku}] HERO baseline: {hero.name}")
        # Find all cand files (group by view)
        cand_dir = IMG_DIR / sku / CAND_DIR_NAME / "_cand"
        if not cand_dir.exists():
            print(f"WARN: {sku} no _cand dir, skipping")
            continue
        # Group by view
        views = {}
        for f in cand_dir.iterdir():
            if f.suffix.lower() not in ('.jpg', '.webp', '.png'):
                continue
            stem = f.stem
            if '_cand' not in stem:
                continue
            # Extract view: e.g. "zprintpro-greeting-cards-premium-greeting-cards-en-detail_cand1"
            base = stem.split('_cand')[0]
            view = base.split('-')[-1]
            if args.view and view != args.view:
                continue
            views.setdefault(view, []).append(f)
        for view, cands in sorted(views.items()):
            print(f"  [{sku}/{view}] {len(cands)} candidates")
            for cand in cands:
                r = score_candidate(sku, view, cand, hero, args.threshold, scene_dict)
                all_results.append(r)
                print(f"    {cand.name}: v1={r['v1_phash']} v2={r['v2_palette_de']} "
                      f"v3={r['v3_craft']} v4={r['v4_ratio']} v5={r['v5_scene']} "
                      f"avg={r['avg']} → {r['verdict']}")
    # Write reports
    if not all_results:
        print("No results.")
        return
    json_path = IMG_DIR.parent / f".hermes/{args.output}.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    print(f"\nJSON report: {json_path}")
    # TXT report (grouped by sku × view, recommend best)
    txt_path = json_path.with_suffix('.txt')
    with open(txt_path, 'w', encoding='utf-8') as f:
        f.write(f"V20.9 DNA Verify Report ({time.strftime('%Y-%m-%d %H:%M')})\n")
        f.write(f"Threshold: avg >= {args.threshold}, any dim < 6.0 = REJECT\n")
        f.write("=" * 80 + "\n\n")
        from collections import defaultdict
        groups = defaultdict(list)
        for r in all_results:
            groups[(r["sku"], r["view"])].append(r)
        for (sku, view), rs in sorted(groups.items()):
            f.write(f"## {sku} / {view}\n")
            # Sort by avg desc
            rs_sorted = sorted(rs, key=lambda x: x["avg"] or 0, reverse=True)
            best = next((r for r in rs_sorted if r["verdict"] == "PASS"), None)
            for r in rs_sorted:
                marker = " ★ BEST" if r is best else ""
                f.write(f"  {r['candidate']}: avg={r['avg']} → {r['verdict']}{marker}\n")
                f.write(f"    v1_phash={r['v1_phash']} v2_palette={r['v2_palette_de']} "
                        f"v3_craft={r['v3_craft']} v4_ratio={r['v4_ratio']} "
                        f"v5_scene={r.get('v5_scene', 'N/A')}\n")
                for reason in r["reasons"]:
                    f.write(f"    ! {reason}\n")
            f.write("\n")
    print(f"TXT report: {txt_path}")


if __name__ == "__main__":
    main()
