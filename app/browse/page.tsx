"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PromptCard } from "@/components/PromptCard";
import { prompts } from "@/lib/prompts";
import type { ToolId } from "@/lib/types";
import { TOOLS, CATEGORIES } from "@/lib/types";

export default function BrowsePage() {
  const searchParams = useSearchParams();
  const tool = searchParams.get("tool") ?? "";
  const category = searchParams.get("category") ?? "";

  const filtered = useMemo(() => {
    let list = [...prompts];
    if (tool) list = list.filter((p) => p.tools.includes(tool as ToolId));
    if (category) list = list.filter((p) => p.category === category);
    return list;
  }, [tool, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-2">
        Browse prompts
      </h1>
      <p className="text-ink-600 mb-8">
        Filter by AI tool or category, then pick a prompt to use.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0 space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-ink-800 mb-2">AI tool</h2>
            <ul className="space-y-1">
              <li>
                <a
                  href={category ? `/browse?category=${encodeURIComponent(category)}` : "/browse"}
                  className={`block rounded px-2 py-1.5 text-sm ${!tool ? "bg-ink-200 text-ink-900 font-medium" : "text-ink-600 hover:bg-ink-100"}`}
                >
                  All
                </a>
              </li>
              {TOOLS.filter((t) => t.id !== "general").map((t) => {
                const href = tool === t.id
                  ? (category ? `/browse?category=${encodeURIComponent(category)}` : "/browse")
                  : `/browse?tool=${t.id}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
                return (
                  <li key={t.id}>
                    <a
                      href={href}
                      className={`block rounded px-2 py-1.5 text-sm ${tool === t.id ? "bg-ink-200 text-ink-900 font-medium" : "text-ink-600 hover:bg-ink-100"}`}
                    >
                      {t.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-ink-800 mb-2">Category</h2>
            <ul className="space-y-1">
              <li>
                <a
                  href={tool ? `/browse?tool=${tool}` : "/browse"}
                  className={`block rounded px-2 py-1.5 text-sm ${!category ? "bg-ink-200 text-ink-900 font-medium" : "text-ink-600 hover:bg-ink-100"}`}
                >
                  All
                </a>
              </li>
              {CATEGORIES.map((c) => {
                const href = tool ? `/browse?tool=${tool}&category=${encodeURIComponent(c)}` : `/browse?category=${encodeURIComponent(c)}`;
                return (
                  <li key={c}>
                    <a
                      href={href}
                      className={`block rounded px-2 py-1.5 text-sm ${category === c ? "bg-ink-200 text-ink-900 font-medium" : "text-ink-600 hover:bg-ink-100"}`}
                    >
                      {c}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-ink-500 mb-4">
            {filtered.length} prompt{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-ink-500 py-8">No prompts match your filters. Try changing tool or category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
