#!/usr/bin/env bash
#
# check-changelog.sh — the site may not invent releases.
#
# /changelog once listed v2.3.0, v2.2.0, v2.1.0, v2.0.3, v1.5.2 and v1.5.0.
# The framework released none of them. For a site whose whole pitch is a
# development framework for developers, a fabricated release history is about
# the worst bug available (A11W-ISS-7). This script makes it impossible to
# reintroduce one without the check going red.
#
# It fetches the framework's CHANGELOG.md, extracts the versions the live page
# claims, and asserts every claimed version exists upstream.
#
# Usage:
#   scripts/check-changelog.sh                      # check production
#   scripts/check-changelog.sh http://localhost:3000
#
# Exits 0 if every assertion passes, 1 otherwise.

set -uo pipefail

BASE_URL="${1:-https://agent-11.com}"
BASE_URL="${BASE_URL%/}"
CHANGELOG_URL="${CHANGELOG_URL:-https://raw.githubusercontent.com/TheWayWithin/agent-11/main/CHANGELOG.md}"
UA="agent-11-changelog-check/1.0"

pass=0
fail=0

ok()  { printf '  ok    %s\n' "$1"; pass=$((pass + 1)); }
bad() { printf '  FAIL  %s\n' "$1"; fail=$((fail + 1)); }

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

printf '\nChangelog truth check\n'
printf '  site:      %s/changelog\n' "$BASE_URL"
printf '  upstream:  %s\n\n' "$CHANGELOG_URL"

# --- upstream ----------------------------------------------------------------
upstream="$workdir/CHANGELOG.md"
status="$(curl -sS -L -A "$UA" --max-time 30 -o "$upstream" -w '%{http_code}' "$CHANGELOG_URL" || echo 000)"
if [ "$status" != "200" ]; then
  bad "could not fetch the framework CHANGELOG (HTTP $status)"
  printf '\nAborting: without upstream there is nothing to check against.\n\n'
  exit 1
fi
ok "fetched the framework CHANGELOG"

# Version headings look like:  ## [6.2.0] - 2026-06-20 - Title
grep -oE '^#{1,3} *\[[0-9]+\.[0-9]+\.[0-9]+\]' "$upstream" \
  | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -u > "$workdir/upstream.txt"

upstream_count="$(wc -l < "$workdir/upstream.txt" | tr -d ' ')"
if [ "$upstream_count" -gt 0 ]; then
  ok "upstream documents $upstream_count versions"
else
  bad "parsed no versions out of the upstream CHANGELOG — has its format changed?"
  exit 1
fi

# --- the live page -----------------------------------------------------------
page="$workdir/changelog.html"
status="$(curl -sS -L -A "$UA" --max-time 30 -o "$page" -w '%{http_code}' "$BASE_URL/changelog" || echo 000)"
if [ "$status" != "200" ]; then
  bad "/changelog returned $status (expected 200)"
  printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
  exit 1
fi
ok "/changelog returns 200"

# Read the versions from data-version attributes rather than from prose, so
# that a version number mentioned in a sentence cannot trip the check and a
# rendered entry cannot escape it.
grep -oE 'data-version="[0-9]+\.[0-9]+\.[0-9]+"' "$page" \
  | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | sort -u > "$workdir/site.txt"

site_count="$(wc -l < "$workdir/site.txt" | tr -d ' ')"
if [ "$site_count" -gt 0 ]; then
  ok "site lists $site_count versions"
else
  bad "found no data-version attributes on /changelog — has the markup changed?"
  printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
  exit 1
fi

# --- the assertion that matters ----------------------------------------------
invented="$(comm -23 "$workdir/site.txt" "$workdir/upstream.txt")"
if [ -z "$invented" ]; then
  ok "every version on the site exists in the framework CHANGELOG"
else
  while IFS= read -r v; do
    [ -z "$v" ] && continue
    bad "site claims v$v, which does not exist in the framework CHANGELOG"
  done <<< "$invented"
fi

# Informational only: the site is allowed to show fewer entries than upstream.
missing="$(comm -13 "$workdir/site.txt" "$workdir/upstream.txt")"
if [ -n "$missing" ]; then
  printf '\n  note: upstream versions not shown on the site (allowed — curation, not fabrication):\n'
  while IFS= read -r v; do
    [ -z "$v" ] && continue
    printf '        v%s\n' "$v"
  done <<< "$missing"
fi

printf '\n%s passed, %s failed\n\n' "$pass" "$fail"
[ "$fail" -eq 0 ] || exit 1
