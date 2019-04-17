#!/usr/bin/env bash
# shellcheck source=/dev/null
set -euo pipefail
IFS=$'\n\t'
# EXECPATH=$(pwd)
source "${EXECPATH}/build-tools/env.sh"

bundle exec jekyll build
# bundle exec htmlproofer "./_site/" --disable-external
