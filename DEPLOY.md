# Deploy Prompt Master to GitHub & promptmaster.io

## Option A: One command (with GitHub token)

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens) with `repo` scope.
2. In this project folder run:

```bash
cd "/Users/nikulsinhdabhi/Github/Prompt Master"
GITHUB_TOKEN=your_token_here npm run push
```

This creates the `promptmaster` repo on GitHub and pushes. If your username isn’t `nikulsinhdabhi`, set `GITHUB_USER=your_username` as well.

## Option B: Create repo in browser, then push

**Create the repo on GitHub first:**

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `promptmaster`.
3. Leave “Add a README” **unchecked**.
4. Create repository.

Then run:

```bash
cd "/Users/nikulsinhdabhi/Github/Prompt Master"
npm run push
```

(Or run `git push -u origin main` if the remote is already set.)

## 2. Deploy as promptmaster.io (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New** → **Project** → import the `promptmaster` repo.
3. Click **Deploy** (no env vars needed).
4. After deploy: **Project** → **Settings** → **Domains**.
5. Add:
   - `promptmaster.io`
   - `www.promptmaster.io`
6. Vercel will show the DNS records you need.

## 3. Point promptmaster.io to Vercel

At your domain registrar (where you bought promptmaster.io):

- **A record** for `@` (or root) → `76.76.21.21` (Vercel’s IP), or  
- **CNAME** for `www` → `cname.vercel-dns.com`  
- For root, Vercel often suggests using their nameservers or an ALIAS/ANAME; follow the exact instructions in Vercel’s Domains panel.

After DNS propagates (up to 48 hours, often minutes), https://promptmaster.io will serve your site.
