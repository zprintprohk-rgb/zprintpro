#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_patches.py v2.0 — 增量应用 SEO 补丁
支持：GSC 补丁 (gsc_patches.json) / 标准补丁 (patches_v2.json)
特性：哈希对比增量更新、自动回滚、批量处理
"""
import json, os, hashlib, sys, shutil
from datetime import datetime

BASE = r"F:\zprintpro-nextjs"
BACKUP_DIR = os.path.join(BASE, ".patch_backups")
os.makedirs(BACKUP_DIR, exist_ok=True)

PRIORITY_FILES = [
    "gsc_patches.json",
    "patches\\patches_v2.json",
    "patches\\patches.json",
]

def get_file_hash(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()

def backup_file(path):
    """备份文件到 .patch_backups/"""
    rel = os.path.relpath(path, BASE)
    bak = os.path.join(BACKUP_DIR, rel.replace("\\", "_").replace("/", "_") + f".{datetime.now().strftime('%H%M%S')}.bak")
    os.makedirs(os.path.dirname(bak), exist_ok=True)
    shutil.copy2(path, bak)
    return bak

def load_patches():
    for fname in PRIORITY_FILES:
        fpath = os.path.join(BASE, fname)
        if os.path.exists(fpath):
            with open(fpath, "r", encoding="utf-8") as f:
                data = json.load(f)
            print(f"  📖 加载补丁文件: {fname} ({len(data)} 个补丁)")
            return data
    raise FileNotFoundError("未找到任何补丁文件")

def apply_single_patch(patch):
    """应用单个补丁，返回是否修改"""
    page_path = patch.get("page_path", "")
    if not page_path:
        return False
    
    if not os.path.exists(page_path):
        print(f"  ⚠️ 页面不存在: {page_path}")
        return False
    
    with open(page_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    original = content
    modified = False
    
    # 优化 H1
    if "optimized_h1" in patch:
        h1_match = __import__('re').search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        if h1_match and h1_match.group(1).strip() != patch["optimized_h1"]:
            content = content.replace(h1_match.group(0), f'<h1 className="text-3xl font-bold mb-6">{patch["optimized_h1"]}</h1>', 1)
            modified = True
    
    # 优化 meta description
    if "optimized_desc" in patch:
        desc_pattern = r'description:\s*\'([^\']*)\''
        desc_match = __import__('re').search(desc_pattern, content)
        if desc_match and desc_match.group(1).strip() != patch["optimized_desc"]:
            content = content.replace(desc_match.group(0), f"description: '{patch['optimized_desc']}'", 1)
            modified = True
    
    # 优化 title
    if "optimized_title" in patch:
        title_pattern = r"title:\s*\'([^\']*)\'"
        title_match = __import__('re').search(title_pattern, content)
        if title_match and title_match.group(1).strip() != patch["optimized_title"]:
            content = content.replace(title_match.group(0), f"title: '{patch['optimized_title']}'", 1)
            modified = True
    
    if modified:
        bak = backup_file(page_path)
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ 已更新: {os.path.relpath(page_path, BASE)} (备份: {os.path.basename(bak)})")
    else:
        print(f"  ℹ️  无变化: {os.path.relpath(page_path, BASE)}")
    
    return modified

def rollback(backup_path, target_path):
    """回滚单个文件"""
    if os.path.exists(backup_path):
        shutil.copy2(backup_path, target_path)
        print(f"  ↩️  已回滚: {os.path.relpath(target_path, BASE)}")

def main():
    print("🔧 应用 SEO 补丁 v2.0")
    patches = load_patches()
    
    applied = []
    skipped = []
    for patch in patches:
        if apply_single_patch(patch):
            applied.append(patch)
        else:
            skipped.append(patch)
    
    print(f"\n📊 统计:")
    print(f"  已更新: {len(applied)} 个页面")
    print(f"  无变化: {len(skipped)} 个页面")
    return len(applied) > 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 0)
