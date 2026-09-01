#!/bin/bash
# scripts/setup-hooks.sh
# 反审门童 v1 canonical hook 一键安装 (K3 9/1 15:06 修正 4)
#
# 用途: 把 scripts/canonical/pre-commit 安装到 .git/hooks/pre-commit
#       任何新环境/新 agent 10 秒内可恢复门童
#
# 用法:
#   bash scripts/setup-hooks.sh
#
# 跨平台: Windows (Git Bash) / macOS / Linux

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CANONICAL_HOOK="$SCRIPT_DIR/canonical/pre-commit"
TARGET_HOOK=".git/hooks/pre-commit"

if [ ! -f "$CANONICAL_HOOK" ]; then
  echo "❌ Canonical hook 不存在: $CANONICAL_HOOK"
  exit 1
fi

# 复制到 .git/hooks/
cp "$CANONICAL_HOOK" "$TARGET_HOOK"
chmod +x "$TARGET_HOOK"

echo "✅ 反审门童 v1 pre-commit hook 安装完成"
echo ""
echo "📋 详情:"
echo "  - Canonical (SSoT): $CANONICAL_HOOK"
echo "  - Active (git):     $TARGET_HOOK"
echo "  - 模式: 🔴 red 硬拦 + 🟠🟡 shadow mode (9/15 转正)"
echo "  - 5 道门童: 数据诚信 / 真实电话 / 品牌分层 / 跨语言污染 / SOP-10"
echo "  - DoD 铁律: No fix without a rule"
echo ""
echo "🧪 验证:"
echo "  git commit -m 'test' --allow-empty"
echo "  # 预期: pre-commit hook 全部通过 (无 src/ 改动)"
echo ""
echo "🔄 卸载 (K3 拍板可豁免):"
echo "  rm .git/hooks/pre-commit"
echo ""
echo "跨 session 永久生效, 跨项目 P0 通用 (zprintpro / aitoptools / togthr / stock-lab)"
