import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-100/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-600">
            Prompt Master — prompts for ChatGPT, Cursor, Claude, Copilot & more.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/browse" className="text-ink-600 hover:text-accent transition-colors">
              Browse
            </Link>
            <Link href="/search" className="text-ink-600 hover:text-accent transition-colors">
              Search
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
