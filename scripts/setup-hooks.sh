#!/bin/bash
# scripts/setup-hooks.sh
# 反审门童 v1 canonical hook 一键安装 (K3 9/1 15:06 修正 4; 2026-09-13 修正 5: 按 core.hooksPath 安装)
#
# 用途: 把 scripts/canonical/pre-commit 安装到 **git 实际读取的 hooks 目录**
#       任何新环境/新 agent 10 秒内可恢复门童
#
# ⚠️ 2026-09-13 事故: 8/26 为 submodule guard 设了 `git config core.hooksPath .githooks`,
#    而本脚本仍往 .git/hooks/ 装 -> **pre-commit 门禁整条静默失效 (8/26 ~ 9/13)**。
#    修法: 先读 core.hooksPath, 装到该目录; 并同时同步 .git/hooks/ 作为兜底。
#
# 用法:
#   bash scripts/setup-hooks.sh
#
# 跨平台: Windows (Git Bash) / macOS / Linux

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CANONICAL_HOOK="$SCRIPT_DIR/canonical/pre-commit"

if [ ! -f "$CANONICAL_HOOK" ]; then
  echo "❌ Canonical hook 不存在: $CANONICAL_HOOK"
  exit 1
fi

# 1) git 实际读取的 hooks 目录 (core.hooksPath 优先)
HOOKS_PATH="$(git config --get core.hooksPath || true)"
if [ -n "$HOOKS_PATH" ]; then
  TARGET_HOOK="$HOOKS_PATH/pre-commit"
  echo "ℹ️  core.hooksPath = $HOOKS_PATH (门禁必须装到这里, 否则静默失效)"
else
  TARGET_HOOK="$(git rev-parse --git-path hooks)/pre-commit"
fi

mkdir -p "$(dirname "$TARGET_HOOK")"
cp "$CANONICAL_HOOK" "$TARGET_HOOK"
chmod +x "$TARGET_HOOK" 2>/dev/null || true

# 2) 兜底: 同时同步 .git/hooks/ (hooksPath 未设时也生效)
FALLBACK_HOOK="$(git rev-parse --git-path hooks)/pre-commit"
if [ "$TARGET_HOOK" != "$FALLBACK_HOOK" ]; then
  cp "$CANONICAL_HOOK" "$FALLBACK_HOOK"
  chmod +x "$FALLBACK_HOOK" 2>/dev/null || true
fi

echo "✅ 反审门童 v1 pre-commit hook 安装完成"
echo ""
echo "📋 详情:"
echo "  - Canonical (SSoT): $CANONICAL_HOOK"
echo "  - Active (git):     $TARGET_HOOK"
echo "  - 兜底副本:          $FALLBACK_HOOK"
echo "  - 模式: 🔴 red 硬拦 + 🟠🟡 shadow mode (9/15 转正)"
echo "  - 门童: 数据诚信 / 真实电话 / 品牌分层 / 跨语言污染 / SOP-10 / … / 品牌全量基线"
echo "  - DoD 铁律: No fix without a rule"
echo ""
echo "🧪 验证 (必须两条都做, 只做第 1 条会漏掉 hooksPath 陷阱):"
echo "  1) git commit -m 'test' --allow-empty                 # 预期: hook 全部通过"
echo "  2) 故意写一行 '智印港 ZprintPro' 到 src/ 临时文件再 commit  # 预期: 被门童 #3 拦住 (exit 1)"
echo ""
echo "🔄 卸载 (K3 拍板可豁免):"
echo "  rm \"$TARGET_HOOK\""
echo ""
echo "跨 session 永久生效, 跨项目 P0 通用 (zprintpro / aitoptools / togthr / stock-lab)"
