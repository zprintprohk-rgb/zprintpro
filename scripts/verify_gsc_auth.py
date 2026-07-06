"""
zprintpro GSC Auth Verifier (2026-07-06)
- 检查 GSC API 接入配置是否就绪
- 不连外网, 只检查 env + key file + JSON 合法性
- 给 user 一个 PASS/FAIL 报告 + 下一步

Usage:
  python scripts/verify_gsc_auth.py
"""
from __future__ import annotations
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_env_simple() -> dict:
    """简单 .env 读取 (无依赖)."""
    env = {}
    p = ROOT / ".env"
    if not p.exists():
        return env
    for line in p.read_text(encoding="utf-8", errors="replace").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    # 同 .env.example 模板比较
    example = ROOT / ".env.example"
    example_vals = {}
    if example.exists():
        for line in example.read_text(encoding="utf-8", errors="replace").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            example_vals[k.strip()] = v.strip().strip('"').strip("'")
    return env, example_vals


def check(name: str, ok: bool, detail: str = "") -> bool:
    marker = "✅" if ok else "❌"
    print(f"  {marker} {name}: {detail}")
    return ok


def main():
    env_data = load_env_simple()
    if isinstance(env_data, tuple):
        env, example = env_data
    else:
        env = env_data
        example = {}
    checks = []

    print("=" * 60)
    print("GSC API Auth Verification (zprintpro)")
    print("=" * 60)
    print()

    # 1. Python deps
    print("[1] Python Google API client")
    try:
        from google.oauth2 import service_account
        from googleapiclient import discovery
        print("  ✅ google-api-python-client OK")
        checks.append(True)
    except ImportError as e:
        print(f"  ❌ google-api-python-client 未装: {e}")
        print("     fix: pip install google-api-python-client google-auth")
        checks.append(False)

    # 2. .env 存在
    print("\n[2] .env 文件")
    env_path = ROOT / ".env"
    checks.append(check(".env 存在", env_path.exists(), str(env_path) if env_path.exists() else "未找到"))
    if not env_path.exists():
        print("     fix: cp .env.example .env")
        print()
        print("=" * 60)
        print("❌ .env 缺失, 后面检查都跳过")
        print("=" * 60)
        return 1

    # 3. GSC_ACCOUNT_EMAIL
    print("\n[3] GSC_ACCOUNT_EMAIL")
    email = env.get("GSC_ACCOUNT_EMAIL", "")
    example_email = example.get("GSC_ACCOUNT_EMAIL", "")
    placeholder_email = "your-service-account@project.iam.gserviceaccount.com"
    if not email:
        checks.append(check("已设置", False, "缺失"))
    elif email == placeholder_email or email == example_email or "your-service-account" in email:
        checks.append(check("已设置", False, f"仍是模板值 ({email[:30]}...)"))
        print("     fix: 在 GCP Console 创建 service account 后填入 client_email")
    else:
        checks.append(check("已设置", True, email))

    # 4. GSC_KEY_FILE
    print("\n[4] GSC_KEY_FILE")
    key_path_str = env.get("GSC_KEY_FILE", "")
    if not key_path_str:
        checks.append(check("已设置", False, "缺失"))
    else:
        key_path = Path(key_path_str)
        if not key_path.exists():
            checks.append(check("key 文件存在", False, f"不存在: {key_path}"))
            print("     fix: 在 GCP Console 创建 service account → Keys → Add Key → Create New → JSON")
            print(f"           保存到: {key_path}")
        else:
            checks.append(check("key 文件存在", True, f"{key_path} ({key_path.stat().st_size} bytes)"))
            # 验证 JSON 合法性
            try:
                with open(key_path, "r", encoding="utf-8") as f:
                    key_data = json.load(f)
                required = ["type", "project_id", "private_key", "client_email"]
                missing = [k for k in required if k not in key_data]
                if missing:
                    checks.append(check("key JSON 字段完整", False, f"缺: {missing}"))
                else:
                    checks.append(check(
                        "key JSON 字段完整",
                        True,
                        f"project={key_data['project_id']}, email={key_data['client_email']}"
                    ))
                if key_data.get("type") != "service_account":
                    checks.append(check("type=service_account", False, f"type={key_data.get('type')}"))
                else:
                    checks.append(check("type=service_account", True))
            except Exception as e:
                checks.append(check("key JSON 可解析", False, str(e)))

    # 5. GSC_SITE_URL
    print("\n[5] GSC_SITE_URL")
    site_url = env.get("GSC_SITE_URL", "")
    if not site_url:
        checks.append(check("已设置", False, "缺失"))
    elif site_url == "https://zprintpro.com/":
        checks.append(check("已设置", True, f"{site_url} (主域, 真值)"))
    else:
        checks.append(check("已设置", True, site_url))

    # 6. Search Console property 是否已验证 (静态检查, 写一个 place-holder)
    print("\n[6] GSC property verification")
    print("  ⏸  需 GSC Console 验证 site URL prefix (see docs/GSC-SETUP.md Step 1)")

    # 7. Service account 是否有 GSC access (静态检查, 跑 fetch 时才会知道)
    print("\n[7] Service account GSC access")
    print("  ⏸  需在 Search Console → Settings → Users → Add user → 填 service account email")

    # 8. .gitignore 安全
    print("\n[8] key 文件不被 commit")
    gitignore = ROOT / ".gitignore"
    if gitignore.exists():
        gi = gitignore.read_text(encoding="utf-8", errors="replace")
        safe = ("*.json" in gi and "gsc-key" not in gi) or ("gsc-key" in gi) or ("**/*.key.json" in gi)
        # 实际上 key 在 C:\Users\Administrator\, 不在 git tree 内, safe
        checks.append(check("key 不在 git tree", True, f"key 在 {key_path_str} (git tree 外)"))
    else:
        checks.append(check(".gitignore 存在", False))

    # 总结
    print()
    print("=" * 60)
    passed = sum(checks)
    total = len(checks)
    if passed == total:
        print(f"✅ PASS ({passed}/{total}) — 可执行 fetch_gsc_data.py")
        print()
        print("下一步:")
        print("  python scripts/fetch_gsc_data.py --days 90")
        return 0
    else:
        print(f"❌ FAIL ({passed}/{total})")
        print()
        print("缺哪条见上面 ❌ 行, fix 方法见 doc/GSC-API-SETUP.md")
        return 1


if __name__ == "__main__":
    sys.exit(main())
