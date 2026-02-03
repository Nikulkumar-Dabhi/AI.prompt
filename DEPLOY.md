# Deploy Prompt Master to GitHub & promptmaster.io

## 1. Push to GitHub

If you haven’t created the repo yet:

1. On GitHub: **New repository** → name it `promptmaster` (or `Prompt-Master`).
2. Don’t add a README (this repo already has one).

Then in this project folder:

```bash
cd "/Users/nikulsinhdabhi/Github/Prompt Master"
git init
git add .
git commit -m "Initial commit: Prompt Master site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/promptmaster.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username (and `promptmaster` with your repo name if different).

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
