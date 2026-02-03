#!/bin/bash
# Prompt Master — push to GitHub and open Pages settings
set -e
cd "$(dirname "$0")"

REPO_NAME="promptmaster"
GITHUB_NEW="https://github.com/new?name=${REPO_NAME}&description=Copy+prompts+for+ChatGPT%2C+Cursor%2C+Claude%2C+Copilot"

echo "→ Opening GitHub to create the repository (if you haven't already)..."
open "$GITHUB_NEW" 2>/dev/null || xdg-open "$GITHUB_NEW" 2>/dev/null || echo "Open this in your browser: $GITHUB_NEW"

echo ""
echo "→ Create the repo as: $REPO_NAME (leave it empty, no README)."
echo "→ Waiting 45 seconds for you to create it..."
sleep 45

echo ""
echo "→ Pushing to origin main..."
if git push -u origin main 2>&1; then
  echo ""
  echo "✓ Pushed successfully."
  echo ""
  echo "→ Enabling GitHub Pages: open Settings → Pages, set source to 'Deploy from branch', branch: main, folder: / (root), Save."
  PAGES_URL="https://github.com/nikulsinhdabhi/${REPO_NAME}/settings/pages"
  open "$PAGES_URL" 2>/dev/null || xdg-open "$PAGES_URL" 2>/dev/null || echo "Open: $PAGES_URL"
  echo ""
  echo "Your site will be at: https://nikulsinhdabhi.github.io/${REPO_NAME}/"
else
  echo ""
  echo "Push failed. Create the repo at $GITHUB_NEW then run this script again: ./push-and-deploy.sh"
fi
