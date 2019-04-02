#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external
