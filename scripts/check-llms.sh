#!/usr/bin/env bash
#
# check-llms.sh — verify the published llms.txt is live, dated, and free of dead links.
#
# Usage:
#   scripts/check-llms.sh                          # check production
#   scripts/check-llms.sh http://localhost:3000/llms.txt
#   EXPECTED_DATE=2026-08-01 scripts/check-llms.sh # override the date assertion
#
# Exits 0 if every assertion passes, 1 otherwise.
# Assertions:
#   1. the llms.txt URL returns HTTP 200
#   2. the body contains the expected last-updated date string
#   3. the body has an H1, a blockquote summary, and at least one H2 section
#   4. every http(s) link in the body returns a non-error status (2xx/3xx)

set -uo pipefail

LLMS_URL="${1:-https://agent-11.com/llms.txt}"
EXPECTED_DATE="${EXPECTED_DATE:-2026-07-25}"
UA="agent-11-llms-check/1.0"

pass=0
fail=0

ok()   { printf '  ok    %s\n' "$1"; pass=$((pass + 1)); }
bad()  { printf '  FAIL  %s\n' "$1"; fail=$((fail + 1)); }

printf '\nChecking %s\n\n' "$LLMS_URL"

# --- 1. the file itself ------------------------------------------------------
body_file="$(mktemp)"
trap 'rm -f "$body_file"' EXIT

status="$(curl -sS -L -A "$UA" -o "$body_file" -w '%{http_code}' "$LLMS_URL" || echo 000)"
if [ "$status" = "200" ]; then
  ok "llms.txt returns 200"
else
  bad "llms.txt returned $status (expected 200)"
  printf '\nAborting: cannot check contents of a file that did not load.\n\n'
  exit 1
fi

# --- 2. the date -------------------------------------------------------------
if grep -qF "$EXPECTED_DATE" "$body_file"; then
  ok "contains last-updated date $EXPECTED_DATE"
else
  bad "date string $EXPECTED_DATE not found in llms.txt"
fi

# --- 3. llmstxt.org shape ----------------------------------------------------
grep -qE '^# .+'  "$body_file" && ok "has H1 title"            || bad "no H1 title (# ...)"
grep -qE '^> .+'  "$body_file" && ok "has blockquote summary"  || bad "no blockquote summary (> ...)"
grep -qE '^## .+' "$body_file" && ok "has at least one H2 section" || bad "no H2 sections (## ...)"

# --- 4. every link -----------------------------------------------------------
# Pull URLs out of markdown links: - [title](url): notes
urls="$(grep -oE '\]\((https?://[^)]+)\)' "$body_file" | sed -E 's/^\]\(//; s/\)$//' | sort -u)"

if [ -z "$urls" ]; then
  bad "no markdown links found to check"
else
  printf '\n  links:\n'
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    code="$(curl -sS -L -A "$UA" -o /dev/null -w '%{http_code}' --max-time 30 "$url" || echo 000)"
    case "$code" in
      2*|3*) ok "$code  $url" ;;
      *)     bad "$code  $url" ;;
    esac
  done <<< "$urls"
fi

# --- result ------------------------------------------------------------------
printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
[ "$fail" -eq 0 ] || exit 1
