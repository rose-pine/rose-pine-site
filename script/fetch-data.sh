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

echo "Fetching repositories for rose-pine..."
echo

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

printf "%-25s %-30s %-10s %s\n" "REPO" "NAME" "HIDDEN" "CONTRIBUTORS"
printf "%s\n" "--------------------------------------------------------------------------------"

for repo in "${repos[@]}"; do
	raw_props=$(gh api -H "Accept: application/vnd.github+json" "/repos/rose-pine/$repo/properties/values" 2>/dev/null || echo "[]")
	props=$(jq -r 'if type == "array" then [.[] | {(.property_name): .value}] | add else {} end // {}' <<<"$raw_props")

	hidden=$(jq -r '.hidden // "false"' <<<"$props")
	name=$(jq -r '.name // "-"' <<<"$props")
	tags=$(jq -r '.tags // "[]"' <<<"$props")

	repo_contributors=$(gh api "repos/rose-pine/$repo/contributors?per_page=100" --paginate | jq -r '.[].login')
	contributor_count=$(wc -l <<<"$repo_contributors" | tr -d ' ')
	contributors+=($repo_contributors)

	printf "%-25s %-30s %-10s %s\n" "$repo" "$name" "$hidden" "$contributor_count"

	jq --arg repo "$repo" \
		--arg hidden "$hidden" \
		--arg name "$name" \
		--argjson tags "$tags" \
		--argjson contributors "$(echo "$repo_contributors" | jq -R . | jq -s '. | unique | sort')" \
		'map(
        if .slug == $repo then
            . + {
				hidden: $hidden,
				name: (if $name == "-" then .slug else $name end),
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

jq 'sort_by(.slug)' "$data_dir/repos.json" >"$data_dir/repos.json.tmp"
mv "$data_dir/repos.json.tmp" "$data_dir/repos.json"

printf '%s\n' "${contributors[@]}" | jq -R . | jq -s '. | unique | sort' >"$data_dir/contributors.json"

echo
echo "Formatting data files..."
pnpm prettier --write "$data_dir/*.json"

echo -e "\nDone! Fetched ${#repos[@]} repositories in $SECONDS seconds"
