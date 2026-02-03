# Deploy to GitHub and go live

## 1. Create the repository on GitHub

1. Go to [github.com/new](https://github.com/new).
2. Repository name: `promptmaster` (or any name you prefer).
3. Leave it **empty** (no README, no .gitignore).
4. Click **Create repository**.

## 2. Push this project (if you haven’t already)

If the remote is missing or different, set it and push:

```bash
cd "/Users/nikulsinhdabhi/Github/Prompt Master"
git remote remove origin   # only if you need to change the URL
git remote add origin https://github.com/YOUR_USERNAME/promptmaster.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Use the repo name you chose (e.g. `promptmaster`).

## 3. Turn on GitHub Pages

1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Source**, choose **Deploy from a branch**.
3. Branch: **main**, folder: **/ (root)**.
4. Click **Save**.

After a minute or two, the site will be at:

- **https://YOUR_USERNAME.github.io/promptmaster/**

(Use your actual username and repo name.)
