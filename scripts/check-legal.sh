#!/usr/bin/env bash
#
# check-legal.sh — verify the legal pages still describe the product that exists.
#
# The site once shipped a /terms page with a pay-per-mission billing section, a
# /privacy page referencing accounts and payments, and a privacy modal naming
# Google Analytics — for a free, MIT-licensed framework that has none of those
# things and loads Plausible. That was A11W-ISS-4. This script exists so the
# same drift cannot come back unnoticed.
#
# Usage:
#   scripts/check-legal.sh                     # check production
#   scripts/check-legal.sh http://localhost:3000
#   EXPECTED_DATE=2026-08-01 scripts/check-legal.sh
#
# Exits 0 if every assertion passes, 1 otherwise.
# Assertions, per page:
#   1. the page returns HTTP 200
#   2. no stale paid-model or Google Analytics language appears anywhere
#   3. the facts that make each page true are present
#   4. /privacy and /terms carry the expected last-updated date

set -uo pipefail

BASE_URL="${1:-https://agent-11.com}"
BASE_URL="${BASE_URL%/}"
EXPECTED_DATE="${EXPECTED_DATE:-2026-07-25}"
UA="agent-11-legal-check/1.0"

pass=0
fail=0

ok()  { printf '  ok    %s\n' "$1"; pass=$((pass + 1)); }
bad() { printf '  FAIL  %s\n' "$1"; fail=$((fail + 1)); }

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

# Words that must never appear on any of these pages again. Matched
# case-insensitively against the rendered HTML.
#
# Note on "Google Analytics": it is banned outright, including in denials. A
# page that says "we do not use Google Analytics" is honest but unverifiable by
# grep, and the same string is what a regression would look like. /privacy
# names the analytics it does use instead, which is the checkable claim.
FORBIDDEN='pay-per-mission
squad-size
squad size
Google Analytics
googletagmanager
google-analytics
gtag(
mission-based pricing
Payment and Billing
process payments
manage subscriptions
Enterprise support and SLA
Hosted agent infrastructure
Premium mission libraries'

fetch() {
  # fetch <path> <outfile>; echoes the HTTP status
  curl -sS -L -A "$UA" --max-time 30 -o "$2" -w '%{http_code}' "${BASE_URL}$1" || echo 000
}

# check_absent <file> <label>
check_absent() {
  local file="$1" label="$2" hit=0 term
  while IFS= read -r term; do
    [ -z "$term" ] && continue
    if grep -qiF -- "$term" "$file"; then
      bad "$label still contains \"$term\""
      hit=1
    fi
  done <<< "$FORBIDDEN"
  [ "$hit" -eq 0 ] && ok "$label free of stale paid-model / Google Analytics language"
}

# check_present <file> <label> <needle>
check_present() {
  if grep -qiF -- "$3" "$1"; then
    ok "$2 states \"$3\""
  else
    bad "$2 is missing \"$3\""
  fi
}

printf '\nChecking legal pages on %s\n' "$BASE_URL"

for path in /terms /privacy /license; do
  label="$path"
  out="$workdir/$(echo "$path" | tr -d '/').html"

  printf '\n%s\n' "$label"
  status="$(fetch "$path" "$out")"
  if [ "$status" = "200" ]; then
    ok "$label returns 200"
  else
    bad "$label returned $status (expected 200)"
    continue
  fi

  check_absent "$out" "$label"

  case "$path" in
    /terms)
      check_present "$out" "$label" "MIT"
      check_present "$out" "$label" "No Payment, No Account"
      check_present "$out" "$label" "no account to create"
      check_present "$out" "$label" "$EXPECTED_DATE"
      ;;
    /privacy)
      check_present "$out" "$label" "Plausible"
      check_present "$out" "$label" "sets no cookies"
      check_present "$out" "$label" "Netlify"
      check_present "$out" "$label" "$EXPECTED_DATE"
      ;;
    /license)
      check_present "$out" "$label" "MIT"
      check_present "$out" "$label" "There Is No Paid Tier"
      check_present "$out" "$label" "Jamie Watters"
      ;;
  esac
done

# The homepage is where the analytics actually load, so assert the real
# analytics vendor is the one wired in and no Google tag came back with it.
printf '\n/ (homepage)\n'
home="$workdir/home.html"
status="$(fetch "/" "$home")"
if [ "$status" = "200" ]; then
  ok "homepage returns 200"
  if grep -qiF 'plausible.io' "$home"; then
    ok "homepage loads plausible.io"
  else
    bad "homepage no longer loads plausible.io — /privacy describes analytics that are gone"
  fi
  for term in googletagmanager google-analytics 'gtag('; do
    if grep -qiF -- "$term" "$home"; then
      bad "homepage contains \"$term\""
    else
      ok "homepage free of \"$term\""
    fi
  done
else
  bad "homepage returned $status (expected 200)"
fi

printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
[ "$fail" -eq 0 ] || exit 1
