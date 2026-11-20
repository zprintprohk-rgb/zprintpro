#!/bin/bash
# 2026-09-19 daily-seo cron: 延迟 push (AGENTS.md §0.25 30min 间隔 + §0.25.8 后台异步等待, 不阻塞主流程)
# 上次 push = bc8ea014 @ 2026-09-19 18:30:18 → 本次 push 最早 = 19:00:18 (取 19:01:00 留余量)
set -u
cd /f/zprintpro-nextjs || exit 1
LOG=.hermes/logs/2026-09-19-deferred-push-folded-leaflet.log
SLUG=folded-leaflet-printing-guide
{
  echo "=== deferred push job start: $(date '+%F %T') ==="
  TARGET=$(date -d '2026-09-19 19:01:00' +%s 2>/dev/null)
  NOW=$(date +%s)
  if [ -n "${TARGET:-}" ] && [ "$TARGET" -gt "$NOW" ]; then
    WAIT=$((TARGET - NOW))
    echo "sleeping ${WAIT}s until 19:01:00 (30 min floor after 18:30:18 push, background async)"
    sleep "$WAIT"
  fi
  echo "--- waking at $(date '+%F %T') -> fetch + push ---"
  git fetch origin_ssh main 2>&1 | tail -2
  REMOTE=$(git rev-parse origin_ssh/main)
  echo "HEAD=$(git rev-parse --short HEAD) origin_ssh/main=$(git rev-parse --short origin_ssh/main)"
  if ! git merge-base --is-ancestor "$REMOTE" HEAD; then
    echo "remote advanced -> rebase attempt (non-destructive)"
    git pull --rebase origin_ssh main 2>&1 | tail -5 || { echo "REBASE FAILED"; git rebase --abort 2>/dev/null; echo "RESULT=REBASE_FAILED_NEED_NEXT_CYCLE"; exit 9; }
  fi
  git push origin_ssh main 2>&1 | tail -5
  PUSH_RC=$?
  echo "PUSH_RC=$PUSH_RC"
  git status -sb | head -3
  if [ "$PUSH_RC" -ne 0 ]; then echo "RESULT=PUSH_FAILED"; exit 1; fi
  echo "RESULT=PUSHED $(git rev-parse --short HEAD)"
  echo "--- verify-deploy (CF Pages check-runs, retry up to 10x45s) ---"
  for i in $(seq 1 10); do
    OUT=$(node scripts/verify-deploy.mjs 2>&1 | tail -6)
    echo "[attempt $i] $OUT"
    echo "$OUT" | grep -qi "success" && break
    sleep 45
  done
  echo "--- 6 step verify ($(date '+%F %T')) ---"
  echo -n "1 zh-hk status: "; curl -s -o /dev/null -w "%{http_code}\n" "https://zprintpro.com/zh-hk/blog/$SLUG/"
  echo -n "2 en status: "; curl -s -o /dev/null -w "%{http_code}\n" "https://zprintpro.com/en/blog/$SLUG/"
  echo -n "3 ja status: "; curl -s -o /dev/null -w "%{http_code}\n" "https://zprintpro.com/ja/blog/$SLUG/"
  echo -n "4 zh-hk keyword hits (摺頁): "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "摺頁"
  echo -n "5 en keyword hits (Folded): "; curl -s "https://zprintpro.com/en/blog/$SLUG/" | grep -c "Folded"
  echo -n "6 ja keyword hits (折りたたみ): "; curl -s "https://zprintpro.com/ja/blog/$SLUG/" | grep -c "折りたたみ"
  echo -n "7 sitemap-zh-hk hits: "; curl -s "https://zprintpro.com/sitemap-zh-hk.xml" | grep -c "$SLUG"
  echo -n "8 zh-hk Q1 hits: "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "Q1:"
  echo -n "9 zh-hk qa-answer blocks: "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "qa-answer"
  echo "=== done $(date '+%F %T') ==="
} >> "$LOG" 2>&1
