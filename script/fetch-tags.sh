#!/usr/bin/env bash

set -euo pipefail

if ! command -v jq &>/dev/null; then
	echo "Missing command: jq"
	exit 1
fi

if ! command -v gh &>/dev/null; then
	echo "Missing command: gh"
	exit 1
fi

if ! gh auth status &>/dev/null; then
	echo "GitHub CLI not authenticated. Run 'gh auth login'"
	exit 1
fi

data_dir="$(dirname "$(readlink -f "$0")")/../src/data"
mkdir -p "$data_dir"

echo "==> Fetching allowed tag list..."
gh api "/orgs/rose-pine/properties/schema/tags" |
	jq '.allowed_values | sort' >"$data_dir/tags.json"
