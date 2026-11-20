# -*- coding: utf-8 -*-
"""_clean_images.py - 清空 zprintpro-en-us-images 下所有图片 (K3 8/16 07:40 拍板)

清空范围:
- 全部 .jpg / .jpeg / .png / .webp 文件 (包括 raw/, _auto_selected/, backup_v20_8_k3_choice/ 子目录)
- 保留 .json / .md 配置文件 (alt-v20.json, calibration_data.json, v20_9_batch_plan.* 等)
- 保留 SKU 目录结构
- 保留 raw/_cand/ 子目录 (待 V20.9 生图重新填充)

注意: K3 8/16 07:40 拍板"清空图片 + 重新调 Seedream 5.0 Lite API 批量生图"
"""
import io
import sys
import shutil
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

BASE_DIR = Path(r"F:\zprintpro-nextjs\zprintpro-en-us-images")
IMG_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'}

# 保护: 不删这些文件 (K3 配置文件)
PROTECTED_NAMES = {
    'alt-v20.json', 'alt-v20-9.json', 'alt-v20-cand-scores.json',
    'calibration_data.json', 'v20_9_batch_plan.json', 'v20_9_batch_plan.md',
    'vision_selection.json', 'calibration_data_template.json',
}


def clean_images():
    """清空所有 SKU 子目录的图片文件, 保留 JSON 配置 + SKU 结构 + raw/_cand/"""
    total_deleted = 0
    total_size = 0
    deleted_files = []

    for item in BASE_DIR.iterdir():
        if not item.is_dir():
            continue
        # SKU 目录: BC-001, ST-001, FL-001 等
        # 递归删除图片, 但保留子目录结构 (raw/, _cand/, _auto_selected/, backup_v20_8_k3_choice/)
        for img_file in item.rglob('*'):
            if not img_file.is_file():
                continue
            if img_file.suffix.lower() not in IMG_EXTS:
                continue
            size = img_file.stat().st_size
            try:
                img_file.unlink()
                total_deleted += 1
                total_size += size
                deleted_files.append(str(img_file.relative_to(BASE_DIR)))
            except Exception as e:
                print(f"  ERROR deleting {img_file}: {e}")

    return total_deleted, total_size, deleted_files


def clean_sku_subdirs():
    """清空备份目录 backup_v20_8_k3_choice/ 和 _auto_selected/ (因为 K3 原选已废, 全部重做)"""
    for sku_dir in BASE_DIR.iterdir():
        if not sku_dir.is_dir():
            continue
        for subdir_name in ['backup_v20_8_k3_choice', '_auto_selected']:
            subdir = sku_dir / subdir_name
            if subdir.exists():
                shutil.rmtree(subdir)
                print(f"  Removed dir: {subdir.relative_to(BASE_DIR)}")


def main():
    print("=" * 80)
    print(f"V20.9 清空 zprintpro-en-us-images 图片 (K3 8/16 07:40 拍板)")
    print(f"BASE_DIR: {BASE_DIR}")
    print(f"清空范围: {IMG_EXTS} (图片文件)")
    print(f"保护范围: {len(PROTECTED_NAMES)} 个 JSON/MD 配置文件")
    print("=" * 80)

    print("\n[Step 1] 清空备份目录 + _auto_selected/")
    clean_sku_subdirs()

    print("\n[Step 2] 删除全部图片文件")
    n, size, files = clean_images()
    print(f"\n=== 删除完成: {n} 个图片文件, {size / 1024 / 1024:.1f} MB ===")
    if files:
        print("\n前 20 个被删文件:")
        for f in files[:20]:
            print(f"  - {f}")
        if len(files) > 20:
            print(f"  ... ({len(files) - 20} more)")

    print("\n[Step 3] 验证 SKU 结构 + JSON 配置保留")
    sku_count = 0
    for item in BASE_DIR.iterdir():
        if item.is_dir() and not item.name.startswith('.'):
            sku_count += 1
    print(f"  SKU 目录数: {sku_count}")
    for cfg in PROTECTED_NAMES:
        cfg_path = BASE_DIR / cfg
        if cfg_path.exists():
            print(f"  ✓ {cfg} ({cfg_path.stat().st_size} bytes)")
        else:
            print(f"  - {cfg} (not present)")

    print("\n=== 清空完成, 等 K3 跑 _seedream_api.py 重新批量生图 ===")


if __name__ == '__main__':
    main()
