#!/usr/bin/env bash
#
# check-links.sh — every link the site publishes must go somewhere.
#
# /portfolio advertised "Read the Case Study" pointing at a CASE-STUDY.md that
# had been archived out of the framework repo, so it 404'd (A11W-ISS-12). The
# other eleven links on that page were fine, which is exactly why a dead one
# survives: nobody clicks all of them. This walks the sitemap and clicks all
# of them.
#
# Usage:
#   scripts/check-links.sh                      # check production
#   scripts/check-links.sh http://localhost:3000
#
# Exits 0 if every link resolves, 1 otherwise.
# Notes:
#   - Follows redirects; a 3xx that lands on a 2xx is fine.
#   - Skips mailto:, tel: and anchor-only links.
#   - Some hosts (x.com, LinkedIn) rate-limit bots; 403/429 is reported as a
#     warning rather than a failure, since it does not mean the link is dead.

set -uo pipefail

BASE_URL="${1:-https://agent-11.com}"
BASE_URL="${BASE_URL%/}"
UA="${UA:-Mozilla/5.0 (compatible; agent-11-link-check/1.0)}"

pass=0
fail=0
warn=0

ok()   { printf '  ok    %s\n' "$1"; pass=$((pass + 1)); }
bad()  { printf '  FAIL  %s\n' "$1"; fail=$((fail + 1)); }
note() { printf '  warn  %s\n' "$1"; warn=$((warn + 1)); }

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

printf '\nLink check against %s\n' "$BASE_URL"

# --- pages, from the sitemap -------------------------------------------------
sitemap="$workdir/sitemap.xml"
status="$(curl -sS -L -A "$UA" --max-time 30 -o "$sitemap" -w '%{http_code}' "$BASE_URL/sitemap.xml" || echo 000)"
if [ "$status" != "200" ]; then
  bad "sitemap.xml returned $status"
  exit 1
fi

pages="$(grep -oE '<loc>[^<]+</loc>' "$sitemap" | sed -E 's#</?loc>##g' | sort -u)"
page_count="$(printf '%s\n' "$pages" | grep -c . || true)"
printf '  walking %s pages\n\n' "$page_count"

# --- collect every link ------------------------------------------------------
all="$workdir/all.txt"
: > "$all"

while IFS= read -r page; do
  [ -z "$page" ] && continue
  html="$workdir/page.html"
  code="$(curl -sS -L -A "$UA" --max-time 30 -o "$html" -w '%{http_code}' "$page" || echo 000)"
  if [ "$code" != "200" ]; then
    bad "page $page returned $code"
    continue
  fi
  # href="..." from anchors, absolute and root-relative alike.
  grep -oE 'href="[^"]+"' "$html" \
    | sed -E 's/^href="//; s/"$//' \
    | grep -vE '^(mailto:|tel:|#|javascript:)' \
    | while IFS= read -r href; do
        case "$href" in
          http*) printf '%s\n' "$href" ;;
          /*)    printf '%s%s\n' "$BASE_URL" "$href" ;;
        esac
      done >> "$all"
done <<< "$pages"

sort -u "$all" -o "$all"
link_count="$(grep -c . "$all" || true)"
printf '  %s unique links to check\n\n' "$link_count"

# --- check every link --------------------------------------------------------
while IFS= read -r url; do
  [ -z "$url" ] && continue
  code="$(curl -sS -L -A "$UA" --max-time 25 -o /dev/null -w '%{http_code}' "$url" || echo 000)"
  case "$code" in
    2*)      ok "$code  $url" ;;
    403|429) note "$code  $url (bot-blocked or rate-limited, not necessarily dead)" ;;
    *)       bad "$code  $url" ;;
  esac
done < "$all"

printf '\n%s passed, %s failed, %s warnings\n\n' "$pass" "$fail" "$warn"
[ "$fail" -eq 0 ] || exit 1
