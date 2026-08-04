#!/usr/bin/env bash
#
# check-claims.sh — the site may not restate a claim the product has retired.
#
# On 2026-08-03 the framework spent a day removing an overclaim from eleven
# places in its own library: that the permissions.deny rules stop an agent
# editing anything that judges its work. They stop it editing four gate paths.
# The site was still publishing the retired wording, a config sample using
# Write() rule forms that Claude Code ignores, and five counts the repo had
# moved past.
#
# This is a source check, not a live-site check: it greps src/ so a regression
# fails before it ships rather than after. It is deliberately literal — each
# pattern is a string that was wrong on a specific date, not a heuristic.
#
# Definitions it enforces, taken from the update brief of 2026-08-03:
#   runnable mission  a file in the framework's missions/ directory that
#                     /coord can invoke. README.md and library.md are
#                     catalogues, not missions: 20 files, 18 missions.
#   enforceable       refused at the tool layer by an Edit() deny rule.
#                     Anything else is instruction, not enforcement.
#
# Usage:  scripts/check-claims.sh
# Exits 0 silent when clean, 1 listing every hit otherwise.

set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

fail=0

# pattern ::: why it is wrong
# The delimiter is ':::' and deliberately not a pipe: several patterns use
# regex alternation, and a pipe delimiter silently truncates them to their
# first branch. That bug was written here first time round, and the check
# then reported clean while a live overclaim sat in Hero.tsx. Tested both
# ways before being trusted.
checks=(
  '13 [Pp]roven [Mm]ission:::18 runnable missions, not 13'
  '13 [Mm]ission [Tt]ypes:::18 runnable missions, not 13'
  "'13 missions':::18 runnable missions, not 13"
  '13 AGENT-11 missions:::18 runnable missions, not 13'
  '13 /coord missions:::18 runnable missions, not 13'
  '13 pre-built missions:::18 runnable missions, not 13'
  'supports 13 missions:::18 runnable missions, not 13'
  'and 13 missions:::18 runnable missions, not 13'
  'all 13 missions:::18 runnable missions, not 13'
  '6 [Ss]lash [Cc]ommands:::there are 14 slash commands, not 6'
  '32 [Gg]uides:::the field manual has 31 guides, not 32'
  '32 [Ff]ield [Gg]uides:::the field manual has 31 guides, not 32'
  '32-guide:::the field manual has 31 guides, not 32'
  '32 professional guides:::the field manual has 31 guides, not 32'
  'Write\(\.quality-gates:::Claude Code ignores Write() deny rules; use Edit()'
  'Write\(gates:::Claude Code ignores Write() deny rules; use Edit()'
  'cannot game (their|its) own:::retired overclaim: agents cannot edit the GATE FILES that judge them'
  'game their own success criteria:::retired overclaim: scope the claim to the gate files'
  'rewrite its own success criteria:::retired overclaim: no rule covers criteria outside the gate paths'
  'files that judge an agent.{0,3}s work are off limits:::too broad: only the gate files are off limits'
  'backs up the permission block:::the Bash guard narrows the Bash route, it does not complete the protection'
  '26 [Tt]emplates:::unsourced: 4 in project/templates, 31 in templates, neither is 26'
  '1,370:::unsourced line count; state the guide count instead'
  '100% Schema Validation:::unsourced: nothing backs a 100% figure'
  '\b47 tests passed:::fabricated specific in a simulated terminal'
  '1s.{0,2}Deploy Time:::not measured anywhere'
  'around 14,400 lines:::unsourced line count; state the guide count instead'
  # Added after an independent audit found these three, which the brief of
  # 2026-08-03 did not list. Its location lists were not exhaustive, so the
  # first fix pass inherited the gaps: two overclaims and one unsourced tile
  # survived in files the brief named only partially.
  'criteria that judge the work are unwritable:::too broad: only the four gate paths are unwritable'
  'stop agents editing the files that judge their work:::too broad: scope it to the gate files'
  "installationTime: '<1s':::not measured anywhere; the Hero twin of this tile was already dropped"
  "filePersistence: '100%':::unsourced percentage, same class as the dropped schema-validation tile"
)

for entry in "${checks[@]}"; do
  pattern="${entry%%:::*}"
  why="${entry##*:::}"
  hits="$(grep -rnE "$pattern" src/ 2>/dev/null)"
  if [ -n "$hits" ]; then
    printf 'FAIL  %s\n' "$why"
    printf '%s\n' "$hits" | sed 's/^/      /'
    fail=1
  fi
done

# The framework version must not drift ahead of a cut release. Today's work
# sits in the CHANGELOG's [Unreleased] section, so 6.2.0 stands.
if ! grep -q "FRAMEWORK_VERSION = '6.2.0'" src/lib/seo.ts; then
  printf 'FAIL  FRAMEWORK_VERSION moved off 6.2.0; no release has been cut\n'
  fail=1
fi

# The deny sample must show the four rules the framework actually ships.
for rule in 'Edit(.quality-gates.json)' 'Edit(**/*.quality-gates.json)' 'Edit(gates/**)' 'Edit(.gates/**)'; do
  if ! grep -qF "$rule" src/components/sections/TechnicalConfidence.tsx; then
    printf 'FAIL  deny sample is missing the shipped rule %s\n' "$rule"
    fail=1
  fi
done

exit "$fail"
