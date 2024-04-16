#!/usr/bin/env sh

INITIAL_DIR=$PWD
BASE_DIR=$(dirname "$0")
OUTPUT_DIR=src/data

cd $BASE_DIR
cd ../$OUTPUT_DIR

echo "[ORG] Writing $OUTPUT_DIR/org-repos.json"

# Get repos as json
gh repo list rose-pine -L 1000 --json description,homepageUrl,name,repositoryTopics,stargazerCount,updatedAt,url,usesCustomOpenGraphImage |
                 jq -r '[.[] | .repositoryTopics = if .repositoryTopics != null then [(.repositoryTopics[] | flatten[])] else [] end]' >org-repos.json


echo "[ORG] Writing $OUTPUT_DIR/org-members.json"

# Get members as json
gh api -H "Accept: application/vnd.github+json" /orgs/rose-pine/members |
	jq -r '[.[] | {login,avatar_url}]' >org-members.json

printf "\e[32m[ORG] Wrote 2 files in $SECONDS second(s)\e[0m\n\n"

cd $INITIAL_DIR
