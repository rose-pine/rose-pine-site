#!/usr/bin/env bash

data_dir="$(dirname "$(readlink -f "$0")")/../src/data"
input_file="$data_dir/community-repos.json"

jq 'map(.tags |= sort_by(ascii_downcase)?) | sort_by(.name | ascii_downcase)' "$input_file" > tmp.json && mv tmp.json "$input_file"

