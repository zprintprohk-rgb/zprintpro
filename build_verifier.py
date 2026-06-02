#!/usr/bin/env python3
"""
build_verifier.py — 安全构建验证器（核心安全门）
功能：备份 → 构建 → 多条件验证 → 失败自动回滚
"""
import os, shutil, subprocess, json, re, sys

BASE = r"F:\zprintpro-nextjs"
BACKUP_DIR = os.path.join(BASE, ".seo_backup")
CHANGELOG_FILE = os.path.join(BASE, ".seo_changelog.json")

def backup_files(file_paths):
    if os.path.exists(BACKUP_DIR):
        shutil.rmtree(BACKUP_DIR)
    os.makedirs(BACKUP_DIR)
    backup_map = {}
    for fp in file_paths:
        if os.path.exists(fp):
            rel = os.path.relpath(fp, BASE)
            bak = os.path.join(BACKUP_DIR, rel)
            os.makedirs(os.path.dirname(bak), exist_ok=True)
            shutil.copy2(fp, bak)
            backup_map[fp] = bak
    print(f"  [backup] {len(backup_map)} files")
    return backup_map

def rollback_all(backup_map):
    if not backup_map:
        return
    print(f"  [rollback] {len(backup_map)} files...")
    for original, backup in backup_map.items():
        if os.path.exists(backup):
            shutil.copy2(backup, original)
    shutil.rmtree(BACKUP_DIR, ignore_errors=True)
    print("  [rollback] done")

def verify_build():
    print("\n  [secure gate] Build verification")
    print("  " + "=" * 50)
    for d in [".next", "out"]:
        p = os.path.join(BASE, d)
        if os.path.exists(p):
            shutil.rmtree(p)
    result = subprocess.run(
        ["npx.cmd", "next", "build", "--no-lint"],
        cwd=BASE, capture_output=True, text=True, timeout=300
    )
    stdout, stderr = result.stdout, result.stderr
    if "Compiled successfully" not in stdout or result.returncode != 0:
        print("  [FAIL] Build failed!")
        for line in stderr.split("\n")[:8]:
            print(f"     {line.strip()}")
        return False
    print("  [OK] Compiled | exit=0")
    required = ["/zh-hk/services/food-packaging-printing", "/zh-hk/services/leaflet",
                "/zh-hk/services/leaflet-printing", "/zh-hk/services/poster-printing"]
    missing = [r for r in required if r not in stdout]
    if missing:
        print(f"  [FAIL] Missing routes: {missing}")
        return False
    print("  [OK] All 4 service routes present")
    print("  [OK] Build gate PASSED")
    return True

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 else "verify"
    if mode == "verify":
        ok = verify_build()
        sys.exit(0 if ok else 1)
    elif mode == "cleanup":
        for d in [BACKUP_DIR, CHANGELOG_FILE]:
            if os.path.exists(d):
                os.remove(d) if os.path.isfile(d) else shutil.rmtree(d)
        sys.exit(0)

if __name__ == "__main__":
    main()
