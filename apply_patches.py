import json, os, hashlib, shutil


def delete_root_app_directory():
    root_app_dir = os.path.join(os.getcwd(), "app")
    if os.path.exists(root_app_dir):
        print(f"  [auto-defense] deleting root app/")
        shutil.rmtree(root_app_dir, ignore_errors=True)


BACKUP_DIR = ".seo_backup"


def get_file_hash(file_path):
    with open(file_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


def backup_files(file_paths):
    if os.path.exists(BACKUP_DIR): shutil.rmtree(BACKUP_DIR)
    os.makedirs(BACKUP_DIR, exist_ok=True)
    bmap = {}
    for fp in file_paths:
        rp = os.path.relpath(fp, os.getcwd())
        bp = os.path.join(BACKUP_DIR, rp)
        os.makedirs(os.path.dirname(bp), exist_ok=True)
        shutil.copy2(fp, bp)
        bmap[fp] = bp
    print(f"  Backed up {len(bmap)} files to .seo_backup/")
    return bmap


def rollback_files(bmap):
    print("  Rolling back all changes...")
    restored = 0
    for orig, bk in bmap.items():
        if os.path.exists(bk):
            shutil.copy2(bk, orig)
            restored += 1
    if os.path.exists(BACKUP_DIR): shutil.rmtree(BACKUP_DIR)
    delete_root_app_directory()
    print(f"  Rolled back {restored} files")


def validate_paths(patches):
    prefix = os.path.join(os.getcwd(), "src", "app")
    valid, rejected = [], []
    for p in patches:
        if p["path"].startswith(prefix):
            valid.append(p)
        else:
            rejected.append(p)
            print(f"  REJECTED non-src/app path: {p[chr(34)+chr(34)+chr(34)]}")
    if rejected: print(f"  Filtered {len(rejected)} unsafe patches")
    return valid


def apply_patches(pf="gsc_patches.json"):
    delete_root_app_directory()
    if not os.path.exists(pf):
        for alt in ["patches.json", "seo_patches.json"]:
            if os.path.exists(alt): pf = alt; break
        else:
            print("  No patch files found"); return []
    with open(pf, "r", encoding="utf-8") as f:
        patches = json.load(f)
    print(f"  Loaded {len(patches)} patches from {pf}")
    valid = validate_paths(patches)
    if not valid: print("  No valid patches"); return []
    paths = [p["path"] for p in valid if os.path.exists(p["path"])]
    bmap = backup_files(paths)
    applied = []
    for patch in valid:
        pp = patch["path"]
        nc = patch.get("content", "")
        if not nc or not os.path.exists(pp): continue
        oh = get_file_hash(pp)
        nh = hashlib.md5(nc.encode("utf-8")).hexdigest()
        if oh == nh: continue
        with open(pp, "w", encoding="utf-8", newline="\\n") as f:
            f.write(nc)
        applied.append(pp)
        cs = patch.get("changes", [])
        s = f" ({', '.join(cs)})" if cs else ""
        print(f"  Updated: {os.path.relpath(pp)}{s}")
    print(f"\\n  Applied {len(applied)} patches")
    delete_root_app_directory()
    return applied


if __name__ == "__main__":
    apply_patches()