#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""_wm_batch_remove.py - V20.6 水印批处理脚本 (PIL inpainting 替代 PS).
K3 8/17 04:55 拍板: PS 9/9 已定位, 全量 598 张需自动化.
K3 8/17 05:15 拍板: PS 批处理脚本就绪 (P0-3).

Watermark location: 右下角 (660, 780) 起点, ~540x270 像素 (per 58 号报告)
PIL 修补算法:
1. 检测 bbox 区域右下角
2. 提取 bbox 周边 (扩张 50px) 作为 inpaint 源
3. 复制镜像内容 + 高斯模糊混合
4. 写入新 WebP (无水印, FULL 不裁剪)

Usage:
    python _wm_batch_remove.py --input final_webp/ --output final_webp_clean/
    python _wm_batch_remove.py --single BC-001 HERO
    python _wm_batch_remove.py --report  # 仅生成水印位置报告
"""
import os
import sys
import json
import argparse
import time
from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw

# Constants
ROOT = Path(__file__).parent.parent
IMG_DIR = ROOT / "zprintpro-en-us-images"
WM_REPORT = ROOT / ".hermes" / "wm_report.json"
WM_DIAG_DIR = ROOT / ".hermes" / "_wm_diag"

# Watermark region (per 58 号 report)
WM_X_START = 660
WM_Y_START = 780
WM_DEFAULT_W = 540
WM_DEFAULT_H = 270


def detect_watermark(img_path):
    """Detect watermark bbox in image. Returns (x1, y1, x2, y2) or None."""
    try:
        img = Image.open(img_path).convert('RGB')
        w, h = img.size
        # Heuristic: scan right-bottom corner for text-like regions
        # Use simple brightness threshold + connected components
        crop = img.crop((WM_X_START, WM_Y_START, w, h))
        cw, ch = crop.size
        # Find darkest/brightest pixel cluster (watermark is usually semi-transparent white text)
        pixels = list(crop.getdata())
        # Check if there's a region with mean brightness > 200 (white text on dark = likely watermark)
        # or mean brightness < 80 (dark text on light = also watermark)
        # Simplified: assume watermark is in right-bottom 540x270 if file is 1200x1200
        if w == 1200 and h == 1200:
            # Use default bbox (per 58 号)
            return (WM_X_START, WM_Y_START, w, min(h, WM_Y_START + WM_DEFAULT_H))
        elif w == 1200:
            return (WM_X_START, WM_Y_START, w, h)
        else:
            # Scale bbox proportionally
            scale = w / 1200
            return (int(WM_X_START * scale), int(WM_Y_START * scale), w, int(min(h, (WM_Y_START + WM_DEFAULT_H) * scale)))
    except Exception as e:
        print(f"WARN: detect failed for {img_path}: {e}")
        return None


def inpaint_region(img, bbox):
    """Inpaint (remove) watermark at bbox using PIL mirror + blur blend.
    Algorithm:
    1. Take content from left of bbox (same row)
    2. Mirror horizontally
    3. Blend into bbox with feathered edge
    """
    if not bbox:
        return img
    x1, y1, x2, y2 = bbox
    w, h = img.size
    # Source: same row, x=0 to x=x1, take mirror
    src_x_start = max(0, x1 - (x2 - x1))
    if src_x_start >= x1:
        # No source available, use blur instead
        region = img.crop(bbox)
        blurred = region.filter(ImageFilter.GaussianBlur(radius=15))
        img.paste(blurred, bbox)
        return img
    # Mirror source
    src = img.crop((src_x_start, y1, x1, y2))
    # Mirror horizontally
    mirrored = src.transpose(Image.FLIP_LEFT_RIGHT)
    # Resize to bbox size
    mirrored = mirrored.resize((x2 - x1, y2 - y1))
    # Create alpha mask for soft blend
    mask = Image.new('L', (x2 - x1, y2 - y1), 0)
    mask_draw = ImageDraw.Draw(mask)
    # Full opacity in center, fade at edges (10px feather)
    feather = min(20, (y2 - y1) // 4, (x2 - x1) // 4)
    mask_draw.rectangle((feather, feather, (x2 - x1) - feather, (y2 - y1) - feather), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=feather // 2))
    # Composite
    img.paste(mirrored, bbox, mask)
    return img


def process_single(img_path, output_path=None, diag=False):
    """Process single image: detect watermark + inpaint + save."""
    if output_path is None:
        output_path = img_path
    img = Image.open(img_path).convert('RGB')
    bbox = detect_watermark(img_path)
    if not bbox:
        print(f"  No watermark detected: {img_path.name}")
        return False
    # Save diagnostic if requested
    if diag:
        WM_DIAG_DIR.mkdir(parents=True, exist_ok=True)
        diag_img = img.copy()
        draw = ImageDraw.Draw(diag_img)
        draw.rectangle(bbox, outline='red', width=5)
        diag_path = WM_DIAG_DIR / f"{img_path.stem}_wmdiag.png"
        diag_img.save(diag_path, quality=80)
    # Inpaint
    cleaned = inpaint_region(img, bbox)
    # Save
    if str(output_path) != str(img_path):
        output_path.parent.mkdir(parents=True, exist_ok=True)
    if str(output_path).endswith('.webp'):
        cleaned.save(output_path, 'WEBP', quality=80, method=6)
    else:
        cleaned.save(output_path, quality=92)
    return True


def process_batch(input_dir, output_dir=None, recursive=True):
    """Process all webp/jpg in input_dir. Output to output_dir or overwrite in place."""
    input_path = Path(input_dir)
    if not input_path.exists():
        print(f"ERROR: input dir not found: {input_path}")
        return 0, 0
    output_path = Path(output_dir) if output_dir else input_path
    output_path.mkdir(parents=True, exist_ok=True)
    # Find all webp/jpg
    if recursive:
        files = list(input_path.rglob('*.webp')) + list(input_path.rglob('*.jpg'))
    else:
        files = list(input_path.glob('*.webp')) + list(input_path.glob('*.jpg'))
    files = [f for f in files if '_wm_diag' not in str(f)]
    print(f"Found {len(files)} images in {input_path}")
    cleaned = 0
    failed = 0
    for f in files:
        rel = f.relative_to(input_path)
        out = output_path / rel
        try:
            ok = process_single(f, out)
            if ok:
                cleaned += 1
            else:
                failed += 1
        except Exception as e:
            print(f"  FAILED {f.name}: {e}")
            failed += 1
    print(f"Cleaned: {cleaned}, Failed: {failed}")
    return cleaned, failed


def generate_report():
    """Generate wm_report.json (per 58 号 format)."""
    IMG_DIR_LOCAL = IMG_DIR
    if not IMG_DIR_LOCAL.exists():
        print("No IMG_DIR")
        return
    report = {}
    for sku_dir in sorted(IMG_DIR_LOCAL.iterdir()):
        if not sku_dir.is_dir() or sku_dir.name.startswith('_'):
            continue
        final_dir = sku_dir / "final_webp"
        if not final_dir.exists():
            continue
        for f in sorted(final_dir.iterdir()):
            if f.suffix.lower() in ('.webp', '.jpg'):
                view = f.stem
                bbox = detect_watermark(f)
                report[f"{sku_dir.name}/{view}"] = {
                    "bbox": bbox,
                    "size": list(Image.open(f).size),
                    "filesize_kb": f.stat().st_size // 1024
                }
    # Save
    WM_REPORT.parent.mkdir(parents=True, exist_ok=True)
    with open(WM_REPORT, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"WM report: {WM_REPORT} ({len(report)} entries)")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', help='Input directory (final_webp/)')
    parser.add_argument('--output', help='Output directory (default: overwrite in place)')
    parser.add_argument('--single', nargs=2, metavar=('SKU', 'VIEW'), help='Process single SKU view')
    parser.add_argument('--report', action='store_true', help='Generate wm_report.json only')
    parser.add_argument('--diag', action='store_true', help='Save diagnostic overlay images')
    args = parser.parse_args()
    if args.report:
        generate_report()
        return
    if args.single:
        sku, view = args.single
        f = IMG_DIR / sku / "final_webp" / f"{view}.webp"
        if not f.exists():
            print(f"Not found: {f}")
            return
        ok = process_single(f, diag=args.diag)
        print(f"{sku}/{view}: {'OK' if ok else 'SKIP'}")
        return
    if args.input:
        cleaned, failed = process_batch(args.input, args.output)
        print(f"Done. {cleaned} cleaned, {failed} failed.")
        return
    print("Usage: --input DIR [--output DIR] | --single SKU VIEW | --report")


if __name__ == '__main__':
    main()
