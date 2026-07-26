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
#   PRIVACY_DATE=2026-08-01 scripts/check-legal.sh
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
# Per-page, because these pages change independently. Each must match the
# matching entry in src/lib/page-dates.ts.
TERMS_DATE="${TERMS_DATE:-2026-07-25}"
PRIVACY_DATE="${PRIVACY_DATE:-2026-07-26}"
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
      check_present "$out" "$label" "$TERMS_DATE"
      ;;
    /privacy)
      check_present "$out" "$label" "Plausible"
      check_present "$out" "$label" "sets no cookies"
      check_present "$out" "$label" "Netlify"
      check_present "$out" "$label" "release updates"
      check_present "$out" "$label" "$PRIVACY_DATE"
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

# --- security.txt: every field must resolve (A11W-ISS-10) --------------------
printf '\n/.well-known/security.txt\n'
sec="$workdir/security.txt"
status="$(fetch "/.well-known/security.txt" "$sec")"
if [ "$status" = "200" ]; then
  ok "security.txt returns 200"

  # Contact: must be the GitHub advisories URL. A mailbox whose deliverability
  # nobody has proven is not a security contact (see A11W-ISS-9).
  if grep -qiF 'Contact: https://github.com/TheWayWithin/agent-11/security/advisories' "$sec"; then
    ok "security.txt Contact is the GitHub advisories URL"
  else
    bad "security.txt Contact is not the agreed GitHub advisories URL"
  fi

  if grep -qiE '^Contact: *mailto:' "$sec"; then
    bad "security.txt lists a mailto Contact — confirm the mailbox delivers first (A11W-ISS-9)"
  else
    ok "security.txt lists no unverified mailbox"
  fi

  # Policy: must be a URL that actually serves something.
  policy_url="$(grep -iE '^Policy:' "$sec" | head -1 | sed -E 's/^[Pp]olicy: *//; s/[[:space:]]*$//')"
  if [ -z "$policy_url" ]; then
    bad "security.txt has no Policy line"
  else
    policy_code="$(curl -sS -L -A "$UA" --max-time 30 -o /dev/null -w '%{http_code}' "$policy_url" || echo 000)"
    if [ "$policy_code" = "200" ]; then
      ok "security.txt Policy URL returns 200 -> $policy_url"
    else
      bad "security.txt Policy URL returned $policy_code -> $policy_url"
    fi
  fi

  # Canonical must be the apex, consistent with A11W-ISS-5.
  if grep -qiF 'Canonical: https://agent-11.com/.well-known/security.txt' "$sec"; then
    ok "security.txt Canonical is the apex"
  else
    bad "security.txt Canonical is missing or not the apex"
  fi

  # Expires must exist and must not be in the past or about to lapse. This is
  # the field that rots silently, so it fails rather than warns.
  expires="$(grep -iE '^Expires:' "$sec" | head -1 | sed -E 's/^[Ee]xpires: *//; s/[[:space:]]*$//')"
  if [ -z "$expires" ]; then
    bad "security.txt has no Expires line (required by RFC 9116)"
  else
    exp_day="${expires%%T*}"
    # macOS date -j -f, GNU date -d; try both.
    exp_epoch="$(date -j -f '%Y-%m-%d' "$exp_day" '+%s' 2>/dev/null || date -d "$exp_day" '+%s' 2>/dev/null || echo '')"
    now_epoch="$(date '+%s')"
    if [ -z "$exp_epoch" ]; then
      bad "security.txt Expires could not be parsed -> $expires"
    elif [ "$exp_epoch" -le "$now_epoch" ]; then
      bad "security.txt Expires has LAPSED -> $exp_day"
    elif [ "$(( (exp_epoch - now_epoch) / 86400 ))" -lt 30 ]; then
      bad "security.txt Expires is under 30 days away ($exp_day) — renew it"
    else
      ok "security.txt Expires is $exp_day ($(( (exp_epoch - now_epoch) / 86400 )) days away)"
    fi
  fi
else
  bad "security.txt returned $status (expected 200)"
fi

# --- retired promises must stay gone (A11W-ISS-6, A11W-ISS-11) ---------------
# The signup form once promised kits by email that did not exist and that
# nothing sent, and the share link tagged an X account that returns 404.
printf '\nretired promises\n'
RETIRED='on its way
Check your inbox
Check Your Email
Get Your Free
Quick Start Kit
Advanced Collaboration Patterns
agent11_dev
agent11dev
Download Free Kit
Get Advanced Content
instant access'

home2="$workdir/home2.html"
if [ "$(fetch "/" "$home2")" = "200" ]; then
  hit=0
  while IFS= read -r term; do
    [ -z "$term" ] && continue
    if grep -qiF -- "$term" "$home2"; then
      bad "homepage still contains \"$term\""
      hit=1
    fi
  done <<< "$RETIRED"
  [ "$hit" -eq 0 ] && ok "homepage free of retired email-capture promises"
else
  bad "could not fetch homepage for retired-promise check"
fi

pricing="$workdir/pricing.html"
if [ "$(fetch "/pricing" "$pricing")" = "200" ]; then
  if grep -qiF 'agent11_dev' "$pricing" || grep -qiF 'agent11dev' "$pricing"; then
    bad "/pricing still tags a non-existent X handle"
  else
    ok "/pricing tags no non-existent X handle"
  fi
else
  bad "could not fetch /pricing for handle check"
fi

printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
[ "$fail" -eq 0 ] || exit 1
