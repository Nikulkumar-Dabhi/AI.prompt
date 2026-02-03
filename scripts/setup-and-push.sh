#!/usr/bin/env bash
# One-time setup: create GitHub repo (optional) and push. Then deploy to Vercel from CLI.
set -e
cd "$(dirname "$0")/.."

GITHUB_USER="${GITHUB_USER:-nikulsinhdabhi}"
REPO_NAME="${REPO_NAME:-promptmaster}"

echo "=== 1. Create GitHub repo (if you have a token) ==="
if [ -n "$GITHUB_TOKEN" ]; then
  echo "Using GITHUB_TOKEN to create repo..."
  curl -s -X POST -H "Authorization: token $GITHUB_TOKEN" -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/user/repos" \
    -d "{\"name\":\"$REPO_NAME\",\"description\":\"Prompt Master - Find & use AI prompts\",\"private\":false}" \
    && echo "Repo created." || echo "Create failed (maybe repo already exists)."
else
  echo "No GITHUB_TOKEN set. Create the repo manually:"
  echo "  → https://github.com/new?name=$REPO_NAME"
  echo "  (Leave README/gitignore unchecked, then Create repository)"
  echo ""
  echo "After creating the repo, run: git push -u origin main"
  echo "Or run this script again with: GITHUB_TOKEN=your_token npm run push"
  exit 1
fi

echo ""
echo "=== 2. Push to GitHub ==="
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
git push -u origin main
echo "Pushed to GitHub."

echo ""
echo "=== 3. Deploy to Vercel (promptmaster.io) ==="
echo "Run: npx vercel --prod  (or: npm run deploy)"
echo "Then in Vercel dashboard: Settings → Domains → add promptmaster.io"
