# Prompt Master

A modern, all-in-one website for finding, customizing, and using high-quality prompts for AI tools (ChatGPT, Cursor, Claude, Copilot, and more). Live at **[promptmaster.io](https://promptmaster.io)**.

## Features

- **Browse** prompts by AI tool and category
- **Search** by title, description, category, tags, or prompt text
- **Customize** prompts with variables (e.g. `{{topic}}`, `{{code}}`) before copying
- **Copy** the full prompt to the clipboard and paste into your preferred AI
- Responsive layout and accessible UI

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Fonts: Outfit (display), DM Sans (body), JetBrains Mono (prompt text)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `app/` — Next.js App Router pages (home, browse, search, prompt detail)
- `components/` — Header, Footer, PromptCard, CopyButton
- `lib/` — Types, prompt data, and helpers (getPromptById, searchPrompts)

## Adding prompts

Edit `lib/prompts.ts` and add entries to the `prompts` array. Each prompt can specify:

- `id`, `title`, `description`, `body`
- `tools` — which AI tools it works with
- `category` — e.g. Coding, Writing, Analysis
- `tags` — for search
- `variables` — optional list of `{ key, label, placeholder, description }` for customization (use `{{key}}` in `body`)

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel + promptmaster.io)

1. Push this repo to GitHub (see below).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → Import your repo.
3. Deploy (defaults are fine for Next.js).
4. In the project **Settings** → **Domains**, add `promptmaster.io` and `www.promptmaster.io`.
5. At your domain registrar, add the DNS records Vercel shows (usually A/CNAME for root and www).

## License

MIT
