#!/usr/bin/env bash
# 自进化技能 + 台账 + 门禁 一次性探针自检 (K3 2026-09-20 要求「写交接活书与探针确认」)
# 用法: bash .hermes/_probe-pb/probe-self-evolution-skill.sh
set -u
ROOT="F:/zprintpro-nextjs"
SKILL="C:/Users/Administrator/.openclaw-autoclaw/skills/zprintpro-self-evolution-hardening/SKILL.md"
PASS=0; FAIL=0
ok(){ echo "  ✅ $1"; PASS=$((PASS+1)); }
no(){ echo "  ❌ $1"; FAIL=$((FAIL+1)); }

echo "=== 1. 技能文件 ==="
if [ -f "$SKILL" ]; then ok "技能文件存在 ($(wc -c < "$SKILL" | tr -d ' ') bytes)"; else no "技能文件缺失: $SKILL"; fi
for kw in LOCATE_BEFORE_PATCH DOUBLE_METHOD_RECOUNT SAFECOMMIT_ATOMIC BYPASS_UNATTRIBUTED TIME_READING_UNVERIFIED BASELINE_MUST_DECREASE; do
  if grep -q "$kw" "$SKILL" 2>/dev/null; then ok "含避坑模式 $kw"; else no "缺避坑模式 $kw"; fi
done
for kw in "12 段骨架" "规则翻译层" "FAQ 五要件" "strip 内嵌 JSON-LD" "curl 断言"; do
  if grep -q "$kw" "$SKILL" 2>/dev/null; then ok "含能力 $kw"; else no "缺能力 $kw"; fi
done

echo "=== 2. 台账可解析 ==="
for f in blog-12seg-baseline.json blog-12seg-accepted-deviations.json rule-translation-ledger.json bypass-audit.jsonl cron-prompts-exemption-manifest.json; do
  p="$ROOT/.hermes/regression-guard/$f"
  if [ ! -f "$p" ]; then no "台账缺失 $f"; continue; fi
  case "$f" in
    *.jsonl) n=$(grep -c . "$p" 2>/dev/null || echo 0); ok "$f 存在 ($n 行)" ;;
    *) if node -e "JSON.parse(require('fs').readFileSync(process.argv[1],'utf8').replace(/^\uFEFF/,''))" "$p" 2>/dev/null; then ok "$f JSON 可解析"; else no "$f JSON 不可解析"; fi ;;
  esac
done

echo "=== 3. 门禁可执行 ==="
cd "$ROOT" || exit 1
for g in blog-quality-12-rules-guard rule-translation-guard cron-prompts-exemption-guard bypass-audit-guard; do
  if [ ! -f "scripts/guards/$g.js" ]; then no "门禁缺失 $g.js"; continue; fi
  if node -e "require('./scripts/guards/$g.js')" >/dev/null 2>&1; then ok "$g.js 可加载"; else no "$g.js 加载失败"; fi
done

echo "=== 4. 探针工具齐备 ==="
for t in strip-inline-jsonld.mjs measure-live-faqpage.mjs verify-question-consistency.mjs assert-faqpage-structure.mjs verify-datemodified-layers.mjs precheck-faq-format.mjs diag-printspecs-count.mjs verify-strip-backfill.mjs; do
  if [ -f "$ROOT/.hermes/_probe-pb/$t" ]; then ok "探针 $t"; else no "缺探针 $t"; fi
done

echo ""
echo "=== 结果: PASS=$PASS FAIL=$FAIL ==="
[ "$FAIL" -eq 0 ] && echo "ALL PASS ✅" || echo "存在失败项 ❌"
exit $([ "$FAIL" -eq 0 ] && echo 0 || echo 1)
