#!/usr/bin/env bash
#
# check-canonical.sh — one host, everywhere, with no redirect hops.
#
# The site serves on the apex and 301s www to it, but the code used to declare
# www canonical, so every page pointed crawlers at a host that redirects away.
# AImpactScanner read that as a cross-domain canonical (Canonical Tag
# Configuration 40/100). That was A11W-ISS-5. This script exists so the two can
# never drift apart again.
#
# Usage:
#   scripts/check-canonical.sh                      # check production
#   scripts/check-canonical.sh http://localhost:3000
#   CANONICAL_HOST=agent-11.com scripts/check-canonical.sh
#
# Exits 0 if every assertion passes, 1 otherwise.
# Assertions:
#   1. robots.txt returns 200, and its Sitemap:/Host: lines name the apex
#   2. sitemap.xml returns 200 and every <loc> is an apex URL
#   3. every URL in the sitemap answers 200 directly — no redirect hop
#   4. every page's <link rel=canonical> is apex AND self-referential
#   5. every page's og:url is apex
#   6. no page's HTML contains the www host anywhere (JSON-LD included)
#   7. the apex serves, and www 301s to it rather than the other way round

set -uo pipefail

BASE_URL="${1:-https://agent-11.com}"
BASE_URL="${BASE_URL%/}"
CANONICAL_HOST="${CANONICAL_HOST:-agent-11.com}"
WWW_HOST="www.${CANONICAL_HOST}"
UA="agent-11-canonical-check/1.0"

pass=0
fail=0

ok()  { printf '  ok    %s\n' "$1"; pass=$((pass + 1)); }
bad() { printf '  FAIL  %s\n' "$1"; fail=$((fail + 1)); }

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

printf '\nCanonical host check against %s\n' "$BASE_URL"
printf 'Expecting: %s   Rejecting: %s\n' "$CANONICAL_HOST" "$WWW_HOST"

# --- 1. robots.txt -----------------------------------------------------------
printf '\nrobots.txt\n'
robots="$workdir/robots.txt"
status="$(curl -sS -L -A "$UA" --max-time 30 -o "$robots" -w '%{http_code}' "$BASE_URL/robots.txt" || echo 000)"

if [ "$status" = "200" ]; then
  ok "robots.txt returns 200"

  sitemap_line="$(grep -i '^Sitemap:' "$robots" | head -1)"
  if [ -z "$sitemap_line" ]; then
    bad "robots.txt has no Sitemap: line"
  elif printf '%s' "$sitemap_line" | grep -qF "$WWW_HOST"; then
    bad "robots.txt Sitemap: names $WWW_HOST -> $sitemap_line"
  elif printf '%s' "$sitemap_line" | grep -qF "$CANONICAL_HOST"; then
    ok "robots.txt Sitemap: names the apex"
  else
    bad "robots.txt Sitemap: names an unexpected host -> $sitemap_line"
  fi

  if grep -qiF "$WWW_HOST" "$robots"; then
    bad "robots.txt mentions $WWW_HOST"
  else
    ok "robots.txt is free of $WWW_HOST"
  fi
else
  bad "robots.txt returned $status (expected 200)"
fi

# --- 2. sitemap.xml ----------------------------------------------------------
printf '\nsitemap.xml\n'
sitemap="$workdir/sitemap.xml"
status="$(curl -sS -L -A "$UA" --max-time 30 -o "$sitemap" -w '%{http_code}' "$BASE_URL/sitemap.xml" || echo 000)"

urls=''
if [ "$status" = "200" ]; then
  ok "sitemap.xml returns 200"

  urls="$(grep -oE '<loc>[^<]+</loc>' "$sitemap" | sed -E 's#</?loc>##g' | sort -u)"
  count="$(printf '%s\n' "$urls" | grep -c . || true)"

  if [ "$count" -gt 0 ]; then
    ok "sitemap lists $count URLs"
  else
    bad "sitemap lists no URLs"
  fi

  if grep -qF "$WWW_HOST" "$sitemap"; then
    bad "sitemap contains $WWW_HOST"
  else
    ok "every sitemap URL is on the apex"
  fi
else
  bad "sitemap.xml returned $status (expected 200)"
fi

# --- 3-6. every page in the sitemap ------------------------------------------
if [ -n "$urls" ]; then
  printf '\npages\n'
  while IFS= read -r url; do
    [ -z "$url" ] && continue
    label="${url#https://}"

    page="$workdir/page.html"
    # No -L: a canonical host must answer directly, not via a redirect.
    code="$(curl -sS -A "$UA" --max-time 30 -o "$page" -w '%{http_code}' "$url" || echo 000)"
    if [ "$code" != "200" ]; then
      bad "$label returned $code without following redirects (expected 200)"
      continue
    fi

    problems=''

    canonical="$(grep -oE '<link[^>]+rel="canonical"[^>]*>' "$page" \
      | grep -oE 'href="[^"]+"' | head -1 | sed -E 's/^href="//; s/"$//')"
    if [ -z "$canonical" ]; then
      problems="$problems no-canonical"
    elif printf '%s' "$canonical" | grep -qF "$WWW_HOST"; then
      problems="$problems canonical-is-www"
    elif [ "${canonical%/}" != "${url%/}" ]; then
      problems="$problems canonical-not-self($canonical)"
    fi

    ogurl="$(grep -oE '<meta[^>]+property="og:url"[^>]*>' "$page" \
      | grep -oE 'content="[^"]+"' | head -1 | sed -E 's/^content="//; s/"$//')"
    if [ -n "$ogurl" ] && printf '%s' "$ogurl" | grep -qF "$WWW_HOST"; then
      problems="$problems og-url-is-www"
    fi

    # Catches JSON-LD, hrefs, share links — anything at all.
    if grep -qF "$WWW_HOST" "$page"; then
      problems="$problems html-contains-www"
    fi

    if [ -z "$problems" ]; then
      ok "$label  canonical + og:url + JSON-LD all apex, served without redirect"
    else
      bad "$label $problems"
    fi
  done <<< "$urls"
fi

# --- 7. the redirect points the right way ------------------------------------
printf '\nhost redirect\n'
apex_code="$(curl -sS -A "$UA" --max-time 30 -o /dev/null -w '%{http_code}' "https://$CANONICAL_HOST/" || echo 000)"
if [ "$apex_code" = "200" ]; then
  ok "https://$CANONICAL_HOST/ serves directly (200)"
else
  bad "https://$CANONICAL_HOST/ returned $apex_code (expected 200, not a redirect)"
fi

www_target="$(curl -sS -A "$UA" --max-time 30 -o /dev/null -w '%{redirect_url}' "https://$WWW_HOST/" || echo '')"
if printf '%s' "$www_target" | grep -qE "^https://$CANONICAL_HOST"; then
  ok "https://$WWW_HOST/ redirects to the apex"
else
  bad "https://$WWW_HOST/ redirects to '${www_target:-nothing}' (expected the apex)"
fi

printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
[ "$fail" -eq 0 ] || exit 1
