import Link from "next/link";
import { PromptCard } from "@/components/PromptCard";
import { prompts } from "@/lib/prompts";
import { TOOLS, CATEGORIES } from "@/lib/types";

export default function HomePage() {
  const featured = prompts.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <section className="text-center max-w-2xl mx-auto mb-14">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-900 mb-4">
          Prompt Master — Your Hub for AI Prompts
        </h1>
        <p className="text-lg text-ink-600 mb-8">
          Find, customize, and use high-quality prompts for ChatGPT, Cursor, Claude, Copilot, and more. One place for coding, writing, analysis, and productivity.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/browse"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-dark transition-colors"
          >
            Browse prompts
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-lg border border-ink-300 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50 transition-colors"
          >
            Search
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display font-semibold text-xl text-ink-900 mb-2">By AI tool</h2>
        <p className="text-sm text-ink-600 mb-4">Filter prompts by the AI you use.</p>
        <div className="flex flex-wrap gap-2">
          {TOOLS.filter((t) => t.id !== "general").map((tool) => (
            <Link
              key={tool.id}
              href={`/browse?tool=${tool.id}`}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-white ${tool.color} hover:opacity-90 transition-opacity`}
            >
              {tool.name}
            </Link>
          ))}
          <Link
            href="/browse"
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-ink-600 bg-ink-200 hover:bg-ink-300 transition-colors"
          >
            Any
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="font-display font-semibold text-xl text-ink-900 mb-2">By category</h2>
        <p className="text-sm text-ink-600 mb-4">Coding, writing, analysis, and more.</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/browse?category=${encodeURIComponent(cat)}`}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-ink-700 bg-ink-100 hover:bg-ink-200 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display font-semibold text-xl text-ink-900 mb-4">Featured prompts</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/browse"
            className="text-sm font-medium text-accent hover:text-accent-dark"
          >
            View all prompts →
          </Link>
        </div>
      </section>
    </div>
  );
}
