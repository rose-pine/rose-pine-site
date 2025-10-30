#!/usr/bin/env bash

set -euo pipefail

fatal() {
	echo -e "\033[31mError:\033[0m $1"
	exit 1
}

info() {
	echo -e "\033[1m\033[34m==>\033[0m\033[1m $1\033[0m"
}

warn() {
	echo -e "\033[1m\033[33m==>\033[0m\033[1m $1\033[0m"
}

progress() {
	printf "\r\033[K[%d/%d] %s" "$1" "$2" "$3"
}

if ! command -v jq &>/dev/null; then
	fatal "Missing command 'jq'"
fi

if ! command -v gh &>/dev/null; then
	fatal "Missing command 'gh'"
fi

if ! gh auth status &>/dev/null; then
	fatal "GitHub CLI is not authenticated. Please run: gh auth login"
fi

data_dir="$(dirname "$(readlink -f "$0")")/../src/data"
mkdir -p "$data_dir"

temp_dir=$(mktemp -d)
trap "rm -rf $temp_dir" EXIT

info "Fetching repository list..."
gh repo list rose-pine -L 1000 \
	--json description,name,repositoryTopics,stargazerCount,updatedAt,url,usesCustomOpenGraphImage |
	jq '[.[] | {
		slug: .name,
		description,
		repositoryTopics: (if .repositoryTopics != null then [.repositoryTopics[].name] else [] end),
		stargazerCount,
		updatedAt,
		url,
		usesCustomOpenGraphImage
	}]' >"$data_dir/repos.json"

mapfile -t repos < <(jq -r '.[].slug' "$data_dir/repos.json")
total_repos=${#repos[@]}

pids=()
completed_count=0
contributors=()
repos_without_name=()
repos_without_tags=()

for repo in "${repos[@]}"; do
	progress "$((${#pids[@]} + completed_count + 1))" "$total_repos" "fetching $repo"
	(
		gh api "/repos/rose-pine/$repo/properties/values" 2>/dev/null >"$temp_dir/$repo.props" || echo "[]" >"$temp_dir/$repo.props"
		gh api "repos/rose-pine/$repo/contributors?per_page=100" --paginate 2>/dev/null >"$temp_dir/$repo.contributors" || echo "[]" >"$temp_dir/$repo.contributors"
	) &
	pids+=($!)

	if [ ${#pids[@]} -ge 10 ]; then
		wait "${pids[0]}"
		pids=("${pids[@]:1}")
		completed_count=$((completed_count + 1))
		progress "$completed_count" "$total_repos" "fetching metadata"
	fi
done

for pid in "${pids[@]}"; do
	wait "$pid"
	completed_count=$((completed_count + 1))
	progress "$completed_count" "$total_repos" "fetching metadata"
done

printf "\r\033[K"

processed_count=0
for repo in "${repos[@]}"; do
	processed_count=$((processed_count + 1))
	progress "$processed_count" "$total_repos" "processing $repo"

	raw_props=$(cat "$temp_dir/$repo.props")
	props=$(jq -r 'if type == "array" then [.[] | {(.property_name): .value}] | add else {} end // {}' <<<"$raw_props")

	hidden=$(jq -r '.hidden // "false"' <<<"$props")
	name=$(jq -r '.name // null' <<<"$props")
	tags=$(jq -r '.tags // "[]"' <<<"$props")

	if [ "$name" = "null" ] || [ -z "$name" ]; then
		repos_without_name+=("$repo")
		name="$repo"
	fi

	if [ "$tags" = "[]" ]; then
		repos_without_tags+=("$repo")
	fi

	repo_contributors=$(jq -r '.[].login' "$temp_dir/$repo.contributors")
	contributors+=($repo_contributors)

	jq --arg repo "$repo" \
		--arg hidden "$hidden" \
		--arg name "$name" \
		--argjson tags "$tags" \
		--argjson contributors "$(echo "$repo_contributors" | jq -R . | jq -s '. | unique | sort')" \
		'map(
			if .slug == $repo then
				. + {
					hidden: $hidden,
					name: $name,
					tags: $tags,
					contributors: $contributors,
				}
			else
				.
			end
		)' \
		"$data_dir/repos.json" >"$data_dir/repos.json.tmp"
	mv "$data_dir/repos.json.tmp" "$data_dir/repos.json"
done

printf "\r\033[K"

jq 'sort_by(.slug)' "$data_dir/repos.json" >"$data_dir/repos.json.tmp"
mv "$data_dir/repos.json.tmp" "$data_dir/repos.json"

printf '%s\n' "${contributors[@]}" | jq -R . | jq -s '. | unique | sort' >"$data_dir/contributors.json"
total_contributors=$(jq 'length' "$data_dir/contributors.json")

echo "Processed $total_repos repositories with $total_contributors contributors"

if [ ${#repos_without_name[@]} -gt 0 ]; then
	warn "Repositories missing display name"
	printf '%s\n' "${repos_without_name[@]}"
fi

if [ ${#repos_without_tags[@]} -gt 0 ]; then
	warn "Repositories missing tags"
	printf '%s\n' "${repos_without_tags[@]}"
fi

info "Fetching available tags..."
gh api "/orgs/rose-pine/properties/schema/tags" |
	jq '.allowed_values | sort' >"$data_dir/tags.json"

if [ -f "$data_dir/community-repos.json" ]; then
	info "Sorting community repos..."
	jq 'map(.tags |= sort_by(ascii_downcase)?) | sort_by(.name | ascii_downcase)' "$data_dir/community-repos.json" >"$data_dir/community-repos.json.tmp"
	mv "$data_dir/community-repos.json.tmp" "$data_dir/community-repos.json"
fi

if [ -f "node_modules/.bin/prettier" ]; then
	info "Formatting data files..."
	node_modules/.bin/prettier --write "$data_dir"/*.json
fi
