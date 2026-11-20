#!/bin/bash
# 2026-09-18 daily-seo cron: 延迟 push (per AGENTS.md §0.25 30 min 间隔 §0.25.8 后台异步等待)
# 上次 push = 0707cc49 @ 2026-09-18 18:32:09 → 本次 push 最早 = 19:02:15
set -u
cd /f/zprintpro-nextjs || exit 1
LOG=.hermes/logs/2026-09-18-push-picturebook.log
SLUG=childrens-picture-book-printing-guide
{
  echo "=== deferred push job start: $(date '+%F %T') ==="
  TARGET=$(date -d '2026-09-18 19:02:15' +%s 2>/dev/null)
  NOW=$(date +%s)
  if [ -n "${TARGET:-}" ] && [ "$TARGET" -gt "$NOW" ]; then
    WAIT=$((TARGET - NOW))
    echo "waiting ${WAIT}s until 19:02:15 (30 min floor after 18:32 push)"
    sleep "$WAIT"
  fi
  echo "--- at $(date '+%F %T') ---"
  git fetch origin_ssh main 2>&1 | tail -2
  BASE=$(git rev-parse HEAD~1)
  REMOTE=$(git rev-parse origin_ssh/main)
  echo "HEAD=$(git rev-parse --short HEAD) HEAD~1=$(git rev-parse --short HEAD~1) origin_ssh/main=$(git rev-parse --short origin_ssh/main)"
  if [ "$REMOTE" != "$BASE" ]; then
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
  echo -n "2 zh-hk keyword hits: "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "童書繪本"
  echo -n "3 en keyword hits: "; curl -s "https://zprintpro.com/en/blog/$SLUG/" | grep -c "picture book"
  echo -n "4 ja keyword hits: "; curl -s "https://zprintpro.com/ja/blog/$SLUG/" | grep -c "絵本"
  echo -n "5 sitemap-zh-hk hits: "; curl -s "https://zprintpro.com/sitemap-zh-hk.xml" | grep -c "$SLUG"
  echo -n "6 zh-hk Q1: hits: "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "Q1:"
  echo -n "7 en status: "; curl -s -o /dev/null -w "%{http_code}\n" "https://zprintpro.com/en/blog/$SLUG/"
  echo -n "8 ja status: "; curl -s -o /dev/null -w "%{http_code}\n" "https://zprintpro.com/ja/blog/$SLUG/"
  echo -n "9 快速答案块(qa-answer): "; curl -s "https://zprintpro.com/zh-hk/blog/$SLUG/" | grep -c "qa-answer"
  echo "=== done $(date '+%F %T') ==="
} >> "$LOG" 2>&1
